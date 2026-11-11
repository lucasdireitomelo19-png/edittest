// Short "O QUE ESCONDEM 4 KM de GELO na ANTÁRTIDA?" (lote 11/11/2026, 2 de 4, aprovado pelo dono). Tudo em Remotion 3D.
// Na tela (aprovado no roteiro): título do 1º segundo, nomes em neon (DENMAN, GAMBURTSEV, VOSTOK), contador de profundidade no canto e a legenda. Sem selos nem thumb.
// O relevo sob o gelo é um modelo estilizado (não é o Bedmap real): cordilheira, vale fundo, cones, lagos e leitos de rio, cobertos por três camadas de gelo que saem uma a uma.
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {Cam, Estrelas, Luzes, Pos, Brilho, pr, cl, THREE} from '../lote/kit3d';
import {Rotulo, R3, v, camLL} from '../lote/pangeia3d';
import {CG, GloboMar, NEON} from './Gelo';
import palavras from './antartida.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const useD = () => useVideoConfig().durationInFrames;

// ---------- relevo sob o gelo ----------
const VOLC: V3[] = Array.from({length: 26}, (_, i) => [-4.1 + random('vx' + i) * 2.3, -3.6 + random('vz' + i) * 3.6, 0.25 + random('vh' + i) * 0.45]);
const RIOS: [number, number][] = [[2.0, 0.3], [2.6, 1.7], [3.2, 3.1], [3.8, 0.9]];
const rioZ = (k: number, x: number) => RIOS[k][0] + 0.22 * Math.sin(x * 1.6 + RIOS[k][1]);
const alt = (x: number, z: number) => {
  let y = 0.12 * Math.sin(x * 1.3 + 0.5) * Math.cos(z * 1.1) + 0.05 * Math.sin(x * 3.1 + z * 2.3);
  const gx = (x - 1.0) / 1.4, gz = (z + 0.8) / 0.5; y += 1.15 * Math.exp(-gx * gx - gz * gz) * (0.55 + 0.45 * Math.abs(Math.sin(x * 7 + z * 3)));
  const dx = (x - 3.2) / 0.24, dz = (z - 1.2) / 1.3; y -= 1.6 * Math.exp(-dx * dx - dz * dz);
  VOLC.forEach(([vx, vz, vh]) => { const r = Math.hypot(x - vx, z - vz); y += vh * Math.max(0, 1 - r / 0.3) - (r < 0.05 ? vh * 0.3 : 0); });
  if (x > -3.8 && x < 2.2) RIOS.forEach((_, k) => { const d = Math.abs(z - rioZ(k, x)); y -= 0.1 * Math.exp(-(d * d) / 0.004); });
  return y;
};
const RELEVO = (() => { const g = new THREE.PlaneGeometry(9, 9, 240, 240); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) p.setY(i, alt(p.getX(i), p.getZ(i)) + (random('rl' + i) - 0.5) * 0.012); g.computeVertexNormals(); return g; })();
const LAGOS = Array.from({length: 110}, (_, i) => { const x = -4 + random('lx' + i) * 8, z = -4 + random('lz' + i) * 8; return {x, z, y: alt(x, z), r: 0.03 + random('lr' + i) * 0.05}; }).filter((l) => l.y < 0.35 && l.y > -0.2);
const VOSTOK: V3 = [-0.6, 0, 0.9];
const ARV = Array.from({length: 420}, (_, i) => { const x = -4.3 + random('ax' + i) * 8.6, z = -4.3 + random('az' + i) * 8.6; return {x, z, y: alt(x, z), s: 0.6 + random('as' + i) * 0.8}; }).filter((a) => a.y < 0.55 && a.y > -0.3);

