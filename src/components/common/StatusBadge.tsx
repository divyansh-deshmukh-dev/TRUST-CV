import React from 'react';
import { getVerificationStatusColor, getDecisionBadgeColor, getSeverityBadge } from '../../utils/helpers';
import { DecisionStatus, SeverityLevel } from '../../types';

interface StatusBadgeProps {
  status: string;
  type?: 'decision' | 'verification' | 'severity';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'verification',
  size = 'md',
  className = ''
}) => {
  let styleClass = '';
  let glowClass = '';

  if (type === 'decision') {
    const s = getDecisionBadgeColor(status as DecisionStatus);
    styleClass = `${s.bg} ${s.text} ${s.border}`;
    glowClass = s.glow;
  } else if (type === 'severity') {
    const s = getSeverityBadge(status as SeverityLevel);
    styleClass = `${s.bg} ${s.text} ${s.border}`;
  } else {
    styleClass = getVerificationStatusColor(status);
  }

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] font-bold tracking-tight',
    md: 'px-2.5 py-1 text-xs font-semibold tracking-wide',
    lg: 'px-4 py-1.5 text-sm font-bold tracking-wider'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border uppercase telemetry-mono whitespace-nowrap shrink-0 ${sizeClasses} ${styleClass} ${glowClass} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
      <span>{status}</span>
    </span>
  );
};
