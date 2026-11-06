// Short "O DIA em que TODOS os VULCÕES do mundo ACORDAM (e o Brasil?)". Roteiro short_todos_vulcoes.md (v1), aprovado pelo dono em 06/11. TODO em Remotion 3D.
// Voz Brian. Não é POV. Cuidados: "potencialmente ativos" ≠ "em erupção"; Brasil "não tem vulcão em erupção"; "dezenas a cem vezes"; sem Toba, Yellowstone, Kikai; sem pessoas no Laki.
import React from 'react';
import {AbsoluteFill, Freeze, interpolate, random, useCurrentFrame} from 'remotion';
import {Palavra, FONTE, OURO, VERMELHO, CIANO, VERDE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Terra, Luzes, Pos, Brilho, Nuvem, capaMat, pr, cl, THREE} from '../lote/kit3d';
import palavras from './vulcoes.palavras.json';

const W = palavras as Palavra[];
const Grande: React.FC<{t: string; y: number; cor?: string; s?: number; o?: number}> = ({t, y, cor = '#fff', s = 110, o = 1}) => (
  <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: s, color: cor, opacity: o, WebkitTextStroke: '7px #000', paintOrder: 'stroke fill', textShadow: '0 8px 30px rgba(0,0,0,.8)', padding: '0 40px', boxSizing: 'border-box'}}>{t}</div>
);
const LAVA = '#ff5a14';
const dirLL = (lat: number, lon: number) => { const phi = (lon + 180) / 180 * Math.PI, th = (90 - lat) / 180 * Math.PI; return new THREE.Vector3(-Math.cos(phi) * Math.sin(th), Math.cos(th), Math.sin(phi) * Math.sin(th)); };
// vulcões "reais" aproximados (anel de fogo e outros) para os pontos no globo
const PONTOS = Array.from({length: 160}, (_, i) => {
  const t = random('vt' + i);
  if (i < 110) { const a = t * Math.PI * 1.6 + 0.2; return dirLL(Math.sin(a) * 55 + (random('vy' + i) - 0.5) * 8, 120 + Math.cos(a) * 70 + (random('vx' + i) - 0.5) * 8); }
  return dirLL((random('va' + i) - 0.5) * 120, (random('vb' + i) - 0.5) * 360);
});
const Cone: React.FC<{pos?: [number, number, number]; s?: number; cor?: string}> = ({pos = [0, 0, 0], s = 1, cor = '#3a3230'}) => (
  <group position={pos} scale={s}>
    <mesh position={[0, 0.5, 0]}><coneGeometry args={[1.2, 1, 48, 1, true]} /><meshStandardMaterial color={cor} roughness={1} flatShading side={THREE.DoubleSide} /></mesh>
    <mesh position={[0, 0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.07, 24]} /><meshStandardMaterial color={LAVA} emissive={LAVA} emissiveIntensity={3} /></mesh>
  </group>
);
const Chao: React.FC<{cor?: string; y?: number}> = ({cor = '#2a2422', y = 0}) => <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color={cor} roughness={1} /></mesh>;
const Jato: React.FC<{f: number; sem: string; base: THREE.Vector3; n?: number; altura?: number; cor?: string; tam?: number}> = ({f, sem, base, n = 120, altura = 1.6, cor = '#ffb060', tam = 0.07}) => (
  <group>{Array.from({length: n}, (_, i) => { const t = ((f * 0.02 + random(sem + 't' + i)) % 1); const a = random(sem + 'a' + i) * Math.PI * 2, r = random(sem + 'r' + i) * 0.25 * t;
    return <Brilho key={i} pos={[base.x + Math.cos(a) * r, base.y + t * altura, base.z + Math.sin(a) * r]} s={tam * (1 - t * 0.6)} cor={cor} o={1 - t} />; })}</group>
);

// 1 · agora, neste segundo: fonte de lava num respiradouro, de perto
const S1: React.FC = () => <C3 t="AGORA, NESTE SEGUNDO…" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 0.5, 2.2]} alvo={[0, 0.5, 0]} /><Luzes sol={[2, 3, 2]} i={0.6} amb={0.05} />
  <Chao cor="#1a1414" />
  <Jato f={f} sem="j1" base={new THREE.Vector3(0, 0, 0)} n={220} altura={1.4} tam={0.09} />
  <pointLight position={[0, 0.4, 0.3]} color={LAVA} intensity={6} distance={4} />
  <Pos bloom={1.6} /></>}</C3>;
