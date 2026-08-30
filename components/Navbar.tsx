'use client';

import { Home, Users, CalendarDays, BookHeart, MessageSquareHeart } from 'lucide-react';

const links = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#couple', label: 'Mempelai', icon: Users },
  { href: '#event', label: 'Acara', icon: CalendarDays },
  { href: '#story', label: 'Kisah', icon: BookHeart },
  { href: '#rsvp', label: 'RSVP', icon: MessageSquareHeart },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full border border-primary-200 bg-white/90 px-2 py-2 shadow-lg backdrop-blur dark:border-primary-800 dark:bg-primary-950/90">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          title={label}
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary-600 transition hover:bg-primary-100 dark:text-primary-300 dark:hover:bg-primary-800"
        >
          <Icon size={18} />
        </a>
      ))}
    </nav>
  );
}
