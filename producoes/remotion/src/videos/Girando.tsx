// Longo POV "E SE A TERRA GIRASSE CADA VEZ MAIS RÁPIDO E NÃO PARASSE?" (1920x1080). Roteiro longo_terra_girando_rapido.md, aprovado pelo dono (13/11/2026).
// Tudo em Remotion 3D, nenhuma cena repetida. Na tela: só a legenda (40) e o marcador "O DIA DURA" no canto (24 H → … → 1H24, volta a crescer no "Mas espera").
// Sem selos: "simulação", "pelas nossas contas" e "hipótese" estão na narração. Nada gráfico, a Terra nunca "se parte".
// Peças reaproveitadas do Apophis (globo noturno, tubos, calotas, satélites, céu) e da Pangeia (boneco, palmeira, unha). Movimento com easing, cascatas e pulso (skills de motion, 11/11).
import React, {useMemo} from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, Final, FONTE} from '../comum';
import {criarLongo, Cap} from '../longo';
import {Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Pedras, Terra, Lua, pr, cl, THREE, Tex} from '../lote/kit3d';
import {CP, v, camLL} from '../lote/pangeia3d';
import {canvasTex, GRAD, relevo, PLANICIE, LAT, Viva, Tubo, Calota, TerraN, Sat, Antena, Casa, Arvore, Predios, Ceu} from './Apophis';
import {Dedo, Boneco, Palmeira} from './PangeiaLongo';
import palavras from './girando.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const ease = Easing.inOut(Easing.cubic);
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const NEON = '#39d8ff';
const OURO = '#ffc83a';
void GRAD; void Calota;

// ---------- peças ----------
const calTex = canvasTex(512, 512, (g) => { // julho de 2024: 1º é segunda-feira; o 5 circulado
  g.fillStyle = '#f2ede2'; g.fillRect(0, 0, 512, 512); g.fillStyle = '#2a6aa8'; g.fillRect(0, 0, 512, 110); g.fillStyle = '#20242c'; g.font = 'bold 34px sans-serif'; g.textAlign = 'center';
  for (let d = 1; d <= 31; d++) { const c = d % 7, l = Math.floor(d / 7); const x = 44 + c * 70, y = 170 + l * 66; g.fillStyle = c === 0 ? '#c8261a' : '#20242c'; g.fillText(String(d), x, y);
    if (d === 5) { g.strokeStyle = '#e0180c'; g.lineWidth = 7; g.beginPath(); g.arc(x, y - 12, 34, 0, 7); g.stroke(); } }
  for (let k = 0; k < 8; k++) { g.fillStyle = '#d8d0c0'; g.beginPath(); g.arc(60 + k * 56, 26, 9, 0, 7); g.fill(); } });
// mostrador genérico: n marcas, ponteiros
const Mostrador: React.FC<{n?: number; h: number; m?: number; cor?: string; r?: number; fundo?: string; aro?: string}> = ({n = 60, h, m, cor = NEON, r = 1, fundo = '#0b0e14', aro = '#20242c'}) => <group scale={r}>
  <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.05, 1.05, 0.12, 64]} /><meshStandardMaterial color={aro} metalness={0.8} roughness={0.25} /></mesh>
  <mesh position={[0, 0, 0.065]}><circleGeometry args={[0.98, 64]} /><meshStandardMaterial color={fundo} /></mesh>
  {LAT(n).map((i) => { const a = i / n * Math.PI * 2; const big = i % 5 === 0; return <mesh key={i} position={[Math.sin(a) * 0.86, Math.cos(a) * 0.86, 0.07]} rotation={[0, 0, -a]}><boxGeometry args={[big ? 0.03 : 0.012, big ? 0.12 : 0.05, 0.01]} /><meshBasicMaterial color={big ? cor : '#557'} toneMapped={false} /></mesh>; })}
  <group position={[0, 0, 0.09]} rotation={[0, 0, -h]}><mesh position={[0, 0.25, 0]}><boxGeometry args={[0.05, 0.5, 0.02]} /><meshStandardMaterial color="#e8eef6" /></mesh></group>
  {m !== undefined && <group position={[0, 0, 0.1]} rotation={[0, 0, -m]}><mesh position={[0, 0.36, 0]}><boxGeometry args={[0.03, 0.72, 0.02]} /><meshStandardMaterial color="#e8eef6" /></mesh></group>}
  <mesh position={[0, 0, 0.12]}><cylinderGeometry args={[0.05, 0.05, 0.03, 20]} /><meshStandardMaterial color="#ff3a2a" /></mesh>
</group>;
// balança de banheiro com mostrador (kg)
const Balanca: React.FC<{kg: number; pos?: V3; s?: number}> = ({kg, pos = [0, 0, 0], s = 1}) => <group position={pos} scale={s}>
  <mesh position={[0, 0.08, 0]}><boxGeometry args={[1.2, 0.16, 1.3]} /><meshStandardMaterial color="#e8eaee" roughness={0.3} /></mesh>
  <mesh position={[0, 0.161, -0.35]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.24, 48]} /><meshStandardMaterial color="#0e1218" /></mesh>
  {LAT(9).map((i) => { const a = (i / 8 - 0.5) * Math.PI * 1.2; return <mesh key={i} position={[Math.sin(a) * 0.19, 0.163, -0.35 - Math.cos(a) * 0.19]} rotation={[-Math.PI / 2, 0, -a]}><planeGeometry args={[0.012, 0.05]} /><meshBasicMaterial color={NEON} toneMapped={false} /></mesh>; })}
  <group position={[0, 0.165, -0.35]} rotation={[0, -(kg / 80 - 0.5) * Math.PI * 1.2, 0]}><mesh position={[0, 0, -0.09]}><boxGeometry args={[0.014, 0.004, 0.18]} /><meshBasicMaterial color="#ff3a2a" toneMapped={false} /></mesh></group>
  {[-1, 1].map((l) => <mesh key={l} position={[l * 0.25, 0.165, 0.2]}><boxGeometry args={[0.32, 0.01, 0.5]} /><meshStandardMaterial color="#c8ccd2" /></mesh>)}
</group>;
// balança + pés: a leitura cai de "de" para "para"
const Pesagem = (o: {de: number; para: number; chao: string; fundo: string; cam: V3; luz?: string; extra?: (f: number) => React.ReactNode}): React.FC => () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 8, d * 0.6, Easing.out(Easing.back(1.3))); const kg = lerp(o.de, o.para, k) + Math.sin(f * 0.5) * 0.3 * (1 - k); return <>
  <Cam pos={o.cam} alvo={[0, 0.2, -0.2]} /><Luzes sol={[1, 4, 3]} i={2.2} amb={0.35} /><color attach="background" args={[o.fundo]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color={o.chao} roughness={0.8} /></mesh>
  {o.luz && <pointLight position={[0, 2, 1]} intensity={4} color={o.luz} distance={6} />}
  <Balanca kg={kg} />
  {[-1, 1].map((l) => <group key={l} position={[l * 0.25, 0.22 + (o.para === 0 ? k * 0.6 : 0), 0.15]}><mesh><capsuleGeometry args={[0.1, 0.32, 8, 16]} /><meshStandardMaterial color="#1a1c22" /></mesh></group>)}
  {o.extra && o.extra(f)}
  <Pos bloom={0.7} /></>; }}</CP>; };
// Terra que gira: velocidade angular w (rad/quadro); rastros fantasma quando gira rápido
const TerraGira: React.FC<{tex: Tex; ang: number; achata?: number; estica?: number; rastro?: number; nuvens?: boolean}> = ({tex, ang, achata = 0, estica = 0, rastro = 0, nuvens = true}) => <group scale={[1 + achata + estica, 1 - achata, 1 + achata - estica * 0.5]}>
  <group rotation={[0, ang, 0]}><Terra tex={tex} rot={[0, 0, 0]} nuvens={nuvens} /></group>
  {rastro > 0 && LAT(4).map((i) => <group key={i} rotation={[0, ang - (i + 1) * rastro, 0]}><mesh scale={1.004 + i * 0.001}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial map={tex.dia} transparent opacity={0.22 - i * 0.05} depthWrite={false} /></mesh></group>)}
</group>;
// cor por latitude: polos pesados (vermelho), meio leve (azul)
const pesoMat = new THREE.ShaderMaterial({transparent: true, depthWrite: false, uniforms: {k: {value: 1}},
  vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
  fragmentShader: 'uniform float k; varying vec3 vP; void main(){ float l = abs(vP.y); vec3 c = mix(vec3(0.2,0.75,1.0), vec3(1.0,0.25,0.15), smoothstep(0.15,0.85,l)); gl_FragColor = vec4(c, 0.55*k); }'});
// faixa de oceano no equador (cresce) e fundo exposto nas latitudes altas
const Faixa: React.FC<{k: number; r?: number}> = ({k, r = 1.004}) => <>
  <mesh><sphereGeometry args={[r + k * 0.01, 96, 48, 0, Math.PI * 2, Math.PI / 2 - 0.08 - k * 0.3, 0.16 + k * 0.6]} /><meshStandardMaterial color="#1a5a9a" roughness={0.15} metalness={0.3} transparent opacity={0.85} /></mesh>
  {[1, -1].map((l) => <mesh key={l}><sphereGeometry args={[r, 96, 24, 0, Math.PI * 2, l > 0 ? 0.35 : Math.PI - 0.35 - 0.35 * k, 0.35 * k]} /><meshStandardMaterial color="#8a7458" roughness={1} transparent opacity={0.85 * k} /></mesh>)}
</>;
const furacaoTex = canvasTex(256, 256, (g) => { g.translate(128, 128); for (let i = 0; i < 1400; i++) { const t = i / 1400 * 14; const r = 6 + t * 8; const a = t * 1.1; g.fillStyle = `rgba(255,255,255,${0.05 + (1 - t / 14) * 0.08})`; g.beginPath(); g.arc(Math.cos(a) * r, Math.sin(a) * r, 6 + t * 1.2, 0, 7); g.fill(); g.beginPath(); g.arc(-Math.cos(a) * r, -Math.sin(a) * r, 6 + t * 1.2, 0, 7); g.fill(); } g.fillStyle = 'rgba(0,0,0,.6)'; g.beginPath(); g.arc(0, 0, 6, 0, 7); g.fill(); });
furacaoTex.colorSpace = THREE.NoColorSpace;
const Furacao: React.FC<{pos?: V3; s?: number; giro: number; rot?: V3; o?: number}> = ({pos = [0, 0, 0], s = 1, giro, rot = [-Math.PI / 2, 0, 0], o = 0.95}) => <mesh position={pos} rotation={[rot[0], rot[1], rot[2] + giro]} scale={s}><circleGeometry args={[1, 64]} /><meshBasicMaterial map={furacaoTex} transparent opacity={o} depthWrite={false} /></mesh>;
const FuracaoG: React.FC<{pos?: V3; s?: number; giro: number; rot?: V3; o?: number}> = ({pos = [0, 0, 0], s = 1, giro, rot = [-Math.PI / 2, 0, 0], o}) => <group position={pos} rotation={rot}><group rotation={[0, 0, giro]}><Furacao s={s} giro={0} rot={[0, 0, 0]} o={o} /></group></group>;
const TERRENO = relevo(140, (x, z, i) => Math.sin(x * 0.4) * Math.cos(z * 0.3) * 0.25 + (random('tr' + i) - 0.5) * 0.04, 60);
const FUNDO = relevo(140, (x, z, i) => Math.sin(x * 0.9) * 0.15 + Math.cos(z * 0.7 + x) * 0.12 + (random('fd' + i) - 0.5) * 0.08 - 0.4, 20);
const Ovo: React.FC<{ang: number; s?: number; pos?: V3}> = ({ang, s = 1, pos = [0, 0, 0]}) => <group position={pos} scale={s} rotation={[0.3, ang, 0.1]}>
  <mesh scale={[1.6, 0.8, 1.0]}><sphereGeometry args={[1, 96, 48]} /><meshStandardMaterial color="#d8d8e0" roughness={0.6} /></mesh>
  <mesh position={[0.9, 0.2, 0.55]} scale={[0.35, 0.25, 0.2]}><sphereGeometry args={[1, 32, 16]} /><meshStandardMaterial color="#8a3a3a" roughness={0.8} /></mesh>
  <mesh rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[2.3, 2.45, 160]} /><meshBasicMaterial color="#c8d0e0" transparent opacity={0.6} side={THREE.DoubleSide} /></mesh>
