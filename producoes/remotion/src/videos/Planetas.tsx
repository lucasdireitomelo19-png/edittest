// Short "QUANTO TEMPO VOCÊ SOBREVIVERIA EM CADA PLANETA? 🪐⏱️" (lote 14/11/2026, aprovado). Tudo em Remotion 3D, sem bonequinho nem foto real.
// Na tela: barra branca no 1º trecho, NOME + TEMPO grandes no centro em cada mundo, legenda (56). Sem selos. Técnico de 1966 = só o traje vazio.
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Lua, Terra, pr, cl, THREE} from '../lote/kit3d';
import {Planeta, texPlaneta} from '../lote/planetas3d';
import {relevo, LAT, Viva, Tubo} from './Apophis';
import palavras from './planetas.palavras.json';

const W = palavras as Palavra[];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const SOLO = relevo(140, (x, z, i) => Math.sin(x * 0.6) * Math.cos(z * 0.5) * 0.3 + (random('so' + i) - 0.5) * 0.06 - Math.max(0, 0.6 - Math.hypot(x - 2, z + 4)) * 0.8, 40);
const RACHADO = relevo(160, (x, z, i) => (Math.abs(Math.sin(x * 2.3 + z * 0.7)) < 0.06 || Math.abs(Math.sin(z * 2.1 - x * 0.4)) < 0.05 ? -0.08 : 0) + (random('rc' + i) - 0.5) * 0.03, 20);
const Astronauta: React.FC<{f: number; pos?: [number, number, number]; vazio?: number}> = ({f, pos = [0, 0, 0], vazio = 0}) => { const p = f * 0.15; return <group position={pos}>
  <mesh position={[0, 1.05, 0]}><capsuleGeometry args={[0.28, 0.45, 8, 16]} /><meshStandardMaterial color="#f2f2ee" roughness={0.7} transparent={vazio > 0} opacity={1 - vazio * 0.3} /></mesh>
  <mesh position={[0, 1.65, 0]}><sphereGeometry args={[0.24, 32, 32]} /><meshStandardMaterial color="#f2f2ee" roughness={0.5} /></mesh>
  <mesh position={[0, 1.65, 0.12]}><sphereGeometry args={[0.18, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#d8a030" metalness={1} roughness={0.1} /></mesh>
  <mesh position={[0, 1.1, -0.3]}><boxGeometry args={[0.45, 0.55, 0.2]} /><meshStandardMaterial color="#e2e2dc" /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[l * 0.13, 0.42, Math.sin(p + (l > 0 ? Math.PI : 0)) * 0.18]} rotation={[Math.sin(p + (l > 0 ? Math.PI : 0)) * 0.5, 0, 0]}><capsuleGeometry args={[0.1, 0.45, 6, 12]} /><meshStandardMaterial color="#ecece6" /></mesh>)}
  {[-1, 1].map((l) => <mesh key={'b' + l} position={[l * 0.38, 1.05, -Math.sin(p + (l > 0 ? Math.PI : 0)) * 0.12]} rotation={[-Math.sin(p + (l > 0 ? Math.PI : 0)) * 0.5, 0, l * 0.15]}><capsuleGeometry args={[0.08, 0.4, 6, 12]} /><meshStandardMaterial color="#ecece6" /></mesh>)}
</group>; };

// ---------- cenas ----------
const P1: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.6, 2.2, 4.6 - f * 0.02]} alvo={[0, 1.2, -f * 0.02 - 1]} /><Luzes sol={[-4, 5, 2]} i={2} amb={0.2} /><Estrelas sem="p1" />
  <mesh geometry={SOLO} position={[0, 0, -6]}><meshStandardMaterial color="#6a5a6a" roughness={1} /></mesh>
  <Astronauta f={f} pos={[0, 0, -f * 0.02]} />
  <Planeta t="jupiter" r={3} pos={[-6, 7, -26]} incl={0.2} />
  <Pos bloom={0.6} /></>}</C3>;
