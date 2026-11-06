// Short "Um BURACO NEGRO na sua SALA DE AULA… e o PIOR é o MENOR". Roteiro short_buraco_negro_sala.md, aprovado pelo dono em 07/11.
// 1º vídeo no FORMATO NOVO (regras do dono de 07/11): nenhum texto na tela além da legenda (tamanho 56), nenhum selo; os números viram imagem 3D.
// Tudo em Remotion 3D, nenhuma cena repetida, voz Brian. Sem pessoas nem nada gráfico: Hawking só em silhueta estilizada, manequim sem rosto.
import React from 'react';
import {interpolate, random} from 'remotion';
import {Palavra} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Terra, Luzes, Pos, Brilho, geoPedra, pr, cl, THREE} from '../lote/kit3d';
import palavras from './bnsala.palavras.json';

const W = palavras as Palavra[];
const LUZ = '#fff2d0';
// buraco negro: esfera preta com anel de luz curvada
const BN: React.FC<{pos?: [number, number, number]; r?: number; f: number; brilho?: number}> = ({pos = [0, 0, 0], r = 0.08, f, brilho = 1}) => (
  <group position={pos}>
    <mesh><sphereGeometry args={[r, 32, 32]} /><meshBasicMaterial color="#000" /></mesh>
    <mesh rotation={[Math.PI / 2 + 0.3, 0, f * 0.05]}><torusGeometry args={[r * 1.7, r * 0.18, 12, 64]} /><meshBasicMaterial color="#ffb070" transparent opacity={0.8 * brilho} /></mesh>
    <Brilho pos={[0, 0, -0.01]} s={r * 7} cor="#ff9a50" o={0.5 * brilho} />
  </group>
);
// sala de aula: piso, parede com lousa, carteiras
const Carteira: React.FC<{pos: [number, number, number]; esmaga?: number; rot?: number}> = ({pos, esmaga = 0, rot = 0}) => {
  const h = 1 - 0.85 * esmaga;
  return <group position={pos} rotation={[0, rot, 0]} scale={[1 + 0.3 * esmaga, h, 1 + 0.3 * esmaga]}>
    <mesh position={[0, 0.38, 0]}><boxGeometry args={[0.6, 0.04, 0.42]} /><meshStandardMaterial color="#b88a5a" /></mesh>
    {[[-0.27, -0.18], [0.27, -0.18], [-0.27, 0.18], [0.27, 0.18]].map(([x, z], i) => <mesh key={i} position={[x, 0.18, z]}><boxGeometry args={[0.03, 0.38, 0.03]} /><meshStandardMaterial color="#4a4a52" metalness={0.6} /></mesh>)}
    <mesh position={[0, 0.22, 0.38]}><boxGeometry args={[0.36, 0.03, 0.32]} /><meshStandardMaterial color="#3a6ab0" /></mesh>
    <mesh position={[0, 0.4, 0.53]}><boxGeometry args={[0.36, 0.34, 0.03]} /><meshStandardMaterial color="#3a6ab0" /></mesh>
  </group>;
};
const Sala: React.FC<{esmaga?: (x: number, z: number) => number; lousa?: boolean}> = ({esmaga, lousa = true}) => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[8, 8]} /><meshStandardMaterial color="#8a7a66" roughness={0.8} /></mesh>
    <mesh position={[0, 1.5, -2.6]}><planeGeometry args={[8, 3]} /><meshStandardMaterial color="#d8d2c4" /></mesh>
    {lousa && <><mesh position={[0, 1.5, -2.58]}><planeGeometry args={[2.8, 1.2]} /><meshStandardMaterial color="#1e3a2a" /></mesh>
      <mesh position={[0, 1.5, -2.59]}><planeGeometry args={[2.95, 1.35]} /><meshStandardMaterial color="#6a4a2a" /></mesh></>}
    {Array.from({length: 12}, (_, i) => { const x = (i % 4) * 0.95 - 1.42, z = Math.floor(i / 4) * 1.0 - 1.2; return <Carteira key={i} pos={[x, 0, z]} esmaga={esmaga ? esmaga(x, z) : 0} />; })}
  </group>
);

// 1 · o buraco negro aparece na sala (câmera entrando pela porta)
const S1: React.FC = () => <C3>{(f) => <>
  <Cam pos={[interpolate(f, [0, 70], [2.6, 1.4]), 1.3, interpolate(f, [0, 70], [3.4, 2.2])]} alvo={[0, 1.0, -0.6]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.5} />
  <Sala />
  <BN pos={[0, 1.1, -0.6]} r={0.09 * pr(f, 10, 30)} f={f} />
  <Pos bloom={0.9} /></>}</C3>;
