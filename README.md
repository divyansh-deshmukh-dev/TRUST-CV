# TRUST-CV: Unified AI Integrity Assurance Layer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: React 18](https://img.shields.io/badge/Framework-React%2018-cyan.svg)](https://react.dev/)
[![Styling: TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4.svg)](https://tailwindcss.com/)
[![Security: FIPS 180-4 / 186-5](https://img.shields.io/badge/Security-FIPS%20180--4%20%7C%20186--5-emerald.svg)](https://csrc.nist.gov/)

**Sovereign Defensive AI Integrity Platform for Computer Vision Pipelines**  
*Directing Authority:* Ministry of Defence / Indian Army DGIS (Problem Statement Ref: PS-26228)  
*Architecture:* Air-Gapped Multi-Contributor Verification & Consensus Governance  

---

## 📌 Executive Overview

In defense and high-stakes computer vision pipelines, multi-contributor inputs (training partitions, vendor model weights, runtime edge feeds) introduce critical vulnerability surfaces that standard accuracy metrics fail to catch. Clean-label dataset poisoning, Trojan backdoors, and post-inference bitstream tampering can operate covertly with high test accuracy.

**TRUST-CV** validates cryptographic and statistical integrity across **three major trust boundaries**:
1. **Training Data Boundary:** Spectral anomaly scanning, duplicate perceptual hash (pHash) flooding, and out-of-distribution (OOD) contamination filters.
2. **Model Boundary:** SHA-256 weight fingerprinting, NIST TrojAI activation cluster detection, and supply-chain checkpoint validation.
3. **Inference Boundary:** Steganographic pixel seals (Ed25519 embedded into least-significant bits) and temporal Merkle trees for lightweight 60 FPS video verification.

All boundary proofs are synthesized in real time by an **Autonomous Governance Engine** providing a deterministic tri-state consensus verdict:
- **ACCEPT**: All cryptographic non-repudiation and distribution checks valid.
- **REVIEW**: Non-malicious environmental or sensor drift detected; flagged for operator assessment.
- **QUARANTINE**: Seal broken, weights tampered, or backdoor triggered; downstream feeds immediately isolated.

---

## 🚀 Key Modules & Capabilities

- **Overview Dashboard:** Telemetric command HUD with live KPI cards, trust gauge, and priority alert queue.
- **Data Integrity Engine:** Scans multi-contributor partitions for clean-label poisoning and duplicate flooding.
- **Model Integrity Engine:** Verifies weight checksums and scans neural activations for dormant Trojan triggers.
- **Inference Provenance Engine:** Interactive Steganographic Pixel Seal viewer and 60 FPS Temporal Merkle Tree inspector.
- **Distribution Shift Engine:** Distinguishes natural environmental shifts (fog, rain, altitude) from adversarial attacks using Maximum Mean Discrepancy (MMD).
- **Contributor Trust Engine:** Dynamic reputation telemetry without hardcoded vendor prejudice.
- **Attack Simulation Lab:** Interactive stress-testing harness with real-time governance response.
- **Cryptographic Audit Vault:** Tamper-evident ledger with SHA-256 hash chaining.
- **Assurance Report:** Formatted defense certification dossier with print-ready PDF stylesheet.
- **System Tour:** Automated 9-stage pipeline verification sequence.
- **Explainability Layer:** On-demand architectural insights referencing NIST AI 100-2e2025, FIPS 180-4, and FIPS 186-5.

---

## 🛠️ Tech Stack

- **Frontend Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (Dark Military Command Center Theme)
- **Icons:** Lucide React
- **Cryptography / Simulation:** SHA-256, Ed25519 bindings, Merkle Tree hashing, LSB steganography simulations

---

## 💻 Local Setup & Execution

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
`ash
git clone <repository-url>
cd TRUST-CV
npm install
`

### Start Development Server
`ash
npm run dev
`
Navigate to http://localhost:5173/ in your browser.

### Build for Production
`ash
npm run build
`

---

## 🔒 Security Standards & References
- **FIPS 180-4:** Secure Hash Standard (SHA-256)
- **FIPS 186-5:** Digital Signature Standard (Ed25519)
- **NIST AI 100-2e2025:** Adversarial Machine Learning Mitigation
- **NIST TrojAI:** Trojan Backdoor Benchmark
