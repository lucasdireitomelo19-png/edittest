// Short "E SE TROCÁSSEMOS O SOL POR OUTRAS ESTRELAS? ☀️🔄" (lote 14/11/2026, aprovado). Tudo em Remotion 3D.
// O MESMO horizonte (campo, árvore, colina, mar) em todas as trocas (exceção aceita pelo dono: é o formato). Muda a estrela, o céu e o efeito no chão.
// Betelgeuse e Stephenson 2-18 vistas do espaço sobre as órbitas. Nome da estrela no topo. Termina com o Sol normal. Sem selos.
import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Terra, pr, cl, THREE} from '../lote/kit3d';
import {Planeta} from '../lote/planetas3d';
import {relevo, LAT, Viva, Tubo, canvasTex} from './Apophis';
import palavras from './trocasol.palavras.json';

const W = palavras as Palavra[];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: string, b: string, t: number) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), Math.max(0, Math.min(1, t))).getHexString();
const COLINA = relevo(120, (x, z) => Math.max(0, Math.exp(-((x + 3) ** 2) / 6 - ((z + 6) ** 2) / 10) * 2.2) + Math.sin(x * 0.4) * 0.08, 30);
const CEUS: Record<string, THREE.Texture> = {};
const ceuTex = (cima: string, baixo: string) => { const k = cima + baixo; if (!CEUS[k]) CEUS[k] = canvasTex(4, 256, (g) => { const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, cima); gr.addColorStop(1, baixo); g.fillStyle = gr; g.fillRect(0, 0, 4, 256); }); return CEUS[k]; };
type Cfg = {estrela: string; disco: number; ceu: [string, string]; luz: string; li: number; gelo?: number; vapor?: number; lava?: number; clarao?: number; some?: number; tremor?: number};
// o horizonte fixo: câmera parada no mesmo ponto
const Horizonte: React.FC<{c: Cfg; f: number}> = ({c, f}) => {
  const ceu = useMemo(() => ceuTex(c.ceu[0], c.ceu[1]), [c.ceu]);
  const g = c.gelo ?? 0, va = c.vapor ?? 0, la = c.lava ?? 0, cla = c.clarao ?? 0, so = c.some ?? 0;
  const chao = mix(mix(mix('#4a8a3a', '#e8f2ff', g), '#3a2a1a', va * 0.7), '#ff5a10', la);
  const mar = mix(mix('#1a5a9a', '#cfe4f4', g), '#8aa0b0', va);
  const sol: [number, number, number] = [0, 5.5, -40];
  return <>
    <Cam pos={[0, 1.6, 7]} alvo={[0, 3, -20]} tremor={c.tremor ?? 0} />
    <ambientLight intensity={0.25 + cla * 2} /><directionalLight position={[0, 6, -10]} intensity={c.li} color={c.luz} />
    <mesh><sphereGeometry args={[150, 32, 16]} /><meshBasicMaterial map={ceu} side={THREE.BackSide} depthWrite={false} toneMapped={false} /></mesh>
    <mesh position={sol}><circleGeometry args={[c.disco, 64]} /><meshBasicMaterial color={new THREE.Color(c.estrela).multiplyScalar(1.6)} toneMapped={false} /></mesh>
    <Brilho pos={[sol[0], sol[1], sol[2] + 0.5]} s={c.disco * 4 + 2} cor={c.estrela} o={0.8} />
    <Viva n={80} tam={60} pos={[0, -0.05, -14]} h={(x, z) => g > 0.5 ? 0 : Math.sin(x * 0.8 + f * 0.06) * 0.04 + (va > 0 ? Math.sin(x * 3 + f * 0.5) * Math.cos(z * 3 - f * 0.4) * 0.08 * va : 0)} mat={<meshStandardMaterial color={mar} roughness={g > 0.5 ? 0.6 : 0.15} metalness={0.3} />} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}><planeGeometry args={[60, 24]} /><meshStandardMaterial color={chao} roughness={0.9} emissive={la > 0 ? '#ff4a10' : '#000'} emissiveIntensity={la * (0.8 + 0.2 * Math.sin(f * 0.3))} /></mesh>
    <mesh geometry={COLINA} position={[0, 0, 0]} scale={[1, 1 - so, 1]}><meshStandardMaterial color={mix(mix('#3a6a2a', '#f0f6ff', g), '#ff5a10', la)} roughness={1} transparent opacity={1 - so * 0.9} emissive={la > 0 ? '#ff3a10' : '#000'} emissiveIntensity={la * 0.6} /></mesh>
    <group position={[1.5, 0, -2.5]} scale={[1, 1 - so * 0.95, 1]}>
      <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.12, 0.18, 1.6, 12]} /><meshStandardMaterial color={mix('#5a3a20', '#1a1410', la + va)} /></mesh>
      <mesh position={[0, 2.1, 0]}><sphereGeometry args={[0.95, 32, 24]} /><meshStandardMaterial color={mix(mix('#2f6a2a', '#f4f8ff', g), '#2a1a10', va + la)} roughness={0.9} transparent opacity={1 - so} /></mesh>
    </group>
    {va > 0 && <Nuvem n={500} sem={'vp' + c.estrela} origem={new THREE.Vector3(0, 0, -10)} t={40 + f} raio={14} cor="#f4f8ff" tam={0.9} o={0.35 * va} dir={new THREE.Vector3(0, 2, 0)} />}
    {g > 0 && LAT(40).map((i) => <mesh key={i} position={[(random('gx' + i) - 0.5) * 16, 0.05, -random('gz' + i) * 10]} rotation={[-Math.PI / 2, 0, random('gr' + i) * 3]}><circleGeometry args={[0.2 + random('gs' + i) * 0.4, 6]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.6 * g} /></mesh>)}
    <mesh position={[0, 1.6, 6.5]}><planeGeometry args={[4, 4]} /><meshBasicMaterial color="#ffffff" transparent opacity={cla} toneMapped={false} /></mesh>
    <Pos bloom={0.8 + cla} />
  </>;
};
const NORMAL: Cfg = {estrela: '#fff4d0', disco: 1, ceu: ['#2a6ac8', '#bfe0ff'], luz: '#fff4e0', li: 2.4};
const T1: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 4, d - 4); return <Horizonte f={f} c={{...NORMAL, disco: lerp(1, 0.02, k), ceu: [mix('#2a6ac8', '#02040a', k), mix('#bfe0ff', '#0a1020', k)], li: lerp(2.4, 0.1, k)}} />; }}</C3>; };
const T2: React.FC = () => <C3>{(f) => <Horizonte f={f} c={{estrela: '#ff4a2a', disco: 0.12, ceu: ['#04030a', '#1a0a14'], luz: '#ff6a4a', li: 0.4}} />}</C3>;
const T3: React.FC = () => { const d = useD(); return <C3>{(f) => <Horizonte f={f} c={{estrela: '#ff4a2a', disco: 0.12, ceu: ['#04030a', '#140a14'], luz: '#ff6a4a', li: 0.5, gelo: pr(f, 0, d * 0.8)}} />}</C3>; };
const T4: React.FC = () => { const d = useD(); return <C3>{(f) => <Horizonte f={f} c={{estrela: '#cfe4ff', disco: 1.7, ceu: ['#4a8ae8', '#f0f8ff'], luz: '#e8f4ff', li: 3.4, vapor: pr(f, 10, d), tremor: 0.015}} />}</C3>; };
const T5: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const a = f * 0.04; return <>
  <Cam pos={[0, 9, 3]} alvo={[0, 0, 0]} /><Luzes sol={[0, 3, 0]} i={0.6} amb={0.5} /><Estrelas sem="t5" />
  <mesh><sphereGeometry args={[0.6, 32, 32]} /><meshBasicMaterial color={new THREE.Color('#cfe4ff').multiplyScalar(1.6)} toneMapped={false} /></mesh><Brilho pos={[0, 0, 0]} s={3.2} cor="#cfe4ff" o={0.9} />
  <Tubo pts={LAT(121).map((i) => { const t = i / 120 * Math.PI * 2; return [Math.cos(t) * 3.4, 0, Math.sin(t) * 3.4] as [number, number, number]; })} r={0.02} cor="#ffffff" o={0.3} brilho={1} />
  <Tubo pts={LAT(121).map((i) => { const t = i / 120 * Math.PI * 2 * pr(f, 0, d); return [Math.cos(t) * 3.4, 0, Math.sin(t) * 3.4] as [number, number, number]; })} r={0.03} cor="#39d8ff" brilho={1.4} />
  <Terra tex={tex} r={0.22} pos={[Math.cos(a) * 3.4, 0, Math.sin(a) * 3.4]} rot={[0.3, f * 0.05, 0]} />
  <Pos bloom={0.9} /></>; }}</C3>; };
