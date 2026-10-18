'use client';

import { useEffect, useRef, useState } from 'react';
import { Music, Pause } from 'lucide-react';
import { config } from '@/lib/data';

export default function MusicToggle({ autoPlay }: { autoPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Menyimpan preferensi user: jika user sengaja klik tombol pause,
  // jangan nyalakan musik otomatis saat user kembali ke tab ini.
  const userPausedRef = useRef(false);

  // 1. Handle AutoPlay saat undangan pertama kali dibuka
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !autoPlay) return;

    audio
      .play()
      .then(() => {
        setPlaying(true);
        userPausedRef.current = false;
      })
      .catch(() => {
        setPlaying(false);
      });
  }, [autoPlay]);

  // 2. Handle Auto-Pause saat pindah tab / minimize & Auto-Resume saat kembali
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const pauseTemporarily = () => {
      if (!audio.paused) {
        audio.pause();
        setPlaying(false);
      }
    };

    const resumeIfAllowed = () => {
      // Hanya putar kembali jika sebelumnya TIDAK di-pause manual oleh user
      if (!userPausedRef.current && document.visibilityState === 'visible') {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        pauseTemporarily();
      } else {
        resumeIfAllowed();
      }
    };

    // Event standar untuk Desktop & Mobile saat pindah tab atau lock screen
    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Fallback tambahan untuk iOS Safari & In-App Browser (WA/IG) saat keluar aplikasi
    window.addEventListener('pagehide', pauseTemporarily);
    window.addEventListener('blur', pauseTemporarily);
    window.addEventListener('focus', resumeIfAllowed);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', pauseTemporarily);
      window.removeEventListener('blur', pauseTemporarily);
      window.removeEventListener('focus', resumeIfAllowed);
    };
  }, []);

  // 3. Handle klik tombol manual oleh user
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      userPausedRef.current = true; // Tandai bahwa user sengaja mematikan musik
      audio.pause();
      setPlaying(false);
    } else {
      userPausedRef.current = false; // User mengizinkan musik berputar kembali
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={config.music} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
        className={`fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary-200 bg-white/90 text-primary-600 shadow-lg backdrop-blur transition ${
          playing ? 'animate-pulse' : ''
        }`}
      >
        {playing ? <Pause size={18} /> : <Music size={18} />}
      </button>
    </>
  );
}