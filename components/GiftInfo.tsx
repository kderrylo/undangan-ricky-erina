'use client';

import { useState } from 'react';
import { Copy, Check, Home } from 'lucide-react';
import { config } from '@/lib/data';
import Reveal from './Reveal';

/**
 * Panel "Tanda Kasih" — dirender sebagai kolom kanan di dalam section gabungan
 * RSVP + Gift (lihat Guestbook.tsx). Komponen ini sengaja TIDAK punya <section>,
 * background, atau padding halaman sendiri, supaya bisa ditempel langsung di
 * dalam grid dua-kolom milik Guestbook.tsx.
 */
export default function GiftInfo() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard API unavailable; silently ignore
    }
  };

  return (
    <div id="gift" className="relative">
      <Reveal className="text-center lg:text-left">
        <h2 className="font-script text-4xl text-primary-800 dark:text-primary-100">
          Tanda Kasih
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-primary-600 dark:text-primary-300 lg:mx-0">
          Doa restu Anda adalah hadiah yang paling berarti bagi kami. Namun jika ingin memberi
          tanda kasih, dapat melalui:
        </p>
      </Reveal>

      <div className="mx-auto mt-8 max-w-md space-y-3 lg:mx-0">
        {config.gift.bank.map((b) => {
          const key = `${b.bank}-${b.number}`;
          return (
            <Reveal
              key={key}
              className="flex items-center justify-between rounded-2xl border border-primary-200 bg-white/80 p-4 dark:border-primary-800 dark:bg-primary-900/30"
            >
              <div>
                <p className="text-sm font-semibold text-primary-800 dark:text-primary-100">
                  {b.bank}
                </p>
                <p className="mt-0.5 font-mono text-base font-semibold text-primary-700 dark:text-primary-200">
                  {b.number}
                </p>
                <p className="text-xs text-primary-500 dark:text-primary-400">a.n. {b.name}</p>
              </div>
              <button
                onClick={() => copy(b.number, key)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-600 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-primary-700"
              >
                {copied === key ? <Check size={14} /> : <Copy size={14} />}
                {copied === key ? 'Tersalin' : 'Salin'}
              </button>
            </Reveal>
          );
        })}

        <Reveal className="flex items-start gap-3 rounded-2xl border border-primary-200 bg-white/80 p-4 dark:border-primary-800 dark:bg-primary-900/30">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-200">
            <Home size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-primary-800 dark:text-primary-100">
              Kirim Kado
            </p>
            <p className="text-sm text-primary-700 dark:text-primary-200">
              {config.gift.address.recipient}
            </p>
            <p className="text-xs text-primary-500 dark:text-primary-400">
              {config.gift.address.address}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}