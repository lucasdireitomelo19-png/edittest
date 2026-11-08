// Peças 3D da Pangeia compartilhadas (globo com continentes móveis, supercontinentes, rótulos neon). Extraídas do Short Pangeia.tsx (lado-101).
// Os rótulos projetam o ponto 3D com a mesma câmera do C3 (fov 40) e usam o tamanho do vídeo atual (Short ou longo).
import React, {useEffect, useMemo, useState} from 'react';
import {staticFile, delayRender, continueRender, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTE} from '../comum';
import {C3, THREE, Tex} from './kit3d';
import CFG from '../videos/pangeia.cfg.json';
export type Cfg = keyof typeof CFG;
export type Cont = 'sa' | 'af' | 'na' | 'eu' | 'au' | 'an';
export const CONTS: Cont[] = ['an', 'au', 'sa', 'na', 'eu', 'af'];
export const SC: Cfg[] = ['pangeia', 'ultima', 'novo', 'amasia', 'aurica'];

// ---------- texturas próprias ----------
export type PT = Record<string, THREE.Texture>;
let prom: Promise<PT> | null = null;
export const carregar = () => {
  if (!prom) {
    const L = new THREE.TextureLoader();
    const nomes: string[] = ['oceano.jpg', 'rachas.png', ...CONTS.map((c) => `m_${c}.png`), 'm_nordeste.png', 'm_guine.png', 'm_brasil.png'];
    SC.forEach((s) => nomes.push(`sc_${s}.jpg`, `sc_${s}_calor.png`, `sc_${s}_borda.png`));
    prom = Promise.all(nomes.map((n) => new Promise<[string, THREE.Texture]>((ok, erro) => L.load(staticFile('pangeia/' + n), (t) => ok([n.replace(/\.(jpg|png)$/, ''), t]), undefined, erro))))
      .then((xs) => { const o: PT = {}; xs.forEach(([k, t]) => { if (!k.startsWith('m_') && !k.endsWith('_calor') && !k.endsWith('_borda')) t.colorSpace = THREE.SRGBColorSpace; o[k] = t; }); return o; });
  }
  return prom;
};
export const usePT = () => {
  const [t, setT] = useState<PT | null>(null);
  const [h] = useState(() => delayRender('texturas pangeia'));
  useEffect(() => { carregar().then((x) => { setT(x); continueRender(h); }); }, [h]);
  return t;
};
export const PTX = React.createContext<PT | null>(null);
export const TXC = React.createContext<Tex | null>(null);
// cena com as texturas da Pangeia + rótulos por cima
export const CP: React.FC<{children: (f: number, tex: Tex, pt: PT) => React.ReactNode; rot?: (f: number) => React.ReactNode}> = ({children, rot}) => {
  const pt = usePT();
  if (!pt) return null;
  return <PTX.Provider value={pt}><C3>{(f, tex) => <TXC.Provider value={tex}>{children(f, tex, pt)}</TXC.Provider>}</C3>{rot && <RotF rot={rot} />}</PTX.Provider>;
};
export const RotF: React.FC<{rot: (f: number) => React.ReactNode}> = ({rot}) => { const f = useCurrentFrame(); return <>{rot(f)}</>; };

