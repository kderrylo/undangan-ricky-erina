import Image from 'next/image';
import { config, EventConfig } from '@/lib/data';
import Reveal from './Reveal';

function googleCalendarUrl(event: EventConfig) {
  const title = encodeURIComponent(`${event.name} - ${config.groom.name} & ${config.bride.name}`);
  const details = encodeURIComponent(`${event.location}, ${event.address}`);
  const location = encodeURIComponent(event.address);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
}

function AmpDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-12 bg-current opacity-40 sm:w-16" />
      <span className="font-script text-3xl leading-none">&amp;</span>
      <span className="h-px w-12 bg-current opacity-40 sm:w-16" />
    </div>
  );
}

function EventMeta({ event, className = '' }: { event: EventConfig; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm ${className}`}>
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-[3px] bg-current" />
        {event.date}
      </span>
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-current" />
        {event.time}
      </span>
    </div>
  );
}

export default function CoupleInfo() {
  const event = config.events[0];
  const coupleAlt = `${config.groom.fullName} & ${config.bride.fullName}`;

  return (
    <section id="couple" className="relative bg-white dark:bg-ink">
      <Reveal className="relative w-full overflow-hidden sm:grid sm:grid-cols-2 sm:min-h-[680px]">
        {/* ===== Mobile: full screen foto dengan teks di atasnya ===== */}
        <div className="relative min-h-screen w-full overflow-hidden sm:hidden">
          <Image
            src={config.couplePhoto}
            alt={coupleAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-900/40 to-primary-950/75" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 py-10 text-center text-white">
            <h3 className="font-script text-4xl">{config.groom.fullName}</h3>
            <p className="mt-2 max-w-[240px] text-xs leading-relaxed text-white/90">
              {config.groom.parents}
            </p>

            <AmpDivider className="my-3 text-white/80" />

            <h3 className="font-script text-4xl">{config.bride.fullName}</h3>
            <p className="mt-2 max-w-[240px] text-xs leading-relaxed text-white/90">
              {config.bride.parents}
            </p>

            <p className="mt-6 font-script text-2xl">Sakramen Perkawinan</p>
            <p className="mt-2 text-sm font-semibold">{event.location}</p>
            <p className="mt-1 max-w-[260px] text-xs leading-relaxed text-white/80">{event.address}</p>

            <EventMeta event={event} className="mt-4" />

            <div className="mt-6 flex w-full max-w-[240px] flex-col gap-2">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white py-2.5 text-xs font-semibold text-primary-800 shadow transition hover:bg-primary-50"
              >
                Buka di Google Map
              </a>
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/80 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Tambahkan ke Kalender
              </a>
            </div>
          </div>
        </div>

        {/* ===== Desktop: foto di kiri, info acara di kanan ===== */}
        <div className="relative hidden bg-primary-50 sm:block">
          <Image
            src={config.couplePhoto}
            alt={coupleAlt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="hidden flex-col items-center justify-center bg-white px-10 py-14 text-center dark:bg-primary-950/20 sm:flex">
          <h3 className="font-script text-4xl text-primary-800 dark:text-primary-100 lg:text-5xl">
            {config.groom.fullName}
          </h3>
          <p className="mt-3 max-w-xs text-sm text-primary-600 dark:text-primary-300">
            {config.groom.parents}
          </p>

          <AmpDivider className="my-5 text-primary-400" />

          <h3 className="font-script text-4xl text-primary-800 dark:text-primary-100 lg:text-5xl">
            {config.bride.fullName}
          </h3>
          <p className="mt-3 max-w-xs text-sm text-primary-600 dark:text-primary-300">
            {config.bride.parents}
          </p>

          <p className="mt-8 font-script text-3xl text-primary-700 dark:text-primary-200">
            Sakramen Perkawinan
          </p>
          <p className="mt-3 text-sm font-semibold text-primary-800 dark:text-primary-100">
            {event.location}
          </p>
          <p className="mt-1 max-w-sm text-xs text-primary-500 dark:text-primary-400">
            {event.address}
          </p>

          <EventMeta event={event} className="mt-5 text-primary-700 dark:text-primary-200" />

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary-700 px-6 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-primary-800"
            >
              Buka di Google Map
            </a>
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-primary-300 px-6 py-2.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-50 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-900"
            >
              Tambahkan ke Kalender
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}