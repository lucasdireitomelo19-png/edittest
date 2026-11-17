// Short "OS EUA EXPLODIRAM UMA BOMBA NUCLEAR NO ESPAÇO 💥🛰️" (aprovado pelo dono em 17/11/2026). Tudo em Remotion 3D, sem bonequinho, foto ou filmagem.
// Na tela: "09/07/1962 · STARFISH PRIME" e "TELSTAR 1" em neon, legenda (56). Sem selos. Nada de cogumelo sobre cidade, nem pessoas. Máquina de escrever com folha sem texto.
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Terra, pr, cl, THREE} from '../lote/kit3d';
import {v, camLL} from '../lote/pangeia3d';
import {LAT, Tubo, TerraN, Calota, Viva, Ceu, Sat} from './Apophis';
import {Palmeira} from './PangeiaLongo';
import palavras from './starfish.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: string, b: string, t: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), Math.max(0, Math.min(1, t))).getHexString();
const ROSA = '#ff4a8a';
const Telstar: React.FC<{pos?: V3; s?: number; f: number; falha?: number}> = ({pos = [0, 0, 0], s = 1, f, falha = 0}) => { const on = falha < 1 && !(falha > 0 && Math.floor(f / 3) % Math.max(2, Math.round(6 - falha * 5)) === 0); return <group position={pos} scale={s} rotation={[0.3, f * 0.05, 0.2]}>
  <mesh><icosahedronGeometry args={[0.5, 1]} /><meshStandardMaterial color="#b8bcc4" metalness={0.8} roughness={0.3} flatShading /></mesh>
  {LAT(12).map((i) => { const p = new THREE.Vector3(random('tx' + i) - 0.5, random('ty' + i) - 0.5, random('tz' + i) - 0.5).normalize().multiplyScalar(0.47); return <mesh key={i} position={V(p)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize())}><planeGeometry args={[0.22, 0.22]} /><meshStandardMaterial color="#1a2a5a" metalness={0.6} emissive="#1a3aaa" emissiveIntensity={on ? 0.6 : 0} /></mesh>; })}
  <mesh position={[0, 0.62, 0]}><cylinderGeometry args={[0.02, 0.02, 0.3, 8]} /><meshStandardMaterial color="#888" /></mesh>
  <Brilho pos={[0, 0.8, 0]} s={0.25} cor="#7ad0ff" o={on ? 0.9 : 0} />
</group>; };
const Cinturao: React.FC<{k: number; f: number}> = ({k, f}) => <group rotation={[0.25, 0, 0.1]}>
  {[1.5, 1.8, 2.1].map((r, i) => <mesh key={i} rotation={[Math.PI / 2, 0, f * 0.003 * (i + 1)]} scale={[1, 1, 0.5]}><torusGeometry args={[r, 0.12 + i * 0.03, 24, 160]} /><meshBasicMaterial color={['#ff6ab0', '#c86aff', '#ffb06a'][i]} transparent opacity={0.28 * k} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} /></mesh>)}
</group>;

// ---------- cenas ----------
const S1: React.FC = () => { const d = useD(); return <C3>{(f) => { const fl = interpolate(f, [8, 12, d], [0, 1, 0.3], cl); return <>
  <Cam pos={[0, 0.6, 5]} alvo={[0, 6, -20]} tremor={fl * 0.02} /><ambientLight intensity={0.1 + fl * 0.6} /><Ceu cima={mix('#02040a', '#c8d0ff', fl * 0.45)} baixo={mix('#0a1428', '#8aa0d8', fl * 0.4)} /><Estrelas sem="s1" />
  <Viva n={80} tam={60} pos={[0, -0.2, -10]} h={(x, z) => Math.sin(x * 0.8 + f * 0.05) * 0.05 + Math.sin(z + f * 0.04) * 0.04} mat={<meshStandardMaterial color="#0a1a2a" roughness={0.2} metalness={0.5} />} />
  <Brilho pos={[0, 14, -40]} s={4 + fl * 14} cor="#ffffff" o={fl} />
  <Pos bloom={1.4} /></>; }}</C3>; };
const S2: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.2, 6]} alvo={[0, 0, 0]} /><Estrelas sem="s2" n={3000} />
  {LAT(100).map((i) => { const a = random('pa' + i) * Math.PI * 2, r = 0.6 + random('pr' + i) * 2.2; const k = pr(f, 0, 50, Easing.in(Easing.cubic)); return <Brilho key={i} pos={[Math.cos(a) * r * (1 - k), Math.sin(a) * r * (1 - k), 0]} s={0.18} cor="#ffe8c0" o={0.9} />; })}
  <Brilho pos={[0, 0, 0]} s={pr(f, 40, 60) * 3} cor="#ffffff" o={1} />
  <Pos bloom={1.2} /></>}</C3>;
