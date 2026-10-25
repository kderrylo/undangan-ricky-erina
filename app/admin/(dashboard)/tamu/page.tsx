'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Search,
  Trash2,
  Pin,
  Users,
  MessageSquare,
  Loader2,
} from 'lucide-react';

interface RsvpEntry {
  id: string | number;
  name: string;
  message: string | null;
  attendance: 'hadir' | 'tidak_hadir';
  attendeeCount?: number;
  attendee_count?: number;
  pinned?: boolean | number;
  createdAt?: string;
  created_at?: string;
}

export default function AdminRsvpGuestListPage() {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State Filter
  const [search, setSearch] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'hadir' | 'tidak_hadir'>('all');
  const [messageFilter, setMessageFilter] = useState<'all' | 'with_message' | 'no_message'>('all');

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/comments');
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setEntries(json.data ?? []);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data RSVP tamu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const getCount = (item: RsvpEntry) => {
    return Number(item.attendeeCount ?? item.attendee_count ?? 1);
  };

  const getDateStr = (item: RsvpEntry) => {
    const raw = item.createdAt ?? item.created_at;
    if (!raw) return '-';
    return new Date(raw).toLocaleString('id-ID');
  };

  const handleTogglePin = async (item: RsvpEntry) => {
    try {
      const nextPinned = !Boolean(item.pinned);
      const res = await fetch(`/api/admin/comments/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinned: nextPinned }),
      });
      if (res.ok) {
        await fetchEntries();
      }
    } catch {
      alert('Gagal mengubah status sematan (pin)');
    }
  };

  const handleDelete = async (id: string | number, guestName: string) => {
    if (!confirm(`Hapus data RSVP dari "${guestName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      alert('Gagal menghapus data RSVP');
    }
  };

  const filteredEntries = entries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.message ?? '').toLowerCase().includes(search.toLowerCase());

    const matchesAttendance =
      attendanceFilter === 'all' || item.attendance === attendanceFilter;

    const hasMessage = Boolean(item.message && item.message.trim().length > 0);
    const matchesMessage =
      messageFilter === 'all' ||
      (messageFilter === 'with_message' && hasMessage) ||
      (messageFilter === 'no_message' && !hasMessage);

    return matchesSearch && matchesAttendance && matchesMessage;
  });

  const totalFilteredPeople = filteredEntries.reduce(
    (sum, item) => sum + (item.attendance === 'hadir' ? getCount(item) : 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-primary-800 sm:text-3xl">
            Data Tamu
          </h1>
          <p className="mt-1 text-xs text-primary-500 sm:text-sm">
            Daftar tamu yang telah mengisi RSVP beserta jumlah orang dan pesan ucapan.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-primary-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary-700 shadow-2xs sm:self-auto">
          <Users size={15} className="text-primary-500" />
          Total Orang Hadir:{' '}
          <span className="text-sm font-bold text-primary-900">
            {totalFilteredPeople} orang
          </span>
        </div>
      </div>

      {/* Bar Filter & Pencarian */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-primary-200 bg-white p-4 shadow-xs sm:grid-cols-3">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-primary-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau ucapan..."
            className="w-full rounded-xl border border-primary-200 py-2 pr-3 pl-9 text-xs text-primary-800 placeholder:text-primary-400 focus:border-primary-500 focus:outline-none sm:text-sm"
          />
        </div>

        <select
          value={attendanceFilter}
          onChange={(e) => setAttendanceFilter(e.target.value as any)}
          className="w-full rounded-xl border border-primary-200 bg-white px-3 py-2 text-xs font-medium text-primary-800 focus:border-primary-500 focus:outline-none sm:text-sm"
        >
          <option value="all">Semua Kehadiran</option>
          <option value="hadir">Hadir Saja</option>
          <option value="tidak_hadir">Tidak Hadir Saja</option>
        </select>

        <select
          value={messageFilter}
          onChange={(e) => setMessageFilter(e.target.value as any)}
          className="w-full rounded-xl border border-primary-200 bg-white px-3 py-2 text-xs font-medium text-primary-800 focus:border-primary-500 focus:outline-none sm:text-sm"
        >
          <option value="all">Semua (Dengan / Tanpa Ucapan)</option>
          <option value="with_message">Dengan Ucapan</option>
          <option value="no_message">Tanpa Ucapan (Hanya RSVP)</option>
        </select>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Daftar Tamu RSVP */}
      {loading ? (
        <div className="flex h-40 items-center justify-center gap-2 rounded-2xl border border-primary-200 bg-white text-primary-500">
          <Loader2 size={18} className="animate-spin" /> Memuat data tamu...
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="rounded-2xl border border-primary-200 bg-white p-8 text-center text-sm text-primary-500">
          Belum ada data RSVP yang sesuai dengan filter.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEntries.map((item) => {
            const isHadir = item.attendance === 'hadir';
            const count = getCount(item);
            const hasMessage = Boolean(item.message && item.message.trim().length > 0);
            const isPinned = Boolean(item.pinned);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border bg-white p-4 shadow-2xs transition sm:p-5 ${
                  isPinned
                    ? 'border-primary-400 ring-1 ring-primary-300'
                    : 'border-primary-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-primary-900 sm:text-lg">
                      {item.name}
                    </h3>

                    {isHadir ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        <CheckCircle2 size={13} /> Hadir
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                        <XCircle size={13} /> Tidak Hadir
                      </span>
                    )}

                    {isHadir && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-600">
                        <Users size={12} /> {count} orang
                      </span>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {hasMessage && (
                      <button
                        type="button"
                        onClick={() => handleTogglePin(item)}
                        title={isPinned ? 'Lepas Sematan' : 'Sematkan Ucapan'}
                        className={`rounded-lg p-1.5 transition ${
                          isPinned
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-primary-400 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                      >
                        <Pin size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      title="Hapus Data"
                      className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {hasMessage ? (
                  <p className="mt-2.5 text-sm leading-relaxed text-primary-800">
                    {item.message}
                  </p>
                ) : (
                  <p className="mt-2 flex items-center gap-1.5 text-xs italic text-primary-400">
                    <MessageSquare size={12} /> Hanya konfirmasi kehadiran (tanpa pesan ucapan)
                  </p>
                )}

                <p className="mt-2.5 text-[11px] text-primary-400">
                  {getDateStr(item)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}