// 2 · o que vai matar todo mundo: close no ponto negro, a luz da sala se curvando em volta
const S2: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.1, 0.9 - f * 0.004]} alvo={[0, 1.1, -0.6]} tremor={0.008} /><Luzes sol={[2, 4, 3]} i={1.4} amb={0.35} />
  <Sala />
  <BN pos={[0, 1.1, -0.6]} r={0.12} f={f} brilho={1.3} />
  {Array.from({length: 24}, (_, i) => { const a = i / 24 * Math.PI * 2 + f * 0.04; return <Brilho key={i} pos={[Math.cos(a) * 0.3, 1.1 + Math.sin(a) * 0.3, -0.6]} s={0.05} cor="#ffd8a0" o={0.8} />; })}
  <Pos bloom={1.2} /></>}</C3>;
// 3 · depende do peso: balança com o ponto negro de um lado e uma interrogação do outro
const S3: React.FC = () => <C3>{(f) => {
  const ang = Math.sin(f / 12) * 0.25;
  return <><Cam pos={[0, 0.5, 7]} alvo={[0, 0.0, 0]} /><Luzes amb={0.5} /><color attach="background" args={['#14100c']} />
    <mesh position={[0, -0.3, 0]}><cylinderGeometry args={[0.04, 0.12, 1.2, 16]} /><meshStandardMaterial color="#c8a050" metalness={0.8} roughness={0.3} /></mesh>
    <group position={[0, 0.3, 0]} rotation={[0, 0, ang]}>
      <mesh><boxGeometry args={[1.8, 0.04, 0.06]} /><meshStandardMaterial color="#c8a050" metalness={0.8} roughness={0.3} /></mesh>
      <group position={[-0.85, -0.35, 0]} rotation={[0, 0, -ang]}><mesh><cylinderGeometry args={[0.3, 0.3, 0.02, 32]} /><meshStandardMaterial color="#c8a050" metalness={0.8} /></mesh><BN pos={[0, 0.16, 0]} r={0.12} f={f} brilho={1.4} /></group>
      <group position={[0.85, -0.35, 0]} rotation={[0, 0, -ang]}><mesh><cylinderGeometry args={[0.3, 0.3, 0.02, 32]} /><meshStandardMaterial color="#c8a050" metalness={0.8} /></mesh>
        <mesh position={[0, 0.32, 0]} rotation={[0, 0, -0.6]}><torusGeometry args={[0.12, 0.03, 12, 32, Math.PI * 1.4]} /><meshStandardMaterial color="#ffd23f" emissive="#ffd23f" emissiveIntensity={0.6} /></mesh>
        <mesh position={[0, 0.17, 0]}><cylinderGeometry args={[0.03, 0.03, 0.08, 12]} /><meshStandardMaterial color="#ffd23f" emissive="#ffd23f" emissiveIntensity={0.6} /></mesh>
        <mesh position={[0, 0.08, 0]}><sphereGeometry args={[0.035, 12, 12]} /><meshStandardMaterial color="#ffd23f" emissive="#ffd23f" emissiveIntensity={0.6} /></mesh></group>
    </group>
    <Pos bloom={0.8} /></>;
}}</C3>;
// 4 · o lápis sobre a carteira encolhendo até virar um ponto (câmera rasante)
const S4: React.FC = () => <C3>{(f) => {
  const k = pr(f, 8, 50); const s = 1 - 0.97 * k;
  return <><Cam pos={[0.9, 0.48, 0.6]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 4, 2]} amb={0.5} />
    <mesh position={[0, 0.36, 0]}><boxGeometry args={[2.4, 0.04, 1.6]} /><meshStandardMaterial color="#b88a5a" /></mesh>
    <group position={[0, 0.4, 0]} rotation={[0, 0.5, Math.PI / 2]} scale={s}>
      <mesh><cylinderGeometry args={[0.025, 0.025, 0.5, 6]} /><meshStandardMaterial color="#f0c020" /></mesh>
      <mesh position={[0, 0.29, 0]}><coneGeometry args={[0.025, 0.08, 6]} /><meshStandardMaterial color="#e8c8a0" /></mesh>
      <mesh position={[0, -0.27, 0]}><cylinderGeometry args={[0.026, 0.026, 0.05, 12]} /><meshStandardMaterial color="#e87090" /></mesh>
    </group>
    {k > 0.9 && <BN pos={[0, 0.42, 0]} r={0.015} f={f} />}
    <Pos bloom={0.8} /></>;
}}</C3>;
// 5 · some antes de você piscar: o ponto some num estalo
const S5: React.FC = () => <C3>{(f) => {
  const k = pr(f, 18, 24);
  return <><Cam pos={[0, 0.7, 1.4]} alvo={[0, 0.45, 0]} /><Luzes sol={[2, 4, 2]} amb={0.4} />
    <mesh position={[0, 0.36, 0]}><boxGeometry args={[2.4, 0.04, 1.6]} /><meshStandardMaterial color="#b88a5a" /></mesh>
    {k < 1 && <BN pos={[0, 0.45, 0]} r={0.03 * (1 - k)} f={f} />}
    <Brilho pos={[0, 0.45, 0]} s={k * (1 - pr(f, 24, 40)) * 2.5} cor="#ffffff" />
    <Pos bloom={1.4} /></>;
}}</C3>;
// 6 · vira energia pura: esfera de luz enchendo a sala vazia
const S6: React.FC = () => <C3>{(f) => {
  const r = interpolate(f, [0, 60], [0.05, 4], {...cl, easing: (t) => t * t});
  return <><Cam pos={[1.6, 1.2, 2.4]} alvo={[0, 0.8, -0.6]} tremor={0.04} /><Luzes amb={0.4} />
    <Sala />
    <mesh position={[0, 0.8, -0.4]}><sphereGeometry args={[r, 48, 48]} /><meshBasicMaterial color={LUZ} transparent opacity={0.65} /></mesh>
    <pointLight position={[0, 0.8, -0.4]} color="#fff0c0" intensity={20} distance={8} />
    <Pos bloom={1.8} /></>;
}}</C3>;
// 7 · 14 esferas de luz subindo em fila sobre a escola (câmera recuando no pátio)
const Escola: React.FC<{apaga?: number}> = ({apaga = 0}) => (
  <group>
    <mesh position={[0, 0.6, 0]}><boxGeometry args={[4, 1.2, 1.2]} /><meshStandardMaterial color="#d8b890" emissive="#fff0c0" emissiveIntensity={apaga * 2} transparent opacity={1 - 0.8 * apaga} /></mesh>
    <mesh position={[0, 1.35, 0]} rotation={[0, 0, Math.PI / 4]} scale={[1, 1, 3.4]}><boxGeometry args={[0.5, 0.5, 0.4]} /><meshStandardMaterial color="#a04030" transparent opacity={1 - 0.8 * apaga} /></mesh>
    {Array.from({length: 10}, (_, i) => <mesh key={i} position={[-1.7 + i * 0.38, 0.65, 0.61]}><planeGeometry args={[0.22, 0.3]} /><meshStandardMaterial color="#5a8ab0" /></mesh>)}
  </group>
);
const S7: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.4, interpolate(f, [0, 60], [4.5, 7])]} alvo={[0, 1.8, 0]} /><Luzes sol={[-2, 4, 3]} amb={0.35} /><color attach="background" args={['#0a1020']} /><Estrelas sem="b7" />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#3a4a3a" /></mesh>
  <Escola />
  {Array.from({length: 14}, (_, i) => { const s = pr(f, i * 3, i * 3 + 10); return <group key={i}><mesh position={[-2.6 + i * 0.4, 2.2 + s * 0.8, 0]} scale={0.16 * s}><sphereGeometry args={[1, 24, 24]} /><meshBasicMaterial color={LUZ} /></mesh>
    <Brilho pos={[-2.6 + i * 0.4, 2.2 + s * 0.8, 0]} s={0.6 * s} cor="#ffd890" /></group>; })}
  <Pos bloom={1.4} /></>}</C3>;
