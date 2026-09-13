'use client';

import { useEffect, useState } from 'react';
import { Users, CheckCircle2, XCircle, Send, Loader2 } from 'lucide-react';

interface Stats {
  rsvp: {
    hadir: { entries: number; people: number };
    tidak_hadir: { entries: number; people: number };
    totalEntries: number;
    totalPeople: number;
  };
  guests: { total: number; totalInvited: number; totalSent: number };
}

function Card({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-primary-200 bg-white p-5 shadow-sm dark:border-primary-800 dark:bg-primary-900/30">
      <div className="flex items-center gap-2 text-primary-500 dark:text-primary-300">
        <Icon size={18} />
        <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-2 font-serif text-3xl font-semibold text-primary-800 dark:text-primary-100">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-primary-500 dark:text-primary-400">{sub}</p>}
    </div>
  );
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setStats(json.data);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!stats) {
    return (
      <div className="flex items-center gap-2 text-primary-500">
        <Loader2 size={16} className="animate-spin" /> Memuat data...
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-primary-800 dark:text-primary-100">
        Ringkasan
      </h1>
      <p className="mt-1 text-sm text-primary-500 dark:text-primary-400">
        Pantau perkembangan tamu &amp; konfirmasi kehadiran undangan.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card icon={Users} label="Total Tamu Terdaftar" value={stats.guests.total} sub={`${stats.guests.totalInvited} orang diundang`} />
        <Card icon={Send} label="Link Terkirim" value={stats.guests.totalSent} />
        <Card icon={CheckCircle2} label="Konfirmasi Hadir" value={stats.rsvp.hadir.people} sub={`${stats.rsvp.hadir.entries} entri ucapan`} />
        <Card icon={XCircle} label="Tidak Hadir" value={stats.rsvp.tidak_hadir.people} sub={`${stats.rsvp.tidak_hadir.entries} entri ucapan`} />
        <Card icon={Users} label="Total Ucapan Masuk" value={stats.rsvp.totalEntries} sub={`${stats.rsvp.totalPeople} total orang`} />
      </div>
    </div>
  );
}