// cena do relevo: gelo = quantas camadas ainda estão em cima (3 a 0), verde = floresta, noite = noite polar
type TOpt = {gelo?: number; verde?: number; noite?: number; lagos?: number; rios?: number; vulc?: number; f: number; children?: React.ReactNode};
const Terreno: React.FC<TOpt> = ({gelo = 0, verde = 0, noite = 0, lagos = 0, rios = 0, vulc = 0, f, children}) => {
  const rocha = new THREE.Color('#6e6258').lerp(new THREE.Color('#3f6a34'), verde);
  const ceu = new THREE.Color('#0a1a2c').lerp(new THREE.Color('#04060f'), noite);
  return <>
    <color attach="background" args={[ceu.getStyle()]} /><fog attach="fog" args={[ceu.getStyle(), 9, 30]} />
    <Luzes sol={[3, 5, 2]} i={2.2 * (1 - noite * 0.75)} amb={0.45 - noite * 0.2} />
    <mesh geometry={RELEVO}><meshStandardMaterial color={rocha} roughness={1} flatShading /></mesh>
    {[0, 1, 2].map((i) => { const k = Math.min(1, Math.max(0, gelo - i)); if (k <= 0) return null;
      return <group key={i} position={[0, 0.65 + i * 0.55 + (1 - k) * 3.5, 0]}><mesh><boxGeometry args={[9, 0.54, 9]} /><meshStandardMaterial color={['#9fc8ee', '#b8d8f4', '#d4e8fa'][i]} transparent opacity={0.62 * k} roughness={0.3} depthWrite={false} /></mesh>
        <mesh position={[0, -0.27, 0]}><boxGeometry args={[9.02, 0.012, 9.02]} /><meshBasicMaterial color="#3a6a9a" transparent opacity={0.8 * k} /></mesh></group>; })}
    {gelo > 0 && <mesh position={[0, 0.02, 0]}><boxGeometry args={[9, 0.72, 9]} /><meshStandardMaterial color="#8ab8e6" transparent opacity={0.4 * Math.min(1, gelo)} roughness={0.3} depthWrite={false} /></mesh>}
    {lagos > 0 && LAGOS.map((l, i) => <Brilho key={i} pos={[l.x, l.y + 0.03, l.z]} s={l.r * 3.4} cor="#35b6ff" o={pr(lagos * LAGOS.length, i, i + 6)} />)}
    {lagos > 0 && <mesh position={[VOSTOK[0], alt(VOSTOK[0], VOSTOK[2]) + 0.03, VOSTOK[2]]} rotation={[-Math.PI / 2, 0, 0.5]} scale={[1, 0.22, 1]}><circleGeometry args={[0.85, 48]} /><meshStandardMaterial color="#1c8ef0" emissive="#0a5ad0" emissiveIntensity={0.9 * lagos} roughness={0.1} /></mesh>}
    {rios > 0 && RIOS.map((_, k) => Array.from({length: 60}, (_, i) => { const x = -3.8 + i * 0.1; if (i / 60 > rios) return null; const z = rioZ(k, x); return <Brilho key={k + '_' + i} pos={[x, alt(x, z) + 0.03, z]} s={0.11} cor="#9fe4ff" o={0.8} />; }))}
    {vulc > 0 && VOLC.map(([x, z, h], i) => <Brilho key={i} pos={[x, alt(x, z) + 0.06, z]} s={0.3} cor="#ff7a30" o={pr(vulc * VOLC.length, i, i + 2) * (0.55 + 0.2 * Math.sin(f * 0.15 + i))} />)}
    {verde > 0.3 && ARV.map((a, i) => <mesh key={i} position={[a.x, a.y + 0.08 * a.s, a.z]} scale={a.s * Math.min(1, (verde - 0.3) * 2)}><coneGeometry args={[0.05, 0.18, 6]} /><meshStandardMaterial color="#24552a" flatShading /></mesh>)}
    {children}
  </>;
};
const yT = (x: number, z: number, dy = 0.05) => new THREE.Vector3(x, alt(x, z) + dy, z);

