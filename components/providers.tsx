
'use client';

import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // FIX: AuthProvider and ToastProvider require a 'children' prop.
    // Nesting them ensures children are passed down correctly.
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}