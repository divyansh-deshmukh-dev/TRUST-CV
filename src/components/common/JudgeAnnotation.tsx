import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../../state/AppContext';

interface JudgeAnnotationProps {
  title: string;
  whyItMatters: string;
  defenseContext?: string;
  tag?: string;
  className?: string;
}

export const JudgeAnnotation: React.FC<JudgeAnnotationProps> = ({
  title,
  whyItMatters,
  defenseContext,
  tag = 'ARCHITECTURAL INSIGHT',
  className = ''
}) => {
  const { state } = useApp();

  if (!state.judgeMode) return null;

  return (
    <div
      className={`relative p-3 rounded-lg bg-gradient-to-r from-cyan-950/20 via-slate-900/40 to-slate-950 border border-cyan-500/30 shadow-md my-2.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs tracking-wider uppercase font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>{title}</span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono font-bold">
          {tag}
        </span>
      </div>

      <div className="text-xs text-slate-300 leading-relaxed">
        <p className="font-normal">{whyItMatters}</p>
        {defenseContext && (
          <p className="text-slate-400 text-[11px] border-t border-slate-800/80 pt-1 mt-1 font-mono">
            <span className="text-slate-300 font-semibold">Operational Context:</span> {defenseContext}
          </p>
        )}
      </div>
    </div>
  );
};
