// Short "SE A GUERRA VIER: 33 PAÍSES JÁ MANDARAM VOCÊ GUARDAR COMIDA ⚠️" (v2 tensa, aprovado pelo dono em 11/11/2026). Tudo em Remotion 3D.
// Na tela: só a legenda (56) e os nomes dos países em neon. Países acendem em vermelho como alarmes. Sem guerra, saque ou pânico; folheto sem texto legível.
// Trilha: drone grave sintetizado + sirene distante que some antes da última frase (public/estoque/musica.mp3).
import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, interpolate, random, staticFile, useVideoConfig, Easing} from 'remotion';
import {Palavra} from '../comum';
import * as K from '../lote/kit';
import {Cam, Estrelas, Luzes, Pos, Brilho, Terra, pr, cl, THREE, Tex} from '../lote/kit3d';
import {CP, R3, v, camLL} from '../lote/pangeia3d';
import palavras from './estoque.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = Easing.inOut(Easing.cubic);
const VERM = '#ff2a1a';
const canvasTex = (w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, srgb = true) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')!); const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t; };
const GRAD = canvasTex(4, 128, (g) => { const gr = g.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, '#fff'); gr.addColorStop(0.5, '#fff'); gr.addColorStop(1, '#000'); g.fillStyle = gr; g.fillRect(0, 0, 4, 128); }, false);
let NT: THREE.Texture | null = null;
const luzesTex = (tex: Tex) => {
  if (NT) return NT;
  const a = document.createElement('canvas'); a.width = 1024; a.height = 512; const ga = a.getContext('2d')!; ga.drawImage(tex.dia.image as HTMLImageElement, 0, 0, 1024, 512); const px = ga.getImageData(0, 0, 1024, 512).data;
  NT = canvasTex(2048, 1024, (g) => { g.fillStyle = '#000'; g.fillRect(0, 0, 2048, 1024);
    for (let i = 0; i < 26000; i++) { const x = random('lx' + i), y = 0.12 + random('ly' + i) * 0.62; const o = (Math.floor(y * 512) * 1024 + Math.floor(x * 1024)) * 4; const r = px[o], gg = px[o + 1], b = px[o + 2];
      if (!((r + gg) / 2 > b * 0.95 && !(r > 190 && gg > 190 && b > 190)) || random('lk' + i) > 0.55) continue; g.fillStyle = `rgba(255,${190 + Math.floor(random('lc' + i) * 50)},120,${0.35 + random('la' + i) * 0.6})`; g.beginPath(); g.arc(x * 2048, y * 1024, 0.6 + random('ls' + i) ** 3 * 3.2, 0, 7); g.fill(); } });
  return NT;
};
const Noite: React.FC<{tex: Tex; luz?: number; nuvens?: boolean}> = ({tex, luz = 1, nuvens = false}) => <group>
  <ambientLight intensity={0.4} />
  <Terra tex={tex} rot={[0, 0, 0]} nuvens={nuvens} />
  <mesh><sphereGeometry args={[1.003, 128, 128]} /><meshBasicMaterial map={luzesTex(tex)} transparent opacity={luz} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>
</group>;
const Calota: React.FC<{la: number; lo: number; ang: number; cor: string; o: number; r?: number; add?: boolean}> = ({la, lo, ang, cor, o, r = 1.006, add = true}) => {
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v(la, lo)), [la, lo]);
  return <mesh quaternion={q}><sphereGeometry args={[r, 48, 16, 0, Math.PI * 2, 0, ang]} /><meshBasicMaterial color={cor} alphaMap={GRAD} transparent opacity={o} depthWrite={false} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} toneMapped={false} /></mesh>;
};
// alarme: país acende em vermelho e pulsa
const Alarme: React.FC<{la: number; lo: number; f: number; ini: number; tam?: number; cor?: string}> = ({la, lo, f, ini, tam = 0.06, cor = VERM}) => { const k = pr(f, ini, ini + 6, Easing.out(Easing.back(2))); if (k <= 0) return null; const p = 0.75 + 0.25 * Math.sin((f - ini) * 0.3);
  return <><Calota la={la} lo={lo} ang={tam * k} cor={cor} o={0.95 * p} /><Brilho pos={V(v(la, lo, 1.02))} s={tam * 4 * k * p} cor={cor} o={0.8} /></>; };
