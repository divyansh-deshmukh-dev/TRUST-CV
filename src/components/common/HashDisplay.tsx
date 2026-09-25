import React, { useState } from 'react';
import { Copy, Check, Hash } from 'lucide-react';
import { formatHashShort } from '../../utils/crypto';

interface HashDisplayProps {
  label: string;
  hash: string;
  truncate?: boolean;
  copyable?: boolean;
  tag?: string;
  status?: 'match' | 'mismatch' | 'neutral';
  className?: string;
}

export const HashDisplay: React.FC<HashDisplayProps> = ({
  label,
  hash,
  truncate = true,
  copyable = true,
  tag,
  status = 'neutral',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const statusBorder = {
    match: 'border-emerald-500/40 text-emerald-400',
    mismatch: 'border-rose-500/50 text-rose-400 bg-rose-950/20',
    neutral: 'border-slate-800 text-slate-300'
  }[status];

  const displayText = truncate && !expanded ? formatHashShort(hash, 10, 8) : hash;

  return (
    <div className={`p-2.5 rounded-lg bg-slate-950/60 border ${statusBorder} ${className}`}>
      <div className="flex items-center justify-between gap-2 text-xs mb-1">
        <span className="text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1">
          <Hash className="w-3.5 h-3.5 text-slate-400" />
          {label}
        </span>
        {tag && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            {tag}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <span
          onClick={() => setExpanded(!expanded)}
          title="Click to toggle full hash"
          className="font-mono text-xs tracking-tight select-all cursor-pointer break-all hover:text-white"
        >
          {displayText}
        </span>

        {copyable && (
          <button
            onClick={handleCopy}
            title="Copy hash to clipboard"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
