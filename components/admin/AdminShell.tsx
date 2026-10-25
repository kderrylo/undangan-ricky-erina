'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Send, LogOut, Heart } from 'lucide-react';
import { config } from '@/lib/data';

const NAV = [
  { href: '/admin', label: 'Ringkasan', icon: LayoutDashboard },
  { href: '/admin/terkirim', label: 'Terkirim', icon: Send },
  { href: '/admin/tamu', label: 'Data Tamu', icon: Users },
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
    <div className="min-h-screen bg-primary-50/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-4 sm:py-8 md:flex-row">
        
        {/* Sidebar (Desktop) / Top Navigation (Mobile) */}
        <aside className="shrink-0 md:w-60">
          <div className="rounded-2xl border border-primary-200/80 bg-white p-3 shadow-xs md:sticky md:top-8 md:p-4">
            {/* Header Brand & Tombol Logout Mobile */}
            <div className="flex items-center justify-between border-b border-primary-100 pb-3 md:pb-4">
              <div className="flex items-center gap-2 px-1 font-script text-2xl text-primary-700">
                <Heart size={18} className="fill-current text-primary-500" />
                <span className="truncate">
                  {config.groom.name} &amp; {config.bride.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 md:hidden"
              >
                <LogOut size={15} />
                Keluar
              </button>
            </div>

            {/* Menu Navigasi */}
            <nav className="mt-3 flex gap-1.5 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
              {NAV.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-semibold transition md:flex-initial md:justify-start md:text-sm ${
                      active
                        ? 'bg-primary-600 text-white shadow-xs'
                        : 'text-primary-700 hover:bg-primary-50'
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 hidden items-center gap-2 whitespace-nowrap rounded-xl border-t border-primary-100 px-3 pt-4 pb-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 md:flex"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </nav>
          </div>
        </aside>

        {/* Konten Utama */}
        <main className="min-w-0 flex-1 pb-10">{children}</main>
      </div>
    </div>
  );
}