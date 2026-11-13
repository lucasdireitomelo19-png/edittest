// Longo POV "E SE o APOPHIS BATESSE na TERRA? Hora a hora, ONDE ele CAIRIA" (1920x1080). Roteiro longo_apophis.md, aprovado pelo dono (11/11/2026).
// Tudo em Remotion 3D, nenhuma cena repetida. Só a legenda (40), nomes de lugares em neon sobre a faixa de 2005, contador de tempo no canto
// (vermelho na simulação, normal no "Mas espera") e o velocímetro de 12,6 km/s. Nenhum selo: a honestidade está na voz.
import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig, Easing, staticFile} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Palavra, Final, FONTE} from '../comum';
import {criarLongo, Cap} from '../longo';
import {Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Pedras, Terra, Lua, pr, cl, THREE, Tex, bolinha} from '../lote/kit3d';
import {CP, R3, v, camLL} from '../lote/pangeia3d';
import palavras from './apophis.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const ease = Easing.inOut(Easing.cubic);
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const L3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const solDe = (c: V3): V3 => { const p = new THREE.Vector3(...c).normalize(); const lado = new THREE.Vector3(0, 1, 0).cross(p).normalize(); return V(p.multiplyScalar(4).add(lado.multiplyScalar(2.2)).add(new THREE.Vector3(0, 1.6, 0))); };
const NEON = '#39d8ff';
const VERM = '#ff2a1a';

// ---------- canvas helpers ----------
export const canvasTex = (w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')!); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
export const GRAD = canvasTex(4, 128, (g) => { const gr = g.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, '#fff'); gr.addColorStop(0.55, '#fff'); gr.addColorStop(1, '#000'); g.fillStyle = gr; g.fillRect(0, 0, 4, 128); });
GRAD.colorSpace = THREE.NoColorSpace;
const REP: Record<string, THREE.Texture> = {};
const mapaTex = (t: THREE.Texture, off: number) => { const k = t.uuid + off; if (!REP[k]) { const c = t.clone(); c.wrapS = THREE.RepeatWrapping; c.offset.set(off, 0); c.needsUpdate = true; REP[k] = c; } return REP[k]; };
// luzes das cidades: pontos nos continentes, lidos da própria textura do Blue Marble
let NOITE_T: THREE.Texture | null = null;
const luzesTex = (tex: Tex) => {
  if (NOITE_T) return NOITE_T;
  const img = tex.dia.image as HTMLImageElement; const a = document.createElement('canvas'); a.width = 1024; a.height = 512; const ga = a.getContext('2d')!; ga.drawImage(img, 0, 0, 1024, 512);
  const px = ga.getImageData(0, 0, 1024, 512).data;
  NOITE_T = canvasTex(2048, 1024, (g) => { g.fillStyle = '#000'; g.fillRect(0, 0, 2048, 1024);
    for (let i = 0; i < 26000; i++) { const x = random('lx' + i), y = 0.12 + random('ly' + i) * 0.62; const ix = Math.floor(x * 1024), iy = Math.floor(y * 512); const o = (iy * 1024 + ix) * 4;
      const r = px[o], gg = px[o + 1], b = px[o + 2]; const terra = (r + gg) / 2 > b * 0.95 && !(r > 190 && gg > 190 && b > 190);
      if (!terra || random('lk' + i) > 0.55) continue; const s = 0.6 + random('ls' + i) ** 3 * 3.2; g.fillStyle = `rgba(255,${190 + Math.floor(random('lc' + i) * 50)},120,${0.35 + random('la' + i) * 0.6})`; g.beginPath(); g.arc(x * 2048, y * 1024, s, 0, 7); g.fill(); } });
  return NOITE_T;
};
// calendário de abril de 2029 (1º de abril é domingo) com o 13 circulado
const calTex = (mes: number) => canvasTex(512, 512, (g) => {
  g.fillStyle = '#f2ede2'; g.fillRect(0, 0, 512, 512); g.fillStyle = mes === 4 ? '#c8261a' : '#4a5566'; g.fillRect(0, 0, 512, 110);
  g.fillStyle = '#20242c'; g.font = 'bold 34px sans-serif'; g.textAlign = 'center';
  const ini = [1, 4, 4, 0, 2][mes] ?? 0; const dias = [31, 28, 31, 30, 31][mes] ?? 30;
  for (let d = 1; d <= dias; d++) { const c = (ini + d - 1) % 7, l = Math.floor((ini + d - 1) / 7); const x = 44 + c * 70, y = 170 + l * 66; g.fillStyle = c === 0 ? '#c8261a' : '#20242c'; g.fillText(String(d), x, y);
    if (mes === 4 && d === 13) { g.strokeStyle = '#e0180c'; g.lineWidth = 7; g.beginPath(); g.arc(x, y - 12, 34, 0, 7); g.stroke(); } }
  for (let k = 0; k < 8; k++) { g.fillStyle = '#d8d0c0'; g.beginPath(); g.arc(60 + k * 56, 26, 9, 0, 7); g.fill(); }
});
const CAL = [0, 1, 2, 3, 4].map((m) => calTex(m));

// ---------- geometrias ----------
export const geoApo = (() => { const g = new THREE.IcosahedronGeometry(1, 6); const p = g.attributes.position as THREE.BufferAttribute; const q = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { q.fromBufferAttribute(p, i); const x = q.x; let r = 1 - 0.2 * Math.exp(-(x * x) / 0.08) + 0.08 * Math.sin(q.y * 6 + q.z * 4) + 0.05 * Math.sin(q.x * 11 + q.z * 9) + 0.025 * Math.sin(q.y * 23 + q.x * 17);
    for (let c = 0; c < 9; c++) { const cx = new THREE.Vector3(random('cx' + c) - 0.5, random('cy' + c) - 0.5, random('cz' + c) - 0.5).normalize(); const dd = q.clone().normalize().distanceTo(cx); const rr = 0.16 + random('cr' + c) * 0.2; if (dd < rr) r -= 0.07 * (1 - (dd / rr) ** 2); }
    q.multiplyScalar(r); p.setXYZ(i, q.x * 1.38, q.y * 0.86, q.z * 0.78); }
  g.computeVertexNormals(); return g; })();
export const relevo = (n: number, amp: (x: number, z: number, i: number) => number, tam = 8) => { const g = new THREE.PlaneGeometry(tam, tam, n, n); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) p.setY(i, amp(p.getX(i), p.getZ(i), i)); g.computeVertexNormals(); return g; };
const DESERTO = relevo(120, (x, z, i) => Math.sin(x * 0.5 + z * 0.3) * 0.25 + Math.max(0, -z - 6) * 0.35 * (1 + Math.sin(x * 0.7)) + (random('ds' + i) - 0.5) * 0.04, 30);
export const PLANICIE = relevo(120, (x, z, i) => Math.sin(x * 0.3) * Math.cos(z * 0.25) * 0.3 + (random('pl' + i) - 0.5) * 0.05, 40);
const ROCHA = relevo(160, (x, z, i) => Math.sin(x * 1.7) * 0.12 + Math.cos(z * 1.3 + x) * 0.1 + (random('rk' + i) - 0.5) * 0.06 - Math.max(0, 0.5 - Math.hypot(x - 1.5, z + 1) ) * 0.5, 12);
export const LAT = (n: number) => Array.from({length: n}, (_, i) => i);

// superfície viva (água, cratera, onda): a altura muda a cada quadro
export const Viva: React.FC<{n: number; tam: number; h: (x: number, z: number) => number; mat: React.ReactNode; pos?: V3}> = ({n, tam, h, mat, pos}) => {
  const g = useMemo(() => { const x = new THREE.PlaneGeometry(tam, tam, n, n); x.rotateX(-Math.PI / 2); return x; }, [n, tam]);
  const p = g.attributes.position as THREE.BufferAttribute; for (let i = 0; i < p.count; i++) p.setY(i, h(p.getX(i), p.getZ(i))); p.needsUpdate = true; g.computeVertexNormals();
  return <mesh geometry={g} position={pos}>{mat}</mesh>;
};
// tubo por uma lista de pontos, desenhado até a fração k
export const Tubo: React.FC<{pts: V3[]; r?: number; cor?: string; k?: number; o?: number; brilho?: number}> = ({pts, r = 0.01, cor = VERM, k = 1, o = 1, brilho = 1.5}) => {
  const key = pts.map((p) => p.map((x) => x.toFixed(3)).join(',')).join(';');
  const g = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), Math.max(60, pts.length * 8), r, 8, false), [key, r]); // eslint-disable-line react-hooks/exhaustive-deps
  g.setDrawRange(0, Math.floor((g.index!.count / 6) * Math.max(0, Math.min(1, k))) * 6);
  return <mesh geometry={g}><meshBasicMaterial color={new THREE.Color(cor).multiplyScalar(brilho)} transparent opacity={o} toneMapped={false} /></mesh>;
};
export const elipse = (a: number, b: number, n = 120, rot = 0, c: [number, number] = [0, 0]): V3[] => LAT(n + 1).map((i) => { const t = i / n * Math.PI * 2; const x = Math.cos(t) * a, z = Math.sin(t) * b; return [c[0] + x * Math.cos(rot) - z * Math.sin(rot), 0, c[1] + x * Math.sin(rot) + z * Math.cos(rot)]; });
// calota esférica (mancha, alvo, região) centrada em lat/lon
export const Calota: React.FC<{la: number; lo: number; ang: number; cor: string; o: number; r?: number; add?: boolean}> = ({la, lo, ang, cor, o, r = 1.006, add}) => {
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v(la, lo)), [la, lo]);
  return <mesh quaternion={q}><sphereGeometry args={[r, 64, 24, 0, Math.PI * 2, 0, ang]} /><meshBasicMaterial color={cor} alphaMap={GRAD} transparent opacity={o} depthWrite={false} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} toneMapped={false} /></mesh>;
};

// ---------- peças ----------
export const Apo: React.FC<{tex: Tex; pos?: V3; s?: number; rot?: V3; brasa?: number; cor?: string}> = ({tex, pos = [0, 0, 0], s = 1, rot = [0, 0, 0], brasa = 0, cor = '#a89c8e'}) => (
  <mesh geometry={geoApo} position={pos} scale={s} rotation={rot}><meshStandardMaterial map={tex.lua} bumpMap={tex.lua} bumpScale={0.05} color={cor} roughness={1} emissive="#ff4a10" emissiveIntensity={brasa} /></mesh>
);
export const TerraN: React.FC<{tex: Tex; luz?: number; giro?: number; nuvens?: boolean}> = ({tex, luz = 1, giro = 0, nuvens = true}) => (
  <group rotation={[0, giro, 0]}>
    <Terra tex={tex} rot={[0, 0, 0]} nuvens={nuvens} />
    <mesh><sphereGeometry args={[1.003, 128, 128]} /><meshBasicMaterial map={luzesTex(tex)} transparent opacity={luz} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
  </group>
);
export const Sat: React.FC<{pos: V3; s?: number; rot?: number}> = ({pos, s = 0.12, rot = 0}) => (
  <group position={pos} scale={s} rotation={[0, rot, 0]}>
    <mesh><boxGeometry args={[0.5, 0.5, 0.7]} /><meshStandardMaterial color="#d8b04a" metalness={0.7} roughness={0.3} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 1.05, 0, 0]}><boxGeometry args={[1.5, 0.03, 0.55]} /><meshStandardMaterial color="#1c3a7a" metalness={0.5} roughness={0.25} emissive="#0a1a40" /></mesh>)}
    <mesh position={[0, 0.4, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.3, 0.2, 20, 1, true]} /><meshStandardMaterial color="#eee" side={THREE.DoubleSide} /></mesh>
  </group>
);
const GEO_R = 6.6;
export const AnelSat: React.FC<{n?: number; r?: number; f: number; s?: number; linha?: number}> = ({n = 48, r = GEO_R, f, s = 0.12, linha = 0.35}) => <>
  {LAT(n).map((i) => { const a = i / n * Math.PI * 2 + f * 0.0015; return <Sat key={i} pos={[Math.cos(a) * r, 0, Math.sin(a) * r]} s={s} rot={-a} />; })}
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r, 0.012, 8, 200]} /><meshBasicMaterial color={NEON} transparent opacity={linha} toneMapped={false} /></mesh>
</>;
const Eiffel: React.FC<{pos?: V3; s?: number}> = ({pos = [0, 0, 0], s = 1}) => (
  <group position={pos} scale={s}>
    {[[0, 0.62, 1.25, 0.62], [0.62, 0.36, 0.62, 0.55], [1.17, 0.07, 0.36, 1.6]].map(([y, rt, rb, h], i) => <group key={i}>
      <mesh position={[0, y + h / 2, 0]} rotation={[0, Math.PI / 4, 0]}><cylinderGeometry args={[rt * 0.71, rb * 0.71, h, 4, 6, true]} /><meshStandardMaterial color="#5a4030" wireframe /></mesh>
      <mesh position={[0, y + h / 2, 0]} rotation={[0, Math.PI / 4, 0]}><cylinderGeometry args={[rt * 0.69, rb * 0.69, h, 4, 1, true]} /><meshStandardMaterial color="#3a2a20" transparent opacity={0.55} side={THREE.DoubleSide} /></mesh>
    </group>)}
    {[0.6, 1.15, 2.76].map((y, i) => <mesh key={'p' + i} position={[0, y, 0]}><boxGeometry args={[[0.9, 0.5, 0.12][i], 0.05, [0.9, 0.5, 0.12][i]]} /><meshStandardMaterial color="#4a3426" /></mesh>)}
    <mesh position={[0, 3.1, 0]}><cylinderGeometry args={[0.01, 0.03, 0.4, 6]} /><meshStandardMaterial color="#4a3426" /></mesh>
    <Brilho pos={[0, 3.3, 0]} s={0.25} cor="#ffd27a" o={0.8} />
  </group>
);
const Burj: React.FC<{pos?: V3; s?: number}> = ({pos = [0, 0, 0], s = 1}) => (
  <group position={pos} scale={s}>
    {LAT(9).map((i) => { const h = 0.92; const r = 0.42 * (1 - i / 9) + 0.03; return <mesh key={i} position={[0, i * h * 0.8 + h / 2, 0]}><cylinderGeometry args={[r * 0.85, r, h, 6]} /><meshStandardMaterial color="#b8c4d0" metalness={0.8} roughness={0.25} /></mesh>; })}
    <mesh position={[0, 8.0, 0]}><cylinderGeometry args={[0.005, 0.03, 1.0, 6]} /><meshStandardMaterial color="#c8d0d8" metalness={0.8} /></mesh>
  </group>
);
const Navio: React.FC<{pos?: V3; s?: number}> = ({pos = [0, 0, 0], s = 1}) => (
  <group position={pos} scale={s}>
    <mesh position={[0, 0.12, 0]}><boxGeometry args={[3.6, 0.3, 0.46]} /><meshStandardMaterial color="#1a2a4a" /></mesh>
    {LAT(6).map((i) => <mesh key={i} position={[-0.1 - i * 0.04, 0.32 + i * 0.1, 0]}><boxGeometry args={[3.1 - i * 0.35, 0.1, 0.42 - i * 0.02]} /><meshStandardMaterial color="#f2f2ee" emissive="#ffd890" emissiveIntensity={0.12} /></mesh>)}
    <mesh position={[0.9, 1.05, 0]}><cylinderGeometry args={[0.07, 0.09, 0.3, 16]} /><meshStandardMaterial color="#c8261a" /></mesh>
  </group>
);
export const Aviao: React.FC<{pos: V3; s?: number; rot?: V3; cor?: string}> = ({pos, s = 1, rot = [0, 0, 0], cor = '#d8dde4'}) => (
  <group position={pos} scale={s} rotation={rot}>
    <mesh rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.12, 1.4, 8, 16]} /><meshStandardMaterial color={cor} metalness={0.4} roughness={0.4} /></mesh>
    <mesh position={[0.05, 0, 0]}><boxGeometry args={[0.32, 0.03, 1.8]} /><meshStandardMaterial color={cor} metalness={0.4} roughness={0.4} /></mesh>
    <mesh position={[-0.75, 0.05, 0]}><boxGeometry args={[0.18, 0.02, 0.6]} /><meshStandardMaterial color={cor} /></mesh>
    <mesh position={[-0.75, 0.22, 0]}><boxGeometry args={[0.22, 0.34, 0.03]} /><meshStandardMaterial color={cor} /></mesh>
  </group>
);
const Nave: React.FC<{pos?: V3; s?: number; rot?: V3; abre?: number; tipo?: 'ramses' | 'apex' | 'dart'}> = ({pos = [0, 0, 0], s = 1, rot = [0, 0, 0], abre = 1, tipo = 'ramses'}) => (
  <group position={pos} scale={s} rotation={rot}>
    {tipo === 'apex' ? <mesh><cylinderGeometry args={[0.35, 0.4, 0.6, 24]} /><meshStandardMaterial color="#e8e8e0" metalness={0.3} roughness={0.5} /></mesh>
      : <mesh><boxGeometry args={[0.5, 0.5, 0.5]} /><meshStandardMaterial color={tipo === 'dart' ? '#c0c4c8' : '#d8a840'} metalness={0.7} roughness={0.3} /></mesh>}
    {[-1, 1].map((l) => <mesh key={l} position={[l * (0.3 + 0.8 * abre), 0, 0]} scale={[abre, 1, 1]}><boxGeometry args={[1.6, 0.02, tipo === 'dart' ? 0.3 : 0.6]} /><meshStandardMaterial color="#20306a" metalness={0.6} roughness={0.2} emissive="#08123a" /></mesh>)}
    {tipo === 'apex' && <mesh position={[0, 0, 0.55]} rotation={[0.9, 0, 0]}><cylinderGeometry args={[0.02, 0.02, 0.9, 8]} /><meshStandardMaterial color="#888" /></mesh>}
    <mesh position={[0, 0.42, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.32, 0.16, 24, 1, true]} /><meshStandardMaterial color="#f0f0f0" side={THREE.DoubleSide} /></mesh>
  </group>
);
export const Antena: React.FC<{pos: V3; dir: [number, number]; s?: number}> = ({pos, dir, s = 1}) => (
  <group position={pos} scale={s}>
    <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.08, 0.14, 1, 12]} /><meshStandardMaterial color="#c8ccd2" /></mesh>
    <group position={[0, 1.05, 0]} rotation={[0, dir[0], 0]}><group rotation={[dir[1], 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}><sphereGeometry args={[0.8, 32, 12, 0, Math.PI * 2, 0, 0.75]} /><meshStandardMaterial color="#e8ecf0" side={THREE.DoubleSide} metalness={0.3} roughness={0.4} /></mesh>
      <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.02, 0.02, 0.9, 6]} /><meshStandardMaterial color="#999" /></mesh>
    </group></group>
  </group>
);
export const Casa: React.FC<{pos: V3; s?: number; luz?: number; i: number}> = ({pos, s = 1, luz = 0.4, i}) => (
  <group position={pos} scale={s} rotation={[0, random('cr' + i) * 0.3, 0]}>
    <mesh position={[0, 0.25, 0]}><boxGeometry args={[0.6, 0.5, 0.5]} /><meshStandardMaterial color={['#c8b8a0', '#a8b4c0', '#d0a890', '#b8c0a0'][i % 4]} emissive="#ffc070" emissiveIntensity={random('cl' + i) < 0.5 ? luz : 0} /></mesh>
    <mesh position={[0, 0.62, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.48, 0.26, 4]} /><meshStandardMaterial color="#7a3a2a" /></mesh>
  </group>
);
export const Arvore: React.FC<{pos: V3; inc?: number; dir?: number; s?: number}> = ({pos, inc = 0, dir = 0, s = 1}) => (
  <group position={pos} rotation={[0, dir, 0]} scale={s}><group rotation={[0, 0, -inc]}>
    <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.03, 0.04, 0.3, 6]} /><meshStandardMaterial color="#4a3020" /></mesh>
    <mesh position={[0, 0.5, 0]}><coneGeometry args={[0.18, 0.55, 8]} /><meshStandardMaterial color="#2a5a2a" /></mesh>
  </group></group>
);
export const Predios: React.FC<{n: number; sem: string; z?: number; larg?: number; alt?: number; janelas?: number; cor?: string}> = ({n, sem, z = 0, larg = 20, alt = 2, janelas = 0.6, cor = '#0a0e16'}) => <>
  {LAT(n).map((i) => { const h = 0.3 + random(sem + 'h' + i) ** 2 * alt; const w = 0.25 + random(sem + 'w' + i) * 0.4; const x = (i / n - 0.5) * larg + (random(sem + 'x' + i) - 0.5) * 0.3;
    return <mesh key={i} position={[x, h / 2, z + (random(sem + 'z' + i) - 0.5) * 1.2]}><boxGeometry args={[w, h, w]} /><meshStandardMaterial color={cor} emissive="#ffcf80" emissiveIntensity={random(sem + 'j' + i) < janelas ? 0.08 + random(sem + 'e' + i) * 0.12 : 0} /></mesh>; })}
