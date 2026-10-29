import React, { useState } from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  Award, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  School,
  GraduationCap
} from 'lucide-react';
import { GuruItem, PengaturanSekolah } from '../types';

interface ProfilPageProps {
  pengaturan: PengaturanSekolah;
  guruList: GuruItem[];
  onNavigateKombel?: () => void;
}

export const ProfilPage: React.FC<ProfilPageProps> = ({ pengaturan, guruList, onNavigateKombel }) => {
  const [kategoriFilter, setKategoriFilter] = useState<'Semua' | 'Guru' | 'Tenaga Administrasi'>('Semua');

  const fasilitas = [
    {
      nama: 'Ruang Kelas Nyaman & Ber-LCD Proyektor',
      deskripsi: '18 ruang kelas yang dilengkapi sarana multimedia, ventilasi asri, dan pencahayaan optimal.',
      foto: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80'
    },
    {
      nama: 'Laboratorium Komputer & TIK',
      deskripsi: 'Laboratorium komputer lengkap terhubung jaringan internet cepat untuk asesmen ANBK dan pembelajaran digital.',
      foto: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      nama: 'Laboratorium IPA & Sains Terapan',
      deskripsi: 'Peralatan praktikum fisika dan biologi modern untuk mengasah daya analisis serta eksperimen ilmiah.',
      foto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80'
    },
    {
      nama: 'Perpustakaan Pustaka Cendekia',
      deskripsi: 'Koleksi ribuan buku referensi pelajaran, literasi fiksi/non-fiksi, dan ruang baca digital yang tenang.',
      foto: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80'
    },
    {
      nama: 'Sanggar Seni Budaya & Karawitan',
      deskripsi: 'Satu set gamelan Jawa komplit pelog-slendro untuk pelestarian kearifan lokal seni Banyumasan.',
      foto: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
    },
    {
      nama: 'Masjid dan Tempat Ibadah Sekolah',
      deskripsi: 'Pusat kegiatan rohani, shalat dhuha dan dhuhur berjamaah, serta pengajian keagamaan berkala.',
      foto: 'https://images.unsplash.com/photo-1584697964190-705b11a684b0?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="py-8 sm:py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#14264B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border-b-4 border-[#1F7A4D]">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#F2B632] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
              Profil Lembaga Pendidikan
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
              Profil SMP Negeri 2 Wanadadi
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Mengenal lebih dekat sejarah, visi, misi, pimpinan, tenaga pendidik, dan fasilitas unggulan sekolah kami di Kecamatan Wanadadi, Kabupaten Banjarnegara.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Sejarah Singkat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-lg">
              <img 
                src={pengaturan.fotoGedung || "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"} 
                alt="Gedung SMPN 2 Wanadadi" 
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-[#1F7A4D] font-bold text-xs uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3 py-1.5 rounded-full">
              <Building2 className="w-4 h-4 text-[#F2B632]" />
              <span>Jejak Langkah & Sejarah</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
              Dedikasi Melayani Pendidikan Generasi Bangsa di Wanadadi
            </h2>
            <div className="text-slate-700 dark:text-slate-300 space-y-3 text-sm sm:text-base leading-relaxed">
              <p>
                SMP Negeri 2 Wanadadi didirikan atas aspirasi kuat masyarakat Kecamatan Wanadadi yang mendambakan sarana pendidikan lanjutan tingkat pertama yang berkualitas, berkarakter, dan mudah dijangkau di wilayah Banjarnegara bagian barat daya.
              </p>
              <p>
                Sejak awal berdirinya, sekolah ini terus berbenah secara fisik dan mutu akademik. Dari bangunan awal yang sederhana, kini SMPN 2 Wanadadi berkembang pesat menjadi institusi kebanggaan dengan 18 rombongan belajar, fasilitas laboratorium komprehensif, ruang kreasi budaya Banyumasan, dan lingkungan belajar hijau asri bersertifikasi Adiwiyata.
              </p>
              <p>
                Dengan motto <em>"Bertakwa, Berprestasi, Berbudaya"</em>, para guru dan staf terus berinovasi dalam mengimplementasikan Kurikulum Merdeka untuk membekali setiap siswa menghadapi tantangan era teknologi modern tanpa meninggalkan jati diri kearifan lokal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visi & Misi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF2EC] dark:bg-[#132238] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#D5E0D8] dark:border-[#23395B]">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-white dark:bg-slate-800 px-3 py-1 rounded-full">
              Pedoman Utama
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
              Visi dan Misi Sekolah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Visi Card */}
            <div className="bg-white dark:bg-[#0B1426] rounded-2xl p-6 sm:p-8 border border-[#D5E0D8] dark:border-slate-700 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#14264B] text-[#F2B632] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white">
                Visi Sekolah
              </h3>
              <p className="text-base sm:text-lg font-bold text-[#1F7A4D] dark:text-emerald-400 italic bg-[#EAF2EC]/60 dark:bg-emerald-950/40 p-4 rounded-xl border-l-4 border-[#1F7A4D]">
                "Terwujudnya Peserta Didik yang Bertakwa kepada Tuhan Yang Maha Esa, Unggul dalam Prestasi, Mandiri, dan Berbudaya Luhur."
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Visi ini menjadi kompas seluruh aktivitas belajar mengajar di SMP Negeri 2 Wanadadi, menyeimbangkan kecerdasan intelektual, emosional, spiritual, dan keterampilan hidup.
              </p>
            </div>

            {/* Misi Card */}
            <div className="bg-white dark:bg-[#0B1426] rounded-2xl p-6 sm:p-8 border border-[#D5E0D8] dark:border-slate-700 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1F7A4D] text-white flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white">
                Misi Sekolah
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {[
                  'Menumbuhkan penghayatan dan pengamalan nilai-nilai keagamaan dalam kehidupan sehari-hari.',
                  'Melaksanakan pembelajaran yang aktif, inovatif, kreatif, efektif, dan menyenangkan berlandaskan Kurikulum Merdeka.',
                  'Meningkatkan mutu lulusan yang kompetitif dalam bidang akademik dan non-akademik di tingkat kabupaten dan provinsi.',
                  'Mengembangkan potensi bakat, minat, dan kreativitas peserta didik melalui program ekstrakurikuler terarah.',
                  'Melestarikan dan menumbuhkembangkan kecintaan terhadap seni dan kearifan budaya daerah Banyumasan.',
                  'Mewujudkan tata kelola sekolah yang transparan, akuntabel, dan berwawasan lingkungan hijau ramah anak.'
                ].map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1F7A4D] shrink-0 mt-0.5" />
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Fasilitas Sekolah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3 py-1 rounded-full">
            Sarana & Prasarana
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Fasilitas Penunjang Belajar
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Dukungan infrastruktur lengkap untuk kenyamanan dan efektivitas pembelajaran setiap siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fasilitas.map((fas, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[#132238] rounded-2xl overflow-hidden border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-slate-100">
                <img 
                  src={fas.foto} 
                  alt={fas.nama} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#14264B] dark:text-white">
                  {fas.nama}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {fas.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Dewan Guru & Tenaga Kependidikan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3 py-1 rounded-full">
            Pendidik & Tenaga Kependidikan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Dewan Guru & Tenaga Administrasi
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Guru berdedikasi, staf tata usaha, dan tenaga kependidikan profesional yang siap mendampingi proses tumbuh kembang siswa.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center items-center gap-2 mb-10 overflow-x-auto pb-1">
          <button
            onClick={() => setKategoriFilter('Semua')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              kategoriFilter === 'Semua'
                ? 'bg-[#1F7A4D] text-white shadow-md'
                : 'bg-white dark:bg-[#132238] text-slate-700 dark:text-slate-300 border border-[#D5E0D8] dark:border-[#23395B] hover:bg-slate-50'
            }`}
          >
            Semua ({guruList.length})
          </button>
          <button
            onClick={() => setKategoriFilter('Guru')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              kategoriFilter === 'Guru'
                ? 'bg-[#1F7A4D] text-white shadow-md'
                : 'bg-white dark:bg-[#132238] text-slate-700 dark:text-slate-300 border border-[#D5E0D8] dark:border-[#23395B] hover:bg-slate-50'
            }`}
          >
            Dewan Guru
          </button>
          <button
            onClick={() => setKategoriFilter('Tenaga Administrasi')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              kategoriFilter === 'Tenaga Administrasi'
                ? 'bg-[#1F7A4D] text-white shadow-md'
                : 'bg-white dark:bg-[#132238] text-slate-700 dark:text-slate-300 border border-[#D5E0D8] dark:border-[#23395B] hover:bg-slate-50'
            }`}
          >
            Tenaga Administrasi & TU
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guruList
            .filter((guru) => {
              if (kategoriFilter === 'Semua') return true;
              const isTendik = 
                guru.kategori === 'Tenaga Administrasi' || 
                guru.jabatan?.toLowerCase().includes('administrasi') || 
                guru.jabatan?.toLowerCase().includes('tata usaha') || 
                guru.jabatan?.toLowerCase().includes('tu') || 
                guru.jabatan?.toLowerCase().includes('bendahara') || 
                guru.jabatan?.toLowerCase().includes('operator') || 
                guru.jabatan?.toLowerCase().includes('perpustakaan');
              if (kategoriFilter === 'Tenaga Administrasi') return isTendik;
              return !isTendik;
            })
            .map((guru) => {
              const isTendik = 
                guru.kategori === 'Tenaga Administrasi' || 
                guru.jabatan?.toLowerCase().includes('administrasi') || 
                guru.jabatan?.toLowerCase().includes('tata usaha') || 
                guru.jabatan?.toLowerCase().includes('tu') || 
                guru.jabatan?.toLowerCase().includes('bendahara') || 
                guru.jabatan?.toLowerCase().includes('operator') || 
                guru.jabatan?.toLowerCase().includes('perpustakaan');

              return (
                <div 
                  key={guru.id}
                  className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs hover:shadow-md transition-all flex items-center gap-4"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-[#1F7A4D] shadow-sm bg-slate-100">
                    <img 
                      src={guru.fotoUrl} 
                      alt={guru.nama}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      isTendik
                        ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60'
                        : 'text-[#1F7A4D] dark:text-[#F2B632] bg-[#EAF2EC] dark:bg-slate-800'
                    }`}>
                      {guru.jabatan || (isTendik ? 'Tenaga Administrasi' : 'Guru')}
                    </span>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#14264B] dark:text-white truncate">
                      {guru.nama}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
                      {guru.mataPelajaran}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      NIP: {guru.nip}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* 5. Komunitas Belajar (KOMBEL) Spenda Berkibar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#14264B] via-[#1b3566] to-[#1F7A4D] rounded-3xl p-8 sm:p-12 text-white border-4 border-[#F2B632] shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#F2B632] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                Komunitas Belajar (KOMBEL) Sekolah
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
                Komunitas Belajar "Spenda Berkibar"
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Pendidik SMP Negeri 2 Wanadadi aktif mengembangkan diri melalui Kombel Spenda Berkibar. Kami rutin menyelenggarakan workshop Platform Merdeka Mengajar (PMM), telaah modul ajar berdiferensiasi, supervisi klinis, dan diseminasi praktik baik untuk menghadirkan pembelajaran yang bermakna bagi setiap anak.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold">
                  ✓ Penuntasan Aksi Nyata PMM
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold">
                  ✓ Peer Coaching & Kolaborasi Mapel
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold">
                  ✓ Penguatan Rapor Pendidikan
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-3">
              {onNavigateKombel && (
                <button
                  onClick={onNavigateKombel}
                  className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-xl bg-[#F2B632] hover:bg-amber-400 text-[#14264B] font-extrabold text-sm shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#14264B]" />
                  <span>Lihat Seluruh Kegiatan Guru</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
