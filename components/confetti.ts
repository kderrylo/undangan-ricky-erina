import confetti from 'canvas-confetti';

export function fireConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#e7a8de', '#c164b8', '#8f60bd', '#e8c46a'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#e7a8de', '#c164b8', '#8f60bd', '#e8c46a'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
