// Short "PI = 3 e o GPS ERRA QUILÔMETROS". Roteiro short_pi_igual_3.md (v1), aprovado pelo dono em 06/11. TODO em Remotion 3D (regra do dono).
// Voz Brian. Não é POV. Nunca dizer que a Terra vira hexágono. Indiana 1897 sem número do projeto. "Diâmetro pela superfície" na cena da esfera.
import React from 'react';
import {AbsoluteFill, Freeze, interpolate, random, useCurrentFrame} from 'remotion';
import {Palavra, FONTE, OURO, VERMELHO, CIANO, VERDE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Terra, Luzes, Pos, Brilho, capaMat, pr, cl, THREE} from '../lote/kit3d';
import palavras from './pitres.palavras.json';

const W = palavras as Palavra[];
const Grande: React.FC<{t: string; y: number; cor?: string; s?: number; o?: number}> = ({t, y, cor = '#fff', s = 120, o = 1}) => (
  <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: s, color: cor, opacity: o, WebkitTextStroke: '7px #000', paintOrder: 'stroke fill', textShadow: '0 8px 30px rgba(0,0,0,.8)'}}>{t}</div>
);
const metal = {color: '#c8ccd4', metalness: 0.8, roughness: 0.3};
const Tubo: React.FC<{a: THREE.Vector3; b: THREE.Vector3; r?: number; cor?: string; em?: number}> = ({a, b, r = 0.02, cor = OURO, em = 1}) => {
  const m = a.clone().add(b).multiplyScalar(0.5); const d = b.clone().sub(a); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
  return <mesh position={m} quaternion={q}><cylinderGeometry args={[r, r, d.length(), 10]} /><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={em} /></mesh>;
};
const hex = (R: number, z = 0) => Array.from({length: 7}, (_, i) => new THREE.Vector3(Math.cos(i * Math.PI / 3) * R, Math.sin(i * Math.PI / 3) * R, z));

// 1 · a roda vira hexágono e trava
const S1: React.FC = () => <AbsoluteFill><C3 t="SE PI FOSSE 3…" etq="ANIMAÇÃO 3D">{(f) => {
  const hexa = f > 22;
  const rot = hexa ? -Math.PI / 6 - 1.6 : -f * 0.055;
  return <><Cam pos={[0, 0.5, 6.2]} alvo={[0, 0.1, 0]} tremor={hexa ? 0.05 * Math.exp(-(f - 22) / 6) : 0} /><Luzes sol={[2, 3, 4]} amb={0.25} />
    <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[12, 12]} /><meshStandardMaterial color="#2a2a30" roughness={0.9} /></mesh>
    <group position={[hexa ? 0 : interpolate(f, [0, 22], [-1.6, 0], cl), 0.1, 0]} rotation={[0, 0, rot]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.85, 0.85, 0.42, hexa ? 6 : 64]} /><meshStandardMaterial color="#151518" roughness={0.8} flatShading={hexa} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.5, 0.5, 0.44, hexa ? 6 : 48]} /><meshStandardMaterial {...metal} flatShading={hexa} /></mesh>
      {Array.from({length: 5}, (_, i) => <mesh key={i} rotation={[0, 0, i * Math.PI * 2 / 5]} position={[0, 0, 0.23]}><boxGeometry args={[0.08, 0.8, 0.04]} /><meshStandardMaterial {...metal} /></mesh>)}
    </group>
    <Pos bloom={0.6} /></>;
}}</C3></AbsoluteFill>;

// 1b · todo círculo do universo vira hexágono: moedas, pratos, pneus e planetinhas numa grade
const S1b: React.FC = () => <AbsoluteFill><C3 t="TODO CÍRCULO DO UNIVERSO" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 0, 5.4]} /><Luzes sol={[2, 3, 4]} amb={0.35} /><Estrelas sem="p1b" />
  {Array.from({length: 20}, (_, i) => { const x = (i % 4) - 1.5, y = Math.floor(i / 4) - 2; const vira = f > 8 + i * 2;
    const cor = ['#d8b860', '#e8e8e8', '#202024', '#4a8ae0'][i % 4];
    return <mesh key={i} position={[x * 0.9, y * 0.9 - 0.2, 0]} rotation={[Math.PI / 2 - 0.5, f * 0.03 + i, 0]}><cylinderGeometry args={[0.32, 0.32, 0.08, vira ? 6 : 48]} /><meshStandardMaterial color={cor} metalness={0.5} roughness={0.4} flatShading={vira} /></mesh>; })}
  <Pos bloom={0.6} /></>}</C3><Grande t="SERIA UM HEXÁGONO" y={1180} s={92} cor={OURO} o={pr(useCurrentFrame(), 20, 30)} /></AbsoluteFill>;

