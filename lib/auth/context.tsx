"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  role: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userObj: any, userRole: string) => void;
  logout: () => void;
  switchRole: (newRole: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: "STUDENT",
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

const IS_DEMO_MODE = typeof window !== "undefined"
  ? (process.env.NEXT_PUBLIC_DEMO_MODE === "true")
  : false;

const DEMO_USERS: Record<string, UserProfile> = {
  STUDENT: { id: "demo-student-id", email: "student@karmasetu.ai", full_name: "Rajesh Kumar", role: "STUDENT" },
  INSTITUTE: { id: "demo-institute-id", email: "institute@karmasetu.ai", full_name: "Govt ITI Lucknow Director", role: "INSTITUTE" },
  INDUSTRY: { id: "demo-industry-id", email: "expert@karmasetu.ai", full_name: "Vikram Malhotra (L&T Senior)", role: "INDUSTRY" },
  EMPLOYER: { id: "demo-employer-id", email: "employer@karmasetu.ai", full_name: "Tata Motors Plant HR", role: "EMPLOYER" },
  HR: { id: "demo-hr-id", email: "hr@karmasetu.ai", full_name: "National HR Lead", role: "HR" },
  NATIONAL: { id: "demo-admin-id", email: "admin@karmasetu.ai", full_name: "MSDE National Governance", role: "NATIONAL" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<string>("STUDENT");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Restore from localStorage first (fast hydration)
    try {
      const savedAuth = localStorage.getItem("karmasetu_auth");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.user && parsed.role) {
          setUser(parsed.user);
          setRole(parsed.role);
        }
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    } finally {
      setIsLoading(false);
    }

    // 2. Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const supaUser = session.user;
          const userRole = supaUser.user_metadata?.role || "STUDENT";
          const formattedUser: UserProfile = {
            id: supaUser.id,
            email: supaUser.email || "",
            full_name: supaUser.user_metadata?.full_name || supaUser.email?.split("@")[0] || "User",
            role: userRole,
          };
          setUser(formattedUser);
          setRole(userRole);
          localStorage.setItem("karmasetu_auth", JSON.stringify({ user: formattedUser, role: userRole }));
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setRole("STUDENT");
          localStorage.removeItem("karmasetu_auth");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = (userObj: any, userRole: string) => {
    const formattedUser: UserProfile = {
      id: userObj.id || userObj.user_id || "user-" + Math.random().toString(36).substr(2, 9),
      email: userObj.email || `${userRole.toLowerCase()}@karmasetu.ai`,
      full_name: userObj.full_name || userObj.user_metadata?.full_name || userObj.fullName || userObj.name || DEMO_USERS[userRole]?.full_name || `${userRole} User`,
      role: userRole,
    };
    setUser(formattedUser);
    setRole(userRole);
    localStorage.setItem("karmasetu_auth", JSON.stringify({ user: formattedUser, role: userRole }));

    // Set auth cookie for middleware validation
    document.cookie = `karmasetu_auth_active=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  };

  const logout = () => {
    setUser(null);
    setRole("STUDENT");
    localStorage.removeItem("karmasetu_auth");
    // Clear auth cookie
    document.cookie = "karmasetu_auth_active=; path=/; max-age=0; SameSite=Lax";

    // Sign out from Supabase if connected
    supabase.auth.signOut().catch(() => {});

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const switchRole = (newRole: string) => {
    if (IS_DEMO_MODE) {
      const newUser = DEMO_USERS[newRole] || { id: "user-" + newRole, email: `${newRole.toLowerCase()}@karmasetu.ai`, full_name: `${newRole} User`, role: newRole };
      setUser(newUser);
      setRole(newRole);
      localStorage.setItem("karmasetu_auth", JSON.stringify({ user: newUser, role: newRole }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
