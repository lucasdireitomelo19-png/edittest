// Short "UMA ESTRELA MORTA ATINGIU A TERRA. 6 ANOS DEPOIS, OUTRA. ⚡🌍" (aprovado pelo dono em 15/11/2026). Tudo em Remotion 3D, sem bonequinho nem foto real.
// 1998 bateu no lado NOTURNO; 2004 perto do MEIO-DIA (não trocar). Lua cheia ao lado de um ponto roxo mais forte (raios gama, invisível).
// Na tela: legenda + nomes/datas em neon ("SGR 1900+14 · 27/08/1998", "SGR 1806-20 · 27/12/2004"). Sem selos. Nada de explosão perto da Terra; final é só pergunta.
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Lua, Terra, pr, cl, THREE} from '../lote/kit3d';
import {Planeta} from '../lote/planetas3d';
import {LAT, Tubo, TerraN, Calota, Predios, canvasTex} from './Apophis';
import palavras from './magatinge.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ROXO = '#b45aff';
// linhas de campo de dipolo em volta da magnetar
const CAMPO: V3[][] = LAT(10).flatMap((i) => [1.6, 2.4, 3.4].map((L) => LAT(61).map((j) => { const th = 0.12 + j / 60 * (Math.PI - 0.24); const r = L * Math.sin(th) ** 2; const ph = i / 10 * Math.PI * 2; return [r * Math.sin(th) * Math.cos(ph), r * Math.cos(th), r * Math.sin(th) * Math.sin(ph)] as V3; })));
const Magnetar: React.FC<{f: number; s?: number; pos?: V3; racha?: number; campo?: number}> = ({f, s = 1, pos = [0, 0, 0], racha = 0, campo = 1}) => <group position={pos} scale={s}>
  <group rotation={[0.4, f * 0.03, 0.2]}>
    <mesh><sphereGeometry args={[0.55, 64, 64]} /><meshBasicMaterial color={new THREE.Color('#e8e0ff').multiplyScalar(1.6)} toneMapped={false} /></mesh>
    {campo > 0 && CAMPO.map((p, i) => <Tubo key={i} pts={p} r={0.012} cor={i % 3 ? ROXO : '#ffffff'} o={0.55 * campo} brilho={1.6} />)}
    {racha > 0 && LAT(6).map((i) => <Tubo key={'r' + i} pts={LAT(6).map((j) => { const a = i * 1.05 + j * 0.12, b = 0.3 + j * 0.15 + Math.sin(i + j) * 0.1; return [Math.cos(a) * Math.sin(b) * 0.56, Math.cos(b) * 0.56, Math.sin(a) * Math.sin(b) * 0.56] as V3; })} r={0.02} cor="#ffffff" k={racha} brilho={3} />)}
  </group>
  <Brilho pos={[0, 0, 0]} s={3} cor={ROXO} o={0.6} />
</group>;
const calTex = (dia: number, ini: number, dias: number, cor: string) => canvasTex(512, 512, (g) => {
  g.fillStyle = '#f2ede2'; g.fillRect(0, 0, 512, 512); g.fillStyle = cor; g.fillRect(0, 0, 512, 110); g.font = 'bold 34px sans-serif'; g.textAlign = 'center';
  for (let d = 1; d <= dias; d++) { const c = (ini + d - 1) % 7, l = Math.floor((ini + d - 1) / 7); const x = 44 + c * 70, y = 170 + l * 66; g.fillStyle = c === 0 ? '#c8261a' : '#20242c'; g.fillText(String(d), x, y);
    if (d === dia) { g.strokeStyle = '#a020f0'; g.lineWidth = 7; g.beginPath(); g.arc(x, y - 12, 34, 0, 7); g.stroke(); } } });
