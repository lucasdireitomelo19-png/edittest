// Short "E SE a TERRA fosse um CUBO? Você NÃO ia aguentar o CANTO" (lote 11/11/2026, 3 de 4, aprovado pelo dono). Tudo em Remotion 3D, estilo próprio (nada do Kurzgesagt).
// Na tela (aprovado no roteiro): título do 1º segundo, contador de inclinação no canto e a legenda. Sem selos nem thumb.
// O "mundo cubo" é um shader: a altura de cada ponto é a distância ao centro do cubo menos o raio da face; abaixo de um nível vira lago, depois anel verde, depois rocha seca.
import React from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, pr, cl, THREE, Tex} from '../lote/kit3d';
import {atmM} from '../lote/pangeia3d';
import {NEON} from './Gelo';
import palavras from './cubo.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];

// ---------- cubo ↔ esfera ----------
const N = 48;
const BASE = new THREE.BoxGeometry(2, 2, 2, N, N, N);
const P0 = (BASE.attributes.position as THREE.BufferAttribute).array.slice() as Float32Array;
// uv equiretangular a partir da direção (para a textura da Terra)
const UVT = (() => { const uv = new Float32Array((P0.length / 3) * 2); for (let i = 0; i < P0.length / 3; i++) { const x = P0[i * 3], y = P0[i * 3 + 1], z = P0[i * 3 + 2]; const l = Math.hypot(x, y, z);
  uv[i * 2] = 0.5 + Math.atan2(-z, x) / (2 * Math.PI); uv[i * 2 + 1] = 0.5 + Math.asin(y / l) / Math.PI; } return uv; })();
const GEOS: Record<string, THREE.BufferGeometry> = {};
// k = 0 esfera, 1 cubo
const geoK = (k: number) => { const q = Math.round(k * 40) / 40; const key = String(q); if (GEOS[key]) return GEOS[key];
  const g = BASE.clone(); const p = g.attributes.position as THREE.BufferAttribute; const R = 1.16;
  for (let i = 0; i < p.count; i++) { const x = P0[i * 3], y = P0[i * 3 + 1], z = P0[i * 3 + 2]; const l = Math.hypot(x, y, z); p.setXYZ(i, x * q + (x / l) * R * (1 - q), y * q + (y / l) * R * (1 - q), z * q + (z / l) * R * (1 - q)); }
  g.setAttribute('uv', new THREE.BufferAttribute(UVT, 2)); g.computeVertexNormals(); GEOS[key] = g; return g; };
const TerraCubo: React.FC<{tex: Tex; k: number; rot?: V3}> = ({tex, k, rot = [0.35, 0.6, 0]}) => (
  <mesh geometry={geoK(k)} rotation={rot}><meshStandardMaterial map={tex.dia} roughness={0.85} flatShading={k > 0.9} /></mesh>
);
// mundo cubo: lago no meio de cada face, anel verde, rocha seca e cantos claros
const MUNDO = new THREE.ShaderMaterial({
  uniforms: {uLago: {value: 0.34}, uAgua: {value: 1}, uSol: {value: new THREE.Vector3(0.5, 0.7, 0.6).normalize()}},
  vertexShader: 'varying vec3 vP; varying vec3 vN; void main(){ vP = position; vN = normalize(mat3(modelMatrix)*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
  fragmentShader: `uniform float uLago; uniform float uAgua; uniform vec3 uSol; varying vec3 vP; varying vec3 vN;
    float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719)))*43758.5453); }
    void main(){
      vec3 a = abs(vP); float m = max(a.x, max(a.y, a.z));
      float d = length(vP / m) - 1.0;            // 0 no meio da face, ~0,73 no canto
      float r = d / 0.732;
      vec3 rocha = mix(vec3(0.42,0.34,0.27), vec3(0.78,0.74,0.70), smoothstep(0.35, 0.95, r));
      rocha *= 0.9 + 0.2 * h(floor(vP * 40.0));
      vec3 c = rocha;
      float lago = uLago * uAgua;
      c = mix(vec3(0.20,0.46,0.22), c, smoothstep(lago + 0.02, lago + 0.07, r));
      c = mix(vec3(0.05,0.28,0.62), c, smoothstep(lago - 0.01, lago + 0.01, r));
      float luz = 0.35 + 0.75 * max(dot(normalize(vN), uSol), 0.0);
      gl_FragColor = vec4(c * luz, 1.0);
      #include <colorspace_fragment>
    }`,
});
const Mundo: React.FC<{agua?: number; rot?: V3; s?: number}> = ({agua = 1, rot = [0.35, 0.6, 0], s = 1}) => { MUNDO.uniforms.uAgua.value = agua;
  return <mesh material={MUNDO} rotation={rot} scale={s}><boxGeometry args={[2, 2, 2, 8, 8, 8]} /></mesh>; };
