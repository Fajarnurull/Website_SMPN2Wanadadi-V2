import { BeritaItem, GaleriItem, GuruItem, KegiatanGuruItem, PengaturanSekolah, PendaftarItem, PenggunaItem } from '../types';

export const PENGATURAN_DEFAULT: PengaturanSekolah = {
  id: 'sekolah',
  namaSekolah: 'SMP Negeri 2 Wanadadi',
  slogan: 'Bertakwa, Berprestasi, Berbudaya',
  npsn: '20303889',
  akreditasi: 'A (Unggul)',
  namaKepala: 'H. Bambang Sulistyo, M.Pd.',
  fotoKepala: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  sambutanKepala: `Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk kita semua.\n\nSelamat datang di website resmi SMP Negeri 2 Wanadadi, Kabupaten Banjarnegara. Kami berkomitmen mewujudkan generasi pembelajar yang berakhlak mulia, unggul dalam prestasi akademik maupun non-akademik, serta senantiasa mencintai nilai-nilai kearifan budaya luhur. Melalui portal digital ini, kami berharap komunikasi antara pihak sekolah, orang tua wali, peserta didik, dan masyarakat dapat terjalin secara transparan, harmonis, dan berkelanjutan. Mari bersama-sama membimbing putra-putri kita menuju masa depan gemilang.\n\nWassalamu’alaikum Warahmatullahi Wabarakatuh.`,
  totalSiswa: 576,
  totalGuru: 42,
  totalRombel: 18,
  alamatLengkap: 'Jl. Raya Wanadadi - Tapen KM 0.5, Wanadadi, Kec. Wanadadi, Kab. Banjarnegara, Jawa Tengah 53461',
  email: 'smpn2wanadadi@gmail.com',
  telepon: '(0286) 598123',
  whatsapp: '081229876543',
  jamLayanan: 'Senin - Kamis: 07.00 - 15.30 WIB | Jumat: 07.00 - 11.30 WIB | Sabtu: 07.00 - 13.00 WIB',
  linkMaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.453474921606!2d109.5786448!3d-7.3970899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655909241e8f23%3A0x6b8f75ad8d8b6ce3!2sWanadadi%2C%20Banjarnegara%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  statusPpdb: 'Pendaftaran Dibuka',
  jadwalPpdb: 'Gelombang 1: 15 Mei - 20 Juni 2025 | Verifikasi Berkas: 21 - 25 Juni 2025 | Pengumuman: 28 Juni 2025',
  syaratPpdb: `1. Mengisi formulir pendaftaran online secara lengkap\n2. Fotokopi Ijazah SD/MI atau Surat Keterangan Lulus (SKL) legalisir\n3. Fotokopi Akta Kelahiran dan Kartu Keluarga (KK)\n4. Pas foto berwarna ukuran 3x4 (3 lembar)\n5. Surat Keterangan Nilai Rapor semester 7-11\n6. Sertifikat kejuaraan/prestasi jika ada (Jalur Prestasi)`,
  fotoGedung: '',
  tipeTampilanGedung: 'ilustrasi',
  youtubeUrl: 'https://www.youtube.com/@smpnegeri2wanadadi',
  tiktokUrl: 'https://www.tiktok.com/@smpn2wanadadi',
  instagramUrl: 'https://www.instagram.com/smpn2wanadadi/',
  facebookUrl: 'https://www.facebook.com/smpn2wanadadi',
  updatedAt: new Date().toISOString()
};

