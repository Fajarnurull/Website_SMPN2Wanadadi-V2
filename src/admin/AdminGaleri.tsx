import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  X, 
  CheckCircle2,
  Calendar,
  Tag
} from 'lucide-react';
import { GaleriItem } from '../types';
import { saveGaleri, deleteGaleri } from '../services/schoolService';
import { uploadSchoolImage } from '../firebase';

interface AdminGaleriProps {
  galeriList: GaleriItem[];
  onRefresh: () => void;
}

export const AdminGaleri: React.FC<AdminGaleriProps> = ({ galeriList, onRefresh }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Kegiatan');
  const [keterangan, setKeterangan] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const openAddModal = () => {
    setJudul('');
    setKategori('Kegiatan');
    setKeterangan('');
    setUrlFoto('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80');
    setTanggal(new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }));
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadSchoolImage(file, 'galeri');
      setUrlFoto(url);
    } catch (err) {
      console.error('Upload galeri gagal:', err);
      alert('Gagal mengunggah foto. Anda dapat memasukkan URL foto gambar secara manual.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !urlFoto.trim()) {
      alert('Harap lengkapi judul dan foto.');
      return;
    }

    try {
      setIsSaving(true);
      await saveGaleri({
        judul: judul.trim(),
        kategori,
        keterangan: keterangan.trim(),
        urlFoto: urlFoto.trim(),
        tanggal: tanggal || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      });
      setFeedback('Foto dokumentasi berhasil ditambahkan ke galeri!');
      setModalOpen(false);
      onRefresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert('Gagal menyimpan foto: ' + (err.message || 'Kesalahan sistem.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus foto dokumentasi "${title}" dari galeri?`)) return;

    try {
      await deleteGaleri(id);
      setFeedback('Foto berhasil dihapus.');
      onRefresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert('Gagal menghapus foto: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Kelola Galeri Dokumentasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Unggah foto dokumentasi kegiatan siswa, sarana prasarana, dan prestasi sekolah.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F2B632]" />
          <span>Unggah Foto Baru</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Grid of gallery cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {galeriList.map((foto) => (
          <div
            key={foto.id}
            className="bg-white dark:bg-[#132238] rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img 
                  src={foto.urlFoto} 
                  alt={foto.judul}
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-2 left-2 bg-[#14264B]/90 text-[#F2B632] text-[10px] font-bold px-2 py-0.5 rounded">
                  {foto.kategori}
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className="font-heading font-bold text-sm text-[#14264B] dark:text-white line-clamp-1">
                  {foto.judul}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {foto.keterangan || 'Tanpa keterangan'}
                </p>
                {foto.tanggal && (
                  <span className="text-[11px] text-slate-400 block pt-1">{foto.tanggal}</span>
                )}
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => handleDelete(foto.id, foto.judul)}
                className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[38px] rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL UNGGAH FOTO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white">
                Unggah Foto Dokumentasi
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Foto <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Latihan Rutin Sanggar Karawitan"
                  className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Sarana">Sarana & Prasarana</option>
                    <option value="Pembelajaran">Pembelajaran</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Foto
                  </label>
                  <input
                    type="text"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    placeholder="Contoh: 12 April 2025"
                    className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Berkas Foto (Unggah ke Firebase Storage atau Tautan URL) <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    value={urlFoto}
                    onChange={(e) => setUrlFoto(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-slate-100 hover:bg-[#EAF2EC] text-xs font-bold text-[#14264B] transition-colors cursor-pointer border border-[#D5E0D8] shrink-0">
                    <Upload className="w-4 h-4 text-[#1F7A4D]" />
                    <span>{isUploading ? 'Unggah...' : 'Pilih File'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Keterangan Dokumentasi
                </label>
                <textarea
                  rows={3}
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder="Keterangan singkat mengenai kegiatan pada foto..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 min-h-[44px] rounded-xl border text-xs font-bold text-slate-600 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold cursor-pointer"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Foto ke Galeri'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
