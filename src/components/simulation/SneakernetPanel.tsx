import React from 'react';
import { HardDrive, Key, FileCheck, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { StatusBadge } from '../common/StatusBadge';

export const SneakernetPanel: React.FC = () => {
  const { state, insertUsb, verifySneakernetUpdate, installSneakernetUpdate } = useApp();
  const { sneakernet } = state;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-wide uppercase telemetry-mono flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              Air-Gapped Threat Signature Update (Sneakernet Protocol)
            </h3>
            <span className="text-xs px-2 py-0.5 rounded border uppercase font-mono font-bold bg-sky-950/60 text-sky-400 border-sky-500/40">
              AIR-GAPPED DEFENSE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographic physical token protocol allowing sovereign tactical nodes to receive updated backdoor trigger signatures without public internet connectivity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!sneakernet.usbConnected ? (
            <button
              onClick={insertUsb}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(14,165,233,0.3)]"
            >
              <HardDrive className="w-3.5 h-3.5" />
              [INSERT SECURE USB]
            </button>
          ) : !sneakernet.packageVerified ? (
            <button
              onClick={verifySneakernetUpdate}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            >
              <Key className="w-3.5 h-3.5" />
              [VERIFY UPDATE]
            </button>
          ) : !sneakernet.installed ? (
            <button
              onClick={installSneakernetUpdate}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              <FileCheck className="w-3.5 h-3.5" />
              [INSTALL UPDATE]
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              UPDATE INSTALLED
            </span>
          )}
        </div>
      </div>

      {/* Hardware Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-500 font-mono uppercase font-bold">USB DEVICE</div>
          <div className={`mt-1 text-xs font-mono font-bold ${sneakernet.usbConnected ? 'text-emerald-400' : 'text-slate-500'}`}>
            {sneakernet.usbConnected ? 'CONNECTED (READ-ONLY)' : 'DISCONNECTED'}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-500 font-mono uppercase font-bold">AUTHENTICATION</div>
          <div className={`mt-1 text-xs font-mono font-bold ${sneakernet.yubikeyAuthenticated ? 'text-emerald-400' : 'text-slate-500'}`}>
            {sneakernet.yubikeyAuthenticated ? 'YUBIKEY FIPS 140-3' : 'AWAITING KEY'}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-500 font-mono uppercase font-bold">PACKAGE SIGNATURE</div>
          <div className={`mt-1 text-xs font-mono font-bold ${sneakernet.signatureValid && sneakernet.packageVerified ? 'text-emerald-400' : 'text-slate-500'}`}>
            {sneakernet.packageVerified ? 'ED25519 VALID' : 'UNVERIFIED'}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-500 font-mono uppercase font-bold">NETWORK LAYER</div>
          <div className="mt-1 text-xs font-mono font-bold text-sky-400">
            AIR-GAPPED (100% ISOLATED)
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-500 font-mono uppercase font-bold">SIGNATURE STATUS</div>
          <div className={`mt-1 text-xs font-mono font-bold ${sneakernet.installed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {sneakernet.installed ? 'ACTIVE / SECURED' : sneakernet.packageVerified ? 'READY TO DEPLOY' : 'PENDING MEDIA'}
          </div>
        </div>
      </div>
    </div>
  );
};
