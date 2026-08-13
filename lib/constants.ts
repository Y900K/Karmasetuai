/**
 * Canonical role→route mapping for the entire KarmaSetu application.
 * Consolidated 4 Primary Ecosystem Portals:
 * 1. Student / Trainee (STUDENT) -> /student
 * 2. Institute & Expert Mentor (INSTITUTE) -> /institute (includes Expert capabilities)
 * 3. Employer / MSME (EMPLOYER) -> /employer
 * 4. HR Manager & System Admin (HR) -> /hr (includes System Admin capabilities)
 */

export type KarmaSetuRole = "STUDENT" | "INSTITUTE" | "EMPLOYER" | "HR" | "INDUSTRY" | "NATIONAL" | "SUPER_ADMIN";

/** Map from auth role to the dashboard base route */
export const ROLE_ROUTES: Record<string, string> = {
  STUDENT: "/student",
  INSTITUTE: "/institute",
  EMPLOYER: "/employer",
  HR: "/hr",
  INDUSTRY: "/institute",
  NATIONAL: "/hr",
  SUPER_ADMIN: "/hr",
};

/** Roles available for registration */
export const SELF_REGISTERABLE_ROLES = new Set<string>(["STUDENT", "INSTITUTE", "EMPLOYER", "HR"]);

/** 4 Primary Consolidated Roles */
export const ALL_ROLES: { id: string; label: string; description: string }[] = [
  { id: "STUDENT", label: "Student & Trainee", description: "ITI Trainees, Diploma Engineers & Vocational Learners" },
  { id: "INSTITUTE", label: "Institute & Expert Mentor", description: "ITI Directors, Faculty, Instructors & Industry Experts" },
  { id: "EMPLOYER", label: "Employer & MSME Recruiter", description: "Factory Owners, HR Recruiters & MSME Managers" },
  { id: "HR", label: "HR Manager & System Admin", description: "HR Directors, NCVT Officials & System Administrators" },
];

/** Resolve the dashboard route for a given role */
export function getRouteForRole(role: string): string {
  return ROLE_ROUTES[role] || "/student";
}

/** Resolve the active role from a pathname */
export function getRoleFromPath(pathname: string): string {
  if (pathname.startsWith("/hr") || pathname.startsWith("/admin")) return "HR";
  if (pathname.startsWith("/institute") || pathname.startsWith("/expert")) return "INSTITUTE";
  if (pathname.startsWith("/employer")) return "EMPLOYER";
  if (pathname.startsWith("/student")) return "STUDENT";
  return "STUDENT";
}
