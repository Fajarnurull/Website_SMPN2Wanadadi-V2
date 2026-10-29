import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  BeritaItem, 
  GaleriItem, 
  GuruItem, 
  KegiatanGuruItem,
  PendaftarItem, 
  PengaturanSekolah,
  PenggunaItem
} from '../types';
import { 
  BERITA_DEFAULT, 
  GALERI_DEFAULT, 
  GURU_DEFAULT, 
  KEGIATAN_GURU_DEFAULT,
  PENGATURAN_DEFAULT, 
  PENDAFTAR_DEFAULT,
  PENGGUNA_DEFAULT
} from '../data/seedData';

// Cache in memory for quick responsive rendering fallback
let cachedPengaturan: PengaturanSekolah = PENGATURAN_DEFAULT;

// PENGATURAN
export async function getPengaturan(): Promise<PengaturanSekolah> {
  const path = 'pengaturan';
  try {
    const docRef = doc(db, path, 'sekolah');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      cachedPengaturan = { ...(snap.data() as PengaturanSekolah), id: snap.id };
      return cachedPengaturan;
    }
    // If not found in Firestore yet, return default
    return cachedPengaturan;
  } catch (error) {
    console.warn('Gagal memuat pengaturan dari Firestore, memakai pengaturan bawaan:', error);
    return cachedPengaturan;
  }
}

export async function updatePengaturan(data: Partial<PengaturanSekolah>): Promise<void> {
  const path = 'pengaturan';
  try {
    const docRef = doc(db, path, 'sekolah');
    const updated = {
      ...cachedPengaturan,
      ...data,
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, updated, { merge: true });
    cachedPengaturan = updated;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/sekolah`);
  }
}

// BERITA
export async function getBeritaList(isAdmin: boolean = false): Promise<BeritaItem[]> {
  const path = 'berita';
  try {
    const colRef = collection(db, path);
    let q = query(colRef);
    if (!isAdmin) {
      q = query(colRef, where('status', '==', 'Terbit'));
    }
    const snap = await getDocs(q);
    if (snap.empty) {
      return isAdmin ? BERITA_DEFAULT : BERITA_DEFAULT.filter(b => b.status === 'Terbit');
    }
    const items: BeritaItem[] = [];
    snap.forEach(d => {
      items.push({ ...(d.data() as BeritaItem), id: d.id });
    });
    // Sort descending by date or createdAt
    return items.sort((a, b) => (b.createdAt || b.tanggal).localeCompare(a.createdAt || a.tanggal));
  } catch (error) {
    console.warn('Gagal membaca koleksi berita dari Firestore, menggunakan data cadangan default:', error);
    return isAdmin ? BERITA_DEFAULT : BERITA_DEFAULT.filter(b => b.status === 'Terbit');
  }
}

export async function getBeritaById(id: string): Promise<BeritaItem | null> {
  const path = 'berita';
  try {
    const docRef = doc(db, path, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...(snap.data() as BeritaItem), id: snap.id };
    }
    const defaultItem = BERITA_DEFAULT.find(b => b.id === id);
    return defaultItem || null;
  } catch (error) {
    console.warn(`Gagal memuat detail berita ${id}:`, error);
    return BERITA_DEFAULT.find(b => b.id === id) || null;
  }
}

export async function saveBerita(item: Partial<BeritaItem> & { id?: string }): Promise<string> {
  const path = 'berita';
  const id = item.id || `berita-${Date.now()}`;
  try {
    const docRef = doc(db, path, id);
    const payload: BeritaItem = {
      id,
      judul: item.judul || 'Judul Berita',
      ringkasan: item.ringkasan || '',
      isi: item.isi || '',
      fotoSampul: item.fotoSampul || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      tanggal: item.tanggal || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      kategori: item.kategori || 'Kegiatan',
      status: item.status || 'Terbit',
      penulis: item.penulis || 'Admin SMPN 2 Wanadadi',
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, payload, { merge: true });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${id}`);
  }
}

