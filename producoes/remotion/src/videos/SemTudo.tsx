// Short "A TERRA SEM ATMOSFERA, SEM GRAVIDADE, SEM LUA E SEM HUMANOS 🌍" (aprovado pelo dono em 19/11/2026). Remotion 3D realista, ritmo rápido, sem foto nem bonequinho.
// Na tela: BARRA BRANCA fixa no topo ("POV: A Terra sem ATMOSFERA…" → GRAVIDADE → LUA → HUMANOS) e a legenda (56). Sem selos.
// Cuidados: silhueta que sobe é distante e sem detalhe; a Terra nunca explode; Chernobyl só com natureza e lobos.
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Terra, Lua, pr, cl, THREE} from '../lote/kit3d';
import {relevo, PLANICIE, LAT, Viva, Tubo, Arvore, Ceu, canvasTex} from './Apophis';
import {TerraGira} from './Girando';
import palavras from './semtudo.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: string, b: string, t: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), Math.max(0, Math.min(1, t))).getHexString();
const PRAIA = relevo(120, (x, z) => Math.max(-0.5, (-z - 1) * 0.1) + Math.sin(x * 0.7) * 0.04, 30);
const ROCHA = relevo(120, (x, z, i) => Math.max(0, 2.6 - Math.abs(z + 1) * 0.8) * (0.9 + Math.sin(x * 1.3) * 0.1) + (random('rs' + i) - 0.5) * 0.08, 16);
const Lobo: React.FC<{pos: V3; f: number; rot?: number}> = ({pos, f, rot = 0}) => { const p = f * 0.4; return <group position={pos} rotation={[0, rot, 0]} scale={0.6}>
  <mesh position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.18, 0.7, 8, 16]} /><meshStandardMaterial color="#5a5450" roughness={1} /></mesh>
  <mesh position={[0.55, 0.72, 0]} rotation={[0, 0, -0.3]}><coneGeometry args={[0.13, 0.4, 12]} /><meshStandardMaterial color="#5a5450" roughness={1} /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[0.55, 0.92, l * 0.07]}><coneGeometry args={[0.04, 0.12, 6]} /><meshStandardMaterial color="#4a4440" /></mesh>)}
  {[[0.3, 0.12], [0.3, -0.12], [-0.3, 0.12], [-0.3, -0.12]].map(([x, z], i) => <mesh key={i} position={[x, 0.22, z]} rotation={[0, 0, Math.sin(p + i * 1.6) * 0.4]}><cylinderGeometry args={[0.04, 0.04, 0.45, 8]} /><meshStandardMaterial color="#4a4440" /></mesh>)}
  <mesh position={[-0.55, 0.6, 0]} rotation={[0, 0, 0.9]}><capsuleGeometry args={[0.05, 0.3, 6, 10]} /><meshStandardMaterial color="#5a5450" /></mesh>
</group>; };

// ---------- cenas ----------
const S1: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[Math.sin(f * 0.01) * 5.4, 0.6, Math.cos(f * 0.01) * 5.4]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.06} /><Estrelas sem="t1" />
  <Terra tex={tex} rot={[0.3, f * 0.004, 0]} />
  <Pos bloom={0.7} /></>}</C3>;
const S2: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 0.8, 5.4]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.06} /><Estrelas sem="t2" />
  <Terra tex={tex} rot={[0.3, f * 0.004, 0]} atm={false} nuvens={k < 0.6} />
  <mesh scale={1.1 + k * 0.6}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#6ab0ff" transparent opacity={0.25 * (1 - k)} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
  <Nuvem n={600} sem="t2" origem={new THREE.Vector3(0, 0, 0)} t={20 + f * 1.4} raio={3} cor="#8ac8ff" tam={0.04} o={0.6 * (1 - k)} add />
  <Pos bloom={0.8} /></>; }}</C3>; };
const S3: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.7); return <>
  <Cam pos={[0, 0.6, 6]} alvo={[0, 3, -10]} /><Luzes sol={[2, 6, -10]} i={2.2} amb={0.3} />
  <Ceu cima={mix('#2a6ac8', '#000000', k)} baixo={mix('#bfe0ff', '#05060a', k)} />{k > 0.4 && <Estrelas sem="t3" />}
  <mesh geometry={PRAIA}><meshStandardMaterial color="#d8c090" roughness={1} /></mesh>
  <Viva n={80} tam={40} pos={[0, -0.15, -12]} h={(x) => Math.sin(x * 0.9 + f * 0.06) * 0.04} mat={<meshStandardMaterial color="#1a5a8a" roughness={0.2} metalness={0.4} />} />
  <Brilho pos={[4, 7, -40]} s={6} cor="#ffffff" o={1} />
  <Pos bloom={0.9} /></>; }}</C3>; };
