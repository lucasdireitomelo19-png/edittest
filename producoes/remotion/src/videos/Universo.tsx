// Short "QUAL O TAMANHO REAL DO UNIVERSO? 🌌" (aprovado pelo dono em 16/11/2026; sai antes do longo da guerra nuclear). Tudo em Remotion 3D.
// Zoom-out contínuo em etapas (pessoa → Terra → Sistema Solar → Via Láctea → teia → universo observável → algo maior).
// Na tela: "VOCÊ ESTÁ AQUI" + seta no começo, régua de distância no canto (1,7 m → 93 bilhões de anos-luz), legenda (56). Sem selos. Trilha fica mais grave.
import React from 'react';
import {AbsoluteFill, Audio, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Terra, pr, cl, THREE} from '../lote/kit3d';
import {Planeta} from '../lote/planetas3d';
import {LAT, Tubo, PLANICIE} from './Apophis';
import {Boneco} from './PangeiaLongo';
import {Galaxia} from './MagAtinge';
import palavras from './universo.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = Easing.inOut(Easing.cubic);
// teia cósmica: nós e filamentos
const NOS: V3[] = LAT(70).map((i) => [(random('nx' + i) - 0.5) * 16, (random('ny' + i) - 0.5) * 16, (random('nz' + i) - 0.5) * 16]);
const FIL: [V3, V3][] = NOS.flatMap((a, i) => NOS.map((b, j) => [i, j, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])] as [number, number, number]).filter(([, j, d]) => j > i && d < 3.6).slice(0, 3).map(([, j]) => [a, NOS[j]] as [V3, V3]));
const PONTOS = (() => { const n = 6000; const p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const a = NOS[i % NOS.length]; const b = NOS[(i * 7) % NOS.length]; const t = random('pt' + i); const s = 0.4; p.set([lerp(a[0], b[0], t * 0.3) + (random('px' + i) - 0.5) * s, lerp(a[1], b[1], t * 0.3) + (random('py' + i) - 0.5) * s, lerp(a[2], b[2], t * 0.3) + (random('pz' + i) - 0.5) * s], i * 3); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); return g; })();
const Teia: React.FC<{o?: number}> = ({o = 1}) => <>
  <points geometry={PONTOS}><pointsMaterial size={0.05} color="#bcd0ff" transparent opacity={0.8 * o} depthWrite={false} /></points>
  {FIL.map(([a, b], i) => <Tubo key={i} pts={[a, b]} r={0.02} cor="#7a9aff" o={0.25 * o} brilho={1.4} />)}
  {NOS.map((p, i) => <Brilho key={'n' + i} pos={p} s={0.6} cor="#c8d8ff" o={0.5 * o} />)}
</>;
const Esfera: React.FC<{r?: number; o?: number}> = ({r = 3, o = 1}) => <>
  <mesh scale={r}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#6a8aff" transparent opacity={0.08 * o} depthWrite={false} side={THREE.BackSide} /></mesh>
  <mesh scale={r}><sphereGeometry args={[1, 32, 16]} /><meshBasicMaterial color="#9ab8ff" wireframe transparent opacity={0.08 * o} depthWrite={false} /></mesh>
  <mesh scale={r * 1.01}><sphereGeometry args={[1, 64, 64]} /><shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.BackSide} uniforms={{o: {value: o}}}
    vertexShader="varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }"
    fragmentShader="uniform float o; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 4.0); gl_FragColor = vec4(0.6,0.75,1.0,1.0)*f*1.8*o; }" /></mesh>
  <group scale={r * 0.11}><Teia o={o} /></group>
</>;

// ---------- cenas ----------
const U1: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 2, 14 - f * 0.12]} alvo={[0, 0, -6]} /><Estrelas sem="u1" n={4000} /><group position={[0, 0, -6]} rotation={[0.9, 0, 0]}><Galaxia f={f} /></group>
  <Pos bloom={0.8} /></>}</C3>;
