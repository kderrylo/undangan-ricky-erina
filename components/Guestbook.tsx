'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Send, Loader2, Plus, Minus } from 'lucide-react';
import { Attendance, Comment } from '@/lib/types';
import Reveal from './Reveal';
import GiftInfo from './GiftInfo';
import { fontSail } from './FontSail';
import Image from 'next/image';

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
      <span className="h-px w-14 bg-primary-rose" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary-rose" />
      <span className="h-px w-14 bg-primary-rose" />
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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialName);
  const [nameEditedByUser, setNameEditedByUser] = useState(false);
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<Attendance>('hadir');
  const [attendeeCount, setAttendeeCount] = useState(1);

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
        throw new Error(json?.error ?? `Gagal memuat data (HTTP ${res.status}).`);
      }
      setComments(json?.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Ucapan (message) sekarang OPSIONAL, hanya nama yang wajib diisi
    if (!name.trim()) return;

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(), // Bisa string kosong "" jika tidak diisi
          attendance,
          attendeeCount: attendance === 'hadir' ? attendeeCount : 1,
          guestSlug: guestSlug || undefined,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? 'Gagal mengirim konfirmasi kehadiran.');
      }
      setMessage('');
      setSuccessMsg('Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.');
      await loadComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitLabel =
    ATTENDANCE_OPTIONS.find((o) => o.value === attendance)?.label ?? 'Kirim';

  // Hitung total orang yang hadir (akumulasi attendeeCount) & daftar komentar yang ada ucapannya
  const totalAttendingPeople = comments
    .filter((c) => c.attendance === 'hadir')
    .reduce((acc, curr) => acc + (Number((curr as any).attendeeCount ?? (curr as any).attendee_count) || 1), 0);

  const visibleMessages = comments.filter((c) => c.message && c.message.trim().length > 0);

  return (
    <section id="rsvp" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[url(/images/floral-pattern.png)] opacity-90" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal delay={0.1} className="lg:pt-3">
            <GiftInfo />
          </Reveal>

          <Reveal>
            <div className="rounded-3xl bg-[#FFC8E0]/20 p-6 shadow-lg backdrop-blur-sm sm:p-9">
              <div className="text-center">
                <h2 className={`font-script text-4xl text-primary-rose ${fontSail}`}>
                  Konfirmasi Kehadiran
                </h2>
                <DotDivider />
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-primary-rose">
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
                    className="w-full rounded-lg border border-primary-rose bg-white px-3.5 py-2.5 outline-none focus:border-primary-500"
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
                            ? 'bg-primary-rose text-white hover:bg-primary-darkrose'
                            : 'border border-primary-rose text-primary-rose hover:border-primary-darkrose hover:text-primary-darkrose'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {attendance !== 'tidak_hadir' && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-primary-rose">
                      Jumlah orang:
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setAttendeeCount((v) => Math.max(1, v - 1))}
                        className="flex size-7 items-center justify-center rounded-md border border-primary-rose text-base font-semibold text-primary-rose transition hover:bg-primary-rose hover:text-white"
                        aria-label="Kurangi jumlah orang"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="min-w-6 text-center text-base font-semibold text-primary-rose">
                        {attendeeCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttendeeCount((v) => Math.min(10, v + 1))}
                        className="flex size-7 items-center justify-center rounded-md border border-primary-rose text-base font-semibold text-primary-rose transition hover:bg-primary-rose hover:text-white"
                        aria-label="Tambah jumlah orang"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-sm font-medium text-primary-rose">
                      Pesan untuk mempelai:
                    </label>
                    <span className="text-xs italic text-primary-rose/70">
                      (Opsional)
                    </span>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX_LENGTH))}
                    maxLength={MESSAGE_MAX_LENGTH}
                    rows={4}
                    placeholder="Tuliskan ucapan dan doa terbaikmu (opsional)..."
                    className="w-full resize-none rounded-lg border border-primary-rose bg-white px-3.5 py-2.5 outline-none focus:border-primary-500"
                  />
                  <p className="mt-1 text-right text-xs text-primary-rose">
                    {message.length}/{MESSAGE_MAX_LENGTH} karakter
                  </p>
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}
                {successMsg && <p className="text-xs font-medium text-green-700">{successMsg}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-rose px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-darkrose disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  Konfirmasi ({submitLabel})
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Daftar ucapan yang sudah masuk */}
        <div className="relative z-10 mx-auto mt-16 max-w-prose space-y-4 text-primary-rose">
          {!loading && (
            <p className="text-center text-sm">
              {totalAttendingPeople} orang telah mengonfirmasi hadir · {visibleMessages.length} ucapan
            </p>
          )}
          {loading && <p className="text-center text-sm">Memuat ucapan...</p>}
          {!loading && visibleMessages.length === 0 && (
            <p className="text-center text-sm">
              Jadilah yang pertama mengirimkan ucapan.
            </p>
          )}
          <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
            {visibleMessages.map((c) => (
              <div key={c.id} className="rounded-xl bg-[#FCECED] p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold leading-3 text-primary-rose">
                    {c.name}
                  </p>
                  <span className="text-xs text-primary-rose/50">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-primary-rose/50">
                  {ATTENDANCE_OPTIONS.find((o) => o.value === c.attendance)?.label}
                </p>
                <p className="mt-2 text-primary-rose">{c.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Image
        src="/images/flower-facing-left.webp"
        alt="deco"
        width={500}
        height={1}
        className="pointer-events-none absolute -right-16 bottom-0 z-0 w-48 lg:-right-28 lg:w-96"
      />
      <Image
        src="/images/flower-facing-left.webp"
        alt="deco"
        width={500}
        height={1}
        className="pointer-events-none absolute -left-16 bottom-0 z-0 w-48 -scale-x-100 lg:-left-28 lg:w-96"
      />
    </section>
  );
}