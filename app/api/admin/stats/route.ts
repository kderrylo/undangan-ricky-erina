import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/requireAdmin';
import { getRsvpStats } from '@/lib/db';
import { getGuestStats } from '@/lib/guests';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rsvp, guests] = await Promise.all([getRsvpStats(), getGuestStats()]);
    return NextResponse.json({ data: { rsvp, guests } });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
