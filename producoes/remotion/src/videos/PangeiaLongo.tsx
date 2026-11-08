// Longo POV "Você acorda com UM SÓ CONTINENTE!" (1920x1080). Roteiro longo_pangeia_volta.md, aprovado pelo dono (07–08/11/2026).
// Tudo em Remotion 3D. Formato novo: só a legenda (menor), sem cartão escrito, canto ou selos; nomes de lugares em neon (exceção liberada para a Pangeia).
// O salto de tempo é um anel 3D de camadas de rocha no canto, que ganha uma camada a cada 50 milhões de anos. A cor dessatura de capítulo em capítulo e volta no "Mas espera".
// Reaproveita o globo com continentes móveis e os supercontinentes do Short (src/lote/pangeia3d.tsx, doc 57).
import React from 'react';
import {AbsoluteFill, interpolate, random, useVideoConfig, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Palavra, Final} from '../comum';
import {criarLongo, Cap} from '../longo';
import {Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Pedras, pr, cl, THREE, geoPedra} from '../lote/kit3d';
import {CP, Globo, Super, Rotulo, R3, v, camLL, qCfg, Cfg, PT} from '../lote/pangeia3d';
import palavras from './pangeialongo.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const ease = Easing.inOut(Easing.cubic);
const lerp3 = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const useD = () => useVideoConfig().durationInFrames;
// luz vinda de perto da câmera (um pouco acima e ao lado), para o globo nunca ficar no escuro
const solDe = (c: V3): V3 => { const p = new THREE.Vector3(...c).normalize(); const lado = new THREE.Vector3(0, 1, 0).cross(p).normalize(); return V(p.multiplyScalar(4).add(lado.multiplyScalar(2.2)).add(new THREE.Vector3(0, 1.6, 0))); };
const REP: Record<string, THREE.Texture> = {};
const rep = (t: THREE.Texture, n: number) => { const k = t.uuid + n; if (!REP[k]) { const c = t.clone(); c.wrapS = c.wrapT = THREE.RepeatWrapping; c.repeat.set(n, n); c.needsUpdate = true; REP[k] = c; } return REP[k]; };

// ---------- fábrica: globo com continentes móveis ----------
type Lab = {la: number; lo: number; txt: string; ini?: number; dy?: number; cont?: 'sa' | 'af' | 'na' | 'eu' | 'au' | 'an'; tam?: number};
type GOpt = {cfg?: Cfg; k?: [number, number]; ca: [number, number, number]; cb?: [number, number, number]; giro?: [number, number]; ne?: number; gu?: number; labs?: Lab[]; sol?: V3; amb?: number; oscila?: number; e?: (t: number) => number};
const G = (o: GOpt): React.FC => () => {
  const d = useD();
  const t = (f: number) => (o.e ?? ease)(Math.min(1, Math.max(0, f / Math.max(1, d - 1))));
  const kk = (f: number) => (o.oscila ? 0.5 - 0.5 * Math.cos(f / d * Math.PI * 2 * o.oscila) : interpolate(t(f), [0, 1], o.k ?? [0, 0]));
  const camF = (f: number) => { const cb = o.cb ?? o.ca; const x = t(f); return camLL(o.ca[0] + (cb[0] - o.ca[0]) * x, o.ca[1] + (cb[1] - o.ca[1]) * x, o.ca[2] + (cb[2] - o.ca[2]) * x); };
  return <CP rot={(f) => <>{(o.labs ?? []).map((l, i) => { const p = v(l.la, l.lo, 1.02); if (l.cont) p.applyQuaternion(qCfg(o.cfg ?? 'pangeia', l.cont, kk(f)));
    const g = interpolate(f, [0, d], o.giro ?? [0, 0]); p.applyAxisAngle(new THREE.Vector3(0, 1, 0), g);
    return <R3 key={i} cam={camF(f)} p={p} txt={l.txt} o={pr(f, l.ini ?? 4, (l.ini ?? 4) + 8)} dy={l.dy ?? -70} tam={l.tam ?? 60} />; })}</>}>{(f) => <>
    <Cam pos={camF(f)} /><Luzes sol={o.sol ?? solDe(camF(f))} i={2.4} amb={o.amb ?? 0.28} /><Estrelas sem={'g' + (o.ca.join('') + (o.k ?? []).join(''))} />
    <Globo cfg={o.cfg ?? 'pangeia'} k={kk(f)} nordeste={o.ne ?? 0} guine={o.gu ?? 0} giro={interpolate(f, [0, d], o.giro ?? [0, 0])} />
    <Pos bloom={0.7} /></>}</CP>;
};
// ---------- fábrica: supercontinente pronto ----------
type SOpt = {s: Cfg; ca: [number, number, number]; cb?: [number, number, number]; calor?: [number, number]; verde?: [number, number]; atm?: string; labs?: Lab[]; gelo?: [number, number]; extra?: (f: number, d: number) => React.ReactNode; amb?: number};
const SS = (o: SOpt): React.FC => () => {
  const d = useD();
  const x = (f: number) => ease(Math.min(1, f / Math.max(1, d - 1)));
  const camF = (f: number) => { const cb = o.cb ?? o.ca; const t = x(f); return camLL(o.ca[0] + (cb[0] - o.ca[0]) * t, o.ca[1] + (cb[1] - o.ca[1]) * t, o.ca[2] + (cb[2] - o.ca[2]) * t); };
  return <CP rot={(f) => <>{(o.labs ?? []).map((l, i) => <R3 key={i} cam={camF(f)} p={v(l.la, l.lo, 1.02)} txt={l.txt} o={pr(f, l.ini ?? 4, (l.ini ?? 4) + 8)} dy={l.dy ?? -70} tam={l.tam ?? 60} />)}</>}>{(f) => <>
    <Cam pos={camF(f)} /><Luzes sol={solDe(camF(f))} i={2.3} amb={o.amb ?? 0.28} /><Estrelas sem={'s' + o.s + o.ca.join('')} />
    <Super s={o.s} calor={o.calor ? interpolate(x(f), [0, 1], o.calor) : 0} verde={o.verde ? interpolate(x(f), [0, 1], o.verde) : 0} atmCor={o.atm} />
    {o.gelo && <mesh><sphereGeometry args={[1.012, 96, 48, 0, Math.PI * 2, 0, Math.PI * interpolate(x(f), [0, 1], o.gelo)]} /><meshStandardMaterial color="#eef6ff" emissive="#cfe0ff" emissiveIntensity={0.45} roughness={0.6} transparent opacity={0.92} /></mesh>}
    {o.extra && o.extra(f, d)}
    <Pos bloom={0.8} /></>}</CP>;
};

// ---------- peças ----------
const unhaGeo = (() => { const g = new THREE.SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2); g.scale(0.32, 0.07, 0.42); return g; })();
const Dedo: React.FC<{f: number; pos?: V3}> = ({f, pos = [0, 0, 0]}) => (
  <group position={pos}>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.45]}><capsuleGeometry args={[0.38, 1.3, 12, 24]} /><meshStandardMaterial color="#c48a68" roughness={0.6} /></mesh>
    <mesh geometry={unhaGeo} position={[0, 0.3, 0.1 + f * 0.0012]} scale={[1, 1, 1 + f * 0.005]}><meshStandardMaterial color="#f3d6cc" roughness={0.22} /></mesh>
  </group>
);
const Boneco: React.FC<{pos?: V3; s?: number; cor?: string; anda?: number; rot?: number}> = ({pos = [0, 0, 0], s = 1, cor = '#14181f', anda = 0, rot = 0}) => (
  <group position={pos} scale={s} rotation={[0, rot, 0]}>
    <mesh position={[0, 0.62, 0]}><capsuleGeometry args={[0.11, 0.34, 8, 16]} /><meshStandardMaterial color={cor} /></mesh>
    <mesh position={[0, 0.95, 0]}><sphereGeometry args={[0.1, 20, 20]} /><meshStandardMaterial color={cor} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.06, 0.25, 0]} rotation={[Math.sin(anda) * 0.6 * l, 0, 0]}><capsuleGeometry args={[0.045, 0.36, 6, 10]} /><meshStandardMaterial color={cor} /></mesh>)}
    {[-1, 1].map((l) => <mesh key={'b' + l} position={[l * 0.15, 0.65, 0]} rotation={[-Math.sin(anda) * 0.7 * l, 0, l * 0.15]}><capsuleGeometry args={[0.035, 0.3, 6, 10]} /><meshStandardMaterial color={cor} /></mesh>)}
  </group>
);
const Palmeira: React.FC<{pos: V3; s?: number; f: number}> = ({pos, s = 1, f}) => (
  <group position={pos} scale={s}>
    <mesh position={[0.05, 0.6, 0]} rotation={[0, 0, -0.12]}><cylinderGeometry args={[0.035, 0.06, 1.2, 8]} /><meshStandardMaterial color="#5a4030" /></mesh>
    {Array.from({length: 7}, (_, i) => <mesh key={i} position={[0.12, 1.2, 0]} rotation={[0.9 + Math.sin(f * 0.05 + i) * 0.05, i / 7 * Math.PI * 2, 0]}><boxGeometry args={[0.06, 0.008, 0.6]} /><meshStandardMaterial color="#2f5a2a" /></mesh>)}
  </group>
);
// relevo genérico (montanhas, dunas, fundo do mar)
const relevo = (n: number, amp: (x: number, z: number, i: number) => number, tam = 8) => { const g = new THREE.PlaneGeometry(tam, tam, n, n); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) p.setY(i, amp(p.getX(i), p.getZ(i), i)); g.computeVertexNormals(); return g; };
const DORSAL = relevo(180, (x, z, i) => Math.exp(-(x * x) / 0.25) * 0.5 - Math.abs(x) * 0.04 + (Math.sin(z * 5 + x * 2) + Math.sin(z * 13)) * 0.02 + (random('dl' + i) - 0.5) * 0.02 - (Math.abs(x) < 0.08 ? 0.15 : 0), 8);
const DUNAS = relevo(160, (x, z) => Math.sin(x * 1.3 + z * 0.4) * 0.12 + Math.sin(z * 2.1 - x * 0.7) * 0.07, 14);
const COLINAS = relevo(140, (x, z) => Math.max(-0.05, Math.sin(x * 0.9) * Math.cos(z * 0.7) * 0.35 + Math.sin(x * 2.3 + z) * 0.08) - (z < -2 ? (z + 2) * 0.4 : 0), 12);

// ---------- GANCHO ----------
const H1: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.9, 0.95, 1.6 + f * 0.004]} alvo={[0, 0.3, 0.2]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.4} /><color attach="background" args={['#120c09']} />
  <Dedo f={f} /><Brilho pos={[0, 0.4, 0.4]} s={0.8} cor="#ffd8b0" o={0.12} />
  <Pos bloom={0.6} /></>}</CP>;
const H2 = G({ca: [8, -30, 3.4], cb: [8, -20, 3.3], k: [0, 0.03], giro: [0, 0.05]});
const H3 = G({ca: [20, -10, 3.6], cb: [30, 10, 3.4], k: [0, 1], e: Easing.in(Easing.cubic)});
// dormir e acordar a cada 50 milhões de anos: o globo girando como um relógio, dia e noite piscando
const H4: React.FC = () => <CP>{(f) => { const g = f * f * 0.0009; return <>
  <Cam pos={[0, 0.6, 3.3]} /><ambientLight intensity={0.12 + 0.18 * (0.5 + 0.5 * Math.sin(g * 4))} /><directionalLight position={[Math.cos(g * 3) * 4, 1, Math.sin(g * 3) * 4]} intensity={2.4} /><Estrelas sem="h4" />
  <Globo k={pr(f, 0, 170) * 0.5} giro={g} /><Pos bloom={0.6} /></>; }}</CP>;