// ---------- cenas ----------
// 1 · a Antártida branca vista do espaço (câmera descendo)
const S1: React.FC = () => <CG>{(f) => <>
  <Cam pos={camLL(-62 - f * 0.25, 30 + f * 0.3, 4.6 - f * 0.022)} /><Estrelas sem="a1" />
  <GloboMar n={0} d={0} /><Pos bloom={0.9} /></>}</CG>;
// 2 · teaser: a câmera atravessa o gelo e vê montanhas, cones e lagos lá embaixo
const S2: React.FC = () => <CG>{(f) => { const k = pr(f, 0, 50); return <>
  <Cam pos={[-3.5 + f * 0.03, 3.2 - k * 2.2, 3.6 - f * 0.012]} alvo={[0.5, 0.3, -0.6]} />
  <Terreno f={f} gelo={3 - k * 2.6} lagos={k} vulc={k} /><Pos bloom={0.9} /></>; }}</CG>;
// 3 · o bloco de gelo em corte, com a régua de espessura (câmera lateral)
const Regua: React.FC<{h: number; x?: number}> = ({h, x = -4.7}) => <group position={[x, 0, 4.55]}>
  <mesh position={[0, h / 2 - 0.3, 0]}><boxGeometry args={[0.05, h, 0.05]} /><meshBasicMaterial color="#ffffff" /></mesh>
  {Array.from({length: Math.floor(h / 0.2) + 1}, (_, i) => <mesh key={i} position={[0.1, -0.3 + i * 0.2, 0]}><boxGeometry args={[i % 5 ? 0.14 : 0.3, 0.02, 0.03]} /><meshBasicMaterial color={i % 5 ? '#9fdcff' : '#ffffff'} /></mesh>)}
</group>;
const S3: React.FC = () => <CG>{(f) => <>
  <Cam pos={[-1.5 + f * 0.012, 1.2, 10.5]} alvo={[-1 + f * 0.012, 0.9, 0]} />
  <Terreno f={f} gelo={3}><Regua h={pr(f, 4, 50) * 2.5} /></Terreno><Pos bloom={0.7} /></>}</CG>;
// 4 · num cânion passa de 4.700 m: a câmera desce pela parede do vale fundo, ainda cheio de gelo
const S4: React.FC = () => <CG>{(f) => <>
  <Cam pos={[7.2 - f * 0.008, 3.6 - f * 0.012, 6.4]} alvo={[3.2, -0.4, 1.4]} />
  <Terreno f={f} gelo={3}><Regua h={pr(f, 0, 55) * 4.2} x={3.9} /></Terreno>
  <Brilho pos={[3.2, -1.3, 1.2]} s={1.4} cor="#5ac8ff" o={0.35} /><Pos bloom={0.8} /></>}</CG>;
// 5 · tira a primeira camada: a placa de cima sobe e some (câmera alta)
const S5: React.FC = () => <CG>{(f) => <>
  <Cam pos={[5.5, 4.6, 7.5]} alvo={[0, 0.8, 0]} />
  <Terreno f={f} gelo={3 - pr(f, 2, 32)} /><Pos bloom={0.7} /></>}</CG>;
// 6 · o vale mais fundo em terra firme: mergulho no Glaciar Denman
const S6: React.FC = () => { const cam = (f: number): V3 => [3.25 + Math.sin(f * 0.01) * 0.2, 1.9 - pr(f, 0, 150) * 2.6, 4.2 - f * 0.014]; const alvo: V3 = [3.2, -1.5, 0.9];
  return <CG rot={(f) => <R3 cam={cam(f)} alvo={alvo} p={new THREE.Vector3(3.2, -0.6, 1.2)} txt="DENMAN" o={pr(f, 66, 76)} dy={-260} tam={78} />}>{(f) => <>
    <Cam pos={cam(f)} alvo={alvo} />
    <Terreno f={f} gelo={pr(f, 0, 40) < 1 ? 2 - pr(f, 0, 40) * 2 : 0} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]}><planeGeometry args={[9, 9]} /><meshBasicMaterial color="#39a8ff" transparent opacity={0.12} depthWrite={false} /></mesh>
    <Pos bloom={0.7} /></>}</CG>; };