const ATM = atmM('0.35,0.65,1.0', 1.2);
const Boneco: React.FC<{pos?: V3; s?: number; anda?: number; rot?: V3; cor?: string}> = ({pos = [0, 0, 0], s = 1, anda = 0, rot = [0, 0, 0], cor = '#f2c84a'}) => (
  <group position={pos} scale={s} rotation={rot}>
    <mesh position={[0, 0.62, 0]}><capsuleGeometry args={[0.11, 0.34, 8, 16]} /><meshStandardMaterial color={cor} /></mesh>
    <mesh position={[0, 0.95, 0]}><sphereGeometry args={[0.1, 20, 20]} /><meshStandardMaterial color={cor} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.06, 0.25, 0]} rotation={[Math.sin(anda) * 0.6 * l, 0, 0]}><capsuleGeometry args={[0.045, 0.36, 6, 10]} /><meshStandardMaterial color={cor} /></mesh>)}
    {[-1, 1].map((l) => <mesh key={'b' + l} position={[l * 0.15, 0.65, 0]} rotation={[-Math.sin(anda) * 0.7 * l, 0, l * 0.15]}><capsuleGeometry args={[0.035, 0.3, 6, 10]} /><meshStandardMaterial color={cor} /></mesh>)}
  </group>
);
const Seta: React.FC<{de: THREE.Vector3; ate: THREE.Vector3; cor: string; k?: number}> = ({de, ate, cor, k = 1}) => {
  const dir = ate.clone().sub(de); const L = dir.length() * k; const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  const meio = de.clone().add(dir.clone().normalize().multiplyScalar(L / 2)); const ponta = de.clone().add(dir.clone().normalize().multiplyScalar(L));
  return <><mesh position={meio} quaternion={q}><cylinderGeometry args={[0.018, 0.018, Math.max(0.001, L - 0.08), 10]} /><meshBasicMaterial color={cor} /></mesh>
    <mesh position={ponta} quaternion={q}><coneGeometry args={[0.05, 0.12, 12]} /><meshBasicMaterial color={cor} /></mesh></>;
};
// chão inclinado (o "morro" que o cubo vira perto da borda): rampa em x que fica cada vez mais íngreme
const RAMPA = (() => { const g = new THREE.PlaneGeometry(14, 4, 200, 20); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i); const t = Math.max(0, x); p.setY(i, Math.tan(Math.min(1.0, t * 0.12)) * t * 0.55 + (random('rp' + i) - 0.5) * 0.02); } g.computeVertexNormals(); return g; })();
const rampaY = (x: number) => { const t = Math.max(0, x); return Math.tan(Math.min(1.0, t * 0.12)) * t * 0.55; };

// ---------- cenas ----------
const S1: React.FC = () => <C3>{(f, tex) => { const k = pr(f, 6, 40, Easing.inOut(Easing.cubic)); return <>
  <Cam pos={[Math.sin(f * 0.02) * 7.2, 1.6, Math.cos(f * 0.02) * 7.2]} /><Luzes sol={[3, 3, 4]} i={2.4} amb={0.35} /><Estrelas sem="c1" />
  <TerraCubo tex={tex} k={k} /><Pos bloom={0.6} /></>; }}</C3>;
