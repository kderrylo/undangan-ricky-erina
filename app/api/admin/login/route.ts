import { NextRequest, NextResponse } from 'next/server';
import { findAdminByUsername } from '@/lib/admins';
import { ADMIN_COOKIE_NAME, signAdminToken } from '@/lib/session';
import { verifyPassword } from '@/lib/password';
import { apiErrorResponse } from '@/lib/apiError';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const username = body?.username?.trim();
  const password = body?.password;

  if (!username || !password) {
    return NextResponse.json({ error: 'Username dan password wajib diisi.' }, { status: 400 });
  }

  try {
    const admin = await findAdminByUsername(username);
    if (!admin) {
      return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 });
    }

    const valid = await verifyPassword(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 });
    }

    const token = await signAdminToken({ sub: admin.id, username: admin.username, name: admin.name });

    const res = NextResponse.json({ data: { username: admin.username, name: admin.name } });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });
    return res;
  } catch (err) {
    return apiErrorResponse(err);
  }
}
