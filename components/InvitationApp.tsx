'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Cover from './Cover';
import Hero from './Hero';
import CoupleInfo from './CoupleInfo';
import EventDetail from './EventDetail';
import LoveStory from './LoveStory';
import Gallery from './Gallery';
import GiftInfo from './GiftInfo';
import Guestbook from './Guestbook';
import Navbar from './Navbar';
import MusicToggle from './MusicToggle';
import Footer from './Footer';
import { fireConfetti } from './confetti';

export default function InvitationApp() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') ?? '';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', !isOpen);
  }, [isOpen]);

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
            <LoveStory />
            <Gallery />
            <GiftInfo />
            <Guestbook initialName={guestName} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
