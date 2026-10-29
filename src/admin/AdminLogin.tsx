import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  KeyRound, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { PenggunaItem } from '../types';
import { authenticateUsername } from '../services/schoolService';

interface AdminLoginProps {
  onBackToPublic: () => void;
  onLoginSuccess: (user: PenggunaItem) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToPublic, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Harap isi Nama Pengguna (Username) dan Kata Sandi.');
      return;
    }

    try {
      setIsLoading(true);
      const authResult = await authenticateUsername(username, password);

      if (authResult.success && authResult.user) {
        onLoginSuccess(authResult.user);
      } else {
        setErrorMessage(authResult.message || 'Nama pengguna atau kata sandi tidak cocok.');
      }
    } catch (err: any) {
      console.error('Authentication Error:', err);
      setErrorMessage('Terjadi kendala saat memverifikasi akun: ' + (err.message || 'Silakan coba lagi.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFCFA] dark:bg-[#0B1426] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 mb-6 text-xs sm:text-sm font-semibold text-[#1F7A4D] hover:text-[#16623D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Website</span>
        </button>

        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-white rounded-full p-1.5 shadow-md border-2 border-[#1F7A4D] flex items-center justify-center">
            <img 
              src="/assets/aistudio/Logo_SMPN_2_Wanadadi_20231002_075230_0000_04a630eb.png" 
              alt="Logo SMPN 2 Wanadadi" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14264B] dark:text-white font-heading">
            Masuk Konsol Pengelola
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            SMP Negeri 2 Wanadadi • Banjarnegara
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-[#132238] py-8 px-6 sm:px-10 rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-lg space-y-6">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* USERNAME & PASSWORD FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Pengguna (Username) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan nama pengguna..."
                  className="w-full pl-10 pr-4 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kata Sandi (Password) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-11 py-2.5 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm text-[#14264B] dark:text-white focus:border-[#1F7A4D] focus:ring-1 focus:ring-[#1F7A4D]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 min-h-[46px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#F2B632]" />
                  <span>Masuk ke Konsol Pengelola</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};