// 2 · a volta do círculo desenrolada ao lado do diâmetro
const S2: React.FC = () => <AbsoluteFill><C3 t="π = VOLTA ÷ DIÂMETRO" etq="ANIMAÇÃO 3D">{(f) => {
  const k = pr(f, 6, 60);
  return <><Cam pos={[0.4, 0.0, 3.6]} alvo={[0, -0.35, 0]} /><Luzes amb={0.4} />
    <group rotation={[0, -0.15, 0]}>
      <mesh position={[0.15, 0.5, 0]}><torusGeometry args={[0.3, 0.025, 12, 96, Math.PI * 2 * (1 - k)]} /><meshStandardMaterial color={CIANO} emissive={CIANO} emissiveIntensity={0.8} /></mesh>
      <Tubo a={new THREE.Vector3(-0.15, 0.5, 0)} b={new THREE.Vector3(0.45, 0.5, 0)} cor={VERMELHO} />
      <Tubo a={new THREE.Vector3(-0.45, 0.15, 0)} b={new THREE.Vector3(-0.45, 0.15 - Math.PI * 0.6 * k - 0.001, 0)} cor={CIANO} />
      <Tubo a={new THREE.Vector3(-0.25, 0.15, 0)} b={new THREE.Vector3(-0.25, 0.15 - 0.6 * pr(f, 0, 10), 0)} cor={VERMELHO} />
    </group>
    <Pos bloom={1} /></>;
}}</C3><Grande t="3,14… DIÂMETROS" y={1150} s={80} cor={CIANO} o={pr(useCurrentFrame(), 50, 60)} /></AbsoluteFill>;

// 3 · o hexágono inscrito acende: perímetro = 3 × diâmetro
const S3: React.FC = () => <AbsoluteFill><C3 t="NO HEXÁGONO, A CONTA DÁ 3" etq="ANIMAÇÃO 3D">{(f) => {
  const H = hex(1); const n = Math.floor(pr(f, 4, 50) * 6);
  return <><Cam pos={[0, 0, 3.6]} /><Luzes amb={0.4} />
    <group rotation={[0.35 + Math.sin(f / 40) * 0.1, f * 0.008, 0]}>
      <mesh><torusGeometry args={[1, 0.012, 8, 128]} /><meshStandardMaterial color="#6a7aa0" emissive="#6a7aa0" emissiveIntensity={0.4} /></mesh>
      {H.slice(0, 6).map((p, i) => <Tubo key={i} a={p} b={H[i + 1]} r={0.03} cor={i < n ? OURO : '#3a3a44'} em={i < n ? 1.4 : 0.1} />)}
      {H.slice(0, 6).map((p, i) => <mesh key={'v' + i} position={p}><sphereGeometry args={[0.05, 16, 16]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.6} /></mesh>)}
    </group>
    <Pos bloom={1.1} /></>;
}}</C3><Grande t="PERÍMETRO = 3 × D" y={1150} s={84} cor={OURO} o={pr(useCurrentFrame(), 40, 50)} /></AbsoluteFill>;

// 4 · a Terra encolhe ~1.800 km na volta
const S4: React.FC = () => <AbsoluteFill><C3 t="A TERRA ENCOLHERIA" sub="40.075 → ~38.270 KM (CÁLCULO)" etq="ANIMAÇÃO 3D · CÁLCULO">{(f, tex) => {
  const k = pr(f, 10, 70); const r = 1 - 0.045 * k;
  return <><Cam pos={[Math.sin(f / 60) * 1.2, 0.8, 3.4]} /><Luzes /><Estrelas sem="p4" />
    <Terra tex={tex} r={r} rot={[0.4, f * 0.006, 0]} />
    <mesh rotation={[Math.PI / 2 - 0.4, 0, 0]} scale={1 + 0.06 * k}><torusGeometry args={[1.02, 0.012, 8, 128]} /><meshStandardMaterial color={VERMELHO} emissive={VERMELHO} emissiveIntensity={1.2} transparent opacity={1 - 0.5 * k} /></mesh>
    <Pos /></>;
}}</C3><Grande t="−1.800 KM" y={1180} s={140} cor={VERMELHO} o={pr(useCurrentFrame(), 40, 50)} /></AbsoluteFill>;