const H5 = SS({s: 'ultima', ca: [10, 10, 3.6], cb: [15, 40, 3.2], calor: [0, 0.9]});
// sobra um continente só, laranja, com uma silhueta minúscula na borda
const H6: React.FC = () => <CP>{(f) => <>
  <Cam pos={V(v(14, 6, 1.32 + f * 0.004))} alvo={V(v(4, 2, 0.95))} /><Luzes sol={[3, 2, 3]} i={2.4} amb={0.3} /><Estrelas sem="h6" />
  <Super s="ultima" calor={0.9} atmCor="1.0,0.5,0.2" />
  <group position={V(v(4, 2, 1.0))} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v(4, 2))}><Boneco s={0.03} /></group>
  <Pos bloom={1} /></>}</CP>;
const H7: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0, 3.4 + f * 0.06]} /><Luzes sol={[2, 2, 4]} i={2} amb={0.2} /><Estrelas sem="h7" />
  <Super s="pangeia" esc={1} giro={f * 0.01} /><Pos bloom={0.5} /></>}</CP>;
// um mapa que termina diferente: um globo saindo da sombra com o nascer do Sol
const H8: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.2, 3.2]} /><ambientLight intensity={0.03} /><directionalLight position={[Math.cos(-1.6 + f * 0.012) * 5, 0.5, Math.sin(-1.6 + f * 0.012) * 5]} intensity={2.6} /><Estrelas sem="h8" />
  <Super s="aurica" giro={2.5} /><Pos bloom={0.8} /></>}</CP>;

// ---------- CAP 1 · o chão que anda ----------
const PRAIA_AREIA = '#d8bf8a';
const C1a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-0.4 + f * 0.003, 0.55, 2.6]} alvo={[0.2, 0.3, -3]} /><Luzes sol={[-1, 1.2, -6]} i={2.6} amb={0.45} /><color attach="background" args={['#f1a35e']} /><fog attach="fog" args={['#f0b07a', 6, 22]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2]}><planeGeometry args={[30, 8]} /><meshStandardMaterial color={PRAIA_AREIA} roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -10]}><planeGeometry args={[60, 24]} /><meshStandardMaterial color="#2a6e8e" roughness={0.15} metalness={0.3} /></mesh>
  {Array.from({length: 4}, (_, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, -1.8 + ((f * 0.01 + i * 0.25) % 1) * 0.6]}><planeGeometry args={[30, 0.04]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.5 * (1 - ((f * 0.01 + i * 0.25) % 1))} /></mesh>)}
  <mesh position={[-1, 1.4, -18]}><sphereGeometry args={[1.4, 32, 32]} /><meshBasicMaterial color="#ffd27a" /></mesh><Brilho pos={[-1, 1.4, -17]} s={9} cor="#ffb060" o={0.7} />
  <Palmeira pos={[-2.4, 0, 0.6]} f={f} s={1.3} /><Palmeira pos={[2.6, 0, 0.2]} f={f + 30} s={1.1} />
  <Pos bloom={0.7} /></>}</CP>;
const C1b: React.FC = () => <CP>{(f) => { const onda = (f * 0.012) % 1; return <>
  <Cam pos={[0.2, 0.42, 0.9 - f * 0.002]} alvo={[0, 0, -0.3]} /><Luzes sol={[-1, 2, -4]} i={2.4} amb={0.5} /><color attach="background" args={['#f3b27a']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 6]} /><meshStandardMaterial color={PRAIA_AREIA} roughness={1} /></mesh>
  {[[-0.15, 0.1], [0.15, -0.12]].map(([x, z], i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0.2]} position={[x, 0.002, z]} scale={[0.6, 1, 1]}><circleGeometry args={[0.14, 24]} /><meshStandardMaterial color="#b49a6a" /></mesh>)}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, -1.6 + onda * 1.2]}><planeGeometry args={[6, 1.4]} /><meshStandardMaterial color="#e8f4ff" transparent opacity={0.55 * (1 - onda)} roughness={0.1} /></mesh>
  <Pos bloom={0.5} /></>; }}</CP>;
const C1c = G({ca: [-2, -50, 3.0], cb: [6, 0, 3.0], labs: [{la: -10, lo: -50, txt: 'BRASIL', ini: 2}, {la: 8, lo: 18, txt: 'ÁFRICA', ini: 40}]});
// corte do chão: areia, crosta e a placa deslizando sobre o manto
const C1d: React.FC = () => <CP>{(f) => { const sl = f * 0.004; return <>
  <Cam pos={[2.4, 0.9, 3.2]} alvo={[0, -0.5, 0]} /><Luzes sol={[3, 4, 3]} i={2.2} amb={0.4} /><color attach="background" args={['#0d0a08']} />
  <group position={[sl, 0, 0]}>
    <mesh position={[0, 0.05, 0]}><boxGeometry args={[3, 0.1, 1.4]} /><meshStandardMaterial color={PRAIA_AREIA} roughness={1} /></mesh>
    <mesh position={[0, -0.35, 0]}><boxGeometry args={[3, 0.7, 1.4]} /><meshStandardMaterial color="#6a5a48" roughness={1} /></mesh>
    {Array.from({length: 7}, (_, i) => <mesh key={i} position={[-1.3 + i * 0.45, -0.35, 0.705]}><boxGeometry args={[0.02, 0.6, 0.01]} /><meshBasicMaterial color="#4a3c30" /></mesh>)}
  </group>
  <mesh position={[0, -1.15, 0]}><boxGeometry args={[4.2, 0.9, 1.4]} /><meshStandardMaterial color="#8a2c10" emissive="#ff4a10" emissiveIntensity={0.6} roughness={1} /></mesh>
  {Array.from({length: 10}, (_, i) => <Brilho key={i} pos={[-1.8 + ((i * 0.42 + f * 0.01) % 3.6), -1.1, 0.72]} s={0.18} cor="#ffb060" o={0.6} />)}
  <Boneco pos={[sl - 0.2, 0.1, 0.2]} s={0.35} />
  <Pos bloom={1} /></>; }}</CP>;
// a dorsal meso-atlântica no fundo do mar, com a fenda acesa
const C1e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.6, 0.9, 3 - f * 0.01]} alvo={[0, 0.1, -1]} /><Luzes sol={[1, 5, 3]} i={1.8} amb={0.7} /><color attach="background" args={['#04121e']} /><fog attach="fog" args={['#062236', 1.5, 8]} />
  <mesh geometry={DORSAL}><meshStandardMaterial color="#3a3a40" roughness={1} flatShading /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}><planeGeometry args={[0.07, 8]} /><meshBasicMaterial color="#ff6a20" /></mesh>
  {Array.from({length: 14}, (_, i) => <Brilho key={i} pos={[0, 0.25, -3.5 + i * 0.5]} s={0.4} cor="#ff7a30" o={0.6 + 0.3 * Math.sin(f * 0.2 + i)} />)}
  <Pos bloom={1.2} /></>}</CP>;
// a rocha derretida sobe e empurra as duas placas para os lados
const C1f: React.FC<{}> = () => <CP rot={(f) => <><Rotulo x={480} y={300} txt="AMÉRICA DO SUL" o={pr(f, 20, 30)} tam={52} /><Rotulo x={1440} y={300} txt="ÁFRICA" o={pr(f, 20, 30)} tam={52} /></>}>{(f) => { const a = 0.15 + f * 0.0025; return <>
  <Cam pos={[0, 0.5, 4.4]} alvo={[0, -0.3, 0]} /><Luzes sol={[2, 4, 4]} i={2} amb={0.4} /><color attach="background" args={['#06121c']} />
  <mesh position={[-1.55 - a, 0, 0]}><boxGeometry args={[3, 0.5, 1.4]} /><meshStandardMaterial color="#5a5048" roughness={1} /></mesh>
  <mesh position={[1.55 + a, 0, 0]}><boxGeometry args={[3, 0.5, 1.4]} /><meshStandardMaterial color="#544a42" roughness={1} /></mesh>
  <mesh position={[0, -0.4, 0]}><boxGeometry args={[2 * a + 0.05, 1.3, 1.3]} /><meshStandardMaterial color="#ff5a10" emissive="#ff5a10" emissiveIntensity={1.6} /></mesh>
  <mesh position={[0, -1.3, 0]}><boxGeometry args={[8, 0.6, 1.4]} /><meshStandardMaterial color="#6a1e08" emissive="#ff3a08" emissiveIntensity={0.5} /></mesh>
  {Array.from({length: 16}, (_, i) => { const t = ((f * 0.02 + i / 16) % 1); return <Brilho key={i} pos={[(random('mg' + i) - 0.5) * a * 2, -1.1 + t * 1.3, 0.3]} s={0.14} cor="#ffd080" o={1 - t} />; })}
  <Pos bloom={1.2} /></>; }}</CP>;
// a unha cresce o mesmo tanto que a fenda abre
const C1g: React.FC = () => <CP>{(f) => { const g = f * 0.0018; return <>
  <Cam pos={[0.2, 1.4, 3.6]} alvo={[0.2, 0.1, 0]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.4} /><color attach="background" args={['#14100c']} />
  <Dedo f={f * 0.36} pos={[-1.2, 0.2, 0]} />
  <mesh position={[1.5 - 0.35 - g, 0, 0]}><boxGeometry args={[0.7, 0.3, 1]} /><meshStandardMaterial color="#5a5048" /></mesh>
  <mesh position={[1.5 + 0.35 + g, 0, 0]}><boxGeometry args={[0.7, 0.3, 1]} /><meshStandardMaterial color="#544a42" /></mesh>
  <mesh position={[1.5, -0.05, 0]}><boxGeometry args={[2 * g + 0.01, 0.2, 0.95]} /><meshStandardMaterial color="#ff5a10" emissive="#ff5a10" emissiveIntensity={1.4} /></mesh>
  <Pos bloom={0.9} /></>; }}</CP>;
// Atlântico devagar, Pacífico rápido: duas esteiras de fundo do mar
const LISTRAS = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 16; const g = c.getContext('2d')!; for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? '#3a4656' : '#56657a'; g.fillRect(i * 16, 0, 16, 16); } const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t; })();
const C1h: React.FC = () => <CP rot={(f) => <><Rotulo x={960} y={330} txt="ATLÂNTICO" o={pr(f, 4, 12)} tam={52} /><Rotulo x={960} y={760} txt="PACÍFICO" o={pr(f, 16, 24)} tam={52} /></>}>{(f) => { LISTRAS.offset.x = 0; return <>
  <Cam pos={[0, 0, 4]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.5} /><color attach="background" args={['#05101a']} />
  <group position={[0, 0.55, 0]}>{Array.from({length: 24}, (_, i) => <mesh key={i} position={[-3.3 + ((i * 0.3 + f * 0.002) % 7.2), 0, 0]}><boxGeometry args={[0.28, 0.4, 0.2]} /><meshStandardMaterial color={i % 2 ? '#3a4656' : '#56657a'} /></mesh>)}</group>
  <group position={[0, -0.55, 0]}>{Array.from({length: 24}, (_, i) => <mesh key={i} position={[-3.3 + ((i * 0.3 + f * 0.012) % 7.2), 0, 0]}><boxGeometry args={[0.28, 0.4, 0.2]} /><meshStandardMaterial color={i % 2 ? '#2a3a5a' : '#46608a'} /></mesh>)}</group>
  <Pos bloom={0.4} /></>; }}</CP>;
