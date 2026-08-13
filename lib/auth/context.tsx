"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: UserProfile | null;
  role: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserProfile, role: string, session?: Pick<Session, "access_token" | "refresh_token"> | null) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: "STUDENT",
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState("STUDENT");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session?.user) {
          const authUser = session.user;
          const authRole = authUser.user_metadata?.role || "STUDENT";
          const userObj = {
            id: authUser.id,
            email: authUser.email || "",
            full_name: authUser.user_metadata?.full_name || "User",
            role: authRole,
          };
          setUser(userObj);
          setRole(authRole);
          try {
            localStorage.setItem("ks_auth_user", JSON.stringify(userObj));
            localStorage.setItem("ks_auth_role", authRole);
          } catch {}
        } else if (mounted) {
          // P0-2 fix: If Supabase client session is gone, try recovering from server cookie
          try {
            const meRes = await fetch("/api/auth/me", { credentials: "include" });
            if (meRes.ok) {
              const meData = await meRes.json();
              if (meData.user) {
                setUser(meData.user);
                setRole(meData.user.role || "STUDENT");
                try {
                  localStorage.setItem("ks_auth_user", JSON.stringify(meData.user));
                  localStorage.setItem("ks_auth_role", meData.user.role || "STUDENT");
                } catch {}
                if (mounted) setIsLoading(false);
                return;
              }
            }
          } catch {
            // Server fallback failed
          }

          // Try localStorage backup
          try {
            const cachedUser = localStorage.getItem("ks_auth_user");
            const cachedRole = localStorage.getItem("ks_auth_role");
            if (cachedUser && cachedRole) {
              setUser(JSON.parse(cachedUser));
              setRole(cachedRole);
            }
          } catch {
            localStorage.removeItem("ks_auth_user");
            localStorage.removeItem("ks_auth_role");
          }
        }
      } catch {
        // Session check failed
      }
      if (mounted) setIsLoading(false);
    };

    void hydrate();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        const authRole = session.user.user_metadata?.role || "STUDENT";
        const userObj = {
          id: session.user.id,
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name || "User",
          role: authRole,
        };
        setUser(userObj);
        setRole(authRole);
        try {
          localStorage.setItem("ks_auth_user", JSON.stringify(userObj));
          localStorage.setItem("ks_auth_role", authRole);
        } catch {}
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login: AuthContextType["login"] = async (profile, nextRole, session) => {
    if (session) {
      try {
        await supabase.auth.setSession(session);
      } catch (err) {
        console.warn("[AuthProvider] setSession warning:", err);
      }
    }
    const fullUser = { ...profile, role: nextRole };
    setUser(fullUser);
    setRole(nextRole);
    try {
      localStorage.setItem("ks_auth_user", JSON.stringify(fullUser));
      localStorage.setItem("ks_auth_role", nextRole);
    } catch {}
  };

  const logout = () => {
    setUser(null);
    setRole("STUDENT");
    try {
      localStorage.removeItem("ks_auth_user");
      localStorage.removeItem("ks_auth_role");
    } catch {}
    document.cookie = "karmasetu_access_token=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "karmasetu_user_role=; path=/; max-age=0; SameSite=Lax";
    void supabase.auth.signOut();
    window.location.assign("/");
  };

  const switchRole = (newRole: string) => {
    setRole(newRole);
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      try {
        localStorage.setItem("ks_auth_user", JSON.stringify(updatedUser));
        localStorage.setItem("ks_auth_role", newRole);
      } catch {}
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
