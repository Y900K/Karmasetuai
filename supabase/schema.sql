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

-- 9. Courses & Learning Management System
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  trade TEXT NOT NULL,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','PUBLISHED','ARCHIVED')),
  enrolled_count INT DEFAULT 0,
  avg_completion_percent NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  lesson_type TEXT NOT NULL CHECK (lesson_type IN (
    'VIDEO_YOUTUBE','VIDEO_UPLOAD','FILE_GDRIVE','FILE_UPLOAD','TEXT','QUIZ'
  )),
  order_index INT NOT NULL DEFAULT 0,
  duration_minutes INT DEFAULT 10,
  youtube_url TEXT,
  file_url TEXT,
  gdrive_share_url TEXT,
  content_markdown TEXT,
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  video_completed_lessons JSONB DEFAULT '[]'::jsonb,
  reading_completed_lessons JSONB DEFAULT '[]'::jsonb,
  quiz_passed_lessons JSONB DEFAULT '[]'::jsonb,
  quiz_scores JSONB DEFAULT '{}'::jsonb,
  total_completion_percentage NUMERIC(5,2) DEFAULT 0.00,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  last_accessed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(course_id, student_id)
);

-- 10. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_code TEXT UNIQUE NOT NULL DEFAULT ('CRT-' || upper(substr(md5(random()::text), 1, 8))),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  quiz_score NUMERIC(5,2) NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT now(),
  qr_code_url TEXT,
  pdf_url TEXT
);

-- 11. CapStone Verifications & Masterclasses
CREATE TABLE IF NOT EXISTS public.capstone_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  project_title TEXT NOT NULL,
  project_description TEXT,
  video_url TEXT,
  trade TEXT NOT NULL,
  technical_score NUMERIC(5,2),
  safety_score NUMERIC(5,2),
  precision_score NUMERIC(5,2),
  documentation_score NUMERIC(5,2),
  overall_score NUMERIC(5,2),
  ai_suggested_scores JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING','VERIFIED','REJECTED')),
  expert_notes TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.masterclass_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  description TEXT,
  trade TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 60,
  capacity INT DEFAULT 50,
  enrolled_count INT DEFAULT 0,
  recording_url TEXT,
  status TEXT DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED','LIVE','COMPLETED','CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. AI Conversations & Notifications
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_type TEXT NOT NULL CHECK (tool_type IN (
    'MENTOR','RESUME_PARSE','SKILL_RADAR','CURRICULUM_GAP',
    'JD_GENERATOR','CANDIDATE_RANK','DISTRICT_INSIGHTS',
    'QUIZ_GENERATOR','EVALUATE_WRITTEN_QUIZ','LEARNING_RECOMMEND'
  )),
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  notification_type TEXT DEFAULT 'INFO' CHECK (notification_type IN (
    'INFO','JOB_MATCH','VERIFICATION','PLACEMENT','COURSE','CERTIFICATE','SYSTEM'
  )),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. Column Additions
ALTER TABLE public.student_details ADD COLUMN IF NOT EXISTS resume_raw_text TEXT;
ALTER TABLE public.student_details ADD COLUMN IF NOT EXISTS ai_parsed_skills JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.student_details ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.student_details ADD COLUMN IF NOT EXISTS languages JSONB DEFAULT '["Hindi","English"]'::jsonb;

ALTER TABLE public.job_posts ADD COLUMN IF NOT EXISTS ai_generated_description TEXT;
ALTER TABLE public.job_posts ADD COLUMN IF NOT EXISTS responsibilities JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.job_posts ADD COLUMN IF NOT EXISTS qualifications JSONB DEFAULT '[]'::jsonb;

ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS ai_match_explanation TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS interview_scheduled_at TIMESTAMPTZ;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS hired_at TIMESTAMPTZ;

-- 14. PostgREST Grants & RLS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO authenticated;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_expert_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.capstone_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.masterclass_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Public courses read" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public certificates read" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Enrollments read" ON public.course_enrollments FOR SELECT USING (true);
CREATE POLICY "Enrollments manage" ON public.course_enrollments FOR ALL USING (auth.uid() = student_id);