// 2 · dezenas em erupção: globo com pontos vermelhos piscando
const S2: React.FC = () => <AbsoluteFill><C3 t="DEZENAS EM ERUPÇÃO AGORA" etq="ANIMAÇÃO 3D">{(f, tex) => <>
  <Cam pos={[Math.sin(f / 40) * 0.8, 0.4, 3.4]} /><Luzes sol={[3, 1, 3]} /><Estrelas sem="v2" />
  <group rotation={[0.3, f * 0.008 + 2.6, 0]}><Terra tex={tex} rot={[0, 0, 0]} />
    {PONTOS.slice(0, 45).map((p, i) => <Brilho key={i} pos={[p.x * 1.02, p.y * 1.02, p.z * 1.02]} s={0.09 + 0.05 * Math.sin(f / 3 + i)} cor="#ff3a20" />)}</group>
  <Pos /></>}</C3></AbsoluteFill>;
// 3 · e se fossem todos? o globo inteiro aceso, com o céu cinza
const S3: React.FC = () => <AbsoluteFill><C3 t="E SE FOSSEM TODOS?" etq="ANIMAÇÃO 3D">{(f, tex) => <>
  <Cam pos={[0, 0, 3.1]} tremor={0.03} /><Luzes sol={[3, 1, 3]} i={1.2} /><Estrelas sem="v3" />
  <group rotation={[0.3, f * 0.01 + 0.4, 0]}><Terra tex={tex} rot={[0, 0, 0]} />
    {PONTOS.map((p, i) => <Brilho key={i} pos={[p.x * 1.02, p.y * 1.02, p.z * 1.02]} s={0.12} cor="#ff6a20" o={pr(f, i * 0.2, i * 0.2 + 4)} />)}</group>
  <mesh scale={1.06}><sphereGeometry args={[1, 64, 64]} /><meshStandardMaterial color="#8a8070" transparent opacity={0.35 * pr(f, 10, 36)} depthWrite={false} /></mesh>
  <Pos bloom={1.3} /></>}</C3></AbsoluteFill>;
// 4 · arco de vulcões no Pacífico em relevo, com 1.350 pinos subindo do chão
const relevo = (() => { const g = new THREE.PlaneGeometry(10, 10, 100, 100); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); const arco = Math.exp(-((Math.hypot(x + 3, y - 3) - 5) ** 2) * 1.5); p.setZ(i, arco * 0.6 + 0.08 * Math.sin(x * 2.3) * Math.cos(y * 1.7)); }
  g.computeVertexNormals(); return g; })();
const S4: React.FC = () => <AbsoluteFill><C3 t="~1.350 VULCÕES" sub="POTENCIALMENTE ATIVOS (USGS)" etq="ANIMAÇÃO 3D · MAPA ILUSTRATIVO">{(f) => <>
  <Cam pos={[interpolate(f, [0, 120], [2.5, -1]), 1.0, 3.2]} alvo={[0, 0, -0.5]} /><Luzes sol={[2, 4, 1]} amb={0.25} />
  <mesh geometry={relevo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}><meshStandardMaterial color="#4a5a3a" roughness={1} flatShading /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}><planeGeometry args={[10, 10]} /><meshStandardMaterial color="#1a3a6a" transparent opacity={0.7} /></mesh>
  {Array.from({length: 220}, (_, i) => { const a = random('pa' + i) * Math.PI * 0.9 + Math.PI * 1.1; const R = 5 + (random('pr' + i) - 0.5) * 0.7; const x = -3 + Math.cos(a) * R, z = -(3 + Math.sin(a) * R);
    const s = pr(f, i * 0.4, i * 0.4 + 8); if (Math.abs(x) > 5 || Math.abs(z) > 5) return null;
    return <mesh key={i} position={[x, -0.3 + 0.12 * s, z]} scale={s}><coneGeometry args={[0.05, 0.22, 8]} /><meshStandardMaterial color={VERMELHO} emissive={LAVA} emissiveIntensity={0.8} /></mesh>; })}
  <Pos bloom={0.9} /></>}</C3></AbsoluteFill>;