// ---------- geometria ----------
export const v = (la: number, lo: number, r = 1) => { const a = THREE.MathUtils.degToRad(la), b = THREE.MathUtils.degToRad(lo); return new THREE.Vector3(Math.cos(a) * Math.cos(b) * r, Math.sin(a) * r, -Math.cos(a) * Math.sin(b) * r); };
export const ID = new THREE.Quaternion();
export const qCfg = (cfg: Cfg, c: Cont, k: number) => {
  const [x, y, z, ang] = (CFG[cfg] as Record<string, number[]>)[c];
  const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(x, y, z).normalize(), ang);
  return ID.clone().slerp(q, k);
};
// posição de câmera olhando para (lat, lon)
export const camLL = (la: number, lo: number, d: number): [number, number, number] => { const p = v(la, lo, d); return [p.x, p.y, p.z]; };
// projeta um ponto 3D na tela (mesma câmera do C3: fov 40, 1080x1920)
export const projeta = (pos: [number, number, number], alvo: [number, number, number], p: THREE.Vector3, Wd = 1080, Hd = 1920) => {
  const c = new THREE.PerspectiveCamera(40, Wd / Hd, 0.01, 400); c.position.set(...pos); c.lookAt(...alvo); c.updateMatrixWorld(); c.updateProjectionMatrix();
  const q = p.clone().project(c); return {x: (q.x + 1) / 2 * Wd, y: (1 - q.y) / 2 * Hd, atras: q.z > 1};
};

// ---------- rótulo neon (nomes de lugares, liberados pelo dono para a Pangeia) ----------
export const Rotulo: React.FC<{x: number; y: number; txt: string; o: number; tam?: number}> = ({x, y, txt, o, tam = 66}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${0.85 + 0.15 * o})`, opacity: o, fontFamily: FONTE, fontWeight: 900, fontSize: tam, color: '#fff', letterSpacing: 1, whiteSpace: 'nowrap',
    textShadow: '0 0 10px #39d8ff, 0 0 26px #1fb6ff, 0 0 52px #0a8cff, 0 4px 8px rgba(0,0,0,.8)'}}>{txt}</div>
);
export const R3: React.FC<{cam: [number, number, number]; alvo?: [number, number, number]; p: THREE.Vector3; txt: string; o: number; dy?: number; tam?: number}> = ({cam, alvo = [0, 0, 0], p, txt, o, dy = 0, tam}) => {
  const {width: Wd, height: Hd} = useVideoConfig(); const s = projeta(cam, alvo, p, Wd, Hd); if (s.atras) return null;
  return <Rotulo x={Math.min(Wd - 180, Math.max(180, s.x))} y={s.y + dy} txt={txt} o={o} tam={tam} />;
};

// ---------- globo com continentes móveis ----------
export const Globo: React.FC<{cfg?: Cfg; k: number; nordeste?: number; guine?: number; atm?: boolean; giro?: number}> = ({cfg = 'pangeia', k, nordeste = 0, guine = 0, atm = true, giro = 0}) => {
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
export const atmM = (cor = '0.35,0.65,1.0', kk = 1.6) => new THREE.ShaderMaterial({
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
  fragmentShader: `varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(${cor},1.0)*f*${kk.toFixed(2)}; }`,
  blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false,
});
// supercontinente pronto (textura assada), com calor no interior e faixa verde na borda
export const Super: React.FC<{s: Cfg; calor?: number; verde?: number; atmCor?: string; pos?: [number, number, number]; esc?: number; giro?: number}> = ({s, calor = 0, verde = 0, atmCor, pos = [0, 0, 0], esc = 1, giro = 0}) => {
  const pt = React.useContext(PTX)!;
  const a = useMemo(() => atmM(atmCor ?? '0.35,0.65,1.0'), [atmCor]);
  return <group position={pos} scale={esc} rotation={[0, giro, 0]}>
    <mesh><sphereGeometry args={[1, 128, 128]} /><meshStandardMaterial map={pt['sc_' + s]} roughness={0.8} /></mesh>
    {calor > 0 && <mesh><sphereGeometry args={[1.003, 96, 96]} /><meshBasicMaterial color="#ff4a0a" alphaMap={pt[`sc_${s}_calor`]} transparent opacity={calor} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>}
    {verde > 0 && <mesh><sphereGeometry args={[1.005, 96, 96]} /><meshBasicMaterial color="#3dff6a" alphaMap={pt[`sc_${s}_borda`]} transparent opacity={verde} depthWrite={false} /></mesh>}
    <mesh material={a} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>
  </group>;
};