const P2: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0, 5.4 - f * 0.01]} /><Luzes sol={[-3, 2, 4]} i={2.8} amb={0.04} /><Estrelas sem="p2" />
  <Lua tex={tex} r={1.25} rot={[0.2, f * 0.004, 0]} />
  <Pos bloom={0.5} /></>}</C3>;
const P3: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.2, 5.4 - f * 0.006]} alvo={[0, 1.2, 0]} /><Luzes sol={[2, 3, 4]} i={1.4} amb={0.2} /><color attach="background" args={['#0a0c10']} />
  <mesh position={[0, 1.4, -0.5]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.6, 1.6, 2.8, 48, 1, true]} /><meshStandardMaterial color="#5a6470" metalness={0.8} roughness={0.35} side={THREE.DoubleSide} /></mesh>
  <mesh position={[0, 1.4, 0.92]}><circleGeometry args={[1.6, 48]} /><meshStandardMaterial color="#6a7480" metalness={0.8} roughness={0.3} /></mesh>
  <mesh position={[0, 1.6, 0.94]}><circleGeometry args={[0.55, 48]} /><meshStandardMaterial color="#9ad0ff" emissive="#2a4a6a" emissiveIntensity={0.6} transparent opacity={0.7} /></mesh>
  <mesh position={[0, 1.6, 0.95]}><ringGeometry args={[0.55, 0.65, 48]} /><meshStandardMaterial color="#c8a040" metalness={0.9} /></mesh>
  {LAT(10).map((i) => { const a = i / 10 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * 1.45, 1.4 + Math.sin(a) * 1.45, 0.95]}><cylinderGeometry args={[0.05, 0.05, 0.06, 12]} /><meshStandardMaterial color="#8a8e96" metalness={0.9} /></mesh>; })}
  <mesh position={[1.3, 3.2, 0.95]}><sphereGeometry args={[0.1, 16, 16]} /><meshBasicMaterial color={Math.floor(f / 6) % 2 ? '#ff2a1a' : '#3a0a08'} toneMapped={false} /></mesh>
  <Pos bloom={0.8} /></>}</C3>;
const P4: React.FC = () => { const d = useD(); return <C3>{(f) => { const luz = f < d * 0.55 ? (Math.floor(f / 4) % 3 ? 0.15 : 1) : 1; return <>
  <Cam pos={[0.4, 1.4, 3.2]} alvo={[0, 1.2, 0]} /><ambientLight intensity={0.08} /><pointLight position={[0, 2.8, 1]} intensity={6 * luz} color="#ffe8c0" distance={6} /><color attach="background" args={['#050608']} />
  <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.8, 1.8, 4, 48, 1, true]} /><meshStandardMaterial color="#3a424c" metalness={0.8} roughness={0.4} side={THREE.BackSide} /></mesh>
  <group rotation={[0, 0.3, 0]}><Astronauta f={0} vazio={1} /></group>
  <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.6, 48]} /><meshStandardMaterial color="#2a2e34" /></mesh>
  <Pos bloom={0.7} /></>; }}</C3>; };
const P5: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.9, 5]} alvo={[0, 0.8, -6]} /><Luzes sol={[-4, 4, 2]} i={1.6} amb={0.3} /><color attach="background" args={['#d8a090']} /><fog attach="fog" args={['#d8a090', 8, 40]} />
  <mesh geometry={SOLO} position={[0, -0.2, -6]}><meshStandardMaterial color="#a8583a" roughness={1} /></mesh>
  <Nuvem n={200} sem="p5" origem={new THREE.Vector3(-4 + f * 0.04, 0.2, -2)} t={60} raio={3} cor="#c87a5a" tam={0.15} o={0.25} dir={new THREE.Vector3(1, 0.1, 0)} />
  <Brilho pos={[4, 6, -30]} s={2} cor="#f0f4ff" o={0.6} />
  <Pos bloom={0.5} /></>}</C3>;
