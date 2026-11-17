// Longo POV "VOCÊ SOBREVIVEU A UMA GUERRA NUCLEAR: DO DIA 1 AO DIA 365" (1920x1080). Roteiro longo_guerra_nuclear_365.md, aprovado pelo dono (16/11/2026).
// REGRA DE OURO: cenário científico, não previsão. Sem bandeira, país atacante ou política; nada gráfico (só sugerido); o arco do míssil não tem origem.
// Tudo em Remotion 3D, sem bonequinho de rosto nem foto real. Canto: marcador "T ± X" (congela no "Mas espera"). Só legenda (40); nomes de lugares em neon no mapa.
import React from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, Final, FONTE} from '../comum';
import {criarLongo, Cap} from '../longo';
import {Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Terra, pr, cl, THREE} from '../lote/kit3d';
import {CP, R3, v, camLL} from '../lote/pangeia3d';
import {canvasTex, relevo, PLANICIE, LAT, Viva, Tubo, Calota, TerraN, Casa, Arvore, Predios, Ceu, Aviao} from './Apophis';
import {Boneco} from './PangeiaLongo';
import {Mostrador, Copo} from './Girando';
import palavras from './nuclear.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = Easing.inOut(Easing.cubic);
const VERM = '#ff3a2a';
const AMBAR = '#ffb020';
const mix = (a: string, b: string, t: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), Math.max(0, Math.min(1, t))).getHexString();
const solDe = (c: V3): V3 => { const p = new THREE.Vector3(...c).normalize(); const lado = new THREE.Vector3(0, 1, 0).cross(p).normalize(); return V(p.multiplyScalar(4).add(lado.multiplyScalar(2.2)).add(new THREE.Vector3(0, 1.6, 0))); };

// ---------- peças ----------
const Ampulheta: React.FC<{f: number; s?: number; pos?: V3; parada?: boolean}> = ({f, s = 1, pos = [0, 0, 0], parada}) => { const g = parada ? 1 : (f * 0.01) % 1; return <group position={pos} scale={s}>
  {[-1, 1].map((l) => <mesh key={l} position={[0, l * 0.45, 0]} rotation={[l > 0 ? Math.PI : 0, 0, 0]}><coneGeometry args={[0.42, 0.9, 32, 1, true]} /><meshPhysicalMaterial color="#e8f0ff" roughness={0.05} transparent opacity={0.3} side={THREE.DoubleSide} /></mesh>)}
  {[-1, 1].map((l) => <mesh key={'t' + l} position={[0, l * 0.93, 0]}><cylinderGeometry args={[0.5, 0.5, 0.06, 32]} /><meshStandardMaterial color="#4a3020" /></mesh>)}
  <mesh position={[0, -0.6, 0]}><coneGeometry args={[0.3, 0.12 + g * 0.22, 32]} /><meshStandardMaterial color="#e0b060" emissive="#ff8a20" emissiveIntensity={0.25} /></mesh>
  <mesh position={[0, 0.22, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.3, 0.36 - g * 0.3, 32]} /><meshStandardMaterial color="#e0b060" emissive="#ff8a20" emissiveIntensity={0.25} /></mesh>
  {!parada && <mesh position={[0, -0.12, 0]}><cylinderGeometry args={[0.008, 0.008, 0.75, 6]} /><meshBasicMaterial color="#ffb060" /></mesh>}
</group>; };
const Pessoa: React.FC<{pos?: V3; rot?: number; s?: number; deita?: number; cobre?: number}> = ({pos = [0, 0, 0], rot = 0, s = 1, deita = 0, cobre = 0}) => <group position={pos} rotation={[0, rot, 0]} scale={s}>
  <group rotation={[-deita * Math.PI / 2, 0, 0]} position={[0, deita * 0.12, 0]}>
    <mesh position={[0, 0.62, 0]}><capsuleGeometry args={[0.13, 0.36, 8, 16]} /><meshStandardMaterial color="#0e1218" /></mesh>
    <mesh position={[0, 0.98, 0]}><sphereGeometry args={[0.11, 24, 24]} /><meshStandardMaterial color="#0e1218" /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.07, 0.24, 0]}><capsuleGeometry args={[0.05, 0.36, 6, 10]} /><meshStandardMaterial color="#0e1218" /></mesh>)}
    {[-1, 1].map((l) => <mesh key={'b' + l} position={[l * 0.12, lerp(0.62, 0.9, cobre), lerp(0, 0.1, cobre)]} rotation={[lerp(0, -2.4, cobre), 0, l * lerp(0.15, -0.5, cobre)]}><capsuleGeometry args={[0.04, 0.32, 6, 10]} /><meshStandardMaterial color="#0e1218" /></mesh>)}
  </group>
</group>;
const Caixa: React.FC<{pos: V3; s?: number; cor?: string; em?: number}> = ({pos, s = 1, cor = '#5a5040', em = 0}) => <mesh position={pos} scale={s}><boxGeometry args={[0.9, 0.6, 0.6]} /><meshStandardMaterial color={cor} roughness={0.8} emissive={VERM} emissiveIntensity={em} /></mesh>;
const Predio: React.FC<{pos: V3; h: number; w?: number; luz?: number; i: number}> = ({pos, h, w = 0.7, luz = 0.15, i}) => <mesh position={[pos[0], h / 2, pos[2]]}><boxGeometry args={[w, h, w]} /><meshStandardMaterial color="#3a404a" emissive="#ffd890" emissiveIntensity={random('pl' + i) < 0.6 ? luz : 0} /></mesh>;
const Porta: React.FC<{abre?: number; luz?: string}> = ({abre = 0, luz = '#0a0c10'}) => <group>
  <mesh position={[0, 1.1, -0.05]}><planeGeometry args={[1.1, 2.2]} /><meshBasicMaterial color={luz} toneMapped={false} /></mesh>
  <group position={[-0.55, 0, 0]} rotation={[0, -abre * 1.4, 0]}><mesh position={[0.55, 1.1, 0]}><boxGeometry args={[1.1, 2.2, 0.06]} /><meshStandardMaterial color="#5a3a24" /></mesh></group>
  <mesh position={[0, 1.1, -0.1]}><boxGeometry args={[1.4, 2.5, 0.08]} /><meshStandardMaterial color="#c8c0b0" /></mesh>
</group>;
const Radio: React.FC<{pos?: V3; f: number; liga?: boolean}> = ({pos = [0, 0, 0], f, liga = true}) => <group position={pos}>
  <mesh><boxGeometry args={[0.7, 0.42, 0.2]} /><meshStandardMaterial color="#3a3028" /></mesh>
  <mesh position={[-0.15, 0, 0.101]}><circleGeometry args={[0.14, 32]} /><meshStandardMaterial color="#888" /></mesh>
  <mesh position={[0.2, 0.08, 0.101]}><planeGeometry args={[0.22, 0.1]} /><meshBasicMaterial color={liga ? new THREE.Color('#ffb040').multiplyScalar(1.3 + Math.sin(f * 0.8) * 0.3) : '#222'} toneMapped={false} /></mesh>
  <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -0.4]}><cylinderGeometry args={[0.008, 0.008, 0.5, 6]} /><meshStandardMaterial color="#aaa" /></mesh>
</group>;
const Prateleira: React.FC<{cheia: number; pos?: V3}> = ({cheia, pos = [0, 0, 0]}) => <group position={pos}>
  {LAT(4).map((r) => <mesh key={r} position={[0, 0.2 + r * 0.6, 0]}><boxGeometry args={[3, 0.04, 0.6]} /><meshStandardMaterial color="#c8ccd0" /></mesh>)}
  {LAT(40).map((i) => { const r = Math.floor(i / 10), c = i % 10; return random('pc' + i) < cheia ? <mesh key={i} position={[(c - 4.5) * 0.28, 0.35 + r * 0.6, 0]}><boxGeometry args={[0.22, 0.26, 0.3]} /><meshStandardMaterial color={['#c8261a', '#2a6ad8', '#e8c040', '#3a8a4a'][i % 4]} /></mesh> : null; })}
</group>;
const SOLO = relevo(120, (x, z, i) => Math.sin(x * 0.4) * Math.cos(z * 0.3) * 0.15 + (random('sl' + i) - 0.5) * 0.03, 40);

// ================= GANCHO =================
const G1: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 1.6, 3.4]} alvo={[0, 0.6, 0]} /><Luzes sol={[2, 4, 3]} i={1.6} amb={0.2} /><color attach="background" args={['#05060a']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 3]} /><meshStandardMaterial map={tex.dia} color="#6a7080" /></mesh>
  <Ampulheta f={f} pos={[0, 1, 0.3]} s={0.9} />
  <Pos bloom={0.6} /></>}</CP>;
const G2: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.4, 3.4]} /><Luzes sol={[-5, 0.5, -4]} i={1.2} amb={0.03} /><Estrelas sem="g2" />
  <TerraN tex={tex} giro={-1.3 + f * 0.002} />
  <Pos bloom={1} /></>}</CP>;
const CAL = LAT(6).map((k) => canvasTex(512, 512, (g) => { g.fillStyle = '#f2ede2'; g.fillRect(0, 0, 512, 512); g.fillStyle = '#3a3a40'; g.fillRect(0, 0, 512, 120); g.fillStyle = '#20242c'; g.font = 'bold 230px sans-serif'; g.textAlign = 'center'; g.fillText(String([1, 2, 30, 100, 200, 365][k]), 256, 400); }));
const G3: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.85, Easing.in(Easing.quad)) * 5; return <>
  <Cam pos={[0.4, 0.2, 3.3]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 3, 4]} i={2} amb={0.5} /><color attach="background" args={['#07080c']} />
  <mesh position={[0, 0, 0.01]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={CAL[5]} /></mesh>
  {[4, 3, 2, 1, 0].map((m) => { const vira = Math.min(1, Math.max(0, k - (4 - m))); return vira >= 1 ? null : <group key={m} position={[0, 1, 0.02 + (5 - m) * 0.002]} rotation={[-vira * Math.PI * 0.95, 0, 0]}><mesh position={[0, -1, 0]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={CAL[m]} side={THREE.DoubleSide} /></mesh></group>; })}
  <Pos bloom={0.4} /></>; }}</CP>; };