void LISTRAS;
// multiplica por milhões de anos: camadas de rocha se empilhando rápido
const C1i: React.FC = () => <CP>{(f) => { const n = Math.min(40, Math.floor(f * 0.35)); return <>
  <Cam pos={[2.2, 1.2 + n * 0.02, 3.2]} alvo={[0, n * 0.03, 0]} /><Luzes sol={[3, 5, 2]} i={2.2} amb={0.35} /><color attach="background" args={['#0c0a08']} />
  {Array.from({length: n}, (_, i) => <mesh key={i} position={[0, i * 0.06, 0]}><boxGeometry args={[2, 0.058, 1.2]} /><meshStandardMaterial color={new THREE.Color().setHSL(0.07 + random('cm' + i) * 0.05, 0.35, 0.25 + random('cl' + i) * 0.25)} roughness={1} /></mesh>)}
  <Pos bloom={0.3} /></>; }}</CP>;
const C1j = G({cfg: 'pangeia', ca: [10, -25, 3.3], cb: [0, -10, 3.1], k: [1, 0], labs: [{la: 0, lo: -25, txt: 'OCEANO NASCENDO', ini: 20, dy: -40, tam: 50}]});
const C1k = G({cfg: 'novo', ca: [20, -160, 3.3], cb: [15, 175, 3.2], k: [0, 0.75], labs: [{la: 5, lo: -150, txt: 'PACÍFICO', ini: 6, dy: 0}]});

// ---------- CAP 2 · o quebra-cabeça ----------
const C2a = G({ca: [0, -22, 2.6], cb: [-2, -14, 2.3], ne: 0.6, gu: 0.6, labs: [{la: -7, lo: -39, txt: 'NORDESTE', ini: 8, dy: 60, cont: 'sa'}, {la: 10, lo: 10, txt: 'ÁFRICA', ini: 30}]});
const C2b = G({ca: [2, -18, 2.4], cb: [2, -10, 2.2], oscila: 1.2, ne: 1, gu: 0.4});
const C2c = G({ca: [3, -5, 1.9], cb: [1, -4, 1.7], k: [0.92, 1], ne: 1, gu: 1});
// 1965: computador antigo desenhando os contornos e encaixando as peças
const CRT = (() => { const c = document.createElement('canvas'); c.width = 512; c.height = 384; return c; })();
const CRT_T = new THREE.CanvasTexture(CRT);
const desenhaCRT = (pt: PT, k: number) => {
  const g = CRT.getContext('2d')!; g.fillStyle = '#021006'; g.fillRect(0, 0, 512, 384);
  const img = (pt.m_sa.image as HTMLImageElement); const img2 = (pt.m_af.image as HTMLImageElement);
  g.save(); g.globalCompositeOperation = 'lighter'; g.filter = 'brightness(1)';
  // recorte do Atlântico sul na textura das máscaras (2048x1024): lon −90..+50, lat +20..−60
  const sx = (90) / 360 * 2048, sy = (90 - 20) / 180 * 1024, sw = 140 / 360 * 2048, sh = 80 / 180 * 1024;
  g.globalAlpha = 0.9; g.drawImage(img, sx, sy, sw, sh, 0 + k * 150, 0 - k * 30, 512, 384 * 0.98);
  g.drawImage(img2, sx, sy, sw, sh, 0, 0, 512, 384 * 0.98); g.restore();
  g.globalCompositeOperation = 'multiply'; g.fillStyle = '#20ff60'; g.fillRect(0, 0, 512, 384); g.globalCompositeOperation = 'source-over';
  for (let y = 0; y < 384; y += 4) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, y, 512, 2); }
  CRT_T.needsUpdate = true;
};
const C2d: React.FC = () => <CP>{(f, _t, pt) => { desenhaCRT(pt, interpolate(f, [20, 160], [0, 1], {...cl, easing: ease})); return <>
  <Cam pos={[0.6 - f * 0.002, 0.25, 2.6 - f * 0.004]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 3, 3]} i={1.4} amb={0.3} /><color attach="background" args={['#0b0d0c']} />
  <mesh position={[0, 0.1, -0.25]}><boxGeometry args={[1.5, 1.2, 0.9]} /><meshStandardMaterial color="#c9c0a8" roughness={0.7} /></mesh>
  <mesh position={[0, 0.12, 0.205]}><planeGeometry args={[1.1, 0.82]} /><meshBasicMaterial map={CRT_T} /></mesh>
  <mesh position={[0, -0.62, 0.3]}><boxGeometry args={[1.4, 0.06, 0.5]} /><meshStandardMaterial color="#a89e88" /></mesh>
  {Array.from({length: 6}, (_, i) => <mesh key={i} position={[1.3, -0.4 + i * 0.18, -0.2]}><boxGeometry args={[0.6, 0.12, 0.8]} /><meshStandardMaterial color="#8a8270" /></mesh>)}
  {Array.from({length: 6}, (_, i) => <Brilho key={i} pos={[1.03, -0.4 + i * 0.18, 0.21]} s={0.05} cor={random('ld' + i + Math.floor(f / 6)) > 0.5 ? '#ff4a2a' : '#3aff7a'} o={0.9} />)}
  <Brilho pos={[0, 0.12, 0.3]} s={1.4} cor="#30ff70" o={0.12} />
  <Pos bloom={0.9} /></>; }}</CP>;
// as rochas mais antigas, em camadas, se juntando
const CRISTAL = (() => { const g = new THREE.IcosahedronGeometry(0.5, 1); const p = g.attributes.position as THREE.BufferAttribute; for (let i = 0; i < p.count; i++) { const k = 1 + (random('cr' + Math.round(p.getX(i) * 50) + Math.round(p.getY(i) * 50)) - 0.5) * 0.25; p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * 0.8, p.getZ(i) * k); } g.computeVertexNormals(); return g; })();
const C2e: React.FC = () => <CP rot={(f) => <><Rotulo x={620} y={330} txt="SÃO LUÍS" o={pr(f, 30, 38)} tam={54} /><Rotulo x={1320} y={330} txt="OESTE AFRICANO" o={pr(f, 50, 58)} tam={54} /></>}>{(f) => { const d = interpolate(f, [0, 110], [0.9, 0.36], {...cl, easing: ease}); return <>
  <Cam pos={[0, 0.5, 3.4 - f * 0.004]} alvo={[0, 0, 0]} /><Luzes sol={[2, 3, 4]} i={2.4} amb={0.3} /><color attach="background" args={['#0a0807']} />
  <mesh geometry={CRISTAL} position={[-d, 0, 0]} rotation={[0.2, f * 0.006, 0]}><meshStandardMaterial color="#8a6e5a" roughness={0.8} flatShading /></mesh>
  <mesh geometry={CRISTAL} position={[d, 0, 0]} rotation={[0.2, -f * 0.006 + 1, 0.3]}><meshStandardMaterial color="#7e6a58" roughness={0.8} flatShading /></mesh>
  {d < 0.4 && <Brilho pos={[0, 0, 0.3]} s={1.2} cor="#ffcf80" o={0.5} />}
  <Pos bloom={0.9} /></>; }}</CP>;
const C2f = SS({s: 'pangeia', ca: [0, -10, 2.0], cb: [5, 5, 2.4], labs: [{la: -5, lo: -12, txt: 'O MESMO CHÃO', ini: 12, dy: -60, tam: 54}]});
// "apertar o mapa": o globo apertado entre duas mãos de luz
const C2g: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 60); return <>
  <Cam pos={[0, 0.2, 3.6]} /><Luzes sol={[2, 2, 4]} i={2.3} amb={0.28} /><Estrelas sem="c2g" />
  <group scale={[1 - 0.05 * k, 1, 1]}><Globo k={k * 0.25} giro={0.6} /></group>
  {[-1, 1].map((l) => <mesh key={l} position={[l * (2.2 - k * 0.6), 0, 0]}><boxGeometry args={[0.15, 1.8, 1.2]} /><meshBasicMaterial color="#7fdcff" transparent opacity={0.35} /></mesh>)}
  {[-1, 1].map((l) => <Brilho key={'b' + l} pos={[l * (2.2 - k * 0.6), 0, 0.2]} s={2} cor="#7fdcff" o={0.35} />)}
  <Pos bloom={1} /></>; }}</CP>;
const C2h = G({ca: [10, -30, 2.4], cb: [5, -18, 2.1], k: [0.25, 0.9], labs: [{la: 15, lo: -40, txt: 'ATLÂNTICO', ini: 2, dy: 0}]});
const C2i = G({ca: [0, -10, 2.2], cb: [-2, -4, 2.0], k: [0.85, 1], ne: 1, gu: 1, labs: [{la: -7, lo: -39, txt: 'NORDESTE', ini: 2, dy: 60, cont: 'sa'}, {la: 3, lo: 3, txt: 'GOLFO DA GUINÉ', ini: 30, dy: -110, tam: 50}]});
// sair de casa e chegar na África andando: a silhueta atravessa a emenda
const C2j: React.FC = () => <CP>{(f) => { const x = -1.6 + f * 0.022; return <>
  <Cam pos={[x - 0.3, 0.8, 2.6]} alvo={[x + 0.4, 0.4, 0]} /><Luzes sol={[2, 4, 3]} i={2.4} amb={0.45} /><color attach="background" args={['#9cc0de']} /><fog attach="fog" args={['#a8c8e0', 4, 14]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0, 0]}><planeGeometry args={[6, 8]} /><meshStandardMaterial color="#5f7a38" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, 0, 0]}><planeGeometry args={[6, 8]} /><meshStandardMaterial color="#a5824e" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}><planeGeometry args={[0.12, 8]} /><meshBasicMaterial color="#ff8a3a" /></mesh>
  {Array.from({length: 8}, (_, i) => <Palmeira key={i} pos={[-5 + i * 0.5, 0, -2 - (i % 3)]} f={f + i * 10} s={0.8} />)}
  <Boneco pos={[x, 0, 0]} s={0.5} anda={f * 0.35} rot={Math.PI / 2} />
  <Pos bloom={0.6} /></>; }}</CP>;
const C2k = G({ca: [0, -20, 3.6], cb: [5, -15, 3.8], k: [1, 0], e: Easing.out(Easing.quad)});
// fecha devagar: uma ampulheta de areia escorrendo lenta
const C2l: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.3, 0.1, 2.6]} alvo={[0, 0, 0]} /><Luzes sol={[2, 3, 3]} i={2} amb={0.35} /><color attach="background" args={['#0e0b08']} />
  {[1, -1].map((s) => <mesh key={s} position={[0, s * 0.45, 0]} rotation={[s > 0 ? Math.PI : 0, 0, 0]}><coneGeometry args={[0.42, 0.9, 32, 1, true]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.22} roughness={0.05} side={THREE.DoubleSide} /></mesh>)}
  <mesh position={[0, 0.3, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.3 - f * 0.0004, 0.55, 32]} /><meshStandardMaterial color="#d6b67a" /></mesh>
  <mesh position={[0, -0.75, 0]}><coneGeometry args={[0.2 + f * 0.0006, 0.18, 32]} /><meshStandardMaterial color="#d6b67a" /></mesh>
  <mesh position={[0, -0.3, 0]}><cylinderGeometry args={[0.008, 0.008, 0.85, 8]} /><meshStandardMaterial color="#d6b67a" /></mesh>
  {[0.92, -0.92].map((y) => <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[0.5, 0.5, 0.06, 32]} /><meshStandardMaterial color="#5a3a22" /></mesh>)}
  <Pos bloom={0.4} /></>}</CP>;
