export default function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 28"
      className={`mx-auto h-5 w-40 text-primary-400 sm:h-6 sm:w-52 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 14C50 14 78 14 96 14" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M218 14C170 14 142 14 124 14" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />

      {/* Bunga kecil di tengah */}
      <g transform="translate(110,14)">
        <circle cx="0" cy="-6" r="4.4" fill="currentColor" fillOpacity="0.55" />
        <circle cx="5.2" cy="-2" r="4.4" fill="currentColor" fillOpacity="0.5" />
        <circle cx="3.2" cy="5" r="4.4" fill="currentColor" fillOpacity="0.4" />
        <circle cx="-3.2" cy="5" r="4.4" fill="currentColor" fillOpacity="0.4" />
        <circle cx="-5.2" cy="-2" r="4.4" fill="currentColor" fillOpacity="0.5" />
        <circle cx="0" cy="0" r="2.2" className="text-gold-300" fill="currentColor" />
      </g>

      {/* Titik-titik kecil di kiri & kanan sebagai aksen meriah */}
      <circle cx="86" cy="14" r="1.8" fill="currentColor" fillOpacity="0.45" />
      <circle cx="134" cy="14" r="1.8" fill="currentColor" fillOpacity="0.45" />
      <circle cx="76" cy="8" r="1.2" className="text-gold-300" fill="currentColor" fillOpacity="0.8" />
      <circle cx="144" cy="20" r="1.2" className="text-gold-300" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}
