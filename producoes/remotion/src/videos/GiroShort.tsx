// Short "E SE a TERRA GIRASSE cada vez MAIS RÁPIDO? 🌍💫" (aprovado pelo dono em 13/11/2026; sai ANTES do longo). Tudo em Remotion 3D.
// Na tela: título no 1º segundo, contador "O DIA DURA" no canto (24 H → 12 H → 6 H → 4 H → 2 H → 1H24, volta a crescer na virada) e a legenda (56). Sem selos.
// Cenas próprias (diferentes das do longo): manivela no Polo Norte, estrada no equador, globo de vidro, trampolim, basquete, carros flutuando, Haumea.
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Pedras, Terra, Lua, pr, cl, THREE} from '../lote/kit3d';
import {CP, v} from '../lote/pangeia3d';
import {LAT, Viva, Tubo, Arvore, Ceu, PLANICIE, canvasTex} from './Apophis';
import {Boneco} from './PangeiaLongo';
import {TerraGira, Furacao, Ovo, calTex} from './Girando';
import palavras from './giro_short.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const OURO = '#ffc83a';
const NEON = '#39d8ff';

const Manivela: React.FC<{ang: number; s?: number}> = ({ang, s = 1}) => <group scale={s}>
  <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[0.05, 0.05, 1.2, 16]} /><meshStandardMaterial color="#8a8e96" metalness={0.9} roughness={0.25} /></mesh>
  <group position={[0, 1.2, 0]} rotation={[0, ang, 0]}><mesh position={[0.35, 0, 0]}><boxGeometry args={[0.7, 0.06, 0.08]} /><meshStandardMaterial color="#8a8e96" metalness={0.9} roughness={0.25} /></mesh>
    <mesh position={[0.7, 0.18, 0]}><cylinderGeometry args={[0.05, 0.05, 0.36, 16]} /><meshStandardMaterial color="#c8261a" /></mesh></group>
</group>;
const Carro: React.FC<{pos: V3; rot?: V3; cor: string; s?: number}> = ({pos, rot = [0, 0, 0], cor, s = 1}) => <group position={pos} rotation={rot} scale={s}>
  <mesh position={[0, 0.22, 0]}><boxGeometry args={[1.2, 0.3, 0.55]} /><meshStandardMaterial color={cor} metalness={0.6} roughness={0.3} /></mesh>
  <mesh position={[-0.05, 0.45, 0]}><boxGeometry args={[0.65, 0.22, 0.5]} /><meshStandardMaterial color="#1a2430" metalness={0.5} roughness={0.1} /></mesh>
  {[[-0.38, 0.27], [0.38, 0.27], [-0.38, -0.27], [0.38, -0.27]].map(([x, z], i) => <mesh key={i} position={[x, 0.1, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.11, 0.11, 0.08, 16]} /><meshStandardMaterial color="#111" /></mesh>)}
</group>;
const ASFALTO = canvasTex(64, 512, (g) => { g.fillStyle = '#2a2c30'; g.fillRect(0, 0, 64, 512); g.fillStyle = '#f2d24a'; for (let i = 0; i < 8; i++) g.fillRect(30, i * 64, 4, 34); });
ASFALTO.wrapT = THREE.RepeatWrapping;

// ---------- cenas ----------
const S1: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const w = lerp(0.01, 0.12, pr(f, 0, d, Easing.in(Easing.cubic))); const ang = LAT(Math.max(1, f)).reduce((s, i) => s + lerp(0.01, 0.12, pr(i, 0, d, Easing.in(Easing.cubic))), 0); return <>
  <Cam pos={[0, 5.4, 0.6]} alvo={[0, 0, 0]} /><Luzes sol={[-2, 4, 3]} i={2.6} amb={0.15} /><Estrelas sem="gs1" />
  <TerraGira tex={tex} ang={ang} rastro={w * 0.7} />
  <Pos bloom={0.8} /></>; }}</CP>; };
const S2: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-0.5, 0.6, 3.6]} alvo={[0, 0, 0]} /><Luzes sol={[-2, 3, 4]} i={2} amb={0.45} /><color attach="background" args={['#2a1e14']} />
  <group rotation={[-0.35, 0.2, 0.05]}><mesh position={[0, -0.05, -0.05]}><boxGeometry args={[2.1, 2.3, 0.1]} /><meshStandardMaterial color="#5a3a24" /></mesh>
    <mesh position={[0, 0, 0.01]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={calTex} roughness={0.8} /></mesh></group>
  <group position={[0.5, -1.1, 0.6]} rotation={[-1.1, 0, 0]}><mesh><cylinderGeometry args={[0.5, 0.5, 0.06, 48]} /><meshStandardMaterial color="#c8a040" metalness={0.9} /></mesh>
    <group rotation={[0, Math.sin(f * 0.8) * 0.05, 0]}><mesh position={[0, 0.04, -0.2]}><boxGeometry args={[0.02, 0.01, 0.4]} /><meshBasicMaterial color="#ff2a1a" /></mesh></group></group>
  <Pos bloom={0.4} /></>}</CP>;
