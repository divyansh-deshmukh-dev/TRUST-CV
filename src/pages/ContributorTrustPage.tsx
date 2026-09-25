import React from 'react';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Key,
  Database,
  Cpu,
  FileCheck2,
  AlertTriangle,
  History
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';
import { formatHashShort } from '../utils/crypto';

export const ContributorTrustPage: React.FC = () => {
  const { state } = useApp();
  const { contributors } = state.dataset;

  const timelineEvents = [
    {
      time: '12m ago',
      contributor: 'Vendor-A (Electro-Optics Corp)',
      action: 'Submitted batch #842 (320 samples) with valid Ed25519 sensor signatures.',
      status: 'VERIFIED',
      type: 'INFO'
    },
    {
      time: '44m ago',
      contributor: 'Vendor-B (Apex Vision Labs)',
      action: state.dataset.poisonedSamples > 0
        ? 'ALERT: Spectral anomaly detected in thermal augmentation partition. 147 samples flagged.'
        : 'Submitted thermal IR augmentation partition (500 samples). Spectral checks passed.',
      status: state.dataset.poisonedSamples > 0 ? 'FLAGGED' : 'VERIFIED',
      type: state.dataset.poisonedSamples > 0 ? 'WARNING' : 'INFO'
    },
    {
      time: '2h ago',
      contributor: 'Vendor-C (Kavach Autonomous)',
      action: 'Completed quantized edge weight validation for YOLOv8 backbone.',
      status: 'VERIFIED',
      type: 'INFO'
    },
    {
      time: '5h ago',
      contributor: 'Vendor-D (GeoAI Defense Sys)',
      action: state.dataset.duplicateSamples > 100
        ? 'Duplicate perceptual hash flooding detected (1,840 redundant frames).'
        : 'Uploaded aerial synthetic terrain patches.',
      status: state.dataset.duplicateSamples > 100 ? 'FLAGGED' : 'VERIFIED',
      type: state.dataset.duplicateSamples > 100 ? 'WARNING' : 'INFO'
    },
    {
      time: '1d ago',
      contributor: 'Research Partner (IIT Consortium)',
      action: 'Published adversarial robustness benchmark report against clean-label evasion.',
      status: 'VERIFIED',
      type: 'INFO'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          MULTI-VENDOR ECOSYSTEM GOVERNANCE
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
          Contributor Trust & Supply Chain Telemetry
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Evaluating defense vendor reputation, cryptographic non-repudiation keys, and historical integrity events without hardcoded vendor prejudice.
        </p>
      </div>

      {/* Contributor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.map(c => {
          const isHighRisk = c.riskLevel === 'HIGH';
          const isMedRisk = c.riskLevel === 'MEDIUM';

          return (
            <div
              key={c.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isHighRisk
                  ? 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                  : isMedRisk
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                      {c.name}
                    </h3>
                    <div className="text-xs text-slate-400 mt-0.5 font-medium">{c.role}</div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                      isHighRisk
                        ? 'bg-rose-950 text-rose-400 border-rose-500/50'
                        : isMedRisk
                        ? 'bg-amber-950 text-amber-400 border-amber-500/50'
                        : 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                    }`}
                  >
                    {c.riskLevel} RISK
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">Samples Ingested</span>
                    <span className="text-white font-bold text-sm mt-0.5 block">
                      {c.samplesContributed.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">Models Submitted</span>
                    <span className="text-white font-bold text-sm mt-0.5 block">
                      {c.modelsSubmitted}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">Integrity Events</span>
                    <span className={`font-bold text-sm mt-0.5 block ${c.integrityEvents > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {c.integrityEvents}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">Provenance Rate</span>
                    <span className="text-cyan-400 font-bold text-sm mt-0.5 block">
                      {c.provenanceCompleteness}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-2 rounded bg-slate-950/50 border border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>KEY: {c.publicFingerprint}</span>
                  <span className="text-slate-500">{c.lastActivity}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[10px]">
                  STATUS: <strong className="text-white">{c.status}</strong>
                </span>
                <StatusBadge status={c.status} size="sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Contributor Action Timeline */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            Ecosystem Contribution Timeline & Event Stream
          </h3>
          <span className="text-[10px] font-mono text-slate-500">LIVE AIR-GAPPED BUS</span>
        </div>

        <div className="space-y-2.5">
          {timelineEvents.map((evt, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 ${
                evt.type === 'WARNING'
                  ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-start md:items-center gap-2.5">
                <span className="text-[10px] text-slate-500 flex-shrink-0">{evt.time}</span>
                <div>
                  <span className="font-bold text-white mr-2">{evt.contributor}:</span>
                  <span className="text-slate-300 text-[11px]">{evt.action}</span>
                </div>
              </div>

              <StatusBadge status={evt.status} size="sm" className="self-start md:self-auto" />
            </div>
          ))}
        </div>
      </div>

      <JudgeAnnotation
        title="WHY CONTRIBUTOR TRUST SCORING IS DEFENSIVE, NOT PUNITIVE"
        whyItMatters="In sovereign military supply chains, vendors frequently subcontract data gathering. TRUST-CV continuously tracks provenance completeness and anomaly frequency. If a vendor partition contains poisoned samples, the system isolates only that vendor's contribution rather than throwing away the entire project."
        defenseContext="Protects DGIS pipelines from compromised third-party sensor vendors without terminating contract operations."
      />
    </div>
  );
};