// fecha os olhos: duas pálpebras escuras descem sobre o céu
const Palpebra: React.FC<{k: number; cor?: string}> = ({k, cor = '#05040a'}) => <>
  <mesh position={[0, 1.5 - k * 0.98, 1.8]}><planeGeometry args={[6, 1.2]} /><meshBasicMaterial color={cor} /></mesh>
  <mesh position={[0, -1.5 + k * 0.98, 1.8]}><planeGeometry args={[6, 1.2]} /><meshBasicMaterial color={cor} /></mesh>
</>;
const C2m: React.FC = () => <CP>{(f) => { const k = pr(f, 10, 80); return <>
  <Cam pos={[0, 0, 3]} /><color attach="background" args={['#6f8fb8']} /><ambientLight intensity={1} />
  {Array.from({length: 8}, (_, i) => <Brilho key={i} pos={[-2 + i * 0.6, 0.4 + Math.sin(i) * 0.3, -2]} s={1.4} cor="#ffffff" o={0.5} />)}
  <Palpebra k={k} /></>; }}</CP>;

// ---------- CAP 3 · +50 milhões de anos ----------
const C3a: React.FC = () => <CP>{(f) => { const k = 1 - pr(f, 0, 40); return <>
  <Cam pos={[0, 0, 3]} /><Luzes sol={[2, 2, 4]} i={2.3} amb={0.3} /><Estrelas sem="c3a" />
  <group position={[0, 0, -0.4]}><Globo cfg="ultima" k={0.2} giro={0.3 + f * 0.003} /></group>
  <Palpebra k={k} /><Pos bloom={0.6} /></>; }}</CP>;
const C3b = G({cfg: 'ultima', ca: [30, 0, 3.2], cb: [38, 16, 1.9], k: [0.2, 0.22], labs: [{la: 36, lo: 18, txt: 'MEDITERRÂNEO', ini: 30, dy: -50, tam: 54}]});
const C3c = G({cfg: 'amasia', ca: [38, 16, 2.0], cb: [40, 18, 1.8], k: [0, 0.22]});
// o mar espremido entre dois blocos, dobrando até virar cordilheira
const DOBRA = (k: number) => { const g = new THREE.PlaneGeometry(1.4, 2.6, 60, 60); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); p.setY(i, k * (Math.exp(-(x * x) / 0.08) * 0.9 * (0.6 + 0.4 * Math.sin(z * 4 + 1)) + (random('db' + i) - 0.5) * 0.05 * k)); } g.computeVertexNormals(); return g; };
const DOBRAS = Array.from({length: 11}, (_, i) => DOBRA(i / 10));
const C3d: React.FC = () => <CP>{(f) => { const k = pr(f, 10, 170); const w = 0.7 * (1 - k) + 0.05; return <>
  <Cam pos={[2.2, 1.6, 2.6]} alvo={[0, 0.2, 0]} /><Luzes sol={[3, 5, 2]} i={2.3} amb={0.4} /><color attach="background" args={['#86a7c8']} />
  <mesh position={[-w - 0.9, 0, 0]}><boxGeometry args={[1.8, 0.4, 2.6]} /><meshStandardMaterial color="#8a7a50" roughness={1} /></mesh>
  <mesh position={[w + 0.9, 0, 0]}><boxGeometry args={[1.8, 0.4, 2.6]} /><meshStandardMaterial color="#a08458" roughness={1} /></mesh>
  <mesh position={[0, 0.12, 0]}><boxGeometry args={[2 * w, 0.02, 2.6]} /><meshStandardMaterial color="#1f6a96" roughness={0.2} /></mesh>
  <mesh geometry={DOBRAS[Math.round(k * 10)]} position={[0, 0.18, 0]} scale={[Math.max(0.2, 1 - k * 0.3), 1, 1]}><meshStandardMaterial color="#7a6a54" roughness={1} flatShading /></mesh>
  <Pos bloom={0.3} /></>; }}</CP>;
const SERRA = relevo(150, (x, z, i) => Math.max(0, Math.exp(-(z * z) / 1.2) * (1.2 + Math.sin(x * 2.1) * 0.4 + Math.sin(x * 5.3) * 0.2) + (random('sr' + i) - 0.5) * 0.08), 10);
const C3e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-3 + f * 0.02, 1.1, 3.2]} alvo={[-1 + f * 0.02, 0.8, 0]} /><Luzes sol={[2, 5, 3]} i={2.4} amb={0.45} /><color attach="background" args={['#9ec0e0']} /><fog attach="fog" args={['#b0cce4', 4, 14]} />
  <mesh geometry={SERRA}><meshStandardMaterial color="#8a7a62" roughness={1} flatShading /></mesh>
  {[[-1.5, 1.05], [-0.4, 1.32], [0.9, 1.1], [2, 1.2]].map(([x, y], i) => <group key={i} position={[x, y, 0.1]} rotation={[0.3, i, 0.4]}>
    <mesh><boxGeometry args={[0.24, 0.06, 0.09]} /><meshStandardMaterial color={['#e8e2d4', '#c44a3a', '#3a6aa8', '#e8c040'][i]} /></mesh>
    <mesh position={[0, 0.08, 0]}><boxGeometry args={[0.01, 0.12, 0.01]} /><meshStandardMaterial color="#d8d0c0" /></mesh></group>)}
  {[[-1, 1.18], [0.3, 1.25], [1.5, 1.22]].map(([x, y], i) => <group key={'u' + i} position={[x, y, 0.3]}><mesh position={[0, 0.12, 0]}><coneGeometry args={[0.12, 0.06, 16]} /><meshStandardMaterial color={['#e05a4a', '#3ab0d0', '#f0c040'][i]} /></mesh><mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.004, 0.004, 0.12, 6]} /><meshStandardMaterial color="#ddd" /></mesh></group>)}
  <Pos bloom={0.3} /></>}</CP>;
const C3f = G({cfg: 'amasia', ca: [70, -100, 3.2], cb: [80, -60, 3.0], k: [0, 0.12], labs: [{la: 88, lo: 0, txt: 'POLO NORTE', ini: 8, dy: -40, tam: 50}]});
const C3g = G({cfg: 'amasia', ca: [78, -120, 3.4], cb: [82, -150, 3.2], k: [0.1, 0.75], labs: [{la: 60, lo: -100, txt: 'AMÉRICAS', ini: 6, cont: 'na', dy: 0}, {la: 60, lo: 100, txt: 'ÁSIA', ini: 40, cont: 'eu', dy: 0}]});
const C3h = SS({s: 'amasia', ca: [65, 0, 3.4], cb: [60, 40, 3.1], labs: [{la: 62, lo: 25, txt: 'AMÁSIA', ini: 3, dy: -40, tam: 72}]});
const C3i = G({cfg: 'amasia', ca: [55, -40, 3.4], cb: [50, 0, 3.4], oscila: 1.5});
// ainda tem espaço, mar e chuva: colinas verdes, mar ao fundo e chuva caindo
const C3j: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-1 + f * 0.01, 1.2, 4]} alvo={[0, 0.2, -2]} /><Luzes sol={[2, 5, 2]} i={1.8} amb={0.5} /><color attach="background" args={['#8fa8bf']} /><fog attach="fog" args={['#9fb3c6', 4, 16]} />
  <mesh geometry={COLINAS}><meshStandardMaterial color="#4f7f3c" roughness={1} flatShading /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, -5]}><planeGeometry args={[30, 10]} /><meshStandardMaterial color="#2a5c7c" roughness={0.2} /></mesh>
  {Array.from({length: 9}, (_, i) => <Brilho key={i} pos={[-4 + i, 2.6 + Math.sin(i) * 0.2, -2 - (i % 3)]} s={2.2} cor="#d8dee6" o={0.55} />)}
  {Array.from({length: 120}, (_, i) => <mesh key={'r' + i} position={[(random('rx' + i) - 0.5) * 8, 2.4 - ((f * 0.06 + random('ry' + i) * 2.4) % 2.4), -0.5 - random('rz' + i) * 3]}><boxGeometry args={[0.006, 0.12, 0.006]} /><meshBasicMaterial color="#cfe0f0" transparent opacity={0.6} /></mesh>)}
  <Pos bloom={0.3} /></>}</CP>;
// mas aí… a noite cai sobre as colinas
const C3k: React.FC = () => <CP>{(f) => { const n = pr(f, 0, 70); return <>
  <Cam pos={[0.5, 1.4, 4.2]} alvo={[0, 0.3, -2]} /><ambientLight intensity={0.5 - 0.42 * n} /><directionalLight position={[3, 3 - 4 * n, 1]} intensity={1.8 * (1 - n)} color="#ffb070" /><color attach="background" args={[new THREE.Color('#e0905a').lerp(new THREE.Color('#05060c'), n)]} />
  <mesh geometry={COLINAS}><meshStandardMaterial color="#4f7f3c" roughness={1} flatShading /></mesh>
  {n > 0.5 && <Estrelas sem="c3k" />}
  <Palpebra k={pr(f, 60, 110)} /><Pos bloom={0.5} /></>; }}</CP>;

// ---------- CAP 4 · +100 milhões de anos: a encruzilhada ----------
const C4a = G({cfg: 'ultima', ca: [10, -40, 3.6], cb: [10, -20, 3.4], k: [0.35, 0.4], giro: [0, 0.2]});
const C4b: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 50); return <>
  <Cam pos={[0, 1.3, 3.4 - f * 0.006]} alvo={[0, 0, -2]} /><Luzes sol={[0, 3, 2]} i={1.4} amb={0.3} /><color attach="background" args={['#04080f']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#0a2840" roughness={0.25} metalness={0.3} /></mesh>
  {Array.from({length: 40}, (_, i) => { const z = 2 - i * 0.12; const dv = Math.max(0, -z) * 0.6 * k; return <group key={i}><Brilho pos={[-dv, 0.03, z]} s={0.18} cor="#7fdcff" o={0.9} /><Brilho pos={[dv, 0.03, z]} s={0.18} cor="#ffb060" o={0.9 * k} /></group>; })}
  <Pos bloom={1.2} /></>; }}</CP>;
const C4c = G({ca: [15, -30, 2.6], cb: [5, -25, 2.5], labs: [{la: 15, lo: -40, txt: 'ATLÂNTICO', ini: 4, dy: 0, tam: 64}], k: [0, 0.02]});
// as duas respostas lado a lado: à esquerda abre, à direita fecha
const C4d: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 90); return <>
  <Cam pos={[0, 0, 5.2]} /><Luzes sol={[2, 2, 4]} i={2.3} amb={0.3} /><Estrelas sem="c4d" />
  <group position={[-1.35, 0, 0]} scale={0.95}><Globo cfg="novo" k={k * 0.4} giro={0.45} /></group>
  <group position={[1.35, 0, 0]} scale={0.95}><Globo cfg="ultima" k={k * 0.6} giro={0.45} /></group>
  <Pos bloom={0.6} /></>; }}</CP>;
