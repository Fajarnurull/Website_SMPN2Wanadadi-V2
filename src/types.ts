export interface BeritaItem {
  id: string;
  judul: string;
  ringkasan: string;
  isi: string;
  fotoSampul: string;
  tanggal: string;
  kategori: string;
  status: 'Terbit' | 'Draf';
  penulis?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: 'Kegiatan' | 'Prestasi' | 'Sarana' | 'Pembelajaran' | string;
  urlFoto: string;
  keterangan: string;
  tanggal?: string;
  createdAt?: string;
}

export interface GuruItem {
  id: string;
  nama: string;
  nip: string;
  mataPelajaran: string;
  jabatan: string;
  kategori?: 'Guru' | 'Tenaga Administrasi' | 'Pimpinan';
  fotoUrl: string;
  urutan?: number;
  createdAt?: string;
}

export interface PendaftarItem {
  id: string;
  noPendaftaran: string;
  namaLengkap: string;
  nisn: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  asalSekolah: string;
  namaOrangTua: string;
  noHp: string;
  alamat: string;
  status: 'Baru' | 'Diverifikasi' | 'Diterima' | 'Ditolak';
  catatan?: string;
  createdAt?: string;
}

export interface PenggunaItem {
  id: string;
  username: string;
  nama: string;
  password: string;
  role: 'admin' | 'kontributor'; // 'admin' (akses penuh) | 'kontributor' (pengunggah berita & prestasi)
  aktif: boolean;
  createdAt?: string;
}

export interface KegiatanGuruItem {
  id: string;
  judul: string;
  kategori: 'Komunitas Belajar' | 'Workshop & Pelatihan' | 'Berbagi Praktik Baik' | 'Supervisi & Refleksi' | 'Rapat & KKG' | string;
  tanggal: string;
  waktu?: string;
  tempat?: string;
  penyelenggara?: string; // misal: "Kombel Spenda Berkibar (SMPN 2 Wanadadi)"
  narasumber?: string;
  deskripsi: string;
  fotoUrl: string;
  tautanMateri?: string;
  status?: 'Terlaksana' | 'Akan Datang';
  createdAt?: string;
  updatedAt?: string;
}

export interface PengaturanSekolah {
  id: string;
  namaSekolah: string;
  slogan: string;
  npsn: string;
  akreditasi: string;
  sambutanKepala: string;
  namaKepala: string;
  fotoKepala: string;
  totalSiswa: number;
  totalGuru: number;
  totalRombel: number;
  alamatLengkap: string;
  email: string;
  telepon: string;
  whatsapp: string;
  jamLayanan: string;
  linkMaps: string;
  statusPpdb: string;
  jadwalPpdb: string;
  syaratPpdb: string;
  fotoGedung?: string; // URL / foto nyata gedung sekolah untuk Hero Beranda
  tipeTampilanGedung?: 'foto' | 'ilustrasi'; // Pilihan menampilkan foto asli atau ilustrasi seni
  youtubeUrl?: string; // Kanal YouTube resmi
  tiktokUrl?: string; // Akun TikTok resmi
  instagramUrl?: string; // Akun Instagram resmi
  facebookUrl?: string; // Akun Facebook resmi
  updatedAt?: string;
}
