import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const FooterDisclaimer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#070A10] py-2 px-4 sm:px-6 flex-shrink-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-400 select-none no-print min-w-0">
      <div className="flex items-center gap-2 min-w-0">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-slate-300 font-medium truncate">
          MoD / Indian Army DGIS • TRUST-CV Autonomous Layer (PS-26228)
        </span>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 shrink-0">
        <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
        <span className="truncate">Air-Gapped Sovereign Security Corridor • FIPS 180-4 / 186-5</span>
      </div>
    </footer>
  );
};
