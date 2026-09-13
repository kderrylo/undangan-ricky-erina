// ============================================================
// Semua konten undangan diatur dari sini. Ubah sesuai kebutuhanmu.
// ============================================================

export const config = {
  groom: {
    name: 'Paulus',
    fullName: 'Paulus Ricky Kurnianda',
    parents: 'Putra dari Bapak Agustinus Puji Santoso & Ibu Umiyatun',
    instagram: '#',
    photo: '/images/groom.jpg',
  },
  bride: {
    name: 'Erina',
    fullName: 'Theodora Erina Gisela',
    parents: 'Putri dari Bapak Hendrikus Ola Kewegen & Ibu Cyrinia Joice Wirantini',
    instagram: '#',
    photo: '/images/bride.jpg',
  },
  // Tanggal & waktu acara (ISO 8601, sertakan timezone)
  weddingDate: '2026-12-26T12:00:00+07:00',
  events: [
    {
      name: 'Misa Pemberkatan',
      date: '26 Desember 2026',
      time: '12.00 WIB - Selesai',
      location: 'Gereja Katolik Paroki Santo Thomas Rasul, Bojong Indah',
      address: 'Jl. Pakis Raya No. 20, RT.10/RW.7, Rw. Buaya, Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta',
      mapsUrl: 'https://maps.google.com/?q=Gereja+Katolik+Paroki+Santo+Thomas+Rasul+Bojong+Indah',
    },
  ],
  // Kutipan Kitab Suci (paraphrase, bukan kutipan literal terjemahan LAI)
  // seputar tema pernikahan Katolik, ditampilkan di komponen BibleVerse.
  bibleVerses: [
    {
      reference: '1 Korintus 13:4-7',
      text: 'Kasih itu sabar dan murah hati; kasih tidak cemburu, tidak sombong, tidak mencari keuntungan diri sendiri, dan menanggung segala sesuatu.',
    },
    {
      reference: 'Matius 19:6',
      text: 'Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.',
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
      { bank: 'BCA', number: '3990439884', name: 'Paulus Ricky Kurnianda' },
      { bank: 'BCA', number: '4790443263', name: 'Theodora Erina Gisela' },
    ],
    address: {
      recipient: 'Paulus & Erina',
      address: 'Jl. Melati No. 10, Jakarta Selatan, 12345',
    },
  },
  music: '/audio/wedding-song.mp3',
  hashtag: '#PAUevERinlove',
  // Puisi janji setia (dari undangan fisik), ditampilkan di Hero.
  vow: 'I want to be your love forever and ever, without break or decay. When the hills are all flat, the rivers are all dry, when it thunders in winter, when it snows in summer, when heaven and earth mingle — I will always love you, no matter what.',
};

export type EventConfig = (typeof config)['events'][number];