const S3: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const ang = LAT(Math.max(1, f)).reduce((s, i) => s + lerp(0.03, 0.4, pr(i, 0, d, Easing.in(Easing.quad))), 0); return <>
  <Cam pos={[1.6, 4.6, 2.4]} alvo={[0, 1.2, 0]} /><Luzes sol={[2, 4, 3]} i={2.4} amb={0.2} /><Estrelas sem="gs3" />
  <group rotation={[0, ang * 0.3, 0]}><Terra tex={tex} rot={[0, 0, 0]} /></group>
  <group position={[0, 0.98, 0]}><Manivela ang={ang} s={0.8} /></group>
  <Pos bloom={0.6} /></>; }}</CP>; };
const S4: React.FC = () => <CP>{(f) => { ASFALTO.offset.y = f * 0.12; return <>
  <Cam pos={[2.2, 1.1, 3.6]} alvo={[0, 0.3, -1]} /><Luzes sol={[-3, 5, 2]} i={2} amb={0.35} /><Ceu cima="#3a7ac8" baixo="#e8f0f8" />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -4]}><planeGeometry args={[1.8, 16]} /><meshStandardMaterial map={ASFALTO} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#6a8a3a" /></mesh>
  <Carro pos={[-0.4, 0, 0.6]} rot={[0, Math.PI / 2, 0]} cor="#c8261a" s={0.9} /><Carro pos={[0.4, 0, -1.4]} rot={[0, Math.PI / 2, 0]} cor="#2a6ad8" s={0.9} />
  {LAT(14).map((i) => <Arvore key={i} pos={[(i % 2 ? 1 : -1) * (1.6 + random('ga' + i)), 0, ((f * 0.35 + i * 2.3) % 30) - 26]} s={1.5} />)}
  {LAT(30).map((i) => <mesh key={'r' + i} position={[(random('gr' + i) - 0.5) * 4, 0.1 + random('gs' + i) * 1.5, ((f * 0.6 + random('gt' + i) * 20) % 20) - 16]}><boxGeometry args={[0.01, 0.01, 0.9]} /><meshBasicMaterial color="#fff" transparent opacity={0.35} /></mesh>)}
  <Pos bloom={0.4} /></>; }}</CP>;
const S5: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.8, 5]} alvo={[0, 1.6, -6]} tremor={0.02} /><Luzes sol={[-3, 5, 2]} i={1.2} amb={0.3} /><Ceu cima="#1a2a3a" baixo="#6a8098" />
  <Viva n={100} tam={40} h={(x, z) => (Math.sin(x * 0.9 + f * 0.1) + Math.sin(z * 1.1 - f * 0.08)) * 0.1} mat={<meshStandardMaterial color="#1a4a6a" roughness={0.3} metalness={0.4} />} />
  {[[-2, 2.6, -8, 3], [3, 3.2, -12, 4]].map(([x, y, z, s], i) => <group key={i} position={[x, y, z]} rotation={[-1.2, 0, 0]}><group rotation={[0, 0, f * 0.18 * (i ? -1 : 1)]}><Furacao s={s} giro={0} rot={[0, 0, 0]} /></group></group>)}
  <Pos bloom={0.5} /></>}</CP>;
