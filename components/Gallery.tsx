'use client';

import { useRef, useState, PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { config } from '@/lib/data';
import Reveal from './Reveal';

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // State drag-to-scroll untuk mouse/trackpad (di HP, scroll sentuh sudah
  // berjalan native lewat overflow-x-auto, jadi tidak perlu ditangani manual).
  const dragRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { isDown: true, startX: e.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.isDown) return;
    const delta = e.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    track.scrollLeft = dragRef.current.startScrollLeft - delta;
  };

  const endDrag = () => {
    dragRef.current.isDown = false;
  };

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-gallery-card]');
    const gap = 16;
    const amount = (card?.offsetWidth ?? 240) + gap;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const openPreview = (src: string) => {
    // Jangan buka preview kalau klik ini sebenarnya akhir dari gestur drag/geser.
    if (dragRef.current.moved) return;
    setActive(src);
  };

  return (
    <section id="gallery" className="relative overflow-hidden bg-primary-900 px-6 pt-20 pb-5 dark:bg-primary-950">
      <Reveal className="text-center">
        <h2 className="font-script text-4xl text-white sm:text-5xl">Galeri</h2>
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-5xl">
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="scrollbar-hide flex cursor-grab select-none gap-4 overflow-x-auto px-1 pb-2 active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory', touchAction: 'pan-y' }}
        >
          {config.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.05} className="shrink-0">
              <button
                data-gallery-card
                type="button"
                onClick={() => openPreview(src)}
                style={{ scrollSnapAlign: 'center' }}
                className="relative block aspect-[4/5] w-[220px] overflow-hidden rounded-xl bg-primary-50 shadow-lg transition hover:opacity-90 sm:w-[280px]"
              >
                <Image
                  src={src}
                  alt={`Galeri ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 280px, 220px"
                  draggable={false}
                  className="pointer-events-none select-none object-cover"
                />
              </button>
            </Reveal>
          ))}
        </div>

        {/* Tombol navigasi, muncul dari sm ke atas */}
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Foto sebelumnya"
          className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-800 shadow-md transition hover:bg-white sm:flex"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Foto berikutnya"
          className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white/90 text-primary-800 shadow-md transition hover:bg-white sm:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="mt-5 text-center text-xs text-primary-200 sm:hidden">
        Geser untuk melihat foto lainnya →
      </p>

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
          <div
            className="relative h-[80vh] w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={active} alt="Preview" fill sizes="800px" className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}