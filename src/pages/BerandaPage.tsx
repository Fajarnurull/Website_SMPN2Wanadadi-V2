import React from 'react';
import { 
  ArrowRight, 
  Calendar, 
  User, 
  ChevronRight, 
  Sparkles, 
  Compass, 
  Heart, 
  Music, 
  Trophy, 
  Cpu, 
  Quote, 
  GraduationCap, 
  Eye,
  CheckCircle2,
  Users,
  Video
} from 'lucide-react';
import { BeritaItem, GaleriItem, KegiatanGuruItem, PengaturanSekolah } from '../types';
import { HeroSection } from '../components/HeroSection';
import { SocialMediaBar } from '../components/SocialMediaBar';

interface BerandaPageProps {
  pengaturan: PengaturanSekolah;
  beritaList: BeritaItem[];
  galeriList: GaleriItem[];
  kegiatanList?: KegiatanGuruItem[];
  setActiveTab: (tab: string) => void;
  onSelectBerita: (berita: BeritaItem) => void;
  onSelectGaleri: (foto: GaleriItem) => void;
  onSelectKegiatan?: (kegiatan: KegiatanGuruItem) => void;
}

export const BerandaPage: React.FC<BerandaPageProps> = ({
  pengaturan,
  beritaList,
  galeriList,
  kegiatanList = [],
  setActiveTab,
  onSelectBerita,
  onSelectGaleri,
  onSelectKegiatan
}) => {
  // Take top 3 published news
  const latestBerita = beritaList.filter(b => b.status === 'Terbit').slice(0, 3);
  // Take top 3 Kombel activities
  const latestKombel = kegiatanList.slice(0, 3);
  // Take top 4 gallery highlights
  const featuredGaleri = galeriList.slice(0, 4);

  const ekskulUnggulan = [
    {
      nama: 'Pramuka Penggalang Gudep Esperowan',
      ikon: Compass,
      warna: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      deskripsi: 'Juara umum LT-II Kwarran Wanadadi. Pembinaan disiplin, kepemimpinan, dan kemandirian berkemah.'
    },
    {
      nama: 'PMR Madya & UKS',
      ikon: Heart,
      warna: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
      deskripsi: 'Kader kesehatan remaja terlatih, pertolongan pertama, donor darah, dan kebersihan lingkungan sekolah.'
    },
    {
      nama: 'Karawitan & Seni Tari Banyumasan',
      ikon: Music,
      warna: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      deskripsi: 'Pelestarian gamelan laras slendro-pelog dan tari tradisional Jawa Tengah dengan instruktur berpengalaman.'
    },
    {
      nama: 'Klub Olahraga Bola Voli & Futsal',
      ikon: Trophy,
      warna: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
      deskripsi: 'Pengembangan talenta atletik dengan lapangan representatif serta partisipasi turnamen pelajar antarsekolah.'
    },
    {
      nama: 'Karya Ilmiah Remaja & Robotik TIK',
      ikon: Cpu,
      warna: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
      deskripsi: 'Eksperimen sains terapan, coding pengenalan kecerdasan buatan, dan penulisan riset ilmiah remaja.'
    },
    {
      nama: 'Rohis & Seni Hadroh Al-Ikhlas',
      ikon: Sparkles,
      warna: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
      deskripsi: 'Kajian ketakwaan berkala, pembiasaan shalat berjamaah, dan lantunan shalawat rebana seni islami.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. Hero and Statistics Section */}
      <HeroSection 
        pengaturan={pengaturan}
        onNavigatePpdb={() => {
          setActiveTab('ppdb');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateProfil={() => {
          setActiveTab('profil');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Sambutan Kepala Sekolah Singkat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Foto Kepala Sekolah */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 border-[#1F7A4D] shadow-xl group">
                <img 
                  src={pengaturan.fotoKepala || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'} 
                  alt={pengaturan.namaKepala}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                  <span className="text-[11px] font-bold text-[#F2B632] uppercase tracking-wider">
                    Kepala Sekolah
                  </span>
                </div>
              </div>
              <h3 className="mt-4 font-heading font-bold text-lg text-[#14264B] dark:text-white">
                {pengaturan.namaKepala}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Kepala SMP Negeri 2 Wanadadi
              </p>
            </div>

            {/* Isi Sambutan Singkat */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[#1F7A4D] dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
                <Quote className="w-5 h-5" />
                <span>Sambutan Kepala Sekolah</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
                Membina Generasi yang Bertakwa, Berilmu, dan Berakhlak Mulia
              </h2>
              <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line border-l-4 border-[#1F7A4D] pl-4 italic">
                {pengaturan.sambutanKepala}
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setActiveTab('profil');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1F7A4D] dark:text-emerald-400 hover:text-[#16623D] transition-colors cursor-pointer group"
                >
                  <span>Baca Selengkapnya Visi & Sejarah Sekolah</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Ekstrakurikuler Unggulan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3.5 py-1.5 rounded-full border border-[#D5E0D8] dark:border-emerald-800">
            Bakat & Karakter
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Ekstrakurikuler Unggulan
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Wadah pengembangan minat, bakat, kepemimpinan, dan pelestarian budaya bagi setiap peserta didik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ekskulUnggulan.map((ekskul, idx) => {
            const Icon = ekskul.ikon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-[#132238] rounded-2xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${ekskul.warna}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white group-hover:text-[#1F7A4D] transition-colors mb-2">
                  {ekskul.nama}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ekskul.deskripsi}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. 3 Berita & Pengumuman Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3 py-1 rounded-full border border-[#D5E0D8]">
              Warta Sekolah
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading mt-2">
              Kabar & Prestasi Terkini
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Informasi kegiatan resmi, agenda akademik, dan prestasi siswa SMPN 2 Wanadadi.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl text-sm font-bold text-[#1F7A4D] dark:text-emerald-400 hover:bg-[#EAF2EC] dark:hover:bg-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Lihat Semua Berita</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBerita.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectBerita(item)}
              className="bg-white dark:bg-[#132238] rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img 
                  src={item.fotoSampul} 
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-[#14264B]/90 backdrop-blur-sm text-[#F2B632] text-xs font-bold px-2.5 py-1 rounded-lg">
                  {item.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.tanggal}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {item.penulis || 'Humas'}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#14264B] dark:text-white line-clamp-2 group-hover:text-[#1F7A4D] transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#1F7A4D] dark:text-emerald-400">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Galeri Pilihan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3 py-1 rounded-full border border-[#D5E0D8]">
              Dokumentasi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading mt-2">
              Galeri Pilihan Kegiatan
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Potret aktivitas belajar, praktikum, sarana sekolah, dan kreasi seni di Esperowan Wanadadi.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('galeri');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl text-sm font-bold text-[#1F7A4D] dark:text-emerald-400 hover:bg-[#EAF2EC] dark:hover:bg-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Buka Seluruh Galeri</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredGaleri.map((foto) => (
            <div
              key={foto.id}
              onClick={() => onSelectGaleri(foto)}
              className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#D5E0D8] dark:border-[#23395B] group cursor-pointer shadow-xs hover:shadow-lg transition-all"
            >
              <img 
                src={foto.urlFoto} 
                alt={foto.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-3 sm:p-4 flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs font-bold text-[#F2B632] uppercase">
                  {foto.kategori}
                </span>
                <p className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                  {foto.judul}
                </p>
              </div>
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Komunitas Belajar (KOMBEL) Spenda Berkibar & Kegiatan Pendidik */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#14264B] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border-b-4 border-[#1F7A4D] shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-[#F2B632] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                Kolaborasi Pendidik & Tenaga Kependidikan
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
                Kegiatan Guru & Komunitas Belajar (KOMBEL)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Peningkatan kompetensi berkelanjutan bapak ibu guru melalui Kombel <strong>"Spenda Berkibar"</strong>, workshop PMM, dan diseminasi praktik baik untuk pembelajaran berkualitas.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('kegiatan-guru');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-[#1F7A4D] hover:bg-emerald-600 text-white transition-all shadow cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Users className="w-4 h-4 text-[#F2B632]" />
              <span>Lihat Semua Kegiatan Guru</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestKombel.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectKegiatan) {
                    onSelectKegiatan(item);
                  }
                  setActiveTab('kegiatan-guru');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-[#F2B632] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="relative h-40 rounded-xl overflow-hidden bg-slate-800">
                    <img 
                      src={item.fotoUrl} 
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F7A4D] text-white">
                        {item.kategori}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#F2B632]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.tanggal}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white group-hover:text-[#F2B632] transition-colors line-clamp-2 leading-snug">
                    {item.judul}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-white">
                  <span>Lihat Rangkuman</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Saluran Media Sosial Resmi (YouTube, TikTok, Instagram) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3 py-1 rounded-full border border-[#D5E0D8]">
                Kanal Resmi Sekolah
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
                Ikuti Media Sosial SMP Negeri 2 Wanadadi
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Temukan video dokumentasi keseruan belajar, pentas karawitan, tips belajar guru, dan ragam kreativitas siswa di YouTube, TikTok, dan Instagram resmi kami.
              </p>
            </div>
            
            <SocialMediaBar pengaturan={pengaturan} variant="buttons" />
          </div>

          {/* Social Cards Display */}
          <SocialMediaBar pengaturan={pengaturan} variant="cards" />
        </div>
      </section>

      {/* 8. Banner Ajakan Daftar PPDB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#14264B] via-[#1b3566] to-[#1F7A4D] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border-4 border-[#F2B632]">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2B632] text-[#14264B] text-xs font-extrabold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Penerimaan Siswa Baru Dibuka
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Siap Bergabung dengan Keluarga Besar Esperowan Wanadadi?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Daftarkan putra-putri Anda sekarang secara mudah, transparan, dan tanpa dipungut biaya pendaftaran. Kami siap membimbing dan mengantarkan prestasi terbaik mereka.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('ppdb');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] rounded-xl bg-[#F2B632] hover:bg-amber-400 text-[#14264B] font-extrabold text-base shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-[#14264B]" />
                <span>Formulir PPDB Online Sekarang</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('kontak');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 min-h-[48px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/20 transition-colors cursor-pointer"
              >
                <span>Tanya Posko PPDB</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
