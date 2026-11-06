// Short "ATAQUE ALIENÍGENA: a Terra teria só 55 SEGUNDOS". Roteiro short_ataque_alien.md (v1), aprovado pelo dono em 06/11. TODO em Remotion 3D.
// Voz Brian. Não é POV. "E SE" fixo no canto do começo ao fim; "NENHUMA EVIDÊNCIA" no fim. Nunca insinuar que o alerta era real.
// Cogumelos e caravela estilizados, sem destruição e sem pessoas. Sem Floresta Negra, BLC1, Área 51.
import React from 'react';
import {AbsoluteFill, Freeze, interpolate, random, useCurrentFrame} from 'remotion';
import {Palavra, FONTE, OURO, VERMELHO, CIANO, VERDE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Terra, Luzes, Pos, Brilho, geoPedra, pr, cl, THREE} from '../lote/kit3d';
import palavras from './alien.palavras.json';

const W = palavras as Palavra[];
const ROSA = '#ff6fae';
const Grande: React.FC<{t: string; y: number; cor?: string; s?: number; o?: number}> = ({t, y, cor = '#fff', s = 110, o = 1}) => (
  <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: s, color: cor, opacity: o, WebkitTextStroke: '7px #000', paintOrder: 'stroke fill', textShadow: '0 8px 30px rgba(0,0,0,.8)', padding: '0 40px', boxSizing: 'border-box'}}>{t}</div>
);
const metal = {color: '#c8ccd4', metalness: 0.85, roughness: 0.25};
// celular 3D com a tela vermelha piscando
const Celular: React.FC<{f: number; pos?: [number, number, number]; rot?: [number, number, number]; s?: number; fase?: number}> = ({f, pos = [0, 0, 0], rot = [-Math.PI / 2, 0, 0], s = 1, fase = 0}) => {
  const on = Math.floor((f + fase) / 6) % 2 === 0;
  return <group position={pos} rotation={rot} scale={s}>
    <mesh><boxGeometry args={[0.7, 1.4, 0.07]} /><meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} /></mesh>
    <mesh position={[0, 0, 0.036]}><planeGeometry args={[0.64, 1.3]} /><meshStandardMaterial color={on ? '#ff1a1a' : '#5a0000'} emissive={on ? '#ff1a1a' : '#3a0000'} emissiveIntensity={on ? 2 : 0.6} /></mesh>
  </group>;
};
const Cogumelo: React.FC<{pos: [number, number, number]; s?: number; cor?: string}> = ({pos, s = 1, cor = '#ffb070'}) => (
  <group position={pos} scale={s}>
    <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.07, 0.12, 0.7, 12]} /><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={0.6} /></mesh>
    <mesh position={[0, 0.78, 0]} scale={[1, 0.6, 1]}><sphereGeometry args={[0.3, 20, 16]} /><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={0.8} /></mesh>
  </group>
);

// 1 · o celular tocando sobre a mesa, à noite
const S1: React.FC = () => <AbsoluteFill><C3 t="ALERTA DE ATAQUE ALIENÍGENA" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 1.5, 1.6]} alvo={[0, 0, 0]} tremor={0.01} /><ambientLight intensity={0.1} /><directionalLight position={[1, 3, 1]} intensity={0.3} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}><planeGeometry args={[6, 6]} /><meshStandardMaterial color="#3a2a1e" roughness={0.6} /></mesh>
  <Celular f={f} rot={[-Math.PI / 2, 0, 0.3 + Math.sin(f * 0.9) * 0.03]} />
  <pointLight position={[0, 0.5, 0]} color="#ff2020" intensity={Math.floor(f / 6) % 2 === 0 ? 4 : 1} distance={3} />
  <Pos bloom={1.4} /></>}</C3></AbsoluteFill>;
