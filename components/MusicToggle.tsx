'use client';

import { useEffect, useRef, useState } from 'react';
import { Music, Pause } from 'lucide-react';
import { config } from '@/lib/data';

export default function MusicToggle({ autoPlay }: { autoPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false)); // browser may block autoplay without gesture
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={config.music} loop />
      <button
        onClick={toggle}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
        className={`fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 bg-white/90 text-primary-600 shadow-lg backdrop-blur transition dark:border-primary-800 dark:bg-primary-950/90 dark:text-primary-300 ${
          playing ? 'animate-pulse' : ''
        }`}
      >
        {playing ? <Pause size={18} /> : <Music size={18} />}
      </button>
    </>
  );
}
