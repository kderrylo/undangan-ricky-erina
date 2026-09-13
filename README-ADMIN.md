# 🔐 Panduan Setup Database & Dashboard Admin

> **Cara paling cepat & pasti (disarankan):** setelah `.env` terisi (lihat
> bagian 2), jalankan langsung dari terminal:
> ```bash
> npm run db:seed
> ```
> Ini menjalankan `sql/seed.sql` langsung lewat kode Node.js (bukan lewat
> DBeaver), jadi tidak ada risiko salah klik/salah pilih teks seperti di
> DBeaver. Loncat ke **bagian 3** untuk detail lengkapnya. Bagian "Menghubungkan
> dengan DBeaver" tetap ada di bawah kalau kamu tetap mau lihat/edit data
> secara visual, tapi untuk membuat tabel pertama kali, `npm run db:seed`
> jauh lebih gampang.

Panduan ini menjawab poin ke-3 dan ke-4 dari permintaan kustomisasi: menghubungkan
undangan ke MySQL (Aiven) untuk development, membuka database dengan DBeaver, dan
memakai dashboard admin yang mempelai bisa kelola sendiri (mirip dashboard di
[dewanakl/undangan](https://github.com/dewanakl/undangan)).

---

## 1. Tabel apa saja yang perlu dibuat?

Semuanya sudah ditulis di **`sql/schema.sql`**. Ringkasannya ada 4 tabel:

| Tabel      | Fungsi                                                                 |
|------------|-------------------------------------------------------------------------|
| `admins`   | Akun login untuk dashboard (username + password ter-hash)             |
| `guests`   | Daftar tamu undangan: nama, slug link personal (`?to=slug`), kategori, jumlah orang, status terkirim |
| `rsvp`     | Ucapan & konfirmasi kehadiran (hadir/tidak hadir), dikaitkan opsional ke `guests` |
| `settings` | Tabel serbaguna untuk pengaturan yang bisa diedit tanpa redeploy (opsional, belum ada UI-nya) |

Kamu tidak perlu menulis SQL manual — tinggal jalankan file ini sekali di database.

---

## 2. Membuat service MySQL di Aiven

1. Masuk ke [console Aiven](https://console.aiven.io/) → **Create service** → pilih
   **MySQL** → pilih plan (Free/Hobbyist cukup untuk development).
2. Setelah service aktif (status "Running"), buka tab **Overview**. Catat:
   - **Host**
   - **Port**
   - **User** (biasanya `avnadmin`)
   - **Password**
   - **Default database** (biasanya `defaultdb`)
3. Di halaman yang sama, unduh **CA Certificate** (`ca.pem`). Aiven mewajibkan
   koneksi SSL, jadi sertifikat ini wajib dipakai.

Salin `.env.example` menjadi `.env` lalu isi:

```bash
MYSQL_HOST=your-service-name.aivencloud.com
MYSQL_PORT=12345
MYSQL_USER=avnadmin
MYSQL_PASSWORD=isi-dari-aiven
MYSQL_DATABASE=defaultdb
MYSQL_SSL_CA="-----BEGIN CERTIFICATE-----\n...isi ca.pem...\n-----END CERTIFICATE-----"

ADMIN_JWT_SECRET=hasil-dari: openssl rand -base64 48
ADMIN_SETUP_TOKEN=string-acak-untuk-setup-sekali-pakai
```

> Tips: kalau isi `ca.pem` multi-baris terasa merepotkan di `.env`, ganti semua baris
> baru dengan `\n` literal seperti contoh di atas — kode di `lib/mysql.ts` (dan
> `scripts/run-sql.js`) sudah otomatis mengubahnya kembali menjadi baris baru asli.

---

## 3. Membuat tabel — cara termudah: lewat terminal

Setelah `.env` di atas terisi dan kamu sudah `npm install`, dari folder project
jalankan:

```bash
npm run db:seed
```

Script ini (`scripts/run-sql.js`) akan:
1. Baca kredensial dari `.env`
2. Konek ke MySQL Aiven kamu
3. Jalankan seluruh isi `sql/seed.sql` (4 tabel + 1 admin) sekaligus dalam satu proses
4. Menampilkan daftar tabel yang berhasil dibuat, supaya kamu langsung tahu
   hasilnya — tidak perlu tebak-tebakan seperti di DBeaver

Kalau berhasil, outputnya kira-kira begini:

```
🔌 Menghubungkan ke your-service.aivencloud.com:12345 ...
✅ Terhubung. Menjalankan sql/seed.sql ...

  Statement 1: OK (affectedRows: 0)
  Statement 2: OK (affectedRows: 0)
  Statement 3: OK (affectedRows: 0)
  Statement 4: OK (affectedRows: 0)
  Statement 5: OK (affectedRows: 1)

📋 Tabel yang ada sekarang di database:
  - admins
  - guests
  - rsvp
  - settings

🎉 Selesai! Database siap dipakai.
```

Kalau error, pesannya akan menjelaskan penyebabnya (kredensial salah, SSL
belum diisi, dll) — tinggal ikuti instruksinya.

> Kalau cuma mau bikin tabel tanpa akun admin bawaan, pakai `npm run db:schema`
> (menjalankan `sql/schema.sql`) lalu buat admin lewat endpoint setup (bagian 4).

---

## 3b. Alternatif: Menghubungkan dengan DBeaver

Kalau kamu tetap ingin melihat/mengedit data secara visual (bukan untuk
membuat tabel pertama kali — pakai cara di atas untuk itu):

1. Buka DBeaver → **New Database Connection** → pilih **MySQL**.
2. Isi Host/Port/Username/Password/Database sesuai catatan dari Aiven di atas.
3. Buka tab **SSL** di jendela koneksi yang sama:
   - Centang **Use SSL**
   - Pada **CA Certificate**, arahkan ke file `ca.pem` yang tadi diunduh dari Aiven
4. Test Connection → pastikan berhasil → Finish.
5. Buka **SQL Editor** baru pada koneksi tersebut, tempel isi **`sql/seed.sql`**
   (bukan `sql/schema.sql`), lalu jalankan (**Execute Script**, bukan Execute
   Statement, supaya semua `CREATE TABLE` ikut jalan sekaligus). File ini
   membuat ke-4 tabel di atas **dan** langsung mengisi satu akun admin siap
   pakai untuk Paulus & Erina — kredensialnya ada di bagian 4 di bawah.

   > Kalau kamu hanya mau tabelnya saja tanpa akun admin bawaan, pakai
   > `sql/schema.sql` saja, lalu buat admin lewat endpoint setup (lihat bagian 4).

Setelah ini kamu bisa memakai DBeaver kapan saja untuk melihat/mengedit data tamu
dan ucapan secara langsung, sama seperti workflow di template referensi.

---

## 4. Login pertama kali

Kalau kamu menjalankan **`sql/seed.sql`**, admin pertama sudah langsung tersedia —
**database yang tadinya kosong sekarang sudah terisi tabel + 1 akun ini**:

```
URL      : https://domainmu.com/admin  (atau http://localhost:3000/admin)
Username : paulus-erina
Password : PaulusErina2026!
```

**Ganti password ini setelah login pertama.** Belum ada tombol ganti password di
UI, jadi lewat SQL:

```bash
# 1. Generate hash bcrypt untuk password barumu (di folder project, setelah npm install):
node -e "console.log(require('bcryptjs').hashSync('PASSWORD_BARUMU', 10))"
```

```sql
-- 2. Jalankan di DBeaver:
UPDATE admins SET password = '<hasil-hash-dari-langkah-1>' WHERE username = 'paulus-erina';
```

### Alternatif: pakai `sql/schema.sql` + endpoint setup

Kalau kamu menjalankan `sql/schema.sql` (tanpa admin bawaan), buat admin pertama
lewat endpoint sekali-pakai `POST /api/admin/setup`, dilindungi oleh
`ADMIN_SETUP_TOKEN` yang kamu isi sendiri di `.env`:

```bash
curl -X POST https://domainmu.com/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
        "token": "isi-ADMIN_SETUP_TOKEN-kamu",
        "username": "ricky-erina",
        "password": "password-kuat-minimal-8-karakter",
        "name": "Ricky & Erina"
      }'
```

Kalau berhasil, endpoint ini otomatis menolak permintaan berikutnya (supaya tidak
ada yang bisa membuat admin baru tanpa akses ke database).

> ⚠️ Apapun caranya, `ADMIN_JWT_SECRET` di `.env` **wajib** sudah diisi lebih
> dulu — dipakai untuk menandatangani sesi login, bukan untuk password.

---

## 5. Memakai dashboard

Buka `https://domainmu.com/admin` (atau `http://localhost:3000/admin` saat
development) → login dengan username/password yang baru dibuat.

- **Ringkasan** — jumlah tamu terdaftar, link yang sudah dikirim, total konfirmasi
  hadir/tidak hadir/tentative (dihitung per orang, bukan hanya per entri ucapan).
- **Data Tamu** — tambah nama tamu → sistem otomatis membuat *slug* unik untuk link
  personal (`https://domainmu.com/?to=nama-tamu`), yang bisa disalin dan dikirim
  lewat WhatsApp. Tandai "Terkirim" setelah link dibagikan, atau hapus tamu.
- **Ucapan & RSVP** — semua ucapan yang masuk dari halaman undangan tampil di sini.
  Bisa disematkan (pin) supaya tampil paling atas di halaman undangan, atau dihapus
  kalau ada spam/ucapan yang tidak pantas.

Sesi login berlaku 7 hari (disimpan sebagai cookie httpOnly, tidak bisa diakses
lewat JavaScript di browser demi keamanan).

---

## 6. Kalau mau deploy ke Vercel

Semua environment variable di atas (`MYSQL_*`, `ADMIN_JWT_SECRET`,
`ADMIN_SETUP_TOKEN`) tinggal ditambahkan di **Project Settings → Environment
Variables** di Vercel. Karena penyimpanan sekarang di MySQL (bukan file JSON lokal),
data tamu & ucapan tetap aman meskipun di-deploy ke platform serverless.
