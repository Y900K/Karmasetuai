/**
 * Canonical role→route mapping for the entire KarmaSetu application.
 * Import this everywhere instead of defining ad-hoc mappings.
 */

export type KarmaSetuRole = "STUDENT" | "INSTITUTE" | "INDUSTRY" | "EMPLOYER" | "HR" | "NATIONAL" | "SUPER_ADMIN";

/** Map from auth role to the dashboard base route */
export const ROLE_ROUTES: Record<string, string> = {
  STUDENT: "/student",
  INSTITUTE: "/institute",
  INDUSTRY: "/expert",
  EMPLOYER: "/employer",
  HR: "/hr",
  NATIONAL: "/admin",
  SUPER_ADMIN: "/admin",
};

/** Roles that users can self-register for. HR and NATIONAL require admin provisioning. */
export const SELF_REGISTERABLE_ROLES = new Set<string>(["STUDENT", "INSTITUTE", "INDUSTRY", "EMPLOYER"]);

/** All roles available in the system */
export const ALL_ROLES: { id: string; label: string }[] = [
  { id: "STUDENT", label: "Student" },
  { id: "INSTITUTE", label: "Institute" },
  { id: "INDUSTRY", label: "Expert" },
  { id: "EMPLOYER", label: "Employer" },
  { id: "HR", label: "HR Manager" },
  { id: "NATIONAL", label: "Admin" },
];

/** Resolve the dashboard route for a given role */
export function getRouteForRole(role: string): string {
  return ROLE_ROUTES[role] || "/student";
}

/** Resolve the active role from a pathname */
export function getRoleFromPath(pathname: string): string {
  if (pathname.startsWith("/hr")) return "HR";
  if (pathname.startsWith("/student")) return "STUDENT";
  if (pathname.startsWith("/institute")) return "INSTITUTE";
  if (pathname.startsWith("/expert")) return "INDUSTRY";
  if (pathname.startsWith("/employer")) return "EMPLOYER";
  if (pathname.startsWith("/admin")) return "NATIONAL";
  return "STUDENT";
}