const S6: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d * 0.8); const a = f * 0.02; return <>
  <Cam pos={[Math.sin(a) * 5.2, 1.4, Math.cos(a) * 5.2]} alvo={[0, -0.3, 0]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.3} /><color attach="background" args={['#0a0c12']} />
  <mesh><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#cfe8ff" transparent opacity={0.07} depthWrite={false} /></mesh>
  <ambientLight intensity={0.4} /><group scale={0.92}><Terra tex={tex} rot={[0, f * 0.03, 0]} nuvens={false} /></group>
  <mesh><sphereGeometry args={[0.935 + k * 0.01, 96, 48, 0, Math.PI * 2, Math.PI / 2 - 0.1 - k * 0.35, 0.2 + k * 0.7]} /><meshPhysicalMaterial color="#2a8ae8" roughness={0.05} transparent opacity={0.85} /></mesh>
  {LAT(30).map((i) => { const t = ((f * 0.02 + random('w' + i)) % 1); const lo = random('wl' + i) * Math.PI * 2; const la = (i % 2 ? 1 : -1) * lerp(1.1, 0.15, t); return <Brilho key={i} pos={[Math.cos(la) * Math.cos(lo) * 0.95, Math.sin(la) * 0.95, Math.cos(la) * Math.sin(lo) * 0.95]} s={0.06} cor="#8ad8ff" o={0.8} />; })}
  <mesh position={[0, -1.4, 0]}><cylinderGeometry args={[0.5, 0.7, 0.4, 48]} /><meshStandardMaterial color="#3a2a1c" /></mesh>
  <Pos bloom={0.6} /></>; }}</CP>; };
const S7: React.FC = () => <CP>{(f) => { const t = (f % 48) / 48; const y = Math.sin(t * Math.PI) * 2.4; const dob = Math.max(0, 0.25 - y * 0.6); return <>
  <Cam pos={[6.4, 2.4, 6.4]} alvo={[0, 1.9, 0]} /><Luzes sol={[-3, 5, 3]} i={2} amb={0.35} /><Ceu cima="#2a6ac8" baixo="#d8e8f8" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[30, 64]} /><meshStandardMaterial color="#5a8a3a" /></mesh>
  <mesh position={[0, 0.5 - dob * 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.1, 48]} /><meshStandardMaterial color="#14161a" side={THREE.DoubleSide} /></mesh>
  <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.15, 0.06, 12, 48]} /><meshStandardMaterial color="#2a6ad8" /></mesh>
  {LAT(6).map((i) => <mesh key={i} position={[Math.cos(i) * 1.1, 0.25, Math.sin(i) * 1.1]}><cylinderGeometry args={[0.03, 0.03, 0.5, 8]} /><meshStandardMaterial color="#888" /></mesh>)}
  <Boneco pos={[0, 0.5 + y - dob * 0.3, 0]} s={1.1} rot={0.6} anda={0.3} />
  <Pos bloom={0.4} /></>; }}</CP>;
const S8: React.FC = () => <CP>{(f) => { const t = (f % 54) / 54; const y = 0.25 + Math.sin(t * Math.PI) * 3.2; return <>
  <Cam pos={[0, 0.8, 6.6]} alvo={[0, 1.8, 0]} /><Luzes sol={[2, 6, 3]} i={2.6} amb={0.6} /><color attach="background" args={['#2a2018']} /><spotLight position={[0, 6, 2]} angle={0.6} penumbra={0.5} intensity={30} color="#fff0d8" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#c88a4a" roughness={0.4} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}><ringGeometry args={[1.5, 1.56, 64]} /><meshBasicMaterial color="#f0f0f0" /></mesh>
  <mesh position={[0, y, 0]} rotation={[f * 0.05, 0, f * 0.03]}><sphereGeometry args={[0.25, 32, 32]} /><meshStandardMaterial color="#e86a1a" roughness={0.6} /></mesh>
  <mesh position={[-1.2, 1.4, 0]}><sphereGeometry args={[0.25, 32, 32]} /><meshStandardMaterial color="#e86a1a" roughness={0.6} transparent opacity={0.25} /></mesh>
  <Tubo pts={[[-1.2, 0.25, 0], [-1.2, 1.6, 0]]} r={0.01} cor="#ffffff" o={0.3} />
  <Tubo pts={[[0.45, 0.25, 0], [0.45, 3.45, 0]]} r={0.012} cor={OURO} o={0.6} />
  <Pos bloom={0.5} /></>; }}</CP>;
const S9: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.2, 6]} alvo={[0, 0.6, 0]} /><Luzes sol={[-3, 5, 2]} i={2} amb={0.35} /><Ceu cima="#2a6ac8" baixo="#f0e0c0" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#8a7a5a" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}><planeGeometry args={[0.12, 40]} /><meshBasicMaterial color={new THREE.Color(OURO).multiplyScalar(1.5)} toneMapped={false} /></mesh>
  <mesh position={[0, 0.8, -1]}><cylinderGeometry args={[0.15, 0.25, 1.6, 4]} /><meshStandardMaterial color="#d8d0c0" /></mesh>
  <mesh position={[0, 1.8, -1]}><sphereGeometry args={[0.4, 32, 32]} /><meshStandardMaterial color="#d8d0c0" wireframe /></mesh>
  <Nuvem n={160} sem="gs9" origem={new THREE.Vector3(0, 0, 0)} t={f} raio={2.5} cor="#c8b088" tam={0.05} o={0.6} dir={new THREE.Vector3(0, 2, 0)} />
  <Pos bloom={0.5} /></>}</CP>;
