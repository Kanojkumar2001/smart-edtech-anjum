import { type ReactNode } from 'react';

export function Card({ children, className = '', hover = false }: { children: ReactNode; className?: string; hover?: boolean }) {
  return <div className={`card ${hover ? 'card-hover' : ''} ${className}`}>{children}</div>;
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="font-display text-lg font-700 text-ink-900">{title}</h2>
        {subtitle && <p className="text-sm text-ink-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

type BadgeTone = 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
const toneMap: Record<BadgeTone, string> = {
  brand: 'bg-brand-50 text-brand-700',
  accent: 'bg-accent-50 text-accent-700',
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-danger-50 text-danger-700',
  neutral: 'bg-ink-100 text-ink-600',
};

export function Badge({ children, tone = 'neutral', dot = false }: { children: ReactNode; tone?: BadgeTone; dot?: boolean }) {
  return (
    <span className={`chip ${toneMap[tone]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full bg-current`} />}
      {children}
    </span>
  );
}

export function Avatar({ initials, color, size = 'md' }: { initials: string; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm';
  return (
    <div className={`${sz} ${color} rounded-xl text-white font-700 flex items-center justify-center shrink-0`}>
      {initials}
    </div>
  );
}

export function ProgressBar({ value, tone = 'brand', className = '' }: { value: number; tone?: BadgeTone; className?: string }) {
  const bar: Record<BadgeTone, string> = {
    brand: 'bg-brand-500',
    accent: 'bg-accent-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    neutral: 'bg-ink-400',
  };
  return (
    <div className={`h-2 rounded-full bg-ink-100 overflow-hidden ${className}`}>
      <div className={`h-full ${bar[tone]} rounded-full transition-all duration-700 ease-out`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function StatTile({
  label, value, sub, icon, tone = 'brand',
}: { label: string; value: string | number; sub?: string; icon?: ReactNode; tone?: BadgeTone }) {
  const ring: Record<BadgeTone, string> = {
    brand: 'bg-brand-50 text-brand-600',
    accent: 'bg-accent-50 text-accent-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
    neutral: 'bg-ink-100 text-ink-600',
  };
  return (
    <div className="stat-tile animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-500 font-500">{label}</span>
        {icon && <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${ring[tone]}`}>{icon}</span>}
      </div>
      <div className="font-display text-2xl font-800 text-ink-900">{value}</div>
      {sub && <span className="text-xs text-ink-400">{sub}</span>}
    </div>
  );
}

export function RiskBadge({ level }: { level: 'Normal' | 'Needs Attention' | 'At Risk' | 'Critical' }) {
  const map = {
    Normal: { tone: 'success' as BadgeTone, label: 'Normal' },
    'Needs Attention': { tone: 'warning' as BadgeTone, label: 'Needs Attention' },
    'At Risk': { tone: 'danger' as BadgeTone, label: 'At Risk' },
    Critical: { tone: 'danger' as BadgeTone, label: 'Critical' },
  };
  const r = map[level];
  return <Badge tone={r.tone} dot>{r.label}</Badge>;
}