// 5 · satélite de GPS errando o pino no relevo
const relevo = (() => {
  const g = new THREE.PlaneGeometry(8, 8, 80, 80); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); p.setZ(i, 0.25 * Math.sin(x * 1.3) * Math.cos(y * 1.1) + 0.12 * Math.sin(x * 3.1 + y * 2.3)); }
  g.computeVertexNormals(); return g;
})();
const S5: React.FC = () => <AbsoluteFill><C3 t="GPS ERRARIA POR QUILÔMETROS" etq="ANIMAÇÃO 3D">{(f) => {
  const sat = new THREE.Vector3(0.3, 0.75, -0.2); const certo = new THREE.Vector3(-0.4, -0.75, 0.6); const errado = new THREE.Vector3(1.2, -0.75, 0.3);
  const k = pr(f, 6, 30);
  return <><Cam pos={[-1.8, 1.0, 3.6]} alvo={[0.2, 0, 0]} /><Luzes sol={[2, 4, 2]} amb={0.25} /><Estrelas sem="p5" />
    <mesh geometry={relevo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}><meshStandardMaterial color="#3a6a48" roughness={1} flatShading /></mesh>
    <group position={sat} rotation={[0.3, f * 0.01, 0.2]}><mesh><boxGeometry args={[0.3, 0.3, 0.3]} /><meshStandardMaterial {...metal} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} position={[s * 0.55, 0, 0]}><boxGeometry args={[0.7, 0.02, 0.3]} /><meshStandardMaterial color="#2040a0" metalness={0.5} roughness={0.3} /></mesh>)}</group>
    <Tubo a={sat} b={sat.clone().lerp(errado, k)} r={0.012} cor={CIANO} />
    <mesh position={certo}><coneGeometry args={[0.08, 0.25, 16]} /><meshStandardMaterial color={VERDE} emissive={VERDE} emissiveIntensity={0.8} /></mesh>
    {k > 0.95 && <Brilho pos={[errado.x, errado.y + 0.05, errado.z]} s={0.5} cor="#ff4040" />}
    <Pos bloom={1} /></>;
}}</C3></AbsoluteFill>;

// 6 · a ponte que não se encontra no meio
const S6: React.FC = () => <AbsoluteFill><C3 t="PONTES NÃO SE ENCONTRARIAM" etq="ANIMAÇÃO 3D">{(f) => {
  const k = pr(f, 0, 40);
  return <><Cam pos={[interpolate(f, [0, 66], [-2.2, 1.6]), -0.6, 2.6]} alvo={[0, 0.2, 0]} /><Luzes sol={[-2, 3, 2]} amb={0.3} /><Estrelas sem="p6" />
    <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color="#0e2a40" roughness={0.4} metalness={0.3} /></mesh>
    {[-1, 1].map((s) => <group key={s}>
      <mesh position={[s * 1.6, -0.5, 0]}><boxGeometry args={[0.25, 1.4, 0.4]} /><meshStandardMaterial color="#8a8a90" /></mesh>
      <mesh position={[s * (0.85 + 0.15 * k), 0.25 + (s > 0 ? 0.25 * k : 0), 0]}><boxGeometry args={[1.5, 0.12, 0.5]} /><meshStandardMaterial color="#c8c8c0" /></mesh>
    </group>)}
    <Pos bloom={0.6} /></>;
}}</C3></AbsoluteFill>;

// 7 · plenário antigo (maquete), 1897
const S7: React.FC = () => <AbsoluteFill><C3 t="E TEVE GENTE QUE TENTOU" etq="ANIMAÇÃO 3D · MAQUETE">{(f) => <>
  <Cam pos={[0, 1.3, interpolate(f, [0, 90], [4.2, 2.6])]} alvo={[0, 0, -0.6]} /><Luzes sol={[0, 4, 3]} amb={0.35} />
  <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 10]} /><meshStandardMaterial color="#4a2e1c" roughness={0.8} /></mesh>
  {Array.from({length: 4}, (_, r) => Array.from({length: 11}, (_, i) => { const a = Math.PI * (0.15 + 0.7 * i / 10); const R = 1 + r * 0.4;
    return <mesh key={r + '_' + i} position={[Math.cos(a) * R, -0.45 + r * 0.12, -Math.sin(a) * R + 0.3]} rotation={[0, a - Math.PI / 2, 0]}><boxGeometry args={[0.28, 0.24, 0.16]} /><meshStandardMaterial color="#6a3a22" /></mesh>; }))}
  <mesh position={[0, -0.2, 0.3]}><boxGeometry args={[0.6, 0.5, 0.3]} /><meshStandardMaterial color="#8a5a30" /></mesh>
  <Pos bloom={0.5} /></>}</C3><Grande t="INDIANA · 1897" y={1180} s={100} cor={OURO} /></AbsoluteFill>;