const U2: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, d * 0.4, d, Easing.in(Easing.cubic)); return <>
  <Cam pos={[0, lerp(5, 30, k), 0.5]} alvo={[0, 0, 0]} /><Luzes sol={[2, 6, 2]} i={0.6} amb={0.25} /><Estrelas sem="u2" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#1a2a1a" roughness={1} /></mesh>
  <Boneco s={1.2} cor="#05070a" />
  <pointLight position={[0, 3, 0]} intensity={4} color="#ffe0a0" distance={6} />
  <Pos bloom={0.5} /></>; }}</C3>; };
const U3: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d, Easing.in(Easing.quad)); const z = lerp(2.4, 60, k); return <>
  <Cam pos={[0, z * 0.25, z]} alvo={[k * 8, 0, 0]} /><Luzes sol={[20, 0, 0]} i={2.4} amb={0.1} /><Estrelas sem="u3" />
  <Terra tex={tex} rot={[0.3, f * 0.01, 0]} />
  <Planeta t="sol" r={3} pos={[30, 0, -10]} brilho /><Brilho pos={[30, 0, -10]} s={14} cor="#ffcf70" o={0.8} />
  {[12, 18, 26].map((r, i) => <Tubo key={i} pts={LAT(121).map((j) => { const b = j / 120 * Math.PI * 2; return [30 + Math.cos(b) * (30 + r * 0), 0, -10 + Math.sin(b) * 30] as V3; })} r={0.05 + i * 0.03} cor="#ffffff" o={0.2 * k} brilho={1} />)}
  <Pos bloom={0.8} /></>; }}</C3>; };
const U4: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, ease); return <>
  <Cam pos={[0, lerp(7, 26, k), lerp(5, 18, k)]} alvo={[0, 0, 0]} /><Estrelas sem="u4" />
  <group scale={lerp(1, 0.35, k)}><Galaxia f={f} /></group>
  <group scale={1.6} rotation={[0.3, f * 0.003, 0]}><Teia o={pr(f, d * 0.45, d)} /></group>
  <Pos bloom={1} /></>; }}</C3>; };
const U5: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.006) * 9, 2, Math.cos(f * 0.006) * 9]} alvo={[0, 0, 0]} /><Estrelas sem="u5" n={600} />
  <Esfera r={3} />
  <Brilho pos={[0, 0, 0]} s={0.4} cor="#ffe070" o={1} />
  <Pos bloom={1} /></>}</C3>;
const U6: React.FC = () => <C3>{(f) => { const x = -6 + f * 0.08; const esti = 1 + f * 0.006; return <>
  <Cam pos={[x - 2, 1.2, 3.6]} alvo={[x + 1, 0, 0]} /><Estrelas sem="u6" />
  {LAT(21).map((i) => <Tubo key={'x' + i} pts={[[(i - 10) * esti, 0, -4], [(i - 10) * esti, 0, 4]]} r={0.01} cor="#3a6aff" o={0.4} brilho={1.2} />)}
  {LAT(9).map((i) => <Tubo key={'z' + i} pts={[[-10 * esti, 0, (i - 4)], [10 * esti, 0, (i - 4)]]} r={0.01} cor="#3a6aff" o={0.4} brilho={1.2} />)}
  <Brilho pos={[x, 0.2, 0]} s={0.6} cor="#fff4d0" o={1} />
  <Tubo pts={[[x - 3, 0.2, 0], [x, 0.2, 0]]} r={0.03} cor="#ffe8b0" o={0.7} brilho={1.6} />
  <Pos bloom={1.1} /></>; }}</C3>;
const U7: React.FC = () => <C3>{(f) => { const r = 1 + f * 0.04; return <>
  <Cam pos={[Math.sin(f * 0.01) * 0.5, 0.3, Math.cos(f * 0.01) * 0.5]} alvo={[0, 0, -10]} /><Estrelas sem="u7" />
  {LAT(24).map((i) => { const a = i / 24 * Math.PI * 2; const dir = new THREE.Vector3(Math.cos(a), (random('gy' + i) - 0.5) * 0.6, Math.sin(a)).normalize(); const p = dir.multiplyScalar(r * (1 + random('gd' + i))); return <group key={i} position={[p.x, p.y, p.z]} rotation={[random('ra' + i) * 3, random('rb' + i) * 3, 0]} scale={0.25}><Galaxia f={f} /></group>; })}
  <Pos bloom={1} /></>; }}</C3>;
