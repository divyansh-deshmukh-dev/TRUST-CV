import React from 'react';
import { AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';
import { SeverityLevel } from '../../types';

interface AlertBannerProps {
  title: string;
  message: string;
  severity: SeverityLevel;
  onDismiss?: () => void;
  actionButton?: React.ReactNode;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  message,
  severity,
  onDismiss,
  actionButton,
  className = ''
}) => {
  const styles = {
    INFO: {
      bg: 'bg-sky-950/40 border-sky-500/40 text-sky-200',
      icon: Info,
      iconColor: 'text-sky-400'
    },
    WARNING: {
      bg: 'bg-amber-950/40 border-amber-500/40 text-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-400'
    },
    CRITICAL: {
      bg: 'bg-rose-950/50 border-rose-500/50 text-rose-200 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
      icon: AlertOctagon,
      iconColor: 'text-rose-400'
    }
  }[severity];

  const Icon = styles.icon;

  return (
    <div className={`p-3.5 rounded-lg border backdrop-blur-md flex items-start justify-between gap-3 ${styles.bg} ${className}`}>
      <div className="flex items-start gap-2.5">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.iconColor}`} />
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {title}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {actionButton}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