// 5 · sem contar os do fundo do mar: fendas brilhando sob a água
const S5: React.FC = () => <AbsoluteFill><C3 t="SEM CONTAR OS DO FUNDO DO MAR" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 0.4, 3]} alvo={[0, -0.4, 0]} /><ambientLight intensity={0.25} color="#4a8ac0" /><color attach="background" args={['#031426']} /><fog attach="fog" args={['#031426', 2, 9]} />
  <Chao cor="#1a2630" y={-0.8} />
  {[[-1, -0.6], [0.4, -1.4], [1.3, -0.4]].map(([x, z], i) => <group key={i}><Cone pos={[x, -0.8, z]} s={0.35} cor="#20262a" /><Jato f={f + i * 20} sem={'s5' + i} base={new THREE.Vector3(x, -0.45, z)} n={60} altura={1.6} cor="#cfe8ff" tam={0.05} /></group>)}
  <pointLight position={[0, -0.3, -0.6]} color={LAVA} intensity={3} distance={3} />
  <Pos bloom={1.2} /></>}</C3></AbsoluteFill>;
// 6 · basta olhar pra um só: a câmera chega num único vulcão
const S6: React.FC = () => <AbsoluteFill><C3 t="BASTA OLHAR PRA UM SÓ" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, interpolate(f, [0, 75], [1.6, 0.9]), interpolate(f, [0, 75], [6, 3.4])]} alvo={[0, 0.5, 0]} /><Luzes sol={[-3, 4, 2]} amb={0.2} /><Estrelas sem="v6" />
  <Chao cor="#3a3a30" /><Cone s={1.2} />
  <Jato f={f} sem="j6" base={new THREE.Vector3(0, 1.2, 0)} n={50} altura={0.6} cor="#9a9088" tam={0.15} />
  <Pos bloom={0.8} /></>}</C3></AbsoluteFill>;
// 7 · Pinatubo 1991: coluna de cinza subindo até a estratosfera
const S7: React.FC = () => <AbsoluteFill><C3 t="PINATUBO · 1991" sub="FILIPINAS" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, interpolate(f, [0, 100], [0.8, 3.0]), 5.5]} alvo={[0, interpolate(f, [0, 100], [0.8, 3.2]), 0]} /><Luzes sol={[-3, 4, 2]} amb={0.3} /><color attach="background" args={['#5a7aa0']} />
  <Chao cor="#3a4a30" /><Cone s={1.1} cor="#4a4238" />
  {Array.from({length: 140}, (_, i) => { const t = Math.min(1, (f * 0.012 + random('c7' + i) * 0.6)); const h = 1.1 + t * 4.2; const r = 0.15 + t * (0.6 + (h > 4 ? (h - 4) * 1.6 : 0)) * random('cr' + i);
    const a = random('ca' + i) * Math.PI * 2;
    return <mesh key={i} position={[Math.cos(a) * r, h, Math.sin(a) * r]} scale={0.25 + t * 0.5}><sphereGeometry args={[1, 10, 10]} /><meshStandardMaterial color="#8a8078" roughness={1} transparent opacity={0.85} /></mesh>; })}
  <Pos bloom={0.4} /></>}</C3></AbsoluteFill>;