</>;
export const Ceu: React.FC<{cima: string; baixo: string}> = ({cima, baixo}) => {
  const t = useMemo(() => canvasTex(4, 256, (g) => { const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, cima); gr.addColorStop(1, baixo); g.fillStyle = gr; g.fillRect(0, 0, 4, 256); }), [cima, baixo]);
  return <mesh><sphereGeometry args={[150, 32, 16]} /><meshBasicMaterial map={t} side={THREE.BackSide} depthWrite={false} toneMapped={false} /></mesh>;
};

// ---------- a faixa de risco de 2005 (Curilas → Atlântico central) ----------
const FAIXA: [number, number][] = [[46, 151], [45, 163], [41.5, 178], [37, -166], [32, -146], [27, -126], [23.5, -112], [22, -106], [20.5, -100], [19.8, -94], [19.2, -88], [18, -80], [16.5, -72], [14.6, -62], [13, -52], [12, -42]];
const faixa3 = (r = 1.006): V3[] => FAIXA.map(([la, lo]) => V(v(la, lo, r)));
const NOMES = {curilas: [46.5, 151, 'ILHAS CURILAS'], pacifico: [38, -166, 'PACÍFICO NORTE'], baja: [24, -111, 'BAJA CALIFÓRNIA'], mexico: [22, -101, 'MÉXICO'], golfo: [22.5, -91, 'GOLFO DO MÉXICO'], caribe: [16, -75, 'CARIBE'], atlantico: [14, -46, 'ATLÂNTICO']} as const;
type Nome = keyof typeof NOMES;
// mapa plano: 4 x 2, centrado em 125° O
const MC = -125;
const mx = (lo: number) => (((lo - MC + 540) % 360) - 180) / 180 * 2;
const faixaP = (y = 0.004): V3[] => FAIXA.map(([la, lo]) => [mx(lo), y, -la / 90]);
const Mapa: React.FC<{tex: Tex; pos?: V3; enrola?: number; cor?: string}> = ({tex, pos = [0, 0, 0], enrola = 0, cor = '#e2c48e'}) => {
  const g = useMemo(() => { const x = new THREE.PlaneGeometry(4, 2, 120, 4); x.rotateX(-Math.PI / 2); return x; }, []);
  const p = g.attributes.position as THREE.BufferAttribute; const R = 0.12; const x0 = 2 - 4 * enrola;
  for (let i = 0; i < p.count; i++) { const u = (i % 121) / 120 * 4 - 2; const z = p.getZ(i); if (u <= x0) { p.setXYZ(i, u, 0, z); } else { const a = (u - x0) / R; p.setXYZ(i, x0 + Math.sin(a) * R, R - Math.cos(a) * R, z); } }
  p.needsUpdate = true; g.computeVertexNormals();
  return <mesh geometry={g} position={pos}><meshStandardMaterial map={mapaTex(tex.dia, (MC + 180) / 360 - 0.5)} color={cor} roughness={0.95} side={THREE.DoubleSide} /></mesh>;
};
const rotulos = (cam: V3, nomes: Nome[], f: number, ini: number[] = [], alvo: V3 = [0, 0, 0], tam = 54) => <>{nomes.map((n, i) => { const [la, lo, t] = NOMES[n]; return <R3 key={n} cam={cam} alvo={alvo} p={v(la, lo, 1.02)} txt={t} o={pr(f, ini[i] ?? 4, (ini[i] ?? 4) + 8)} dy={-46} tam={tam} />; })}</>;
// globo com a faixa: câmera de A até B
const GF = (o: {ca: V3; cb: V3; k?: [number, number]; nomes?: Nome[]; ini?: number[]; noite?: number; apaga?: number; sat?: string}): React.FC => () => {
  const d = useD(); const x = (f: number) => ease(Math.min(1, f / Math.max(1, d - 1)));
  const cam = (f: number) => { const t = x(f); return camLL(lerp(o.ca[0], o.cb[0], t), lerp(o.ca[1], o.cb[1], t), lerp(o.ca[2], o.cb[2], t)); };
  return <CP rot={(f) => rotulos(cam(f), o.nomes ?? [], f, o.ini)}>{(f, tex) => <>
    <Cam pos={cam(f)} /><Luzes sol={solDe(cam(f))} i={2.3} amb={0.3} /><Estrelas sem={'gf' + o.ca.join('')} />
    {o.noite ? <TerraN tex={tex} luz={o.noite} /> : <Terra tex={tex} rot={[0, 0, 0]} />}
    <Tubo pts={faixa3()} r={0.006} k={o.k ? interpolate(x(f), [0, 1], o.k) : 1} o={o.apaga ? 1 - pr(f, 0, d) * o.apaga : 1} />
    <Pos bloom={0.8} /></>}</CP>;
};

// ================= GANCHO =================
const H1: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.75, Easing.out(Easing.cubic)) * 4; return <>
  <Cam pos={[0.5, 0.4, 3.6 - pr(f, 0, d) * 0.8]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 3, 4]} i={2.4} amb={0.5} /><color attach="background" args={['#07080c']} />
  <mesh position={[0, -0.05, -0.05]}><boxGeometry args={[2.1, 2.3, 0.1]} /><meshStandardMaterial color="#2a2018" /></mesh>
  <mesh position={[0, 0, 0.01]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={CAL[4]} roughness={0.8} /></mesh>
  {[3, 2, 1, 0].map((m) => { const vira = Math.min(1, Math.max(0, k - (3 - m))); return vira >= 1 ? null : <group key={m} position={[0, 1, 0.02 + (4 - m) * 0.002]} rotation={[-vira * Math.PI * 0.95, 0, 0]}>
    <mesh position={[0, -1, 0]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={CAL[m]} side={THREE.DoubleSide} roughness={0.8} /></mesh></group>; })}
  <Pos bloom={0.4} /></>; }}</CP>; };
const H2: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0, 6 - f * 0.012]} /><Luzes sol={[-4, 2, 3]} i={3} amb={0.04} /><Estrelas sem="h2" />
  <Apo tex={tex} rot={[0.3, f * 0.01, f * 0.004]} />
  <Brilho pos={[-30, 12, -60]} s={14} cor="#fff2d0" o={0.9} />
  <Pos bloom={0.9} /></>}</CP>;
const H3: React.FC = () => <CP>{(f, tex) => { const t = pr(f, 0, 140, Easing.linear); return <>
  <Cam pos={[3.6, 0.35, 7.2]} alvo={[1.5, 0, 4]} /><Luzes sol={[-6, 3, 8]} i={2.4} amb={0.12} /><Estrelas sem="h3" />
  <Terra tex={tex} rot={[0.2, f * 0.002, 0]} />
  <AnelSat f={f} s={0.08} linha={0.25} />
  <Apo tex={tex} pos={[lerp(-6, 9, t), 0.15, lerp(5.6, 6.0, t)]} s={0.22} rot={[f * 0.02, f * 0.01, 0]} />
  <Pos bloom={0.8} /></>; }}</CP>;
const H4: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[Math.sin(f * 0.006) * 4.2, 0.6, Math.cos(f * 0.006) * 4.2]} /><Luzes sol={[-5, 1, -2]} i={3.4} amb={0.02} /><Estrelas sem="h4" />
  <directionalLight position={[4, -1, 2]} intensity={0.5} color="#4a7aff" />
  <Apo tex={tex} rot={[0.4, f * 0.004, 0.2]} />
  <Pos bloom={1} /></>}</CP>;
const H5: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 8, d - 10, Easing.inOut(Easing.quad)); const P = faixaP(0.01); const cur = new THREE.CatmullRomCurve3(P.map((p) => new THREE.Vector3(...p))).getPoint(Math.max(0.001, k)); return <>
  <Cam pos={[cur.x * 0.6 + 0.2, 1.5, cur.z + 1.6]} alvo={[cur.x * 0.8, 0, cur.z]} /><Luzes sol={[1, 4, 2]} i={2.2} amb={0.35} /><color attach="background" args={['#120c08']} />
  <pointLight position={[cur.x + 0.5, 1, cur.z + 0.5]} intensity={2} color="#ffd8a0" />
  <Mapa tex={tex} /><Tubo pts={P} r={0.012} k={k} brilho={1.2} />
  <group position={[cur.x, 0.02, cur.z]} rotation={[0.5, 0.3, -0.35]}>
    <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.018, 0.006, 0.7, 10]} /><meshStandardMaterial color="#1a1a1a" /></mesh>
    <mesh position={[0.06, 0.62, 0.05]} rotation={[0, 0, 0.4]}><capsuleGeometry args={[0.09, 0.32, 8, 16]} /><meshStandardMaterial color="#050505" roughness={1} /></mesh>
    <mesh position={[0.24, 0.92, 0.08]} rotation={[0, 0, 0.9]}><capsuleGeometry args={[0.1, 0.6, 8, 16]} /><meshStandardMaterial color="#050505" roughness={1} /></mesh>
  </group>
  <Pos bloom={0.5} /></>; }}</CP>; };
const H6: React.FC = () => <CP>{(f, tex) => { const cam = camLL(25, -120 + f * 0.08, 2.6); return <>
  <Cam pos={cam} /><Luzes sol={[-3, 1, -4]} i={1.6} amb={0.05} /><Estrelas sem="h6" />
  <TerraN tex={tex} luz={0.9} />
  <Tubo pts={faixa3()} r={0.006} brilho={1.3 + Math.sin(f * 0.2) * 0.4} />
  <Pos bloom={1.1} /></>; }}</CP>;
const H7: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.in(Easing.quad)); return <>
  <Cam pos={[0.8, 0.5, 3.4]} alvo={[0.2, 0.1, 0]} /><Luzes sol={[-5, 0.5, -4]} i={1.4} amb={0.03} /><Estrelas sem="h7" />
  <TerraN tex={tex} giro={-1.7 + f * 0.0015} />
  <Brilho pos={L3([4, 2.2, -3], [1.5, 0.8, 1.2], t)} s={0.25 + t * 0.6} cor="#fff4dc" o={0.9} />
  <Pos bloom={1.2} /></>; }}</CP>; };
const H8: React.FC = () => <CP>{(f) => { const g = f * 0.05; return <>
  <Cam pos={[0, 0.3, 3.3]} /><Luzes sol={[2, 3, 3]} i={2} amb={0.3} /><color attach="background" args={['#05060a']} />
  <group rotation={[0, 0, Math.min(Math.PI, Math.floor(f / 50) * Math.PI + pr(f % 50, 40, 50) * Math.PI)]}>
    {[-1, 1].map((l) => <mesh key={l} position={[0, l * 0.45, 0]} rotation={[l > 0 ? Math.PI : 0, 0, 0]}><coneGeometry args={[0.42, 0.9, 32, 1, true]} /><meshPhysicalMaterial color="#cfe6ff" transmission={0.9} roughness={0.05} transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>)}
    {[-1, 1].map((l) => <mesh key={'t' + l} position={[0, l * 0.93, 0]}><cylinderGeometry args={[0.5, 0.5, 0.06, 32]} /><meshStandardMaterial color="#5a3a20" /></mesh>)}
  </group>
  <mesh position={[0, -0.6, 0]}><coneGeometry args={[0.3, 0.25 + (g % 1) * 0.1, 32]} /><meshStandardMaterial color="#e0b060" emissive="#ff8a20" emissiveIntensity={0.2} /></mesh>
  <mesh position={[0, -0.1, 0]}><cylinderGeometry args={[0.012, 0.012, 0.8, 6]} /><meshStandardMaterial color="#e0b060" emissive="#ff8a20" emissiveIntensity={0.4} /></mesh>
  <Pos bloom={0.6} /></>; }}</CP>;
const H9: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.8, 5 + f * 0.02]} alvo={[0.5, 0, 0]} /><Luzes sol={[5, 1, 2]} i={2.6} amb={0.05} /><Estrelas sem="h9" />
  <Terra tex={tex} rot={[0.25, f * 0.002, 0]} />
  <Apo tex={tex} pos={[2.2 - f * 0.004, 0.6, 1]} s={0.18} rot={[f * 0.01, 0, f * 0.02]} />
  <Tubo pts={LAT(40).map((i) => [2.2 - i * 0.3, 0.6 - i * 0.004, 1 - i * 0.05] as V3).reverse()} r={0.004} cor="#ffffff" o={0.25} brilho={1} />
  <Pos bloom={0.9} /></>}</CP>;