const T6: React.FC = () => { const d = useD(); return <C3>{(f) => <Horizonte f={f} c={{estrela: '#fff0c0', disco: lerp(2, 4.2, pr(f, 0, 30, Easing.out(Easing.cubic))), ceu: ['#c8a050', '#fff0c8'], luz: '#fff0d0', li: 4, lava: pr(f, d * 0.4, d), tremor: 0.02}} />}</C3>; };
const T7: React.FC = () => { const d = useD(); return <C3>{(f) => <Horizonte f={f} c={{estrela: '#ff9a40', disco: 3, ceu: ['#c85a1a', '#ffc070'], luz: '#ffa050', li: 3.4, vapor: 1, lava: 0.3, some: pr(f, d * 0.2, d), tremor: 0.03}} />}</C3>; };
const T8: React.FC = () => { const d = useD(); return <C3>{(f) => <Horizonte f={f} c={{estrela: '#d8e8ff', disco: lerp(4, 9, pr(f, 0, d * 0.6)), ceu: ['#a8c8ff', '#ffffff'], luz: '#e8f0ff', li: 5, some: 1, clarao: pr(f, d * 0.55, d)}} />}</C3>; };
const ORB: [number, string][] = [[0.6, 'mercurio'], [1.0, 'venus'], [1.4, 'terra'], [2.1, 'marte'], [5.2, 'jupiter'], [9.5, 'saturno']];
const Sistema: React.FC<{f: number; rEst: number; cor: string; cam: [number, number, number]; tex: Record<string, THREE.Texture>}> = ({f, rEst, cor, cam, tex}) => <>
  <Cam pos={cam} alvo={[0, 0, 0]} /><Luzes sol={[0, 6, 0]} i={0.5} amb={0.5} /><Estrelas sem="sis" />
  {ORB.map(([r, t], i) => { const a = f * 0.01 / Math.sqrt(r) + i; const dentro = r < rEst; return <group key={t}>
    <Tubo pts={LAT(161).map((j) => { const b = j / 160 * Math.PI * 2; return [Math.cos(b) * r, 0, Math.sin(b) * r] as [number, number, number]; })} r={0.012 * Math.max(1, r * 0.4)} cor={dentro ? '#ff5a3a' : '#ffffff'} o={dentro ? 0.9 : 0.45} brilho={1.3} />
    {!dentro && (t === 'terra' ? <Terra tex={tex} r={0.08 * Math.max(1, r * 0.3)} pos={[Math.cos(a) * r, 0, Math.sin(a) * r]} rot={[0.3, 0, 0]} /> : <Planeta t={t as 'marte'} r={0.06 * Math.max(1, r * 0.35) * (t === 'jupiter' || t === 'saturno' ? 2.2 : 1)} pos={[Math.cos(a) * r, 0, Math.sin(a) * r]} anel={t === 'saturno'} />)}
  </group>; })}
  <Planeta t="betel" r={rEst} giro={f * 0.002} brilho />
  <mesh scale={rEst * 1.06}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color={cor} transparent opacity={0.25} side={THREE.BackSide} /></mesh>
  <Pos bloom={1} /></>;
