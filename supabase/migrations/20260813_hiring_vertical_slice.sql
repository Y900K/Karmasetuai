-- KarmaSetu: first transactional, auditable hiring vertical slice.
-- Apply after schema.sql. This migration is intentionally idempotent where
-- PostgreSQL permits it, so it is safe to review in the Supabase SQL editor.

-- The deployed prototype has an older role constraint. Normalize it before
-- provisioning real accounts so the application and database use one contract.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('STUDENT', 'INSTITUTE', 'INDUSTRY', 'EMPLOYER', 'HR', 'NATIONAL', 'SUPER_ADMIN'));

create table if not exists public.application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  previous_status text,
  next_status text not null check (next_status in ('APPLIED','SHORTLISTED','INTERVIEWING','HIRED','REJECTED')),
  changed_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.placement_outcomes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique references public.applications(id) on delete restrict,
  student_id uuid not null references auth.users(id) on delete restrict,
  job_id uuid not null references public.job_posts(id) on delete restrict,
  employer_id uuid not null references auth.users(id) on delete restrict,
  institute_id uuid references public.institutes(id) on delete set null,
  hired_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.applications add column if not exists updated_at timestamptz not null default now();
create index if not exists applications_student_created_idx on public.applications (student_id, created_at desc);
create index if not exists applications_job_status_idx on public.applications (job_id, status);
create index if not exists job_posts_employer_status_idx on public.job_posts (employer_id, status, created_at desc);
create index if not exists audit_events_entity_idx on public.audit_events (entity_type, entity_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at before update on public.applications
for each row execute function public.set_updated_at();

create or replace function public.current_profile_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where user_id = auth.uid()
$$;

alter table public.job_posts enable row level security;
alter table public.applications enable row level security;
alter table public.application_status_history enable row level security;
alter table public.placement_outcomes enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists "jobs visible to authenticated users" on public.job_posts;
create policy "jobs visible to authenticated users" on public.job_posts
for select to authenticated using (status = 'ACTIVE' or employer_id = auth.uid());
drop policy if exists "employers create jobs" on public.job_posts;
create policy "employers create jobs" on public.job_posts
for insert to authenticated with check (employer_id = auth.uid() and public.current_profile_role() in ('EMPLOYER','HR'));
drop policy if exists "employers manage own jobs" on public.job_posts;
create policy "employers manage own jobs" on public.job_posts
for update to authenticated using (employer_id = auth.uid()) with check (employer_id = auth.uid());

drop policy if exists "application participants read" on public.applications;
create policy "application participants read" on public.applications
for select to authenticated using (
  student_id = auth.uid() or exists (select 1 from public.job_posts j where j.id = job_id and j.employer_id = auth.uid())
);
drop policy if exists "students apply" on public.applications;
create policy "students apply" on public.applications
for insert to authenticated with check (student_id = auth.uid() and public.current_profile_role() = 'STUDENT');
drop policy if exists "employers advance applications" on public.applications;
create policy "employers advance applications" on public.applications
for update to authenticated using (exists (select 1 from public.job_posts j where j.id = job_id and j.employer_id = auth.uid()))
with check (exists (select 1 from public.job_posts j where j.id = job_id and j.employer_id = auth.uid()));

create or replace function public.record_application_transition()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    insert into public.application_status_history (application_id, previous_status, next_status, changed_by)
    values (new.id, null, new.status, auth.uid());
  elsif old.status is distinct from new.status then
    insert into public.application_status_history (application_id, previous_status, next_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());
    if new.status = 'HIRED' then
      insert into public.placement_outcomes (application_id, student_id, job_id, employer_id, institute_id, hired_at)
      select new.id, new.student_id, new.job_id, j.employer_id, sd.institute_id, coalesce(new.hired_at, now())
      from public.job_posts j left join public.student_details sd on sd.user_id = new.student_id
      where j.id = new.job_id
      on conflict (application_id) do nothing;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists applications_record_transition on public.applications;
create trigger applications_record_transition after insert or update of status on public.applications
for each row execute function public.record_application_transition();

drop policy if exists "history participants read" on public.application_status_history;
create policy "history participants read" on public.application_status_history
for select to authenticated using (exists (
  select 1 from public.applications a join public.job_posts j on j.id = a.job_id
  where a.id = application_id and (a.student_id = auth.uid() or j.employer_id = auth.uid())
));
drop policy if exists "outcome participants read" on public.placement_outcomes;
create policy "outcome participants read" on public.placement_outcomes
for select to authenticated using (student_id = auth.uid() or employer_id = auth.uid());
drop policy if exists "audit actors read" on public.audit_events;
create policy "audit actors read" on public.audit_events for select to authenticated using (actor_id = auth.uid());

-- Add these tables to the Realtime publication once. The conditional block
-- prevents an error when a table is already present.
do $$
declare table_name text;
begin
  foreach table_name in array array['job_posts','applications','placement_outcomes','audit_events'] loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = table_name
    ) then
      execute format('alter publication supabase_realtime add table public.%I', table_name);
    end if;
  end loop;
end;
$$;