// ================= 1. O DIA MARCADO =================
const C1a: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.7, Easing.out(Easing.cubic)); const hm = (18 + 46 / 60) * k + 6 * (1 - k); const mn = hm * 60; return <>
  <Cam pos={[0.4, 0.2, 3.2]} /><Luzes sol={[2, 2, 4]} i={2.4} amb={0.25} /><color attach="background" args={['#05070c']} />
  <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.05, 1.05, 0.12, 64]} /><meshStandardMaterial color="#20242c" metalness={0.8} roughness={0.25} /></mesh>
  <mesh position={[0, 0, 0.065]}><circleGeometry args={[0.98, 64]} /><meshStandardMaterial color="#0b0e14" /></mesh>
  {LAT(60).map((i) => { const a = i / 60 * Math.PI * 2; const big = i % 5 === 0; return <mesh key={i} position={[Math.sin(a) * 0.86, Math.cos(a) * 0.86, 0.07]} rotation={[0, 0, -a]}><boxGeometry args={[big ? 0.03 : 0.012, big ? 0.12 : 0.05, 0.01]} /><meshBasicMaterial color={big ? NEON : '#557'} toneMapped={false} /></mesh>; })}
  <group position={[0, 0, 0.09]} rotation={[0, 0, -(hm % 12) / 12 * Math.PI * 2]}><mesh position={[0, 0.25, 0]}><boxGeometry args={[0.05, 0.5, 0.02]} /><meshStandardMaterial color="#e8eef6" /></mesh></group>
  <group position={[0, 0, 0.1]} rotation={[0, 0, -(mn % 60) / 60 * Math.PI * 2]}><mesh position={[0, 0.36, 0]}><boxGeometry args={[0.03, 0.72, 0.02]} /><meshStandardMaterial color="#e8eef6" /></mesh></group>
  <mesh position={[0, 0, 0.12]}><cylinderGeometry args={[0.05, 0.05, 0.03, 20]} /><meshStandardMaterial color={VERM} /></mesh>
  <Pos bloom={0.6} /></>; }}</CP>; };
const C1b: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.linear); const pts: V3[] = LAT(41).map((i) => [-14 + i * 0.7, 0.3, 6.0 + Math.pow((i - 20) / 20, 2) * 2]); const p = new THREE.CatmullRomCurve3(pts.map((x) => new THREE.Vector3(...x))).getPoint(t * 0.8 + 0.1); return <>
  <Cam pos={[0, 14, 9]} alvo={[0, 0, 2]} /><Luzes sol={[-6, 6, 8]} i={2.4} amb={0.15} /><Estrelas sem="c1b" />
  <Terra tex={tex} rot={[0, f * 0.003, 0]} />
  <Tubo pts={pts} r={0.03} cor="#ffffff" o={0.4} brilho={1} />
  <Apo tex={tex} pos={V(p)} s={0.25} rot={[f * 0.02, f * 0.01, 0]} />
  <Tubo pts={[[0, 0, 1], V(p.clone().multiplyScalar(0.98))]} r={0.02} cor={NEON} o={0.8} />
  <Pos bloom={0.8} /></>; }}</CP>; };
const C1c: React.FC = () => <CP>{(f, tex) => { const a = f * 0.004 + 0.5; return <>
  <Cam pos={[Math.sin(a) * 15, 4.5, Math.cos(a) * 15]} /><Luzes sol={[-8, 4, 10]} i={2.4} amb={0.15} /><Estrelas sem="c1c" />
  <Terra tex={tex} rot={[0.4, f * 0.002, 0]} />
  <AnelSat f={f} n={60} s={0.15} linha={0.55} />
  <Pos bloom={0.9} /></>; }}</CP>;
const C1d: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.linear); return <>
  <Cam pos={[0, 18, 0.01]} /><Luzes sol={[0, 10, 4]} i={2.4} amb={0.2} /><Estrelas sem="c1d" />
  <Terra tex={tex} rot={[Math.PI / 2, 0, f * 0.002]} />
  <AnelSat f={f} n={60} s={0.16} linha={0.6} />
  <Tubo pts={[[-12, 0.3, 4.6], [12, 0.3, 3.4]]} r={0.04} cor={VERM} k={t} o={0.7} />
  <Apo tex={tex} pos={[lerp(-12, 12, t), 0.3, lerp(4.6, 3.4, t)]} s={0.4} rot={[f * 0.02, 0, f * 0.01]} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const C1e: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.in(Easing.quad)); return <>
  <Cam pos={[0, 0, lerp(12, 2.3, t)]} tremor={t * 0.03} /><Luzes sol={[-3, 2, 4]} i={3} amb={0.03} /><Estrelas sem="c1e" />
  <Apo tex={tex} rot={[0.2, f * 0.006, 0.1]} />
  <Nuvem n={200} sem="c1e" origem={new THREE.Vector3(0, 0, 0)} t={30 + f} raio={3} cor="#8a8070" tam={0.03} o={0.5} />
  <Pos bloom={0.7} /></>; }}</CP>; };
const C1f: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d); return <>
  <Cam pos={[lerp(-3, 4, t), 2.6, 11]} alvo={[lerp(-2, 3, t), 2.8, 0]} /><Luzes sol={[-4, 6, 6]} i={2.2} amb={0.35} />
  <Ceu cima="#1a2a4a" baixo="#e88a50" />
  <mesh geometry={PLANICIE} position={[0, -0.1, -6]}><meshStandardMaterial color="#3a3a30" roughness={1} /></mesh>
  <Eiffel pos={[-3, 0, 0]} /><Apo tex={tex} pos={[0, 1.75, 0]} s={1.25} rot={[0, f * 0.003, Math.PI / 2]} /><Burj pos={[3.6, 0, 0]} />
  <Pos bloom={0.5} /></>; }}</CP>; };
const C1g: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d); return <>
  <Cam pos={[lerp(-1, 2, t), 1.8, 7]} alvo={[0.5, 0.6, 0]} /><Luzes sol={[3, 5, 6]} i={2.2} amb={0.4} />
  <Ceu cima="#2a5a9a" baixo="#b8d8f0" />
  <Viva n={90} tam={40} h={(x, z) => Math.sin(x * 1.2 + f * 0.08) * 0.03 + Math.sin(z * 1.7 + f * 0.06) * 0.03} mat={<meshStandardMaterial color="#1a4a6a" roughness={0.2} metalness={0.4} />} />
  <Navio pos={[-0.4, 0, 1.5]} /><Apo tex={tex} pos={[0.2, 0.55, -1.4]} s={1.3} rot={[0.1, 0, 0]} />
  <Pos bloom={0.4} /></>; }}</CP>; };
const C1h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d); return <>
  <Cam pos={[-2.2, 0.3, 3.2]} alvo={[0, lerp(0.8, 3.4, t), 0]} /><Luzes sol={[3, 6, 2]} i={2.2} amb={0.3} />
  <Ceu cima="#0a1428" baixo="#5a4a6a" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#2a2a26" /></mesh>
  <Eiffel pos={[-0.8, 0, -0.6]} /><Apo tex={tex} pos={[1.3, 1.75, -1]} s={1.25} rot={[0, 0.4, Math.PI / 2]} />
  <Pos bloom={0.6} /></>; }}</CP>; };
const C1i: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 4, d * 0.7, Easing.out(Easing.back(1.4))); const a = -0.32 * k; return <>
  <Cam pos={[0, 1.4, 6.5]} alvo={[0, 0.8, 0]} /><Luzes sol={[2, 5, 4]} i={2.4} amb={0.3} /><color attach="background" args={['#07080c']} />
  <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.08, 0.2, 1.8, 16]} /><meshStandardMaterial color="#8a7050" metalness={0.7} roughness={0.3} /></mesh>
  <group position={[0, 1.85, 0]} rotation={[0, 0, a]}>
    <mesh><boxGeometry args={[4, 0.08, 0.12]} /><meshStandardMaterial color="#a88a5a" metalness={0.8} roughness={0.3} /></mesh>
    {[-1, 1].map((l) => <group key={l} position={[l * 1.9, 0, 0]} rotation={[0, 0, -a]}>
      <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.6, 0.5, 0.06, 32]} /><meshStandardMaterial color="#a88a5a" metalness={0.8} roughness={0.3} /></mesh>
      {l < 0 ? <Apo tex={tex} pos={[0, -0.25, 0]} s={0.38} rot={[0, f * 0.01, 0]} /> : LAT(5).map((i) => <mesh key={i} position={[(i - 2) * 0.16, -0.5, 0]}><boxGeometry args={[0.12, 0.14, 0.2]} /><meshStandardMaterial color="#5a6a7a" /></mesh>)}
    </group>)}
  </group>
  <Pos bloom={0.5} /></>; }}</CP>; };
const C1j: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d); return <>
  <Cam pos={[5, 3, 9]} alvo={[1, 0, 0]} /><Luzes sol={[-4, 3, 6]} i={2.3} amb={0.15} /><Estrelas sem="c1j" />
  <Terra tex={tex} rot={[0.2, f * 0.002, 0]} />
  {LAT(9).map((i) => { const dz = (i - 4) * 0.45; return <Tubo key={i} pts={LAT(20).map((j) => [10 - j * 0.7, 0.2 + dz * 0.2, 2 + dz - Math.pow(j / 19, 2) * (2 + dz) * (i === 3 ? 1.1 : 0.6)] as V3)} r={0.015} cor={i === 3 ? VERM : '#ffffff'} o={i === 3 ? 0.9 : 0.25} k={t * 1.2} />; })}
  <Apo tex={tex} pos={[10, 0.2, 2]} s={0.2} rot={[f * 0.02, 0, 0]} />
  <Pos bloom={0.9} /></>; }}</CP>; };

// ================= 2. A DESCOBERTA =================
const C2a: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 10, d - 10); return <>
  <Cam pos={[6 - f * 0.01, 1.6, 9]} alvo={[0, 1.4, 0]} /><Luzes sol={[-3, 5, 2]} i={0.5} amb={0.08} /><Estrelas sem="c2a" n={3000} />
  <mesh geometry={DESERTO}><meshStandardMaterial color="#3a2c22" roughness={1} /></mesh>
  <mesh position={[0, 0.7, 0]}><cylinderGeometry args={[1.2, 1.2, 1.4, 48]} /><meshStandardMaterial color="#c8ccd2" /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[0, 1.4, 0]} rotation={[0, l * k * 0.35, 0]}><sphereGeometry args={[1.2, 48, 24, l > 0 ? 0.08 : Math.PI + 0.08, Math.PI - 0.16, 0, Math.PI / 2]} /><meshStandardMaterial color="#e2e6ea" side={THREE.DoubleSide} /></mesh>)}
  <pointLight position={[0, 1.8, 0.8]} intensity={0.8 * k} color="#ff5040" distance={4} />
  <Pos bloom={0.6} /></>; }}</CP>; };
const C2b: React.FC = () => <CP>{(f) => { const pisca = Math.floor(f / 12) % 2; return <>
  <Cam pos={[0, 0, 0.01]} alvo={[0, 0, -10]} /><Estrelas sem="c2b" n={4000} />
  <Brilho pos={[0.8 + (pisca ? 0.12 : 0), 0.3, -10]} s={0.35} cor="#ffffff" o={0.95} />
  <mesh position={[0.86, 0.3, -9.9]}><ringGeometry args={[0.3, 0.33, 48]} /><meshBasicMaterial color={NEON} transparent opacity={0.4 + 0.4 * pisca} toneMapped={false} /></mesh>
  <mesh position={[0, 0, -2]}><ringGeometry args={[1.0, 4, 64]} /><meshBasicMaterial color="#000" /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>;
const C2c: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d - 10); return <>
  <Cam pos={[0, 9, 7]} /><Luzes sol={[0, 3, 0]} i={0.5} amb={0.4} /><Estrelas sem="c2c" />
  <Brilho pos={[0, 0, 0]} s={2.6} cor="#ffcf70" o={1} /><mesh><sphereGeometry args={[0.35, 32, 32]} /><meshBasicMaterial color="#ffe0a0" toneMapped={false} /></mesh>
  <Tubo pts={elipse(4, 4)} r={0.025} cor="#4aa8ff" k={1} o={0.6} />
  <Tubo pts={elipse(4.6, 3.3, 120, 0.6, [-0.5, 0.3])} r={0.025} cor="#ffffff" k={k} o={0.9} />
  <mesh position={[4, 0, 0]}><sphereGeometry args={[0.12, 24, 24]} /><meshStandardMaterial color="#3a7aff" emissive="#1a4aaa" /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>; };
const C2d: React.FC = () => <CP>{(f) => { const pulse = 0.6 + 0.4 * Math.sin(f * 0.25); const ang = f * 0.01; return <>
  <Cam pos={[3 + Math.sin(ang) * 2.4, 2.4, 2.6]} alvo={[3.6, 0, 1.2]} /><Luzes sol={[0, 3, 0]} i={0.5} amb={0.4} /><Estrelas sem="c2d" />
  <Brilho pos={[0, 0, 0]} s={2.6} cor="#ffcf70" o={0.6} />
  <Tubo pts={elipse(4, 4)} r={0.02} cor="#4aa8ff" o={0.7} /><Tubo pts={elipse(4.6, 3.3, 120, 0.6, [-0.5, 0.3])} r={0.02} cor="#ffffff" o={0.8} />
  <Brilho pos={[3.62, 0, 1.72]} s={1.4 * pulse} cor={VERM} o={0.9} />
  <Pos bloom={1} /></>; }}</CP>;
const C2e: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 6, d - 12, Easing.out(Easing.cubic)); const n = Math.round(k * 10); return <>
  <Cam pos={[2.2, 1.6, 4.2]} alvo={[0, 1.5, 0]} /><Luzes sol={[3, 4, 4]} i={1.6} amb={0.3} /><color attach="background" args={['#050508']} />
  {LAT(10).map((i) => { const c = new THREE.Color('#2aff6a').lerp(new THREE.Color(VERM), i / 9); return <mesh key={i} position={[0, 0.15 + i * 0.3, 0]}><boxGeometry args={[0.9 - i * 0.02, 0.24, 0.9 - i * 0.02]} /><meshStandardMaterial color={i < n ? c : '#15161a'} emissive={i < n ? c : '#000'} emissiveIntensity={i < n ? 1.2 : 0} toneMapped={false} /></mesh>; })}
  <Pos bloom={1.1} /></>; }}</CP>; };
const C2f: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d * 0.6); return <>
  <Cam pos={[0, 1.4, 7 - k]} alvo={[0, 1, 0]} /><Luzes sol={[2, 5, 3]} i={1.5} amb={0.15} /><color attach="background" args={['#050508']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[8, 64]} /><meshStandardMaterial color="#101116" /></mesh>
  {LAT(8).map((i) => { const a = (i / 8 - 0.5) * 2.4; return <group key={i} position={[Math.sin(a) * 3, 0, -Math.cos(a) * 3 + 2]}><mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.35, 0.35, 0.3, 24]} /><meshStandardMaterial color="#2a2c34" /></mesh><Apo tex={tex} pos={[0, 0.55, 0]} s={0.15 + random('c2f' + i) * 0.1} rot={[i, f * 0.01, 0]} cor="#6a6660" /></group>; })}
  <mesh position={[0, 0.5 + k * 0.6, 0]}><cylinderGeometry args={[0.5, 0.5, 1 + k * 1.2, 32]} /><meshStandardMaterial color="#3a0a08" emissive={VERM} emissiveIntensity={0.3} /></mesh>
  <Apo tex={tex} pos={[0, 1.4 + k * 1.2, 0]} s={0.4} rot={[0.2, f * 0.012, 0]} brasa={0.15} />
  <spotLight position={[0, 6, 2]} angle={0.3} intensity={30} color="#ff4030" />
  <Pos bloom={0.8} /></>; }}</CP>; };
const C2g: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[Math.cos(f * 0.004) * 3.4, -0.6, Math.sin(f * 0.004) * 3.4]} /><Luzes sol={[0, -4, 1]} i={0.2} amb={0.0} /><Estrelas sem="c2g" />
  <pointLight position={[2, -2, 2]} intensity={14} color="#ff2a1a" /><pointLight position={[-3, 2, -1]} intensity={4} color="#600a0a" />
  <Apo tex={tex} rot={[0.3, f * 0.005, 0.5]} />
  <Pos bloom={1.1} /></>}</CP>;
const C2h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[4, 3, 8]} alvo={[2, 0, 0]} /><Luzes sol={[-4, 3, 6]} i={2.2} amb={0.2} /><Estrelas sem="c2h" />
  <Terra tex={tex} rot={[0.2, f * 0.002, 0]} />
  <mesh position={[lerp(1.6, 4.6, k), 0.3, 0.5]} scale={[lerp(2.6, 0.25, k), lerp(0.6, 0.12, k), lerp(0.6, 0.12, k)]}><sphereGeometry args={[1, 32, 16]} /><meshBasicMaterial color={NEON} transparent opacity={0.22} depthWrite={false} toneMapped={false} /></mesh>
  <Apo tex={tex} pos={[lerp(1.6, 4.6, k), 0.3, 0.5]} s={0.1} rot={[f * 0.02, 0, 0]} />
  {LAT(3).map((i) => <Tubo key={i} pts={[[0.7, 0.65, 0.3], [lerp(1.6, 4.6, k), 0.3 + (i - 1) * 0.05, 0.5]]} r={0.006} cor="#7affc0" o={0.5 * (0.5 + 0.5 * Math.sin(f * 0.3 + i))} />)}
  <Pos bloom={0.9} /></>; }}</CP>; };
