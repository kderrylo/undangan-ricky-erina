'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquareHeart, LogOut, Heart } from 'lucide-react';
import { config } from '@/lib/data';

const NAV = [
  { href: '/admin', label: 'Ringkasan', icon: LayoutDashboard },
  { href: '/admin/tamu', label: 'Data Tamu', icon: Users },
  { href: '/admin/ucapan', label: 'Ucapan & RSVP', icon: MessageSquareHeart },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:flex-row">
        <aside className="shrink-0 sm:w-56">
          <div className="flex items-center gap-2 px-2 py-3 font-script text-2xl text-primary-700 dark:text-primary-200">
            <Heart size={18} className="fill-current text-primary-500" />
            {config.groom.name} &amp; {config.bride.name}
          </div>
          <nav className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-primary-700 hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-900/40'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
