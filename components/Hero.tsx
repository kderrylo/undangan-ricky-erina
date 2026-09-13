import { config } from '@/lib/data';
import Countdown from './Countdown';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import BouquetOrnament from './BouquetOrnament';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-batik bg-primary-50 px-6 py-24 text-center dark:bg-ink"
    >
      <FloralOrnament className="pointer-events-none absolute -left-8 -top-8 h-44 w-44 animate-float text-primary-300 opacity-60 sm:h-60 sm:w-60" />
      <FloralOrnament flip className="pointer-events-none absolute -right-8 -bottom-8 h-44 w-44 animate-float text-lilac-300 opacity-60 sm:h-60 sm:w-60"/>
      <BouquetOrnament flip className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 text-primary-300 opacity-50 sm:h-64 sm:w-64" />
      <BouquetOrnament className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 text-lilac-300 opacity-50 sm:h-64 sm:w-64" />

      <Reveal>
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">
          Kami Akan Menikah
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <h1 className="mt-4 font-script text-6xl text-primary-800 dark:text-primary-100 sm:text-7xl">
          {config.groom.name} &amp; {config.bride.name}
        </h1>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-6 max-w-md text-primary-700 dark:text-primary-200">
          {new Date(config.weddingDate).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </Reveal>

      <Reveal delay={0.45} className="mt-10">
        <Countdown target={config.weddingDate} />
      </Reveal>

      <Reveal delay={0.6} className="relative mt-10 max-w-sm">
        <p className="font-script text-3xl leading-none text-primary-300">&ldquo;</p>
        <p className="mt-1 text-sm italic text-primary-600 dark:text-primary-300">{config.vow}</p>
      </Reveal>
    </section>
  );
}