const CAL98 = calTex(27, 6, 31, '#3a2a6a'); // agosto/1998 começa no sábado
const CAL04 = calTex(27, 3, 31, '#1a3a6a'); // dezembro/2004 começa na quarta
const RX = canvasTex(512, 384, (g) => { g.fillStyle = '#0a0e14'; g.fillRect(0, 0, 512, 384); g.fillStyle = 'rgba(200,230,255,.85)'; g.beginPath(); g.moveTo(180, 70); g.bezierCurveTo(140, 90, 150, 200, 190, 230); g.lineTo(205, 330); g.lineTo(235, 240); g.lineTo(260, 330); g.lineTo(285, 240); g.bezierCurveTo(330, 220, 340, 90, 300, 70); g.bezierCurveTo(270, 55, 250, 85, 240, 80); g.bezierCurveTo(225, 60, 200, 60, 180, 70); g.fill(); });
const GAL = (() => { const n = 3000; const p = new Float32Array(n * 3); const c = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const braco = i % 4; const t = random('gt' + i); const r = 0.3 + t * 5; const a = braco * Math.PI / 2 + t * 4.2 + (random('ga' + i) - 0.5) * 0.5; p.set([Math.cos(a) * r, (random('gy' + i) - 0.5) * 0.15, Math.sin(a) * r], i * 3); const k = 1 - t; c.set([0.7 + k * 0.3, 0.75 + k * 0.2, 1], i * 3); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); g.setAttribute('color', new THREE.BufferAttribute(c, 3)); return g; })();
export const Galaxia: React.FC<{f: number}> = ({f}) => <group rotation={[0, f * 0.002, 0]}>
  <points geometry={GAL}><pointsMaterial size={0.06} vertexColors transparent opacity={0.85} depthWrite={false} /></points>
  <Brilho pos={[0, 0, 0]} s={3} cor="#ffe8c0" o={0.8} />
</group>;
const SOL_GAL: V3 = [2.6, 0, 1.2];
const Ponto: React.FC<{pos: V3; k: number; cor?: string}> = ({pos, k, cor = ROXO}) => k <= 0 ? null : <><Brilho pos={pos} s={0.4 + k * 1.2} cor={cor} o={k} /><Brilho pos={pos} s={0.25} cor="#ffffff" o={k} /></>;

// ---------- cenas ----------
const M1: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const t = pr(f, 0, d, Easing.in(Easing.quad)); const z = lerp(-30, -1.4, t); return <>
  <Cam pos={[0.4, 0.3, z + 3.2]} alvo={[0, 0, z - 4]} /><Luzes sol={[2, 1, -8]} i={1.6} amb={0.06} /><Estrelas sem="m1" />
  <TerraN tex={tex} luz={0.6} />
  <Brilho pos={[0, 0, z]} s={1.2} cor={ROXO} o={1} /><Brilho pos={[0, 0, z]} s={0.4} cor="#ffffff" o={1} />
  <Tubo pts={[[0, 0, z + 0.2], [0, 0, z + 8]]} r={0.05} cor={ROXO} o={0.5} brilho={2} />
  <Pos bloom={1.2} /></>; }}</C3>; };
const M2: React.FC = () => <C3>{(f, tex) => { const a = pr(f, 0, 40), b = pr(f, 25, 60); return <>
  <Cam pos={[0, 0.3, 5.6]} /><Luzes sol={[4, 1, 2]} i={2.2} amb={0.05} /><Estrelas sem="m2" />
  <Terra tex={tex} rot={[0.3, f * 0.004, 0]} />
  <Tubo pts={[[-6, 3, -4], [-1.1, 0.4, -0.2]]} r={0.04} cor={ROXO} k={a} o={0.8} brilho={2} />
  <Tubo pts={[[6, -3, 2], [1.05, -0.3, 0.3]]} r={0.04} cor="#ffffff" k={b} o={0.8} brilho={2} />
  <Pos bloom={1} /></>; }}</C3>;
const M3: React.FC = () => <C3>{(f) => { const a = f * 0.01; return <>
  <Cam pos={[Math.sin(a) * 7, 1.5, Math.cos(a) * 7]} /><Estrelas sem="m3" />
  <Magnetar f={f} />
  <Pos bloom={1.2} /></>; }}</C3>;
const M4: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.0, 9]} alvo={[0, 0.2, 0]} /><Luzes sol={[2, 4, 3]} i={1.4} amb={0.2} /><Estrelas sem="m4" />
  <Magnetar f={f} pos={[0, 1.6, -0.5]} s={0.9} campo={0.4} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}><circleGeometry args={[0.5, 48]} /><meshStandardMaterial color="#14161c" /></mesh>
  <group position={[0, -1.2, 0]} scale={0.1}><Predios n={60} sem="m4" z={0} larg={9} alt={2} janelas={0.8} /></group>
  <Tubo pts={[[-0.5, -1.55, 0.6], [0.5, -1.55, 0.6]]} r={0.012} cor="#ffd23f" />
  <Tubo pts={[[-0.5, 1.6 - 0.5, 0.6], [0.5, 1.6 - 0.5, 0.6]]} r={0.012} cor="#ffd23f" />
  <Pos bloom={1} /></>}</C3>;
