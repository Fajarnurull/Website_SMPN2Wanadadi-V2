import React, { useState, useEffect, useCallback } from 'react';
import { 
  BeritaItem, 
  GaleriItem, 
  GuruItem, 
  KegiatanGuruItem,
  PendaftarItem, 
  PengaturanSekolah,
  PenggunaItem
} from './types';
import { 
  BERITA_DEFAULT, 
  GALERI_DEFAULT, 
  GURU_DEFAULT, 
  KEGIATAN_GURU_DEFAULT,
  PENGATURAN_DEFAULT, 
  PENDAFTAR_DEFAULT,
  PENGGUNA_DEFAULT
} from './data/seedData';
import { 
  getBeritaList, 
  getGaleriList, 
  getGuruList, 
  getKegiatanGuruList,
  getPendaftarList, 
  getPengaturan,
  getPenggunaList
} from './services/schoolService';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { BerandaPage } from './pages/BerandaPage';
import { ProfilPage } from './pages/ProfilPage';
import { KegiatanGuruPage } from './pages/KegiatanGuruPage';
import { BeritaPage } from './pages/BeritaPage';
import { GaleriPage } from './pages/GaleriPage';
import { PpdbPage } from './pages/PpdbPage';
import { KontakPage } from './pages/KontakPage';

import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';

export default function App() {
  // Navigation State
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // Username/Password Authenticated User State
  const [loggedUser, setLoggedUser] = useState<PenggunaItem | null>(() => {
    try {
      const saved = localStorage.getItem('admin_session_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  // Data State
  const [pengaturan, setPengaturan] = useState<PengaturanSekolah>(PENGATURAN_DEFAULT);
  const [beritaList, setBeritaList] = useState<BeritaItem[]>(BERITA_DEFAULT);
  const [galeriList, setGaleriList] = useState<GaleriItem[]>(GALERI_DEFAULT);
  const [guruList, setGuruList] = useState<GuruItem[]>(GURU_DEFAULT);
  const [kegiatanList, setKegiatanList] = useState<KegiatanGuruItem[]>(KEGIATAN_GURU_DEFAULT);
  const [pendaftarList, setPendaftarList] = useState<PendaftarItem[]>(PENDAFTAR_DEFAULT);
  const [penggunaList, setPenggunaList] = useState<PenggunaItem[]>(PENGGUNA_DEFAULT);
  
  // Selection modals
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [activeModalFoto, setActiveModalFoto] = useState<GaleriItem | null>(null);

  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Check URL query or hash for /admin on initial load & handle Ctrl+Shift+A shortcut
  useEffect(() => {
    if (window.location.pathname.includes('/admin') || window.location.hash.includes('admin')) {
      setIsAdminView(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut Ctrl+Shift+A or Cmd+Shift+A to toggle admin view discretely
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminView((prev) => !prev);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash.includes('admin')) {
        setIsAdminView(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Fetch all school data from Firestore
  const loadAllData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [pengaturanData, beritaData, galeriData, guruData, kegiatanData, penggunaData] = await Promise.all([
        getPengaturan(),
        getBeritaList(true), // Load all for internal cache
        getGaleriList(),
        getGuruList(),
        getKegiatanGuruList(),
        getPenggunaList()
      ]);

      if (pengaturanData) setPengaturan(pengaturanData);
      if (beritaData && beritaData.length > 0) setBeritaList(beritaData);
      if (galeriData && galeriData.length > 0) setGaleriList(galeriData);
      if (guruData && guruData.length > 0) setGuruList(guruData);
      if (kegiatanData && kegiatanData.length > 0) setKegiatanList(kegiatanData);
      if (penggunaData && penggunaData.length > 0) setPenggunaList(penggunaData);

      // If user is authenticated, load PPDB registrants
      if (loggedUser) {
        const pendaftarData = await getPendaftarList();
        if (pendaftarData) setPendaftarList(pendaftarData);
      }
    } catch (err) {
      console.warn('Gagal memuat sebagian data Firestore, menggunakan data cadangan:', err);
    } finally {
      setIsLoadingData(false);
    }
  }, [loggedUser]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('admin_session_user');
    setLoggedUser(null);
    setIsAdminView(false);
  };

  const handleLoginSuccess = (user: PenggunaItem) => {
    setLoggedUser(user);
    try {
      localStorage.setItem('admin_session_user', JSON.stringify(user));
    } catch {}
    setIsAdminView(true);
    loadAllData();
  };

  // ADMIN VIEW ROUTING
  if (isAdminView) {
    // If not authenticated with username/password or Google, show login form
    if (!loggedUser) {
      return (
        <AdminLogin 
          onBackToPublic={() => setIsAdminView(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      );
    }

    // Authenticated Admin Console
    return (
      <AdminLayout
        currentUser={loggedUser}
        penggunaList={penggunaList}
        onLogout={handleLogout}
        onBackToPublic={() => setIsAdminView(false)}
        beritaList={beritaList}
        galeriList={galeriList}
        guruList={guruList}
        kegiatanList={kegiatanList}
        pendaftarList={pendaftarList}
        pengaturan={pengaturan}
        onRefreshData={loadAllData}
      />
    );
  }

  // PUBLIC WEBSITE
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFCFA] dark:bg-[#0B1426] text-[#14264B] dark:text-slate-100 selection:bg-[#F2B632] selection:text-[#14264B]">
      
      {/* Navbar Header with official social media access */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedBerita(null);
        }}
        isAdminLoggedIn={Boolean(loggedUser)}
        onOpenAdmin={() => setIsAdminView(true)}
        pengaturan={pengaturan}
      />

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <BerandaPage
            pengaturan={pengaturan}
            beritaList={beritaList}
            galeriList={galeriList}
            kegiatanList={kegiatanList}
            setActiveTab={setActiveTab}
            onSelectBerita={(item) => {
              setSelectedBerita(item);
              setActiveTab('berita');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectGaleri={(foto) => {
              setActiveModalFoto(foto);
              setActiveTab('galeri');
            }}
            onSelectKegiatan={() => {
              setActiveTab('kegiatan-guru');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'profil' && (
          <ProfilPage
            pengaturan={pengaturan}
            guruList={guruList}
            onNavigateKombel={() => {
              setActiveTab('kegiatan-guru');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'kegiatan-guru' && (
          <KegiatanGuruPage
            kegiatanList={kegiatanList}
            pengaturan={pengaturan}
            onOpenAdmin={() => setIsAdminView(true)}
          />
        )}

        {activeTab === 'berita' && (
          <BeritaPage
            beritaList={beritaList}
            selectedBerita={selectedBerita}
            onSelectBerita={setSelectedBerita}
          />
        )}

        {activeTab === 'galeri' && (
          <GaleriPage
            galeriList={galeriList}
            activeModalFoto={activeModalFoto}
            setActiveModalFoto={setActiveModalFoto}
          />
        )}

        {activeTab === 'ppdb' && (
          <PpdbPage
            pengaturan={pengaturan}
          />
        )}

        {activeTab === 'kontak' && (
          <KontakPage
            pengaturan={pengaturan}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        pengaturan={pengaturan}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedBerita(null);
        }}
        onOpenAdmin={() => setIsAdminView(true)}
      />

    </div>
  );
}