// 2 · junho de 2026: uma parede de celulares acendendo em vermelho
const S2: React.FC = () => <AbsoluteFill><C3 t="20/06/2026" sub="ALERTAS FALSOS DA DEFESA CIVIL" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 0, interpolate(f, [0, 110], [3.5, 6])]} /><ambientLight intensity={0.15} />
  {Array.from({length: 48}, (_, i) => { const x = (i % 8) - 3.5, y = Math.floor(i / 8) - 2.5; return f > i * 1.5 ? <Celular key={i} f={f} fase={i * 3} pos={[x * 0.85, y * 1.5, -random('cz' + i) * 2]} rot={[0, (random('cr' + i) - 0.5) * 0.5, 0]} s={0.7} /> : null; })}
  <Pos bloom={1.3} /></>}</C3></AbsoluteFill>;
// 3 · ~30 milhões: ondas de alerta saindo de cidades num mapa 3D
const S3: React.FC = () => <AbsoluteFill><C3 t="~30 MILHÕES DE PESSOAS" sub="ESTIMATIVA DA DEFESA CIVIL" etq="ANIMAÇÃO 3D · MAPA ILUSTRATIVO">{(f) => <>
  <Cam pos={[Math.sin(f / 50) * 1.5, 3.2, 2.4]} alvo={[0, 0, 0]} /><Luzes sol={[2, 4, 2]} amb={0.3} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.2, 9]} /><meshStandardMaterial color="#2a6a3a" roughness={1} flatShading /></mesh>
  {Array.from({length: 14}, (_, i) => { const x = (random('mx' + i) - 0.5) * 3, z = (random('mz' + i) - 0.5) * 3; const t = ((f * 0.02 + random('mt' + i)) % 1);
    return <group key={i} position={[x, 0.02, z]}><mesh><cylinderGeometry args={[0.04, 0.04, 0.12, 12]} /><meshStandardMaterial color={VERMELHO} emissive={VERMELHO} emissiveIntensity={1.5} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={0.1 + t * 0.9}><ringGeometry args={[0.9, 1, 48]} /><meshBasicMaterial color="#ff4040" transparent opacity={1 - t} side={THREE.DoubleSide} /></mesh></group>; })}
  <Pos bloom={1.2} /></>}</C3></AbsoluteFill>;
// 4 · Belo Horizonte: a cidade à noite com a mensagem falsa, e era um hacker
const S4: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="BELO HORIZONTE" etq="ANIMAÇÃO 3D">{(fr) => <>
    <Cam pos={[0, 0.8, 4]} alvo={[0, 0.8, 0]} /><ambientLight intensity={0.2} /><Estrelas sem="a4" />
    {Array.from({length: 40}, (_, i) => { const h = 0.3 + random('bh' + i) * 1.6; const x = (i % 10) * 0.55 - 2.5, z = -Math.floor(i / 10) * 0.6;
      return <mesh key={i} position={[x, h / 2 - 0.5, z]}><boxGeometry args={[0.45, h, 0.45]} /><meshStandardMaterial color="#14161e" emissive={random('bw' + i) > 0.5 ? '#ffd890' : '#000'} emissiveIntensity={0.15} /></mesh>; })}
    {Array.from({length: 30}, (_, i) => <Brilho key={i} pos={[(random('lx' + i) - 0.5) * 5, -0.3 + random('ly' + i) * 1.6, 0.4]} s={0.06} cor={Math.floor((fr + i * 5) / 6) % 2 ? '#ff2020' : '#400000'} />)}
    <Pos bloom={1.1} /></>}</C3>
    <Grande t="“ATAQUE ALIENÍGENA”" y={1120} s={80} cor={VERMELHO} />
    <Grande t="ERA HACKER" y={1260} s={110} cor={VERDE} o={pr(f, 80, 88)} />
  </AbsoluteFill>;
};
// 5 · mas e se fosse de verdade? céu estrelado com uma interrogação de estrelas
const S5: React.FC = () => <AbsoluteFill><C3 t="E SE FOSSE DE VERDADE?" etq="ANIMAÇÃO 3D">{(f) => {
  const q = Array.from({length: 40}, (_, i) => { const t = i / 39; if (t < 0.75) { const a = Math.PI * (1.1 - t * 2.2); return [Math.cos(a) * 0.8, 1.2 + Math.sin(a) * 0.8 - (t > 0.55 ? (t - 0.55) * 3 : 0)]; } return [0, 0.0 - (t - 0.75) * 0.0]; });
  return <><Cam pos={[0, interpolate(f, [0, 40], [-0.8, 0.4]), 4]} alvo={[0, 0.8, 0]} /><ambientLight intensity={0.2} /><Estrelas sem="a5" n={2500} />
    {q.slice(0, 36).map(([x, y], i) => <Brilho key={i} pos={[x, y, 0]} s={0.12} cor="#e8f0ff" o={pr(f, i * 0.6, i * 0.6 + 4)} />)}
    <Brilho pos={[0, -0.25, 0]} s={0.25} cor="#e8f0ff" o={pr(f, 22, 28)} />
    <Pos bloom={1.4} /></>;
}}</C3></AbsoluteFill>;
// 6 · Proxima Centauri a ~4,2 anos-luz, com o Sol aqui perto
const S6: React.FC = () => <AbsoluteFill><C3 t="PROXIMA CENTAURI" sub="~4,2 ANOS-LUZ" etq="ANIMAÇÃO 3D · FORA DE ESCALA">{(f) => <>
  <Cam pos={[interpolate(f, [0, 80], [-1.5, 0]), 0.5, 3]} alvo={[0, 0, -6]} /><ambientLight intensity={0.3} /><Estrelas sem="a6" />
  <mesh position={[-1.2, -0.6, 0]}><sphereGeometry args={[0.35, 32, 32]} /><meshBasicMaterial color="#ffd860" /></mesh><Brilho pos={[-1.2, -0.6, 0]} s={1.6} cor="#ffd860" />
  <mesh position={[1.5, 0.8, -12]}><sphereGeometry args={[0.25, 32, 32]} /><meshBasicMaterial color="#ff5a3a" /></mesh><Brilho pos={[1.5, 0.8, -12]} s={1.4} cor="#ff4a2a" />
  {Array.from({length: 40}, (_, i) => <Brilho key={i} pos={[-1.2 + 2.7 * i / 40, -0.6 + 1.4 * i / 40, -12 * i / 40]} s={0.04} cor={CIANO} o={0.6} />)}
  <Pos bloom={1.2} /></>}</C3></AbsoluteFill>;