const S4: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.45), g = pr(f, d * 0.5, d); return <>
  <Cam pos={[0, 1, 4]} alvo={[0, 0, -4]} tremor={0.01 * (1 - g)} /><ambientLight intensity={0.35} /><directionalLight position={[3, 5, 2]} intensity={1.6} /><color attach="background" args={['#000000']} /><Estrelas sem="t4" />
  <Viva n={140} tam={30} h={(x, z) => g > 0.5 ? (random('gx' + Math.round(x * 3) + Math.round(z * 3)) - 0.5) * 0.06 : Math.sin(x * 4 + f * 0.6) * Math.cos(z * 3 - f * 0.5) * 0.08 * k} mat={<meshStandardMaterial color={mix('#1a5a8a', '#dce8f4', g)} roughness={g > 0.5 ? 0.7 : 0.1} metalness={0.3} />} />
  {g < 0.5 && <Nuvem n={600} sem="t4" origem={new THREE.Vector3(0, 0, -4)} t={20 + f} raio={8} cor="#f4f8ff" tam={0.4} o={0.4 * k} dir={new THREE.Vector3(0, 2, 0)} />}
  <Pos bloom={0.6} /></>; }}</C3>; };
const S5: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 4, d * 0.8); return <>
  <Cam pos={[1.6, 1.4, 4]} alvo={[0, 1, 0]} /><Luzes sol={[-2, 4, 3]} i={0.8} amb={0.4} /><color attach="background" args={['#020206']} /><Estrelas sem="t5" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#dce4ec" roughness={0.9} /></mesh>
  <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.07, 0.07, 2.2, 16]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.6} /></mesh>
  <mesh position={[0, 0.12, 0]}><sphereGeometry args={[0.15, 24, 24]} /><meshBasicMaterial color="#5ab0ff" /></mesh>
  <mesh position={[0, lerp(1.7, 0.5, k) / 2 + 0.12, 0.02]} scale={[1, lerp(1.7, 0.5, k), 1]}><cylinderGeometry args={[0.035, 0.035, 1, 12]} /><meshBasicMaterial color="#5ab0ff" /></mesh>
  {LAT(10).map((i) => <mesh key={i} position={[0.12, 0.3 + i * 0.2, 0]}><boxGeometry args={[0.08, 0.012, 0.01]} /><meshBasicMaterial color="#222" /></mesh>)}
  <Pos bloom={0.5} /></>; }}</C3>; };
const S6: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0.6, 5.4]} /><Luzes sol={[-3, 2, 4]} i={2.4} amb={0.08} /><Estrelas sem="t6" />
  <TerraGira tex={tex} ang={f * 0.05} rastro={0.05} />
  {LAT(6).map((i) => { const a = f * 0.05 + i * 1.05; return <Tubo key={i} pts={[[Math.cos(a) * 1.02, 0, -Math.sin(a) * 1.02], [Math.cos(a) * 1.02 - Math.sin(a) * 0.5, 0, -Math.sin(a) * 1.02 - Math.cos(a) * 0.5]]} r={0.015} cor="#ffd23f" brilho={1.6} />; })}
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.02, 0.006, 8, 200]} /><meshBasicMaterial color="#ffd23f" toneMapped={false} /></mesh>
  <Pos bloom={0.9} /></>}</C3>;
const S7: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, Easing.in(Easing.quad)); return <>
  <Cam pos={[0, lerp(1, 6, k), lerp(6, 14, k)]} alvo={[0, lerp(1.5, 8, k), 0]} /><Luzes sol={[-3, 5, 3]} i={1.6} amb={0.35} /><Ceu cima="#1a3a7a" baixo="#9ac0e0" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#4a6a3a" roughness={1} /></mesh>
  {LAT(80).map((i) => { const y = Math.max(0, f - random('wy' + i) * 30) * 0.08 * (0.5 + random('wv' + i)); return <mesh key={i} position={[(random('wx' + i) - 0.5) * 10, 0.2 + y, (random('wz' + i) - 0.5) * 6 - 2]} scale={0.08 + random('ws' + i) * 0.1}><sphereGeometry args={[1, 12, 12]} /><meshPhysicalMaterial color="#6ab8ff" roughness={0.05} transparent opacity={0.7} /></mesh>; })}
  <Nuvem n={300} sem="t7" origem={new THREE.Vector3(0, 3, -6)} t={40 + f} raio={10} cor="#ffffff" tam={1.2} o={0.35} dir={new THREE.Vector3(0, 2, 0)} />
  <group position={[2.2, 0.2 + Math.max(0, f - 10) * 0.07, -3]} scale={0.4}><mesh position={[0, 0.6, 0]}><capsuleGeometry args={[0.12, 0.4, 8, 16]} /><meshStandardMaterial color="#0e1218" /></mesh><mesh position={[0, 1, 0]}><sphereGeometry args={[0.11, 16, 16]} /><meshStandardMaterial color="#0e1218" /></mesh></group>
  <Pos bloom={0.5} /></>; }}</C3>; };
