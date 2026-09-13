import { NextRequest, NextResponse } from 'next/server';
import { findGuestBySlug } from '@/lib/guests';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

// Endpoint publik (tanpa login) — sengaja hanya mengembalikan nama tamu,
// bukan data sensitif lain (nomor HP, catatan, dsb), karena dipanggil dari
// halaman undangan yang siapa saja bisa akses lewat link ?to=slug.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Parameter slug wajib diisi.' }, { status: 400 });
  }

  try {
    const guest = await findGuestBySlug(slug);
    if (!guest) {
      return NextResponse.json({ data: null });
    }
    return NextResponse.json({ data: { name: guest.name } });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
