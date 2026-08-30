export default function FloralOrnament({
  className = '',
  flip = false,
  style,
}: {
  className?: string;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ ...(flip ? { transform: 'scaleX(-1)' } : {}), ...style }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cabang utama */}
      <path
        d="M4 6C40 26 58 54 62 92C66 132 90 158 140 176"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Ranting kecil */}
      <path d="M18 14C30 22 34 34 30 46" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M44 40C56 38 66 44 70 56" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M58 88C74 84 88 90 96 102" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />

      {/* Bunga besar 1 */}
      <g transform="translate(20,10)">
        <circle cx="0" cy="-14" r="10" fill="currentColor" fillOpacity="0.85" />
        <circle cx="12" cy="-6" r="10" fill="currentColor" fillOpacity="0.7" />
        <circle cx="12" cy="9" r="10" fill="currentColor" fillOpacity="0.6" />
        <circle cx="-2" cy="14" r="9" fill="currentColor" fillOpacity="0.7" />
        <circle cx="-13" cy="2" r="9" fill="currentColor" fillOpacity="0.6" />
        <circle cx="4" cy="1" r="6" className="text-gold-300" fill="currentColor" />
      </g>

      {/* Bunga sedang di tengah ranting */}
      <g transform="translate(68,58)">
        <circle cx="0" cy="-9" r="7" fill="currentColor" fillOpacity="0.6" />
        <circle cx="8" cy="-3" r="7" fill="currentColor" fillOpacity="0.5" />
        <circle cx="6" cy="7" r="7" fill="currentColor" fillOpacity="0.45" />
        <circle cx="-6" cy="6" r="6.5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="-8" cy="-4" r="6.5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="0" cy="0" r="3.5" className="text-gold-300" fill="currentColor" />
      </g>

      {/* Bunga kecil ujung ranting */}
      <g transform="translate(140,178)">
        <circle cx="0" cy="-7" r="5.5" fill="currentColor" fillOpacity="0.55" />
        <circle cx="6" cy="-2" r="5.5" fill="currentColor" fillOpacity="0.45" />
        <circle cx="4" cy="6" r="5.5" fill="currentColor" fillOpacity="0.4" />
        <circle cx="-5" cy="4" r="5" fill="currentColor" fillOpacity="0.45" />
        <circle cx="-6" cy="-3" r="5" fill="currentColor" fillOpacity="0.45" />
        <circle cx="0" cy="0" r="2.6" className="text-gold-300" fill="currentColor" />
      </g>

      {/* Daun-daun kecil */}
      <ellipse cx="32" cy="30" rx="6" ry="2.6" fill="currentColor" fillOpacity="0.35" transform="rotate(35 32 30)" />
      <ellipse cx="52" cy="70" rx="6" ry="2.6" fill="currentColor" fillOpacity="0.3" transform="rotate(-20 52 70)" />
      <ellipse cx="88" cy="112" rx="6" ry="2.6" fill="currentColor" fillOpacity="0.3" transform="rotate(50 88 112)" />
      <ellipse cx="110" cy="150" rx="6" ry="2.6" fill="currentColor" fillOpacity="0.3" transform="rotate(-10 110 150)" />
    </svg>
  );
}