// 8 · a escola inteira desaparece junto: ela vira luz e some
const S8: React.FC = () => <C3>{(f) => {
  const k = pr(f, 4, 44);
  return <><Cam pos={[2.5, 1.6, 4.2]} alvo={[0, 0.7, 0]} /><Luzes sol={[-2, 4, 3]} amb={0.35} /><color attach="background" args={['#0a1020']} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#3a4a3a" /></mesh>
    <group scale={[1, 1 - 0.95 * k, 1]}><Escola apaga={k} /></group>
    <Brilho pos={[0, 0.6, 0]} s={1 + 5 * k * (1 - k)} cor="#fff0c0" />
    <Pos bloom={1.5} /></>;
}}</C3>;
// 9 · o peso de uma pessoa: manequim (sem rosto) se apagando em luz, fundo escuro
const S9: React.FC = () => <C3>{(f) => {
  const k = pr(f, 6, 34); const mat = {color: '#d8d4cc', emissive: '#fff0d0', emissiveIntensity: 2.5 * k, transparent: true, opacity: 1 - 0.9 * pr(f, 24, 38), roughness: 0.6};
  return <><Cam pos={[0, 1.1, 3]} alvo={[0, 1, 0]} /><Luzes sol={[2, 3, 3]} amb={0.3} /><color attach="background" args={['#08080c']} />
    <group>
      <mesh position={[0, 1.65, 0]}><sphereGeometry args={[0.16, 24, 24]} /><meshStandardMaterial {...mat} /></mesh>
      <mesh position={[0, 1.15, 0]}><capsuleGeometry args={[0.22, 0.6, 8, 16]} /><meshStandardMaterial {...mat} /></mesh>
      {[-0.32, 0.32].map((x) => <mesh key={x} position={[x, 1.15, 0]} rotation={[0, 0, x > 0 ? 0.15 : -0.15]}><capsuleGeometry args={[0.06, 0.55, 6, 12]} /><meshStandardMaterial {...mat} /></mesh>)}
      {[-0.11, 0.11].map((x) => <mesh key={x} position={[x, 0.45, 0]}><capsuleGeometry args={[0.08, 0.65, 6, 12]} /><meshStandardMaterial {...mat} /></mesh>)}
    </group>
    <Pos bloom={1.6} /></>;
}}</C3>;
// 10 · 30 colunas de luz subindo sobre a maquete da cidade (câmera de cima, girando)
const PREDIOS = Array.from({length: 120}, (_, i) => ({x: (i % 12) * 0.5 - 2.75, z: Math.floor(i / 12) * 0.5 - 2.25, h: 0.2 + random('ph' + i) * 1.1}));
const S10: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f / 70) * 5, 4.5, Math.cos(f / 70) * 5]} alvo={[0, 0, 0]} /><Luzes sol={[-2, 5, 2]} amb={0.3} /><color attach="background" args={['#06080e']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color="#2a2c32" /></mesh>
  {PREDIOS.map((p, i) => <mesh key={i} position={[p.x, p.h / 2, p.z]}><boxGeometry args={[0.36, p.h, 0.36]} /><meshStandardMaterial color="#4a5060" emissive="#ffd890" emissiveIntensity={random('pw' + i) > 0.6 ? 0.15 : 0} /></mesh>)}
  {Array.from({length: 30}, (_, i) => { const s = pr(f, i * 2, i * 2 + 14); const x = (random('cx' + i) - 0.5) * 5, z = (random('cz' + i) - 0.5) * 5;
    return <mesh key={'c' + i} position={[x, s * 2, z]} scale={[1, s * 4 + 0.001, 1]}><cylinderGeometry args={[0.07, 0.07, 1, 12]} /><meshBasicMaterial color={LUZ} transparent opacity={0.85} /></mesh>; })}
  <Pos bloom={1.6} /></>}</C3>;