const P6: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.4, 5.4]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.06} /><Estrelas sem="p6" />
  <Planeta t="marte" r={1.3} giro={f * 0.006} />
  <mesh scale={1.36}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#ff9a7a" transparent opacity={0.08} side={THREE.BackSide} /></mesh>
  <Pos bloom={0.5} /></>}</C3>;
const P7: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[lerp(-3, 3, pr(f, 0, d)), 0.3, 5]} alvo={[0, 0, 0]} /><Luzes sol={[6, 1, 1]} i={3.4} amb={0.02} /><Estrelas sem="p7" />
  <Planeta t="mercurio" r={1.2} giro={f * 0.003} />
  <mesh rotation={[0, 0, 0]}><sphereGeometry args={[1.21, 64, 64, -Math.PI / 2, Math.PI]} /><meshBasicMaterial color="#ff6a20" transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
  <Brilho pos={[14, 1, 0]} s={12} cor="#fff0c0" o={0.9} />
  <Pos bloom={0.8} /></>}</C3>; };
const P8: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.3, 4]} alvo={[0, 0, -2]} tremor={0.01} /><Luzes sol={[2, 3, 2]} i={2.6} amb={0.2} /><color attach="background" args={['#020102']} /><Estrelas sem="p8" />
  <mesh geometry={RACHADO}><meshStandardMaterial color="#6a5a50" roughness={1} emissive="#ff3a10" emissiveIntensity={0.15 + 0.1 * Math.sin(f * 0.2)} /></mesh>
  <Brilho pos={[0, 6, -18]} s={14} cor="#fff4d0" o={1} />
  <Pos bloom={1.1} /></>}</C3>;
const P9: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.3, 5.4 - f * 0.006]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.1} /><Estrelas sem="p9" />
  <Planeta t="venus" r={1.3} giro={-f * 0.004} />
  <mesh scale={1.38}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#ffd890" transparent opacity={0.12} side={THREE.BackSide} /></mesh>
  <Pos bloom={0.6} /></>}</C3>;
const P10: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, lerp(2, -6, k), 3]} alvo={[0, lerp(1, -8, k), 0]} /><ambientLight intensity={lerp(0.6, 0.05, k)} /><color attach="background" args={['#' + new THREE.Color('#1a5a8a').lerp(new THREE.Color('#010308'), k).getHexString()]} />
  <fog attach="fog" args={['#' + new THREE.Color('#1a5a8a').lerp(new THREE.Color('#010308'), k).getHexString(), 2, 14]} />
  {LAT(60).map((i) => { const y = ((f * 0.03 + random('bo' + i) * 12) % 12) - 10 + lerp(0, -8, k) * 0.2; return <mesh key={i} position={[(random('bx' + i) - 0.5) * 6, y, (random('bz' + i) - 0.5) * 4]} scale={0.03 + random('bs' + i) * 0.05}><sphereGeometry args={[1, 12, 12]} /><meshBasicMaterial color="#cfeaff" transparent opacity={0.6} /></mesh>; })}
  <mesh position={[0, lerp(0, -8, k), 0]}><boxGeometry args={[0.6, 0.5, 0.6]} /><meshStandardMaterial color="#d8dce2" metalness={0.7} roughness={0.3} emissive="#ffd870" emissiveIntensity={0.2} /></mesh>
  <Pos bloom={0.6} /></>; }}</C3>; };