const S10: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.8, 7]} alvo={[0, 2, 0]} /><Luzes sol={[-3, 5, 2]} i={2} amb={0.35} /><Ceu cima="#1a4a9a" baixo="#e8d8b8" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#7a6a4a" roughness={1} /></mesh>
  {LAT(6).map((i) => { const y = Math.max(0, f - i * 5) * 0.025 * (0.6 + random('cy' + i)); return <Carro key={i} pos={[(i - 2.5) * 1.3, y, -1 - (i % 3)]} rot={[y * 0.2, i, y * 0.3 * (i % 2 ? 1 : -1)]} cor={['#c8261a', '#2a6ad8', '#e8e8e8', '#f2c21a', '#2a8a4a', '#6a2aa8'][i]} s={0.8} />; })}
  {LAT(20).map((i) => { const y = Math.max(0, f - i * 2) * 0.02 * (0.5 + random('py' + i)); return <mesh key={'p' + i} position={[(random('px' + i) - 0.5) * 9, 0.1 + y, (random('pz' + i) - 0.5) * 5]} rotation={[y, y * 2, 0]} scale={0.1 + random('ps' + i) * 0.15}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#6a5a48" flatShading /></mesh>; })}
  <Pos bloom={0.4} /></>}</CP>;
const S11: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d, Easing.inOut(Easing.cubic)); return <>
  <Cam pos={[0, lerp(0.9, 2.2, k), lerp(1.4, 6.4, k)]} alvo={[0, lerp(0.8, 0, k), 0]} /><Luzes sol={[-4, 2, 4]} i={2.4} amb={0.12} /><Estrelas sem="gs11" />
  <TerraGira tex={tex} ang={f * 0.03} />
  {LAT(600).map((i) => { const a = random('ra' + i) * Math.PI * 2 + f * 0.012; const r = lerp(1.01, 1.4 + random('rr' + i) * 0.7, Math.min(1, k * 1.3 * (0.5 + random('rk' + i)))); return <mesh key={i} position={[Math.cos(a) * r, (random('ry' + i) - 0.5) * 0.05, Math.sin(a) * r]} scale={0.006 + random('rs' + i) * 0.01}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#d8c8a8" emissive="#3a2a1a" /></mesh>; })}
  <Pos bloom={0.8} /></>; }}</CP>; };
const S12: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.6, 5.4]} /><Luzes sol={[3, 3, 4]} i={2.6} amb={0.1} /><Estrelas sem="gs12" />
  <TerraGira tex={tex} ang={f * 0.02} />
  {LAT(8).map((i) => <mesh key={i} rotation={[0, i / 8 * Math.PI, 0]}><torusGeometry args={[1.06, 0.012, 8, 120]} /><meshStandardMaterial color="#9aa0aa" metalness={0.95} roughness={0.2} /></mesh>)}
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.06, 0.015, 8, 120]} /><meshStandardMaterial color="#9aa0aa" metalness={0.95} roughness={0.2} /></mesh>
  <Pos bloom={0.6} /></>}</CP>;
const S13: React.FC = () => <CP>{(f) => { const a = f * 0.012; return <>
  <Cam pos={[Math.sin(a) * 9.5, 2.6, Math.cos(a) * 9.5]} alvo={[0, 0, 0]} /><Luzes sol={[-4, 3, 2]} i={2.4} amb={0.08} /><Estrelas sem="gs13" />
  <Ovo ang={f * 0.14} />
  <Brilho pos={[-30, 6, -40]} s={1.2} cor="#fff6e0" o={0.9} />
  <Pos bloom={0.6} /></>; }}</CP>;
const S14: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const w = lerp(0.3, -0.03, pr(f, 0, d * 0.6, Easing.out(Easing.cubic))); const ang = LAT(Math.max(1, f)).reduce((s, i) => s + lerp(0.3, -0.03, pr(i, 0, d * 0.6, Easing.out(Easing.cubic))), 0); return <>
  <Cam pos={[-1.4, 4.2, 2.6]} alvo={[0, 1.2, 0]} /><Luzes sol={[2, 4, 3]} i={2.4} amb={0.25} /><Estrelas sem="gs14" />
  <group rotation={[0, ang * 0.3, 0]}><Terra tex={tex} rot={[0, 0, 0]} /></group>
  <group position={[0, 0.98, 0]}><Manivela ang={ang} s={0.8} /></group>
  <Brilho pos={[0, 2.2, 0]} s={0.5} cor={w < 0 ? '#3aff8a' : '#ff5a3a'} o={0.6} />
  <Pos bloom={0.6} /></>; }}</CP>; };