const C4e = G({cfg: 'novo', ca: [0, -30, 3.0], cb: [-5, -25, 3.2], k: [0, 0.45], labs: [{la: -10, lo: -50, txt: 'BRASIL', ini: 4, cont: 'sa', dy: 0}, {la: 8, lo: 18, txt: 'ÁFRICA', ini: 4, dy: 0}]});
const C4f = G({cfg: 'novo', ca: [10, -170, 3.2], cb: [10, 170, 3.0], k: [0.45, 0.9], labs: [{la: 0, lo: -150, txt: 'PACÍFICO', ini: 3, dy: 0, tam: 64}]});
const C4g = SS({s: 'novo', ca: [20, 150, 3.4], cb: [25, 175, 3.1], labs: [{la: 40, lo: 120, txt: 'ÁSIA', ini: 10, dy: 0}, {la: 30, lo: 175, txt: 'AMÉRICAS', ini: 40, dy: 0}]});
const C4h = G({cfg: 'ultima', ca: [20, -30, 3.0], cb: [15, -15, 2.7], k: [0.3, 0.95], labs: [{la: 10, lo: 15, txt: 'ÁFRICA', ini: 10, dy: 0}, {la: 40, lo: -95, txt: 'AMÉRICAS', ini: 10, dy: 0, cont: 'na'}]});
// Gibraltar: uma falha nova no fundo do mar se acendendo
const C4i = G({ca: [36, -6, 2.6], cb: [36, -6, 1.6], labs: [{la: 36, lo: -5.6, txt: 'GIBRALTAR', ini: 20, dy: -60, tam: 56}]});
const ARCO = relevo(160, (x, z, i) => -0.3 + Math.sin(x * 0.8) * 0.08 + (random('gb' + i) - 0.5) * 0.03 - Math.exp(-((z - 0.4 * x * x + 0.6) ** 2) / 0.02) * 0.35, 8);
const C4j: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.5, 3.2 - f * 0.006]} alvo={[0, -0.4, -0.6]} /><Luzes sol={[1, 4, 3]} i={1.6} amb={0.6} /><color attach="background" args={['#03101c']} /><fog attach="fog" args={['#052036', 2, 9]} />
  <mesh geometry={ARCO}><meshStandardMaterial color="#3a3c44" roughness={1} flatShading /></mesh>
  {Array.from({length: 30}, (_, i) => { const x = -2.4 + i * 0.165; return <Brilho key={i} pos={[x, -0.6, 0.4 * x * x - 0.6]} s={0.3} cor="#ff6a20" o={pr(f, i * 3, i * 3 + 10) * (0.7 + 0.3 * Math.sin(f * 0.2 + i))} />; })}
  <Pos bloom={1.3} /></>}</CP>;
// quatro caminhos de luz saindo de um ponto
const C4k: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 30); const cores = ['#ff7a3a', '#7fdcff', '#eef6ff', '#5fe08a']; return <>
  <Cam pos={[0, 2.2, 2.6]} alvo={[0, 0, -1]} /><color attach="background" args={['#03050a']} /><ambientLight intensity={0.3} /><Estrelas sem="c4k" />
  {cores.map((c, j) => { const a = -0.9 + j * 0.6; return Array.from({length: 26}, (_, i) => <Brilho key={j + '_' + i} pos={[Math.sin(a) * i * 0.13 * k, 0, -Math.cos(a) * i * 0.13 * k]} s={0.16} cor={c} o={0.9} />); })}
  <Brilho pos={[0, 0, 0]} s={0.6} cor="#ffffff" o={0.9} />
  <Pos bloom={1.3} /></>; }}</CP>;
const QUATRO: [Cfg, number][] = [['ultima', -0.5], ['novo', 2.6], ['amasia', 0.6], ['aurica', 2.4]];
const C4l: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.1, 6 - f * 0.008]} /><Luzes sol={[2, 2, 4]} i={2.3} amb={0.3} /><Estrelas sem="c4l" />
  {QUATRO.map(([s, g], i) => <group key={s} position={[-2.7 + i * 1.8, Math.sin(f * 0.04 + i) * 0.08, 0]} scale={0.72 * (0.4 + 0.6 * pr(f, i * 5, i * 5 + 12))}><Super s={s} giro={g + f * 0.012} /></group>)}
  <Pos bloom={0.6} /></>}</CP>;
// você em cima de todos ao mesmo tempo: quatro mundos transparentes sobrepostos sob a silhueta
const C4m: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.6, 1.5 + f * 0.003, 2.6]} alvo={[0, 0.9, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.35} /><Estrelas sem="c4m" />
  {QUATRO.map(([s, g], i) => <group key={s} rotation={[0, g + f * 0.004 * (i + 1), 0]}><group scale={0.92 + i * 0.01}><Super s={s} esc={1} /></group></group>)}
  <Boneco pos={[0, 0.94, 0]} s={0.12} />
  <Pos bloom={0.7} /></>}</CP>;

// ---------- CAP 5 · +200 milhões de anos: o mundo do gelo ----------
const C5a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.4, 2.6]} alvo={[0, 0.2, -2]} /><Luzes sol={[1, 3, 2]} i={1.2} amb={0.6} /><color attach="background" args={['#b9cde0']} /><fog attach="fog" args={['#c8d8e8', 2, 10]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#e8f0f8" roughness={0.9} /></mesh>
  {Array.from({length: 160}, (_, i) => <mesh key={i} position={[(random('nx' + i) - 0.5) * 5, 2 - ((f * 0.012 * (0.6 + random('nv' + i)) + random('ny' + i) * 2) % 2), (random('nz' + i) - 0.5) * 3]}><sphereGeometry args={[0.012, 6, 6]} /><meshBasicMaterial color="#ffffff" /></mesh>)}
  <Palpebra k={1 - pr(f, 0, 25)} cor="#0a0d14" /><Pos bloom={0.4} /></>}</CP>;
const C5b = SS({s: 'amasia', ca: [75, -20, 3.4], cb: [70, 30, 3.2], gelo: [0.02, 0.12], labs: [{la: 65, lo: 10, txt: 'AMÁSIA', ini: 6, dy: -40, tam: 64}]});
// supercomputador: fileiras de servidores e o mundo girando no meio
const Servidores: React.FC<{f: number; cor: string}> = ({f, cor}) => <>{[-1, 1].map((l) => Array.from({length: 6}, (_, i) => <group key={l + '_' + i} position={[l * 1.5, 0, -i * 0.9]}>
  <mesh position={[0, 0.6, 0]}><boxGeometry args={[0.6, 1.4, 0.7]} /><meshStandardMaterial color="#3a4454" metalness={0.4} roughness={0.45} /></mesh>
  {Array.from({length: 10}, (_, k) => <Brilho key={k} pos={[-l * 0.31, 0.05 + k * 0.13, (random('lz' + i + k) - 0.5) * 0.5]} s={0.035} cor={random('lc' + i + k + Math.floor(f / 5)) > 0.4 ? cor : '#2a3040'} o={0.9} />)}</group>))}</>;
const C5c: React.FC = () => <CP rot={(f) => <Rotulo x={960} y={180} txt="NASA" o={pr(f, 10, 18)} tam={56} />}>{(f) => <>
  <Cam pos={[0, 1.2, 3.4 - f * 0.008]} alvo={[0, 0.8, -1.5]} /><Luzes sol={[1, 4, 3]} i={1.8} amb={0.6} /><color attach="background" args={['#05070c']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 12]} /><meshStandardMaterial color="#0e1218" metalness={0.6} roughness={0.3} /></mesh>
  <Servidores f={f} cor="#4fd0ff" />
  <group position={[0, 0.9, -1.8]} scale={0.45}><Super s="amasia" giro={f * 0.02} /></group>
  <Brilho pos={[0, 0.9, -1.6]} s={1.6} cor="#4fd0ff" o={0.2} />
  <Pos bloom={1} /></>}</CP>;
const C5d = SS({s: 'amasia', ca: [45, 60, 3.3], cb: [55, 100, 3.0], gelo: [0.12, 0.3]});
// o mar mais baixo revela costas novas (plataformas claras surgindo)
const COSTA = relevo(160, (x, z, i) => -0.25 + (x + 1.5) * 0.12 + Math.sin(z * 2 + x) * 0.05 + (random('cs' + i) - 0.5) * 0.02, 8);
const C5e: React.FC = () => <CP>{(f) => { const nivel = interpolate(f, [0, 100], [0.02, -0.22], cl); return <>
  <Cam pos={[-1.6, 1.4, 2.8]} alvo={[0, -0.1, -0.4]} /><Luzes sol={[2, 4, 3]} i={1.6} amb={0.55} /><color attach="background" args={['#c8d6e4']} />
  <mesh geometry={COSTA}><meshStandardMaterial color="#9a9286" roughness={1} flatShading /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, nivel, 0]}><planeGeometry args={[8, 8]} /><meshStandardMaterial color="#2f5c7c" transparent opacity={0.88} roughness={0.2} /></mesh>
  {Array.from({length: 14}, (_, i) => <mesh key={i} position={[1.4 + random('gi' + i) * 1.5, 0.3 + random('gh' + i) * 0.2, -2 + i * 0.3]}><boxGeometry args={[0.4, 0.3 + random('gs' + i) * 0.5, 0.3]} /><meshStandardMaterial color="#f2f8ff" roughness={0.5} /></mesh>)}
  <Pos bloom={0.3} /></>; }}</CP>;
// ainda dá pra viver: tundra com um riacho e paredes de gelo
const C5f: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-1 + f * 0.008, 0.6, 3]} alvo={[0, 0.2, -1]} /><Luzes sol={[2, 3, 2]} i={1.6} amb={0.55} /><color attach="background" args={['#a8bed4']} /><fog attach="fog" args={['#b8cadb', 3, 12]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[16, 16]} /><meshStandardMaterial color="#6a7a4a" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.004, 0]}><planeGeometry args={[0.35, 16]} /><meshStandardMaterial color="#4a88b0" roughness={0.1} metalness={0.3} /></mesh>
  {Array.from({length: 7}, (_, i) => <mesh key={i} position={[-4 + i * 1.3, 0.8, -4 - (i % 2)]}><boxGeometry args={[1.3, 1.6 + (i % 3) * 0.4, 0.8]} /><meshStandardMaterial color="#eaf4ff" roughness={0.4} /></mesh>)}
  {Array.from({length: 40}, (_, i) => <mesh key={'m' + i} position={[(random('mx' + i) - 0.5) * 6, 0.03, (random('mz' + i) - 0.5) * 4]}><dodecahedronGeometry args={[0.05 + random('ms' + i) * 0.05, 0]} /><meshStandardMaterial color="#3e5a2e" flatShading /></mesh>)}
  <Pos bloom={0.3} /></>}</CP>;
const C5g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[1.2, 0.8, 2.4 - f * 0.004]} alvo={[0, 0.5, 0]} /><Luzes sol={[2, 3, 2]} i={1.2} amb={0.6} /><color attach="background" args={['#9fb4ca']} /><fog attach="fog" args={['#b4c6d8', 2, 9]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[16, 16]} /><meshStandardMaterial color="#e6eef6" roughness={0.9} /></mesh>
  <Boneco s={0.7} cor="#2a2e38" />
  {Array.from({length: 8}, (_, i) => { const t = ((f * 0.02 + i / 8) % 1); return <Brilho key={i} pos={[0.12 + t * 0.3, 0.68 + t * 0.15, 0.1]} s={0.08 + t * 0.15} cor="#ffffff" o={0.5 * (1 - t)} />; })}
  <Pos bloom={0.4} /></>}</CP>;