const S2: React.FC = () => <C3>{(f, tex) => { const r = pr(f, 4, 40); const R = new THREE.Euler(0.35, 0.6, 0); const a = new THREE.Vector3(-1, 1.04, 1.04).applyEuler(R), b = new THREE.Vector3(1, 1.04, 1.04).applyEuler(R); const m = a.clone().lerp(b, r);
  return <>
    <Cam pos={[0.2, 0.8, 8.6 + f * 0.012]} /><Luzes sol={[3, 3, 4]} i={2.4} amb={0.35} /><Estrelas sem="c2" />
    <TerraCubo tex={tex} k={1} />
    <Seta de={a} ate={m} cor="#ffd23f" />
    {Array.from({length: 11}, (_, i) => i / 10 <= r ? <mesh key={i} position={a.clone().lerp(b, i / 10)}><sphereGeometry args={[0.025, 10, 10]} /><meshBasicMaterial color="#ffffff" /></mesh> : null)}
    <Pos bloom={0.8} /></>; }}</C3>;
const S3: React.FC = () => <C3>{(f) => <>
  <Cam pos={[-1.6 + f * 0.004, 0.55, 2.8]} alvo={[0, 0.5, 0]} /><Luzes sol={[2, 5, 2]} i={2.2} amb={0.5} /><color attach="background" args={['#9fc4e6']} /><fog attach="fog" args={['#b0d0ea', 5, 20]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#6f8a48" roughness={1} /></mesh>
  {Array.from({length: 40}, (_, i) => <mesh key={i} position={[(random('t3x' + i) - 0.5) * 16, 0.2, -2 - random('t3z' + i) * 10]}><coneGeometry args={[0.12, 0.45, 6]} /><meshStandardMaterial color="#2f5a2a" flatShading /></mesh>)}
  <Boneco s={0.9} /><Pos bloom={0.3} /></>}</C3>;
// a gravidade puxa para o centro: setas da superfície para o centro, cubo em corte transparente
const PONTOS: V3[] = [[0, 1, 0], [0.5, 1, 0.5], [1, 1, 1], [1, 0.4, 1], [1, 0, 0], [-1, 1, -0.3], [0.2, -1, 1], [-1, -1, -1], [-1, 0.2, 0.6], [0.7, 1, -1]];
const S4: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(0.5 + f * 0.01) * 7.2, 1.8, Math.cos(0.5 + f * 0.01) * 7.2]} /><Luzes sol={[3, 3, 4]} i={2} amb={0.4} /><Estrelas sem="c4" />
  <mesh rotation={[0.35, 0.6, 0]}><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color="#6f8fb0" transparent opacity={0.18} depthWrite={false} /></mesh>
  <lineSegments rotation={[0.35, 0.6, 0]}><edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} /><lineBasicMaterial color="#9fdcff" /></lineSegments>
  <group rotation={[0.35, 0.6, 0]}>{PONTOS.map((p, i) => <Seta key={i} de={new THREE.Vector3(...p)} ate={new THREE.Vector3(0, 0, 0)} cor="#ff6a3a" k={pr(f, i * 3, i * 3 + 18) * 0.85} />)}</group>
  <Brilho pos={[0, 0, 0]} s={0.5} cor="#ffb060" o={0.9} /><Pos bloom={1} /></>}</C3>;
// o centro fica longe dos cantos: linha curta até o meio da face, linha longa até o canto
const S5: React.FC = () => <C3>{(f) => <>
  <Cam pos={[5.4, 1.6, 4.8]} alvo={[0, 0.1, 0]} /><Luzes sol={[3, 3, 4]} i={2} amb={0.4} /><Estrelas sem="c5" />
  <mesh rotation={[0, 0.4, 0]}><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color="#6f8fb0" transparent opacity={0.16} depthWrite={false} /></mesh>
  <lineSegments rotation={[0, 0.4, 0]}><edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} /><lineBasicMaterial color="#9fdcff" /></lineSegments>
  <group rotation={[0, 0.4, 0]}>
    <Seta de={new THREE.Vector3(0, 0, 0)} ate={new THREE.Vector3(0, 1, 0)} cor="#3ddc84" k={pr(f, 4, 20)} />
    <Seta de={new THREE.Vector3(0, 0, 0)} ate={new THREE.Vector3(1, 1, 1)} cor="#ff3b3b" k={pr(f, 22, 50)} />
  </group>
  <Brilho pos={[0, 0, 0]} s={0.4} cor="#ffffff" o={0.9} /><Pos bloom={1} /></>}</C3>;
