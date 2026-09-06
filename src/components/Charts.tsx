import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { P0_SERIES, MISKIN_SERIES, INDEKS_SERIES, GK_SERIES, PERBANDINGAN_2025, fmt2, fmtInt } from "../data";
import { Ref } from "../lib/ui";

/* ============================= Sparkline =============================== */
export function Sparkline({ width = 340, height = 84 }: { width?: number; height?: number }) {
  const pts = P0_SERIES;
  const min = Math.min(...pts.map((p) => p.p0)) - 0.3;
  const max = Math.max(...pts.map((p) => p.p0)) + 0.3;
  const x = (i: number) => (i / (pts.length - 1)) * (width - 8) + 4;
  const y = (v: number) => height - 10 - ((v - min) / (max - min)) * (height - 24);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.p0).toFixed(1)}`).join(" ");
  const area = `${d} L${x(pts.length - 1).toFixed(1)},${height - 4} L${x(0).toFixed(1)},${height - 4} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxHeight: height }} aria-hidden>
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3A73C" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#E3A73C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkfill)" />
      <path d={d} fill="none" stroke="#E3A73C" strokeWidth="2.2" strokeLinecap="round" pathLength={1} className="line-draw" style={{ ["--dash" as string]: 1 }} />
      {pts.map((p, i) => (
        <circle key={p.tahun} cx={x(i)} cy={y(p.p0)} r={i === pts.length - 1 ? 4 : 2.4} fill={i === pts.length - 1 ? "#E3A73C" : "#0A2C21"} stroke="#E3A73C" strokeWidth="1.6" className={i === pts.length - 1 ? "blink" : ""} />
      ))}
    </svg>
  );
}

/* ============================ Trend chart ============================== */
type Metric = "p0" | "miskin";

const METRIC_INFO: Record<Metric, { label: string; unit: string; decimals: number; ref: number }> = {
  p0: { label: "Persentase Penduduk Miskin (P0)", unit: "%", decimals: 2, ref: 5 },
  miskin: { label: "Jumlah Penduduk Miskin", unit: "ribu jiwa", decimals: 2, ref: 3 },
};

