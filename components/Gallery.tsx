'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { config } from '@/lib/data';
import Reveal from './Reveal';
import SectionDivider from './SectionDivider';

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden bg-white px-6 py-20 dark:bg-primary-950/20">
      <Reveal className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Momen</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          Galeri Foto
        </h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
        {config.gallery.map((src, i) => (
          <Reveal key={src} delay={i * 0.08}>
            <button
              onClick={() => setActive(src)}
              className="relative block aspect-square w-full overflow-hidden rounded-xl shadow-md transition hover:opacity-90"
            >
              <Image src={src} alt={`Galeri ${i + 1}`} fill sizes="300px" className="object-cover" />
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-6 top-6 text-white"
            onClick={() => setActive(null)}
            aria-label="Tutup"
          >
            <X size={28} />
          </button>
          <div className="relative h-[80vh] w-full max-w-2xl">
            <Image src={active} alt="Preview" fill sizes="800px" className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