</group>;
const Copo: React.FC<{pos: V3; rot?: V3; s?: number}> = ({pos, rot = [0, 0, 0], s = 1}) => <mesh position={pos} rotation={rot} scale={s}><cylinderGeometry args={[0.12, 0.09, 0.3, 24, 1, true]} /><meshPhysicalMaterial color="#e8f4ff" roughness={0.05} transparent opacity={0.45} side={THREE.DoubleSide} /></mesh>;
const ISS: React.FC<{pos: V3; s?: number; rot?: V3}> = ({pos, s = 1, rot = [0, 0, 0]}) => <group position={pos} scale={s} rotation={rot}>
  <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.04, 0.04, 2.4, 8]} /><meshStandardMaterial color="#c8ccd0" metalness={0.7} /></mesh>
  {[-1.1, -0.7, 0.7, 1.1].map((x) => <mesh key={x} position={[x, 0, 0]}><boxGeometry args={[0.28, 0.01, 1.4]} /><meshStandardMaterial color="#c89a30" metalness={0.8} roughness={0.3} emissive="#3a2a08" /></mesh>)}
  {[-0.2, 0, 0.2].map((x) => <mesh key={'m' + x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.5, 16]} /><meshStandardMaterial color="#e8e8e2" /></mesh>)}
</group>;
// gráfico 3D do dia (desvio em ms): linha que oscila, com picos marcados
const curva = (n: number, f: (t: number) => number, x0: number, x1: number): V3[] => LAT(n).map((i) => { const t = i / (n - 1); return [lerp(x0, x1, t), f(t), 0]; });
const OSC = (t: number) => Math.sin(t * 22) * 0.25 + Math.sin(t * 7.3) * 0.18 - (t > 0.55 && t < 0.62 ? 0.35 : 0) - (t > 0.78 && t < 0.84 ? 0.45 : 0);

// ================= GANCHO =================
const G1: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.6, 0.3, 3.4 - f * 0.006]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 3, 4]} i={2.2} amb={0.5} /><color attach="background" args={['#06080c']} />
  <mesh position={[0, -0.05, -0.05]}><boxGeometry args={[2.1, 2.3, 0.1]} /><meshStandardMaterial color="#1a2430" /></mesh>
  <mesh position={[0, 0, 0.01]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={calTex} roughness={0.8} /></mesh>
  <pointLight position={[-0.4, 0.4, 0.8]} intensity={1.4 + Math.sin(f * 0.3) * 0.4} color="#ff5a3a" distance={2} />
  <Pos bloom={0.4} /></>}</CP>;
const G2: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.4, 3.2]} /><Luzes sol={[-4, 1, 3]} i={2.8} amb={0.04} /><Estrelas sem="g2" />
  <TerraGira tex={tex} ang={f * 0.006} />
  <Pos bloom={0.8} /></>}</CP>;
const G3: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 10, d - 10, Easing.out(Easing.cubic)); return <>
  <Cam pos={[0, 0, 3.2]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.2} /><color attach="background" args={['#04050a']} />
  <Mostrador n={60} h={Math.PI * 2 * 0.999} m={Math.PI * 2 - k * 0.09} cor={OURO} />
  <mesh position={[0, 0, 0.11]}><ringGeometry args={[0.88, 0.95, 64, 1, Math.PI / 2 - 0.09 * k, 0.09 * k]} /><meshBasicMaterial color={new THREE.Color('#ff3a2a').multiplyScalar(1.6)} toneMapped={false} /></mesh>
  <Pos bloom={0.9} /></>; }}</CP>; };
const G4: React.FC = () => <CP>{(f) => <>
  <Cam pos={[f * 0.008 - 1, 1.2, 7]} alvo={[0, 0.8, -6]} /><Luzes sol={[0, 5, -10]} i={0.15} amb={0.08} /><Estrelas sem="g4" n={2500} />
  <Ceu cima="#01030a" baixo="#0c1630" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#040508" /></mesh>
  <Predios n={60} sem="g4" z={-6} larg={24} alt={3} janelas={0.7} />
  <Pos bloom={0.8} /></>}</CP>;
const G5: React.FC = () => <CP>{(f) => { const p = Math.floor(f / 15) % 2; return <>
  <Cam pos={[1.6, 1, 3.4]} alvo={[0, 0.8, 0]} /><Luzes sol={[2, 4, 3]} i={1.4} amb={0.15} /><color attach="background" args={['#030406']} />
  <mesh position={[0, 0.9, 0]}><boxGeometry args={[1.4, 1.8, 0.9]} /><meshStandardMaterial color="#20262e" metalness={0.7} roughness={0.35} /></mesh>
  <mesh position={[0, 1.1, 0.46]}><cylinderGeometry args={[0.18, 0.18, 0.02, 32]} /><meshBasicMaterial color={new THREE.Color('#4aa8ff').multiplyScalar(1 + p * 0.8)} toneMapped={false} /></mesh>
  {LAT(10).map((i) => <mesh key={i} position={[-0.5 + i * 0.11, 0.45, 0.46]}><boxGeometry args={[0.06, 0.04, 0.01]} /><meshBasicMaterial color={(i + Math.floor(f / 4)) % 3 ? '#1a3a2a' : '#3aff8a'} toneMapped={false} /></mesh>)}
  <Brilho pos={[0, 1.1, 0.6]} s={0.8} cor="#4aa8ff" o={0.4 + p * 0.4} />
  <Pos bloom={1} /></>; }}</CP>;
const G6: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const w = 0.004 + pr(f, 0, d, Easing.in(Easing.cubic)) * 0.12; const ang = LAT(Math.max(1, f)).reduce((s, i) => s + 0.004 + pr(i, 0, d, Easing.in(Easing.cubic)) * 0.12, 0); return <>
  <Cam pos={[0, 0.3, 3.3]} /><Luzes sol={[-4, 1, 3]} i={2.8} amb={0.06} /><Estrelas sem="g6" />
  <TerraGira tex={tex} ang={ang} rastro={w * 0.8} />
  <Pos bloom={0.8} /></>; }}</CP>; };
const G7: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.85); const n = Math.round(lerp(24, 1.4, k)); return <>
  <Cam pos={[0, 0, 3.2]} /><Luzes sol={[1, 2, 4]} i={1.6} amb={0.3} /><color attach="background" args={['#04050a']} />
  {LAT(24).map((i) => { const on = i < n; const a = i / 24 * Math.PI * 2; const r = lerp(1, 0.55, k); return <mesh key={i} position={[Math.sin(a) * r, Math.cos(a) * r, 0]} rotation={[0, 0, -a]} scale={on ? 1 : 0.4}><boxGeometry args={[0.05, 0.16, 0.04]} /><meshBasicMaterial color={on ? new THREE.Color(OURO).multiplyScalar(1.5) : '#2a2a30'} toneMapped={false} /></mesh>; })}
  <group rotation={[0, 0, -f * lerp(0.03, 0.4, k)]}><mesh position={[0, 0.3, 0]}><boxGeometry args={[0.04, 0.6, 0.02]} /><meshBasicMaterial color="#ff3a2a" /></mesh></group>
  <Pos bloom={1} /></>; }}</CP>; };
const G8: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, d * 0.35, d - 5, Easing.out(Easing.cubic)); return <>
  <Cam pos={[2.4, 0.8, 4.4]} alvo={[0, 1, 0]} /><Luzes sol={[-3, 4, 3]} i={1.8} amb={0.3} /><Ceu cima="#1a3a6a" baixo="#f0c890" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#5a6a3a" roughness={1} /></mesh>
  {LAT(5).map((i) => <Palmeira key={i} pos={[-4 + i * 2, 0, -3 - (i % 2)]} f={f} s={1.4} />)}
  <Boneco pos={[0, k * 1.4, 0]} s={1.2} rot={0.4} anda={k * 0.5} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} scale={1 - k * 0.5}><circleGeometry args={[0.3, 32]} /><meshBasicMaterial color="#000" transparent opacity={0.4 * (1 - k * 0.6)} /></mesh>
  <Pos bloom={0.5} /></>; }}</CP>; };
const G9: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[-1, 0.6, 6 + f * 0.006]} alvo={[0.6, 0, 0]} /><Luzes sol={[5, 1, 2]} i={2.6} amb={0.04} /><Estrelas sem="g9" />
  <TerraGira tex={tex} ang={f * 0.002} />
  <Lua tex={tex} pos={[3.2, 0.4, -2]} r={0.3} rot={[0, f * 0.002, 0]} />
  <Pos bloom={0.7} /></>}</CP>;

// ================= 1. O QUE É REAL =================
const C1a: React.FC = () => <CP>{(f) => { const tr = Math.sin(f * 0.9) * 0.012 + Math.sin(f * 2.3) * 0.006; return <>
  <Cam pos={[0.7, 0.2, 2.6]} alvo={[0, 0.2, 0]} /><Luzes sol={[2, 2, 4]} i={2} amb={0.3} /><color attach="background" args={['#05060a']} />
  <Mostrador n={24} h={tr} cor={OURO} aro="#3a3020" />
  <Pos bloom={0.6} /></>; }}</CP>;
const C1b: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.8, 3.6]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.05} /><Estrelas sem="c1b" />
  <group rotation={[Math.sin(f * 0.05) * 0.05, 0, 0.41 + Math.cos(f * 0.05) * 0.05]}><TerraGira tex={tex} ang={f * 0.01} /><mesh><cylinderGeometry args={[0.006, 0.006, 3, 8]} /><meshBasicMaterial color={NEON} transparent opacity={0.6} /></mesh></group>
  <Pos bloom={0.7} /></>}</CP>;
const C1c: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.4, 9]} alvo={[0, 1.6, 0]} /><Luzes sol={[-3, 4, 3]} i={0.7} amb={0.12} /><Estrelas sem="c1c" n={3000} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#1a1c18" /></mesh>
  {LAT(5).map((i) => <Antena key={i} pos={[(i - 2) * 2.4, 0, -1 - Math.abs(i - 2) * 0.5]} dir={[Math.sin(f * 0.01 + i) * 0.1, -1]} s={0.9} />)}
  {LAT(5).map((i) => <Tubo key={'b' + i} pts={[[(i - 2) * 2.4, 1.4, -1 - Math.abs(i - 2) * 0.5], [0, 14, -20]]} r={0.01} cor={NEON} o={0.25 + 0.2 * Math.sin(f * 0.3 + i)} />)}
  <Pos bloom={0.8} /></>}</CP>;