const rot = (cam: V3, xs: [number, number, string, number][], f: number, tam = 64) => <>{xs.map(([la, lo, t, ini]) => <R3 key={t} cam={cam} p={v(la, lo, 1.02)} txt={t} o={pr(f, ini, ini + 8)} dy={-70} tam={tam} />)}</>;
const PAISES: [number, number][] = [[62, 15], [61, 9], [64, 26], [56, 10], [51, 10], [54, -2], [47, 2], [52, 5], [50.5, 4.5], [47.5, 14], [42, 12.5], [40, -4], [39.5, -8], [39, 22], [45, 25], [47, 19], [49.8, 15.5], [48.7, 19.5], [46, 15], [45, 16], [53, -8], [58.6, 25], [56.9, 24.6], [55.2, 24], [52, 19], [46.8, 8.2], [60, -100], [39, -98], [-25, 134], [-41, 174], [36, 138], [36.5, 128], [23.7, 121]];
const Ampulheta: React.FC<{pos: V3; s: number; f: number; giro?: number}> = ({pos, s, f, giro = 0}) => { const g = (f * 0.02) % 1; return <group position={pos} scale={s} rotation={[0, giro + f * 0.02, 0]}>
  {[-1, 1].map((l) => <mesh key={l} position={[0, l * 0.45, 0]} rotation={[l > 0 ? Math.PI : 0, 0, 0]}><coneGeometry args={[0.42, 0.9, 32, 1, true]} /><meshPhysicalMaterial color="#ffd8c8" roughness={0.05} transparent opacity={0.3} side={THREE.DoubleSide} /></mesh>)}
  {[-1, 1].map((l) => <mesh key={'t' + l} position={[0, l * 0.93, 0]}><cylinderGeometry args={[0.5, 0.5, 0.06, 32]} /><meshStandardMaterial color="#8a3a24" emissive="#ff4a20" emissiveIntensity={0.4} /></mesh>)}
  <mesh position={[0, -0.6, 0]}><coneGeometry args={[0.3, 0.2 + g * 0.15, 32]} /><meshStandardMaterial color="#e0b060" emissive={VERM} emissiveIntensity={0.5} /></mesh>
  <mesh position={[0, 0.25, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.3, 0.35 - g * 0.15, 32]} /><meshStandardMaterial color="#e0b060" emissive={VERM} emissiveIntensity={0.5} /></mesh>
  <mesh position={[0, -0.1, 0]}><cylinderGeometry args={[0.01, 0.01, 0.8, 6]} /><meshBasicMaterial color="#ffb060" /></mesh>
</group>; };
const FOLHETO = canvasTex(256, 360, (g) => { g.fillStyle = '#14161c'; g.fillRect(0, 0, 256, 360); g.fillStyle = '#c8261a'; g.fillRect(0, 0, 256, 70); g.fillStyle = '#2a2e38'; for (let i = 0; i < 9; i++) g.fillRect(24, 100 + i * 26, 200 - (i % 3) * 40, 9); g.fillStyle = '#e8e2d0'; g.fillRect(24, 22, 150, 12); g.fillRect(24, 42, 100, 8); });
const Folheto: React.FC<{pos: V3; rot: V3; s?: number}> = ({pos, rot: r, s = 1}) => <mesh position={pos} rotation={r} scale={s}><planeGeometry args={[0.7, 1]} /><meshStandardMaterial map={FOLHETO} side={THREE.DoubleSide} roughness={0.8} /></mesh>;
const Casa: React.FC<{pos: V3; i: number; s?: number; luz?: number}> = ({pos, i, s = 1, luz = 0.5}) => <group position={pos} scale={s} rotation={[0, (random('cr' + i) - 0.5) * 0.4, 0]}>
  <mesh position={[0, 0.3, 0]}><boxGeometry args={[0.7, 0.6, 0.55]} /><meshStandardMaterial color="#7a1e16" emissive="#ffc070" emissiveIntensity={random('cl' + i) < 0.5 ? luz * 0.25 : 0} /></mesh>
  <mesh position={[0, 0.72, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.55, 0.3, 4]} /><meshStandardMaterial color="#1a1a1e" /></mesh>
</group>;

// ---------- cenas ----------
const S1: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0, 3.2 - f * 0.006]} /><Luzes sol={[1, 2, 3]} i={2.2} amb={0.15} /><color attach="background" args={['#030305']} />
  <pointLight position={[0, 1.5, 1]} intensity={6} color="#ff3a2a" distance={5} />
  <Folheto pos={[0, 0, 0]} rot={[0.15, f * 0.03, 0.1]} s={1.8} />
  <Pos bloom={0.6} /></>}</CP>;
