'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { config } from '@/lib/data';
import Image from 'next/image';
import { fontSail } from './FontSail';

type CoverProps = {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
};

export function Cover2({ guestName, isOpen, onOpen }: CoverProps) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden bg-flower bg-cover bg-center"
        >
          <div className="mx-auto flex h-full w-full max-w-screen-md flex-col items-center justify-center gap-8 px-6 py-6 sm:gap-10 md:gap-12">
            
            {/* 1. Logo Atas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square w-20 shrink-0 sm:w-24 md:w-28"
            >
              <Image
                src="/images/Logo_1_500x500.svg"
                alt="Logo Pernikahan"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* 2. Card Tujuan */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl bg-white/40 p-6 shadow-lg backdrop-blur-md sm:max-w-md sm:gap-4 sm:p-8"
            >
              <p className="text-center text-xs font-bold tracking-widest text-primary-rose sm:text-sm">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>

              <p
                className={`line-clamp-2 py-1 text-center text-3xl font-semibold text-primary-rose sm:text-4xl md:text-5xl ${fontSail}`}
              >
                {guestName || 'Tamu Undangan'}
              </p>

              <p className="text-xs font-bold tracking-widest text-primary-rose sm:text-sm">
                di Tempat
              </p>

              <button
                type="button"
                onClick={onOpen}
                className="mt-2 inline-flex w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-primary-rose px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-primary-darkrose active:scale-95 sm:max-w-[240px]"
              >
                <Mail size={18} />
                Buka Undangan
              </button>
            </motion.div>

            {/* 3. Nama Pengantin Bawah */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className={`shrink-0 text-center text-3xl text-primary-rose sm:text-4xl md:text-5xl ${fontSail}`}
            >
              {config.groom.name} &amp; {config.bride.name}
            </motion.h1>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cover2;