export const BERITA_DEFAULT: BeritaItem[] = [
  {
    id: 'berita-1',
    judul: 'Upacara Peringatan Hari Pendidikan Nasional dan Deklarasi Sekolah Ramah Anak',
    ringkasan: 'Seluruh warga sekolah SMP Negeri 2 Wanadadi memperingati Hardiknas dengan mengenakan pakaian adat Nusantara sekaligus meneguhkan komitmen perlindungan peserta didik.',
    isi: `Upacara Hari Pendidikan Nasional di halaman utama SMP Negeri 2 Wanadadi berlangsung dengan khidmat dan semarak. Kepala Sekolah bertindak selaku pembina upacara dan mengajak segenap siswa serta pendidik untuk terus menggelorakan semangat Merdeka Belajar.\n\nDalam kesempatan ini juga dilakukan penandatanganan Deklarasi Sekolah Ramah Anak oleh seluruh dewan guru, perwakilan komite, dan pengurus OSIS. Program ini menegaskan toleransi, anti-perundungan (stop bullying), dan lingkungan belajar yang inklusif, aman, serta membahagiakan bagi seluruh siswa di Kecamatan Wanadadi.\n\nKegiatan diakhiri dengan persembahan tarian tradisional kreasi siswa kelas VII dan VIII yang memukau para hadirin.`,
    fotoSampul: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    tanggal: '02 Mei 2025',
    kategori: 'Kegiatan',
    status: 'Terbit',
    penulis: 'Humas SMPN 2 Wanadadi',
    createdAt: '2025-05-02T08:00:00Z'
  },
  {
    id: 'berita-2',
    judul: 'Tim Pramuka Penggalang Esperowan Wanadadi Raih Juara Umum Tingkat Kwarran Wanadadi',
    ringkasan: 'Prestasi membanggakan kembali diukir oleh regu Elang dan Melati dalam Lomba Tingkat II (LT II) Kepramukaan dengan menyabet 5 medali emas.',
    isi: `Regu Pramuka Penggalang SMP Negeri 2 Wanadadi (Gudep 04.087 - 04.088) sukses menyabet gelar Juara Umum pada perkemahan Lomba Tingkat II yang diselenggarakan Kwartir Ranting Wanadadi, Banjarnegara.\n\nDalam perlombaan yang diikuti oleh 14 pangkalan SMP/MTs se-Kecamatan Wanadadi, regu Esperowan berhasil unggul pada mata lomba Pioneering, Semboyan Isyarat Morse & Semaphore, Penjelajahan Kompas, Pentas Seni Budaya Banyumasan, dan Pertolongan Pertama Pada Kecelakaan (PMR/PPGD).\n\n"Disiplin berlatih dan kekompakan tim menjadi kunci kemenangan anak-anak," ungkap pembina pramuka dengan rasa bangga saat penyerahan piala di apel pagi.`,
    fotoSampul: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=80',
    tanggal: '18 April 2025',
    kategori: 'Prestasi',
    status: 'Terbit',
    penulis: 'Pembina OSIS & Kesiswaan',
    createdAt: '2025-04-18T10:30:00Z'
  },
  {
    id: 'berita-3',
    judul: 'Sosialisasi Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2025/2026 Dibuka',
    ringkasan: 'Panitia PPDB SMP Negeri 2 Wanadadi mengumumkan alur pendaftaran daring dan luring untuk empat jalur penerimaan.',
    isi: `Menjelang tahun ajaran baru, SMP Negeri 2 Wanadadi secara resmi membuka pendaftaran peserta didik baru melalui jalur Zonasi, Afirmasi, Prestasi, dan Perpindahan Tugas Orang Tua.\n\nCalon siswa lulusan SD/MI di wilayah Wanadadi, Banjarmangu, Rakit, dan sekitarnya dapat mendaftar secara online melalui portal website sekolah ini atau mendatangi langsung posko layanan informasi di aula sekolah pada jam kerja.\n\nPanitia menyediakan layanan pendampingan pengisian formulir bagi orang tua yang membutuhkan bimbingan teknis berkas digital. Seluruh proses pendaftaran tidak dipungut biaya apapun (Gratis).`,
    fotoSampul: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80',
    tanggal: '10 April 2025',
    kategori: 'Pengumuman',
    status: 'Terbit',
    penulis: 'Panitia PPDB',
    createdAt: '2025-04-10T09:00:00Z'
  }
];

