import { DecisionStatus, SeverityLevel, VerificationStatus } from '../types';

export function formatTimestamp(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${y}-${m}-${d} ${h}:${min}:${s} UTC`;
}

export function getDecisionBadgeColor(status: DecisionStatus): {
  bg: string;
  text: string;
  border: string;
  glow: string;
} {
  switch (status) {
    case 'ACCEPT':
      return {
        bg: 'bg-emerald-950/80',
        text: 'text-emerald-400',
        border: 'border-emerald-500/40',
        glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
      };
    case 'REVIEW':
      return {
        bg: 'bg-amber-950/80',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]',
      };
    case 'QUARANTINE':
      return {
        bg: 'bg-red-950/80',
        text: 'text-red-400',
        border: 'border-red-500/50',
        glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
      };
  }
}

export function getSeverityBadge(severity: SeverityLevel): {
  bg: string;
  text: string;
  border: string;
} {
  switch (severity) {
    case 'INFO':
      return {
        bg: 'bg-sky-950/50',
        text: 'text-sky-400',
        border: 'border-sky-500/30',
      };
    case 'WARNING':
      return {
        bg: 'bg-amber-950/50',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
      };
    case 'CRITICAL':
      return {
        bg: 'bg-rose-950/60',
        text: 'text-rose-400',
        border: 'border-rose-500/40',
      };
  }
}

export function getVerificationStatusColor(status: VerificationStatus | string): string {
  switch (status) {
    case 'VERIFIED':
    case 'VALID':
    case 'MATCH':
      return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30';
    case 'FLAGGED':
    case 'PENDING':
    case 'SUSPICIOUS BEHAVIOR':
      return 'text-amber-400 border-amber-500/30 bg-amber-950/30';
    case 'BROKEN':
    case 'INVALID':
    case 'MISMATCH':
    case 'QUARANTINED':
      return 'text-red-400 border-red-500/30 bg-red-950/30';
    default:
      return 'text-slate-400 border-slate-700 bg-slate-900/40';
  }
}