export async function deleteBerita(id: string): Promise<void> {
  const path = 'berita';
  try {
    await deleteDoc(doc(db, path, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
  }
}

// GALERI
export async function getGaleriList(): Promise<GaleriItem[]> {
  const path = 'galeri';
  try {
    const colRef = collection(db, path);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return GALERI_DEFAULT;
    }
    const items: GaleriItem[] = [];
    snap.forEach(d => {
      items.push({ ...(d.data() as GaleriItem), id: d.id });
    });
    return items;
  } catch (error) {
    console.warn('Gagal membaca galeri Firestore:', error);
    return GALERI_DEFAULT;
  }
}

export async function saveGaleri(item: Partial<GaleriItem> & { id?: string }): Promise<string> {
  const path = 'galeri';
  const id = item.id || `galeri-${Date.now()}`;
  try {
    const docRef = doc(db, path, id);
    const payload: GaleriItem = {
      id,
      judul: item.judul || 'Foto Dokumentasi',
      kategori: item.kategori || 'Kegiatan',
      urlFoto: item.urlFoto || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
      keterangan: item.keterangan || '',
      tanggal: item.tanggal || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      createdAt: item.createdAt || new Date().toISOString()
    };
    await setDoc(docRef, payload, { merge: true });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${id}`);
  }
}

export async function deleteGaleri(id: string): Promise<void> {
  const path = 'galeri';
  try {
    await deleteDoc(doc(db, path, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
  }
}

// GURU
export async function getGuruList(): Promise<GuruItem[]> {
  const path = 'guru';
  try {
    const colRef = collection(db, path);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return GURU_DEFAULT;
    }
    const items: GuruItem[] = [];
    snap.forEach(d => {
      items.push({ ...(d.data() as GuruItem), id: d.id });
    });
    return items.sort((a, b) => (a.urutan ?? 99) - (b.urutan ?? 99));
  } catch (error) {
    console.warn('Gagal membaca guru Firestore:', error);
    return GURU_DEFAULT;
  }
}

export async function saveGuru(item: Partial<GuruItem> & { id?: string }): Promise<string> {
  const path = 'guru';
  const id = item.id || `guru-${Date.now()}`;
  try {
    const docRef = doc(db, path, id);
    const payload: GuruItem = {
      id,
      nama: item.nama || 'Nama Guru',
      nip: item.nip || '-',
      mataPelajaran: item.mataPelajaran || 'Mata Pelajaran',
      jabatan: item.jabatan || 'Guru Mata Pelajaran',
      kategori: item.kategori || (item.jabatan?.toLowerCase().includes('administrasi') || item.jabatan?.toLowerCase().includes('tata usaha') || item.jabatan?.toLowerCase().includes('tu') || item.jabatan?.toLowerCase().includes('bendahara') || item.jabatan?.toLowerCase().includes('operator') || item.jabatan?.toLowerCase().includes('perpustakaan') ? 'Tenaga Administrasi' : 'Guru'),
      fotoUrl: item.fotoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      urutan: item.urutan ?? 10,
      createdAt: item.createdAt || new Date().toISOString()
    };
    await setDoc(docRef, payload, { merge: true });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${id}`);
  }
}

