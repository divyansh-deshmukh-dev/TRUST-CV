import React, { useState } from 'react';
import {
  FlaskConical,
  Database,
  Cpu,
  Fingerprint,
  CloudSun,
  AlertTriangle,
  Flame,
  Binary,
  Layers,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { SneakernetPanel } from '../components/simulation/SneakernetPanel';
import { StatusBadge } from '../components/common/StatusBadge';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';

export const AttackSimulationLab: React.FC = () => {
  const {
    state,
    simulatePoisoning,
    simulateDuplicateFlooding,
    simulateOodInsertion,
    simulateBackdoor,
    simulateModelSubstitution,
    simulateTampering,
    restoreInference,
    setDistributionScenario,
    resetSystem
  } = useApp();

  const [lastSimulatedAttack, setLastSimulatedAttack] = useState<string | null>(null);

  const handleSimulate = (name: string, action: () => void) => {
    action();
    setLastSimulatedAttack(name);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5" />
            CONTROLLED VALIDATION HARNESS
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
            Attack Simulation & Threat Verification Lab
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Execute controlled defensive simulations across all 3 trust boundaries to test autonomous anomaly detection and governance containment.
          </p>
        </div>

        <button
          onClick={() => {
            resetSystem();
            setLastSimulatedAttack(null);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-200 text-xs font-mono font-semibold transition-all self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          RESET ALL SIMULATIONS
        </button>
      </div>

      {/* Reactive Attack Impact Flow Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="text-[10px] uppercase font-mono font-bold text-slate-400 mb-2">
          Real-Time Threat Containment Pipeline Flow
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase font-bold">1. SIMULATED EVENT</div>
            <div className="text-white font-bold truncate mt-0.5">
              {lastSimulatedAttack || 'System Baseline Nominal'}
            </div>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase font-bold">2. DETECTION ENGINE</div>
            <div className="text-cyan-400 font-bold truncate mt-0.5">
              {state.governance.sourceEngine}
            </div>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase font-bold">3. EVIDENCE CONFIDENCE</div>
            <div className="text-amber-400 font-bold mt-0.5">
              {state.governance.confidence}% Certainty
            </div>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase font-bold">4. GOVERNANCE DECISION</div>
            <div className="mt-0.5">
              <StatusBadge status={state.governance.status} type="decision" size="sm" />
            </div>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase font-bold">5. AUDIT DISPATCH</div>
            <div className="text-emerald-400 font-bold truncate mt-0.5">
              COMMITTED ({state.auditEvents[0]?.id})
            </div>
          </div>
        </div>
      </div>

      {/* 4 Attack Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category 1: Training Data Attacks */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Database className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Data Boundary Attacks
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Attacks targeting the training corpus before weight convergence.
            </p>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => handleSimulate('Poisoned Training Data (Clean-Label)', simulatePoisoning)}
                className="w-full text-left p-2.5 rounded-lg border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE POISONED DATA]</span>
                <Flame className="w-3.5 h-3.5 text-rose-400" />
              </button>

              <button
                onClick={() => handleSimulate('Duplicate Perceptual Flooding', simulateDuplicateFlooding)}
                className="w-full text-left p-2.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE DUPLICATE FLOOD]</span>
                <Layers className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                onClick={() => handleSimulate('OOD Domain Insertion', simulateOodInsertion)}
                className="w-full text-left p-2.5 rounded-lg border border-indigo-500/40 bg-indigo-950/30 hover:bg-indigo-900/50 text-indigo-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE OOD INSERTION]</span>
                <AlertTriangle className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
            Target: Vendor partition isolation & spectral filters
          </div>
        </div>

        {/* Category 2: Model Weights Attacks */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Model Weights Attacks
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Attacks altering binary weights or embedding hidden Trojan triggers.
            </p>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => handleSimulate('Hidden Trojan Backdoor Trigger', simulateBackdoor)}
                className="w-full text-left p-2.5 rounded-lg border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE BACKDOOR]</span>
                <Flame className="w-3.5 h-3.5 text-rose-400" />
              </button>

              <button
                onClick={() => handleSimulate('Supply Chain Model Substitution', simulateModelSubstitution)}
                className="w-full text-left p-2.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE SUBSTITUTION]</span>
                <Binary className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
            Target: NIST TrojAI activation heatmap & SHA-256
          </div>
        </div>

        {/* Category 3: Output & Inference Attacks */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                3. Output & Seal Attacks
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Attacks altering output bounding boxes or breaking cryptographic seal.
            </p>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => handleSimulate('Inference Image Tampering (Pixel Seal Break)', simulateTampering)}
                className="w-full text-left p-2.5 rounded-lg border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE IMAGE TAMPERING]</span>
                <Flame className="w-3.5 h-3.5 text-rose-400" />
              </button>

              <button
                onClick={() => handleSimulate('Provenance Hash Severance', simulateTampering)}
                className="w-full text-left p-2.5 rounded-lg border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE PROVENANCE BREAK]</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
            Target: Steganographic pixel seal & Ed25519 signature
          </div>
        </div>

        {/* Category 4: Environmental Variations */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <CloudSun className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                4. Environmental Shifts
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Testing difference between benign physical drift and adversarial attacks.
            </p>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => handleSimulate('Night Low-Light Shift', () => setDistributionScenario('NIGHT'))}
                className="w-full text-left p-2.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE NIGHT SHIFT]</span>
                <CloudSun className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleSimulate('Monsoon Fog / Weather Shift', () => setDistributionScenario('WEATHER'))}
                className="w-full text-left p-2.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE WEATHER SHIFT]</span>
                <CloudSun className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleSimulate('Adversarial Perturbation Attack', () => setDistributionScenario('ADVERSARIAL_INPUT'))}
                className="w-full text-left p-2.5 rounded-lg border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-xs font-mono font-semibold transition-all flex items-center justify-between"
              >
                <span>[SIMULATE ADVERSARIAL]</span>
                <Flame className="w-3.5 h-3.5 text-rose-400" />
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
            Target: MMD / Wasserstein distance discrimination
          </div>
        </div>
      </div>

      {/* Sneakernet Air-Gapped Simulation Component */}
      <SneakernetPanel />

      <JudgeAnnotation
        title="CONTROLLED ADVERSARIAL VALIDATION LAB"
        whyItMatters="Defense security analysts require direct verification that defensive triggers activate under threat injection. The Attack Simulation Lab provides immediate, verifiable cause-and-effect validation: executing an attack injects anomalies, causing the trust score to adjust, the pixel seal to break, and the governance engine to enact QUARANTINE."
        defenseContext="Enables Indian Army validation teams to conduct red-team threat injections safely in air-gapped testbeds."
      />
    </div>
  );
};
