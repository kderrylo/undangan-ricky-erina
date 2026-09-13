interface BouquetOrnamentProps {
  className?: string;
  flip?: boolean;
  style?: React.CSSProperties;
}

/**
 * Bunga besar berkelopak lancip (terinspirasi referensi bunga putih-lilac
 * pada undangan Instagram), dilengkapi gerombolan bunga lilac kecil dan
 * benang sari emas — dipakai untuk memperkaya ornamen di beberapa section.
 */
function PointedBlossom({
  x,
  y,
  scale = 1,
  rotate = 0,
  opacity = 0.85,
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
}) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      {petals.map((angle) => (
        <path
          key={angle}
          d="M0 0 C -6 -11 -4 -22 0 -28 C 4 -22 6 -11 0 0 Z"
          transform={`rotate(${angle})`}
          fill="currentColor"
          fillOpacity="0.9"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="0.6"
        />
      ))}
      <circle r="4.4" className="text-gold-300" fill="currentColor" />
      <circle r="1.6" fill="currentColor" className="text-primary-800" fillOpacity="0.5" />
    </g>
  );
}

function LilacCluster({
  x,
  y,
  scale = 1,
  opacity = 0.75,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) {
  const dots = [
    [0, 0],
    [5, -3],
    [9, 2],
    [4, 6],
    [-4, 5],
    [-8, 1],
    [-5, -4],
    [2, -7],
    [8, -6],
    [-9, -3],
  ];
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity} className="text-lilac-300">
      {dots.map(([dx, dy], i) => (
        <circle key={i} cx={dx} cy={dy} r={i % 3 === 0 ? 2.4 : 1.7} fill="currentColor" />
      ))}
    </g>
  );
}

export default function BouquetOrnament({ className = '', flip = false, style }: BouquetOrnamentProps) {
  return (
    <svg
      viewBox="-20 -20 240 240"
      className={className}
      style={{ ...(flip ? { transform: 'scaleX(-1)' } : {}), ...style }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ranting penghubung */}
      <path
        d="M10 4C34 20 46 40 44 66C42 96 60 122 100 140C130 154 150 172 156 196"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="text-primary-300"
      />

      {/* Daun kecil di sepanjang ranting */}
      <g className="text-primary-200" fillOpacity="0.5">
        <ellipse cx="30" cy="26" rx="6" ry="2.6" fill="currentColor" transform="rotate(40 30 26)" />
        <ellipse cx="44" cy="58" rx="6" ry="2.6" fill="currentColor" transform="rotate(-15 44 58)" />
        <ellipse cx="70" cy="118" rx="6.5" ry="2.8" fill="currentColor" transform="rotate(35 70 118)" />
        <ellipse cx="126" cy="158" rx="6.5" ry="2.8" fill="currentColor" transform="rotate(-25 126 158)" />
      </g>

      {/* Bunga putih berkelopak lancip — motif utama sesuai referensi */}
      <g className="text-white dark:text-primary-50">
        <PointedBlossom x={10} y={4} scale={1.5} rotate={10} />
        <PointedBlossom x={44} y={66} scale={1.15} rotate={-15} />
        <PointedBlossom x={100} y={140} scale={1.3} rotate={25} />
        <PointedBlossom x={156} y={196} scale={1.05} rotate={-8} />
      </g>

      {/* Gerombolan bunga lilac kecil menyelingi bunga utama */}
      <LilacCluster x={26} y={-4} scale={0.9} />
      <LilacCluster x={64} y={48} scale={1} />
      <LilacCluster x={122} y={116} scale={0.95} />
      <LilacCluster x={172} y={182} scale={0.85} />
    </svg>
  );
}
