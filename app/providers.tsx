"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/context";
import { EcosystemProvider } from "@/lib/context/EcosystemContext";
import { EcosystemStoreProvider } from "@/lib/store/EcosystemStore";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <EcosystemProvider>
        <EcosystemStoreProvider>
          {children}
        </EcosystemStoreProvider>
      </EcosystemProvider>
    </AuthProvider>
  );
}
