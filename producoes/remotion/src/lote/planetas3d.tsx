// Texturas procedurais de planetas (canvas) e o globo genérico. Usado nos Shorts de 14/11/2026 (Planetas e TrocaSol).
import React from 'react';
import {random} from 'remotion';
import {THREE} from './kit3d';

const cache: Record<string, THREE.Texture> = {};
const ruido = (x: number, y: number, s: string) => { let v = 0, a = 1, f = 1; for (let o = 0; o < 4; o++) { v += a * (Math.sin(x * f * 0.05 + random(s + o) * 9) * Math.cos(y * f * 0.07 + random(s + 'b' + o) * 9)); a *= 0.5; f *= 2.1; } return v; };
export type Tipo = 'marte' | 'mercurio' | 'venus' | 'jupiter' | 'saturno' | 'urano' | 'netuno' | 'sol' | 'lava' | 'betel';
export const texPlaneta = (t: Tipo) => {
  if (cache[t]) return cache[t];
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d')!; const im = g.createImageData(512, 256);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 512; x++) {
    const n = ruido(x, y, t), n2 = ruido(x * 3, y * 3, t + 'f');
    let r = 0, gg = 0, b = 0;
    const band = Math.sin(y * 0.18 + n * 1.2) * 0.5 + 0.5;
    if (t === 'marte') { r = 180 + n * 30 + n2 * 10; gg = 80 + n * 20; b = 50 + n * 10; if (y < 14 || y > 244) { r = gg = b = 235; } }
    else if (t === 'mercurio') { const v = 120 + n * 30 + n2 * 25; r = v; gg = v * 0.96; b = v * 0.9; }
    else if (t === 'venus') { r = 225 + n * 20; gg = 190 + n * 25 + band * 15; b = 120 + n * 20; }
    else if (t === 'jupiter') { r = 200 + band * 40 + n2 * 10; gg = 160 + band * 40; b = 120 + band * 30; if (Math.hypot((x - 340) / 2, y - 170) < 14) { r = 200; gg = 90; b = 60; } }
    else if (t === 'saturno') { r = 220 + band * 20; gg = 195 + band * 20; b = 140 + band * 15; }
    else if (t === 'urano') { r = 150 + band * 10; gg = 220 + band * 8; b = 230; }
    else if (t === 'netuno') { r = 60 + band * 20; gg = 100 + band * 30; b = 220 + n * 10; }
    else if (t === 'sol') { r = 255; gg = 200 + n * 30 + n2 * 20; b = 90 + n * 40; }
    else if (t === 'betel') { r = 255; gg = 90 + n * 40 + n2 * 20; b = 40 + n * 20; }
    else { r = 255; gg = 110 + n * 60; b = 20; }
    const o = (y * 512 + x) * 4; im.data[o] = Math.max(0, Math.min(255, r)); im.data[o + 1] = Math.max(0, Math.min(255, gg)); im.data[o + 2] = Math.max(0, Math.min(255, b)); im.data[o + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; cache[t] = tx; return tx;
};
export const Planeta: React.FC<{t: Tipo; r?: number; pos?: [number, number, number]; giro?: number; incl?: number; anel?: boolean; brilho?: boolean}> = ({t, r = 1, pos = [0, 0, 0], giro = 0, incl = 0, anel, brilho}) => (
  <group position={pos} rotation={[0, 0, incl]}>
    <mesh scale={r} rotation={[0, giro, 0]}><sphereGeometry args={[1, 96, 64]} />{brilho ? <meshBasicMaterial map={texPlaneta(t)} toneMapped={false} /> : <meshStandardMaterial map={texPlaneta(t)} roughness={0.9} />}</mesh>
    {anel && <mesh rotation={[Math.PI / 2 - 0.4, 0, 0]} scale={r}><ringGeometry args={[1.3, 2.2, 128]} /><meshStandardMaterial color="#d8c8a0" transparent opacity={0.75} side={THREE.DoubleSide} /></mesh>}
  </group>
);
