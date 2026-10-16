import Image from 'next/image';
import { config, EventConfig } from '@/lib/data';
import Reveal from './Reveal';
import { fontSail } from './FontSail';
import { Calendar, Clock3 } from 'lucide-react';

function googleCalendarUrl(event: EventConfig) {
  const title = encodeURIComponent(`${event.name} - ${config.groom.name} & ${config.bride.name}`);
  const details = encodeURIComponent(`${event.location}, ${event.address}`);
  const location = encodeURIComponent(event.address);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
}

function AmpDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-current opacity-40 md:w-16" />
      <span className={`text-2xl leading-none md:text-3xl ${fontSail}`}>&amp;</span>
      <span className="h-px w-10 bg-current opacity-40 md:w-16" />
    </div>
  );
}

function EventMeta({ event, className = '' }: { event: EventConfig; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs md:gap-x-5 md:text-sm ${className}`}>
      <span className="flex items-center gap-1.5">
        <Calendar size={15} />
        {event.date}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock3 size={15} />
        {event.time}
      </span>
    </div>
  );
}

export default function CoupleInfo() {
  const event = config.events[0];
  const coupleAlt = `${config.groom.fullName} & ${config.bride.fullName}`;

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden lg:h-[100dvh]">
      <section id="couple" className="relative h-full min-h-[100dvh] w-full bg-white">
        {/* Gunakan lg:grid-cols-2 agar HP landscape tidak dianggap Desktop */}
        <div className="relative h-full min-h-[100dvh] w-full overflow-hidden lg:grid lg:grid-cols-2">
          
          {/* ===== Mobile & Tablet Portrait: Fit 1 Layar Penuh (100dvh) ===== */}
          <div className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden px-5 pt-10 pb-24 text-center text-white lg:hidden">
            <Image
              src={config.couplePhoto}
              alt={coupleAlt}
              fill
              sizes="100vw"
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-darkrose/65 via-primary-darkrose/45 to-primary-darkrose/80" />

            <Reveal className="relative z-10 my-auto flex w-full flex-col items-center justify-evenly gap-4">
              {/* Bagian Mempelai */}
              <div className="flex flex-col items-center">
                <h3 className={`text-3xl leading-tight sm:text-4xl ${fontSail}`}>
                  {config.groom.fullName}
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-snug text-white/90 sm:text-sm">
                  {config.groom.parents}
                </p>

                <AmpDivider className="my-2 text-white/80" />

                <h3 className={`text-3xl leading-tight sm:text-4xl ${fontSail}`}>
                  {config.bride.fullName}
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-snug text-white/90 sm:text-sm">
                  {config.bride.parents}
                </p>
              </div>

              {/* Bagian Acara & Lokasi */}
              <div className="flex flex-col items-center">
                <p className={`text-2xl sm:text-3xl ${fontSail}`}>Sakramen Perkawinan</p>
                <p className="mt-1 text-sm font-semibold">{event.location}</p>
                <p className="mt-0.5 max-w-xs text-xs leading-snug text-white/90">
                  {event.address}
                </p>
                <EventMeta event={event} className="mt-2.5" />
              </div>

              {/* Bagian Tombol Aksi */}
              <div className="flex w-full max-w-xs flex-col gap-2">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white py-2 text-xs font-semibold text-primary-rose shadow transition hover:bg-primary-50 active:scale-95"
                >
                  Buka di Google Map
                </a>
                <a
                  href={googleCalendarUrl(event)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/80 bg-black/15 py-2 text-xs font-semibold text-white backdrop-blur-xs transition hover:bg-white/10 active:scale-95"
                >
                  Tambahkan ke Kalender
                </a>
              </div>
            </Reveal>
          </div>

          {/* ===== Desktop (>= 1024px): Foto di Kiri, Info Acara di Kanan ===== */}
          <div className="relative hidden h-full min-h-[100dvh] bg-primary-50 lg:block">
            <Image
              src={config.couplePhoto}
              alt={coupleAlt}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div className="relative hidden h-full min-h-[100dvh] flex-col items-center justify-center bg-white px-8 py-8 text-center lg:flex">
            <Image
              src="/images/flo-ornament-2.webp"
              width={1080}
              height={1}
              alt="verse-img"
              className="pointer-events-none absolute right-12 bottom-12 z-0 hidden w-28 select-none object-contain animate-float lg:block"
            />

            <Reveal className="relative z-10 flex flex-col items-center justify-center">
              <h3 className={`text-4xl xl:text-5xl ${fontSail}`}>
                {config.groom.fullName}
              </h3>
              <p className="mt-2 max-w-prose text-sm">
                {config.groom.parents}
              </p>

              <AmpDivider className="my-3" />

              <h3 className={`text-4xl xl:text-5xl ${fontSail}`}>
                {config.bride.fullName}
              </h3>
              <p className="mt-2 max-w-prose text-sm">
                {config.bride.parents}
              </p>

              <p className={`mt-8 text-3xl ${fontSail}`}>
                Sakramen Perkawinan
              </p>
              <p className="mt-2 font-semibold">
                {event.location}
              </p>
              <p className="mt-1 max-w-prose text-sm">
                {event.address}
              </p>

              <EventMeta event={event} className="mt-4" />

              <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary-rose px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-primary-darkrose"
                >
                  Buka di Google Map
                </a>
                <a
                  href={googleCalendarUrl(event)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary-rose bg-white px-6 py-2.5 text-sm font-semibold text-primary-rose shadow-xs transition hover:border-primary-darkrose hover:bg-primary-50 hover:text-primary-darkrose"
                >
                  Tambahkan ke Kalender
                </a>
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </div>
  );
}