// 8 · 20 milhões de toneladas de enxofre: faixa amarela espalhando em volta do globo
const S8: React.FC = () => <AbsoluteFill><C3 t="~20 MI DE TONELADAS DE SO₂" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const k = pr(f, 0, 80);
  return <><Cam pos={[0, 0.2, 3.3]} /><Luzes sol={[3, 1, 3]} /><Estrelas sem="v8" />
    <Terra tex={tex} rot={[0.3, f * 0.006 + 2.4, 0]} />
    <mesh rotation={[Math.PI / 2 - 0.3, 0, f * 0.01]}><torusGeometry args={[1.05, 0.06 + 0.25 * k, 16, 96, Math.PI * 2 * Math.max(0.05, k)]} /><meshStandardMaterial color="#e8d060" transparent opacity={0.45} depthWrite={false} /></mesh>
    <Pos /></>;
}}</C3></AbsoluteFill>;
// 9 · o planeta esfriou meio grau: termômetro 3D descendo diante da Terra
const S9: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="O PLANETA ESFRIOU" etq="ANIMAÇÃO 3D">{(fr, tex) => {
    const h = 1.4 - 0.5 * pr(fr, 8, 60);
    return <><Cam pos={[0, 0, 4.2]} /><Luzes sol={[3, 1, 3]} amb={0.3} /><Estrelas sem="v9" />
      <Terra tex={tex} r={1.1} pos={[0.5, -0.6, -1.5]} rot={[0.3, 1, 0]} />
      <mesh position={[-0.9, 0.3, 0]}><cylinderGeometry args={[0.13, 0.13, 2.2, 24]} /><meshStandardMaterial color="#e8eef8" transparent opacity={0.5} /></mesh>
      <mesh position={[-0.9, -0.8, 0]}><sphereGeometry args={[0.25, 24, 24]} /><meshStandardMaterial color={CIANO} emissive={CIANO} emissiveIntensity={0.6} /></mesh>
      <mesh position={[-0.9, -0.8 + h / 2, 0]}><cylinderGeometry args={[0.07, 0.07, h, 16]} /><meshStandardMaterial color={CIANO} emissive={CIANO} emissiveIntensity={0.6} /></mesh>
      <Pos bloom={0.8} /></>;
  }}</C3><Grande t="−0,5 °C" y={1120} s={170} cor={CIANO} o={pr(f, 30, 40)} /><Grande t="POR 2–3 ANOS" y={1310} s={60} /></AbsoluteFill>;
};
// 10 · Laki 1783: fissura longa soltando gás amarelado numa paisagem nórdica (sem pessoas)
const S10: React.FC = () => <AbsoluteFill><C3 t="LAKI · 1783" sub="ISLÂNDIA · 6× MAIS GÁS" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[interpolate(f, [0, 130], [-2.5, 2.5]), 0.7, 2.8]} alvo={[0, 0.2, 0]} /><Luzes sol={[-2, 2, 3]} i={0.8} amb={0.3} /><color attach="background" args={['#6a6a58']} /><fog attach="fog" args={['#6a6a58', 3, 12]} />
  <Chao cor="#3a4038" />
  {Array.from({length: 18}, (_, i) => <mesh key={i} position={[-4 + i * 0.5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0.1 * Math.sin(i)]}><planeGeometry args={[0.55, 0.08]} /><meshStandardMaterial color={LAVA} emissive={LAVA} emissiveIntensity={2.5} /></mesh>)}
  <Nuvem n={600} sem="l10" origem={new THREE.Vector3(0, 0.6, 0)} t={f + 40} raio={4} cor="#d8c870" tam={0.25} o={0.35} />
  {[-3, -1.5, 2.2, 3.6].map((x, i) => <mesh key={i} position={[x, 0.4, -3 - i]}><coneGeometry args={[1.2, 1, 6]} /><meshStandardMaterial color="#4a5048" flatShading /></mesh>)}
  <Pos bloom={0.9} /></>}</C3></AbsoluteFill>;