// 7 · mais uma camada: outra placa sai, vista de lado
const S7: React.FC = () => <CG>{(f) => <>
  <Cam pos={[-6.5, 2.2, 6]} alvo={[0.5, 0.8, -0.5]} />
  <Terreno f={f} gelo={2 - pr(f, 0, 20) * 1.4} /><Pos bloom={0.7} /></>}</CG>;
// 8 · a cordilheira enterrada: sobrevoo dos picos da Gamburtsev, com o resto do gelo sumindo
const S8: React.FC = () => { const cam = (f: number): V3 => [-2.6 + f * 0.022, 1.75, 1.1 - f * 0.004]; const alvo = (f: number): V3 => [0.4 + f * 0.012, 0.7, -0.8];
  return <CG rot={(f) => <Rotulo x={540} y={560} txt="GAMBURTSEV" o={pr(f, 150, 160)} tam={76} />}>{(f) => <>
    <Cam pos={cam(f)} alvo={alvo(f)} />
    <Terreno f={f} gelo={0.6 - pr(f, 0, 60) * 0.6} /><Pos bloom={0.7} /></>}</CG>; };
// 9 · tem lago: pontos azuis acendendo por todo o continente (câmera de cima)
const S9: React.FC = () => <CG>{(f) => <>
  <Cam pos={[0, 9.5 - f * 0.01, 2.2]} alvo={[0, 0, 0]} />
  <Terreno f={f} lagos={pr(f, 0, 70)} noite={0.4} /><Pos bloom={1.1} /></>}</CG>;
// 10 · o Vostok em close (câmera rasante ao longo do lago)
const S10: React.FC = () => { const cam = (f: number): V3 => [-2.4 + f * 0.008, 0.55, 2.1 - f * 0.004]; const alvo: V3 = [-0.4, 0.05, 0.8];
  return <CG rot={(f) => <R3 cam={cam(f)} alvo={alvo} p={yT(-0.6, 0.9, 0.1)} txt="VOSTOK" o={pr(f, 12, 22)} dy={-170} tam={78} />}>{(f) => <>
    <Cam pos={cam(f)} alvo={alvo} />
    <Terreno f={f} lagos={1} /><Pos bloom={1} /></>}</CG>; };
// 11 · tem vulcão: os cones do lado oeste acendendo um a um (câmera passando, sem erupção)
const S11: React.FC = () => <CG>{(f) => <>
  <Cam pos={[-5.6 + f * 0.01, 1.5, 1.4 - f * 0.02]} alvo={[-2.9, 0.2, -1.8]} />
  <Terreno f={f} vulc={pr(f, 0, 85)} /><Pos bloom={1.2} /></>}</CG>;
// 12 · tem rio: os leitos congelados como veias (câmera seguindo um rio)
const S12: React.FC = () => <CG>{(f) => { const x = -3.4 + f * 0.035; return <>
  <Cam pos={[x - 1.4, 1.3, rioZ(1, x) + 1.5]} alvo={[x + 1.2, 0, rioZ(1, x + 1.2)]} />
  <Terreno f={f} rios={pr(f, 0, 90)} /><Pos bloom={1.1} /></>; }}</CG>;
// 13 · há 90 milhões de anos era floresta: o relevo fica verde e as árvores crescem (câmera parada)
const S13: React.FC = () => <CG>{(f) => <>
  <Cam pos={[-3.2, 2.0, 5.2]} alvo={[0.6, 0.4, -0.6]} />
  <Terreno f={f} verde={pr(f, 0, 60)} lagos={0.6} /><Pos bloom={0.6} /></>}</CG>;