// quanto mais anda pra borda, mais vira ladeira: o boneco caminha e o chão sobe na frente
const S6: React.FC = () => <C3>{(f) => { const x = -1 + f * 0.04; return <>
  <Cam pos={[x + 0.5, rampaY(x) + 1.0, 4.4]} alvo={[x + 0.7, rampaY(x + 0.7) + 0.5, 0]} /><Luzes sol={[-2, 5, 3]} i={2.2} amb={0.5} /><color attach="background" args={['#a8c4dc']} /><fog attach="fog" args={['#b8d0e4', 4, 18]} />
  <mesh geometry={RAMPA}><meshStandardMaterial color="#8a7a5a" roughness={1} flatShading /></mesh>
  <Boneco pos={[x, rampaY(x), 0]} s={0.75} anda={f * 0.35} rot={[0, Math.PI / 2, 0]} /><Pos bloom={0.3} /></>; }}</C3>;
// na aresta, 45°: o chão inclinado e o boneco em pé, agarrado
const Ladeira: React.FC<{f: number; ang: number; escorrega?: number; sem: string}> = ({f, ang, escorrega = 0, sem}) => <>
  <Cam pos={[0, 0.6, 4.2]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 5, 3]} i={2.2} amb={0.45} /><color attach="background" args={['#5a7ca0']} />
  <group rotation={[0, 0, ang]}>
    <mesh position={[0, -0.1, 0]}><boxGeometry args={[12, 0.2, 3]} /><meshStandardMaterial color="#8c7a62" roughness={1} /></mesh>
    {Array.from({length: 12}, (_, i) => { const t = (f * 0.02 * escorrega + random(sem + i)) % 1; return <mesh key={i} position={[3 - t * 7 * escorrega - random(sem + 'x' + i) * (1 - escorrega) * 4, 0.06, (random(sem + 'z' + i) - 0.5) * 2]} rotation={[0, 0, -f * 0.1 * escorrega]}><dodecahedronGeometry args={[0.07, 0]} /><meshStandardMaterial color="#6a5a4a" flatShading /></mesh>; })}
  </group>
  <Boneco pos={[0.1 - escorrega * f * 0.004, 0.12 - escorrega * f * 0.004 * Math.tan(ang), 0.4]} s={0.6} rot={[0, 0, 0]} />
</>;
const S7: React.FC = () => <C3>{(f) => <><Ladeira f={f} ang={interpolate(f, [0, 20], [0.55, Math.PI / 4], cl)} sem="l7" /><Pos bloom={0.3} /></>}</C3>;
const S8: React.FC = () => <C3>{(f) => <><Ladeira f={f} ang={interpolate(f, [0, 20], [Math.PI / 4, 0.96], cl)} escorrega={1} sem="l8" /><Pos bloom={0.3} /></>}</C3>;
// o canto fica ~3.800 km mais alto: perfil da face, com o canto subindo como montanha
const PERFIL = (() => { const s = new THREE.Shape(); s.moveTo(-1, -0.2); for (let i = 0; i <= 80; i++) { const x = -1 + i / 40; s.lineTo(x, (Math.hypot(x, 1) - 1) * 2.2); } s.lineTo(1, -0.2); s.lineTo(-1, -0.2);
  return new THREE.ExtrudeGeometry(s, {depth: 0.3, bevelEnabled: false}); })();
const S9: React.FC = () => <C3>{(f) => { const k = pr(f, 0, 50); return <>
  <Cam pos={[0, 0.5, 5.4]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 3, 4]} i={2.2} amb={0.45} /><color attach="background" args={['#0a1220']} />
  <mesh geometry={PERFIL} position={[0, 0, -0.15]} scale={[1.4, 0.08 + 0.92 * k, 1]}><meshStandardMaterial color="#8a7660" roughness={1} /></mesh>
  <mesh position={[0, 0.02, 0.2]}><boxGeometry args={[2.8, 0.04, 0.04]} /><meshBasicMaterial color="#3ddc84" /></mesh>
  <Seta de={new THREE.Vector3(1.38, 0, 0.2)} ate={new THREE.Vector3(1.38, 0.91 * k + 0.01, 0.2)} cor="#ff3b3b" />
  <Pos bloom={0.8} /></>; }}</C3>;
