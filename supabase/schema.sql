-- KarmaSetu AI Comprehensive Supabase Database Schema
-- Fully Updated Schema with Role-Specific Details Tables & PostgREST Grants

-- 1. Profiles Master Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('STUDENT', 'INSTITUTE', 'INDUSTRY', 'EMPLOYER', 'HR', 'NATIONAL', 'SUPER_ADMIN')),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Institutes Master Table
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

-- 3. Student Details Table
CREATE TABLE IF NOT EXISTS public.student_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  institute_id UUID REFERENCES public.institutes(id) ON DELETE SET NULL,
  trade_branch TEXT NOT NULL DEFAULT 'General Technical',
  passing_year INT DEFAULT 2026,
  roll_no TEXT,
  job_ready_score NUMERIC(5,2) DEFAULT 78.50,
  technical_score NUMERIC(5,2) DEFAULT 82.00,
  practical_score NUMERIC(5,2) DEFAULT 74.00,
  soft_skill_score NUMERIC(5,2) DEFAULT 80.00,
  parsed_resume_json JSONB DEFAULT '{}'::jsonb,
  skill_passport_id TEXT UNIQUE DEFAULT ('KMP-' || upper(substr(md5(random()::text), 1, 8))),
  verified_status BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Institute Details Table
CREATE TABLE IF NOT EXISTS public.institute_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  official_name TEXT NOT NULL,
  code_ncvt TEXT,
  category TEXT DEFAULT 'Government ITI',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Industry Expert Details Table
CREATE TABLE IF NOT EXISTS public.industry_expert_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  designation TEXT,
  experience TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Employer Details Table
CREATE TABLE IF NOT EXISTS public.employer_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  industry_sector TEXT DEFAULT 'Manufacturing',
  location TEXT DEFAULT 'Noida',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Job Posts Table (Created by MSMEs / Employers)
CREATE TABLE IF NOT EXISTS public.job_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  industry_sector TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_range TEXT NOT NULL,
  required_trade TEXT NOT NULL,
  required_skills JSONB DEFAULT '[]'::jsonb,
  min_job_ready_score NUMERIC(5,2) DEFAULT 60.00,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED', 'PAUSED')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.job_posts(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  match_score NUMERIC(5,2) DEFAULT 94.00,
  status TEXT DEFAULT 'APPLIED' CHECK (status IN ('APPLIED', 'SHORTLISTED', 'INTERVIEWING', 'HIRED', 'REJECTED')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, student_id)
);

-- 9. PostgREST API Grants (Required for PostgREST schema exposure)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO authenticated;

-- 10. Enable Row-Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_expert_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 11. RLS Policies
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Public student details read" ON public.student_details FOR SELECT USING (true);
CREATE POLICY "Students manage details" ON public.student_details FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Active job posts public" ON public.job_posts FOR SELECT USING (status = 'ACTIVE');
CREATE POLICY "Employers manage jobs" ON public.job_posts FOR ALL USING (auth.uid() = employer_id);