const M5: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 4, d * 0.6); const t = Math.max(0, f - d * 0.5); return <>
  <Cam pos={[0.5, 0.5, 3.6]} alvo={[0, 0.1, 0]} tremor={k * 0.02} /><Estrelas sem="m5" />
  <Magnetar f={f} racha={k} campo={0.6} />
  {t > 0 && <Nuvem n={400} sem="m5" origem={new THREE.Vector3(0.2, 0.5, 0.2)} t={t} raio={2.5} cor="#e8d0ff" tam={0.04} o={0.8} add dir={new THREE.Vector3(0.4, 1, 0.3)} />}
  <Pos bloom={0.9} /></>; }}</C3>; };
const Calendario: React.FC<{tex: THREE.Texture; f: number}> = ({tex, f}) => <>
  <Cam pos={[0.4, 0.2, 3.4 - f * 0.005]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 3, 4]} i={2} amb={0.5} /><color attach="background" args={['#06040c']} />
  <mesh position={[0, -0.05, -0.05]}><boxGeometry args={[2.1, 2.3, 0.1]} /><meshStandardMaterial color="#2a2030" /></mesh>
  <mesh position={[0, 0, 0.01]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={tex} roughness={0.8} /></mesh>
  <pointLight position={[0.6, 0.6, 0.8]} intensity={1.2 + Math.sin(f * 0.3) * 0.5} color={ROXO} distance={2.5} />
  <Pos bloom={0.5} /></>;
const M6: React.FC = () => <C3>{(f) => <Calendario tex={CAL98} f={f} />}</C3>;
const M7: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 6, 16, Easing.out(Easing.cubic)); return <>
  <Cam pos={[0, 1.5, 9]} alvo={[-1.2, 0.3, -1.5]} /><Estrelas sem="m7" n={3000} />
  <Magnetar f={f} pos={[-2.5, 0.5, -3]} s={0.6} campo={0.5} />
  <Brilho pos={[-2.5, 0.5, -3]} s={8 * k * (1 - pr(f, 20, d))} cor="#ffffff" o={0.9} />
  {LAT(3).map((i) => { const r = Math.max(0, f - 10 - i * 5) * 0.12; return <mesh key={i} position={[-2.5, 0.5, -3]} rotation={[0, Math.PI / 2, 0]}><ringGeometry args={[r, r + 0.06, 64]} /><meshBasicMaterial color={ROXO} transparent opacity={Math.max(0, 0.7 - r * 0.05)} side={THREE.DoubleSide} toneMapped={false} /></mesh>; })}
  <Pos bloom={1.4} /></>; }}</C3>; };
// 1998: lado NOTURNO
const M8: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 14, d - 6); return <>
  <Cam pos={[0, 0.4, 3.4]} /><Luzes sol={[-5, 0.5, -4]} i={1.2} amb={0.03} /><Estrelas sem="m8" />
  <TerraN tex={tex} giro={-1.4} />
  <Tubo pts={[[5, 2, 3], [0.6, 0.25, 0.8]]} r={0.04} cor={ROXO} k={pr(f, 0, 14)} brilho={2} />
  <mesh scale={1.08}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#c8a0ff" transparent opacity={0.25 * k} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} /></mesh>
  <Pos bloom={1.1} /></>; }}</C3>; };
const M9: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = interpolate(f, [0, 20, d - 20, d], [0, 1, 1, 0.6], cl); return <>
  <Cam pos={[0, 0.25, 1.75]} alvo={[0, 0.9, -1]} /><Luzes sol={[-5, -1, -4]} i={0.6} amb={0.03} /><Estrelas sem="m9" />
  <group position={[0, -0.2, 0]} rotation={[0.6, f * 0.0008, 0]}><TerraN tex={tex} /></group>
  <mesh position={[0, -0.2, 0]} scale={1.04}><sphereGeometry args={[1, 96, 96]} /><meshBasicMaterial color="#9ac8ff" transparent opacity={0.35 * k} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} /></mesh>
  <mesh position={[0, -0.2, 0]} scale={1.025}><sphereGeometry args={[1, 96, 96]} /><meshBasicMaterial color="#e8f0ff" transparent opacity={0.12 * k} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
  <Pos bloom={1} /></>; }}</C3>; };
