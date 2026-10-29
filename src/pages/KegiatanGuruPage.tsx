import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ExternalLink, 
  Search, 
  Filter, 
  FileText, 
  Video, 
  ChevronRight,
  Share2,
  X
} from 'lucide-react';
import { KegiatanGuruItem, PengaturanSekolah } from '../types';
import { SocialMediaBar } from '../components/SocialMediaBar';

interface KegiatanGuruPageProps {
  kegiatanList: KegiatanGuruItem[];
  pengaturan: PengaturanSekolah;
  onOpenAdmin?: () => void;
}

export const KegiatanGuruPage: React.FC<KegiatanGuruPageProps> = ({
  kegiatanList,
  pengaturan,
  onOpenAdmin
}) => {
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedKegiatan, setSelectedKegiatan] = useState<KegiatanGuruItem | null>(null);

  const kategoriList = [
    'Semua',
    'Komunitas Belajar',
    'Workshop & Pelatihan',
    'Berbagi Praktik Baik',
    'Supervisi & Refleksi',
    'Rapat & KKG'
  ];

  const filteredKegiatan = kegiatanList.filter((item) => {
    const matchKategori = selectedKategori === 'Semua' || item.kategori === selectedKategori;
    const matchSearch = 
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.narasumber && item.narasumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.penyelenggara && item.penyelenggara.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchKategori && matchSearch;
  });

  const totalTerlaksana = kegiatanList.filter(k => k.status === 'Terlaksana').length;
  const totalAkanDatang = kegiatanList.filter(k => k.status === 'Akan Datang').length;

  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#14264B] via-[#1a386b] to-[#1F7A4D] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border-b-4 border-[#F2B632] shadow-xl">
          {/* Subtle background circle decoration */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2B632] text-[#14264B] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Pengembangan Keprofesian Berkelanjutan
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Komunitas Belajar "Spenda Berkibar" & Kegiatan Guru
            </h1>
            
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Ruang kolaboratif pendidik dan tenaga kependidikan SMP Negeri 2 Wanadadi untuk berdiskusi, merancang pembelajaran berdiferensiasi, menuntaskan aksi nyata Platform Merdeka Mengajar (PMM), serta berbagi praktik baik demi kemajuan peserta didik.
            </p>

            {/* Quick stats badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F2B632]" />
                <strong>{totalTerlaksana}</strong> Kegiatan Terlaksana
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-300" />
                <strong>{totalAkanDatang}</strong> Agenda Mendatang
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-300" />
                <strong>{pengaturan.totalGuru || 42}</strong> Guru & Tendik Aktif
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Profil Singkat Kombel Spenda Berkibar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-10 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1F7A4D] dark:text-emerald-400 uppercase tracking-wide">
                <Award className="w-4 h-4" />
                Filosofi Komunitas Belajar Sekolah (Kombel)
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
                Budaya Belajar Bersama Guru untuk Siswa Bahagia
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Komunitas Belajar (Kombel) <strong>Spenda Berkibar</strong> diresmikan sebagai wadah resmi guru SMP Negeri 2 Wanadadi untuk menerapkan siklus inkuiri: <em>Refleksi Awal › Perencanaan › Implementasi › Evaluasi</em>. Seluruh guru saling mendampingi dalam mendalami kurikulum nasional, penguasaan TIK, pembelajaran kontekstual lingkungan Wanadadi, dan asesmen berbasis data Rapor Pendidikan.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#EAF2EC] dark:bg-emerald-950/30 border border-[#D5E0D8] dark:border-emerald-800/40">
                  <h4 className="font-bold text-xs sm:text-sm text-[#14264B] dark:text-emerald-200">
                    Siklus Pertemuan Dua Pekanan
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Diskusi rutin bedah modul ajar, penyiapan media digital, dan validasi lembar kerja siswa.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                  <h4 className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                    Diseminasi Praktik Baik & P5
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Guru saling berbagi metode mengajar inspiratif yang terbukti berhasil meningkatkan keaktifan siswa.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#14264B] text-white rounded-2xl p-6 sm:p-7 space-y-4">
              <span className="text-xs font-bold text-[#F2B632] uppercase tracking-wider block">
                Fokus Utama Kombel
              </span>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <span>Aksi Nyata & Sertifikasi Platform Merdeka Mengajar (PMM)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <span>Pembelajaran Berdiferensiasi & Asesmen Diagnostik</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <span>Peningkatan Rapor Pendidikan (Literasi & Numerasi)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
                  <span>Literasi Digital & Pemanfaatan AI untuk Perangkat Ajar</span>
                </li>
              </ul>
              <div className="pt-2">
                <a
                  href="https://guru.kemdikbud.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1F7A4D] hover:bg-emerald-600 text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F2B632]" />
                  <span>Buka Portal PMM Kemendikbudristek</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setSelectedKategori(kat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedKategori === kat
                    ? 'bg-[#1F7A4D] text-white shadow-md'
                    : 'bg-white dark:bg-[#132238] text-slate-700 dark:text-slate-300 border border-[#D5E0D8] dark:border-[#23395B] hover:bg-slate-50'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kegiatan, narasumber..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#132238] border border-[#D5E0D8] dark:border-[#23395B] text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#1F7A4D]"
            />
          </div>

        </div>
      </section>

      {/* 4. Daftar Kartu Kegiatan Guru & Kombel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredKegiatan.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#132238] rounded-3xl border border-[#D5E0D8] dark:border-[#23395B] p-8 space-y-3">
            <Users className="w-12 h-12 text-slate-400 mx-auto stroke-1" />
            <h3 className="text-lg font-bold text-[#14264B] dark:text-white">
              Tidak Ada Kegiatan yang Sesuai
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Tidak ditemukan data kegiatan untuk kategori atau kata kunci "{searchQuery}". Silakan coba ubah pencarian.
            </p>
            <button
              onClick={() => {
                setSelectedKategori('Semua');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#1F7A4D] hover:underline"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKegiatan.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedKegiatan(item)}
                className="group bg-white dark:bg-[#132238] rounded-3xl overflow-hidden border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] dark:hover:border-[#F2B632] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image banner with status tag */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <img 
                      src={item.fotoUrl} 
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#1F7A4D] text-white shadow">
                        {item.kategori}
                      </span>
                      {item.status && (
                        <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow ${
                          item.status === 'Terlaksana'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#F2B632]" />
                        {item.tanggal}
                      </span>
                      {item.waktu && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.waktu}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#14264B] dark:text-white group-hover:text-[#1F7A4D] dark:group-hover:text-[#F2B632] transition-colors leading-snug line-clamp-2">
                      {item.judul}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.deskripsi}
                    </p>

                    {item.narasumber && (
                      <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Narasumber:</span>
                        <span className="truncate">{item.narasumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer action */}
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#1F7A4D] dark:text-[#F2B632] flex items-center gap-1">
                    Lihat Dokumentasi & Materi
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {item.tautanMateri && (
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-blue-500" />
                      Materi Ada
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Tautan Media Sosial Resmi Terkait Video & Konten Kegiatan Guru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-[#14264B] to-slate-900 rounded-3xl p-6 sm:p-10 text-white border-2 border-white/10 shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#F2B632] uppercase tracking-wider">
                Dokumentasi Multimedia & Media Sosial
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Tonton Video Kegiatan Guru di Saluran Resmi Kami
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Saksikan video gelar karya P5, rekaman workshop kombel, cuplikan pembelajaran seru, dan warta prestasi di YouTube, TikTok, dan Instagram SMPN 2 Wanadadi.
              </p>
            </div>
            <SocialMediaBar pengaturan={pengaturan} variant="buttons" />
          </div>

          <SocialMediaBar pengaturan={pengaturan} variant="cards" />
        </div>
      </section>

      {/* 6. Modal Detail Kegiatan */}
      {selectedKegiatan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-[#132238] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
              <img 
                src={selectedKegiatan.fotoUrl} 
                alt={selectedKegiatan.judul}
                className="w-full h-full object-cover" 
              />
              <button
                onClick={() => setSelectedKegiatan(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1F7A4D] text-white shadow">
                  {selectedKegiatan.kategori}
                </span>
                {selectedKegiatan.status && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#14264B] shadow">
                    {selectedKegiatan.status}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-[#14264B] dark:text-[#F2B632]">
                    <Calendar className="w-4 h-4" />
                    {selectedKegiatan.tanggal}
                  </span>
                  {selectedKegiatan.waktu && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedKegiatan.waktu}
                    </span>
                  )}
                  {selectedKegiatan.tempat && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedKegiatan.tempat}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading leading-snug">
                  {selectedKegiatan.judul}
                </h2>
              </div>

              {/* Speaker / Organizer meta */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-2 text-xs sm:text-sm">
                {selectedKegiatan.penyelenggara && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-200 min-w-[110px]">Penyelenggara:</span>
                    <span className="text-slate-600 dark:text-slate-300">{selectedKegiatan.penyelenggara}</span>
                  </div>
                )}
                {selectedKegiatan.narasumber && (
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-200 min-w-[110px]">Narasumber:</span>
                    <span className="text-[#1F7A4D] dark:text-emerald-300 font-semibold">{selectedKegiatan.narasumber}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Deskripsi & Rangkuman Kegiatan:
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedKegiatan.deskripsi}
                </p>
              </div>

              {selectedKegiatan.tautanMateri && (
                <div className="pt-2">
                  <a
                    href={selectedKegiatan.tautanMateri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                  >
                    <FileText className="w-4 h-4 text-[#F2B632]" />
                    <span>Akses Berkas / Modul Materi Pembelajaran</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedKegiatan(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