// 11 · a Islândia perdeu um quarto da população: vila de casinhas vazias, com contador
const S11: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [8, 70], [48884, 38363], cl));
  return <AbsoluteFill><C3 t="UM QUARTO DA POPULAÇÃO" etq="ANIMAÇÃO 3D">{(fr) => <>
    <Cam pos={[0, 1.6, 4]} alvo={[0, 0, 0]} /><Luzes sol={[-2, 3, 2]} i={0.8} amb={0.35} /><color attach="background" args={['#5a5a52']} /><fog attach="fog" args={['#5a5a52', 3, 11]} />
    <Chao cor="#4a5040" />
    {Array.from({length: 16}, (_, i) => { const x = (i % 4) - 1.5, z = Math.floor(i / 4) - 1.5; const apaga = i % 4 === 0 && fr > 20 + i * 2;
      return <group key={i} position={[x * 0.9, 0, z * 0.9]}><mesh position={[0, 0.18, 0]}><boxGeometry args={[0.4, 0.36, 0.4]} /><meshStandardMaterial color={apaga ? '#5a5a58' : '#d8d0c0'} /></mesh>
        <mesh position={[0, 0.45, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.34, 0.25, 4]} /><meshStandardMaterial color={apaga ? '#4a3a30' : '#a0402a'} /></mesh></group>; })}
    <Pos bloom={0.4} /></>}</C3><Grande t={n.toLocaleString('pt-BR')} y={1130} s={150} cor={OURO} /><Grande t="HABITANTES" y={1300} s={56} /></AbsoluteFill>;
};
// 12 · Sibéria, 252 milhões de anos: planícies com rios de lava
const lavaPl = capaMat('lava');
const S12: React.FC = () => <AbsoluteFill><C3 t="SIBÉRIA · 252 MI DE ANOS" sub="ERUPÇÕES QUE DURARAM MILÊNIOS" etq="ANIMAÇÃO 3D">{(f) => {
  lavaPl.uniforms.uC.value = new THREE.Vector3(0, 1, 0); lavaPl.uniforms.uR.value = 4; lavaPl.uniforms.uT.value = f; lavaPl.uniforms.uK.value = 1;
  return <><Cam pos={[0, interpolate(f, [0, 130], [3.5, 2.2]), 4]} alvo={[0, 0, -1]} /><Luzes sol={[-2, 3, 2]} i={0.5} amb={0.1} /><color attach="background" args={['#1a0c08']} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} scale={6}><sphereGeometry args={[1, 128, 64, 0, Math.PI * 2, 0, 0.5]} /><meshStandardMaterial color="#1a1210" /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} scale={6.02} material={lavaPl}><sphereGeometry args={[1, 160, 80, 0, Math.PI * 2, 0, 0.5]} /></mesh>
    <Pos bloom={1.3} /></>;
}}</C3></AbsoluteFill>;
// 13 · ~90% da vida no mar: corais 3D se apagando
const S13: React.FC = () => <AbsoluteFill><C3 t="~90% DA VIDA NO MAR" etq="ANIMAÇÃO 3D">{(f) => {
  const k = pr(f, 10, 70);
  return <><Cam pos={[0, 0.3, 2.8]} alvo={[0, -0.3, 0]} /><ambientLight intensity={0.4} color="#6aa0d0" /><directionalLight position={[0, 4, 2]} intensity={1.2} /><color attach="background" args={['#04203a']} /><fog attach="fog" args={['#04203a', 2, 8]} />
    <Chao cor="#c8b890" y={-0.8} />
    {Array.from({length: 40}, (_, i) => { const x = (random('kx' + i) - 0.5) * 4, z = -random('kz' + i) * 3; const cor = new THREE.Color(['#ff6a8a', '#ffa040', '#a060ff', '#40d0c0'][i % 4]).lerp(new THREE.Color('#d8d8d0'), i % 10 < 9 ? k : 0);
      return <mesh key={i} position={[x, -0.8 + 0.2, z]} rotation={[random('kr' + i), random('ks' + i), 0]}><torusKnotGeometry args={[0.1, 0.035, 48, 8]} /><meshStandardMaterial color={cor} roughness={0.8} /></mesh>; })}
    <Pos bloom={0.6} /></>;
}}</C3></AbsoluteFill>;
// 14 · e o Brasil? globo virado para a América do Sul, com o Brasil em destaque
const brasil = capaMat('disco');
const S14: React.FC = () => <AbsoluteFill><C3 t="E O BRASIL?" sub="NÃO TEM VULCÃO EM ERUPÇÃO" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const c = dirLL(-12, -52); brasil.uniforms.uC.value = c; brasil.uniforms.uR.value = 0.3 * pr(f, 4, 20); brasil.uniforms.uK.value = 0.8;
  return <><Cam pos={[0, 0, interpolate(f, [0, 60], [3.6, 2.8])]} /><Luzes sol={[1, 1, 4]} amb={0.25} /><Estrelas sem="v14" />
    <group rotation={[Math.asin(c.y) * 0.9, -Math.atan2(c.x, c.z), 0]}><Terra tex={tex} nuvens={false} rot={[0, 0, 0]} /><mesh material={brasil}><sphereGeometry args={[1.006, 128, 128]} /></mesh></group>
    <Pos bloom={0.6} /></>;
}}</C3></AbsoluteFill>;
// 15 · mas sentiria o frio e a safra perdida: plantação murchando com geada
const S15: React.FC = () => <AbsoluteFill><C3 t="SENTIRIA O FRIO" sub="E A SAFRA PERDIDA" etq="ANIMAÇÃO 3D">{(f) => {
  const k = pr(f, 6, 55);
  return <><Cam pos={[0, 0.9, 3]} alvo={[0, 0.1, -1]} /><Luzes sol={[2, 3, 2]} i={1.6 - k} amb={0.3} /><color attach="background" args={[new THREE.Color('#8ac0e8').lerp(new THREE.Color('#5a6a7a'), k)]} />
    <Chao cor="#5a4a30" />
    {Array.from({length: 120}, (_, i) => { const x = (i % 12) * 0.35 - 2, z = -Math.floor(i / 12) * 0.4 + 0.5; const cor = new THREE.Color('#4aa040').lerp(new THREE.Color('#8a7a50'), k);
      return <mesh key={i} position={[x, 0.25, z]} rotation={[0, 0, (random('pl' + i) - 0.5) * 0.3 + k * 0.9 * (random('pm' + i) > 0.5 ? 1 : -1)]}><coneGeometry args={[0.06, 0.5, 6]} /><meshStandardMaterial color={cor} /></mesh>; })}
    {Array.from({length: 120}, (_, i) => <Brilho key={'n' + i} pos={[(random('nx' + i) - 0.5) * 5, 2.5 - ((f * 0.02 + random('ny' + i) * 3) % 3), -random('nz' + i) * 4 + 1]} s={0.04} cor="#ffffff" o={k} />)}
    <Pos bloom={0.5} /></>;
}}</C3></AbsoluteFill>;
// 16 · cada vulcão tem a sua câmara de magma: corte de dois vulcões lado a lado
const S16: React.FC = () => <AbsoluteFill><C3 t="TODOS AO MESMO TEMPO? IMPOSSÍVEL" etq="ANIMAÇÃO 3D · CORTE">{(f) => <>
  <Cam pos={[0, 0.2, 4.6]} alvo={[0, -0.4, 0]} /><Luzes sol={[2, 3, 4]} amb={0.4} />
  <mesh position={[0, -1.5, -0.3]}><boxGeometry args={[6, 2.6, 0.4]} /><meshStandardMaterial color="#5a4a3a" roughness={1} /></mesh>
  {[-1.2, 1.2].map((x, i) => <group key={i}>
    <mesh position={[x, 0.3, 0]}><coneGeometry args={[0.9, 0.9, 4]} /><meshStandardMaterial color="#4a3a30" flatShading /></mesh>
    <mesh position={[x, -1.6, 0]} scale={[0.55, 0.32, 0.3]}><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color={LAVA} emissive={LAVA} emissiveIntensity={1.2 + 0.3 * Math.sin(f / 5 + i)} /></mesh>
    <mesh position={[x, -0.6, 0]}><cylinderGeometry args={[0.05, 0.08, 1.6, 12]} /><meshStandardMaterial color={LAVA} emissive={LAVA} emissiveIntensity={1} /></mesh>
  </group>)}
  <Pos bloom={1} /></>}</C3><Grande t="CADA UM COM A SUA CÂMARA DE MAGMA" y={1150} s={58} cor={OURO} /></AbsoluteFill>;