const C2i: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.5, Easing.in(Easing.quad)); const s = pr(f, d * 0.55, d * 0.7, Easing.out(Easing.back(2))); return <>
  <Cam pos={[0, 2.6, 2.6]} alvo={[0, 0, 0]} /><Luzes sol={[2, 5, 2]} i={2.2} amb={0.35} /><color attach="background" args={['#0a0806']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}><planeGeometry args={[8, 8]} /><meshStandardMaterial color="#3a2a1c" /></mesh>
  <mesh position={[0, 0.01, 0]}><boxGeometry args={[1.6, 0.02, 1.1]} /><meshStandardMaterial color="#c8a868" /></mesh>
  {LAT(4).map((i) => <mesh key={i} position={[0, 0.03 + i * 0.004, 0]} rotation={[0, (random('fl' + i) - 0.5) * 0.1, 0]}><boxGeometry args={[1.4, 0.003, 0.95]} /><meshStandardMaterial color="#f0ece2" /></mesh>)}
  <group position={[0, 0.03, -0.55]} rotation={[-(1 - k) * Math.PI * 0.9, 0, 0]}><mesh position={[0, 0, 0.55]}><boxGeometry args={[1.6, 0.02, 1.1]} /><meshStandardMaterial color="#d8b878" /></mesh></group>
  {s > 0 && <mesh position={[0.25, 0.06, 0.1]} rotation={[-Math.PI / 2, 0, 0.3]} scale={lerp(2, 1, s)}><ringGeometry args={[0.18, 0.24, 48]} /><meshBasicMaterial color="#d01a10" transparent opacity={Math.min(1, s)} /></mesh>}
  <Pos bloom={0.3} /></>; }}</CP>; };
const C2j: React.FC = () => <CP>{(f, tex) => { const p = 0.5 + 0.5 * Math.sin(f * 0.15); return <>
  <Cam pos={[1.5, 1.2, 6.5 - f * 0.008]} alvo={[2.3, 0.3, 0]} /><Luzes sol={[-4, 2, 5]} i={2.2} amb={0.2} /><Estrelas sem="c2j" />
  <Terra tex={tex} rot={[0.2, f * 0.002, 0]} />
  <mesh position={[3, 0.4, 0.8]} rotation={[0, -0.4, 0]}><torusGeometry args={[0.22, 0.012, 12, 64]} /><meshBasicMaterial color={NEON} transparent opacity={0.4 + 0.5 * p} toneMapped={false} /></mesh>
  <Brilho pos={[3, 0.4, 0.8]} s={0.5 + p * 0.3} cor={NEON} o={0.5} />
  <Pos bloom={1} /></>; }}</CP>;
const C2k: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d - 6); const pts: V3[] = LAT(50).map((i) => { const t = i / 49; const a = lerp(-2.2, 1.2, t); const r = 2.4 + Math.pow((t - 0.5) * 2, 2) * 6; return [Math.cos(a) * r, 0.3, Math.sin(a) * r]; }); return <>
  <Cam pos={[0, 11, 6]} alvo={[0, 0, 0]} /><Luzes sol={[0, 8, 4]} i={2.2} amb={0.2} /><Estrelas sem="c2k" />
  <Terra tex={tex} rot={[0.6, f * 0.002, 0]} />
  <Tubo pts={pts} r={0.05} cor="#ff8a3a" k={k} />
  <Apo tex={tex} pos={V(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))).getPoint(Math.max(0.001, k)))} s={0.3} rot={[f * 0.02, 0, 0]} />
  <Pos bloom={0.9} /></>; }}</CP>; };

// ================= 3. O MAPA DE 2005 =================
const Apollo: React.FC<{pos?: V3; rot?: V3; s?: number}> = ({pos = [0, 0, 0], rot = [0, 0, 0], s = 1}) => (
  <group position={pos} rotation={rot} scale={s}>
    <mesh position={[0, 0.55, 0]}><coneGeometry args={[0.4, 0.45, 32]} /><meshStandardMaterial color="#d8dce0" metalness={0.9} roughness={0.15} /></mesh>
    <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.4, 0.4, 0.75, 32]} /><meshStandardMaterial color="#c8ccd0" metalness={0.6} roughness={0.35} /></mesh>
    <mesh position={[0, -0.5, 0]}><coneGeometry args={[0.2, 0.35, 24, 1, true]} /><meshStandardMaterial color="#4a4a4a" side={THREE.DoubleSide} /></mesh>
    <group position={[0, 1.15, 0]}>
      <mesh><boxGeometry args={[0.55, 0.45, 0.55]} /><meshStandardMaterial color="#c8a040" metalness={0.8} roughness={0.35} /></mesh>
      {LAT(4).map((i) => { const a = i * Math.PI / 2 + Math.PI / 4; return <mesh key={i} position={[Math.cos(a) * 0.38, 0.4, Math.sin(a) * 0.38]} rotation={[Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5]}><cylinderGeometry args={[0.015, 0.015, 0.5, 6]} /><meshStandardMaterial color="#c8a040" /></mesh>; })}
    </group>
  </group>
);
const C3a: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[1.2, 0.4, 2.6]} alvo={[0.3, 0, 0]} /><Luzes sol={[4, 2, 3]} i={2.6} amb={0.1} /><Estrelas sem="c3a" />
  <Terra tex={tex} pos={[0, -2.6, -2]} r={2.4} rot={[0.3, f * 0.001, 0]} />
  <Apollo pos={[0.4, 0.3, 0]} rot={[1.2 + f * 0.002, 0.4, 0.3]} s={0.45} />
  <Pos bloom={0.7} /></>}</CP>;
const C3b: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0.9, 0.3, 2.3]} alvo={[0, 0.1, 0]} /><Luzes sol={[4, 3, 2]} i={2.8} amb={0.1} /><Estrelas sem="c3b" />
  <Terra tex={tex} pos={[0, -3.2, -3]} r={3} rot={[0.5, f * 0.0008, 0]} />
  <group position={[-0.6, 0.2 + Math.sin(f * 0.03) * 0.03, 0]} rotation={[0.2, 0.5 + f * 0.002, 0.15]} scale={0.32}>
    <mesh><capsuleGeometry args={[0.32, 0.55, 8, 16]} /><meshStandardMaterial color="#f2f2ee" roughness={0.8} /></mesh>
    <mesh position={[0, 0.72, 0]}><sphereGeometry args={[0.3, 32, 32]} /><meshStandardMaterial color="#f2f2ee" roughness={0.6} /></mesh>
    <mesh position={[0, 0.72, 0.14]}><sphereGeometry args={[0.22, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#d8a030" metalness={1} roughness={0.1} /></mesh>
    <mesh position={[0, 0.2, -0.38]}><boxGeometry args={[0.5, 0.6, 0.22]} /><meshStandardMaterial color="#e8e8e2" /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.45, 0.15, 0]} rotation={[0, 0, l * 0.5]}><capsuleGeometry args={[0.1, 0.45, 6, 12]} /><meshStandardMaterial color="#f2f2ee" /></mesh>)}
    {[-1, 1].map((l) => <mesh key={'p' + l} position={[l * 0.17, -0.65, 0]} rotation={[l * 0.2, 0, 0]}><capsuleGeometry args={[0.12, 0.5, 6, 12]} /><meshStandardMaterial color="#f2f2ee" /></mesh>)}
  </group>
  <Apollo pos={[0.8, 0.1, -0.8]} rot={[0.3, 0, 1.2]} s={0.4} />
  <Pos bloom={0.6} /></>}</CP>;
const C3c: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 1.2, 5.4]} /><Luzes sol={[-4, 3, 5]} i={2.4} amb={0.2} /><Estrelas sem="c3c" />
  <Terra tex={tex} rot={[0.3, f * 0.003, 0]} />
  <mesh><sphereGeometry args={[1.45, 48, 24]} /><meshBasicMaterial color={NEON} wireframe transparent opacity={0.12 + 0.05 * Math.sin(f * 0.2)} toneMapped={false} /></mesh>
  {LAT(6).map((i) => { const t = ((f + i * 25) % 150) / 150; const a = i * 1.1; const r = t < 0.5 ? lerp(5, 1.5, t * 2) : 1.5 + (t - 0.5) * 8; const ang = t < 0.5 ? a : a + 0.8; return <group key={i}>
    <Apo tex={tex} pos={[Math.cos(ang) * r, Math.sin(a * 2) * 0.8, Math.sin(ang) * r]} s={0.08} rot={[f * 0.05, i, 0]} />
    {Math.abs(t - 0.5) < 0.05 && <Brilho pos={[Math.cos(a) * 1.5, Math.sin(a * 2) * 0.8, Math.sin(a) * 1.5]} s={0.6} cor={NEON} o={0.8} />}</group>; })}
  <Pos bloom={0.9} /></>}</CP>;
const C3d: React.FC = () => { const d = useD(); return <CP>{(f, tex) => <>
  <Cam pos={[0, 3.2, 2.2]} alvo={[0, 0, 0]} /><Luzes sol={[1, 5, 3]} i={2} amb={0.35} /><color attach="background" args={['#0c0806']} />
  <mesh position={[0, -0.03, 0]}><boxGeometry args={[6, 0.04, 4]} /><meshStandardMaterial color="#3a2414" roughness={0.7} /></mesh>
  <Mapa tex={tex} enrola={1 - pr(f, 0, d * 0.7, Easing.out(Easing.cubic))} />
  <Pos bloom={0.3} /></>}</CP>; };
const C3e: React.FC = () => <CP>{(f, tex) => { const x = -0.95 + f * 0.006; return <>
  <Cam pos={[x - 0.3, 0.12, -0.15]} alvo={[x + 0.4, 0, -0.32]} /><Luzes sol={[1, 3, 2]} i={2} amb={0.4} /><color attach="background" args={['#0c0806']} />
  <Mapa tex={tex} /><Tubo pts={faixaP(0.006)} r={0.009} brilho={1.6} />
  <Pos bloom={0.8} /></>; }}</CP>;
const C3f: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d, Easing.linear); const pts: V3[] = LAT(60).map((i) => { const a = i / 59 * Math.PI * 2 * 0.95; return [Math.cos(a) * 8 - 6.5, 0.2, Math.sin(a) * 5]; }); const p = new THREE.CatmullRomCurve3(pts.map((x) => new THREE.Vector3(...x))).getPoint(Math.max(0.001, k)); return <>
  <Cam pos={[-3, 9, 9]} alvo={[-1.5, 0, 0]} /><Luzes sol={[-4, 5, 6]} i={2.2} amb={0.2} /><Estrelas sem="c3f" />
  <Terra tex={tex} r={0.6} rot={[0.4, f * 0.003, 0]} />
  {LAT(30).map((i) => i % 2 ? null : <Tubo key={i} pts={pts.slice(i * 2, i * 2 + 2).length === 2 ? pts.slice(i * 2, i * 2 + 2) : [pts[0], pts[1]]} r={0.03} cor="#ffffff" o={0.35} brilho={1} />)}
  <Apo tex={tex} pos={V(p)} s={0.22} rot={[f * 0.02, 0, 0]} cor="#8a96b0" />
  <Brilho pos={V(p)} s={0.8} cor="#9ab8ff" o={0.35} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const C3g = GF({ca: [52, 145, 2.2], cb: [48, 160, 2.0], k: [0, 0.12], nomes: ['curilas'], ini: [8]});
const C3h = GF({ca: [44, 175, 2.6], cb: [36, -150, 2.6], k: [0.12, 0.4], nomes: ['pacifico'], ini: [10]});
const C3i = GF({ca: [30, -125, 2.1], cb: [26, -112, 1.8], k: [0.4, 0.5], nomes: ['baja'], ini: [10]});
const C3j = GF({ca: [24, -108, 1.7], cb: [22, -98, 1.65], k: [0.5, 0.6], nomes: ['mexico'], ini: [6]});
const C3k = GF({ca: [25, -95, 2.4], cb: [16, -55, 2.6], k: [0.6, 1], nomes: ['golfo', 'caribe', 'atlantico'], ini: [6, 50, 100]});
const C3l = GF({ca: [55, 170, 3.4], cb: [25, -70, 3.2], nomes: ['curilas', 'pacifico', 'mexico', 'atlantico'], ini: [4, 4, 60, 100]});
const C3m: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[1.6 - f * 0.003, 1.3, 2.2]} alvo={[0, 0, 0]} /><ambientLight intensity={0.08} /><color attach="background" args={['#050302']} />
  <spotLight position={[-1.2, 2.2, 0.4]} angle={0.7} penumbra={0.6} intensity={18} color="#ffd8a0" />
  <mesh position={[0, -0.03, 0]}><boxGeometry args={[6, 0.04, 4]} /><meshStandardMaterial color="#3a2414" roughness={0.6} /></mesh>
  <group rotation={[0, 0.25, 0]}><Mapa tex={tex} /><Tubo pts={faixaP(0.006)} r={0.01} brilho={1.1} /></group>
  <group position={[-1.3, 0, -0.6]}><mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.25, 0.3, 0.1, 24]} /><meshStandardMaterial color="#1a1a1a" /></mesh><mesh position={[0, 0.6, 0]} rotation={[0, 0, 0.3]}><cylinderGeometry args={[0.025, 0.025, 1.1, 8]} /><meshStandardMaterial color="#222" /></mesh>
    <mesh position={[0.25, 1.1, 0.3]} rotation={[0.6, 0, -0.6]}><coneGeometry args={[0.26, 0.35, 24, 1, true]} /><meshStandardMaterial color="#2a4a3a" side={THREE.DoubleSide} /></mesh></group>
  <Pos bloom={0.4} /></>}</CP>;
const C3n: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const P = faixaP(0.012); const c = new THREE.CatmullRomCurve3(P.map((p) => new THREE.Vector3(...p))); const k = pr(f, 6, d - 6, Easing.linear); return <>
  <Cam pos={[0, 2.1, 1.5]} alvo={[0, 0, -0.25]} /><Luzes sol={[1, 4, 2]} i={2} amb={0.35} /><color attach="background" args={['#0c0806']} />
  <Mapa tex={tex} cor="#b8a07a" />
  {LAT(60).map((i) => { const on = i / 60 > k; return <Brilho key={i} pos={V(c.getPoint(i / 59))} s={on ? 0.09 : 0.02} cor={VERM} o={on ? 1 : 0.15} />; })}
  <Pos bloom={0.9} /></>; }}</CP>; };
const C3o: React.FC = () => { const d = useD(); return <CP>{(f) => { const z = lerp(1.2, 9, pr(f, 0, d)); return <>
  <Cam pos={[0.05, 0.05, z]} alvo={[0, 0, 0]} /><color attach="background" args={['#020306']} />
  {LAT(1600).map((i) => { const x = (i % 40) - 19.5, y = Math.floor(i / 40) - 19.5; return i === 820 ? null : <mesh key={i} position={[x * 0.22, y * 0.22, 0]}><sphereGeometry args={[0.05, 6, 6]} /><meshBasicMaterial color="#2a4a6a" toneMapped={false} /></mesh>; })}
  <Brilho pos={[0.5 * 0.22, 0.5 * 0.22, 0.05]} s={0.3} cor={VERM} o={1} /><mesh position={[0.11, 0.11, 0]}><sphereGeometry args={[0.06, 12, 12]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>; };
const C3p: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d * 0.8); return <>
  <Cam pos={[0, 0.4, 3.4]} /><Luzes sol={[-3, 2, 4]} i={2.4 * (1 - k * 0.7)} amb={0.2} /><Estrelas sem="c3p" />
  <group scale={0.999}><Terra tex={tex} rot={[0.3, f * 0.003, 0]} nuvens={k < 0.5} /></group>
  <mesh rotation={[0.3, f * 0.003, 0]} scale={lerp(1.6, 1.01, k)}><sphereGeometry args={[1, 36, 18]} /><meshBasicMaterial color={VERM} wireframe transparent opacity={0.6 * k} toneMapped={false} /></mesh>
  <mesh><sphereGeometry args={[1.02, 64, 64]} /><meshBasicMaterial color="#0a2a5a" transparent opacity={0.45 * k} depthWrite={false} /></mesh>
  <Pos bloom={0.9} /></>; }}</CP>; };
const C3q: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[-0.6, 0.3, 3.6 - f * 0.004]} /><Luzes sol={[3, 2, 2]} i={3.2} amb={0.03} /><Estrelas sem="c3q" />
  <Apo tex={tex} rot={[0.6, 1 + f * 0.008, 0]} />
  <Pos bloom={0.6} /></>}</CP>;
