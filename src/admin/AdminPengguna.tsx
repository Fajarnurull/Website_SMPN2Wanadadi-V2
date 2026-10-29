import React, { useState } from 'react';
import { 
  UserPlus, 
  Users, 
  Edit, 
  Trash2, 
  KeyRound, 
  ShieldCheck, 
  UserCheck, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Newspaper
} from 'lucide-react';
import { PenggunaItem } from '../types';
import { savePengguna, deletePengguna } from '../services/schoolService';

interface AdminPenggunaProps {
  penggunaList: PenggunaItem[];
  currentUser: PenggunaItem;
  onRefresh: () => void;
}

export const AdminPengguna: React.FC<AdminPenggunaProps> = ({
  penggunaList,
  currentUser,
  onRefresh
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PenggunaItem | null>(null);

  // Form state
  const [username, setUsername] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'kontributor'>('kontributor');
  const [aktif, setAktif] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setUsername('');
    setNama('');
    setPassword('');
    setShowPassword(false);
    setRole('kontributor');
    setAktif(true);
    setModalOpen(true);
  };

  const openEditModal = (item: PenggunaItem) => {
    setEditingItem(item);
    setUsername(item.username);
    setNama(item.nama);
    setPassword(item.password);
    setShowPassword(false);
    setRole(item.role);
    setAktif(item.aktif);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    const cleanNama = nama.trim();

    if (!cleanUser || !cleanPass || !cleanNama) {
      alert('Harap lengkapi semua isian: Username, Nama Lengkap, dan Kata Sandi.');
      return;
    }

    // Check duplicate username if adding new
    if (!editingItem) {
      const isDuplicate = penggunaList.some(
        u => u.username.toLowerCase() === cleanUser
      );
      if (isDuplicate) {
        alert(`Nama pengguna "${cleanUser}" sudah terdaftar. Harap gunakan nama pengguna lain.`);
        return;
      }
    }

    try {
      setIsSaving(true);
      await savePengguna({
        id: editingItem?.id,
        username: cleanUser,
        nama: cleanNama,
        password: cleanPass,
        role,
        aktif
      });

      setFeedback({
        type: 'success',
        message: `Pengguna "${cleanNama}" (${cleanUser}) berhasil ${editingItem ? 'diperbarui' : 'didaftarkan'}. Pengguna kini dapat langsung masuk untuk mengunggah berita & prestasi!`
      });
      setModalOpen(false);
      onRefresh();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      alert('Gagal menyimpan data pengguna: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (user: PenggunaItem) => {
    if (user.username === 'admin') {
      alert('Akun admin utama tidak boleh dihapus demi keamanan sistem.');
      return;
    }

    if (user.id === currentUser.id || user.username === currentUser.username) {
      alert('Anda tidak dapat menghapus akun yang sedang digunakan saat ini.');
      return;
    }

    if (!window.confirm(`Hapus akun pengguna "${user.nama}" (@${user.username})? Pengguna ini tidak akan bisa masuk lagi.`)) {
      return;
    }

    try {
      await deletePengguna(user.id);
      setFeedback({
        type: 'success',
        message: `Akun "${user.nama}" berhasil dihapus.`
      });
      onRefresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert('Gagal menghapus pengguna: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading flex items-center gap-2">
            <Users className="w-6 h-6 text-[#1F7A4D]" />
            <span>Kelola Akun Pengguna & Operator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tambahkan guru atau staf sebagai operator agar dapat masuk dengan username & password untuk mengunggah berita dan prestasi terkini.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-[#F2B632]" />
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
            : 'bg-rose-50 text-rose-800 border border-rose-300'
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Info Highlight Card */}
      <div className="bg-[#EAF2EC] dark:bg-[#132238] rounded-2xl p-5 border-2 border-[#D5E0D8] dark:border-[#23395B] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F7A4D] uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-[#F2B632]" />
            <span>Akses Multi-User Sekolah</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Pengguna dengan peran <strong>"Kontributor Berita & Prestasi"</strong> dapat login menggunakan username mereka untuk menulis, mengunggah foto, dan menerbitkan berita maupun prestasi sekolah secara langsung.
          </p>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white dark:bg-[#132238] rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EAF2EC] dark:bg-[#0f1d39] text-[#14264B] dark:text-white text-xs uppercase font-heading border-b border-[#D5E0D8]">
            <tr>
              <th className="py-3.5 px-4">Nama Lengkap & Username</th>
              <th className="py-3.5 px-4">Hak Akses / Peran</th>
              <th className="py-3.5 px-4">Kata Sandi</th>
              <th className="py-3.5 px-4">Status Akun</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {penggunaList.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                
                {/* Nama & Username */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#14264B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {user.nama.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong className="block text-sm text-[#14264B] dark:text-white font-heading">
                        {user.nama}
                      </strong>
                      <span className="text-xs font-mono text-[#1F7A4D] font-bold">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="py-3.5 px-4">
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#14264B] text-white">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F2B632]" />
                      <span>Admin Utama (Penuh)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      <Newspaper className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pengunggah Berita & Prestasi</span>
                    </span>
                  )}
                </td>

                {/* Password preview */}
                <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    {user.password}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    user.aktif 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}>
                    {user.aktif ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEditModal(user)}
                      className="p-2 min-h-[38px] rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer"
                      title="Ubah Data Pengguna"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {user.username !== 'admin' && (
                      <button
                        onClick={() => handleDelete(user)}
                        className="p-2 min-h-[38px] rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Hapus Pengguna"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD LIST */}
      <div className="md:hidden space-y-3">
        {penggunaList.map((user) => (
          <div 
            key={user.id}
            className="bg-white dark:bg-[#132238] rounded-2xl p-4 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#14264B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {user.nama.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#14264B] dark:text-white">
                    {user.nama}
                  </h4>
                  <span className="text-xs font-mono text-[#1F7A4D] font-bold">
                    @{user.username}
                  </span>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                user.aktif ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {user.aktif ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">
                Peran: <strong>{user.role === 'admin' ? 'Admin Utama' : 'Kontributor Berita'}</strong>
              </span>
              <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                Sandi: {user.password}
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => openEditModal(user)}
                className="px-3 py-1.5 min-h-[44px] rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
              {user.username !== 'admin' && (
                <button
                  onClick={() => handleDelete(user)}
                  className="px-3 py-1.5 min-h-[44px] rounded-lg bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL TAMBAH / UBAH PENGGUNA */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-lg w-full bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#1F7A4D]" />
                <span>{editingItem ? 'Ubah Akun Pengguna' : 'Tambah Pengguna Baru'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Guru / Operator <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Pd."
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Pengguna (Username untuk Masuk) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoCapitalize="none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9._-]/g, ''))}
                  placeholder="Contoh: budi_santoso atau humas"
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm font-mono text-[#1F7A4D] font-bold focus:border-[#1F7A4D]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Hanya huruf kecil, angka, titik, atau garis bawah (tanpa spasi).
                </span>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kata Sandi (Password) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full px-3.5 pr-10 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm font-mono text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hak Akses & Peran Pengguna <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  <label className={`p-3.5 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-colors ${
                    role === 'kontributor' 
                      ? 'border-[#1F7A4D] bg-[#EAF2EC] dark:bg-emerald-950/40' 
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="roleSelect"
                        checked={role === 'kontributor'}
                        onChange={() => setRole('kontributor')}
                        className="text-[#1F7A4D] focus:ring-[#1F7A4D]"
                      />
                      <strong className="text-xs text-[#14264B] dark:text-white">
                        Pengunggah Berita & Prestasi
                      </strong>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-2 block">
                      Bisa mengupload warta, foto, dan prestasi siswa tanpa akses pengaturan/PPDB.
                    </span>
                  </label>

                  <label className={`p-3.5 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-colors ${
                    role === 'admin' 
                      ? 'border-[#14264B] bg-slate-100 dark:bg-slate-800' 
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="roleSelect"
                        checked={role === 'admin'}
                        onChange={() => setRole('admin')}
                        className="text-[#14264B] focus:ring-[#14264B]"
                      />
                      <strong className="text-xs text-[#14264B] dark:text-white">
                        Administrator Utama
                      </strong>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-2 block">
                      Akses penuh ke seluruh konsol, pendaftar PPDB, pengaturan, dan user.
                    </span>
                  </label>

                </div>
              </div>

              {/* Status Aktif */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={aktif}
                    onChange={(e) => setAktif(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1F7A4D] focus:ring-[#1F7A4D]"
                  />
                  <span>Akun Aktif (Dapat digunakan untuk masuk)</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Akun Pengguna'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
