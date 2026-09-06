/* =========================================================================
   DATA KABUPATEN PADANG LAWAS
   Seluruh angka dikutip dari sumber yang tercantum di bagian akhir file ini.
   ========================================================================= */

export interface SumberRef {
  id: number;
  label: string;
  penerbit: string;
  tanggal: string;
  url: string;
}

export const SUMBER: SumberRef[] = [
  {
    id: 1,
    label: "Tabel Statistik — Jumlah Penduduk menurut Kecamatan dan Jenis Kelamin (Jiwa), 2023",
    penerbit: "BPS Kabupaten Padang Lawas",
    tanggal: "Diperbarui 1 Maret 2024",
    url: "https://padanglawaskab.bps.go.id/id/statistics-table/2/MjkjMg==/jumlah-penduduk-menurut-kecamatan-dan-jenis-kelamin.html",
  },
  {
    id: 2,
    label: "BRS No. 02/09/1221/Th.XVIII — Profil Kemiskinan di Kabupaten Padang Lawas Maret 2025",
    penerbit: "BPS Kabupaten Padang Lawas",
    tanggal: "30 September 2025",
    url: "https://padanglawaskab.bps.go.id/pressrelease/2025/09/30/121/profil-kemiskinan-di-kabupaten-padang-lawas-maret-2025.html",
  },
  {
    id: 3,
    label: "Berita Resmi Statistik — Profil Kemiskinan di Kabupaten Padang Lawas Maret 2024",
    penerbit: "BPS Kabupaten Padang Lawas",
    tanggal: "13 Agustus 2024",
    url: "https://padanglawaskab.bps.go.id/pressrelease/2024/08/13/118/profil-kemiskinan-di-kabupaten-padang-lawas-maret-2024.html",
  },
  {
    id: 4,
    label: "Persentase Penduduk Miskin Kabupaten Padang Lawas sebesar 8,28 Persen (Maret 2018–2019)",
    penerbit: "BPS Kabupaten Padang Lawas",
    tanggal: "21 Januari 2020",
    url: "https://padanglawaskab.bps.go.id/id/pressrelease/2020/01/21/64/persentase-penduduk-miskin-kabupaten-padang-lawas-sebesar-8-28-persen.html",
  },
  {
    id: 5,
    label: "Tabel — Persentase Penduduk Miskin (P0) Menurut Kabupaten/Kota",
    penerbit: "BPS Republik Indonesia",
    tanggal: "Diakses 2026",
    url: "https://www.bps.go.id/id/statistics-table/2/NjIxIzI=/persentase-penduduk-miskin-menurut-kabupaten-kota.html",
  },
  {
    id: 6,
    label: "BRS — Persentase Penduduk Miskin Maret 2025 Turun Menjadi 8,47 Persen",
    penerbit: "BPS Republik Indonesia",
    tanggal: "25 Juli 2025",
    url: "https://www.bps.go.id/id/pressrelease/2025/07/25/2518/persentase-penduduk-miskin-maret-2025-turun-menjadi-8-47-persen-.html",
  },
  {
    id: 7,
    label: "Profil Kemiskinan Provinsi Sumatera Utara Maret 2025",
    penerbit: "BPS Provinsi Sumatera Utara",
    tanggal: "2025",
    url: "https://sumut.bps.go.id/id/pressrelease",
  },
  {
    id: 8,
    label: "Artikel — Kabupaten Padang Lawas",
    penerbit: "Wikipedia bahasa Indonesia",
    tanggal: "Diakses 2026",
    url: "https://id.wikipedia.org/wiki/Kabupaten_Padang_Lawas",
  },
  {
    id: 9,
    label: "Data BPS 2022, Angka Kemiskinan di Kabupaten Palas Menurun (deret 2019–2022, P1 & P2)",
    penerbit: "GoSumut.com, mengutip BPS Kab. Padang Lawas",
    tanggal: "17 Januari 2023",
    url: "https://www.gosumut.com/berita/baca/2023/01/17/data-bps-2022-angka-kemiskinan-di-kabupaten-palas-menurun",
  },
  {
    id: 10,
    label: "Pemimpin Palas Akan Berhadapan Dengan Persoalan Kemiskinan (indeks P1 tahun 2024)",
    penerbit: "Harian Waspada",
    tanggal: "2025",
    url: "https://www.waspada.id/artikel/pemimpin-palas-akan-berhadapan-dengan-persoalan-kemiskinan",
  },
  {
    id: 11,
    label: "Pemkab Padang Lawas Rayakan HUT ke-19, Bupati Ajak Perkuat Kolaborasi untuk Percepatan Pembangunan",
    penerbit: "Sumut Pos (Jawa Pos Group)",
    tanggal: "Agustus 2026",
    url: "https://sumutpos.jawapos.com/sumatera-utara/2607170047/pemkab-padang-lawas-rayakan-hut-ke-19-bupati-putra-mahkota-alam-ajak-seluruh-elemen-perkuat-kolaborasi-untuk-percepatan-pembangunan",
  },
  {
    id: 12,
    label: "Visualisasi Data Kependudukan — Jumlah Penduduk 31 Desember 2024: 280.764 jiwa",
    penerbit: "Ditjen Dukcapil Kemendagri (dikutip via Wikipedia)",
    tanggal: "2024",
    url: "https://gis.dukcapil.kemendagri.go.id/peta/",
  },
  {
    id: 13,
    label: "Postur APBD Kabupaten Padang Lawas Tahun 2024",
    penerbit: "DJPK Kementerian Keuangan RI (dikutip via Wikipedia)",
    tanggal: "2024",
    url: "https://djpk.kemenkeu.go.id/portal/data/apbd",
  },
  {
    id: 14,
    label: "Profil Kemiskinan di Mandailing Natal Maret 2025 — GK Padang Lawas terendah di Sumatera Utara",
    penerbit: "BPS Kabupaten Mandailing Natal",
    tanggal: "2025",
    url: "https://mandailingnatalkab.bps.go.id/id/pressrelease",
  },
];