const C5h: React.FC = () => <CP>{(f) => { const r = pr(f, 0, 90); return <>
  <Cam pos={[0, 0.6, 3]} alvo={[0, 0.5 + r * 0.3, -4]} /><ambientLight intensity={0.5} /><color attach="background" args={[new THREE.Color('#9fb4ca').lerp(new THREE.Color('#7a2a10'), r)]} /><fog attach="fog" args={[new THREE.Color('#b4c6d8').lerp(new THREE.Color('#8a3010'), r).getStyle(), 2, 12]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color={new THREE.Color('#e6eef6').lerp(new THREE.Color('#5a3020'), r)} roughness={1} /></mesh>
  <Brilho pos={[0, 0.3, -9]} s={6 + r * 10} cor="#ff5a10" o={r} />
  <Pos bloom={1} /></>; }}</CP>;

// ---------- CAP 6 · +250 milhões de anos: Pangeia Última ----------
const C6a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.4, 2.6]} alvo={[0, 0.3, -2]} /><Luzes sol={[0, 3, -4]} i={2.2} amb={0.5} /><color attach="background" args={['#e09a5a']} /><fog attach="fog" args={['#e0a060', 2, 12]} />
  <mesh geometry={DUNAS}><meshStandardMaterial color="#c88a4a" roughness={1} /></mesh>
  <Palpebra k={1 - pr(f, 0, 30)} cor="#1a0804" /><Pos bloom={0.6} /></>}</CP>;
const C6b = SS({s: 'ultima', ca: [10, -10, 3.6], cb: [20, 30, 3.3]});
const C6c = G({cfg: 'ultima', ca: [20, -35, 2.6], cb: [18, -25, 2.4], k: [0.7, 1], labs: [{la: 20, lo: -40, txt: 'ATLÂNTICO', ini: 2, dy: 0}]});
const C6d = G({cfg: 'ultima', ca: [25, -25, 2.6], cb: [28, -15, 2.4], k: [0.8, 1], labs: [{la: 12, lo: 18, txt: 'ÁFRICA', ini: 4, dy: 0}, {la: 45, lo: -95, txt: 'AMÉRICA DO NORTE', ini: 30, dy: 0, cont: 'na', tam: 50}]});
const C6e = G({cfg: 'ultima', ca: [45, 40, 3.0], cb: [45, 60, 2.8], k: [0.6, 1], labs: [{la: 50, lo: 15, txt: 'EUROPA', ini: 4, cont: 'eu', dy: 0}, {la: 50, lo: 95, txt: 'ÁSIA', ini: 20, cont: 'eu', dy: 0}]});
// um anel de vulcões acende onde antes era oceano
const ANEL: V3[] = Array.from({length: 40}, (_, i) => { const a = i / 40 * Math.PI * 2; return V(v(15 + Math.sin(a) * 22, -25 + Math.cos(a) * 26, 1.015)); });
const C6f = SS({s: 'ultima', ca: [15, -25, 2.8], cb: [15, -22, 2.5], extra: (f) => <>{ANEL.map((p, i) => <Brilho key={i} pos={p} s={0.09} cor="#ff6a20" o={pr(f, i * 2, i * 2 + 8)} />)}</>, labs: [{la: 15, lo: -25, txt: 'ANEL DE VULCÕES', ini: 70, dy: 0, tam: 50}]});
const C6g = SS({s: 'ultima', ca: [5, 0, 4.2], cb: [10, 30, 3.6], labs: [{la: 20, lo: 15, txt: 'PANGEIA ÚLTIMA', ini: 10, dy: -120, tam: 72}]});
const C6h = SS({s: 'ultima', ca: [50, 0, 3.4], cb: [55, 30, 3.0]});
const C6i: React.FC = () => <CP>{(f) => <>
  <Cam pos={[Math.sin(f * 0.01) * 3, 1.0, Math.cos(f * 0.01) * 3]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 5, 2]} i={2.4} amb={0.5} /><color attach="background" args={['#e8c48a']} /><fog attach="fog" args={['#e8c48a', 3, 14]} />
  <mesh geometry={DUNAS}><meshStandardMaterial color="#c08a52" roughness={1} /></mesh>
  <Boneco s={0.6} rot={f * 0.03} />
  <Pos bloom={0.4} /></>}</CP>;
const C6j: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.4, 3]} alvo={[0, 0.8, -8]} /><Luzes sol={[2, 6, 2]} i={2.4} amb={0.5} /><color attach="background" args={['#ead2a0']} /><fog attach="fog" args={['#ead2a0', 4, 26]} />
  <mesh geometry={DUNAS} scale={[2, 1, 2]}><meshStandardMaterial color="#c49058" roughness={1} /></mesh>
  {Array.from({length: 7}, (_, i) => { const t = pr(f, 0, 150); return <Brilho key={i} pos={[-6 + i * 2, 3.5, -24 + t * 6]} s={5 * (1 - t)} cor="#f4f6fa" o={0.7 * (1 - t)} />; })}
  <Pos bloom={0.4} /></>}</CP>;

// ---------- CAP 7 · o calor ----------
const C7a: React.FC = () => <CP>{(f, _t, pt) => { const k = pr(f, 0, 60); return <>
  <Cam pos={[0, 0.35, 2.2 - f * 0.005]} alvo={[0, 0.05, -1.5]} /><Luzes sol={[0, 6, -3]} i={2.6} amb={0.6} /><color attach="background" args={['#f2dcb0']} /><fog attach="fog" args={['#f2dcb0', 2, 10]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color={new THREE.Color('#9a7048').lerp(new THREE.Color('#e08a3a'), k)} roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}><planeGeometry args={[14, 14]} /><meshBasicMaterial color="#4a2a10" alphaMap={rep(pt.rachas, 8)} transparent opacity={0.6 * k} depthWrite={false} /></mesh>
  {Array.from({length: 30}, (_, i) => <Brilho key={i} pos={[(random('ca' + i) - 0.5) * 4, 0.1 + Math.sin(f * 0.25 + i) * 0.04, -random('cz' + i) * 3]} s={0.5} cor="#fff6e0" o={0.1} />)}
  <Pos bloom={0.5} /></>; }}</CP>;
const C7b: React.FC = () => <CP>{(f) => { const b = pr(f, 0, 240); const pulso = [40, 100, 170].reduce((a, t) => a + Math.max(0, 1 - Math.abs(f - t) / 10), 0); return <>
  <Cam pos={[0, 0, 5]} /><Estrelas sem="c7b" />
  <mesh><sphereGeometry args={[1.1 + b * 0.18 + pulso * 0.04, 64, 64]} /><meshBasicMaterial color={new THREE.Color('#ffc860').lerp(new THREE.Color('#fffaf0'), b)} /></mesh>
  <Brilho pos={[0, 0, 0.2]} s={5 + b * 2 + pulso} cor="#ffb040" o={0.75} />
  <Pos bloom={1.5} /></>; }}</CP>;
const C7c: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 80); return <>
  <Cam pos={[0, 1.2, 4.4]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.6} /><color attach="background" args={['#3a2a24']} />
  <mesh position={[-1.6 - 0.3 + k * 0.3, 0, 0]}><boxGeometry args={[2.4, 0.5, 2]} /><meshStandardMaterial color="#4a3e36" roughness={1} /></mesh>
  <mesh position={[1.6 + 0.3 - k * 0.3, 0, 0]}><boxGeometry args={[2.4, 0.5, 2]} /><meshStandardMaterial color="#42382f" roughness={1} /></mesh>
  {[-0.6, 0, 0.6].map((z, i) => <group key={i} position={[0, 0.25, z]}><mesh position={[0, 0.35 * k, 0]}><coneGeometry args={[0.35, 0.7 * k + 0.01, 16]} /><meshStandardMaterial color="#3a2e28" flatShading /></mesh>
    <Nuvem n={120} sem={'c7c' + i} origem={new THREE.Vector3(0, 0.7 * k, 0)} dir={new THREE.Vector3(0, 1, 0)} t={Math.max(0, f - 30)} raio={2.4} cor="#8a8078" tam={0.3} o={0.5} /><Brilho pos={[0, 0.7 * k, 0]} s={0.4 * k} cor="#ff6a20" o={0.9} /></group>)}
  <Pos bloom={0.7} /></>; }}</CP>;
const C7d: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 100); return <>
  <Cam pos={[0, 0.6, 3.6]} /><Luzes sol={[2, 2, 4]} i={2.2} amb={0.3} /><Estrelas sem="c7d" />
  <Super s="ultima" giro={f * 0.004} />
  <mesh scale={1.04 + k * 0.05}><sphereGeometry args={[1, 64, 64]} /><meshStandardMaterial color="#9a7a5a" transparent opacity={0.15 + 0.35 * k} depthWrite={false} /></mesh>
  <Pos bloom={0.6} /></>; }}</CP>;
const C7e: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 80); return <>
  <Cam pos={[0.6, 0.5, 1.4]} alvo={[0, 0.15, 0]} /><Luzes sol={[2, 5, 2]} i={2.4} amb={0.4} /><color attach="background" args={['#f0d8a8']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 6]} /><meshStandardMaterial color="#c49058" roughness={1} /></mesh>
  <mesh geometry={geoPedra} position={[0, 0.18, 0]} scale={[0.3, 0.2, 0.25]}><meshStandardMaterial color={new THREE.Color('#6a5a4a').lerp(new THREE.Color('#ff5a10'), k)} emissive="#ff4a0a" emissiveIntensity={k * 2.2} roughness={1} flatShading /></mesh>
  <Brilho pos={[0, 0.25, 0]} s={1.2 * k} cor="#ff6a20" o={0.6 * k} />
  <Pos bloom={1.2} /></>; }}</CP>;
const C7f: React.FC = () => <CP rot={(f) => <Rotulo x={960} y={180} txt="BRISTOL" o={pr(f, 8, 16)} tam={56} />}>{(f) => <>
  <Cam pos={[0, 1.1, 3.2 - f * 0.006]} alvo={[0, 0.9, -1.5]} /><Luzes sol={[1, 4, 3]} i={1.8} amb={0.6} /><color attach="background" args={['#0a0605']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 12]} /><meshStandardMaterial color="#140c0a" metalness={0.5} roughness={0.4} /></mesh>
  <Servidores f={f} cor="#ff7a3a" />
  <mesh position={[0, 1, -2.4]}><planeGeometry args={[2.2, 1.3]} /><meshBasicMaterial color="#120806" /></mesh>
  <group position={[0, 1, -2.2]} scale={0.5}><Super s="ultima" calor={1} giro={f * 0.015} atmCor="1.0,0.45,0.15" /></group>
  <Pos bloom={1.1} /></>}</CP>;
const C7g: React.FC = () => <CP>{(f, _t, pt) => { const k = pr(f, 0, 120); const cor = k < 0.5 ? new THREE.Color('#7a5a3a').lerp(new THREE.Color('#ff8a2a'), k * 2) : new THREE.Color('#ff8a2a').lerp(new THREE.Color('#fff0d8'), (k - 0.5) * 2); return <>
  <Cam pos={[-0.5 + f * 0.006, 0.4, 2]} alvo={[0.3 + f * 0.006, 0, -1]} /><Luzes sol={[0, 6, -2]} i={2} amb={0.7} /><color attach="background" args={['#fff4e0']} /><fog attach="fog" args={['#fff0d8', 1.5, 8]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color={cor} roughness={1} emissive={cor} emissiveIntensity={0.3 * k} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}><planeGeometry args={[14, 14]} /><meshBasicMaterial color="#3a1a08" alphaMap={rep(pt.rachas, 5)} transparent opacity={0.5} depthWrite={false} /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>;
const C7h: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.5, 4]} alvo={[0, 0.6, -4]} /><Luzes sol={[0, 3, -6]} i={2.6} amb={0.6} /><color attach="background" args={['#ffe9c0']} /><fog attach="fog" args={['#ffd9a0', 3, 18]} />
  <mesh geometry={DUNAS}><meshStandardMaterial color="#d89a58" roughness={1} /></mesh>
  <mesh position={[0, 3, -16]}><sphereGeometry args={[2.6 + f * 0.006, 48, 48]} /><meshBasicMaterial color="#fffaf0" /></mesh><Brilho pos={[0, 3, -15]} s={18} cor="#ffb050" o={0.8} />
  <Pos bloom={1.4} /></>}</CP>;