const T9: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d * 0.7, Easing.out(Easing.cubic)); return <Sistema f={f} tex={tex} rEst={lerp(0.05, 3.3, k)} cor="#ff5a20" cam={[0, lerp(10, 24, k), lerp(6, 13, k)]} />; }}</C3>; };
const T10: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d * 0.8, Easing.inOut(Easing.cubic)); return <Sistema f={f} tex={tex} rEst={lerp(3.3, 10.2, k)} cor="#ff3a10" cam={[0, lerp(24, 48, k), lerp(13, 28, k)]} />; }}</C3>; };
const T11: React.FC = () => <C3>{(f) => <Horizonte f={f} c={NORMAL} />}</C3>;

const PLANO: K.Plano = [
  ['e se a gente', T1], ['proxima centauri a', T2], ['pelas nossas contas', T3], ['sirius a estrela', T4], ['e o ano dura', T5],
  ['a estrela polar', T6], ['arcturus', T7], ['rigel', T8], ['e betelgeuse', T9], ['e uma das maiores', T10], ['e o nosso sol', T11],
];
const NOMES: [string, string][] = [['proxima centauri a', 'PRÓXIMA CENTAURI'], ['sirius a estrela', 'SIRIUS'], ['a estrela polar', 'POLARIS'], ['arcturus', 'ARCTURUS'], ['rigel', 'RIGEL'], ['e betelgeuse', 'BETELGEUSE'], ['e uma das maiores', 'STEPHENSON 2-18'], ['e o nosso sol', 'SOL']];
const Extra: React.FC = () => {
  const f = useCurrentFrame(); const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const idx = NOMES.reduce((acc, [fr], i) => (f >= at(fr) ? i : acc), -1);
  if (idx < 0) return null;
  const ini = at(NOMES[idx][0]); const s = interpolate(f - ini, [0, 6, 12], [0.6, 1.1, 1], {...cl, easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill><style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <div style={{position: 'absolute', top: 170, width: '100%', textAlign: 'center', transform: `scale(${s})`, fontFamily: FONTE, fontSize: NOMES[idx][1].length > 12 ? 96 : 120, color: '#fff', WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 0 24px rgba(57,216,255,.8), 0 8px 24px rgba(0,0,0,.7)'}}>{NOMES[idx][1]}</div></AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'trocasol/narracao.mp3', 'e o nosso sol', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void useD;
