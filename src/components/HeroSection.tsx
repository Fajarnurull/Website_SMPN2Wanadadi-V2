import React, { useEffect, useState, useRef } from 'react';
import { 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  ArrowRight, 
  School,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { PengaturanSekolah } from '../types';

interface HeroSectionProps {
  pengaturan: PengaturanSekolah;
  onNavigatePpdb: () => void;
  onNavigateProfil: () => void;
}

// Hook for counting up number when in viewport
function useCountUp(target: number, duration: number = 1800, startNow: boolean = true): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !startNow) {
      setCount(target);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, startNow]);

  return count;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  pengaturan,
  onNavigatePpdb,
  onNavigateProfil
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animated counters
  const animatedSiswa = useCountUp(pengaturan.totalSiswa || 576, 1800, isVisible);
  const animatedGuru = useCountUp(pengaturan.totalGuru || 42, 1600, isVisible);
  const animatedRombel = useCountUp(pengaturan.totalRombel || 18, 1400, isVisible);

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#FBFCFA] via-[#EAF2EC]/60 to-[#FBFCFA] dark:from-[#0B1426] dark:via-[#132238] dark:to-[#0B1426] pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-[#D5E0D8] dark:border-[#23395B]"
    >
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-100/50 dark:bg-emerald-950/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-20 w-72 h-72 rounded-full bg-amber-100/40 dark:bg-amber-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EC] dark:bg-[#1a334d] border border-[#D5E0D8] dark:border-emerald-800 text-[#1F7A4D] dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1F7A4D] animate-ping" />
              <Award className="w-4 h-4 text-[#F2B632]" />
              <span>Akreditasi Sekolah: <strong>{pengaturan.akreditasi}</strong></span>
              <span className="text-slate-400">|</span>
              <span className="flex items-center gap-1 text-[#14264B] dark:text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-[#1F7A4D]" /> Wanadadi, Banjarnegara
              </span>
            </div>

            {/* Main Grand Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14264B] dark:text-white font-heading leading-[1.12]">
                SMP Negeri 2 <br className="hidden sm:inline" />
                <span className="text-[#1F7A4D] relative inline-block">
                  Wanadadi
                  <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#F2B632]/40 -z-10 rounded"></span>
                </span>
              </h1>
              
              {/* School Slogan */}
              <p className="text-lg sm:text-2xl font-bold text-[#14264B]/80 dark:text-slate-200 tracking-wide font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F2B632] shrink-0" />
                <span>"{pengaturan.slogan}"</span>
              </p>
            </div>

            {/* School Introduction Paragraph */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Lembaga pendidikan menengah pertama unggulan di Kecamatan Wanadadi yang memadukan ketakwaan, penguasaan ilmu pengetahuan, dan keluhuran budaya untuk membentuk karakter siswa cerdas, kreatif, dan mandiri.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onNavigatePpdb}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-[#16623D]"
              >
                <GraduationCap className="w-5 h-5 text-[#F2B632]" />
                <span>Daftar PPDB Online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onNavigateProfil}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-white dark:bg-slate-800 hover:bg-[#EAF2EC] dark:hover:bg-slate-700 text-[#14264B] dark:text-white text-base font-semibold border-2 border-[#D5E0D8] dark:border-slate-600 transition-all cursor-pointer shadow-xs"
              >
                <BookOpen className="w-5 h-5 text-[#1F7A4D]" />
                <span>Profil & Visi Misi</span>
              </button>
            </div>

            {/* Key highlights bullet points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A4D] shrink-0" />
                <span>Kurikulum Merdeka</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A4D] shrink-0" />
                <span>Bebas Biaya PPDB</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A4D] shrink-0" />
                <span>Ekstrakurikuler Lengkap</span>
              </div>
            </div>

          </div>

          {/* Right Column: School Building Illustration (5 cols) */}
          <div className="lg:col-span-5">
            <div 
              className={`relative mx-auto max-w-md lg:max-w-none transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              {/* Decorative Frame */}
              <div className="relative rounded-3xl p-3 bg-white dark:bg-[#132238] shadow-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] overflow-hidden">
                
                {/* School Building Display (Photo or Illustration) */}
                {pengaturan.fotoGedung && pengaturan.tipeTampilanGedung !== 'ilustrasi' ? (
                  <div className="relative w-full h-72 sm:h-88 rounded-2xl overflow-hidden group shadow-inner bg-slate-100 dark:bg-slate-900">
                    <img 
                      src={pengaturan.fotoGedung} 
                      alt="Gedung SMP Negeri 2 Wanadadi"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14264B]/80 via-transparent to-black/10 pointer-events-none" />
                    
                    {/* Badge on Photo */}
                    <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-[#D5E0D8] dark:border-slate-700 shadow-md flex items-center gap-2">
                      <img 
                        src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
                        alt="Logo Sekolah" 
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-xs font-bold text-[#14264B] dark:text-white">Gedung SMPN 2 Wanadadi</span>
                    </div>

                    <div className="absolute top-3 left-3 bg-[#1F7A4D]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-[#F2B632]" />
                      <span>Kampus SMPN 2 Wanadadi</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-72 sm:h-88 rounded-2xl bg-gradient-to-b from-[#eaf5ec] to-[#d6ebd9] dark:from-[#13293d] dark:to-[#0d1d2c] flex items-center justify-center overflow-hidden">
                    {/* Sun and Clouds */}
                    <div className="absolute top-4 right-8 w-14 h-14 rounded-full bg-[#F2B632] shadow-lg shadow-amber-300/50" />
                    <div className="absolute top-10 right-20 w-16 h-6 rounded-full bg-white/70 blur-xs" />
                    <div className="absolute top-6 left-8 w-20 h-7 rounded-full bg-white/80 blur-xs" />
                    
                    {/* SVG School Building Graphic */}
                    <svg 
                      viewBox="0 0 500 360" 
                      className="w-full h-full object-contain p-2"
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Hills & Ground */}
                      <path d="M-20 300 Q 150 260 300 290 T 520 270 L 520 360 L -20 360 Z" fill="#2E8B57" />
                      <path d="M-20 315 Q 120 295 250 310 T 520 295 L 520 360 L -20 360 Z" fill="#1F7A4D" />
                      
                      {/* Trees */}
                      <circle cx="50" cy="270" r="28" fill="#155D36" />
                      <circle cx="70" cy="260" r="22" fill="#2E8B57" />
                      <rect x="58" y="275" width="6" height="30" fill="#6B4423" />

                      <circle cx="440" cy="265" r="30" fill="#155D36" />
                      <circle cx="420" cy="255" r="24" fill="#2E8B57" />
                      <rect x="430" y="275" width="7" height="30" fill="#6B4423" />

                      {/* School Center Base & Wing left/right */}
                      {/* Left Wing */}
                      <rect x="100" y="190" width="100" height="110" rx="4" fill="#FFFFFF" stroke="#14264B" strokeWidth="4" />
                      <polygon points="90,190 150,150 210,190" fill="#B91C1C" stroke="#14264B" strokeWidth="4" />
                      {/* Windows Left */}
                      <rect x="115" y="205" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />
                      <rect x="155" y="205" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />
                      <rect x="115" y="250" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />
                      <rect x="155" y="250" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />

                      {/* Right Wing */}
                      <rect x="300" y="190" width="100" height="110" rx="4" fill="#FFFFFF" stroke="#14264B" strokeWidth="4" />
                      <polygon points="290,190 350,150 410,190" fill="#B91C1C" stroke="#14264B" strokeWidth="4" />
                      {/* Windows Right */}
                      <rect x="315" y="205" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />
                      <rect x="355" y="205" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />
                      <rect x="315" y="250" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />
                      <rect x="355" y="250" width="28" height="28" rx="3" fill="#93C5FD" stroke="#14264B" strokeWidth="3" />

                      {/* Main School Center Tower */}
                      <rect x="190" y="150" width="120" height="150" rx="6" fill="#F8FAFC" stroke="#14264B" strokeWidth="5" />
                      <polygon points="180,150 250,95 320,150" fill="#B91C1C" stroke="#14264B" strokeWidth="5" />
                      
                      {/* Bell/Clock Tower Peak */}
                      <rect x="235" y="70" width="30" height="30" rx="3" fill="#F2B632" stroke="#14264B" strokeWidth="4" />
                      <circle cx="250" cy="85" r="9" fill="#FFFFFF" stroke="#14264B" strokeWidth="3" />
                      <line x1="250" y1="85" x2="250" y2="80" stroke="#14264B" strokeWidth="2" strokeLinecap="round" />
                      <line x1="250" y1="85" x2="255" y2="85" stroke="#14264B" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* School Flag Pole & Merah Putih Flag */}
                      <line x1="250" y1="70" x2="250" y2="35" stroke="#14264B" strokeWidth="3" />
                      <rect x="250" y="38" width="28" height="9" fill="#EF4444" />
                      <rect x="250" y="47" width="28" height="9" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />

                      {/* School Name Plaque */}
                      <rect x="202" y="165" width="96" height="20" rx="3" fill="#14264B" />
                      <text x="250" y="179" fill="#F2B632" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        SMPN 2 WANADADI
                      </text>

                      {/* Main Gate / Entrance Arch */}
                      <path d="M 230 300 L 230 240 Q 250 220 270 240 L 270 300 Z" fill="#14264B" />
                      <line x1="250" y1="230" x2="250" y2="300" stroke="#F2B632" strokeWidth="2" />

                      {/* Balcony / Pillars */}
                      <rect x="208" y="200" width="14" height="24" rx="2" fill="#93C5FD" stroke="#14264B" strokeWidth="2" />
                      <rect x="278" y="200" width="14" height="24" rx="2" fill="#93C5FD" stroke="#14264B" strokeWidth="2" />

                      {/* Paved path in front */}
                      <polygon points="220,300 280,300 320,360 180,360" fill="#E2E8F0" />
                      <line x1="250" y1="305" x2="250" y2="355" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 4" />
                    </svg>

                    {/* Corner Badge */}
                    <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-[#D5E0D8] dark:border-slate-700 shadow-md flex items-center gap-2">
                      <img 
                        src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
                        alt="Logo Sekolah" 
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-xs font-bold text-[#14264B] dark:text-white">Gedung Kampus Wanadadi</span>
                    </div>
                  </div>
                )}

                {/* Subtle caption */}
                <div className="pt-3 px-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Kec. Wanadadi, Kab. Banjarnegara</span>
                  <span className="text-[#1F7A4D] font-bold">Jawa Tengah</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* STATISTIK COUNTERS (Berhitung naik saat terlihat di layar) */}
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Stat 1: Total Siswa */}
            <div className="bg-white dark:bg-[#132238] rounded-2xl p-5 sm:p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-bl-full -z-0" />
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2.5 rounded-xl bg-[#EAF2EC] dark:bg-emerald-900/40 text-[#1F7A4D] dark:text-emerald-300">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Peserta Didik
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
                  {animatedSiswa}
                  <span className="text-[#1F7A4D] text-2xl font-bold">+</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>Siswa Aktif</span>
                </div>
              </div>
            </div>

            {/* Stat 2: Guru & Tendik */}
            <div className="bg-white dark:bg-[#132238] rounded-2xl p-5 sm:p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 dark:bg-blue-950/30 rounded-bl-full -z-0" />
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  <School className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Guru & Tendik
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
                  {animatedGuru}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>Pendidik Bersertifikat</span>
                </div>
              </div>
            </div>

            {/* Stat 3: Rombel */}
            <div className="bg-white dark:bg-[#132238] rounded-2xl p-5 sm:p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 dark:bg-amber-950/30 rounded-bl-full -z-0" />
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-[#F2B632] dark:text-amber-300">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Rombel Belajar
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading">
                  {animatedRombel}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>Kelas VII, VIII & IX</span>
                </div>
              </div>
            </div>

            {/* Stat 4: Akreditasi */}
            <div className="bg-white dark:bg-[#132238] rounded-2xl p-5 sm:p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-bl-full -z-0" />
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2.5 rounded-xl bg-[#EAF2EC] dark:bg-emerald-900/40 text-[#1F7A4D] dark:text-emerald-300">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Akreditasi
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1F7A4D] dark:text-[#F2B632] font-heading">
                  {pengaturan.akreditasi.split(' ')[0] || 'A'}
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-1.5">Unggul</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>BAN-S/M</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
