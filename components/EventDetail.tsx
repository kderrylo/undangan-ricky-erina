'use client';

import Image from 'next/image';
import { CalendarPlus, MapPin, Clock, Calendar } from 'lucide-react';
import { config, EventConfig } from '@/lib/data';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import BouquetOrnament from './BouquetOrnament';
import ChurchOrnament from './ChurchOrnament';
import { fontSail } from './FontSail';

function googleCalendarUrl(event: EventConfig) {
  const title = encodeURIComponent(`${event.name} - ${config.groom.name} & ${config.bride.name}`);
  const details = encodeURIComponent(`${event.location}, ${event.address}`);
  const location = encodeURIComponent(event.address);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
}

function DotDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-primary-rose/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-lilac-400" />
      <span className="h-px w-14 bg-primary-rose/60" />
    </div>
  );
}

export default function EventDetail() {
  const event = config.events[0];

  return (
    <section
      id="event"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#FCECED] px-6 py-20"
    >
      {/* Ornamen Bunga Sudut (Lilac & Primary Rose) */}
      <FloralOrnament className="pointer-events-none absolute -top-8 -left-8 h-40 w-40 text-primary-300 opacity-55 sm:h-56 sm:w-56" />
      <FloralOrnament
        flip
        className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 text-lilac-300 opacity-60 sm:h-56 sm:w-56"
      />
      <BouquetOrnament
        flip
        className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 text-lilac-300 opacity-45 sm:h-60 sm:w-60"
      />
      <BouquetOrnament className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 text-primary-300 opacity-45 sm:h-60 sm:w-60" />

      {/* Judul Section */}
      <Reveal className="relative z-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary-rose/80 sm:text-sm">
          Save The Date
        </p>
        <h2 className={`mt-2 mb-4 text-5xl text-primary-rose sm:text-6xl ${fontSail}`}>
          Rangkaian Acara
        </h2>
        <DotDivider />
      </Reveal>

      {/* Card Utama Sakramen Perkawinan */}
      <Reveal className="relative z-10 mx-auto mt-10 w-full max-w-lg">
        <div className="relative overflow-hidden rounded-3xl border border-lilac-200/80 bg-white/85 p-8 text-center shadow-xl backdrop-blur-md sm:p-10">
          {/* Gradasi halus Lilac di bagian atas dalam Card */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-lilac-100/50 via-[#FCECED]/30 to-transparent" />

          {/* Ornamen Gereja */}
          <ChurchOrnament className="pointer-events-none relative mx-auto h-20 w-20 text-primary-rose opacity-75" />

          {/* Ornamen Bunga di Pojok Card (Berada di belakang tombol dengan z-0) */}
          <Image
            src="/images/flo-ornament-2.webp"
            width={200}
            height={200}
            alt=""
            className="pointer-events-none absolute right-3 bottom-3 z-0 w-20 select-none object-contain opacity-65 animate-float sm:w-24"
          />

          <div className="relative z-10 mt-4">
            <h3 className={`text-4xl text-primary-rose sm:text-5xl ${fontSail}`}>
              {event.name || 'Sakramen Perkawinan'}
            </h3>

            {/* Box Tanggal & Waktu */}
            <div className="mx-auto mt-6 flex flex-col items-center justify-center gap-2 rounded-2xl border border-lilac-200/60 bg-lilac-50/40 px-5 py-3.5 text-primary-800 sm:flex-row sm:gap-6">
              <span className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
                <Calendar size={16} className="text-primary-rose" />
                {event.date}
              </span>
              <span className="hidden h-4 w-px bg-lilac-300 sm:block" />
              <span className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
                <Clock size={16} className="text-primary-rose" />
                {event.time}
              </span>
            </div>

            {/* Detail Lokasi Gereja */}
            <p className="mt-6 text-base font-bold text-primary-900">
              {event.location}
            </p>
            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-primary-700 sm:text-sm">
              {event.address}
            </p>

            {/* Tombol Aksi (z-20 & bg-white pada tombol kedua agar tidak tertimpa bunga) */}
            <div className="relative z-20 mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-rose px-6 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-primary-darkrose active:scale-95 sm:text-sm"
              >
                <MapPin size={16} />
                Buka di Google Map
              </a>
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-rose bg-white px-6 py-3 text-xs font-semibold text-primary-rose shadow-xs transition hover:bg-primary-50 active:scale-95 sm:text-sm"
              >
                <CalendarPlus size={16} />
                Tambahkan ke Kalender
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}