const S2: React.FC = () => { const d = useD(); return <CP rot={(f) => <R3 cam={[0, lerp(5, 2.2, pr(f, 0, d)), 7]} alvo={[0, 0, 0]} p={new THREE.Vector3(0, 1.6, -2)} txt="SUÉCIA" o={pr(f, 10, 20)} tam={84} />}>{(f) => { const y = lerp(5, 2.2, pr(f, 0, d)); return <>
  <Cam pos={[0, y, 7]} alvo={[0, 0, 0]} /><Luzes sol={[-2, 4, 2]} i={0.5} amb={0.12} /><color attach="background" args={['#04060c']} /><fog attach="fog" args={['#04060c', 6, 18]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#c8d0dc" roughness={1} /></mesh>
  {Array.from({length: 24}, (_, i) => <Casa key={i} i={i} pos={[((i % 6) - 2.5) * 1.3 + random('cx' + i) * 0.3, 0, -Math.floor(i / 6) * 1.6 + 1]} />)}
  {Array.from({length: 90}, (_, i) => { const yy = 6 - ((f * (0.02 + random('fv' + i) * 0.02) + random('fy' + i) * 6) % 6.2); return <Folheto key={i} pos={[(random('fx' + i) - 0.5) * 8, yy, (random('fz' + i) - 0.5) * 6]} rot={[f * 0.05 * random('fa' + i) + i, f * 0.04, i]} s={0.22} />; })}
  <Pos bloom={0.6} /></>; }}</CP>; };
const S3: React.FC = () => { const d = useD(); const cam = (f: number) => camLL(58, 15, lerp(2.7, 5.2, pr(f, 0, d))); return <CP rot={(f) => rot(cam(f), [[62, 15, 'SUÉCIA', 2]], f, 60)}>{(f, tex) => <>
  <Cam pos={cam(f)} /><Luzes sol={[-5, 2, -2]} i={0.6} amb={0.05} /><Estrelas sem="e3" />
  <Noite tex={tex} />
  <Alarme la={62} lo={15} f={f} ini={0} tam={0.08} />
  {PAISES.slice(1, 12).map(([la, lo], i) => <Alarme key={i} la={la} lo={lo} f={f} ini={14 + i * 4} tam={0.035} cor="#ff6a3a" />)}
  <Pos bloom={1} /></>}</CP>; };
const S4: React.FC = () => <CP>{(f, tex) => { const c = camLL(40, -10 + f * 0.25, 5.4); return <>
  <Cam pos={c} /><Luzes sol={[c[0] * 2, 2, c[2] * 2]} i={lerp(2, 0.3, pr(f, 0, 30))} amb={0.05} /><Estrelas sem="e4" />
  <Noite tex={tex} luz={0.6} />
  {PAISES.map(([la, lo], i) => <Alarme key={i} la={la} lo={lo} f={f} ini={6 + i * 2.2} tam={0.05} />)}
  <Pos bloom={1.1} /></>; }}</CP>;
const S5_: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 2.6 - f * 0.004, 3.2]} alvo={[0, 0, -0.3]} /><Luzes sol={[0, 4, 1]} i={0.3} amb={0.05} /><color attach="background" args={['#020205']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[4, 2]} /><meshBasicMaterial map={luzesTex(tex)} toneMapped={false} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}><planeGeometry args={[4, 2]} /><meshStandardMaterial map={tex.dia} color="#202838" /></mesh>
  {PAISES.map(([la, lo], i) => { const h = 0.5 * pr(f, i * 2, i * 2 + 10, Easing.out(Easing.back(1.6))); const x = lo / 180 * 2, z = -la / 90; return h <= 0 ? null : <group key={i} position={[x, 0, z]}>
    <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[0.012, 0.012, h, 8]} /><meshBasicMaterial color={new THREE.Color(VERM).multiplyScalar(1.6)} toneMapped={false} /></mesh>
    <Brilho pos={[0, h, 0]} s={0.12} cor={VERM} o={0.9} /></group>; })}
  <Pos bloom={1.2} /></>}</CP>;