// mais de 400 vezes o Everest: um Everest minúsculo ao pé da parede do canto (câmera recuando)
const S10: React.FC = () => <C3>{(f) => { const z = interpolate(f, [0, 50], [0.5, 9], {...cl, easing: Easing.in(Easing.cubic)}); return <>
  <Cam pos={[0.12 + z * 0.02, 0.06 + z * 0.4, 0.32 + z]} alvo={[0, 0.04 + pr(f, 10, 50) * 7, -pr(f, 10, 50) * 8]} /><Luzes sol={[3, 5, 3]} i={2.2} amb={0.45} /><color attach="background" args={['#8fb0d0']} /><fog attach="fog" args={['#a0bcd8', 10, 40]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#7a6a54" roughness={1} /></mesh>
  <mesh position={[0, 0.05, 0]}><coneGeometry args={[0.06, 0.1, 8]} /><meshStandardMaterial color="#e8eef4" flatShading /></mesh>
  <mesh position={[0, 21, -8]}><coneGeometry args={[14, 42, 8]} /><meshStandardMaterial color="#8a7a66" roughness={1} flatShading /></mesh>
  <Pos bloom={0.3} /></>; }}</C3>;
// tudo que é líquido escorre ladeira abaixo: a água desce das bordas e enche o lago do meio (câmera de cima)
const S11: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.4, 3.2, 1.2]} alvo={[0, 1, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.45} /><Estrelas sem="c11" />
  <Mundo agua={pr(f, 10, 60)} rot={[0, 0.2, 0]} />
  {Array.from({length: 120}, (_, i) => { const a = random('wa' + i) * Math.PI * 2; const t = ((f * 0.012 + random('wt' + i)) % 1); const r = 1.35 * (1 - t) + 0.25; return <Brilho key={i} pos={[Math.cos(a) * Math.min(1, r), 1.02, Math.sin(a) * Math.min(1, r)]} s={0.08} cor="#4ab0ff" o={0.85 * (1 - t * 0.6)} />; })}
  <Pos bloom={0.9} /></>}</C3>;
// seis lagos redondos, um em cada face (câmera girando em volta do cubo)
const S12: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.025) * 7.2, 1.8 + Math.sin(f * 0.02) * 1.6, Math.cos(f * 0.025) * 7.2]} /><Estrelas sem="c12" />
  <Mundo /><Pos bloom={0.5} /></>}</C3>;
// o ar vai junto: bolhas azuis encolhendo para o meio de cada face
const BOLHAS: V3[] = [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]];
const S13: React.FC = () => <C3>{(f) => { const k = 1 - pr(f, 0, 30) * 0.45; return <>
  <Cam pos={[5.4 - pr(f, 60, 125) * 2.6, 3.4 - pr(f, 60, 125) * 1.0, 5.6 - pr(f, 60, 125) * 2.6]} alvo={[0, 0, 0]} /><Estrelas sem="c13" />
  <group rotation={[0.35, 0.6, 0]}><Mundo rot={[0, 0, 0]} />
    {BOLHAS.map((p, i) => <mesh key={i} position={p.map((x) => x * 0.75) as V3} scale={[p[0] ? 0.45 : k, p[1] ? 0.45 : k, p[2] ? 0.45 : k]}><sphereGeometry args={[1, 40, 40]} /><meshStandardMaterial color="#5ab4ff" transparent opacity={0.22} depthWrite={false} /></mesh>)}
  </group><Pos bloom={0.6} /></>; }}</C3>;
// nas arestas e nos cantos quase não tem ar: só rocha seca e céu preto (câmera junto ao canto)
const S14: React.FC = () => <C3>{(f) => <>
  <Cam pos={[1.35 + f * 0.002, 1.25, 1.55]} alvo={[0.8, 0.85, 0.7]} /><Luzes sol={[3, 4, 2]} i={2.8} amb={0.15} /><Estrelas sem="c14" n={2600} />
  <Mundo rot={[0, 0, 0]} />
  {Array.from({length: 26}, (_, i) => <mesh key={i} position={[0.55 + random('rx' + i) * 0.45, 1.01, 0.55 + random('rz' + i) * 0.45]}><dodecahedronGeometry args={[0.012 + random('rs' + i) * 0.02, 0]} /><meshStandardMaterial color="#9a8e82" flatShading /></mesh>)}
  <Pos bloom={0.4} /></>}</C3>;