const S3: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d * 0.7); const top = v(16.7, -169.5, 1.06); const base = v(16.7, -169.5, 1.0); return <>
  <Cam pos={camLL(10, -160, 5.2)} /><Luzes sol={[-4, 2, 4]} i={1.6} amb={0.15} /><Estrelas sem="s3" />
  <TerraN tex={tex} luz={0.6} />
  <Tubo pts={[V(base), V(base.clone().lerp(top, k))]} r={0.008} cor="#ffd23f" brilho={1.6} />
  {LAT(5).map((i) => { const p = base.clone().lerp(top, i / 4); return <Brilho key={i} pos={V(p)} s={0.03} cor="#ffd23f" o={k > i / 4 ? 1 : 0} />; })}
  <Brilho pos={V(top)} s={0.4} cor="#ffffff" o={k > 0.95 ? 1 : 0} />
  <Pos bloom={1} /></>; }}</C3>; };
const S4: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1, 6]} alvo={[0, 2.5, -10]} /><ambientLight intensity={0.55} /><directionalLight position={[-4, 6, -6]} intensity={0.8} color="#9ab8ff" /><Ceu cima="#020308" baixo="#0a1430" /><Estrelas sem="s4" />
  <Viva n={80} tam={60} pos={[0, -0.1, -12]} h={(x, z) => Math.sin(x * 0.8 + f * 0.05) * 0.04} mat={<meshStandardMaterial color="#0a1420" roughness={0.2} metalness={0.5} />} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1]}><planeGeometry args={[30, 6]} /><meshStandardMaterial color="#2a2418" /></mesh>
  {LAT(4).map((i) => <Palmeira key={i} pos={[-4 + i * 2.6, 0, 0.5 - (i % 2)]} f={f} s={1.6} />)}
  <Brilho pos={[0, 12, -40]} s={4} cor="#ffffff" o={0.3} />
  <Pos bloom={0.8} /></>}</C3>;
const S5: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); const cor = k < 0.5 ? mix('#0a1430', ROSA, k * 2) : mix(ROSA, '#c81a1a', (k - 0.5) * 2); return <>
  <Cam pos={[0, 1, 6]} alvo={[0, 3, -10]} /><ambientLight intensity={0.3} /><Ceu cima={mix('#04060c', cor, 0.6)} baixo={cor} />
  <Viva n={80} tam={60} pos={[0, -0.1, -12]} h={(x, z) => Math.sin(x * 0.7 + f * 0.05) * 0.05} mat={<meshStandardMaterial color={mix('#0a1420', cor, 0.4)} roughness={0.15} metalness={0.5} />} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.5]}><planeGeometry args={[30, 6]} /><meshStandardMaterial color="#1a1410" /></mesh>
  {LAT(3).map((i) => <Palmeira key={i} pos={[-3.5 + i * 3.2, 0, 1 - (i % 2)]} f={f} s={1.8} />)}
  <Pos bloom={0.9} /></>; }}</C3>; };
const S6: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d); const c = camLL(-10, -175 + f * 0.1, 5.4); return <>
  <Cam pos={c} /><Luzes sol={[-c[0], 0.5, -c[2]]} i={1} amb={0.04} /><Estrelas sem="s6" />
  <TerraN tex={tex} />
  <Calota la={16.7} lo={-169.5} ang={0.1 + k * 0.3} cor="#ff3a3a" o={0.4} r={1.03} />
  <Calota la={-30} lo={-175} ang={0.18 * k} cor="#ff4a6a" o={0.5} r={1.032} />
  <Pos bloom={1.1} /></>; }}</C3>; };
const S7: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[2.4 - f * 0.01, 1.4, 6]} alvo={[0, 2, -6]} /><ambientLight intensity={0.35} /><Ceu cima="#02030a" baixo="#141a28" /><Estrelas sem="s7" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#0a0b0e" /></mesh>
  {LAT(10).map((i) => { const z = -i * 2.2; const apaga = f > d * 0.25 + i * 6; return <group key={i}>{[-1, 1].map((l) => <group key={l} position={[l * 2.2, 0, z]}>
    <mesh position={[0, 1.6, 0]}><cylinderGeometry args={[0.04, 0.06, 3.2, 8]} /><meshStandardMaterial color="#3a3a40" /></mesh>
    <mesh position={[-l * 0.3, 3.2, 0]}><boxGeometry args={[0.6, 0.06, 0.12]} /><meshStandardMaterial color="#3a3a40" /></mesh>
    {!apaga && <><Brilho pos={[-l * 0.5, 3.1, 0]} s={1.4} cor="#ffd890" o={0.9} /><pointLight position={[-l * 0.5, 3, 0]} intensity={2} color="#ffd890" distance={4} /></>}</group>)}</group>; })}
  <Pos bloom={0.9} /></>}</C3>; };
