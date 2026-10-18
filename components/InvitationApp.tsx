'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Cover2 } from './Cover';
import Hero from './Hero';
import CoupleInfo from './CoupleInfo';
import EventDetail from './EventDetail';
import BibleVerse from './BibleVerse';
import LoveStory from './LoveStory';
import Gallery from './Gallery';
import Guestbook from './Guestbook';
import Navbar from './Navbar';
import MusicToggle from './MusicToggle';
import Footer from './Footer';
import { fireConfetti } from './confetti';
import { prettifySlug } from '@/lib/slug';

export default function InvitationApp() {
  const searchParams = useSearchParams();
  const guestSlug = searchParams.get('to') ?? '';
  // Tampilan awal: kalau slug ada, tebak nama dari slug dulu ("jensen-sitompul"
  // -> "Jensen Sitompul") supaya tidak sempat kelihatan strip mentah, lalu
  // begitu nama asli dari database ketemu, akan ditimpa otomatis di bawah.
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
      .catch(() => {
        // Diamkan saja — nama hasil prettifySlug() di atas tetap dipakai sebagai fallback.
      });

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
          <main className="relative h-[100dvh] overflow-y-scroll scroll-smooth snap-y snap-mandatory">
            <div className="h-[100dvh] ">
              <CoupleInfo />
            </div>
            {/* <EventDetail /> */}
            <div className='min-h-[100dvh] '>
              <BibleVerse />
            </div>
            <div className='min-h-[100dvh]'>
              <LoveStory />
            </div>
            <div className='min-h-[100dvh] '>
              <Guestbook initialName={guestName} guestSlug={guestSlug} />
            </div>
            <div className='min-h-[100dvh] '>
              <Gallery />
              <Footer />
            </div>
          </main>
        </>
      )}
    </>
  );
}