const S6: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.6 - f * 0.006, 1.2, 3.4]} alvo={[0, 0.8, 0]} /><ambientLight intensity={0.06} /><color attach="background" args={['#030303']} />
  <spotLight position={[1, 3, 2]} angle={0.5} penumbra={0.7} intensity={14} color="#ffe0b0" />
  {[0, 1, 2].map((r) => <mesh key={r} position={[0, 0.02 + r * 0.6, 0]}><boxGeometry args={[3, 0.04, 0.6]} /><meshStandardMaterial color="#3a2a1c" /></mesh>)}
  {Array.from({length: 30}, (_, i) => { const r = Math.floor(i / 10), c = i % 10; const k = pr(f, i * 1.6, i * 1.6 + 8, Easing.out(Easing.back(2))); return k <= 0 ? null : <mesh key={i} position={[(c - 4.5) * 0.28, 0.04 + r * 0.6 + 0.12 * k, 0]} scale={[1, k, 1]}><cylinderGeometry args={[0.1, 0.1, 0.24, 24]} /><meshStandardMaterial color={['#b8bcc4', '#c8261a', '#d8b040'][(i * 7) % 3]} metalness={0.8} roughness={0.3} /></mesh>; })}
  <Pos bloom={0.5} /></>}</CP>;
const S7: React.FC = () => { const cam: V3 = camLL(44, 14, 2.7); return <CP rot={(f) => rot(cam, [[52, 12, 'UNIÃO EUROPEIA', 6]], f, 58)}>{(f, tex) => <>
  <Cam pos={[cam[0], cam[1] - 0.15 + f * 0.001, cam[2]]} alvo={[0, 0, 0]} /><Luzes sol={[-4, 2, -2]} i={0.5} amb={0.05} /><Estrelas sem="e7" />
  <Noite tex={tex} />
  <Calota la={50} lo={12} ang={0.28} cor="#3a5aff" o={0.18} />
  <Ampulheta pos={V(v(50, 12, 1.12))} s={0.07} f={f} />
  <Pos bloom={1} /></>}</CP>; };
const S8: React.FC = () => <CP>{(f) => { const a = f * 0.12; return <>
  <Cam pos={[0, 1.4, 4.2]} alvo={[0, 0.6, 0]} /><ambientLight intensity={0.03} /><color attach="background" args={['#020102']} />
  <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.45, 0.55, 0.5, 32]} /><meshStandardMaterial color="#1a1a1e" metalness={0.6} roughness={0.4} /></mesh>
  <mesh position={[0, 0.85, 0]}><sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#ff2a1a" emissive={VERM} emissiveIntensity={0.6} transparent opacity={0.8} /></mesh>
  <pointLight position={[Math.cos(a) * 1.2, 1.0, Math.sin(a) * 1.2]} intensity={12} color="#ff2010" distance={6} />
  <Brilho pos={[Math.cos(a) * 0.4, 0.95, Math.sin(a) * 0.4]} s={1.4} cor={VERM} o={0.8} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[10, 64]} /><meshStandardMaterial color="#0c0c10" /></mesh>
  <Pos bloom={1.2} /></>; }}</CP>;
const S9: React.FC = () => { const cam: V3 = camLL(54, -3, 2.4); return <CP rot={(f) => rot([cam[0] * (1 + f * 0.0015), cam[1] * (1 + f * 0.0015), cam[2] * (1 + f * 0.0015)], [[54.5, -2.5, 'REINO UNIDO', 6]], f, 66)}>{(f, tex) => <>
  <Cam pos={[cam[0] * (1 + f * 0.0015), cam[1] * (1 + f * 0.0015), cam[2] * (1 + f * 0.0015)]} /><Luzes sol={[-4, 2, -2]} i={0.6} amb={0.06} /><Estrelas sem="e9" />
  <Noite tex={tex} />
  <Alarme la={53.5} lo={-2} f={f} ini={10} tam={0.05} cor="#ff6a3a" />
  <Pos bloom={1} /></>}</CP>; };
const S10: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 4, d - 4, Easing.linear); return <>
  <Cam pos={camLL(54, -3, 2.1)} /><Luzes sol={[-4, 2, -2]} i={0.4} amb={0.04} /><Estrelas sem="e10" />
  <Noite tex={tex} />
  {Array.from({length: 12}, (_, i) => { const ki = Math.min(1, Math.max(0, k * 12 - i)); return <Calota key={i} la={50.5 + i * 0.85} lo={-4.5 + (i % 3) * 1.6 - (i > 8 ? 1.5 : 0)} ang={0.018 + ki * 0.02} cor="#0a1420" o={0.9 * ki} r={1.0045} add={false} />; })}
  <Pos bloom={1} /></>; }}</CP>; };
