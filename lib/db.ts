import { RowDataPacket } from 'mysql2';
import { getPool } from './mysql';
import { Comment, NewComment } from './types';

interface CommentRow extends RowDataPacket {
  id: string;
  name: string;
  message: string;
  attendance: Comment['attendance'];
  attendee_count: number;
  is_pinned: number;
  created_at: string;
}

function mapRow(row: CommentRow): Comment {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    attendance: row.attendance,
    attendeeCount: row.attendee_count,
    isPinned: !!row.is_pinned,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function getComments(): Promise<Comment[]> {
  const pool = getPool();
  const [rows] = await pool.query<CommentRow[]>(
    `SELECT id, name, message, attendance, attendee_count, is_pinned, created_at
     FROM rsvp
     ORDER BY is_pinned DESC, created_at DESC`
  );
  return rows.map(mapRow);
}

export async function addComment(
  comment: Comment,
  extra?: { guestSlug?: string | null; ipAddress?: string | null; userAgent?: string | null }
): Promise<void> {
  const pool = getPool();

  let guestId: string | null = null;
  if (extra?.guestSlug) {
    const [guestRows] = await pool.query<RowDataPacket[]>(
      `SELECT id FROM guests WHERE slug = ? LIMIT 1`,
      [extra.guestSlug]
    );
    guestId = guestRows[0]?.id ?? null;
  }

  await pool.query(
    `INSERT INTO rsvp (id, guest_id, guest_slug, name, message, attendance, attendee_count, ip_address, user_agent, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      comment.id,
      guestId,
      extra?.guestSlug ?? null,
      comment.name,
      comment.message,
      comment.attendance,
      comment.attendeeCount ?? 1,
      extra?.ipAddress ?? null,
      extra?.userAgent ?? null,
      new Date(comment.createdAt).toISOString().slice(0, 19).replace('T', ' '),
    ]
  );
}

export async function deleteComment(id: string): Promise<void> {
  const pool = getPool();
  await pool.query(`DELETE FROM rsvp WHERE id = ?`, [id]);
}

export async function togglePinComment(id: string, isPinned: boolean): Promise<void> {
  const pool = getPool();
  await pool.query(`UPDATE rsvp SET is_pinned = ? WHERE id = ?`, [isPinned ? 1 : 0, id]);
}

export async function getRsvpStats() {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT
       attendance,
       COUNT(*) AS entries,
       COALESCE(SUM(attendee_count), 0) AS people
     FROM rsvp
     GROUP BY attendance`
  );

  const stats = {
    hadir: { entries: 0, people: 0 },
    tidak_hadir: { entries: 0, people: 0 },
    totalEntries: 0,
    totalPeople: 0,
  };

  for (const row of rows) {
    const key = row.attendance as 'hadir' | 'tidak_hadir';
    stats[key] = { entries: Number(row.entries), people: Number(row.people) };
    stats.totalEntries += Number(row.entries);
    stats.totalPeople += Number(row.people);
  }

  return stats;
}

export type { NewComment };
