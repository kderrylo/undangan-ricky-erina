import { config } from '@/lib/data';
import Reveal from './Reveal';
import ChurchOrnament from './ChurchOrnament';
import SectionDivider from './SectionDivider';

export default function BibleVerse() {
  return (
    <section id="firman" className="relative overflow-hidden bg-white px-6 py-20 dark:bg-primary-950/20">
      <ChurchOrnament className="pointer-events-none absolute -left-6 -top-2 h-40 w-40 text-primary-200 opacity-40 sm:h-56 sm:w-56" />
      <ChurchOrnament flip className="pointer-events-none absolute -right-6 -top-2 h-40 w-40 text-lilac-200 opacity-40 sm:h-56 sm:w-56" />

      <Reveal className="relative text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Firman Tuhan</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          Sabda tentang Kasih &amp; Pernikahan
        </h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="relative mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {config.bibleVerses.map((verse, i) => (
          <Reveal
            key={verse.reference}
            delay={i * 0.12}
            className="rounded-2xl border border-primary-200 bg-white p-6 text-center shadow-sm dark:border-primary-800 dark:bg-primary-900/30"
          >
            <p className="font-script text-3xl leading-none text-primary-300">&ldquo;</p>
            <p className="mt-1 text-sm italic text-primary-700 dark:text-primary-200">{verse.text}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary-500 dark:text-primary-400">
              {verse.reference}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