// 17 · 1 chance em 6: dado 3D rolando e parando no 1
const S17: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="O RISCO REAL" etq="ANIMAÇÃO 3D">{(fr) => {
    const k = pr(fr, 0, 50, (x) => 1 - (1 - x) ** 3);
    return <><Cam pos={[0, 1.6, 3]} alvo={[0, 0, 0]} /><Luzes sol={[2, 4, 2]} amb={0.35} />
      <Chao cor="#1a3a2a" y={-0.4} />
      <group position={[interpolate(k, [0, 1], [-1.5, 0]), -0.4 + 0.4 + Math.abs(Math.sin(k * Math.PI * 3)) * 0.5 * (1 - k), 0]} rotation={[(1 - k) * 9, (1 - k) * 6, 0]}>
        <mesh><boxGeometry args={[0.8, 0.8, 0.8]} /><meshStandardMaterial color="#f4f4f0" roughness={0.3} /></mesh>
        <mesh position={[0, 0.401, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.11, 24]} /><meshStandardMaterial color={VERMELHO} /></mesh>
      </group>
      <Pos bloom={0.4} /></>;
  }}</C3><Grande t="1 EM 6" y={1120} s={190} cor={VERMELHO} o={pr(f, 45, 55)} /><Grande t="NESTE SÉCULO (NATURE, 2022)" y={1330} s={50} o={pr(f, 50, 60)} /></AbsoluteFill>;
};
// 18 · como a que trouxe o ano sem verão: neve caindo sobre um campo verde de verão
const S18: React.FC = () => <AbsoluteFill><C3 t="O ANO SEM VERÃO · 1816" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 0.6, 3.5]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 3, 2]} i={0.6} amb={0.5} /><color attach="background" args={['#6a7480']} /><fog attach="fog" args={['#6a7480', 3, 12]} />
  <Chao cor="#3a6a30" />
  {Array.from({length: 9}, (_, i) => <group key={i} position={[-3 + i * 0.8, 0, -1 - (i % 3)]}><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.05, 0.07, 0.6, 8]} /><meshStandardMaterial color="#4a3020" /></mesh>
    <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.35, 12, 12]} /><meshStandardMaterial color="#3a7a3a" /></mesh><mesh position={[0, 1.0, 0]} scale={[1, 0.4, 1]}><sphereGeometry args={[0.3, 12, 12]} /><meshStandardMaterial color="#f0f4f8" /></mesh></group>)}
  {Array.from({length: 300}, (_, i) => <Brilho key={i} pos={[(random('sx' + i) - 0.5) * 6, 3 - ((f * 0.015 + random('sy' + i) * 3.5) % 3.5), -random('sz' + i) * 4 + 1.5]} s={0.05} cor="#ffffff" />)}
  <Pos bloom={0.5} /></>}</C3></AbsoluteFill>;
