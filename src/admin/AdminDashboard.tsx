import React, { useState } from 'react';
import { 
  Newspaper, 
  Image as ImageIcon, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Sparkles, 
  ExternalLink,
  Database,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  UserPlus,
  ShieldCheck,
  Trophy,
  BookOpen
} from 'lucide-react';
import { 
  BeritaItem, 
  GaleriItem, 
  GuruItem, 
  KegiatanGuruItem,
  PendaftarItem, 
  PengaturanSekolah, 
  PenggunaItem 
} from '../types';
import { seedInitialFirestoreData } from '../services/schoolService';

interface AdminDashboardProps {
  currentUser: PenggunaItem;
  penggunaList: PenggunaItem[];
  beritaList: BeritaItem[];
  galeriList: GaleriItem[];
  guruList: GuruItem[];
  pendaftarList: PendaftarItem[];
  kegiatanList?: KegiatanGuruItem[];
  pengaturan: PengaturanSekolah;
  setActiveSection: (section: string) => void;
  onRefreshData: () => void;
  onBackToPublic: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  penggunaList,
  beritaList,
  galeriList,
  guruList,
  pendaftarList,
  kegiatanList = [],
  pengaturan,
  setActiveSection,
  onRefreshData,
  onBackToPublic
}) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const publishedNewsCount = beritaList.filter(b => b.status === 'Terbit').length;
  const draftNewsCount = beritaList.filter(b => b.status === 'Draf').length;
  
  const newRegistrantsCount = pendaftarList.filter(p => p.status === 'Baru').length;
  const verifiedCount = pendaftarList.filter(p => p.status === 'Diverifikasi').length;
  const acceptedCount = pendaftarList.filter(p => p.status === 'Diterima').length;

  const handleSeed = async () => {
    if (!window.confirm('Muat data awal resmi (3 berita, 8 foto galeri, 3 guru, akun admin/operator, dan profil sekolah) ke Firestore?')) {
      return;
    }
    setIsSeeding(true);
    setSeedResult(null);
    const res = await seedInitialFirestoreData();
    setIsSeeding(false);
    setSeedResult(res.message);
    if (res.success) {
      onRefreshData();
    }
  };

  const isFullAdmin = currentUser.role === 'admin';

  return (
    <div className="space-y-8">
      
      {/* Welcome header with user identity */}
      <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-wider bg-[#EAF2EC] dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-[#D5E0D8]">
              {isFullAdmin ? 'Konsol Administrator Utama' : 'Area Operator Berita & Prestasi'}
            </span>
            <span className="text-xs font-mono font-semibold text-slate-500">
              @{currentUser.username}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14264B] dark:text-white font-heading mt-2">
            Halo, {currentUser.nama}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isFullAdmin
              ? 'Anda memiliki akses penuh untuk mengelola berita, galeri, PPDB, pengaturan, dan menambah user operator.'
              : 'Anda dapat mengupload, menulis, dan menerbitkan berita serta prestasi terkini sekolah.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isFullAdmin && (
            <button
              onClick={() => setActiveSection('pengguna')}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#F2B632]" />
              <span>Tambah User Baru</span>
            </button>
          )}

          <button
            onClick={onBackToPublic}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-[#D5E0D8] dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#EAF2EC] text-[#14264B] dark:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <span>Lihat Website Publik</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {seedResult && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-400 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
          <span>{seedResult}</span>
        </div>
      )}

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Berita & Prestasi */}
        <div 
          onClick={() => setActiveSection('berita')}
          className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#1F7A4D] hover:border-emerald-600 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1F7A4D] uppercase">Berita & Prestasi</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 group-hover:scale-110 transition-transform">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
            {beritaList.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{publishedNewsCount} Terbit • {draftNewsCount} Draf</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1F7A4D] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Galeri Foto */}
        <div 
          onClick={() => setActiveSection('galeri')}
          className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Foto Galeri</span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
            {galeriList.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Dokumentasi visual</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1F7A4D] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Kegiatan Guru & Komunitas Belajar (Kombel) */}
        <div 
          onClick={() => setActiveSection('kegiatan-guru')}
          className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Kegiatan Guru & Kombel</span>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
            {kegiatanList.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Kombel & Workshop</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1F7A4D] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: User / Pengguna Pengunggah */}
        {isFullAdmin ? (
          <div 
            onClick={() => setActiveSection('pengguna')}
            className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">User Pengelola</span>
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
              {penggunaList.length}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Admin & Operator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1F7A4D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Status Akun Anda</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#1F7A4D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl font-bold text-[#14264B] dark:text-white font-heading">
              Aktif
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Hak Akses: Pengunggah Berita & Prestasi
            </div>
          </div>
        )}

        {/* Card 4: Pendaftar PPDB (for admin) or Prestasi summary */}
        {isFullAdmin ? (
          <div 
            onClick={() => setActiveSection('pendaftar')}
            className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Pendaftar PPDB</span>
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
              {pendaftarList.length}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-amber-600">{newRegistrantsCount} Belum Diverifikasi</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1F7A4D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setActiveSection('berita')}
            className="bg-white dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Prestasi Terbit</span>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#F2B632]">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
              {beritaList.filter(b => b.kategori === 'Prestasi' && b.status === 'Terbit').length}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Warta kejuaraan siswa</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1F7A4D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}

      </div>

      {/* Quick Action Shortcuts & PPDB/Prestasi Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Actions (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#132238] rounded-3xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F2B632]" />
            <span>Aksi Cepat Pengelolaan</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setActiveSection('berita')}
              className="p-4 rounded-xl border border-[#D5E0D8] dark:border-slate-700 hover:border-[#1F7A4D] hover:bg-[#EAF2EC]/40 text-left transition-all flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EAF2EC] text-[#1F7A4D] flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-sm text-[#14264B] dark:text-white group-hover:text-[#1F7A4D]">
                  Tambah Berita & Prestasi
                </strong>
                <span className="text-xs text-slate-500">Tulis artikel atau juara lomba</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('galeri')}
              className="p-4 rounded-xl border border-[#D5E0D8] dark:border-slate-700 hover:border-[#1F7A4D] hover:bg-[#EAF2EC]/40 text-left transition-all flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-sm text-[#14264B] dark:text-white group-hover:text-[#1F7A4D]">
                  Unggah Foto Galeri
                </strong>
                <span className="text-xs text-slate-500">Tambah dokumentasi kegiatan</span>
              </div>
            </button>

            {isFullAdmin && (
              <>
                <button
                  onClick={() => setActiveSection('pengguna')}
                  className="p-4 rounded-xl border border-[#D5E0D8] dark:border-slate-700 hover:border-[#1F7A4D] hover:bg-[#EAF2EC]/40 text-left transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm text-[#14264B] dark:text-white group-hover:text-[#1F7A4D]">
                      Kelola Akun Pengguna
                    </strong>
                    <span className="text-xs text-slate-500">Tambah user pengunggah berita</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('pendaftar')}
                  className="p-4 rounded-xl border border-[#D5E0D8] dark:border-slate-700 hover:border-[#1F7A4D] hover:bg-[#EAF2EC]/40 text-left transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-sm text-[#14264B] dark:text-white group-hover:text-[#1F7A4D]">
                      Ekspor Data PPDB
                    </strong>
                    <span className="text-xs text-slate-500">Unduh data pendaftar ke CSV</span>
                  </div>
                </button>
              </>
            )}
          </div>

          {/* Seed Initial Data Button (Admin only) */}
          {isFullAdmin && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <span className="font-semibold block text-slate-700 dark:text-slate-300">Sinkronisasi Data Awal:</span>
                Unggah berita, galeri, guru, dan akun default ke Firestore.
              </div>
              <button
                onClick={handleSeed}
                disabled={isSeeding}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-60"
              >
                {isSeeding ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Database className="w-4 h-4" />
                )}
                <span>Muat Data Awal Standar</span>
              </button>
            </div>
          )}
        </div>

        {/* PPDB / Prestasi Summary Box (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#132238] rounded-3xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          {isFullAdmin ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#1F7A4D]" />
                  <span>Rekapitulasi PPDB</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {pengaturan.statusPpdb}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200">Menunggu Verifikasi (Baru)</span>
                  </div>
                  <strong className="text-sm font-extrabold text-amber-900 dark:text-amber-200">{newRegistrantsCount}</strong>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200">Diverifikasi Berkas Fisik</span>
                  </div>
                  <strong className="text-sm font-extrabold text-blue-900 dark:text-blue-200">{verifiedCount}</strong>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Diterima Sebagai Siswa Baru</span>
                  </div>
                  <strong className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">{acceptedCount}</strong>
                </div>
              </div>

              <button
                onClick={() => setActiveSection('pendaftar')}
                className="w-full py-2.5 min-h-[44px] rounded-xl bg-[#14264B] text-white text-xs font-bold hover:bg-[#1c376c] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Seluruh Daftar Pendaftar PPDB</span>
                <ArrowRight className="w-4 h-4 text-[#F2B632]" />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#F2B632]" />
                  <span>Panduan Operator Berita</span>
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#EAF2EC] dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 border">
                <p className="font-semibold text-[#14264B] dark:text-white">
                  Langkah Mengunggah Prestasi & Berita:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  <li>Klik menu <strong>"Kelola Berita"</strong>.</li>
                  <li>Klik tombol <strong>"Tulis Berita Baru"</strong>.</li>
                  <li>Pilih kategori <strong>"Prestasi"</strong> atau <strong>"Kegiatan"</strong>.</li>
                  <li>Unggah foto dokumentasi juara/kegiatan.</li>
                  <li>Klik <strong>"Terbitkan Sekarang"</strong> agar langsung tampil di website.</li>
                </ol>
              </div>

              <button
                onClick={() => setActiveSection('berita')}
                className="w-full py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F2B632]" />
                <span>Mulai Tulis Warta / Prestasi</span>
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