// 7 · a 10% da luz, uma nave levaria ~42 anos: nave minúscula num trilho
const S7: React.FC = () => {
  const f = useCurrentFrame();
  const anos = Math.round(interpolate(f, [6, 120], [0, 42], cl));
  return <AbsoluteFill><C3 t="A 10% DA VELOCIDADE DA LUZ" etq="ANIMAÇÃO 3D · CÁLCULO">{(fr) => {
    const z = interpolate(fr, [0, 130], [0, -8]);
    return <><Cam pos={[0.5, 0.4, z + 1.6]} alvo={[0, 0, z]} /><ambientLight intensity={0.4} /><Estrelas sem="a7" />
      <group position={[0, 0, z]}><mesh rotation={[-Math.PI / 2, 0, 0]}><coneGeometry args={[0.06, 0.3, 12]} /><meshStandardMaterial {...metal} /></mesh><Brilho pos={[0, 0, 0.2]} s={0.15} cor={CIANO} /></group>
      {Array.from({length: 60}, (_, i) => <mesh key={i} position={[0, -0.1, -i * 0.3]}><boxGeometry args={[0.02, 0.005, 0.15]} /><meshBasicMaterial color="#3a5a9a" /></mesh>)}
      <Pos bloom={1} /></>;
  }}</C3><Grande t={`~${anos} ANOS`} y={1150} s={150} cor={OURO} /><Grande t="(CÁLCULO)" y={1320} s={44} /></AbsoluteFill>;
};
// 8 · ninguém precisaria mandar uma nave: a nave some, fica o vazio
const S8: React.FC = () => <AbsoluteFill><C3 t="NINGUÉM PRECISARIA DE NAVE" etq="ANIMAÇÃO 3D">{(f) => {
  const k = pr(f, 10, 50);
  return <><Cam pos={[0, 0.3, 3]} /><Luzes amb={0.4} /><Estrelas sem="a8" />
    <group rotation={[0.3, f * 0.02, 0]} scale={1 - k}>
      <mesh scale={[1, 0.25, 1]}><sphereGeometry args={[0.8, 48, 24]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh position={[0, 0.18, 0]} scale={[1, 0.6, 1]}><sphereGeometry args={[0.35, 32, 16]} /><meshStandardMaterial color="#7af0ff" emissive="#7af0ff" emissiveIntensity={0.6} transparent opacity={0.7} /></mesh>
    </group>
    <Pos bloom={0.9} /></>;
}}</C3></AbsoluteFill>;
// 9 · bastaria um objeto pesado e muito rápido: bloco metálico lançado (câmera lateral)
const S9: React.FC = () => <AbsoluteFill><C3 t="UM OBJETO PESADO" sub="E MUITO, MUITO RÁPIDO" etq="ANIMAÇÃO 3D">{(f) => {
  const x = interpolate(f, [0, 30, 70], [-0.2, 0, 7], {...cl, easing: (t) => t * t});
  return <><Cam pos={[0, 0.2, 3.2]} alvo={[0.4, 0, 0]} /><Luzes sol={[1, 3, 3]} amb={0.3} /><Estrelas sem="a9" />
    <mesh position={[x, 0, 0]} rotation={[0.3, f * 0.02, 0.2]}><boxGeometry args={[0.6, 0.6, 0.6]} /><meshStandardMaterial {...metal} /></mesh>
    {Array.from({length: 30}, (_, i) => <mesh key={i} position={[x - 0.5 - i * 0.12, (random('tr' + i) - 0.5) * 0.5, (random('ts' + i) - 0.5) * 0.5]}><boxGeometry args={[0.3 * pr(f, 30, 40), 0.006, 0.006]} /><meshBasicMaterial color="#cfe0ff" transparent opacity={0.6} /></mesh>)}
    <Pos bloom={0.9} /></>;
}}</C3></AbsoluteFill>;
// 10 · uma tonelada a metade da velocidade da luz: velocímetro "0,5 c" ao lado do bloco
const S10: React.FC = () => <AbsoluteFill><C3 t="1 TONELADA A 50% DA LUZ" etq="ANIMAÇÃO 3D · CÁLCULO">{(f) => {
  const a = interpolate(f, [4, 40], [-2.2, 0], {...cl, easing: (t) => 1 - (1 - t) ** 3});
  return <><Cam pos={[0, 0, 3.4]} /><Luzes amb={0.4} /><Estrelas sem="a10" />
    <mesh position={[0, -0.2, 0]}><torusGeometry args={[1, 0.05, 12, 96, Math.PI]} /><meshStandardMaterial color="#3a3f4a" /></mesh>
    <mesh position={[0, -0.2, 0]}><torusGeometry args={[1, 0.06, 12, 96, Math.PI * (a + 2.2) / 4.4]} /><meshStandardMaterial color={VERMELHO} emissive={VERMELHO} emissiveIntensity={1} /></mesh>
    <mesh position={[0, -0.2, 0.05]} rotation={[0, 0, a / 2.2 * Math.PI / 2 * -1 + Math.PI / 2 - Math.PI / 2]}><boxGeometry args={[0.04, 0.9, 0.04]} /><meshStandardMaterial color="#fff" /></mesh>
    <mesh position={[0, -0.9, 0]} rotation={[0.4, f * 0.02, 0]}><boxGeometry args={[0.35, 0.35, 0.35]} /><meshStandardMaterial {...metal} /></mesh>
    <Pos bloom={0.9} /></>;
}}</C3><Grande t="0,5 c" y={1150} s={150} cor={VERMELHO} /></AbsoluteFill>;
// 11 · ≈ 66 Tsar Bombas: régua com 66 cogumelos estilizados (câmera passando por cima)
const S11: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="≈ 66 TSAR BOMBAS" etq="ANIMAÇÃO 3D · ESTILIZADO · CÁLCULO">{(fr) => <>
    <Cam pos={[interpolate(fr, [0, 140], [-4, 3]), 1.6, 2.2]} alvo={[interpolate(fr, [0, 140], [-3, 4]), 0, -0.5]} /><Luzes amb={0.4} /><color attach="background" args={['#0a0c18']} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 6]} /><meshStandardMaterial color="#1a1e2a" /></mesh>
    {Array.from({length: 66}, (_, i) => <Cogumelo key={i} pos={[-6 + (i % 33) * 0.4, 0, -Math.floor(i / 33) * 0.6]} s={0.45 * pr(fr, i * 0.8, i * 0.8 + 6)} />)}
    <Pos bloom={1.1} /></>}</C3><Grande t="(CÁLCULO)" y={1150} s={56} o={pr(f, 10, 20)} /></AbsoluteFill>;
};
// 12 · a 90% da luz, mais de 500: um mar de pontos laranja visto de cima
const S12: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="A 90% DA LUZ" etq="ANIMAÇÃO 3D · CÁLCULO">{(fr) => <>
    <Cam pos={[0, interpolate(fr, [0, 60], [3, 7]), 2]} alvo={[0, 0, -1]} /><ambientLight intensity={0.4} /><color attach="background" args={['#0a0c18']} />
    {Array.from({length: 556}, (_, i) => fr > i * 0.08 ? <mesh key={i} position={[((i % 28) - 14) * 0.28, 0, -Math.floor(i / 28) * 0.28 + 2]}><sphereGeometry args={[0.09, 8, 8]} /><meshStandardMaterial color="#ffb070" emissive="#ff8a30" emissiveIntensity={1} /></mesh> : null)}
    <Pos bloom={1.2} /></>}</C3><Grande t="~556" y={1150} s={180} cor={OURO} o={pr(f, 20, 30)} /><Grande t="(CÁLCULO)" y={1350} s={44} o={pr(f, 20, 30)} /></AbsoluteFill>;
};
// 13 · ela chegaria quase junto com a luz: raio de luz com o objeto colado (câmera atrás)
const S13: React.FC = () => <AbsoluteFill><C3 t="QUASE JUNTO COM A PRÓPRIA LUZ" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const z = interpolate(f, [0, 60], [6, 2.2]);
  return <><Cam pos={[0.15, 0.15, z + 0.8]} alvo={[0, 0, -2]} /><Luzes sol={[2, 1, 3]} /><Estrelas sem="a13" />
    <Terra tex={tex} r={0.9} pos={[0, 0, -2]} rot={[0.3, 0.5, 0]} />
    <mesh position={[0, 0, z + 1.5]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.03, 0.03, 4, 12]} /><meshBasicMaterial color="#ffffff" /></mesh>
    <mesh position={[0.06, 0, z]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial {...metal} emissive="#ffffff" emissiveIntensity={0.3} /></mesh>
    <Pos bloom={1.4} /></>;
}}</C3></AbsoluteFill>;
// 14 · aviso de ~55 s: a Terra com a contagem regressiva
const S14: React.FC = () => {
  const f = useCurrentFrame();
  const s = Math.max(0, 55 - Math.floor(f / 2.2));
  return <AbsoluteFill><C3 t="A TERRA TERIA SÓ…" etq="ANIMAÇÃO 3D · CÁLCULO">{(fr, tex) => <>
    <Cam pos={[0, 0, 3.4]} tremor={0.01} /><Luzes sol={[3, 1, 3]} /><Estrelas sem="a14" />
    <Terra tex={tex} rot={[0.3, fr * 0.005 + 3, 0]} />
    <Brilho pos={[1.6, 1.4, -1]} s={0.2 + fr * 0.004} cor="#ffffff" />
    <Pos /></>}</C3><Grande t={`${s} S`} y={1120} s={220} cor={VERMELHO} /><Grande t="DE AVISO (CÁLCULO)" y={1370} s={56} /></AbsoluteFill>;
};
// 15 · Stephen Hawking comparou: radiotelescópio apontado para o céu
const S15: React.FC = () => <AbsoluteFill><C3 t="STEPHEN HAWKING · 2010" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[2, 0.4, 3]} alvo={[0, 0.6, 0]} /><Luzes sol={[-2, 3, 2]} amb={0.3} /><Estrelas sem="a15" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#2a3a2a" /></mesh>
  <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.06, 0.1, 1, 12]} /><meshStandardMaterial {...metal} /></mesh>
  <mesh position={[0, 1.05, 0]} rotation={[-0.8 + Math.sin(f / 30) * 0.05, f * 0.004, 0]}><sphereGeometry args={[0.9, 48, 16, 0, Math.PI * 2, 0, 0.9]} /><meshStandardMaterial color="#e8e8e8" side={THREE.DoubleSide} metalness={0.3} roughness={0.4} /></mesh>
  <Pos bloom={0.6} /></>}</C3><Grande t="“UM ENCONTRO ASSIM…”" y={1150} s={70} cor={OURO} /></AbsoluteFill>;
