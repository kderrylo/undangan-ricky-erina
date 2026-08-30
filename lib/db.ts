import { promises as fs } from 'fs';
import path from 'path';
import { Comment } from './types';

// NOTE: Ini adalah penyimpanan sederhana berbasis file JSON, cocok untuk
// development/self-hosting (server Node.js yang persisten). Jika kamu
// deploy ke platform serverless (mis. Vercel), filesystem bersifat
// sementara (ephemeral) — ganti implementasi ini dengan database
// sungguhan seperti Supabase, PlanetScale, SQLite (Turso), atau Firebase.

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'comments.json');

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

export async function getComments(): Promise<Comment[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  try {
    const data = JSON.parse(raw) as Comment[];
    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function addComment(comment: Comment): Promise<void> {
  await ensureFile();
  const comments = await getComments();
  comments.unshift(comment);
  await fs.writeFile(DATA_FILE, JSON.stringify(comments, null, 2), 'utf-8');
}
