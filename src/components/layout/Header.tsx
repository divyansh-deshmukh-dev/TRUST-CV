import React, { useState, useEffect } from 'react';
import {
  Activity,
  Shield,
  Play,
  RotateCcw,
  HelpCircle,
  Clock,
  Radio,
  Sparkles,
  ExternalLink,
  Home
} from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { DemoRunnerModal } from '../simulation/DemoRunnerModal';

export const Header: React.FC = () => {
  const {
    state,
    setActivePage,
    resetSystem,
    toggleDemoMode,
    toggleJudgeMode,
    runFullDemoSequence
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-[#090E1A] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 z-20 select-none min-w-0">
      {/* Title & Telemetry */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xs sm:text-sm font-extrabold tracking-wide text-white uppercase telemetry-mono flex items-center gap-1.5 whitespace-nowrap">
              TRUST-CV
              <span className="text-slate-600 font-normal">|</span>
              <span className="text-cyan-400 font-semibold">AI INTEGRITY ASSURANCE</span>
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 inline-flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: OPERATIONAL
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5 whitespace-nowrap">
            <span className="text-sky-300">SOVEREIGN AIR-GAP</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-slate-500" />
              {currentTime}
            </span>
          </div>
        </div>
      </div>

      {/* Control Toggles & Guided Demo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Explainability Mode Toggle (Formerly Judge Mode) */}
        <button
          onClick={toggleJudgeMode}
          title="Toggle Architecture Explainability Insights"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all whitespace-nowrap ${
            state.judgeMode
              ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <HelpCircle className={`w-3.5 h-3.5 shrink-0 ${state.judgeMode ? 'text-cyan-400' : 'text-slate-500'}`} />
          <span>EXPLAINABILITY: {state.judgeMode ? 'ON' : 'OFF'}</span>
        </button>

        {/* System Verification Tour */}
        <button
          onClick={() => setShowDemoModal(true)}
          title="Run 9-Stage End-to-End Pipeline Verification Tour"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-bold font-mono tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all whitespace-nowrap"
        >
          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
          <span>SYSTEM TOUR</span>
        </button>

        {/* Reset System */}
        <button
          onClick={resetSystem}
          title="Reset entire system to calibrated sovereign baseline"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-all whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="hidden xl:inline">RESET SYSTEM</span>
          <span className="xl:hidden">RESET</span>
        </button>

        {/* Return to Home Page */}
        <button
          onClick={() => setActivePage('landing')}
          title="Return to Home Page"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 text-xs font-mono font-semibold transition-all whitespace-nowrap"
        >
          <Home className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>HOME</span>
        </button>
      </div>

      {/* Verification Tour Modal */}
      <DemoRunnerModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </header>
  );
};
