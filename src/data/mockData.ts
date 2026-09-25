import { ContributorInfo, DistributionScenario, DistributionScenarioType, ActivationNeuron } from '../types';
import { pseudoHash } from '../utils/crypto';

export const INITIAL_CONTRIBUTORS: ContributorInfo[] = [
  {
    id: 'CONT-A',
    name: 'Vendor-A (Electro-Optics Corp)',
    role: 'Primary Sensor Vendor',
    samplesContributed: 3200,
    modelsSubmitted: 2,
    integrityEvents: 0,
    provenanceCompleteness: 99.4,
    riskLevel: 'LOW',
    status: 'VERIFIED',
    lastActivity: '12m ago',
    publicFingerprint: 'ed25519:7b92f4e198aa019c'
  },
  {
    id: 'CONT-B',
    name: 'Vendor-B (Apex Vision Labs)',
    role: 'Thermal Analytics Contractor',
    samplesContributed: 2800,
    modelsSubmitted: 3,
    integrityEvents: 0,
    provenanceCompleteness: 97.2,
    riskLevel: 'LOW',
    status: 'VERIFIED',
    lastActivity: '44m ago',
    publicFingerprint: 'ed25519:4a88bc39110d931e'
  },
  {
    id: 'CONT-C',
    name: 'Vendor-C (Kavach Autonomous)',
    role: 'Edge Model Quantization',
    samplesContributed: 2100,
    modelsSubmitted: 1,
    integrityEvents: 0,
    provenanceCompleteness: 98.8,
    riskLevel: 'LOW',
    status: 'VERIFIED',
    lastActivity: '2h ago',
    publicFingerprint: 'ed25519:9f23aa6428c0b431'
  },
  {
    id: 'CONT-D',
    name: 'Vendor-D (GeoAI Defense Sys)',
    role: 'Aerial Synthetic Augmentation',
    samplesContributed: 1850,
    modelsSubmitted: 1,
    integrityEvents: 0,
    provenanceCompleteness: 96.5,
    riskLevel: 'LOW',
    status: 'VERIFIED',
    lastActivity: '5h ago',
    publicFingerprint: 'ed25519:12ec7809dfa552b7'
  },
  {
    id: 'CONT-INT',
    name: 'Internal Pipeline (DGIS AI Lab)',
    role: 'Sovereign Validation Hub',
    samplesContributed: 1530,
    modelsSubmitted: 4,
    integrityEvents: 0,
    provenanceCompleteness: 100.0,
    riskLevel: 'LOW',
    status: 'VERIFIED',
    lastActivity: '1m ago',
    publicFingerprint: 'ed25519:dgis8829aa716301'
  },
  {
    id: 'CONT-RES',
    name: 'Research Partner (IIT Consortium)',
    role: 'Adversarial Robustness Audit',
    samplesContributed: 1000,
    modelsSubmitted: 2,
    integrityEvents: 0,
    provenanceCompleteness: 98.1,
    riskLevel: 'LOW',
    status: 'VERIFIED',
    lastActivity: '1d ago',
    publicFingerprint: 'ed25519:5e33d902bca88172'
  }
];

export const INITIAL_CATEGORIES = [
  { name: 'Ground Reconnaissance Vehicles', count: 3840, anomalies: 0 },
  { name: 'Border Infrastructure & Assets', count: 2950, anomalies: 0 },
  { name: 'Aerial & UAV Platforms', count: 2420, anomalies: 0 },
  { name: 'Camouflage / Decoy Signatures', count: 1870, anomalies: 0 },
  { name: 'Maritime / Coastal Targets', count: 1400, anomalies: 0 }
];

export const INITIAL_HEATMAP_NEURONS: ActivationNeuron[] = Array.from({ length: 32 }, (_, idx) => {
  const base = 0.45 + (Math.sin(idx * 0.7) * 0.25);
  return {
    id: idx,
    layer: `ConvBlock_${Math.floor(idx / 8) + 1}.layer_${(idx % 8) + 1}`,
    activationScore: Number(base.toFixed(3)),
    baselineScore: Number(base.toFixed(3)),
    isAnomalous: false
  };
});

