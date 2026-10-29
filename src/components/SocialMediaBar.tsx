import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PengaturanSekolah } from '../types';

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.03 3.33-1.61 3.39-3.42.04-3.14.02-6.28.02-9.42V.02h-.11z"/>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

interface SocialMediaBarProps {
  pengaturan?: PengaturanSekolah;
  variant?: 'icons-only' | 'buttons' | 'cards' | 'badge-row';
  className?: string;
  theme?: 'light' | 'dark' | 'header';
}

export const SocialMediaBar: React.FC<SocialMediaBarProps> = ({
  pengaturan,
  variant = 'icons-only',
  className = '',
  theme = 'light'
}) => {
  const youtube = pengaturan?.youtubeUrl || 'https://www.youtube.com/@smpnegeri2wanadadi';
  const tiktok = pengaturan?.tiktokUrl || 'https://www.tiktok.com/@smpn2wanadadi';
  const instagram = pengaturan?.instagramUrl || 'https://www.instagram.com/smpn2wanadadi/';

  const channels = [
    {
      id: 'youtube',
      nama: 'YouTube',
      handle: '@smpnegeri2wanadadi',
      deskripsi: 'Video dokumentasi kegiatan, pentas seni karawitan, dan profil pembelajaran.',
      url: youtube,
      icon: YouTubeIcon,
      hoverBg: 'hover:bg-[#FF0000]',
      colorText: 'text-[#FF0000]',
      badgeColor: 'bg-red-600',
      gradient: 'from-red-600 to-rose-700'
    },
    {
      id: 'tiktok',
      nama: 'TikTok',
      handle: '@smpn2wanadadi',
      deskripsi: 'Keseruan aksi kreatif siswa, tren edukatif, dan cuplikan prestasi sekolah.',
      url: tiktok,
      icon: TikTokIcon,
      hoverBg: 'hover:bg-[#000000]',
      colorText: 'text-neutral-900 dark:text-neutral-100',
      badgeColor: 'bg-black dark:bg-neutral-800',
      gradient: 'from-neutral-900 via-zinc-800 to-black'
    },
    {
      id: 'instagram',
      nama: 'Instagram',
      handle: '@smpn2wanadadi',
      deskripsi: 'Warta foto harian, cerita sekolah (stories), pengumuman, dan galeri Esperowan.',
      url: instagram,
      icon: InstagramIcon,
      hoverBg: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600',
      colorText: 'text-pink-600',
      badgeColor: 'bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600',
      gradient: 'from-amber-500 via-pink-600 to-purple-700'
    }
  ];

  if (variant === 'icons-only') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka akun ${ch.nama} resmi SMP Negeri 2 Wanadadi`}
              className={`p-1.5 rounded-lg transition-all duration-200 transform hover:scale-110 flex items-center justify-center ${
                theme === 'header'
                  ? 'text-slate-200 hover:text-white hover:bg-white/15'
                  : theme === 'dark'
                  ? 'text-slate-300 hover:text-[#F2B632] hover:bg-white/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#1F7A4D] hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={`${ch.nama}: ${ch.handle}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'badge-row') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/15 transition-all duration-200 hover:border-white/30 hover:scale-105"
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{ch.nama}</span>
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2.5 ${className}`}>
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{
                backgroundColor:
                  ch.id === 'youtube' ? '#E50914' : ch.id === 'tiktok' ? '#010101' : '#C13584'
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{ch.nama}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          );
        })}
      </div>
    );
  }

  // Cards layout with rich descriptions and handles
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 ${className}`}>
      {channels.map((ch) => {
        const Icon = ch.icon;
        return (
          <div
            key={ch.id}
            className="group relative bg-white dark:bg-[#132238] rounded-2xl p-5 sm:p-6 border-2 border-[#D5E0D8] dark:border-[#23395B] hover:border-[#1F7A4D] dark:hover:border-[#F2B632] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${ch.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {ch.handle}
                </span>
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-[#14264B] dark:text-white group-hover:text-[#1F7A4D] dark:group-hover:text-[#F2B632] transition-colors">
                  {ch.nama} Resmi Esperowan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {ch.deskripsi}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
              <a
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 bg-gradient-to-r ${ch.gradient} shadow transition-all duration-200 active:scale-95 group-hover:brightness-110`}
              >
                <span>Kunjungi {ch.nama}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
