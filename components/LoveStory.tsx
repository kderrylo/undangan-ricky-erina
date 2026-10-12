import { config } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';
import Image from 'next/image';

type CardItemProps = {
  title: string,
  year: string,
  desc: string,
  img: string,
  delay: number,
}

const CardItem = (item: CardItemProps) => {
  return (
    <Reveal delay={item.delay} className="bg-white relative w-full md:min-h-[10rem] shadow-lg rounded-lg overflow-hidden group">
      <div className="overflow-hidden">
        <div className="w-full aspect-[9/10] lg:aspect-[3/4] relative hover:scale-105 transition-transform duration-500">
          <Image
            alt="romo"
            src={item.img}
            fill
            className="object-cover brightness-100 group-hover:brightness-50 transition duration-500"
          />
        </div>
      </div>
      <div />
      <div className="p-4 absolute z-20 top-0 text-white">
        <h2 className="font-heading text-sm tracking-widest text-blue-secondary mb uppercase">{item.year}</h2>
        <h1 className="font-heading text-blue-primary text-xl font-bold">{item.title}</h1>
      </div>
      <div className="w-full h-36 absolute z-10 top-0 bg-gradient-to-b from-primary-rose to-transparent">
      </div>
      <div className="p-4 absolute z-10 bottom-0 opacity-0 duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        <p className="font-xs text-white">{item.desc}</p>
      </div>
    </Reveal>
  )
}

function DotDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-primary-rose" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary-rose" />
      <span className="h-px w-14 bg-primary-rose" />
    </div>
  );
}

export default function LoveStory() {
  return (
    <div className='relative'>
      <div className='w-full h-16 bg-flower'/>
      <section id="story" className="relative bg-[#FCECED] px-6 py-32 md:py-20 w-full flex flex-col justify-center items-center min-h-screen">
        <Reveal className="relative text-center mb-8">
          <h2 className={"font-serif mb-4 text-5xl font-semibold text-primary-rose " + fontSail} >
            Love Story
          </h2>
          <DotDivider />
          <p className='block lg:hidden mt-4 italic'>Ketuk untuk membaca</p>
        </Reveal>

        <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:flex-row gap-4 w-full md:w-4/5 max-w-screen-lg'>
          {
            config.loveStory.map((item, i) => (
              <CardItem
                key={item.title}
                year={item.year}
                title={item.title}
                desc={item.desc}
                img={item.img}
                delay={i*0.2}
                />
            ))
          }
        </div>
      </section>
      <div className='w-full h-16 bg-flower bg-bottom'/>
    </div>
  );
}
