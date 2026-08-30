import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { config } from '@/lib/data';
import Reveal from './Reveal';

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
    <section id="couple" className="bg-white px-6 py-20 dark:bg-primary-950/20">
      <Reveal className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Mempelai</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          Kedua Mempelai
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 items-center gap-14 sm:grid-cols-[1fr_auto_1fr]">
        <PersonCard person={config.groom} align="left" />
        <Reveal delay={0.2} className="font-script text-5xl text-primary-400 text-center">
          &amp;
        </Reveal>
        <PersonCard person={config.bride} align="right" />
      </div>
    </section>
  );
}
