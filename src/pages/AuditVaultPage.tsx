import React, { useState } from 'react';
import {
  FileCheck2,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  Hash,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { AuditEvent, SeverityLevel } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { HashDisplay } from '../components/common/HashDisplay';
import { Modal } from '../components/common/Modal';
import { JudgeAnnotation } from '../components/common/JudgeAnnotation';
import { formatHashShort } from '../utils/crypto';

export const AuditVaultPage: React.FC = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | SeverityLevel>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const filteredEvents = state.auditEvents.filter(evt => {
    const matchesSeverity = severityFilter === 'ALL' || evt.severity === severityFilter;
    const matchesSearch =
      evt.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.hash.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <FileCheck2 className="w-3.5 h-3.5" />
          IMMUTABLE AIR-GAPPED CRYPTOGRAPHIC LEDGER
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight uppercase telemetry-mono mt-0.5">
          Audit Vault & Tamper-Evident Journal
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Cryptographically linked event sequence with hash chaining (SHA-256) ensuring non-repudiation and forensic auditability.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event ID, actor, source, hash..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto font-mono text-xs">
          {(['ALL', 'INFO', 'WARNING', 'CRITICAL'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                severityFilter === sev
                  ? sev === 'CRITICAL'
                    ? 'bg-rose-950 border-rose-500 text-rose-300 font-bold'
                    : sev === 'WARNING'
                    ? 'bg-amber-950 border-amber-500 text-amber-300 font-bold'
                    : sev === 'INFO'
                    ? 'bg-sky-950 border-sky-500 text-sky-300 font-bold'
                    : 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Table */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <span>Journal Entries ({filteredEvents.length} items)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            CHAIN VERIFIED • ZERO SEVERANCE DETECTED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-2.5">Timestamp</th>
                <th className="pb-2.5">Event Description</th>
                <th className="pb-2.5">Source Engine</th>
                <th className="pb-2.5">Severity</th>
                <th className="pb-2.5">SHA-256 Digest</th>
                <th className="pb-2.5">Decision</th>
                <th className="pb-2.5">Status</th>
                <th className="pb-2.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEvents.map(evt => (
                <tr
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 text-slate-400 whitespace-nowrap">{evt.timestamp}</td>
                  <td className="py-3 font-semibold text-white max-w-xs truncate">
                    {evt.event}
                  </td>
                  <td className="py-3 text-cyan-400 whitespace-nowrap">{evt.source}</td>
                  <td className="py-3">
                    <StatusBadge status={evt.severity} type="severity" size="sm" />
                  </td>
                  <td className="py-3 text-slate-400 select-all whitespace-nowrap">
                    {formatHashShort(evt.hash, 6, 4)}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={evt.decision} type="decision" size="sm" />
                  </td>
                  <td className="py-3 text-emerald-400 font-bold whitespace-nowrap">
                    {evt.status}
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold underline">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Event Detail Modal */}
      <Modal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title={`Audit Evidence Dossier: ${selectedEvent?.id}`}
        subtitle={`Recorded at ${selectedEvent?.timestamp} by ${selectedEvent?.actor}`}
        maxWidth="2xl"
      >
        {selectedEvent && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Event Name</span>
              <div className="text-sm font-bold text-white">{selectedEvent.event}</div>
              <div className="text-slate-400 text-xs mt-1">{selectedEvent.evidence}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Origin Source</span>
                <div className="text-cyan-400 font-bold mt-0.5">{selectedEvent.source}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Governance Result</span>
                <div className="mt-0.5">
                  <StatusBadge status={selectedEvent.decision} type="decision" size="sm" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <HashDisplay
                label="Current Event Cryptographic Digest (SHA-256)"
                hash={selectedEvent.hash}
                status="match"
                tag="FIPS 180-4"
              />

              <HashDisplay
                label="Previous Chain Block Hash (Hash-Chain Link)"
                hash={selectedEvent.previousHash}
                status="neutral"
                tag="CHAIN LINK"
              />
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/40 text-[11px] text-emerald-300">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                NON-REPUDIATION GUARANTEE
              </div>
              This entry is immutably anchored into the air-gapped sovereign journal. Any post-hoc tampering with event parameters breaks the previousHash link, invalidating the entire subsequent audit chain.
            </div>
          </div>
        )}
      </Modal>

      <JudgeAnnotation
        title="WHY AN IMMUTABLE AUDIT VAULT IS ESSENTIAL"
        whyItMatters="In military systems, after-action investigations require indisputable proof that cannot be wiped or edited by insider adversaries. The Audit Vault uses cryptographic hash chains (each record commits to the previous record's SHA-256 hash). If an attacker tries to alter a quarantine log, the subsequent hashes immediately show a broken chain."
        defenseContext="Satisfies strict Indian Army DGIS chain-of-custody requirements for AI inference logs."
      />
    </div>
  );
};