const M10: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0.2, 4 - f * 0.004]} /><Luzes sol={[2, 2, 4]} i={2} amb={0.3} /><color attach="background" args={['#04060a']} />
  <mesh position={[-0.2, 0.3, 0]} rotation={[0, 0.2, -0.05]}><planeGeometry args={[1.8, 1.35]} /><meshBasicMaterial map={RX} toneMapped={false} /></mesh>
  <pointLight position={[-0.2, 0.3, 1]} intensity={1.5} color="#9ad0ff" distance={3} />
  <Terra tex={tex} r={0.12} pos={[0.85, -0.85, 0.2]} rot={[0.3, f * 0.01, 0]} />
  <Pos bloom={0.6} /></>}</C3>;
const M11: React.FC = () => <C3>{(f) => <Calendario tex={CAL04} f={f} />}</C3>;
const M12: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, d * 0.35, d * 0.55); return <>
  <Cam pos={[0, 6, 6]} alvo={[0, 0, 0]} /><Estrelas sem="m12" />
  <Galaxia f={f} />
  <Brilho pos={SOL_GAL} s={0.3} cor="#ffe070" o={0.9} />
  <Ponto pos={[-3.2, 0, -1.6]} k={k * (0.8 + 0.2 * Math.sin(f * 0.4))} />
  <Pos bloom={1.2} /></>; }}</C3>; };
const M13: React.FC = () => { const d = useD(); return <C3>{(f) => { const fl = pr(f, d * 0.7, d * 0.74) - pr(f, d * 0.76, d * 0.85); return <>
  <Cam pos={[4.4, 0.8, 4.4]} alvo={[-0.4, 0.4, 0]} /><Estrelas sem="m13" />
  <Planeta t="sol" r={0.8} giro={f * 0.4} brilho />
  {LAT(5).map((i) => <group key={i} rotation={[0, f * 0.4 - i * 0.08, 0]}><mesh scale={0.81}><sphereGeometry args={[1, 48, 48]} /><meshBasicMaterial color="#ffc060" transparent opacity={0.12} depthWrite={false} /></mesh></group>)}
  <Brilho pos={[0, 0, 0]} s={3.6} cor="#ffcf70" o={0.6} />
  <Magnetar f={f} pos={[-1.6, 1.4, -2]} s={0.35} campo={0.4} />
  <Brilho pos={[-1.6, 1.4, -2]} s={12 * fl} cor="#ffffff" o={fl} />
  <Pos bloom={1.3} /></>; }}</C3>; };
const M14: React.FC = () => <C3>{(f, tex) => { const p = 0.85 + 0.15 * Math.sin(f * 0.2); return <>
  <Cam pos={[0, 0, 4.4]} /><Luzes sol={[0, 0, 5]} i={0.5} amb={0.03} /><Estrelas sem="m14" n={3000} />
  <Lua tex={tex} pos={[-0.35, 0.75, 0]} r={0.45} emissivo={0} />
  <pointLight position={[-0.35, 0.75, 3]} intensity={3} color="#ffffff" distance={6} />
  <Brilho pos={[0.35, -0.6, 0]} s={1.6 * p} cor={ROXO} o={1} /><Brilho pos={[0.35, -0.6, 0]} s={0.45} cor="#ffffff" o={1} />
  <mesh position={[0, 0, -1]}><planeGeometry args={[10, 10]} /><meshBasicMaterial color="#2a0a4a" transparent opacity={0.35} /></mesh>
  <Pos bloom={1.2} /></>; }}</C3>;
// 2004: perto do MEIO-DIA (lado iluminado)
const M15: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = interpolate(f, [0, 12, d - 10, d], [0, 1, 1, 0.5], cl); return <>
  <Cam pos={[0, 0.4, 3.4]} /><Luzes sol={[0.5, 0.6, 5]} i={2.8} amb={0.08} /><Estrelas sem="m15" />
  <Terra tex={tex} rot={[0.2, f * 0.003, 0]} />
  <Tubo pts={[[-4, 3, 4], [-0.3, 0.3, 1.05]]} r={0.04} cor="#ffffff" k={pr(f, 0, 12)} brilho={2} />
  <mesh scale={1.09}><sphereGeometry args={[1, 64, 64]} /><meshBasicMaterial color="#b88aff" transparent opacity={0.28 * k} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} /></mesh>
  <Calota la={10} lo={-80} ang={0.6} cor="#d0b0ff" o={0.25 * k} r={1.03} add />
  <Pos bloom={1} /></>; }}</C3>; };