const TRES: [number, number, string, number][] = [[62, 15, 'SUÉCIA', 0.09], [61, 9, 'NORUEGA', 0.12], [51, 10, 'ALEMANHA', 0.16]];
const S11: React.FC = () => { const d = useD(); const seg = (f: number) => Math.min(2, Math.floor(f / (d / 3))); const cam = (f: number) => { const i = seg(f); const t = pr(f - i * d / 3, 0, 14); const [la, lo] = TRES[i]; const [la0, lo0] = TRES[Math.max(0, i - 1)]; return camLL(lerp(la0, la, i ? t : 1) - 4, lerp(lo0, lo, i ? t : 1), 2.6 + i * 0.15); };
  return <CP rot={(f) => { const i = seg(f); const [la, lo, txt] = TRES[i]; return <R3 cam={cam(f)} p={v(la, lo, 1.02)} txt={txt} o={pr(f - i * d / 3, 6, 12)} dy={110} tam={72} />; }}>{(f, tex) => <>
  <Cam pos={cam(f)} /><Luzes sol={[-4, 2, -2]} i={0.5} amb={0.05} /><Estrelas sem="e11" />
  <Noite tex={tex} />
  {TRES.map(([la, lo, , s], i) => f < i * d / 3 ? null : <Ampulheta key={i} pos={V(v(la, lo, 1 + s * 0.6))} s={1.0 * s * pr(f - i * d / 3, 0, 10, Easing.out(Easing.back(2)))} f={f} />)}
  <Pos bloom={0.9} /></>}</CP>; };
const ITENS = ['agua', 'lata', 'remedio', 'lanterna', 'radio'] as const;
const Item: React.FC<{tipo: typeof ITENS[number]}> = ({tipo}) => {
  if (tipo === 'agua') return <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.12, 0.12, 0.6, 24]} /><meshPhysicalMaterial color="#8ac8ff" roughness={0.1} transparent opacity={0.7} /></mesh>;
  if (tipo === 'lata') return <mesh position={[0, 0.13, 0]}><cylinderGeometry args={[0.13, 0.13, 0.26, 24]} /><meshStandardMaterial color="#c0c4c8" metalness={0.9} roughness={0.25} /></mesh>;
  if (tipo === 'remedio') return <mesh position={[0, 0.08, 0]}><boxGeometry args={[0.3, 0.16, 0.2]} /><meshStandardMaterial color="#f0f0f0" emissive="#c8261a" emissiveIntensity={0.15} /></mesh>;
  if (tipo === 'lanterna') return <group rotation={[0, 0, Math.PI / 2]} position={[0, 0.08, 0]}><mesh><cylinderGeometry args={[0.06, 0.06, 0.4, 16]} /><meshStandardMaterial color="#202020" /></mesh><mesh position={[0, 0.22, 0]}><cylinderGeometry args={[0.1, 0.06, 0.1, 16]} /><meshStandardMaterial color="#d8d8d0" emissive="#fff4c0" emissiveIntensity={1} /></mesh></group>;
  return <group position={[0, 0.14, 0]}><mesh><boxGeometry args={[0.42, 0.28, 0.14]} /><meshStandardMaterial color="#3a3028" /></mesh><mesh position={[-0.08, 0, 0.071]}><circleGeometry args={[0.09, 24]} /><meshStandardMaterial color="#888" /></mesh></group>;
};
const S12: React.FC = () => { const d = useD(); return <CP>{(f) => { const lx = Math.sin(f * 0.05) * 0.6; return <>
  <Cam pos={[0.3, 1.6, 2.4 - f * 0.003]} alvo={[0, 0.3, 0]} /><ambientLight intensity={0.03} /><color attach="background" args={['#020202']} />
  <spotLight position={[lx, 2.4, 1.4]} angle={0.35} penumbra={0.5} intensity={30} color="#fff2c8" />
  <mesh position={[0, -0.03, 0]}><boxGeometry args={[4, 0.06, 2.4]} /><meshStandardMaterial color="#2a1c12" roughness={0.7} /></mesh>
  <group position={[-0.7, 0, -0.2]}><mesh position={[0, 0.45, 0]}><boxGeometry args={[0.8, 0.9, 0.4]} /><meshStandardMaterial color="#2a3a2a" roughness={0.9} /></mesh><mesh position={[0, 0.65, 0.21]}><boxGeometry args={[0.6, 0.4, 0.06]} /><meshStandardMaterial color="#223022" /></mesh></group>
  {ITENS.map((t, i) => { const ini = i * (d / 5.5); const k = pr(f, ini, ini + 8, Easing.out(Easing.back(2))); return k <= 0 ? null : <group key={t} position={[0.1 + (i % 3) * 0.42, lerp(0.8, 0, k), -0.3 + Math.floor(i / 3) * 0.5]}><Item tipo={t} /></group>; })}
  <Pos bloom={0.6} /></>; }}</CP>; };
