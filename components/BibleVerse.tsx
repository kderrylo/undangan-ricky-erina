'use client';

import Image from 'next/image';
import { config } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';

type BibleVerseProps = {
  verseIndex?: number;
  showImage?: boolean;
};

export default function BibleVerse({
  verseIndex = 0,
  showImage = true,
}: BibleVerseProps) {
  const verse = config.bibleVerses[verseIndex] ?? config.bibleVerses[0];

  if (!verse) return null;

  return (
    <div className="relative overflow-hidden bg-white">
      <section
        id={verseIndex === 0 ? 'firman' : 'firman-penutup'}
        className={`relative flex w-full flex-col-reverse items-center justify-center gap-10 bg-white px-6 py-20 md:flex-row md:gap-16 md:px-24 lg:px-32 ${
          showImage ? 'min-h-[85dvh] md:min-h-screen' : 'min-h-[60dvh] py-24'
        }`}
      >
        <Reveal
          className={`relative z-10 max-w-xl text-center ${
            showImage ? 'md:text-right' : 'mx-auto max-w-2xl'
          }`}
        >
          {/* Tanda Kutip Dekoratif (Seragam di BibleVerse 1 & 2) */}
          <span
            className={`mb-2 block select-none text-5xl leading-none text-primary-rose/35 md:text-6xl ${fontSail}`}
          >
            &ldquo;
          </span>

          {/* Teks Ayat */}
          <p className="text-base italic leading-relaxed text-primary-rose sm:text-lg md:text-xl">
            {verse.text}
          </p>

          {/* Garis Pembatas Kecil */}
          <div
            className={`my-4 flex items-center justify-center gap-3 ${
              showImage ? 'md:justify-end' : 'justify-center'
            }`}
          >
            <span className="h-px w-12 bg-primary-rose/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-lilac-400" />
            <span
              className={`h-px w-12 bg-primary-rose/40 ${
                showImage ? 'md:hidden' : 'block'
              }`}
            />
          </div>

          {/* Referensi Kitab */}
          <p className="text-base font-semibold tracking-wide text-primary-rose sm:text-lg">
            {verse.reference}
          </p>
        </Reveal>

        {/* Gambar hanya dirender pada BibleVerse1 (showImage = true) */}
        {showImage && (
          <Image
            src="/images/img-verse.webp"
            width={1080}
            height={1080}
            alt="Ilustrasi Ayat"
            className="w-3/5 max-w-[280px] object-contain sm:w-1/2 md:w-[32%] md:max-w-sm"
          />
        )}
      </section>

      {/* Ornamen Bunga Melayang yang Sama (Di Kiri untuk Verse 1, Di Kanan untuk Verse 2) */}
      <Image
        src="/images/flo-ornament-1.webp"
        width={400}
        height={400}
        alt=""
        className={`pointer-events-none absolute bottom-12 z-10 hidden w-28 select-none object-contain animate-float md:block ${
          showImage ? 'left-16' : 'right-16 -scale-x-100'
        }`}
      />
    </div>
  );
}

// Ayat Pertama (Pembuka): Pakai Gambar
export function BibleVerse1() {
  return <BibleVerse verseIndex={0} showImage={true} />;
}

// Ayat Kedua (Penutup): Desain Sama Persis, Tanpa Gambar
export function BibleVerse2() {
  return <BibleVerse verseIndex={1} showImage={false} />;
}