const G4: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.2, 3 + f * 0.004]} alvo={[0, 1.6, -6]} /><Luzes sol={[0, 3, -8]} i={0.6} amb={0.15} />
  <Ceu cima="#14161c" baixo="#4a3a30" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#1a1a16" roughness={1} /></mesh>
  <Pessoa pos={[0, 0, 0]} rot={Math.PI} s={1.1} />
  <Brilho pos={[4, 1.5, -40]} s={8} cor="#ff9a50" o={0.25} />
  <Pos bloom={0.6} /></>}</CP>;

// ================= 1. TRINTA MINUTOS =================
const C1a: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d, Easing.inOut(Easing.sin)); const pts: V3[] = LAT(40).map((i) => { const t = i / 39; const a = lerp(-1.2, 1.4, t); const h = 1.02 + Math.sin(t * Math.PI) * 0.6; return [Math.cos(a) * h, 0.35 + Math.sin(t * Math.PI) * 0.4, Math.sin(a) * h]; }); return <>
  <Cam pos={[0, 1.6, 3.6]} /><Luzes sol={[-4, 2, -3]} i={1.2} amb={0.05} /><Estrelas sem="c1a" />
  <TerraN tex={tex} giro={f * 0.001} />
  <Tubo pts={pts.slice(8)} r={0.008} cor="#ffffff" k={k} o={0.9} brilho={1.6} />
  <Pos bloom={1} /></>; }}</CP>; };
const C1b: React.FC = () => <CP>{(f) => <>
  <Cam pos={[3 - f * 0.01, 2.2, 7]} alvo={[0, 0.8, -3]} /><ambientLight intensity={0.15} /><color attach="background" args={['#06070a']} />
  <spotLight position={[0, 6, 2]} angle={0.8} penumbra={0.6} intensity={20} color="#d8e0ff" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#2a2c30" /></mesh>
  {LAT(120).map((i) => { const c = i % 12, r = Math.floor(i / 12); return <Caixa key={i} pos={[(c - 5.5) * 1, 0.3 + (r % 3) * 0.62, -Math.floor(r / 3) * 1.8]} cor={random('cc' + i) < 0.5 ? '#4a4838' : '#3a3c30'} />; })}
  <Pos bloom={0.5} /></>}</CP>;
const C1c: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.6, 1.2, 3]} alvo={[0, 0.6, -1]} /><ambientLight intensity={0.08} /><color attach="background" args={['#030305']} />
  {LAT(30).map((i) => { const c = i % 6, r = Math.floor(i / 6); const ver = i === 7 || i === 13; return <Caixa key={i} pos={[(c - 2.5) * 1, 0.3 + (r % 3) * 0.62, -Math.floor(r / 3) * 1.8]} cor="#3a3c30" em={ver ? 0.6 + 0.3 * Math.sin(f * 0.3) : 0} />; })}
  <mesh position={[0, 2.1, -0.4]}><boxGeometry args={[6, 0.06, 0.06]} /><meshBasicMaterial color={new THREE.Color(VERM).multiplyScalar(1.4 + Math.sin(f * 0.3) * 0.3)} toneMapped={false} /></mesh>
  <pointLight position={[0, 1.5, 0.5]} intensity={3} color={VERM} distance={4} />
  <Pos bloom={1} /></>}</CP>;
const C1d: React.FC = () => <CP>{(f) => <>
  <Cam pos={[f * 0.006, 1.4, 6]} alvo={[0, 1.4, -10]} /><Luzes sol={[-3, 6, 2]} i={1.6} amb={0.35} /><Ceu cima="#5a8ac8" baixo="#d8e0e8" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#4a5040" /></mesh>
  {LAT(30).map((i) => <Predio key={i} pos={[-8 + i * 0.55, 0, -2 - random('pz' + i) * 2]} h={0.8 + random('ph' + i) * 2.5} i={i} luz={0} />)}
  <Brilho pos={[6, 0.8, -40]} s={1} cor="#ffffff" o={0.5 + 0.4 * Math.sin(f * 0.2)} />
  <Pos bloom={0.5} /></>}</CP>;
const C1e: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.6); return <>
  <Cam pos={[0, 9, 2]} alvo={[0, 0, 0]} /><Luzes sol={[0, 8, 2]} i={1.4} amb={0.4} /><color attach="background" args={['#0a0c10']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#3a4434" /></mesh>
  {[1.2, 2.4, 3.6].map((r, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-2.5, 0.02 + i * 0.005, 0]}><ringGeometry args={[r * k, r * k + 0.05, 96]} /><meshBasicMaterial color={['#ff5a3a', AMBAR, '#ffe080'][i]} transparent opacity={0.8} toneMapped={false} /></mesh>)}
  {LAT(40).map((i) => <Predio key={i} pos={[3 + (i % 6) * 0.3, 0, -1.5 + Math.floor(i / 6) * 0.45]} h={0.2 + random('cd' + i) * 0.4} w={0.22} i={i} />)}
  <Pos bloom={0.6} /></>; }}</CP>; };
const C1f: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.8, 1.3, 1.8]} alvo={[0, 0.9, 0]} /><Luzes sol={[2, 4, 3]} i={1.8} amb={0.4} /><color attach="background" args={['#2a2620']} />
  <mesh position={[0, 0.75, 0]}><boxGeometry args={[2.4, 0.06, 1.2]} /><meshStandardMaterial color="#6a4a30" /></mesh>
  <group position={[0, 0.78, 0.1]}><mesh position={[0, 0.12, 0]}><cylinderGeometry args={[0.12, 0.1, 0.24, 32]} /><meshStandardMaterial color="#f2f2ee" /></mesh>
    <mesh position={[0, 0.235, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.11, 32]} /><meshStandardMaterial color="#3a2010" /></mesh>
    <mesh position={[0.15, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}><torusGeometry args={[0.06, 0.015, 8, 24, Math.PI]} /><meshStandardMaterial color="#f2f2ee" /></mesh></group>
  <Nuvem n={60} sem="c1f" origem={new THREE.Vector3(0, 1.05, 0.1)} t={20 + (f % 60)} raio={0.6} cor="#ffffff" tam={0.06} o={0.35} dir={new THREE.Vector3(0, 2, 0)} />
  <mesh position={[-0.6, 0.79, -0.1]}><boxGeometry args={[0.7, 0.02, 0.5]} /><meshStandardMaterial color="#e8e8e0" /></mesh>
  <Pos bloom={0.4} /></>}</CP>;
const C1g: React.FC = () => { const d = useD(); return <CP>{(f) => { const fl = pr(f, d - 26, d - 6); return <>
  <Cam pos={[0, 1.4, 1.4]} alvo={[0, 0.8, 0]} tremor={0.008} /><ambientLight intensity={0.15 + fl * 3} /><color attach="background" args={[mix('#14100c', '#ffffff', fl)]} />
  <group position={[Math.sin(f * 2.2) * 0.008, 0.8, 0]} rotation={[-Math.PI / 2 + 0.2, 0, 0.2]}><mesh><boxGeometry args={[0.42, 0.84, 0.04]} /><meshStandardMaterial color="#111" /></mesh>
    <mesh position={[0, 0, 0.021]}><planeGeometry args={[0.38, 0.78]} /><meshBasicMaterial color={new THREE.Color(VERM).multiplyScalar(1.2 + 0.4 * Math.sin(f * 0.6))} toneMapped={false} /></mesh></group>
  <mesh position={[0, 0.75, 0]}><boxGeometry args={[2, 0.05, 1.2]} /><meshStandardMaterial color="#4a3a2a" /></mesh>
  <Pos bloom={1} /></>; }}</CP>; };

// ================= 2. O CLARÃO =================
const C2a: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 4, d * 0.6); return <>
  <Cam pos={[2, 1.3, 3.2]} alvo={[0, 0.9, 0]} /><ambientLight intensity={0.8} /><Ceu cima="#ffffff" baixo="#f0e8d8" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#8a8070" /></mesh>
  <Pessoa rot={lerp(-0.4, Math.PI, k)} cobre={pr(f, d * 0.5, d * 0.8)} s={1.2} />
  <Pos bloom={1.2} /></>; }}</CP>; };
const C2b: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 10, d * 0.5); return <>
  <Cam pos={[0, 0, 2.2]} /><ambientLight intensity={0.6} /><directionalLight position={[1, 2, 3]} intensity={1.5} /><color attach="background" args={['#0a0a0c']} />
  <mesh scale={[1, 0.62, 0.4]}><sphereGeometry args={[1, 64, 32]} /><meshStandardMaterial color="#f2eee8" roughness={0.3} /></mesh>
  <mesh position={[0, 0, 0.38]}><circleGeometry args={[0.36, 64]} /><meshStandardMaterial color="#4a7a5a" /></mesh>
  <mesh position={[0, 0, 0.39]}><circleGeometry args={[lerp(0.24, 0.05, k), 64]} /><meshBasicMaterial color="#000" /></mesh>
  <mesh position={[0.1, 0.1, 0.4]}><circleGeometry args={[0.05, 24]} /><meshBasicMaterial color="#fff" /></mesh>
  {[1, -1].map((l) => <mesh key={l} position={[0, l * lerp(0.75, 0.05, pr(f, d * 0.6, d)), 0.42]}><planeGeometry args={[2.4, 0.7]} /><meshStandardMaterial color="#c89a80" /></mesh>)}
  <Pos bloom={0.5} /></>; }}</CP>; };
