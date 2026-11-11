// Short "E SE um GRÃO de AREIA BATESSE na TERRA a QUASE a VELOCIDADE da LUZ?" (lote 11/11/2026, 4 de 4, aprovado pelo dono). Tudo em Remotion 3D.
// Na tela (aprovado no roteiro): título do 1º segundo, dois contadores no canto (velocidade e energia) e a legenda. Sem selos nem thumb.
// Bola de fogo estilizada, sem pessoas nem cidade real. Energia: E = (γ−1)mc², m = 1 mg (conta da Pesquisas).
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Terra, Nuvem, pr, cl, THREE} from '../lote/kit3d';
import {NEON} from './Gelo';
import palavras from './grao.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const GRAO = (() => { const g = new THREE.IcosahedronGeometry(1, 1); const p = g.attributes.position as THREE.BufferAttribute; for (let i = 0; i < p.count; i++) { const k = 0.8 + random('gr' + i) * 0.35; p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * 0.85, p.getZ(i) * k); } g.computeVertexNormals(); return g; })();
const Grao: React.FC<{pos?: V3; s?: number; brilho?: number; f: number}> = ({pos = [0, 0, 0], s = 1, brilho = 0, f}) => <group position={pos}>
  <mesh geometry={GRAO} scale={s} rotation={[f * 0.02, f * 0.03, 0]}><meshStandardMaterial color="#d8b47a" roughness={0.7} flatShading emissive="#ffb060" emissiveIntensity={brilho} /></mesh>
  {brilho > 0 && <Brilho pos={[0, 0, 0]} s={s * (3 + brilho * 4)} cor="#ffd8a0" o={Math.min(1, brilho)} />}
</group>;
const Rastro: React.FC<{de: THREE.Vector3; dir: THREE.Vector3; L: number; cor?: string; n?: number}> = ({de, dir, L, cor = '#ffe0b0', n = 30}) => <>{Array.from({length: n}, (_, i) => { const p = de.clone().sub(dir.clone().normalize().multiplyScalar((i / n) * L)); return <Brilho key={i} pos={[p.x, p.y, p.z]} s={0.25 * (1 - i / n) + 0.04} cor={cor} o={0.9 * (1 - i / n)} />; })}</>;
const Caixote: React.FC<{pos: V3; s?: number}> = ({pos, s = 1}) => <group position={pos} scale={s}>
  <mesh><boxGeometry args={[0.36, 0.26, 0.26]} /><meshStandardMaterial color="#b0301e" roughness={0.6} /></mesh>
  <mesh position={[0, 0, 0.131]}><planeGeometry args={[0.28, 0.07]} /><meshBasicMaterial color="#f2d24a" /></mesh>
</group>;
const GRADE = (n: number, w: number) => Array.from({length: n}, (_, i) => [((i % w) - w / 2) * 0.4, 0.13 + Math.floor(i / (w * w)) * 0.28, ((Math.floor(i / w) % w) - w / 2) * 0.3] as V3);
const G130 = GRADE(130, 6);
// bola de fogo estilizada: esfera quente, anel de choque, coluna e poeira
const Fogo: React.FC<{k: number; f: number; s?: number; pos?: V3}> = ({k, f, s = 1, pos = [0, 0, 0]}) => <group position={pos} scale={s}>
  <mesh position={[0, 0.6 * k, 0]} scale={0.2 + k * 0.9}><sphereGeometry args={[1, 48, 48]} /><meshStandardMaterial color="#ffb040" emissive="#ff6a10" emissiveIntensity={2.4 - k} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} scale={0.3 + k * 3.4}><ringGeometry args={[0.92, 1, 64]} /><meshBasicMaterial color="#ffe0b0" transparent opacity={0.8 * (1 - k * 0.7)} /></mesh>
  <Nuvem n={260} sem={'fg' + s} origem={new THREE.Vector3(0, 0.1, 0)} t={f + 10} raio={2.6} cor="#8a5a3a" tam={0.5} o={0.45} dir={new THREE.Vector3(0, 0.6, 0)} />
  <Brilho pos={[0, 0.6 * k, 0.3]} s={4 + k * 3} cor="#ff9a40" o={0.8} />