export async function saveGuruBatch(items: (Partial<GuruItem> & { id?: string })[]): Promise<number> {
  const path = 'guru';
  try {
    let saved = 0;
    for (const item of items) {
      if (!item.nama?.trim()) continue;
      const id = item.id || `guru-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const docRef = doc(db, path, id);
      const isTendik = 
        item.kategori === 'Tenaga Administrasi' || 
        item.jabatan?.toLowerCase().includes('administrasi') || 
        item.jabatan?.toLowerCase().includes('tata usaha') || 
        item.jabatan?.toLowerCase().includes('tu') || 
        item.jabatan?.toLowerCase().includes('bendahara') || 
        item.jabatan?.toLowerCase().includes('operator') || 
        item.jabatan?.toLowerCase().includes('perpustakaan') ||
        item.jabatan?.toLowerCase().includes('laboran') ||
        item.jabatan?.toLowerCase().includes('staf');

      const isPimpinan = 
        item.kategori === 'Pimpinan' ||
        item.jabatan?.toLowerCase().includes('kepala sekolah') ||
        item.jabatan?.toLowerCase().includes('wakil kepala');

      const kategoriFinal: 'Guru' | 'Tenaga Administrasi' | 'Pimpinan' = 
        item.kategori || (isPimpinan ? 'Pimpinan' : isTendik ? 'Tenaga Administrasi' : 'Guru');

      const payload: GuruItem = {
        id,
        nama: item.nama.trim(),
        nip: item.nip?.trim() || '-',
        mataPelajaran: item.mataPelajaran?.trim() || (isTendik ? 'Administrasi Sekolah' : 'Mata Pelajaran'),
        jabatan: item.jabatan?.trim() || (isTendik ? 'Staf Tata Usaha' : 'Guru Mata Pelajaran'),
        kategori: kategoriFinal,
        fotoUrl: item.fotoUrl?.trim() || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
        urutan: item.urutan ?? (saved + 1),
        createdAt: item.createdAt || new Date().toISOString()
      };
      await setDoc(docRef, payload, { merge: true });
      saved++;
    }
    return saved;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return 0;
  }
}

export async function deleteGuru(id: string): Promise<void> {
  const path = 'guru';
  try {
    await deleteDoc(doc(db, path, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
  }
}

// PPDB / PENDAFTAR
export async function submitPendaftaran(formData: {
  namaLengkap: string;
  nisn: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  asalSekolah: string;
  namaOrangTua: string;
  noHp: string;
  alamat: string;
}): Promise<PendaftarItem> {
  const path = 'pendaftar';
  const timestamp = Date.now();
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const noPendaftaran = `PPDB-2025-WNDD-${randomSuffix}`;
  const id = `reg-${timestamp}-${randomSuffix}`;

  const payload: PendaftarItem = {
    id,
    noPendaftaran,
    namaLengkap: formData.namaLengkap.trim(),
    nisn: formData.nisn.trim() || '-',
    tempatLahir: formData.tempatLahir.trim(),
    tanggalLahir: formData.tanggalLahir,
    jenisKelamin: formData.jenisKelamin,
    asalSekolah: formData.asalSekolah.trim(),
    namaOrangTua: formData.namaOrangTua.trim(),
    noHp: formData.noHp.trim(),
    alamat: formData.alamat.trim(),
    status: 'Baru',
    createdAt: new Date().toISOString()
  };

  try {
    const docRef = doc(db, path, id);
    await setDoc(docRef, payload);
    return payload;
  } catch (error) {
    // If permission or offline error occurs, save to localStorage fallback so user gets their receipt
    try {
      const existingRaw = localStorage.getItem('local_pendaftar');
      const list: PendaftarItem[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(payload);
      localStorage.setItem('local_pendaftar', JSON.stringify(list));
      return payload;
    } catch {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }
}

export async function getPendaftarList(): Promise<PendaftarItem[]> {
  const path = 'pendaftar';
  try {
    const colRef = collection(db, path);
    const snap = await getDocs(colRef);
    const items: PendaftarItem[] = [];
    snap.forEach(d => {
      items.push({ ...(d.data() as PendaftarItem), id: d.id });
    });
    // Also include any local registrations if present
    try {
      const local = localStorage.getItem('local_pendaftar');
      if (local) {
        const localList: PendaftarItem[] = JSON.parse(local);
        localList.forEach(l => {
          if (!items.some(i => i.id === l.id || i.noPendaftaran === l.noPendaftaran)) {
            items.push(l);
          }
        });
      }
    } catch (e) {
      // ignore
    }
    if (items.length === 0) {
      return PENDAFTAR_DEFAULT;
    }
    return items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } catch (error) {
    console.warn('Gagal membaca pendaftar dari Firestore (mungkin non-admin):', error);
    try {
      const local = localStorage.getItem('local_pendaftar');
      if (local) return JSON.parse(local);
    } catch {}
    return PENDAFTAR_DEFAULT;
  }
}

export async function updatePendaftarStatus(
  id: string, 
  status: 'Baru' | 'Diverifikasi' | 'Diterima' | 'Ditolak', 
  catatan?: string
): Promise<void> {
  const path = 'pendaftar';
  try {
    const docRef = doc(db, path, id);
    await setDoc(docRef, { status, catatan: catatan || '' }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${path}/${id}`);
  }
}

