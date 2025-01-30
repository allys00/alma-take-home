'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const items = [
  {
    title: 'Leads',
    url: '/leads',
  },
  {
    title: 'Settings',
    url: '/settings',
  },
];

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar className="p-4">
      <span className="absolute -left-[300px] -top-[350px] z-0 size-4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-australian-mint-300/80 from-0% to-transparent to-70%" />
      <SidebarHeader className="z-10 mb-10">
        <Image
          src="/logo.png"
          alt="logo"
          height={35}
          width={120}
          className="m-auto mb-8"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="my-2">
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <span
                    className={cn(
                      'text-lg',
                      path.includes(item.url) && 'font-bold',
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Link href="#" className="flex w-full items-center gap-4 font-bold">
          <span className="flex size-10 items-center justify-center rounded-full bg-gray-200 text-black">
            A
          </span>
          <p>Admin</p>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
