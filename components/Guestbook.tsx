'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Attendance, Comment } from '@/lib/types';
import Reveal from './Reveal';
import GiftInfo from './GiftInfo';

const ATTENDANCE_OPTIONS: { value: Attendance; label: string }[] = [
  { value: 'hadir', label: 'Hadir' },
  { value: 'tidak_hadir', label: 'Tidak Hadir' },
];

const MESSAGE_MAX_LENGTH = 100;

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

function DotDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-primary-300" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
      <span className="h-px w-14 bg-primary-300" />
    </div>
  );
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

  const submitLabel = ATTENDANCE_OPTIONS.find((o) => o.value === attendance)?.label ?? 'Kirim';

  return (
    <section id="rsvp" className="relative overflow-hidden bg-white dark:bg-ink">
      {/* Background motif bunga, ditumpuk di atas BG putih */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90 bg-[url(/images/floral-pattern.png)] bg-repeat bg-size-[5rem]"
        // style={{
        //   backgroundImage: 'url(/images/floral-pattern.png)',
        //   // backgroundRepeat: 'repeat',
        //   backgroundSize: '480px auto',
        // }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* ===== Kolom 1 (mobile: atas): Konfirmasi Kehadiran ===== */}
          <Reveal>
            <div className="rounded-3xl bg-primary-100/70 p-6 shadow-sm backdrop-blur-sm dark:bg-primary-900/40 sm:p-9">
              <div className="text-center">
                <h2 className="font-script text-4xl text-primary-800 dark:text-primary-100">
                  Konfirmasi Kehadiran
                </h2>
                <DotDivider />
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm text-primary-700 dark:text-primary-200">
                    Nama:
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
                    className="w-full rounded-lg border border-primary-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {ATTENDANCE_OPTIONS.map((opt) => {
                    const active = attendance === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setAttendance(opt.value)}
                        className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                          active
                            ? 'bg-primary-600 text-white'
                            : 'border border-primary-200 bg-white text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:bg-transparent dark:text-primary-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {attendance !== 'tidak_hadir' && (
                  <div>
                    <label className="mb-1.5 block text-sm text-primary-700 dark:text-primary-200">
                      Jumlah tamu:
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setAttendeeCount((v) => Math.max(1, v - 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-600 text-base font-semibold text-white transition hover:bg-primary-700"
                        aria-label="Kurangi jumlah tamu"
                      >
                        −
                      </button>
                      <span className="text-base font-semibold text-primary-800 dark:text-primary-100">
                        {attendeeCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttendeeCount((v) => Math.min(10, v + 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-primary-300 text-base font-semibold text-primary-600 transition hover:bg-primary-50 dark:border-primary-700 dark:text-primary-300"
                        aria-label="Tambah jumlah tamu"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm text-primary-700 dark:text-primary-200">
                    Pesan untuk mempelai:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX_LENGTH))}
                    required
                    maxLength={MESSAGE_MAX_LENGTH}
                    rows={4}
                    placeholder="Tuliskan ucapan dan doa terbaikmu..."
                    className="w-full resize-none rounded-lg border border-primary-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
                  />
                  <p className="mt-1 text-right text-xs text-primary-400">
                    {message.length}/{MESSAGE_MAX_LENGTH} karakter
                  </p>
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-800 disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {submitLabel}
                </button>
              </form>
            </div>
          </Reveal>

          {/* ===== Kolom 2 (mobile: bawah): Tanda Kasih ===== */}
          <Reveal delay={0.1} className="lg:pt-3">
            <GiftInfo />
          </Reveal>
        </div>

        {/* Daftar ucapan yang sudah masuk */}
        <div className="mx-auto mt-16 max-w-lg space-y-4">
          {!loading && (
            <p className="text-center text-xs text-primary-500 dark:text-primary-400">
              {comments.filter((c) => c.attendance === 'hadir').length} orang telah mengonfirmasi
              hadir · {comments.length} ucapan
            </p>
          )}
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
              className="rounded-xl border border-primary-200 bg-white/90 p-4 shadow-sm dark:border-primary-800 dark:bg-primary-900/30"
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
      </div>
    </section>
  );
}