const S8: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, d * 0.35, d); return <>
  <Cam pos={[0, 1, 6]} alvo={[0, 3, -10]} /><ambientLight intensity={0.2} /><Ceu cima="#01020a" baixo="#0a1428" /><Estrelas sem="t8" />
  <Lua tex={tex} pos={[2, lerp(5, 9, k), -20]} r={lerp(1.4, 0.01, k)} />
  <directionalLight position={[0, 1, 10]} intensity={2.2} color="#ffffff" /><Brilho pos={[2, lerp(5, 9, k), -21]} s={lerp(5, 0.1, k)} cor="#c8d8ff" o={0.5 * (1 - k)} />
  <mesh geometry={PRAIA}><meshStandardMaterial color="#5a5040" roughness={1} /></mesh>
  <Viva n={80} tam={40} pos={[0, lerp(-0.05, -0.35, k), -12]} h={(x) => Math.sin(x * 0.9 + f * 0.04) * 0.02} mat={<meshStandardMaterial color="#0a1a2a" roughness={0.2} metalness={0.4} />} />
  <Pos bloom={0.8} /></>; }}</C3>; };
const S9: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.4, 6]} alvo={[0, 2.4, -10]} /><ambientLight intensity={0.14} /><color attach="background" args={['#000000']} /><Estrelas sem="t9" n={4000} />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#05060a" roughness={1} /></mesh>
  {LAT(8).map((i) => <Arvore key={i} pos={[-6 + i * 1.7, 0, -3 - (i % 3)]} s={1.6} />)}
  <Pos bloom={0.8} /></>}</C3>;
const S10: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const t = f / d; const inc = 0.41 + (t < 0.55 ? Math.sin(f * 0.18) * 0.5 * (1 - t) : Math.sin(f * 0.18) * 0.06); return <>
  <Cam pos={[0, 0.3, 5.6]} /><Luzes sol={[-3, 2, 4]} i={2.4} amb={0.08} /><Estrelas sem="t10" />
  <group rotation={[0, 0, inc]}><Terra tex={tex} rot={[0, f * 0.02, 0]} /><mesh><cylinderGeometry args={[0.008, 0.008, 3, 8]} /><meshBasicMaterial color={t < 0.55 ? '#ff5a3a' : '#3aff8a'} toneMapped={false} /></mesh></group>
  <Pos bloom={0.7} /></>; }}</C3>; };
const S11: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0.4, 1.2, 4]} alvo={[0, 1.2, -10]} /><ambientLight intensity={0.15} /><color attach="background" args={['#050605']} />
  <mesh position={[0, 1.6, -4]}><boxGeometry args={[3.4, 3.2, 14]} /><meshStandardMaterial color="#5a5a54" side={THREE.BackSide} /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[l * 0.9, 0.5, -4]}><boxGeometry args={[0.8, 1, 14]} /><meshStandardMaterial color="#8a8478" /></mesh>)}
  {[-0.25, 0.25].map((x) => <mesh key={x} position={[x, 0.08, -4]}><boxGeometry args={[0.06, 0.06, 14]} /><meshStandardMaterial color="#6a6a6a" metalness={0.8} /></mesh>)}
  <Viva n={40} tam={12} pos={[0, lerp(-0.1, 0.6, k), -4]} h={(x, z) => Math.sin(x * 2 + f * 0.1) * 0.02 + Math.sin(z + f * 0.07) * 0.02} mat={<meshStandardMaterial color="#3a4a3a" roughness={0.1} metalness={0.5} transparent opacity={0.85} />} />
  {LAT(5).map((i) => <pointLight key={i} position={[0, 2.8, -i * 3]} intensity={(i + Math.floor(f / 7)) % 4 ? 1 : 0.2} color="#e8f0d8" distance={4} />)}
  <Pos bloom={0.5} /></>; }}</C3>; };