// 16 · Colombo, 1492: caravela chegando a uma praia estilizada (sem pessoas)
const S16: React.FC = () => <AbsoluteFill><C3 t="COLOMBO · 1492" etq="ANIMAÇÃO 3D · ESTILIZADO">{(f) => {
  const z = interpolate(f, [0, 100], [-2, 0.4]);
  return <><Cam pos={[1.2, 0.5, 3]} alvo={[0, 0.4, -1]} /><Luzes sol={[-3, 2, 2]} i={1.4} amb={0.4} /><color attach="background" args={['#e8a070']} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#1a4a6a" metalness={0.4} roughness={0.3} /></mesh>
    <mesh position={[-2.5, 0.05, -3]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2, 32]} /><meshStandardMaterial color="#e8d8a0" /></mesh>
    <group position={[0, 0.15 + Math.sin(f / 10) * 0.03, z]} rotation={[0, 0.6, Math.sin(f / 14) * 0.04]}>
      <mesh scale={[0.3, 0.18, 0.9]}><sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshStandardMaterial color="#6a3e1e" side={THREE.DoubleSide} /></mesh>
      {[-0.35, 0.1, 0.5].map((zz, i) => <group key={i}><mesh position={[0, 0.5, zz]}><cylinderGeometry args={[0.015, 0.015, 1, 6]} /><meshStandardMaterial color="#4a2a14" /></mesh>
        <mesh position={[0, 0.6, zz]}><planeGeometry args={[0.5, 0.45]} /><meshStandardMaterial color="#f0e8d8" side={THREE.DoubleSide} /></mesh></group>)}
    </group>
    <Pos bloom={0.4} /></>;
}}</C3><Grande t="E COMO TERMINOU PROS POVOS DE LÁ" y={1150} s={56} cor={OURO} /></AbsoluteFill>;
// 17 · mas calma: radar varrendo o céu e nada aparecendo
const S17: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="MAS CALMA" etq="ANIMAÇÃO 3D">{(fr) => <>
    <Cam pos={[0, 2.4, 2.4]} /><ambientLight intensity={0.3} /><color attach="background" args={['#021208']} />
    {[0.4, 0.8, 1.2, 1.6].map((r, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[r - 0.01, r, 96]} /><meshBasicMaterial color="#2aff7a" transparent opacity={0.4} side={THREE.DoubleSide} /></mesh>)}
    <mesh rotation={[-Math.PI / 2, 0, -fr * 0.06]}><circleGeometry args={[1.6, 48, 0, 0.5]} /><meshBasicMaterial color="#2aff7a" transparent opacity={0.3} side={THREE.DoubleSide} /></mesh>
    <Pos bloom={1} /></>}</C3>
    <Grande t="NENHUM SINAL" y={1080} s={90} o={pr(f, 18, 24)} /><Grande t="NENHUMA NAVE" y={1200} s={90} o={pr(f, 50, 56)} />
    <Grande t="NENHUMA EVIDÊNCIA" y={1320} s={100} cor={VERDE} o={pr(f, 80, 86)} />
  </AbsoluteFill>;
};
// 18 · a ameaça que a gente conhece são as rochas: campo de asteroides
const S18: React.FC = () => <AbsoluteFill><C3 t="A AMEAÇA REAL: AS ROCHAS" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 0, interpolate(f, [0, 80], [5, 3])]} /><Luzes sol={[3, 2, 3]} amb={0.15} /><Estrelas sem="a18" />
  {Array.from({length: 60}, (_, i) => <mesh key={i} geometry={geoPedra} position={[(random('rx' + i) - 0.5) * 6, (random('ry' + i) - 0.5) * 8, -random('rz' + i) * 6]} rotation={[f * 0.01 * random('ra' + i), f * 0.012, i]} scale={0.08 + random('rs' + i) * 0.3}><meshStandardMaterial color="#6a5e52" roughness={1} flatShading /></mesh>)}
  <Pos bloom={0.5} /></>}</C3></AbsoluteFill>;
