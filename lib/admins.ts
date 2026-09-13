import { randomUUID } from 'crypto';
import { RowDataPacket } from 'mysql2';
import { getPool } from './mysql';
import { hashPassword } from './password';

export interface AdminRecord {
  id: string;
  username: string;
  password: string; // hash bcrypt
  name: string;
}

export async function findAdminByUsername(username: string): Promise<AdminRecord | null> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, username, password, name FROM admins WHERE username = ? LIMIT 1`,
    [username]
  );
  return (rows[0] as AdminRecord) ?? null;
}

export async function countAdmins(): Promise<number> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total FROM admins`);
  return Number(rows[0]?.total ?? 0);
}

export async function createAdmin(input: { username: string; password: string; name: string }) {
  const pool = getPool();
  const id = randomUUID();
  const passwordHash = await hashPassword(input.password);
  await pool.query(`INSERT INTO admins (id, username, password, name) VALUES (?, ?, ?, ?)`, [
    id,
    input.username,
    passwordHash,
    input.name,
  ]);
  return { id, username: input.username, name: input.name };
}
