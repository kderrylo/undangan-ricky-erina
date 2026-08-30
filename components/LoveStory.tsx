import { config } from '@/lib/data';
import Reveal from './Reveal';

export default function LoveStory() {
  return (
    <section id="story" className="bg-white px-6 py-20 dark:bg-primary-950/20">
      <Reveal className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Perjalanan Kami</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          Love Story
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 max-w-xl">
        <ol className="relative border-l border-primary-300 dark:border-primary-700">
          {config.loveStory.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12} className="relative mb-10 ml-6 last:mb-0">
              <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 ring-4 ring-primary-100 dark:ring-ink" />
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                {item.year}
              </p>
              <h3 className="font-serif text-lg font-semibold text-primary-800 dark:text-primary-100">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-primary-600 dark:text-primary-300">{item.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
