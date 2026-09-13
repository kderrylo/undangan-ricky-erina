'use client';

import { useEffect, useState } from 'react';
import { Pin, PinOff, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Comment } from '@/lib/types';

const BADGE: Record<Comment['attendance'], { label: string; icon: typeof CheckCircle2; className: string }> = {
  hadir: { label: 'Hadir', icon: CheckCircle2, className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  tidak_hadir: { label: 'Tidak Hadir', icon: XCircle, className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
};

export default function AdminUcapanPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/comments');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setComments(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat ucapan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const togglePin = async (c: Comment) => {
    await fetch(`/api/admin/comments/${c.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPinned: !c.isPinned }),
    });
    load();
  };

  const remove = async (c: Comment) => {
    if (!confirm(`Hapus ucapan dari "${c.name}"?`)) return;
    await fetch(`/api/admin/comments/${c.id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-800 dark:text-primary-100">
        Ucapan &amp; RSVP
      </h1>
      <p className="mt-1 text-sm text-primary-500 dark:text-primary-400">
        Kelola ucapan yang masuk. Sematkan (pin) ucapan favorit agar tampil di urutan atas.
      </p>

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
      {loading && <p className="mt-6 text-sm text-primary-400">Memuat...</p>}
      {!loading && comments.length === 0 && (
        <p className="mt-6 text-sm text-primary-400">Belum ada ucapan masuk.</p>
      )}

      <div className="mt-6 space-y-3">
        {comments.map((c) => {
          const badge = BADGE[c.attendance];
          const Icon = badge.icon;
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-primary-200 bg-white p-4 shadow-sm dark:border-primary-800 dark:bg-primary-900/30"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-primary-800 dark:text-primary-100">{c.name}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                    <Icon size={12} /> {badge.label}
                  </span>
                  <span className="text-xs text-primary-400">{c.attendeeCount} orang</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => togglePin(c)}
                    title={c.isPinned ? 'Lepas sematan' : 'Sematkan'}
                    className="rounded-full p-2 text-primary-500 transition hover:bg-primary-100 dark:hover:bg-primary-800"
                  >
                    {c.isPinned ? <PinOff size={16} /> : <Pin size={16} />}
                  </button>
                  <button
                    onClick={() => remove(c)}
                    title="Hapus ucapan"
                    className="rounded-full p-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-primary-700 dark:text-primary-200">{c.message}</p>
              <p className="mt-2 text-xs text-primary-400">
                {new Date(c.createdAt).toLocaleString('id-ID')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
