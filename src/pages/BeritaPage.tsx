import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Tag, 
  ChevronRight, 
  BookOpen, 
  CheckCircle,
  Copy
} from 'lucide-react';
import { BeritaItem } from '../types';

interface BeritaPageProps {
  beritaList: BeritaItem[];
  selectedBerita: BeritaItem | null;
  onSelectBerita: (berita: BeritaItem | null) => void;
}

export const BeritaPage: React.FC<BeritaPageProps> = ({
  beritaList,
  selectedBerita,
  onSelectBerita
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [copied, setCopied] = useState(false);

  // Only published news is shown to visitors as requested
  const publishedBerita = useMemo(() => {
    return beritaList.filter(b => b.status === 'Terbit');
  }, [beritaList]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedBerita.forEach(b => {
      if (b.kategori) set.add(b.kategori);
    });
    return ['Semua', ...Array.from(set)];
  }, [publishedBerita]);

  const filteredBerita = useMemo(() => {
    return publishedBerita.filter(item => {
      const matchSearch = 
        item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ringkasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.isi.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [publishedBerita, searchTerm, selectedCategory]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If a news article is selected, render its complete detail view
  if (selectedBerita) {
    return (
      <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Navigation back */}
        <button
          onClick={() => onSelectBerita(null)}
          className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-white dark:bg-slate-800 border border-[#D5E0D8] dark:border-slate-700 text-[#14264B] dark:text-white font-bold text-sm hover:bg-[#EAF2EC] dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Warta Sekolah</span>
        </button>

        <article className="bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] overflow-hidden shadow-sm">
          
          {/* Cover photo */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
            <img 
              src={selectedBerita.fotoSampul} 
              alt={selectedBerita.judul}
              className="w-full h-full object-cover" 
            />
            <span className="absolute top-4 left-4 bg-[#14264B]/90 backdrop-blur-md text-[#F2B632] text-xs font-bold px-3 py-1.5 rounded-lg shadow">
              {selectedBerita.kategori}
            </span>
          </div>

          <div className="p-6 sm:p-10 lg:p-12 space-y-6">
            
            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#1F7A4D]" />
                  {selectedBerita.tanggal}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-4 h-4 text-[#1F7A4D]" />
                  {selectedBerita.penulis || 'Humas SMPN 2 Wanadadi'}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#EAF2EC] dark:hover:bg-slate-700 text-[#14264B] dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Tautan Disalin!' : 'Bagikan Berita'}</span>
              </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#14264B] dark:text-white font-heading leading-tight">
              {selectedBerita.judul}
            </h1>

            {/* Summary Lead */}
            {selectedBerita.ringkasan && (
              <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-[#EAF2EC]/60 dark:bg-emerald-950/20 p-5 rounded-2xl border-l-4 border-[#1F7A4D]">
                {selectedBerita.ringkasan}
              </p>
            )}

            {/* Body text paragraphs */}
            <div className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {selectedBerita.isi}
            </div>

            {/* Bottom note */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Humas & Publikasi SMP Negeri 2 Wanadadi</span>
              <span className="text-[#1F7A4D] font-bold">Banjarnegara, Jawa Tengah</span>
            </div>

          </div>
        </article>

        {/* Other articles shortcut */}
        <div className="pt-6">
          <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white mb-4">
            Berita Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publishedBerita
              .filter(b => b.id !== selectedBerita.id)
              .slice(0, 2)
              .map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectBerita(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white dark:bg-[#132238] p-4 rounded-2xl border border-[#D5E0D8] dark:border-slate-700 hover:border-[#1F7A4D] transition-colors cursor-pointer flex gap-4 items-center group"
                >
                  <img 
                    src={item.fotoSampul} 
                    alt={item.judul} 
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#1F7A4D] uppercase">{item.tanggal}</span>
                    <h4 className="font-heading font-bold text-sm text-[#14264B] dark:text-white line-clamp-2 group-hover:text-[#1F7A4D]">
                      {item.judul}
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    );
  }

  // News list view
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#14264B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border-b-4 border-[#1F7A4D]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-[#F2B632] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Kabar Sekolah
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Warta & Pengumuman
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Ikuti informasi terkini, agenda resmi, dokumentasi prestasi, dan pengumuman sekolah SMP Negeri 2 Wanadadi.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-[#132238] rounded-2xl p-4 sm:p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari judul atau kata kunci berita..."
            className="w-full pl-11 pr-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D] text-[#14264B] dark:text-white placeholder-slate-400"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1F7A4D] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#EAF2EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of news cards */}
      {filteredBerita.length === 0 ? (
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-12 text-center border-2 border-[#D5E0D8] dark:border-[#23395B] space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#14264B] dark:text-white font-heading">
            Tidak ada berita yang cocok
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Coba ubah kata kunci pencarian atau pilih kategori lain untuk melihat warta sekolah.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Semua');
            }}
            className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-[#1F7A4D] text-white text-xs font-bold cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBerita.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectBerita(item)}
              className="bg-white dark:bg-[#132238] rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] overflow-hidden shadow-xs hover:shadow-xl transition-all group flex flex-col cursor-pointer"
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
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#14264B] dark:text-white line-clamp-2 group-hover:text-[#1F7A4D] transition-colors leading-snug">
                    {item.judul}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#1F7A4D] dark:text-emerald-400">
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