// 14 · quatro meses de noite, e mesmo assim verde: noite polar com aurora (câmera girando)
const S14: React.FC = () => <CG>{(f) => <>
  <Cam pos={[Math.sin(0.6 + f * 0.006) * 5.6, 1.4, Math.cos(0.6 + f * 0.006) * 5.6]} alvo={[0, 1.4, 0]} />
  <Terreno f={f} verde={1} noite={pr(f, 0, 30)} lagos={0.6}>
    <Estrelas sem="a14" />
    {Array.from({length: 3}, (_, j) => Array.from({length: 46}, (_, i) => { const a = i / 46 * Math.PI * 1.6 + j * 2.1; const r = 9 + j * 1.5; return <Brilho key={j + '_' + i} pos={[Math.cos(a) * r, 4.2 + j * 0.9 + Math.sin(i * 0.5 + f * 0.05 + j) * 0.5, Math.sin(a) * r]} s={2.4} cor={j === 1 ? '#7affc0' : '#3cff8a'} o={0.3 * pr(f, 10, 40)} />; }))}
  </Terreno><Pos bloom={1.2} /></>}</CG>;
// 15 · quase ninguém viu com os próprios olhos: um satélite passa sobre o continente branco, varrendo com um feixe
const S15: React.FC = () => <CG>{(f) => { const p = v(-78 + f * 0.1, -60 + f * 1.1, 1.35); return <>
  <Cam pos={camLL(-70, 20, 3.6)} /><Estrelas sem="a15" /><Luzes sol={[2, 2, 4]} i={2.2} amb={0.5} />
  <GloboMar n={0} d={0} />
  <group position={V(p)} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize())}>
    <mesh><boxGeometry args={[0.07, 0.07, 0.07]} /><meshStandardMaterial color="#d8d8e0" metalness={0.7} roughness={0.3} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.12, 0, 0]}><boxGeometry args={[0.14, 0.01, 0.06]} /><meshStandardMaterial color="#2a4aa0" emissive="#1a3080" emissiveIntensity={0.5} /></mesh>)}
    <mesh position={[0, -0.18, 0]}><coneGeometry args={[0.09, 0.34, 20, 1, true]} /><meshBasicMaterial color="#5affc0" transparent opacity={0.3} side={THREE.DoubleSide} /></mesh>
  </group>
  <Pos bloom={1} /></>; }}</CG>;
// 16 · feito com radar e satélite: um avião varre o gelo e o mapa vai sendo pintado embaixo
const S16: React.FC = () => <CG>{(f) => { const x = -4.2 + f * 0.1; return <>
  <Cam pos={[x - 1.5, 4.4, 5.6]} alvo={[x + 0.6, 0.4, 0]} />
  <Terreno f={f} gelo={0}>
    <mesh position={[(x + 4.5) / 2 + 0.2, 0.75, 0]}><boxGeometry args={[Math.max(0.01, 4.5 - x), 1.2, 9]} /><meshPhysicalMaterial color="#e6f3ff" transparent opacity={0.9} roughness={0.25} /></mesh>
    <mesh position={[x, 1.6, 0]}><boxGeometry args={[0.03, 2.0, 9]} /><meshBasicMaterial color="#5affc0" transparent opacity={0.45} /></mesh>
    <group position={[x, 2.7, 0.6]}><mesh rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.06, 0.5, 6, 12]} /><meshStandardMaterial color="#e8e8ee" /></mesh>
      <mesh><boxGeometry args={[0.16, 0.02, 0.9]} /><meshStandardMaterial color="#d0d0d8" /></mesh><mesh position={[-0.3, 0.08, 0]}><boxGeometry args={[0.1, 0.16, 0.02]} /><meshStandardMaterial color="#e05a3a" /></mesh></group>
  </Terreno><Pos bloom={1} /></>; }}</CG>;