const C1d: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.8); const P = curva(160, OSC, -3, 3); return <>
  <Cam pos={[lerp(-1.5, 1.5, k), 0.3, 3.2]} alvo={[lerp(-1, 1.6, k), 0, 0]} /><ambientLight intensity={0.3} /><color attach="background" args={['#04060c']} />
  {LAT(9).map((i) => <mesh key={i} position={[0, -0.8 + i * 0.2, -0.05]}><planeGeometry args={[6.4, 0.005]} /><meshBasicMaterial color="#1a2a3a" /></mesh>)}
  <Tubo pts={P} r={0.018} cor={NEON} k={k} brilho={1.4} />
  {[0.585, 0.81].map((t, i) => k > t && <Brilho key={i} pos={[lerp(-3, 3, t), OSC(t), 0.05]} s={0.5 + 0.15 * Math.sin(f * 0.3)} cor="#ff3a2a" o={0.9} />)}
  <Pos bloom={1} /></>; }}</CP>; };
const C1e: React.FC = () => <CP>{(f) => { const w = 0.25 + Math.sin(f * 0.05) * 0.08; const prec = f * 0.03; return <>
  <Cam pos={[0, 1.3, 3]} alvo={[0, 0.5, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.3} /><color attach="background" args={['#08070a']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[4, 64]} /><meshStandardMaterial color="#2a2018" /></mesh>
  <group rotation={[Math.sin(prec) * 0.15, 0, Math.cos(prec) * 0.15]}><group rotation={[0, f * w, 0]}>
    <mesh position={[0, 0.55, 0]}><sphereGeometry args={[0.45, 48, 24]} /><meshStandardMaterial color="#c8261a" metalness={0.4} roughness={0.3} /></mesh>
    <mesh position={[0, 0.25, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.4, 0.5, 48]} /><meshStandardMaterial color="#e8c040" metalness={0.5} /></mesh>
    <mesh position={[0, 1.05, 0]}><cylinderGeometry args={[0.04, 0.04, 0.3, 12]} /><meshStandardMaterial color="#e8c040" /></mesh>
    <mesh position={[0.3, 0.6, 0.3]}><boxGeometry args={[0.1, 0.3, 0.02]} /><meshStandardMaterial color="#fff" /></mesh></group></group>
  <Pos bloom={0.5} /></>; }}</CP>;
const C1f: React.FC = () => <CP>{(f) => { const a = Math.sin(f * 0.07) * 0.5; return <>
  <Cam pos={[0, 0.2, 4]} alvo={[0, 0.2, 0]} /><Luzes sol={[2, 3, 4]} i={2} amb={0.3} /><color attach="background" args={['#05060a']} />
  <mesh position={[0, 1.8, 0]}><boxGeometry args={[1.6, 0.08, 0.2]} /><meshStandardMaterial color="#3a3a40" metalness={0.8} /></mesh>
  <group position={[0, 1.8, 0]} rotation={[0, 0, a]}><mesh position={[0, -1, 0]}><cylinderGeometry args={[0.01, 0.01, 2, 6]} /><meshStandardMaterial color="#c8c8c8" /></mesh>
    <mesh position={[0, -2.05, 0]}><sphereGeometry args={[0.18, 32, 32]} /><meshStandardMaterial color={OURO} metalness={0.9} roughness={0.2} /></mesh></group>
  {LAT(12).map((i) => { const ap = Math.sin((f - i * 2) * 0.07) * 0.5; return <Brilho key={i} pos={[Math.sin(ap) * 2.05, 1.8 - Math.cos(ap) * 2.05, -0.1]} s={0.18} cor={OURO} o={0.25 * (1 - i / 12)} />; })}
  <Pos bloom={0.8} /></>; }}</CP>;
const C1g: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 10, d * 0.5, Easing.in(Easing.quad)); return <>
  <Cam pos={[1.6, 1.2, 2.6]} alvo={[0, 0.2, 0]} /><Luzes sol={[2, 3, 3]} i={2.2} amb={0.15} /><Estrelas sem="c1g" />
  <Terra tex={tex} pos={[-2.4, 1, -4]} r={1.4} rot={[0.3, f * (0.005 + k * 0.05), 0]} />
  <group rotation={[-0.3 - k * 0.4, 0, 0]}><mesh position={[0, 0.3, 0]}><boxGeometry args={[0.5, 0.8, 0.08]} /><meshStandardMaterial color="#2a2c34" metalness={0.8} roughness={0.3} /></mesh>
    {LAT(5).map((i) => <mesh key={i} position={[0, 0.1 + i * 0.14, 0.05]}><boxGeometry args={[0.44, 0.03, 0.02]} /><meshStandardMaterial color="#555" /></mesh>)}</group>
  <group position={[0, 0.85 - k * 0.25, 0.35]} rotation={[0.6, 0, 0]}><mesh><boxGeometry args={[0.42, 0.22, 1.1]} /><meshStandardMaterial color="#14161a" /></mesh></group>
  <Pos bloom={0.6} /></>; }}</CP>; };
const C1h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 10, d * 0.7); return <>
  <Cam pos={[0, 0.3, 3.4]} /><Luzes sol={[3, 3, 4]} i={2.6} amb={0.1} /><Estrelas sem="c1h" />
  <group rotation={[0.3, f * 0.008, 0]}><Terra tex={tex} rot={[0, 0, 0]} nuvens={k < 0.5} /></group>
  <mesh scale={1.012}><sphereGeometry args={[1, 96, 96]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.35 * k} roughness={0.02} clearcoat={1} metalness={0.1} /></mesh>
  <Pos bloom={0.8} /></>; }}</CP>; };
const C1i: React.FC = () => <CP>{(f, tex) => { const e = Math.max(0, Math.sin(f * 0.08)) * 0.08; return <>
  <Cam pos={[0, 0.2, 3.6]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.06} /><Estrelas sem="c1i" />
  <TerraGira tex={tex} ang={f * 0.01} achata={e} />
  <Pos bloom={0.7} /></>; }}</CP>;

// ================= 2. 12 HORAS =================
const C2a: React.FC = () => <CP>{(f) => { const a = f * 0.09; const s: V3 = [Math.cos(a) * 20, Math.sin(a) * 20, -10]; const dia = Math.max(0, Math.sin(a)); return <>
  <Cam pos={[0, 2.5, 10]} alvo={[0, 1.5, 0]} /><ambientLight intensity={0.05 + dia * 0.3} /><directionalLight position={s} intensity={dia * 2.4} color="#ffe8c8" />
  <color attach="background" args={['#' + new THREE.Color('#02040a').lerp(new THREE.Color('#5a8ac8'), dia).getHexString()]} />
  <Brilho pos={s} s={6} cor="#fff0c0" o={dia} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#1a1e22" /></mesh>
  <Predios n={50} sem="c2a" z={-2} larg={18} alt={3} janelas={1 - dia} cor="#3a4250" />
  <Pos bloom={0.7} /></>; }}</CP>;
const LISTRAS = canvasTex(64, 512, (g) => { g.fillStyle = '#20242a'; g.fillRect(0, 0, 64, 512); for (let i = 0; i < 16; i++) { g.fillStyle = '#3a404a'; g.fillRect(0, i * 32, 64, 6); } });
LISTRAS.wrapT = THREE.RepeatWrapping;
const C2b: React.FC = () => { const d = useD(); return <CP>{(f) => { const w = lerp(0.02, 0.12, pr(f, 0, d, Easing.in(Easing.quad))); const pos = LAT(Math.max(1, f)).reduce((s, i) => s + lerp(0.02, 0.12, pr(i, 0, d, Easing.in(Easing.quad))), 0); LISTRAS.offset.y = pos; return <>
  <Cam pos={[2.4, 1.4, 2.4]} alvo={[0, 0.7, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.3} /><color attach="background" args={['#0a0c10']} />
  <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.8, 2.4]} /><meshStandardMaterial map={LISTRAS} /></mesh>
  <mesh position={[0, 0.08, 0]}><boxGeometry args={[1, 0.14, 2.6]} /><meshStandardMaterial color="#14161a" /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[l * 0.45, 0.65, -1]}><boxGeometry args={[0.05, 1.1, 0.05]} /><meshStandardMaterial color="#888" /></mesh>)}
  <Boneco pos={[0, 0.15, 0]} s={1} rot={Math.PI} anda={f * w * 3} />
  {LAT(20).map((i) => <mesh key={i} position={[(random('sp' + i) - 0.5) * 6, random('sq' + i) * 2.5, -3 + ((f * w * 6 + random('sr' + i) * 10) % 10)]}><boxGeometry args={[0.01, 0.01, w * 6]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.3} /></mesh>)}
  <Pos bloom={0.5} /></>; }}</CP>; };
const C2c = Pesagem({de: 80, para: 79, chao: '#c8d0d8', fundo: '#0c1018', cam: [0, 1.6, 0.9]});
const C2d: React.FC = () => <CP>{(f, tex) => { const c = camLL(10, -40, 2.6); const p = v(0, -40, 1.0); const n = p.clone().normalize(); const k = 0.5 + 0.5 * Math.sin(f * 0.15); return <>
  <Cam pos={c} /><Luzes sol={[c[0], 2, c[2]]} i={2.2} amb={0.2} /><Estrelas sem="c2d" />
  <group rotation={[0, f * 0.004, 0]}><Terra tex={tex} rot={[0, 0, 0]} />
    <group position={V(p)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)}><Boneco s={0.12} cor="#ffffff" /></group>
    <Tubo pts={[V(n.clone().multiplyScalar(1.15)), V(n.clone().multiplyScalar(1.15 + 0.15 * k))]} r={0.012} cor={OURO} />
    <Brilho pos={V(n.clone().multiplyScalar(1.3 + 0.15 * k))} s={0.12} cor={OURO} o={0.9} /></group>
  <Pos bloom={0.8} /></>; }}</CP>;
const C2e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 5, 8]} alvo={[0, 0, -2]} /><Luzes sol={[-4, 6, 2]} i={1.6} amb={0.3} /><Ceu cima="#2a3a5a" baixo="#8aa0b8" />
  <Viva n={100} tam={50} h={(x, z) => (Math.sin(x * 0.7 + f * 0.06) + Math.sin(z * 0.9 - f * 0.05)) * 0.08} mat={<meshStandardMaterial color="#1a4a6a" roughness={0.3} metalness={0.4} />} />
  <FuracaoG pos={[0, 1.6, -3]} s={4} giro={f * 0.02} o={0.8} />
  <Pos bloom={0.5} /></>}</CP>;
const C2f: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={camLL(22, -60, 2.3)} /><Luzes sol={solDe(camLL(22, -60, 2.3))} i={2.3} amb={0.25} /><Estrelas sem="c2f" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  {[[18, -55, 0.09], [25, -70, 0.07], [14, -42, 0.06]].map(([la, lo, s], i) => { const p = v(la, lo, 1.02); return <group key={i} position={V(p)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize())}><group rotation={[0, 0, f * 0.08 * (1 + i * 0.3)]}><Furacao s={s} giro={0} rot={[0, 0, 0]} /></group></group>; })}
  <Pos bloom={0.7} /></>}</CP>;