export function TrendChart() {
  const [metric, setMetric] = useState<Metric>("p0");
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const data = useMemo(
    () =>
      metric === "p0"
        ? P0_SERIES.map((p) => ({ tahun: p.tahun, nilai: p.p0 }))
        : MISKIN_SERIES.map((p) => ({ tahun: p.tahun, nilai: p.ribu })),
    [metric]
  );

  const W = 760;
  const H = 300;
  const padL = 52;
  const padR = 20;
  const padT = 26;
  const padB = 40;

  const vals = data.map((d) => d.nilai);
  const rawMin = Math.min(...vals);
  const rawMax = Math.max(...vals);
  const span = rawMax - rawMin || 1;
  const dMin = rawMin - span * 0.35;
  const dMax = rawMax + span * 0.25;

  const x = (i: number) => padL + (i / (data.length - 1)) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (v - dMin) / (dMax - dMin)) * (H - padT - padB);

  const ticks = useMemo(() => {
    const n = 4;
    return Array.from({ length: n + 1 }, (_, i) => dMin + ((dMax - dMin) * i) / n);
  }, [dMin, dMax]);

  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d.nilai).toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1).toFixed(1)},${H - padB} L${x(0).toFixed(1)},${H - padB} Z`;

  const onMove = (e: React.PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    let bd = Infinity;
    data.forEach((_, i) => {
      const dist = Math.abs(x(i) - px);
      if (dist < bd) {
        bd = dist;
        best = i;
      }
    });
    setHover(best);
  };

  const info = METRIC_INFO[metric];
  const delta = hover !== null && hover > 0 ? data[hover].nilai - data[hover - 1].nilai : null;
  const good = metric === "p0" || metric === "miskin"; // penurunan = baik untuk keduanya

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {(Object.keys(METRIC_INFO) as Metric[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMetric(m);
              setHover(null);
            }}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wide uppercase border transition-all duration-200 cursor-pointer ${
              metric === m
                ? "bg-pine text-paper border-pine shadow-[0_2px_10px_rgba(15,61,46,0.3)]"
                : "bg-transparent text-moss border-moss/30 hover:border-moss hover:bg-moss/10"
            }`}
          >
            {m === "p0" ? "P0 · persen" : "Penduduk miskin · ribu jiwa"}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] text-inksoft">
          {metric === "p0" ? "2018–2025" : "2019–2025"} · Susenas Maret <Ref n={info.ref} />
        </span>
      </div>

      <div className="relative">
        <svg
          key={metric}
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto touch-none select-none"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`Grafik ${info.label}`}
        >
          <defs>
            <linearGradient id="areafill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F3D2E" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0F3D2E" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {ticks.map((t, i) => (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="#16241D" strokeOpacity="0.09" strokeDasharray={i === 0 ? "" : "3 5"} />
              <text x={padL - 10} y={y(t) + 4} textAnchor="end" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#45564C">
                {t.toFixed(metric === "p0" ? 1 : 0).replace(".", ",")}
              </text>
            </g>
          ))}

          <path d={area} fill="url(#areafill)" className="rise-in" />
          <path d={line} fill="none" stroke="#0F3D2E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="line-draw" style={{ ["--dash" as string]: 1 }} />

          {hover !== null && (
            <line x1={x(hover)} x2={x(hover)} y1={padT - 6} y2={H - padB} stroke="#A3700F" strokeWidth="1.2" strokeDasharray="4 4" />
          )}

          {data.map((d, i) => (
            <g key={d.tahun}>
              <circle
                cx={x(i)}
                cy={y(d.nilai)}
                r={hover === i ? 6.5 : 4}
                fill={hover === i ? "#A3700F" : "#FBFCF9"}
                stroke="#0F3D2E"
                strokeWidth="2.2"
                className="transition-all duration-150"
              />
              <text x={x(i)} y={H - padB + 22} textAnchor="middle" fontSize="12.5" fontFamily="IBM Plex Mono, monospace" fill={hover === i ? "#16241D" : "#45564C"} fontWeight={hover === i ? 700 : 400}>
                {String(d.tahun).slice(2)}
              </text>
            </g>
          ))}

          {/* label nilai di titik terakhir */}
          <text x={x(data.length - 1) - 10} y={y(data[data.length - 1].nilai) - 14} textAnchor="end" fontSize="15" fontFamily="Big Shoulders Display, sans-serif" fontWeight="700" fill="#0F3D2E">
            {data[data.length - 1].nilai.toFixed(info.decimals).replace(".", ",")} {info.unit === "%" ? "%" : ""}
          </text>
        </svg>

        {hover !== null && (
          <div
            className="absolute pointer-events-none z-10 bg-pinedeep text-paper rounded-lg px-3.5 py-2.5 shadow-xl shadow-pinedeep/30 min-w-[168px]"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              top: `${(y(data[hover].nilai) / H) * 100}%`,
              transform: `translate(${hover > data.length / 2 ? "-108%" : "8%"}, -50%)`,
            }}
          >
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold">Maret {data[hover].tahun}</p>
            <p className="font-display text-2xl font-bold leading-tight num">
              {data[hover].nilai.toFixed(info.decimals).replace(".", ",")}
              <span className="text-sm font-semibold text-paper/70 ml-1">{info.unit === "%" ? "persen" : "ribu jiwa"}</span>
            </p>
            {delta !== null && (
              <p className={`font-mono text-[11px] num ${delta <= 0 === good ? "text-goldsoft" : "text-[#e8a08a]"}`}>
                {delta > 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(info.decimals).replace(".", ",")} dari {data[hover - 1].tahun}
              </p>
            )}
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-inksoft leading-relaxed">
        {metric === "p0" ? (
          <>
            P0 mencapai puncak 8,69% pada 2021 (pandemi), lalu konsisten turun hingga 7,32% pada Maret 2025 — titik terendah dalam deret ini. <Ref n={2} /><Ref n={4} /><Ref n={9} />
          </>
        ) : (
          <>
            Jumlah penduduk miskin 2023 (24,45 ribu) merupakan hasil pengurangan dari rilis resmi 2024: “24,96 ribu, naik 0,51 ribu dalam satu tahun terakhir”. <Ref n={3} /><Ref n={9} />
          </>
        )}
      </p>
    </div>
  );
}

