/**
 * Menjalankan file .sql langsung ke database MySQL (Aiven) memakai
 * kredensial dari .env — tanpa perlu copy-paste manual di DBeaver.
 *
 * Cara pakai (dari folder project, setelah `npm install` & `.env` terisi):
 *
 *   node scripts/run-sql.js sql/seed.sql
 *
 * atau lewat npm script:
 *
 *   npm run db:seed
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.error(`\n❌ File .env tidak ditemukan di ${envPath}`);
    console.error('   Salin .env.example menjadi .env dan isi kredensial Aiven kamu dulu.\n');
    process.exit(1);
  }

  const content = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // Buang tanda kutip pembungkus jika ada
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function buildSsl() {
  if (process.env.MYSQL_SSL_CA) {
    return { ca: process.env.MYSQL_SSL_CA.replace(/\\n/g, '\n'), rejectUnauthorized: true };
  }
  if (process.env.MYSQL_SSL === 'true') {
    return { rejectUnauthorized: false };
  }
  return undefined;
}

async function main() {
  loadEnvFile();

  const sqlFile = process.argv[2] || 'sql/seed.sql';
  const sqlPath = path.join(__dirname, '..', sqlFile);

  if (!fs.existsSync(sqlPath)) {
    console.error(`\n❌ File SQL tidak ditemukan: ${sqlPath}\n`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  const required = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`\n❌ Env var berikut belum diisi di .env: ${missing.join(', ')}\n`);
    process.exit(1);
  }

  console.log(`\n🔌 Menghubungkan ke ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT ?? 3306} ...`);

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: buildSsl(),
    multipleStatements: true, // wajib true supaya seluruh file (banyak statement) bisa dijalankan sekaligus
  });

  console.log(`✅ Terhubung. Menjalankan ${sqlFile} ...\n`);

  try {
    const [results] = await connection.query(sql);
    const resultArray = Array.isArray(results) ? results : [results];
    resultArray.forEach((r, i) => {
      if (r && typeof r === 'object' && 'affectedRows' in r) {
        console.log(`  Statement ${i + 1}: OK (affectedRows: ${r.affectedRows})`);
      } else {
        console.log(`  Statement ${i + 1}: OK`);
      }
    });

    const [tables] = await connection.query('SHOW TABLES');
    console.log('\n📋 Tabel yang ada sekarang di database:');
    tables.forEach((row) => console.log('  -', Object.values(row)[0]));

    console.log('\n🎉 Selesai! Database siap dipakai.\n');
  } catch (err) {
    console.error('\n❌ Gagal menjalankan SQL:');
    console.error('  ', err.message);
    console.error('\n   Kode error:', err.code, '\n');
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

main();