const P11: React.FC = () => <C3>{(f) => <>
  <Cam pos={[2.4, 1.2, 3.6]} alvo={[0, 0.6, 0]} /><Luzes sol={[-2, 5, 2]} i={1.4} amb={0.4} /><color attach="background" args={['#c87a30']} /><fog attach="fog" args={['#c8823a', 3, 16]} />
  <mesh geometry={RACHADO} position={[0, -0.05, 0]}><meshStandardMaterial color="#6a4a2a" roughness={1} /></mesh>
  <group><mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.7, 0.8, 0.4, 32]} /><meshStandardMaterial color="#8a8e96" metalness={0.8} roughness={0.3} /></mesh>
    <mesh position={[0, 0.85, 0]}><sphereGeometry args={[0.5, 32, 32]} /><meshStandardMaterial color="#b8bcc4" metalness={0.8} roughness={0.25} /></mesh>
    <mesh position={[0, 1.45, 0]}><cylinderGeometry args={[0.05, 0.05, 0.6, 8]} /><meshStandardMaterial color="#888" /></mesh>
    {LAT(8).map((i) => { const a = i / 8 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * 0.95, 0.42, Math.sin(a) * 0.95]} rotation={[0, -a, 0.4]}><boxGeometry args={[0.4, 0.04, 0.2]} /><meshStandardMaterial color="#aab0b8" metalness={0.8} /></mesh>; })}</group>
  <Nuvem n={200} sem="p11" origem={new THREE.Vector3(0, 1, 0)} t={20 + f} raio={3} cor="#f0d8b0" tam={0.25} o={0.4} dir={new THREE.Vector3(0, 1, 0)} />
  <Pos bloom={0.6} /></>}</C3>;
const GIG: [string, number, number, boolean?][] = [['jupiter', 1.2, -2.5], ['saturno', 1.0, -0.2, true], ['urano', 0.6, 1.9], ['netuno', 0.58, 3.2]];
const P12: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.2, 0.3, 11 - f * 0.01]} alvo={[0.2, 0, 0]} /><Luzes sol={[-6, 3, 8]} i={2.6} amb={0.08} /><Estrelas sem="p12" />
  {GIG.map(([t, r, y, a], i) => <Planeta key={t} t={t as 'jupiter'} r={r} pos={[0, -y * 1.15 + 0.4, 0]} giro={f * 0.01 * (i + 1)} anel={a} />)}
  <Pos bloom={0.5} /></>}</C3>;
const P13: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, Easing.in(Easing.quad)); return <>
  <Cam pos={[0, 0, lerp(4.6, 1.02, k)]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.1} /><Estrelas sem="p13" />
  <Planeta t="jupiter" r={1} giro={f * 0.01} />
  <Pos bloom={0.5} /></>; }}</C3>; };
const P14: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 1, 4]} alvo={[0, lerp(0.5, -2, k), 0]} /><ambientLight intensity={0.5} /><color attach="background" args={['#5a3a20']} /><fog attach="fog" args={['#3a2410', 2, 12]} />
  {LAT(9).map((i) => <mesh key={i} position={[0, 2 - i * 0.9, -2]} rotation={[0, 0, 0]}><planeGeometry args={[20, 0.6]} /><meshBasicMaterial color={i % 2 ? '#c88a5a' : '#e8c89a'} transparent opacity={0.5} /></mesh>)}
  <group position={[Math.sin(f * 0.05) * 0.2, lerp(2, -3, k), 0]}><mesh><coneGeometry args={[0.35, 0.4, 24]} /><meshStandardMaterial color="#c8a040" metalness={0.8} emissive="#ff6a20" emissiveIntensity={k * 1.5} /></mesh></group>
  <Brilho pos={[0, lerp(2, -3, k), 0.1]} s={0.6} cor="#ff8a40" o={1 - k} />
  <Pos bloom={0.8} /></>; }}</C3>; };
const P15: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, Easing.in(Easing.cubic)); return <>
  <Cam pos={[0, 0, lerp(9, 1.15, k)]} alvo={[0, 0, 0]} tremor={k * 0.02} /><Estrelas sem="p15" />
  <Planeta t="sol" r={1} giro={f * 0.004} brilho />
  <Brilho pos={[0, 0, 0]} s={4.5} cor="#ffcf70" o={0.8} />
  <mesh position={[0, 0, lerp(9, 1.15, k) - 0.2]}><planeGeometry args={[4, 4]} /><meshBasicMaterial color="#fff" transparent opacity={pr(f, d * 0.7, d)} toneMapped={false} /></mesh>
  <Pos bloom={1.4} /></>; }}</C3>; };
