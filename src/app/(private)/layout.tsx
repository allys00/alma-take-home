'use client';
import { AppSidebar } from '@/components/shared/appSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppSelector } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const hasToken = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useLayoutEffect(() => {
    const isAuth = hasToken;
    if (!isAuth) {
      router.push('/login');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="z-10 w-full p-8">{children}</main>
    </SidebarProvider>
  );
}
