'use client';

import { useEffect, useState } from 'react';

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const items = [
    { label: 'Hari', value: time.days },
    { label: 'Jam', value: time.hours },
    { label: 'Menit', value: time.minutes },
    { label: 'Detik', value: time.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/80 dark:bg-primary-900/60 shadow-md border border-primary-200/60"
        >
          <span className="text-xl sm:text-2xl font-serif font-semibold text-primary-700 dark:text-primary-100">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wide text-primary-500 dark:text-primary-200">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
