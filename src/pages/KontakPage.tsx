import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PengaturanSekolah } from '../types';
import { SocialMediaBar } from '../components/SocialMediaBar';

interface KontakPageProps {
  pengaturan: PengaturanSekolah;
}

export const KontakPage: React.FC<KontakPageProps> = ({ pengaturan }) => {
  const [formPesan, setFormPesan] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: '',
    pesan: ''
  });
  const [pesanTerkirim, setPesanTerkirim] = useState(false);

  const handleKirimPesan = (e: React.FormEvent) => {
    e.preventDefault();
    setPesanTerkirim(true);
    setFormPesan({
      nama: '',
      email: '',
      telepon: '',
      subjek: '',
      pesan: ''
    });
    setTimeout(() => setPesanTerkirim(false), 5000);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Banner */}
      <div className="bg-[#14264B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border-b-4 border-[#1F7A4D]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-[#F2B632] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
            Layanan Informasi
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Hubungi & Kunjungi Sekolah
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Kami siap melayani kebutuhan informasi seputar pendaftaran, administrasi akademik, dan kemitraan pendidikan.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Alamat */}
        <div className="bg-white dark:bg-[#132238] rounded-2xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#EAF2EC] dark:bg-emerald-950/40 text-[#1F7A4D] dark:text-emerald-300 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#14264B] dark:text-white">
            Alamat Kampus
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {pengaturan.alamatLengkap}
          </p>
        </div>

        {/* Telepon & WA */}
        <div className="bg-white dark:bg-[#132238] rounded-2xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#14264B] dark:text-white">
            Telepon & WhatsApp
          </h3>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
            <p>Telp: <strong>{pengaturan.telepon}</strong></p>
            <p>WA: <strong>{pengaturan.whatsapp}</strong></p>
          </div>
        </div>

        {/* Surel */}
        <div className="bg-white dark:bg-[#132238] rounded-2xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#F2B632] flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#14264B] dark:text-white">
            Surel Resmi
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 break-words">
            {pengaturan.email}
          </p>
        </div>

        {/* Jam Layanan */}
        <div className="bg-white dark:bg-[#132238] rounded-2xl p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#EAF2EC] dark:bg-emerald-950/40 text-[#1F7A4D] dark:text-emerald-300 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-[#14264B] dark:text-white">
            Jam Layanan
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {pengaturan.jamLayanan}
          </p>
        </div>

      </div>

      {/* Saluran Media Sosial Resmi (YouTube, TikTok, Instagram) */}
      <div className="bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-[#1F7A4D] uppercase tracking-wider block">
              Komunikasi & Publikasi Digital
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading">
              Saluran Media Sosial Resmi SMP Negeri 2 Wanadadi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
              Ikuti akun resmi kami untuk mendapatkan update berita sekolah, video kegiatan ekstrakurikuler, cuplikan pembelajaran kreatif, dan prestasi peserta didik.
            </p>
          </div>
        </div>

        <SocialMediaBar pengaturan={pengaturan} variant="cards" />
      </div>

      {/* Map & Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Google Maps Embed (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#132238] rounded-3xl p-4 sm:p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#14264B] dark:text-white font-heading font-bold text-lg">
              <MapPin className="w-5 h-5 text-[#1F7A4D]" />
              <span>Peta Lokasi SMP Negeri 2 Wanadadi</span>
            </div>
            <a
              href="https://maps.google.com/?q=Wanadadi+Banjarnegara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#1F7A4D] dark:text-[#F2B632] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#D5E0D8] dark:border-slate-700 bg-slate-100">
            <iframe 
              src={pengaturan.linkMaps}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi SMP Negeri 2 Wanadadi"
            />
          </div>

          <p className="text-xs text-slate-500">
            Lokasi strategis di Wanadadi, Kabupaten Banjarnegara, dekat dengan akses jalan raya utama Wanadadi - Tapen yang mudah dijangkau transportasi umum maupun kendaraan pribadi.
          </p>
        </div>

        {/* Message / Inquiry Form (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#132238] rounded-3xl p-6 sm:p-8 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1F7A4D]" />
              <span>Kirim Pertanyaan Cepat</span>
            </h3>
            <p className="text-xs text-slate-500">
              Tim tata usaha dan kehumasan kami akan merespons pesan Anda secepatnya.
            </p>
          </div>

          {pesanTerkirim && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Terima kasih! Pesan Anda telah diterima oleh bagian administrasi sekolah.</span>
            </div>
          )}

          <form onSubmit={handleKirimPesan} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap Anda
              </label>
              <input
                type="text"
                required
                value={formPesan.nama}
                onChange={(e) => setFormPesan({ ...formPesan, nama: e.target.value })}
                placeholder="Nama Anda"
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Surel (Email)
                </label>
                <input
                  type="email"
                  value={formPesan.email}
                  onChange={(e) => setFormPesan({ ...formPesan, email: e.target.value })}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor HP / WA
                </label>
                <input
                  type="tel"
                  required
                  value={formPesan.telepon}
                  onChange={(e) => setFormPesan({ ...formPesan, telepon: e.target.value })}
                  placeholder="08123xxxx"
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subjek / Perihal
              </label>
              <input
                type="text"
                required
                value={formPesan.subjek}
                onChange={(e) => setFormPesan({ ...formPesan, subjek: e.target.value })}
                placeholder="Contoh: Pertanyaan Syarat Jalur Prestasi PPDB"
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Isi Pesan
              </label>
              <textarea
                rows={3}
                required
                value={formPesan.pesan}
                onChange={(e) => setFormPesan({ ...formPesan, pesan: e.target.value })}
                placeholder="Tuliskan pertanyaan Anda..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <Send className="w-4 h-4 text-[#F2B632]" />
              <span>Kirim Pertanyaan</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
