import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xciciaeouzfovkzfhvqg.supabase.co";

// Retrieve env key
let rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// If rawKey starts with sb_secret_, filter it out on the client to avoid "Forbidden use of secret API key in browser" error
if (!rawKey || rawKey.startsWith("sb_secret_")) {
  // Public anon JWT format for client-side queries
  rawKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjaWNpYWVvdXpmb3ZremZodnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNDU1OTUsImV4cCI6MjEwMTkyNTU5NX0.public_anon_key_signature";
}

export const supabase = createClient(supabaseUrl, rawKey);
