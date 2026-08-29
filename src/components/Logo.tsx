import { GraduationCap } from 'lucide-react';

export function Logo({ size = 'md', light = false }: { size?: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const sz = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const txt = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const sub = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${sz} rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-soft`}>
        <GraduationCap className="text-white" style={{ width: size === 'lg' ? 26 : size === 'sm' ? 18 : 22, height: size === 'lg' ? 26 : size === 'sm' ? 18 : 22 }} />
      </div>
      <div className="leading-none">
        <div className={`font-display ${txt} font-800 tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
          Edu<span className="text-brand-500">Vision</span>
        </div>
        <div className={`${sub} ${light ? 'text-white/60' : 'text-ink-400'} font-500 tracking-wide uppercase`}>Smart Learning</div>
      </div>
    </div>
  );
}
