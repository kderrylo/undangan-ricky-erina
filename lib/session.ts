import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE_NAME = 'undangan_admin_session';
const SESSION_DURATION = '7d';

function getSecretKey() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error(
      'ADMIN_JWT_SECRET belum diatur. Tambahkan di file .env (lihat .env.example).'
    );
  }
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  sub: string; // admin id
  username: string;
  name: string;
}

export async function signAdminToken(session: AdminSession): Promise<string> {
  return new SignJWT({ username: session.username, name: session.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (!payload.sub || !payload.username) return null;
    return {
      sub: payload.sub as string,
      username: payload.username as string,
      name: (payload.name as string) ?? '',
    };
  } catch {
    return null;
  }
}