// a vida espremida num anel fino em volta de cada mar (câmera girando baixa sobre uma face)
const S15: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.02) * 1.3, 2.9, Math.cos(f * 0.02) * 1.3]} alvo={[0, 1, 0]} /><Estrelas sem="c15" />
  <Mundo rot={[0, 0, 0]} />
  {Array.from({length: 90}, (_, i) => { const a = i / 90 * Math.PI * 2; const r = 0.38 + random('ar' + i) * 0.04; return <mesh key={i} position={[Math.cos(a) * r, 1.02, Math.sin(a) * r]}><coneGeometry args={[0.012, 0.04, 6]} /><meshStandardMaterial color="#2c6a2c" /></mesh>; })}
  <Pos bloom={0.4} /></>}</C3>;
// no canto você pesaria um terço a menos: o boneco numa balança, o ponteiro caindo
const S16: React.FC = () => <C3>{(f) => { const a = interpolate(f, [8, 40], [0.9, 0.3], {...cl, easing: Easing.out(Easing.back(1.4))}); return <>
  <Cam pos={[0.6, 0.9, 1.9]} alvo={[0, 0.35, 0]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.5} /><color attach="background" args={['#2a3446']} />
  <mesh position={[0, 0.04, 0]}><boxGeometry args={[0.7, 0.08, 0.5]} /><meshStandardMaterial color="#e8e8ec" roughness={0.4} /></mesh>
  <mesh position={[0, 0.0805, 0.18]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.1, 32]} /><meshBasicMaterial color="#20242c" /></mesh>
  <mesh position={[0, 0.082, 0.18]} rotation={[-Math.PI / 2, 0, a]}><planeGeometry args={[0.012, 0.16]} /><meshBasicMaterial color="#ff3b3b" /></mesh>
  <Boneco pos={[0, 0.08, -0.05]} s={0.5} /><Brilho pos={[0, 0.09, 0.18]} s={0.25} cor="#ff6a3a" o={0.4} />
  <Pos bloom={0.6} /></>; }}</C3>;
// esse cubo não ia durar: as arestas racham e brilham
const S17: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 1.0, 7.0]} tremor={0.03 * pr(f, 10, 40)} /><Luzes sol={[3, 3, 4]} i={2.2} amb={0.35} /><Estrelas sem="c17" />
  <TerraCubo tex={tex} k={1} rot={[0.35, 0.6 + f * 0.004, 0]} />
  <lineSegments rotation={[0.35, 0.6 + f * 0.004, 0]} scale={1.005}><edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} /><lineBasicMaterial color={new THREE.Color('#ff5a10').multiplyScalar(0.5 + pr(f, 0, 40) * 2)} /></lineSegments>
  <Pos bloom={1.3} /></>}</C3>;
// a gravidade esmaga a rocha até virar bola (câmera recuando)
const S18: React.FC = () => <C3>{(f, tex) => { const k = 1 - pr(f, 6, 100, Easing.inOut(Easing.cubic)); return <>
  <Cam pos={[0, 0.8, 6.8 + f * 0.01]} tremor={0.03 * k} /><Luzes sol={[3, 3, 4]} i={2.4} amb={0.35} /><Estrelas sem="c18" />
  <TerraCubo tex={tex} k={k} rot={[0.35, 1.0 + f * 0.006, 0]} />
  {k > 0.05 && Array.from({length: 8}, (_, i) => { const p = new THREE.Vector3(i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1).applyEuler(new THREE.Euler(0.35, 1.0 + f * 0.006, 0)).multiplyScalar(k + (1 - k) * 0.67); return <Brilho key={i} pos={[p.x, p.y, p.z]} s={0.6 * k} cor="#ff6a20" o={0.8} />; })}
  {k < 0.3 && <mesh material={ATM} scale={1.27}><sphereGeometry args={[1, 64, 64]} /></mesh>}
  <Pos bloom={1} /></>; }}</C3>;