// 17 · ainda estamos descobrindo: metade do relevo revelada, metade ainda sob o gelo (câmera recuando; fim)
const S17: React.FC = () => <CG>{(f) => <>
  <Cam pos={[-2 - f * 0.01, 3 + f * 0.02, 6 + f * 0.03]} alvo={[0.4, 0.4, 0]} />
  <Terreno f={f} gelo={0} lagos={1} rios={1} vulc={1}>
    <mesh position={[2.6, 0.75, 0]}><boxGeometry args={[3.8, 1.2, 9]} /><meshPhysicalMaterial color="#e6f3ff" transparent opacity={0.92} roughness={0.25} /></mesh>
    {Array.from({length: 12}, (_, i) => <Brilho key={i} pos={[0.75, 0.3 + (i % 4) * 0.35, -4 + i * 0.75]} s={0.5} cor="#5affc0" o={0.25 + 0.2 * Math.sin(f * 0.15 + i)} />)}
  </Terreno><Pos bloom={1} /></>}</CG>;

const PLANO: K.Plano = [
  ['o que tem embaixo', S1], ['montanhas vulcoes lagos', S2], ['o gelo tem em media', S3], ['num canion passa', S4], ['tira a primeira camada', S5], ['aparece o vale', S6],
  ['mais uma camada', S7], ['uma cordilheira do tamanho', S8], ['embaixo do gelo tem lago', S9], ['o maior o vostok', S10], ['tem vulcao', S11], ['tem rio', S12],
  ['e ha noventa milhoes', S13], ['com quatro meses', S14], ['e o mais louco', S15], ['esse mapa foi feito', S16], ['e a gente ainda', S17],
];

// ---------- por cima: título do 1º segundo e contador de profundidade ----------
const Extra: React.FC = () => {
  const f = useCurrentFrame();
  const T = TEMPO.T; const t = (frase: string) => T[PLANO.findIndex((p) => p[0] === frase)];
  const mil = (n: number) => Math.round(n).toLocaleString('pt-BR');
  const a = t('o gelo tem em media'), b = t('num canion passa'), c = t('tira a primeira camada'), d = t('aparece o vale'), e = t('mais uma camada'), g = t('embaixo do gelo tem lago');
  let txt: string | null = null;
  if (f >= a && f < b) txt = '⬇ ' + mil(interpolate(f, [a, a + 50], [0, 1900], cl)) + ' M';
  else if (f >= b && f < c) txt = '⬇ ' + mil(interpolate(f, [b, b + 50], [1900, 4757], cl)) + ' M';
  else if (f >= c && f < d) txt = '⬇ 4.757 M';
  else if (f >= d + 50 && f < e) txt = '−' + mil(interpolate(f, [d + 50, d + 130], [100, 3500], cl)) + ' M';
  else if (f >= e && f < g) txt = '⬇ ' + mil(interpolate(f, [e + 20, e + 130], [0, 3000], cl)) + ' M';
  const o = interpolate(f, [0, 3, 50, 60], [0, 1, 1, 0], cl);
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {o > 0 && <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', opacity: o, fontFamily: FONTE, fontWeight: 900, color: '#fff', textShadow: NEON, transform: `scale(${1 + f * 0.0015})`}}>
      {['O QUE TEM', 'EMBAIXO DA', 'ANTÁRTIDA?'].map((l, j) => <div key={j} style={{fontSize: j === 2 ? 132 : 112, lineHeight: 1.12, letterSpacing: 2}}>{l}</div>)}</div>}
    {txt && <div style={{position: 'absolute', top: 150, right: 60, padding: '10px 26px', borderRadius: 22, background: 'rgba(0,10,30,.55)', border: '3px solid #39d8ff', fontFamily: FONTE, fontWeight: 900, fontSize: 84, color: '#fff', textShadow: NEON, letterSpacing: 2}}>{txt}</div>}
  </AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'antartida/narracao.mp3', 'e a gente ainda', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void Easing;
