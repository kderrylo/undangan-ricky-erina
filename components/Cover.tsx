'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { config } from '@/lib/data';
import FloralOrnament from './FloralOrnament';
import BouquetOrnament from './BouquetOrnament';
import Monogram from './Monogram';

export default function Cover({
  guestName,
  isOpen,
  onOpen,
}: {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-batik bg-primary-50 dark:bg-ink px-6 text-center"
        >
          <FloralOrnament className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 text-primary-400 opacity-70 sm:h-52 sm:w-52" />
          <FloralOrnament flip className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 text-lilac-400 opacity-70 sm:h-52 sm:w-52" />
          <BouquetOrnament className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 text-primary-400 opacity-60 sm:h-60 sm:w-60" />
          <BouquetOrnament flip className="pointer-events-none absolute -left-8 -bottom-10 h-44 w-44 text-lilac-400 opacity-60 sm:h-60 sm:w-60" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.6 }}
          >
            <Monogram className="h-20 w-16 sm:h-24 sm:w-[76px]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-sm uppercase tracking-[0.3em] text-primary-600"
          >
            The Wedding Of
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-4 font-script text-6xl sm:text-7xl text-primary-800 dark:text-primary-100"
          >
            {config.groom.name} &amp; {config.bride.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 w-full max-w-sm rounded-2xl border border-primary-200 bg-white/70 dark:bg-primary-900/40 p-6 shadow-xl backdrop-blur"
          >
            <p className="text-sm text-primary-700 dark:text-primary-200">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="mt-2 font-serif text-xl font-semibold text-primary-800 dark:text-primary-100">
              {guestName || 'Tamu Undangan'}
            </p>

            <button
              onClick={onOpen}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-primary-700 active:scale-95"
            >
              <Mail size={18} />
              Buka Undangan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