const U8: React.FC = () => <C3>{(f) => <>
  <Cam pos={[-3 + f * 0.04, 0.6, 2.2]} alvo={[f * 0.04 + 2, 0, -0.5]} /><Estrelas sem="u8" />
  {LAT(40).map((i) => <group key={i} position={[-4 + i * 1.05, 0, -0.5]} rotation={[1.2, 0, 0]} scale={0.1}><Galaxia f={f + i * 10} /></group>)}
  <Pos bloom={1} /></>}</C3>;
const U9: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.6, 0.6, 5.5]} alvo={[0, 0, 0]} /><Luzes sol={[3, 2, 2]} i={2.6} amb={0.15} /><Estrelas sem="u9" />
  <group rotation={[1.1, 0.6, 0.4]} scale={0.6}>
    <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.45, 0.45, 0.08, 32]} /><meshStandardMaterial color="#f2f2ee" /></mesh>
    <mesh position={[0, -0.15, 0]}><cylinderGeometry args={[0.18, 0.22, 0.6, 16]} /><meshStandardMaterial color="#c8a040" metalness={0.8} roughness={0.3} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.42, -0.2, 0]}><boxGeometry args={[0.45, 0.02, 0.3]} /><meshStandardMaterial color="#20306a" metalness={0.6} roughness={0.2} /></mesh>)}
  </group>
  <Esfera r={14} o={0.6} />
  <Pos bloom={0.7} /></>}</C3>;
const U10: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0, 3.2]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.3} /><color attach="background" args={['#04050a']} />
  {LAT(60).map((i) => { const a = i / 60 * Math.PI * 2; return <mesh key={i} position={[Math.sin(a) * 0.9, Math.cos(a) * 0.9, 0]} rotation={[0, 0, -a]}><boxGeometry args={[0.02, i % 5 ? 0.06 : 0.14, 0.01]} /><meshBasicMaterial color={i % 5 ? '#556' : '#7ab0ff'} toneMapped={false} /></mesh>; })}
  <group rotation={[0, 0, -f * 0.6]}><mesh position={[0, 0.4, 0]}><boxGeometry args={[0.03, 0.8, 0.02]} /><meshBasicMaterial color="#ffd23f" /></mesh></group>
  <group rotation={[0, 0, -f * 0.06]}><mesh position={[0, 0.28, 0]}><boxGeometry args={[0.05, 0.56, 0.02]} /><meshBasicMaterial color="#ffffff" /></mesh></group>
  <group scale={0.08} position={[0, 0, -0.5]}><Galaxia f={f} /></group>
  <Pos bloom={0.9} /></>}</C3>;
const U11: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0, 12 - f * 0.05]} alvo={[0, 0, 0]} /><Estrelas sem="u11" />
  <group rotation={[0.3, f * 0.004, 0]}><Teia /></group>
  <Pos bloom={1} /></>}</C3>;
const U12: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, Easing.in(Easing.cubic)); return <>
  <Cam pos={[0, lerp(30, 4, k), lerp(40, 3, k)]} alvo={[0, 0, 0]} /><Estrelas sem="u12" n={4000} />
  <Galaxia f={f} />
  <Pos bloom={1.1} /></>; }}</C3>; };
const U13: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, ease); return <>
  <Cam pos={[0, 1, lerp(9, 60, k)]} alvo={[0, 0, 0]} /><color attach="background" args={['#000000']} />
  <Esfera r={3} />
  {LAT(400).map((i) => { const p = new THREE.Vector3(random('ex' + i) - 0.5, random('ey' + i) - 0.5, random('ez' + i) - 0.5).normalize().multiplyScalar(4 + random('er' + i) * 26); return <Brilho key={i} pos={[p.x, p.y, p.z]} s={0.4} cor="#3a4a7a" o={0.5 * k} />; })}
  <Pos bloom={1} /></>; }}</C3>; };
