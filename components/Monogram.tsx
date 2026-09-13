/**
 * Monogram "PE" bergaya crest/lencana vintage — terinspirasi dari logo pada
 * undangan fisik (softcover invitto): bingkai lonjong dengan garis ganda,
 * inisial mempelai di tengah, dan aksen bunga kecil di bagian bawah.
 */
export default function Monogram({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 140" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bingkai luar */}
        <path
          d="M50 4 L69 19 Q90 34 88 59 Q86 88 69 107 L50 132 L31 107 Q14 88 12 59 Q10 34 31 19 Z"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary-600"
        />
        {/* Bingkai dalam */}
        <path
          d="M50 14 L64 26 Q80 38 78 59 Q76 82 64 98 L50 118 L36 98 Q24 82 22 59 Q20 38 36 26 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.7"
          className="text-primary-500"
        />

        {/* Bunga kecil di bawah bingkai */}
        <g transform="translate(50,128)" className="text-primary-400">
          <circle cx="-7" cy="4" r="3.4" fill="currentColor" fillOpacity="0.6" />
          <circle cx="7" cy="4" r="3.4" fill="currentColor" fillOpacity="0.6" />
          <circle cx="0" cy="7" r="3" className="text-gold-300" fill="currentColor" fillOpacity="0.9" />
        </g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-2xl font-semibold leading-none tracking-tight text-primary-700 dark:text-primary-200">
          P
        </span>
        <span className="mx-0.5 h-5 w-px bg-primary-300" />
        <span className="font-serif text-2xl font-semibold leading-none tracking-tight text-primary-700 dark:text-primary-200">
          E
        </span>
      </div>
    </div>
  );
}
