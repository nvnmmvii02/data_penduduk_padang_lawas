import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KECAMATAN, TOTAL_KEC, KecamatanRow, fmtInt, fmt1, fmt2 } from "../data";
import { IconCari, Ref } from "../lib/ui";

type SortKey = "jumlah-desc" | "jumlah-asc" | "nama" | "rasio";

const totalKec = (k: KecamatanRow) => k.laki + k.perempuan;
const rasio = (k: KecamatanRow) => (k.laki / k.perempuan) * 100;

export function KecamatanSection() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("jumlah-desc");
  const [selected, setSelected] = useState<string | null>("Barumun");

  const maxTotal = useMemo(() => Math.max(...KECAMATAN.map(totalKec)), []);

  const rows = useMemo(() => {
    const filtered = KECAMATAN.filter((k) => k.nama.toLowerCase().includes(q.trim().toLowerCase()));
    const sorted = [...filtered];
    switch (sort) {
      case "jumlah-desc":
        sorted.sort((a, b) => totalKec(b) - totalKec(a));
        break;
      case "jumlah-asc":
        sorted.sort((a, b) => totalKec(a) - totalKec(b));
        break;
      case "nama":
        sorted.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
        break;
      case "rasio":
        sorted.sort((a, b) => rasio(b) - rasio(a));
        break;
    }
    return sorted;
  }, [q, sort]);

  const sel = KECAMATAN.find((k) => k.nama === selected) ?? null;

  return (
    <div>
      {/* Kartu detail kecamatan terpilih */}
      <AnimatePresence mode="wait">
        {sel && (
          <motion.div
            key={sel.nama}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mb-6 bg-pine text-paper rounded-lg px-5 py-4 flex flex-wrap items-center gap-x-8 gap-y-3 shadow-lg shadow-pine/20"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Kecamatan terpilih</p>
              <p className="font-display text-2xl sm:text-3xl font-bold leading-tight">{sel.nama}</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 ml-auto">
              <Stat label="Penduduk" value={`${fmtInt.format(totalKec(sel))} jiwa`} />
              <Stat label="Porsi kab." value={`${fmt1.format((totalKec(sel) / TOTAL_KEC.jumlah) * 100)}%`} />
              <Stat label="Laki-laki" value={fmtInt.format(sel.laki)} />
              <Stat label="Perempuan" value={fmtInt.format(sel.perempuan)} />
              <Stat label="Rasio L/P" value={fmt1.format(rasio(sel))} />
              <Stat label="Desa" value={`${sel.desa}${sel.kelurahan ? ` + ${sel.kelurahan} kel.` : ""}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kontrol */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <label className="relative flex-1 min-w-[220px] max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-moss">
            <IconCari className="w-4 h-4" />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari kecamatan… mis. Sosa"
            className="w-full bg-card border border-moss/25 rounded-lg pl-9 pr-3 py-2.5 text-sm placeholder:text-fern focus:outline-none focus:border-pine focus:ring-2 focus:ring-pine/15 transition-shadow"
          />
        </label>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-inksoft mr-1">Urut:</span>
          {(
            [
              ["jumlah-desc", "Terbanyak"],
              ["jumlah-asc", "Tersedikit"],
              ["nama", "Nama A–Z"],
              ["rasio", "Rasio L/P"],
            ] as [SortKey, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] border transition-all duration-200 cursor-pointer ${
                sort === k ? "bg-pine text-paper border-pine" : "border-moss/30 text-moss hover:bg-moss/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 items-start">
        {/* Grafik batang bertumpuk */}
        <div className="bg-card border border-ink/10 rounded-lg p-4 sm:p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-inksoft mb-1">
            Struktur penduduk per kecamatan · 2023
          </p>
          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-inksoft">
              <span className="w-3 h-3 rounded-[3px] bg-moss inline-block" /> Laki-laki
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-inksoft">
              <span className="w-3 h-3 rounded-[3px] bg-gold inline-block" /> Perempuan
            </span>
          </div>
          <div className="space-y-[7px]">
            {rows.map((k, i) => {
              const t = totalKec(k);
              const wL = (k.laki / maxTotal) * 100;
              const wP = (k.perempuan / maxTotal) * 100;
              const active = selected === k.nama;
              return (
                <button
                  key={k.kode}
                  onClick={() => setSelected(active ? null : k.nama)}
                  onMouseEnter={() => setSelected(k.nama)}
                  className={`w-full text-left group rounded-md transition-colors duration-150 cursor-pointer ${active ? "bg-pine/[0.06]" : "hover:bg-pine/[0.04]"}`}
                  title={`${k.nama}: ${fmtInt.format(t)} jiwa`}
                >
                  <div className="flex items-center gap-3 px-1.5 py-[3px]">
                    <span className={`w-[104px] sm:w-[124px] shrink-0 text-[12.5px] font-medium truncate ${active ? "text-pine font-semibold" : "text-ink"}`}>
                      {k.nama}
                    </span>
                    <span className="flex-1 flex h-[18px] items-stretch overflow-hidden rounded-[3px] bg-paper2">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${wL}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                        className={`h-full ${active ? "bg-pine" : "bg-moss/85 group-hover:bg-pine"} transition-colors`}
                      />
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${wP}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.04 + 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                        className={`h-full ${active ? "bg-gold" : "bg-gold/80 group-hover:bg-gold"} transition-colors`}
                      />
                    </span>
                    <span className="w-16 shrink-0 text-right font-mono text-[11.5px] num text-inksoft">{fmtInt.format(t)}</span>
                  </div>
                </button>
              );
            })}
            {rows.length === 0 && (
              <p className="text-sm text-inksoft py-8 text-center font-mono">Tidak ada kecamatan yang cocok dengan “{q}”.</p>
            )}
          </div>
          <p className="mt-4 font-mono text-[11px] text-inksoft num">
            Total kabupaten: {fmtInt.format(TOTAL_KEC.jumlah)} jiwa ({fmtInt.format(TOTAL_KEC.laki)} L / {fmtInt.format(TOTAL_KEC.perempuan)} P)
          </p>
        </div>

        {/* Tabel */}
        <div className="bg-card border border-ink/10 rounded-lg overflow-hidden">
          <div className="slim-scroll overflow-x-auto">
            <table className="w-full text-[13px] min-w-[560px]">
              <thead>
                <tr className="bg-pine text-paper font-mono text-[10.5px] uppercase tracking-wider">
                  <th className="text-left px-3 py-2.5 font-medium">Kecamatan</th>
                  <th className="text-right px-3 py-2.5 font-medium">Laki-laki</th>
                  <th className="text-right px-3 py-2.5 font-medium">Perempuan</th>
                  <th className="text-right px-3 py-2.5 font-medium">Jumlah</th>
                  <th className="text-right px-3 py-2.5 font-medium">% Kab.</th>
                  <th className="text-left px-3 py-2.5 font-medium w-[86px]">Komposisi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((k) => {
                  const t = totalKec(k);
                  const active = selected === k.nama;
                  return (
                    <tr
                      key={k.kode}
                      onMouseEnter={() => setSelected(k.nama)}
                      onClick={() => setSelected(active ? null : k.nama)}
                      className={`border-t border-ink/8 cursor-pointer transition-colors duration-150 num ${
                        active ? "bg-gold/15" : "odd:bg-paper/60 hover:bg-moss/8"
                      }`}
                    >
                      <td className="px-3 py-2">
                        <p className={`font-semibold ${active ? "text-pine" : "text-ink"}`}>{k.nama}</p>
                        <p className="font-mono text-[10px] text-fern">{k.kode} · {k.desa} desa{k.kelurahan ? ` + ${k.kelurahan} kel.` : ""}</p>
                      </td>
                      <td className="px-3 py-2 text-right">{fmtInt.format(k.laki)}</td>
                      <td className="px-3 py-2 text-right">{fmtInt.format(k.perempuan)}</td>
                      <td className="px-3 py-2 text-right font-semibold">{fmtInt.format(t)}</td>
                      <td className="px-3 py-2 text-right">{fmt1.format((t / TOTAL_KEC.jumlah) * 100)}</td>
                      <td className="px-3 py-2">
                        <span className="flex h-[9px] rounded-full overflow-hidden bg-paper2">
                          <span className="bg-moss/85 h-full" style={{ width: `${(k.laki / t) * 100}%` }} />
                          <span className="bg-gold/90 h-full" style={{ width: `${(k.perempuan / t) * 100}%` }} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-inksoft font-mono text-xs">
                      Tidak ada hasil untuk “{q}”.
                    </td>
                  </tr>
                )}
              </tbody>
              {rows.length > 0 && (
                <tfoot>
                  <tr className="bg-paper2/80 font-semibold border-t-2 border-pine/30 num">
                    <td className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider">Padang Lawas</td>
                    <td className="px-3 py-2.5 text-right">{fmtInt.format(TOTAL_KEC.laki)}</td>
                    <td className="px-3 py-2.5 text-right">{fmtInt.format(TOTAL_KEC.perempuan)}</td>
                    <td className="px-3 py-2.5 text-right">{fmtInt.format(TOTAL_KEC.jumlah)}</td>
                    <td className="px-3 py-2.5 text-right">100,0</td>
                    <td className="px-3 py-2.5">
                      <span className="flex h-[9px] rounded-full overflow-hidden bg-paper">
                        <span className="bg-pine h-full" style={{ width: `${(TOTAL_KEC.laki / TOTAL_KEC.jumlah) * 100}%` }} />
                        <span className="bg-gold h-full" style={{ width: `${(TOTAL_KEC.perempuan / TOTAL_KEC.jumlah) * 100}%` }} />
                      </span>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
          <p className="px-4 py-3 text-[11px] text-inksoft leading-relaxed border-t border-ink/8">
            Sumber: Tabel Statistik BPS Kab. Padang Lawas, data tahun 2023 (diperbarui 1 Maret 2024). <Ref n={1} /> Rasio jenis kelamin kabupaten:{" "}
            <span className="font-mono num">{fmt2.format((TOTAL_KEC.laki / TOTAL_KEC.perempuan) * 100)}</span> laki-laki per 100 perempuan.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">{label}</p>
      <p className="font-display text-xl sm:text-2xl font-bold num leading-tight">{value}</p>
    </div>
  );
}