// 19 · DART, 2022: a sonda batendo no asteroide e a órbita mudando de cor (câmera orbitando)
const S19: React.FC = () => <AbsoluteFill><C3 t="DART · 26/09/2022" sub="A NASA DESVIOU UM ASTEROIDE" etq="ANIMAÇÃO 3D">{(f) => {
  const bate = f > 50; const k = pr(f, 0, 50, (t) => t * t);
  const ast = new THREE.Vector3(0.3, 0, 0);
  return <><Cam pos={[Math.sin(f / 50) * 3, 1, Math.cos(f / 50) * 3]} alvo={[0, 0, 0]} /><Luzes sol={[3, 2, 2]} amb={0.25} /><Estrelas sem="a19" />
    <mesh geometry={geoPedra} position={ast} scale={[0.35, 0.28, 0.3]} rotation={[0.3, f * 0.01, 0]}><meshStandardMaterial color="#7a6e62" roughness={1} flatShading /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.6, 0, 0]}><torusGeometry args={[0.9, 0.008, 8, 128]} /><meshBasicMaterial color={bate ? VERDE : '#9aa4b8'} /></mesh>
    {!bate && <group position={new THREE.Vector3(2.4, 0.6, 1).lerp(ast, k)}><mesh><boxGeometry args={[0.06, 0.06, 0.06]} /><meshStandardMaterial {...metal} /></mesh>{[-1, 1].map((s) => <mesh key={s} position={[s * 0.12, 0, 0]}><boxGeometry args={[0.18, 0.005, 0.06]} /><meshStandardMaterial color="#2040a0" /></mesh>)}</group>}
    {bate && <Brilho pos={[ast.x + 0.2, ast.y + 0.05, ast.z + 0.1]} s={0.3 + 1.2 * Math.exp(-(f - 50) / 8)} />}
    <Pos bloom={1.2} /></>;
}}</C3></AbsoluteFill>;

