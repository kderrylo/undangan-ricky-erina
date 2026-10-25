'use client';

import { useEffect, useState } from 'react';
import { Users, XCircle, Loader2 } from 'lucide-react';

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
    <div className="flex flex-col justify-between rounded-2xl border border-primary-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex items-center gap-2.5 text-primary-500">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <Icon size={18} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
          {label}
        </p>
      </div>
      <div className="mt-4">
        <p className="font-serif text-3xl font-bold text-primary-800 sm:text-4xl">
          {value}
        </p>
        {sub && <p className="mt-1.5 text-xs text-primary-500 sm:text-sm">{sub}</p>}
      </div>
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
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 text-primary-500">
        <Loader2 size={18} className="animate-spin" /> Memuat data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-primary-800 sm:text-3xl">
          Ringkasan
        </h1>
        <p className="mt-1 text-xs text-primary-500 sm:text-sm">
          Pantau perkembangan tamu &amp; konfirmasi kehadiran undangan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card
          icon={Users}
          label="Total Tamu Terdaftar"
          value={stats.rsvp.hadir.people}
          sub={`${stats.rsvp.totalEntries} orang yang masukan ucapan`}
        />
        <Card
          icon={XCircle}
          label="Tidak Hadir"
          value={stats.rsvp.tidak_hadir.entries}
          sub={`${stats.rsvp.tidak_hadir.entries} entri konfirmasi tidak hadir`}
        />
      </div>
    </div>
  );
}