function solDe(c: V3): V3 { const p = new THREE.Vector3(...c).normalize(); const lado = new THREE.Vector3(0, 1, 0).cross(p).normalize(); return V(p.multiplyScalar(4).add(lado.multiplyScalar(2.2)).add(new THREE.Vector3(0, 1.6, 0))); }
const C2g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.4, 7]} alvo={[0, 1.2, 0]} tremor={0.02} /><Luzes sol={[-3, 4, 2]} i={0.9} amb={0.25} /><Ceu cima="#1a2028" baixo="#4a5a6a" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#3a4a2a" roughness={1} /></mesh>
  {LAT(6).map((i) => <group key={i} rotation={[0, 0, -0.25 - Math.sin(f * 0.3 + i) * 0.1]} position={[-5 + i * 2, 0, -1 - (i % 2) * 2]}><Palmeira pos={[0, 0, 0]} f={f * 4} s={1.5} /></group>)}
  {LAT(80).map((i) => { const x = ((f * 0.25 + random('ch' + i) * 20) % 20) - 10; return <mesh key={i} position={[x, random('cy' + i) * 4, (random('cz' + i) - 0.5) * 6]} rotation={[0, 0, -0.3]}><boxGeometry args={[0.6, 0.006, 0.006]} /><meshBasicMaterial color="#c8d8e8" transparent opacity={0.4} /></mesh>; })}
  <Pos bloom={0.4} /></>}</CP>;
const C2h: React.FC = () => <CP>{(f, tex) => { const a = f * 0.004 + 0.5; return <>
  <Cam pos={[Math.sin(a) * 16, 5, Math.cos(a) * 16]} /><Luzes sol={[-8, 4, 10]} i={2.4} amb={0.15} /><Estrelas sem="c2h" />
  <TerraGira tex={tex} ang={f * 0.02} />
  {LAT(40).map((i) => { const b = i / 40 * Math.PI * 2 + f * 0.003 * (1 + (i % 5) * 0.4); return <Sat key={i} pos={[Math.cos(b) * 6.6, (random('sy' + i) - 0.5) * 0.4 * pr(f, 0, 60), Math.sin(b) * 6.6]} s={0.14} rot={-b} />; })}
  <Pos bloom={0.8} /></>; }}</CP>;
const C2i: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const r = lerp(6.6, 4.2, pr(f, 6, d - 6)); return <>
  <Cam pos={[0, 6, 13]} alvo={[0, 0, 0]} /><Luzes sol={[-6, 5, 8]} i={2.4} amb={0.15} /><Estrelas sem="c2i" />
  <TerraGira tex={tex} ang={f * 0.02} />
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[6.6, 0.015, 8, 200]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.2} /></mesh>
  {LAT(36).map((i) => { const b = i / 36 * Math.PI * 2 + f * 0.01; return <Sat key={i} pos={[Math.cos(b) * r, 0, Math.sin(b) * r]} s={0.13} rot={-b} />; })}
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r, 0.02, 8, 200]} /><meshBasicMaterial color={NEON} transparent opacity={0.6} toneMapped={false} /></mesh>
  <Pos bloom={0.9} /></>; }}</CP>; };
const C2j: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 4, d * 0.7, Easing.inOut(Easing.back(1.2))); return <>
  <Cam pos={[2.4, 3.2, 4.6]} alvo={[0, 2.4, 0]} /><Luzes sol={[-2, 5, 4]} i={1.4} amb={0.25} /><Ceu cima="#1a2a4a" baixo="#c8885a" />
  <group><mesh position={[0, 1, 0]}><boxGeometry args={[3, 2, 2.4]} /><meshStandardMaterial color="#b8a890" /></mesh><mesh position={[0, 2.35, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[2.3, 0.7, 4]} /><meshStandardMaterial color="#6a2a1a" /></mesh></group>
  <group position={[0.6, 2.5, 0.4]}><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.02, 0.02, 0.6, 8]} /><meshStandardMaterial color="#888" /></mesh>
    <group position={[0, 0.65, 0]} rotation={[0, lerp(0.4, 2.6, k), lerp(-0.6, 0.3, k)]}><mesh rotation={[0, 0, Math.PI / 2]}><sphereGeometry args={[0.28, 32, 12, 0, Math.PI * 2, 0, 0.8]} /><meshStandardMaterial color="#e8ecf0" side={THREE.DoubleSide} /></mesh></group></group>
  <Pos bloom={0.4} /></>; }}</CP>; };

// ================= 3. 6 HORAS =================
const C3a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.3, 0.1, 2.8]} /><Luzes sol={[2, 3, 4]} i={2} amb={0.4} /><color attach="background" args={['#3a2e24']} />
  <mesh position={[0, 0, -0.2]}><planeGeometry args={[8, 6]} /><meshStandardMaterial color="#d8c8a8" /></mesh>
  <Mostrador n={60} h={f * 0.08} m={f * 0.9} cor="#c8261a" fundo="#f4f0e6" aro="#c8261a" r={0.9} />
  <Pos bloom={0.3} /></>}</CP>;
const C3b: React.FC = () => <CP>{(f) => { const z = (f * 0.6) % 60; return <>
  <Cam pos={[0, 0.5, 4]} alvo={[0, 0.3, -10]} /><Luzes sol={[-3, 5, 2]} i={1.8} amb={0.35} /><Ceu cima="#3a6aa8" baixo="#e0e8f0" />
  <group position={[0, 0, z]}><mesh geometry={TERRENO}><meshStandardMaterial color="#5a7a3a" roughness={1} /></mesh><mesh geometry={TERRENO} position={[0, 0, -60]}><meshStandardMaterial color="#5a7a3a" roughness={1} /></mesh>
    {LAT(40).map((i) => <Arvore key={i} pos={[(random('t3' + i) - 0.5) * 30, 0, -random('u3' + i) * 120 + 30]} s={1.4} />)}</group>
  {LAT(40).map((i) => <mesh key={'s' + i} position={[(random('v3' + i) - 0.5) * 8, random('w3' + i) * 2, -((f * 1.2 + random('x3' + i) * 20) % 20)]}><boxGeometry args={[0.01, 0.01, 1.4]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.35} /></mesh>)}
  <Pos bloom={0.4} /></>; }}</CP>;
const C3c = Pesagem({de: 79, para: 75, chao: '#4a6a3a', fundo: '#8ab0d8', cam: [0.8, 1.4, 1.2], extra: (f) => <><Palmeira pos={[-1.5, 0, -1.5]} f={f} s={1.2} /><Brilho pos={[3, 4, -6]} s={2} cor="#fff4d0" o={0.8} /></>});
const C3d: React.FC = () => <CP>{(f) => { const t = f * 0.08; return <>
  <Cam pos={[0.8, 0.9, 1.6]} alvo={[0, 0.3, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.35} /><color attach="background" args={['#0c0e12']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 6]} /><meshStandardMaterial color="#3a2a1c" /></mesh>
  <Copo pos={[0, 0.3, 0]} s={2} />
  <group position={[0, 0.42, 0]} rotation={[Math.sin(t) * 0.12, 0, Math.cos(t * 0.8) * 0.12]}><mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.21, 48]} /><meshPhysicalMaterial color="#5aa8e8" roughness={0.05} transparent opacity={0.7} /></mesh></group>
  <Pos bloom={0.4} /></>; }}</CP>;
const C3e: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[3.2, 0.1, 0.4]} alvo={[0, 0, 0]} /><Luzes sol={[3, 2, 4]} i={2.6} amb={0.1} /><Estrelas sem="c3e" />
  <TerraGira tex={tex} ang={f * 0.004} achata={0.03} />
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.035, 0.004, 8, 200]} /><meshBasicMaterial color={OURO} transparent opacity={0.8} toneMapped={false} /></mesh>
  <mesh><cylinderGeometry args={[0.004, 0.004, 2.4, 8]} /><meshBasicMaterial color={NEON} transparent opacity={0.6} /></mesh>
  <Pos bloom={0.7} /></>}</CP>;
const C3f: React.FC = () => { const d = useD(); return <CP>{(f, tex) => <>
  <Cam pos={[0, 0.4, 3.6]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.08} /><Estrelas sem="c3f" />
  <TerraGira tex={tex} ang={f * 0.015} achata={lerp(0.02, 0.2, pr(f, 0, d - 10, Easing.inOut(Easing.cubic)))} />
  <Pos bloom={0.7} /></>}</CP>; };
const C3g: React.FC = () => { const d = useD(); return <CP>{(f, tex) => <>
  <Cam pos={[0, 1.2, 3.4]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.12} /><Estrelas sem="c3g" />
  <group rotation={[0.15, f * 0.006, 0]} scale={[1.15, 0.88, 1.15]}><Terra tex={tex} rot={[0, 0, 0]} nuvens={false} /><Faixa k={pr(f, 0, d - 10)} /></group>
  <Pos bloom={0.7} /></>}</CP>; };
const PRAIA = relevo(140, (x, z) => Math.max(-0.6, (-z - 1) * 0.12) + Math.sin(x * 0.7) * 0.05, 30);
const C3h: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d, Easing.inOut(Easing.quad)); return <>
  <Cam pos={[5, 2.6, 6]} alvo={[0, 0, -2]} /><Luzes sol={[-5, 6, 3]} i={1.8} amb={0.3} /><Ceu cima="#2a3a5a" baixo="#b8c8d8" />
  <mesh geometry={PRAIA}><meshStandardMaterial color="#c8b088" roughness={1} /></mesh>
  {LAT(10).map((i) => <Casa key={i} pos={[-5 + i * 1.1, 0.12 + (i % 3) * 0.1, -2.5 - (i % 3) * 0.6]} i={i} s={0.9} luz={0} />)}
  <Viva n={120} tam={30} pos={[0, lerp(-0.3, 0.55, k), 0]} h={(x, z) => Math.sin(x * 1.1 + f * 0.08) * 0.04 + Math.sin(z * 0.9 + f * 0.05) * 0.03} mat={<meshStandardMaterial color="#2a6a8a" roughness={0.2} metalness={0.4} transparent opacity={0.9} />} />
  <Pos bloom={0.4} /></>; }}</CP>; };
const C3i: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d, Easing.inOut(Easing.quad)); return <>
  <Cam pos={[3, 2.4, 6]} alvo={[0, -0.4, -1]} /><Luzes sol={[-3, 3, 2]} i={1.2} amb={0.35} /><Ceu cima="#5a6a7a" baixo="#c8d0d8" />
  <mesh geometry={FUNDO}><meshStandardMaterial color="#6a5a48" roughness={1} /></mesh>
  {LAT(14).map((i) => <mesh key={i} position={[(random('ro' + i) - 0.5) * 8, -0.3, (random('rp' + i) - 0.5) * 8]} scale={0.1 + random('rq' + i) * 0.2}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#4a4038" flatShading /></mesh>)}
  <Viva n={90} tam={24} pos={[0, lerp(0.3, -0.9, k), 0]} h={(x, z) => Math.sin(x + f * 0.05) * 0.03} mat={<meshStandardMaterial color="#3a6a8a" roughness={0.2} metalness={0.4} transparent opacity={0.85} />} />
  <Pos bloom={0.3} /></>; }}</CP>; };
