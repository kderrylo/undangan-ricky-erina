import { config } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';

export default function LoveStory() {
  return (
    <>
      <div className='w-full h-32 bg-flower'/>
      <section id="story" className="relative overflow-hidden bg-[#FCECED] px-6 py-20">
        <Reveal className="relative text-center">
          <h2 className={"mt-3 font-serif text-5xl font-semibold text-primary-rose " + fontSail} >
            Love Story
          </h2>
        </Reveal>

        
        {/* <div className="relative mx-auto mt-14 max-w-xl">
          <ol className="relative border-l border-primary-300">
            {config.loveStory.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.12} className="relative mb-10 ml-6 last:mb-0">
                <span className="absolute -left-[35px] flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 ring-4 ring-primary-100" />
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                  {item.year}
                </p>
                <h3 className="font-serif text-lg font-semibold text-primary-800">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-primary-600">{item.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div> */}
      </section>
      <div className='w-full h-32 bg-flower bg-bottom'/>
    </>
  );
}
