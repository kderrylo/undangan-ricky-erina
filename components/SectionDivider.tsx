export default function SectionDivider({
  variant = 'rose',
  className = '',
}: {
  variant?: 'rose' | 'white';
  className?: string;
}) {
  const lineColor = variant === 'white' ? 'bg-white/70' : 'bg-primary-rose/60';
  const dotColor = variant === 'white' ? 'bg-white' : 'bg-lilac-400';

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`h-px w-14 ${lineColor}`} />
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span className={`h-px w-14 ${lineColor}`} />
    </div>
  );
}