const C3j: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.3, 3.4]} /><Luzes sol={[-3, 2, 4]} i={2.4} amb={0.1} /><Estrelas sem="c3j" />
  <group rotation={[0.1, 0.4, 0]}><Terra tex={tex} rot={[0, 0, 0]} />
    {LAT(16).map((i) => { const lo = i / 16 * 360; return [1, -1].map((h) => { const t = ((f * 0.012 + i * 0.13) % 1); const la = h * lerp(70, 6, t); return <Brilho key={i + '' + h} pos={V(v(la, lo, 1.03))} s={0.07} cor={NEON} o={0.9 * Math.sin(t * Math.PI)} />; }); })}</group>
  <Pos bloom={1} /></>}</CP>;
const C3k: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 2.3, 1.6]} alvo={[0, 0, -0.1]} /><Luzes sol={[0, 4, 2]} i={2} amb={0.4} /><color attach="background" args={['#05070c']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[4, 2]} /><meshStandardMaterial map={tex.dia} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} scale={[1, lerp(0.05, 0.42, k), 1]}><planeGeometry args={[4, 2]} /><meshStandardMaterial color="#1a5aaa" transparent opacity={0.75} /></mesh>
  {[1, -1].map((l) => <mesh key={l} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, -l * lerp(0.95, 0.7, k)]} scale={[1, k, 1]}><planeGeometry args={[4, 0.5]} /><meshStandardMaterial color="#9a8058" transparent opacity={0.7} /></mesh>)}
  <Pos bloom={0.4} /></>; }}</CP>; };

// ================= 4. 4 HORAS =================
const C4a: React.FC = () => <CP>{(f) => { const a = f * 0.12; const dia = Math.max(0, Math.sin(a)); const s: V3 = [Math.cos(a) * 20, Math.sin(a) * 14, -12]; return <>
  <Cam pos={[1.6, 1.6, 4]} alvo={[0, 1.6, -2]} /><ambientLight intensity={0.08 + dia * 0.3} /><directionalLight position={s} intensity={dia * 2.2} color="#ffd8a8" />
  <color attach="background" args={['#' + new THREE.Color('#03050c').lerp(new THREE.Color('#e89a5a'), dia).getHexString()]} />
  <Brilho pos={s} s={7} cor="#fff0c0" o={dia} />
  <group position={[0, 0, -1]}><mesh position={[0, 1.4, 0]}><cylinderGeometry args={[0.04, 0.04, 2.8, 12]} /><meshStandardMaterial color="#c8ccd0" metalness={0.9} /></mesh>
    <mesh position={[0.35, 2.75, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.03, 0.03, 0.7, 12]} /><meshStandardMaterial color="#c8ccd0" metalness={0.9} /></mesh>
    <mesh position={[0.7, 2.65, 0]}><cylinderGeometry args={[0.2, 0.12, 0.12, 24]} /><meshStandardMaterial color="#d8dce0" metalness={0.9} /></mesh></group>
  {LAT(60).map((i) => <mesh key={i} position={[-0.3 + (random('ch' + i) - 0.5) * 0.3, 2.55 - ((f * 0.08 + random('cy' + i) * 2.5) % 2.5), -1 + (random('cz' + i) - 0.5) * 0.3]}><boxGeometry args={[0.006, 0.12, 0.006]} /><meshBasicMaterial color="#c8e8ff" transparent opacity={0.6} /></mesh>)}
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 10]} /><meshStandardMaterial color="#c8d8e0" /></mesh>
  <Pos bloom={0.7} /></>; }}</CP>;
const C4b: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={camLL(15, -30, 2.8)} /><Luzes sol={solDe(camLL(15, -30, 2.8))} i={2.2} amb={0.2} /><Estrelas sem="c4b" />
  <TerraGira tex={tex} ang={f * 0.05} />
  {LAT(24).map((i) => { const a = i / 24 * Math.PI * 2 + f * 0.05; return <Brilho key={i} pos={[Math.cos(a) * 1.02, 0, -Math.sin(a) * 1.02]} s={0.06} cor={OURO} o={0.9} />; })}
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.012, 0.005, 8, 200]} /><meshBasicMaterial color={OURO} transparent opacity={0.6} toneMapped={false} /></mesh>
  <Pos bloom={0.9} /></>}</CP>;
const C4c = Pesagem({de: 75, para: 70, chao: '#1a1a1e', fundo: '#14161c', cam: [-0.7, 1.5, 1.1], luz: '#ff8a40', extra: () => <>{LAT(4).map((i) => <mesh key={i} position={[-2 + i * 1.3, 0.3, -2]}><cylinderGeometry args={[0.25, 0.25, 0.08, 24]} /><meshStandardMaterial color="#2a2a2e" metalness={0.8} /></mesh>)}</>});
const C4d: React.FC = () => { const d = useD(); return <CP>{(f) => { const t = (f % d) / d; const y = Math.sin(t * Math.PI) * 1.8; return <>
  <Cam pos={[3, 1.4, 4]} alvo={[0, 1.2, 0]} /><Luzes sol={[-3, 5, 3]} i={2} amb={0.35} /><Ceu cima="#3a6aa8" baixo="#d8e8f0" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[30, 64]} /><meshStandardMaterial color="#6a8a4a" /></mesh>
  <Boneco pos={[0, y, 0]} s={1.3} rot={-0.6} anda={0.6} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} scale={1 - y * 0.25}><circleGeometry args={[0.35, 32]} /><meshBasicMaterial color="#000" transparent opacity={0.35} /></mesh>
  <Pos bloom={0.4} /></>; }}</CP>; };
const C4e: React.FC = () => <CP>{(f, tex) => { const c = camLL(20, -70, 2.0); const p = v(20, -70, 1.02); return <>
  <Cam pos={c} /><Luzes sol={solDe(c)} i={2.3} amb={0.25} /><Estrelas sem="c4e" />
  <Terra tex={tex} rot={[0, 0, 0]} />
  <group position={V(p)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize())}><group rotation={[0, 0, f * 0.12]}><Furacao s={0.38} giro={0} rot={[0, 0, 0]} /></group></group>
  <Pos bloom={0.7} /></>; }}</CP>;
const C4f: React.FC = () => <CP>{(f) => { const raio = (f % 37) < 3; return <>
  <Cam pos={[0, 1, 8]} alvo={[0, 2.5, -10]} tremor={raio ? 0.04 : 0} /><Luzes sol={[0, 6, -4]} i={raio ? 3 : 0.3} amb={raio ? 0.6 : 0.1} /><Ceu cima="#0a0c12" baixo="#2a3038" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[80, 80]} /><meshStandardMaterial color="#141810" /></mesh>
  <Nuvem n={900} sem="c4f" origem={new THREE.Vector3(0, 6, -14)} t={200} raio={18} cor="#3a4048" tam={3} o={0.45} dir={new THREE.Vector3(1, 0, 0)} />
  {raio && <Tubo pts={[[2, 8, -16], [1.4, 5, -16], [2.2, 3, -16], [1.6, 0, -16]]} r={0.06} cor="#e8f0ff" brilho={3} />}
  <Pos bloom={1} /></>; }}</CP>;
const C4g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-2, 1.2, 5]} alvo={[0, 0.3, 0]} /><Luzes sol={[5, 4, 3]} i={2.4} amb={0.3} /><Ceu cima="#020610" baixo="#3a6aa8" />
  {LAT(140).map((i) => <Brilho key={i} pos={[(random('n4' + i) - 0.5) * 30, -1.2 - random('m4' + i) * 0.8, (random('o4' + i) - 0.5) * 20 - 4]} s={2 + random('p4' + i) * 2} cor="#ffffff" o={0.55} />)}
  <Sat pos={[-6 + f * 0.05, 0.4, 0]} s={0.6} rot={0.3} />
  <Pos bloom={0.6} /></>}</CP>;

// ================= 5. 3 HORAS =================
const C5a: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 0.3, 3.3]} /><Luzes sol={[-4, 1, 3]} i={1.8} amb={0.05} /><Estrelas sem="c5a" />
  <group rotation={[0.3, 0, 0]}><TerraN tex={tex} giro={f * 0.12} luz={1} /></group>
  {LAT(4).map((i) => <group key={i} rotation={[0.3, f * 0.12 - (i + 1) * 0.06, 0]}><mesh scale={1.005}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial map={tex.dia} transparent opacity={0.18 - i * 0.04} depthWrite={false} /></mesh></group>)}
  <Pos bloom={1} /></>}</CP>;
const C5b = Pesagem({de: 70, para: 62, chao: '#d8b878', fundo: '#e8a868', cam: [0.6, 1.5, -1.2], extra: () => <mesh geometry={relevo(60, (x, z) => Math.sin(x * 0.6 + z * 0.3) * 0.3, 30)} position={[0, -0.25, -8]}><meshStandardMaterial color="#c8a060" /></mesh>});
const C5c: React.FC = () => { const d = useD(); return <CP>{(f, tex) => <>
  <Cam pos={[0, 2.2, 3.6]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.1} /><Estrelas sem="c5c" />
  <TerraGira tex={tex} ang={f * 0.1} achata={0.15} estica={lerp(0, 0.18, pr(f, 0, d, Easing.inOut(Easing.sin)))} />
  <Pos bloom={0.7} /></>}</CP>; };
const C5d: React.FC = () => <CP>{(f) => { const w = Math.sin(f * 0.1); return <>
  <Cam pos={[0, 0.3, 3.4]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.15} /><Estrelas sem="c5d" />
  <mesh scale={[1.2 + w * 0.08, 0.85 - w * 0.05, 1.05]} rotation={[0, f * 0.05, 0]}><sphereGeometry args={[1, 96, 48]} /><meshPhysicalMaterial color="#3a8ad8" roughness={0.05} transmission={0.4} transparent opacity={0.9} clearcoat={1} /></mesh>
  <Pos bloom={0.6} /></>; }}</CP>;
const C5e: React.FC = () => { const d = useD(); return <CP>{(f) => { const t = pr(f, 0, d); return <>
  <Cam pos={[lerp(-3.5, 2.5, t), lerp(1, 0.3, t), lerp(6, 3.2, t)]} alvo={[lerp(0, 1.4, t), 0, lerp(0, -2, t)]} /><Luzes sol={[-10, 2, 4]} i={1.6} amb={0.05} /><Estrelas sem="c5e" n={3000} />
  <mesh rotation={[0.4, f * 0.01, 0]}><sphereGeometry args={[1.4, 64, 64]} /><meshStandardMaterial color="#3a6ad8" roughness={0.6} emissive="#0a1a4a" /></mesh>
  <Brilho pos={[6, 0, -12]} s={0.3} cor="#fff" o={0.9} />
  <Pos bloom={0.7} /></>; }}</CP>; };
const C5f: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.6, 7]} /><Luzes sol={[-4, 2, 4]} i={2.6} amb={0.06} /><Estrelas sem="c5f" />
  <Ovo ang={f * 0.12} />
  <Pos bloom={0.6} /></>}</CP>;
