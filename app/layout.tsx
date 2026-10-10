import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/great-vibes/400.css';
import './globals.css';
import { config } from '@/lib/data';

import {Plus_Jakarta_Sans} from "next/font/google"

export const metadata: Metadata = {
  title: `Undangan Pernikahan ${config.groom.name} & ${config.bride.name}`,
  description: `Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di pernikahan ${config.groom.name} & ${config.bride.name}.`,
  openGraph: {
    title: `Undangan Pernikahan ${config.groom.name} & ${config.bride.name}`,
    description: `Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di pernikahan ${config.groom.name} & ${config.bride.name}.`,
    images: ['/images/cover.jpg'],
  },
};

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={pjs.className}>
      <body className="antialiased text-primary-rose">{children}</body>
    </html>
  );
}