const C2c: React.FC = () => { const d = useD(); return <CP>{(f) => <>
  <Cam pos={[2.6, 1.4, 2.6]} alvo={[0, 0.3, 0]} /><ambientLight intensity={0.6} /><directionalLight position={[0, 3, -5]} intensity={2} color="#fff0d0" /><Ceu cima="#f8f0e0" baixo="#d8c8a8" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#7a7060" /></mesh>
  <Pessoa deita={pr(f, 6, d * 0.6, Easing.out(Easing.cubic))} s={1.2} />
  <Pos bloom={0.8} /></>}</CP>; };
const C2d: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.5, 5]} alvo={[0, 0.6, -10]} /><ambientLight intensity={0.6} /><directionalLight position={[0, 5, -10]} intensity={2} color="#ffd0a0" /><Ceu cima="#e8c8a0" baixo="#fff0d8" />
  <Viva n={100} tam={40} pos={[0, 0, -8]} h={(x, z) => Math.sin(x * 0.8 + z * 0.4) * 0.05} mat={<meshStandardMaterial color="#8a7a5a" roughness={1} />} />
  {LAT(30).map((i) => { const y = ((f * 0.02 + random('hy' + i)) % 1) * 3; return <mesh key={i} position={[(random('hx' + i) - 0.5) * 10, y, -2 - random('hz' + i) * 6]}><planeGeometry args={[1.5, 0.05]} /><meshBasicMaterial color="#fff4e0" transparent opacity={0.15 * Math.sin(y)} /></mesh>; })}
  <Pos bloom={0.8} /></>}</CP>;
const C2e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1, 4]} alvo={[0, 1, 0]} /><ambientLight intensity={0.4} /><color attach="background" args={['#3a3430']} />
  {LAT(200).map((i) => <mesh key={i} position={[(random('dx' + i) - 0.5) * 6, random('dy' + i) * 3 + Math.sin(f * 0.02 + i) * 0.05, (random('dz' + i) - 0.5) * 3]} scale={0.01 + random('ds' + i) * 0.015}><sphereGeometry args={[1, 6, 6]} /><meshBasicMaterial color="#d8c8b0" /></mesh>)}
  <Pos bloom={0.4} /></>}</CP>;

// ================= 3. A ONDA DE CHOQUE =================
const C3a: React.FC = () => { const d = useD(); return <CP>{(f) => { const R = pr(f, 0, d, Easing.linear) * 9; return <>
  <Cam pos={[0, 8, 9]} alvo={[0, 0, -1]} /><Luzes sol={[-3, 8, 3]} i={1.4} amb={0.4} /><color attach="background" args={['#14161c']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#3a4434" /></mesh>
  {LAT(160).map((i) => <Predio key={i} pos={[(i % 16 - 7.5) * 0.7, 0, (Math.floor(i / 16) - 5) * 0.7 - 1]} h={0.15 + random('m3' + i) * 0.5} w={0.35} i={i} luz={0} />)}
  {[0, 1].map((j) => <mesh key={j} rotation={[-Math.PI / 2, 0, 0]} position={[-9, 0.4, -1]}><ringGeometry args={[Math.max(0, R - j * 0.6), Math.max(0.05, R - j * 0.6 + 0.12), 160]} /><meshBasicMaterial color={j ? AMBAR : '#ffffff'} transparent opacity={0.8 - j * 0.3} toneMapped={false} /></mesh>)}
  {[5, 10].map((km, i) => <mesh key={km} rotation={[-Math.PI / 2, 0, 0]} position={[-9, 0.02, -1]}><ringGeometry args={[km * 0.9, km * 0.9 + 0.03, 160]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.3} /></mesh>)}
  <Pos bloom={0.8} /></>; }}</CP>; };
const C3b: React.FC = () => <CP>{(f) => { const s = f / 30 * 25 / (4.3); return <>
  <Cam pos={[0, 0, 3.2]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.3} /><color attach="background" args={['#05060a']} />
  <Mostrador n={60} h={0} m={(s % 60) / 60 * Math.PI * 2} cor={AMBAR} />
  <mesh position={[0, 1.15, 0]}><cylinderGeometry args={[0.1, 0.1, 0.2, 16]} /><meshStandardMaterial color="#888" metalness={0.9} /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>;
const C3c: React.FC = () => { const d = useD(); return <CP>{(f) => { const tr = Math.sin(f * 1.3) * 0.01 * (1 - pr(f, 0, d)); return <>
  <Cam pos={[1.6, 1.4, 4]} alvo={[0, 1.2, 0]} /><ambientLight intensity={0.35} /><directionalLight position={[0, 2, -4]} intensity={1.4} color="#e8e0d0" /><color attach="background" args={['#2a2620']} />
  <mesh position={[0, 1.5, -0.1]}><boxGeometry args={[6, 3, 0.1]} /><meshStandardMaterial color="#c8c0b0" /></mesh>
  {[-1.2, 1.2].map((x) => <group key={x} position={[x + tr, 1.6, 0]}><mesh><planeGeometry args={[1.4, 1.6]} /><meshPhysicalMaterial color="#cfe4ff" roughness={0.05} transparent opacity={0.4} /></mesh><mesh position={[0, 0, -0.02]}><boxGeometry args={[1.5, 1.7, 0.05]} /><meshStandardMaterial color="#5a4a3a" /></mesh></group>)}
  <Pessoa pos={[lerp(0.5, 2.6, pr(f, 0, d)), 0, 1.6]} rot={-Math.PI / 2} s={1.1} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#6a5a48" /></mesh>
  <Pos bloom={0.4} /></>; }}</CP>; };
const C3d: React.FC = () => <CP>{(f) => { const b = Math.sin(f * 0.9) * 0.06 * Math.exp(-f / 40); return <>
  <Cam pos={[3, 1.4, 4]} alvo={[0, 0.5, 0]} /><Luzes sol={[-3, 5, 3]} i={1.4} amb={0.4} /><Ceu cima="#5a5a60" baixo="#a89880" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#3a3a3c" /></mesh>
  <group rotation={[b, 0, b * 0.5]}>
    <mesh position={[0, 0.35, 0]}><boxGeometry args={[2.2, 0.5, 1]} /><meshStandardMaterial color="#7a8a9a" metalness={0.6} roughness={0.3} /></mesh>
    <mesh position={[-0.1, 0.75, 0]}><boxGeometry args={[1.2, 0.4, 0.9]} /><meshStandardMaterial color="#1a2430" metalness={0.5} roughness={0.1} /></mesh>
    {[[-0.7, 0.5], [0.7, 0.5], [-0.7, -0.5], [0.7, -0.5]].map(([x, z], i) => <mesh key={i} position={[x, 0.15, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.18, 0.18, 0.12, 20]} /><meshStandardMaterial color="#111" /></mesh>)}</group>
  <Pos bloom={0.3} /></>; }}</CP>;
const C3e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.4, 6]} alvo={[0, 1.6, -6]} /><Luzes sol={[0, 5, -4]} i={0.6} amb={0.3} /><Ceu cima="#3a3632" baixo="#7a6a58" /><fog attach="fog" args={['#5a5048', 4, 24]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#3a3430" /></mesh>
  <Predios n={40} sem="c3e" z={-6} larg={20} alt={2.5} janelas={0} cor="#2a2a2c" />
  {LAT(300).map((i) => { const y = 4 - ((f * 0.01 + random('py' + i) * 4) % 4); return <mesh key={i} position={[(random('px' + i) - 0.5) * 12, y, (random('pz' + i) - 0.5) * 8]} scale={0.012}><sphereGeometry args={[1, 6, 6]} /><meshBasicMaterial color="#c8b8a0" /></mesh>; })}
  <Pos bloom={0.3} /></>}</CP>;

// ================= 4. A CHUVA QUE VOCÊ NÃO VÊ =================
const C4a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.2, 8]} alvo={[0, 2.5, -20]} /><Luzes sol={[0, 6, -10]} i={0.8} amb={0.3} /><Ceu cima="#4a4a52" baixo="#a89070" />
  <mesh geometry={SOLO}><meshStandardMaterial color="#4a4a3a" roughness={1} /></mesh>
  <Nuvem n={700} sem="c4a" origem={new THREE.Vector3(-4, 7, -30)} t={300} raio={9} cor="#8a7a6a" tam={2.6} o={0.4} dir={new THREE.Vector3(0, 0.6, 0)} />
  {LAT(400).map((i) => { const t = (f * 0.004 + random('ft' + i)) % 1; return <mesh key={i} position={[-4 + t * 14 + (random('fx' + i) - 0.5) * 6, 7 - t * 7, -30 + t * 26 + (random('fz' + i) - 0.5) * 6]} scale={0.03}><sphereGeometry args={[1, 4, 4]} /><meshBasicMaterial color="#d8d0c0" transparent opacity={0.6} /></mesh>; })}
  <Pos bloom={0.4} /></>}</CP>;
const C4b: React.FC = () => <CP>{(f) => <>
  <Cam pos={[3, 1.4, 5]} alvo={[0, 1, -1]} /><Luzes sol={[-3, 5, 3]} i={0.9} amb={0.3} /><Ceu cima="#4a4648" baixo="#8a7a68" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#3a3836" /></mesh>
  <mesh position={[0, 2, -2]}><boxGeometry args={[4, 4, 2]} /><meshStandardMaterial color="#6a6a6c" /></mesh>
  <group position={[0, 0, -0.95]}><Porta abre={0.8} luz="#1a1a1c" /></group>
  <Pessoa pos={[lerp(3, 0.2, Math.min(1, f / 60)), 0, lerp(2, 0, Math.min(1, f / 60))]} rot={-Math.PI * 0.75} s={1.1} />
  <Pos bloom={0.4} /></>}</CP>;