</group>;

// ---------- cenas ----------
const S1: React.FC = () => <C3>{(f, tex) => { const p = new THREE.Vector3(2.2 - f * 0.03, 1.6 - f * 0.022, 1.2 - f * 0.012); return <>
  <Cam pos={[p.x + 1.2, p.y + 0.8, p.z + 3.4]} alvo={[0, 0, 0]} /><Luzes sol={[3, 2, 4]} i={2.4} amb={0.3} /><Estrelas sem="r1" />
  <Terra tex={tex} r={1} rot={[0.3, f * 0.002, 0]} />
  <Rastro de={p} dir={new THREE.Vector3(-0.03, -0.022, -0.012)} L={3} /><Brilho pos={[p.x, p.y, p.z]} s={0.5} cor="#ffffff" o={1} />
  <Pos bloom={1.2} /></>; }}</C3>;
// um grão grande, de um miligrama: macro com a régua de milímetros
const S2: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.3, 0.9, 2.6 - f * 0.006]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 4, 3]} i={2.4} amb={0.4} /><color attach="background" args={['#0c0a08']} />
  <Grao pos={[0, 0.3, 0]} s={0.32} f={f} />
  <mesh position={[0, -0.05, 0.5]}><boxGeometry args={[3, 0.04, 0.4]} /><meshStandardMaterial color="#e8dcc0" /></mesh>
  {Array.from({length: 16}, (_, i) => <mesh key={i} position={[-1.4 + i * 0.187, -0.025, 0.4 + (i % 5 ? 0.05 : 0)]}><boxGeometry args={[0.012, 0.005, i % 5 ? 0.12 : 0.22]} /><meshBasicMaterial color="#20202a" /></mesh>)}
  <Pos bloom={0.5} /></>}</C3>;
// impossível chegar na luz: o grão acelera rumo a um muro de luz e a distância só cai pela metade
const S3: React.FC = () => <C3>{(f) => { const x = 2.2 - 2.2 * (1 - Math.pow(0.5, f / 10)); return <>
  <Cam pos={[0, 0.6, 5]} alvo={[0, 0, 0]} /><color attach="background" args={['#020308']} /><ambientLight intensity={0.6} />
  <mesh position={[2.4, 0, 0]}><boxGeometry args={[0.08, 4, 3]} /><meshBasicMaterial color="#cfe8ff" /></mesh><Brilho pos={[2.4, 0, 0.2]} s={4} cor="#9fd0ff" o={0.6} />
  <Grao pos={[-x + 0.2, 0, 0]} s={0.12} brilho={0.6} f={f} /><Rastro de={new THREE.Vector3(-x + 0.2, 0, 0)} dir={new THREE.Vector3(1, 0, 0)} L={1.4} />
  <Pos bloom={1.2} /></>; }}</C3>;
// nada que tem massa chega lá: um feixe de luz passa voando pelo grão
const S4: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.2, 0.4, 3]} alvo={[0, 0, 0]} /><color attach="background" args={['#020308']} /><ambientLight intensity={0.6} /><Estrelas sem="r4" />
  <Grao pos={[f * 0.01, 0, 0]} s={0.14} brilho={0.4} f={f} />
  <Rastro de={new THREE.Vector3(-3 + f * 0.18, 0.25, 0)} dir={new THREE.Vector3(1, 0, 0)} L={2.4} cor="#bfe4ff" />
  <Pos bloom={1.3} /></>}</C3>;
// vamos chegando perto: túnel de luz, o grão à frente
const S5: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0, 2]} alvo={[0, 0, -5]} /><color attach="background" args={['#020308']} />
  {Array.from({length: 140}, (_, i) => { const a = random('ta' + i) * Math.PI * 2; const z = 2 - ((f * 0.35 + random('tz' + i) * 30) % 30); return <Brilho key={i} pos={[Math.cos(a) * 1.4, Math.sin(a) * 1.4, z]} s={0.3} cor={i % 3 ? '#9fd0ff' : '#ffd8a0'} o={0.8} />; })}
  <Grao pos={[0, -0.1, -1.6]} s={0.12} brilho={1} f={f} /><Pos bloom={1.3} /></>}</C3>;
