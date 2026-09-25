import React from 'react';
import {
  LayoutDashboard,
  Database,
  Cpu,
  Fingerprint,
  CloudSun,
  Users,
  FlaskConical,
  FileCheck2,
  FileSpreadsheet,
  Shield,
  Radio,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useApp, PageRoute } from '../../state/AppContext';

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, state } = useApp();

  const navItems = [
    { id: 'overview' as PageRoute, label: '1. Overview', icon: LayoutDashboard },
    { id: 'data' as PageRoute, label: '2. Data Integrity', icon: Database, alert: state.dataset.status !== 'VERIFIED' },
    { id: 'model' as PageRoute, label: '3. Model Integrity', icon: Cpu, alert: state.model.triggerRisk !== 'LOW' || state.model.fingerprintStatus !== 'MATCH' },
    { id: 'inference' as PageRoute, label: '4. Inference Provenance', icon: Fingerprint, alert: state.inference.sealStatus !== 'VERIFIED' },
    { id: 'distribution' as PageRoute, label: '5. Distribution Shift', icon: CloudSun, alert: state.distribution.currentScenario !== 'NORMAL' },
    { id: 'contributors' as PageRoute, label: '6. Contributor Trust', icon: Users, alert: state.dataset.contributors.some(c => c.riskLevel === 'HIGH') },
    { id: 'attack-lab' as PageRoute, label: '7. Attack Simulation Lab', icon: FlaskConical },
    { id: 'audit' as PageRoute, label: '8. Audit Vault', icon: FileCheck2 },
    { id: 'report' as PageRoute, label: '9. Assurance Report', icon: FileSpreadsheet }
  ];

  return (
    <aside className="w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between flex-shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.2)]">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-base font-black tracking-wider text-white telemetry-mono flex items-center gap-1.5">
                TRUST-CV
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] font-mono tracking-tight text-slate-400">
                AI Integrity Assurance Layer
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <button
            onClick={() => setActivePage('landing')}
            className="w-full mb-3 flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50 hover:border-cyan-500/60 transition-all shadow-[0_0_10px_rgba(6,182,212,0.12)]"
          >
            <div className="flex items-center gap-2 truncate">
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>← Home Page</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-200">Home</span>
          </button>

          <div className="px-3 py-1.5 text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
            Operational Engines
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.alert && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sidebar Badges */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 space-y-2">
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-[11px] space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>NODE ID</span>
            <span className="text-cyan-400 font-bold">DGIS-26228</span>
          </div>
          <div className="text-slate-300 font-semibold truncate">
            MoD / Indian Army DGIS
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            Defense Cyber &amp; AI Division
          </div>
        </div>

        <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 animate-pulse" />
            AIR-GAPPED SOVEREIGN
          </span>
          <Lock className="w-3 h-3" />
        </div>
      </div>
    </aside>
  );
};