// todo planeta é redondo: uma fila de mundos redondos girando (fim)
const S19: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0.2, 13 - f * 0.02]} /><Luzes sol={[2, 2, 5]} i={2.4} amb={0.3} /><Estrelas sem="c19" />
  {[['#c8643a', 0.55, -3], ['#d8c8a8', 0.8, -1.5], ['', 1, 0.6], ['#b0a898', 0.4, 2.5], ['#d8b080', 0.9, 4.2]].map(([c, r, x], i) => <mesh key={i} position={[x as number, 0, i === 2 ? 0.6 : -1]} rotation={[0.3, f * 0.01 + i, 0]}><sphereGeometry args={[r as number, 64, 64]} />
    {c ? <meshStandardMaterial color={c as string} roughness={0.9} /> : <meshStandardMaterial map={tex.dia} roughness={0.85} />}</mesh>)}
  <Pos bloom={0.5} /></>}</C3>;

const PLANO: K.Plano = [
  ['e se a terra fosse', S1], ['com o mesmo tamanho', S2], ['no meio de cada face', S3], ['mas a gravidade continua', S4], ['e o centro fica longe', S5],
  ['entao quanto mais', S6], ['na aresta quarenta', S7], ['no canto mais de', S8], ['o canto fica quase', S9], ['mais de quatrocentas', S10],
  ['e tudo que e liquido', S11], ['os oceanos viram', S12], ['o ar vai junto', S13], ['a vida ficaria', S15],
  ['e la no canto', S16], ['mas esse cubo', S17], ['acima de uns mil', S18], ['e por isso que todo', S19],
];

// ---------- por cima: título do 1º segundo e contador de inclinação ----------
const Extra: React.FC = () => {
  const f = useCurrentFrame();
  const T = TEMPO.T; const t = (frase: string) => T[PLANO.findIndex((p) => p[0] === frase)];
  const a = t('no meio de cada face'), b = t('entao quanto mais'), c = t('na aresta quarenta'), d = t('no canto mais de'), e = t('o canto fica quase');
  let g: number | null = null;
  if (f >= a && f < b) g = 0;
  else if (f >= b && f < c) g = interpolate(f, [b, c], [0, 40], cl);
  else if (f >= c && f < d) g = interpolate(f, [c, c + 20], [40, 45], cl);
  else if (f >= d && f < e) g = interpolate(f, [d, d + 25], [45, 55], cl);
  const o = interpolate(f, [0, 3, 38, 46], [0, 1, 1, 0], cl);
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {o > 0 && <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', opacity: o, fontFamily: FONTE, fontWeight: 900, color: '#fff', textShadow: NEON}}>
      {['E SE A TERRA', 'FOSSE UM', 'CUBO?'].map((l, j) => <div key={j} style={{fontSize: j === 2 ? 170 : 112, lineHeight: 1.12, letterSpacing: 2}}>{l}</div>)}</div>}
    {g !== null && <div style={{position: 'absolute', top: 150, right: 60, padding: '10px 26px', borderRadius: 22, background: 'rgba(0,10,30,.55)', border: '3px solid #39d8ff', fontFamily: FONTE, fontWeight: 900, fontSize: 92, color: g > 44 ? '#ffd23f' : '#fff', textShadow: NEON, display: 'flex', alignItems: 'center', gap: 16}}>
      <svg width={84} height={70} viewBox="0 0 84 70"><line x1={6} y1={64} x2={80} y2={64} stroke="#fff" strokeWidth={7} strokeLinecap="round" /><line x1={6} y1={64} x2={6 + 74 * Math.cos(g * Math.PI / 180)} y2={64 - 74 * Math.sin(g * Math.PI / 180)} stroke="#ffd23f" strokeWidth={7} strokeLinecap="round" /></svg>{Math.round(g)}°</div>}
  </AbsoluteFill>;
};
void S14;
const S = K.criarShort(W, PLANO, 'cubo/narracao.mp3', 'e por isso que todo', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