// 99%: 130 toneladas de explosivo — caixotes aparecendo até 130
const S6: React.FC = () => <C3>{(f) => { const n = Math.floor(interpolate(f, [6, 110], [1, 130], cl)); return <>
  <Cam pos={[0, 2.2 + f * 0.01, 3.6 + f * 0.012]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 5, 3]} i={2.2} amb={0.45} /><color attach="background" args={['#14100c']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#3a3028" roughness={1} /></mesh>
  {G130.slice(0, n).map((p, i) => <Caixote key={i} pos={p} />)}
  <Grao pos={[1.9, 0.5, 1.2]} s={0.06} brilho={0.8} f={f} /><Pos bloom={0.8} /></>; }}</C3>;
// 99,99%: 1.500 toneladas — a pilha cresce até virar um prédio (câmera subindo)
const S7: React.FC = () => <C3>{(f) => { const h = Math.floor(interpolate(f, [0, 60], [4, 46], cl)); return <>
  <Cam pos={[2.6, 0.8 + f * 0.09, 4.4]} alvo={[0, 0.5 + f * 0.085, 0]} /><Luzes sol={[2, 5, 3]} i={2.2} amb={0.45} /><color attach="background" args={['#1a140e']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#3a3028" roughness={1} /></mesh>
  {Array.from({length: h}, (_, y) => Array.from({length: 9}, (_, i) => <Caixote key={y + '_' + i} pos={[((i % 3) - 1) * 0.4, 0.13 + y * 0.27, (Math.floor(i / 3) - 1) * 0.3]} />))}
  <Pos bloom={0.6} /></>; }}</C3>;
// mais dois noves: 15 mil toneladas — uma bola de fogo do tamanho de uma cidade, e o grão minúsculo ao lado
const S8: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 2.4, 9]} alvo={[0, 1.4, 0]} /><Luzes sol={[2, 5, 3]} i={1.4} amb={0.4} /><color attach="background" args={['#2a1408']} /><fog attach="fog" args={['#3a1a08', 8, 30]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#4a3424" roughness={1} /></mesh>
  <Fogo k={pr(f, 0, 40, Easing.out(Easing.cubic))} f={f} s={1.6} />
  <Grao pos={[-3.2, 0.3, 4]} s={0.08} brilho={1.4} f={f} /><Pos bloom={1.3} /></>}</C3>;
// a bomba de Hiroshima: a coluna sobe e abre em cogumelo (estilizado, sem cidade)
const S9: React.FC = () => <C3>{(f) => { const k = pr(f, 0, 36); return <>
  <Cam pos={[0, 1.2, 10]} alvo={[0, 3, 0]} /><Luzes sol={[2, 5, 3]} i={1.2} amb={0.4} /><color attach="background" args={['#3a1c0c']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#4a3424" roughness={1} /></mesh>
  <mesh position={[0, 2 * k, 0]}><cylinderGeometry args={[0.45, 0.9, 4 * k + 0.01, 24]} /><meshStandardMaterial color="#9a6a4a" emissive="#ff6a20" emissiveIntensity={0.6} /></mesh>
  <mesh position={[0, 4 * k + 0.4, 0]} scale={[1.6 + k, 0.9, 1.6 + k]}><sphereGeometry args={[1, 32, 24]} /><meshStandardMaterial color="#b07a52" emissive="#ff7a20" emissiveIntensity={1.3 - k * 0.7} /></mesh>
  <Brilho pos={[0, 4 * k + 0.4, 1]} s={7} cor="#ff9a40" o={0.6} /><Pos bloom={1.2} /></>; }}</C3>;
// num grão de areia: o grão sozinho, brilhando cada vez mais forte
const S10: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0, 1.6 - f * 0.012]} /><color attach="background" args={['#020205']} />
  <Grao s={0.22} brilho={0.3 + pr(f, 0, 30) * 2.2} f={f} /><Pos bloom={1.6} /></>}</C3>;
