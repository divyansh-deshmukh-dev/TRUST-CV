import React from 'react';
import {
  Database,
  Search,
  AlertTriangle,
  Copy,
  RefreshCw,
  Users,
  PieChart,
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';

export const DataIntegrityPage: React.FC = () => {
  const {
    state,
    scanDataset,
    simulatePoisoning,
    simulateDuplicateFlooding,
    simulateOodInsertion,
    resetDataset
  } = useApp();

  const { dataset } = state;

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            ENGINE 1 — DATA INTEGRITY ENGINE
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
            Multi-Contributor Training Data Integrity
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Detecting poisoned samples, duplicate flooding, out-of-distribution (OOD) contamination, and spectral anomalies across sovereign defense vendors.
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={scanDataset}
            disabled={dataset.isScanning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-mono tracking-wide transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] ${
              dataset.isScanning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${dataset.isScanning ? 'animate-spin' : ''}`} />
            {dataset.isScanning ? 'SCANNING DATASET...' : 'SCAN DATASET'}
          </button>

          <button
            onClick={simulatePoisoning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-500/50 text-rose-300 text-xs font-semibold font-mono tracking-wide transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            SIMULATE POISONING
          </button>

          <button
            onClick={simulateDuplicateFlooding}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-500/50 text-amber-300 text-xs font-semibold font-mono tracking-wide transition-all"
          >
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            SIMULATE DUPLICATE FLOODING
          </button>

          <button
            onClick={simulateOodInsertion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-300 text-xs font-semibold font-mono tracking-wide transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-indigo-400" />
            SIMULATE OOD INSERTION
          </button>

          <button
            onClick={resetDataset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold font-mono transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            RESET DATASET
          </button>
        </div>
      </div>

      {/* Dataset Overview Summary Card */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white telemetry-mono">
                DATASET: {dataset.name}
              </span>
              <StatusBadge status={dataset.status} size="sm" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Format: <span className="font-mono text-cyan-300">{dataset.format}</span> • Ingestion Partition: <span className="text-slate-300">Defense Sovereign Corridor</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">INTEGRITY SCORE</span>
              <span className={`text-xl font-bold ${dataset.integrityScore < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {dataset.integrityScore}%
              </span>
            </div>
            <div className="text-right border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">CONTRIBUTOR RISK</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border uppercase ${
                dataset.contributorRisk === 'HIGH' ? 'text-rose-400 border-rose-500/40 bg-rose-950/40' : 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
              }`}>
                {dataset.contributorRisk}
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Total Samples</span>
            <div className="text-lg font-bold text-white telemetry-mono mt-0.5">
              {dataset.totalSamples.toLocaleString()}
            </div>
          </div>

          <div className={`p-3 rounded-lg bg-slate-950 border ${dataset.poisonedSamples > 0 ? 'border-rose-500/50 bg-rose-950/20' : 'border-slate-800/80'}`}>
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Poisoned Samples</span>
            <div className={`text-lg font-bold telemetry-mono mt-0.5 ${dataset.poisonedSamples > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {dataset.poisonedSamples}
            </div>
          </div>

          <div className={`p-3 rounded-lg bg-slate-950 border ${dataset.duplicateSamples > 100 ? 'border-amber-500/50 bg-amber-950/20' : 'border-slate-800/80'}`}>
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Duplicate Samples</span>
            <div className={`text-lg font-bold telemetry-mono mt-0.5 ${dataset.duplicateSamples > 100 ? 'text-amber-400' : 'text-slate-200'}`}>
              {dataset.duplicateSamples.toLocaleString()}
            </div>
          </div>

          <div className={`p-3 rounded-lg bg-slate-950 border ${dataset.oodSamples > 50 ? 'border-amber-500/50 bg-amber-950/20' : 'border-slate-800/80'}`}>
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">OOD Samples</span>
            <div className={`text-lg font-bold telemetry-mono mt-0.5 ${dataset.oodSamples > 50 ? 'text-amber-400' : 'text-slate-200'}`}>
              {dataset.oodSamples}
            </div>
          </div>

          <div className={`p-3 rounded-lg bg-slate-950 border ${dataset.spectralAnomalies > 10 ? 'border-rose-500/50 bg-rose-950/20' : 'border-slate-800/80'}`}>
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Spectral Anomalies</span>
            <div className={`text-lg font-bold telemetry-mono mt-0.5 ${dataset.spectralAnomalies > 10 ? 'text-rose-400' : 'text-slate-200'}`}>
              {dataset.spectralAnomalies}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Anomaly Distribution */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Category Breakdown & Spectral Anomalies
            </h3>
            <span className="text-[10px] font-mono text-slate-500">COCO DEFENSE LABELS</span>
          </div>

          <div className="space-y-3">
            {dataset.categories.map((cat, idx) => {
              const anomalyRate = ((cat.anomalies / cat.count) * 100).toFixed(1);
              const isFlagged = cat.anomalies > 0;

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-medium truncate">{cat.name}</span>
                    <span className="text-slate-400">
                      {cat.count} samples {isFlagged && <span className="text-rose-400 font-bold ml-1">({cat.anomalies} flagged)</span>}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden flex">
                    <div
                      className="bg-cyan-600 h-full rounded-l"
                      style={{ width: `${Math.max(10, ((cat.count - cat.anomalies) / 4000) * 100)}%` }}
                    />
                    {isFlagged && (
                      <div
                        className="bg-rose-500 h-full animate-pulse"
                        style={{ width: `${Math.max(8, (cat.anomalies / 150) * 100)}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contributor Distribution & Anomaly Cluster */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Multi-Vendor Contribution Partitioning
            </h3>
            <span className="text-[10px] font-mono text-slate-500">6 PARTICIPATING VENDORS</span>
          </div>

          <div className="space-y-3">
            {dataset.contributors.map(c => {
              const percentage = ((c.samplesContributed / dataset.totalSamples) * 100).toFixed(1);
              const isVendorHighRisk = c.riskLevel === 'HIGH';

              return (
                <div
                  key={c.id}
                  className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                    isVendorHighRisk
                      ? 'border-rose-500/50 bg-rose-950/20 text-rose-200'
                      : 'border-slate-800/80 bg-slate-950/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white">{c.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isVendorHighRisk ? 'bg-rose-950 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {c.riskLevel} RISK
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{c.samplesContributed.toLocaleString()} samples ({percentage}%)</span>
                    <span>Provenance: {c.provenanceCompleteness}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contributor Auditing Table */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Multi-Contributor Inspection & Anomaly Ledger
          </h3>
          <span className="text-[11px] font-mono text-slate-500">SIMULATED BENCHMARK TELEMETRY</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-2">Contributor</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Samples</th>
                <th className="pb-2">Integrity Events</th>
                <th className="pb-2">Provenance</th>
                <th className="pb-2">Risk</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dataset.contributors.map(c => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 font-semibold text-white">{c.name}</td>
                  <td className="py-2.5 text-slate-400">{c.role}</td>
                  <td className="py-2.5 text-slate-300">{c.samplesContributed.toLocaleString()}</td>
                  <td className="py-2.5">
                    <span className={c.integrityEvents > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                      {c.integrityEvents}
                    </span>
                  </td>
                  <td className="py-2.5 text-cyan-400">{c.provenanceCompleteness}%</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.riskLevel === 'HIGH'
                          ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          : c.riskLevel === 'MEDIUM'
                          ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {c.riskLevel}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <JudgeAnnotation
        title="WHY DATA INTEGRITY DEFENSE MATTERS FOR MoD / DGIS"
        whyItMatters="In multi-vendor defense AI projects, training sets are aggregated from private defense contractors, academic partners, and external sensing units. An adversary can execute 'Clean-Label Poisoning' (embedding invisible trigger patterns without altering the ground truth label). When tested normally, the model appears accurate, but a specific physical decoy triggers a target miss."
        defenseContext="Spectral anomaly detection isolates poisoned partitions before model fine-tuning begins."
      />
    </div>
  );
};
