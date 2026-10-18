import { config } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';
import Image from 'next/image';

export default function BibleVerse() {
  return (
    <div className='relative'>
      <section id="firman" className="relative min-h-screen w-full bg-white flex flex-col-reverse md:flex-row justify-end items-center px-4 pt-32 pb-14 md:px-32 md:py-16 gap-16">

        <Reveal className='text-center md:text-right'>
          <p className={"text-3xl md:text-5xl text-primary-rose mb-8 md:mb-16 " + fontSail}>Firman Tuhan</p>
          {config.bibleVerses.map((verse, i) => (
            <Reveal
              key={verse.reference}
              delay={i * 0.12}
              className='mb-10 '
            >
              <p className="text-base md:text-lg italic text-primary-rose">{verse.text}</p>
              <p className="text-base md:text-lg font-semibold tracking-wide text-primary-rose">
                {verse.reference}
              </p>
            </Reveal>
          ))}
        </Reveal>

        <Image src="/images/img-verse.webp" width={1080} height={1} alt='verse-img' className='w-2/3 md:w-[35%] object-contain' />

      </section>
      <Image src="/images/flo-ornament-1.webp" width={1080} height={1} alt='verse-img' className='hidden md:block absolute w-28 object-contain animate-float z-10 bottom-28 left-28' />
    </div>
  );
}