// 8 · placar 67 × 0
const S8: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="APROVARAM UM PI ERRADO" etq="ANIMAÇÃO 3D">{(fr) => {
    const h = pr(fr, 4, 40) * 2.2;
    return <><Cam pos={[0, 0.6, 4]} alvo={[0, 0.3, 0]} /><Luzes amb={0.35} />
      <mesh position={[-0.6, -1 + h / 2, 0]}><boxGeometry args={[0.7, h + 0.001, 0.7]} /><meshStandardMaterial color={VERDE} emissive={VERDE} emissiveIntensity={0.5} /></mesh>
      <mesh position={[0.6, -0.98, 0]}><boxGeometry args={[0.7, 0.04, 0.7]} /><meshStandardMaterial color={VERMELHO} emissive={VERMELHO} emissiveIntensity={0.5} /></mesh>
      <Pos bloom={0.9} /></>;
  }}</C3><Grande t="67 × 0" y={1150} s={180} cor={OURO} o={pr(f, 30, 38)} /></AbsoluteFill>;
};

// 9 · o professor apontando o erro no quadro
const S9: React.FC = () => <AbsoluteFill><C3 t="UM PROFESSOR EXPLICOU O ERRO" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0.6, 0.3, 3.6]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 2, 3]} amb={0.3} />
  <mesh position={[-0.2, 0.4, -0.5]}><boxGeometry args={[1.6, 1.1, 0.05]} /><meshStandardMaterial color="#1e3a2a" roughness={0.9} /></mesh>
  <mesh position={[-0.2, 0.4, -0.52]}><boxGeometry args={[1.72, 1.22, 0.04]} /><meshStandardMaterial color="#6a4a2a" /></mesh>
  <group position={[0.5, -0.75, 0.2]} scale={0.62}><mesh position={[0, 0.55, 0]}><capsuleGeometry args={[0.2, 0.7, 8, 16]} /><meshStandardMaterial color="#0a0a0c" /></mesh>
    <mesh position={[0, 1.25, 0]}><sphereGeometry args={[0.17, 24, 24]} /><meshStandardMaterial color="#0a0a0c" /></mesh>
    <mesh position={[-0.35, 0.95, 0]} rotation={[0, 0, Math.PI / 2 + 0.4 + Math.sin(f / 6) * 0.08]}><capsuleGeometry args={[0.05, 0.5, 6, 12]} /><meshStandardMaterial color="#0a0a0c" /></mesh></group>
  <Pos bloom={0.5} /></>}</C3><Grande t="π ≠ 3,2" y={760} s={130} cor="#e8ffe8" /></AbsoluteFill>;

// 10 · existe um lugar onde pi vale 3: a própria Terra
const S10: React.FC = () => <AbsoluteFill><C3 t="ONDE PI VALE 3 DE VERDADE?" etq="ANIMAÇÃO 3D">{(f, tex) => <>
  <Cam pos={[0, 0, interpolate(f, [0, 110], [4.5, 3.3])]} /><Luzes sol={[3, 1, 3]} /><Estrelas sem="p10" />
  <Terra tex={tex} rot={[0.3, f * 0.008 + 1.5, 0]} />
  <Pos /></>}</C3><Grande t="NA PRÓPRIA TERRA" y={1180} s={96} cor={OURO} o={pr(useCurrentFrame(), 60, 72)} /></AbsoluteFill>;

// 11 · um círculo gigante desenhado no chão do globo (raio de ~3.300 km pela superfície)
const circulo = capaMat('disco');
const S11: React.FC = () => <AbsoluteFill><C3 t="UM CÍRCULO GIGANTE NO CHÃO" sub="RAIO DE ~3.300 KM PELA SUPERFÍCIE" etq="ANIMAÇÃO 3D">{(f, tex) => {
  circulo.uniforms.uC.value = new THREE.Vector3(0, 0.35, 1); circulo.uniforms.uR.value = 0.524 * pr(f, 6, 70); circulo.uniforms.uK.value = 1;
  const c = new THREE.Vector3(0, 0.35, 1).normalize().multiplyScalar(1.02);
  return <><Cam pos={[0, interpolate(f, [0, 130], [0.3, 1.4]), 3.0]} /><Luzes sol={[1, 2, 4]} amb={0.25} /><Estrelas sem="p11" />
    <Terra tex={tex} nuvens={false} rot={[0, -0.3, 0]} />
    <mesh material={circulo}><sphereGeometry args={[1.006, 160, 160]} /></mesh>
    <mesh position={c} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), c.clone().normalize())}><coneGeometry args={[0.03, 0.12, 12]} /><meshStandardMaterial color={VERMELHO} emissive={VERMELHO} emissiveIntensity={1} /></mesh>
    <Pos bloom={0.8} /></>;
}}</C3></AbsoluteFill>;

