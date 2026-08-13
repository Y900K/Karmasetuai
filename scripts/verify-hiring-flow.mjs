import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

function envFile() {
  return Object.fromEntries(readFileSync('.env.local', 'utf8').split(/\r?\n/).map((line) => line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/)).filter(Boolean).map(([, key, value]) => [key, value.replace(/^['"]|['"]$/g, '')]));
}
const env = envFile();
const password = 'KarmaSetuDemo!2026';
if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase URL, anon key, and service role key are required.');
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const client = () => createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
async function signedIn(email) { const instance = client(); const { error } = await instance.auth.signInWithPassword({ email, password }); if (error) throw new Error(`${email} login failed: ${error.message}`); return instance; }
const { data: profiles, error: profilesError } = await admin.from('profiles').select('user_id,role').in('email', ['student@karmasetu.ai', 'employer@karmasetu.ai']);
if (profilesError || profiles.length !== 2) throw new Error('Demo profiles missing. Run seed-demo-users.mjs after applying the migration.');
const studentId = profiles.find((profile) => profile.role === 'STUDENT')?.user_id;
const employerId = profiles.find((profile) => profile.role === 'EMPLOYER')?.user_id;
if (!studentId || !employerId) throw new Error('Student/employer demo roles are not configured.');
const employer = await signedIn('employer@karmasetu.ai'); const student = await signedIn('student@karmasetu.ai');
const marker = `Verification CNC Operator ${new Date().toISOString()}`;
const { data: job, error: jobError } = await employer.from('job_posts').insert({ employer_id: employerId, company_name: 'KarmaSetu Verification Plant', title: marker, industry_sector: 'Manufacturing', location: 'Noida', salary_range: '₹25,000 / month', required_trade: 'CNC Machinist', min_job_ready_score: 0, status: 'ACTIVE' }).select().single();
if (jobError || !job) throw new Error(`Job create failed: ${jobError?.message}`);
const { data: application, error: applyError } = await student.from('applications').insert({ job_id: job.id, student_id: studentId, match_score: 75, status: 'APPLIED' }).select().single();
if (applyError || !application) throw new Error(`Application create failed: ${applyError?.message}`);
for (const status of ['SHORTLISTED', 'INTERVIEWING', 'HIRED']) { const { error } = await employer.from('applications').update({ status, ...(status === 'HIRED' ? { hired_at: new Date().toISOString() } : {}) }).eq('id', application.id); if (error) throw new Error(`${status} transition failed: ${error.message}`); }
const { data: outcome, error: outcomeError } = await admin.from('placement_outcomes').select('application_id').eq('application_id', application.id).single();
const { data: history, error: historyError } = await admin.from('application_status_history').select('next_status').eq('application_id', application.id);
if (outcomeError || !outcome || historyError || history.length !== 4) throw new Error('Audit or placement outcome verification failed.');
console.log(JSON.stringify({ verified: true, jobId: job.id, applicationId: application.id, transitions: history.map((row) => row.next_status) }, null, 2));