// "E SE" fixo no canto, o vídeo todo
const ESE: React.FC = () => (
  <div style={{position: 'absolute', top: 60, right: 50, padding: '6px 22px', border: `5px solid ${ROSA}`, borderRadius: 14, background: 'rgba(0,0,0,.6)', fontFamily: FONTE, fontSize: 46, color: ROSA, letterSpacing: 3}}>E SE</div>
);

const PLANO: K.Plano = [
  ['o brasil ja recebeu', S1],
  ['em junho de 2026', S2],
  ['chegaram a cerca', S3],
  ['em belo horizonte', S4],
  ['mas e se fosse', S5],
  ['a estrela mais perto', S6],
  ['mesmo a dez', S7],
  ['so que pra atacar', S8],
  ['bastaria um objeto', S9],
  ['pelas contas uma unica', S10],
  ['bateria com a energia', S11],
  ['a noventa por cento', S12],
  ['e ela chegaria', S13],
  ['se fosse vista', S14],
  ['ja comparou', S15],
  ['a chegada de colombo', S16],
  ['mas calma', S17],
  ['a ameaca do espaco', S18],
  ['e pra essas', S19],
];
const S = K.criarShort(W, PLANO, 'alien/narracao.mp3', 'mas e se fosse', ESE);
export const Video = S.Video;
export const DURACAO = S.DURACAO;

export const Thumb: React.FC = () => (
  <AbsoluteFill><Freeze frame={3}><S1 /></Freeze><ESE />
    <div style={{position: 'absolute', top: 1150, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 210, lineHeight: 0.92, color: OURO, WebkitTextStroke: '12px #000', paintOrder: 'stroke fill', transform: 'rotate(-3deg)'}}>55<br />SEGUNDOS</div>
  </AbsoluteFill>
);
