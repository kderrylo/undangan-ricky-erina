import mysql from 'mysql2/promise';

// ============================================================
// Koneksi MySQL (Aiven) — dipakai untuk data tamu & ucapan/RSVP
// yang dikelola lewat dashboard admin di /admin.
//
// Environment variables yang dibutuhkan (lihat .env.example):
//   MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
//   MYSQL_SSL_CA   -> isi sertifikat CA Aiven (ca.pem), WAJIB untuk Aiven
// ============================================================

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

function buildSsl() {
  // Aiven mewajibkan koneksi TLS. Cara paling aman: tempel isi ca.pem yang
  // diunduh dari Aiven console ke env MYSQL_SSL_CA (boleh dengan literal \n).
  if (process.env.MYSQL_SSL_CA) {
    return {
      ca: process.env.MYSQL_SSL_CA.replace(/\\n/g, '\n'),
      rejectUnauthorized: true,
    };
  }
  // Fallback untuk development cepat jika CA belum ditempel (tidak disarankan
  // untuk production, karena sertifikat server tidak diverifikasi).
  if (process.env.MYSQL_SSL === 'true') {
    return { rejectUnauthorized: false };
  }
  return undefined;
}

export function getPool(): mysql.Pool {
  if (!global._mysqlPool) {
    global._mysqlPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: buildSsl(),
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 5,
      idleTimeout: 60_000,
      dateStrings: true,
      timezone: 'Z',
    });
  }
  return global._mysqlPool;
}