// mais dois noves: 150 mil toneladas — os caixotes viram uma montanha (câmera passando por cima)
const MONTE = Array.from({length: 900}, (_, i) => { const a = random('ma' + i) * Math.PI * 2, r = Math.sqrt(random('mr' + i)) * 4; const h = Math.max(0, 3.2 * (1 - r / 4)); return [Math.cos(a) * r, h * random('mh' + i), Math.sin(a) * r] as V3; });
const S11: React.FC = () => <C3>{(f) => { const n = Math.floor(interpolate(f, [0, 30], [200, 900], cl)); return <>
  <Cam pos={[-6 + f * 0.12, 6, 7]} alvo={[0, 1, 0]} /><Luzes sol={[2, 6, 3]} i={2.2} amb={0.45} /><color attach="background" args={['#1c1610']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#3a3028" roughness={1} /></mesh>
  {MONTE.slice(0, n).map((p, i) => <Caixote key={i} pos={p} s={1.3} />)}
  <Pos bloom={0.5} /></>; }}</C3>;
// treze noves: quase a Tsar Bomba — uma onda de luz gigante no céu (câmera de longe)
const S12: React.FC = () => <C3>{(f) => { const k = pr(f, 0, 120, Easing.out(Easing.quad)); return <>
  <Cam pos={[0, 2, 20]} alvo={[0, 6, 0]} /><color attach="background" args={[new THREE.Color('#05040a').lerp(new THREE.Color('#ffe8c0'), Math.max(0, 1 - f / 18) * 0.9).getStyle()]} /><ambientLight intensity={0.4} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[200, 200]} /><meshStandardMaterial color="#2a2018" roughness={1} /></mesh>
  <mesh position={[0, 6, 0]} scale={2 + k * 14}><sphereGeometry args={[1, 64, 32]} /><meshBasicMaterial color="#ffd8a0" transparent opacity={0.35 * (1 - k * 0.7)} side={THREE.BackSide} depthWrite={false} /></mesh>
  <mesh position={[0, 6, 0]} scale={1 + k * 3}><sphereGeometry args={[1, 48, 48]} /><meshBasicMaterial color="#fff2d0" /></mesh>
  <Brilho pos={[0, 6, 1]} s={20 + k * 20} cor="#ff9a40" o={0.8} /><Pos bloom={1.6} /></>; }}</C3>;
// nem chega no chão: o risco de luz descendo no céu, visto de baixo
const S13: React.FC = () => <C3>{(f) => { const p = new THREE.Vector3(-4 + f * 0.11, 10 - f * 0.12, -6); return <>
  <Cam pos={[0, 0.3, 4]} alvo={[0, 5, -6]} /><color attach="background" args={['#0a1630']} /><ambientLight intensity={0.5} /><Estrelas sem="r13" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#1a1e24" /></mesh>
  <Rastro de={p} dir={new THREE.Vector3(0.11, -0.12, 0)} L={6} /><Brilho pos={[p.x, p.y, p.z]} s={1.2} cor="#ffffff" o={1} />
  <Pos bloom={1.4} /></>; }}</C3>;
// explode no ar, a uns 30 km: o clarão no alto e a onda descendo (câmera abaixo, olhando para cima)
const S14: React.FC = () => <C3>{(f) => { const k = pr(f, 4, 110); const fl = Math.max(0, 1 - Math.abs(f - 6) / 20); return <>
  <Cam pos={[0, 0.3, 6]} alvo={[0, 6, -6]} /><color attach="background" args={[new THREE.Color('#0a1630').lerp(new THREE.Color('#ffe2b0'), fl).getStyle()]} /><ambientLight intensity={0.4 + fl} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#20242a" /></mesh>
  <Brilho pos={[0, 11, -8]} s={6 + fl * 14} cor="#fff0d0" o={0.9} />
  <mesh position={[0, 11, -8]} scale={1 + k * 12}><sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshBasicMaterial color="#ffd8a0" transparent opacity={0.4 * (1 - k)} side={THREE.DoubleSide} depthWrite={false} /></mesh>
  <Pos bloom={1.4} /></>; }}</C3>;
