import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { config } from '@/lib/data';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import BouquetOrnament from './BouquetOrnament';
import SectionDivider from './SectionDivider';

function PersonCard({
  person,
  align,
}: {
  person: typeof config.groom;
  align: 'left' | 'right';
}) {
  return (
    <Reveal delay={align === 'left' ? 0.1 : 0.3} className="flex flex-col items-center text-center">
      <div className="gradient-wedding relative h-[168px] w-[168px] rounded-full p-[4px] shadow-lg sm:h-[196px] sm:w-[196px]">
        <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white dark:border-ink">
          <Image
            src={person.photo}
            alt={person.fullName}
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>
      </div>
      <h3 className="mt-5 font-script text-4xl text-primary-800 dark:text-primary-100">
        {person.name}
      </h3>
      <p className="mt-2 text-sm text-primary-700 dark:text-primary-200">{person.fullName}</p>
      <p className="mt-1 max-w-xs text-sm text-primary-600 dark:text-primary-300">{person.parents}</p>
      {person.instagram && person.instagram !== '#' && (
        <a
          href={person.instagram}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-primary-500 hover:text-primary-700"
        >
          <Instagram size={14} /> Instagram
        </a>
      )}
    </Reveal>
  );
}

export default function CoupleInfo() {
  return (
    <section id="couple" className="relative overflow-hidden bg-white px-6 py-20 dark:bg-primary-950/20">
      <FloralOrnament className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 text-primary-200 opacity-60 sm:h-44 sm:w-44" />
      <FloralOrnament flip className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 text-lilac-200 opacity-60 sm:h-44 sm:w-44" />
      <BouquetOrnament flip className="pointer-events-none absolute -right-8 -top-6 h-28 w-28 text-lilac-200 opacity-45 sm:h-40 sm:w-40" />
      <BouquetOrnament className="pointer-events-none absolute -left-8 -bottom-6 h-28 w-28 text-primary-200 opacity-45 sm:h-40 sm:w-40" />

      <Reveal className="relative text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Mempelai</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          Kedua Mempelai
        </h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="relative mx-auto mt-14 grid max-w-3xl grid-cols-1 items-center gap-14 sm:grid-cols-[1fr_auto_1fr]">
        <PersonCard person={config.groom} align="left" />
        <Reveal delay={0.2} className="font-script text-5xl text-primary-400 text-center">
          &amp;
        </Reveal>
        <PersonCard person={config.bride} align="right" />
      </div>
    </section>
  );
}
