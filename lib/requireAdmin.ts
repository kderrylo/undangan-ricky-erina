import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, AdminSession, verifyAdminToken } from './session';

/** Mengembalikan sesi admin yang sedang login, atau null jika tidak ada / tidak valid. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
