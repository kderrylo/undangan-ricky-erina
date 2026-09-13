import { randomUUID } from 'crypto';
import { RowDataPacket } from 'mysql2';
import { getPool } from './mysql';
import { Guest, NewGuest } from './types';

interface GuestRow extends RowDataPacket {
  id: string;
  slug: string;
  name: string;
  phone: string | null;
  category: string;
  invited_count: number;
  notes: string | null;
  is_sent: number;
  created_at: string;
}

function mapRow(row: GuestRow): Guest {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    phone: row.phone,
    category: row.category,
    invitedCount: row.invited_count,
    notes: row.notes,
    isSent: !!row.is_sent,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'tamu'
  );
}

export async function listGuests(search?: string): Promise<Guest[]> {
  const pool = getPool();
  if (search) {
    const [rows] = await pool.query<GuestRow[]>(
      `SELECT * FROM guests WHERE name LIKE ? OR slug LIKE ? ORDER BY created_at DESC`,
      [`%${search}%`, `%${search}%`]
    );
    return rows.map(mapRow);
  }
  const [rows] = await pool.query<GuestRow[]>(`SELECT * FROM guests ORDER BY created_at DESC`);
  return rows.map(mapRow);
}

/**
 * Cari 1 tamu berdasarkan slug (dipakai untuk mengambil nama asli tamu dari
 * link personal ?to=slug, supaya yang ditampilkan ke tamu adalah namanya
 * yang sebenarnya — bukan slug mentah yang ber-strip).
 */
export async function findGuestBySlug(slug: string): Promise<Guest | null> {
  const pool = getPool();
  const [rows] = await pool.query<GuestRow[]>(`SELECT * FROM guests WHERE slug = ? LIMIT 1`, [slug]);
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function createGuest(input: NewGuest): Promise<Guest> {
  const pool = getPool();
  const baseSlug = slugify(input.name);

  let slug = baseSlug;
  let suffix = 1;
  // Pastikan slug unik (dipakai sebagai ?to= pada link undangan personal)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [existing] = await pool.query<RowDataPacket[]>(`SELECT id FROM guests WHERE slug = ? LIMIT 1`, [slug]);
    if (existing.length === 0) break;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  const guest: Guest = {
    id: randomUUID(),
    slug,
    name: input.name.trim(),
    phone: input.phone?.trim() || null,
    category: input.category?.trim() || 'Umum',
    invitedCount: input.invitedCount ?? 1,
    notes: input.notes?.trim() || null,
    isSent: false,
    createdAt: new Date().toISOString(),
  };

  await pool.query(
    `INSERT INTO guests (id, slug, name, phone, category, invited_count, notes, is_sent)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
    [guest.id, guest.slug, guest.name, guest.phone, guest.category, guest.invitedCount, guest.notes]
  );

  return guest;
}

export async function updateGuestSent(id: string, isSent: boolean): Promise<void> {
  const pool = getPool();
  await pool.query(`UPDATE guests SET is_sent = ? WHERE id = ?`, [isSent ? 1 : 0, id]);
}

export async function deleteGuest(id: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM guests WHERE id = ?`, [id]);
}

export async function getGuestStats() {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total, COALESCE(SUM(invited_count), 0) AS totalInvited,
            SUM(is_sent = 1) AS totalSent
     FROM guests`
  );
  const row = rows[0] ?? { total: 0, totalInvited: 0, totalSent: 0 };
  return {
    total: Number(row.total ?? 0),
    totalInvited: Number(row.totalInvited ?? 0),
    totalSent: Number(row.totalSent ?? 0),
  };
}
