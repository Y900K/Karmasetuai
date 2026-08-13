import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

function readEnvironmentFile() {
  const values = {};
  for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
    if (match) values[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
  return values;
}

const env = readEnvironmentFile();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local.');

const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
const password = 'KarmaSetuDemo!2026';
const users = [
  ['student@karmasetu.ai', 'Rajesh Kumar', 'STUDENT'],
  ['institute@karmasetu.ai', 'Govt ITI Lucknow Director', 'INSTITUTE'],
  ['expert@karmasetu.ai', 'Vikram Malhotra', 'INDUSTRY'],
  ['employer@karmasetu.ai', 'Tata Motors Plant HR', 'EMPLOYER'],
  ['hr@karmasetu.ai', 'National HR Lead', 'HR'],
  ['admin@karmasetu.ai', 'MSDE Governance Lead', 'NATIONAL'],
];

for (const [email, fullName, role] of users) {
  const { data: existing } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  let user = existing?.users.find((candidate) => candidate.email === email);
  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: fullName, role } });
    if (error || !data.user) throw error ?? new Error(`Unable to create ${email}`);
    user = data.user;
  } else {
    const { error } = await supabase.auth.admin.updateUserById(user.id, { password, email_confirm: true, user_metadata: { ...user.user_metadata, full_name: fullName, role } });
    if (error) throw error;
  }
  const { error: profileError } = await supabase.from('profiles').upsert({ user_id: user.id, full_name: fullName, email, role }, { onConflict: 'user_id' });
  if (profileError) throw profileError;
  console.log(`Ready: ${role} — ${email}`);
}