const C4c: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.4, 2.6 - f * 0.006, 1.6]} alvo={[0, 0, -1.5]} /><ambientLight intensity={0.1} /><pointLight position={[0, 2.5, 0.5]} intensity={4} color="#ffd8a0" distance={6} /><color attach="background" args={['#030303']} />
  {LAT(12).map((i) => <mesh key={i} position={[0, 2 - i * 0.2, -i * 0.28]}><boxGeometry args={[1.2, 0.1, 0.3]} /><meshStandardMaterial color="#6a6460" /></mesh>)}
  {[-1, 1].map((l) => <mesh key={l} position={[l * 0.7, 1, -1.6]}><boxGeometry args={[0.1, 3, 4]} /><meshStandardMaterial color="#4a4440" /></mesh>)}
  <Pos bloom={0.4} /></>}</CP>;
const C4d: React.FC = () => <CP>{(f) => { const a = f * 0.004; return <>
  <Cam pos={[Math.sin(a) * 9, 4, Math.cos(a) * 9]} alvo={[0, 2.4, 0]} /><Luzes sol={[-3, 6, 3]} i={1.2} amb={0.35} /><color attach="background" args={['#14161a']} />
  {LAT(8).map((i) => <group key={i} position={[0, i * 0.62, 0]}>
    <mesh><boxGeometry args={[3, 0.08, 3]} /><meshStandardMaterial color="#8a8a8c" /></mesh>
    {i > 0 && i < 7 && <mesh position={[0, 0.3, 0]}><boxGeometry args={[1, 0.5, 1]} /><meshStandardMaterial color="#3aff8a" emissive="#1a8a4a" emissiveIntensity={0.6} transparent opacity={0.6} /></mesh>}</group>)}
  {LAT(4).map((i) => <mesh key={'c' + i} position={[Math.cos(i * Math.PI / 2) * 1.45, 2.2, Math.sin(i * Math.PI / 2) * 1.45]}><boxGeometry args={[0.1, 4.4, 0.1]} /><meshStandardMaterial color="#5a5a5c" /></mesh>)}
  <Pos bloom={0.6} /></>; }}</CP>;
const C4e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.3, 1.2, 4 - f * 0.01]} alvo={[0, 1.2, -10]} /><ambientLight intensity={0.45} /><color attach="background" args={['#020203']} />
  <mesh rotation={[0, 0, 0]} position={[0, 1.6, -8]}><cylinderGeometry args={[2.2, 2.2, 22, 32, 1, true, 0, Math.PI]} /><meshStandardMaterial color="#4a4a48" side={THREE.BackSide} /></mesh>
  {LAT(8).map((i) => <pointLight key={i} position={[0, 2.8, -i * 2.5]} intensity={1.2} color="#ffe0a0" distance={3} />)}
  {[-0.6, 0.6].map((x) => <mesh key={x} position={[x, 0.05, -8]}><boxGeometry args={[0.08, 0.08, 22]} /><meshStandardMaterial color="#8a8a8a" metalness={0.9} /></mesh>)}
  <Pos bloom={0.6} /></>}</CP>;
const C4f: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.6, 1.6, 3]} alvo={[0, 1.2, 0]} /><ambientLight intensity={0.3} /><pointLight position={[0, 2.4, 1]} intensity={3} color="#e8f0ff" distance={5} /><color attach="background" args={['#0c1014']} />
  <mesh position={[0, 1.5, -0.6]}><boxGeometry args={[3, 3, 0.1]} /><meshStandardMaterial color="#c8d8e0" /></mesh>
  <mesh position={[0, 2.4, -0.3]}><cylinderGeometry args={[0.18, 0.12, 0.1, 24]} /><meshStandardMaterial color="#aab0b8" metalness={0.9} /></mesh>
  {LAT(50).map((i) => <mesh key={i} position={[(random('cx' + i) - 0.5) * 0.3, 2.3 - ((f * 0.08 + random('cy' + i) * 2.3) % 2.3), -0.3 + (random('cz' + i) - 0.5) * 0.3]}><boxGeometry args={[0.006, 0.12, 0.006]} /><meshBasicMaterial color="#c8e8ff" transparent opacity={0.6} /></mesh>)}
  <mesh position={[1.1, 0.35, 0.3]}><sphereGeometry args={[0.35, 24, 16]} /><meshStandardMaterial color="#2a2a2a" roughness={0.9} /></mesh>
  <Pos bloom={0.4} /></>}</CP>;
const C4g: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 6, d * 0.6); return <>
  <Cam pos={[0, 0.3, 1.6]} alvo={[0, 0.3, 0]} /><Luzes sol={[2, 3, 3]} i={1.6} amb={0.4} /><color attach="background" args={['#14161a']} />
  <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.15, 0.15, 0.5, 24]} /><meshPhysicalMaterial color="#c8f0ff" transparent opacity={0.6} roughness={0.1} /></mesh>
  <mesh position={[0, 0.62, 0]}><cylinderGeometry args={[0.06, 0.06, 0.14, 16]} /><meshStandardMaterial color="#2a6ad8" /></mesh>
  <group rotation={[0, 0, 0.8]}><mesh position={[0, 0.3, 0.2]} scale={[k, 1, 1]}><boxGeometry args={[0.9, 0.06, 0.02]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh></group>
  <group rotation={[0, 0, -0.8]}><mesh position={[0, 0.3, 0.2]} scale={[k, 1, 1]}><boxGeometry args={[0.9, 0.06, 0.02]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh></group>
  <Pos bloom={0.6} /></>; }}</CP>; };
const C4h: React.FC = () => { const d = useD(); return <CP>{(f) => <>
  <Cam pos={[0.8, 0.9, 2.4]} alvo={[0, 0.6, 0]} /><ambientLight intensity={0.2} /><pointLight position={[1, 2, 2]} intensity={2} color="#ffd8a0" distance={5} /><color attach="background" args={['#0a0806']} />
  <Porta abre={0} />
  {LAT(3).map((i) => <mesh key={i} position={[(i - 1) * 0.36, 0.04, 0.08]} scale={pr(f, i * 8, i * 8 + 12, Easing.out(Easing.back(2)))}><boxGeometry args={[0.34, 0.08, 0.14]} /><meshStandardMaterial color={['#c8d0e0', '#e8c8a0', '#b8c8a8'][i]} /></mesh>)}
  <Radio pos={[1.1, 0.25, 0.5]} f={f} liga={f > d * 0.5} />
  <Pos bloom={0.6} /></>}</CP>; };
const C4i: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.5, 1.6]} alvo={[0, 0.3, 0]} /><ambientLight intensity={0.08} /><pointLight position={[0.4, 0.6, 0.5]} intensity={1.2 + Math.sin(f * 0.4) * 0.2} color="#ffb060" distance={2} /><color attach="background" args={['#020202']} />
  <Radio pos={[0, 0.2, 0]} f={f} />
  <Mostrador n={12} h={f * 0.004} m={f * 0.05} r={0.3} cor={AMBAR} />
  <Pos bloom={0.7} /></>}</CP>;

// ================= 5. AS PRIMEIRAS 24 HORAS =================
const C5a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0, 3]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.3} /><color attach="background" args={['#05060a']} />
  <Mostrador n={24} h={f * 0.08} m={f * 0.6} cor={AMBAR} />
  <Pos bloom={0.8} /></>}</CP>;
const C5b: React.FC = () => { const d = useD(); return <CP>{(f) => { const n = Math.min(7, Math.floor(pr(f, 0, d * 0.8) * 8)); return <>
  <Cam pos={[0, 0.8, 4]} alvo={[0, 0.8, 0]} /><Luzes sol={[2, 3, 4]} i={1.6} amb={0.3} /><color attach="background" args={['#05060a']} />
  {LAT(7).map((i) => <mesh key={i} position={[(i - 3) * 0.6, 0.3, 0]} scale={i < n ? 1 : 0.4}><boxGeometry args={[0.45, 0.45, 0.45]} /><meshStandardMaterial color={i < n ? AMBAR : '#2a2a30'} emissive={i < n ? AMBAR : '#000'} emissiveIntensity={0.5} /></mesh>)}
  <mesh position={[0, 1.3, 0]} scale={[1, pr(f, d * 0.5, d * 0.9), 1]}><boxGeometry args={[0.45, 1, 0.45]} /><meshStandardMaterial color="#3aff8a" emissive="#1a8a4a" emissiveIntensity={0.6} /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>; };
const C5c: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.9, Easing.linear) * 4; const nivel = 3 - Math.min(3, Math.floor(k)); return <>
  <Cam pos={[1.2, 1.6, 4.2]} alvo={[0, 1.5, 0]} /><Luzes sol={[2, 4, 3]} i={1.6} amb={0.3} /><color attach="background" args={['#05060a']} />
  {LAT(4).map((i) => <mesh key={i} position={[0, 0.4 + i * 0.75, 0]}><boxGeometry args={[1, 0.65, 0.6]} /><meshStandardMaterial color={i <= nivel ? mix('#3aff8a', VERM, i / 3) : '#1a1a20'} emissive={i <= nivel ? mix('#3aff8a', VERM, i / 3) : '#000'} emissiveIntensity={0.7} toneMapped={false} /></mesh>)}
  <Pos bloom={1} /></>; }}</CP>; };
const C5d: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d); const pts: V3[] = LAT(80).map((i) => { const t = i / 79; return [lerp(-3, 3, t), 1.8 * Math.pow(0.1, t * 3) - 0.9, 0]; }); return <>
  <Cam pos={[0, 0, 3.8]} /><ambientLight intensity={0.3} /><color attach="background" args={['#05060a']} />
  <Tubo pts={pts} r={0.025} cor="#3aff8a" k={k} brilho={1.4} />
  <Tubo pts={[[-3, -0.95, 0], [3, -0.95, 0]]} r={0.008} cor="#ffffff" o={0.4} />
  <Pos bloom={1} /></>; }}</CP>; };
