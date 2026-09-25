import React from 'react';
import {
  CloudSun,
  Moon,
  CloudRain,
  Camera,
  Mountain,
  AlertOctagon,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { DistributionScenarioType } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';

export const DistributionShiftPage: React.FC = () => {
  const { state, setDistributionScenario } = useApp();
  const { distribution } = state;
  const current = distribution.scenarios[distribution.currentScenario];

  const scenariosList: { type: DistributionScenarioType; label: string; icon: any }[] = [
    { type: 'NORMAL', label: 'Daylight Baseline', icon: CloudSun },
    { type: 'NIGHT', label: 'Night / Low-Light', icon: Moon },
    { type: 'WEATHER', label: 'Fog / Monsoon Rain', icon: CloudRain },
    { type: 'SENSOR_CHANGE', label: 'Sensor Payload Swap', icon: Camera },
    { type: 'TERRAIN_CHANGE', label: 'Glacial / High Altitude', icon: Mountain },
    { type: 'ADVERSARIAL_INPUT', label: 'Adversarial Perturbation', icon: AlertOctagon }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <CloudSun className="w-3.5 h-3.5" />
          ENGINE 4 — STATISTICAL DISTRIBUTION SHIFT & ADVERSARIAL DISCRIMINATION
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
          Environmental Shift vs Adversarial Drift
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Distinguishing legitimate optical & atmospheric variations from malicious adversarial attacks using Maximum Mean Discrepancy (MMD) and Wasserstein Distance.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Select Operational Environment Scenario (Click to simulate transition):</span>
          <span className="text-[10px] font-mono text-cyan-400">REAL-TIME EVIDENCE FUSION</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {scenariosList.map(sc => {
            const Icon = sc.icon;
            const isSelected = distribution.currentScenario === sc.type;
            const isAdv = sc.type === 'ADVERSARIAL_INPUT';

            return (
              <button
                key={sc.type}
                onClick={() => setDistributionScenario(sc.type)}
                className={`p-3 rounded-lg border text-left font-mono transition-all flex flex-col justify-between ${
                  isSelected
                    ? isAdv
                      ? 'border-rose-500 bg-rose-950/50 text-rose-300 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                      : 'border-cyan-500 bg-cyan-950/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? (isAdv ? 'text-rose-400' : 'text-cyan-400') : 'text-slate-500'}`} />
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
                </div>
                <div>
                  <div className="text-xs font-bold truncate text-white">{sc.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                    {sc.type === 'NORMAL' ? 'ACCEPT' : sc.type === 'ADVERSARIAL_INPUT' ? 'QUARANTINE' : 'REVIEW'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Scenario Diagnostics Card */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white telemetry-mono">
                SCENARIO: {current.label}
              </span>
              <StatusBadge status={current.decision} type="decision" size="sm" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{current.description}</p>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">DRIFT LEVEL</span>
              <span className={`text-base font-bold ${current.driftLevel === 'HIGH' ? 'text-rose-400' : current.driftLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {current.driftLevel}
              </span>
            </div>
            <div className="text-right border-l border-slate-800 pl-4">
              <span className="text-slate-500 block text-[10px]">FUSION CONFIDENCE</span>
              <span className="text-base font-bold text-cyan-400">{current.confidence}%</span>
            </div>
          </div>
        </div>

        {/* Statistical Distance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">
              Maximum Mean Discrepancy (MMD)
            </span>
            <div className="text-xl font-bold text-white telemetry-mono mt-0.5">
              {current.mmd}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Calibrated Baseline &lt; 0.15</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">
              Wasserstein Distance (W₁)
            </span>
            <div className="text-xl font-bold text-white telemetry-mono mt-0.5">
              {current.wasserstein}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Latent Manifold Divergence</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">
              Shift Classification
            </span>
            <div className={`text-xs font-bold telemetry-mono mt-1 ${
              current.classification === 'MALICIOUS_SHIFT' ? 'text-rose-400' : current.classification === 'LEGITIMATE_SHIFT' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {current.classification}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Evidence Fusion Engine</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500">
              Autonomous Governance
            </span>
            <div className="text-sm font-bold text-white telemetry-mono mt-0.5">
              <StatusBadge status={current.decision} type="decision" size="sm" />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Real-time Policy Enactment</div>
          </div>
        </div>

        {/* Evidence Analysis Callout */}
        <div className="mt-4 p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
          <div className="font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Statistical Evidence Analysis:
          </div>
          <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
            {current.evidenceText}
          </p>
        </div>
      </div>

      {/* Baseline vs Current Distribution Feature Comparison */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              Feature Space Comparison: Baseline Distribution vs Current Observation
            </h3>
            <p className="text-[11px] text-slate-400">
              Normalized latent metrics across 5 critical computer-vision sensory features.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded bg-slate-600" />
              <span className="text-slate-400">Baseline Calibration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-2 rounded ${current.type === 'ADVERSARIAL_INPUT' ? 'bg-rose-500' : 'bg-cyan-500'}`} />
              <span className={current.type === 'ADVERSARIAL_INPUT' ? 'text-rose-400 font-bold' : 'text-cyan-400 font-bold'}>
                Current Observation
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {current.featureDrift.map((feat, idx) => {
            const diff = Math.abs(feat.current - feat.baseline).toFixed(2);
            const isSevere = Math.abs(feat.current - feat.baseline) > 0.35;

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-medium">{feat.feature}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">Base: {feat.baseline}</span>
                    <span className="text-white font-bold">Obs: {feat.current}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      isSevere ? 'bg-rose-950 text-rose-400 border border-rose-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Δ {diff}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Baseline bar */}
                  <div className="h-2 rounded bg-slate-950 overflow-hidden">
                    <div
                      className="bg-slate-600 h-full rounded"
                      style={{ width: `${feat.baseline * 100}%` }}
                    />
                  </div>
                  {/* Current observation bar */}
                  <div className="h-2 rounded bg-slate-950 overflow-hidden">
                    <div
                      className={`h-full rounded ${
                        current.type === 'ADVERSARIAL_INPUT' && isSevere ? 'bg-rose-500 animate-pulse' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${feat.current * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <JudgeAnnotation
        title="WHY THE 'REVIEW' DECISION IS ESSENTIAL (NOT ALL ANOMALIES ARE ATTACKS)"
        whyItMatters="A naive defense system that flags every distribution anomaly as an attack would trigger constant false alarms whenever fog, rain, or nightfall occurs, blinding human commanders. TRUST-CV distinguishes physical natural shifts (which warrant HUMAN-IN-THE-LOOP REVIEW) from adversarial perturbation attacks (which trigger QUARANTINE)."
        defenseContext="Preserves operational continuity across diverse Indian geographic theaters (Siachen snow, Thar desert dust, Assam rain)."
      />
    </div>
  );
};
