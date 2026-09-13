export default function ChurchOrnament({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 -30 200 230"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Salib kecil di puncak */}
      <g transform="translate(100,18)" strokeWidth="2.4" strokeLinecap="round">
        <line x1="0" y1="-14" x2="0" y2="14" />
        <line x1="-9" y1="-4" x2="9" y2="-4" />
      </g>

      {/* Jendela gotik / rose window bergaya katedral */}
      <path
        d="M60 150V90C60 63.5 78 42 100 42C122 42 140 63.5 140 90V150"
        strokeWidth="2.2"
      />
      <path
        d="M74 150V96C74 77 85.6 60 100 60C114.4 60 126 77 126 96V150"
        strokeWidth="1.6"
        strokeOpacity="0.7"
      />

      {/* Rose window / mawar gotik di tengah jendela */}
      <g transform="translate(100,88)" strokeWidth="1.4" strokeOpacity="0.85">
        <circle r="16" />
        <circle r="5.4" className="text-gold-300" fill="currentColor" stroke="none" fillOpacity="0.9" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="0"
            x2={16 * Math.cos((angle * Math.PI) / 180)}
            y2={16 * Math.sin((angle * Math.PI) / 180)}
          />
        ))}
      </g>

      {/* Garis dasar & anak tangga gereja */}
      <line x1="46" y1="150" x2="154" y2="150" strokeWidth="2" />
      <line x1="38" y1="158" x2="162" y2="158" strokeWidth="1.6" strokeOpacity="0.6" />
      <line x1="30" y1="166" x2="170" y2="166" strokeWidth="1.6" strokeOpacity="0.4" />

      {/* Sulur bunga kecil menghiasi kaki jendela, senada dengan ornamen bunga lain */}
      <g strokeWidth="1.4" strokeOpacity="0.7">
        <path d="M46 150C36 140 30 128 34 116" />
        <path d="M154 150C164 140 170 128 166 116" />
      </g>
      <g fill="currentColor" stroke="none" fillOpacity="0.55">
        <circle cx="34" cy="116" r="5" />
        <circle cx="24" cy="122" r="4" />
        <circle cx="166" cy="116" r="5" />
        <circle cx="176" cy="122" r="4" />
      </g>
      <g fill="currentColor" stroke="none" className="text-gold-300" fillOpacity="0.9">
        <circle cx="34" cy="116" r="1.8" />
        <circle cx="166" cy="116" r="1.8" />
      </g>
    </svg>
  );
}
