import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Clock, 
  GraduationCap, 
  ShieldCheck, 
  Lock,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';
import { PengaturanSekolah } from '../types';
import { SocialMediaBar } from './SocialMediaBar';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  pengaturan?: PengaturanSekolah;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAdminLoggedIn,
  onOpenAdmin,
  pengaturan
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'kegiatan-guru', label: 'Kegiatan Guru & Kombel' },
    { id: 'berita', label: 'Berita' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'ppdb', label: 'PPDB' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B1426]/95 backdrop-blur-md shadow-xs border-b border-[#D5E0D8] dark:border-[#23395B] transition-colors">
      {/* Top micro bar for contact info & official social media links */}
      <div className="hidden sm:block bg-[#14264B] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#F2B632]" />
              {pengaturan?.telepon || '(0286) 598123'}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#F2B632]" />
              {pengaturan?.email || 'smpn2wanadadi@gmail.com'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Social Media Shortcut in Top Bar */}
            <div className="flex items-center gap-2 border-r border-white/20 pr-3">
              <span className="text-[11px] text-slate-300">Media Sosial:</span>
              <SocialMediaBar pengaturan={pengaturan} variant="icons-only" theme="header" />
            </div>

            <span className="flex items-center gap-1.5 text-emerald-200">
              <Clock className="w-3.5 h-3.5" />
              Layanan: 07.00 - 15.30 WIB
            </span>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-xs text-[#F2B632] hover:text-white transition-colors cursor-pointer py-0.5 px-2 rounded hover:bg-white/10"
              title="Konsol Admin Sekolah"
            >
              <Lock className="w-3 h-3" />
              {isAdminLoggedIn ? 'Konsol Admin (Masuk)' : 'Area Guru & Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo & School Title */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center bg-white rounded-full p-0.5 shadow-sm border border-[#D5E0D8]">
              <img 
                src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
                alt="Logo SMP Negeri 2 Wanadadi" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              {/* Desktop view */}
              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-[#14264B] dark:text-white font-heading leading-tight block">
                    SMP Negeri 2 Wanadadi
                  </span>
                  <span className="text-[11px] font-bold text-[#1F7A4D] dark:text-[#F2B632] bg-[#EAF2EC] dark:bg-slate-800 px-2 py-0.5 rounded-full border border-[#D5E0D8] dark:border-slate-700">
                    Esperowan
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                  Kec. Wanadadi, Kab. Banjarnegara
                </span>
              </div>
              {/* Mobile view */}
              <div className="md:hidden">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-[#14264B] dark:text-white font-heading block">
                    SMPN 2 Wanadadi
                  </span>
                  <span className="text-[9px] font-bold text-[#1F7A4D] dark:text-[#F2B632] bg-[#EAF2EC] dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    Esperowan
                  </span>
                </div>
                <span className="text-[11px] text-[#1F7A4D] dark:text-emerald-400 font-medium">
                  Wanadadi, Banjarnegara
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'text-[#1F7A4D] bg-[#EAF2EC] dark:bg-[#132238] dark:text-[#F2B632] font-bold shadow-xs'
                    : 'text-[#14264B] dark:text-slate-200 hover:text-[#1F7A4D] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button & Mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Always prominent PPDB Button as requested */}
            <button
              onClick={() => handleNavClick('ppdb')}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-[#16623D]"
            >
              <GraduationCap className="w-4 h-4 text-[#F2B632]" />
              <span>Daftar PPDB</span>
            </button>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 min-h-[44px] min-w-[44px] rounded-lg text-[#14264B] dark:text-white hover:bg-[#EAF2EC] dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B1426] border-b border-[#D5E0D8] dark:border-[#23395B] px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-3 min-h-[44px] rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#1F7A4D] text-white'
                    : 'bg-[#FBFCFA] dark:bg-[#132238] text-[#14264B] dark:text-slate-100 hover:bg-[#EAF2EC]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D5E0D8] dark:border-[#23395B] space-y-3">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-2">
                Saluran Media Sosial Resmi:
              </span>
              <SocialMediaBar pengaturan={pengaturan} variant="buttons" />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 min-h-[44px] rounded-xl border border-[#D5E0D8] dark:border-slate-700 text-sm font-semibold text-[#14264B] dark:text-slate-200 hover:bg-[#EAF2EC] dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#F2B632]" />
              <span>{isAdminLoggedIn ? 'Konsol Admin Sekolah (Terbuka)' : 'Masuk Area Admin / Guru'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
