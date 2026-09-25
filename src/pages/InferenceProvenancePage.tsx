import React from 'react';
import {
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  GitCommit,
  ShieldCheck,
  Clock,
  Layers,
  Key,
  ShieldAlert,
  ArrowDown
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { PixelSealViewer } from '../components/steganography/PixelSealViewer';
import { TemporalMerkleViewer } from '../components/merkle/TemporalMerkleViewer';
import { HashDisplay } from '../components/common/HashDisplay';
import { StatusBadge } from '../components/common/StatusBadge';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';
import { formatHashShort } from '../utils/crypto';

export const InferenceProvenancePage: React.FC = () => {
  const { state } = useApp();
  const { inference } = state;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Fingerprint className="w-3.5 h-3.5" />
          ENGINE 3 — CRYPTOGRAPHIC PROVENANCE & OUTPUT INTEGRITY
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
          Inference Provenance & Steganographic Seal
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Cryptographically binding INPUT + MODEL + CONFIG + OUTPUT into a tamper-evident, non-repudiation provenance chain.
        </p>
      </div>

      {/* Steganographic Pixel Seal Interactive Demo */}
      <PixelSealViewer />

      {/* Provenance Manifest & Cryptographic Hashes */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Cryptographic Binding Manifest: {inference.inferenceId}
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              Deterministic Ed25519 (FIPS 186-5) & SHA-256 (FIPS 180-4)
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-400">NONCE: <strong className="text-white">{inference.nonce}</strong></span>
            <span className="text-slate-400">SEQ: <strong className="text-cyan-400">#{inference.sequenceNumber}</strong></span>
            <StatusBadge
              status={inference.sealStatus === 'VERIFIED' ? 'CHAIN VERIFIED' : 'CHAIN SEVERED'}
              type="verification"
              size="sm"
            />
          </div>
        </div>

        {/* 4 Hash Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <HashDisplay
            label="1. Raw Input Hash"
            hash={inference.inputHash}
            status="match"
            tag="SENSOR INPUT"
          />

          <HashDisplay
            label="2. Model Fingerprint"
            hash={inference.modelHash}
            status={state.model.fingerprintStatus === 'MATCH' ? 'match' : 'mismatch'}
            tag="CSPDarknet53"
          />

          <HashDisplay
            label="3. Runtime Config Hash"
            hash={inference.configHash}
            status="match"
            tag="DGIS-PARAMS"
          />

          <HashDisplay
            label="4. Sealed Output Hash"
            hash={inference.outputHash}
            status={inference.sealStatus === 'VERIFIED' ? 'match' : 'mismatch'}
            tag={inference.sealStatus === 'VERIFIED' ? 'AUTHENTIC' : 'TAMPERED'}
          />
        </div>
      </div>

      {/* Provenance Step Timeline */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-cyan-400" />
            End-to-End Cryptographic Provenance Ledger
          </h3>
          <span className="text-[10px] font-mono text-slate-500">AIR-GAPPED SOVEREIGN AUDIT</span>
        </div>

        <div className="space-y-3">
          {inference.provenanceEvents.map((evt, idx) => (
            <div
              key={evt.step}
              className={`p-3 rounded-lg border font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                evt.verified
                  ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                  : 'border-rose-500/60 bg-rose-950/30 text-rose-300 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-bold text-white text-[10px]">
                  {idx + 1}
                </span>
                <div>
                  <div className="font-bold text-white uppercase flex items-center gap-2">
                    {evt.stageName}
                    <span className="text-[10px] font-normal text-slate-500">({evt.step})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{evt.description}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] flex-shrink-0">
                <div className="text-right">
                  <div className="text-slate-400">Digest: {formatHashShort(evt.hash, 6, 4)}</div>
                  <div className="text-slate-500 text-[10px]">{evt.timestamp}</div>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  {evt.verified ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> VERIFIED
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> BROKEN
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temporal Merkle Tree Visualizer */}
      <TemporalMerkleViewer />

      <JudgeAnnotation
        title="WHY PROVENANCE & NON-REPUDIATION ARE CRUCIAL"
        whyItMatters="If an autonomous drone reconnaissance pipeline misclassifies a civilian convoy as a hostile target, who was at fault? Did the camera sensor produce corrupted data? Did the third-party model mispredict? Did an operator tamper with the coordinates? Cryptographic provenance creates an unforgeable evidentiary chain answering exactly what occurred."
        defenseContext="Supports Indian Army legal compliance and after-action sovereign review."
      />
    </div>
  );
};
