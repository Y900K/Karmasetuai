"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/context";
import { EcosystemProvider } from "@/lib/context/EcosystemContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <EcosystemProvider>
        {children}
      </EcosystemProvider>
    </AuthProvider>
  );
}
