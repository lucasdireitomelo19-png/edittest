// Short "E SE a PANGEIA VOLTASSE AGORA? O BRASIL ENCOSTA NA ÁFRICA" (aprovado em 07/11/2026). Tudo em Remotion 3D.
// Formato novo do dono: só a legenda (56) e, por exceção liberada pelo dono para a Pangeia, NOMES de lugares em branco com neon ciano.
// Continentes: máscaras do Natural Earth (domínio público) sobre a textura da Terra; cada continente gira em torno de um polo de Euler
// (América do Sul e do Norte com os polos de Bullard 1965). Supercontinentes prontos (sc_*.jpg) e rotações (pangeia.cfg.json) vêm de bake.py.
import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, interpolate, random, staticFile, delayRender, continueRender, Easing, useCurrentFrame} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Pedras, pr, cl, THREE, Tex} from '../lote/kit3d';
import palavras from './pangeia.palavras.json';
import CFG from './pangeia.cfg.json';

const W = palavras as Palavra[];
type Cfg = keyof typeof CFG;
type Cont = 'sa' | 'af' | 'na' | 'eu' | 'au' | 'an';
const CONTS: Cont[] = ['an', 'au', 'sa', 'na', 'eu', 'af'];
const SC: Cfg[] = ['pangeia', 'ultima', 'novo', 'amasia', 'aurica'];

// ---------- texturas próprias ----------
type PT = Record<string, THREE.Texture>;
let prom: Promise<PT> | null = null;
const carregar = () => {
  if (!prom) {
    const L = new THREE.TextureLoader();
    const nomes: string[] = ['oceano.jpg', 'rachas.png', ...CONTS.map((c) => `m_${c}.png`), 'm_nordeste.png', 'm_guine.png', 'm_brasil.png'];
    SC.forEach((s) => nomes.push(`sc_${s}.jpg`, `sc_${s}_calor.png`, `sc_${s}_borda.png`));
    prom = Promise.all(nomes.map((n) => new Promise<[string, THREE.Texture]>((ok, erro) => L.load(staticFile('pangeia/' + n), (t) => ok([n.replace(/\.(jpg|png)$/, ''), t]), undefined, erro))))
      .then((xs) => { const o: PT = {}; xs.forEach(([k, t]) => { if (!k.startsWith('m_') && !k.endsWith('_calor') && !k.endsWith('_borda')) t.colorSpace = THREE.SRGBColorSpace; o[k] = t; }); return o; });
  }
  return prom;
};
const usePT = () => {
  const [t, setT] = useState<PT | null>(null);
  const [h] = useState(() => delayRender('texturas pangeia'));
  useEffect(() => { carregar().then((x) => { setT(x); continueRender(h); }); }, [h]);
  return t;
};
const PTX = React.createContext<PT | null>(null);
const TXC = React.createContext<Tex | null>(null);
// cena com as texturas da Pangeia + rótulos por cima
const CP: React.FC<{children: (f: number, tex: Tex, pt: PT) => React.ReactNode; rot?: (f: number) => React.ReactNode}> = ({children, rot}) => {
  const pt = usePT();
  if (!pt) return null;
  return <PTX.Provider value={pt}><C3>{(f, tex) => <TXC.Provider value={tex}>{children(f, tex, pt)}</TXC.Provider>}</C3>{rot && <RotF rot={rot} />}</PTX.Provider>;
};
const RotF: React.FC<{rot: (f: number) => React.ReactNode}> = ({rot}) => { const f = useCurrentFrame(); return <>{rot(f)}</>; };

// ---------- geometria ----------
const v = (la: number, lo: number, r = 1) => { const a = THREE.MathUtils.degToRad(la), b = THREE.MathUtils.degToRad(lo); return new THREE.Vector3(Math.cos(a) * Math.cos(b) * r, Math.sin(a) * r, -Math.cos(a) * Math.sin(b) * r); };
const ID = new THREE.Quaternion();
const qCfg = (cfg: Cfg, c: Cont, k: number) => {
  const [x, y, z, ang] = (CFG[cfg] as Record<string, number[]>)[c];
  const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(x, y, z).normalize(), ang);
  return ID.clone().slerp(q, k);
};
// posição de câmera olhando para (lat, lon)
const camLL = (la: number, lo: number, d: number): [number, number, number] => { const p = v(la, lo, d); return [p.x, p.y, p.z]; };
// projeta um ponto 3D na tela (mesma câmera do C3: fov 40, 1080x1920)
const projeta = (pos: [number, number, number], alvo: [number, number, number], p: THREE.Vector3) => {
  const c = new THREE.PerspectiveCamera(40, 1080 / 1920, 0.01, 400); c.position.set(...pos); c.lookAt(...alvo); c.updateMatrixWorld(); c.updateProjectionMatrix();
  const q = p.clone().project(c); return {x: (q.x + 1) / 2 * 1080, y: (1 - q.y) / 2 * 1920, atras: q.z > 1};
};