export const DISTRIBUTION_SCENARIOS: Record<DistributionScenarioType, DistributionScenario> = {
  NORMAL: {
    type: 'NORMAL',
    label: 'Standard Daylight (Baseline)',
    description: 'Clear daylight, calibrated sensor profile, standard altitude terrain.',
    mmd: 0.08,
    wasserstein: 0.11,
    confidence: 96,
    driftLevel: 'LOW',
    classification: 'BENIGN_BASELINE',
    decision: 'ACCEPT',
    evidenceText: 'Distribution discrepancy metrics within nominal threshold bounds (MMD < 0.15). No sign of non-uniform spectral variance.',
    featureDrift: [
      { feature: 'Luminance Distribution', baseline: 0.52, current: 0.53 },
      { feature: 'High-Frequency Spatial Gradient', baseline: 0.44, current: 0.45 },
      { feature: 'Color Saturation Dispersion', baseline: 0.61, current: 0.62 },
      { feature: 'Edge Continuity Index', baseline: 0.78, current: 0.77 },
      { feature: 'Spectral Kurtosis', baseline: 0.31, current: 0.30 }
    ]
  },
  NIGHT: {
    type: 'NIGHT',
    label: 'Low-Light / Night Operation',
    description: 'Thermal IR gain shift, reduced photometric dynamics, elevated sensor noise.',
    mmd: 0.38,
    wasserstein: 0.34,
    confidence: 87,
    driftLevel: 'MEDIUM',
    classification: 'LEGITIMATE_SHIFT',
    decision: 'REVIEW',
    evidenceText: 'Uniform global histogram compression observed consistent with low illumination physics. Model feature activations show proportional degradation without localized trigger clustering.',
    featureDrift: [
      { feature: 'Luminance Distribution', baseline: 0.52, current: 0.18 },
      { feature: 'High-Frequency Spatial Gradient', baseline: 0.44, current: 0.29 },
      { feature: 'Color Saturation Dispersion', baseline: 0.61, current: 0.21 },
      { feature: 'Edge Continuity Index', baseline: 0.78, current: 0.59 },
      { feature: 'Spectral Kurtosis', baseline: 0.31, current: 0.48 }
    ]
  },
  WEATHER: {
    type: 'WEATHER',
    label: 'Atmospheric Fog / Monsoon Rain',
    description: 'Particle scatter, contrast dampening, Mie scattering optical distortion.',
    mmd: 0.41,
    wasserstein: 0.37,
    confidence: 84,
    driftLevel: 'MEDIUM',
    classification: 'LEGITIMATE_SHIFT',
    decision: 'REVIEW',
    evidenceText: 'Broadband contrast attenuation detected across high-frequency components. Optical transmission model matches fog/rain attenuation curves. Classified as benign physical shift.',
    featureDrift: [
      { feature: 'Luminance Distribution', baseline: 0.52, current: 0.42 },
      { feature: 'High-Frequency Spatial Gradient', baseline: 0.44, current: 0.22 },
      { feature: 'Color Saturation Dispersion', baseline: 0.61, current: 0.33 },
      { feature: 'Edge Continuity Index', baseline: 0.78, current: 0.51 },
      { feature: 'Spectral Kurtosis', baseline: 0.31, current: 0.44 }
    ]
  },
  SENSOR_CHANGE: {
    type: 'SENSOR_CHANGE',
    label: 'EO/IR Payload Sensor Swap',
    description: 'Alternative optical focal length, different CMOS Bayer pattern & quantum efficiency.',
    mmd: 0.45,
    wasserstein: 0.42,
    confidence: 81,
    driftLevel: 'MEDIUM',
    classification: 'LEGITIMATE_SHIFT',
    decision: 'REVIEW',
    evidenceText: 'Systematic chromatic aberration and aspect ratio change noted. Spatial covariance is consistent across entire frame field.',
    featureDrift: [
      { feature: 'Luminance Distribution', baseline: 0.52, current: 0.59 },
      { feature: 'High-Frequency Spatial Gradient', baseline: 0.44, current: 0.51 },
      { feature: 'Color Saturation Dispersion', baseline: 0.61, current: 0.48 },
      { feature: 'Edge Continuity Index', baseline: 0.78, current: 0.72 },
      { feature: 'Spectral Kurtosis', baseline: 0.31, current: 0.39 }
    ]
  },
  TERRAIN_CHANGE: {
    type: 'TERRAIN_CHANGE',
    label: 'Desert to High-Altitude Glacial',
    description: 'Albedo shift, extreme reflective snow glare, modified background texture.',
    mmd: 0.49,
    wasserstein: 0.46,
    confidence: 79,
    driftLevel: 'MEDIUM',
    classification: 'LEGITIMATE_SHIFT',
    decision: 'REVIEW',
    evidenceText: 'High dynamic range albedo shift with extreme spectral reflection in UV/visible band. Target bounding geometry remains invariant.',
    featureDrift: [
      { feature: 'Luminance Distribution', baseline: 0.52, current: 0.81 },
      { feature: 'High-Frequency Spatial Gradient', baseline: 0.44, current: 0.38 },
      { feature: 'Color Saturation Dispersion', baseline: 0.61, current: 0.28 },
      { feature: 'Edge Continuity Index', baseline: 0.78, current: 0.66 },
      { feature: 'Spectral Kurtosis', baseline: 0.31, current: 0.52 }
    ]
  },
  ADVERSARIAL_INPUT: {
    type: 'ADVERSARIAL_INPUT',
    label: 'Adversarial Patch / Perturbation Attack',
    description: 'Engineered gradient noise (FGSM/PGD pattern) or localized adversarial patch.',
    mmd: 0.72,
    wasserstein: 0.68,
    confidence: 91,
    driftLevel: 'HIGH',
    classification: 'MALICIOUS_SHIFT',
    decision: 'QUARANTINE',
    evidenceText: 'Non-physical high-frequency phase correlations detected. Wasserstein divergence indicates targeted latent feature manipulation violating natural image manifold constraints.',
    featureDrift: [
      { feature: 'Luminance Distribution', baseline: 0.52, current: 0.55 },
      { feature: 'High-Frequency Spatial Gradient', baseline: 0.44, current: 0.89 },
      { feature: 'Color Saturation Dispersion', baseline: 0.61, current: 0.74 },
      { feature: 'Edge Continuity Index', baseline: 0.78, current: 0.31 },
      { feature: 'Spectral Kurtosis', baseline: 0.31, current: 0.87 }
    ]
  }
};