const S8: React.FC = () => <C3>{(f) => { const fa = (f % 20) < 3; return <>
  <Cam pos={[3, 3, 9]} alvo={[0, 2.8, 0]} /><ambientLight intensity={0.45} /><Ceu cima="#04050c" baixo="#141822" /><Estrelas sem="s8" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#0a0b0e" /></mesh>
  <mesh position={[0, 3, 0]}><cylinderGeometry args={[0.1, 0.5, 6, 4]} /><meshStandardMaterial color="#6a6a70" wireframe /></mesh>
  <mesh position={[0.6, 5.4, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.45, 0.45, 0.2, 24]} /><meshStandardMaterial color="#c8ccd0" /></mesh>
  <Brilho pos={[0.3, 5.4, 0.2]} s={fa ? 2 : 0.2} cor="#ffd8a0" o={fa ? 1 : 0.2} />
  {fa && <Nuvem n={60} sem={'s8' + Math.floor(f / 20)} origem={new THREE.Vector3(0.3, 5.4, 0.2)} t={f % 20 + 4} raio={1.2} cor="#ffe0a0" tam={0.06} o={0.9} add />}
  <mesh position={[-3, 1.2, -2]}><boxGeometry args={[1.6, 0.6, 0.4]} /><meshStandardMaterial color="#2a2a2e" emissive="#ff2a1a" emissiveIntensity={Math.floor(f / 8) % 2 ? 1.2 : 0.1} /></mesh>
  <Pos bloom={1} /></>; }}</C3>;
const S9: React.FC = () => { const d = useD(); return <C3>{(f, tex) => <>
  <Cam pos={[0, 1.4, lerp(3.6, 7, pr(f, 0, d))]} /><Luzes sol={[-3, 2, 4]} i={2.2} amb={0.1} /><Estrelas sem="s9" />
  <Terra tex={tex} rot={[0.3, f * 0.003, 0]} />
  <Cinturao k={pr(f, 4, d * 0.7)} f={f} />
  <Pos bloom={1.1} /></>}</C3>; };
const S10: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[-6 + f * 0.05, 0.6, 3.2]} alvo={[-4 + f * 0.05, 0, 0]} /><Luzes sol={[3, 3, 3]} i={2.2} amb={0.15} /><Estrelas sem="s10" />
  {LAT(15).map((i) => { const apaga = i % 3 === 2 && f > d * 0.3 + i * 2; return <group key={i} position={[-6 + i * 1.3, Math.sin(i) * 0.3, -0.5]}><Sat pos={[0, 0, 0]} s={0.35} rot={i} /><Brilho pos={[0, 0.25, 0]} s={0.3} cor={apaga ? '#ff3a2a' : '#7ad0ff'} o={apaga ? 0.3 : 0.9} /></group>; })}
  <Pos bloom={0.9} /></>}</C3>; };
const S11: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d, Easing.inOut(Easing.sin)); const a = lerp(-1.2, 0.6, k); return <>
  <Cam pos={[0, 2, 5.6]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2.2} amb={0.1} /><Estrelas sem="s11" />
  <Terra tex={tex} rot={[0.3, f * 0.003, 0]} r={0.9} />
  <Cinturao k={1} f={f} />
  <Telstar pos={[Math.cos(a) * 1.8, Math.sin(a) * 0.4 + 0.2, Math.sin(a) * 1.8]} s={0.18} f={f} />
  <Tubo pts={LAT(20).map((i) => { const b = lerp(-2.4, a, i / 19); return [Math.cos(b) * lerp(1, 1.8, Math.min(1, i / 10)), Math.sin(b) * 0.4 + 0.2, Math.sin(b) * lerp(1, 1.8, Math.min(1, i / 10))] as V3; })} r={0.01} cor="#ffffff" o={0.5} brilho={1.4} />
  <Pos bloom={1} /></>; }}</C3>; };
const S12: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0.8, 0.3, 2.4]} alvo={[0, 0, 0]} /><Luzes sol={[3, 2, 2]} i={2.2} amb={0.1} /><Estrelas sem="s12" />
  <Telstar f={f} falha={k} />
  <group position={[1.1, -0.6, 0]}><mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.35, 0.35, 0.06, 32]} /><meshStandardMaterial color="#1a1a20" /></mesh>
    <group position={[0, 0, 0.04]} rotation={[0, 0, lerp(1.2, -1.5, Math.min(1, k * 2.5)) + (k > 0.4 ? Math.sin(f * 1.5) * 0.08 : 0)]}><mesh position={[0, 0.14, 0]}><boxGeometry args={[0.02, 0.28, 0.01]} /><meshBasicMaterial color="#ff3a2a" /></mesh></group></group>
  <mesh position={[0, 0, 0]} scale={1.6}><sphereGeometry args={[1, 32, 32]} /><meshBasicMaterial color="#ff6ab0" transparent opacity={0.08} side={THREE.BackSide} /></mesh>
  <Pos bloom={1} /></>; }}</C3>; };