// 11 · Hawking calculou: silhueta estilizada com cadeira de rodas, ao lado de um ponto negro soltando faíscas
const S11: React.FC = () => <C3>{(f) => {
  const sil = {color: '#0a0a0e', roughness: 1};
  return <><Cam pos={[2.4, 1.0, 2.6]} alvo={[0.3, 0.8, 0]} /><ambientLight intensity={0.2} /><directionalLight position={[-2, 2, -3]} intensity={3} color="#9ab8ff" /><color attach="background" args={['#1a2440']} />
    <group position={[-0.6, 0, 0]}>
      {[-0.32, 0.32].map((z) => <mesh key={z} position={[0, 0.35, z]}><torusGeometry args={[0.32, 0.03, 8, 32]} /><meshStandardMaterial {...sil} /></mesh>)}
      <mesh position={[0.05, 0.55, 0]}><boxGeometry args={[0.5, 0.06, 0.6]} /><meshStandardMaterial {...sil} /></mesh>
      <mesh position={[-0.22, 0.9, 0]}><boxGeometry args={[0.06, 0.7, 0.6]} /><meshStandardMaterial {...sil} /></mesh>
      <mesh position={[-0.05, 0.95, 0]}><capsuleGeometry args={[0.18, 0.4, 8, 12]} /><meshStandardMaterial {...sil} /></mesh>
      <mesh position={[-0.02, 1.38, 0]} rotation={[0, 0, -0.3]}><sphereGeometry args={[0.14, 20, 20]} /><meshStandardMaterial {...sil} /></mesh>
    </group>
    <BN pos={[0.9, 1.1, 0]} r={0.1} f={f} />
    {Array.from({length: 40}, (_, i) => { const t = ((f * 0.03 + random('hk' + i)) % 1); const d = new THREE.Vector3(random('hx' + i) - 0.5, random('hy' + i) - 0.5, random('hz' + i) - 0.5).normalize().multiplyScalar(0.12 + t * 0.7);
      return <Brilho key={i} pos={[0.9 + d.x, 1.1 + d.y, d.z]} s={0.05 * (1 - t)} cor="#ffe0a0" o={1 - t} />; })}
    <Pos bloom={1.3} /></>;
}}</C3>;
// 12 · quanto menor, mais rápido vaza: três buracos negros, o menor solta faíscas mais depressa
const S12: React.FC = () => <C3>{(f) => <>
  <Cam pos={[interpolate(f, [0, 50], [-0.6, 0.6]), 0.3, 4.4]} alvo={[0, 0.3, 0]} /><ambientLight intensity={0.3} /><Estrelas sem="b12" />
  {[{x: 0, y: 1.05, r: 0.24, v: 0.006, n: 8}, {x: 0, y: 0.25, r: 0.13, v: 0.02, n: 24}, {x: 0, y: -0.4, r: 0.06, v: 0.06, n: 60}].map((b, j) => <group key={j} position={[0, b.y, 0]}>
    <BN pos={[b.x, 0, 0]} r={b.r} f={f} />
    {Array.from({length: b.n}, (_, i) => { const t = ((f * b.v + random('lk' + j + '_' + i)) % 1); const d = new THREE.Vector3(random('lx' + j + i) - 0.5, random('ly' + j + i) - 0.5, random('lz' + j + i) - 0.5).normalize().multiplyScalar(b.r * 1.3 + t * 0.6);
      return <Brilho key={i} pos={[b.x + d.x, d.y, d.z]} s={0.05 * (1 - t)} cor="#ffe0a0" o={1 - t} />; })}
  </group>)}
  <Pos bloom={1.3} /></>}</C3>;
