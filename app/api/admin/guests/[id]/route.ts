import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/requireAdmin';
import { deleteGuest, updateGuestSent } from '@/lib/guests';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (typeof body?.isSent !== 'boolean') {
    return NextResponse.json({ error: 'isSent (boolean) wajib diisi.' }, { status: 400 });
  }

  try {
    await updateGuestSent(params.id, body.isSent);
    return NextResponse.json({ data: true });
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await deleteGuest(params.id);
    return NextResponse.json({ data: true });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
