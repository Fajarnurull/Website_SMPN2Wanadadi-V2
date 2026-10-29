import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Upload, 
  X, 
  CheckCircle2,
  Camera,
  Download,
  FileSpreadsheet,
  Search,
  Sparkles,
  FileText,
  ChevronDown
} from 'lucide-react';
import { GuruItem } from '../types';
import { saveGuru, saveGuruBatch, deleteGuru } from '../services/schoolService';
import { uploadSchoolImage } from '../firebase';

interface AdminGuruProps {
  guruList: GuruItem[];
  onRefresh: () => void;
}

// Preset Paket Lengkap Pendidik & Tenaga Kependidikan SMP Negeri 2 Wanadadi (Esperowan)
const PRESET_GURU_TENDIK: Partial<GuruItem>[] = [
  {
    nama: 'H. Bambang Sulistyo, M.Pd.',
    nip: '19740512 199903 1 004',
    kategori: 'Pimpinan',
    jabatan: 'Kepala Sekolah',
    mataPelajaran: 'Manajemen Pendidikan',
    fotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    urutan: 1
  },
  {
    nama: 'Dra. Sri Wahyuningsih, M.Si.',
    nip: '19760814 200212 2 003',
    kategori: 'Guru',
    jabatan: 'Wakil Kepala Sekolah Bidang Kurikulum',
    mataPelajaran: 'Ilmu Pengetahuan Alam (IPA)',
    fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    urutan: 2
  },
  {
    nama: 'Ahmad Fauzi, S.Pd.',
    nip: '19850322 201001 1 012',
    kategori: 'Guru',
    jabatan: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    mataPelajaran: 'Matematika & Pembina OSIS Esperowan',
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    urutan: 3
  },
  {
    nama: 'Nurul Hidayati, S.Pd.',
    nip: '19871105 201101 2 018',
    kategori: 'Guru',
    jabatan: 'Guru Mata Pelajaran',
    mataPelajaran: 'Bahasa Indonesia',
    fotoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
    urutan: 4
  },
  {
    nama: 'Budi Santoso, S.Pd., M.Hum.',
    nip: '19820215 200801 1 009',
    kategori: 'Guru',
    jabatan: 'Guru Mata Pelajaran',
    mataPelajaran: 'Bahasa Inggris',
    fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    urutan: 5
  },
  {
    nama: 'Siti Rohmah, S.Ag.',
    nip: '19800418 200604 2 015',
    kategori: 'Guru',
    jabatan: 'Guru Mata Pelajaran',
    mataPelajaran: 'Pendidikan Agama Islam & Budi Pekerti',
    fotoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    urutan: 6
  },
  {
    nama: 'Tri Wahyudi, S.Pd.',
    nip: '19890610 201502 1 003',
    kategori: 'Guru',
    jabatan: 'Guru Mata Pelajaran',
    mataPelajaran: 'Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)',
    fotoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    urutan: 7
  },
  {
    nama: 'Endah Puspitasari, S.Pd.',
    nip: '19910328 201903 2 011',
    kategori: 'Guru',
    jabatan: 'Guru Mata Pelajaran',
    mataPelajaran: 'Informatika & Pembina Komputer',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    urutan: 8
  },
  {
    nama: 'Joko Prasetyo, S.Pd.',
    nip: '19830914 200903 1 007',
    kategori: 'Guru',
    jabatan: 'Guru Mata Pelajaran',
    mataPelajaran: 'Seni Budaya & Keterampilan (Karawitan Esperowan)',
    fotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    urutan: 9
  },
  {
    nama: 'Dewi Lestari, S.Pd.',
    nip: '19900812 201704 2 010',
    kategori: 'Guru',
    jabatan: 'Guru Bimbingan dan Konseling (BK)',
    mataPelajaran: 'Bimbingan dan Konseling (BK)',
    fotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    urutan: 10
  },
  // Tenaga Administrasi / Tata Usaha (TU) Esperowan
  {
    nama: 'Supriyanto, S.AP.',
    nip: '19780820 200501 1 006',
    kategori: 'Tenaga Administrasi',
    jabatan: 'Kepala Tata Usaha (KTU)',
    mataPelajaran: 'Kepala Urusan Tata Usaha & Ketatausahaan',
    fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    urutan: 11
  },
  {
    nama: 'Rina Kusuma Dewi, A.Md.',
    nip: '19860515 201202 2 004',
    kategori: 'Tenaga Administrasi',
    jabatan: 'Bendahara Sekolah & BOS',
    mataPelajaran: 'Pengelola Keuangan & Anggaran',
    fotoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    urutan: 12
  },
  {
    nama: 'Wahyu Hidayat, S.Kom.',
    nip: '19920403 202012 1 008',
    kategori: 'Tenaga Administrasi',
    jabatan: 'Operator Dapodik & SIMPATIKA',
    mataPelajaran: 'Pengelola Data Pokok Pendidikan & Web Esperowan',
    fotoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    urutan: 13
  },
  {
    nama: 'Yuliana Astuti, S.I.Pust.',
    nip: '19930719 202203 2 014',
    kategori: 'Tenaga Administrasi',
    jabatan: 'Pengelola Perpustakaan Sekolah',
    mataPelajaran: 'Manajemen Pustaka Cendekia & Pojok Baca Digital',
    fotoUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80',
    urutan: 14
  },
  {
    nama: 'Agus Triono',
    nip: '-',
    kategori: 'Tenaga Administrasi',
    jabatan: 'Laboran & Petugas Sarpras',
    mataPelajaran: 'Pemeliharaan Laboratorium IPA & Komputer',
    fotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    urutan: 15
  }
];

