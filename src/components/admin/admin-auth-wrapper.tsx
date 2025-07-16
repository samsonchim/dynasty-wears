'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isAdminLoggedIn) {
      router.push('/admin/login');
    }
  }, [router]);

  return <>{children}</>;
}