// 13 · o Everest encolhendo
const montanha = (() => { const g = new THREE.ConeGeometry(1.4, 1.6, 9, 6); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const y = p.getY(i); if (y < 0.79) { p.setX(i, p.getX(i) * (0.85 + random('mo' + i) * 0.3)); p.setZ(i, p.getZ(i) * (0.85 + random('mq' + i) * 0.3)); } }
  g.computeVertexNormals(); return g; })();
const S13: React.FC = () => <C3>{(f) => {
  const s = interpolate(f, [10, 70], [1, 0.02], {...cl, easing: (t) => t * t});
  return <><Cam pos={[0, 0.9, 4.2]} alvo={[0, 0.4, 0]} /><Luzes sol={[-3, 4, 2]} amb={0.35} /><color attach="background" args={['#5a7ab0']} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#4a5a4a" /></mesh>
    <group scale={s} position={[0, 0.8 * s, 0]}><mesh geometry={montanha}><meshStandardMaterial color="#6a6460" flatShading roughness={1} /></mesh>
      <mesh position={[0, 0.55, 0]} scale={[0.36, 0.3, 0.36]} geometry={montanha}><meshStandardMaterial color="#f4f6fa" flatShading /></mesh></group>
    <Pos bloom={0.5} /></>;
}}</C3>;
// 14 · menor que um átomo: o átomo com elétrons e o ponto negro ainda menor no meio
const S14: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.4, interpolate(f, [0, 40], [3.2, 1.8])]} alvo={[0, 0, 0]} /><ambientLight intensity={0.4} /><color attach="background" args={['#04060e']} />
  <mesh><sphereGeometry args={[0.12, 24, 24]} /><meshStandardMaterial color="#ff6a4a" emissive="#ff4a2a" emissiveIntensity={0.8} /></mesh>
  {[0, 1, 2].map((i) => <group key={i} rotation={[i * 1.05, i * 0.7, 0]}>
    <mesh><torusGeometry args={[0.8, 0.006, 8, 96]} /><meshBasicMaterial color="#6ab0ff" transparent opacity={0.6} /></mesh>
    <mesh position={[Math.cos(f * 0.12 + i * 2) * 0.8, Math.sin(f * 0.12 + i * 2) * 0.8, 0]}><sphereGeometry args={[0.035, 12, 12]} /><meshBasicMaterial color="#9fd0ff" /></mesh></group>)}
  <BN pos={[0.35, 0.3, 0.3]} r={0.012} f={f} />
  <Pos bloom={1.2} /></>}</C3>;
