import { config } from '@/lib/data';
import Monogram from './Monogram';

export default function Footer() {
  return (
    <footer className="bg-primary-900 px-6 py-10 text-center text-primary-100">
      <Monogram className="mx-auto h-14 w-11 opacity-80" />
      <p className="mt-3 font-script text-4xl">
        {config.groom.name} &amp; {config.bride.name}
      </p>
      <p className="mt-2 text-sm text-primary-200">{config.hashtag}</p>
      <p className="mt-4 text-[11px] tracking-wide text-primary-400 mb-14">Powered by WeddyKu & Zellution</p>
    </footer>
  );
}
