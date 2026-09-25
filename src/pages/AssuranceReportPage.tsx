import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  CheckCircle2,
  BookOpen,
  Award,
  Layers,
  Fingerprint,
  Calendar,
  Lock
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { formatTimestamp } from '../utils/helpers';
import { RESEARCH_REFERENCES } from '../data/mockData';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';
import { formatHashShort } from '../utils/crypto';

export const AssuranceReportPage: React.FC = () => {
  const { state } = useApp();
  const [reportGeneratedAt, setReportGeneratedAt] = useState(formatTimestamp());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshReport = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setReportGeneratedAt(formatTimestamp());
      setIsRefreshing(false);
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  const overallStatus = state.governance.status;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Header (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            FORMAL SOVEREIGN ASSURANCE DOSSIER
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
            TRUST-CV Assurance Report
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Generated defense certification report for sovereign procurement audit and military command validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/80 text-slate-200 text-xs font-mono font-semibold transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'REFRESHING...' : 'RE-EVALUATE REPORT'}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <Printer className="w-3.5 h-3.5" />
            PRINT / EXPORT REPORT
          </button>
        </div>
      </div>

      {/* Main Printable Dossier Container */}
      <div className="p-8 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 space-y-8 shadow-2xl glow-card">
        {/* Dossier Header */}
        <div className="border-b-2 border-slate-700/80 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                MoD / Indian Army DGIS — PS 26228
              </span>
              <span className="text-xs font-mono text-slate-400">RESTRICTED AIR-GAPPED EVALUATION</span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-2">
              AI System Integrity Assurance Audit Dossier
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Evaluation Reference: <strong className="text-white">MOD-DGIS-TRUSTCV-CERT-01</strong> • Report Timestamp: {reportGeneratedAt}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              COMPOSITE SYSTEM STATUS
            </span>
            <div className="mt-1">
              <StatusBadge status={overallStatus} type="decision" size="lg" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Trust Score: <strong className="text-white">{state.systemTrustScore}%</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Status */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-2 border-b border-slate-800 pb-1.5">
            <span>1.0</span> Executive Status & Governance Consensus
          </h3>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Formal Verdict:</span>
              <StatusBadge status={state.governance.status} type="decision" size="sm" />
            </div>
            <div>
              <span className="text-slate-400">Decision Reason:</span>
              <div className="text-white font-medium mt-1 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                {state.governance.reason}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Consensus Evidence Basis:</span>
              <ul className="list-disc pl-5 text-slate-300 space-y-1 mt-1">
                {state.governance.evidence.map((ev, i) => (
                  <li key={i}>{ev}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 & 3: Data & Model Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 2: Data Integrity */}
          <section className="space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-1.5">
              <span>2.0</span> Training Data Integrity
            </h3>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Corpus:</span>
                <span className="text-white font-bold">{state.dataset.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Samples Scanned:</span>
                <span className="text-white">{state.dataset.totalSamples.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Poisoned Samples:</span>
                <span className={state.dataset.poisonedSamples > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {state.dataset.poisonedSamples}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duplicate Samples:</span>
                <span className={state.dataset.duplicateSamples > 100 ? 'text-amber-400 font-bold' : 'text-white'}>
                  {state.dataset.duplicateSamples.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Integrity Score:</span>
                <span className="text-cyan-400 font-bold">{state.dataset.integrityScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Boundary Status:</span>
                <StatusBadge status={state.dataset.status} size="sm" />
              </div>
            </div>
          </section>

          {/* Section 3: Model Integrity */}
          <section className="space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-1.5">
              <span>3.0</span> Model Checkpoint Integrity
            </h3>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Model Name:</span>
                <span className="text-white font-bold">{state.model.modelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fingerprint:</span>
                <span className="text-white">{formatHashShort(state.model.modelHash, 8, 6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fingerprint Status:</span>
                <span className={state.model.fingerprintStatus === 'MATCH' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {state.model.fingerprintStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trigger Risk (TrojAI):</span>
                <span className={state.model.triggerRisk === 'HIGH' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {state.model.triggerRisk}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Activation Anomaly:</span>
                <span className={state.model.activationAnomaly === 'NONE' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {state.model.activationAnomaly}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Integrity Score:</span>
                <span className="text-cyan-400 font-bold">{state.model.integrityScore}%</span>
              </div>
            </div>
          </section>
        </div>

        {/* Section 4 & 5: Inference Output & Distribution Shift */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 4: Inference Integrity */}
          <section className="space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-1.5">
              <span>4.0</span> Inference Output & Steganographic Seal
            </h3>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Inference ID:</span>
                <span className="text-white font-bold">{state.inference.inferenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Steganographic Seal:</span>
                <span className={state.inference.sealStatus === 'VERIFIED' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {state.inference.sealStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ed25519 Signature:</span>
                <span className={state.inference.signatureStatus === 'VALID' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {state.inference.signatureStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nonce & Sequence:</span>
                <span className="text-slate-300">{state.inference.nonce} (Seq #{state.inference.sequenceNumber})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Temporal Merkle Root:</span>
                <span className="text-cyan-400 font-bold">{formatHashShort(state.inference.temporalRootHash, 8, 6)}</span>
              </div>
            </div>
          </section>

          {/* Section 5: Distribution Shift */}
          <section className="space-y-3 font-mono text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-1.5">
              <span>5.0</span> Environmental Distribution Shift
            </h3>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Active Scenario:</span>
                <span className="text-white font-bold">{state.distribution.currentScenario}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">MMD Metric:</span>
                <span className="text-white">{state.distribution.scenarios[state.distribution.currentScenario].mmd}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wasserstein (W₁):</span>
                <span className="text-white">{state.distribution.scenarios[state.distribution.currentScenario].wasserstein}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Classification:</span>
                <span className={state.distribution.scenarios[state.distribution.currentScenario].classification === 'MALICIOUS_SHIFT' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {state.distribution.scenarios[state.distribution.currentScenario].classification}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scenario Decision:</span>
                <StatusBadge status={state.distribution.scenarios[state.distribution.currentScenario].decision} type="decision" size="sm" />
              </div>
            </div>
          </section>
        </div>

        {/* Section 6: Contributor Trust Table */}
        <section className="space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-1.5">
            <span>6.0</span> Contributor Trust & Supply Chain Telemetry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                  <th className="pb-1.5">Contributor / Vendor</th>
                  <th className="pb-1.5">Samples</th>
                  <th className="pb-1.5">Models</th>
                  <th className="pb-1.5">Integrity Events</th>
                  <th className="pb-1.5">Provenance Rate</th>
                  <th className="pb-1.5">Risk Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {state.dataset.contributors.map(c => (
                  <tr key={c.id}>
                    <td className="py-2 text-white font-semibold">{c.name}</td>
                    <td className="py-2 text-slate-300">{c.samplesContributed.toLocaleString()}</td>
                    <td className="py-2 text-slate-300">{c.modelsSubmitted}</td>
                    <td className="py-2">
                      <span className={c.integrityEvents > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                        {c.integrityEvents}
                      </span>
                    </td>
                    <td className="py-2 text-cyan-400">{c.provenanceCompleteness}%</td>
                    <td className="py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        c.riskLevel === 'HIGH' ? 'bg-rose-950 text-rose-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {c.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: Audit Ledger Evidence */}
        <section className="space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-1.5">
            <span>7.0</span> Key Audit Ledger Events (Most Recent 5)
          </h3>

          <div className="space-y-1.5">
            {state.auditEvents.slice(0, 5).map(evt => (
              <div key={evt.id} className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-bold">{evt.id}</span>
                  <span className="text-white font-semibold">{evt.event}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{evt.source}</span>
                  <StatusBadge status={evt.decision} type="decision" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Research and Reference Taxonomy */}
        <section className="space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>8.0</span> Factual Cybersecurity & AI Standards Reference
          </h3>
          <p className="text-[11px] text-slate-400">
            TRUST-CV architecture aligns with the following international and defense standards:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RESEARCH_REFERENCES.map(ref => (
              <div key={ref.code} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-cyan-400 font-bold text-xs mb-1">
                  <span>{ref.code}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{ref.organization}</span>
                </div>
                <div className="text-white font-semibold text-[11px]">{ref.title}</div>
                <div className="text-slate-400 text-[10px] mt-1">{ref.focus}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Official Sovereign Stamp & Signoff */}
        <div className="pt-6 border-t-2 border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>AIR-GAPPED SOVEREIGN AI ASSURANCE ENGINE • DGIS DEFENSE CORRIDOR</span>
          </div>

          <div className="text-right">
            <span>CERTIFICATION: <strong className="text-white">DGIS-PS26228-CERT</strong></span>
          </div>
        </div>
      </div>

      <JudgeAnnotation
        title="FORMAL DEFENSE INTEGRITY CERTIFICATION"
        whyItMatters="High-ranking defense officials and procurement officers require a consolidated, tamper-evident assurance dossier that fuses all three trust boundaries into an actionable legal document with mathematical provenance."
        defenseContext="Prepares computer-vision pipelines for formal sovereign operational sign-off."
      />
    </div>
  );
};
