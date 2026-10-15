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
      <span className="h-px w-10 bg-current opacity-40 sm:w-16" />
      <span className={`text-2xl leading-none sm:text-3xl ${fontSail}`}>&amp;</span>
      <span className="h-px w-10 bg-current opacity-40 sm:w-16" />
    </div>
  );
}

function EventMeta({ event, className = '' }: { event: EventConfig; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:gap-x-5 sm:text-sm ${className}`}>
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
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <section id="couple" className="relative h-full w-full bg-white">
        <div className="relative h-full w-full overflow-hidden sm:grid sm:grid-cols-2">
          
          {/* ===== Mobile: Fit 1 Layar Penuh (100dvh) Tanpa Scroll ===== */}
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden px-5 pt-12 pb-24 text-center text-white sm:hidden">
            <Image
              src={config.couplePhoto}
              alt={coupleAlt}
              fill
              sizes="100vw"
              className="object-cover brightness-75"
              priority
            />
            <div className="
              absolute inset-0 bg-gradient-to-b 
              from-primary-darkrose/65 via-primary-darkrose/45 to-primary-darkrose/80
            " />

            <Reveal className="relative z-10 flex h-full w-full flex-col items-center justify-evenly">
              {/* Bagian Mempelai */}
              <div className="flex flex-col items-center">
                <h3 className={`text-3xl leading-tight ${fontSail}`}>
                  {config.groom.fullName}
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-snug text-white/90">
                  {config.groom.parents}
                </p>

                <AmpDivider className="my-2 text-white/80" />

                <h3 className={`text-3xl leading-tight ${fontSail}`}>
                  {config.bride.fullName}
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-snug text-white/90">
                  {config.bride.parents}
                </p>
              </div>

              {/* Bagian Acara & Lokasi */}
              <div className="flex flex-col items-center">
                <p className={`text-2xl ${fontSail}`}>Sakramen Perkawinan</p>
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

          {/* ===== Desktop: Foto di Kiri, Info Acara di Kanan ===== */}
          <div className="relative hidden h-full bg-primary-50 sm:block">
            <Image
              src={config.couplePhoto}
              alt={coupleAlt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative hidden h-full flex-col items-center justify-center bg-white px-10 py-10 text-center sm:flex">
            {/* Ornamen Bunga: ditaruh di z-0 (di belakang konten & button) */}
            <Image
              src="/images/flo-ornament-2.webp"
              width={1080}
              height={1}
              alt="verse-img"
              className="pointer-events-none absolute right-12 bottom-12 z-0 hidden w-28 select-none object-contain animate-float md:block"
            />

            {/* Konten & Button: ditaruh di z-10 agar selalu di atas bunga */}
            <Reveal className="relative z-10 flex flex-col items-center justify-center">
              <h3 className={`text-4xl lg:text-5xl ${fontSail}`}>
                {config.groom.fullName}
              </h3>
              <p className="mt-2 max-w-prose text-sm lg:text-base">
                {config.groom.parents}
              </p>

              <AmpDivider className="my-4" />

              <h3 className={`text-4xl lg:text-5xl ${fontSail}`}>
                {config.bride.fullName}
              </h3>
              <p className="mt-2 max-w-prose text-sm lg:text-base">
                {config.bride.parents}
              </p>

              <p className={`mt-10 text-3xl ${fontSail}`}>
                Sakramen Perkawinan
              </p>
              <p className="mt-2 font-semibold">
                {event.location}
              </p>
              <p className="mt-1 max-w-prose text-sm">
                {event.address}
              </p>

              <EventMeta event={event} className="mt-4" />

              {/* Container button dengan z-20 dan bg-white pada tombol kedua agar bunga tidak tembus */}
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