export const AdminGuru: React.FC<AdminGuruProps> = ({ guruList, onRefresh }) => {
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GuruItem | null>(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'Semua' | 'Guru' | 'Tenaga Administrasi' | 'Pimpinan'>('Semua');

  // Single Form fields
  const [nama, setNama] = useState('');
  const [nip, setNip] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [jabatan, setJabatan] = useState('Guru Mata Pelajaran');
  const [kategori, setKategori] = useState<'Guru' | 'Tenaga Administrasi' | 'Pimpinan'>('Guru');
  const [fotoUrl, setFotoUrl] = useState('');
  const [urutan, setUrutan] = useState(10);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Bulk Modal state
  const [bulkTab, setBulkTab] = useState<'paste' | 'preset' | 'multi'>('paste');
  const [rawText, setRawText] = useState('');
  const [isBulkSaving, setIsBulkSaving] = useState(false);

  // Multi-row quick add state
  const [quickRows, setQuickRows] = useState<Array<{
    nama: string;
    nip: string;
    kategori: 'Guru' | 'Tenaga Administrasi' | 'Pimpinan';
    jabatan: string;
    mataPelajaran: string;
  }>>([
    { nama: '', nip: '', kategori: 'Guru', jabatan: 'Guru Mata Pelajaran', mataPelajaran: '' },
    { nama: '', nip: '', kategori: 'Guru', jabatan: 'Guru Mata Pelajaran', mataPelajaran: '' },
    { nama: '', nip: '', kategori: 'Tenaga Administrasi', jabatan: 'Staf Tata Usaha', mataPelajaran: 'Administrasi Umum' }
  ]);

  // Filtered List
  const filteredList = useMemo(() => {
    return guruList.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mataPelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.jabatan.toLowerCase().includes(searchTerm.toLowerCase());

      const itemCategory = item.kategori || (
        item.jabatan?.toLowerCase().includes('administrasi') || 
        item.jabatan?.toLowerCase().includes('tata usaha') || 
        item.jabatan?.toLowerCase().includes('tu') || 
        item.jabatan?.toLowerCase().includes('bendahara') || 
        item.jabatan?.toLowerCase().includes('operator') || 
        item.jabatan?.toLowerCase().includes('perpustakaan') ||
        item.jabatan?.toLowerCase().includes('laboran')
          ? 'Tenaga Administrasi'
          : item.jabatan?.toLowerCase().includes('kepala')
            ? 'Pimpinan'
            : 'Guru'
      );

      const matchCategory = categoryFilter === 'Semua' || itemCategory === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [guruList, searchTerm, categoryFilter]);

  // Counts
  const counts = useMemo(() => {
    let guru = 0;
    let tendik = 0;
    let pimpinan = 0;
    guruList.forEach(item => {
      const isTendik = 
        item.kategori === 'Tenaga Administrasi' || 
        item.jabatan?.toLowerCase().includes('administrasi') || 
        item.jabatan?.toLowerCase().includes('tata usaha') || 
        item.jabatan?.toLowerCase().includes('tu') || 
        item.jabatan?.toLowerCase().includes('bendahara') || 
        item.jabatan?.toLowerCase().includes('operator') || 
        item.jabatan?.toLowerCase().includes('perpustakaan') ||
        item.jabatan?.toLowerCase().includes('laboran');
      const isPim = item.kategori === 'Pimpinan' || item.jabatan?.toLowerCase().includes('kepala sekolah');

      if (isPim) pimpinan++;
      else if (isTendik) tendik++;
      else guru++;
    });
    return { all: guruList.length, guru, tendik, pimpinan };
  }, [guruList]);

  // Determine Category string
  const getKategoriString = (item: GuruItem) => {
    if (item.kategori) return item.kategori;
    if (
      item.jabatan?.toLowerCase().includes('administrasi') || 
      item.jabatan?.toLowerCase().includes('tata usaha') || 
      item.jabatan?.toLowerCase().includes('tu') || 
      item.jabatan?.toLowerCase().includes('bendahara') || 
      item.jabatan?.toLowerCase().includes('operator') || 
      item.jabatan?.toLowerCase().includes('perpustakaan') ||
      item.jabatan?.toLowerCase().includes('laboran')
    ) {
      return 'Tenaga Administrasi';
    }
    if (item.jabatan?.toLowerCase().includes('kepala sekolah')) {
      return 'Pimpinan';
    }
    return 'Guru';
  };

  /**
   * EKSPOR KE EXCEL ASLI (.XLS / SPREADSHEET HTML)
   * Terbuka 100% langsung terbagi ke masing-masing kolom terpisah di Microsoft Excel:
   * Kolom 1: Nama Guru / Tenaga Administrasi
   * Kolom 2: NIP / NUPTK
   * Kolom 3: Jabatan
   * Kolom 4: Mata Pelajaran / Tugas
   * Kolom 5: Kategori
   * Kolom 6: Urutan
   * Kolom 7: URL Foto
   */
  const handleExportExcel = () => {
    if (guruList.length === 0) {
      alert('Tidak ada data guru atau tenaga administrasi untuk diekspor.');
      return;
    }

    const rowsHtml = guruList.map((item, idx) => {
      const kat = getKategoriString(item);
      const cleanNip = item.nip || '-';
      return `
        <tr>
          <td style="text-align: center; mso-number-format:'0';">${idx + 1}</td>
          <td style="font-weight: bold; mso-number-format:'\\@';">${item.nama || ''}</td>
          <td style="mso-number-format:'\\@'; font-family: monospace;">${cleanNip}</td>
          <td>${item.jabatan || ''}</td>
          <td>${item.mataPelajaran || ''}</td>
          <td style="text-align: center;">${kat}</td>
          <td style="text-align: center; mso-number-format:'0';">${item.urutan ?? idx + 1}</td>
          <td><a href="${item.fotoUrl || ''}">${item.fotoUrl || ''}</a></td>
        </tr>
      `;
    }).join('');

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Guru dan Tendik Esperowan</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          table { border-collapse: collapse; width: 100%; font-family: Calibri, Arial, sans-serif; }
          th { background-color: #1F7A4D; color: #ffffff; font-weight: bold; padding: 10px; border: 1px solid #14264B; font-size: 13px; }
          td { padding: 8px 10px; border: 1px solid #dcdcdc; font-size: 12px; vertical-align: middle; }
          .title { font-size: 16px; font-weight: bold; color: #14264B; margin-bottom: 5px; }
        </style>
      </head>
      <body>
        <div class="title">DATA DEWAN GURU & TENAGA ADMINISTRASI SMP NEGERI 2 WANADADI (ESPEROWAN)</div>
        <div style="font-size: 12px; color: #666; margin-bottom: 12px;">Tanggal Unduh: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</div>
        <table>
          <thead>
            <tr>
              <th style="width: 50px;">No</th>
              <th style="width: 250px;">Nama Guru / Tenaga Administrasi</th>
              <th style="width: 190px;">NIP / NUPTK</th>
              <th style="width: 220px;">Jabatan</th>
              <th style="width: 220px;">Mata Pelajaran / Tugas</th>
              <th style="width: 140px;">Kategori</th>
              <th style="width: 70px;">Urutan</th>
              <th style="width: 300px;">URL Foto</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data-guru-tendik-esperowan-${new Date().toISOString().split('T')[0]}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
  };

  /**
   * EKSPOR CSV DENGAN PEMISAH TITIK-KOMA (;) KHUSUS EXCEL INDONESIA
   * Dilengkapi direktif 'sep=;\r\n' dan tanda kutip, sehingga Microsoft Excel
   * PASTI membagi data ke kolom A, B, C, D, E, F, G secara terpisah!
   * Urutan kolom sesuai instruksi pengguna:
   * Kolom 1: Nama Guru / Tenaga Administrasi
   * Kolom 2: NIP / NUPTK (dengan format formula ="..." agar tidak menjadi notasi ilmiah)
   * Kolom 3: Jabatan
   * Kolom 4: Mata Pelajaran / Tugas
   * Kolom 5: Kategori
   * Kolom 6: Urutan
   * Kolom 7: URL Foto
   */
  const handleExportCSV = (delimiter: ';' | ',' = ';') => {
    if (guruList.length === 0) {
      alert('Tidak ada data guru atau tenaga administrasi untuk diekspor.');
      return;
    }

    const headers = [
      'Nama Guru / Tenaga Administrasi',
      'NIP / NUPTK',
      'Jabatan',
      'Mata Pelajaran / Tugas',
      'Kategori',
      'Urutan',
      'URL Foto'
    ];

    const rows = guruList.map((item, index) => {
      const kat = getKategoriString(item);
      const cleanNama = (item.nama || '').replace(/"/g, '""');
      const cleanNip = (item.nip || '-').replace(/"/g, '""');
      const cleanJabatan = (item.jabatan || '').replace(/"/g, '""');
      const cleanMapel = (item.mataPelajaran || '').replace(/"/g, '""');
      const cleanFoto = (item.fotoUrl || '').replace(/"/g, '""');
      const urutanVal = item.urutan ?? index + 1;

      // Notice: Kolom 1: Nama, Kolom 2: NIP, Kolom 3: Jabatan
      // We format NIP as ="..." in CSV so Excel locks it as a string instead of scientific notation
      return [
        `"${cleanNama}"`,
        `="${cleanNip}"`,
        `"${cleanJabatan}"`,
        `"${cleanMapel}"`,
        `"${kat}"`,
        urutanVal,
        `"${cleanFoto}"`
      ].join(delimiter);
    });

    // In Microsoft Excel, putting "sep=;\r\n" at the top tells Excel which separator to use,
    // guaranteeing it splits across distinct columns!
    const directive = `sep=${delimiter}\r\n`;
    const csvContent = '\uFEFF' + directive + [headers.join(delimiter), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data-guru-dan-tendik-esperowan-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
  };

  // Download Sample CSV Template dengan urutan:
  // Kolom 1: Nama, Kolom 2: NIP, Kolom 3: Jabatan, Kolom 4: Mata Pelajaran, Kolom 5: Kategori
  const handleDownloadTemplate = () => {
    const templateContent = 
      '\uFEFFsep=;\r\n' +
      'Nama Guru / Tenaga Administrasi;NIP / NUPTK;Jabatan;Mata Pelajaran / Tugas;Kategori\r\n' +
      'Bambang Wijaya S.Pd.;19820510 200801 1 005;Guru Mata Pelajaran;Matematika;Guru\r\n' +
      'Siti Nurhaliza M.Pd.;19870312 201101 2 008;Guru Mata Pelajaran;Bahasa Inggris;Guru\r\n' +
      'Rudi Hartono A.Md.;19890412 201402 1 003;Staf Tata Usaha;Administrasi Kesiswaan;Tenaga Administrasi\r\n' +
      'Ratna Sari S.E.;19910620 201903 2 007;Bendahara Sekolah;Pengelola Keuangan & BOS;Tenaga Administrasi\r\n' +
      'Wahyu Hidayat S.Kom.;19920403 202012 1 008;Operator Dapodik;Operator Data Dapodik Esperowan;Tenaga Administrasi';
    
    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'template-impor-guru-tendik-esperowan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle CSV file upload in bulk modal
  const handleCSVFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setRawText(text.replace(/^\uFEFF/, '')); // strip BOM if present
      }
    };
    reader.readAsText(file);
  };

  // Parse raw text into Guru items (supports both column orders: [Nama, NIP, Jabatan, Mapel, Kategori] and [Nama, NIP, Kategori, Jabatan, Mapel])
  const parsedBulkItems = useMemo(() => {
    if (!rawText.trim()) return [];

    let cleaned = rawText.trim();
    // remove sep=; line if present
    cleaned = cleaned.replace(/^sep=[;,]\r?\n/i, '');

    const lines = cleaned.split(/\r?\n/).filter(line => line.trim().length > 0);
    const results: Partial<GuruItem>[] = [];

    // Check if first line is header
    let startIndex = 0;
    const firstLineLower = lines[0].toLowerCase();
    if (firstLineLower.includes('nama') || firstLineLower.includes('nip') || firstLineLower.includes('guru')) {
      startIndex = 1;
    }

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      let parts: string[] = [];
      if (line.includes(';') && !line.includes('\t')) {
        parts = line.split(';');
      } else if (line.includes('\t')) {
        parts = line.split('\t');
      } else {
        parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      }

      // Clean Excel formula format: ="19800..." -> 19800...
      const cleanParts = parts.map(p => {
        let val = p.trim().replace(/^"|"$/g, '');
        if (val.startsWith('="') && val.endsWith('"')) {
          val = val.substring(2, val.length - 1);
        }
        return val;
      });

      if (cleanParts.length >= 1 && cleanParts[0]) {
        const rawNama = cleanParts[0];
        const rawNip = cleanParts[1] || '-';
        
        let rawJabatan = 'Guru Mata Pelajaran';
        let rawMapel = 'Mata Pelajaran';
        let rawKategori = '';

        // Check if Col 2 is Jabatan (new requested order) or Kategori
        const col2 = cleanParts[2] || '';
        const col3 = cleanParts[3] || '';
        const col4 = cleanParts[4] || '';

        const isCol2Kategori = ['guru', 'tenaga administrasi', 'tendik', 'pimpinan', 'staf'].includes(col2.toLowerCase());

        if (isCol2Kategori) {
          rawKategori = col2;
          rawJabatan = col3 || 'Guru Mata Pelajaran';
          rawMapel = col4 || (rawKategori.toLowerCase().includes('administrasi') ? 'Administrasi Sekolah' : 'Mata Pelajaran');
        } else {
          // New requested order: Col 0: Nama, Col 1: NIP, Col 2: Jabatan, Col 3: Mapel, Col 4: Kategori
          rawJabatan = col2 || 'Guru Mata Pelajaran';
          rawMapel = col3 || 'Mata Pelajaran';
          rawKategori = col4 || '';
        }

        let detectedKategori: 'Guru' | 'Tenaga Administrasi' | 'Pimpinan' = 'Guru';
        if (
          rawKategori.toLowerCase().includes('administrasi') ||
          rawKategori.toLowerCase().includes('tendik') ||
          rawKategori.toLowerCase().includes('tu') ||
          rawJabatan.toLowerCase().includes('administrasi') ||
          rawJabatan.toLowerCase().includes('tata usaha') ||
          rawJabatan.toLowerCase().includes('bendahara') ||
          rawJabatan.toLowerCase().includes('operator') ||
          rawJabatan.toLowerCase().includes('perpustakaan') ||
          rawJabatan.toLowerCase().includes('laboran')
        ) {
          detectedKategori = 'Tenaga Administrasi';
        } else if (
          rawKategori.toLowerCase().includes('pimpinan') ||
          rawJabatan.toLowerCase().includes('kepala sekolah')
        ) {
          detectedKategori = 'Pimpinan';
        }

        results.push({
          nama: rawNama,
          nip: rawNip,
          jabatan: rawJabatan,
          mataPelajaran: rawMapel,
          kategori: detectedKategori,
          fotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
          urutan: guruList.length + results.length + 1
        });
      }
    }
    return results;
  }, [rawText, guruList.length]);

  // Execute Bulk Save from Parsed Text
  const handleSaveBulkText = async () => {
    if (parsedBulkItems.length === 0) {
      alert('Tidak ada baris data yang valid untuk disimpan.');
      return;
    }

    try {
      setIsBulkSaving(true);
      const savedCount = await saveGuruBatch(parsedBulkItems);
      setFeedback(`Berhasil menambahkan ${savedCount} data guru dan tenaga administrasi sekaligus ke database!`);
      setBulkModalOpen(false);
      setRawText('');
      onRefresh();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      alert('Gagal menyimpan data massal: ' + err.message);
    } finally {
      setIsBulkSaving(false);
    }
  };

  // Execute Preset Batch Save (Esperowan standard package)
  const handleSavePresetBatch = async () => {
    if (!window.confirm('Muat paket lengkap 15 Dewan Guru & Tenaga Administrasi SMP Negeri 2 Wanadadi (Esperowan) ke Firestore sekaligus?')) {
      return;
    }

    try {
      setIsBulkSaving(true);
      const savedCount = await saveGuruBatch(PRESET_GURU_TENDIK);
      setFeedback(`Berhasil memasukkan paket lengkap ${savedCount} dewan guru & staf administrasi Esperowan!`);
      setBulkModalOpen(false);
      onRefresh();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      alert('Gagal memuat paket: ' + err.message);
    } finally {
      setIsBulkSaving(false);
    }
  };

  // Multi-row quick add save
  const handleSaveQuickRows = async () => {
    const validRows = quickRows.filter(r => r.nama.trim().length > 0);
    if (validRows.length === 0) {
      alert('Harap isi minimal satu nama guru / tenaga administrasi.');
      return;
    }

    try {
      setIsBulkSaving(true);
      const savedCount = await saveGuruBatch(validRows);
      setFeedback(`Berhasil menyimpan ${savedCount} data pendidik/staf Esperowan secara bersamaan!`);
      setBulkModalOpen(false);
      setQuickRows([
        { nama: '', nip: '', kategori: 'Guru', jabatan: 'Guru Mata Pelajaran', mataPelajaran: '' },
        { nama: '', nip: '', kategori: 'Guru', jabatan: 'Guru Mata Pelajaran', mataPelajaran: '' },
        { nama: '', nip: '', kategori: 'Tenaga Administrasi', jabatan: 'Staf Tata Usaha', mataPelajaran: 'Administrasi Umum' }
      ]);
      onRefresh();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setIsBulkSaving(false);
    }
  };

  // Open single add modal
  const openAddModal = () => {
    setEditingItem(null);
    setNama('');
    setNip('');
    setMataPelajaran('');
    setJabatan('Guru Mata Pelajaran');
    setKategori('Guru');
    setFotoUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80');
    setUrutan(guruList.length + 1);
    setModalOpen(true);
  };

  // Open single edit modal
  const openEditModal = (item: GuruItem) => {
    setEditingItem(item);
    setNama(item.nama);
    setNip(item.nip);
    setMataPelajaran(item.mataPelajaran);
    setJabatan(item.jabatan);
    setKategori(getKategoriString(item));
    setFotoUrl(item.fotoUrl);
    setUrutan(item.urutan ?? 10);
    setModalOpen(true);
  };

  // Single manual file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadSchoolImage(file, 'guru');
      setFotoUrl(url);
    } catch (err) {
      alert('Gagal mengunggah foto.');
    } finally {
      setIsUploading(false);
    }
  };

  // Single save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !mataPelajaran.trim()) {
      alert('Harap isi nama dan mata pelajaran / tugas.');
      return;
    }

    try {
      setIsSaving(true);
      await saveGuru({
        id: editingItem?.id,
        nama: nama.trim(),
        nip: nip.trim() || '-',
        jabatan: jabatan.trim(),
        mataPelajaran: mataPelajaran.trim(),
        kategori,
        fotoUrl: fotoUrl.trim() || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
        urutan: Number(urutan) || 10
      });
      setFeedback(`Data ${kategori.toLowerCase()} berhasil ${editingItem ? 'diperbarui' : 'ditambahkan'}!`);
      setModalOpen(false);
      onRefresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete single
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus data "${name}"?`)) return;

    try {
      await deleteGuru(id);
      setFeedback('Data pendidik/staf berhasil dihapus.');
      onRefresh();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Title and Batch Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#1F7A4D]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#14264B] dark:text-white font-heading">
                  Kelola Guru & Tenaga Administrasi
                </h2>
                <span className="text-xs font-bold text-[#1F7A4D] dark:text-[#F2B632] bg-[#EAF2EC] dark:bg-slate-800 px-2 py-0.5 rounded-full border border-[#D5E0D8] dark:border-slate-700">
                  Esperowan
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Portal Pendidik & Tenaga Administrasi SMP Negeri 2 Wanadadi.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Export CSV / Excel, Bulk Import, & Add Single */}
        <div className="flex flex-wrap items-center gap-2 relative">
          
          {/* Export Dropdown (Excel & CSV) */}
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-white dark:bg-[#132238] border-2 border-[#1F7A4D] text-[#1F7A4D] dark:text-emerald-300 hover:bg-[#EAF2EC] dark:hover:bg-emerald-950/40 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              title="Unduh data guru dan tenaga administrasi ke Excel / CSV"
            >
              <Download className="w-4 h-4 text-[#1F7A4D] dark:text-emerald-300" />
              <span>Ekspor Data</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {exportMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#132238] rounded-2xl shadow-xl border-2 border-[#D5E0D8] dark:border-[#23395B] py-2 z-30 space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  Pilih Format Unduhan:
                </div>
                {/* Excel Option: 100% Guaranteed separate columns */}
                <button
                  onClick={handleExportExcel}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#14264B] dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#1F7A4D]" />
                  <div>
                    <span className="font-bold block text-[#1F7A4D] dark:text-emerald-400">Microsoft Excel (.xls)</span>
                    <span className="text-[10px] text-slate-500">Otomatis terpisah per kolom & rapi</span>
                  </div>
                </button>
                {/* CSV with semicolon (Indonesian locale) */}
                <button
                  onClick={() => handleExportCSV(';')}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#14264B] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="block">CSV (Format Excel Titik-Koma ;)</span>
                    <span className="text-[10px] text-slate-500">Sesuai Windows Regional Indonesia</span>
                  </div>
                </button>
                {/* CSV with comma (International) */}
                <button
                  onClick={() => handleExportCSV(',')}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="block">CSV (Format Standar Koma ,)</span>
                    <span className="text-[10px] text-slate-500">Standar Google Sheets & Mac</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Bulk Import / Batch Add Button */}
          <button
            onClick={() => {
              setBulkModalOpen(true);
              setRawText('');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#F2B632] hover:bg-[#dfa527] text-[#14264B] text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            title="Tambah atau impor banyak data sekaligus tanpa membuat satu per satu"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#14264B]" />
            <span>Tambah Sekaligus / Impor</span>
          </button>

          {/* Single Add Button */}
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#F2B632]" />
            <span>Tambah Satuan</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{feedback}</span>
        </div>
      )}

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white dark:bg-[#132238] p-4 rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setCategoryFilter('Semua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'Semua'
                ? 'bg-[#14264B] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Semua ({counts.all})
          </button>
          <button
            onClick={() => setCategoryFilter('Guru')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'Guru'
                ? 'bg-[#1F7A4D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Dewan Guru ({counts.guru})
          </button>
          <button
            onClick={() => setCategoryFilter('Tenaga Administrasi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'Tenaga Administrasi'
                ? 'bg-[#1F7A4D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Tenaga Administrasi & TU ({counts.tendik})
          </button>
          <button
            onClick={() => setCategoryFilter('Pimpinan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              categoryFilter === 'Pimpinan'
                ? 'bg-[#1F7A4D] text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Pimpinan ({counts.pimpinan})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, NIP, mapel, atau jabatan..."
            className="w-full pl-9 pr-3 py-2 min-h-[40px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-xs text-[#14264B] dark:text-white focus:outline-none focus:border-[#1F7A4D]"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-[#132238] rounded-2xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#EAF2EC] dark:bg-[#0f1d39] text-[#14264B] dark:text-white text-xs uppercase font-heading border-b border-[#D5E0D8]">
            <tr>
              <th className="py-3.5 px-4 w-12 text-center">No</th>
              <th className="py-3.5 px-4">Nama Guru / Tenaga Administrasi</th>
              <th className="py-3.5 px-4">NIP / NUPTK</th>
              <th className="py-3.5 px-4">Jabatan</th>
              <th className="py-3.5 px-4">Mata Pelajaran / Tugas</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                  Tidak ada data guru atau tenaga administrasi yang cocok dengan pencarian / filter.
                </td>
              </tr>
            ) : (
              filteredList.map((item, index) => {
                const kat = getKategoriString(item);
                const isTendik = kat === 'Tenaga Administrasi';
                const isPim = kat === 'Pimpinan';

                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-xs text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.fotoUrl} 
                          alt={item.nama} 
                          className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs"
                        />
                        <div>
                          <strong className="font-heading text-sm text-[#14264B] dark:text-white block">
                            {item.nama}
                          </strong>
                          <span className="text-[11px] text-slate-400">Urutan: #{item.urutan ?? index + 1}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-500">
                      {item.nip || '-'}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {item.jabatan}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-400">
                      {item.mataPelajaran}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        isPim
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                          : isTendik 
                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}>
                        {kat}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 min-h-[38px] rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer"
                          title="Ubah Data"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.nama)}
                          className="p-2 min-h-[38px] rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {filteredList.length === 0 ? (
          <div className="bg-white dark:bg-[#132238] rounded-2xl p-6 text-center text-slate-400 text-xs border">
            Tidak ada data guru atau staf yang cocok.
          </div>
        ) : (
          filteredList.map((item) => {
            const kat = getKategoriString(item);
            const isTendik = kat === 'Tenaga Administrasi';
            const isPim = kat === 'Pimpinan';

            return (
              <div 
                key={item.id}
                className="bg-white dark:bg-[#132238] rounded-2xl p-4 border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img 
                    src={item.fotoUrl} 
                    alt={item.nama} 
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <span className={`text-[10px] font-bold uppercase inline-block px-2 py-0.5 rounded-full ${
                      isPim 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' 
                        : isTendik 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' 
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}>
                      {kat}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-[#14264B] dark:text-white truncate">
                      {item.nama}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">{item.jabatan}</p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">NIP: {item.nip}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-blue-600 hover:bg-blue-50 flex items-center justify-center cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.nama)}
                    className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================
          MODAL 1: BULK IMPORT & TAMBAH SEKALIGUS (Massal)
          ======================================================== */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-3xl w-full bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#14264B] dark:text-white">
                    Tambah / Impor Data Guru & Staf Sekaligus
                  </h3>
                  <p className="text-xs text-slate-500">
                    Masukkan banyak data guru dan tenaga administrasi Esperowan langsung tanpa membuat satu per satu.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setBulkModalOpen(false)} 
                className="p-2 min-h-[44px] min-w-[44px] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 overflow-x-auto">
              <button
                onClick={() => setBulkTab('paste')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  bulkTab === 'paste'
                    ? 'bg-[#1F7A4D] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Unggah File CSV / Tempel Spreadsheet
              </button>
              <button
                onClick={() => setBulkTab('multi')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  bulkTab === 'multi'
                    ? 'bg-[#1F7A4D] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Formulir Cepat Multi-Baris
              </button>
              <button
                onClick={() => setBulkTab('preset')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  bulkTab === 'preset'
                    ? 'bg-[#1F7A4D] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Paket Standar Esperowan (15 Orang)
              </button>
            </div>

            {/* TAB CONTENT 1: PASTE / UPLOAD CSV */}
            {bulkTab === 'paste' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#EAF2EC] dark:bg-emerald-950/30 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900">
                  <div className="text-xs text-[#1F7A4D] dark:text-emerald-300 space-y-0.5">
                    <p className="font-bold">Format Kolom: Nama Guru/Tendik, NIP, Jabatan, Mata Pelajaran, Kategori</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Bisa langsung salin (copy-paste) kolom tabel dari Microsoft Excel atau Google Sheets.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#132238] border border-[#1F7A4D] text-[#1F7A4D] dark:text-emerald-300 text-xs font-bold hover:bg-emerald-50 cursor-pointer shrink-0"
                    >
                      Unduh Template CSV
                    </button>
                    <label className="px-3 py-1.5 rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold cursor-pointer shrink-0">
                      Pilih File CSV
                      <input 
                        type="file" 
                        accept=".csv,text/csv,text/plain" 
                        className="hidden" 
                        onChange={handleCSVFileUpload}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tempel Isi Data CSV / Spreadsheet di Sini:
                  </label>
                  <textarea
                    rows={6}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Contoh:&#10;Drs. Wahyu Hidayat; 19780101 200501 1 002; Guru Mata Pelajaran; IPA; Guru&#10;Endang Retnowati S.Pd.; 19850204 200901 2 005; Guru Mata Pelajaran; Bahasa Jawa; Guru&#10;Sunardi; -; Staf Tata Usaha; Administrasi Kepegawaian; Tenaga Administrasi"
                    className="w-full p-3 font-mono text-xs rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-[#14264B] dark:text-white focus:outline-none focus:border-[#1F7A4D]"
                  />
                </div>

                {/* Parsed Preview Table */}
                {parsedBulkItems.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#14264B] dark:text-white">
                      <span>Pratinjau Data Terbaca ({parsedBulkItems.length} orang siap diimpor):</span>
                    </div>
                    <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 sticky top-0">
                          <tr>
                            <th className="p-2">Nama</th>
                            <th className="p-2">NIP</th>
                            <th className="p-2">Jabatan</th>
                            <th className="p-2">Mapel / Tugas</th>
                            <th className="p-2">Kategori</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {parsedBulkItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td className="p-2 font-medium">{item.nama}</td>
                              <td className="p-2 font-mono text-slate-500">{item.nip}</td>
                              <td className="p-2">{item.jabatan}</td>
                              <td className="p-2">{item.mataPelajaran}</td>
                              <td className="p-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  item.kategori === 'Tenaga Administrasi'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {item.kategori}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setBulkModalOpen(false)}
                    className="px-4 py-2 min-h-[44px] rounded-xl border text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={isBulkSaving || parsedBulkItems.length === 0}
                    onClick={handleSaveBulkText}
                    className="px-6 py-2 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                  >
                    {isBulkSaving ? 'Menyimpan...' : `Simpan ${parsedBulkItems.length} Data Sekaligus`}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: MULTI-ROW QUICK FORM */}
            {bulkTab === 'multi' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  Isi beberapa data pendidik dan staf sekaligus dalam baris-baris di bawah ini:
                </p>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {quickRows.map((row, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#14264B] dark:text-white">
                          Orang #{index + 1}
                        </span>
                        {quickRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setQuickRows(quickRows.filter((_, i) => i !== index))}
                            className="text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
                          >
                            Hapus Baris
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={row.nama}
                          onChange={(e) => {
                            const updated = [...quickRows];
                            updated[index].nama = e.target.value;
                            setQuickRows(updated);
                          }}
                          placeholder="Nama Lengkap & Gelar *"
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium"
                        />
                        <input
                          type="text"
                          value={row.nip}
                          onChange={(e) => {
                            const updated = [...quickRows];
                            updated[index].nip = e.target.value;
                            setQuickRows(updated);
                          }}
                          placeholder="NIP / NUPTK"
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono"
                        />
                        <select
                          value={row.kategori}
                          onChange={(e) => {
                            const updated = [...quickRows];
                            const kat = e.target.value as any;
                            updated[index].kategori = kat;
                            if (kat === 'Tenaga Administrasi') {
                              updated[index].jabatan = 'Staf Tata Usaha';
                              updated[index].mataPelajaran = 'Administrasi Sekolah';
                            } else {
                              updated[index].jabatan = 'Guru Mata Pelajaran';
                            }
                            setQuickRows(updated);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                        >
                          <option value="Guru">Guru Mata Pelajaran</option>
                          <option value="Tenaga Administrasi">Tenaga Administrasi / TU</option>
                          <option value="Pimpinan">Pimpinan</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={row.jabatan}
                          onChange={(e) => {
                            const updated = [...quickRows];
                            updated[index].jabatan = e.target.value;
                            setQuickRows(updated);
                          }}
                          placeholder="Jabatan (cth: Guru Mapel / Kepala TU)"
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                        <input
                          type="text"
                          value={row.mataPelajaran}
                          onChange={(e) => {
                            const updated = [...quickRows];
                            updated[index].mataPelajaran = e.target.value;
                            setQuickRows(updated);
                          }}
                          placeholder="Mata Pelajaran / Tugas Pokok"
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setQuickRows([
                    ...quickRows,
                    { nama: '', nip: '', kategori: 'Guru', jabatan: 'Guru Mata Pelajaran', mataPelajaran: '' }
                  ])}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[#1F7A4D] text-[#1F7A4D] dark:text-emerald-300 text-xs font-bold hover:bg-emerald-50 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Baris Baru</span>
                </button>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setBulkModalOpen(false)}
                    className="px-4 py-2 min-h-[44px] rounded-xl border text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={isBulkSaving}
                    onClick={handleSaveQuickRows}
                    className="px-6 py-2 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                  >
                    {isBulkSaving ? 'Menyimpan...' : 'Simpan Semua Baris ke Database'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: PRESET LENGKAP ESPEROWAN */}
            {bulkTab === 'preset' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Paket Komplit Dewan Guru & Tenaga Administrasi Esperowan</span>
                  </div>
                  <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                    Memuat seluruh data 15 dewan guru mata pelajaran dan tenaga administrasi lengkap SMP Negeri 2 Wanadadi (Esperowan) sekaligus ke Firestore tanpa perlu Anda ketik satu per satu!
                  </p>
                </div>

                <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 sticky top-0">
                      <tr>
                        <th className="p-2">No</th>
                        <th className="p-2">Nama & Gelar</th>
                        <th className="p-2">NIP</th>
                        <th className="p-2">Jabatan</th>
                        <th className="p-2">Kategori</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {PRESET_GURU_TENDIK.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-2 text-slate-400 font-mono">{idx + 1}</td>
                          <td className="p-2 font-medium">{item.nama}</td>
                          <td className="p-2 font-mono text-slate-500">{item.nip}</td>
                          <td className="p-2 text-slate-600 dark:text-slate-300">
                            {item.jabatan}
                          </td>
                          <td className="p-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.kategori === 'Tenaga Administrasi'
                                ? 'bg-blue-100 text-blue-800'
                                : item.kategori === 'Pimpinan'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {item.kategori}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setBulkModalOpen(false)}
                    className="px-4 py-2 min-h-[44px] rounded-xl border text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={isBulkSaving}
                    onClick={handleSavePresetBatch}
                    className="px-6 py-2 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isBulkSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-[#F2B632]" />
                    )}
                    <span>{isBulkSaving ? 'Sedang Memasukkan...' : 'Masukkan 15 Data Sekaligus ke Firestore'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: SINGLE ADD / EDIT MODAL
          ======================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white dark:bg-[#132238] rounded-3xl border-2 border-[#D5E0D8] dark:border-[#23395B] shadow-2xl p-6 sm:p-8 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-heading font-bold text-xl text-[#14264B] dark:text-white">
                {editingItem ? 'Ubah Data Pendidik / Staf' : 'Tambah Data Pendidik / Staf'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-2 min-h-[44px] min-w-[44px] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap beserta Gelar <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Dra. Hj. Siti Aminah, M.Pd."
                  className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm"
                />
              </div>

              {/* Kategori Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kategori Tugas <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setKategori('Guru');
                      if (jabatan === 'Staf Tata Usaha') setJabatan('Guru Mata Pelajaran');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      kategori === 'Guru'
                        ? 'bg-[#1F7A4D] text-white border-[#1F7A4D]'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    Dewan Guru
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setKategori('Tenaga Administrasi');
                      if (jabatan === 'Guru Mata Pelajaran') setJabatan('Staf Tata Usaha');
                      if (!mataPelajaran) setMataPelajaran('Administrasi Sekolah');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      kategori === 'Tenaga Administrasi'
                        ? 'bg-[#1F7A4D] text-white border-[#1F7A4D]'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    Tenaga Administrasi / TU
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setKategori('Pimpinan');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      kategori === 'Pimpinan'
                        ? 'bg-[#1F7A4D] text-white border-[#1F7A4D]'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    Pimpinan Sekolah
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    NIP / NUPTK
                  </label>
                  <input
                    type="text"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="19800101... atau -"
                    className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Urutan Tampilan
                  </label>
                  <input
                    type="number"
                    value={urutan}
                    onChange={(e) => setUrutan(Number(e.target.value))}
                    className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Jabatan / Posisi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    placeholder={kategori === 'Tenaga Administrasi' ? 'Contoh: Kepala Tata Usaha' : 'Contoh: Guru Mata Pelajaran'}
                    className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {kategori === 'Tenaga Administrasi' ? 'Bidang Administrasi / Tugas' : 'Mata Pelajaran'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={mataPelajaran}
                    onChange={(e) => setMataPelajaran(e.target.value)}
                    placeholder={kategori === 'Tenaga Administrasi' ? 'Contoh: Administrasi Kepegawaian & TU' : 'Contoh: Bahasa Indonesia'}
                    className="w-full px-3.5 py-2 min-h-[44px] rounded-xl bg-[#FBFCFA] dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 text-sm"
                  />
                </div>
              </div>

              {/* Foto Guru & Tenaga Kependidikan */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[#D5E0D8] dark:border-slate-700 space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Foto Resmi {kategori}
                </label>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#1F7A4D] bg-white dark:bg-slate-800 shadow-sm shrink-0 flex items-center justify-center">
                    {fotoUrl ? (
                      <img 
                        src={fotoUrl} 
                        alt="Pratinjau" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <Camera className="w-6 h-6 text-slate-400" />
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] text-white font-bold">
                        Unggah...
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold cursor-pointer shadow-sm transition-all active:scale-95">
                      <Upload className="w-4 h-4 text-[#F2B632]" />
                      <span>{isUploading ? 'Sedang Mengunggah...' : 'Pilih Foto dari Komputer / HP'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileUpload} 
                        disabled={isUploading}
                      />
                    </label>
                    <span className="text-[11px] text-slate-500 block">
                      Format JPG, PNG, atau WEBP.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">
                    Atau tempel tautan (URL) foto:
                  </label>
                  <input
                    type="text"
                    value={fotoUrl}
                    onChange={(e) => setFotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#D5E0D8] dark:border-slate-700 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 min-h-[44px] rounded-xl border text-xs font-bold text-slate-600 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 min-h-[44px] rounded-xl bg-[#1F7A4D] hover:bg-[#16623D] text-white text-xs font-bold cursor-pointer"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