/* ------------------------- Kemiskinan (P0, %) ------------------------- */
/* Sumber: [2][3][4][5][9] — hasil Susenas Maret setiap tahunnya.          */
export interface P0Point {
  tahun: number;
  p0: number; // persen
}
export const P0_SERIES: P0Point[] = [
  { tahun: 2018, p0: 8.41 },
  { tahun: 2019, p0: 8.28 },
  { tahun: 2020, p0: 8.37 },
  { tahun: 2021, p0: 8.69 },
  { tahun: 2022, p0: 8.05 },
  { tahun: 2023, p0: 7.89 },
  { tahun: 2024, p0: 7.87 },
  { tahun: 2025, p0: 7.32 },
];

/* -------------- Jumlah penduduk miskin (ribu jiwa) --------------------- */
/* Sumber: [2][3][9]. Nilai 2023 diturunkan dari rilis resmi [3]:           */
/* "24,96 ribu, naik 0,51 ribu dalam satu tahun terakhir".                  */
export interface MiskinPoint {
  tahun: number;
  ribu: number;
  catatan?: string;
}
export const MISKIN_SERIES: MiskinPoint[] = [
  { tahun: 2019, ribu: 23.17 },
  { tahun: 2020, ribu: 23.87 },
  { tahun: 2021, ribu: 25.78 },
  { tahun: 2022, ribu: 24.45 },
  { tahun: 2023, ribu: 24.45, catatan: "hasil pengurangan rilis resmi 2024 (24,96 − 0,51 ribu)" },
  { tahun: 2024, ribu: 24.96 },
  { tahun: 2025, ribu: 23.69 },
];

/* ---------------- Indeks kedalaman & keparahan ------------------------- */
export interface IndeksPoint {
  tahun: number;
  p1: number | null;
  p2: number | null;
}
export const INDEKS_SERIES: IndeksPoint[] = [
  { tahun: 2021, p1: 1.33, p2: 0.34 },
  { tahun: 2022, p1: 0.93, p2: 0.17 },
  { tahun: 2024, p1: 1.12, p2: null },
  { tahun: 2025, p1: 0.75, p2: 0.14 },
];

/* ---------------------- Garis kemiskinan (GK) -------------------------- */
export const GK_SERIES = [
  { tahun: 2024, rp: 483395 },
  { tahun: 2025, rp: 499761 },
];

/* --------------------- Perbandingan Maret 2025 ------------------------- */
export interface BandingRow {
  wilayah: string;
  p0: number;
  miskin: string;
  gk: number | null;
  refs: number[];
  utama?: boolean;
}
export const PERBANDINGAN_2025: BandingRow[] = [
  { wilayah: "Kab. Padang Lawas", p0: 7.32, miskin: "23,69 ribu jiwa", gk: 499761, refs: [2], utama: true },
  { wilayah: "Provinsi Sumatera Utara", p0: 7.36, miskin: "±1,14 juta jiwa", gk: 666546, refs: [7] },
  { wilayah: "Indonesia", p0: 8.47, miskin: "23,85 juta jiwa", gk: null, refs: [6] },
];

