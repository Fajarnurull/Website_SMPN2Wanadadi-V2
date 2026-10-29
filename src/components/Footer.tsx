import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  GraduationCap, 
  ExternalLink,
  Heart
} from 'lucide-react';
import { PengaturanSekolah } from '../types';
import { SocialMediaBar } from './SocialMediaBar';

interface FooterProps {
  pengaturan: PengaturanSekolah;
  setActiveTab: (tab: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  pengaturan,
  setActiveTab,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#14264B] text-slate-100 border-t-4 border-[#1F7A4D]">
      {/* Top brand accent banner */}
      <div className="bg-[#0f1d39] py-3 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F2B632]"></span>
            <span>NPSN: <strong className="text-white font-mono">{pengaturan.npsn}</strong></span>
            <span className="mx-2 text-slate-600">|</span>
            <span>Akreditasi: <strong className="text-[#F2B632]">{pengaturan.akreditasi}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Kecamatan Wanadadi, Kabupaten Banjarnegara, Jawa Tengah</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
                alt="Logo SMPN 2 Wanadadi" 
                className="w-12 h-12 object-contain bg-white rounded-full p-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-white leading-snug">
                    SMP Negeri 2 Wanadadi
                  </h3>
                  <span className="text-[10px] font-bold text-[#F2B632] bg-white/10 px-2 py-0.5 rounded uppercase">
                    Esperowan
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-semibold tracking-wide mt-0.5">
                  "{pengaturan.slogan}"
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Mendidik generasi muda yang berakhlak mulia, unggul dalam ilmu pengetahuan dan teknologi, serta berjiwa pancasila berakar pada budaya luhur.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-[#F2B632]" />
              <span>Sekolah Ramah Anak & Berwawasan Adiwiyata</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-base border-b border-white/10 pb-2">
              Jelajahi Portal
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'beranda', label: 'Beranda Utama' },
                { id: 'profil', label: 'Profil & Visi Misi' },
                { id: 'kegiatan-guru', label: 'Kegiatan Guru & Kombel' },
                { id: 'berita', label: 'Warta & Pengumuman' },
                { id: 'galeri', label: 'Galeri Kegiatan' },
                { id: 'ppdb', label: 'Pendaftaran PPDB' },
                { id: 'kontak', label: 'Kontak & Lokasi Peta' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F2B632] transition-colors flex items-center gap-1.5 py-1 text-slate-300 text-left cursor-pointer"
                  >
                    <span className="text-[#1F7A4D] font-bold">›</span> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Service Hours */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-base border-b border-white/10 pb-2">
              Kontak & Alamat
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#F2B632] shrink-0 mt-0.5" />
                <span className="leading-snug">{pengaturan.alamatLengkap}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F2B632] shrink-0" />
                <span>{pengaturan.telepon}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F2B632] shrink-0" />
                <span>{pengaturan.email}</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <div className="text-xs leading-relaxed text-slate-300">
                  <span className="font-semibold text-white block mb-0.5">Jam Layanan Kantor:</span>
                  {pengaturan.jamLayanan}
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Layanan Digital PPDB & Media Sosial */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-base border-b border-white/10 pb-2">
              Media Sosial & PPDB
            </h4>

            {/* Official Social Media Access */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Saluran Resmi Sekolah:
              </span>
              <SocialMediaBar pengaturan={pengaturan} variant="buttons" />
            </div>

            <div className="bg-[#1b2f5b] rounded-xl p-4 border border-blue-900/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  Status PPDB
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-slate-200">
                Penerimaan Peserta Didik Baru berlangsung secara daring.
              </p>
              <button
                onClick={() => {
                  setActiveTab('ppdb');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2 min-h-[40px] rounded-lg bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <GraduationCap className="w-4 h-4 text-[#F2B632]" />
                Isi Formulir PPDB Sekarang
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong>SMP Negeri 2 Wanadadi</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="flex items-center gap-1">
            Portal Sekolah Banjarnegara Maju & Berbudaya
          </p>
        </div>
      </div>
    </footer>
  );
};
