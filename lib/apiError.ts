import { NextResponse } from 'next/server';

interface MysqlErrorLike {
  code?: string;
  sqlMessage?: string;
  message?: string;
}

/**
 * Menerjemahkan error umum (terutama dari MySQL) menjadi pesan Bahasa
 * Indonesia yang mudah dipahami, supaya kalau ada masalah (tabel belum
 * dibuat, kredensial salah, dsb.) penggunanya langsung tahu apa yang
 * perlu diperbaiki — bukan cuma lihat "Unexpected end of JSON input" di
 * browser.
 */
function describeError(err: unknown): string {
  const e = err as MysqlErrorLike;

  switch (e?.code) {
    case 'ER_NO_SUCH_TABLE':
      return 'Tabel database belum dibuat. Jalankan sql/seed.sql (atau sql/schema.sql) di DBeaver terlebih dahulu.';
    case 'ER_ACCESS_DENIED_ERROR':
      return 'Username/password MySQL salah. Cek kembali MYSQL_USER dan MYSQL_PASSWORD di .env.';
    case 'ER_BAD_DB_ERROR':
      return 'Nama database tidak ditemukan. Cek kembali MYSQL_DATABASE di .env.';
    case 'ECONNREFUSED':
      return 'Tidak bisa terhubung ke server MySQL. Cek MYSQL_HOST dan MYSQL_PORT di .env, dan pastikan service Aiven sedang aktif.';
    case 'ETIMEDOUT':
    case 'PROTOCOL_CONNECTION_LOST':
      return 'Koneksi ke database timeout. Cek koneksi internet server dan status service Aiven.';
    case 'HANDSHAKE_SSL_ERROR':
    case 'HANDSHAKE_NO_SSL_SUPPORT':
      return 'Gagal handshake SSL ke MySQL. Pastikan MYSQL_SSL_CA di .env sudah diisi dengan isi ca.pem dari Aiven.';
    default:
      break;
  }

  if (e?.message?.includes('ADMIN_JWT_SECRET')) {
    return e.message;
  }

  return e?.sqlMessage || e?.message || 'Terjadi kesalahan tak terduga di server.';
}

export function apiErrorResponse(err: unknown, fallbackStatus = 500) {
  // Log lengkap ke server console supaya gampang di-debug dari terminal/log hosting.
  console.error('[api-error]', err);
  return NextResponse.json({ error: describeError(err) }, { status: fallbackStatus });
}
