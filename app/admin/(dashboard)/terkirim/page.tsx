'use client';

import { useEffect, useState, FormEvent } from 'react';
import {
  Plus,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Loader2,
  UserPlus,
} from 'lucide-react';

interface Guest {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
}

export default function AdminSentLinksPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/guests');
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setGuests(json.data ?? []);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat daftar link tamu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleAddGuest = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || 'Gagal menambahkan tamu');
      }
      setName('');
      await fetchGuests();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGuest = async (id: number, guestName: string) => {
    if (!confirm(`Hapus link undangan untuk "${guestName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/guests/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGuests((prev) => prev.filter((g) => g.id !== id));
      }
    } catch {
      alert('Gagal menghapus tamu');
    }
  };

  const getInvitationUrl = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/?to=${encodeURIComponent(slug)}`;
  };

  const handleCopyLink = async (guest: Guest) => {
    const url = getInvitationUrl(guest.slug);
    await navigator.clipboard.writeText(url);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredGuests = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-semibold text-primary-800 sm:text-3xl">
          Terkirim (Link Undangan)
        </h1>
        <p className="mt-1 text-xs text-primary-500 sm:text-sm">
          Buat dan salin tautan undangan personal untuk dikirimkan kepada tamu.
        </p>
      </div>

      {/* Form Tambah Nama Tamu */}
      <form
        onSubmit={handleAddGuest}
        className="rounded-2xl border border-primary-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="mb-3 flex items-center gap-2 text-primary-700">
          <UserPlus size={18} />
          <h2 className="text-sm font-semibold">Buat Link Tamu Baru</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama tamu (contoh: Budi Santoso & Partner)"
            required
            className="w-full flex-1 rounded-xl border border-primary-200 px-4 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:border-primary-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            Tambah Tamu
          </button>
        </div>

        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </form>

      {/* Bar Pencarian & Total */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-primary-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama tamu..."
            className="w-full rounded-xl border border-primary-200 bg-white py-2 pr-4 pl-9 text-sm text-primary-800 placeholder:text-primary-400 focus:border-primary-500 focus:outline-none"
          />
        </div>
        <p className="text-xs font-medium text-primary-600">
          Menampilkan <span className="font-bold">{filteredGuests.length}</span> dari{' '}
          {guests.length} link tamu
        </p>
      </div>

      {/* Daftar Link Tamu */}
      {loading ? (
        <div className="flex h-40 items-center justify-center gap-2 rounded-2xl border border-primary-200 bg-white text-primary-500">
          <Loader2 size={18} className="animate-spin" /> Memuat daftar link tamu...
        </div>
      ) : filteredGuests.length === 0 ? (
        <div className="rounded-2xl border border-primary-200 bg-white p-8 text-center text-sm text-primary-500">
          Belum ada link tamu yang dibuat.
        </div>
      ) : (
        <>
          {/* Tampilan Mobile: Card List (< 768px) */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredGuests.map((guest) => {
              const isCopied = copiedId === guest.id;
              return (
                <div
                  key={guest.id}
                  className="flex flex-col gap-3 rounded-2xl border border-primary-200 bg-white p-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-primary-900">
                        {guest.name}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-xs text-primary-500">
                        /?to={guest.slug}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteGuest(guest.id, guest.name)}
                      className="rounded-lg p-1.5 text-red-500 transition hover:bg-red-50"
                      title="Hapus Tamu"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(guest)}
                      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        isCopied
                          ? 'bg-green-600 text-white'
                          : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      }`}
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      {isCopied ? 'Tersalin!' : 'Salin Link'}
                    </button>
                    <a
                      href={getInvitationUrl(guest.slug)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-xl border border-primary-200 px-3 py-2 text-xs font-medium text-primary-700 transition hover:bg-primary-50"
                    >
                      <ExternalLink size={14} />
                      Lihat
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tampilan Desktop: Tabel (>= 768px) */}
          <div className="hidden overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-primary-100 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-600">
                <tr>
                  <th className="px-5 py-3.5">Nama Tamu</th>
                  <th className="px-5 py-3.5">Link Parameter</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100">
                {filteredGuests.map((guest) => {
                  const isCopied = copiedId === guest.id;
                  return (
                    <tr key={guest.id} className="transition hover:bg-primary-50/40">
                      <td className="px-5 py-3.5 font-medium text-primary-900">
                        {guest.name}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-primary-500">
                        /?to={guest.slug}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyLink(guest)}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                              isCopied
                                ? 'bg-green-600 text-white'
                                : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                            }`}
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            {isCopied ? 'Tersalin' : 'Salin Link'}
                          </button>

                          <a
                            href={getInvitationUrl(guest.slug)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-primary-200 px-2.5 py-1.5 text-xs font-medium text-primary-600 transition hover:bg-primary-50"
                            title="Buka Undangan"
                          >
                            <ExternalLink size={14} />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDeleteGuest(guest.id, guest.name)}
                            className="inline-flex items-center rounded-lg p-1.5 text-red-500 transition hover:bg-red-50"
                            title="Hapus Tamu"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}