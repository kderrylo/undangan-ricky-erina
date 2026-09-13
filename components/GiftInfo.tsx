'use client';

import { useState } from 'react';
import { Copy, Check, Gift, Home } from 'lucide-react';
import { config } from '@/lib/data';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import SectionDivider from './SectionDivider';

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
    <section id="gift" className="relative overflow-hidden bg-primary-50 px-6 py-20 dark:bg-ink">
      <FloralOrnament flip className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 text-lilac-200 opacity-50 sm:h-44 sm:w-44" />

      <Reveal className="relative text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Tanda Kasih</p>
        <h2 className="mt-3 flex items-center justify-center gap-2 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          <Gift size={26} /> Amplop Digital
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-primary-600 dark:text-primary-300">
          Doa restu Anda adalah hadiah yang paling berarti bagi kami. Namun jika ingin memberi
          tanda kasih, dapat melalui:
        </p>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="mx-auto mt-10 max-w-md space-y-4">
        {config.gift.bank.map((b) => {
          const key = `${b.bank}-${b.number}`;
          return (
            <Reveal
              key={key}
              className="flex items-center justify-between rounded-xl border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/30"
            >
              <div>
                <p className="text-sm font-semibold text-primary-800 dark:text-primary-100">{b.bank}</p>
                <p className="font-mono text-sm text-primary-700 dark:text-primary-200">{b.number}</p>
                <p className="text-xs text-primary-500 dark:text-primary-400">a.n. {b.name}</p>
              </div>
              <button
                onClick={() => copy(b.number, key)}
                className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-primary-700"
              >
                {copied === key ? <Check size={14} /> : <Copy size={14} />}
                {copied === key ? 'Tersalin' : 'Salin'}
              </button>
            </Reveal>
          );
        })}

        <Reveal className="flex items-start gap-3 rounded-xl border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/30">
          <Home size={18} className="mt-1 shrink-0 text-primary-600" />
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
    </section>
  );
}
