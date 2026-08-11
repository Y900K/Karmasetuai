"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export interface FilterState {
  search: string;
  state: string;
  district: string;
  trade: string;
  status: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export function useFilterSort(defaultSortBy = "name") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    state: searchParams.get("state") || "",
    district: searchParams.get("district") || "",
    trade: searchParams.get("trade") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || defaultSortBy,
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const next = { ...filters, ...newFilters };
    setFilters(next);

    const params = new URLSearchParams();
    if (next.search) params.set("search", next.search);
    if (next.state) params.set("state", next.state);
    if (next.district) params.set("district", next.district);
    if (next.trade) params.set("trade", next.trade);
    if (next.status) params.set("status", next.status);
    if (next.sortBy) params.set("sortBy", next.sortBy);
    if (next.sortOrder) params.set("sortOrder", next.sortOrder);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearFilters = () => {
    const cleared: FilterState = {
      search: "",
      state: "",
      district: "",
      trade: "",
      status: "",
      sortBy: defaultSortBy,
      sortOrder: "asc",
    };
    setFilters(cleared);
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return {
    filters,
    updateFilters,
    clearFilters,
  };
}
