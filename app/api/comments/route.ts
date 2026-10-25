import { NextRequest, NextResponse } from 'next/server';
import { addComment, getComments } from '@/lib/db';
import { Comment, NewComment } from '@/lib/types';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const comments = await getComments();
    return NextResponse.json({ data: comments });
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Partial<NewComment> | null;

  const trimmedName = body?.name?.trim() ?? '';
  const trimmedMessage = body?.message?.trim() ?? '';
  const attendance = body?.attendance;

  // 1. Pesan (message) sekarang opsional. Hanya nama dan status kehadiran yang wajib.
  if (!trimmedName || (attendance !== 'hadir' && attendance !== 'tidak_hadir')) {
    return NextResponse.json(
      { error: 'Nama dan konfirmasi kehadiran wajib diisi.' },
      { status: 400 }
    );
  }

  // 2. Validasi batas panjang karakter
  if (trimmedName.length > 60 || trimmedMessage.length > 500) {
    return NextResponse.json(
      { error: 'Nama atau pesan terlalu panjang.' },
      { status: 400 }
    );
  }

  // 3. Jika hadir, batasi 1-10 orang. Jika tidak hadir, set default 1.
  const attendeeCount =
    attendance === 'hadir'
      ? Math.min(Math.max(Number(body?.attendeeCount ?? 1) || 1, 1), 10)
      : 1;

  const comment: Comment = {
    id: crypto.randomUUID(),
    name: trimmedName,
    message: trimmedMessage, // Akan berisi "" (string kosong) jika tamu tidak mengisi ucapan
    attendance,
    attendeeCount,
    createdAt: new Date().toISOString(),
  };

  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip');

  try {
    await addComment(comment, {
      guestSlug: body?.guestSlug ?? null,
      ipAddress,
      userAgent: req.headers.get('user-agent'),
    });
    return NextResponse.json({ data: comment }, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}