// 15 · dura mais que a idade do universo: ampulheta cósmica com galáxias girando dentro
const S15: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f / 30) * 2.6, 0.4, Math.cos(f / 30) * 2.6]} alvo={[0, 0, 0]} /><Luzes amb={0.4} /><Estrelas sem="b15" />
  {[1, -1].map((s) => <mesh key={s} position={[0, s * 0.55, 0]} rotation={[s > 0 ? 0 : Math.PI, 0, 0]}><coneGeometry args={[0.55, 1.1, 32, 1, true]} /><meshStandardMaterial color="#cfe8ff" transparent opacity={0.25} side={THREE.DoubleSide} /></mesh>)}
  {[1.1, -1.1].map((y) => <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[0.65, 0.65, 0.06, 32]} /><meshStandardMaterial color="#8a6a3a" /></mesh>)}
  {Array.from({length: 120}, (_, i) => { const a = random('ga' + i) * Math.PI * 2 + f * 0.04, r = random('gr' + i) * 0.4, y = 0.25 + random('gy' + i) * 0.6; return <Brilho key={i} pos={[Math.cos(a) * r * (1 - (y - 0.25)), y, Math.sin(a) * r * (1 - (y - 0.25))]} s={0.04} cor={i % 3 ? '#cfe0ff' : '#ffd8a0'} />; })}
  {Array.from({length: 120}, (_, i) => { const a = random('gb' + i) * Math.PI * 2 - f * 0.03, r = random('gs' + i) * 0.45, y = -0.3 - random('gt' + i) * 0.6; return <Brilho key={'b' + i} pos={[Math.cos(a) * r, y, Math.sin(a) * r]} s={0.04} cor={i % 3 ? '#cfe0ff' : '#ffd8a0'} />; })}
  <Pos bloom={1.2} /></>}</C3>;
// 16 · gravidade mil vezes maior: carteiras esmagadas contra o chão em volta do ponto (câmera no nível do chão)
const S16: React.FC = () => <C3>{(f) => {
  const k = pr(f, 8, 30, (t) => t * t);
  return <><Cam pos={[0.3, 1.0, 1.5]} alvo={[0, 0.15, -0.4]} tremor={0.03 * k} /><Luzes sol={[2, 4, 3]} i={1.6} amb={0.45} />
    <Sala lousa={false} esmaga={(x, z) => k * Math.max(0, 1 - Math.hypot(x, z + 0.4) / 2)} />
    <BN pos={[0, 0.15, -0.4]} r={0.06} f={f} brilho={1.6} />
    <Pos bloom={0.9} /></>;
}}</C3>;
// 17 · ele atravessa o chão e cai para dentro do planeta: corte com crosta, manto e núcleo
const S17: React.FC = () => <C3>{(f) => {
  const y = interpolate(f, [0, 75], [1.25, -0.2], {...cl, easing: (t) => t * t});
  return <><Cam pos={[0, 0.4, 3.4]} alvo={[0, 0.3, 0]} /><Luzes sol={[2, 3, 4]} amb={0.5} /><color attach="background" args={['#06080e']} />
    {[{r: 1.2, c: '#5a4a3a'}, {r: 1.12, c: '#c85a20'}, {r: 0.6, c: '#ffa040'}, {r: 0.25, c: '#fff0b0'}].map((l, i) => <mesh key={i} position={[0, 0, -0.01 * i]}><circleGeometry args={[l.r, 64]} /><meshStandardMaterial color={l.c} emissive={l.c} emissiveIntensity={i > 0 ? 0.4 : 0} /></mesh>)}
    <mesh position={[0, 1.24, 0.02]}><boxGeometry args={[0.5, 0.03, 0.02]} /><meshStandardMaterial color="#8a7a66" /></mesh>
    <BN pos={[0, y, 0.05]} r={0.04} f={f} />
    <Pos bloom={1} /></>;
}}</C3>;
// 18 · a Terra inteira do tamanho de uma uva: a Terra encolhendo ao lado de uma uva
const S18: React.FC = () => <C3>{(f, tex) => {
  const r = interpolate(f, [6, 70], [1.1, 0.13], {...cl, easing: (t) => 1 - (1 - t) ** 2});
  return <><Cam pos={[0, 0.2, 2.6]} alvo={[0, 0, 0]} /><Luzes sol={[2, 2, 3]} amb={0.35} /><Estrelas sem="b18" />
    <Terra tex={tex} r={r} pos={[-0.25, 0, 0]} rot={[0.3, f * 0.01, 0]} />
    <mesh position={[0.45, 0, 0]} scale={[0.13, 0.16, 0.13]}><sphereGeometry args={[1, 32, 32]} /><meshPhysicalMaterial color="#5a2a6a" roughness={0.25} clearcoat={1} /></mesh>
    <mesh position={[0.45, 0.17, 0]}><cylinderGeometry args={[0.008, 0.008, 0.08, 6]} /><meshStandardMaterial color="#4a6a2a" /></mesh>
    <Pos bloom={0.7} /></>;
}}</C3>;
// 19 · 560 Terrinhas caindo num funil até um buraco negro do tamanho da sala (câmera de cima)
const S19: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 4.2, 1.6]} alvo={[0, 0, 0]} /><Luzes sol={[2, 5, 2]} amb={0.4} /><Estrelas sem="b19" />
  <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[2.2, 0.35, 1.6, 48, 1, true]} /><meshStandardMaterial color="#3a4a6a" transparent opacity={0.25} side={THREE.DoubleSide} /></mesh>
  <BN pos={[0, -1.0, 0]} r={0.35} f={f} />
  {Array.from({length: 560}, (_, i) => { const t = ((f * 0.008 + i / 560) % 1); const a = i * 2.39 + t * 6; const r = 2.1 * (1 - t) + 0.3; if (f < i * 0.12) return null;
    return <mesh key={i} position={[Math.cos(a) * r, 0.6 - t * 1.6, Math.sin(a) * r]}><sphereGeometry args={[0.035, 8, 8]} /><meshStandardMaterial map={tex.dia} /></mesh>; })}
  <Pos bloom={0.9} /></>}</C3>;