const TRES: V3[] = [[-1.8, 0, 2.6], [3.6, 0, -0.8], [-3.2, 0, -1.6]];
const M16: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[0, 8 + f * 0.01, 5]} alvo={[0, 0, 0]} /><Estrelas sem="m16" />
  <Galaxia f={f} /><Brilho pos={SOL_GAL} s={0.3} cor="#ffe070" o={0.9} />
  {TRES.map((p, i) => <Ponto key={i} pos={p} k={pr(f, i * d / 3.4, i * d / 3.4 + 8, Easing.out(Easing.back(2)))} cor={i === 0 ? '#ff7ad8' : ROXO} />)}
  <Pos bloom={1.2} /></>}</C3>; };
const M17: React.FC = () => <C3>{(f) => { const i = Math.floor(f / 9); return <>
  <Cam pos={[0, 11, 9 + f * 0.01]} alvo={[0, 0, 0]} /><Estrelas sem="m17" />
  <Galaxia f={f} /><Brilho pos={SOL_GAL} s={0.3} cor="#ffe070" o={0.9} />
  <Ponto pos={[Math.cos(i * 2.3) * (1 + (i % 4)), 0, Math.sin(i * 2.3) * (1 + (i % 4))]} k={0.3 + 0.3 * Math.sin(f * 0.7)} cor="#ffffff" />
  <Pos bloom={1.1} /></>; }}</C3>;
const M18: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d, Easing.inOut(Easing.cubic)); return <>
  <Cam pos={[0, lerp(1, 4, k), lerp(5, 16, k)]} alvo={[0, 0, 0]} /><Luzes sol={[0, 0, 0]} i={0.6} amb={0.2} /><Estrelas sem="m18" />
  <Planeta t="sol" r={0.5} brilho /><Brilho pos={[0, 0, 0]} s={2.6} cor="#ffcf70" o={0.7} />
  <Terra tex={tex} r={0.12} pos={[1.6, 0, 0.6]} rot={[0.3, f * 0.01, 0]} />
  <Tubo pts={LAT(121).map((i) => { const t = i / 120 * Math.PI * 2; return [Math.cos(t) * 1.7, 0, Math.sin(t) * 1.7] as V3; })} r={0.01} cor="#ffffff" o={0.3} brilho={1} />
  <Magnetar f={f} pos={[-4, 1, -3]} s={0.5} campo={0.8} />
  <Pos bloom={1.1} /></>; }}</C3>; };

const PLANO: K.Plano = [
  ['uma estrela morta', M1], ['e seis anos depois', M2], ['elas se chamam', M3], ['bolas de uns vinte', M4], ['as vezes a crosta', M5],
  ['vinte e sete de agosto', M6], ['uma delas explodiu', M7], ['o clarao bateu', M8], ['e por uns cinco', M9], ['aqui embaixo a dose', M10],
  ['vinte e sete de dezembro', M11], ['outra magnetar do outro', M12], ['em dois decimos', M13], ['por um instante', M14], ['bateu perto do meio', M15],
  ['em uns cinquenta', M16], ['a proxima pode', M17], ['e se uma dessas', M18],
];
const NOMES: [string, string, string][] = [['vinte e sete de agosto', 'aqui embaixo a dose', 'SGR 1900+14 · 27/08/1998'], ['vinte e sete de dezembro', 'em uns cinquenta', 'SGR 1806-20 · 27/12/2004']];
const Extra: React.FC = () => {
  const f = useCurrentFrame(); const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const n = NOMES.find(([a, b]) => f >= at(a) && f < at(b));
  if (!n) return null;
  const ini = at(n[0]); const s = interpolate(f - ini, [0, 6, 12], [0.6, 1.08, 1], {...cl, easing: Easing.out(Easing.cubic)});
  return <AbsoluteFill><style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <div style={{position: 'absolute', top: 190, width: '100%', textAlign: 'center', transform: `scale(${s})`, fontFamily: FONTE, fontSize: 66, color: '#fff', letterSpacing: 2,
      textShadow: `0 0 12px ${ROXO}, 0 0 30px ${ROXO}, 0 0 60px #7a2aff, 0 6px 14px rgba(0,0,0,.8)`}}>{n[2]}</div></AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'magatinge/narracao.mp3', 'e se uma dessas', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
