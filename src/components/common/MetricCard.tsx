import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  badge?: ReactNode;
  trend?: 'positive' | 'negative' | 'neutral';
  variant?: 'default' | 'accent' | 'warning' | 'danger';
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const borderClasses = {
    default: 'border-slate-800 hover:border-slate-700',
    accent: 'border-sky-500/30 hover:border-sky-500/60 shadow-[0_0_15px_rgba(14,165,233,0.1)]',
    warning: 'border-amber-500/30 hover:border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    danger: 'border-rose-500/40 hover:border-rose-500/70 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`relative p-3 sm:p-3.5 rounded-lg bg-slate-900/80 border ${borderClasses} backdrop-blur-md transition-all duration-200 min-w-0 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-1.5 min-w-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 truncate">
          {label}
        </span>
        {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
      </div>

      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-1.5 gap-y-1 min-w-0">
        <div className="text-xl 2xl:text-2xl font-bold tracking-tight text-white telemetry-mono truncate">
          {value}
        </div>
        {badge && <div className="shrink-0 flex items-center">{badge}</div>}
      </div>

      {subtext && (
        <div className="mt-1 text-[11px] text-slate-400 truncate font-mono">
          {subtext}
        </div>
      )}
    </div>
  );
};
