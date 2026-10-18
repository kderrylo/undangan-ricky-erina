'use client';

import { motion } from 'framer-motion';
import { config } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';
import Image from 'next/image';

type CardItemProps = {
  title: string;
  year: string;
  desc: string;
  img: string;
  index: number;
};

const CardItem = ({ title, year, desc, img, index }: CardItemProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
      className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-lg"
    >
      {/* Container Gambar */}
      <div className="relative aspect-[9/10] w-full overflow-hidden lg:aspect-[3/4]">
        <Image
          alt={title}
          src={img}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out lg:group-hover:scale-105"
        />

        {/* Gradient Atas untuk Tahun & Judul */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-primary-rose/90 via-primary-rose/40 to-transparent" />

        {/* Gradient Bawah pengganti brightness-50 (100% GPU Accelerated, anti-lag di HP low-end) */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-90 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100" />
      </div>

      {/* Header Kartu (Tahun & Judul) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-5 text-white">
        <p className="font-heading text-xs font-semibold tracking-widest uppercase opacity-90">
          {year}
        </p>
        <h3 className="font-heading mt-0.5 text-xl font-bold leading-snug drop-shadow-xs">
          {title}
        </h3>
      </div>

      {/* Deskripsi Cerita:
          - Mobile/Tablet: Otomatis fade-in & slide-up saat kartu terlihat di layar (tanpa perlu tap)
          - Desktop (lg): Muncul saat di-hover */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{
          duration: 0.55,
          delay: 0.18 + index * 0.08,
          ease: 'easeOut',
        }}
        className="absolute inset-x-0 bottom-0 z-20 p-5 lg:translate-y-3 lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
      >
        <p className="text-xs leading-relaxed text-white/95 sm:text-sm">
          {desc}
        </p>
      </motion.div>
    </motion.article>
  );
};

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
    <div className="relative">
      <div className="h-16 w-full bg-flower" />
      <section
        id="story"
        className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#FCECED] px-6 py-20"
      >
        <Reveal className="relative mb-10 text-center">
          <h2 className={`mb-4 font-serif text-5xl font-semibold text-primary-rose ${fontSail}`}>
            Love Story
          </h2>
          <DotDivider />
        </Reveal>

        <div className="relative grid w-full max-w-screen-lg grid-cols-1 gap-6 md:w-11/12 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {config.loveStory.map((item, i) => (
            <CardItem
              key={item.title}
              index={i}
              year={item.year}
              title={item.title}
              desc={item.desc}
              img={item.img}
            />
          ))}
        </div>
      </section>
      <div className="h-16 w-full bg-flower bg-bottom" />
    </div>
  );
}