// a gota de suor que não evapora (close na pele, sem rosto)
const C7i: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.4, 0.35, 1.2 - f * 0.002]} alvo={[0, 0.05, 0]} /><Luzes sol={[2, 3, 2]} i={2} amb={0.5} /><color attach="background" args={['#2a1a14']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[4, 4, 80, 80]} /><meshStandardMaterial color="#b07a5a" roughness={0.55} /></mesh>
  {[[0, 0, 0.11], [0.3, -0.2, 0.06], [-0.25, 0.15, 0.07], [0.12, 0.35, 0.05]].map(([x, z, r], i) => <mesh key={i} position={[x, r * 0.5 + Math.sin(f * 0.05 + i) * 0.002, z]} scale={[1, 0.6, 1]}><sphereGeometry args={[r, 32, 32]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.45} roughness={0} transmission={0.6} /></mesh>)}
  <Pos bloom={0.5} /></>}</CP>;
const C7j: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 90); return <>
  <Cam pos={[0, 0.6, 2.6]} alvo={[0, 0.6, 0]} /><ambientLight intensity={0.3} /><color attach="background" args={['#05030a']} />
  <group><Boneco s={1} cor={new THREE.Color('#2a4aff').lerp(new THREE.Color('#ff2a10'), k).getStyle()} /></group>
  <Brilho pos={[0, 0.6, 0.2]} s={2.4} cor={new THREE.Color('#4a6aff').lerp(new THREE.Color('#ff3a10'), k).getStyle()} o={0.4 + 0.4 * k} />
  <Pos bloom={1.3} /></>; }}</CP>;

// ---------- CAP 8 · sobreviver ----------
const C8a: React.FC = () => <CP>{(f) => { const x = -2 + f * 0.04; return <>
  <Cam pos={[x - 1.4, 0.8, 2.2]} alvo={[x + 0.6, 0.4, 0]} /><Luzes sol={[2, 6, 1]} i={2.6} amb={0.5} /><color attach="background" args={['#f2d8a6']} /><fog attach="fog" args={['#f2d8a6', 3, 14]} />
  <mesh geometry={DUNAS}><meshStandardMaterial color="#cc9050" roughness={1} /></mesh>
  <Boneco pos={[x, 0.05, 0]} s={0.55} anda={f * 0.6} rot={Math.PI / 2} />
  <Pos bloom={0.5} /></>; }}</CP>;
const C8b = SS({s: 'ultima', ca: [60, 10, 3.2], cb: [55, 40, 2.9], calor: [0.6, 0.85], verde: [0, 0.9]});
const C8c = SS({s: 'ultima', ca: [10, -40, 2.2], cb: [30, -20, 2.0], calor: [0.8, 0.8], verde: [0.9, 0.9], gelo: [0.03, 0.03]});
const C8d: React.FC = () => <CP>{(f, _t, pt) => <>
  <Cam pos={[0, 0.5, 2.6]} alvo={[0, 0.1, -1]} tremor={0.008} /><Luzes sol={[0, 5, 1]} i={1.2} amb={0.4} /><color attach="background" args={['#ffb070']} /><fog attach="fog" args={['#ff9a50', 2, 10]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color="#3a1a0c" emissive="#ff5a10" emissiveMap={rep(pt.rachas, 7)} emissiveIntensity={1.4 + Math.sin(f * 0.3) * 0.3} /></mesh>
  {Array.from({length: 40}, (_, i) => { const t = (f * 0.015 + random('bh' + i)) % 1; return <Brilho key={i} pos={[(random('bx' + i) - 0.5) * 5, t * 1.2, -random('bz' + i) * 4]} s={0.12} cor="#ffcf80" o={0.6 * (1 - t)} />; })}
  <Pos bloom={1.2} /></>}</CP>;
const C8e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-1.5 + f * 0.01, 0.9, 3]} alvo={[0, 0.3, -1]} /><Luzes sol={[2, 5, 2]} i={2.2} amb={0.5} /><color attach="background" args={['#c8d8c0']} /><fog attach="fog" args={['#d0d8c0', 4, 14]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1]}><planeGeometry args={[20, 4]} /><meshStandardMaterial color="#c8a670" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -1.4]}><planeGeometry args={[20, 1.2]} /><meshStandardMaterial color="#4a7a3a" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -6]}><planeGeometry args={[30, 8]} /><meshStandardMaterial color="#2a6a86" roughness={0.15} /></mesh>
  {Array.from({length: 7}, (_, i) => <Palmeira key={i} pos={[-3 + i, 0, -1.4 + (i % 2) * 0.3]} f={f + i * 7} s={0.9} />)}
  <Boneco pos={[0.2, 0, -0.9]} s={0.45} rot={Math.PI} />
  <Pos bloom={0.4} /></>}</CP>;
// todo ser vivo indo para o mesmo lugar: bichos estilizados convergindo para a faixa verde
const Bicho: React.FC<{pos: V3; rot: number; s: number; f: number; cor: string}> = ({pos, rot, s, f, cor}) => (
  <group position={pos} rotation={[0, rot, 0]} scale={s}>
    <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.12, 0.3, 6, 12]} /><meshStandardMaterial color={cor} /></mesh>
    <mesh position={[0.28, 0.32, 0]}><sphereGeometry args={[0.09, 12, 12]} /><meshStandardMaterial color={cor} /></mesh>
    {[[-0.12, 0.08], [0.12, 0.08], [-0.12, -0.08], [0.12, -0.08]].map(([x, z], i) => <mesh key={i} position={[x, 0.08, z]} rotation={[0, 0, Math.sin(f * 0.6 + i * 1.5) * 0.5]}><cylinderGeometry args={[0.025, 0.025, 0.18, 6]} /><meshStandardMaterial color={cor} /></mesh>)}
  </group>
);
const C8f: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 3.2, 3.4]} alvo={[0, 0, -0.6]} /><Luzes sol={[2, 6, 2]} i={2.4} amb={0.5} /><color attach="background" args={['#e8c08a']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color="#c88c4c" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, -1.2]}><planeGeometry args={[14, 0.8]} /><meshStandardMaterial color="#4a7a3a" /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, -4]}><planeGeometry args={[14, 4.8]} /><meshStandardMaterial color="#2a6a86" /></mesh>
  {Array.from({length: 34}, (_, i) => { const x0 = (random('ax' + i) - 0.5) * 7, z0 = 1 + random('az' + i) * 2.5; const t = pr(f, 0, 200) * (0.6 + random('av' + i) * 0.4); const x = x0 * (1 - t * 0.2), z = z0 + (-1.1 - z0) * t;
    return <Bicho key={i} pos={[x, 0, z]} rot={Math.PI / 2} s={0.4 + random('as' + i) * 0.4} f={f + i * 3} cor={['#6a4a30', '#8a7a5a', '#4a3a2a', '#9a6a40'][i % 4]} />; })}
  <Pos bloom={0.3} /></>}</CP>;

// ---------- CAP 9 · Mas espera ----------
const C9a = SS({s: 'ultima', ca: [10, 10, 3.0], cb: [10, 12, 3.1], calor: [1, 0]});
const C9b: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.1, 6.2]} /><Luzes sol={[2, 2, 4]} i={2.3} amb={0.3} /><Estrelas sem="c9b" />
  {QUATRO.map(([s, g], i) => <group key={s} position={[-2.7 + i * 1.8, 0, 0]} scale={i === 3 ? 0.72 + pr(f, 20, 60) * 0.2 : 0.72 - pr(f, 20, 60) * 0.15}><Super s={s} giro={g + f * 0.01} /></group>)}
  <Brilho pos={[2.7, 0, 0.2]} s={2.6 * pr(f, 20, 60)} cor="#7fdcff" o={0.35} />
  <Pos bloom={0.8} /></>}</CP>;
const C9c = SS({s: 'aurica', ca: [0, 100, 3.6], cb: [5, 130, 3.0], labs: [{la: 5, lo: 120, txt: 'AURICA', ini: 4, dy: -120, tam: 76}]});
const C9d = G({cfg: 'aurica', ca: [0, 150, 3.4], cb: [0, 120, 3.2], k: [0, 1], labs: [{la: 0, lo: 180, txt: 'EQUADOR', ini: 60, dy: 0, tam: 46}]});
const C9e: React.FC = () => <CP rot={(f) => <Rotulo x={960} y={180} txt="NASA" o={pr(f, 8, 16)} tam={56} />}>{(f) => <>
  <Cam pos={[0.8, 1.1, 3 - f * 0.006]} alvo={[0, 0.9, -1.5]} /><Luzes sol={[1, 4, 3]} i={1.8} amb={0.6} /><color attach="background" args={['#040a08']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 12]} /><meshStandardMaterial color="#0a1410" metalness={0.5} roughness={0.4} /></mesh>
  <Servidores f={f} cor="#5fe08a" />
  <group position={[0, 0.95, -1.6]} scale={0.5}><Super s="aurica" giro={f * 0.02} /></group>
  <Pos bloom={1} /></>}</CP>;
const C9f: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={camLL(5, 120 + f * 0.05, 2.8)} /><Luzes sol={solDe(camLL(5, 120 + f * 0.05, 2.8))} i={2.4} amb={0.3} /><Estrelas sem="c9f" />
  <Super s="aurica" />
  <mesh rotation={[0, f * 0.002, 0]}><sphereGeometry args={[1.015, 96, 96]} /><meshStandardMaterial color="#ffffff" alphaMap={tex.nuvem} transparent opacity={0.7} depthWrite={false} /></mesh>
  <Pos bloom={0.6} /></>}</CP>;
const C9g: React.FC = () => <CP rot={(f) => <><Rotulo x={560} y={170} txt="PANGEIA ÚLTIMA" o={pr(f, 6, 14)} tam={50} /><Rotulo x={1360} y={170} txt="AURICA" o={pr(f, 6, 14)} tam={50} /></>}>{(f) => <>
  <Cam pos={[0, 0, 5.2]} /><Luzes sol={[0, 2, 5]} i={2.3} amb={0.3} /><Estrelas sem="c9g" />
  <group position={[-1.45, 0, 0]} scale={1.05}><Super s="ultima" calor={0.9} atmCor="1.0,0.5,0.2" giro={f * 0.006} /></group>
  <group position={[1.45, 0, 0]} scale={1.05}><Super s="aurica" giro={2.2 + f * 0.006} /></group>
  <Pos bloom={0.9} /></>}</CP>;
// você sobe: do chão, atravessa as nuvens e chega na órbita
const C9h: React.FC = () => <CP>{(f) => { const k = pr(f, 0, 160, Easing.in(Easing.quad)); const y = 0.5 + k * 30; return <>
  <Cam pos={[0, y, 2 + k * 6]} alvo={[0, y * 0.4 - 1, -4]} /><Luzes sol={[2, 6, 2]} i={2.2} amb={0.5} /><color attach="background" args={[new THREE.Color('#9ec4e8').lerp(new THREE.Color('#02040a'), k).getStyle()]} />
  <mesh geometry={COLINAS} scale={[3, 1, 3]}><meshStandardMaterial color="#4f7f3c" roughness={1} flatShading /></mesh>
  {Array.from({length: 40}, (_, i) => <Brilho key={i} pos={[(random('nh' + i) - 0.5) * 30, 6 + random('ny' + i) * 2, (random('nz' + i) - 0.5) * 30 - 4]} s={6} cor="#ffffff" o={0.55} />)}
  {k > 0.6 && <Estrelas sem="c9h" />}
  <Pos bloom={0.4} /></>; }}</CP>;
