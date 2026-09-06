import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SUMBER,
  PROFIL,
  TERKINI,
  TOTAL_KEC,
  fmtInt,
  fmt2,
  aksesHariIni,
} from "./data";
import {
  Reveal,
  CountUp,
  SectionHead,
  Ref,
  RefRow,
  CornerFrame,
  IconTrendDown,
  IconTrendUp,
  IconWarga,
  IconGaris,
  IconKedalaman,
  IconCandi,
  IconPeta,
  IconArsip,
  IconTautan,
} from "./lib/ui";
import { TrendChart, IndeksPanel, GarisKemiskinanCard, ComparisonBars, Sparkline } from "./components/Charts";
import { KecamatanSection } from "./components/Kecamatan";

const NAV = [
  { id: "tren", label: "Tren" },
  { id: "posisi", label: "Posisi 2025" },
  { id: "kecamatan", label: "Kecamatan" },
  { id: "profil", label: "Profil" },
  { id: "terkini", label: "Terkini" },
  { id: "sumber", label: "Sumber" },
];

const TICKER = [
  "P0 MARET 2025 · 7,32%",
  "PENDUDUK MISKIN · 23,69 RIBU JIWA",
  "GARIS KEMISKINAN · RP499.761/KAPITA/BLN",
  "PENDUDUK 2024 · 280.764 JIWA",
  "LUAS · 3.912,18 KM²",
  "17 KECAMATAN · 303 DESA · 1 KELURAHAN",
  "IPM 2025 · 73,90 (TINGGI)",
  "DIBENTUK · 10 AGUSTUS 2007",
  "IBU KOTA · SIBUHUAN",
];

