import { NextRequest, NextResponse } from 'next/server';
import { addComment, getComments } from '@/lib/db';
import { Comment, NewComment } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const comments = await getComments();
  return NextResponse.json({ data: comments });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<NewComment>;

  if (!body.name || !body.message || !body.attendance) {
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

  const comment: Comment = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    message: body.message.trim(),
    attendance: body.attendance,
    createdAt: new Date().toISOString(),
  };

  await addComment(comment);

  return NextResponse.json({ data: comment }, { status: 201 });
}