const C5e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.4, 4 - f * 0.01]} alvo={[0, 1.2, -8]} /><ambientLight intensity={0.08} /><color attach="background" args={['#020202']} />
  <mesh position={[0, 1.4, -4]}><boxGeometry args={[2.4, 2.8, 12]} /><meshStandardMaterial color="#4a4640" side={THREE.BackSide} /></mesh>
  {LAT(4).map((i) => <group key={i} position={[i % 2 ? 1.18 : -1.18, 0, -1 - i * 2.4]}><mesh position={[0, 1.05, 0]} rotation={[0, (i % 2 ? -1 : 1) * 0.3, 0]}><boxGeometry args={[0.05, 2.1, 0.9]} /><meshStandardMaterial color="#5a3a24" /></mesh>
    <pointLight position={[i % 2 ? 0.3 : -0.3, 1, 0]} intensity={0.6} color="#ffb060" distance={2} /></group>)}
  <Pos bloom={0.6} /></>}</CP>;
const C5f: React.FC = () => { const d = useD(); return <CP>{(f) => <>
  <Cam pos={[0, 1.4, 3]} alvo={[0, 1.4, -10]} /><ambientLight intensity={0.15} /><Ceu cima="#06080c" baixo="#1a1c22" />
  <group position={[0, 0, 1]}><Porta abre={pr(f, 4, d * 0.6)} luz="#1a1c24" /></group>
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#0c0e10" /></mesh>
  <Predios n={40} sem="c5f" z={-10} larg={24} alt={3} janelas={0} cor="#0e1014" />
  <Pos bloom={0.3} /></>}</CP>; };
const C5g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[f * 0.01, 1.2, 6]} alvo={[0, 1.2, -10]} /><ambientLight intensity={0.1} /><Ceu cima="#04050a" baixo="#14161c" /><Estrelas sem="c5g" n={2000} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#0a0b0d" /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -6]}><planeGeometry args={[3, 30]} /><meshStandardMaterial color="#141518" /></mesh>
  {[-1, 1].map((l) => LAT(10).map((i) => <Predio key={l + '' + i} pos={[l * (2.4 + random('q' + i) * 0.6), 0, -i * 2]} h={1.5 + random('qh' + l + i) * 3} w={1.4} i={i} luz={0} />))}
  <Pos bloom={0.3} /></>}</CP>;

// ================= 6. O CÉU ESCURECE =================
const C6a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.2, 6]} alvo={[0, 3, -10]} /><Luzes sol={[0, 6, -10]} i={0.5} amb={0.3} /><Ceu cima="#5a4a40" baixo="#c88a50" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#3a3a30" roughness={1} /></mesh>
  <Brilho pos={[3, 5, -40]} s={3} cor="#c87a40" o={0.3} />
  <Pos bloom={0.4} /></>}</CP>;
const C6b: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 2, 10]} alvo={[0, 4, 0]} /><Luzes sol={[-3, 8, 3]} i={1} amb={0.4} /><Ceu cima="#3a4050" baixo="#8a8070" />
  {LAT(60).map((i) => <Brilho key={i} pos={[(random('nb' + i) - 0.5) * 30, 3 + random('nc' + i), (random('nd' + i) - 0.5) * 10 - 6]} s={4} cor="#e8e8ec" o={0.4} />)}
  <Nuvem n={900} sem="c6b" origem={new THREE.Vector3(0, 0, -4)} t={60 + f} raio={8} cor="#1a1816" tam={1.4} o={0.55} dir={new THREE.Vector3(0, 4, 0)} />
  <Pos bloom={0.3} /></>}</CP>;
const C6c: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 0.6, 3.4]} /><Luzes sol={[-3, 2, 4]} i={2.4 * (1 - k * 0.8)} amb={0.06} /><Estrelas sem="c6c" />
  <Terra tex={tex} rot={[0.3, f * 0.003, 0]} />
  <mesh scale={1.02 + k * 0.01}><sphereGeometry args={[1, 64, 64]} /><meshStandardMaterial color="#1a1612" transparent opacity={0.85 * k} roughness={1} /></mesh>
  <Pos bloom={0.5} /></>; }}</CP>; };
const C6d: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 4, d * 0.8); return <>
  <Cam pos={[1.6, 1.4, 4]} alvo={[0, 1, 0]} /><Luzes sol={[-2, 4, 3]} i={0.8} amb={0.4} /><Ceu cima="#4a4a52" baixo="#a8a8b0" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color={mix('#5a6a3a', '#dce4ec', k)} /></mesh>
  {LAT(60).map((i) => <mesh key={i} position={[(i % 10 - 4.5) * 0.5, 0.15, -Math.floor(i / 10) * 0.6 - 1]}><coneGeometry args={[0.08, 0.3, 6]} /><meshStandardMaterial color={mix('#4a8a3a', '#e8f0f8', k)} /></mesh>)}
  <mesh position={[0.8, 1.2, 0.5]}><cylinderGeometry args={[0.06, 0.06, 2.2, 16]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
  <mesh position={[0.8, 0.15, 0.5]}><sphereGeometry args={[0.13, 24, 24]} /><meshBasicMaterial color={VERM} /></mesh>
  <mesh position={[0.8, lerp(1.6, 0.4, k) / 2 + 0.1, 0.52]} scale={[1, lerp(1.6, 0.4, k), 1]}><cylinderGeometry args={[0.03, 0.03, 1, 12]} /><meshBasicMaterial color={VERM} /></mesh>
  <Pos bloom={0.4} /></>; }}</CP>; };
const C6e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.4, 6]} alvo={[0, 1.4, -6]} /><Luzes sol={[-3, 5, 3]} i={0.6} amb={0.45} /><Ceu cima="#5a5a64" baixo="#b8b8c0" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#e8eef4" roughness={1} /></mesh>
  {LAT(400).map((i) => <mesh key={i} position={[(random('sx' + i) - 0.5) * 12, 5 - ((f * 0.02 + random('sy' + i) * 5) % 5), (random('sz' + i) - 0.5) * 8]} scale={0.03}><sphereGeometry args={[1, 6, 6]} /><meshBasicMaterial color="#ffffff" /></mesh>)}
  {LAT(8).map((i) => <Arvore key={'a' + i} pos={[-6 + i * 1.6, 0, -3 - (i % 3)]} s={1.4} />)}
  <Pos bloom={0.4} /></>}</CP>;
const C6f: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[2, 1, 3]} alvo={[0, 0.6, 0]} /><Luzes sol={[-3, 4, 3]} i={0.8} amb={0.4} /><Ceu cima="#4a4a50" baixo="#8a8478" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#4a4030" /></mesh>
  {LAT(14).map((i) => <group key={i} position={[(i % 7 - 3) * 0.5, 0, Math.floor(i / 7) * 0.6 - 0.3]} rotation={[0, 0, k * 0.6 * (i % 2 ? 1 : -1)]}><mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.01, 0.01, 0.5, 6]} /><meshStandardMaterial color={mix('#3a7a2a', '#5a4a30', k)} /></mesh>
    <mesh position={[0, 0.52, 0]}><sphereGeometry args={[0.08, 12, 8]} /><meshStandardMaterial color={mix(['#e83a6a', '#f2c21a', '#7a4ae8'][i % 3], '#4a3a2a', k)} /></mesh></group>)}
  {LAT(40).map((i) => <mesh key={'f' + i} position={[(random('lx' + i) - 0.5) * 6, Math.max(0.02, 3 - k * 3 * (0.5 + random('ly' + i))), -2 + (random('lz' + i) - 0.5) * 2]} rotation={[k * 6 * random('lr' + i), 0, 0]}><planeGeometry args={[0.1, 0.06]} /><meshStandardMaterial color="#8a6a2a" side={THREE.DoubleSide} /></mesh>)}
  <Pos bloom={0.3} /></>; }}</CP>; };
const C6g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.4, 1.2, 2.6]} alvo={[0, 0.8, 0]} /><ambientLight intensity={0.25} /><pointLight position={[0, 2, 1]} intensity={1.4} color="#c8d0e0" distance={5} /><color attach="background" args={['#14161a']} />
  <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.5, 0.05, 0.5]} /><meshStandardMaterial color="#6a4a30" /></mesh>
  {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map(([x, z], i) => <mesh key={i} position={[x, 0.22, z]}><boxGeometry args={[0.04, 0.45, 0.04]} /><meshStandardMaterial color="#6a4a30" /></mesh>)}
  <mesh position={[0, 0.85, -0.22]}><boxGeometry args={[0.5, 0.8, 0.05]} /><meshStandardMaterial color="#6a4a30" /></mesh>
  <mesh position={[0, 0.8, -0.16]} rotation={[0.05, 0, 0]}><boxGeometry args={[0.6, 0.85, 0.12]} /><meshStandardMaterial color="#2a3a5a" roughness={1} /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[l * 0.36, 0.7, -0.14]} rotation={[0, 0, l * 0.1]}><capsuleGeometry args={[0.07, 0.5, 6, 12]} /><meshStandardMaterial color="#2a3a5a" roughness={1} /></mesh>)}
  <mesh position={[0, 1.5, -1.5]}><planeGeometry args={[1.2, 1]} /><meshBasicMaterial color="#5a5a64" /></mesh>
  <Pos bloom={0.3} /></>}</CP>;

// ================= 7. A FOME =================
const C7a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[2 - f * 0.01, 1.2, 3.6]} alvo={[0, 1, 0]} /><ambientLight intensity={0.35} /><pointLight position={[0, 3, 2]} intensity={2} color="#e8f0ff" distance={8} /><color attach="background" args={['#14161a']} />
  <Prateleira cheia={0.04} />
  <Prateleira cheia={0.02} pos={[0, 0, -2]} />
  <Pos bloom={0.3} /></>}</CP>;