// 20 · não sobra nem o Sistema Solar: as órbitas sendo puxadas em espiral (câmera recuando)
const S20: React.FC = () => <C3>{(f) => {
  const k = pr(f, 0, 55);
  return <><Cam pos={[0, interpolate(f, [0, 60], [2.5, 4.5]), interpolate(f, [0, 60], [3, 5])]} alvo={[0, 0, 0]} /><ambientLight intensity={0.4} /><Estrelas sem="b20" />
    <BN pos={[0, 0, 0]} r={0.3} f={f} />
    {[0.7, 1.0, 1.35, 1.75, 2.2, 2.7].map((R, i) => { const cor = ['#b0a090', '#e8c27a', '#4c8cf0', '#d0603a', '#d8b088', '#e8d090'][i];
      return <group key={i}>{Array.from({length: 30}, (_, j) => { const a = j / 30 * Math.PI * 2 + f * 0.03 * (3 - i * 0.3) + k * 3; const rr = R * (1 - k * 0.8 * (j / 30)); return <Brilho key={j} pos={[Math.cos(a) * rr, 0, Math.sin(a) * rr]} s={0.05} cor={cor} o={0.6} />; })}
        <mesh position={[Math.cos(f * 0.03 * (3 - i * 0.3) + k * 4) * R * (1 - k * 0.85), 0, Math.sin(f * 0.03 * (3 - i * 0.3) + k * 4) * R * (1 - k * 0.85)]}><sphereGeometry args={[0.05 + i * 0.012, 16, 16]} /><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={0.3} /></mesh></group>; })}
    <Pos bloom={1.2} /></>;
}}</C3>;
// 21 · o pior: um ponto negro minúsculo passa diante das estrelas, que só se curvam quando ele passa (câmera parada)
const FUNDO = Array.from({length: 500}, (_, i) => new THREE.Vector3((random('fx' + i) - 0.5) * 7, (random('fy' + i) - 0.5) * 12, -4));
const S21: React.FC = () => <C3>{(f) => {
  const p = new THREE.Vector3(interpolate(f, [0, 140], [-2.2, 2.2]), interpolate(f, [0, 140], [1.4, -1.0]), -4);
  return <><Cam pos={[0, 0, 4]} alvo={[0, 0, -4]} /><ambientLight intensity={0.2} />
    {FUNDO.map((s, i) => { const d = s.clone().sub(p); const dist = d.length() + 0.001; const em = 0.5 / dist; const q = s.clone().add(d.normalize().multiplyScalar(Math.min(0.55, em)));
      return <Brilho key={i} pos={[q.x, q.y, q.z]} s={0.08 + random('fs' + i) * 0.06} cor="#e8f0ff" o={0.4 + 0.6 * random('fo' + i)} />; })}
    <mesh position={p}><sphereGeometry args={[0.07, 16, 16]} /><meshBasicMaterial color="#000" /></mesh>
    <mesh position={p}><torusGeometry args={[0.14, 0.012, 8, 64]} /><meshBasicMaterial color="#cfe0ff" transparent opacity={0.7} /></mesh>
    <Pos bloom={1} /></>;
}}</C3>;