const C3r: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[2.2, 1, 3.8]} alvo={[0.4, 0, 0]} /><Luzes sol={[-3, 3, 4]} i={2} amb={0.2} /><Estrelas sem="c3r" />
  <mesh rotation={[0.3, f * 0.004, 0]}><sphereGeometry args={[1, 40, 20]} /><meshBasicMaterial color={VERM} wireframe transparent opacity={0.55} toneMapped={false} /></mesh>
  <mesh><sphereGeometry args={[0.98, 64, 64]} /><meshBasicMaterial color="#1a0505" /></mesh>
  <Apo tex={tex} pos={[2, 0.4, 0.8]} s={0.3} rot={[f * 0.02, 0, 0]} />
  <Tubo pts={[[2, 0.4, 0.8], [0.62, 0.35, 0.62]]} r={0.008} cor={VERM} k={pr(f, 0, 50)} />
  <Pos bloom={1} /></>}</CP>;

// ================= 4. FALTAM TRÊS ANOS =================
const C4a: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d - 10); return <>
  <Cam pos={[3, 2, 6]} alvo={[1, 0, 0]} /><Luzes sol={[-4, 3, 6]} i={2.2} amb={0.2} /><Estrelas sem="c4a" />
  <Terra tex={tex} rot={[0.4, f * 0.002, 0]} />
  {LAT(12).map((i) => { const dz = (i - 5.5) * 0.4 * (1 - k); return <Tubo key={i} pts={LAT(16).map((j) => { const t = j / 15; return [lerp(8, 0.9, t), lerp(1.5 + dz * 0.3, 0.4, t), lerp(2 + dz, 0.2, t * (1 - Math.abs(dz) * 0.1))] as V3; })} r={0.012} cor={VERM} o={0.35 + k * 0.5} />; })}
  <Pos bloom={1} /></>; }}</CP>; };
const C4b: React.FC = () => <CP>{(f) => { const a = Math.min(1, f / 60); return <>
  <Cam pos={[0, 1.6, 9]} alvo={[0, 1.4, 0]} /><Luzes sol={[-3, 4, 3]} i={0.7} amb={0.12} /><Estrelas sem="c4b" n={3000} />
  <mesh geometry={DESERTO} position={[0, -0.2, 0]}><meshStandardMaterial color="#2a2420" roughness={1} /></mesh>
  {LAT(7).map((i) => { const x = (i - 3) * 2.2; const alvo: [number, number] = [Math.atan2(-x, 12) * a + (random('c4b' + i) - 0.5) * (1 - a) * 2, (-1.1) * a - 0.3 * (1 - a)]; return <Antena key={i} pos={[x, 0, -1 - Math.abs(i - 3) * 0.6]} dir={alvo} s={0.9} />; })}
  <Brilho pos={[0, 6, -14]} s={0.5} cor="#fff" o={0.9 * a} />
  <Pos bloom={0.7} /></>; }}</CP>;
const C4c: React.FC = () => { const d = useD(); return <CP rot={(f) => rotulos(camLL(22, -98, 1.9), ['mexico'], f, [30])}>{(f, tex) => { const t = pr(f, 0, d * 0.6, Easing.in(Easing.quad)); const alvo = v(20.5, -100, 1.0); const p = alvo.clone().multiplyScalar(lerp(1.8, 1.01, t)); return <>
  <Cam pos={camLL(22, -98, 1.9)} /><Luzes sol={solDe(camLL(22, -98, 1.9))} i={2.2} amb={0.25} /><Estrelas sem="c4c" />
  <Terra tex={tex} rot={[0, 0, 0]} /><Tubo pts={faixa3()} r={0.005} o={0.8} />
  <Brilho pos={V(p)} s={0.12 + t * 0.15} cor={VERM} o={1} />
  {t >= 1 && <Calota la={20.5} lo={-100} ang={0.04 + Math.sin(f * 0.3) * 0.008} cor={VERM} o={0.8} add />}
  <Pos bloom={1} /></>; }}</CP>; };
const C4d: React.FC = () => { const d = useD(); return <CP>{(f) => { const t = pr(f, 20, d, Easing.in(Easing.quad)); const y = t * 6; return <>
  <Cam pos={[3.5, 1.5, 6]} alvo={[0, 1.6 + y * 0.5, 0]} tremor={t > 0 ? 0.02 : 0} /><Luzes sol={[-4, 5, 3]} i={1.6} amb={0.2} />
  <Ceu cima="#0a1830" baixo="#d07040" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#2a2a28" /></mesh>
  <group position={[0, y, 0]}>
    <mesh position={[0, 1.6, 0]}><cylinderGeometry args={[0.22, 0.22, 2.6, 24]} /><meshStandardMaterial color="#f0f0ee" /></mesh>
    <mesh position={[0, 3.15, 0]}><coneGeometry args={[0.22, 0.5, 24]} /><meshStandardMaterial color="#f0f0ee" /></mesh>
    {LAT(4).map((i) => <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 0.28, 0.45, Math.sin(i * Math.PI / 2) * 0.28]} rotation={[0, -i * Math.PI / 2, 0]}><boxGeometry args={[0.2, 0.4, 0.02]} /><meshStandardMaterial color="#202020" /></mesh>)}
    <Brilho pos={[0, 0.0, 0]} s={1.4 + Math.sin(f) * 0.2} cor="#ffb050" o={Math.min(1, f / 15)} />
  </group>
  <Nuvem n={300} sem="c4d" origem={new THREE.Vector3(0, 0.2, 0)} t={f} raio={4} cor="#c8c0b8" tam={0.5} o={0.5} dir={new THREE.Vector3(0, 0.2, 0)} />
  <mesh position={[-1.2, 2, 0]}><boxGeometry args={[0.3, 4, 0.3]} /><meshStandardMaterial color="#8a2a1a" /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>; };
const C4e: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.linear); return <>
  <Cam pos={[-1.2 + t * 2.4, 0.4, 3.2 - t * 1.4]} alvo={[0.6, 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2.8} amb={0.04} /><Estrelas sem="c4e" />
  <Apo tex={tex} pos={[-1.6, 0, -1.5]} s={0.8} rot={[0, f * 0.006, 0]} cor="#8a8070" />
  <Lua tex={tex} pos={[0.9, 0.1, 0]} r={0.16} rot={[0, f * 0.01, 0]} />
  <Nave tipo="dart" pos={[lerp(4, 1.15, t), lerp(0.6, 0.12, t), lerp(2.5, 0.08, t)]} s={0.08} rot={[0, 1.1, 0.2]} />
  <Pos bloom={0.7} /></>; }}</CP>; };
const C4f: React.FC = () => <CP>{(f, tex) => { const t = Math.max(0, f - 8); return <>
  <Cam pos={[0.4, 0.3, 1.8]} alvo={[0.2, 0, 0]} tremor={t < 20 ? 0.02 : 0} /><Luzes sol={[-3, 2, 4]} i={2.8} amb={0.04} /><Estrelas sem="c4f" />
  <Lua tex={tex} r={0.32} rot={[0, 0.5, 0]} />
  {f > 6 && <Brilho pos={[0.25, 0.08, 0.2]} s={Math.max(0.1, 2.2 - t * 0.05)} cor="#fff2d0" o={Math.max(0, 1 - t / 45)} />}
  {f > 6 && <Nuvem n={600} sem="c4f" origem={new THREE.Vector3(0.24, 0.08, 0.2)} t={t} raio={1.6} cor="#c8b8a0" tam={0.015} o={0.7} dir={new THREE.Vector3(0.6, 0.2, 0.8)} />}
  {f > 6 && <Pedras n={40} sem="c4f" origem={new THREE.Vector3(0.24, 0.08, 0.2)} dir={new THREE.Vector3(0.7, 0.3, 0.7)} t={t} vel={0.02} tam={0.012} />}
  <Pos bloom={1} /></>; }}</CP>;
const C4g: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d * 0.8); const r = lerp(1.6, 1.25, k); const a = f * 0.05; return <>
  <Cam pos={[0, 5, 1.2]} /><Luzes sol={[0, 5, 2]} i={2.4} amb={0.15} /><Estrelas sem="c4g" />
  <Apo tex={tex} s={0.7} rot={[Math.PI / 2, f * 0.01, 0]} cor="#8a8070" />
  <Tubo pts={elipse(1.6, 1.6)} r={0.01} cor="#ffffff" o={0.25 * (1 - k)} />
  <Tubo pts={elipse(r, r)} r={0.012} cor={NEON} o={0.9} />
  <Lua tex={tex} pos={[Math.cos(a) * r, 0, Math.sin(a) * r]} r={0.12} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const C4h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 0.3, lerp(2.4, 6.5, k)]} alvo={[0.6, 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2.8} amb={0.04} /><Estrelas sem="c4h" />
  <Lua tex={tex} pos={[-0.45, 0, 0.6]} r={0.08} />
  <Apo tex={tex} pos={[1.4, 0, 0]} s={1.15} rot={[0.3, f * 0.004, 0]} />
  <Pos bloom={0.6} /></>; }}</CP>; };
const C4i: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.linear); return <>
  <Cam pos={[0.5, 1, 5]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.06} /><Estrelas sem="c4i" />
  <Apo tex={tex} pos={[lerp(-3, 4, t), 0, 0]} s={0.8} rot={[0.3, f * 0.006, 0]} />
  <Nave tipo="dart" pos={[lerp(-6, 0.5, Math.min(1, t * 1.3)), 0.9, 1.2]} s={0.15} rot={[0, 0.3, 0]} />
  <Tubo pts={[[-6, 0.9, 1.2], [lerp(-6, 0.5, Math.min(1, t * 1.3)), 0.9, 1.2]]} r={0.006} cor={NEON} o={0.5} />
  <Pos bloom={0.7} /></>; }}</CP>; };
const C4j: React.FC = () => <CP rot={(f) => rotulos(camLL(30, -95, 2.5), ['golfo'], f, [20])}>{(f, tex) => { const p = (f % 40) / 40; return <>
  <Cam pos={camLL(30 - f * 0.02, -95, 2.5 - f * 0.002)} /><Luzes sol={solDe(camLL(30, -95, 2.5))} i={2.2} amb={0.25} /><Estrelas sem="c4j" />
  <Terra tex={tex} rot={[0, 0, 0]} /><Tubo pts={faixa3()} r={0.005} o={0.6} />
  <Calota la={20} lo={-96} ang={0.02 + p * 0.12} cor={VERM} o={0.9 * (1 - p)} add />
  <Calota la={20} lo={-96} ang={0.015} cor={VERM} o={1} add />
  <Pos bloom={1} /></>; }}</CP>;
const C4k: React.FC = () => <CP>{(f) => <>
  <Cam pos={[4 - f * 0.006, 1.2, 6]} alvo={[0, 0.8, 0]} /><Luzes sol={[-3, 5, -2]} i={0.25} amb={0.05} /><Estrelas sem="c4k" n={2500} />
  <Ceu cima="#02040a" baixo="#0c1630" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#0a120c" /></mesh>
  <group><mesh position={[0, 0.8, 0]}><boxGeometry args={[2.4, 1.6, 1.8]} /><meshStandardMaterial color="#2a2e36" /></mesh><mesh position={[0, 1.95, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[1.9, 0.9, 4]} /><meshStandardMaterial color="#3a2a26" /></mesh>
    {[-0.6, 0.6].map((x, i) => <mesh key={i} position={[x, 0.95, 0.91]}><planeGeometry args={[0.45, 0.5]} /><meshBasicMaterial color={new THREE.Color(i ? '#ffd08a' : '#7ab4ff').multiplyScalar(1.4 + (i ? 0 : Math.sin(f * 0.4) * 0.3))} toneMapped={false} /></mesh>)}</group>
  {LAT(6).map((i) => <Arvore key={i} pos={[-4 + i * 1.6, 0, -2 - random('c4k' + i) * 2]} s={1.5} />)}
  <Pos bloom={0.8} /></>}</CP>;
const C4l: React.FC = () => <CP>{(f, tex) => { const cint = 0.8 + Math.sin(f * 0.6) * 0.15 + Math.sin(f * 1.7) * 0.08; return <>
  <Cam pos={[0, 1.3, 3.4 - f * 0.004]} alvo={[0, 1, -1]} /><ambientLight intensity={0.02} /><color attach="background" args={['#010102']} />
  <pointLight position={[0, 1.1, -0.6]} intensity={3 * cint} color="#8ab8ff" distance={6} />
  <mesh position={[0, 1.1, -1.2]}><boxGeometry args={[1.9, 1.1, 0.06]} /><meshStandardMaterial color="#050505" /></mesh>
  <group position={[0, 1.1, -1.165]}><mesh><planeGeometry args={[1.8, 1.0]} /><meshBasicMaterial color={new THREE.Color('#203a6a').multiplyScalar(cint)} toneMapped={false} /></mesh>
    <mesh position={[0.1, 0, 0.01]} scale={[1, 1, 0.01]}><sphereGeometry args={[0.36, 48, 48]} /><meshBasicMaterial map={tex.dia} color={new THREE.Color('#ffffff').multiplyScalar(cint)} toneMapped={false} /></mesh>
    <mesh position={[-0.15, -0.05, 0.02]}><circleGeometry args={[0.03 + Math.sin(f * 0.3) * 0.008, 24]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh></group>
  <mesh position={[0, 0.4, 0.8]}><boxGeometry args={[2.4, 0.5, 0.9]} /><meshStandardMaterial color="#1a1614" /></mesh>
  <mesh position={[0, 0.85, 1.15]}><boxGeometry args={[2.4, 0.8, 0.25]} /><meshStandardMaterial color="#1a1614" /></mesh>
  <mesh position={[0.2, 1.25, 0.95]}><sphereGeometry args={[0.15, 24, 24]} /><meshStandardMaterial color="#050505" /></mesh>
  <mesh position={[0.2, 1.0, 0.98]}><capsuleGeometry args={[0.17, 0.2, 8, 16]} /><meshStandardMaterial color="#050505" /></mesh>
  <Pos bloom={0.7} /></>; }}</CP>;

// ================= 5. A ENTRADA =================
const C5a: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.in(Easing.quad)); return <>
  <Cam pos={[0.3, 0.2, 2.2]} alvo={[0, -0.6, -1]} tremor={0.01} /><Luzes sol={[2, 3, 3]} i={2.4} amb={0.1} /><Estrelas sem="c5a" />
  <Terra tex={tex} pos={[0, -2.4, -2]} r={2.2} rot={[0.5, 1.6, 0]} />
  <Apo tex={tex} pos={L3([0.8, 0.6, 1.2], [0.1, -0.35, -0.9], t)} s={0.12} rot={[f * 0.02, 0, f * 0.01]} brasa={t * 0.6} />
  <Brilho pos={L3([0.8, 0.6, 1.2], [0.1, -0.35, -0.9], t)} s={0.2 + t * 0.6} cor="#ff9a40" o={t} />
  <Pos bloom={1} /></>; }}</CP>; };
const Veloc: React.FC<{f: number; d: number}> = ({f, d}) => { const k = pr(f, 6, d * 0.65, Easing.out(Easing.cubic)); return <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontFamily: FONTE, fontWeight: 900, fontSize: 96, color: '#fff', letterSpacing: 2,
  textShadow: '0 0 12px #ff5a1a, 0 0 30px #ff3a0a, 0 4px 10px rgba(0,0,0,.9)'}}>{(12.6 * k).toFixed(1).replace('.', ',')} km/s</div>; };
const C5b: React.FC = () => { const d = useD(); return <CP rot={(f) => <Veloc f={f} d={d} />}>{(f) => { const k = pr(f, 6, d * 0.65, Easing.out(Easing.cubic)); const a = lerp(Math.PI * 0.75, -Math.PI * 0.6, k) + Math.sin(f * 0.8) * 0.01 * k; return <>
  <Cam pos={[0, 0.35, 3.2]} alvo={[0, 0.35, 0]} /><Luzes sol={[1, 3, 4]} i={2} amb={0.25} /><color attach="background" args={['#050304']} />
  <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.3, -0.06]}><cylinderGeometry args={[1.25, 1.25, 0.1, 64]} /><meshStandardMaterial color="#14161c" metalness={0.8} roughness={0.3} /></mesh>
  {LAT(27).map((i) => { const b = Math.PI * 0.75 - i / 26 * Math.PI * 1.35; const lit = i / 26 <= k; const c = new THREE.Color('#ffd040').lerp(new THREE.Color(VERM), i / 26); return <mesh key={i} position={[Math.cos(b) * 1.05, 0.3 + Math.sin(b) * 1.05, 0]} rotation={[0, 0, b - Math.PI / 2]}><boxGeometry args={[0.06, 0.16, 0.02]} /><meshBasicMaterial color={lit ? c.multiplyScalar(1.6) : '#2a2a30'} toneMapped={false} /></mesh>; })}
  <group position={[0, 0.3, 0.03]} rotation={[0, 0, a - Math.PI / 2]}><mesh position={[0, 0.45, 0]}><boxGeometry args={[0.04, 0.9, 0.02]} /><meshBasicMaterial color={new THREE.Color('#ff5a1a').multiplyScalar(1.8)} toneMapped={false} /></mesh></group>
  <mesh position={[0, 0.3, 0.05]}><cylinderGeometry args={[0.08, 0.08, 0.04, 24]} /><meshStandardMaterial color="#888" metalness={0.9} /></mesh>
  <Pos bloom={1} /></>; }}</CP>; };
