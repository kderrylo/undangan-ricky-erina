import confetti from 'canvas-confetti';

const WEDDING_COLORS = ['#e7a8de', '#c164b8', '#8f60bd', '#e8c46a'];

// Breakpoint sinkron dengan Tailwind `sm` (640px) supaya konsisten dengan
// layout mobile-first yang dipakai di seluruh komponen.
const MOBILE_BREAKPOINT = 640;

function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
}

/**
 * Confetti untuk layar mobile: ditembakkan dari dua sudut BAWAH layar
 * mengarah ke atas, dengan jumlah partikel & spread yang lebih terkontrol
 * supaya tidak menumpuk ramai di bagian atas layar saja seperti sebelumnya.
 * Total partikel sengaja lebih sedikit dari versi desktop agar tetap nyaman
 * dilihat di layar kecil.
 */
function fireMobileConfetti() {
  const duration = 1600;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 65,
      spread: 50,
      startVelocity: 45,
      gravity: 0.9,
      ticks: 200,
      origin: { x: 0, y: 1 },
      colors: WEDDING_COLORS,
      scalar: 0.9,
    });
    confetti({
      particleCount: 3,
      angle: 115,
      spread: 50,
      startVelocity: 45,
      gravity: 0.9,
      ticks: 200,
      origin: { x: 1, y: 1 },
      colors: WEDDING_COLORS,
      scalar: 0.9,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Confetti untuk layar desktop/tablet: tetap seperti versi sebelumnya,
 * ditembakkan dari sisi kiri & kanan tengah layar.
 */
function fireDesktopConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: WEDDING_COLORS,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: WEDDING_COLORS,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireConfetti() {
  if (isMobileViewport()) {
    fireMobileConfetti();
  } else {
    fireDesktopConfetti();
  }
}