// e isso já acontece: uma partícula minúscula cruza o espaço rumo à Terra
const S15: React.FC = () => <C3>{(f, tex) => { const p = new THREE.Vector3(-1.4 + f * 0.05, 1.6 - f * 0.03, 1); return <>
  <Cam pos={[0, 0.4, 5]} /><Luzes sol={[3, 2, 4]} i={2.2} amb={0.3} /><Estrelas sem="r15" />
  <Terra tex={tex} r={0.8} pos={[0.4, -0.9, -1]} rot={[0.3, f * 0.003, 0]} />
  <Rastro de={p} dir={new THREE.Vector3(1, -0.6, 0)} L={1.4} cor="#bfe4ff" n={24} /><Brilho pos={[p.x, p.y, p.z]} s={0.18} cor="#ffffff" o={1} />
  <Pos bloom={1.2} /></>; }}</C3>;
// 1991: a partícula acende uma chuva de partículas na atmosfera, ao lado de uma bola de beisebol
const BOLA = (() => { const g = new THREE.SphereGeometry(0.35, 48, 48); return g; })();
const S16: React.FC = () => <C3>{(f) => { const k = pr(f, 0, 80); return <>
  <Cam pos={[0, 1.2, 6.5]} alvo={[0, 1.6, 0]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.4} /><color attach="background" args={['#06102a']} /><Estrelas sem="r16" />
  {Array.from({length: 180}, (_, i) => { const d = Math.floor(Math.log2(i + 1)); const t = Math.min(1, Math.max(0, (k * 1.6 - d * 0.1))); if (t <= 0) return null;
    const a = (random('ch' + i) - 0.5) * (0.25 + d * 0.09); const L = 1.4 + random('cl' + i) * 3.2; return <Brilho key={i} pos={[-0.4 + Math.sin(a) * t * L, 3.6 - Math.cos(a) * t * L, (random('cz' + i) - 0.5) * 0.6]} s={0.1 + 0.06 * (1 - t)} cor={i % 4 ? '#9fd0ff' : '#c8a0ff'} o={0.95 * (1 - t * 0.5)} />; })}
  {Array.from({length: 20}, (_, i) => <mesh key={'ar' + i} position={[0, 3.6 - i * 0.24, -2]}><planeGeometry args={[8, 0.01]} /><meshBasicMaterial color="#3a5a9a" transparent opacity={0.25} /></mesh>)}
  <Brilho pos={[-0.4, 3.6, 0]} s={0.6} cor="#ffffff" o={1} />
  <group position={[0.85, 0.4, 0.4]} rotation={[f * 0.05, f * 0.08, 0]}><mesh geometry={BOLA}><meshStandardMaterial color="#f4f0e6" roughness={0.6} /></mesh>
    {[1, -1].map((l) => <mesh key={l} rotation={[0, 0, l * 0.5]}><torusGeometry args={[0.352, 0.01, 6, 48, Math.PI]} /><meshBasicMaterial color="#d03a2a" /></mesh>)}</group>
  <Pos bloom={1.2} /></>; }}</C3>;
// tudo isso dentro de um pedacinho menor que um átomo: o átomo, e a partícula menor ainda (câmera mergulhando)
const S17: React.FC = () => <C3>{(f) => { const z = interpolate(f, [0, 70], [4.5, 1.2], {...cl, easing: Easing.inOut(Easing.cubic)}); return <>
  <Cam pos={[0, 0.3, z]} /><color attach="background" args={['#020208']} /><ambientLight intensity={0.6} /><pointLight position={[2, 2, 3]} intensity={8} />
  {[0, 1, 2].map((i) => <group key={i} rotation={[i * 1.05, i * 0.6, 0]}><mesh><torusGeometry args={[1.3, 0.008, 6, 96]} /><meshBasicMaterial color="#5a8ad0" /></mesh>
    <mesh position={[Math.cos(f * 0.08 + i * 2) * 1.3, Math.sin(f * 0.08 + i * 2) * 1.3, 0]}><sphereGeometry args={[0.05, 16, 16]} /><meshBasicMaterial color="#9fd0ff" /></mesh></group>)}
  {Array.from({length: 12}, (_, i) => <mesh key={i} position={[(random('nx' + i) - 0.5) * 0.18, (random('ny' + i) - 0.5) * 0.18, (random('nz' + i) - 0.5) * 0.18]}><sphereGeometry args={[0.07, 16, 16]} /><meshStandardMaterial color={i % 2 ? '#d84a3a' : '#c8c8d8'} /></mesh>)}
  <Brilho pos={[0.5 - f * 0.004, 0.2, 0.4]} s={0.08 + pr(f, 40, 90) * 0.25} cor="#ffffff" o={1} />
  <Pos bloom={1.2} /></>; }}</C3>;

