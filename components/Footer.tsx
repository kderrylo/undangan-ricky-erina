import { Heart } from 'lucide-react';
import { config } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-primary-900 px-6 py-10 text-center text-primary-100">
      <p className="font-script text-4xl">
        {config.groom.name} &amp; {config.bride.name}
      </p>
      <p className="mt-2 text-sm text-primary-200">{config.hashtag}</p>
      <p className="mt-6 flex items-center justify-center gap-1 text-xs text-primary-300">
        Dibuat dengan <Heart size={12} className="fill-current" /> menggunakan Next.js
      </p>
    </footer>
  );
}
