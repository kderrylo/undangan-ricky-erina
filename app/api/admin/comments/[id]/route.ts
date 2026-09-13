import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/requireAdmin';
import { deleteComment, togglePinComment } from '@/lib/db';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (typeof body?.isPinned !== 'boolean') {
    return NextResponse.json({ error: 'isPinned (boolean) wajib diisi.' }, { status: 400 });
  }

  try {
    await togglePinComment(params.id, body.isPinned);
    return NextResponse.json({ data: true });
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await deleteComment(params.id);
    return NextResponse.json({ data: true });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