const C5c: React.FC = () => { const d = useD(); return <CP rot={(f) => <R3 cam={camLL(-12, -52, 2.3)} p={v(-10, -52, 1.02)} txt="BRASIL" o={pr(f, 4, 12)} dy={0} tam={60} />}>{(f, tex) => { const k = pr(f, 14, d - 10, Easing.inOut(Easing.quad)); const pts: V3[] = LAT(10).map((i) => V(v(lerp(5, -33, i / 9), lerp(-60, -53, i / 9) + Math.sin(i) * 0.5, 1.01))); return <>
  <Cam pos={camLL(-12, -52, 2.3)} /><Luzes sol={solDe(camLL(-12, -52, 2.3))} i={2.3} amb={0.3} /><Estrelas sem="c5c" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  <Tubo pts={pts} r={0.008} cor="#ffb040" k={k} brilho={2} />
  <Brilho pos={V(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))).getPoint(Math.max(0.001, k)))} s={0.18} cor="#fff0c0" o={k > 0 && k < 1 ? 1 : 0} />
  <Pos bloom={1} /></>; }}</CP>; };
const choqueMat = new THREE.MeshBasicMaterial({color: new THREE.Color('#ff7a20').multiplyScalar(2), transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false});
const C5d: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[2.6, 0.6, 1.8]} alvo={[0, 0, 0]} tremor={0.02} /><Luzes sol={[-2, 3, 2]} i={1.6} amb={0.05} />
  <Ceu cima="#050a1a" baixo="#2a3a6a" />
  <Apo tex={tex} rot={[f * 0.03, 0.2, 0]} s={0.6} brasa={0.3 + k * 0.6} />
  {LAT(5).map((i) => <mesh key={i} position={[-0.3 - i * 0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={1 + i * 0.25}><coneGeometry args={[0.95, 1.6 + i * 0.4, 48, 1, true]} /><primitive object={choqueMat} attach="material" /></mesh>)}
  <Nuvem n={500} sem="c5d" origem={new THREE.Vector3(0.6, 0, 0)} t={20 + (f % 30)} raio={4} cor="#ffb060" tam={0.05} o={0.7} add dir={new THREE.Vector3(1, 0, 0)} />
  <Brilho pos={[-0.7, 0, 0]} s={2.5 + k} cor="#ffd090" o={0.7} />
  <Pos bloom={1.4} /></>; }}</CP>; };
const C5e: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d * 0.9); const c = new THREE.Color('#ff3a10').lerp(new THREE.Color('#fff8e0'), k); return <>
  <Cam pos={[-2.4, 0.1, 0.6]} alvo={[0, 0, 0]} tremor={0.03 + k * 0.03} /><color attach="background" args={['#080202']} /><ambientLight intensity={0.05} />
  <pointLight position={[-1.2, 0, 0.3]} intensity={10 + k * 30} color={c} />
  <Apo tex={tex} s={0.7} rot={[f * 0.03, 0.4, 0]} brasa={0.5 + k * 1.8} />
  <Brilho pos={[-0.95, 0, 0]} s={lerp(1.5, 4.5, k)} cor={'#' + c.getHexString()} o={0.85} />
  <Pos bloom={1.8} /></>; }}</CP>; };
const C5f: React.FC = () => { const d = useD(); return <CP>{(f) => { const t = pr(f, 0, d, Easing.linear); return <>
  <Cam pos={[0, 1, 6]} alvo={[0, 3, -20]} /><Luzes sol={[-10, 6, -10]} i={1.6} amb={0.25} />
  <Ceu cima="#2a4a8a" baixo="#f0b880" />
  <mesh geometry={PLANICIE} position={[0, 0, -6]}><meshStandardMaterial color="#3a3828" roughness={1} /></mesh>
  {LAT(10).map((i) => <Arvore key={i} pos={[-6 + i * 1.3 + random('c5f' + i), 0.1, -3 - random('cz' + i) * 4]} s={1.6} />)}
  <Brilho pos={[-14, 9, -40]} s={9} cor="#fff2c0" o={0.9} />
  <Brilho pos={[lerp(12, -2, t), lerp(16, 5, t), -40]} s={lerp(6, 16, t)} cor="#fff8f0" o={1} />
  <pointLight position={[lerp(12, -2, t), lerp(16, 5, t), -20]} intensity={20 + t * 60} color="#fff0d0" distance={80} />
  <Pos bloom={1.4} /></>; }}</CP>; };
const C5g: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.in(Easing.quad)); const y = lerp(4, -2.5, t); return <>
  <Cam pos={[3.6, 0.6, 5]} alvo={[0, 0.5, 0]} /><Luzes sol={[2, 3, 4]} i={1} amb={0.2} /><color attach="background" args={['#020308']} />
  {['#0a1a3a', '#1a3a6a', '#3a6a9a', '#6a9ac8', '#9ac0e0'].map((c, i) => <mesh key={i} position={[0, 2.6 - i * 1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[9, 6]} /><meshBasicMaterial color={c} transparent opacity={0.22} side={THREE.DoubleSide} depthWrite={false} /></mesh>)}
  <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[9, 6]} /><meshStandardMaterial color="#2a3a22" /></mesh>
  <Apo tex={tex} pos={[y * 0.4, y, 0]} s={0.18} brasa={1.5} />
  <Tubo pts={[[1.6, 4, 0], [y * 0.4 + 0.08, y + 0.2, 0]]} r={0.06} cor="#ff8a30" o={0.8} brilho={2} />
  <Brilho pos={[y * 0.4, y, 0]} s={1.4} cor="#ffd080" o={1} />
  <Pos bloom={1.4} /></>; }}</CP>; };

// ================= 6. O IMPACTO =================
const C6a: React.FC = () => <CP>{(f) => { const k = Math.min(1, f / 10); const o = Math.max(0, 1 - Math.max(0, f - 30) / 70); return <>
  <Cam pos={[0, 1.2, 9]} alvo={[0, 1, 0]} tremor={0.15 * o} /><ambientLight intensity={0.3} />
  <Ceu cima="#1a1a2a" baixo="#ffe8d0" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#2a2820" roughness={1} emissive="#ffd8a0" emissiveIntensity={o * 0.6} /></mesh>
  <mesh position={[0, 0, -4]} scale={[1, 0.7, 1]}><sphereGeometry args={[lerp(0.2, 4, k) + f * 0.02, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshBasicMaterial color={new THREE.Color('#fff4e0').multiplyScalar(2)} transparent opacity={0.4 + 0.6 * o} toneMapped={false} /></mesh>
  <Brilho pos={[0, 1, -4]} s={30 * k} cor="#ffffff" o={o} />
  <Pos bloom={2} /></>; }}</CP>;
const C6b: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.5, Easing.out(Easing.cubic)); return <>
  <Cam pos={[0, 2, 9]} alvo={[0, 2.8, 0]} /><ambientLight intensity={0.1} /><color attach="background" args={['#030208']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[20, 64]} /><meshStandardMaterial color="#14100c" /></mesh>
  {LAT(20).map((i) => { const a = i / 20 * Math.PI * 2; const r = 0.15 + 2.4 * k * (0.6 + random('c6b' + i) * 0.4); const h = 5 * pr(f, i * 1.5, i * 1.5 + 20); return <mesh key={i} position={[Math.cos(a) * r, h / 2, Math.sin(a) * r * 0.6]}><cylinderGeometry args={[0.07, 0.11, h, 12]} /><meshBasicMaterial color={new THREE.Color(i % 2 ? '#ffd890' : '#ffa050').multiplyScalar(2)} toneMapped={false} /></mesh>; })}
  <Brilho pos={[0, 0.2, 0]} s={2} cor="#ffe0b0" o={1} />
  <Pos bloom={1.6} /></>; }}</CP>; };
const C6d: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.6, Easing.out(Easing.cubic)); return <>
  <Cam pos={[0, 4.5 - k, 7]} alvo={[0, 0, 0]} tremor={0.05 * (1 - k)} /><Luzes sol={[-4, 5, 3]} i={1.6} amb={0.2} /><Ceu cima="#1a1410" baixo="#5a3a2a" />
  <Viva n={140} tam={16} h={(x, z) => { const r = Math.hypot(x, z); const R = 2.2 * k; return r < R ? -0.9 * k * (1 - (r / R) ** 2) : 0.35 * k * Math.exp(-((r - R) ** 2) / 0.3) + Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.1; }} mat={<meshStandardMaterial color="#5a4632" roughness={1} />} />
  <pointLight position={[0, -0.2, 0]} intensity={8 * (1 - k * 0.6)} color="#ff6a20" distance={4} />
  <Pedras n={60} sem="c6d" origem={new THREE.Vector3(0, 0, 0)} dir={new THREE.Vector3(0, 1, 0)} abre={1.2} t={f} vel={0.05} tam={0.08} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const C6e: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.7, Easing.out(Easing.cubic)); return <>
  <Cam pos={[6, 5, 6]} alvo={[1, 0, 0]} /><Luzes sol={[-4, 6, 2]} i={1.8} amb={0.3} /><Ceu cima="#2a2a3a" baixo="#8a7a6a" />
  <Viva n={150} tam={20} h={(x, z) => { const r = Math.hypot(x + 1.5, z); const R = 2.4 * k; return r < R ? -0.7 * k * (1 - (r / R) ** 2) : 0.25 * k * Math.exp(-((r - R) ** 2) / 0.2); }} mat={<meshStandardMaterial color="#5a5040" roughness={1} />} />
  {LAT(140).map((i) => { const gx = (i % 14) * 0.42 + 1.3, gz = Math.floor(i / 14) * 0.42 - 2; const r = Math.hypot(gx + 1.5, gz); return r < 2.4 * k + 0.2 ? null : <Casa key={i} pos={[gx, 0, gz]} s={0.45} i={i} luz={0} />; })}
  {LAT(12).map((i) => <mesh key={'r' + i} position={[1.3 + i * 0.42 - 0.2, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 4.4]} /><meshStandardMaterial color="#3a3a3a" /></mesh>)}
  <Pos bloom={0.4} /></>; }}</CP>; };
const C6f: React.FC = () => <CP>{(f) => { const h = 2 + f * 0.05; return <>
  <Cam pos={[0, 0.5, 9]} alvo={[0, 2.5, 0]} /><Luzes sol={[-3, 5, 4]} i={0.8} amb={0.15} /><Ceu cima="#0a0806" baixo="#6a3a1a" />
  <mesh geometry={PLANICIE} position={[0, -0.3, 0]}><meshStandardMaterial color="#1a1612" roughness={1} /></mesh>
  <Nuvem n={900} sem="c6f" origem={new THREE.Vector3(0, 0, -3)} t={40 + f} raio={1.6} cor="#5a4a3a" tam={0.7} o={0.55} dir={new THREE.Vector3(0, h, 0)} />
  <mesh position={[0, h / 2, -3]}><cylinderGeometry args={[0.6, 1.2, h, 24, 1, true]} /><meshBasicMaterial color={new THREE.Color('#ff5a10').multiplyScalar(1.5)} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
  <Brilho pos={[0, 0.3, -3]} s={4} cor="#ff7a20" o={0.9} />
  <Pos bloom={1.2} /></>; }}</CP>;
const C6g: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.4); return <>
  <Cam pos={[f * 0.006, 1.2, 6]} alvo={[0, 1.4, -10]} /><Luzes sol={[0, 3, -20]} i={0.6} amb={0.06} />
  <Ceu cima="#04060c" baixo={'#' + new THREE.Color('#10141e').lerp(new THREE.Color('#ff9a50'), k).getHexString()} />
  <Brilho pos={[2, 0.6, -40]} s={30 * k} cor="#ffb060" o={0.8} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#050608" /></mesh>
  <Predios n={60} sem="c6g" z={-4} larg={22} alt={3} />
  <Pos bloom={1} /></>; }}</CP>; };

// ================= 7. MINUTOS E DIAS DEPOIS =================
const C7a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[f * 0.02 - 4, 6, 10]} alvo={[0, 0, -4]} /><Luzes sol={[-4, 6, 2]} i={0.9} amb={0.2} /><Ceu cima="#3a2e26" baixo="#6a5040" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#3a3226" roughness={1} /></mesh>
  <Nuvem n={1200} sem="c7a" origem={new THREE.Vector3(0, 0.5, -8)} t={80 + f} raio={14} cor="#7a6a5a" tam={1.2} o={0.35} dir={new THREE.Vector3(0, 0.1, 0)} />
  <Brilho pos={[0, 0.5, -14]} s={6} cor="#ff6a20" o={0.5} />
  <Pos bloom={0.6} /></>}</CP>;
const C7b: React.FC = () => { const d = useD(); return <CP>{(f) => { const R = lerp(0.5, 9, pr(f, 0, d, Easing.linear)); return <>
  <Cam pos={[0, 3.4, 9]} alvo={[0, 0, 0]} /><Luzes sol={[-4, 5, 3]} i={1.6} amb={0.3} /><Ceu cima="#2a2a3a" baixo="#9a8a7a" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#4a5a32" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, -6]}><ringGeometry args={[R, R + 0.6, 128]} /><meshBasicMaterial color={new THREE.Color('#ffe8c0').multiplyScalar(1.4)} transparent opacity={0.45} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} /></mesh>
  {LAT(120).map((i) => { const x = (random('t7' + i) - 0.5) * 18, z = -6 + (random('u7' + i) - 0.5) * 16; const r = Math.hypot(x, z + 6); const inc = r < R ? Math.min(1.45, (R - r) * 1.2) : 0; const dir = -Math.atan2(z + 6, x); return <Arvore key={i} pos={[x, Math.sin(x * 0.3) * Math.cos((z) * 0.25) * 0.3, z]} inc={inc} dir={dir} s={0.8} />; })}
  <Pos bloom={0.6} /></>; }}</CP>; };
const C7c: React.FC = () => <CP rot={(f) => rotulos(camLL(24, -96, 2.2), ['mexico'], f, [6], [0, 0, 0], 50)}>{(f, tex) => <>
  <Cam pos={camLL(24, -96, 2.2 + f * 0.002)} /><Luzes sol={solDe(camLL(24, -96, 2.2))} i={2.2} amb={0.25} /><Estrelas sem="c7c" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  {LAT(4).map((i) => { const p = ((f * 0.6 + i * 30) % 120) / 120; return <Calota key={i} la={20.5} lo={-100} ang={0.01 + p * 0.09} cor="#ff9a40" o={0.6 * (1 - p)} add />; })}
  <Calota la={20.5} lo={-100} ang={0.03} cor="#3a1a0a" o={0.85} />
  <Pos bloom={0.9} /></>}</CP>;
const C7d: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = Math.max(0, f - 25); const fall = pr(f, 0, 25, Easing.in(Easing.quad)); const R = t * 0.08; return <>
  <Cam pos={[0, 3, 10]} alvo={[0, 0.5, 0]} tremor={t > 0 && t < 20 ? 0.08 : 0} /><Luzes sol={[-4, 5, 4]} i={1.8} amb={0.25} /><Ceu cima="#1a2a4a" baixo="#8aa0b8" />
  <Viva n={150} tam={40} h={(x, z) => { const r = Math.hypot(x, z); return (Math.sin(x * 0.9 + f * 0.05) + Math.sin(z * 1.1)) * 0.03 + (t > 0 ? 0.5 * Math.exp(-((r - R) ** 2) / 0.6) * Math.exp(-r / 14) - (r < R * 0.6 ? 0.3 * Math.exp(-t / 40) : 0) : 0); }} mat={<meshStandardMaterial color="#14466a" roughness={0.15} metalness={0.5} />} />
  {f < 26 && <Apo tex={tex} pos={[lerp(-6, 0, fall), lerp(8, 0, fall), 0]} s={0.3} brasa={1.5} />}
  {t > 0 && <Nuvem n={600} sem="c7d" origem={new THREE.Vector3(0, 0, 0)} t={t} raio={4} cor="#e8f0f8" tam={0.3} o={0.7} dir={new THREE.Vector3(0, 1.5, 0)} />}
  {t > 0 && t < 30 && <Brilho pos={[0, 0.5, 0]} s={10 * (1 - t / 30)} cor="#fff" o={1} />}
  <Pos bloom={0.9} /></>; }}</CP>; };