const C5g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[2.4, 0.8, 4]} alvo={[0, 0, 0]} /><Luzes sol={[3, 3, 4]} i={2.2} amb={0.2} /><color attach="background" args={['#03040a']} /><Estrelas sem="c5g" />
  <mesh><cylinderGeometry args={[0.7, 0.7, 3.4, 48, 1, true]} /><meshPhysicalMaterial color="#e8f4ff" roughness={0.02} transparent opacity={0.18} side={THREE.DoubleSide} /></mesh>
  <mesh position={[0, -1.7, 0]}><sphereGeometry args={[0.7, 48, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshPhysicalMaterial color="#e8f4ff" roughness={0.02} transparent opacity={0.18} side={THREE.DoubleSide} /></mesh>
  <Ovo ang={f * 0.1} s={0.24} pos={[0, -0.4, 0]} />
  <Pos bloom={0.6} /></>}</CP>;

// ================= 6. 2 HORAS =================
const C6a: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.4, 0.4, 3.2]} /><Luzes sol={[2, 3, 4]} i={2} amb={0.3} /><color attach="background" args={['#050508']} />
  <group rotation={[0, 0, -f * 0.08]}><mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.1, 1.1, 0.12, 64]} /><meshStandardMaterial color="#2a2a2e" metalness={0.8} roughness={0.3} /></mesh>
    {LAT(6).map((i) => { const a = i / 6 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0.07]}><circleGeometry args={[0.22, 32]} /><meshBasicMaterial color="#050508" /></mesh>; })}</group>
  <mesh position={[1.4, -0.4, 0]} rotation={[0, 0, 0.2]}><boxGeometry args={[1.4, 0.3, 0.02]} /><meshStandardMaterial color="#1a1612" emissive="#ffb060" emissiveIntensity={0.15} /></mesh>
  <Pos bloom={0.5} /></>}</CP>;
const C6b: React.FC = () => <CP>{(f) => { const z = (f * 1.4) % 4; return <>
  <Cam pos={[0, 0.6, 3]} alvo={[0, 0.2, -10]} /><color attach="background" args={['#02030a']} />
  {LAT(40).map((i) => <mesh key={i} position={[0, 0, -i * 1 + z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 0.04]} /><meshBasicMaterial color={NEON} transparent opacity={0.5 * (1 - i / 40)} toneMapped={false} /></mesh>)}
  {LAT(15).map((i) => <mesh key={'x' + i} position={[(i - 7) * 2, 0, -20]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.04, 44]} /><meshBasicMaterial color={NEON} transparent opacity={0.3} toneMapped={false} /></mesh>)}
  <Pos bloom={1.2} /></>; }}</CP>;
const C6c = Pesagem({de: 62, para: 40, chao: '#d8c8a0', fundo: '#7ab0e0', cam: [-0.4, 1.4, -1.3], extra: (f) => <Viva n={60} tam={30} pos={[0, -0.05, -10]} h={(x) => Math.sin(x * 0.8 + f * 0.08) * 0.05} mat={<meshStandardMaterial color="#2a6a9a" roughness={0.2} metalness={0.4} />} />});
const C6d: React.FC = () => <CP>{(f) => { const t = (f % 70) / 70; const y = Math.sin(t * Math.PI) * 1.2; const x = -3 + f * 0.035; return <>
  <Cam pos={[x + 1.5, 1.2, 5]} alvo={[x, 0.8, 0]} /><Luzes sol={[-3, 5, 3]} i={1.8} amb={0.3} /><Ceu cima="#1a2a4a" baixo="#c8b090" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#8a7a5a" roughness={1} /></mesh>
  <Boneco pos={[x, y, 0]} s={1.2} rot={Math.PI / 2} anda={0.4 + t} />
  <Nuvem n={40} sem={'c6d' + Math.floor(f / 70)} origem={new THREE.Vector3(x - 0.3, 0.05, 0)} t={(f % 70)} raio={0.8} cor="#c8b090" tam={0.12} o={0.5} />
  <Pos bloom={0.4} /></>; }}</CP>;
const C6e: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0.6, 1.2, 2.6]} alvo={[0, 1, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.35} /><color attach="background" args={['#0a0c10']} />
  <Copo pos={[0.4, 1.3 + Math.sin(f * 0.03) * 0.05, 0]} rot={[0, 0, 2.4]} s={1.6} />
  {LAT(26).map((i) => { const t = f * 0.012 * (0.5 + random('ag' + i)); return <mesh key={i} position={[0.2 - t * (0.3 + random('ax' + i)), 1.2 + Math.sin(t * 2 + i) * 0.1 + t * (random('ay' + i) - 0.5), (random('az' + i) - 0.5) * 0.4]} scale={0.03 + random('as' + i) * 0.05}><sphereGeometry args={[1, 16, 16]} /><meshPhysicalMaterial color="#8ac8ff" roughness={0.02} transparent opacity={0.75} /></mesh>; })}
  <Pos bloom={0.6} /></>}</CP>;
const C6f: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const r = lerp(2.0, 1.27, pr(f, 0, d - 10)); return <>
  <Cam pos={[0.4, 0.5, 2.6]} alvo={[0, 0.2, 0]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.15} /><Estrelas sem="c6f" />
  <TerraGira tex={tex} ang={f * 0.02} />
  {LAT(30).map((i) => { const b = i / 30 * Math.PI * 2 + f * 0.02; return <Sat key={i} pos={[Math.cos(b) * r, 0, Math.sin(b) * r]} s={0.04} rot={-b} />; })}
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r, 0.004, 8, 200]} /><meshBasicMaterial color={NEON} transparent opacity={0.7} toneMapped={false} /></mesh>
  <Pos bloom={0.9} /></>; }}</CP>; };
const C6g: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 3, 8]} alvo={[0, 0.4, 0]} /><Luzes sol={[-4, 3, 5]} i={2.4} amb={0.15} /><Estrelas sem="c6g" />
  <TerraGira tex={tex} ang={f * 0.02} />
  {[0.9, 2.3, -0.7].map((inc, j) => <group key={j} rotation={[inc, j, 0]}>{LAT(6).map((i) => { const b = i / 6 * Math.PI * 2 + f * 0.004; return <Sat key={i} pos={[Math.cos(b) * 4.2, 0, Math.sin(b) * 4.2]} s={0.1} rot={-b} />; })}
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[4.2, 0.008, 8, 200]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.25} /></mesh></group>)}
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.27, 0.01, 8, 200]} /><meshBasicMaterial color={NEON} transparent opacity={0.8} toneMapped={false} /></mesh>
  <Pos bloom={0.9} /></>}</CP>;
const C6h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { pesoMat.uniforms.k.value = pr(f, 0, d * 0.5); return <>
  <Cam pos={[0, 1.4, 3.4]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.12} /><Estrelas sem="c6h" />
  <group rotation={[0, f * 0.02, 0]} scale={[1.2, 0.85, 1.2]}><Terra tex={tex} rot={[0, 0, 0]} nuvens={false} /><mesh material={pesoMat} scale={1.01}><sphereGeometry args={[1, 96, 48]} /></mesh></group>
  <Pos bloom={0.7} /></>; }}</CP>; };
const C6i: React.FC = () => <CP>{(f, tex) => { const pol = v(80, 0, 1.0), eq = v(0, 0, 1.0); const flut = 0.08 + Math.sin(f * 0.06) * 0.03; return <>
  <Cam pos={[2.6, 1.6, 1.6]} alvo={[0.5, 0.5, 0]} /><Luzes sol={[3, 3, 3]} i={2.4} amb={0.15} /><Estrelas sem="c6i" />
  <group scale={[1.2, 0.85, 1.2]}><Terra tex={tex} rot={[0, 0, 0]} nuvens={false} /></group>
  <group position={[pol.x * 1.2, pol.y * 0.85, pol.z * 1.2]} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), pol.clone().normalize())}><Boneco s={0.14} cor="#ff6a4a" /></group>
  <group position={[eq.x * (1.2 + flut), 0, 0]} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0))}><Boneco s={0.14} cor="#7ad8ff" anda={f * 0.05} /></group>
  <Pos bloom={0.7} /></>; }}</CP>;

// ================= 7. 1H24 =================
const C7a: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.8, Easing.inOut(Easing.cubic)); return <>
  <Cam pos={[0, 0, 3.4]} /><Luzes sol={[1, 2, 4]} i={2} amb={0.3} /><color attach="background" args={['#04050a']} />
  <group scale={lerp(1, 0.35, k)} rotation={[0, 0, f * 0.02]}><Mostrador n={24} h={f * 0.4} m={f * 2} cor="#ff6a4a" /></group>
  <Pos bloom={0.9} /></>; }}</CP>; };
const C7b: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.6, 5]} alvo={[0, 0.8, 0]} /><Luzes sol={[-3, 5, 3]} i={1.8} amb={0.35} /><Ceu cima="#2a5a9a" baixo="#d8e0e8" />
  <group position={[0, 0, (f * 0.5) % 30 - 15]}><mesh geometry={TERRENO} position={[0, -0.3, 0]}><meshStandardMaterial color="#6a7a4a" roughness={1} /></mesh></group>
  <ISS pos={[0, 1.5, 0]} s={0.7} rot={[0.1, 0.4, 0]} />
  <Pos bloom={0.5} /></>}</CP>;
const C7c = Pesagem({de: 40, para: 0, chao: '#6a8a4a', fundo: '#4a7ab8', cam: [1, 1.2, 1.2]});
const C7d: React.FC = () => { const d = useD(); return <CP>{(f) => { const y = pr(f, 0, d, Easing.inOut(Easing.sin)) * 2.2; return <>
  <Cam pos={[0, 1 + y * 0.5, 5]} alvo={[0, 1 + y * 0.7, 0]} /><Luzes sol={[-3, 5, 3]} i={2} amb={0.35} /><Ceu cima="#1a3a7a" baixo="#f0d8a8" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#5a7a3a" roughness={1} /></mesh>
  <group position={[0, y, 0]} rotation={[0.1, 0, Math.sin(f * 0.03) * 0.2]}><Boneco s={1.2} anda={Math.sin(f * 0.04) * 0.6} /></group>
  <Pos bloom={0.4} /></>; }}</CP>; };
const C7e: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const r = lerp(1.6, 1.01, pr(f, 0, d - 10)); return <>
  <Cam pos={[0, 1.6, 3.4]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.12} /><Estrelas sem="c7e" />
  <TerraGira tex={tex} ang={f * 0.03} />
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r, 0.008, 8, 200]} /><meshBasicMaterial color={OURO} toneMapped={false} /></mesh>
  <Brilho pos={[r, 0, 0]} s={0.2} cor={OURO} o={0.9} />
  <Pos bloom={0.9} /></>; }}</CP>; };
const C7f: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.2, 4]} alvo={[0, 1.2, 0]} /><Luzes sol={[-3, 5, 3]} i={2} amb={0.35} /><Ceu cima="#2a5a9a" baixo="#e8d8b8" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#7a6a4a" roughness={1} /></mesh>
  {LAT(18).map((i) => { const y = Math.max(0, f - i * 4) * 0.012 * (0.6 + random('sb' + i)); const x = (random('sx' + i) - 0.5) * 5, z = (random('sz' + i) - 0.5) * 3; const tipo = i % 3;
    return <group key={i} position={[x, 0.1 + y, z]} rotation={[y * random('ra' + i) * 2, y * 1.5, y]}>{tipo === 0 ? <mesh scale={0.12}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#6a5a4a" flatShading /></mesh>
      : tipo === 1 ? <mesh scale={[0.18, 0.01, 0.1]}><sphereGeometry args={[1, 12, 8]} /><meshStandardMaterial color="#4a8a3a" side={THREE.DoubleSide} /></mesh> : <Copo pos={[0, 0, 0]} s={0.8} />}</group>; })}
  <Pos bloom={0.4} /></>}</CP>;
