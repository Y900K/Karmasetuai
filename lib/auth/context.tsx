"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export interface UserProfile { id: string; email: string; full_name: string; role: string; }
interface AuthContextType {
  user: UserProfile | null; role: string; isAuthenticated: boolean; isLoading: boolean;
  login: (user: UserProfile, role: string, session?: Pick<Session, "access_token" | "refresh_token"> | null) => Promise<void>;
  logout: () => void; switchRole: (_role: string) => void;
}
const AuthContext = createContext<AuthContextType>({ user: null, role: "STUDENT", isAuthenticated: false, isLoading: true, login: async () => {}, logout: () => {}, switchRole: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState("STUDENT");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const hydrate = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted && session?.user) {
        const authUser = session.user;
        const authRole = authUser.user_metadata?.role || "STUDENT";
        setUser({ id: authUser.id, email: authUser.email || "", full_name: authUser.user_metadata?.full_name || "User", role: authRole });
        setRole(authRole);
      }
      if (mounted) setIsLoading(false);
    };
    void hydrate();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (!session?.user) { setUser(null); setRole("STUDENT"); return; }
      const authRole = session.user.user_metadata?.role || "STUDENT";
      setUser({ id: session.user.id, email: session.user.email || "", full_name: session.user.user_metadata?.full_name || "User", role: authRole });
      setRole(authRole);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const login: AuthContextType["login"] = async (profile, nextRole, session) => {
    if (session) await supabase.auth.setSession(session);
    setUser({ ...profile, role: nextRole }); setRole(nextRole);
  };
  const logout = () => { setUser(null); setRole("STUDENT"); document.cookie = "karmasetu_access_token=; path=/; max-age=0; SameSite=Lax"; void supabase.auth.signOut(); window.location.assign("/"); };
  return <AuthContext.Provider value={{ user, role, isAuthenticated: Boolean(user), isLoading, login, logout, switchRole: () => {} }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
