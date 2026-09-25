import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SystemState,
  DistributionScenarioType,
  AuditEvent,
  DecisionStatus
} from '../types';
import { getInitialState } from '../data/initialState';
import {
  pseudoHash,
  generateEd25519Signature,
  computeMerkleRoot
} from '../utils/crypto';
import { formatTimestamp } from '../utils/helpers';
import { INITIAL_HEATMAP_NEURONS, DISTRIBUTION_SCENARIOS } from '../data/mockData';

export type PageRoute =
  | 'landing'
  | 'overview'
  | 'data'
  | 'model'
  | 'inference'
  | 'distribution'
  | 'contributors'
  | 'attack-lab'
  | 'audit'
  | 'report';

interface AppContextType {
  state: SystemState;
  activePage: PageRoute;
  setActivePage: (page: PageRoute) => void;
  // Data actions
  scanDataset: () => void;
  simulatePoisoning: () => void;
  simulateDuplicateFlooding: () => void;
  simulateOodInsertion: () => void;
  resetDataset: () => void;
  // Model actions
  analyzeModel: () => void;
  simulateBackdoor: () => void;
  simulateModelSubstitution: () => void;
  blackBoxTest: () => void;
  resetModel: () => void;
  // Inference actions
  simulateTampering: () => void;
  restoreInference: () => void;
  // Distribution actions
  setDistributionScenario: (scenario: DistributionScenarioType) => void;
  // Sneakernet
  insertUsb: () => void;
  verifySneakernetUpdate: () => void;
  installSneakernetUpdate: () => void;
  // System actions
  resetSystem: () => void;
  toggleDemoMode: () => void;
  toggleJudgeMode: () => void;
  setDemoStep: (step: number) => void;
  runFullDemoSequence: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SystemState>(getInitialState);
  const [activePage, setActivePage] = useState<PageRoute>('landing');

  // Recalculate composite system trust score whenever sub-scores change
  const computeTrustScore = (s: SystemState): number => {
    let dataScore = s.dataset.integrityScore;
    let modelScore = s.model.integrityScore;
    let inferScore = s.inference.sealStatus === 'VERIFIED' && !s.inference.isTampered ? 100 : 38;
    let distScore = s.distribution.currentScenario === 'ADVERSARIAL_INPUT' ? 25 : (s.distribution.scenarios[s.distribution.currentScenario].confidence || 90);

    const weighted = (dataScore * 0.25) + (modelScore * 0.35) + (inferScore * 0.25) + (distScore * 0.15);
    return Math.max(12, Math.min(99, Math.round(weighted)));
  };

  const addAuditEvent = (
    event: string,
    source: AuditEvent['source'],
    severity: AuditEvent['severity'],
    evidence: string,
    decision: DecisionStatus,
    status: AuditEvent['status'] = 'COMMITTED',
    actor = 'TRUST-CV-ENGINE'
  ) => {
    const now = formatTimestamp();
    const newAudit: AuditEvent = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: now,
      event,
      source,
      severity,
      hash: pseudoHash(`${event}-${now}-${Math.random()}`),
      previousHash: state.auditEvents[0]?.hash || pseudoHash('GENESIS'),
      actor,
      evidence,
      decision,
      status
    };

