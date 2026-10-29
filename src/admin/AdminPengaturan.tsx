import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  School, 
  Phone, 
  Calendar, 
  Upload, 
  MapPin, 
  Clock, 
  Sparkles,
  Image as ImageIcon,
  Camera,
  Trash2,
  Eye,
  Building2
} from 'lucide-react';
import { PengaturanSekolah } from '../types';
import { updatePengaturan } from '../services/schoolService';
import { uploadSchoolImage } from '../firebase';
import { YouTubeIcon, TikTokIcon, InstagramIcon } from '../components/SocialMediaBar';
import firebaseConfig from '../../firebase-applet-config.json';

interface AdminPengaturanProps {
  pengaturan: PengaturanSekolah;
  onRefresh: () => void;
}

export const AdminPengaturan: React.FC<AdminPengaturanProps> = ({ pengaturan, onRefresh }) => {
  const [formData, setFormData] = useState<PengaturanSekolah>({ ...pengaturan });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingGedung, setIsUploadingGedung] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Manual upload photo for Kepala Sekolah
  const handleFileUploadKepala = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadSchoolImage(file, 'kepala_sekolah');
      setFormData(prev => ({ ...prev, fotoKepala: url }));
    } catch (err) {
      alert('Gagal mengunggah foto kepala sekolah.');
    } finally {
      setIsUploading(false);
    }
  };

  // Manual upload photo for School Building (Hero section)
  const handleFileUploadGedung = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingGedung(true);
      const url = await uploadSchoolImage(file, 'gedung_sekolah');
      setFormData(prev => ({ 
        ...prev, 
        fotoGedung: url,
        tipeTampilanGedung: 'foto' 
      }));
    } catch (err) {
      alert('Gagal mengunggah foto gedung sekolah.');
    } finally {
      setIsUploadingGedung(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updatePengaturan(formData);
      setFeedback('Pengaturan identitas sekolah, foto gedung, dan profil berhasil diperbarui!');
      onRefresh();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      alert('Gagal menyimpan pengaturan: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Pengaturan Profil & Identitas Sekolah
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Perubahan pengaturan, foto gedung, dan data kepala sekolah langsung tampil di website publik.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. IDENTITAS DASAR & SLOGAN */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2 border-b pb-3">
            <School className="w-5 h-5 text-[#1F7A4D]" />
            <span>Identitas Resmi & Slogan</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Sekolah
              </label>
              <input
                type="text"
                required
                value={formData.namaSekolah}
                onChange={(e) => setFormData({ ...formData, namaSekolah: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Slogan Sekolah (dari Badge / Lambang Resmi)
              </label>
              <input
                type="text"
                required
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm font-semibold text-[#1F7A4D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                NPSN
              </label>
              <input
                type="text"
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Akreditasi Sekolah
              </label>
              <input
                type="text"
                value={formData.akreditasi}
                onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
              />
            </div>
          </div>
        </div>

        {/* 2. TAMPILAN GEDUNG SEKOLAH DI BERANDA (HERO BANNER) */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
            <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#1F7A4D]" />
              <span>Tampilan Gedung Sekolah di Beranda Utama</span>
            </h3>
            <span className="text-xs text-slate-500">
              Ubah foto gedung / gerbang sekolah di sini
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Pilih bagaimana gedung SMP Negeri 2 Wanadadi ditampilkan pada halaman depan website. Anda dapat mengunggah foto asli gedung sekolah dari laptop/HP Anda, atau menggunakan ilustrasi seni.
          </p>

          {/* Toggle Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, tipeTampilanGedung: 'foto' })}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                formData.tipeTampilanGedung !== 'ilustrasi' && formData.fotoGedung
                  ? 'border-[#1F7A4D] bg-[#EAF2EC]/60 dark:bg-emerald-950/30'
                  : 'border-[#D5E0D8] dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs text-[#1F7A4D]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-sm text-[#14264B] dark:text-white font-bold">
                  Foto Asli Gedung Sekolah
                </strong>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Menampilkan foto nyata gedung, halaman, atau gerbang sekolah hasil unggahan Anda.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, tipeTampilanGedung: 'ilustrasi' })}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                formData.tipeTampilanGedung === 'ilustrasi'
                  ? 'border-[#1F7A4D] bg-[#EAF2EC]/60 dark:bg-emerald-950/30'
                  : 'border-[#D5E0D8] dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs text-[#F2B632]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-sm text-[#14264B] dark:text-white font-bold">
                  Ilustrasi Seni Gedung (Bawaan)
                </strong>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Menampilkan grafis ilustrasi vektor gedung sekolah dengan bendera Merah Putih.
                </span>
              </div>
            </button>
          </div>

          {/* Upload and Preview Box */}
          <div className="p-5 rounded-2xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 space-y-4">
            <div className="flex flex-col md:flex-row gap-5 items-start">
              
              {/* Preview Thumbnail */}
              <div className="w-full md:w-56 h-36 rounded-xl border-2 border-dashed border-[#D5E0D8] dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden relative flex items-center justify-center shrink-0">
                {formData.fotoGedung ? (
                  <>
                    <img 
                      src={formData.fotoGedung} 
                      alt="Pratinjau Gedung"
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, fotoGedung: '', tipeTampilanGedung: 'ilustrasi' })}
                      className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-md text-xs cursor-pointer"
                      title="Hapus foto dan kembali ke ilustrasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-3 text-slate-400">
                    <Building2 className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <span className="text-[11px] block">Belum ada foto nyata (memakai ilustrasi)</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Unggah Foto Gedung dari Komputer / HP
                  </label>
                  <label className="inline-flex items-center gap-2 px-5 py-3 min-h-[46px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold cursor-pointer shadow-md transition-all active:scale-95">
                    <Upload className="w-4 h-4 text-[#F2B632]" />
                    <span>{isUploadingGedung ? 'Sedang Mengunggah...' : 'Pilih File Foto Gedung (JPG/PNG/WEBP)'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUploadGedung} 
                      disabled={isUploadingGedung}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Atau masukkan URL gambar langsung:
                  </label>
                  <input
                    type="text"
                    value={formData.fotoGedung || ''}
                    placeholder="https://images.unsplash.com/... atau URL foto gedung lainnya"
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      fotoGedung: e.target.value,
                      tipeTampilanGedung: e.target.value ? 'foto' : 'ilustrasi'
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border text-xs"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3. STATISTIK ANGKA BERANDA */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2 border-b pb-3">
            <Sparkles className="w-5 h-5 text-[#F2B632]" />
            <span>Angka Statistik Beranda (Animasi Hitung Naik)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Siswa Aktif
              </label>
              <input
                type="number"
                value={formData.totalSiswa}
                onChange={(e) => setFormData({ ...formData, totalSiswa: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm font-bold text-[#14264B] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Guru & Tenaga Kependidikan
              </label>
              <input
                type="number"
                value={formData.totalGuru}
                onChange={(e) => setFormData({ ...formData, totalGuru: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm font-bold text-[#14264B] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Rombel Belajar
              </label>
              <input
                type="number"
                value={formData.totalRombel}
                onChange={(e) => setFormData({ ...formData, totalRombel: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm font-bold text-[#14264B] dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* 4. KEPALA SEKOLAH & SAMBUTAN (DENGAN UPLOAD MANUAL DARI HP/LAPTOP) */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
            <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#1F7A4D]" />
              <span>Profil & Foto Kepala Sekolah</span>
            </h3>
            <span className="text-xs text-slate-500">
              Dapat diunggah manual dari galeri perangkat Anda
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Foto Kepala Sekolah Preview & Upload */}
            <div className="md:col-span-5 flex flex-col items-center p-5 bg-[#FBFCFA] dark:bg-slate-900 rounded-2xl border border-[#D5E0D8] dark:border-slate-700 text-center">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-[#1F7A4D] shadow-md mb-3 bg-slate-200 dark:bg-slate-800">
                {formData.fotoKepala ? (
                  <img 
                    src={formData.fotoKepala} 
                    alt={formData.namaKepala}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Camera className="w-8 h-8" />
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                    Mengunggah...
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <label className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold cursor-pointer shadow-sm transition-all active:scale-95 mb-2">
                <Upload className="w-4 h-4 text-[#F2B632]" />
                <span>{isUploading ? 'Sedang Mengunggah...' : 'Pilih Foto dari Komputer/HP'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUploadKepala} 
                  disabled={isUploading}
                />
              </label>

              <div className="w-full text-left">
                <label className="block text-[11px] text-slate-500 mb-1">
                  Atau tempel URL foto kepala:
                </label>
                <input
                  type="text"
                  value={formData.fotoKepala}
                  onChange={(e) => setFormData({ ...formData, fotoKepala: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border text-xs"
                />
              </div>
            </div>

            {/* Nama & Sambutan */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Kepala Sekolah Beserta Gelar
                </label>
                <input
                  type="text"
                  value={formData.namaKepala}
                  onChange={(e) => setFormData({ ...formData, namaKepala: e.target.value })}
                  placeholder="Contoh: H. Bambang Sulistyo, M.Pd."
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Teks Sambutan Singkat (Tampil di Beranda)
                </label>
                <textarea
                  rows={6}
                  value={formData.sambutanKepala}
                  onChange={(e) => setFormData({ ...formData, sambutanKepala: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm leading-relaxed"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 5. KONTAK & JAM LAYANAN */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2 border-b pb-3">
            <Phone className="w-5 h-5 text-[#1F7A4D]" />
            <span>Kontak & Jam Layanan Kantor</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telepon Kantor
              </label>
              <input
                type="text"
                value={formData.telepon}
                onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nomor WhatsApp Info Sekolah
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Surel (Email) Sekolah
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Alamat Lengkap Sekolah
            </label>
            <input
              type="text"
              value={formData.alamatLengkap}
              onChange={(e) => setFormData({ ...formData, alamatLengkap: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Jam Layanan Pelayanan Administrasi
            </label>
            <input
              type="text"
              value={formData.jamLayanan}
              onChange={(e) => setFormData({ ...formData, jamLayanan: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Link Embed Google Maps
            </label>
            <input
              type="text"
              value={formData.linkMaps}
              onChange={(e) => setFormData({ ...formData, linkMaps: e.target.value })}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm"
            />
          </div>
        </div>

        {/* 6. SALURAN MEDIA SOSIAL RESMI (YOUTUBE, TIKTOK, INSTAGRAM) */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-5">
          <div className="border-b pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>Akses & Tautan Media Sosial Resmi Sekolah</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tautan ini akan langsung muncul di bar navigasi atas, footer, beranda, dan halaman kontak website.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* YouTube */}
            <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wide">
                <YouTubeIcon className="w-5 h-5 text-red-600" />
                <span>Kanal YouTube Resmi</span>
              </div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400">
                URL Saluran YouTube (Dokumentasi & Video Pembelajaran):
              </label>
              <input
                type="url"
                value={formData.youtubeUrl || ''}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/@smpnegeri2wanadadi"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* TikTok */}
            <div className="p-4 rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-bold text-xs uppercase tracking-wide">
                <TikTokIcon className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
                <span>Akun TikTok Resmi</span>
              </div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400">
                URL Akun TikTok (Kreativitas & Tren Positif Siswa):
              </label>
              <input
                type="url"
                value={formData.tiktokUrl || ''}
                onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                placeholder="https://www.tiktok.com/@smpn2wanadadi"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-neutral-300 dark:border-neutral-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            {/* Instagram */}
            <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/40 space-y-2">
              <div className="flex items-center gap-2 text-pink-600 font-bold text-xs uppercase tracking-wide">
                <InstagramIcon className="w-5 h-5 text-pink-600" />
                <span>Akun Instagram Resmi</span>
              </div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400">
                URL Akun Instagram (Galeri Foto & Info Harian):
              </label>
              <input
                type="url"
                value={formData.instagramUrl || ''}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                placeholder="https://www.instagram.com/smpn2wanadadi/"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>
        </div>

        {/* 7. JADWAL & STATUS PPDB */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2 border-b pb-3">
            <Calendar className="w-5 h-5 text-[#1F7A4D]" />
            <span>Pengaturan PPDB (Jadwal & Syarat)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Status PPDB (Misal: "Pendaftaran Dibuka" atau "Pendaftaran Ditutup")
              </label>
              <input
                type="text"
                value={formData.statusPpdb}
                onChange={(e) => setFormData({ ...formData, statusPpdb: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-sm font-semibold text-[#1F7A4D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Ringkasan Jadwal PPDB
              </label>
              <textarea
                rows={3}
                value={formData.jadwalPpdb}
                onChange={(e) => setFormData({ ...formData, jadwalPpdb: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Syarat Berkas PPDB
            </label>
            <textarea
              rows={4}
              value={formData.syaratPpdb}
              onChange={(e) => setFormData({ ...formData, syaratPpdb: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border text-xs"
            />
          </div>
        </div>

        {/* 7. STATUS & PANDUAN SAMBUNGAN FIREBASE */}
        <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
            <h3 className="font-heading font-bold text-lg text-[#14264B] dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Status & Konfigurasi Firebase</span>
            </h3>
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#1F7A4D] hover:underline flex items-center gap-1 font-bold"
            >
              <span>Buka Firebase Console</span>
              <span>↗</span>
            </a>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Aplikasi ini tersambung ke Firebase Firestore dan Storage melalui file <code>firebase-applet-config.json</code> di root proyek.
          </p>

          <div className="bg-[#FBFCFA] dark:bg-slate-900 rounded-2xl p-4 border border-[#D5E0D8] dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Firebase Project ID:</span>
              <strong className="font-mono text-[#14264B] dark:text-white text-xs">{firebaseConfig.projectId}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Firestore Database ID:</span>
              <strong className="font-mono text-emerald-600 dark:text-emerald-400 text-xs break-all">{firebaseConfig.firestoreDatabaseId || '(default)'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Storage Bucket:</span>
              <span className="font-mono text-slate-600 dark:text-slate-300 text-xs">{firebaseConfig.storageBucket}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Status Sambungan:</span>
              <span className="text-emerald-600 font-bold">Terhubung ke smpn2-wanadadi</span>
            </div>
          </div>
        </div>

        {/* Save button sticky/prominent */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-8 py-3.5 min-h-[48px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-base font-bold shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-60"
          >
            <Save className="w-5 h-5 text-[#F2B632]" />
            <span>{isSaving ? 'Menyimpan Perubahan...' : 'Simpan Semua Pengaturan'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