const C7e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[Math.sin(f * 0.004) * 9, 6, Math.cos(f * 0.004) * 9]} alvo={[0, 0, 0]} /><color attach="background" args={['#020610']} />
  <Viva n={90} tam={14} h={(x, z) => { const r = Math.hypot(x, z); const R = (f * 0.05) % 7; return 0.5 * Math.exp(-((r - R) ** 2) / 0.3) * Math.exp(-r / 8); }} mat={<meshBasicMaterial color={NEON} wireframe transparent opacity={0.6} toneMapped={false} />} />
  <Brilho pos={[0, 0.2, 0]} s={0.8} cor={NEON} o={0.8} />
  <Pos bloom={1.1} /></>}</CP>;
const C7f: React.FC = () => <CP>{(f) => { const R = 2 + f * 0.09; return <>
  <Cam pos={[0, 14, 16]} alvo={[0, 0, -4]} /><Luzes sol={[-6, 8, 6]} i={2} amb={0.25} /><Ceu cima="#1a3050" baixo="#9ab8d0" />
  <Viva n={180} tam={70} h={(x, z) => { const r = Math.hypot(x, z + 4); return (Math.sin(x * 0.8 + f * 0.04) + Math.sin(z * 0.9 - f * 0.03)) * 0.04 + LAT(3).reduce((s, j) => s + 0.6 * Math.exp(-((r - (R - j * 2.5)) ** 2) / 0.8) * Math.exp(-r / 30), 0); }} mat={<meshStandardMaterial color="#123c5a" roughness={0.2} metalness={0.5} />} />
  <Pos bloom={0.7} /></>; }}</CP>;
const PRAIA = relevo(140, (x, z) => Math.max(-0.6, (-z - 1) * 0.15) + Math.sin(x * 0.7) * 0.05, 30);
const C7g: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d, Easing.inOut(Easing.quad)); return <>
  <Cam pos={[4, 2.4, 6]} alvo={[0, 0, -2]} /><Luzes sol={[-5, 6, 3]} i={1.8} amb={0.3} /><Ceu cima="#2a3a5a" baixo="#a8b8c8" />
  <mesh geometry={PRAIA}><meshStandardMaterial color="#c8b088" roughness={1} /></mesh>
  {LAT(12).map((i) => <Arvore key={i} pos={[-6 + i * 1.1, 0.35 + (random('pz' + i)) * 0.3, -3 - random('pz' + i) * 2]} s={1.2} />)}
  <Viva n={120} tam={30} pos={[0, 0, lerp(8, 2, k)]} h={(x, z) => Math.max(-0.5, -0.3 + lerp(0, 0.75, k) * Math.exp(-((z + 2) ** 2) / 8) + Math.sin(x * 1.2 + f * 0.1) * 0.05)} mat={<meshStandardMaterial color="#2a6a8a" roughness={0.2} metalness={0.4} transparent opacity={0.92} />} />
  <Pos bloom={0.5} /></>; }}</CP>; };
const C7h: React.FC = () => <CP>{(f) => <>
  <Cam pos={[6 - f * 0.01, 1.6, 7]} alvo={[0, 0.4, 0]} /><Luzes sol={[-2, 4, 3]} i={0.5} amb={0.2} />
  <Ceu cima="#2a2018" baixo="#6a5444" /><fog attach="fog" args={['#4a3a2e', 6, 30]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#2a2622" /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}><planeGeometry args={[40, 2.6]} /><meshStandardMaterial color="#1a1a1c" /></mesh>
  {LAT(14).map((i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-14 + i * 2.2, 0.02, 0]}><planeGeometry args={[1, 0.08]} /><meshBasicMaterial color="#d8d8c8" /></mesh>)}
  {LAT(4).map((i) => <Aviao key={i} pos={[-4 + i * 2.6, 0.25, -3]} rot={[0, -Math.PI / 2, 0]} s={0.9} />)}
  <Nuvem n={500} sem="c7h" origem={new THREE.Vector3(0, 3, -6)} t={100 + f} raio={14} cor="#6a5a4a" tam={1.4} o={0.3} />
  <Pos bloom={0.4} /></>}</CP>;
const C7i: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-3 + f * 0.01, 1.2, 6]} alvo={[0, 0, 0]} /><Luzes sol={[4, 6, 3]} i={2.2} amb={0.35} /><Ceu cima="#2a5a9a" baixo="#d8e8f8" />
  {LAT(160).map((i) => <Brilho key={i} pos={[(random('n7' + i) - 0.5) * 30, -1.5 - random('m7' + i) * 1.2, (random('o7' + i) - 0.5) * 20 - 4]} s={2 + random('p7' + i) * 2} cor="#ffffff" o={0.6} />)}
  {LAT(5).map((i) => <Aviao key={i} pos={[-2 + i * 0.9 + f * 0.012, 0.3 + Math.sin(i * 2) * 0.4 + Math.sin(f * 0.03 + i) * 0.03, -i * 1.1]} rot={[0.05, 0.25, 0]} s={0.55} cor={i % 2 ? '#c8ccd0' : '#e0e2e6'} />)}
  <Pos bloom={0.4} /></>}</CP>;

// ================= 8. NÃO É O FIM DO MUNDO =================
const C8a: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.5, 3.2 + f * 0.012]} /><Luzes sol={[-3, 2, 4]} i={2.4} amb={0.12} /><Estrelas sem="c8a" />
  <Terra tex={tex} rot={[0.4, f * 0.003 - 1.2, 0]} />
  <Pos bloom={0.7} /></>}</CP>;
const C8b: React.FC = () => <CP>{(f, tex) => { const cam = camLL(24, -100 + f * 0.05, 3.2); return <>
  <Cam pos={cam} /><Luzes sol={solDe(cam)} i={2.3} amb={0.3} /><Estrelas sem="c8b" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  <Calota la={20.5} lo={-100} ang={0.13} cor="#2a1008" o={0.8} /><Calota la={20.5} lo={-100} ang={0.18} cor="#6a4a30" o={0.35} />
  <Pos bloom={0.6} /></>; }}</CP>;
const C8c: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0.5, 0.2, lerp(0.9, 7, k)]} alvo={[lerp(0.06, -0.6, k), 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2.8} amb={0.04} /><Estrelas sem="c8c" />
  <Apo tex={tex} pos={[-1.6, 0, -0.6]} s={1.5} rot={[0.4, f * 0.003, 1.1]} cor="#6a5c50" />
  <Apo tex={tex} pos={[0.3, 0, 0.5]} s={0.05} rot={[f * 0.02, 0, 0]} />
  <Brilho pos={[0.3, 0, 0.5]} s={0.15} cor={NEON} o={0.6} />
  <Pos bloom={0.7} /></>; }}</CP>; };
const C8d: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const cam = camLL(28, -95, 2.6); return <>
  <Cam pos={[cam[0] * (1 + f * 0.001), cam[1], cam[2] * (1 + f * 0.001)]} /><Luzes sol={[-cam[0] * 3, 0.5, -cam[2] * 3]} i={1.2} amb={0.03} /><Estrelas sem="c8d" />
  <TerraN tex={tex} luz={1} nuvens={false} />
  <Calota la={20.5} lo={-100} ang={0.1 * pr(f, 10, d * 0.5)} cor="#000000" o={0.95} r={1.008} />
  <Pos bloom={1.1} /></>; }}</CP>; };
const CACOS = LAT(70).map((i) => { const x = (i % 10) / 10 * 4 - 1.8, y = Math.floor(i / 10) / 7 * 2.4 - 1.05; return {x: x + (random('kx' + i) - 0.5) * 0.15, y: y + (random('ky' + i) - 0.5) * 0.15, r: 0.22 + random('kr' + i) * 0.12, s: i}; });
const C8e: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = Math.max(0, f - d * 0.3); return <>
  <Cam pos={[0, 0, 4.2]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.4} /><color attach="background" args={['#010103']} />
  {CACOS.map((c) => { const dir = new THREE.Vector3(c.x, c.y, 1.5 + random('kz' + c.s)).normalize(); const p = new THREE.Vector3(c.x, c.y, 0).add(dir.multiplyScalar(t * 0.04 * (0.5 + random('kv' + c.s)))); return <mesh key={c.s} position={V(p)} rotation={[t * 0.02 * random('ra' + c.s), t * 0.03 * random('rb' + c.s), random('rc' + c.s) * 3]}>
    <circleGeometry args={[c.r, 3]} /><meshStandardMaterial map={tex.dia} color="#c86a5a" metalness={0.6} roughness={0.15} side={THREE.DoubleSide} emissive="#3a0a08" /></mesh>; })}
  <Pos bloom={0.6} /></>; }}</CP>; };

// ================= 9. MAS ESPERA… =================
const C9a: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 0.2, 2.6]} alvo={[0, 0.6, 0]} /><Luzes sol={[lerp(-6, 3, k), 1, lerp(-4, 2, k)]} i={2.8} amb={0.04} /><Estrelas sem="c9a" />
  <Terra tex={tex} pos={[0, -1.9, -0.5]} r={2} rot={[0.3, f * 0.002, 0]} />
  <Brilho pos={[lerp(-3, 0.6, k), lerp(-0.2, 0.25, k), -3]} s={lerp(0.8, 2.6, k)} cor="#fff4d8" o={k} />
  <Pos bloom={1} /></>; }}</CP>; };
const C9b: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d - 10); return <>
  <Cam pos={[4, 4, 9]} alvo={[1, 0, 0]} /><Luzes sol={[-4, 3, 6]} i={2.4} amb={0.2} /><Estrelas sem="c9b" />
  <Terra tex={tex} rot={[0.3, f * 0.002, 0]} />
  <Tubo pts={LAT(20).map((i) => [9 - i * 0.9, 0.6, 3 - Math.pow((i - 10) / 10, 2) * -1 - 0.0] as V3)} r={0.03} cor="#3aff8a" k={k} brilho={1.6} />
  <Tubo pts={LAT(20).map((i) => [9 - i * 0.9, 0.3, 1 - (i / 19) * 0.8] as V3)} r={0.02} cor={VERM} o={0.5 * (1 - k)} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const C9c: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.linear); return <>
  <Cam pos={[0, 1, 4]} alvo={[0, 0, 0]} /><Luzes sol={[3, 2, 4]} i={2.6} amb={0.1} /><Estrelas sem="c9c" />
  <Terra tex={tex} pos={[-1.6, -0.6, -1]} r={0.9} rot={[0.3, f * 0.003, 0]} />
  <Apo tex={tex} pos={[lerp(-4, 4, t), lerp(1.5, 0.6, t), lerp(-2, 1, t)]} s={0.22} rot={[f * 0.02, f * 0.01, 0]} />
  <Pos bloom={0.8} /></>; }}</CP>; };
const C9d: React.FC = () => <CP>{(f) => { const a = f * 0.03; const b = f * 0.0335 + 2; return <>
  <Cam pos={[0, 10, 4]} /><color attach="background" args={['#010208']} /><Estrelas sem="c9d" />
  <Brilho pos={[0, 0, 0]} s={2.4} cor="#ffcf70" o={1} /><mesh><sphereGeometry args={[0.3, 32, 32]} /><meshBasicMaterial color="#ffe0a0" toneMapped={false} /></mesh>
  <Tubo pts={elipse(3.6, 3.6)} r={0.015} cor="#4aa8ff" o={0.6} /><Tubo pts={elipse(3.9, 2.9, 120, 0.4, [-0.3, 0.2])} r={0.015} cor="#3aff8a" o={0.6} />
  <mesh position={[Math.cos(a) * 3.6, 0, Math.sin(a) * 3.6]}><sphereGeometry args={[0.12, 24, 24]} /><meshStandardMaterial color="#3a7aff" emissive="#1a4aaa" /></mesh>
  <mesh position={[-0.3 + Math.cos(b) * 3.9 * Math.cos(0.4) - Math.sin(b) * 2.9 * Math.sin(0.4), 0, 0.2 + Math.cos(b) * 3.9 * Math.sin(0.4) + Math.sin(b) * 2.9 * Math.cos(0.4)]}><sphereGeometry args={[0.06, 12, 12]} /><meshBasicMaterial color="#c8c0b0" /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>;
const C9e: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.linear); return <>
  <Cam pos={[-2, 2.2, 12]} alvo={[0, 0, 3]} /><Luzes sol={[6, 3, 8]} i={2.6} amb={0.12} /><Estrelas sem="c9e" />
  <Terra tex={tex} rot={[0.2, f * 0.002, 0]} /><AnelSat f={f} n={40} s={0.1} linha={0.3} />
  <Apo tex={tex} pos={[lerp(-9, 9, t), 0.3, lerp(6.6, 5.4, t)]} s={0.3} rot={[f * 0.015, f * 0.01, 0]} />
  {LAT(30).map((i) => <Brilho key={i} pos={[lerp(-9, 9, t) - i * 0.12, 0.3, lerp(6.6, 5.4, t) + i * 0.008]} s={0.12} cor="#bfe8ff" o={0.4 * (1 - i / 30)} />)}
  <Pos bloom={0.9} /></>; }}</CP>; };
const C9f: React.FC = () => { const d = useD(); return <CP>{(f) => <>
  <Cam pos={[1.6, 0.8, 2.6 - f * 0.003]} alvo={[0, 0, 0]} /><Luzes sol={[3, 3, 3]} i={2.6} amb={0.1} /><Estrelas sem="c9f" />
  <Nave pos={[0, 0, 0]} s={0.7} rot={[0.2, f * 0.004, 0.1]} abre={pr(f, 6, d * 0.7, Easing.out(Easing.back(1.3)))} />
  <Pos bloom={0.7} /></>}</CP>; };
const C9g: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); const pts: V3[] = LAT(30).map((i) => { const t = i / 29; return [lerp(-4, 4, t), Math.sin(t * Math.PI) * 1.5, lerp(0, -1, t)]; }); const p = new THREE.CatmullRomCurve3(pts.map((x) => new THREE.Vector3(...x))).getPoint(Math.max(0.001, k)); return <>
  <Cam pos={[0, 2, 7]} alvo={[0, 0.5, 0]} /><Luzes sol={[2, 3, 5]} i={2.4} amb={0.15} /><Estrelas sem="c9g" />
  <Terra tex={tex} pos={[-4, 0, 0]} r={0.8} rot={[0.3, f * 0.003, 0]} />
  <Apo tex={tex} pos={[4, 0, -1]} s={0.2} rot={[f * 0.02, 0, 0]} />
  <Tubo pts={pts} r={0.012} cor={NEON} k={k} o={0.7} />
  <Nave pos={V(p)} s={0.12} rot={[0, f * 0.02, 0]} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const C9h: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[-1.2 + f * 0.003, 0.5, 3]} alvo={[0, 0, 0]} /><Luzes sol={[4, 2, 3]} i={2.8} amb={0.06} /><Estrelas sem="c9h" />
  <Terra tex={tex} pos={[-6, -1, -14]} r={2.2} rot={[0.3, f * 0.002, 0]} />
  <Apo tex={tex} pos={[0.7, 0, -0.4]} s={0.8} rot={[0.3, f * 0.004, 0]} />
  <Nave pos={[-0.8, 0.5, 0.4]} s={0.18} rot={[0.3, 0.8 + f * 0.002, 0]} />
  <Pos bloom={0.7} /></>}</CP>;
const C9i: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const t = pr(f, 0, d, Easing.out(Easing.cubic)); return <>
  <Cam pos={[1.8, 0.6, 3]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 3, 4]} i={2.6} amb={0.06} /><Estrelas sem="c9i" />
  <Apo tex={tex} pos={[-0.8, -0.2, -1]} s={0.9} rot={[0.5, f * 0.004, 0.2]} />
  <Nave tipo="apex" pos={L3([4, 1.5, 2], [0.7, 0.3, 0.4], t)} s={0.22} rot={[0.4, -0.6, 0.2]} />
  <Brilho pos={L3([4.3, 1.6, 2.2], [1.0, 0.4, 0.55], t)} s={0.3} cor="#9ad0ff" o={0.6 * (1 - t)} />
  <Pos bloom={0.8} /></>; }}</CP>; };
const C9j: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.35, 2.4]} alvo={[0, 1.2, -4]} /><Luzes sol={[3, 2, 2]} i={2.4} amb={0.06} /><Estrelas sem="c9j" />
  <mesh geometry={ROCHA} position={[0, -0.2, -2]}><meshStandardMaterial map={tex.lua} color="#a89c8e" roughness={1} /></mesh>
  <Terra tex={tex} pos={[1, 3.2 + f * 0.003, -12]} r={3.2} rot={[0.3, f * 0.002, 0]} />
  <Pos bloom={0.7} /></>}</CP>;
