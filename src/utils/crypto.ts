// Simulated Cryptographic Utilities for TRUST-CV
// Generates realistic FIPS 180-4 (SHA-256) and FIPS 186-5 (Ed25519) format hashes for prototype integrity validation

export function pseudoHash(seed: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  // Convert to 64-char hex-like string deterministically
  const h1 = (hash >>> 0).toString(16).padStart(8, '0');
  const h2 = ((hash ^ 0x5a5a5a5a) >>> 0).toString(16).padStart(8, '0');
  const h3 = ((hash ^ 0xa5a5a5a5) >>> 0).toString(16).padStart(8, '0');
  const h4 = ((hash ^ 0x33333333) >>> 0).toString(16).padStart(8, '0');
  const h5 = ((hash ^ 0x7c7c7c7c) >>> 0).toString(16).padStart(8, '0');
  const h6 = ((hash ^ 0x1f1f1f1f) >>> 0).toString(16).padStart(8, '0');
  const h7 = ((hash ^ 0x8b8b8b8b) >>> 0).toString(16).padStart(8, '0');
  const h8 = ((hash ^ 0x4d4d4d4d) >>> 0).toString(16).padStart(8, '0');
  return `${h1}${h2}${h3}${h4}${h5}${h6}${h7}${h8}`;
}

export function formatHashShort(hash: string, lead = 8, trail = 6): string {
  if (!hash || hash.length < lead + trail) return hash;
  return `${hash.slice(0, lead)}...${hash.slice(-trail)}`;
}

export function generateEd25519Signature(hash: string): string {
  const p1 = pseudoHash(hash + '-ed25519-r');
  const p2 = pseudoHash(hash + '-ed25519-s');
  return `MEQC${p1.slice(0, 24)}...${p2.slice(0, 24)}`;
}

export function generateNonce(): string {
  return '0x' + Math.random().toString(16).substring(2, 10).toUpperCase() + Math.random().toString(16).substring(2, 10).toUpperCase();
}

export function computeMerkleRoot(leaves: string[]): string {
  if (leaves.length === 0) return pseudoHash('empty-root');
  if (leaves.length === 1) return leaves[0];

  let currentLevel = [...leaves];
  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      if (i + 1 < currentLevel.length) {
        nextLevel.push(pseudoHash(currentLevel[i] + currentLevel[i + 1]));
      } else {
        // Odd node duplicated as in Bitcoin/Merkle standard
        nextLevel.push(pseudoHash(currentLevel[i] + currentLevel[i]));
      }
    }
    currentLevel = nextLevel;
  }
  return currentLevel[0];
}