export const GALERI_DEFAULT: GaleriItem[] = [
  {
    id: 'galeri-1',
    judul: 'Gedung dan Halaman Utama Sekolah Asri',
    kategori: 'Sarana',
    urlFoto: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Lingkungan hijau dan rindang di kompleks pembelajaran SMP Negeri 2 Wanadadi.',
    tanggal: '10 Januari 2025'
  },
  {
    id: 'galeri-2',
    judul: 'Laboratorium Komputer Modern dan TIK',
    kategori: 'Sarana',
    urlFoto: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Fasilitas 3 ruang laboratorium komputer untuk asesmen ANBK dan pembelajaran digital.',
    tanggal: '15 Februari 2025'
  },
  {
    id: 'galeri-3',
    judul: 'Perpustakaan Pustaka Cendekia',
    kategori: 'Sarana',
    urlFoto: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Koleksi ribuan buku pelajaran, fiksi, dan pojok baca digital ber-AC.',
    tanggal: '20 Februari 2025'
  },
  {
    id: 'galeri-4',
    judul: 'Latihan Rutin Pramuka Penggalang',
    kategori: 'Kegiatan',
    urlFoto: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Pembinaan karakter mandiri, kepemimpinan, dan kecintaan pada tanah air.',
    tanggal: '05 Maret 2025'
  },
  {
    id: 'galeri-5',
    judul: 'Pentas Seni dan Karawitan Gamelan Jawa',
    kategori: 'Kegiatan',
    urlFoto: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Pelestarian seni budaya tradisional Banyumasan oleh sanggar karawitan siswa Esperowan.',
    tanggal: '22 Maret 2025'
  },
  {
    id: 'galeri-6',
    judul: 'Praktik Pembelajaran Sains Terbuka (Outdoor Learning)',
    kategori: 'Pembelajaran',
    urlFoto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Eksperimen biologi dan pengamatan ekosistem air tawar Waduk Mrica Wanadadi.',
    tanggal: '03 April 2025'
  },
  {
    id: 'galeri-7',
    judul: 'Juara 1 Turnamen Bola Voli Antar Pelajar SMP',
    kategori: 'Prestasi',
    urlFoto: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Tim bola voli putra meraih piala bupati Banjarnegara dengan permainan solid.',
    tanggal: '12 April 2025'
  },
  {
    id: 'galeri-8',
    judul: 'Peringatan Isra Miraj dan Maulid Nabi di Masjid Sekolah',
    kategori: 'Kegiatan',
    urlFoto: 'https://images.unsplash.com/photo-1584697964190-705b11a684b0?auto=format&fit=crop&w=1000&q=80',
    keterangan: 'Kegiatan keagamaan penguatan akhlak mulia dan ketakwaan seluruh peserta didik.',
    tanggal: '28 Januari 2025'
  }
];

export const GURU_DEFAULT: GuruItem[] = [
  {
    id: 'guru-1',
    nama: 'H. Bambang Sulistyo, M.Pd.',
    nip: '19740512 199903 1 004',
    mataPelajaran: 'Manajemen Pendidikan & Kepala Sekolah',
    jabatan: 'Kepala Sekolah',
    fotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    urutan: 1
  },
  {
    id: 'guru-2',
    nama: 'Dra. Sri Wahyuningsih, M.Si.',
    nip: '19760814 200212 2 003',
    mataPelajaran: 'Ilmu Pengetahuan Alam (IPA)',
    jabatan: 'Wakil Kepala Sekolah Bidang Kurikulum',
    fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    urutan: 2
  },
  {
    id: 'guru-3',
    nama: 'Ahmad Fauzi, S.Pd.',
    nip: '19850322 201001 1 012',
    mataPelajaran: 'Matematika & Pembina OSIS',
    jabatan: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    urutan: 3
  }
];