// ---------- rótulo neon (nomes de lugares, liberados pelo dono para a Pangeia) ----------
const Rotulo: React.FC<{x: number; y: number; txt: string; o: number; tam?: number}> = ({x, y, txt, o, tam = 66}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${0.85 + 0.15 * o})`, opacity: o, fontFamily: FONTE, fontWeight: 900, fontSize: tam, color: '#fff', letterSpacing: 1, whiteSpace: 'nowrap',
    textShadow: '0 0 10px #39d8ff, 0 0 26px #1fb6ff, 0 0 52px #0a8cff, 0 4px 8px rgba(0,0,0,.8)'}}>{txt}</div>
);
const R3: React.FC<{cam: [number, number, number]; alvo?: [number, number, number]; p: THREE.Vector3; txt: string; o: number; dy?: number; tam?: number}> = ({cam, alvo = [0, 0, 0], p, txt, o, dy = 0, tam}) => {
  const s = projeta(cam, alvo, p); if (s.atras) return null;
  return <Rotulo x={Math.min(900, Math.max(180, s.x))} y={s.y + dy} txt={txt} o={o} tam={tam} />;
};

// ---------- globo com continentes móveis ----------
const Globo: React.FC<{cfg?: Cfg; k: number; nordeste?: number; guine?: number; atm?: boolean; giro?: number}> = ({cfg = 'pangeia', k, nordeste = 0, guine = 0, atm = true, giro = 0}) => {
  const pt = React.useContext(PTX)!;
  const tex = React.useContext(TXC)!;
  const mats = useMemo(() => {
    const o: Record<string, THREE.Material> = {};
    CONTS.forEach((c) => { o[c] = new THREE.MeshStandardMaterial({map: tex.dia, alphaMap: pt['m_' + c], alphaTest: 0.45, roughness: 0.9}); });
    o.nordeste = new THREE.MeshBasicMaterial({color: '#ff1a1a', alphaMap: pt.m_nordeste, transparent: true, depthWrite: false});
    o.guine = new THREE.MeshBasicMaterial({color: '#ff1a1a', alphaMap: pt.m_guine, transparent: true, depthWrite: false});
    return o;
  }, [pt, tex]);
  (mats.nordeste as THREE.MeshBasicMaterial).opacity = 0.85 * nordeste;
  (mats.guine as THREE.MeshBasicMaterial).opacity = 0.85 * guine;
  const a = useMemo(() => atmM(), []);
  return <group rotation={[0, giro, 0]}>
    <mesh><sphereGeometry args={[1, 128, 128]} /><meshStandardMaterial map={pt.oceano} roughness={0.55} metalness={0.1} /></mesh>
    {CONTS.map((c, i) => <group key={c} quaternion={qCfg(cfg, c, k)}>
      <mesh material={mats[c]}><sphereGeometry args={[1.004 + i * 0.0012, 128, 128]} /></mesh>
      {c === 'sa' && nordeste > 0 && <mesh material={mats.nordeste}><sphereGeometry args={[1.0135, 96, 96]} /></mesh>}
      {c === 'af' && guine > 0 && <mesh material={mats.guine}><sphereGeometry args={[1.0135, 96, 96]} /></mesh>}
    </group>)}
    {atm && <mesh material={a} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>}
  </group>;
};
const atmM = (cor = '0.35,0.65,1.0', kk = 1.6) => new THREE.ShaderMaterial({
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
  fragmentShader: `varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(${cor},1.0)*f*${kk.toFixed(2)}; }`,
  blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false,
});
// supercontinente pronto (textura assada), com calor no interior e faixa verde na borda
const Super: React.FC<{s: Cfg; calor?: number; verde?: number; atmCor?: string; pos?: [number, number, number]; esc?: number; giro?: number}> = ({s, calor = 0, verde = 0, atmCor, pos = [0, 0, 0], esc = 1, giro = 0}) => {
  const pt = React.useContext(PTX)!;
  const a = useMemo(() => atmM(atmCor ?? '0.35,0.65,1.0'), [atmCor]);
  return <group position={pos} scale={esc} rotation={[0, giro, 0]}>
    <mesh><sphereGeometry args={[1, 128, 128]} /><meshStandardMaterial map={pt['sc_' + s]} roughness={0.8} /></mesh>
    {calor > 0 && <mesh><sphereGeometry args={[1.003, 96, 96]} /><meshBasicMaterial color="#ff4a0a" alphaMap={pt[`sc_${s}_calor`]} transparent opacity={calor} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>}
    {verde > 0 && <mesh><sphereGeometry args={[1.005, 96, 96]} /><meshBasicMaterial color="#3dff6a" alphaMap={pt[`sc_${s}_borda`]} transparent opacity={verde} depthWrite={false} /></mesh>}
    <mesh material={a} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>
  </group>;
};

// ---------- cenas ----------
// 1 · gancho: o globo com os continentes deslizando e se fechando, câmera orbitando rápido
const S1: React.FC = () => <CP>{(f) => <>
  <Cam pos={camLL(12, interpolate(f, [0, 40], [-70, 0]), 5.4)} /><Luzes sol={[2, 2, 4]} i={2.4} amb={0.25} /><Estrelas sem="p1" />
  <Globo k={interpolate(f, [0, 40], [0.15, 0.85], {...cl, easing: Easing.out(Easing.cubic)})} />
  <Pos bloom={0.7} /></>}</CP>;
// 2 · a unha crescendo em close e a câmera recuando até a placa de rocha andando junto
const unhaGeo = (() => { const g = new THREE.SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2); g.scale(0.32, 0.07, 0.42); return g; })();
const S2: React.FC = () => <CP>{(f) => {
  const z = interpolate(f, [0, 40], [1.6, 4.2], {...cl, easing: Easing.in(Easing.quad)}); const cresce = f * 0.0025;
  return <><Cam pos={[0.5, 0.9 + z * 0.4, z]} alvo={[0, 0.25, 0]} /><Luzes sol={[2, 4, 3]} i={2} amb={0.35} /><color attach="background" args={['#120d0a']} />
    <group position={[0, 0.35, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.35]}><capsuleGeometry args={[0.38, 1.1, 12, 24]} /><meshStandardMaterial color="#c98e6c" roughness={0.6} /></mesh>
      <mesh geometry={unhaGeo} position={[0, 0.3, 0.1 + cresce / 2]} scale={[1, 1, 1 + cresce * 2]}><meshStandardMaterial color="#f2d2c8" roughness={0.25} metalness={0.05} /></mesh>
    </group>
    {/* placa tectônica embaixo, andando no mesmo ritmo */}
    <mesh position={[-1.1 + f * 0.004, -0.35, 0]}><boxGeometry args={[2.2, 0.5, 2.6]} /><meshStandardMaterial color="#5c4a3a" roughness={1} /></mesh>
    <mesh position={[1.2, -0.35, 0]}><boxGeometry args={[2.2, 0.5, 2.6]} /><meshStandardMaterial color="#4a3c30" roughness={1} /></mesh>
    <mesh position={[0.05 + f * 0.002, -0.62, 0]}><boxGeometry args={[0.12, 0.05, 2.6]} /><meshBasicMaterial color="#ff5a10" /></mesh>
    <Pos bloom={0.8} /></>;
}}</CP>;
// 3 · o mundo inteiro se fechando, visto de cima do polo norte, devagar
const S3: React.FC = () => <CP>{(f) => <>
  <Cam pos={camLL(55, interpolate(f, [0, 80], [-40, -10]), 5.2)} /><Luzes sol={[3, 3, 2]} i={2.2} amb={0.25} /><Estrelas sem="p3" />
  <Globo k={interpolate(f, [0, 80], [0.0, 0.45])} giro={0} />
  <Pos bloom={0.6} /></>}</CP>;
// 4 · boneco estilizado em cima de um continente que treme (câmera de cima)
const S4: React.FC = () => <CP>{(f) => {
  const tr = 0.04 * Math.sin(f * 1.9) * pr(f, 0, 6);
  return <><Cam pos={[1.0, 1.5, 3.0]} alvo={[0, 0.25, 0]} tremor={0.05} /><Luzes sol={[2, 5, 2]} i={2.2} amb={0.4} /><color attach="background" args={['#1c2a3c']} />
    <group position={[tr, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.6, 64]} /><meshStandardMaterial color="#7a6a45" roughness={1} /></mesh>
      <mesh position={[0, -0.25, 0]}><cylinderGeometry args={[1.6, 1.4, 0.5, 64]} /><meshStandardMaterial color="#4e3e2e" roughness={1} /></mesh>
      {Array.from({length: 20}, (_, i) => { const a = random('g4' + i) * 6.28, r = 0.4 + random('h4' + i) * 1.1; return <mesh key={i} position={[Math.cos(a) * r, 0.05 + Math.abs(Math.sin(f * 0.9 + i)) * 0.06, Math.sin(a) * r]}><dodecahedronGeometry args={[0.04 + random('s4' + i) * 0.04, 0]} /><meshStandardMaterial color="#8a7a5a" flatShading /></mesh>; })}
      <group position={[0, 0, 0.1]} rotation={[0, 0, Math.sin(f * 1.3) * 0.08]}>
        <mesh position={[0, 0.32, 0]}><capsuleGeometry args={[0.09, 0.3, 8, 16]} /><meshStandardMaterial color="#1a1f2a" /></mesh>
        <mesh position={[0, 0.6, 0]}><sphereGeometry args={[0.085, 24, 24]} /><meshStandardMaterial color="#1a1f2a" /></mesh>
      </group>
    </group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}><planeGeometry args={[20, 20]} /><meshStandardMaterial color="#123050" roughness={0.4} /></mesh>
    <Pos bloom={0.5} /></>;
}}</CP>;
// 5 · o Atlântico drenando: a água desce e o fundo do mar (com a dorsal) aparece, câmera rasante
const fundo = (() => { const g = new THREE.PlaneGeometry(6, 6, 160, 160); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); const dorsal = Math.exp(-(x * x) / 0.08) * 0.35; const rug = (Math.sin(x * 9 + z * 3) + Math.sin(z * 11 - x * 4)) * 0.02 + (random('fd' + i) - 0.5) * 0.03; const borda = Math.max(0, Math.abs(x) - 2.2) * 0.8;
    p.setY(i, -0.9 + dorsal + rug + borda); }
  g.computeVertexNormals(); return g; })();
const S5: React.FC = () => <CP rot={(f) => <Rotulo x={540} y={560} txt="OCEANO ATLÂNTICO" o={pr(f, 3, 12) * (1 - pr(f, 38, 50))} tam={60} />}>{(f) => {
  const nivel = interpolate(f, [0, 50], [0.15, -1.2], cl);
  return <><Cam pos={[-0.4, 0.35, 2.6 - f * 0.012]} alvo={[0.3, -0.6, -1]} /><Luzes sol={[-2, 3, 2]} i={2.2} amb={0.35} /><color attach="background" args={['#8fb4d8']} />
    <mesh geometry={fundo}><meshStandardMaterial color="#6b5a48" roughness={1} flatShading /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, nivel, 0]}><planeGeometry args={[6, 6]} /><meshStandardMaterial color="#1b5e8a" transparent opacity={0.82} roughness={0.15} metalness={0.2} /></mesh>
    <Pos bloom={0.4} /></>;
}}</CP>;
// 6 · o Nordeste encaixa no Golfo da Guiné (câmera de cima do Atlântico)
const C6: [number, number, number] = camLL(4, -12, 2.5);
const S6: React.FC = () => <CP rot={(f) => { const k = interpolate(f, [0, 95], [0.5, 1], {...cl, easing: Easing.inOut(Easing.cubic)}); const cam = camLL(4 - f * 0.02, -12 + f * 0.04, 3.4 - f * 0.004);
  return <><R3 cam={cam} p={v(-7, -39, 1.02).applyQuaternion(qCfg('pangeia', 'sa', k))} txt="NORDESTE" o={pr(f, 2, 10)} dy={70} />
    <R3 cam={cam} p={v(3, 3, 1.02)} txt="GOLFO DA GUINÉ" o={pr(f, 66, 74)} dy={-150} tam={56} />
    <R3 cam={cam} p={v(12, 18, 1.02)} txt="ÁFRICA" o={pr(f, 96, 104)} dy={-120} /></>; }}>{(f) => <>
  <Cam pos={camLL(4 - f * 0.02, -12 + f * 0.04, 3.4 - f * 0.004)} /><Luzes sol={[1, 2, 4]} i={2.4} amb={0.3} /><Estrelas sem="p6" />
  <Globo k={interpolate(f, [0, 95], [0.5, 1], {...cl, easing: Easing.inOut(Easing.cubic)})} nordeste={pr(f, 0, 8)} guine={pr(f, 66, 74)} />
  <Pos bloom={0.7} /></>}</CP>;
void C6;
// 7 · o clique da peça: close na emenda, flash e tranco
const S7: React.FC = () => <CP>{(f) => { const fl = Math.max(0, 1 - Math.abs(f - 6) / 8); return <>
  <Cam pos={camLL(2, -4, 2.3 - f * 0.004)} tremor={0.05 * Math.max(0, 1 - Math.abs(f - 7) / 10)} /><Luzes sol={[1, 2, 4]} i={2.4} amb={0.3} /><Estrelas sem="p7" />
  <Globo k={interpolate(f, [0, 6], [0.96, 1], cl)} nordeste={1} guine={1} />
  <Brilho pos={(() => { const p = v(2, -4, 1.06); return [p.x, p.y, p.z]; })()} s={0.6 * fl + 0.05} cor="#ffffff" o={fl} />
  <Pos bloom={1.2} /></>; }}</CP>;
// 8 · São Luís e o oeste africano: duas metades da mesma pedra se juntando
const meia = (lado: number) => { const g = new THREE.SphereGeometry(0.6, 64, 48, lado > 0 ? 0 : Math.PI, Math.PI); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i); const n = 1 + 0.12 * Math.sin(x * 9 + 1.3) * Math.sin(y * 7) + 0.06 * Math.sin(z * 15 + y * 5); p.setXYZ(i, x * n, y * n, z * n); }
  g.computeVertexNormals(); return g; };
const MEIA_A = meia(1), MEIA_B = meia(-1);
const S8: React.FC = () => <CP rot={(f) => { const d = interpolate(f, [0, 70], [0.5, 0], {...cl, easing: Easing.inOut(Easing.cubic)});
  const cam: [number, number, number] = [0.2, 0.3, 4.6]; return <>
    <R3 cam={cam} p={new THREE.Vector3(-0.35 - d * 0.5, 0.85, 0)} txt="SÃO LUÍS" o={pr(f, 30, 38)} tam={58} />
    <R3 cam={cam} p={new THREE.Vector3(0.35 + d * 0.5, 0.62, 0)} txt="OESTE DA ÁFRICA" o={pr(f, 85, 93)} tam={52} /></>; }}>{(f) => {
  const d = interpolate(f, [0, 70], [0.5, 0], {...cl, easing: Easing.inOut(Easing.cubic)}); const junta = pr(f, 62, 72);
  return <><Cam pos={[0.2 + Math.sin(f / 40) * 0.2, 0.3, 4.6 - f * 0.006]} alvo={[0, 0, 0]} /><Luzes sol={[2, 3, 3]} i={2.4} amb={0.3} /><color attach="background" args={['#0d0a08']} />
    <group rotation={[0, f * 0.008, 0]}>
      <mesh geometry={MEIA_A} position={[d * 0.5 + 0.0, 0, 0]} rotation={[0, Math.PI / 2, 0]}><meshStandardMaterial color="#7a6550" roughness={1} flatShading /></mesh>
      <mesh geometry={MEIA_B} position={[-d * 0.5 - 0.0, 0, 0]} rotation={[0, Math.PI / 2, 0]}><meshStandardMaterial color="#6e5a46" roughness={1} flatShading /></mesh>
    </group>
    <mesh position={[0, 0, 0]}><boxGeometry args={[0.02, 1.3, 1.3]} /><meshBasicMaterial color="#ffb060" transparent opacity={0.8 * junta * (1 - pr(f, 80, 110))} /></mesh>
    <Pos bloom={1} /></>;
}}</CP>;
// 9 · pegadas atravessando a emenda entre o Brasil e a África (câmera seguindo)
const S9: React.FC = () => <CP rot={(f) => { const cam: [number, number, number] = [-1.2 + f * 0.03, 1.6, 1.8]; const alvo: [number, number, number] = [-0.8 + f * 0.03, 0, -0.2];
  return <><R3 cam={cam} alvo={alvo} p={new THREE.Vector3(-1.4, 0, -0.8)} txt="BRASIL" o={pr(f, 0, 6)} />
    <R3 cam={cam} alvo={alvo} p={new THREE.Vector3(1.4, 0, -0.8)} txt="ÁFRICA" o={pr(f, 20, 28)} /></>; }}>{(f) => <>
  <Cam pos={[-1.2 + f * 0.03, 1.6, 1.8]} alvo={[-0.8 + f * 0.03, 0, -0.2]} /><Luzes sol={[2, 5, 3]} i={2.4} amb={0.4} /><color attach="background" args={['#a8c4dc']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0, 0]}><planeGeometry args={[4, 6]} /><meshStandardMaterial color="#6f7a3a" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0, 0]}><planeGeometry args={[4, 6]} /><meshStandardMaterial color="#9a7a48" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}><planeGeometry args={[0.1, 6]} /><meshBasicMaterial color="#3a2a1a" /></mesh>
  {Array.from({length: 14}, (_, i) => { const x = -1.8 + i * 0.28; const ap = pr(f, i * 4, i * 4 + 3); return <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, i % 2 ? 0.08 : -0.08]} scale={[1, 0.55, 1]}><circleGeometry args={[0.07 * ap, 20]} /><meshBasicMaterial color="#2a1e14" transparent opacity={0.85 * ap} /></mesh>; })}
  <Pos bloom={0.3} /></>}</CP>;
// 10 · "o pior vem depois": a Pangeia inteira, a sombra da noite cobrindo, câmera aproximando
const S10: React.FC = () => <CP>{(f) => <>
  <Cam pos={camLL(10, 10, 3.6 - f * 0.012)} /><Luzes sol={(() => { const p = v(0, 80 - f * 1.3, 5); return [p.x, p.y, p.z]; })()} i={2.6} amb={0.05} /><Estrelas sem="p10" />
  <Super s="pangeia" />
  <Pos bloom={0.6} /></>}</CP>;
// 11 · a chuva não chega: nuvens nas bordas se desfazendo antes do interior (câmera alta)
const S11: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 6.2, 4.6]} alvo={[0, 0, 0.3]} /><Luzes sol={[1, 5, 2]} i={2.2} amb={0.4} /><color attach="background" args={['#0f2238']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.2, 64]} /><meshStandardMaterial color="#c79a5a" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}><ringGeometry args={[1.85, 2.2, 64]} /><meshStandardMaterial color="#3f7a3a" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color="#14466e" roughness={0.3} /></mesh>
  {Array.from({length: 18}, (_, i) => { const a = i / 18 * Math.PI * 2 + 0.2; const t = (f * 0.012 + random('n11' + i) * 0.5) % 1; const r = 2.6 - t * 1.3; const o = Math.max(0, 1 - t * 1.4);
    return <group key={i}>{[0, 1, 2].map((j) => <Brilho key={j} pos={[Math.cos(a) * r + j * 0.12, 0.45, Math.sin(a) * r]} s={1.1 * (1 - t * 0.5)} cor="#e8eef5" o={0.8 * o} />)}
      {o > 0.4 && Array.from({length: 5}, (_, k) => <mesh key={k} position={[Math.cos(a) * r + (random('c' + i + k) - 0.5) * 0.3, 0.45 - ((f * 0.05 + k * 0.2) % 0.45), Math.sin(a) * r]}><boxGeometry args={[0.006, 0.08, 0.006]} /><meshBasicMaterial color="#bcd6ff" transparent opacity={0.7 * o} /></mesh>)}</group>; })}
  <Pos bloom={0.6} /></>}</CP>;
// 12 · deserto gigante rachando, ar tremendo, céu branco-amarelado (câmera atravessando)
const S12: React.FC = () => <CP>{(f, _t, pt) => { const r = pr(f, 0, 60); return <>
  <Cam pos={[-0.6 + f * 0.012, 0.32, 1.4 - f * 0.012]} alvo={[0.4 + f * 0.012, 0.05, -1.4]} /><Luzes sol={[2, 6, -3]} i={2.6} amb={0.55} /><color attach="background" args={['#efd7a8']} /><fog attach="fog" args={['#efd7a8', 2, 9]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[14, 14]} /><meshStandardMaterial color="#d2a05e" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}><planeGeometry args={[14, 14]} /><meshBasicMaterial color="#5a3a1a" alphaMap={rep(pt.rachas, 7)} transparent opacity={0.25 + 0.65 * r} depthWrite={false} /></mesh>
  {Array.from({length: 26}, (_, i) => <Brilho key={i} pos={[(random('h12' + i) - 0.5) * 3 + f * 0.012, 0.12 + Math.sin(f * 0.3 + i) * 0.03, -0.5 - random('z12' + i) * 2.5]} s={0.5} cor="#fff6e0" o={0.12} />)}
  <Pos bloom={0.5} /></>; }}</CP>;
const REP: Record<string, THREE.Texture> = {};
const rep = (t: THREE.Texture, n: number) => { const k = t.uuid + n; if (!REP[k]) { const c = t.clone(); c.wrapS = c.wrapT = THREE.RepeatWrapping; c.repeat.set(n, n); c.needsUpdate = true; REP[k] = c; } return REP[k]; };
// 13 · a Pangeia de verdade com o interior em brasa, câmera recuando até a órbita
const S13: React.FC = () => <CP>{(f) => <>
  <Cam pos={camLL(5, 5, interpolate(f, [0, 75], [1.6, 3.4], cl))} /><Luzes sol={[2, 2, 4]} i={2.2} amb={0.25} /><Estrelas sem="p13" />
  <Super s="pangeia" calor={pr(f, 0, 40) * 0.9} />
  <Pos bloom={1.0} /></>}</CP>;
// 14 · termômetro 3D subindo até estourar de calor, com o sol do deserto atrás
const S14: React.FC = () => <CP>{(f) => { const h = interpolate(f, [0, 60], [0.2, 1.75], {...cl, easing: Easing.out(Easing.cubic)}); return <>
  <Cam pos={[0.5 - f * 0.003, 0.2, 3.2 - f * 0.006]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 3, 3]} i={2} amb={0.4} /><color attach="background" args={['#3a1a08']} />
  <Brilho pos={[-0.6, 1.2, -3]} s={4 + pr(f, 30, 120) * 3} cor="#ffcc66" o={0.8} />
  <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.16, 0.16, 2.1, 32, 1, true]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.25} roughness={0.05} side={THREE.DoubleSide} /></mesh>
  <mesh position={[0, -1.05, 0]}><sphereGeometry args={[0.32, 32, 32]} /><meshStandardMaterial color="#ff2a10" emissive="#ff2a10" emissiveIntensity={1.2} /></mesh>
  <mesh position={[0, -0.95 + h / 2, 0]}><cylinderGeometry args={[0.09, 0.09, h, 24]} /><meshStandardMaterial color="#ff2a10" emissive="#ff3a10" emissiveIntensity={1 + pr(f, 50, 70) * 1.5} /></mesh>
  {Array.from({length: 9}, (_, i) => <mesh key={i} position={[0.17, -0.7 + i * 0.22, 0]}><boxGeometry args={[0.08, 0.012, 0.01]} /><meshBasicMaterial color="#ffffff" /></mesh>)}
  <Pos bloom={1.2} /></>; }}</CP>;
// 15 · daqui a 250 milhões de anos: o globo girando cada vez mais rápido, dia e noite piscando, continentes se juntando
const S15: React.FC = () => <CP>{(f) => { const giro = f * f * 0.004; const pisca = 0.5 + 0.5 * Math.sin(giro * 3);
  return <><Cam pos={[0, 0.9, 5.2]} /><ambientLight intensity={0.1 + 0.25 * pisca} /><directionalLight position={[Math.cos(giro * 2) * 4, 1, Math.sin(giro * 2) * 4]} intensity={2.4} /><Estrelas sem="p15" />
    <Globo cfg="ultima" k={pr(f, 10, 120)} giro={giro} />
    <Pos bloom={0.7} /></>;
}}</CP>;
// 16 · o Sol mais forte: cresce em brilho, a Terra pequena na frente
const S16: React.FC = () => <CP>{(f) => { const b = pr(f, 0, 60); return <>
  <Cam pos={[0.2, 0.2, 4]} alvo={[0, 0.3, 0]} /><Estrelas sem="p16" /><ambientLight intensity={0.15} /><pointLight position={[0, 1.6, -2]} intensity={40 + b * 80} color="#fff0c0" />
  <mesh position={[0, 1.6, -2.5]}><sphereGeometry args={[0.9 + b * 0.25, 64, 64]} /><meshBasicMaterial color={new THREE.Color('#ffcf6a').lerp(new THREE.Color('#ffffff'), b)} /></mesh>
  <Brilho pos={[0, 1.6, -2.4]} s={3.4 + b * 3} cor="#ffb040" o={0.7 + b * 0.3} />
  <Super s="ultima" pos={[0.1, -0.35, 1]} esc={0.36} giro={f * 0.01} />
  <Pos bloom={1.4} /></>; }}</CP>;
// 17 · mais gás carbônico: vulcões soltando colunas de gás (câmera passando)
const S17: React.FC = () => <CP>{(f) => <>
  <Cam pos={[-1.6 + f * 0.04, 0.7, 2.6]} alvo={[f * 0.03, 0.4, 0]} /><Luzes sol={[2, 3, 2]} i={1.8} amb={0.35} /><color attach="background" args={['#4a3a32']} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[12, 8]} /><meshStandardMaterial color="#3a2e26" roughness={1} /></mesh>
  {[[-1.4, -0.6, 0.7], [0.2, -1, 0.9], [1.6, -0.4, 0.6], [2.8, -1.2, 0.8]].map(([x, z, s], i) => <group key={i} position={[x, 0, z]}>
    <mesh position={[0, 0.4 * s, 0]}><coneGeometry args={[0.7 * s, 0.8 * s, 24]} /><meshStandardMaterial color="#4a3a30" roughness={1} flatShading /></mesh>
    <Brilho pos={[0, 0.8 * s, 0]} s={0.3} cor="#ff6a20" o={0.9} />
    <Nuvem n={160} sem={'v17' + i} origem={new THREE.Vector3(0, 0.85 * s, 0)} dir={new THREE.Vector3(0, 1, 0)} t={f + 40} raio={2.2} cor="#9a948c" tam={0.35} o={0.55} /></group>)}
  <Pos bloom={0.6} /></>}</CP>;
// 18 · 70 graus: o supercontinente futuro visto da órbita, atmosfera alaranjada e o interior em brasa
const S18: React.FC = () => <CP>{(f) => <>
  <Cam pos={camLL(20 - f * 0.1, 30 + f * 0.25, 2.7)} /><Luzes sol={[3, 2, 3]} i={2.2} amb={0.2} /><Estrelas sem="p18" />
  <Super s="ultima" calor={0.6 + pr(f, 0, 40) * 0.6} atmCor="1.0,0.45,0.15" />
  <Pos bloom={1.3} /></>}</CP>;
// 19 · só 8 a 16% habitável: uma faixa verde fina nas bordas, o resto laranja (câmera de cima)
const S19: React.FC = () => <CP>{(f) => <>
  <Cam pos={camLL(40, 25 + f * 0.15, 3.3)} /><Luzes sol={[2, 4, 3]} i={2} amb={0.3} /><Estrelas sem="p19" />
  <Super s="ultima" calor={0.75} verde={0.9 * pr(f, 10, 30)} />
  <Pos bloom={0.9} /></>}</CP>;
// 20 · o resto vira forno: chão em brasa e pedras incandescentes, câmera baixa
const S20: React.FC = () => <CP>{(f, _t, pt) => <>
  <Cam pos={[0, 0.35, 1.6 - f * 0.01]} alvo={[0, 0.05, -0.6]} tremor={0.01} /><Luzes sol={[0, 5, 2]} i={0.8} amb={0.25} /><color attach="background" args={['#2a0a02']} /><fog attach="fog" args={['#3a0d02', 2, 7]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[12, 12]} /><meshStandardMaterial color="#2a1610" roughness={1} emissive="#ff4a0a" emissiveMap={rep(pt.rachas, 6)} emissiveIntensity={2.2 + Math.sin(f * 0.4) * 0.3} /></mesh>
  <Pedras n={46} sem="p20" origem={new THREE.Vector3(0, 0.0, -0.5)} dir={new THREE.Vector3(0, 0.05, 0)} abre={3} t={6 + f * 0.05} vel={0.06} tam={0.045} cor="#3a2418" brasa={2.5} />
  <Brilho pos={[0, 0.4, -2.5]} s={4} cor="#ff4a10" o={0.45} />
  <Pos bloom={1.4} /></>}</CP>;
// 21 · quatro mapas do futuro: quatro globos girando lado a lado
const QUATRO: [Cfg, number, [number, number, number]][] = [['ultima', -0.5, [-0.62, 0.75, 0]], ['novo', 2.6, [0.62, 0.75, 0]], ['amasia', 0.6, [-0.62, -0.55, 0]], ['aurica', 2.4, [0.62, -0.55, 0]]];
const S21: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.1, 6.2 + f * 0.008]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 2, 4]} i={2.4} amb={0.3} /><Estrelas sem="p21" />
  {QUATRO.map(([s, g, p], i) => <group key={s} scale={pr(f, i * 6, i * 6 + 14)}><Super s={s} pos={p} esc={0.5} giro={g + f * 0.012} /></group>)}
  <Pos bloom={0.7} /></>}</CP>;
// 22 · ninguém sabe qual: os quatro globos em volta de um ponto de interrogação de luz (câmera recuando)
const INTERROG = (() => { const pts: THREE.Vector3[] = []; for (let i = 0; i <= 40; i++) { const a = Math.PI * 1.05 - i / 40 * Math.PI * 1.45; pts.push(new THREE.Vector3(Math.cos(a) * 0.32, 0.45 + Math.sin(a) * 0.32, 0)); }
  for (let i = 1; i <= 10; i++) pts.push(new THREE.Vector3(0, 0.13 - i * 0.03, 0)); return pts; })();
const S22: React.FC = () => <CP>{(f) => <>
  <Cam pos={[0, 0.1, 5.4 + f * 0.012]} alvo={[0, 0.1, 0]} /><Luzes sol={[2, 2, 4]} i={2} amb={0.25} /><Estrelas sem="p22" />
  {QUATRO.map(([s, g], i) => { const a = i / 4 * Math.PI * 2 + 0.785 + f * 0.01; return <Super key={s} s={s} pos={[Math.cos(a) * 0.72, 0.1 + Math.sin(a) * 1.45, -0.3]} esc={0.34} giro={g + f * 0.015} />; })}
  {INTERROG.map((p, i) => <Brilho key={i} pos={[p.x, p.y, p.z]} s={0.12} cor="#9fe6ff" o={pr(f, i * 0.6, i * 0.6 + 4)} />)}
  <Brilho pos={[0, -0.32, 0]} s={0.28} cor="#9fe6ff" o={pr(f, 34, 40)} />
  <Pos bloom={1.3} /></>}</CP>;

const PLANO: K.Plano = [
  ['os continentes andam', S1],
  ['velocidade da sua unha', S2],
  ['agora imagina', S3],
  ['com voce em cima', S4],
  ['o oceano atlantico', S5],
  ['e o nordeste', S6],
  ['como uma peca', S7],
  ['porque ja foi', S8],
  ['voce sai do brasil', S9],
  ['so que o pior', S10],
  ['longe do mar', S11],
  ['o meio do supercontinente', S12],
  ['na pangeia de verdade', S13],
  ['veroes de cinquenta', S14],
  ['daqui a uns', S15],
  ['num dos modelos', S16],
  ['o ar vai ter', S17],
  ['e o calor chega', S18],
  ['so oito a dezesseis', S19],
  ['o resto vira forno', S20],
  ['e o mais estranho', S21],
  ['e ninguem sabe', S22],
];
const S = K.criarShort(W, PLANO, 'pangeia/narracao.mp3', 'e ninguem sabe', undefined, {legenda: 56});
export const Video = S.Video; export const DURACAO = S.DURACAO;
// thumb: "BRASIL COLA NA ÁFRICA" — o Nordeste vermelho encaixando no Golfo da Guiné, com a emenda em brasa
export const ThumbCena: React.FC = () => <CP>{() => <>
  <Cam pos={camLL(0, -8, 1.75)} /><Luzes sol={[1, 2, 4]} i={2.6} amb={0.3} /><Estrelas sem="pt" />
  <Globo k={0.97} nordeste={1} guine={1} />
  {Array.from({length: 14}, (_, i) => { const p = v(-3 + i * 0.8, -6 + i * 0.6, 1.03); return <Brilho key={i} pos={[p.x, p.y, p.z]} s={0.12} cor="#ff7a20" o={0.9} />; })}
  <Pos bloom={1.1} /></>}</CP>;
void AbsoluteFill;