const S13: React.FC = () => <CP>{(f) => { const neg = f > 24; const p = 0.6 + 0.4 * Math.sin(f * 0.5); return <>
  <Cam pos={[0.6, 1.2, 2]} alvo={[0, 0.3, 0]} /><ambientLight intensity={0.05} /><color attach="background" args={['#020202']} />
  <spotLight position={[0, 2.4, 1]} angle={0.5} penumbra={0.6} intensity={20} color="#ffe8c0" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 6]} /><meshStandardMaterial color="#20160e" /></mesh>
  <group position={[-0.35, 0.2, 0]} rotation={[-0.5, 0.2, 0]}><mesh><boxGeometry args={[0.5, 0.4, 0.7]} /><meshStandardMaterial color="#1a1c22" /></mesh>
    <mesh position={[0, 0.201, -0.15]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.38, 0.22]} /><meshBasicMaterial color={neg ? new THREE.Color(VERM).multiplyScalar(1.4 * p) : '#2a4a3a'} toneMapped={false} /></mesh>
    <mesh position={[0.05, 0.3, 0.2]} rotation={[0, 0, 0.3]}><boxGeometry args={[0.42, 0.02, 0.27]} /><meshStandardMaterial color="#3a5aa8" metalness={0.5} /></mesh></group>
  {Array.from({length: 8}, (_, i) => { const k = pr(f, 30 + i * 3, 40 + i * 3, Easing.out(Easing.back(1.5))); return k <= 0 ? null : <mesh key={i} position={[0.45 + (random('nx' + i) - 0.5) * 0.2, 0.01 + i * 0.012, (random('nz' + i) - 0.5) * 0.2]} rotation={[-Math.PI / 2, 0, random('nr' + i)]} scale={k}><planeGeometry args={[0.5, 0.24]} /><meshStandardMaterial color="#5a8a5a" side={THREE.DoubleSide} /></mesh>; })}
  <Pos bloom={0.9} /></>; }}</CP>;
const S14: React.FC = () => { const d = useD(); const cam = (f: number) => { const t = pr(f, 0, d * 0.75); return camLL(lerp(40, -12, t), lerp(-5, -48, t), lerp(3.4, 2.9, t)); };
  return <CP rot={(f) => <R3 cam={cam(f)} p={v(-10, -52, 1.02)} txt="BRASIL" o={pr(f, d * 0.7, d * 0.7 + 8)} dy={0} tam={84} />}>{(f, tex) => <>
  <Cam pos={cam(f)} /><Luzes sol={[-3, 1, -4]} i={0.5} amb={0.06} /><Estrelas sem="e14" />
  <Noite tex={tex} />
  {PAISES.slice(0, 12).map(([la, lo], i) => <Alarme key={i} la={la} lo={lo} f={f} ini={0} tam={0.035} cor="#ff6a3a" />)}
  <Alarme la={-10} lo={-52} f={f} ini={d * 0.68} tam={0.16} />
  <Pos bloom={1.1} /></>}</CP>; };
const S15: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 4, d - 6, Easing.linear); const n = Math.floor(k * 72); return <>
  <Cam pos={[0, 0, 5.8 - f * 0.004]} /><ambientLight intensity={0.2} /><color attach="background" args={['#030305']} />
  {Array.from({length: 72}, (_, i) => { const a = i / 72 * Math.PI * 2; const on = i < n; return <mesh key={i} position={[Math.sin(a) * 1.1, Math.cos(a) * 1.1, 0]} rotation={[0, 0, -a]}><boxGeometry args={[0.035, i % 12 === 0 ? 0.2 : 0.12, 0.02]} /><meshBasicMaterial color={on ? new THREE.Color('#ffb040').multiplyScalar(1.6) : '#2a2a30'} toneMapped={false} /></mesh>; })}
  <group rotation={[0, 0, -k * Math.PI * 2]}><mesh position={[0, 0.45, 0]}><boxGeometry args={[0.04, 0.9, 0.02]} /><meshBasicMaterial color={new THREE.Color(VERM).multiplyScalar(1.6)} toneMapped={false} /></mesh></group>
  <mesh><cylinderGeometry args={[0.07, 0.07, 0.04, 24]} /><meshStandardMaterial color="#888" /></mesh>
  <Pos bloom={1} /></>; }}</CP>; };
