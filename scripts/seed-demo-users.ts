/**
 * KarmaSetu AI — Demo User Seed Script
 * Creates 6 demo accounts in Supabase Auth + profiles table.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   2. Run: npx tsx scripts/seed-demo-users.ts
 *
 * This script is idempotent — re-running it will skip existing users.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
    "   Set them in .env.local and re-run this script."
  );
  process.exit(1);
}

const DEMO_PASSWORD = "KarmaSetuDemo!2026";

interface DemoUser {
  email: string;
  full_name: string;
  role: string;
  phone: string;
}

const DEMO_USERS: DemoUser[] = [
  { email: "student@karmasetu.ai",   full_name: "Demo Student (Rajesh Kumar)", role: "STUDENT",   phone: "9876543210" },
  { email: "institute@karmasetu.ai", full_name: "Demo Institute Director",     role: "INSTITUTE", phone: "9876543211" },
  { email: "expert@karmasetu.ai",    full_name: "Demo Expert Mentor",          role: "INDUSTRY",  phone: "9876543212" },
  { email: "employer@karmasetu.ai",  full_name: "Demo Employer (MSME)",        role: "EMPLOYER",  phone: "9876543213" },
  { email: "hr@karmasetu.ai",        full_name: "Demo HR Manager",             role: "HR",        phone: "9876543214" },
  { email: "admin@karmasetu.ai",     full_name: "Demo National Admin",         role: "NATIONAL",  phone: "9876543215" },
];

async function supabaseAdminRequest(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SERVICE_KEY}`,
      "apikey": SERVICE_KEY!,
    },
    body: JSON.stringify(body),
  });
  return res;
}

async function seedUser(user: DemoUser) {
  console.log(`\n🔧 Creating ${user.role} → ${user.email}...`);

  // Step 1: Create auth user via Admin API
  const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SERVICE_KEY}`,
      "apikey": SERVICE_KEY!,
    },
    body: JSON.stringify({
      email: user.email,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name: user.full_name,
        phone: user.phone,
        role: user.role,
      },
    }),
  });

  const createData = await createRes.json();

  let userId: string;

  if (!createRes.ok) {
    // User may already exist
    if (createData?.msg?.includes("already been registered") || createData?.message?.includes("already been registered")) {
      console.log(`   ⏭️  User already exists. Looking up ID...`);

      // List users and find this one
      const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=50`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${SERVICE_KEY}`,
          "apikey": SERVICE_KEY!,
        },
      });
      const listData = await listRes.json();
      const existing = listData?.users?.find((u: any) => u.email === user.email);
      if (!existing) {
        console.error(`   ❌ Could not find existing user ${user.email}`);
        return;
      }
      userId = existing.id;
      console.log(`   ✅ Found existing user: ${userId}`);
    } else {
      console.error(`   ❌ Failed to create user: ${JSON.stringify(createData)}`);
      return;
    }
  } else {
    userId = createData.id;
    console.log(`   ✅ Auth user created: ${userId}`);
  }

  // Step 2: Upsert into profiles table
  const profileRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SERVICE_KEY}`,
      "apikey": SERVICE_KEY!,
      "Prefer": "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      user_id: userId,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }),
  });

  if (profileRes.ok || profileRes.status === 201 || profileRes.status === 200) {
    console.log(`   ✅ Profile upserted for ${user.role}`);
  } else {
    const profileErr = await profileRes.text();
    console.warn(`   ⚠️  Profile upsert response (${profileRes.status}): ${profileErr}`);
  }
}

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║   KarmaSetu AI — Demo User Seed Script          ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log(`\nTarget Supabase: ${SUPABASE_URL}`);
  console.log(`Seeding ${DEMO_USERS.length} demo accounts...\n`);

  for (const user of DEMO_USERS) {
    await seedUser(user);
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("✅ Done! All demo accounts are ready.");
  console.log(`   Password for all: ${DEMO_PASSWORD}`);
  console.log("═══════════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
