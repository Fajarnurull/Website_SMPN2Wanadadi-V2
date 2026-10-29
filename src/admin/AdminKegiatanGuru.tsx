import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Upload, 
  X, 
  Search, 
  BookOpen, 
  Sparkles, 
  Save, 
  ExternalLink,
  Users,
  FileText
} from 'lucide-react';
import { KegiatanGuruItem } from '../types';
import { saveKegiatanGuru, deleteKegiatanGuru } from '../services/schoolService';
import { uploadSchoolImage } from '../firebase';
import { KEGIATAN_GURU_DEFAULT } from '../data/seedData';

interface AdminKegiatanGuruProps {
  kegiatanList: KegiatanGuruItem[];
  onRefresh: () => void;
}

export const AdminKegiatanGuru: React.FC<AdminKegiatanGuruProps> = ({
  kegiatanList,
  onRefresh
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KegiatanGuruItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  // Form State
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Komunitas Belajar');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('13.00 - 15.30 WIB');
  const [tempat, setTempat] = useState('Ruang Guru SMPN 2 Wanadadi');
  const [penyelenggara, setPenyelenggara] = useState('Komunitas Belajar (Kombel) Spenda Berkibar');
  const [narasumber, setNarasumber] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [tautanMateri, setTautanMateri] = useState('');
  const [status, setStatus] = useState<'Terlaksana' | 'Akan Datang'>('Terlaksana');

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const kategoriOptions = [
    'Komunitas Belajar',
    'Workshop & Pelatihan',
    'Berbagi Praktik Baik',
    'Supervisi & Refleksi',
    'Rapat & KKG'
  ];

  const openAddModal = () => {
    setEditingItem(null);
    setJudul('');
    setKategori('Komunitas Belajar');
    setTanggal(new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }));
    setWaktu('13.00 - 15.30 WIB');
    setTempat('Ruang Guru SMPN 2 Wanadadi');
    setPenyelenggara('Komunitas Belajar (Kombel) Spenda Berkibar');
    setNarasumber('');
    setDeskripsi('');
    setFotoUrl('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80');
    setTautanMateri('');
    setStatus('Terlaksana');
    setModalOpen(true);
  };

  const openEditModal = (item: KegiatanGuruItem) => {
    setEditingItem(item);
    setJudul(item.judul);
    setKategori(item.kategori || 'Komunitas Belajar');
    setTanggal(item.tanggal);
    setWaktu(item.waktu || '13.00 - 15.30 WIB');
    setTempat(item.tempat || 'SMPN 2 Wanadadi');
    setPenyelenggara(item.penyelenggara || 'Kombel Spenda Berkibar');
    setNarasumber(item.narasumber || '');
    setDeskripsi(item.deskripsi);
    setFotoUrl(item.fotoUrl);
    setTautanMateri(item.tautanMateri || '');
    setStatus(item.status || 'Terlaksana');
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadSchoolImage(file, 'kegiatan_guru');
      setFotoUrl(url);
    } catch (err) {
      alert('Gagal mengunggah foto kegiatan.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim()) {
      alert('Judul dan deskripsi kegiatan wajib diisi.');
      return;
    }

    try {
      setIsSaving(true);
      await saveKegiatanGuru({
        id: editingItem?.id,
        judul,
        kategori,
        tanggal,
        waktu,
        tempat,
        penyelenggara,
        narasumber,
        deskripsi,
        fotoUrl: fotoUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
        tautanMateri,
        status,
        createdAt: editingItem?.createdAt || new Date().toISOString()
      });

      setFeedback({
        type: 'success',
        message: editingItem ? 'Kegiatan berhasil diperbarui!' : 'Kegiatan baru berhasil ditambahkan!'
      });
      setModalOpen(false);
      onRefresh();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Gagal menyimpan kegiatan: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: KegiatanGuruItem) => {
    if (!window.confirm(`Yakin ingin menghapus agenda kegiatan "${item.judul}"?`)) {
      return;
    }

    try {
      await deleteKegiatanGuru(item.id);
      setFeedback({ type: 'success', message: 'Kegiatan berhasil dihapus.' });
      onRefresh();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      alert('Gagal menghapus kegiatan: ' + err.message);
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm('Muat 6 paket kegiatan awal Komunitas Belajar Spenda Berkibar ke Firestore?')) {
      return;
    }

    try {
      setIsSaving(true);
      for (const item of KEGIATAN_GURU_DEFAULT) {
        await saveKegiatanGuru(item);
      }
      setFeedback({ type: 'success', message: 'Berhasil memuat preset kegiatan Komunitas Belajar!' });
      onRefresh();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      alert('Gagal memuat preset: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredItems = kegiatanList.filter((item) => {
    const matchKat = selectedKategori === 'Semua' || item.kategori === selectedKategori;
    const matchSearch = 
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.narasumber && item.narasumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchKat && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Kelola Kegiatan Guru & Komunitas Belajar (Kombel)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publikasikan agenda pertemuan rutin Kombel Spenda Berkibar, workshop PMM, dan diseminasi praktik baik.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {kegiatanList.length === 0 && (
            <button
              onClick={handleSeedDefaults}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Muat Contoh Kegiatan Kombel</span>
            </button>
          )}
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kegiatan Guru</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
          feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['Semua', ...kategoriOptions].map((kat) => (
            <button
              key={kat}
              onClick={() => setSelectedKategori(kat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedKategori === kat
                  ? 'bg-[#14264B] text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#1F7A4D]"
          />
        </div>
      </div>

      {/* Kegiatan Table / Cards */}
      <div className="bg-white dark:bg-[#132238] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3">
            <Users className="w-10 h-10 text-slate-400 mx-auto stroke-1" />
            <p className="text-xs sm:text-sm text-slate-500">
              Belum ada data kegiatan guru. Klik tombol <strong>Tambah Kegiatan Guru</strong> untuk mulai menambahkan.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                <tr>
                  <th className="py-3 px-4">Foto & Kegiatan</th>
                  <th className="py-3 px-4">Kategori & Tanggal</th>
                  <th className="py-3 px-4">Narasumber & Lokasi</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3 max-w-md">
                        <img 
                          src={item.fotoUrl} 
                          alt={item.judul} 
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" 
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                            {item.judul}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                            {item.deskripsi}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF2EC] text-[#1F7A4D] dark:bg-emerald-950 dark:text-emerald-300 mb-1">
                        {item.kategori}
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#F2B632]" />
                        {item.tanggal}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {item.narasumber || '-'}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                        {item.tempat || 'SMPN 2 Wanadadi'}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Terlaksana'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {item.status || 'Terlaksana'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#1F7A4D] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit Kegiatan"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Hapus Kegiatan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#132238] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
            
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#14264B] dark:text-white font-heading">
                  {editingItem ? 'Edit Kegiatan Guru & Kombel' : 'Tambah Kegiatan Guru & Kombel Baru'}
                </h3>
                <p className="text-xs text-slate-500">
                  Lengkapi informasi agenda pelatihan atau komunitas belajar.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
              
              {/* Judul Kegiatan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Kegiatan / Workshop *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pertemuan Rutin Kombel Spenda Berkibar: Pemanfaatan PMM"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                />
              </div>

              {/* Kategori & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori Kegiatan *
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  >
                    {kategoriOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Status Pelaksanaan
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  >
                    <option value="Terlaksana">Terlaksana</option>
                    <option value="Akan Datang">Akan Datang</option>
                  </select>
                </div>
              </div>

              {/* Tanggal & Waktu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 25 Mei 2025"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Waktu / Jam
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 13.00 - 15.30 WIB"
                    value={waktu}
                    onChange={(e) => setWaktu(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                </div>
              </div>

              {/* Tempat & Penyelenggara */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tempat / Lokasi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Ruang Guru & Lab Komputer"
                    value={tempat}
                    onChange={(e) => setTempat(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Penyelenggara
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Komunitas Belajar Spenda Berkibar"
                    value={penyelenggara}
                    onChange={(e) => setPenyelenggara(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                </div>
              </div>

              {/* Narasumber & Tautan Materi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Narasumber / Fasilitator
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Dra. Sri Wahyuningsih, M.Si."
                    value={narasumber}
                    onChange={(e) => setNarasumber(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tautan Materi / Modul (Opsional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={tautanMateri}
                    onChange={(e) => setTautanMateri(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                </div>
              </div>

              {/* Foto Dokumentasi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Foto Dokumentasi Kegiatan
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    placeholder="URL Gambar Dokumentasi..."
                    value={fotoUrl}
                    onChange={(e) => setFotoUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                  <label className="shrink-0 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Mengunggah...' : 'Unggah File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                {fotoUrl && (
                  <div className="mt-2 h-28 w-44 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={fotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi & Rangkuman Kegiatan *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan tujuan, bahasan materi, dan luaran kegiatan bapak ibu guru..."
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#1F7A4D] hover:bg-[#16623D] text-white flex items-center gap-1.5 shadow transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Kegiatan'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
