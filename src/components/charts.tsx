import { type ReactNode } from 'react';

// ---- Line / Area Chart ----
export function LineChart({ data, height = 140, color = '#1bb1ad' }: { data: { label: string; value: number }[]; height?: number; color?: string }) {
  const w = 320, h = height, pad = 24;
  const max = Math.max(...data.map((d) => d.value)) + 4;
  const min = Math.min(...data.map((d) => d.value)) - 4;
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => ({ x: pad + i * step, y: h - pad - ((d.value - min) / range) * (h - pad * 2) }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const area = `${path} L ${pts[pts.length - 1].x} ${h - pad} L ${pts[0].x} ${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lc-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((f) => (
        <line key={f} x1={pad} x2={w - pad} y1={pad + f * (h - pad * 2)} y2={pad + f * (h - pad * 2)} stroke="#e9edf5" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#lc-grad)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-line" style={{ strokeDasharray: 1000 }} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="white" stroke={color} strokeWidth="2.5" />
          <text x={p.x} y={h - 6} textAnchor="middle" className="fill-ink-400" style={{ fontSize: 9 }}>{data[i].label}</text>
        </g>
      ))}
    </svg>
  );
}

// ---- Bar Chart ----
export function BarChart({ data, height = 150 }: { data: { label: string; value: number; color?: string }[]; height?: number }) {
  const max = Math.max(...data.map((d) => d.value)) || 100;
  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex items-end justify-center" style={{ height: height - 28 }}>
            <div
              className="w-full max-w-[34px] rounded-t-lg transition-all duration-700 ease-out animate-scale-in origin-bottom"
              style={{ height: `${(d.value / max) * 100}%`, background: d.color || '#1bb1ad' }}
              title={`${d.value}%`}
            />
          </div>
          <span className="text-[10px] text-ink-400 font-500 text-center truncate w-full">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ---- Donut Chart ----
export function DonutChart({ segments, size = 140, thickness = 18, centerLabel, centerSub }: {
  segments: { value: number; color: string; label?: string }[];
  size?: number; thickness?: number; centerLabel?: string; centerSub?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e9edf5" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      {(centerLabel || centerSub) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && <span className="font-display text-xl font-800 text-ink-900">{centerLabel}</span>}
          {centerSub && <span className="text-[10px] text-ink-400">{centerSub}</span>}
        </div>
      )}
    </div>
  );
}

// ---- Radial Gauge ----
export function RadialGauge({ value, size = 120, label, tone = '#1bb1ad' }: { value: number; size?: number; label?: string; tone?: string }) {
  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;
  const len = (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e9edf5" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone} strokeWidth="8"
          strokeDasharray={`${len} ${c - len}`} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-lg font-800 text-ink-900">{value}</span>
        {label && <span className="text-[9px] text-ink-400">{label}</span>}
      </div>
    </div>
  );
}

// ---- Sparkline ----
export function Sparkline({ data, color = '#1bb1ad', width = 80, height = 28 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const step = width / (data.length - 1);
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---- Subject Performance Bars (horizontal) ----
export function SubjectBars({ subjects }: { subjects: { subject: string; current: number; status: 'weak' | 'average' | 'strong' }[] }) {
  const colorOf = { weak: '#e64d50', average: '#f9b425', strong: '#1bb1ad' };
  return (
    <div className="space-y-3">
      {subjects.map((s, i) => (
        <div key={i}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-500 text-ink-700">{s.subject}</span>
            <span className="font-600 text-ink-900">{s.current}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-ink-100 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${s.current}%`, background: colorOf[s.status] }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Legend ----
export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: it.color }} />
          <span className="text-xs text-ink-500">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ---- Empty State ----
export function EmptyState({ icon, title, sub }: { icon?: ReactNode; title: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {icon && <div className="w-12 h-12 rounded-2xl bg-ink-100 text-ink-400 flex items-center justify-center mb-3">{icon}</div>}
      <p className="font-600 text-ink-700">{title}</p>
      {sub && <p className="text-sm text-ink-400 mt-1">{sub}</p>}
    </div>
  );
}