export default function App() {
  const [active, setActive] = useState("tren");

  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const onScroll = () => {
      const pos = window.scrollY + 160;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-body overflow-x-clip">
      {/* ============================ NAVBAR ============================ */}
      <header className="sticky top-0 z-50 bg-pinedeep/95 backdrop-blur-sm border-b border-pineline text-paper">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-14 flex items-center gap-4">
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <span className="w-8 h-8 rounded-[7px] bg-gold flex items-center justify-center text-pinedeep transition-transform duration-300 group-hover:-rotate-6">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M4 14l3.5-5 3 2.5L16 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="16" cy="5" r="1.7" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display font-bold text-lg tracking-wide leading-none">
                PALAS<span className="text-gold">·</span>DALAM<span className="text-gold">·</span>ANGKA
              </span>
            </a>
            <nav className="ml-auto hidden md:flex items-center gap-1">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className={`relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] rounded transition-colors duration-200 ${
                    active === n.id ? "text-gold" : "text-paper/65 hover:text-paper"
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-[13px] h-[2px] bg-gold transition-transform duration-300 origin-left ${
                      active === n.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              ))}
            </nav>
            <span className="ml-auto md:ml-2 font-mono text-[10px] tracking-widest text-gold/80 border border-gold/30 rounded px-2 py-1 hidden sm:inline-block">
              BPS 1221
            </span>
          </div>
          <nav className="md:hidden flex gap-1 pb-2 overflow-x-auto slim-scroll -mx-1 px-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`shrink-0 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider rounded-full border transition-colors ${
                  active === n.id ? "bg-gold text-pinedeep border-gold" : "border-paper/20 text-paper/70"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ============================ MASTHEAD ============================ */}
      <div className="contour-dark text-paper relative">
        <span
          aria-hidden
          className="hidden lg:block absolute right-5 top-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.5em] text-paper/25 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Kode BPS 1221 — Provinsi Sumatera Utara
        </span>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Reveal y={14}>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase bg-gold text-pinedeep font-semibold rounded px-2.5 py-1">
                Rilis resmi BPS · 30 September 2025
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-paper/60 border border-paper/20 rounded px-2.5 py-1">
                Susenas Maret 2025 · No. 02/09/1221/Th.XVIII
              </span>
            </div>
          </Reveal>

          <div className="mt-7 grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            {/* kiri: judul + angka besar */}
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <h1 className="font-display font-bold leading-[0.88] text-[52px] sm:text-[84px]">
                  PADANG LAWAS
                  <br />
                  <span className="text-gold">DALAM ANGKA</span>
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-xl text-sm sm:text-[15px] text-paper/70 leading-relaxed">
                  Pantauan kemiskinan &amp; kependudukan Kabupaten Padang Lawas, Sumatera Utara — disusun dari tabel
                  statistik dan berita resmi statistik BPS yang tercantum pada laman sumber. <Ref n={1} dark /><Ref n={2} dark />
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-8 flex items-end gap-5 flex-wrap">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/55">
                      Persentase penduduk miskin (P0) · Maret 2025
                    </p>
                    <p className="font-display font-bold text-[96px] sm:text-[138px] leading-[0.85] text-paper">
                      <CountUp value={7.32} decimals={2} />
                      <span className="text-gold text-[0.55em]">%</span>
                    </p>
                  </div>
                  <div className="pb-3 sm:pb-5 space-y-2.5">
                    <span className="flex items-center gap-1.5 bg-gold/15 border border-gold/35 text-goldsoft rounded-md px-3 py-1.5 font-mono text-xs num">
                      <IconTrendDown className="w-3.5 h-3.5" /> 0,55 poin dari 2024 (7,87%)
                    </span>
                    <span className="flex items-center gap-1.5 text-paper/60 font-mono text-[11px] num">
                      titik terendah deret 2018–2025 <Ref n={2} dark />
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-6 max-w-xl">
                  <div className="flex justify-between font-mono text-[10.5px] text-paper/45 mb-1.5">
                    <span>2018 · 8,41%</span>
                    <span className="text-gold">Maret 2025 · 7,32%</span>
                  </div>
                  <Sparkline />
                </div>
              </Reveal>
            </div>

            {/* kanan: panel indikator */}
            <div className="lg:col-span-5">
              <Reveal delay={0.25}>
                <CornerFrame className="bg-pine/60 border border-pineline rounded-lg p-5 sm:p-6">
                  <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-gold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full blink" /> Indikator kemiskinan 2025
                  </p>
                  <div className="grid grid-cols-2 gap-px bg-pineline rounded-md overflow-hidden">
                    <MastheadCell
                      ikon={<IconWarga className="w-5 h-5" />}
                      label="Penduduk miskin"
                      value="23,69"
                      suffix="ribu"
                      delta="▼ 1,27 ribu dlm setahun"
                      good
                      refN={2}
                    />
                    <MastheadCell
                      ikon={<IconGaris className="w-5 h-5" />}
                      label="Garis kemiskinan"
                      value="Rp499.761"
                      suffix="/kap/bln"
                      delta="▲ 3,39% dari 2024"
                      refN={2}
                    />
                    <MastheadCell
                      ikon={<IconKedalaman className="w-5 h-5" />}
                      label="Kedalaman (P1)"
                      value="0,75"
                      suffix="poin"
                      delta="▼ 0,37 dari 2024"
                      good
                      refN={2}
                    />
                    <MastheadCell
                      ikon={<IconKedalaman className="w-5 h-5" />}
                      label="Keparahan (P2)"
                      value="0,14"
                      suffix="poin"
                      delta="▼ 0,03 dari 2022"
                      good
                      refN={2}
                    />
                  </div>
                  <div className="mt-5 pt-4 border-t border-pineline flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-paper/65 num">
                    <span>Penduduk 2024 · <b className="text-paper">{fmtInt.format(PROFIL.pendudukDukcapil2024)}</b></span>
                    <span>Luas · <b className="text-paper">3.912,18 km²</b></span>
                    <span>IPM 2025 · <b className="text-gold">73,90</b> tinggi</span>
                  </div>
                </CornerFrame>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ============================= TICKER ============================= */}
      <div className="bg-gold text-pinedeep border-y-2 border-pinedeep overflow-hidden py-2 select-none" aria-hidden>
        <div className="animate-marquee flex whitespace-nowrap w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {TICKER.map((t, i) => (
                <span key={i} className="flex items-center font-mono text-[12px] font-semibold tracking-[0.08em] px-5">
                  {t}
                  <svg viewBox="0 0 8 8" className="w-2 h-2 ml-10 text-pinedeep/60">
                    <path d="M4 0l4 4-4 4-4-4z" fill="currentColor" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main>
        {/* ============================ 01 TREN ============================ */}
        <section id="tren" className="py-16 sm:py-24 grid-faint">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHead
              nomor="01"
              kicker="Kemiskinan 2018–2025"
              judul="Tren yang Menukik Turun"
              desc="Setelah memuncak pada 8,69% di 2021, persentase penduduk miskin Padang Lawas turun empat tahun beruntun menjadi 7,32% pada Maret 2025."
              refs={[2, 4, 9]}
            />
            <div className="mt-10 grid lg:grid-cols-3 gap-5">
              <Reveal className="lg:col-span-2">
                <div className="bg-card border border-ink/10 rounded-lg p-5 sm:p-7 shadow-sm h-full">
                  <TrendChart />
                </div>
              </Reveal>
              <div className="space-y-5">
                <Reveal delay={0.1}>
                  <div className="bg-card border border-ink/10 rounded-lg p-5 sm:p-6 shadow-sm">
                    <p className="font-display font-bold text-xl sm:text-2xl mb-4">Kedalaman &amp; Keparahan</p>
                    <IndeksPanel />
                  </div>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="bg-card border border-ink/10 rounded-lg p-5 sm:p-6 shadow-sm">
                    <p className="font-display font-bold text-xl sm:text-2xl mb-4">Garis Kemiskinan</p>
                    <GarisKemiskinanCard />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ========================== 02 POSISI ========================== */}
        <section id="posisi" className="contour-dark py-16 sm:py-24 text-paper relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHead
              nomor="02"
              kicker="Perbandingan wilayah · Maret 2025"
              judul="Di Bawah Provinsi, Jauh di Bawah Nasional"
              desc="Dengan P0 7,32%, Padang Lawas berada sedikit di bawah rata-rata Provinsi Sumatera Utara (7,36%) dan 1,15 poin di bawah angka nasional (8,47%)."
              refs={[2, 6, 7]}
              dark
            />
            <div className="mt-10 grid lg:grid-cols-3 gap-5 items-start">
              <Reveal className="lg:col-span-2">
                <div className="bg-card text-ink rounded-lg p-5 sm:p-7 shadow-xl shadow-pinedeep/40">
                  <ComparisonBars />
                </div>
              </Reveal>
              <div className="space-y-4">
                {[
                  {
                    besar: "1,15",
                    satuan: "poin",
                    teks: "selisih P0 Padang Lawas terhadap nasional pada Maret 2025.",
                    ref: 6,
                  },
                  {
                    besar: "Terendah",
                    satuan: "se-Sumut",
                    teks: "garis kemiskinan Padang Lawas (Rp499.761) merupakan yang terendah di antara kabupaten/kota se-Sumatera Utara.",
                    ref: 14,
                  },
                  {
                    besar: "1,14 jt",
                    satuan: "jiwa",
                    teks: "penduduk miskin Sumatera Utara pada Maret 2025, dengan GK provinsi Rp666.546 per kapita per bulan.",
                    ref: 7,
                  },
                ].map((f, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <div className="border border-pineline bg-pine/50 rounded-lg p-5 transition-colors duration-300 hover:bg-pine/80">
                      <p className="font-display font-bold text-4xl text-gold leading-none">
                        {f.besar} <span className="text-xl text-paper/70">{f.satuan}</span>
                      </p>
                      <p className="mt-2 text-sm text-paper/75 leading-relaxed">
                        {f.teks} <Ref n={f.ref} dark />
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 03 KECAMATAN ========================= */}
        <section id="kecamatan" className="py-16 sm:py-24 bg-paper2/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHead
              nomor="03"
              kicker="Kependudukan · data BPS 2023"
              judul="Penduduk per Kecamatan"
              desc={`Dari tabel statistik resmi BPS: penduduk Padang Lawas tercatat ${fmtInt.format(TOTAL_KEC.jumlah)} jiwa (2023) dengan rasio ${fmt2.format(
                (TOTAL_KEC.laki / TOTAL_KEC.perempuan) * 100
              )} laki-laki per 100 perempuan. Arahkan kursor atau klik untuk menelusuri 17 kecamatan.`}
              refs={[1]}
            />
            <div className="mt-10">
              <Reveal>
                <KecamatanSection />
              </Reveal>
            </div>
          </div>
        </section>

        {/* =========================== 04 PROFIL ========================== */}
        <section id="profil" className="py-16 sm:py-24 grid-faint">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHead
              nomor="04"
              kicker="Profil daerah"
              judul="Kabupaten Berusia 19 Tahun"
              desc="Hasil pemekaran Kabupaten Tapanuli Selatan berdasarkan UU No. 38 Tahun 2007, resmi berdiri 10 Agustus 2007 dengan ibu kota Sibuhuan."
              refs={[8]}
            />

            <div className="mt-10 grid lg:grid-cols-12 gap-5 items-start">
              {/* Kartu identitas */}
              <Reveal className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="contour-dark text-paper rounded-lg p-6 shadow-lg">
                  <div className="flex items-center gap-2.5 mb-5">
                    <IconPeta className="w-5 h-5 text-gold" />
                    <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-gold">Kartu identitas</p>
                  </div>
                  <dl className="space-y-3.5">
                    {(
                      [
                        ["Provinsi", PROFIL.provinsi],
                        ["Ibu kota", PROFIL.ibuKota],
                        ["Berdiri", `${PROFIL.berdiri} · ${PROFIL.dasarHukum}`],
                        ["Luas wilayah", "3.912,18 km²"],
                        ["Ketinggian", PROFIL.ketinggian],
                        ["Suhu rata-rata", PROFIL.suhu],
                        ["Koordinat", PROFIL.koordinat],
                        ["Wilayah admin.", "17 kec · 303 desa · 1 kel."],
                        ["Kode BPS / Kemendagri", "1221 / 12.21"],
                        ["Plat nomor", PROFIL.plat],
                        ["Zona waktu", PROFIL.zonaWaktu],
                      ] as [string, string][]
                    ).map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-pineline pb-2.5">
                        <dt className="font-mono text-[10.5px] uppercase tracking-wider text-paper/50 pt-0.5 shrink-0">{k}</dt>
                        <dd className="text-[13px] font-medium text-right num">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href="https://padanglawaskab.go.id"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 w-full rounded-md border border-gold/40 text-gold font-mono text-[11.5px] tracking-wider uppercase py-2.5 hover:bg-gold hover:text-pinedeep transition-colors duration-200"
                  >
                    <IconTautan className="w-3.5 h-3.5" /> padanglawaskab.go.id
                  </a>
                </div>
              </Reveal>

              {/* Dossier */}
              <div className="lg:col-span-8 space-y-5">
                <Reveal>
                  <DossierCard title="Pemerintahan" ikon={<IconArsip className="w-5 h-5" />} refN={8}>
                    <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      <DRow k="Bupati" v={PROFIL.bupati} note="dilantik 20 Feb 2025, periode 2025–2030" />
                      <DRow k="Wakil Bupati" v={PROFIL.wakilBupati} />
                      <DRow k="Ketua DPRD" v={PROFIL.ketuaDprd} />
                      <DRow k="Sekretaris Daerah" v={PROFIL.sekda} />
                    </dl>
                  </DossierCard>
                </Reveal>

                <Reveal delay={0.06}>
                  <DossierCard title="Penduduk & Demografi" ikon={<IconWarga className="w-5 h-5" />} refN={12}>
                    <div className="flex flex-wrap gap-x-10 gap-y-4 mb-5">
                      <div>
                        <p className="font-mono text-[10.5px] uppercase tracking-wider text-inksoft">Penduduk (Dukcapil, 31 Des 2024)</p>
                        <p className="font-display font-bold text-4xl num text-pine">{fmtInt.format(PROFIL.pendudukDukcapil2024)}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10.5px] uppercase tracking-wider text-inksoft">Kepadatan</p>
                        <p className="font-display font-bold text-4xl num text-pine">{PROFIL.kepadatan}<span className="text-lg text-inksoft"> jiwa/km²</span></p>
                      </div>
                      <div>
                        <p className="font-mono text-[10.5px] uppercase tracking-wider text-inksoft">IPM 2025 · {PROFIL.ipmKategori}</p>
                        <p className="font-display font-bold text-4xl num text-pine">{fmt2.format(PROFIL.ipm2025)}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <BarKomposisi label="Kelompok etnis" items={PROFIL.etnis.map((e) => ({ nama: e.nama, pct: e.pct }))} warna={["bg-pine", "bg-gold", "bg-fern"]} refN={8} />
                      <BarKomposisi label="Agama" items={PROFIL.agama.map((a) => ({ nama: a.nama, pct: a.pct }))} warna={["bg-pine", "bg-gold", "bg-teal", "bg-fern"]} refN={8} />
                    </div>
                    <p className="mt-4 text-xs text-inksoft">
                      Bahasa sehari-hari: Indonesia, Batak Angkola, serta Melayu Riau di wilayah selatan yang berbatasan dengan Provinsi Riau. <Ref n={8} />
                    </p>
                  </DossierCard>
                </Reveal>

                <Reveal delay={0.06}>
                  <DossierCard title="Keuangan Daerah · 2024" ikon={<IconGaris className="w-5 h-5" />} refN={13}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(
                        [
                          ["APBD", PROFIL.apbd2024],
                          ["PAD", PROFIL.pad2024],
                          ["DAU", PROFIL.dau2024],
                          ["DAK", PROFIL.dak2024],
                        ] as [string, number][]
                      ).map(([k, v]) => (
                        <div key={k} className="bg-paper rounded-md border border-ink/8 p-3.5 hover:border-gold/60 hover:-translate-y-0.5 transition-all duration-200">
                          <p className="font-mono text-[10.5px] uppercase tracking-wider text-inksoft">{k}</p>
                          <p className="font-display font-bold text-2xl sm:text-[27px] num text-pine leading-tight">{fmtMiliar(v)}</p>
                        </div>
                      ))}
                    </div>
                  </DossierCard>
                </Reveal>

                <Reveal delay={0.06}>
                  <DossierCard title="Warisan & Wisata" ikon={<IconCandi className="w-5 h-5" />} refN={8}>
                    <p className="text-sm text-inksoft leading-relaxed mb-4">
                      Sebagian situs arkeologi Padang Lawas — kompleks percandian seluas ±1.500 km² — berada di kabupaten ini,
                      meliputi Kecamatan Barumun, Barumun Tengah, dan Sosopan.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {PROFIL.warisan.map((w) => (
                        <li key={w.nama} className="flex items-start gap-2.5 text-sm group">
                          <span className="mt-1 w-1.5 h-1.5 rotate-45 bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                          <span>
                            <b className="font-semibold">{w.nama}</b>
                            <span className="text-inksoft"> — {w.lokasi}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </DossierCard>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ========================== 05 TERKINI ========================== */}
        <section id="terkini" className="py-16 sm:py-24 bg-paper2/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHead
              nomor="05"
              kicker="Perkembangan terkini"
              judul="Catatan 2025–2026"
              desc="Ringkasan perkembangan terbaru yang terverifikasi dari rilis BPS, laman pemerintah, dan pemberitaan."
            />
            <div className="mt-10 relative max-w-3xl">
              <span aria-hidden className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gold/50" />
              <ol className="space-y-7">
                {TERKINI.map((t, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <li className="relative pl-8 sm:pl-11 group">
                      <span className="absolute left-0 top-1.5 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full bg-paper border-[3px] border-gold group-hover:bg-gold transition-colors duration-200" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-golddeep">{t.tanggal}</p>
                      <h3 className="font-display font-bold text-xl sm:text-2xl leading-tight mt-1">{t.judul}</h3>
                      <p className="mt-1.5 text-sm sm:text-[14.5px] text-inksoft leading-relaxed max-w-xl">
                        {t.isi} <RefRow refs={t.refs} />
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* =========================== SUMBER ============================= */}
        <section id="sumber" className="contour-dark py-16 sm:py-24 text-paper">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHead
              nomor="06"
              kicker="Akuntabilitas data"
              judul="Sumber & Rujukan"
              desc="Setiap angka pada laman ini merujuk pada dokumen di bawah ini. Nomor rujukan [n] yang tersebar di halaman mengarah kembali ke daftar ini."
              dark
            />
            <div className="mt-10 grid md:grid-cols-2 gap-x-8 gap-y-1">
              {SUMBER.map((s) => (
                <a
                  key={s.id}
                  id={`sumber-${s.id}`}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-4 py-3.5 border-b border-pineline hover:bg-pine/60 rounded-md px-2 -mx-2 transition-colors duration-200 scroll-mt-28"
                >
                  <span className="font-mono text-[11px] font-semibold text-pinedeep bg-gold rounded w-7 h-7 flex items-center justify-center shrink-0 mt-0.5 num">
                    {s.id}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-medium leading-snug group-hover:text-gold transition-colors">
                      {s.label}
                    </span>
                    <span className="block font-mono text-[10.5px] text-paper/50 mt-1">
                      {s.penerbit} · {s.tanggal}
                      <IconTautan className="w-3 h-3 inline-block ml-1.5 -mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <Reveal>
              <p className="mt-8 text-xs text-paper/55 leading-relaxed max-w-3xl border-l-2 border-gold/60 pl-4">
                Catatan: laman ini merupakan visualisasi independen untuk keperluan informasi publik — bukan situs resmi
                BPS maupun Pemerintah Kabupaten Padang Lawas. Seluruh data diakses pada {aksesHariIni()}; bila terdapat
                perbedaan dengan publikasi resmi terkini, angka pada sumber resmi yang berlaku.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============================= FOOTER ============================= */}
      <footer className="bg-pinedeep text-paper/60 border-t border-pineline">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center gap-4 justify-between">
          <p className="font-mono text-[11px] tracking-wider">
            PALAS·DALAM·ANGKA — disusun dari data terbuka BPS, Dukcapil Kemendagri &amp; Wikipedia
          </p>
          <a
            href="#"
            className="font-mono text-[11px] uppercase tracking-widest text-gold hover:text-goldsoft transition-colors flex items-center gap-1.5"
          >
            <IconTrendUp className="w-3.5 h-3.5" /> Kembali ke atas
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ============================ sub-komponen ============================= */

function MastheadCell({
  ikon,
  label,
  value,
  suffix,
  delta,
  good = false,
  refN,
}: {
  ikon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  delta?: string;
  good?: boolean;
  refN?: number;
}) {
  return (
    <div className="bg-pinedeep/70 p-4 hover:bg-pinedeep transition-colors duration-300 group">
      <div className="flex items-center justify-between text-gold/80">
        {ikon}
        {refN && <Ref n={refN} dark />}
      </div>
      <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">{label}</p>
      <p className="font-display font-bold text-[26px] sm:text-3xl leading-tight num">
        {value} {suffix && <span className="text-[15px] text-paper/55 font-semibold">{suffix}</span>}
      </p>
      {delta && (
        <p className={`font-mono text-[10.5px] num mt-1 ${good ? "text-goldsoft" : "text-[#e8b08a]"}`}>{delta}</p>
      )}
    </div>
  );
}

function DossierCard({
  title,
  ikon,
  refN,
  children,
}: {
  title: string;
  ikon: React.ReactNode;
  refN: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-ink/10 rounded-lg p-5 sm:p-7 shadow-sm hover:shadow-md hover:border-moss/30 transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="text-moss">{ikon}</span>
        <h3 className="font-display font-bold text-2xl sm:text-[26px]">{title}</h3>
        <span className="ml-auto">
          <Ref n={refN} />
        </span>
      </div>
      {children}
    </div>
  );
}

function DRow({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div className="border-b border-ink/8 pb-2.5">
      <dt className="font-mono text-[10.5px] uppercase tracking-wider text-inksoft">{k}</dt>
      <dd className="text-sm font-semibold mt-0.5">{v}</dd>
      {note && <dd className="font-mono text-[10.5px] text-fern mt-0.5">{note}</dd>}
    </div>
  );
}

function BarKomposisi({
  label,
  items,
  warna,
  refN,
}: {
  label: string;
  items: { nama: string; pct: number }[];
  warna: string[];
  refN: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-inksoft">{label}</p>
        <Ref n={refN} />
      </div>
      <div className="h-4 rounded-[4px] overflow-hidden flex bg-paper2">
        {items.map((it, i) => (
          <motion.span
            key={it.nama}
            initial={{ width: 0 }}
            whileInView={{ width: `${it.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className={`h-full ${warna[i % warna.length]}`}
            title={`${it.nama}: ${it.pct}%`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {items.map((it, i) => (
          <span key={it.nama} className="flex items-center gap-1.5 text-[11.5px] text-inksoft">
            <span className={`w-2.5 h-2.5 rounded-[3px] ${warna[i % warna.length]}`} />
            {it.nama} <b className="num text-ink">{it.pct}%</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function fmtMiliar(n: number): string {
  if (n >= 1e12) return "Rp" + (n / 1e12).toFixed(2).replace(".", ",") + " T";
  return "Rp" + (n / 1e9).toFixed(1).replace(".", ",") + " M";
}
