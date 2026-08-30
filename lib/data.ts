// ============================================================
// Semua konten undangan diatur dari sini. Ubah sesuai kebutuhanmu.
// ============================================================

export const config = {
  groom: {
    name: 'Paulus',
    fullName: 'Paulus Ricky Kurnianda',
    parents: 'Putra dari Bapak & Ibu Kurnianda',
    instagram: '#',
    photo: '/images/groom.jpg',
  },
  bride: {
    name: 'Erina',
    fullName: 'Theodora Erina Gisela',
    parents: 'Putri dari Bapak & Ibu Gisela',
    instagram: '#',
    photo: '/images/bride.jpg',
  },
  // Tanggal & waktu acara (ISO 8601, sertakan timezone)
  weddingDate: '2026-12-26T08:00:00+07:00',
  events: [
    {
      name: 'Akad Nikah',
      date: '26 Desember 2026',
      time: '08:00 - 10:00 WIB',
      location: 'Kediaman Mempelai Wanita',
      address: 'Jl. Melati No. 10, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com',
    },
    {
      name: 'Resepsi',
      date: '26 Desember 2026',
      time: '11:00 - 14:00 WIB',
      location: 'Gedung Serbaguna Sejahtera',
      address: 'Jl. Anggrek No. 5, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com',
    },
  ],
  loveStory: [
    { year: '2022', title: 'Pertama Bertemu', desc: 'Dipertemukan di sebuah acara kampus yang tidak pernah kami duga akan mengubah hidup kami.' },
    { year: '2023', title: 'Mulai Dekat', desc: 'Perlahan kebersamaan tumbuh menjadi kisah yang lebih serius.' },
    { year: '2026', title: 'Lamaran', desc: 'Sebuah janji diikat sebagai awal menuju hari bahagia ini.' },
    { year: '2026', title: 'Hari Bahagia', desc: 'Dengan restu kedua orang tua, kami memutuskan untuk melangkah ke jenjang pernikahan.' },
  ],
  gallery: [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
    '/images/gallery-6.jpg',
  ],
  gift: {
    bank: [
      { bank: 'BCA', number: '1234567890', name: 'Paulus Ricky Kurnianda' },
      { bank: 'Mandiri', number: '0987654321', name: 'Theodora Erina Gisela' },
    ],
    address: {
      recipient: 'Paulus & Erina',
      address: 'Jl. Melati No. 10, Jakarta Selatan, 12345',
    },
  },
  music: '/audio/wedding-song.mp3',
  hashtag: '#PulusErina❤️',
};

export type EventConfig = (typeof config)['events'][number];
