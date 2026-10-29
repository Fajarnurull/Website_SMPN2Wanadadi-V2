import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Upload, 
  X, 
  Eye, 
  AlertCircle,
  Save,
  Send
} from 'lucide-react';
import { BeritaItem } from '../types';
import { saveBerita, deleteBerita } from '../services/schoolService';
import { uploadSchoolImage } from '../firebase';

interface AdminBeritaProps {
  beritaList: BeritaItem[];
  onRefresh: () => void;
}

export const AdminBerita: React.FC<AdminBeritaProps> = ({ beritaList, onRefresh }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BeritaItem | null>(null);

  // Form State
  const [judul, setJudul] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [kategori, setKategori] = useState('Kegiatan');
  const [ringkasan, setRingkasan] = useState('');
  const [isi, setIsi] = useState('');
  const [fotoSampul, setFotoSampul] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setJudul('');
    setTanggal(new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }));
    setKategori('Kegiatan');
    setRingkasan('');
    setIsi('');
    setFotoSampul('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80');
    setModalOpen(true);
  };

  const openEditModal = (item: BeritaItem) => {
    setEditingItem(item);
    setJudul(item.judul);
    setTanggal(item.tanggal);
    setKategori(item.kategori || 'Kegiatan');
    setRingkasan(item.ringkasan);
    setIsi(item.isi);
    setFotoSampul(item.fotoSampul);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadSchoolImage(file, 'berita');
      setFotoSampul(url);
    } catch (err) {
      console.error('Upload foto sampul gagal:', err);
      alert('Gagal mengunggah foto sampul. Silakan masukkan tautan URL foto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (targetStatus: 'Terbit' | 'Draf') => {
    if (!judul.trim()) {
      alert('Harap isi judul berita.');
      return;
    }
    if (!isi.trim()) {
      alert('Harap isi konten berita.');
      return;
    }

    try {
      setIsSaving(true);
      await saveBerita({
        id: editingItem?.id,
        judul: judul.trim(),
        tanggal: tanggal || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        kategori,
        ringkasan: ringkasan.trim(),
        isi: isi.trim(),
        fotoSampul: fotoSampul || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
        status: targetStatus,
        penulis: editingItem?.penulis || 'Admin SMPN 2 Wanadadi'
      });

      setFeedbackMessage({
        type: 'success',
        text: `Berita berhasil ${editingItem ? 'diperbarui' : 'dibuat'} dengan status "${targetStatus}"!`
      });
      setModalOpen(false);
      onRefresh();
      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch (err: any) {
      console.error('Error saving news:', err);
      alert('Gagal menyimpan berita: ' + (err.message || 'Terjadi kesalahan sistem.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus berita:\n"${title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      await deleteBerita(id);
      setFeedbackMessage({ type: 'success', text: 'Berita berhasil dihapus.' });
      onRefresh();
      setTimeout(() => setFeedbackMessage(null), 3000);
    } catch (err: any) {
      alert('Gagal menghapus berita: ' + (err.message || 'Kesalahan izin akses.'));
    }
  };

  const [selectedFilter, setSelectedFilter] = useState('Semua');

  const filteredBeritaList = beritaList.filter(item => {
    if (selectedFilter === 'Semua') return true;
    if (selectedFilter === 'Prestasi') return item.kategori === 'Prestasi';
    return item.kategori === selectedFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Kelola Berita & Prestasi Terkini
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tulis, unggah dokumentasi foto, dan publikasikan warta kegiatan serta kejuaraan siswa Esperowan.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F2B632]" />
          <span>Tambah Berita / Prestasi</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#132238] p-2.5 rounded-2xl border border-[#D5E0D8] dark:border-slate-700">
        <span className="text-xs font-bold text-slate-500 px-2">Filter:</span>
        {['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === cat
                ? 'bg-[#1F7A4D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#EAF2EC]'
            }`}
          >
            {cat === 'Prestasi' ? 'Prestasi Terkini' : cat}
          </button>
        ))}
      </div>

      {feedbackMessage && (
        <div className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2 ${
          feedbackMessage.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
            : 'bg-rose-50 text-rose-800 border border-rose-300'
        }`}>
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* DESKTOP TABLE (Hidden on mobile) */}
      <div className="hidden md:block bg-white dark:bg-[#132238] rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EAF2EC] dark:bg-[#0f1d39] text-[#14264B] dark:text-white text-xs uppercase font-heading border-b border-[#D5E0D8]">
            <tr>
              <th className="py-3.5 px-4">Foto & Judul</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Tanggal</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredBeritaList.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  Tidak ada berita atau prestasi yang sesuai dengan filter.
                </td>
              </tr>
            ) : (
              filteredBeritaList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.fotoSampul} 
                        alt={item.judul} 
                        className="w-14 h-11 object-cover rounded-lg shrink-0 border border-slate-200"
                      />
                      <div className="max-w-md">
                        <strong className="font-heading text-sm text-[#14264B] dark:text-white block line-clamp-1">
                          {item.judul}
                        </strong>
                        <span className="text-xs text-slate-500 line-clamp-1">{item.ringkasan}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      {item.kategori || 'Kegiatan'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {item.tanggal}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Terbit' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 min-h-[38px] min-w-[38px] rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                        title="Ubah Berita"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.judul)}
                        className="p-2 min-h-[38px] min-w-[38px] rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD LIST (Shows on mobile < 768px as requested) */}
      <div className="md:hidden space-y-3">
        {filteredBeritaList.length === 0 ? (
          <div className="bg-white dark:bg-[#132238] rounded-2xl p-6 text-center text-slate-400 border border-[#D5E0D8]">
            Tidak ada berita atau prestasi yang sesuai.
          </div>
        ) : (
          filteredBeritaList.map((item) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-[#132238] rounded-2xl p-4 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-3"
            >
              <div className="flex gap-3">
                <img 
                  src={item.fotoSampul} 
                  alt={item.judul} 
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase text-[#1F7A4D]">
                      {item.kategori}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Terbit' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#14264B] dark:text-white line-clamp-2">
                    {item.judul}
                  </h4>
                  <p className="text-[11px] text-slate-400">{item.tanggal}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-3 py-1.5 min-h-[44px] rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Ubah</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.judul)}
                  className="px-3 py-1.5 min-h-[44px] rounded-lg bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-3xl w-full bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            
            <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
              <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white">
                {editingItem ? 'Ubah Warta Berita' : 'Tulis Berita Baru'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Judul */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Berita <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Judul artikel atau warta sekolah..."
                  className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                />
              </div>

              {/* Tanggal & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Terbit
                  </label>
                  <input
                    type="text"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    placeholder="Contoh: 15 Mei 2025"
                    className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Akademik">Akademik</option>
                    <option value="PPDB">PPDB</option>
                  </select>
                </div>
              </div>

              {/* Foto Sampul */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Foto Sampul (Unggah Berkas ke Firebase Storage atau Masukkan URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    value={fotoSampul}
                    onChange={(e) => setFotoSampul(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 w-full px-4 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                  />
                  <label className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#EAF2EC] text-xs font-bold text-[#14264B] dark:text-white transition-colors cursor-pointer border border-[#D5E0D8] shrink-0">
                    <Upload className="w-4 h-4 text-[#1F7A4D]" />
                    <span>{isUploading ? 'Mengunggah...' : 'Pilih Foto'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload} 
                    />
                  </label>
                </div>
                {fotoSampul && (
                  <div className="mt-2 relative w-32 h-20 rounded-xl overflow-hidden border">
                    <img src={fotoSampul} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Ringkasan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ringkasan Singkat (Lead Warta)
                </label>
                <textarea
                  rows={2}
                  value={ringkasan}
                  onChange={(e) => setRingkasan(e.target.value)}
                  placeholder="Ringkasan singkat yang menarik minat pembaca..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                />
              </div>

              {/* Isi Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Isi Lengkap Berita <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  placeholder="Tuliskan isi berita secara lengkap di sini..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSave('Draf')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow transition-all cursor-pointer disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Draf</span>
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSave('Terbit')}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                <Send className="w-4 h-4 text-[#F2B632]" />
                <span>Terbitkan Sekarang</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
