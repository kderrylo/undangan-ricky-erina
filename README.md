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

## 🗄️ Tentang Penyimpanan RSVP/Ucapan

Buku tamu (RSVP + ucapan) disimpan lewat API route `app/api/comments/route.ts`, yang
saat ini menulis ke file JSON lokal (`.data/comments.json`) melalui `lib/db.ts`.

- **Cocok untuk:** development lokal, atau hosting sendiri di VPS/server Node.js yang
  filesystem-nya persisten (PM2, Docker, dsb).
- **Tidak cocok untuk:** platform serverless seperti Vercel/Netlify, karena filesystem
  di sana bersifat sementara (setiap deploy/instance baru akan mereset data).

Kalau kamu deploy ke Vercel atau ingin data yang benar-benar persisten, ganti isi
`lib/db.ts` dengan koneksi ke database sungguhan, misalnya:

- [Supabase](https://supabase.com) (Postgres, gratis untuk skala kecil)
- [Turso](https://turso.tech) (SQLite di edge)
- [PlanetScale](https://planetscale.com) (MySQL)
- Firebase Firestore

Struktur data (`Comment`) sudah didefinisikan di `lib/types.ts`, jadi kamu tinggal
mengganti implementasi `getComments()` dan `addComment()` tanpa mengubah komponen UI.

## 📦 Build untuk Produksi

```bash
npm run build
npm run start
```

Atau deploy langsung ke [Vercel](https://vercel.com) (ingat catatan penyimpanan RSVP di atas).

## 🗂️ Struktur Proyek

```
app/
  api/comments/route.ts   # API RSVP & buku tamu
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
  Navbar.tsx / MusicToggle.tsx / Footer.tsx / Reveal.tsx / confetti.ts
  InvitationApp.tsx            # Orkestrasi semua section
lib/
  data.ts    # Semua konten undangan
  db.ts      # Penyimpanan RSVP (file JSON — ganti untuk produksi)
  types.ts
public/
  images/    # Foto (placeholder, ganti dengan fotomu)
  audio/     # Musik latar (placeholder, ganti dengan lagumu)
```

## 🙏 Kredit

Ide, alur fitur, dan gaya konten terinspirasi dari template open-source
[dewanakl/undangan](https://github.com/dewanakl/undangan) (Lisensi MIT). Implementasi
kode di repositori ini ditulis ulang sepenuhnya dalam Next.js/React/TypeScript.
