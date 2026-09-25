import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface RiskScoreProps {
  score: number; // 0 - 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showGauge?: boolean;
}

export const RiskScore: React.FC<RiskScoreProps> = ({
  score,
  label = 'System Trust Score',
  size = 'md',
  showGauge = true
}) => {
  let color = 'text-emerald-400';
  let strokeColor = '#10B981';
  let bgColor = 'bg-emerald-950/20';
  let borderColor = 'border-emerald-500/30';
  let Icon = ShieldCheck;
  let statusText = 'HIGH INTEGRITY';

  if (score < 50) {
    color = 'text-rose-400';
    strokeColor = '#EF4444';
    bgColor = 'bg-rose-950/20';
    borderColor = 'border-rose-500/40';
    Icon = ShieldAlert;
    statusText = 'COMPROMISED / CRITICAL';
  } else if (score < 80) {
    color = 'text-amber-400';
    strokeColor = '#F59E0B';
    bgColor = 'bg-amber-950/20';
    borderColor = 'border-amber-500/40';
    Icon = ShieldAlert;
    statusText = 'ELEVATED RISK / REVIEW';
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`p-3.5 sm:p-4 rounded-xl border ${borderColor} ${bgColor} backdrop-blur-md flex items-center justify-between gap-3 min-w-0`}>
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-slate-400">
          <Icon className={`w-4 h-4 ${color} shrink-0`} />
          <span className="truncate">{label}</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className={`text-2xl sm:text-3xl font-extrabold telemetry-mono ${color}`}>
            {score}%
          </span>
          <span className="text-xs uppercase font-semibold text-slate-300">
            {statusText}
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          Composite cross-boundary integrity score.
        </p>
      </div>

      {showGauge && (
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Value ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={strokeColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold telemetry-mono text-white">
            {score}
          </div>
        </div>
      )}
    </div>
  );
};
