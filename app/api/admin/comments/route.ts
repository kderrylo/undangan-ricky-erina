import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/requireAdmin';
import { getComments } from '@/lib/db';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const comments = await getComments();
    return NextResponse.json({ data: comments });
  } catch (err) {
    return apiErrorResponse(err);
  }
}