const S16: React.FC = () => <CP>{(f, tex) => { const c = camLL(15, -20 + f * 0.15, 3.6 + f * 0.01); return <>
  <Cam pos={c} /><Luzes sol={[-c[0], 0.5, -c[2]]} i={0.4} amb={0.04} /><Estrelas sem="e16" />
  <Noite tex={tex} luz={0.5} />
  {PAISES.map(([la, lo], i) => <Alarme key={i} la={la} lo={lo} f={f + 40} ini={i} tam={0.045} />)}
  <Alarme la={-10} lo={-52} f={f + 40} ini={0} tam={0.13} />
  <Pos bloom={1} /></>; }}</CP>;
const S17: React.FC = () => { const d = useD(); return <CP rot={(f) => <R3 cam={camLL(-14, -52, 2.9)} p={v(-10, -52, 1.02)} txt="BRASIL" o={1} dy={0} tam={80} />}>{(f, tex) => { const k = pr(f, 6, d * 0.8); const cor = '#' + new THREE.Color(VERM).lerp(new THREE.Color('#ffb020'), k).getHexString(); return <>
  <Cam pos={camLL(-14, -52, 2.9)} /><Luzes sol={[-2, 1, -4]} i={0.5} amb={0.08} /><Estrelas sem="e17" />
  <Noite tex={tex} />
  <Calota la={-11} lo={-52} ang={0.22} cor={cor} o={0.4 + 0.1 * Math.sin(f * 0.15)} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const S18: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.2, 1.1 + f * 0.004, 3.2 + f * 0.012]} alvo={[0, 0.5, 0]} /><ambientLight intensity={0.03} /><Estrelas sem="e18" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[30, 64]} /><meshStandardMaterial color="#050608" /></mesh>
  <group><mesh position={[0, 0.5, 0]}><boxGeometry args={[1.2, 1, 1]} /><meshStandardMaterial color="#1a1c22" /></mesh><mesh position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.95, 0.5, 4]} /><meshStandardMaterial color="#14100e" /></mesh>
    <mesh position={[0.25, 0.55, 0.505]}><planeGeometry args={[0.3, 0.32]} /><meshBasicMaterial color={new THREE.Color('#ffc870').multiplyScalar(1.6)} toneMapped={false} /></mesh></group>
  <pointLight position={[0.25, 0.55, 0.9]} intensity={2} color="#ffb060" distance={3} />
  {Array.from({length: 40}, (_, i) => <mesh key={i} position={[(random('hx' + i) - 0.5) * 30, 0.2, -4 - random('hz' + i) * 14]}><boxGeometry args={[0.6, 0.4, 0.6]} /><meshStandardMaterial color="#08090c" /></mesh>)}
  <Pos bloom={0.8} /></>}</CP>;

const PLANO: K.Plano = [
  ['se a crise', S1], ['esse e o titulo', S2], ['e ela nao esta', S3], ['um levantamento da revista', S4], ['todos pedindo a mesma', S6],
  ['a uniao europeia pediu', S7], ['e entre os motivos', S8], ['o reino unido lancou', S9], ['por medo de ataques', S10], ['a suecia quer que', S11],
  ['agua comida em lata', S12], ['e dinheiro vivo', S13], ['e agora chegou aqui', S14], ['publicou o seu kit', S15], ['nenhum governo disse', S16], ['o brasil ate avisou', S17], ['mas todos querem', S18],
];
const Extra: React.FC = () => { const {durationInFrames: d} = useVideoConfig(); return <AbsoluteFill><Audio src={staticFile('estoque/musica.mp3')} volume={(f) => interpolate(f, [0, 20, d - 40, d], [0, 0.6, 0.6, 0], cl)} /></AbsoluteFill>; };
const S = K.criarShort(W, PLANO, 'estoque/narracao.mp3', 'nenhum governo disse', Extra, {legenda: 56});
export const Video = S.Video; export const DURACAO = S.DURACAO;
void ease;
void S5_;