const C7g: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 1.6, 7]} alvo={[0, 2, 0]} /><Luzes sol={[-3, 4, 3]} i={1.6} amb={0.3} /><Ceu cima="#0a1a3a" baixo="#c8a878" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#8a7050" roughness={1} /></mesh>
  <Nuvem n={900} sem="c7g" origem={new THREE.Vector3(0, 0, -2)} t={f + 20} raio={8} cor="#c8a878" tam={0.12} o={0.6} dir={new THREE.Vector3(0, 3, 0)} />
  <Pedras n={40} sem="c7g" origem={new THREE.Vector3(0, 0.1, -2)} dir={new THREE.Vector3(0, 1, 0)} abre={1.4} t={f} vel={0.03} tam={0.08} cor="#6a5a48" brasa={0} />
  <Pos bloom={0.5} /></>}</CP>;
const C7h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 1.5, 4.2]} /><Luzes sol={[-4, 2, 4]} i={2.4} amb={0.1} /><Estrelas sem="c7h" />
  <TerraGira tex={tex} ang={f * 0.03} />
  {LAT(500).map((i) => { const a = random('ra' + i) * Math.PI * 2 + f * 0.01; const r = lerp(1.02, 1.3 + random('rr' + i) * 0.6, Math.min(1, k * 1.4 * (0.5 + random('rk' + i)))); return <mesh key={i} position={[Math.cos(a) * r, (random('ry' + i) - 0.5) * 0.06 * (2 - k), Math.sin(a) * r]} scale={0.006 + random('rs' + i) * 0.008}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#c8b8a0" emissive="#3a2a1a" /></mesh>; })}
  <Pos bloom={0.8} /></>; }}</CP>; };
const C7i: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[-3.6, 1.2, 4.2]} alvo={[0, 0, 0]} /><Luzes sol={[5, 1, 2]} i={2.8} amb={0.06} /><Estrelas sem="c7i" />
  <TerraGira tex={tex} ang={f * 0.03} />
  <group rotation={[0.03, 0, 0]}><mesh rotation={[Math.PI / 2, 0, f * 0.01]}><ringGeometry args={[1.35, 2.1, 200]} /><meshStandardMaterial color="#d8c8a8" emissive="#3a2a18" transparent opacity={0.75} side={THREE.DoubleSide} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[1.6, 1.68, 200]} /><meshBasicMaterial color="#1a1612" transparent opacity={0.6} side={THREE.DoubleSide} /></mesh></group>
  <Pos bloom={0.9} /></>}</CP>;

// ================= 8. MAS ESPERA… =================
const C8a: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const w = lerp(0.12, 0.003, pr(f, 0, d * 0.7, Easing.out(Easing.cubic))); const ang = LAT(Math.max(1, f)).reduce((s, i) => s + lerp(0.12, 0.003, pr(i, 0, d * 0.7, Easing.out(Easing.cubic))), 0); return <>
  <Cam pos={[0, 0.4, 3.3]} /><Luzes sol={[3, 2, 4]} i={2.6} amb={0.08} /><Estrelas sem="c8a" />
  <TerraGira tex={tex} ang={ang} rastro={w * 0.6} />
  <Pos bloom={0.7} /></>; }}</CP>; };
const C8b: React.FC = () => <CP>{(f) => { const w = Math.max(0.005, 0.2 - f * 0.002); const ang = f * w; return <>
  <Cam pos={[1.4, 1, 2.6]} alvo={[0, 0.2, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.3} /><color attach="background" args={['#08090c']} />
  <group rotation={[Math.PI / 2, 0, ang]}><mesh><cylinderGeometry args={[1, 1, 0.06, 64]} /><meshStandardMaterial color="#a8acb4" metalness={0.9} roughness={0.25} /></mesh>
    {LAT(12).map((i) => { const a = i / 12 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * 0.7, 0.04, Math.sin(a) * 0.7]}><cylinderGeometry args={[0.05, 0.05, 0.02, 16]} /><meshStandardMaterial color="#2a2a2e" /></mesh>; })}</group>
  <mesh position={[0.95, 0.15, 0]}><boxGeometry args={[0.3, 0.5, 0.2]} /><meshStandardMaterial color="#c8261a" /></mesh>
  <Pos bloom={0.4} /></>; }}</CP>;
const C8c: React.FC = () => <CP>{(f) => { const a = Math.sin(f * 0.035) * 0.35; return <>
  <Cam pos={[0, 0.8, 4]} alvo={[0, 0.8, 0]} /><Luzes sol={[2, 4, 3]} i={1.8} amb={0.3} /><color attach="background" args={['#120c08']} />
  <mesh position={[0, 1, -0.3]}><boxGeometry args={[1.2, 3.4, 0.4]} /><meshStandardMaterial color="#4a2a18" roughness={0.6} /></mesh>
  <group position={[0, 2.2, 0]}><Mostrador n={12} h={-f * 0.002} m={-f * 0.02} r={0.45} cor={OURO} fundo="#f2ead8" aro="#8a6a30" /></group>
  <group position={[0, 1.7, 0.1]} rotation={[0, 0, a]}><mesh position={[0, -0.7, 0]}><boxGeometry args={[0.03, 1.4, 0.02]} /><meshStandardMaterial color={OURO} metalness={0.9} /></mesh><mesh position={[0, -1.45, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.18, 0.18, 0.04, 32]} /><meshStandardMaterial color={OURO} metalness={0.9} roughness={0.2} /></mesh></group>
  <Pos bloom={0.5} /></>; }}</CP>;
const C8d: React.FC = () => <CP>{(f, tex) => { const a = f * 0.004; return <>
  <Cam pos={[0, 6, 6]} alvo={[1, 0, 0]} /><Luzes sol={[-5, 3, 4]} i={2.4} amb={0.15} /><Estrelas sem="c8d" />
  <TerraGira tex={tex} ang={f * 0.01} />
  <mesh rotation={[0, -a + 0.15, 0]} scale={[1.18, 1.03, 1.05]}><sphereGeometry args={[1, 64, 32]} /><meshStandardMaterial color="#3a8ad8" transparent opacity={0.35} roughness={0.1} /></mesh>
  <Lua tex={tex} pos={[Math.cos(a) * 3.2, 0, -Math.sin(a) * 3.2]} r={0.27} />
  <Tubo pts={[[1.25, 0, 0.15], [Math.cos(a) * 3.0, 0, -Math.sin(a) * 3.0]]} r={0.01} cor={NEON} o={0.4 + 0.3 * Math.sin(f * 0.2)} />
  <Pos bloom={0.8} /></>; }}</CP>;
const C8e: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 8, d * 0.6, Easing.out(Easing.back(1.4))); return <>
  <Cam pos={[2, 1.6, 3]} alvo={[0, 0.5, 0]} /><Luzes sol={[2, 4, 3]} i={1.8} amb={0.3} /><Ceu cima="#1a2a4a" baixo="#5a8ab8" />
  <Viva n={100} tam={20} h={(x, z) => Math.sin(x * 0.6 - f * 0.05) * 0.25 * Math.exp(-((z) ** 2) / 8) + Math.sin(z + f * 0.04) * 0.03} mat={<meshStandardMaterial color="#1a5a8a" roughness={0.2} metalness={0.4} />} />
  <group position={[0, 0.3, 0.6]} rotation={[0, 0, lerp(-0.2, 0.9, k)]}><mesh position={[0, 0.6, 0]}><capsuleGeometry args={[0.06, 1.2, 8, 16]} /><meshStandardMaterial color="#5aa8e8" transparent opacity={0.85} roughness={0.05} /></mesh>
    <mesh position={[0, 1.3, 0]}><sphereGeometry args={[0.12, 24, 24]} /><meshStandardMaterial color="#c8e8ff" transparent opacity={0.9} /></mesh></group>
  <Pos bloom={0.5} /></>; }}</CP>; };
const C8f: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const r = lerp(2.6, 3.6, pr(f, 0, d)); const a = f * 0.006; return <>
  <Cam pos={[0, 7, 4]} alvo={[0, 0, 0]} /><Luzes sol={[-5, 4, 4]} i={2.4} amb={0.15} /><Estrelas sem="c8f" />
  <TerraGira tex={tex} ang={f * 0.01} />
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.6, 0.008, 8, 200]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.2} /></mesh>
  <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r, 0.012, 8, 200]} /><meshBasicMaterial color={NEON} transparent opacity={0.6} toneMapped={false} /></mesh>
  <Lua tex={tex} pos={[Math.cos(a) * r, 0, -Math.sin(a) * r]} r={0.27} />
  <Pos bloom={0.8} /></>; }}</CP>; };
const C8g: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0.6, 1.2, 3]} alvo={[0.4, 0.4, 0]} /><Luzes sol={[2, 3, 3]} i={2.2} amb={0.25} /><Estrelas sem="c8g" />
  <Dedo f={f} pos={[-0.6, 0, 0.3]} />
  <Lua tex={tex} pos={[1.4 + f * 0.003, 0.9, -1.4]} r={0.32} rot={[0, f * 0.003, 0]} />
  <Pos bloom={0.5} /></>}</CP>;
const C8h: React.FC = () => { const d = useD(); return <CP>{(f, tex) => { const k = pr(f, 0, d, Easing.inOut(Easing.cubic)); return <>
  <Cam pos={[lerp(0.3, 3, k), lerp(0.3, 4, k), lerp(1.6, 9, k)]} alvo={[lerp(0, 1.6, k), 0, 0]} /><Luzes sol={[-5, 2, 5]} i={2.4} amb={0.08} /><Estrelas sem="c8h" />
  <TerraGira tex={tex} ang={f * 0.004} />
  <Lua tex={tex} pos={[4, 0.3, -1.5]} r={0.27} />
  <Pos bloom={0.7} /></>; }}</CP>; };
const C8i: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[5.5, 0.6, 1.4]} alvo={[2, 0, -1]} /><Luzes sol={[-5, 2, 5]} i={2.6} amb={0.06} /><Estrelas sem="c8i" />
  <Lua tex={tex} pos={[4.2 + f * 0.004, 0.2, -0.6]} r={0.3} rot={[0, f * 0.002, 0]} />
  <TerraGira tex={tex} ang={f * 0.003} />
  <Pos bloom={0.6} /></>}</CP>;
const C8j: React.FC = () => <CP>{(f, tex) => <>
  <Cam pos={[0, 1, 6]} alvo={[0, 3, -10]} /><Luzes sol={[4, 5, 2]} i={1.6} amb={0.3} /><Ceu cima="#3a1a2a" baixo="#e89a5a" />
  <mesh geometry={PLANICIE}><meshStandardMaterial color="#4a3a32" roughness={1} /></mesh>
  <Lua tex={tex} pos={[-3, 6 + f * 0.004, -20]} r={4.5} rot={[0, 0.5, 0]} />
  <Nuvem n={120} sem="c8j" origem={new THREE.Vector3(5, 0.5, -10)} t={100 + f} raio={4} cor="#7a5a4a" tam={1.2} o={0.35} dir={new THREE.Vector3(0, 1, 0)} />
  <Pos bloom={0.6} /></>}</CP>;