export const RESEARCH_REFERENCES = [
  {
    code: 'NIST AI 100-2e2025',
    title: 'Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations',
    organization: 'National Institute of Standards and Technology',
    focus: 'Formal definitions for poisoning, evasion, backdoor triggers, and supply-chain threats in deep learning pipelines.'
  },
  {
    code: 'NIST TrojAI',
    title: 'Trojan Detection in Artificial Intelligence Systems Benchmark',
    organization: 'DARPA / NIST',
    focus: 'Evaluating automated inspection mechanisms to identify embedded hardware/software backdoors in CV networks without trigger visibility.'
  },
  {
    code: 'BackdoorBench',
    title: 'A Comprehensive Benchmark of Backdoor Learning: Vulnerabilities, Attacks and Defenses',
    organization: 'Open-Source Academic Benchmark',
    focus: 'Standardized evaluation of clean-label and poison-label attacks against CNN and Vision Transformer backbones.'
  },
  {
    code: 'NIST AI RMF 1.0',
    title: 'Artificial Intelligence Risk Management Framework (NIST SP 1270)',
    organization: 'NIST',
    focus: 'Framework for managing risks to organizations, individuals, and society through Govern, Map, Measure, and Manage functions.'
  },
  {
    code: 'FIPS 180-4',
    title: 'Secure Hash Standard (SHS) - SHA-256 Specifications',
    organization: 'Federal Information Processing Standards',
    focus: 'Cryptographic hash integrity binding model weights, inference manifests, and temporal Merkle state.'
  },
  {
    code: 'FIPS 186-5',
    title: 'Digital Signature Standard (DSS) - Edwards-curve Digital Signature Algorithm (Ed25519/EdDSA)',
    organization: 'NIST',
    focus: 'Non-repudiation signatures for multi-contributor telemetry and inference output validation.'
  },
  {
    code: 'FIPS 204',
    title: 'Module-Lattice-Based Digital Signature Standard (ML-DSA)',
    organization: 'NIST Post-Quantum Cryptography',
    focus: 'Quantum-resilient cryptographic signature standards for sovereign defense telemetry persistence.'
  }
];

export const TEMPORAL_FRAMES_MOCK = Array.from({ length: 60 }, (_, idx) => {
  const frameNum = (idx + 1).toString().padStart(4, '0');
  const frameSec = Math.floor(idx / 20) + 1; // 3 seconds total (20 fps sample)
  const lsbHash = pseudoHash(`frame-${frameNum}-lsb`);
  return {
    frameNumber: `FRAME_${frameNum}`,
    secondBatch: `SEC_0${frameSec}`,
    timestampMs: idx * 16.67,
    hash: lsbHash,
    status: 'VERIFIED'
  };
});
