'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Cover from './Cover';
import Hero from './Hero';
import CoupleInfo from './CoupleInfo';
import EventDetail from './EventDetail';
import BibleVerse from './BibleVerse';
import LoveStory from './LoveStory';
import Gallery from './Gallery';
import GiftInfo from './GiftInfo';
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
      <Cover guestName={guestName} isOpen={isOpen} onOpen={handleOpen} />

      {isOpen && (
        <>
          <MusicToggle autoPlay />
          <Navbar />
          <main>
            <Hero />
            <CoupleInfo />
            <EventDetail />
            <BibleVerse />
            <LoveStory />
            <Gallery />
            <GiftInfo />
            <Guestbook initialName={guestName} guestSlug={guestSlug} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
