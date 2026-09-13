/**
 * Fallback tampilan kalau nama asli tamu tidak ditemukan di database
 * (misalnya belum setup MySQL, atau slug dibuat manual). Mengubah
 * "jensen-sitompul" menjadi "Jensen Sitompul" — jauh lebih baik daripada
 * menampilkan strip mentah ke tamu, meski tetap bukan nama asli 100%.
 */
export function prettifySlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