// thumb: o buraco negro em cima da carteira e a lousa sendo puxada para dentro dele (quadro fixo)
const LOUSA_FAIXAS = Array.from({length: 14}, (_, i) => i);
export const ThumbCena: React.FC = () => <C3>{() => {
  const alvo = new THREE.Vector3(0, 0.72, -0.2);
  return <><Cam pos={[0.6, 1.7, 3.4]} alvo={[0, 0.95, -0.9]} /><Luzes sol={[2, 4, 3]} i={1.6} amb={0.4} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[8, 8]} /><meshStandardMaterial color="#8a7a66" roughness={0.8} /></mesh>
    <mesh position={[0, 1.5, -2.6]}><planeGeometry args={[8, 3]} /><meshStandardMaterial color="#d8d2c4" /></mesh>
    {LOUSA_FAIXAS.map((i) => { const x0 = -1.4 + (i + 0.5) * 0.2; const base = new THREE.Vector3(x0, 1.5, -2.57); const k = 0.15 + 0.6 * Math.pow(1 - Math.abs(x0) / 1.5, 2);
      const q = base.clone().lerp(alvo, k); const ang = Math.atan2(alvo.x - base.x, -(alvo.z - base.z));
      return <group key={i}><mesh position={q} rotation={[0.5 * k, ang * k, (i - 6.5) * 0.06 * k]} scale={[1 - 0.5 * k, 1 - 0.4 * k, 1]}><boxGeometry args={[0.2, 1.2, 0.02]} /><meshStandardMaterial color="#1e3a2a" /></mesh>
        <mesh position={[q.x, q.y + 0.62 * (1 - 0.4 * k), q.z]} rotation={[0.5 * k, ang * k, 0]}><boxGeometry args={[0.2, 0.06, 0.04]} /><meshStandardMaterial color="#6a4a2a" /></mesh></group>; })}
    {Array.from({length: 40}, (_, i) => { const t = random('gz' + i); const a = random('ga' + i) * Math.PI * 2; const r = 0.15 + t * 1.2;
      return <Brilho key={i} pos={[alvo.x + Math.cos(a) * r, alvo.y + Math.sin(a) * r * 0.6, alvo.z - t * 1.5]} s={0.04} cor="#ffffff" o={0.9 - t * 0.5} />; })}
    {[[-0.95, 0.3], [0.95, 0.3], [-0.95, -0.7], [0.95, -0.7], [0, -0.7]].map(([x, z], i) => <Carteira key={i} pos={[x, 0, z]} rot={Math.atan2(-x, -(z + 0.2)) * 0.3} esmaga={0.15} />)}
    <Carteira pos={[0, 0, -0.2]} esmaga={0.25} />
    <BN pos={[alvo.x, alvo.y + 0.06, alvo.z]} r={0.11} f={8} brilho={1.6} />
    <Pos bloom={1.1} /></>;
}}</C3>;
const PLANO: K.Plano = [
  ['um buraco negro acaba', S1],
  ['e o que vai matar', S2],
  ['depende de uma coisa', S3],
  ['se ele pesar', S4],
  ['some antes de voce', S5],
  ['so que ao sumir', S6],
  ['umas catorze bombas', S7],
  ['a escola inteira', S8],
  ['com o peso de uma pessoa', S9],
  ['a explosao vale', S10],
  ['por que', S11],
  ['e quanto menor', S12],
  ['agora com o peso', S13],
  ['fica menor que', S14],
  ['e dura mais', S15],
  ['mas a um metro', S16],
  ['ele atravessa o chao', S17],
  ['com o peso da terra', S18],
  ['e pra ser do tamanho', S19],
  ['ai nao sobra', S20],
  ['e o pior', S21],
];
const S = K.criarShort(W, PLANO, 'bnsala/narracao.mp3', 'e o pior', undefined, {legenda: 56});
export const Video = S.Video;
export const DURACAO = S.DURACAO;
void geoPedra;
