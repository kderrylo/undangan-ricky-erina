# 💌 Undangan Pernikahan — Versi Next.js

Undangan pernikahan digital, ditulis ulang dari template
[dewanakl/undangan](https://github.com/dewanakl/undangan) menggunakan **Next.js 14 (App Router)**,
TypeScript, Tailwind CSS, dan Framer Motion.

Ini bukan port 1:1 dari kode aslinya (yang berbasis Vanilla JS + Bootstrap), melainkan
versi baru yang meniru fitur dan alur yang sama, ditulis dari nol dengan arsitektur
React/Next.js. Kamu bebas memodifikasi, dan proyek ini tetap dilisensikan MIT
seperti sumber inspirasinya.

## ✨ Fitur

- Halaman **cover/gerbang undangan** dengan nama tamu dari parameter URL `?to=Nama`
- **Countdown** menuju hari-H
- Efek **confetti** saat undangan dibuka
- Profil **kedua mempelai** & orang tua
- **Rangkaian acara** (akad & resepsi) lengkap dengan tombol *Tambah ke Google Calendar* dan link Google Maps
- **Love story** timeline
- **Galeri foto** dengan lightbox
- **Amplop digital** (info rekening) dengan tombol salin
- **RSVP + buku tamu** (konfirmasi kehadiran + ucapan), tersimpan lewat API route
- Tombol **musik latar** (play/pause)
- Navigasi mengambang, animasi scroll-reveal, dark mode ready
- Full responsive & di-deploy sebagai aplikasi Next.js modern

## 🚀 Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Coba juga dengan nama tamu:

```
http://localhost:3000/?to=Bapak%20Budi
```

## 🎨 Kustomisasi

Hampir semua konten (nama mempelai, tanggal, acara, love story, galeri, rekening, dsb)
diatur dari satu file:

```
lib/data.ts
```

Ganti juga foto & musik di folder `public/images` dan `public/audio` (saat ini masih
berisi gambar & audio placeholder hasil generate otomatis — silakan ganti dengan foto
dan lagu pilihanmu).

## 🗄️ Tentang Penyimpanan RSVP/Ucapan & Data Tamu

Buku tamu (RSVP + ucapan) dan data tamu sekarang disimpan di **MySQL** (siap dipakai
dengan [Aiven for MySQL](https://aiven.io/mysql)), bukan lagi file JSON lokal.

- `lib/mysql.ts` — koneksi pool ke database (mendukung SSL/CA seperti yang
  diwajibkan Aiven).
- `lib/db.ts` — data akses untuk tabel `rsvp` (ucapan & konfirmasi kehadiran).
- `lib/guests.ts` — data akses untuk tabel `guests` (daftar tamu & link personal).
- `sql/schema.sql` — skema lengkap yang perlu dijalankan sekali di database kamu.

👉 Lihat **[README-ADMIN.md](./README-ADMIN.md)** untuk panduan lengkap: membuat
service MySQL di Aiven, menghubungkan dengan DBeaver, menjalankan migrasi, membuat
akun admin pertama, dan memakai dashboard di `/admin`.

## 🔐 Dashboard Admin

Tersedia dashboard di `/admin` (dilindungi login) untuk mempelai mengelola sendiri:

- **Ringkasan** — statistik jumlah tamu, konfirmasi hadir/tidak hadir/tentative
- **Data Tamu** — tambah tamu, generate link undangan personal (`?to=slug`), tandai
  "sudah dikirim", hapus
- **Ucapan & RSVP** — lihat semua ucapan masuk, sematkan (pin) yang favorit, hapus

Detail setup & kredensial ada di [README-ADMIN.md](./README-ADMIN.md).

## 📦 Build untuk Produksi

```bash
npm run build
npm run start
```

Atau deploy langsung ke [Vercel](https://vercel.com) (ingat catatan penyimpanan RSVP di atas).

## 🗂️ Struktur Proyek

```
app/
  api/comments/route.ts   # API RSVP & buku tamu (publik, tulis ke MySQL)
  api/admin/               # API dashboard admin (login, tamu, ucapan, stats)
  admin/                   # Halaman dashboard admin (login, ringkasan, tamu, ucapan)
  layout.tsx               # Root layout, font, metadata
  page.tsx                 # Entry point halaman
  globals.css
components/
  Cover.tsx                 # Gerbang undangan
  Hero.tsx                  # Countdown & judul
  CoupleInfo.tsx             # Profil mempelai
  EventDetail.tsx            # Akad & resepsi
  LoveStory.tsx
  Gallery.tsx
  GiftInfo.tsx                # Amplop digital
  Guestbook.tsx                # RSVP + ucapan
  FloralOrnament.tsx / SectionDivider.tsx   # Ornamen bunga pink-lilac
  Navbar.tsx / MusicToggle.tsx / Footer.tsx / Reveal.tsx / confetti.ts
  InvitationApp.tsx            # Orkestrasi semua section
  admin/AdminShell.tsx          # Sidebar & shell dashboard admin
lib/
  data.ts       # Semua konten undangan
  types.ts
  mysql.ts      # Koneksi pool MySQL (Aiven)
  db.ts         # Data akses RSVP/ucapan
  guests.ts     # Data akses tamu
  session.ts    # Sesi login (JWT, aman untuk Edge middleware)
  password.ts   # Hash & verifikasi password (bcrypt)
  admins.ts     # Data akses akun admin
  requireAdmin.ts
sql/
  schema.sql    # Skema tabel MySQL — jalankan sekali di database kamu
middleware.ts   # Proteksi halaman /admin/*
public/
  images/    # Foto (placeholder, ganti dengan fotomu)
  audio/     # Musik latar (placeholder, ganti dengan lagumu)
```

## 🙏 Kredit

Ide, alur fitur, dan gaya konten terinspirasi dari template open-source
[dewanakl/undangan](https://github.com/dewanakl/undangan) (Lisensi MIT). Implementasi
kode di repositori ini ditulis ulang sepenuhnya dalam Next.js/React/TypeScript.