const U14: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0, 80 + f * 0.1]} alvo={[0, 0, 0]} /><color attach="background" args={['#000000']} />
  <Brilho pos={[0, 0, 0]} s={3} cor="#9ab8ff" o={0.9} /><Esfera r={1.2} />
  <Pos bloom={1.2} /></>}</C3>;

const PLANO: K.Plano = [
  ['qual o tamanho', U1], ['voce esta aqui', U2], ['a parte do universo', U3], ['tem uns noventa', U4], ['mas espera o universo', U5],
  ['porque enquanto a luz', U6], ['hoje aquelas galaxias', U7], ['pelas nossas contas', U8], ['a coisa mais rapida', U9], ['levaria mais de', U10],
  ['la dentro a estimativa', U11], ['e ate um septilhao', U12], ['e o que fica alem', U13], ['e ele pode ser', U14],
];
const REGUA: [string, string][] = [['voce esta aqui', '1,7 m'], ['a parte do universo', '12.700 km'], ['a gente consegue', '1,4 MILHÃO DE KM'], ['tem uns noventa', '100 MIL ANOS-LUZ'], ['mas espera o universo', '93 BILHÕES DE ANOS-LUZ']];
const nn = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '');
const WN = W.map((w) => nn(w.w));
const tF = (fr: string) => { const p = fr.split(' '); for (let i = 0; i < WN.length; i++) if (p.every((x, j) => WN[i + j] === x)) return Math.round(W[i].t * 30); throw new Error(fr); };
const RT = REGUA.map(([fr, t]) => [tF(fr), t] as [number, string]);
const Extra: React.FC = () => {
  const f = useCurrentFrame(); const {durationInFrames: D} = useVideoConfig(); const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const aqui = interpolate(f, [at('voce esta aqui'), at('voce esta aqui') + 4, at('a parte do universo') - 4, at('a parte do universo')], [0, 1, 1, 0], cl);
  const idx = RT.reduce((acc, [t], i) => (f >= t ? i : acc), -1);
  const pop = idx >= 0 ? interpolate(f - RT[idx][0], [0, 5, 10], [1.2, 0.95, 1], cl) : 1;
  const larg = idx < 0 ? 0 : 40 + idx * 45;
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {aqui > 0 && <div style={{position: 'absolute', top: 560, width: '100%', textAlign: 'center', opacity: aqui, fontFamily: FONTE, fontSize: 92, color: '#fff', WebkitTextStroke: '9px #000', paintOrder: 'stroke fill'}}>VOCÊ ESTÁ AQUI<div style={{fontSize: 130, color: '#ffd23f', lineHeight: 1}}>⬇</div></div>}
    {idx >= 0 && <div style={{position: 'absolute', top: 120, right: 46, padding: '12px 22px 16px', borderRadius: 16, background: 'rgba(0,0,0,.55)', border: '3px solid #7ab0ff', transform: `scale(${pop})`, transformOrigin: 'right top', fontFamily: FONTE, color: '#fff', textAlign: 'right', boxShadow: '0 0 18px #7ab0ff66'}}>
      <div style={{fontSize: idx === 4 ? 40 : 52, textShadow: '0 0 12px #7ab0ff'}}>{RT[idx][1]}</div>
      <div style={{height: 10, marginTop: 8, display: 'flex', justifyContent: 'flex-end'}}><div style={{width: larg * 1.2, height: 10, background: '#7ab0ff', borderRadius: 5, boxShadow: '0 0 10px #7ab0ff'}} /></div></div>}
    <Audio src={staticFile('universo/musica.mp3')} volume={(fr) => interpolate(fr, [0, 20, D - 30, D], [0, 0.5, 0.5, 0], cl)} />
  </AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'universo/narracao.mp3', 'e o que fica alem', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void useD;
