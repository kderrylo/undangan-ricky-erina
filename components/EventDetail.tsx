import { CalendarPlus, MapPin, Clock } from 'lucide-react';
import { config, EventConfig } from '@/lib/data';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import ChurchOrnament from './ChurchOrnament';
import SectionDivider from './SectionDivider';

function googleCalendarUrl(event: EventConfig) {
  const title = encodeURIComponent(`${event.name} - ${config.groom.name} & ${config.bride.name}`);
  const details = encodeURIComponent(`${event.location}, ${event.address}`);
  const location = encodeURIComponent(event.address);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
}

export default function EventDetail() {
  const event = config.events[0];

  return (
    <section id="event" className="relative overflow-hidden bg-primary-50 px-6 py-20 dark:bg-ink">
      <FloralOrnament flip className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 text-lilac-200 opacity-50 sm:h-44 sm:w-44" />
      <FloralOrnament className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 text-primary-200 opacity-50 sm:h-44 sm:w-44" />

      <Reveal className="relative text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Save The Date</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          Rangkaian Acara
        </h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <Reveal className="relative mx-auto mt-14 max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-primary-200 bg-white p-8 text-center shadow-md dark:border-primary-800 dark:bg-primary-900/30">
          <ChurchOrnament className="pointer-events-none absolute inset-x-0 -top-2 mx-auto h-24 w-24 text-primary-200 opacity-70" />

          <div className="relative mt-14">
            <h3 className="font-serif text-2xl font-semibold text-primary-800 dark:text-primary-100">
              {event.name}
            </h3>
            <p className="mt-2 text-primary-700 dark:text-primary-200">{event.date}</p>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-primary-600 dark:text-primary-300">
              <Clock size={14} /> {event.time}
            </p>
            <p className="mt-4 text-sm font-medium text-primary-700 dark:text-primary-200">
              {event.location}
            </p>
            <p className="text-xs text-primary-500 dark:text-primary-400">{event.address}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-700"
              >
                <MapPin size={14} /> Lihat Peta
              </a>
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-primary-300 px-4 py-2 text-xs font-medium text-primary-700 transition hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800"
              >
                <CalendarPlus size={14} /> Tambah Kalender
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
