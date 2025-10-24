'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      showToast('error', 'Access Denied', 'Please log in to view this page.');
      router.replace('/login');
    }
  }, [isAuthenticated, router, showToast]);

  if (!isAuthenticated) {
    // Render nothing or a loading spinner while redirecting
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
