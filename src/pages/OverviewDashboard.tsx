import React from 'react';
import {
  Database,
  Cpu,
  Fingerprint,
  CloudSun,
  ShieldCheck,
  Scale,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  Terminal,
  Layers
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { RiskScore } from '../components/common/RiskScore';
import { StatusBadge } from '../components/common/StatusBadge';
import { PipelineWorkflow } from '../components/pipeline/PipelineWorkflow';
import { GovernanceDecisionCard } from '../components/governance/GovernanceDecisionCard';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';
import { formatHashShort } from '../utils/crypto';

export const OverviewDashboard: React.FC = () => {
  const { state, setActivePage } = useApp();

  const activeAlerts = state.auditEvents.filter(
    e => e.severity === 'CRITICAL' || e.severity === 'WARNING'
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <span>Sovereign Defense Telemetry</span>
            <span>•</span>
            <span>Node DGIS-26228</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
            AI Integrity Command Overview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time AI integrity monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('attack-lab')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-semibold font-mono tracking-wide transition-all shadow-[0_0_12px_rgba(239,68,68,0.2)] whitespace-nowrap"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            ATTACK SIMULATION LAB
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
        <MetricCard
          label="DATA INTEGRITY"
          value={`${state.dataset.integrityScore}%`}
          subtext={`${state.dataset.totalSamples.toLocaleString()} samples`}
          icon={Database}
          variant={state.dataset.integrityScore < 70 ? 'danger' : state.dataset.integrityScore < 90 ? 'warning' : 'accent'}
          badge={<StatusBadge status={state.dataset.status} size="sm" />}
          onClick={() => setActivePage('data')}
        />

        <MetricCard
          label="MODEL INTEGRITY"
          value={`${state.model.integrityScore}%`}
          subtext={state.model.fingerprintStatus}
          icon={Cpu}
          variant={state.model.triggerRisk !== 'LOW' || state.model.fingerprintStatus !== 'MATCH' ? 'danger' : 'default'}
          badge={<StatusBadge status={state.model.triggerRisk === 'LOW' ? 'VERIFIED' : 'ANOMALY'} size="sm" />}
          onClick={() => setActivePage('model')}
        />

        <MetricCard
          label="OUTPUT INTEGRITY"
          value={state.inference.sealStatus === 'VERIFIED' && !state.inference.isTampered ? '100%' : '42%'}
          subtext={state.inference.sealStatus === 'VERIFIED' ? 'Pixel Seal Valid' : 'Bitstream Tampered'}
          icon={Fingerprint}
          variant={state.inference.sealStatus === 'VERIFIED' ? 'default' : 'danger'}
          badge={<StatusBadge status={state.inference.sealStatus} size="sm" />}
          onClick={() => setActivePage('inference')}
        />

        <MetricCard
          label="PROVENANCE"
          value={state.inference.sealStatus === 'VERIFIED' ? 'VALID' : 'BROKEN'}
          subtext="Ed25519 Bound"
          icon={ShieldCheck}
          variant={state.inference.sealStatus === 'VERIFIED' ? 'default' : 'danger'}
          badge={<StatusBadge status={state.inference.signatureStatus} size="sm" />}
          onClick={() => setActivePage('inference')}
        />

        <MetricCard
          label="DISTRIBUTION"
          value={state.distribution.currentScenario}
          subtext={`MMD: ${state.distribution.scenarios[state.distribution.currentScenario].mmd}`}
          icon={CloudSun}
          variant={state.distribution.currentScenario === 'ADVERSARIAL_INPUT' ? 'danger' : state.distribution.currentScenario === 'NORMAL' ? 'default' : 'warning'}
          badge={<StatusBadge status={state.distribution.scenarios[state.distribution.currentScenario].driftLevel} size="sm" />}
          onClick={() => setActivePage('distribution')}
        />

        <MetricCard
          label="GOVERNANCE"
          value={`${state.governance.confidence}%`}
          subtext="Consensus Verdict"
          icon={Scale}
          variant={state.governance.status === 'ACCEPT' ? 'default' : state.governance.status === 'REVIEW' ? 'warning' : 'danger'}
          badge={<StatusBadge status={state.governance.status} type="decision" size="sm" />}
          onClick={() => setActivePage('overview')}
        />
      </div>

      {/* Visual Pipeline */}
      <PipelineWorkflow />

      {/* Primary Split: Trust Score & Governance Decision */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3.5">
          <RiskScore score={state.systemTrustScore} />

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                Trust Boundary Verification Matrix
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-300">1. Data Boundary:</span>
                <span className={state.dataset.status === 'VERIFIED' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {state.dataset.status} ({state.dataset.integrityScore}%)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-300">2. Model Boundary:</span>
                <span className={state.model.fingerprintStatus === 'MATCH' && state.model.triggerRisk === 'LOW' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {state.model.fingerprintStatus} ({state.model.integrityScore}%)
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-300">3. Inference Boundary:</span>
                <span className={state.inference.sealStatus === 'VERIFIED' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {state.inference.sealStatus} ({state.inference.sealStatus === 'VERIFIED' ? '100%' : '42%'})
                </span>
              </div>
            </div>

            <div className="pt-1 text-[11px] text-slate-400">
              Requires unanimous cross-boundary validation for automated <strong className="text-emerald-400">ACCEPT</strong> state.
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <GovernanceDecisionCard />
        </div>
      </div>

      {/* Secondary Split: Active Alerts & Recent Audit Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Active Alerts Panel */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Active Integrity Alerts ({activeAlerts.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">PRIORITY QUEUE</span>
          </div>

          {activeAlerts.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 font-mono">
              ✓ No critical integrity alerts. All multi-contributor pipelines nominal.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {activeAlerts.slice(0, 4).map(alert => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border text-xs ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                    <span className="font-bold">{alert.id} • {alert.source}</span>
                    <span className="opacity-80">{alert.timestamp}</span>
                  </div>
                  <div className="font-semibold text-white">{alert.event}</div>
                  <div className="text-[11px] text-slate-300 mt-1 truncate">{alert.evidence}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Audit Events */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 mb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Recent Cryptographic Audit Journal
              </h3>
            </div>
            <button
              onClick={() => setActivePage('audit')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold flex items-center gap-1 shrink-0"
            >
              View Vault <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {state.auditEvents.slice(0, 4).map(evt => (
              <div
                key={evt.id}
                className="p-2.5 rounded bg-slate-950/70 border border-slate-800 text-xs flex items-center justify-between gap-3 font-mono"
              >
                <div className="truncate">
                  <div className="text-slate-200 font-medium truncate">{evt.event}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{evt.id}</span>
                    <span>•</span>
                    <span className="text-slate-400">{formatHashShort(evt.hash, 6, 4)}</span>
                    <span>•</span>
                    <span>{evt.actor}</span>
                  </div>
                </div>
                <StatusBadge status={evt.decision} type="decision" size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Explainability Insight */}
      <JudgeAnnotation
        title="PIPELINE INTEGRITY VS BENCHMARK ACCURACY"
        whyItMatters="High test accuracy does not protect against clean-label dataset poisoning, model weight backdoors, or post-inference pixel manipulation. TRUST-CV continuously validates cryptographic lineage, weight hashes, and runtime bitstream provenance across all trust boundaries."
        defenseContext="Adheres to Ministry of Defence guidelines for multi-vendor military computer vision procurement (PS-26228)."
      />
    </div>
  );
};