const PLANO: K.Plano = [
  ['e se um grao', S1], ['um grao grande', S2], ['na velocidade da luz', S3], ['nada que tem massa', S4], ['entao vamos chegando', S5],
  ['a noventa e nove por cento', S6], ['a noventa e nove virgula', S7], ['com mais dois noves', S8], ['a bomba de hiroshima', S9], ['num grao de areia', S10],
  ['mais dois noves', S11], ['e com treze noves', S12], ['mas ele nem chega', S13], ['explode no ar', S14], ['e isso ja acontece', S15],
  ['em mil novecentos', S16], ['tudo isso dentro', S17],
];

// ---------- por cima: título e os dois contadores ----------
const ETAPAS: {frase: string; vel: string; t: number}[] = [
  {frase: 'a noventa e nove por cento', vel: '99%', t: 130}, {frase: 'a noventa e nove virgula', vel: '99,99%', t: 1500}, {frase: 'com mais dois noves', vel: '99,9999%', t: 15000},
  {frase: 'mais dois noves', vel: '99,999999%', t: 150000}, {frase: 'e com treze noves', vel: '99,99999999999%', t: 48000000},
];
const Extra: React.FC = () => {
  const f = useCurrentFrame();
  const T = TEMPO.T; const at = (frase: string) => T[PLANO.findIndex((p) => p[0] === frase)];
  const fim = at('mas ele nem chega');
  let k = -1; ETAPAS.forEach((e, i) => { if (f >= at(e.frase)) k = i; });
  const o = interpolate(f, [0, 3, 74, 84], [0, 1, 1, 0], cl);
  let box: React.ReactNode = null;
  if (k >= 0 && f < fim + 30) {
    const e = ETAPAS[k]; const ant = k > 0 ? ETAPAS[k - 1].t : 0; const ini = at(e.frase);
    const v = interpolate(f, [ini, ini + 24], [ant, e.t], {...cl, easing: Easing.out(Easing.cubic)});
    const ton = v >= 1e6 ? (v / 1e6).toFixed(0) + ' MILHÕES' : Math.round(v).toLocaleString('pt-BR');
    box = <div style={{position: 'absolute', top: 140, right: 50, padding: '12px 26px', borderRadius: 22, background: 'rgba(0,10,30,.6)', border: '3px solid #39d8ff', fontFamily: FONTE, fontWeight: 900, color: '#fff', textShadow: NEON, textAlign: 'right'}}>
      <div style={{fontSize: e.vel.length > 10 ? 46 : 62, color: '#bfe8ff'}}>⚡ {e.vel}</div>
      <div style={{fontSize: 70, color: k >= 2 ? '#ffd23f' : '#fff', marginTop: 6}}>💥 {ton} T</div></div>;
  }
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {o > 0 && <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', opacity: o, fontFamily: FONTE, fontWeight: 900, color: '#fff', textShadow: NEON}}>
      {['E SE UM', 'GRÃO DE AREIA', 'BATESSE NA TERRA?'].map((l, j) => <div key={j} style={{fontSize: j === 1 ? 130 : 96, lineHeight: 1.14, letterSpacing: 2}}>{l}</div>)}</div>}
    {box}
  </AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'grao/narracao.mp3', 'tudo isso dentro', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void cl;
