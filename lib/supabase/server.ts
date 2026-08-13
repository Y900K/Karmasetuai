import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "[KarmaSetu Server] Missing Supabase environment variables. " +
    "Auth and admin operations will fail. Configure .env.local."
  );
}

export function createAdminClient() {
  return createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseServiceKey || "placeholder-key",
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export type KarmaSetuRole = "STUDENT" | "INSTITUTE" | "INDUSTRY" | "EMPLOYER" | "HR" | "NATIONAL" | "SUPER_ADMIN";

export interface RequestProfile {
  userId: string;
  role: KarmaSetuRole;
  fullName: string;
  email: string | null;
}

/** Verify the Supabase token and look up the server-owned application role. */
export async function getRequestProfile(request: NextRequest): Promise<RequestProfile | null> {
  const accessToken = request.cookies.get("karmasetu_access_token")?.value;
  if (!accessToken) return null;
  const supabase = createAdminClient();
  const { data: authData, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !authData.user) return null;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("user_id", authData.user.id)
    .single();
  if (profileError || !profile) return null;
  return { userId: authData.user.id, role: profile.role as KarmaSetuRole, fullName: profile.full_name, email: profile.email };
}

export function hasRole(profile: RequestProfile, roles: KarmaSetuRole[]) {
  return roles.includes(profile.role);
}
