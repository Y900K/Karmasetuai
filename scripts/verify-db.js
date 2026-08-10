const { createClient } = require('@supabase/supabase-js');

// Reads exclusively from environment variables (.env.local) to prevent hardcoding secrets
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

async function verifyDatabase() {
  console.log('🔍 Checking KarmaSetu AI Supabase Database Tables...');
  const tables = ['institutes', 'profiles', 'student_details', 'job_posts', 'applications'];
  let allReady = true;

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`❌ Table '${table}': NOT FOUND (${error.message})`);
      allReady = false;
    } else {
      console.log(`✅ Table '${table}': READY (Rows found: ${data.length})`);
    }
  }

  if (allReady) {
    console.log('\n🎉 SUCCESS! All KarmaSetu AI database tables are active and ready!');
  } else {
    console.log('\n⚠️ Tables not created yet. Please run SQL in Supabase SQL Editor.');
  }
}

verifyDatabase();
