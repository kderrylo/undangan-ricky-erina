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

  if (!body?.name || !body?.message || !body?.attendance) {
    return NextResponse.json(
      { error: 'Nama, pesan, dan konfirmasi kehadiran wajib diisi.' },
      { status: 400 }
    );
  }

  if (body.name.length > 60 || body.message.length > 500) {
    return NextResponse.json(
      { error: 'Nama atau pesan terlalu panjang.' },
      { status: 400 }
    );
  }

  const attendeeCount = Math.min(Math.max(Number(body.attendeeCount ?? 1) || 1, 1), 10);

  const comment: Comment = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    message: body.message.trim(),
    attendance: body.attendance,
    attendeeCount,
    createdAt: new Date().toISOString(),
  };

  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip');

  try {
    await addComment(comment, {
      guestSlug: body.guestSlug ?? null,
      ipAddress,
      userAgent: req.headers.get('user-agent'),
    });
    return NextResponse.json({ data: comment }, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