/* ---------- Jumlah penduduk menurut kecamatan & jenis kelamin ---------- */
/* Sumber: [1] — Tabel Statistik BPS Kab. Padang Lawas, data 2023,          */
/* terakhir diperbarui 1 Maret 2024. Kode wilayah Kemendagri via [8].       */
export interface KecamatanRow {
  kode: string;
  nama: string;
  laki: number;
  perempuan: number;
  desa: number;
  kelurahan: number;
}
export const KECAMATAN: KecamatanRow[] = [
  { kode: "12.21.01", nama: "Sosopan", laki: 5467, perempuan: 5410, desa: 22, kelurahan: 0 },
  { kode: "12.21.02", nama: "Barumun Tengah", laki: 8442, perempuan: 8446, desa: 29, kelurahan: 0 },
  { kode: "12.21.03", nama: "Huristak", laki: 9665, perempuan: 9362, desa: 27, kelurahan: 0 },
  { kode: "12.21.04", nama: "Lubuk Barumun", laki: 10898, perempuan: 10615, desa: 24, kelurahan: 0 },
  { kode: "12.21.05", nama: "Huta Raja Tinggi", laki: 20702, perempuan: 20221, desa: 26, kelurahan: 0 },
  { kode: "12.21.06", nama: "Ulu Barumun", laki: 8898, perempuan: 8851, desa: 15, kelurahan: 0 },
  { kode: "12.21.07", nama: "Barumun", laki: 21805, perempuan: 21876, desa: 16, kelurahan: 1 },
  { kode: "12.21.08", nama: "Sosa", laki: 10527, perempuan: 10545, desa: 16, kelurahan: 0 },
  { kode: "12.21.09", nama: "Batang Lubu Sutam", laki: 4167, perempuan: 4197, desa: 20, kelurahan: 0 },
  { kode: "12.21.10", nama: "Barumun Selatan", laki: 4254, perempuan: 4163, desa: 11, kelurahan: 0 },
  { kode: "12.21.11", nama: "Aek Nabara Barumun", laki: 7042, perempuan: 6993, desa: 25, kelurahan: 0 },
  { kode: "12.21.12", nama: "Sihapas Barumun", laki: 3046, perempuan: 3071, desa: 13, kelurahan: 0 },
  { kode: "12.21.13", nama: "Barumun Baru", laki: 6539, perempuan: 6556, desa: 13, kelurahan: 0 },
  { kode: "12.21.14", nama: "Ulu Sosa", laki: 4708, perempuan: 4762, desa: 11, kelurahan: 0 },
  { kode: "12.21.15", nama: "Sosa Julu", laki: 5535, perempuan: 5565, desa: 12, kelurahan: 0 },
  { kode: "12.21.16", nama: "Barumun Barat", laki: 2269, perempuan: 2255, desa: 10, kelurahan: 0 },
  { kode: "12.21.17", nama: "Sosa Timur", laki: 4542, perempuan: 4254, desa: 13, kelurahan: 0 },
];
export const TOTAL_KEC = { laki: 138506, perempuan: 137142, jumlah: 275648 };

