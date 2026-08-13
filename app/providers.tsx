"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/context";
import { EcosystemProvider } from "@/lib/context/EcosystemContext";
import { EcosystemStoreProvider } from "@/lib/store/EcosystemStore";
import { FormProvider } from "@/lib/store/FormStore";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <EcosystemProvider>
        <EcosystemStoreProvider>
          <FormProvider>
            {children}
          </FormProvider>
        </EcosystemStoreProvider>
      </EcosystemProvider>
    </AuthProvider>
  );
}
