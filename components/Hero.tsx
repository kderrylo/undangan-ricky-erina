'use client';

import Image from 'next/image';
import { config } from '@/lib/data';
import Countdown from './Countdown';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import BouquetOrnament from './BouquetOrnament';
import { fontSail } from './FontSail';

type HeroProps = {
  guestName?: string;
};

export default function Hero({ guestName }: HeroProps) {
  const displayGuestName = guestName?.trim() || 'Tamu Undangan';

  return (
    <section
      id="home"
      className="relative flex h-[100dvh] w-full flex-col items-center justify-between overflow-hidden bg-flower bg-cover bg-center px-4 pt-6 pb-24 text-center sm:px-6 sm:pt-8 sm:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/55 via-[#FCECED]/85 to-lilac-100/75" />

      {/* Ornamen Bunga Sudut (Lilac & Rose Tone) */}
      <FloralOrnament className="pointer-events-none absolute -top-8 -left-8 z-10 h-36 w-36 animate-float text-primary-rose opacity-55 sm:h-52 sm:w-52" />
      <FloralOrnament
        flip
        className="pointer-events-none absolute -right-8 -bottom-8 z-10 h-36 w-36 animate-float text-lilac-400 opacity-60 sm:h-52 sm:w-52"
      />
      <BouquetOrnament
        flip
        className="pointer-events-none absolute -top-10 -right-10 z-10 h-40 w-40 text-lilac-300 opacity-50 sm:h-56 sm:w-56"
      />
      <BouquetOrnament className="pointer-events-none absolute -bottom-10 -left-10 z-10 h-40 w-40 text-primary-300 opacity-50 sm:h-56 sm:w-56" />

      {/* Kontainer Utama */}
      <div className="relative z-20 flex h-full w-full max-w-2xl flex-col items-center justify-evenly">
        
        {/* 1. Monogram / Logo Atas */}
        <Reveal>
          <div className="relative aspect-square w-16 shrink-0 sm:w-20 md:w-24">
            <Image
              src="/images/Logo_1_500x500.svg"
              alt="Monogram"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Reveal>

        {/* 2. Judul, Nama Pengantin & Tanggal */}
        <div className="flex flex-col items-center">
          <Reveal delay={0.1}>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary-rose sm:text-xs md:text-sm">
              The Wedding Of
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1
              className={`mt-2 text-4xl leading-tight text-primary-rose sm:mt-3 sm:text-6xl md:text-7xl ${fontSail}`}
            >
              {config.groom.name} &amp; {config.bride.name}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="my-2.5 flex items-center justify-center gap-3 sm:my-3.5">
              <span className="h-px w-10 bg-primary-rose/50 sm:w-16" />
              <span className="h-1.5 w-1.5 rounded-full bg-lilac-400" />
              <span className="h-px w-10 bg-primary-rose/50 sm:w-16" />
            </div>
            <p className="font-serif text-sm font-semibold tracking-wide text-primary-800 sm:text-base md:text-lg">
              {new Date(config.weddingDate).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </Reveal>
        </div>

        {/* 3. Countdown */}
        <Reveal delay={0.4} className="w-full scale-90 sm:scale-100">
          <Countdown target={config.weddingDate} />
        </Reveal>

        {/* 4. Box Kepada / Nama Tamu Undangan */}
        <Reveal
          delay={0.5}
          className="relative w-full max-w-xs rounded-2xl border border-white/80 bg-white/75 px-6 py-3 shadow-sm backdrop-blur-xs sm:max-w-sm sm:py-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-700 sm:text-xs">
            Kepada:
          </p>
          <p
            className={`mt-1 line-clamp-2 text-2xl font-semibold text-primary-rose sm:text-3xl ${fontSail}`}
          >
            {displayGuestName}
          </p>
        </Reveal>

      </div>
    </section>
  );
}