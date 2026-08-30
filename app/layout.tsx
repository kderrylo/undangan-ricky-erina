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

export const metadata: Metadata = {
  title: `Undangan Pernikahan ${config.groom.name} & ${config.bride.name}`,
  description: `Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di pernikahan ${config.groom.name} & ${config.bride.name}.`,
  openGraph: {
    title: `Undangan Pernikahan ${config.groom.name} & ${config.bride.name}`,
    description: `Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di pernikahan ${config.groom.name} & ${config.bride.name}.`,
    images: ['/images/cover.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