const C9i = SS({s: 'pangeia', ca: [0, -150, 3.6], cb: [5, -60, 3.2]});
const C9j = SS({s: 'pangeia', ca: [-10, 20, 3.0], cb: [0, 0, 3.3], labs: [{la: 0, lo: 0, txt: 'PANGEIA', ini: 30, dy: -140, tam: 72}]});
const C9k = G({ca: [10, -20, 3.4], cb: [15, 20, 3.4], oscila: 1});
const C9l = G({ca: [20, 0, 4.0], cb: [10, -40, 4.2], oscila: 1.5, giro: [0, 0.6]});
const C9m: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.3, 5.4 + f * 0.01]} /><Luzes sol={[2, 2, 4]} i={2.3} amb={0.3} /><Estrelas sem="c9m" />
  <Globo k={0} giro={f * 0.005} />
  {QUATRO.map(([s, g], i) => { const a = i / 4 * Math.PI * 2 + f * 0.012; return <Super key={s} s={s} pos={[Math.cos(a) * 2.2, Math.sin(a) * 0.5, Math.sin(a) * 1.2 - 0.4]} esc={0.38} giro={g} />; })}
  <Pos bloom={0.7} /></>}</CP>;
const C9n: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.9, 1.0, 2.2 + f * 0.01]} alvo={[0, 0.0, 0.2]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.4} /><color attach="background" args={['#0e0a08']} />
  <Dedo f={f} pos={[0, 0.5, 0]} />
  <mesh position={[-1.2 + f * 0.003, -0.35, 0]}><boxGeometry args={[2.4, 0.4, 2.4]} /><meshStandardMaterial color="#5c4a3a" roughness={1} /></mesh>
  <mesh position={[1.3, -0.35, 0]}><boxGeometry args={[2.4, 0.4, 2.4]} /><meshStandardMaterial color="#4a3c30" roughness={1} /></mesh>
  <Pos bloom={0.6} /></>}</CP>;

// ---------- anel de rocha (marcador de tempo) ----------
const CAMADAS = [0, 0, 0, 1, 2, 4, 5, 5, 5, 5];
const CORES = ['#8a6a4a', '#a8865a', '#6a5a4a', '#b07a4a', '#c89a6a', '#7a4a32'];
const Anel: React.FC<{n: number; nova?: number; f: number; quente?: number}> = ({n, nova = 1, f, quente = 0}) => <>
  <mesh rotation={[Math.PI / 2 - 0.5, 0, 0]}><cylinderGeometry args={[0.32, 0.32, 0.3, 48]} /><meshStandardMaterial color="#4a4038" roughness={1} /></mesh>
  {Array.from({length: n}, (_, i) => { const s = i === n - 1 ? nova : 1; return <mesh key={i} rotation={[Math.PI / 2 - 0.5, f * 0.004, 0]} scale={[s, 1, s]}><cylinderGeometry args={[0.42 + i * 0.12, 0.42 + i * 0.12, 0.28 - i * 0.012, 64, 1, true]} /><meshStandardMaterial color={new THREE.Color(CORES[i]).lerp(new THREE.Color('#ff6a20'), quente * 0.4)} roughness={1} side={THREE.DoubleSide} /></mesh>; })}
  {Array.from({length: n}, (_, i) => <mesh key={'t' + i} rotation={[Math.PI / 2 - 0.5, 0, 0]} position={[0, Math.cos(0.5) * (0.14 - i * 0.006), Math.sin(0.5) * (0.14 - i * 0.006)]} scale={i === n - 1 ? nova : 1}><ringGeometry args={[0.32 + i * 0.12, 0.42 + i * 0.12, 64]} /><meshStandardMaterial color={new THREE.Color(CORES[i]).multiplyScalar(1.15)} roughness={1} side={THREE.DoubleSide} /></mesh>)}
</>;
const CantoAnel: React.FC<{k: number}> = ({k}) => {
  const {fps} = useVideoConfig(); void fps;
  const n = CAMADAS[k];
  if (n === 0) return null;
  return <div style={{position: 'absolute', top: 30, left: 30, width: 190, height: 190}}>
    <ThreeCanvas width={190} height={190} camera={{fov: 30, position: [0, 0, 5.2]}} gl={{antialias: true, alpha: true}}>
      <ambientLight intensity={0.6} /><directionalLight position={[2, 3, 4]} intensity={1.6} />
      <group scale={0.95}><Anel n={n} f={0} quente={k >= 6 && k <= 8 ? 1 : 0} /></group>
    </ThreeCanvas>
  </div>;
};
// cartão de capítulo: tela escura com o anel grande; nos saltos de tempo ganha uma camada
const CartaoAnel: React.FC<{k: number}> = ({k}) => {
  const d = useD();
  return <CartaoF k={k} d={d} />;
};
const CartaoF: React.FC<{k: number; d: number}> = ({k, d}) => <CP>{(f) => { const n = Math.max(1, CAMADAS[k]); const nova = CAMADAS[k] > CAMADAS[k - 1] ? pr(f, 8, 34, Easing.out(Easing.back(1.6))) : 1; const o = interpolate(f, [0, 6, d - 10, d], [0, 1, 1, 0], cl); return <>
  <Cam pos={[0, 0, 4.2 - pr(f, 0, d) * 0.4]} /><color attach="background" args={['#020306']} /><ambientLight intensity={0.5 * o} /><directionalLight position={[2, 3, 4]} intensity={2 * o} />
  <group scale={o}><Anel n={k >= 3 ? n : 0} nova={nova} f={f} quente={k >= 6 && k <= 8 ? 1 : 0} /></group>
  {k < 3 || k === 9 ? <Brilho pos={[0, 0, 0]} s={1.2} cor={k === 9 ? '#7fdcff' : '#ffd8a0'} o={0.3 * o} /> : null}
  <Pos bloom={0.5} /></>; }}</CP>;

// ---------- plano ----------
const CAPS: Cap[] = [
  {canto: '', sat: 1}, {canto: '', sat: 1}, {canto: '', sat: 0.95}, {canto: '', sat: 0.88}, {canto: '', sat: 0.8},
  {canto: '', sat: 0.72}, {canto: '', sat: 0.62}, {canto: '', sat: 0.55}, {canto: '', sat: 0.5}, {canto: '', sat: 1},
];
const PLANO: [string, React.FC][][] = [
  [['os continentes andam', H1], ['parece nada', H2], ['mas da tempo', H3], ['hoje voce vai dormir', H4], ['e cada vez que abrir', H5], ['ate sobrar um continente', H6], ['mas fica ate o fim', H7], ['porque existe um mapa', H8]],
  [['voce esta numa praia', C1a], ['pe na areia', C1b], ['do outro lado desse', C1c], ['e debaixo dos seus', C1d], ['no meio do atlantico', C1e], ['por ela sobe rocha', C1f], ['mais ou menos o quanto', C1g], ['no pacifico o fundo', C1h], ['parece pouco', C1i], ['e assim que oceanos nascem', C1j], ['e e assim que oceanos', C1k]],
  [['agora olha o mapa', C2a], ['o bico do nordeste', C2b], ['nao e coincidencia', C2c], ['em mil novecentos', C2d], ['as rochas mais antigas', C2e], ['o brasil e a africa ja', C2f], ['entao imagina', C2g], ['o atlantico some', C2h], ['o nordeste entra direto', C2i], ['voce sai de casa', C2j], ['so que o planeta', C2k], ['ele fecha devagar', C2l], ['entao voce fecha os olhos', C2m]],
  [['voce acorda cinquenta', C3a], ['a primeira coisa', C3b], ['e ele esta sumindo', C3c], ['a africa empurrou', C3d], ['uma cordilheira onde', C3e], ['e la em cima', C3f], ['uma das teorias', C3g], ['os cientistas ja deram', C3h], ['pode comecar daqui', C3i], ['voce ainda tem espaco', C3j], ['mas ai', C3k]],
  [['cem milhoes de anos e', C4a], ['e aqui o futuro', C4b], ['tem uma pergunta', C4c], ['o atlantico continua', C4d], ['se ele continuar', C4e], ['e quem morre', C4f], ['as americas vao de', C4g], ['se ele comecar', C4h], ['e pode ser que', C4i], ['perto do estreito', C4j], ['sao quatro caminhos', C4k], ['quatro mapas do futuro', C4l], ['e voce esta em cima', C4m]],
  [['duzentos milhoes de anos voce', C5a], ['nesse mapa os continentes', C5b], ['uma equipe da nasa', C5c], ['e o resultado', C5d], ['ainda da pra viver', C5f], ['tem agua liquida', C5e], ['voce sobrevive', C5g], ['e o proximo e muito', C5h]],
  [['duzentos e cinquenta milhoes de anos voce', C6a], ['voce abre o olho', C6b], ['o atlantico fechou', C6c], ['a africa girou', C6d], ['a europa e a asia', C6e], ['e onde antes', C6f], ['os cientistas chamam', C6g], ['um continente so e', C6h], ['e voce esta bem', C6i], ['voce tenta achar', C6j]],
  [['ai vem o calor', C7a], ['primeiro o sol', C7b], ['segundo os vulcoes', C7c], ['o ar fica com', C7d], ['terceiro o proprio', C7e], ['cientistas da universidade', C7f], ['em boa parte', C7g], ['no interior o verao', C7h], ['e com o ar umido', C7i], ['o corpo nao consegue', C7j]],
  [['entao voce corre', C8a], ['nesse modelo so', C8b], ['o que sobra sao', C8c], ['todo o resto e', C8d], ['voce chega na costa', C8e], ['e tem todo ser vivo', C8f]],
  [['mas espera esse', C9a], ['e tem um que', C9b], ['o nome dele', C9c], ['nele o atlantico', C9d], ['a mesma equipe', C9e], ['e nele o planeta', C9f], ['o mesmo planeta', C9g], ['agora voce sobe', C9h], ['um continente so cercado', C9i], ['e percebe', C9j], ['e os continentes costumam', C9k], ['a terra abre e fecha', C9l], ['ninguem sabe ainda', C9m], ['mas a sua unha', C9n]],
];
const Fim: React.FC = () => <Final />;
const L = criarLongo({W, plano: PLANO, caps: CAPS, audio: 'pangeialongo/narracao_cap.mp3', musica: 'pangeialongo/musica.mp3', volta: 9, fim: Fim,
  semTexto: true, legenda: 40, cartao: CartaoAnel, canto: CantoAnel,
  hits: [{frase: 'mas da tempo', vol: 0.35}, {frase: 'o atlantico fechou', vol: 0.4}, {frase: 'ai vem o calor', vol: 0.35}]});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// thumb: "UM SÓ CONTINENTE" — supercontinente laranja e rachado, uma silhueta minúscula na borda
export const ThumbCena: React.FC = () => <CP>{() => <>
  <Cam pos={[-0.55, 0.2, 2.35]} alvo={[-0.42, 0.05, 0]} /><Luzes sol={[1, 2, 4]} i={2.8} amb={0.4} /><Estrelas sem="thl" />
  <group rotation={[0, -1.9, 0]}>
    <Super s="ultima" calor={1.3} atmCor="1.0,0.4,0.1" />
    <group position={V(v(14, 52, 1.0))} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v(14, 52))}><Boneco s={0.2} cor="#000000" /></group>
  </group>
  <Brilho pos={[0.6, 0.1, -0.5]} s={4.5} cor="#ff4a10" o={0.35} />
  <Pos bloom={1.3} /></>}</CP>;
void AbsoluteFill; void lerp3; void Pedras; void Nuvem;