    setState(prev => ({
      ...prev,
      auditEvents: [newAudit, ...prev.auditEvents.slice(0, 49)],
      lastUpdated: now
    }));
  };

  // 1. DATA INTEGRITY ACTIONS
  const scanDataset = () => {
    setState(prev => ({
      ...prev,
      dataset: { ...prev.dataset, isScanning: true }
    }));

    setTimeout(() => {
      setState(prev => {
        const updated = {
          ...prev,
          dataset: {
            ...prev.dataset,
            isScanning: false,
            lastScanned: formatTimestamp(),
            status: 'VERIFIED' as const,
            integrityScore: 98.7,
            poisonedSamples: 0,
            duplicateSamples: 14,
            oodSamples: 3,
            spectralAnomalies: 2,
            contributorRisk: 'LOW' as const
          }
        };
        updated.systemTrustScore = computeTrustScore(updated);
        return updated;
      });

      addAuditEvent(
        'Deep Spectral Dataset Scan Completed',
        'DATA_ENGINE',
        'INFO',
        'Spectral eigenvalue analysis across 12,480 samples verified zero poison clusters.',
        'ACCEPT',
        'COMMITTED',
        'Data Integrity Engine'
      );
    }, 600);
  };

  const simulatePoisoning = () => {
    setState(prev => {
      const updatedContributors = prev.dataset.contributors.map(c => {
        if (c.id === 'CONT-B') {
          return {
            ...c,
            integrityEvents: c.integrityEvents + 1,
            riskLevel: 'HIGH' as const,
            status: 'FLAGGED' as const
          };
        }
        return c;
      });

      const updatedCategories = prev.dataset.categories.map((cat, idx) => {
        if (idx === 0) return { ...cat, anomalies: 112 };
        if (idx === 1) return { ...cat, anomalies: 35 };
        return cat;
      });

      const updatedState: SystemState = {
        ...prev,
        dataset: {
          ...prev.dataset,
          poisonedSamples: 147,
          spectralAnomalies: 31,
          integrityScore: 61.2,
          contributorRisk: 'HIGH',
          status: 'FLAGGED',
          contributors: updatedContributors,
          categories: updatedCategories,
          lastScanned: formatTimestamp()
        },
        governance: {
          status: 'REVIEW',
          reason: 'Poisoned training samples and high spectral anomaly clusters isolated in Vendor-B contribution partition.',
          evidence: [
            '147 samples flagged with Clean-Label trigger signatures (NIST AI 100-2e2025 taxonomy)',
            'Vendor-B risk score escalated to HIGH due to cluster co-variance',
            'Spectral anomaly rate elevated to 2.48% (nominal baseline < 0.05%)'
          ],
          confidence: 89,
          timestamp: formatTimestamp(),
          sourceEngine: 'DATA_INTEGRITY_ENGINE'
        },
        lastUpdated: formatTimestamp()
      };
      updatedState.systemTrustScore = computeTrustScore(updatedState);
      return updatedState;
    });

    addAuditEvent(
      'Dataset Poisoning Signatures Detected (147 samples flagged)',
      'DATA_ENGINE',
      'WARNING',
      'Spectral cluster anomaly in Vendor-B partition. High risk of backdoor trigger embedding.',
      'REVIEW',
      'FLAGGED',
      'Data Integrity Engine'
    );
  };

  const simulateDuplicateFlooding = () => {
    setState(prev => {
      const updatedContributors = prev.dataset.contributors.map(c => {
        if (c.id === 'CONT-D') {
          return {
            ...c,
            integrityEvents: c.integrityEvents + 1,
            riskLevel: 'MEDIUM' as const
          };
        }
        return c;
      });

      const updatedState: SystemState = {
        ...prev,
        dataset: {
          ...prev.dataset,
          duplicateSamples: 1840,
          integrityScore: 78.4,
          contributorRisk: 'MEDIUM',
          status: 'FLAGGED',
          contributors: updatedContributors,
          lastScanned: formatTimestamp()
        },
        governance: {
          status: 'REVIEW',
          reason: 'Synthetic duplicate flooding detected attempting to bias model feature representations.',
          evidence: [
            '1,840 redundant perceptual hash matches detected from Vendor-D',
            'Feature diversity entropy dropped by 24.6% below calibration baseline'
          ],
          confidence: 93,
          timestamp: formatTimestamp(),
          sourceEngine: 'DATA_INTEGRITY_ENGINE'
        },
        lastUpdated: formatTimestamp()
      };
      updatedState.systemTrustScore = computeTrustScore(updatedState);
      return updatedState;
    });

    addAuditEvent(
      'Duplicate Flooding Anomaly Flagged',
      'DATA_ENGINE',
      'WARNING',
      '1,840 near-identical duplicate frames submitted by Vendor-D.',
      'REVIEW',
      'FLAGGED',
      'Data Integrity Engine'
    );
  };

  const simulateOodInsertion = () => {
    setState(prev => {
      const updatedState: SystemState = {
        ...prev,
        dataset: {
          ...prev.dataset,
          oodSamples: 642,
          integrityScore: 74.1,
          contributorRisk: 'MEDIUM',
          status: 'FLAGGED',
          lastScanned: formatTimestamp()
        },
        governance: {
          status: 'REVIEW',
          reason: 'Out-of-distribution (OOD) visual samples injected outside ISR operational domain.',
          evidence: [
            '642 samples failed latent density support boundary checks',
            'Cross-entropy distance indicates non-defense domain telemetry inclusion'
          ],
          confidence: 91,
          timestamp: formatTimestamp(),
          sourceEngine: 'DATA_INTEGRITY_ENGINE'
        },
        lastUpdated: formatTimestamp()
      };
      updatedState.systemTrustScore = computeTrustScore(updatedState);
      return updatedState;
    });

    addAuditEvent(
      'OOD Training Sample Infiltration Detected',
      'DATA_ENGINE',
      'WARNING',
      '642 out-of-distribution samples isolated from training corpus.',
      'REVIEW',
      'FLAGGED',
      'Data Integrity Engine'
    );
  };

  const resetDataset = () => {
    const initial = getInitialState();
    setState(prev => {
      const updated = {
        ...prev,
        dataset: initial.dataset
      };
      // Re-evaluate governance if other engines are clean
      if (prev.inference.sealStatus === 'VERIFIED' && prev.model.fingerprintStatus === 'MATCH' && prev.distribution.currentScenario === 'NORMAL') {
        updated.governance = initial.governance;
      }
      updated.systemTrustScore = computeTrustScore(updated);
      return updated;
    });

    addAuditEvent(
      'Dataset State Restored to Baseline',
      'DATA_ENGINE',
      'INFO',
      'Reset all training partitions to pristine verified state.',
      'ACCEPT',
      'COMMITTED',
      'Data Integrity Engine'
    );
  };

  // 2. MODEL INTEGRITY ACTIONS
  const analyzeModel = () => {
    setState(prev => ({
      ...prev,
      model: { ...prev.model, isAnalyzing: true }
    }));

    setTimeout(() => {
      setState(prev => {
        const initial = getInitialState();
        const updated = {
          ...prev,
          model: {
            ...initial.model,
            isAnalyzing: false,
            lastAnalyzed: formatTimestamp()
          }
        };
        if (prev.inference.sealStatus === 'VERIFIED' && prev.dataset.status === 'VERIFIED' && prev.distribution.currentScenario === 'NORMAL') {
          updated.governance = initial.governance;
        }
        updated.systemTrustScore = computeTrustScore(updated);
        return updated;
      });

      addAuditEvent(
        'Comprehensive Model Activation & Fingerprint Analysis Completed',
        'MODEL_ENGINE',
        'INFO',
        'FIPS 180-4 SHA-256 weight hash verified. Zero Trojan backdoor neuron clusters identified.',
        'ACCEPT',
        'COMMITTED',
        'Model Integrity Engine'
      );
    }, 600);
  };

  const simulateBackdoor = () => {
    setState(prev => {
      // Modify activation heatmap to highlight suspicious cluster
      const corruptedHeatmap = prev.model.activationHeatmap.map(n => {
        if (n.id >= 16 && n.id <= 23) {
          return {
            ...n,
            activationScore: 0.985,
            isAnomalous: true
          };
        }
        return { ...n, isAnomalous: false };
      });

      const updatedState: SystemState = {
        ...prev,
        model: {
          ...prev.model,
          triggerRisk: 'HIGH',
          activationAnomaly: 'DETECTED',
          suspiciousClusterDetected: true,
          fingerprintStatus: 'SUSPICIOUS BEHAVIOR',
          weightStatus: 'BACKDOOR_INJECTED',
          weightDrift: 0.284,
          integrityScore: 38.5,
          lastAnalyzed: formatTimestamp(),
          activationHeatmap: corruptedHeatmap
        },
        governance: {
          status: 'QUARANTINE',
          reason: 'Severe AI model backdoor signature detected via activation clustering (NIST TrojAI benchmark criteria).',
          evidence: [
            'Anomalous activation cluster detected across ConvBlock_3/4 hidden channels',
            'Trigger inversion synthesized high-confidence activation shortcut without input stimulus',
            'Model behavior shows conditional target class misdirection under trigger pattern'
          ],
          confidence: 98,
          timestamp: formatTimestamp(),
          sourceEngine: 'MODEL_INTEGRITY_ENGINE'
        },
        lastUpdated: formatTimestamp()
      };
      updatedState.systemTrustScore = computeTrustScore(updatedState);
      return updatedState;
    });

    addAuditEvent(
      'Model Backdoor / Trojan Trigger Detected',
      'MODEL_ENGINE',
      'CRITICAL',
      'Activation anomaly detected. Model quarantined from operational inference pipeline.',
      'QUARANTINE',
      'QUARANTINED',
      'Model Integrity Engine'
    );
  };

  const simulateModelSubstitution = () => {
    setState(prev => {
      const spoofedHash = pseudoHash('UNAUTHORIZED-MODEL-SUBSTITUTION-WEIGHTS-2026');
      const updatedState: SystemState = {
        ...prev,
        model: {
          ...prev.model,
          modelHash: spoofedHash,
          fingerprintStatus: 'MISMATCH',
          weightStatus: 'PERTURBED',
          weightDrift: 0.612,
          integrityScore: 12.0,
          lastAnalyzed: formatTimestamp()
        },
        governance: {
          status: 'QUARANTINE',
          reason: 'Cryptographic model fingerprint mismatch: unauthorized binary modification or model substitution.',
          evidence: [
            `Current model hash ${spoofedHash.slice(0, 16)}... does not match sovereign baseline ${prev.model.baselineHash.slice(0, 16)}...`,
            'Non-repudiation Ed25519 signature verification rejected',
            'Suspected supply chain binary tampering or unauthorized checkpoint swap'
          ],
          confidence: 99,
          timestamp: formatTimestamp(),
          sourceEngine: 'MODEL_INTEGRITY_ENGINE'
        },
        lastUpdated: formatTimestamp()
      };
      updatedState.systemTrustScore = computeTrustScore(updatedState);
      return updatedState;
    });

    addAuditEvent(
      'Model Fingerprint Mismatch - Supply Chain Tamper Alert',
      'MODEL_ENGINE',
      'CRITICAL',
      'Current SHA-256 does not match sovereign baseline. Immediate quarantine enacted.',
      'QUARANTINE',
      'QUARANTINED',
      'Model Integrity Engine'
    );
  };

  const blackBoxTest = () => {
    setState(prev => ({
      ...prev,
      model: {
        ...prev.model,
        blackBoxStatus: 'CONSISTENT',
        lastAnalyzed: formatTimestamp()
      }
    }));

    addAuditEvent(
      'Black-Box Metamorphic Behavioral Test Completed',
      'MODEL_ENGINE',
      'INFO',
      'Rotational invariance and affine metamorphic tests confirmed expected model prediction continuity.',
      'ACCEPT',
      'COMMITTED',
      'Model Integrity Engine'
    );
  };

  const resetModel = () => {
    const initial = getInitialState();
    setState(prev => {
      const updated = {
        ...prev,
        model: initial.model
      };
      if (prev.inference.sealStatus === 'VERIFIED' && prev.dataset.status === 'VERIFIED' && prev.distribution.currentScenario === 'NORMAL') {
        updated.governance = initial.governance;
      }
      updated.systemTrustScore = computeTrustScore(updated);
      return updated;
    });

    addAuditEvent(
      'Model Integrity State Restored to Baseline',
      'MODEL_ENGINE',
      'INFO',
      'Restored sovereign verified model weights and pristine baseline fingerprint.',
      'ACCEPT',
      'COMMITTED',
      'Model Integrity Engine'
    );
  };

  // 3. INFERENCE & STEGANOGRAPHIC PIXEL SEAL ACTIONS
  const simulateTampering = () => {
    setState(prev => {
      const corruptedSig = generateEd25519Signature(prev.inference.tamperedOutputHash);
      const updatedEvents = prev.inference.provenanceEvents.map(evt => {
        if (evt.stageName === 'OUTPUT SEALED' || evt.stageName === 'PROVENANCE COMMITTED') {
          return { ...evt, verified: false };
        }
        return evt;
      });

      const updatedState: SystemState = {
        ...prev,
        inference: {
          ...prev.inference,
          isTampered: true,
          sealStatus: 'BROKEN',
          signatureStatus: 'INVALID',
          outputHash: prev.inference.tamperedOutputHash,
          recoveredSignature: corruptedSig,
          provenanceEvents: updatedEvents,
          boundingDetections: [
            // Tampered detection shows phantom target or suppressed detection
            { label: '[SPOOFED] Phantom Radar Target', confidence: 99.1, bbox: [22, 18, 30, 22], color: '#EF4444' },
            { label: '[MANIPULATED] Camouflage Masking', confidence: 41.2, bbox: [62, 58, 22, 28], color: '#EF4444' }
          ]
        },
        governance: {
          status: 'QUARANTINE',
          reason: 'Inference output integrity failed: Steganographic Pixel Seal signature mismatch detected.',
          evidence: [
            'Recovered pixel seal does not match expected cryptographic digest (FIPS 180-4 SHA-256 mismatch)',
            'Ed25519 cryptographic signature verification failed: bitstream manipulation identified',
            'Provenance chain severed at ST-05 (OUTPUT SEALED stage)',
            'Bounding box geometry modified post-inference'
          ],
          confidence: 99,
          timestamp: formatTimestamp(),
          sourceEngine: 'INFERENCE_ENGINE'
        },
        lastUpdated: formatTimestamp()
      };
      updatedState.systemTrustScore = computeTrustScore(updatedState);
      return updatedState;
    });

    addAuditEvent(
      'INFERENCE OUTPUT TAMPER DETECTED (Pixel Seal Broken)',
      'INFERENCE_ENGINE',
      'CRITICAL',
      'Steganographic signature mismatch. Output hash differs from expected manifest. System quarantined.',
      'QUARANTINE',
      'QUARANTINED',
      'Inference Engine'
    );
  };

  const restoreInference = () => {
    const initial = getInitialState();
    setState(prev => {
      const updated = {
        ...prev,
        inference: initial.inference
      };
      if (prev.model.fingerprintStatus === 'MATCH' && prev.dataset.status === 'VERIFIED' && prev.distribution.currentScenario === 'NORMAL') {
        updated.governance = initial.governance;
      }
      updated.systemTrustScore = computeTrustScore(updated);
      return updated;
    });

    addAuditEvent(
      'Inference Output Restored & Cryptographically Re-Sealed',
      'INFERENCE_ENGINE',
      'INFO',
      'Pixel seal recalculated and validated with Ed25519 non-repudiation signature.',
      'ACCEPT',
      'COMMITTED',
      'Inference Engine'
    );
  };

  // 4. DISTRIBUTION SHIFT ACTIONS
  const setDistributionScenario = (scenarioType: DistributionScenarioType) => {
    const scenario = DISTRIBUTION_SCENARIOS[scenarioType];

    setState(prev => {
      let newGovernance = prev.governance;

      // Only adjust governance if inference or model isn't currently under critical quarantine
      if (prev.inference.sealStatus === 'VERIFIED' && prev.model.fingerprintStatus === 'MATCH') {
        if (scenarioType === 'ADVERSARIAL_INPUT') {
          newGovernance = {
            status: 'QUARANTINE',
            reason: 'Adversarial perturbation detected via Wasserstein and spectral gradient anomalies.',
            evidence: [
              `Elevated MMD distance (${scenario.mmd}) and Wasserstein divergence (${scenario.wasserstein})`,
              'High-frequency spatial gradient spike (0.89 vs 0.44 baseline) violating natural physics manifold',
              'Adversarial patch / PGD perturbation signature classified'
            ],
            confidence: scenario.confidence,
            timestamp: formatTimestamp(),
            sourceEngine: 'DISTRIBUTION_SHIFT_ENGINE'
          };
        } else if (scenarioType === 'NORMAL') {
          if (prev.dataset.status === 'VERIFIED') {
            newGovernance = {
              status: 'ACCEPT',
              reason: 'Distribution nominal. No adversarial drift or physical environment anomalies detected.',
              evidence: [
                'MMD metric (0.08) within calibrated operational bounds (< 0.15)',
                'Model feature space activations remain stable',
                'All trust boundary cryptographic digests verified'
              ],
              confidence: scenario.confidence,
              timestamp: formatTimestamp(),
              sourceEngine: 'DISTRIBUTION_SHIFT_ENGINE'
            };
          }
        } else {
          // Night, Weather, Sensor Change, Terrain Change -> REVIEW
          newGovernance = {
            status: 'REVIEW',
            reason: `Legitimate environmental distribution shift detected: ${scenario.label}.`,
            evidence: [
              scenario.evidenceText,
              `MMD distance: ${scenario.mmd} (Elevated but consistent with physical weather/sensor shift)`,
              'Model behavior remains consistent with zero backdoor activation clusters',
              'Evidence fusion indicates benign environmental drift rather than adversarial attack'
            ],
            confidence: scenario.confidence,
            timestamp: formatTimestamp(),
            sourceEngine: 'DISTRIBUTION_SHIFT_ENGINE'
          };
        }
      }

      const updatedState: SystemState = {
        ...prev,
        distribution: {
          ...prev.distribution,
          currentScenario: scenarioType
        },
        governance: newGovernance,
        lastUpdated: formatTimestamp()
      };
      updatedState.systemTrustScore = computeTrustScore(updatedState);
      return updatedState;
    });

    const severity: AuditEvent['severity'] =
      scenarioType === 'ADVERSARIAL_INPUT' ? 'CRITICAL' : scenarioType === 'NORMAL' ? 'INFO' : 'WARNING';

    addAuditEvent(
      `Distribution Shift Evaluated: ${scenario.label}`,
      'DISTRIBUTION_ENGINE',
      severity,
      scenario.evidenceText,
      scenario.decision,
      scenarioType === 'ADVERSARIAL_INPUT' ? 'FLAGGED' : 'COMMITTED',
      'Distribution Shift Engine'
    );
  };

  // 5. SNEAKERNET AIR-GAPPED UPDATES
  const insertUsb = () => {
    setState(prev => ({
      ...prev,
      sneakernet: { ...prev.sneakernet, usbConnected: true }
    }));
    addAuditEvent(
      'Air-Gapped Hardware Media Inserted (USB Hardware Token)',
      'SYSTEM',
      'INFO',
      'USB device initialized in read-only sandbox. Mass storage isolation verified.',
      'ACCEPT',
      'COMMITTED',
      'Hardware Security Layer'
    );
  };

  const verifySneakernetUpdate = () => {
    setState(prev => ({
      ...prev,
      sneakernet: {
        ...prev.sneakernet,
        yubikeyAuthenticated: true,
        packageVerified: true,
        signatureValid: true
      }
    }));
    addAuditEvent(
      'Sneakernet Cryptographic Update Verified (YubiKey + Ed25519)',
      'SYSTEM',
      'INFO',
      'FIPS 140-3 Hardware key verified sovereign signature on update package v2026.09-DEF-SIG.',
      'ACCEPT',
      'COMMITTED',
      'Hardware Security Layer'
    );
  };

  const installSneakernetUpdate = () => {
    setState(prev => ({
      ...prev,
      sneakernet: {
        ...prev.sneakernet,
        installed: true,
        lastUpdateTimestamp: formatTimestamp()
      }
    }));
    addAuditEvent(
      'Air-Gapped Threat Signature Database Updated',
      'SYSTEM',
      'INFO',
      'New Trojan trigger patterns, OOD boundary priors, and sovereign vendor keys applied.',
      'ACCEPT',
      'COMMITTED',
      'System Orchestrator'
    );
  };

  // 6. SYSTEM CONTROLS
  const resetSystem = () => {
    const fresh = getInitialState();
    setState(fresh);
    addAuditEvent(
      'System Full Factory Baseline Reset',
      'SYSTEM',
      'INFO',
      'All 5 engines returned to pristine calibrated sovereign state.',
      'ACCEPT',
      'COMMITTED',
      'Master Control'
    );
  };

  const toggleDemoMode = () => {
    setState(prev => ({ ...prev, demoMode: !prev.demoMode }));
  };

  const toggleJudgeMode = () => {
    setState(prev => ({ ...prev, judgeMode: !prev.judgeMode }));
  };

  const setDemoStep = (step: number) => {
    setState(prev => ({ ...prev, demoStep: step }));
  };

  // Guided full demo walkthrough sequence
  const runFullDemoSequence = () => {
    setState(prev => ({ ...prev, demoMode: true, demoStep: 1 }));
    setActivePage('overview');
  };

  return (
    <AppContext.Provider
      value={{
        state,
        activePage,
        setActivePage,
        scanDataset,
        simulatePoisoning,
        simulateDuplicateFlooding,
        simulateOodInsertion,
        resetDataset,
        analyzeModel,
        simulateBackdoor,
        simulateModelSubstitution,
        blackBoxTest,
        resetModel,
        simulateTampering,
        restoreInference,
        setDistributionScenario,
        insertUsb,
        verifySneakernetUpdate,
        installSneakernetUpdate,
        resetSystem,
        toggleDemoMode,
        toggleJudgeMode,
        setDemoStep,
        runFullDemoSequence
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