const C9k: React.FC = () => <CP>{(f, tex) => { const tr = 0.03 * Math.sin(f * 0.9); return <>
  <Cam pos={[0.3, 0.5, 2.6]} alvo={[0, 0, -1]} tremor={0.02} /><Luzes sol={[3, 3, 2]} i={2.4} amb={0.06} /><Estrelas sem="c9k" />
  <group position={[0, tr, 0]}><mesh geometry={ROCHA} position={[0, -0.3, -1.5]}><meshStandardMaterial map={tex.lua} color="#a89c8e" roughness={1} /></mesh></group>
  <Nuvem n={500} sem="c9k" origem={new THREE.Vector3(0, -0.2, -1.5)} t={f} raio={2.5} cor="#b8aa98" tam={0.03} o={0.6} dir={new THREE.Vector3(0, 1, 0)} />
  <Pedras n={30} sem="c9k" origem={new THREE.Vector3(0, -0.15, -1.5)} dir={new THREE.Vector3(0, 1, 0)} abre={1.5} t={f * 0.6} vel={0.012} tam={0.03} cor="#8a7c6c" brasa={0} />
  <Terra tex={tex} pos={[-2, 3, -10]} r={2.6} rot={[0.3, 0, 0]} />
  <Pos bloom={0.6} /></>; }}</CP>;
const C9l: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 0.4, 3.4]} /><Luzes sol={[2, 2, 3]} i={2.6} amb={0.06} /><Estrelas sem="c9l" />
  <Terra tex={tex} pos={[-5, 0, -6]} r={2} rot={[0.3, f * 0.002, 0]} />
  <group scale={[1 + k * 0.12, 1 - k * 0.06, 1 - k * 0.04]} rotation={[0.2, 0.5 + f * 0.003, 0]}><Apo tex={tex} /></group>
  {LAT(8).map((i) => <mesh key={i} geometry={geoApo} position={[-0.6 - k * (0.3 + random('l9' + i) * 0.6), 0.5 - i * 0.12 - k * 0.2, 0.6 + random('m9' + i) * 0.2]} scale={0.04 + random('s9' + i) * 0.04}><meshStandardMaterial map={tex.lua} color="#a89c8e" roughness={1} /></mesh>)}
  <Pos bloom={0.6} /></>; }}</CP>; };
const C9m: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-3 + f * 0.01, 0.8, 7]} alvo={[0, 2.5, -10]} /><Luzes sol={[0, 5, -10]} i={0.15} amb={0.06} /><Estrelas sem="c9m" n={3000} />
  <Ceu cima="#010208" baixo="#0e1830" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#04050a" /></mesh>
  <Predios n={70} sem="c9m" z={-6} larg={26} alt={4} janelas={0.8} />
  <Pos bloom={0.8} /></>}</CP>;
const C9n: React.FC = () => { const cam = camLL(25, 20, 2.7); return <CP rot={(f) => <>{([[50, 12, 'EUROPA'], [5, 20, 'ÁFRICA'], [40, 75, 'ÁSIA']] as [number, number, string][]).map(([la, lo, t], i) => <R3 key={t} cam={cam} p={v(la, lo, 1.02)} txt={t} o={pr(f, 10 + i * 24, 18 + i * 24)} dy={0} tam={50} />)}</>}>{(f, tex) => <>
  <Cam pos={cam} /><Luzes sol={[-cam[0] * 3, 0.5, -cam[2] * 3]} i={1.2} amb={0.04} /><Estrelas sem="c9n" />
  <TerraN tex={tex} luz={1} nuvens={false} />
  <Calota la={28} lo={22} ang={0.75} cor="#3a8aff" o={0.22 + 0.06 * Math.sin(f * 0.1)} add r={1.01} />
  <Brilho pos={V(v(30, 10 + f * 0.05, 1.6))} s={0.08} cor="#ffffff" o={1} />
  <Pos bloom={1.1} /></>}</CP>; };
const C9o: React.FC = () => { const d = useD(); return <CP>{(f) => { const t = pr(f, 0, d, Easing.linear); return <>
  <Cam pos={[0, 0.6, 6]} alvo={[0, 4, -12]} /><Luzes sol={[0, 5, -10]} i={0.15} amb={0.06} /><Estrelas sem="c9o" n={4000} />
  <Ceu cima="#000106" baixo="#0a1430" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#030408" /></mesh>
  <Predios n={50} sem="c9o" z={-3} larg={20} alt={2.2} janelas={0.5} />
  <Brilho pos={[lerp(-14, 12, t), lerp(9, 12, t), -30]} s={0.7} cor="#ffffff" o={1} />
  <Pos bloom={1} /></>; }}</CP>; };
const C9p: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[-1.5, 0.3, 3.6]} alvo={[0, 0, 0]} /><Luzes sol={[5, 1, 2]} i={2.8} amb={0.04} /><Estrelas sem="c9p" />
  <Terra tex={tex} pos={[3, -1, -6]} r={2.5} rot={[0.3, f * 0.002, 0]} />
  <Apo tex={tex} pos={[-0.3 + f * 0.002, 0.1, 0]} s={0.7} rot={[0.4, f * 0.003, 0.2]} />
  <Pos bloom={0.7} /></>}</CP>;
const C9q: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[Math.sin(f * 0.004) * 4, 0.8, Math.cos(f * 0.004) * 4]} alvo={[0, 0, 0]} /><Luzes sol={[5, 2, 3]} i={2.6} amb={0.08} /><Estrelas sem="c9q" />
  <TerraN tex={tex} giro={2} luz={0.8} />
  <group position={[1.6, 0.4, 0.8]}><Apo tex={tex} s={0.12} rot={[f * 0.01, 0, 0]} /><Nave pos={[0.25, 0.1, 0.1]} s={0.03} /><Nave tipo="apex" pos={[-0.22, -0.08, 0.15]} s={0.03} /></group>
  <Pos bloom={0.9} /></>}</CP>;
const C9r: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.2, 0.15, 3.0 - f * 0.004]} alvo={[0, 0.05, 0]} /><Luzes sol={[2, 3, 4]} i={2.4} amb={0.5} /><color attach="background" args={['#07080c']} />
  <mesh position={[0, -0.05, -0.05]}><boxGeometry args={[2.1, 2.3, 0.1]} /><meshStandardMaterial color="#2a2018" /></mesh>
  <mesh position={[0, 0, 0.01]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={CAL[4]} roughness={0.8} /></mesh>
  <pointLight position={[0.1, 0.1, 1]} intensity={1.5 + Math.sin(f * 0.2) * 0.5} color="#ffd0a0" distance={3} />
  <Pos bloom={0.5} /></>}</CP>;

// ---------- canto: contador de tempo ----------
const nn = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '');
const WN = W.map((w) => nn(w.w));
const tFrase = (fr: string) => { const p = fr.split(' '); for (let i = 0; i < WN.length; i++) if (p.every((x, j) => WN[i + j] === x)) return Math.round(W[i].t * 30); throw new Error('frase do canto: ' + fr); };
const MARCAS: {t: number; txt: string; verm: boolean}[] = [
  {t: 0, txt: '13 · ABR · 2029', verm: false},
  {t: tFrase('volta pra dois mil e quatro'), txt: 'FALTAM 25 ANOS', verm: false},
  {t: tFrase('entao o que voce vai ver'), txt: 'FALTAM 25 ANOS', verm: true},
  {t: tFrase('faltam tres anos'), txt: 'FALTAM 3 ANOS', verm: true},
  {t: tFrase('faltam tres dias'), txt: 'FALTAM 3 DIAS', verm: true},
  {t: tFrase('faltam alguns segundos'), txt: 'SEGUNDOS', verm: true},
  {t: tFrase('impacto a energia'), txt: 'IMPACTO', verm: true},
  {t: tFrase('nos dias seguintes'), txt: 'DIA 1', verm: true},
  {t: tFrase('mas espera porque'), txt: '13 · ABR · 2029', verm: false},
];
const Contador: React.FC<{k: number}> = () => {
  const f = useCurrentFrame();
  const m = [...MARCAS].reverse().find((x) => f >= x.t)!;
  const troca = f - m.t; const pop = interpolate(troca, [0, 6, 12], [1.25, 0.95, 1], cl);
  const cor = m.verm ? '#ff3a2a' : NEON; const pisca = m.txt === 'SEGUNDOS' ? (Math.floor(f / 8) % 2 ? 1 : 0.45) : 1;
  return <div style={{position: 'absolute', top: 40, left: 46, padding: '10px 22px', borderRadius: 10, background: 'rgba(0,0,0,.55)', border: `3px solid ${cor}`, transform: `scale(${pop})`, transformOrigin: 'left top',
    fontFamily: FONTE, fontWeight: 900, fontSize: 34, letterSpacing: 3, color: '#fff', opacity: pisca, boxShadow: `0 0 18px ${cor}88`, textShadow: `0 0 12px ${cor}`}}>
    <span style={{display: 'inline-block', width: 14, height: 14, borderRadius: 7, background: cor, marginRight: 14, verticalAlign: 'middle', boxShadow: `0 0 10px ${cor}`}} />{m.txt}</div>;
};
// cartão de capítulo: tela escura, o Apophis girando contra a luz (vermelho na simulação)
const Cartao: React.FC<{k: number}> = ({k}) => { const d = useD(); const sim = k >= 4 && k <= 8; return <CP>{(f, tex) => { const o = interpolate(f, [0, 6, d - 10, d], [0, 1, 1, 0], cl); return <>
  <Cam pos={[0, 0, 4.2 - pr(f, 0, d) * 0.6]} /><color attach="background" args={['#010103']} /><ambientLight intensity={0.18} />
  <directionalLight position={[-3 + k * 0.6, 1 - (k % 3) * 0.6, -2]} intensity={6 * o} color={sim ? '#ff3a1a' : '#bfe0ff'} />
  <Apo tex={tex} s={0.8 * o} rot={[k * 0.7, f * 0.012 + k, k * 0.4]} />
  <Pos bloom={0.9} /></>; }}</CP>; };

// ---------- plano ----------
const CAPS: Cap[] = [
  {canto: '', sat: 1}, {canto: '', sat: 1}, {canto: '', sat: 1}, {canto: '', sat: 0.95}, {canto: '', sat: 0.82},
  {canto: '', sat: 0.74}, {canto: '', sat: 0.66}, {canto: '', sat: 0.6}, {canto: '', sat: 0.55}, {canto: '', sat: 1},
];
const PLANO: [string, React.FC][][] = [
  [['sexta feira treze', H1], ['uma pedra maior', H2], ['tao perto que', H3], ['o nome dela', H4], ['em dois mil e cinco um', H5], ['era o lugar onde', H6], ['hoje voce vai ver', H7], ['e vai viver hora', H8], ['fica ate o fim', H9]],
  [['treze de abril de dois mil e vinte e nove seis', C1a], ['nesse minuto o apophis', C1b], ['pra voce ter uma ideia', C1c], ['ele passa por dentro', C1d], ['e o tamanho assusta', C1e], ['entre trezentos e quarenta', C1f], ['do tamanho de um navio', C1g], ['em pe ele seria', C1h], ['dezenas de milhoes de toneladas', C1i], ['e por um tempo', C1j]],
  [['volta pra dois mil e quatro', C2a], ['encontram um pontinho', C2b], ['eles calculam a orbita', C2c], ['e o resultado gela', C2d], ['em dezembro de dois mil e quatro', C2e], ['mas nenhum asteroide', C2f], ['por alguns dias ele foi', C2g], ['depois com mais medidas', C2h], ['dois mil e vinte e nove virou', C2i], ['mas sobrou uma pergunta', C2j], ['e se nessa passagem', C2k]],
  [['e ai que entra o astronauta', C3a], ['rusty schweickart voou', C3b], ['depois passou a vida', C3c], ['em dois mil e cinco ele publicou', C3d], ['nele uma faixa fina', C3e], ['era o caminho de risco', C3f], ['a faixa comeca nas ilhas', C3g], ['atravessa o oceano pacifico', C3h], ['entra no mexico perto', C3i], ['corta o centro do pais', C3j], ['passa pelo sul do golfo', C3k], ['se ele batesse naquele', C3l], ['esse mapa existiu', C3m], ['mas em dois mil e treze', C3n], ['a chance caiu pra', C3o], ['entao o que voce vai ver', C3p], ['o asteroide e real', C3q], ['o impacto nao', C3r]],
  [['imagina que as contas', C4a], ['faltam tres anos', C4b], ['e o ponto de impacto', C4c], ['com tres anos de aviso', C4d], ['e a gente sabe fazer', C4e], ['e mudou a orbita', C4f], ['a volta dele ao redor', C4g], ['mas o apophis e muito maior', C4h], ['e nessa simulacao o empurrao', C4i], ['faltam tres dias', C4j], ['voce nao mora la', C4k], ['mas voce liga a tv', C4l]],
  [['faltam alguns segundos', C5a], ['o apophis chega a uns', C5b], ['e como atravessar o brasil', C5c], ['ele entra na atmosfera', C5d], ['fica comprimido', C5e], ['por alguns segundos existe', C5f], ['e ele atravessa toda', C5g]],
  [['impacto a energia', C6a], ['vinte vezes a tsar', C6b], ['no chao abre se', C6d], ['num piscar de olhos', C6e], ['uma coluna de rocha', C6f], ['a luz do impacto', C6g]],
  [['vem os minutos depois', C7a], ['uma onda de choque', C7b], ['o estrago vai de dezenas', C7c], ['e se ele cair no mar', C7d], ['um estudo de dois mil e vinte e um', C7e], ['e concluiu que o tsunami', C7f], ['a agua leva o impacto', C7g], ['nos dias seguintes', C7h], ['o mundo inteiro manda', C7i]],
  [['mas tem uma coisa', C8a], ['isso seria uma catastrofe', C8b], ['o asteroide que acabou', C8c], ['o apophis apagaria', C8d], ['e na terra de verdade', C8e]],
  [['mas espera porque', C9a], ['em dois mil e vinte e um a nasa', C9b], ['nem em dois mil e vinte e nove', C9c], ['nem em dois mil e trinta e seis', C9d], ['e a passagem de dois mil', C9e], ['a europa e o japao', C9f], ['ela sai em abril', C9g], ['vai voar ao lado', C9h], ['a nasa tambem vai', C9i], ['e elas vao ver', C9j], ['a gravidade da terra puxando', C9k], ['deslizar', C9l], ['e nao vao ser so', C9m], ['na noite de treze', C9n], ['um pontinho de luz', C9o], ['a pedra que ja foi', C9p], ['diante de dois bilhoes', C9q], ['marca na agenda', C9r]],
];
const Fim: React.FC = () => <Final />;
const L = criarLongo({W, plano: PLANO, caps: CAPS, audio: 'apophis/narracao_cap.mp3', musica: 'apophis/musica.mp3', volta: 9, fim: Fim,
  semTexto: true, legenda: 40, cartao: Cartao, canto: Contador,
  hits: [{frase: 'tao perto que', vol: 0.3}, {frase: 'e o resultado gela', vol: 0.35}, {frase: 'impacto a energia', vol: 0.55}, {frase: 'faltam tres dias', vol: 0.35}]});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// thumb (dono, 11/11: "UM ASTEROIDE VAI BATER NA TERRA!"): Terra à noite embaixo, o asteroide em brasa entrando, rastro de fogo, anel de satélites
export const ThumbCena: React.FC = () => <CP>{(_f, tex) => <>
  <Cam pos={[0, 0.6, 6.2]} alvo={[0.3, 0.2, 0]} /><Luzes sol={[2, 2, 6]} i={3.2} amb={0.12} /><Estrelas sem="thA" />
  <group position={[-1.3, -2.6, -1]} scale={2.4}><TerraN tex={tex} giro={1.6} luz={1} /></group>
  <group position={[-1.3, -2.6, -1]} rotation={[0.35, 0, -0.12]}><AnelSat f={0} r={3.4} n={50} s={0.09} linha={0.55} /></group>
  <Tubo pts={[[5.2, 3.0, -3], [2.6, 0.75, 0.2]]} r={0.3} cor="#ff6a10" o={0.55} brilho={2} />
  <Tubo pts={[[5.2, 3.0, -3], [2.6, 0.75, 0.2]]} r={0.11} cor="#ffd080" o={0.9} brilho={2} />
  <Brilho pos={[2.9, 0.95, -1.2]} s={3.6} cor="#ff5a10" o={0.55} />
  <Apo tex={tex} pos={[2.45, 0.6, 0.6]} s={0.7} rot={[0.4, 0.9, 0.3]} brasa={0.15} />
  <pointLight position={[1.2, 0.2, 1.8]} intensity={4} color="#ff8a40" distance={4} />
  <Brilho pos={[-1.3, -0.25, -0.6]} s={3} cor="#ff3a1a" o={0.35} />
  <Pos bloom={1.2} /></>}</CP>;
void AbsoluteFill; void ThreeCanvas; void staticFile; void bolinha; void Easing;