const C8k: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.85); const n = Math.round(lerp(18, 24, k)); return <>
  <Cam pos={[0, 0, 3.2]} /><Luzes sol={[1, 2, 4]} i={1.6} amb={0.3} /><color attach="background" args={['#04050a']} />
  {LAT(24).map((i) => { const on = i < n; const a = i / 24 * Math.PI * 2; const r = lerp(0.75, 1.05, k); return <mesh key={i} position={[Math.sin(a) * r, Math.cos(a) * r, 0]} rotation={[0, 0, -a]} scale={on ? 1 : 0.4}><boxGeometry args={[0.05, 0.16, 0.04]} /><meshBasicMaterial color={on ? new THREE.Color('#3aff8a').multiplyScalar(1.3) : '#2a2a30'} toneMapped={false} /></mesh>; })}
  <group rotation={[0, 0, -f * 0.01]}><mesh position={[0, 0.3, 0]}><boxGeometry args={[0.04, 0.6, 0.02]} /><meshBasicMaterial color="#3aff8a" /></mesh></group>
  <Pos bloom={0.9} /></>; }}</CP>; };
const C8l: React.FC = () => { const d = useD(); return <CP>{(f) => { const k = pr(f, 0, d * 0.7, Easing.inOut(Easing.cubic)); const P = curva(220, (t) => 0.9 - t * 1.6 + (t > 0.9 ? Math.sin(t * 300) * 0.05 * (t - 0.9) * 10 : 0), -4, 4); return <>
  <Cam pos={[lerp(3.6, 0, k), 0, lerp(1.2, 5.4, k)]} alvo={[lerp(3.6, 0, k), lerp(-0.6, 0, k), 0]} /><ambientLight intensity={0.3} /><color attach="background" args={['#04060c']} />
  <Tubo pts={P} r={0.02} cor="#3aff8a" brilho={1.3} />
  <Brilho pos={[3.6, -0.6, 0.05]} s={0.3 + 0.1 * Math.sin(f * 0.3)} cor="#ff3a2a" o={0.9} />
  <Pos bloom={1} /></>; }}</CP>; };

// ---------- canto: O DIA DURA ----------
const nn = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '');
const WN = W.map((w) => nn(w.w));
const tFrase = (fr: string) => { const p = fr.split(' '); for (let i = 0; i < WN.length; i++) if (p.every((x, j) => WN[i + j] === x)) return Math.round(W[i].t * 30); throw new Error('frase do canto: ' + fr); };
const MARCAS: {t: number; txt: string; h: number}[] = [
  {t: 0, txt: '24 H', h: 24}, {t: tFrase('primeiro o que e real'), txt: '23H59', h: 23.98}, {t: tFrase('o dia cai pra doze'), txt: '12 H', h: 12},
  {t: tFrase('seis horas voce acorda'), txt: '6 H', h: 6}, {t: tFrase('quatro horas duas'), txt: '4 H', h: 4}, {t: tFrase('tres horas treze'), txt: '3 H', h: 3},
  {t: tFrase('duas horas o dia'), txt: '2 H', h: 2}, {t: tFrase('uma hora e vinte e quatro minutos no'), txt: '1H24', h: 1.4},
];
const VOLTA = tFrase('mas espera na vida');
const Canto: React.FC<{k: number}> = () => {
  const f = useCurrentFrame();
  const volta = f >= VOLTA;
  const m = [...MARCAS].reverse().find((x) => f >= x.t)!;
  const ant = MARCAS[Math.max(0, MARCAS.indexOf(m) - 1)];
  const h = volta ? interpolate(f, [VOLTA, VOLTA + 90], [1.4, 24], {...cl, easing: Easing.inOut(Easing.cubic)}) : interpolate(f, [m.t, m.t + 24], [ant.h, m.h], {...cl, easing: Easing.out(Easing.back(1.4))});
  const txt = volta ? (h > 23.9 ? '24 H' : `${Math.floor(h)} H`) : m.txt;
  const pop = interpolate(f - (volta ? VOLTA : m.t), [0, 6, 12], [1.2, 0.96, 1], cl);
  const cor = volta ? '#3aff8a' : h < 4 ? '#ff5a3a' : OURO;
  return <div style={{position: 'absolute', top: 40, left: 46, padding: '10px 20px 14px', borderRadius: 10, background: 'rgba(0,0,0,.55)', border: `3px solid ${cor}`, transform: `scale(${pop})`, transformOrigin: 'left top', fontFamily: FONTE, color: '#fff', boxShadow: `0 0 18px ${cor}66`}}>
    <div style={{fontSize: 22, letterSpacing: 4, opacity: 0.85}}>O DIA DURA</div>
    <div style={{fontSize: 46, letterSpacing: 2, textShadow: `0 0 12px ${cor}`}}>{txt}</div>
    <div style={{width: 220, height: 10, borderRadius: 5, background: '#ffffff22', marginTop: 6}}><div style={{width: `${Math.max(2, h / 24 * 100)}%`, height: '100%', borderRadius: 5, background: cor, boxShadow: `0 0 10px ${cor}`}} /></div>
  </div>;
};
// cartão de capítulo: a Terra passando como um wipe, cada vez girando mais rápido (volta calma no "Mas espera")
const Cartao: React.FC<{k: number}> = ({k}) => { const d = useD(); return <CP>{(f, tex) => { const o = interpolate(f, [0, 6, d - 10, d], [0, 1, 1, 0], cl); const w = k === 8 ? 0.004 : 0.01 * 2 ** (k - 1); return <>
  <Cam pos={[0, 0, 3.6]} /><color attach="background" args={['#010103']} /><ambientLight intensity={0.05} />
  <directionalLight position={[-3, 1, 2]} intensity={3 * o} color={k === 8 ? '#bfffe0' : '#ffe0c0'} />
  <group position={[lerp(-3.6, 3.6, pr(f, 0, d, Easing.inOut(Easing.cubic))), 0, 0]} scale={0.9}><TerraGira tex={tex} ang={f * w} rastro={Math.min(0.3, w * 1.5)} nuvens={false} /></group>
  <Pos bloom={0.7} /></>; }}</CP>; };

// ---------- plano ----------
const CAPS: Cap[] = [
  {canto: '', sat: 1}, {canto: '', sat: 1}, {canto: '', sat: 0.95}, {canto: '', sat: 0.9}, {canto: '', sat: 0.85},
  {canto: '', sat: 0.8}, {canto: '', sat: 0.75}, {canto: '', sat: 0.7}, {canto: '', sat: 1},
];
const PLANO: [string, React.FC][][] = [
  [['cinco de julho', G1], ['a terra teve o dia', G2], ['mais de um milesimo', G3], ['ninguem sentiu nada', G4], ['mas os relogios atomicos', G5], ['agora imagina que', G6], ['hoje voce vai ver', G7], ['e num certo ponto', G8], ['fica ate o fim', G9]],
  [['primeiro o que e real', C1a], ['a terra nao gira como', C1b], ['ela acelera um pouquinho', C1c], ['em dois mil e vinte e dois', C1d], ['e em dois mil e vinte e seis', C1e], ['entao nao a terra', C1f], ['mas agora vamos fazer', C1g], ['daqui pra frente', C1h], ['na vida real ela', C1i]],
  [['o dia cai pra doze', C2a], ['no equador o chao agora', C2b], ['voce sobe na balanca', C2c], ['a forca do giro', C2d], ['mas o ceu sente', C2e], ['o mesmo efeito que faz', C2f], ['os ventos ficam', C2g], ['e la em cima os satelites', C2h], ['agora o dia e outro', C2i], ['as antenas no telhado', C2j]],
  [['seis horas voce acorda', C3a], ['no equador o chao corre a quase', C3b], ['voce agora pesa', C3c], ['e a agua comeca', C3d], ['hoje a terra ja e', C3e], ['e essa barriga cresce', C3f], ['os oceanos escorrem', C3g], ['la o mar sobe', C3h], ['nos polos e nas latitudes', C3i], ['isso e hipotese', C3j], ['o mapa do mundo', C3k]],
  [['quatro horas duas', C4a], ['no equador sao uns dez', C4b], ['voce pesa oitenta e oito', C4c], ['pular fica estranho', C4d], ['os furacoes a essa altura', C4e], ['ninguem sabe exatamente', C4f], ['e o satelite que fica', C4g]],
  [['tres horas treze', C5a], ['voce pesa setenta e oito', C5b], ['e aqui a terra real', C5c], ['existem contas pra', C5d], ['so que a gente tem', C5e], ['o dia dele dura', C5f], ['o universo ja fez', C5g]],
  [['duas horas o dia', C6a], ['no equador o chao corre a uns vinte', C6b], ['e voce pesa metade', C6c], ['voce anda como um astronauta', C6d], ['a agua de um copo', C6e], ['o satelite parado agora', C6f], ['mais de dez vezes', C6g], ['e longe do equador', C6h], ['la voce continua', C6i]],
  [['uma hora e vinte e quatro minutos no', C7a], ['e a mesma velocidade', C7b], ['e ai acontece', C7c], ['voce nao pula', C7d], ['a orbita que antes', C7e], ['tudo que esta solto', C7f], ['e nessa hipotese', C7g], ['poeira e rocha', C7h], ['do espaco ela vira', C7i]],
  [['mas espera na vida', C8a], ['a terra esta freando', C8b], ['uns dois milesimos', C8c], ['e quem puxa o freio', C8d], ['a mare que ela levanta', C8e], ['e em troca a lua', C8f], ['tres virgula oito', C8g], ['agora voce sobe', C8h], ['a lua indo embora', C8i], ['e no passado', C8j], ['o planeta ja foi', C8k], ['aqueles dias recorde', C8l]],
];
const Fim: React.FC = () => <Final />;
const L = criarLongo({W, plano: PLANO, caps: CAPS, audio: 'girando/narracao_cap.mp3', musica: 'girando/musica.mp3', volta: 8, fim: Fim,
  semTexto: true, legenda: 40, cartao: Cartao, canto: Canto,
  hits: [{frase: 'e num certo ponto', vol: 0.3}, {frase: 'mas agora vamos fazer', vol: 0.35}, {frase: 'o dia dele dura', vol: 0.3}, {frase: 'e ai acontece', vol: 0.45}]});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// thumb: "O DIA ENCURTA" — Terra borrada de tanto girar, relógio em espiral, silhueta flutuando no equador
export const ThumbCena: React.FC = () => <CP>{(_f, tex) => <>
  <Cam pos={[0, 0.2, 4.4]} alvo={[0.6, 0.1, 0]} /><Luzes sol={[2, 2, 5]} i={3} amb={0.2} /><Estrelas sem="thG" />
  <group position={[1.3, 0, 0]}><TerraGira tex={tex} ang={-0.2} rastro={0.32} achata={0.1} /></group>
  <group position={[2.62, 0.05, 0.2]} rotation={[0, 0, -Math.PI / 2 + 0.3]}><Boneco s={0.32} cor="#000000" anda={0.6} /></group>
  <Brilho pos={[2.75, 0.1, 0.1]} s={0.9} cor="#7ad8ff" o={0.35} />
  {LAT(40).map((i) => { const a = i * 0.34; const r = 0.3 + i * 0.03; return <mesh key={i} position={[1.3 + Math.cos(a) * r * 1.3, 0.1 + Math.sin(a) * r * 1.3, -1.6]} rotation={[0, 0, a]}><boxGeometry args={[0.04, 0.12, 0.02]} /><meshBasicMaterial color={new THREE.Color(i % 4 ? OURO : '#ff5a3a').multiplyScalar(1.4)} toneMapped={false} /></mesh>; })}
  <Pos bloom={1} /></>}</CP>;
void useMemo; void random;
