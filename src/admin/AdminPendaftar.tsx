import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Clock, 
  Printer, 
  Trash2,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { PendaftarItem } from '../types';
import { updatePendaftarStatus, deletePendaftar } from '../services/schoolService';

interface AdminPendaftarProps {
  pendaftarList: PendaftarItem[];
  onRefresh: () => void;
}

export const AdminPendaftar: React.FC<AdminPendaftarProps> = ({ pendaftarList, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [selectedPendaftar, setSelectedPendaftar] = useState<PendaftarItem | null>(null);
  const [editStatus, setEditStatus] = useState<'Baru' | 'Diverifikasi' | 'Diterima' | 'Ditolak'>('Baru');
  const [catatan, setCatatan] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredList = useMemo(() => {
    return pendaftarList.filter((item) => {
      const matchSearch =
        item.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noPendaftaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.nisn && item.nisn.includes(searchTerm));
      const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [pendaftarList, searchTerm, statusFilter]);

  const openDetailModal = (item: PendaftarItem) => {
    setSelectedPendaftar(item);
    setEditStatus(item.status);
    setCatatan(item.catatan || '');
  };

  const handleUpdateStatus = async () => {
    if (!selectedPendaftar) return;

    try {
      setIsUpdating(true);
      await updatePendaftarStatus(selectedPendaftar.id, editStatus, catatan);
      setFeedback(`Status ${selectedPendaftar.namaLengkap} berhasil diubah menjadi "${editStatus}"!`);
      setSelectedPendaftar(null);
      onRefresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert('Gagal memperbarui status: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus pendaftar "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;

    try {
      await deletePendaftar(id);
      setFeedback('Data pendaftar berhasil dihapus.');
      if (selectedPendaftar?.id === id) setSelectedPendaftar(null);
      onRefresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  // CSV Export Function
  const handleExportCSV = () => {
    if (pendaftarList.length === 0) {
      alert('Tidak ada data pendaftar untuk diekspor.');
      return;
    }

    const headers = [
      'No Pendaftaran',
      'Nama Lengkap',
      'NISN',
      'Tempat Lahir',
      'Tanggal Lahir',
      'Jenis Kelamin',
      'Asal Sekolah',
      'Nama Orang Tua/Wali',
      'Nomor HP/WA',
      'Alamat Domisili',
      'Status Verifikasi',
      'Catatan Panitia',
      'Waktu Pendaftaran'
    ];

    const rows = pendaftarList.map((p) => [
      `"${p.noPendaftaran}"`,
      `"${p.namaLengkap}"`,
      `"${p.nisn || '-'}"`,
      `"${p.tempatLahir}"`,
      `"${p.tanggalLahir}"`,
      `"${p.jenisKelamin}"`,
      `"${p.asalSekolah}"`,
      `"${p.namaOrangTua}"`,
      `"${p.noHp}"`,
      `"${p.alamat.replace(/"/g, '""')}"`,
      `"${p.status}"`,
      `"${(p.catatan || '').replace(/"/g, '""')}"`,
      `"${p.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pendaftar_PPDB_SMPN_2_Wanadadi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Daftar Calon Siswa Baru (PPDB Online)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Total pendaftar masuk: <strong>{pendaftarList.length} calon siswa</strong>.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#14264B] hover:bg-[#1f3a73] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#F2B632]" />
          <span>Ekspor ke CSV</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Search and Status Filters */}
      <div className="bg-white dark:bg-[#132238] rounded-2xl p-4 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, no pendaftaran, asal SD..."
            className="w-full pl-10 pr-4 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['Semua', 'Baru', 'Diverifikasi', 'Diterima', 'Ditolak'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 min-h-[40px] rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#1F7A4D] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#EAF2EC]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white dark:bg-[#132238] rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EAF2EC] dark:bg-[#0f1d39] text-[#14264B] dark:text-white text-xs uppercase font-heading border-b border-[#D5E0D8]">
            <tr>
              <th className="py-3.5 px-4">No. Pendaftaran</th>
              <th className="py-3.5 px-4">Nama Calon Siswa</th>
              <th className="py-3.5 px-4">Asal Sekolah</th>
              <th className="py-3.5 px-4">Orang Tua & WA</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  Tidak ada pendaftar yang sesuai.
                </td>
              </tr>
            ) : (
              filteredList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4 font-mono font-bold text-xs text-[#1F7A4D]">
                    {p.noPendaftaran}
                  </td>
                  <td className="py-3 px-4">
                    <strong className="block text-sm text-[#14264B] dark:text-white">
                      {p.namaLengkap}
                    </strong>
                    <span className="text-xs text-slate-400">
                      {p.jenisKelamin} • {p.tempatLahir}, {p.tanggalLahir}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {p.asalSekolah}
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-400">
                    <div>{p.namaOrangTua}</div>
                    <div className="font-mono text-[#1F7A4D] font-bold">{p.noHp}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      p.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' :
                      p.status === 'Diverifikasi' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openDetailModal(p)}
                        className="px-3 py-1.5 min-h-[38px] rounded-lg bg-[#EAF2EC] text-[#1F7A4D] text-xs font-bold hover:bg-emerald-200 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Verifikasi</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD LIST */}
      <div className="md:hidden space-y-3">
        {filteredList.length === 0 ? (
          <div className="bg-white dark:bg-[#132238] rounded-2xl p-6 text-center text-slate-400 border border-[#D5E0D8]">
            Tidak ada pendaftar yang cocok.
          </div>
        ) : (
          filteredList.map((p) => (
            <div 
              key={p.id}
              className="bg-white dark:bg-[#132238] rounded-2xl p-4 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold text-[#1F7A4D]">
                  {p.noPendaftaran}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  p.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800' :
                  p.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' :
                  p.status === 'Diverifikasi' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {p.status}
                </span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-sm text-[#14264B] dark:text-white">
                  {p.namaLengkap}
                </h4>
                <p className="text-xs text-slate-500">{p.asalSekolah}</p>
                <p className="text-xs text-slate-400">Ortu: {p.namaOrangTua} • {p.noHp}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => openDetailModal(p)}
                  className="px-4 py-2 min-h-[44px] rounded-xl bg-[#1F7A4D] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Detail & Ubah Status</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAIL & VERIFIKASI MODAL */}
      {selectedPendaftar && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Detail Pendaftar PPDB</span>
                <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white">
                  {selectedPendaftar.namaLengkap}
                </h3>
              </div>
              <button onClick={() => setSelectedPendaftar(null)} className="p-2 min-h-[44px] min-w-[44px] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FBFCFA] dark:bg-slate-900 rounded-2xl p-4 border border-[#D5E0D8] dark:border-slate-700 grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-[11px]">No. Pendaftaran:</span>
                <strong className="font-mono text-[#1F7A4D]">{selectedPendaftar.noPendaftaran}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">NISN:</span>
                <strong>{selectedPendaftar.nisn || '-'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">TTL:</span>
                <span>{selectedPendaftar.tempatLahir}, {selectedPendaftar.tanggalLahir}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Jenis Kelamin:</span>
                <span>{selectedPendaftar.jenisKelamin}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Asal SD / MI:</span>
                <strong>{selectedPendaftar.asalSekolah}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Nama Orang Tua / Wali:</span>
                <strong>{selectedPendaftar.namaOrangTua}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">No. WhatsApp:</span>
                <strong className="font-mono text-emerald-600">{selectedPendaftar.noHp}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Waktu Daftar:</span>
                <span>{new Date(selectedPendaftar.createdAt || '').toLocaleString('id-ID')}</span>
              </div>
              <div className="col-span-2 pt-2 border-t">
                <span className="text-slate-400 block text-[11px]">Alamat Lengkap:</span>
                <span>{selectedPendaftar.alamat}</span>
              </div>
            </div>

            {/* Status change block */}
            <div className="space-y-3 bg-[#EAF2EC] dark:bg-slate-800 p-4 rounded-2xl border border-emerald-200 dark:border-slate-700">
              <label className="block text-xs font-bold text-[#14264B] dark:text-white">
                Perbarui Penanda Status Verifikasi
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Baru', 'Diverifikasi', 'Diterima', 'Ditolak'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setEditStatus(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      editStatus === st
                        ? 'bg-[#1F7A4D] text-white border-[#1F7A4D] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Catatan Panitia (dapat dilihat calon siswa saat cek status)
                </label>
                <input
                  type="text"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Contoh: Berkas fisik telah diverifikasi lengkap."
                  className="w-full px-3 py-2 min-h-[44px] rounded-xl bg-white dark:bg-slate-900 border text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t">
              <button
                type="button"
                onClick={() => handleDelete(selectedPendaftar.id, selectedPendaftar.namaLengkap)}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Data</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPendaftar(null)}
                  className="px-4 py-2 min-h-[44px] rounded-xl border text-xs font-bold text-slate-600 cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={handleUpdateStatus}
                  className="px-6 py-2 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold shadow cursor-pointer disabled:opacity-60"
                >
                  {isUpdating ? 'Menyimpan...' : 'Simpan Status'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