// 12 · a fatia do globo vista de lado: o chão curvo faz a volta dar 3 × o diâmetro
const S12: React.FC = () => <AbsoluteFill><C3 t="COMO O CHÃO É CURVO…" etq="ANIMAÇÃO 3D · CÁLCULO">{(f) => {
  const arco = Array.from({length: 41}, (_, i) => { const a = -Math.PI / 6 + (i / 40) * Math.PI / 3; return new THREE.Vector3(Math.sin(a), Math.cos(a) - 0.6, 0); });
  return <><Cam pos={[Math.sin(f / 50) * 1.5, 0.6, 2.8]} alvo={[0, 0.15, 0]} /><Luzes amb={0.4} /><Estrelas sem="p12" />
    <mesh position={[0, -0.6, 0]}><sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 5]} /><meshStandardMaterial color="#2a5a8a" side={THREE.DoubleSide} transparent opacity={0.85} /></mesh>
    {arco.slice(0, 40).map((p, i) => <Tubo key={i} a={p} b={arco[i + 1]} r={0.018} cor={OURO} em={1.2} />)}
    <Tubo a={arco[0]} b={arco[40]} r={0.012} cor="#9aa4b8" em={0.3} />
    <Pos bloom={1} /></>;
}}</C3><Grande t="VOLTA ÷ DIÂMETRO = 3" y={1150} s={84} cor={OURO} /><Grande t="(CÁLCULO · MEDIDO PELO CHÃO)" y={1260} s={40} cor="#fff" /></AbsoluteFill>;

// 13 · o universo plano: grade com galáxias e pi de volta a 3,14
const S13: React.FC = () => <AbsoluteFill><C3 t="O UNIVERSO É PLANO" sub="DENTRO DA MARGEM DE ERRO" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, interpolate(f, [0, 120], [1.2, 2.8]), interpolate(f, [0, 120], [3, 6])]} alvo={[0, 0, -1]} /><ambientLight intensity={0.6} />
  {Array.from({length: 21}, (_, i) => <group key={i}><mesh position={[-5 + i * 0.5, -0.5, -2]}><boxGeometry args={[0.008, 0.008, 10]} /><meshBasicMaterial color="#3a5a9a" /></mesh>
    <mesh position={[0, -0.5, -7 + i * 0.5]}><boxGeometry args={[10, 0.008, 0.008]} /><meshBasicMaterial color="#3a5a9a" /></mesh></group>)}
  {Array.from({length: 80}, (_, i) => <Brilho key={i} pos={[(random('gx' + i) - 0.5) * 9, -0.4 + random('gy' + i) * 0.3, -2 + (random('gz' + i) - 0.5) * 9]} s={0.08 + random('gs' + i) * 0.12} cor={i % 3 ? '#cfe0ff' : '#ffd8a0'} />)}
  <Pos bloom={1.2} /></>}</C3><Grande t="π = 3,14159…" y={1180} s={130} cor={CIANO} o={pr(useCurrentFrame(), 50, 60)} /></AbsoluteFill>;

const PLANO: K.Plano = [
  ['se pi fosse', S1],
  ['todo circulo do universo', S1b],
  ['pi e a volta', S2],
  ['e o hexagono e justamente', S3],
  ['com pi igual a tres a volta', S4],
  ['gps orbitas', S5],
  ['pontes tudo', S6],
  ['e teve gente', S7],
  ['deputados americanos', S8],
  ['so pararam', S9],
  ['mas existe um lugar', S10],
  ['desenhe no chao', S11],
  ['como o chao e curvo', S12],
  ['ja o universo', S13],
];
const S = K.criarShort(W, PLANO, 'pitres/narracao.mp3', 'mas existe um lugar');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

export const Thumb: React.FC = () => (
  <AbsoluteFill><Freeze frame={45}><S1 /></Freeze>
    <div style={{position: 'absolute', top: 1300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 230, color: OURO, WebkitTextStroke: '12px #000', paintOrder: 'stroke fill', transform: 'rotate(-3deg)'}}>PI = 3 ?!</div>
  </AbsoluteFill>
);