/* --------------------------- Profil daerah ----------------------------- */
/* Sumber utama: [8] Wikipedia (mengutip UU 38/2007, Dukcapil, DJPK, dll.)  */
export const PROFIL = {
  nama: "Kabupaten Padang Lawas",
  singkatan: "Palas",
  provinsi: "Sumatera Utara",
  ibuKota: "Sibuhuan",
  berdiri: "10 Agustus 2007",
  dasarHukum: "UU No. 38 Tahun 2007",
  asalPemekaran: "Kabupaten Tapanuli Selatan",
  luasKm2: 3912.18,
  ketinggian: "915 m dpl",
  suhu: "14–36 °C",
  koordinat: "1°07′34″N 99°48′48″E",
  kodeBps: "1221",
  kodeKemendagri: "12.21",
  plat: "BB",
  zonaWaktu: "WIB (UTC+7)",
  situs: "padanglawaskab.go.id",
  jumlahKecamatan: 17,
  jumlahDesa: 303,
  jumlahKelurahan: 1,
  pendudukDukcapil2024: 280764,
  kepadatan: 72, // jiwa per km2
  ipm2025: 73.9,
  ipmKategori: "Tinggi",
  bupati: "Putra Mahkota Alam Hasibuan, S.E.",
  wakilBupati: "H. Achmad Fauzan Nasution, S.H.I., M.Pd.I.",
  ketuaDprd: "Luat Hasibuan",
  sekda: "Arpan Nasution",
  apbd2024: 1128120000000,
  pad2024: 47500000000,
  dau2024: 528309409000,
  dak2024: 212723147000,
  etnis: [
    { nama: "Batak (Angkola, Mandailing, Toba)", pct: 89 },
    { nama: "Jawa", pct: 7 },
    { nama: "Lainnya (Melayu, Minang, Aceh, Nias)", pct: 4 },
  ],
  agama: [
    { nama: "Islam", pct: 98.15 },
    { nama: "Protestan", pct: 1.83 },
    { nama: "Katolik", pct: 0.02 },
    { nama: "Lainnya", pct: 0.01 },
  ],
  warisan: [
    { nama: "Candi Sipamutung", lokasi: "Desa Siparau, Kec. Barumun Tengah" },
    { nama: "Candi Tandihat", lokasi: "Desa Tandihat, Kec. Barumun Tengah" },
    { nama: "Candi Sisangkilon", lokasi: "Desa Sangkilon, Kec. Lubuk Barumun" },
    { nama: "Pemandian Aek Siraisan", lokasi: "Desa Siraisan, Kec. Ulu Barumun" },
    { nama: "Pemandian Aek Milas", lokasi: "Desa Paringgonan, Kec. Ulu Barumun" },
    { nama: "Danau Gayambang", lokasi: "Desa Ujung Batu, Kec. Sosa" },
    { nama: "Gua Liang Namuap", lokasi: "Desa Parapat, Kec. Ulu Sosa" },
    { nama: "Pemandian Aek Hapung", lokasi: "Desa Hapung, Kec. Ulu Sosa" },
  ],
};

/* ---------------------- Perkembangan terkini --------------------------- */
export interface TerkiniItem {
  tanggal: string;
  judul: string;
  isi: string;
  refs: number[];
}
export const TERKINI: TerkiniItem[] = [
  {
    tanggal: "20 Feb 2025",
    judul: "Kepala daerah baru dilantik",
    isi: "Putra Mahkota Alam Hasibuan dilantik sebagai Bupati Padang Lawas periode 2025–2030 bersama Wakil Bupati Achmad Fauzan Nasution.",
    refs: [8],
  },
  {
    tanggal: "Mar 2025",
    judul: "Kemiskinan turun ke titik terendah periode 2018–2025",
    isi: "Hasil Susenas Maret 2025: P0 turun menjadi 7,32% (−0,55 poin) dan penduduk miskin berkurang 1,27 ribu menjadi 23,69 ribu jiwa. Garis kemiskinan Padang Lawas tercatat terendah di Sumatera Utara.",
    refs: [2, 14],
  },
  {
    tanggal: "2025",
    judul: "IPM naik ke kategori Tinggi",
    isi: "Indeks Pembangunan Manusia Kabupaten Padang Lawas tercatat 73,90 pada 2025 dan masuk kategori “tinggi” menurut BPS Sumatera Utara.",
    refs: [8],
  },
  {
    tanggal: "30 Apr 2025",
    judul: "Musrenbang RKPD Tahun Anggaran 2026",
    isi: "Bupati memimpin Musyawarah Perencanaan Pembangunan (Musrenbang) RKPD Kabupaten Padang Lawas Tahun Anggaran 2026.",
    refs: [8],
  },
  {
    tanggal: "10 Agu 2026",
    judul: "HUT ke-19 Kabupaten Padang Lawas",
    isi: "Pemkab merayakan HUT ke-19; bupati mengajak seluruh elemen memperkuat kolaborasi untuk percepatan pembangunan daerah.",
    refs: [11],
  },
];

/* ------------------------- Format helper ------------------------------- */
export const fmtInt = new Intl.NumberFormat("id-ID");
export const fmt1 = new Intl.NumberFormat("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const fmt2 = new Intl.NumberFormat("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function fmtRupiah(n: number): string {
  return "Rp" + fmtInt.format(n);
}

export function aksesHariIni(): string {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
}
