import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/requireAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Belum login.' }, { status: 401 });
  }
  return NextResponse.json({ data: { username: session.username, name: session.name } });
}