const S12: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.8, 7 - f * 0.02]} alvo={[0, 1, -6]} /><Luzes sol={[-3, 5, 2]} i={1.6} amb={0.35} /><Ceu cima="#7a9ab8" baixo="#d8e0d0" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#4a5a3a" /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -6]}><planeGeometry args={[3, 30]} /><meshStandardMaterial color="#5a5a52" /></mesh>
  {[-1, 1].map((l) => LAT(5).map((i) => <group key={l + '' + i} position={[l * 4, 0, -i * 4 - 2]}><mesh position={[0, 2.5, 0]}><boxGeometry args={[2.4, 5, 2.4]} /><meshStandardMaterial color="#8a8478" roughness={1} /></mesh>
    {LAT(12).map((j) => <mesh key={j} position={[-l * 1.21, 0.6 + Math.floor(j / 3) * 1.1, (j % 3 - 1) * 0.7]}><planeGeometry args={[0.4, 0.5]} /><meshBasicMaterial color="#1a1a18" side={THREE.DoubleSide} /></mesh>)}</group>))}
  {LAT(24).map((i) => <Arvore key={'a' + i} pos={[(random('ax' + i) - 0.5) * 6, 0, -random('az' + i) * 20]} s={1 + random('as' + i) * 1.4} />)}
  <Lobo pos={[-2 + f * 0.04, 0, -3]} f={f} rot={0} /><Lobo pos={[-3 + f * 0.042, 0, -4]} f={f + 7} /><Lobo pos={[-2.6 + f * 0.038, 0, -2.4]} f={f + 3} />
  <Pos bloom={0.4} /></>}</C3>;
const S13: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, Easing.inOut(Easing.sin)); const est = (f * 0.08) % 4; const cor = ['#5a8a3a', '#c8a040', '#e8eef4', '#7ab04a'][Math.floor(est)]; return <>
  <Cam pos={[0, 1.6, lerp(6, 12, k)]} alvo={[0, 2.2, -1]} /><Luzes sol={[-3, 5, 4]} i={1.8} amb={0.35} /><Ceu cima="#4a7ab8" baixo="#d8e8f0" />
  <mesh geometry={ROCHA} position={[0, 0, -1]}><meshStandardMaterial color="#a89c8a" roughness={1} /></mesh>
  {LAT(4).map((i) => <group key={i} position={[(i - 1.5) * 1.2, 2.3, -0.4]}><mesh scale={[0.4, 0.55, 0.3]}><sphereGeometry args={[1, 24, 24]} /><meshStandardMaterial color="#b8ac98" roughness={1} /></mesh></group>)}
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color={cor} /></mesh>
  {LAT(20).map((i) => <Arvore key={i} pos={[(random('rx' + i) - 0.5) * 14, 0, 1 + random('rz' + i) * 3]} s={0.5 + k * 1.4} />)}
  <Pos bloom={0.4} /></>; }}</C3>; };

const PLANO: K.Plano = [
  ['e se a terra', S1], ['primeiro a atmosfera', S2], ['o ceu fica preto', S3], ['os oceanos fervem', S4], ['sem ar pra guardar', S5],
  ['e ai a gravidade', S6], ['sem nada segurando', S7], ['e ai a lua', S8], ['as noites ficam', S9], ['um estudo calculou', S10],
  ['e ai os humanos', S11], ['em chernobyl sem', S12], ['e o rosto do', S13],
];
const BARRA: [string, string][] = [['primeiro a atmosfera', 'ATMOSFERA'], ['e ai a gravidade', 'GRAVIDADE'], ['e ai a lua', 'LUA'], ['e ai os humanos', 'HUMANOS']];
const Extra: React.FC = () => {
  const f = useCurrentFrame(); const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const i = BARRA.reduce((acc, [fr], j) => (f >= at(fr) ? j : acc), -1);
  if (i < 0) return null;
  const s = interpolate(f - at(BARRA[i][0]), [0, 5, 10], [0.9, 1.04, 1], cl);
  return <AbsoluteFill><style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <div style={{position: 'absolute', top: 150, left: 40, right: 40, padding: '24px 28px', background: '#fff', borderRadius: 16, transform: `scale(${s})`, fontFamily: FONTE, fontSize: 62, color: '#111', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.5)'}}>
      POV: A Terra sem <span style={{color: '#e0180c'}}>{BARRA[i][1]}</span>…</div></AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'semtudo/narracao.mp3', 'e ai os humanos', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void canvasTex;