export const PENDAFTAR_DEFAULT: PendaftarItem[] = [
  {
    id: 'pendaftar-1',
    noPendaftaran: 'PPDB-2025-WNDD-001',
    namaLengkap: 'Rizky Pratama Wijaya',
    nisn: '0102938475',
    tempatLahir: 'Banjarnegara',
    tanggalLahir: '2012-05-14',
    jenisKelamin: 'Laki-laki',
    asalSekolah: 'SD Negeri 1 Wanadadi',
    namaOrangTua: 'Suryono',
    noHp: '081391234567',
    alamat: 'Dusun Karanganyar RT 02 / RW 01, Wanadadi, Banjarnegara',
    status: 'Baru',
    catatan: 'Berkas lengkap, pilihan pertama',
    createdAt: new Date().toISOString()
  },
  {
    id: 'pendaftar-2',
    noPendaftaran: 'PPDB-2025-WNDD-002',
    namaLengkap: 'Naila Anindya Putri',
    nisn: '0108374629',
    tempatLahir: 'Banjarnegara',
    tanggalLahir: '2012-09-20',
    jenisKelamin: 'Perempuan',
    asalSekolah: 'MI Muhammadiyah Wanadadi',
    namaOrangTua: 'Agus Salim',
    noHp: '085741987654',
    alamat: 'Desa Tapen RT 04 / RW 02, Kec. Wanadadi, Banjarnegara',
    status: 'Diverifikasi',
    catatan: 'Jalur Prestasi Tahfidz Al-Quran',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const PENGGUNA_DEFAULT: PenggunaItem[] = [
  {
    id: 'user-admin',
    username: 'admin',
    nama: 'Administrator Utama Esperowan',
    password: 'adminesperowan',
    role: 'admin',
    aktif: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-operator',
    username: 'operator',
    nama: 'Humas & Kontributor Prestasi',
    password: 'beritaesperowan',
    role: 'kontributor',
    aktif: true,
    createdAt: new Date().toISOString()
  }
];

export const KEGIATAN_GURU_DEFAULT: KegiatanGuruItem[] = [
  {
    id: 'kombel-1',
    judul: 'Pertemuan Rutin Komunitas Belajar "Spenda Berkibar": Optimalisasi Platform Merdeka Mengajar (PMM) & Bukti Karya',
    kategori: 'Komunitas Belajar',
    tanggal: '24 Mei 2025',
    waktu: '13.00 - 15.30 WIB',
    tempat: 'Ruang Guru & Laboratorium Komputer SMPN 2 Wanadadi',
    penyelenggara: 'Komunitas Belajar (Kombel) Spenda Berkibar',
    narasumber: 'Dra. Sri Wahyuningsih, M.Si. & Tim Kurikulum',
    deskripsi: 'Kegiatan berkala komunitas belajar guru dalam menuntaskan aksi nyata di Platform Merdeka Mengajar (PMM), berbagi praktik baik modul ajar berdiferensiasi, serta validasi instrumen asesmen sumatif antarmapel.',
    fotoUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    tautanMateri: 'https://guru.kemdikbud.go.id/',
    status: 'Terlaksana',
    createdAt: '2025-05-24T13:00:00Z'
  },
  {
    id: 'kombel-2',
    judul: 'In-House Training (IHT): Penyusunan KOSP dan Modul Ajar Pembelajaran Berdiferensiasi Kurikulum Merdeka',
    kategori: 'Workshop & Pelatihan',
    tanggal: '10 Juni 2025',
    waktu: '08.00 - 15.00 WIB',
    tempat: 'Aula Pertemuan SMP Negeri 2 Wanadadi',
    penyelenggara: 'SMP Negeri 2 Wanadadi & Pengawas Dinas Dikpora Banjarnegara',
    narasumber: 'Drs. H. Mulyono, M.Pd. (Pengawas Pembina)',
    deskripsi: 'Peningkatan kompetensi pedagogik guru dalam merancang alur tujuan pembelajaran (ATP), modul projek penguatan profil pelajar pancasila (P5), dan strategi mengajar yang akomodatif terhadap gaya belajar siswa.',
    fotoUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    tautanMateri: 'https://drive.google.com/',
    status: 'Terlaksana',
    createdAt: '2025-06-10T08:00:00Z'
  },
  {
    id: 'kombel-3',
    judul: 'Diseminasi Praktik Baik: Integrasi Media Digital Interaktif (Canva & Quizizz) pada Asesmen Diagnostik',
    kategori: 'Berbagi Praktik Baik',
    tanggal: '18 Juli 2025',
    waktu: '13.30 - 15.30 WIB',
    tempat: 'Laboratorium Multimedia Esperowan',
    penyelenggara: 'Komunitas Belajar Spenda Berkibar',
    narasumber: 'Endah Puspitasari, S.Pd. (Guru Informatika)',
    deskripsi: 'Pemberdayaan guru antargugus mapel dalam menyusun tes diagnostik kognitif dan non-kognitif yang menyenangkan dengan gamifikasi Quizizz dan lembar kerja kreatif Canva for Education.',
    fotoUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    tautanMateri: 'https://www.canva.com/education/',
    status: 'Terlaksana',
    createdAt: '2025-07-18T13:30:00Z'
  },
  {
    id: 'kombel-4',
    judul: 'Klinik Supervisi Akademik & Observasi Kelas Kolaboratif (Peer Coaching)',
    kategori: 'Supervisi & Refleksi',
    tanggal: '15 Agustus 2025',
    waktu: '09.00 - 12.00 WIB',
    tempat: 'Kelas VIII A & B',
    penyelenggara: 'Tim Penjamin Mutu Pendidikan Sekolah (TPMPS)',
    narasumber: 'H. Bambang Sulistyo, M.Pd. & Guru Senior',
    deskripsi: 'Pelaksanaan supervisi akademik bersiklus positif yang berfokus pada refleksi diri pendidik, penguatan interaksi positif dengan murid, dan manajemen kelas yang kondusif.',
    fotoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    status: 'Terlaksana',
    createdAt: '2025-08-15T09:00:00Z'
  },
  {
    id: 'kombel-5',
    judul: 'Forum KKG & Rapat Kerja Semester: Sinkronisasi Asesmen Sumatif Akhir Semester dan Rapor Pendidikan',
    kategori: 'Rapat & KKG',
    tanggal: '12 November 2025',
    waktu: '13.00 - 16.00 WIB',
    tempat: 'Ruang Guru SMP Negeri 2 Wanadadi',
    penyelenggara: 'Dewan Guru & Kurikulum Esperowan',
    narasumber: 'Dra. Sri Wahyuningsih, M.Si.',
    deskripsi: 'Evaluasi capaian indikator literasi dan numerasi berdasarkan Rapor Pendidikan sekolah serta pemantapan kisi-kisi Asesmen Sumatif berbasis komputer.',
    fotoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    status: 'Terlaksana',
    createdAt: '2025-11-12T13:00:00Z'
  },
  {
    id: 'kombel-6',
    judul: 'Workshop Pemanfaatan AI untuk Asisten Perencanaan Pembelajaran dan Karya Tulis Ilmiah Guru',
    kategori: 'Komunitas Belajar',
    tanggal: '10 Desember 2025',
    waktu: '13.30 - 16.00 WIB',
    tempat: 'Laboratorium Komputer Esperowan',
    penyelenggara: 'Komunitas Belajar Spenda Berkibar',
    narasumber: 'Tim TIK & Komunitas Guru Penggerak',
    deskripsi: 'Eksplorasi etis pemanfaatan kecerdasan buatan dalam merancang rubrik asesmen, diferensiasi konten lembar kerja, dan penyusunan proposal Penelitian Tindakan Kelas (PTK).',
    fotoUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
    tautanMateri: 'https://belajar.id/',
    status: 'Akan Datang',
    createdAt: '2025-12-01T10:00:00Z'
  }
];