const FILA: [string, number][] = [['mercurio', 0.25], ['venus', 0.4], ['terra', 0.42], ['marte', 0.3], ['jupiter', 0.9], ['saturno', 0.8], ['urano', 0.55], ['netuno', 0.55]];
const P16: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0, 7 + f * 0.03]} alvo={[0, 0, 0]} /><Luzes sol={[-4, 3, 8]} i={2.6} amb={0.1} /><Estrelas sem="p16" />
  {FILA.map(([t, r], i) => { const y = 3.4 - i * 0.98; return t === 'terra' ? <Terra key={t} tex={tex} r={r} pos={[0, y, 0]} rot={[0.3, f * 0.01, 0]} /> : <Planeta key={t} t={t as 'marte'} r={r} pos={[0, y, 0]} giro={f * 0.01} anel={t === 'saturno'} />; })}
  <Pos bloom={0.5} /></>}</C3>;

const PLANO: K.Plano = [
  ['quanto tempo voce', P1], ['na lua nao tem', P2], ['e isso ja aconteceu', P3], ['apagou em quinze', P4], ['em marte o ar', P5], ['pelas nossas contas', P6],
  ['em mercurio o lado', P7], ['sem ar e dentro', P8], ['em venus a pressao', P9], ['como estar a quase', P10], ['uma sonda sovietica', P11],
  ['jupiter saturno urano', P12], ['voce afunda', P13], ['em jupiter uma sonda', P14], ['e o sol', P15], ['em qual voce', P16],
];
const ROT: [string, string, string][] = [['na lua nao tem', 'LUA', '~15 S'], ['em marte o ar', 'MARTE', '~15 S'], ['em mercurio o lado', 'MERCÚRIO', 'SEGUNDOS'], ['em venus a pressao', 'VÊNUS', 'SEGUNDOS'], ['jupiter saturno urano', 'GIGANTES', 'SEGUNDOS'], ['e o sol', 'SOL', '0 S']];
const Extra: React.FC = () => {
  const f = useCurrentFrame();
  const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const barra = interpolate(f, [0, 4, at('na lua nao tem') - 6, at('na lua nao tem')], [0, 1, 1, 0], cl);
  const r = ROT.find(([fr], i) => f >= at(fr) && f < at(fr) + 90 && (i === ROT.length - 1 || f < at(ROT[i + 1][0])));
  const ini = r ? at(r[0]) : 0; const s = interpolate(f - ini, [0, 6, 12], [0.6, 1.12, 1], {...cl, easing: Easing.out(Easing.cubic)}); const o = interpolate(f - ini, [0, 4, 76, 90], [0, 1, 1, 0], cl);
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {barra > 0 && <div style={{position: 'absolute', top: 150, left: 40, right: 40, padding: '26px 30px', background: '#fff', borderRadius: 16, opacity: barra, fontFamily: FONTE, fontSize: 64, lineHeight: 1.1, color: '#111', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.5)'}}>QUANTO TEMPO VOCÊ AGUENTARIA EM CADA PLANETA?</div>}
    {r && <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', opacity: o, transform: `scale(${s})`, fontFamily: FONTE, color: '#fff', WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 10px 30px rgba(0,0,0,.7)'}}>
      <div style={{fontSize: 130, lineHeight: 1}}>{r[1]}</div><div style={{fontSize: 110, color: '#ffd23f', lineHeight: 1.1}}>{r[2]}</div></div>}
  </AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'planetas/narracao.mp3', 'em qual voce', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void Viva; void Tubo; void texPlaneta; void useD;
