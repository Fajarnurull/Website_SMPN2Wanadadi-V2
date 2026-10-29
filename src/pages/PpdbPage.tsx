import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Printer, 
  Search, 
  User, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { PendaftarItem, PengaturanSekolah } from '../types';
import { submitPendaftaran, getPendaftarList } from '../services/schoolService';

interface PpdbPageProps {
  pengaturan: PengaturanSekolah;
}

export const PpdbPage: React.FC<PpdbPageProps> = ({ pengaturan }) => {
  const [activeTab, setActiveTab] = useState<'daftar' | 'cek'>('daftar');
  
  // Form State
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nisn: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    asalSekolah: '',
    namaOrangTua: '',
    noHp: '',
    alamat: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successPendaftar, setSuccessPendaftar] = useState<PendaftarItem | null>(null);

  // Search/Check Registration Status State
  const [searchNoReg, setSearchNoReg] = useState('');
  const [searchResult, setSearchResult] = useState<PendaftarItem | null | 'not_found'>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!formData.namaLengkap.trim()) {
      setErrorMessage('Harap isi Nama Lengkap calon siswa.');
      return;
    }
    if (!formData.tempatLahir.trim() || !formData.tanggalLahir) {
      setErrorMessage('Harap lengkapi Tempat dan Tanggal Lahir.');
      return;
    }
    if (!formData.asalSekolah.trim()) {
      setErrorMessage('Harap isi Asal Sekolah (SD/MI).');
      return;
    }
    if (!formData.namaOrangTua.trim()) {
      setErrorMessage('Harap isi Nama Orang Tua atau Wali.');
      return;
    }
    if (!formData.noHp.trim()) {
      setErrorMessage('Harap isi Nomor HP / WhatsApp aktif untuk konfirmasi.');
      return;
    }
    if (!formData.alamat.trim()) {
      setErrorMessage('Harap isi Alamat Lengkap domisili.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitPendaftaran(formData);
      setSuccessPendaftar(res);
      // Reset form
      setFormData({
        namaLengkap: '',
        nisn: '',
        tempatLahir: '',
        tanggalLahir: '',
        jenisKelamin: 'Laki-laki',
        asalSekolah: '',
        namaOrangTua: '',
        noHp: '',
        alamat: ''
      });
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (err) {
      setErrorMessage(
        err instanceof Error 
          ? `Gagal mengirim formulir: ${err.message}` 
          : 'Terjadi kendala saat mengirim formulir pendaftaran. Silakan coba kembali.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNoReg.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    try {
      const all = await getPendaftarList();
      const match = all.find(
        p => p.noPendaftaran.toLowerCase() === searchNoReg.trim().toLowerCase() ||
             (p.nisn && p.nisn === searchNoReg.trim())
      );
      if (match) {
        setSearchResult(match);
      } else {
        setSearchResult('not_found');
      }
    } catch (err) {
      setSearchResult('not_found');
    } finally {
      setIsSearching(false);
    }
  };

  const alurPendaftaran = [
    {
      step: '01',
      title: 'Pendaftaran Daring (Online)',
      desc: 'Mengisi formulir biodata lengkap calon siswa melalui website ini dan mencatat Nomor Pendaftaran resmi.'
    },
    {
      step: '02',
      title: 'Verifikasi Berkas Fisik',
      desc: 'Menyerahkan fotokopi Ijazah/SKL, KK, Akta Kelahiran, dan pas foto ke Posko PPDB di SMPN 2 Wanadadi.'
    },
    {
      step: '03',
      title: 'Pengumuman Seleksi',
      desc: 'Melihat hasil kelulusan seleksi melalui portal website atau papan pengumuman sekolah.'
    },
    {
      step: '04',
      title: 'Daftar Ulang & Orientasi',
      desc: 'Konfirmasi kehadiran, pembagian seragam & kelas, serta mengikuti Masa Pengenalan Lingkungan Sekolah (MPLS).'
    }
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Banner */}
      <div className="bg-[#14264B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border-b-4 border-[#1F7A4D]">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#F2B632] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
            PPDB Tahun Ajaran Baru
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Penerimaan Peserta Didik Baru (PPDB)
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Selamat datang calon siswa baru Esperowan Wanadadi! Silakan pelajari alur pendaftaran, jadwal, syarat berkas, dan isi formulir pendaftaran daring di bawah ini.
          </p>
        </div>
      </div>

      {/* Alur 4 Tahap Pendaftaran */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-widest bg-[#EAF2EC] dark:bg-[#132238] px-3 py-1 rounded-full">
            Langkah Pendaftaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Alur Penerimaan Calon Siswa Baru
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {alurPendaftaran.map((alur, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[#132238] rounded-2xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] relative shadow-xs hover:border-[#1F7A4D] transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold text-[#1F7A4D] dark:text-[#F2B632] font-mono block mb-3">
                  {alur.step}
                </span>
                <h3 className="font-heading font-bold text-base text-[#14264B] dark:text-white mb-2">
                  {alur.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {alur.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jadwal & Syarat Berkas Info Box */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Jadwal Pelaksanaan */}
        <div className="bg-[#EAF2EC] dark:bg-[#132238] rounded-2xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] space-y-3">
          <div className="flex items-center gap-2 text-[#1F7A4D] font-bold text-base">
            <Calendar className="w-5 h-5 text-[#F2B632]" />
            <h3 className="font-heading text-lg text-[#14264B] dark:text-white">
              Jadwal PPDB
            </h3>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-white/70 dark:bg-black/30 p-4 rounded-xl border border-[#D5E0D8] dark:border-slate-700">
            {pengaturan.jadwalPpdb}
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Layanan meja bantuan fisik di posko sekolah dibuka setiap hari kerja pukul 08.00 - 14.00 WIB.
          </p>
        </div>

        {/* Syarat Berkas */}
        <div className="bg-[#EAF2EC] dark:bg-[#132238] rounded-2xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] space-y-3">
          <div className="flex items-center gap-2 text-[#1F7A4D] font-bold text-base">
            <FileText className="w-5 h-5 text-[#F2B632]" />
            <h3 className="font-heading text-lg text-[#14264B] dark:text-white">
              Persyaratan Berkas Dokumen
            </h3>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-white/70 dark:bg-black/30 p-4 rounded-xl border border-[#D5E0D8] dark:border-slate-700">
            {pengaturan.syaratPpdb}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-[#1F7A4D]" />
            <span>Pendaftaran 100% Gratis & Bebas Pungutan</span>
          </div>
        </div>

      </section>

      {/* Tabs: Formulir Pendaftaran / Cek Status */}
      <section className="bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-sm overflow-hidden">
        
        {/* Tab Headers */}
        <div className="flex border-b border-[#D5E0D8] dark:border-[#23395B] bg-[#FBFCFA] dark:bg-[#0f1d39]">
          <button
            onClick={() => setActiveTab('daftar')}
            className={`flex-1 py-4 px-6 text-sm sm:text-base font-heading font-bold flex items-center justify-center gap-2 min-h-[50px] transition-colors cursor-pointer ${
              activeTab === 'daftar'
                ? 'bg-white dark:bg-[#132238] text-[#1F7A4D] dark:text-[#F2B632] border-b-2 border-[#1F7A4D]'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#14264B]'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Formulir Pendaftaran Online</span>
          </button>
          
          <button
            onClick={() => setActiveTab('cek')}
            className={`flex-1 py-4 px-6 text-sm sm:text-base font-heading font-bold flex items-center justify-center gap-2 min-h-[50px] transition-colors cursor-pointer ${
              activeTab === 'cek'
                ? 'bg-white dark:bg-[#132238] text-[#1F7A4D] dark:text-[#F2B632] border-b-2 border-[#1F7A4D]'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#14264B]'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Cek Status Pendaftaran</span>
          </button>
        </div>

        {/* Tab 1: FORMULIR PENDAFTARAN */}
        {activeTab === 'daftar' && (
          <div className="p-6 sm:p-10 lg:p-12 space-y-8">
            
            {/* SUCCESS RECEIPT DISPLAY */}
            {successPendaftar ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold font-heading text-[#14264B] dark:text-white">
                    Pendaftaran Berhasil Dikirim!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                    Data calon peserta didik telah tersimpan ke sistem PPDB SMP Negeri 2 Wanadadi. Simpan nomor pendaftaran di bawah ini untuk verifikasi berkas dan pengecekan kelulusan.
                  </p>
                </div>

                {/* Printable receipt card */}
                <div className="bg-white dark:bg-[#0B1426] rounded-2xl p-6 border-2 border-[#1F7A4D] shadow-md max-w-xl mx-auto space-y-4">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Nomor Pendaftaran Resmi:</span>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#1F7A4D] font-mono tracking-wider">
                        {successPendaftar.noPendaftaran}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      Status: {successPendaftar.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Nama Lengkap:</span>
                      <strong className="text-[#14264B] dark:text-white">{successPendaftar.namaLengkap}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Asal SD/MI:</span>
                      <strong className="text-[#14264B] dark:text-white">{successPendaftar.asalSekolah}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Nama Orang Tua:</span>
                      <strong className="text-[#14264B] dark:text-white">{successPendaftar.namaOrangTua}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Nomor WhatsApp:</span>
                      <strong className="text-[#14264B] dark:text-white">{successPendaftar.noHp}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 leading-relaxed">
                    <strong>Langkah Selanjutnya:</strong> Silakan datang ke posko PPDB SMP Negeri 2 Wanadadi pada jam layanan kerja dengan membawa fotokopi berkas persyaratan dan menunjukkan nomor pendaftaran ini.
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#14264B] text-white text-sm font-bold hover:bg-[#1f3a73] transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#F2B632]" />
                    <span>Cetak Bukti Pendaftaran</span>
                  </button>
                  <button
                    onClick={() => setSuccessPendaftar(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-white dark:bg-slate-800 border border-slate-300 text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>Daftarkan Siswa Lain</span>
                  </button>
                </div>
              </div>
            ) : (
              /* THE FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Nama Lengkap */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      Nama Lengkap Calon Siswa <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.namaLengkap}
                      onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                      placeholder="Contoh: Muhammad Rizki Pratama"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                    />
                  </div>

                  {/* NISN */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      NISN (Nomor Induk Siswa Nasional)
                    </label>
                    <input
                      type="text"
                      value={formData.nisn}
                      onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                      placeholder="10 digit nomor NISN (opsional)"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                    />
                  </div>

                  {/* Tempat Lahir */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      Tempat Lahir <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tempatLahir}
                      onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                      placeholder="Contoh: Banjarnegara"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                    />
                  </div>

                  {/* Tanggal Lahir */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      Tanggal Lahir <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.tanggalLahir}
                      onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                    />
                  </div>

                  {/* Jenis Kelamin */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      Jenis Kelamin <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-4 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="jenisKelamin"
                          value="Laki-laki"
                          checked={formData.jenisKelamin === 'Laki-laki'}
                          onChange={() => setFormData({ ...formData, jenisKelamin: 'Laki-laki' })}
                          className="w-4 h-4 text-[#1F7A4D] focus:ring-[#1F7A4D]"
                        />
                        <span>Laki-laki</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="jenisKelamin"
                          value="Perempuan"
                          checked={formData.jenisKelamin === 'Perempuan'}
                          onChange={() => setFormData({ ...formData, jenisKelamin: 'Perempuan' })}
                          className="w-4 h-4 text-[#1F7A4D] focus:ring-[#1F7A4D]"
                        />
                        <span>Perempuan</span>
                      </label>
                    </div>
                  </div>

                  {/* Asal SD / MI */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      Asal Sekolah (SD / MI) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.asalSekolah}
                      onChange={(e) => setFormData({ ...formData, asalSekolah: e.target.value })}
                      placeholder="Contoh: SD Negeri 1 Wanadadi"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                    />
                  </div>

                  {/* Nama Orang Tua / Wali */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      Nama Orang Tua / Wali <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.namaOrangTua}
                      onChange={(e) => setFormData({ ...formData, namaOrangTua: e.target.value })}
                      placeholder="Nama ayah / ibu / wali murid"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                    />
                  </div>

                  {/* Nomor HP / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                      Nomor HP / WhatsApp Aktif <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.noHp}
                      onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                    />
                  </div>

                </div>

                {/* Alamat Lengkap */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-[#14264B] dark:text-slate-200">
                    Alamat Lengkap Domisili (RT/RW, Desa/Kelurahan, Kecamatan, Kabupaten) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    placeholder="Contoh: Dusun Karanganyar RT 02 / RW 01, Desa Wanadadi, Kec. Wanadadi, Kab. Banjarnegara"
                    className="w-full px-4 py-3 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500">
                    Dengan mengirim formulir ini, Anda menyatakan data yang diisikan adalah benar.
                  </span>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Menyimpan ke Sistem...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-[#F2B632]" />
                        <span>Kirim Pendaftaran PPDB</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

        {/* Tab 2: CEK STATUS PENDAFTARAN */}
        {activeTab === 'cek' && (
          <div className="p-6 sm:p-10 lg:p-12 space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <h3 className="font-heading font-bold text-2xl text-[#14264B] dark:text-white">
                Cek Status Verifikasi PPDB
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Ketik Nomor Pendaftaran resmi (misal: <code>PPDB-2025-WNDD-001</code>) atau nomor NISN calon siswa.
              </p>
            </div>

            <form onSubmit={handleCheckStatus} className="flex gap-2">
              <input
                type="text"
                required
                value={searchNoReg}
                onChange={(e) => setSearchNoReg(e.target.value)}
                placeholder="Masukkan Nomor Pendaftaran / NISN..."
                className="flex-1 px-4 py-3 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white font-bold text-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isSearching ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Periksa</span>
              </button>
            </form>

            {searchResult === 'not_found' && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-900 dark:text-amber-200 text-sm text-center">
                Nomor pendaftaran atau NISN tidak ditemukan dalam basis data. Pastikan nomor yang dimasukkan sudah benar atau hubungi panitia PPDB sekolah.
              </div>
            )}

            {searchResult && searchResult !== 'not_found' && (
              <div className="bg-[#EAF2EC] dark:bg-[#0B1426] rounded-2xl p-6 border-2 border-[#1F7A4D] space-y-4">
                <div className="flex items-center justify-between border-b border-[#D5E0D8] dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Nomor Pendaftaran:</span>
                    <div className="text-lg font-bold font-mono text-[#14264B] dark:text-white">
                      {searchResult.noPendaftaran}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    searchResult.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800' :
                    searchResult.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' :
                    searchResult.status === 'Diverifikasi' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    Status: {searchResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Nama Calon Siswa:</span>
                    <strong>{searchResult.namaLengkap}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Asal Sekolah:</span>
                    <strong>{searchResult.asalSekolah}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Orang Tua / Wali:</span>
                    <strong>{searchResult.namaOrangTua}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Waktu Daftar:</span>
                    <span>{new Date(searchResult.createdAt || '').toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                {searchResult.catatan && (
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border">
                    <span className="font-bold text-[#1F7A4D] block mb-0.5">Catatan Panitia:</span>
                    {searchResult.catatan}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </section>

    </div>
  );
};