const C7b: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.6, 6]} alvo={[0, 0, -4]} /><Luzes sol={[-3, 4, 2]} i={0.6} amb={0.4} /><Ceu cima="#4a4a50" baixo="#8a8070" />
  <mesh geometry={SOLO}><meshStandardMaterial color="#5a4a38" roughness={1} /></mesh>
  {LAT(120).map((i) => <mesh key={i} position={[(i % 15 - 7) * 0.6, 0.06, -Math.floor(i / 15) * 0.8]}><coneGeometry args={[0.04, 0.1 + Math.sin(f * 0.02 + i) * 0.005, 5]} /><meshStandardMaterial color="#6a7a3a" /></mesh>)}
  <Pos bloom={0.3} /></>}</CP>;
const C7c: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.8); const pts: V3[] = LAT(60).map((i) => { const t = i / 59; return [lerp(-3, 3, t), t < 0.35 ? 0.9 : t < 0.5 ? lerp(0.9, -0.9, (t - 0.35) / 0.15) : -0.9 + Math.sin(t * 20) * 0.02, 0]; }); return <>
  <Cam pos={[0, -0.2, 6]} /><ambientLight intensity={0.6} /><color attach="background" args={['#0a0c14']} />
  <Tubo pts={pts} r={0.03} cor={AMBAR} k={k} brilho={1.4} />
  {LAT(10).map((i) => <mesh key={i} position={[lerp(-3, 3, i / 9), -1.25, 0]} scale={[1, i < 3 ? 1 : 0.1, 1]}><boxGeometry args={[0.35, 0.5, 0.2]} /><meshStandardMaterial color={i < 3 ? '#e8c040' : '#3a3a40'} /></mesh>)}
  <Pos bloom={0.8} /></>; }}</CP>; };
const C7d: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 0.8, 3.4]} /><Luzes sol={[-3, 2, 4]} i={1.4 * (1 - k * 0.6)} amb={0.06} /><Estrelas sem="c7d" />
  <Terra tex={tex} rot={[0.3, f * 0.003 + 1.2, 0]} />
  <Calota la={28} lo={75} ang={0.25 * k} cor="#1a1410" o={0.8} add={false} />
  <mesh scale={1.03}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#3a3028" transparent opacity={0.35 * k} /></mesh>
  <Pos bloom={0.5} /></>; }}</CP>; };
const C7e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[f * 0.008 - 1, 1.6, 7]} alvo={[0, 0.6, -4]} /><Luzes sol={[-3, 4, 2]} i={0.5} amb={0.35} /><Ceu cima="#3a3a40" baixo="#7a7268" />
  <mesh geometry={SOLO}><meshStandardMaterial color="#5a5038" roughness={1} /></mesh>
  {LAT(6).map((i) => <Casa key={i} pos={[-5 + i * 2, 0, -3 - (i % 2)]} i={i} s={1.2} luz={0} />)}
  {LAT(10).map((i) => <Arvore key={'a' + i} pos={[-6 + i * 1.3, 0, -6]} s={1.6} />)}
  <Pos bloom={0.3} /></>}</CP>;
const C7f: React.FC = () => { const d = useD(); return <CP>{(f) => { const n = Math.min(7, 7 - Math.floor(pr(f, 0, d * 0.8) * 4)); return <>
  <Cam pos={[0, 1.4, 1.6]} alvo={[0, 0.8, 0]} /><ambientLight intensity={0.15} /><pointLight position={[0, 2, 0.6]} intensity={3} color="#ffd8a0" distance={4} /><color attach="background" args={['#050403']} />
  <mesh position={[0, 0.75, 0]}><boxGeometry args={[2, 0.05, 1]} /><meshStandardMaterial color="#5a3a24" /></mesh>
  {LAT(7).map((i) => i < n ? <mesh key={i} position={[(i - 3) * 0.24, 0.9, 0]}><cylinderGeometry args={[0.09, 0.09, 0.24, 24]} /><meshStandardMaterial color="#b8bcc4" metalness={0.9} roughness={0.25} /></mesh> : null)}
  <Pos bloom={0.4} /></>; }}</CP>; };
const C7g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.6, 1.2, 1.4]} alvo={[0, 1, 0]} /><ambientLight intensity={0.3} /><pointLight position={[1, 2, 1]} intensity={2} color="#e8e0d0" distance={4} /><color attach="background" args={['#1a1814']} />
  <mesh position={[0, 0.85, 0]}><boxGeometry args={[1.6, 0.06, 0.8]} /><meshStandardMaterial color="#c8c8c0" /></mesh>
  <mesh position={[0, 1.35, -0.3]}><cylinderGeometry args={[0.03, 0.03, 0.4, 12]} /><meshStandardMaterial color="#aab0b8" metalness={0.9} /></mesh>
  <mesh position={[0, 1.52, -0.18]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.025, 0.025, 0.28, 12]} /><meshStandardMaterial color="#aab0b8" metalness={0.9} /></mesh>
  {f % 50 > 40 && <mesh position={[0, 1.44 - (f % 50 - 40) * 0.03, -0.05]}><sphereGeometry args={[0.012, 8, 8]} /><meshBasicMaterial color="#8ac8ff" /></mesh>}
  <Copo pos={[0.5, 0.95, 0.1]} s={0.6} />
  <Pos bloom={0.3} /></>}</CP>;
const Mao: React.FC<{pos: V3; rot?: V3}> = ({pos, rot = [0, 0, 0]}) => <group position={pos} rotation={rot}><mesh><capsuleGeometry args={[0.12, 0.6, 8, 16]} /><meshStandardMaterial color="#8a7060" /></mesh><mesh position={[0, 0.42, 0]}><sphereGeometry args={[0.14, 16, 16]} /><meshStandardMaterial color="#8a7060" /></mesh></group>;
const C7h: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 6, d * 0.6); return <>
  <Cam pos={[0, 1.4, 2.4]} alvo={[0, 1, 0]} /><ambientLight intensity={0.5} /><pointLight position={[0, 2.4, 1]} intensity={4} color="#ffd8a0" distance={5} /><color attach="background" args={['#4a3a2a']} />
  <Mao pos={[lerp(-1.4, -0.4, k), 1, 0]} rot={[0, 0, -Math.PI / 2]} /><Mao pos={[lerp(1.4, 0.4, k), 1, 0]} rot={[0, 0, Math.PI / 2]} />
  <group position={[lerp(-0.85, 0.15, k), 1.1, 0.05]}><mesh><cylinderGeometry args={[0.08, 0.08, 0.2, 16]} /><meshStandardMaterial color="#e8a040" transparent opacity={0.8} /></mesh><mesh position={[0, 0.13, 0]}><cylinderGeometry args={[0.06, 0.06, 0.06, 16]} /><meshStandardMaterial color="#fff" /></mesh></group>
  <mesh position={[lerp(0.9, -0.15, k), 1.1, 0.05]}><boxGeometry args={[0.3, 0.25, 0.18]} /><meshStandardMaterial color="#e8dcc0" roughness={1} /></mesh>
  <Pos bloom={0.3} /></>; }}</CP>; };
const C7i: React.FC = () => { const c = camLL(-25, 10, 4.6); return <CP rot={(f) => <>{([[-34, -64, 'ARGENTINA'], [-25, 134, 'AUSTRÁLIA']] as [number, number, string][]).map(([la, lo, t], i) => <R3 key={t} cam={c} p={v(la, lo, 1.02)} txt={t} o={pr(f, 8 + i * 30, 16 + i * 30)} dy={-50} tam={54} />)}</>}>{(f, tex) => <>
  <Cam pos={c} /><Luzes sol={solDe(c)} i={1.2} amb={0.12} /><Estrelas sem="c7i" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  <mesh scale={1.012}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#2a2420" transparent opacity={0.45} /></mesh>
  <Calota la={-34} lo={-64} ang={0.22} cor="#bfe8ff" o={0.45} r={1.015} /><Calota la={-25} lo={134} ang={0.28} cor="#bfe8ff" o={0.45} r={1.015} />
  <Pos bloom={0.6} /></>}</CP>; };

// ================= 8. O CÉU QUE QUEIMA =================
const C8a: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d * 0.8); return <>
  <Cam pos={[0, 0.6, 3.6]} /><Luzes sol={[-3, 2, 4]} i={2.2} amb={0.08} /><Estrelas sem="c8a" />
  <Terra tex={tex} rot={[0.3, f * 0.003, 0]} />
  {LAT(24).map((i) => { const lo = i / 24 * Math.PI * 2; const some = (i % 4 !== 0) && random('oz' + i) < k * 1.1; return some ? null : <mesh key={i} rotation={[0, lo, 0]} scale={1.15}><sphereGeometry args={[1, 8, 24, 0, Math.PI * 2 / 24, 0.2, Math.PI - 0.4]} /><meshBasicMaterial color="#5ab8ff" transparent opacity={0.18} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>; })}
  <Pos bloom={0.6} /></>; }}</CP>; };
const C8b: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1, 6]} alvo={[0, 3, -10]} /><ambientLight intensity={0.6} /><Ceu cima="#3a7ac8" baixo="#e0f0ff" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#8a7a5a" roughness={1} /></mesh>
  <Brilho pos={[2, 9, -30]} s={10} cor="#ffffff" o={1} />
  <Tubo pts={[[2, 9, -30], [0, 0, 0]]} r={0.4} cor="#fff8e0" o={0.25 + 0.1 * Math.sin(f * 0.3)} brilho={2} />
  <Pos bloom={1.4} /></>}</CP>;
const C8c: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 3, 8]} alvo={[0, 0, -4]} /><Luzes sol={[-3, 6, 3]} i={1.4} amb={0.4} /><Ceu cima={mix('#2a6ac8', '#5a5e66', k)} baixo={mix('#bfe0ff', '#9a9ea6', k)} />
  <Viva n={120} tam={60} h={(x, z) => Math.sin(x * 0.6 + f * 0.05) * 0.08 + Math.sin(z * 0.7 - f * 0.04) * 0.06} mat={<meshStandardMaterial color={mix('#1a5a9a', '#5a6670', k)} roughness={0.2} metalness={0.4} />} />
  <Pos bloom={0.3} /></>; }}</CP>; };
