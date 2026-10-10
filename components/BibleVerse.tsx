import { config } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';
import Image from 'next/image';

export default function BibleVerse() {
  return (
    <div className='relative'>
      <section id="firman" className="relative h-screen w-full bg-white flex justify-end items-center px-32 gap-16">

        <Reveal className='text-right'>
          <p className={"text-5xl text-primary-rose mb-16 " + fontSail}>Firman Tuhan</p>
          {config.bibleVerses.map((verse, i) => (
            <Reveal
              key={verse.reference}
              delay={i * 0.12}
              className='mb-10 '
            >
              <p className="text-lg italic text-primary-rose">{verse.text}</p>
              <p className="text-lg font-semibold tracking-wide text-primary-rose">
                {verse.reference}
              </p>
            </Reveal>
          ))}
        </Reveal>

        <Image src="/images/img-verse.webp" width={1080} height={1} alt='verse-img' className='w-[35%] object-contain' />

      </section>
      <Image src="/images/flo-ornament-1.webp" width={1080} height={1} alt='verse-img' className='absolute w-28 object-contain animate-float z-10 bottom-28 left-28' />
    </div>
  );
}
