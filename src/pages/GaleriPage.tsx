import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Calendar, 
  Tag, 
  Image as ImageIcon 
} from 'lucide-react';
import { GaleriItem } from '../types';

interface GaleriPageProps {
  galeriList: GaleriItem[];
  activeModalFoto: GaleriItem | null;
  setActiveModalFoto: (foto: GaleriItem | null) => void;
}

export const GaleriPage: React.FC<GaleriPageProps> = ({
  galeriList,
  activeModalFoto,
  setActiveModalFoto,
}) => {
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  const categories = useMemo(() => {
    const set = new Set<string>();
    galeriList.forEach(g => {
      if (g.kategori) set.add(g.kategori);
    });
    return ['Semua', ...Array.from(set)];
  }, [galeriList]);

  const filteredList = useMemo(() => {
    if (selectedKategori === 'Semua') return galeriList;
    return galeriList.filter(g => g.kategori === selectedKategori);
  }, [galeriList, selectedKategori]);

  // Index for lightbox next/prev
  const currentIndex = useMemo(() => {
    if (!activeModalFoto) return -1;
    return filteredList.findIndex(g => g.id === activeModalFoto.id);
  }, [activeModalFoto, filteredList]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveModalFoto(filteredList[currentIndex - 1]);
    } else {
      setActiveModalFoto(filteredList[filteredList.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredList.length - 1) {
      setActiveModalFoto(filteredList[currentIndex + 1]);
    } else {
      setActiveModalFoto(filteredList[0]);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalFoto) return;
      if (e.key === 'Escape') setActiveModalFoto(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalFoto, currentIndex, filteredList]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#14264B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border-b-4 border-[#1F7A4D]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-[#F2B632] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Dokumentasi Sekolah
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Galeri Kegiatan & Sarana
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Rekam jejak visual dinamika pembelajaran, pembinaan karakter, prestasi siswa, dan sarana prasarana di SMPN 2 Wanadadi.
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#132238] p-3 sm:p-4 rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1.5 pl-2">
          <Filter className="w-4 h-4 text-[#1F7A4D]" />
          Filter Kategori:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedKategori(cat)}
            className={`px-4 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedKategori === cat
                ? 'bg-[#1F7A4D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#EAF2EC]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredList.map((foto) => (
          <div
            key={foto.id}
            onClick={() => setActiveModalFoto(foto)}
            className="group relative bg-white dark:bg-[#132238] rounded-2xl overflow-hidden border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img 
                src={foto.urlFoto} 
                alt={foto.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#F2B632] uppercase tracking-wider">
                  {foto.kategori}
                </span>
                <p className="text-xs font-medium text-white line-clamp-2">
                  {foto.keterangan || foto.judul}
                </p>
              </div>

              <div className="absolute top-2 right-2 p-2 rounded-xl bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3.5 space-y-1">
              <span className="text-[10px] font-bold text-[#1F7A4D] dark:text-emerald-400 uppercase tracking-wide">
                {foto.kategori}
              </span>
              <h3 className="font-heading font-bold text-sm text-[#14264B] dark:text-white line-clamp-1 group-hover:text-[#1F7A4D]">
                {foto.judul}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeModalFoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalFoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#14264B] rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#F2B632] uppercase bg-white/10 px-2.5 py-1 rounded">
                  {activeModalFoto.kategori}
                </span>
                <span className="text-xs text-slate-300">
                  {currentIndex + 1} dari {filteredList.length}
                </span>
              </div>
              <button
                onClick={() => setActiveModalFoto(null)}
                className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Tutup foto"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Center */}
            <div className="relative max-h-[65vh] bg-black/60 flex items-center justify-center overflow-hidden">
              <img 
                src={activeModalFoto.urlFoto} 
                alt={activeModalFoto.judul} 
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 min-h-[44px] min-w-[44px] rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 min-h-[44px] min-w-[44px] rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="p-5 sm:p-6 space-y-2 text-white bg-[#0f1d39]">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                {activeModalFoto.judul}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeModalFoto.keterangan || 'Dokumentasi kegiatan resmi SMP Negeri 2 Wanadadi.'}
              </p>
              {activeModalFoto.tanggal && (
                <div className="pt-2 text-xs text-[#F2B632] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Tanggal: {activeModalFoto.tanggal}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
