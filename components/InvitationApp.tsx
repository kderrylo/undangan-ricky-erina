'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cover2 } from './Cover';
import Hero from './Hero';
import BibleVerse from './BibleVerse';
import BrideAndGroom from './BrideAndGroom';
import EventDetail from './EventDetail';
import LoveStory from './LoveStory';
import Gallery from './Gallery';
import Guestbook from './Guestbook';
import Navbar from './Navbar';
import MusicToggle from './MusicToggle';
import Footer from './Footer';
import { fireConfetti } from './confetti';
import { prettifySlug } from '@/lib/slug';

function SectionTransition({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function InvitationApp() {
  const searchParams = useSearchParams();
  const guestSlug = searchParams.get('to') ?? '';
  const [guestName, setGuestName] = useState(guestSlug ? prettifySlug(guestSlug) : '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', !isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!guestSlug) return;
    let cancelled = false;

    fetch(`/api/guests/lookup?slug=${encodeURIComponent(guestSlug)}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json?.data?.name) {
          setGuestName(json.data.name);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [guestSlug]);

  const handleOpen = () => {
    setIsOpen(true);
    fireConfetti();
  };

  return (
    <>
      <Cover2 guestName={guestName} isOpen={isOpen} onOpen={handleOpen} />

      {/* Landscape Blocker khusus Mobile */}
      <div className="fixed inset-0 z-[100] hidden flex-col items-center justify-center bg-primary-rose px-6 text-center text-white [@media(max-height:500px)_and_(orientation:landscape)]:flex">
        <div className="mb-3 flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-white/15 backdrop-blur-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>
        <p className="font-serif text-lg font-semibold tracking-wide">
          Mohon Putar Kembali Layar Anda
        </p>
        <p className="mt-1 max-w-xs text-xs text-white/80">
          Untuk pengalaman visual terbaik, silakan buka undangan ini dalam mode potret (vertikal).
        </p>
      </div>

      {isOpen && (
        <>
          <MusicToggle autoPlay />
          <Navbar />
          {/* Gunakan overflow-x-clip (bukan overflow-x-hidden atau overflow-y-scroll) agar hanya ada 1 scrollbar utama milik browser */}
          <main className="relative w-full overflow-x-clip">
            <Hero guestName={guestName} />

            <SectionTransition>
              <BibleVerse />
            </SectionTransition>

            <SectionTransition>
              <BrideAndGroom />
            </SectionTransition>

            <SectionTransition>
              <EventDetail />
            </SectionTransition>

            <SectionTransition>
              <LoveStory />
            </SectionTransition>

            <SectionTransition>
              <Guestbook initialName={guestName} guestSlug={guestSlug} />
            </SectionTransition>

            <SectionTransition>
              <Gallery />
              <Footer />
            </SectionTransition>
          </main>
        </>
      )}
    </>
  );
}