const S13: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.6, 1.1, 1.8]} alvo={[0, 0.5, 0]} /><ambientLight intensity={0.3} /><pointLight position={[-0.5, 1.6, 1]} intensity={3} color="#ffd8a0" distance={4} /><color attach="background" args={['#14100c']} />
  <mesh position={[0, -0.02, 0]}><boxGeometry args={[3, 0.04, 2]} /><meshStandardMaterial color="#4a3020" /></mesh>
  <mesh position={[0, 0.15, 0]}><boxGeometry args={[1, 0.3, 0.8]} /><meshStandardMaterial color="#1a1c20" metalness={0.5} roughness={0.4} /></mesh>
  {LAT(30).map((i) => <mesh key={i} position={[(i % 10 - 4.5) * 0.08, 0.32, 0.15 + Math.floor(i / 10) * 0.08]}><cylinderGeometry args={[0.03, 0.03, 0.02, 12]} /><meshStandardMaterial color="#d8d0c0" /></mesh>)}
  <mesh position={[0, 0.4, -0.3]} rotation={[Math.PI / 2, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 1.1, 24]} /><meshStandardMaterial color="#2a2a2e" /></mesh>
  <mesh position={[0, 0.75, -0.32]} rotation={[-0.15, 0, 0]}><planeGeometry args={[0.7, 0.75]} /><meshStandardMaterial color="#f4f0e6" side={THREE.DoubleSide} /></mesh>
  <Pos bloom={0.3} /></>}</C3>;
const S14: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d * 0.7); return <>
  <Cam pos={[0, 0.4, lerp(5.2, 6.4, pr(f, 0, d))]} /><Luzes sol={[-4, 2, 3]} i={1.2} amb={0.1} /><Estrelas sem="s14" />
  <Terra tex={tex} rot={[0.3, f * 0.002, 0]} nuvens={false} />
  {LAT(400).map((i) => { const la = (random('wl' + i) - 0.5) * 140, lo = random('wo' + i) * 360; const on = random('wk' + i) < k; return on ? <Brilho key={i} pos={V(v(la, lo, 1.01))} s={0.07} cor="#ff5a3a" o={0.95} /> : null; })}
  <Pos bloom={1.1} /></>; }}</C3>; };

const PLANO: K.Plano = [
  ['os estados unidos explodiram', S1], ['nove de julho', S1b], ['quatrocentos quilometros acima', S3], ['uma bomba de um', S2], ['no havai a quase', S4], ['e o ceu ficou', S5],
  ['ate na nova zelandia', S6], ['ai veio o pulso', S7], ['alarmes dispararam', S8], ['mas o pior ficou', S9], ['os satelites comecaram', S10],
  ['e um dia depois', S11], ['levou cem vezes', S12], ['o chefe da energia', S13], ['e foi so uma', S14],
];
function S1b() { return <C3>{(f) => <>
  <Cam pos={[0, 0, 5 - f * 0.01]} /><Estrelas sem="s1b" n={4000} />
  <Brilho pos={[0, 0.6, -2]} s={0.5 + Math.sin(f * 0.2) * 0.1} cor="#ffe8c0" o={0.9} />
  <Pos bloom={1} /></>}</C3>; }
const NEON: [string, string, string][] = [['nove de julho', 'no havai a quase', '09/07/1962 · STARFISH PRIME'], ['e um dia depois', 'o chefe da energia', 'TELSTAR 1']];
const Extra: React.FC = () => {
  const f = useCurrentFrame(); const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const n = NEON.find(([a, b]) => f >= at(a) && f < at(b));
  if (!n) return null;
  const s = interpolate(f - at(n[0]), [0, 6, 12], [0.6, 1.08, 1], {...cl, easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill><style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <div style={{position: 'absolute', top: 200, width: '100%', textAlign: 'center', transform: `scale(${s})`, fontFamily: FONTE, fontSize: n[2].length > 12 ? 62 : 110, color: '#fff', letterSpacing: 2,
      textShadow: '0 0 12px #39d8ff, 0 0 30px #1fb6ff, 0 0 60px #0a8cff, 0 6px 14px rgba(0,0,0,.8)'}}>{n[2]}</div></AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'starfish/narracao.mp3', 'e foi so uma', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
