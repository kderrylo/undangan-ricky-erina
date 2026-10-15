'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { config } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';

function DotDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-white/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      <span className="h-px w-14 bg-white/70" />
    </div>
  );
}

const AUTOPLAY_INTERVAL = 4200;
const SWIPE_THRESHOLD = 40;

export default function Gallery() {
  const photos = config.gallery;
  const total = photos.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Ref untuk melacak apakah user benar-benar menggeser (drag) atau hanya klik (tap)
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || activePreview || total <= 1) return;
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, activePreview, nextSlide, total]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    setIsPaused(true);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      nextSlide();
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      prevSlide();
    }
    setIsPaused(false);
    // Reset flag drag segera setelah frame selesai
    requestAnimationFrame(() => {
      isDraggingRef.current = false;
    });
  };

  const getCardOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-primary-rose px-4 pt-16 pb-12 select-none"
    >
      <Reveal className="flex flex-col items-center">
        <h2 className={`mb-3 font-script text-5xl text-white sm:text-6xl ${fontSail}`}>
          Galeri
        </h2>
        <DotDivider />
      </Reveal>

      <Reveal className="relative mx-auto mt-10 max-w-4xl">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative flex h-[360px] w-full items-center justify-center overflow-visible sm:h-[440px]"
        >
          {photos.map((src, index) => {
            const offset = getCardOffset(index);
            const isCenter = offset === 0;
            const isAdjacent = Math.abs(offset) === 1;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible && Math.abs(offset) > 2) return null;

            return (
              <motion.div
                key={src}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onPointerDown={(e) => {
                  pointerStartRef.current = { x: e.clientX, y: e.clientY };
                }}
                onPointerUp={(e) => {
                  if (!pointerStartRef.current) return;
                  const dx = Math.abs(e.clientX - pointerStartRef.current.x);
                  const dy = Math.abs(e.clientY - pointerStartRef.current.y);
                  pointerStartRef.current = null;

                  // Jika pergerakan jari/mouse kurang dari 8px, anggap sebagai KLIK INSTAN
                  if (dx < 8 && dy < 8 && !isDraggingRef.current) {
                    if (isCenter) {
                      setActivePreview(src);
                    } else if (offset === -1) {
                      prevSlide();
                    } else if (offset === 1) {
                      nextSlide();
                    }
                  }
                }}
                initial={false}
                animate={{
                  x: `${offset * 78}%`,
                  scale: isCenter ? 1 : isAdjacent ? 0.82 : 0.65,
                  opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                  zIndex: isCenter ? 20 : isAdjacent ? 10 : 0,
                  rotateY: isCenter ? 0 : offset * -8,
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformPerspective: 1000,
                  willChange: 'transform, opacity',
                }}
                className={`absolute aspect-[4/5] w-[240px] overflow-hidden rounded-2xl bg-primary-50 shadow-2xl ring-1 ring-white/25 sm:w-[310px] ${
                  isCenter ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                }`}
              >
                <Image
                  src={src}
                  alt={`Galeri ${index + 1}`}
                  fill
                  // Disamakan ukurannya (640px) dengan preview agar browser langsung memakai gambar dari cache memori tanpa download ulang!
                  sizes="640px"
                  priority={isCenter || isAdjacent}
                  draggable={false}
                  className="pointer-events-none object-cover"
                />

                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isCenter
                      ? 'bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100'
                      : 'bg-primary-darkrose/30 opacity-100'
                  }`}
                />
              </motion.div>
            );
          })}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Foto sebelumnya"
            className="absolute left-2 z-30 hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/90 text-primary-rose shadow-lg transition duration-200 hover:scale-105 hover:bg-white active:scale-95 sm:left-6 sm:flex"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Foto berikutnya"
            className="absolute right-2 z-30 hidden h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/90 text-primary-rose shadow-lg transition duration-200 hover:scale-105 hover:bg-white active:scale-95 sm:right-6 sm:flex"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {photos.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Lihat foto ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-7 bg-white shadow-xs'
                    : 'w-1.5 bg-white/35 hover:bg-white/60'
                }`}
              />
            );
          })}
        </div>
      </Reveal>

      {/* Lightbox Modal Instan & Ringan */}
      <AnimatePresence>
        {activePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
            onClick={() => setActivePreview(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 z-10 rounded-full bg-white/15 p-2.5 text-white transition hover:bg-white/25 active:scale-95"
              onClick={() => setActivePreview(null)}
              aria-label="Tutup"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[82vh] w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activePreview}
                alt="Preview"
                fill
                // Menggunakan sizes="640px" yang sama persis dengan kartu di carousel
                // sehingga gambar langsung diambil dari memory cache browser dalam 0ms!
                sizes="640px"
                priority
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}