const C8d: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={camLL(0, -150, 2.8)} /><Luzes sol={solDe(camLL(0, -150, 2.8))} i={2} amb={0.2} /><Estrelas sem="c8d" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  <Calota la={-2} lo={-130} ang={0.35 + 0.02 * Math.sin(f * 0.1)} cor="#ff6a30" o={0.45} r={1.012} />
  <Pos bloom={0.7} /></>}</CP>;
const C8e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.6, 1.4, 3]} alvo={[0, 1.2, 0]} /><ambientLight intensity={0.6} /><directionalLight position={[3, 2, 2]} intensity={3} color="#fff4e0" /><color attach="background" args={['#e8e0d0']} />
  <mesh position={[0, 1.5, -0.4]}><boxGeometry args={[4, 3, 0.1]} /><meshStandardMaterial color="#d8d0c0" /></mesh>
  <group position={[-0.6, 0, -0.3]}><Porta abre={0.3} luz="#ffffff" /></group>
  <mesh position={[0.9, 1.9, -0.32]}><cylinderGeometry args={[0.03, 0.03, 0.1, 8]} /><meshStandardMaterial color="#888" /></mesh>
  <mesh position={[0.9, 1.95, -0.25]}><cylinderGeometry args={[0.32, 0.32, 0.04, 32]} /><meshStandardMaterial color="#c8a868" /></mesh>
  <mesh position={[0.9, 2.04, -0.25]}><cylinderGeometry args={[0.16, 0.18, 0.16, 32]} /><meshStandardMaterial color="#c8a868" /></mesh>
  <mesh position={[0.9, 1.3, -0.3]}><boxGeometry args={[0.5, 0.7, 0.05]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[0.9 + l * 0.32, 1.25, -0.3]} rotation={[0, 0, l * 0.15]}><capsuleGeometry args={[0.06, 0.6, 6, 12]} /><meshStandardMaterial color="#f0f0f0" /></mesh>)}
  <Pos bloom={0.8} /></>}</CP>;
const C8f: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.3, 3.4]} /><Luzes sol={[-3, 2, 4]} i={1.6} amb={0.08} /><Estrelas sem="c8f" />
  <Terra tex={tex} rot={[0.3, f * 0.003, 0]} />
  <mesh scale={1.015}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#6a6058" transparent opacity={0.3} /></mesh>
  <mesh scale={1.1}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#a89070" transparent opacity={0.08} side={THREE.BackSide} /></mesh>
  <Pos bloom={0.5} /></>}</CP>;

// ================= 9. MAS ESPERA… =================
const C9a: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.6); return <>
  <Cam pos={[0, 1.6, 6]} alvo={[0, 1.4, 0]} /><ambientLight intensity={0.5} /><color attach="background" args={['#10141c']} />
  {[-1, 1].map((l) => <group key={l} position={[l * 2, 0, 0]}>
    <mesh position={[0, 1.8, -1]}><planeGeometry args={[2.4, 1.4]} /><meshBasicMaterial color="#1e2a40" toneMapped={false} /></mesh>
    <Tubo pts={LAT(30).map((i) => { const t = i / 29; return [lerp(-1, 1, t), 1.8 + (l < 0 ? -0.5 + 0.2 * Math.sin(t * 8) * (1 - t) : 0.5 - t * 1.1), -0.98] as V3; })} r={0.02} cor={l < 0 ? '#3aff8a' : VERM} k={k} brilho={1.5} />
    {LAT(3).map((i) => <Pessoa key={i} pos={[(i - 1) * 0.5, 0, 0.8]} rot={Math.PI} s={0.9} />)}
    <pointLight position={[0, 1.8, 0]} intensity={1.5} color={l < 0 ? '#3aff8a' : VERM} distance={4} /></group>)}
  <Pos bloom={0.8} /></>; }}</CP>; };
const ILHAS: [number, number][] = [[-25, 134], [-41, 174], [64, -18], [-54, -60], [-21, 55]];
const C9b: React.FC = () => { const d = useD(); const c = camLL(-30, 150, 3.6); return <CP rot={(f) => <>{([[-25, 134, 'AUSTRÁLIA'], [-41, 174, 'NOVA ZELÂNDIA']] as [number, number, string][]).map(([la, lo, t], i) => <R3 key={t} cam={c} p={v(la, lo, 1.02)} txt={t} o={pr(f, 30 + i * 20, 38 + i * 20)} dy={-50} tam={50} />)}</>}>{(f, tex) => <>
  <Cam pos={c} /><Luzes sol={solDe(c)} i={1.6} amb={0.15} /><Estrelas sem="c9b" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  {ILHAS.map(([la, lo], i) => <Calota key={i} la={la} lo={lo} ang={0.06 * pr(f, i * 10, i * 10 + 12, Easing.out(Easing.back(2)))} cor="#ffe070" o={0.9} r={1.012} />)}
  <Pos bloom={0.9} /></>}</CP>; };
const C9c: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.5, Easing.out(Easing.cubic)); const m = -(85 / 3600) * Math.PI * 2 * k; return <>
  <Cam pos={[0, 0.6, 3.6]} alvo={[0, 0.6, 0]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.3} /><color attach="background" args={['#05040a']} />
  <group position={[0, 0.6, 0]}><Mostrador n={60} h={m / 12 * 0} m={m} cor={VERM} fundo="#0a0608" aro="#3a2a2a" /></group>
  <mesh position={[0, 0.6, 0.075]}><ringGeometry args={[0.6, 0.98, 64, 1, Math.PI / 2, -m]} /><meshBasicMaterial color={VERM} transparent opacity={0.25} toneMapped={false} /></mesh>
  <Pos bloom={0.9} /></>; }}</CP>; };
const C9d: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 1.4, 3]} alvo={[0, 0.9, 0]} /><Luzes sol={[2, 4, 3]} i={1.4} amb={0.2} /><color attach="background" args={['#05060a']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 3]} /><meshStandardMaterial map={tex.dia} color="#5a6070" /></mesh>
  <Ampulheta f={f} pos={[0, 1, 0.3]} s={0.9} parada />
  <Pos bloom={0.5} /></>}</CP>;


// cenas extras (divisão de frases longas)
const C2f: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, d * 0.4, d * 0.8); return <>
  <Cam pos={[0, 1.2, 6]} alvo={[0, 3, -10]} /><ambientLight intensity={lerp(0.6, 0.05, k)} /><Ceu cima={mix('#5a8ac8', '#02040a', k)} baixo={mix('#d8e8f8', '#0a0c14', k)} />
  <mesh geometry={PLANICIE}><meshStandardMaterial color={mix('#5a6a4a', '#0a0c0a', k)} roughness={1} /></mesh>
  <Brilho pos={[0, lerp(6, -2, k), -40]} s={6} cor="#fff0c0" o={1 - k} />
  {k > 0.5 && <Estrelas sem="c2f" />}
  <Pos bloom={0.6} /></>; }}</CP>; };
const C6h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d * 0.7); return <>
  <Cam pos={camLL(40, 10, 3.4)} /><Luzes sol={solDe(camLL(40, 10, 3.4))} i={1.2} amb={0.15} /><Estrelas sem="c6h" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  <mesh><sphereGeometry args={[1.012, 96, 48, 0, Math.PI * 2, 0, Math.PI * 0.42 * k]} /><meshStandardMaterial color="#eef4ff" transparent opacity={0.75} roughness={0.8} /></mesh>
  <Pos bloom={0.5} /></>; }}</CP>; };
const C7j: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 4, d * 0.8); return <>
  <Cam pos={[0, 1.4, 4.2]} alvo={[0, 0.9, 0]} /><ambientLight intensity={0.3} /><pointLight position={[0, 3, 2]} intensity={2} color="#ffffff" distance={8} /><color attach="background" args={['#05060a']} />
  {LAT(8).map((i) => { const apaga = i < 5 && k > i / 5; return <mesh key={i} position={[(i - 3.5) * 0.5, 0.9, 0]}><cylinderGeometry args={[0.16, 0.16, 1.4, 24]} /><meshStandardMaterial color={apaga ? '#2a2a30' : '#e8c040'} emissive={apaga ? '#000' : '#a87a10'} emissiveIntensity={0.4} /></mesh>; })}
  <Pos bloom={0.6} /></>; }}</CP>; };
const C9e: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.4, 3.4]} /><Luzes sol={[-3, 2, 4]} i={0.8} amb={0.15} /><Estrelas sem="c9e" />
  <Terra tex={tex} rot={[0.3, 0.6, 0]} />
  <mesh scale={1.012}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#9aa8c0" transparent opacity={0.25 + 0.05 * Math.sin(f * 0.1)} /></mesh>
  <Pos bloom={0.5} /></>}</CP>;
const C9f: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 1.2, 6]} alvo={[0, 3, -10]} /><ambientLight intensity={0.2 + k * 0.4} /><Ceu cima={mix('#3a3a40', '#4a7ab8', k)} baixo={mix('#6a6058', '#f0c890', k)} />
  <mesh geometry={PLANICIE}><meshStandardMaterial color={mix('#3a3a30', '#4a6a3a', k)} roughness={1} /></mesh>
  <Brilho pos={[0, lerp(-1, 4, k), -40]} s={8} cor="#ffe0a0" o={k} />
  <Tubo pts={[[0, lerp(-1, 4, k), -40], [-3, 0, 0]]} r={0.3} cor="#fff0c0" o={0.2 * k} brilho={1.5} />
  <Pos bloom={1} /></>; }}</CP>; };