const S15: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d, Easing.inOut(Easing.cubic)); return <>
  <Cam pos={[0, lerp(1, 2.4, k), lerp(5.5, 11, k)]} alvo={[0, lerp(0.5, 2.4, k), 0]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.1} /><Estrelas sem="gs15" />
  <TerraGira tex={tex} ang={f * 0.004} />
  <Lua tex={tex} pos={[lerp(1.2, 1.6, k), lerp(1.4, 3.6, k), -1]} r={0.3} />
  <Pos bloom={0.6} /></>; }}</CP>; };

const PLANO: K.Plano = [
  ['e se a terra', S1], ['ela ja bateu recorde', S2], ['agora imagina que', S3], ['dia de doze horas', S4], ['os furacoes giram', S5], ['seis horas os oceanos', S6],
  ['quatro horas quem', S7], ['duas horas voce pesa', S8], ['uma hora e vinte', S9], ['pedras carros tudo', S10], ['e o planeta solta', S11],
  ['isso pelas contas', S12], ['la depois de netuno', S13], ['mas na vida real', S14], ['e ha um bilhao', S15],
];
// título no 1º segundo + contador "O DIA DURA"
const MARCAS: [string, string, number][] = [['e se a terra', '24 H', 24], ['dia de doze horas', '12 H', 12], ['seis horas os oceanos', '6 H', 6], ['quatro horas quem', '4 H', 4], ['duas horas voce pesa', '2 H', 2], ['uma hora e vinte', '1H24', 1.4]];
const Extra: React.FC = () => {
  const f = useCurrentFrame();
  const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const volta = at('mas na vida real');
  const idx = MARCAS.reduce((acc, m, i) => (f >= at(m[0]) ? i : acc), 0); const m = MARCAS[idx]; const ant = MARCAS[Math.max(0, idx - 1)];
  const h = f >= volta ? interpolate(f, [volta, volta + 80], [1.4, 24], {...cl, easing: Easing.inOut(Easing.cubic)}) : interpolate(f, [at(m[0]), at(m[0]) + 20], [ant[2], m[2]], {...cl, easing: Easing.out(Easing.back(1.4))});
  const txt = f >= volta ? (h > 23.9 ? '24 H' : `${Math.floor(h)} H`) : m[1];
  const cor = f >= volta ? '#3aff8a' : h < 4 ? '#ff5a3a' : OURO;
  const pop = interpolate(f - (f >= volta ? volta : at(m[0])), [0, 6, 12], [1.2, 0.96, 1], cl);
  const o = interpolate(f, [0, 3, 50, 60], [0, 1, 1, 0], cl);
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {o > 0 && <div style={{position: 'absolute', top: 320, width: '100%', textAlign: 'center', opacity: o, fontFamily: FONTE, color: '#fff', textShadow: `0 0 18px ${NEON}, 0 4px 10px #000`}}>
      {['E SE A TERRA', 'GIRASSE MAIS', 'RÁPIDO?'].map((l, j) => <div key={j} style={{fontSize: j === 2 ? 140 : 100, lineHeight: 1.12, color: j === 2 ? OURO : '#fff'}}>{l}</div>)}</div>}
    {f > 40 && <div style={{position: 'absolute', top: 120, right: 50, padding: '12px 24px 16px', borderRadius: 18, background: 'rgba(0,0,0,.55)', border: `3px solid ${cor}`, transform: `scale(${pop})`, transformOrigin: 'right top', fontFamily: FONTE, color: '#fff', boxShadow: `0 0 18px ${cor}66`, textAlign: 'right'}}>
      <div style={{fontSize: 30, letterSpacing: 4, opacity: 0.85}}>O DIA DURA</div>
      <div style={{fontSize: 70, textShadow: `0 0 14px ${cor}`}}>{txt}</div>
      <div style={{width: 260, height: 12, borderRadius: 6, background: '#ffffff22', marginTop: 6}}><div style={{width: `${Math.max(2, h / 24 * 100)}%`, height: '100%', borderRadius: 6, background: cor, marginLeft: 'auto'}} /></div></div>}
  </AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'giro_short/narracao.mp3', 'mas na vida real', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void V; void v; void Pedras;