/* ====================== Indeks kedalaman/keparahan ====================== */
export function IndeksPanel() {
  const maxV = 1.4;
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-inksoft">
          <span className="w-3 h-3 rounded-[3px] bg-gold inline-block" /> P1 · Kedalaman
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-inksoft">
          <span className="w-3 h-3 rounded-[3px] bg-rust inline-block" /> P2 · Keparahan
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3 items-end">
        {INDEKS_SERIES.map((p, idx) => (
          <div key={p.tahun} className="flex flex-col items-center gap-2">
            <div className="flex items-end gap-1.5 h-32 w-full justify-center">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(p.p1! / maxV) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 + idx * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                className="w-7 sm:w-9 bg-gold rounded-t-[3px] relative group cursor-default"
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10.5px] text-golddeep num opacity-80 group-hover:opacity-100">
                  {fmt2.format(p.p1!)}
                </span>
              </motion.div>
              {p.p2 !== null ? (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(p.p2 / maxV) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25 + idx * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                  className="w-7 sm:w-9 bg-rust/85 rounded-t-[3px] relative group cursor-default"
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10.5px] text-rust num opacity-80 group-hover:opacity-100">
                    {fmt2.format(p.p2)}
                  </span>
                </motion.div>
              ) : (
                <div className="w-7 sm:w-9 border-t-2 border-dashed border-rust/40 self-end h-0" title="Tidak dicantumkan pada sumber yang diakses" />
              )}
            </div>
            <span className="font-mono text-xs text-inksoft num">{p.tahun}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-inksoft leading-relaxed">
        P1 turun dari 1,33 (2021) menjadi 0,75 (2025): jarak rata-rata pengeluaran penduduk miskin terhadap garis kemiskinan makin menyempit. Nilai P2 2023–2024 tidak dicantumkan pada sumber yang diakses. <Ref n={2} /><Ref n={9} /><Ref n={10} />
      </p>
    </div>
  );
}

/* =========================== Garis kemiskinan =========================== */
export function GarisKemiskinanCard() {
  const [a, b] = GK_SERIES;
  const pct = ((b.rp - a.rp) / a.rp) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-inksoft">Maret {a.tahun}</p>
          <p className="font-display text-3xl sm:text-4xl font-bold text-moss num">Rp{fmtInt.format(a.rp)}</p>
        </div>
        <svg viewBox="0 0 40 20" className="w-9 h-5 text-golddeep" fill="none" aria-hidden>
          <path d="M2 10h30m0 0l-7-6m7 6l-7 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-right">
          <p className="font-mono text-[11px] uppercase tracking-wider text-inksoft">Maret {b.tahun}</p>
          <p className="font-display text-3xl sm:text-4xl font-bold text-pine num">Rp{fmtInt.format(b.rp)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-rust/10 text-rust font-mono text-[11.5px] px-2 py-1 num">▲ {fmt2.format(pct)}%</span>
        <span className="text-xs text-inksoft">per kapita per bulan</span>
      </div>
      <div className="mt-5 h-2.5 rounded-full bg-paper2 overflow-hidden flex">
        <motion.div initial={{ width: 0 }} whileInView={{ width: "96.7%" }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }} className="bg-moss/70 h-full" />
        <motion.div initial={{ width: 0 }} whileInView={{ width: "3.3%" }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }} className="bg-gold h-full" />
      </div>
      <p className="mt-4 text-xs text-inksoft leading-relaxed">
        GK Padang Lawas 2025 merupakan yang terendah di antara kabupaten/kota se-Sumatera Utara, sementara GK provinsi tercatat Rp666.546. <Ref n={2} /><Ref n={7} /><Ref n={14} />
      </p>
    </div>
  );
}

/* ============================ Perbandingan ============================== */
export function ComparisonBars() {
  const maxP0 = Math.max(...PERBANDINGAN_2025.map((r) => r.p0));
  return (
    <div className="space-y-5">
      {PERBANDINGAN_2025.map((r, i) => (
        <div key={r.wilayah}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <p className={`font-semibold text-sm sm:text-[15px] ${r.utama ? "text-pine" : "text-ink"}`}>
              {r.wilayah}
              {r.utama && <span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-widest bg-gold text-pinedeep rounded px-1.5 py-0.5">fokus</span>}
            </p>
            <p className="font-display text-2xl sm:text-3xl font-bold num text-ink">
              {fmt2.format(r.p0)}<span className="text-base text-inksoft font-semibold">%</span>
            </p>
          </div>
          <div className="h-7 rounded-[4px] bg-paper2 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(r.p0 / maxP0) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className={`h-full rounded-r-[4px] ${r.utama ? "bg-gradient-to-r from-pine to-moss" : "bg-fern/55"}`}
            />
            <span
              className={`absolute top-1/2 -translate-y-1/2 font-mono text-[10.5px] num px-1 ${
                r.p0 / maxP0 > 0.9 ? "text-paper" : "text-ink"
              }`}
              style={{ left: `calc(${(r.p0 / maxP0) * 100}% ${r.p0 / maxP0 > 0.9 ? "- 100%" : "+ 6px"} )` }}
            >
              {fmt2.format(r.p0)}
            </span>
          </div>
          <p className="mt-1.5 font-mono text-[11px] text-inksoft num">
            {r.miskin}{r.gk ? ` · GK Rp${fmtInt.format(r.gk)}/kapita/bln` : ""} <Ref n={r.refs[0]} />
          </p>
        </div>
      ))}
    </div>
  );
}
