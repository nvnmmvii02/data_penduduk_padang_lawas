import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SUMBER } from "../data";

/* ------------------------------ Reveal -------------------------------- */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 22,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ CountUp -------------------------------- */
export function useCountUp(target: number, duration = 1400, decimals = 0) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(target * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return { ref, text: val.toFixed(decimals).replace(".", ",") };
}

export function CountUp({
  value,
  decimals = 0,
  className,
  suffix,
  prefix,
}: {
  value: number;
  decimals?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, text } = useCountUp(value, 1400, decimals);
  return (
    <span ref={ref} className={`num ${className ?? ""}`}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/* --------------------------- Section heading --------------------------- */
export function SectionHead({
  nomor,
  kicker,
  judul,
  desc,
  refs,
  dark = false,
}: {
  nomor: string;
  kicker: string;
  judul: string;
  desc?: string;
  refs?: number[];
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className="flex items-end gap-5 sm:gap-7">
        <div
          className={`font-display leading-none select-none ${
            dark ? "text-gold/70" : "text-moss/25"
          } text-[64px] sm:text-[92px] font-bold translate-y-2`}
        >
          {nomor}
        </div>
        <div className="pb-1 min-w-0">
          <p className={`font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase ${dark ? "text-gold" : "text-golddeep"}`}>
            {kicker}
          </p>
          <h2 className={`font-display font-bold text-3xl sm:text-5xl leading-[0.95] mt-2 ${dark ? "text-paper" : "text-ink"}`}>
            {judul}
          </h2>
        </div>
      </div>
      {desc && (
        <p className={`mt-4 max-w-2xl text-sm sm:text-[15px] leading-relaxed ${dark ? "text-paper/70" : "text-inksoft"}`}>
          {desc} <RefRow refs={refs ?? []} dark={dark} />
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------ Ref chip ------------------------------- */
export function Ref({ n, dark = false }: { n: number; dark?: boolean }) {
  const s = SUMBER.find((x) => x.id === n);
  return (
    <a
      href={`#sumber-${n}`}
      title={s ? `${s.label} — ${s.penerbit}` : undefined}
      className={`inline-flex items-center justify-center align-super min-w-[1.35rem] h-[1.1rem] px-1 mx-0.5 rounded-[4px] font-mono text-[10px] font-semibold leading-none border transition-colors duration-200 no-underline ${
        dark
          ? "text-gold border-gold/40 hover:bg-gold hover:text-pinedeep"
          : "text-moss border-moss/35 hover:bg-pine hover:text-paper hover:border-pine"
      }`}
    >
      {n}
    </a>
  );
}

export function RefRow({ refs, dark = false }: { refs: number[]; dark?: boolean }) {
  if (!refs.length) return null;
  return (
    <span className="inline-flex items-center gap-0.5 not-italic">
      {refs.map((r) => (
        <Ref key={r} n={r} dark={dark} />
      ))}
    </span>
  );
}

/* ------------------------------ Ikon SVG -------------------------------- */
type IconProps = { className?: string };
const base = "inline-block shrink-0";

export const IconTrendDown = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M3 6l5 5 3-3 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 10v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTrendUp = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M3 14l5-5 3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 10V6h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconWarga = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.5 19.5c.6-3.4 2.8-5.3 5.5-5.3s4.9 1.9 5.5 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="16.8" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M15.6 14.6c2.6-.5 4.5 1.3 5 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconGaris = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 3" />
    <path d="M6 13.5h12M9 18h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconKedalaman = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M4 5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 5v10m0 0l-3.5-3.5M12 15l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 20h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconCandi = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M12 3l2 3h-4l2-3zM8 8h8l1 3H7l1-3zM6 13h12l1 3H5l1-3zM4 19h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconPeta = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const IconArsip = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden>
    <rect x="4" y="4" width="16" height="5" rx="1" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6 9v9a2 2 0 002 2h8a2 2 0 002-2V9M10 13h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconTautan = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={`${base} ${className}`} aria-hidden>
    <path d="M8 12l4-4M9 6l1.5-1.5a3 3 0 014.24 4.24L13 10.5M11 9.5l-1.5 1.5a3 3 0 01-4.24-4.24L7 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const IconCari = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={`${base} ${className}`} aria-hidden>
    <circle cx="9" cy="9" r="5.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M13.2 13.2L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ------------------------- Ornamen sudut kartu -------------------------- */
export function CornerFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-gold" />
      <span aria-hidden className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-gold" />
      <span aria-hidden className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-gold" />
      <span aria-hidden className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-gold" />
      {children}
    </div>
  );
}
