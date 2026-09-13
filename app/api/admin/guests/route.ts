import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/requireAdmin';
import { createGuest, listGuests } from '@/lib/guests';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const search = req.nextUrl.searchParams.get('q') ?? undefined;
    const guests = await listGuests(search);
    return NextResponse.json({ data: guests });
  } catch (err) {
    return apiErrorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.name) {
    return NextResponse.json({ error: 'Nama tamu wajib diisi.' }, { status: 400 });
  }

  try {
    const guest = await createGuest({
      name: body.name,
      phone: body.phone,
      category: body.category,
      invitedCount: body.invitedCount ? Number(body.invitedCount) : undefined,
      notes: body.notes,
    });
    return NextResponse.json({ data: guest }, { status: 201 });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
