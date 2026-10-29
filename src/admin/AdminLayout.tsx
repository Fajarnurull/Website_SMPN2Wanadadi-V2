import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Image as ImageIcon, 
  Users, 
  GraduationCap, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  UserPlus,
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
import { AdminDashboard } from './AdminDashboard';
import { AdminBerita } from './AdminBerita';
import { AdminGaleri } from './AdminGaleri';
import { AdminGuru } from './AdminGuru';
import { AdminKegiatanGuru } from './AdminKegiatanGuru';
import { AdminPendaftar } from './AdminPendaftar';
import { AdminPengaturan } from './AdminPengaturan';
import { AdminPengguna } from './AdminPengguna';

interface AdminLayoutProps {
  currentUser: PenggunaItem;
  penggunaList: PenggunaItem[];
  onLogout: () => void;
  onBackToPublic: () => void;
  beritaList: BeritaItem[];
  galeriList: GaleriItem[];
  guruList: GuruItem[];
  kegiatanList?: KegiatanGuruItem[];
  pendaftarList: PendaftarItem[];
  pengaturan: PengaturanSekolah;
  onRefreshData: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  penggunaList,
  onLogout,
  onBackToPublic,
  beritaList,
  galeriList,
  guruList,
  kegiatanList = [],
  pendaftarList,
  pengaturan,
  onRefreshData
}) => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const isFullAdmin = currentUser.role === 'admin';

  // Role-based menu items
  const menuItems = [
    { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
    { 
      id: 'berita', 
      label: 'Berita & Prestasi', 
      icon: Newspaper, 
      count: beritaList.length 
    },
    { 
      id: 'galeri', 
      label: 'Kelola Galeri', 
      icon: ImageIcon, 
      count: galeriList.length 
    },
    { 
      id: 'kegiatan-guru', 
      label: 'Kegiatan Guru & Kombel', 
      icon: BookOpen, 
      count: kegiatanList.length,
      badgeColor: 'bg-purple-600'
    },
    ...(isFullAdmin ? [
      { id: 'guru', label: 'Kelola Guru', icon: Users, count: guruList.length },
      { 
        id: 'pendaftar', 
        label: 'Pendaftar PPDB', 
        icon: GraduationCap, 
        count: pendaftarList.filter(p => p.status === 'Baru').length,
        badgeColor: 'bg-amber-500'
      },
      { 
        id: 'pengguna', 
        label: 'Kelola Pengguna', 
        icon: UserPlus, 
        count: penggunaList.length,
        badgeColor: 'bg-blue-600'
      },
      { id: 'pengaturan', label: 'Pengaturan Sekolah', icon: Settings },
    ] : [])
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFCFA] dark:bg-[#0B1426] flex flex-col md:flex-row">
      
      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-0 z-40 bg-white dark:bg-[#132238] border-b border-[#D5E0D8] dark:border-[#23395B] px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <img 
            src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
            alt="Logo" 
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="font-heading font-bold text-sm text-[#14264B] dark:text-white leading-tight">
              {currentUser.nama}
            </h1>
            <span className="text-[10px] text-slate-500 truncate block">
              @{currentUser.username} • {isFullAdmin ? 'Admin Utama' : 'Kontributor Berita'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-slate-600 dark:text-slate-300 hover:bg-[#EAF2EC] flex items-center justify-center cursor-pointer"
            aria-label="Menu Admin"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR (Stationary / Sticky on scroll) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#14264B] text-slate-100 p-5 shrink-0 border-r border-[#1F7A4D]/40 sticky top-0 h-screen overflow-y-auto z-30 shadow-lg">
        
        {/* Brand header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <img 
            src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
            alt="Logo SMPN 2 Wanadadi" 
            className="w-11 h-11 object-contain bg-white rounded-full p-0.5"
          />
          <div className="min-w-0">
            <h2 className="font-heading font-bold text-base text-white leading-tight truncate">
              SMPN 2 Wanadadi
            </h2>
            <span className="text-[11px] text-[#F2B632] font-semibold tracking-wide block">
              Konsol Pengelola
            </span>
          </div>
        </div>

        {/* User Info Capsule */}
        <div className="my-4 p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isFullAdmin ? 'Admin Utama' : 'Kontributor'}</span>
            </div>
            <span className="text-[10px] font-mono bg-white/10 text-[#F2B632] px-1.5 py-0.5 rounded font-bold">
              @{currentUser.username}
            </span>
          </div>
          <div className="text-xs text-slate-200 truncate font-semibold">
            {currentUser.nama}
          </div>
        </div>

        {/* Menu Items Nav */}
        <nav className="flex-1 space-y-1.5 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1F7A4D] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F2B632]' : 'text-slate-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor ? `${item.badgeColor} text-white` : 'bg-white/20 text-white'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions (Public site link & Logout) */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <button
            onClick={onBackToPublic}
            className="w-full flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#F2B632]" />
              Website Publik
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-bold text-rose-300 hover:text-white hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Keluar (Logout)</span>
          </button>
        </div>

      </aside>

      {/* MOBILE DRAWER */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-[#14264B] text-white rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
                  alt="Logo" 
                  className="w-8 h-8 object-contain bg-white rounded-full p-0.5" 
                />
                <div>
                  <h3 className="font-heading font-bold text-sm text-white">Menu Konsol</h3>
                  <span className="text-[11px] text-[#F2B632] block">@{currentUser.username}</span>
                </div>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-slate-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 min-h-[44px] rounded-xl text-sm font-semibold cursor-pointer ${
                      isActive ? 'bg-[#1F7A4D] text-white' : 'hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#F2B632]" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onBackToPublic();
                }}
                className="w-full py-3 min-h-[44px] rounded-xl bg-white/10 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#F2B632]" />
                <span>Buka Website Publik</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full py-3 min-h-[44px] rounded-xl bg-rose-950/60 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Akun</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeSection === 'dashboard' && (
          <AdminDashboard 
            currentUser={currentUser}
            penggunaList={penggunaList}
            beritaList={beritaList}
            galeriList={galeriList}
            guruList={guruList}
            kegiatanList={kegiatanList}
            pendaftarList={pendaftarList}
            pengaturan={pengaturan}
            setActiveSection={setActiveSection}
            onRefreshData={onRefreshData}
            onBackToPublic={onBackToPublic}
          />
        )}

        {activeSection === 'berita' && (
          <AdminBerita 
            beritaList={beritaList}
            onRefresh={onRefreshData}
          />
        )}

        {activeSection === 'galeri' && (
          <AdminGaleri 
            galeriList={galeriList}
            onRefresh={onRefreshData}
          />
        )}

        {activeSection === 'kegiatan-guru' && (
          <AdminKegiatanGuru 
            kegiatanList={kegiatanList}
            onRefresh={onRefreshData}
          />
        )}

        {activeSection === 'guru' && isFullAdmin && (
          <AdminGuru 
            guruList={guruList}
            onRefresh={onRefreshData}
          />
        )}

        {activeSection === 'pendaftar' && isFullAdmin && (
          <AdminPendaftar 
            pendaftarList={pendaftarList}
            onRefresh={onRefreshData}
          />
        )}

        {activeSection === 'pengguna' && isFullAdmin && (
          <AdminPengguna
            penggunaList={penggunaList}
            currentUser={currentUser}
            onRefresh={onRefreshData}
          />
        )}

        {activeSection === 'pengaturan' && isFullAdmin && (
          <AdminPengaturan 
            pengaturan={pengaturan}
            onRefresh={onRefreshData}
          />
        )}
      </main>

    </div>
  );
};