export async function deletePendaftar(id: string): Promise<void> {
  const path = 'pendaftar';
  try {
    await deleteDoc(doc(db, path, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
  }
}

// PENGGUNA (USERS / OPERATORS)
export async function getPenggunaList(): Promise<PenggunaItem[]> {
  const path = 'pengguna';
  try {
    const colRef = collection(db, path);
    const snap = await getDocs(colRef);
    const items: PenggunaItem[] = [];
    snap.forEach(d => {
      items.push({ ...(d.data() as PenggunaItem), id: d.id });
    });

    // Check localStorage fallback
    try {
      const local = localStorage.getItem('local_pengguna');
      if (local) {
        const localList: PenggunaItem[] = JSON.parse(local);
        localList.forEach(l => {
          if (!items.some(i => i.id === l.id || i.username.toLowerCase() === l.username.toLowerCase())) {
            items.push(l);
          }
        });
      }
    } catch {}

    if (items.length === 0) {
      return PENGGUNA_DEFAULT;
    }
    return items;
  } catch (error) {
    console.warn('Gagal membaca koleksi pengguna dari Firestore, memakai data lokal:', error);
    try {
      const local = localStorage.getItem('local_pengguna');
      if (local) return JSON.parse(local);
    } catch {}
    return PENGGUNA_DEFAULT;
  }
}

export async function savePengguna(item: Partial<PenggunaItem> & { id?: string }): Promise<string> {
  const path = 'pengguna';
  const id = item.id || `user-${Date.now()}`;
  const username = (item.username || '').trim().toLowerCase();

  const payload: PenggunaItem = {
    id,
    username,
    nama: (item.nama || '').trim() || 'Pengguna',
    password: item.password || 'spenda123',
    role: item.role || 'kontributor',
    aktif: item.aktif !== undefined ? item.aktif : true,
    createdAt: item.createdAt || new Date().toISOString()
  };

  try {
    const docRef = doc(db, path, id);
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    console.warn('Gagal menyimpan ke Firestore pengguna, menyimpan ke fallback lokal:', error);
  }

  // Always sync to localStorage
  try {
    const existingRaw = localStorage.getItem('local_pengguna');
    let list: PenggunaItem[] = existingRaw ? JSON.parse(existingRaw) : [...PENGGUNA_DEFAULT];
    const existingIdx = list.findIndex(u => u.id === id || u.username.toLowerCase() === username);
    if (existingIdx >= 0) {
      list[existingIdx] = payload;
    } else {
      list.push(payload);
    }
    localStorage.setItem('local_pengguna', JSON.stringify(list));
  } catch {}

  return id;
}

export async function deletePengguna(id: string): Promise<void> {
  const path = 'pengguna';
  try {
    await deleteDoc(doc(db, path, id));
  } catch (error) {
    console.warn('Gagal menghapus pengguna dari Firestore:', error);
  }

  // Sync to localStorage
  try {
    const existingRaw = localStorage.getItem('local_pengguna');
    if (existingRaw) {
      const list: PenggunaItem[] = JSON.parse(existingRaw);
      const filtered = list.filter(u => u.id !== id);
      localStorage.setItem('local_pengguna', JSON.stringify(filtered));
    }
  } catch {}
}

export async function authenticateUsername(
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: PenggunaItem; message?: string }> {
  const cleanUser = usernameInput.trim().toLowerCase();
  const cleanPass = passwordInput.trim();

  if (!cleanUser || !cleanPass) {
    return { success: false, message: 'Harap isi nama pengguna (username) dan kata sandi.' };
  }

  // Get current list of users
  const allUsers = await getPenggunaList();
  
  // Find matching user
  const found = allUsers.find(
    u => u.username.toLowerCase() === cleanUser && u.password === cleanPass
  );

  if (found) {
    if (!found.aktif) {
      return { success: false, message: 'Akun pengguna ini sedang dinonaktifkan. Hubungi administrator utama.' };
    }
    return { success: true, user: found };
  }

  // Check fallback default admin or operator (support both Esperowan and initial credentials)
  if (cleanUser === 'admin' && (cleanPass === 'adminesperowan' || cleanPass === 'adminspenda')) {
    return { 
      success: true, 
      user: {
        id: 'user-admin',
        username: 'admin',
        nama: 'Administrator Utama Esperowan',
        password: cleanPass,
        role: 'admin',
        aktif: true
      } 
    };
  }

  if (cleanUser === 'operator' && (cleanPass === 'beritaesperowan' || cleanPass === 'beritaspenda')) {
    return { 
      success: true, 
      user: {
        id: 'user-operator',
        username: 'operator',
        nama: 'Humas & Kontributor Prestasi',
        password: cleanPass,
        role: 'kontributor',
        aktif: true
      } 
    };
  }

  const defaultFound = PENGGUNA_DEFAULT.find(
    u => u.username.toLowerCase() === cleanUser && u.password === cleanPass
  );

  if (defaultFound) {
    return { success: true, user: defaultFound };
  }

  return { success: false, message: 'Nama pengguna (username) atau kata sandi tidak cocok. Silakan periksa kembali.' };
}

// KEGIATAN GURU & KOMUNITAS BELAJAR (KOMBEL)
export async function getKegiatanGuruList(): Promise<KegiatanGuruItem[]> {
  const path = 'kegiatan_guru';
  try {
    const colRef = collection(db, path);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return KEGIATAN_GURU_DEFAULT;
    }
    const items: KegiatanGuruItem[] = [];
    snap.forEach(d => {
      items.push({ ...(d.data() as KegiatanGuruItem), id: d.id });
    });
    // Sort descending by createdAt or date
    return items.sort((a, b) => (b.createdAt || b.tanggal).localeCompare(a.createdAt || a.tanggal));
  } catch (error) {
    console.warn('Gagal membaca koleksi kegiatan_guru dari Firestore, menggunakan cadangan default:', error);
    return KEGIATAN_GURU_DEFAULT;
  }
}

export async function saveKegiatanGuru(item: Partial<KegiatanGuruItem>): Promise<string> {
  const path = 'kegiatan_guru';
  const id = item.id || `kombel-${Date.now()}`;
  try {
    const docRef = doc(db, path, id);
    const dataToSave: KegiatanGuruItem = {
      id,
      judul: item.judul || 'Kegiatan Guru & Kombel',
      kategori: item.kategori || 'Komunitas Belajar',
      tanggal: item.tanggal || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      waktu: item.waktu || '13.00 - 15.30 WIB',
      tempat: item.tempat || 'SMP Negeri 2 Wanadadi',
      penyelenggara: item.penyelenggara || 'Kombel Spenda Berkibar',
      narasumber: item.narasumber || 'Tim Kurikulum & Pendidik',
      deskripsi: item.deskripsi || '',
      fotoUrl: item.fotoUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
      tautanMateri: item.tautanMateri || '',
      status: item.status || 'Terlaksana',
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, dataToSave, { merge: true });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${path}/${id}`);
  }
}

export async function deleteKegiatanGuru(id: string): Promise<void> {
  const path = 'kegiatan_guru';
  try {
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
  }
}

// SEED DATA INITIALIZER
export async function seedInitialFirestoreData(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Pengaturan
    await setDoc(doc(db, 'pengaturan', 'sekolah'), PENGATURAN_DEFAULT, { merge: true });

    // 2. Berita
    for (const b of BERITA_DEFAULT) {
      await setDoc(doc(db, 'berita', b.id), b, { merge: true });
    }

    // 3. Galeri
    for (const g of GALERI_DEFAULT) {
      await setDoc(doc(db, 'galeri', g.id), g, { merge: true });
    }

    // 4. Guru
    for (const guru of GURU_DEFAULT) {
      await setDoc(doc(db, 'guru', guru.id), guru, { merge: true });
    }

    // 5. Kegiatan Guru & Komunitas Belajar (Kombel)
    for (const kg of KEGIATAN_GURU_DEFAULT) {
      await setDoc(doc(db, 'kegiatan_guru', kg.id), kg, { merge: true });
    }

    // 6. Pengguna (Admin & Kontributor)
    for (const user of PENGGUNA_DEFAULT) {
      await setDoc(doc(db, 'pengguna', user.id), user, { merge: true });
    }

    return { 
      success: true, 
      message: 'Berhasil mengunggah data awal resmi (berita, galeri, dewan guru, kegiatan komunitas belajar, akun admin/operator, dan pengaturan sekolah) ke Firestore!' 
    };
  } catch (error) {
    console.error('Seed initial data error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gagal menyuntikkan data awal.'
    };
  }
}
