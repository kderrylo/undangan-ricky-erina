'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error ?? `Login gagal (HTTP ${res.status}).`);
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50 px-6 dark:bg-ink">
      <div className="w-full max-w-sm rounded-2xl border border-primary-200 bg-white p-8 shadow-xl dark:border-primary-800 dark:bg-primary-900/40">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white">
          <LockKeyhole size={22} />
        </div>
        <h1 className="mt-4 text-center font-serif text-2xl font-semibold text-primary-800 dark:text-primary-100">
          Dashboard Undangan
        </h1>
        <p className="mt-1 text-center text-sm text-primary-500 dark:text-primary-300">
          Masuk untuk mengelola tamu &amp; ucapan
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-primary-700 dark:text-primary-200">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-primary-700 dark:text-primary-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-primary-700 dark:bg-primary-950/40 dark:text-primary-100"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