// ---------- canto: marcador T ± X ----------
const nn = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '');
const WN = W.map((w) => nn(w.w));
const tF = (fr: string) => { const p = fr.split(' '); for (let i = 0; i < WN.length; i++) if (p.every((x, j) => WN[i + j] === x)) return Math.round(W[i].t * 30); throw new Error('canto: ' + fr); };
const MARCAS: [number, string][] = [[0, 'T − 30 MIN'], [tF('nao olhe'), 'T + 0'], [tF('num exemplo com uma'), 'T + 10 S'], [tF('la no alto a nuvem'), 'T + 10 MIN'], [tF('fique dentro por pelo'), 'T + 24 H'], [tF('duas semanas voce'), 'T + 2 SEMANAS'], [tF('um mes as prateleiras'), 'T + 1 MÊS'], [tF('t mais um ano'), 'T + 1 ANO']];
const CONGELA = tF('mas espera nem');
const Canto: React.FC<{k: number}> = () => {
  const f = useCurrentFrame(); const gelo = f >= CONGELA;
  const i = MARCAS.reduce((acc, [t], j) => (f >= t ? j : acc), 0); const [t0, txt] = MARCAS[i];
  const pop = gelo ? 1 : interpolate(f - t0, [0, 6, 12], [1.25, 0.95, 1], cl);
  const cor = gelo ? '#9aa8c0' : i === 0 ? AMBAR : VERM;
  return <div style={{position: 'absolute', top: 40, left: 46, padding: '10px 22px', borderRadius: 10, background: 'rgba(0,0,0,.6)', border: `3px solid ${cor}`, transform: `scale(${pop})`, transformOrigin: 'left top',
    fontFamily: FONTE, fontSize: 38, letterSpacing: 3, color: '#fff', boxShadow: `0 0 18px ${cor}66`, textShadow: `0 0 12px ${cor}`, opacity: gelo ? 0.85 : 1}}>
    <span style={{display: 'inline-block', width: 14, height: 14, borderRadius: 7, background: cor, marginRight: 14, verticalAlign: 'middle', opacity: gelo ? 1 : (Math.floor(f / 15) % 2 ? 1 : 0.4)}} />{gelo ? '❚❚ ' : ''}{txt}</div>;
};
// cartão de capítulo: tela escura com um anel vermelho pulsando (anel de alerta), mais frio na virada
const Cartao: React.FC<{k: number}> = ({k}) => { const d = useD(); return <CP>{(f) => { const o = interpolate(f, [0, 6, d - 10, d], [0, 1, 1, 0], cl); const p = (f % 30) / 30; return <>
  <Cam pos={[0, 0, 4]} /><color attach="background" args={['#020203']} />
  {[0, 1, 2].map((i) => { const t = ((f + i * 10) % 30) / 30; return <mesh key={i} scale={0.3 + t * 1.6}><ringGeometry args={[0.95, 1, 96]} /><meshBasicMaterial color={k === 9 ? '#9aa8c0' : VERM} transparent opacity={o * (1 - t) * 0.8} toneMapped={false} /></mesh>; })}
  <Brilho pos={[0, 0, 0]} s={0.6 + p * 0.2} cor={k === 9 ? '#9aa8c0' : VERM} o={o} />
  <Pos bloom={1} /></>; }}</CP>; };

// ---------- plano ----------
const CAPS: Cap[] = [
  {canto: '', sat: 1}, {canto: '', sat: 1}, {canto: '', sat: 0.95}, {canto: '', sat: 0.88}, {canto: '', sat: 0.8},
  {canto: '', sat: 0.72}, {canto: '', sat: 0.62}, {canto: '', sat: 0.55}, {canto: '', sat: 0.5}, {canto: '', sat: 0.85},
];
const PLANO: [string, React.FC][][] = [
  [['voce tem trinta', G1], ['ninguem sabe se', G2], ['hoje voce vai viver', G3], ['e vai descobrir', G4]],
  [['um missil intercontinental', C1a], ['hoje existem mais', C1b], ['mas umas duas mil', C1c], ['nesse cenario voce', C1d], ['longe o bastante', C1e], ['e uma terca feira', C1f], ['o celular toca', C1g]],
  [['nao olhe essa', C2a], ['olhar pro clarao', C2b], ['de dia a cegueira', C2f], ['vire de costas', C2c], ['voce sente o calor', C2d], ['porque o que vem', C2e]],
  [['num exemplo com uma', C3a], ['pelas nossas contas', C3b], ['fique longe das janelas', C3c], ['e nao entre no carro', C3d], ['a onda passa', C3e]],
  [['la no alto a nuvem', C4a], ['voce tem uns dez', C4b], ['o melhor e um porao', C4c], ['ou o meio de um', C4d], ['ou um tunel de metro', C4e], ['la dentro tire', C4f], ['alcool em gel', C4g], ['feche a porta', C4h], ['e agora vem', C4i]],
  [['fique dentro por pelo', C5a], ['e tem uma regra', C5b], ['se na primeira hora', C5c], ['a radiacao vai embora', C5d], ['la fora voce ouve', C5e], ['entao voce sai', C5f], ['e e ai que voce', C5g]],
  [['duas semanas voce', C6a], ['as cidades que', C6b], ['num modelo de guerra global', C6c], ['a terra esfria', C6d], ['em boa parte do', C6h], ['os cientistas chamam', C6e], ['as flores do jardim', C6f], ['voce veste o casaco', C6g]],
  [['um mes as prateleiras', C7a], ['sem sol as plantacoes', C7b], ['num modelo de guerra entre', C7c], ['e mais de cinco', C7j], ['mesmo uma guerra regional', C7d], ['e quem mora longe', C7e], ['voce aprende a contar', C7f], ['a agua da torneira', C7g], ['voce troca o que', C7h], ['nos modelos a argentina', C7i]],
  [['e quando a fumaca', C8a], ['quando o ceu clareia', C8b], ['o oceano esfria', C8c], ['no pacifico um', C8d], ['voce passa a sair', C8e], ['t mais um ano', C8f]],
  [['mas espera nem', C9e], ['pra uma guerra pequena', C9a], ['e mesmo no pior', C9f], ['um estudo procurou', C9b], ['hoje o relogio do', C9c], ['ninguem quer descobrir', C9d]],
];
const Fim: React.FC = () => <Final />;
const L = criarLongo({W, plano: PLANO, caps: CAPS, audio: 'nuclear/narracao_cap.mp3', musica: 'nuclear/musica.mp3', volta: 9, fim: Fim,
  semTexto: true, legenda: 40, cartao: Cartao, canto: Canto,
  hits: [{frase: 'o celular toca', vol: 0.3}, {frase: 'nao olhe essa', vol: 0.5}, {frase: 'num exemplo com uma', vol: 0.35}, {frase: 'e e ai que voce', vol: 0.3}]});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// thumb "DIA 1 A 365": silhueta de costas diante de uma cidade apagada sob céu cinza-alaranjado, com um brilho distante no horizonte
export const ThumbCena: React.FC = () => <CP>{() => <>
  <Cam pos={[0.6, 1.3, 5]} alvo={[0.4, 1.8, -10]} /><Luzes sol={[0, 4, -10]} i={0.6} amb={0.25} />
  <Ceu cima="#2a2220" baixo="#e87a30" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#0e0c0a" /></mesh>
  <Predios n={60} sem="thN" z={-10} larg={30} alt={4} janelas={0} cor="#0a0908" />
  <Brilho pos={[4, 2.5, -40]} s={16} cor="#ff8a30" o={0.6} />
  <Nuvem n={600} sem="thN" origem={new THREE.Vector3(4, 3, -40)} t={200} raio={14} cor="#3a3028" tam={4} o={0.4} dir={new THREE.Vector3(0, 2, 0)} />
  <Pessoa pos={[1.6, 0, 1.2]} rot={Math.PI} s={1.6} />
  <Pos bloom={1} /></>}</CP>;
void Easing; void ease; void Aviao;

// thumb v2 (dono, 17/11: "a capa ta uma merda"): nuvem em cogumelo gigante e incandescente sobre a cidade apagada, céu vermelho, silhueta de costas
export const ThumbCena2: React.FC = () => <CP>{() => <>
  <Cam pos={[-1.2, 1.1, 7]} alvo={[1.2, 3.4, -10]} /><ambientLight intensity={0.35} /><directionalLight position={[3, 4, -10]} intensity={2.5} color="#ff8a40" />
  <Ceu cima="#2a0a08" baixo="#ff6a20" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[120, 120]} /><meshStandardMaterial color="#120806" /></mesh>
  <group position={[3.5, 0, -22]}>
    <mesh position={[0, 4, 0]}><cylinderGeometry args={[0.9, 1.8, 8, 32]} /><meshStandardMaterial color="#5a3020" emissive="#ff5a10" emissiveIntensity={0.9} /></mesh>
    <mesh position={[0, 9, 0]} scale={[1.8, 1, 1.8]}><sphereGeometry args={[3, 48, 32]} /><meshStandardMaterial color="#6a3a28" emissive="#ff7a20" emissiveIntensity={0.7} roughness={1} /></mesh>
    <mesh position={[0, 8.2, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[4.6, 1.4, 24, 64]} /><meshStandardMaterial color="#4a2a1c" emissive="#ff4a10" emissiveIntensity={0.8} roughness={1} /></mesh>
    <Brilho pos={[0, 8.5, 2]} s={22} cor="#ffb050" o={0.75} /><Brilho pos={[0, 2, 2]} s={14} cor="#fff0c0" o={0.8} />
    <Nuvem n={900} sem="thN2" origem={new THREE.Vector3(0, 9, 0)} t={300} raio={8} cor="#ffb070" tam={1.6} o={0.35} dir={new THREE.Vector3(0, 0.3, 0)} />
    <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[5, 9, 64]} /><meshBasicMaterial color="#ffd8a0" transparent opacity={0.5} toneMapped={false} /></mesh>
  </group>
  <Predios n={70} sem="thN2" z={-12} larg={40} alt={3.5} janelas={0} cor="#080404" />
  <Pessoa pos={[-1.5, 0, 2.2]} rot={Math.PI - 0.3} s={1.9} />
  <Pos bloom={1.4} /></>}</CP>;
