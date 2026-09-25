import React from 'react';
import {
  Cpu,
  Fingerprint,
  AlertOctagon,
  RefreshCw,
  Search,
  Activity,
  Layers,
  Terminal,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Binary
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { HashDisplay } from '../components/common/HashDisplay';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';

export const ModelIntegrityPage: React.FC = () => {
  const {
    state,
    analyzeModel,
    simulateBackdoor,
    simulateModelSubstitution,
    blackBoxTest,
    resetModel
  } = useApp();

  const { model } = state;

  return (
    <div className="space-y-6">
      {/* Title & Action Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            ENGINE 2 — MODEL INTEGRITY ENGINE
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
            AI Model Weights & Backdoor Assurance
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Detecting weight modifications, Trojan backdoor activation clusters (NIST TrojAI), and supply-chain model substitutions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={analyzeModel}
            disabled={model.isAnalyzing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-mono tracking-wide transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] ${
              model.isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${model.isAnalyzing ? 'animate-spin' : ''}`} />
            {model.isAnalyzing ? 'ANALYZING WEIGHTS...' : 'ANALYZE MODEL'}
          </button>

          <button
            onClick={simulateBackdoor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-500/50 text-rose-300 text-xs font-semibold font-mono tracking-wide transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            SIMULATE BACKDOOR
          </button>

          <button
            onClick={simulateModelSubstitution}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-500/50 text-amber-300 text-xs font-semibold font-mono tracking-wide transition-all"
          >
            <Binary className="w-3.5 h-3.5 text-amber-400" />
            SIMULATE SUBSTITUTION
          </button>

          <button
            onClick={blackBoxTest}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-300 text-xs font-semibold font-mono tracking-wide transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            BLACK-BOX TEST
          </button>

          <button
            onClick={resetModel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold font-mono transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            RESET MODEL
          </button>
        </div>
      </div>

      {/* Model Spec Card */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white telemetry-mono">
                {model.modelName} ({model.version})
              </span>
              <StatusBadge status={model.fingerprintStatus} size="sm" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Architecture: <span className="font-mono text-cyan-300">{model.architecture}</span> • Precision: FP16 Quantized
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">MODEL INTEGRITY SCORE</span>
              <span className={`text-xl font-bold ${model.integrityScore < 70 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {model.integrityScore}%
              </span>
            </div>
            <div className="text-right border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">TRIGGER RISK</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border uppercase ${
                model.triggerRisk === 'HIGH' ? 'text-rose-400 border-rose-500/40 bg-rose-950/40' : 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
              }`}>
                {model.triggerRisk}
              </span>
            </div>
          </div>
        </div>

        {/* Cryptographic Fingerprints Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <HashDisplay
            label="Baseline Sovereign Checkpoint Digest (FIPS 180-4 SHA-256)"
            hash={model.baselineHash}
            status="match"
            tag="SOVEREIGN REGISTRY"
          />

          <HashDisplay
            label="Current Runtime Model Binary Digest"
            hash={model.modelHash}
            status={model.fingerprintStatus === 'MATCH' ? 'match' : 'mismatch'}
            tag={model.fingerprintStatus === 'MATCH' ? 'MATCH' : 'MISMATCH'}
          />
        </div>

        {/* Weight Statistics & Health */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Weight Status</span>
            <div className={`text-sm font-bold telemetry-mono mt-0.5 ${model.weightStatus === 'NORMAL' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {model.weightStatus}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Weight Tensor Drift (σ)</span>
            <div className="text-sm font-bold text-white telemetry-mono mt-0.5">
              ±{model.weightDrift} σ
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Activation Anomaly</span>
            <div className={`text-sm font-bold telemetry-mono mt-0.5 ${model.activationAnomaly === 'NONE' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {model.activationAnomaly}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Metamorphic Test</span>
            <div className="text-sm font-bold text-cyan-400 telemetry-mono mt-0.5">
              {model.blackBoxStatus}
            </div>
          </div>
        </div>
      </div>

      {/* Activation Heatmap Visualization */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Layer-Wise Activation Spectrum & Trojan Cluster Analysis
            </h3>
            <p className="text-[11px] text-slate-400">
              Evaluating neural activation distributions across 32 hidden convolutional channels for backdoor trigger anomalies.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span className="text-slate-400">Nominal (0.2 - 0.7)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-rose-500 animate-pulse" />
              <span className="text-rose-400 font-bold">Suspicious Trigger (&gt;0.95)</span>
            </div>
          </div>
        </div>

        {/* 32 Neuron Cells */}
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-2">
          {model.activationHeatmap.map(neuron => {
            const isSpiked = neuron.isAnomalous;
            return (
              <div
                key={neuron.id}
                className={`p-2 rounded border font-mono text-center transition-all ${
                  isSpiked
                    ? 'border-rose-500 bg-rose-950/80 text-rose-300 shadow-[0_0_12px_rgba(239,68,68,0.4)] animate-pulse'
                    : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-cyan-500/50'
                }`}
              >
                <div className="text-[9px] text-slate-500 truncate">N-{neuron.id.toString().padStart(2, '0')}</div>
                <div className={`text-xs font-bold mt-1 ${isSpiked ? 'text-rose-400' : 'text-slate-200'}`}>
                  {neuron.activationScore}
                </div>
                <div className="text-[8px] uppercase mt-0.5 truncate text-slate-500">
                  {isSpiked ? 'TRIGGER' : 'NORM'}
                </div>
              </div>
            );
          })}
        </div>

        {model.suspiciousClusterDetected && (
          <div className="mt-4 p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 flex items-start gap-2.5 text-xs text-rose-200">
            <AlertOctagon className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white uppercase">Backdoor Cluster Signature Identified:</span>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Neurons N-16 through N-23 exhibit hyper-synchronized 0.985 activation spikes characteristic of a trigger-inversion Trojan implant (NIST TrojAI benchmark indicator).
              </p>
            </div>
          </div>
        )}
      </div>

      <JudgeAnnotation
        title="WHY MODEL WEIGHT & ACTIVATION ANALYSIS MATTERS"
        whyItMatters="A defense contractor could deliver a model where weights were altered or substituted just before deployment. Traditional test sets will pass with flying colors. TRUST-CV continuously verifies the cryptographic hash against the sovereign baseline and inspects internal activation distributions for hidden trigger pathways."
        defenseContext="Protects against Trojan attacks that disable vehicle detection upon seeing specific IR camouflage beacons."
      />
    </div>
  );
};
