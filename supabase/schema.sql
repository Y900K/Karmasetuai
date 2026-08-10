-- KarmaSetu AI Supabase Database Schema
-- Validated for PostgreSQL & Supabase (PostgREST 2026 update)

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('STUDENT', 'INSTITUTE_ADMIN', 'EMPLOYER_MSME', 'SUPER_ADMIN')),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Institutes Table (ITIs, Polytechnics, Colleges)
CREATE TABLE IF NOT EXISTS public.institutes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Uttar Pradesh',
  district TEXT NOT NULL,
  code TEXT UNIQUE,
  type TEXT DEFAULT 'ITI' CHECK (type IN ('ITI', 'POLYTECHNIC', 'DEGREE_COLLEGE', 'SKILL_CENTER')),
  student_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Student Details Table (Extends profiles for students)
CREATE TABLE IF NOT EXISTS public.student_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  institute_id UUID REFERENCES public.institutes(id) ON DELETE SET NULL,
  trade_branch TEXT NOT NULL, -- e.g., CNC Machinist, Electrician, Fitter, Welder
  passing_year INT,
  job_ready_score NUMERIC(5,2) DEFAULT 0.00,
  technical_score NUMERIC(5,2) DEFAULT 0.00,
  practical_score NUMERIC(5,2) DEFAULT 0.00,
  soft_skill_score NUMERIC(5,2) DEFAULT 0.00,
  parsed_resume_json JSONB DEFAULT '{}'::jsonb,
  skill_passport_id TEXT UNIQUE DEFAULT ('KMP-' || upper(substr(md5(random()::text), 1, 8))),
  verified_status BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Job Posts Table (Created by MSMEs / Employers)
CREATE TABLE IF NOT EXISTS public.job_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  industry_sector TEXT NOT NULL, -- e.g., Automotive, Electronics, Manufacturing
  location TEXT NOT NULL,
  salary_range TEXT NOT NULL,
  required_trade TEXT NOT NULL,
  required_skills JSONB DEFAULT '[]'::jsonb,
  min_job_ready_score NUMERIC(5,2) DEFAULT 60.00,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED', 'PAUSED')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.job_posts(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  match_score NUMERIC(5,2) DEFAULT 0.00,
  status TEXT DEFAULT 'APPLIED' CHECK (status IN ('APPLIED', 'SHORTLISTED', 'INTERVIEWING', 'HIRED', 'REJECTED')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, student_id)
);

-- 6. Grant PostgREST API access (Required for Supabase 2026 schema exposure)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO authenticated;

-- 7. Enable Row-Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies
CREATE POLICY "Public profiles read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Public student details read" ON public.student_details FOR SELECT USING (true);
CREATE POLICY "Students manage own details" ON public.student_details FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Active job posts are public" ON public.job_posts FOR SELECT USING (status = 'ACTIVE');
CREATE POLICY "Employers manage own job posts" ON public.job_posts FOR ALL USING (auth.uid() = employer_id);

CREATE POLICY "Users view relevant applications" ON public.applications 
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() IN (SELECT employer_id FROM public.job_posts WHERE id = job_id));
CREATE POLICY "Students apply for jobs" ON public.applications FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Sample Data Ingestion for Pilot (UP & Uttarakhand Institutes)
INSERT INTO public.institutes (name, state, district, code, type, student_count) VALUES
('Government ITI Lucknow', 'Uttar Pradesh', 'Lucknow', 'ITI-LKO-01', 'ITI', 450),
('Government ITI Kanpur', 'Uttar Pradesh', 'Kanpur Nagar', 'ITI-KNP-01', 'ITI', 600),
('Government Polytechnic Pantnagar', 'Uttarakhand', 'Udham Singh Nagar', 'POLY-PNT-01', 'POLYTECHNIC', 380),
('Government ITI Haridwar', 'Uttarakhand', 'Haridwar', 'ITI-HDW-01', 'ITI', 320),
('Government Polytechnic Noida', 'Uttar Pradesh', 'Gautam Buddha Nagar', 'POLY-NOI-01', 'POLYTECHNIC', 520)
ON CONFLICT (code) DO NOTHING;
