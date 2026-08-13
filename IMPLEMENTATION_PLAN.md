# KarmaSetu implementation plan

## Product contract

KarmaSetu has one transactional source of truth in Supabase. Static reference
content (trade catalogue, template courses, help copy, and demo seed data) is
kept separate from jobs, applications, learning progress, credentials, and
analytics. A UI may optimistically update, but it must reconcile with the
committed database record.

## Delivery status

### Phase 0 — foundation (in progress)

- [x] Document the role and data-flow risks in the existing prototype.
- [x] Add a versioned Supabase migration for jobs, applications, audit events,
  placement outcomes, indexes, and role-aware RLS.
- [x] Add a reproducible Supabase demo-account seed script.
- [x] Replace the hard-coded demo-auth API path with Supabase authentication.
- [ ] Apply the migration and seed script to the configured Supabase project.

### Phase 1 — hiring vertical slice (in progress)

- [x] Employer posts a job to `job_posts`.
- [x] Student reads active jobs and creates one idempotent application.
- [x] Employer reads only applications for their jobs and advances status.
- [x] A `HIRED` transition writes a placement outcome and audit event.
- [x] Subscribe student job matching and employer hiring dashboards to committed
  Supabase Realtime changes.

### Phase 2 — LMS and credentials

- [ ] Persist courses, modules, lessons, enrollment, progress, attempts, and
  certificates using IDs rather than browser storage.
- [ ] Issue certificates only from a server-side completion decision.
- [ ] Add storage policies and signed URLs for uploaded assets.

### Phase 3 — analytics

- [ ] Build institute, employer, and national views from transactional data.
- [ ] Define every KPI's numerator, denominator, filter scope, and refresh time.
- [ ] Add district/institute projections; never increment dashboard counts in UI.

### Phase 4 — hardening

- [ ] Rate-limit and meter AI routes; validate all request bodies.
- [ ] Add audit review, monitoring, error tracking, backups, and CI checks.
- [ ] Make lint clean and add workflow/RLS/realtime integration tests.

## Required deployment order

1. Run `supabase/migrations/20260813_hiring_vertical_slice.sql` in the
   Supabase SQL editor (or through the Supabase CLI).
2. Run `node scripts/seed-demo-users.mjs` with the real `.env.local` values.
3. Set `NEXT_PUBLIC_DEMO_MODE=false` in production. Demo accounts remain real
   Supabase users; this flag only controls UI affordances.
4. Verify the employer → student → employer hiring path with
   `node scripts/verify-hiring-flow.mjs`.

## Acceptance criteria for the first vertical slice

1. A Supabase-authenticated employer can publish a job and only they can edit it.
2. A Supabase-authenticated student sees active jobs and can apply once.
3. The employer can advance only applications for their jobs.
4. Marking an application `HIRED` creates exactly one placement outcome and
   audit event, even if the request is retried.
5. A refresh or a second device shows the committed data; localStorage is not
   used for jobs, applications, hiring stages, or placement metrics.
