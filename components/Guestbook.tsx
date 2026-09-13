'use client';

import { useEffect, useState, FormEvent } from 'react';
import { CheckCircle2, XCircle, Send, Loader2 } from 'lucide-react';
import { Attendance, Comment } from '@/lib/types';
import Reveal from './Reveal';
import FloralOrnament from './FloralOrnament';
import BouquetOrnament from './BouquetOrnament';
import SectionDivider from './SectionDivider';

const ATTENDANCE_OPTIONS: { value: Attendance; label: string; icon: typeof CheckCircle2 }[] = [
  { value: 'hadir', label: 'Hadir', icon: CheckCircle2 },
  { value: 'tidak_hadir', label: 'Tidak Hadir', icon: XCircle },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export default function Guestbook({
  initialName,
  guestSlug,
}: {
  initialName: string;
  guestSlug?: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialName);
  const [nameEditedByUser, setNameEditedByUser] = useState(false);
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<Attendance>('hadir');
  const [attendeeCount, setAttendeeCount] = useState(1);

  // initialName bisa berubah sesaat setelah mount (dari tebakan berbasis slug
  // menjadi nama asli dari database). Sinkronkan otomatis, TAPI jangan timpa
  // kalau tamu sudah mulai mengetik/mengedit sendiri nama di kolom ini.
  useEffect(() => {
    if (!nameEditedByUser) {
      setName(initialName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialName]);

  const loadComments = async () => {
    try {
      const res = await fetch('/api/comments');
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.error ?? `Gagal memuat ucapan (HTTP ${res.status}).`);
      }
      setComments(json?.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat ucapan. Coba muat ulang halaman.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, attendance, attendeeCount, guestSlug: guestSlug || undefined }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? 'Gagal mengirim ucapan.');
      }
      setMessage('');
      await loadComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setSubmitting(false);
    }
  };

  const attendingCount = comments.filter((c) => c.attendance === 'hadir').length;

  return (
    <section id="rsvp" className="relative overflow-hidden bg-white px-6 py-20 dark:bg-primary-950/20">
      <FloralOrnament className="pointer-events-none absolute -left-10 -bottom-10 h-36 w-36 text-primary-200 opacity-40 sm:h-48 sm:w-48" />
      <BouquetOrnament flip className="pointer-events-none absolute -right-10 -top-8 h-32 w-32 text-lilac-200 opacity-40 sm:h-44 sm:w-44" />

      <Reveal className="relative text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600">RSVP</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
          Konfirmasi Kehadiran &amp; Ucapan
        </h2>
        {!loading && (
          <p className="mt-2 text-sm text-primary-600 dark:text-primary-300">
            {attendingCount} orang telah mengonfirmasi hadir · {comments.length} ucapan
          </p>
        )}
        <SectionDivider className="mt-4" />
      </Reveal>

      <Reveal delay={0.15} className="mx-auto mt-10 max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-primary-200 bg-white p-6 shadow-md dark:border-primary-800 dark:bg-primary-900/30"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-primary-700 dark:text-primary-200">
              Nama
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameEditedByUser(true);
              }}
              required
              maxLength={60}
              placeholder="Nama Anda"
              className="w-full rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-primary-700 dark:text-primary-200">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ATTENDANCE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = attendance === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setAttendance(opt.value)}
                    className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs transition ${
                      active
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-primary-200 text-primary-600 hover:bg-primary-100 dark:border-primary-700 dark:text-primary-300'
                    }`}
                  >
                    <Icon size={16} />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {attendance !== 'tidak_hadir' && (
            <div>
              <label className="mb-1 block text-xs font-medium text-primary-700 dark:text-primary-200">
                Jumlah Tamu yang Hadir
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAttendeeCount((v) => Math.max(1, v - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-300 text-primary-600 transition hover:bg-primary-100 dark:border-primary-700 dark:text-primary-300"
                  aria-label="Kurangi jumlah tamu"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold text-primary-800 dark:text-primary-100">
                  {attendeeCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAttendeeCount((v) => Math.min(10, v + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-300 text-primary-600 transition hover:bg-primary-100 dark:border-primary-700 dark:text-primary-300"
                  aria-label="Tambah jumlah tamu"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-primary-700 dark:text-primary-200">
              Ucapan &amp; Doa
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={500}
              rows={3}
              placeholder="Tuliskan ucapan dan doa terbaikmu..."
              className="w-full resize-none rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Kirim
          </button>
        </form>
      </Reveal>

      <div className="mx-auto mt-10 max-w-lg space-y-4">
        {loading && (
          <p className="text-center text-sm text-primary-500">Memuat ucapan...</p>
        )}
        {!loading && comments.length === 0 && (
          <p className="text-center text-sm text-primary-500">
            Jadilah yang pertama mengirimkan ucapan.
          </p>
        )}
        {comments.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-primary-200 bg-white p-4 shadow-sm dark:border-primary-800 dark:bg-primary-900/30"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary-800 dark:text-primary-100">
                {c.name}
              </p>
              <span className="text-xs text-primary-400">{timeAgo(c.createdAt)}</span>
            </div>
            <p className="mt-1 text-xs font-medium text-primary-500">
              {ATTENDANCE_OPTIONS.find((o) => o.value === c.attendance)?.label}
            </p>
            <p className="mt-2 text-sm text-primary-700 dark:text-primary-200">{c.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
