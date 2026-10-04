import Image from 'next/image';
import { config } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-900 pb-14 text-center text-primary-100">
      <div className="relative mx-auto h-28 w-[88px] opacity-80">
        <Image
          src="/images/monogram-pe.png"
          alt=""
          fill
          sizes="88px"
          className="object-contain"
        />
      </div>
      <p className="-mt-2 font-script text-4xl text-white">
        {config.groom.name} &amp; {config.bride.name}
      </p>
      <p className="mt-2 text-sm text-primary-200">{config.hashtag}</p>
      <p className="mt-4 text-[11px] tracking-wide text-primary-400">Powered by WeddyKu & Zellution</p>
    </footer>
  );
}