// 19 · vulcões × humanos: duas colunas de CO₂, uma pequena e uma enorme
const S19: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="E TEM MAIS…" etq="ANIMAÇÃO 3D · USGS/NOAA">{(fr) => {
    const k = pr(fr, 6, 60); const hH = 0.2 + 3.2 * k, hV = 0.1 + 0.05 * k;
    return <><Cam pos={[0, interpolate(fr, [0, 160], [0.8, 1.8]), interpolate(fr, [0, 160], [4.2, 6])]} alvo={[0, 1, 0]} /><Luzes amb={0.35} /><color attach="background" args={['#1a1e26']} />
      <Chao cor="#2a2a2e" />
      <Cone pos={[-1, 0, 0]} s={0.35} />
      <mesh position={[-1, 0.4 + hV / 2, 0]}><cylinderGeometry args={[0.18, 0.18, hV, 24]} /><meshStandardMaterial color="#8a8a90" transparent opacity={0.85} /></mesh>
      {[0.6, 1.0, 1.4].map((x, i) => <mesh key={i} position={[x, 0.35, 0]}><cylinderGeometry args={[0.09, 0.12, 0.7, 16]} /><meshStandardMaterial color="#6a5a50" /></mesh>)}
      <mesh position={[1.0, 0.7 + hH / 2, 0]}><cylinderGeometry args={[0.45, 0.45, hH, 32]} /><meshStandardMaterial color="#8a8a90" transparent opacity={0.85} /></mesh>
      <Pos bloom={0.4} /></>;
  }}</C3><Grande t="VULCÕES        HUMANOS" y={1120} s={56} cor={OURO} /><Grande t="DEZENAS A ~100× MENOS CO₂" y={1220} s={60} cor="#fff" o={pr(f, 40, 50)} /></AbsoluteFill>;
};

const PLANO: K.Plano = [
  ['agora neste segundo', S1],
  ['dezenas de vulcoes', S2],
  ['e se fossem todos', S3],
  ['a terra tem uns', S4],
  ['sem contar os do fundo', S5],
  ['pra entender o estrago', S6],
  ['em 1991 o pinatubo', S7],
  ['jogou uns vinte', S8],
  ['e o planeta inteiro', S9],
  ['em 1783 o laki', S10],
  ['com o gas e a fome', S11],
  ['e ha duzentos', S12],
  ['ajudaram a acabar', S13],
  ['e o brasil', S14],
  ['mas sentiria o frio', S15],
  ['todos ao mesmo tempo', S16],
  ['o risco real', S17],
  ['de uma erupcao gigante', S18],
  ['e tem mais', S19],
];
const S = K.criarShort(W, PLANO, 'vulcoes/narracao.mp3', 'e se fossem todos');
export const Video = S.Video;
export const DURACAO = S.DURACAO;
void VERDE;

export const Thumb: React.FC = () => (
  <AbsoluteFill><Freeze frame={40}><S3 /></Freeze>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center'}}><div style={{padding: '8px 34px', background: VERMELHO, border: '6px solid #000', borderRadius: 16, fontFamily: FONTE, fontSize: 170, color: '#fff', transform: 'rotate(-3deg)'}}>1.350</div></div>
    <div style={{position: 'absolute', top: 1400, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 130, lineHeight: 0.95, color: OURO, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill'}}>VULCÕES<br />ACORDAM</div>
  </AbsoluteFill>
);
