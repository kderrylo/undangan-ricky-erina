'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { config } from '@/lib/data';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import BouquetOrnament from './BouquetOrnament';
import { fontSail } from './FontSail';

// Sesuaikan path ini dengan lokasi file 6.webp & 8.webp di dalam folder public/ kamu.
// Jika config.gallery berisi daftar foto, kamu juga bisa memakai config.gallery[5] & config.gallery[7]
const BRIDE_PHOTO = '/asset/galery/6.jpg    ';
const GROOM_PHOTO = '/asset/galery/8.jpg';

function DotDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-primary-rose/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-lilac-400" />
      <span className="h-px w-14 bg-primary-rose/60" />
    </div>
  );
}

export default function BrideAndGroom() {
  return (
    <section
      id="couple"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#FCECED]/70 to-lilac-50/60 px-6 pb-20 pt-5"
    >
      {/* Ornamen Bunga Latar (Lilac & Primary Rose) */}
      {/* <FloralOrnament className="pointer-events-none absolute top-6 -left-6 h-36 w-36 text-lilac-300 opacity-50 sm:h-52 sm:w-52" /> */}
      <FloralOrnament
        flip
        className="pointer-events-none absolute -right-6 bottom-6 h-36 w-36 text-primary-300 opacity-50 sm:h-52 sm:w-52"
      />
      <BouquetOrnament
        flip
        className="pointer-events-none absolute top-1 -right-12 h-44 w-44 text-lilac-200 opacity-40 sm:h-60 sm:w-60"
      />
      <BouquetOrnament className="pointer-events-none absolute bottom-1/2 -left-12 h-44 w-44 text-primary-200 opacity-40 sm:h-60 sm:w-60" />

      {/* Header Section */}
      {/* <Reveal className="relative z-10 mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-rose/80 sm:text-sm">
          The Happy Couple
        </p>
        <h2 className={`mt-2 mb-4 text-5xl text-primary-rose sm:text-6xl ${fontSail}`}>
          Bride &amp; Groom
        </h2>
        <DotDivider />
        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-primary-800/80 sm:text-sm">
          Kami mohon do'a & restunya atas pernikahan kami
        </p>
      </Reveal> */}

      {/* Grid Mempelai: Bride & Groom */}
      <div className="relative z-10 mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-11 md:gap-6">
        
        {/* Kartu Mempelai Wanita (Bride - 6.webp) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center md:col-span-5"
        >
          <div className="relative mb-6">
            {/* Bingkai Dekoratif Lilac-Rose */}
            <div className="absolute -inset-2 rounded-t-full rounded-b-3xl border border-lilac-300/70 bg-gradient-to-b from-lilac-100/40 to-primary-100/40 shadow-md" />
            <div className="relative aspect-[3/4] w-56 overflow-hidden rounded-t-full rounded-b-2xl bg-primary-50 shadow-xl ring-4 ring-white sm:w-64">
              <Image
                src={BRIDE_PHOTO}
                alt={config.bride.fullName}
                fill
                sizes="(min-width: 640px) 260px, 224px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Ornamen Bunga Kecil di Pojok Foto */}
            <Image
              src="/images/flo-ornament-2.webp"
              width={120}
              height={120}
              alt=""
              className="pointer-events-none absolute -right-5 -bottom-4 z-20 w-16 select-none object-contain animate-float "
            />
          </div>

          <span className="rounded-full bg-lilac-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-rose">
            The Bride
          </span>
          <h3 className={`mt-3 text-4xl leading-tight text-primary-rose sm:text-5xl ${fontSail}`}>
            {config.bride.fullName}
          </h3>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-primary-800/85 sm:text-sm">
            {config.bride.parents}
          </p>
        </motion.div>

        {/* Simbol "&" di Tengah */}
        <Reveal className="flex items-center justify-center md:col-span-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-lilac-200 bg-white/80 shadow-sm backdrop-blur-xs">
            <span className={`text-3xl text-primary-rose ${fontSail}`}>&amp;</span>
          </div>
        </Reveal>

        {/* Kartu Mempelai Pria (Groom - 8.webp) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center md:col-span-5"
        >
          <div className="relative mb-6">
            {/* Bingkai Dekoratif Lilac-Rose */}
            <div className="absolute -inset-2 rounded-t-full rounded-b-3xl border border-primary-300/70 bg-gradient-to-b from-primary-100/40 to-lilac-100/40 shadow-md" />
            <div className="relative aspect-[3/4] w-56 overflow-hidden rounded-t-full rounded-b-2xl bg-primary-50 shadow-xl ring-4 ring-white sm:w-64">
              <Image
                src={GROOM_PHOTO}
                alt={config.groom.fullName}
                fill
                sizes="(min-width: 640px) 260px, 224px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Ornamen Bunga Kecil di Pojok Foto */}
            <Image
              src="/images/flo-ornament-2.webp"
              width={120}
              height={120}
              alt=""
              className="pointer-events-none absolute -bottom-4 -left-5 z-20 w-16 -scale-x-100 select-none object-contain animate-float"
            />
          </div>

          <span className="rounded-full bg-primary-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-rose">
            The Groom
          </span>
          <h3 className={`mt-3 text-4xl leading-tight text-primary-rose sm:text-5xl ${fontSail}`}>
            {config.groom.fullName}
          </h3>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-primary-800/85 sm:text-sm">
            {config.groom.parents}
          </p>
        </motion.div>

      </div>
    </section>
  );
}