'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Plus, Copy, Check, Trash2, Loader2, Send } from 'lucide-react';
import { Guest } from '@/lib/types';

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Umum');
  const [invitedCount, setInvitedCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const loadGuests = async (q?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/guests${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setGuests(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data tamu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, category, invitedCount }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setName('');
      setPhone('');
      setInvitedCount(1);
      await loadGuests(search);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menambahkan tamu.');
    } finally {
      setSubmitting(false);
    }
  };

  const linkFor = (slug: string) => {
    if (typeof window === 'undefined') return `/?to=${slug}`;
    return `${window.location.origin}/?to=${slug}`;
  };

  const copyLink = async (guest: Guest) => {
    try {
      await navigator.clipboard.writeText(linkFor(guest.slug));
      setCopiedId(guest.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore
    }
  };

  const toggleSent = async (guest: Guest) => {
    await fetch(`/api/admin/guests/${guest.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isSent: !guest.isSent }),
    });
    loadGuests(search);
  };

  const removeGuest = async (guest: Guest) => {
    if (!confirm(`Hapus tamu "${guest.name}"?`)) return;
    await fetch(`/api/admin/guests/${guest.id}`, { method: 'DELETE' });
    loadGuests(search);
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-800 dark:text-primary-100">
        Data Tamu
      </h1>
      <p className="mt-1 text-sm text-primary-500 dark:text-primary-400">
        Tambahkan tamu untuk mendapatkan link undangan personal (mis. bisa dikirim lewat WhatsApp).
      </p>

      <form
        onSubmit={handleAdd}
        className="mt-6 grid gap-3 rounded-2xl border border-primary-200 bg-white p-5 shadow-sm dark:border-primary-800 dark:bg-primary-900/30 sm:grid-cols-5"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama tamu"
          required
          className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100 sm:col-span-2"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="No. WhatsApp (opsional)"
          className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
        >
          <option>Umum</option>
          <option>Keluarga</option>
          <option>Teman</option>
          <option>Kantor</option>
        </select>
        <input
          type="number"
          min={1}
          max={10}
          value={invitedCount}
          onChange={(e) => setInvitedCount(Number(e.target.value))}
          className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:opacity-60 sm:col-span-5"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Tambah Tamu
        </button>
      </form>

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

      <div className="mt-6">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            loadGuests(e.target.value);
          }}
          placeholder="Cari nama tamu..."
          className="w-full max-w-sm rounded-lg border border-primary-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-900/30 dark:text-primary-100"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-primary-200 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-900/30">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-primary-100 text-xs uppercase text-primary-400 dark:border-primary-800">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Jumlah</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-primary-400">
                  Memuat...
                </td>
              </tr>
            )}
            {!loading && guests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-primary-400">
                  Belum ada tamu. Tambahkan lewat form di atas.
                </td>
              </tr>
            )}
            {guests.map((guest) => (
              <tr key={guest.id} className="border-b border-primary-50 last:border-0 dark:border-primary-800/60">
                <td className="px-4 py-3">
                  <p className="font-medium text-primary-800 dark:text-primary-100">{guest.name}</p>
                  {guest.phone && <p className="text-xs text-primary-400">{guest.phone}</p>}
                </td>
                <td className="px-4 py-3 text-primary-600 dark:text-primary-300">{guest.category}</td>
                <td className="px-4 py-3 text-primary-600 dark:text-primary-300">{guest.invitedCount}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleSent(guest)}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      guest.isSent
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-300'
                    }`}
                  >
                    <Send size={12} />
                    {guest.isSent ? 'Terkirim' : 'Belum'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => copyLink(guest)}
                      title="Salin link undangan"
                      className="rounded-full p-2 text-primary-500 transition hover:bg-primary-100 dark:hover:bg-primary-800"
                    >
                      {copiedId === guest.id ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => removeGuest(guest)}
                      title="Hapus tamu"
                      className="rounded-full p-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
