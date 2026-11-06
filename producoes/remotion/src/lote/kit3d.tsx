// Kit 3D dos Shorts (06/11/2026): todo vídeo do canal é feito em Remotion 3D (regra do dono). Peças extraídas do LuaBate.tsx.
// Cada cena usa C3 (carrega as texturas antes de montar o canvas, põe título e etiqueta por cima). Render com --gl=swangle.
// Não use hooks dentro da função de cena do C3 (React #310): crie materiais fora do componente.
import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, delayRender, continueRender, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {EffectComposer, Bloom, Vignette} from '@react-three/postprocessing';
import * as THREE from 'three';
import {FONTE, Etiqueta, Titulo, Texto, OURO} from '../comum';
export {THREE};
export const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const pr = (f: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], {...cl, easing: e});
void FONTE;

// ---------- texturas (carregadas uma vez, antes de montar cada canvas) ----------
export type Tex = Record<string, THREE.Texture>;
let promessa: Promise<Tex> | null = null;
const carregar = () => {
  if (!promessa) {
    const L = new THREE.TextureLoader();
    const nomes: Record<string, string> = {dia: 'terra_dia.jpg', normal: 'terra_normal.jpg', spec: 'terra_spec.jpg', nuvem: 'nuvens_alpha.jpg', lua: 'moon_1024.jpg'};
    promessa = Promise.all(Object.entries(nomes).map(([k, f]) => new Promise<[string, THREE.Texture]>((ok, erro) => L.load(staticFile('teste3d/' + f), (t) => ok([k, t]), undefined, erro))))
      .then((xs) => { const o: Tex = {}; xs.forEach(([k, t]) => { o[k] = t; }); o.dia.colorSpace = THREE.SRGBColorSpace; o.lua.colorSpace = THREE.SRGBColorSpace; return o; });
  }
  return promessa;
};
export const useTex = () => {
  const [tex, setTex] = useState<Tex | null>(null);
  const [h] = useState(() => delayRender('texturas 3D'));
  useEffect(() => { carregar().then((t) => { setTex(t); continueRender(h); }); }, [h]);
  return tex;
};

// ---------- peças 3D ----------
export const bolinha = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
})();
export const Cam: React.FC<{pos: [number, number, number]; alvo?: [number, number, number]; tremor?: number}> = ({pos, alvo = [0, 0, 0], tremor = 0}) => {
  const {camera} = useThree();
  const f = useCurrentFrame();
  camera.position.set(pos[0] + (random('cx' + f) - 0.5) * tremor, pos[1] + (random('cy' + f) - 0.5) * tremor, pos[2]);
  camera.lookAt(alvo[0], alvo[1], alvo[2]);
  return null;
};
export const Estrelas: React.FC<{sem?: string; n?: number}> = ({sem = 'e', n = 2000}) => {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry(); const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const v = new THREE.Vector3(random(sem + 'x' + i) - 0.5, random(sem + 'y' + i) - 0.5, random(sem + 'z' + i) - 0.5).normalize().multiplyScalar(80 + random(sem + 'r' + i) * 40); p.set([v.x, v.y, v.z], i * 3); }
    g.setAttribute('position', new THREE.BufferAttribute(p, 3)); return g;
  }, [sem, n]);
  return <points geometry={geo}><pointsMaterial size={0.45} map={bolinha} transparent depthWrite={false} color="#dfe8ff" /></points>;
};
export const atmMat = (cor = '0.35,0.65,1.0', k = 1.6) => new THREE.ShaderMaterial({
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
  fragmentShader: `varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(${cor},1.0)*f*${k.toFixed(2)}; }`,
  blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false,
});
export const Terra: React.FC<{tex: Tex; r?: number; rot?: [number, number, number]; nuvens?: boolean; atm?: boolean; pos?: [number, number, number]}> = ({tex, r = 1, rot = [0.3, 0, 0], nuvens = true, atm = true, pos = [0, 0, 0]}) => {
  const a = useMemo(() => atmMat(), []);
  return (
    <group position={pos} rotation={rot} scale={r}>
      <mesh><sphereGeometry args={[1, 128, 128]} /><meshStandardMaterial map={tex.dia} normalMap={tex.normal} normalScale={new THREE.Vector2(0.6, 0.6)} roughnessMap={tex.spec} roughness={0.85} /></mesh>
      {nuvens && <mesh><sphereGeometry args={[1.012, 96, 96]} /><meshStandardMaterial color="#fff" alphaMap={tex.nuvem} transparent opacity={0.75} depthWrite={false} /></mesh>}
      {atm && <mesh material={a} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>}
    </group>
  );
};
export const Lua: React.FC<{tex: Tex; r?: number; pos?: [number, number, number]; rot?: [number, number, number]; emissivo?: number}> = ({tex, r = 0.27, pos = [0, 0, 0], rot = [0, 0, 0], emissivo = 0}) => (
  <mesh position={pos} rotation={rot} scale={r}><sphereGeometry args={[1, 96, 96]} /><meshStandardMaterial map={tex.lua} bumpMap={tex.lua} bumpScale={0.02} roughness={1} emissive="#ff5a10" emissiveIntensity={emissivo} /></mesh>
);
export const Brilho: React.FC<{pos: [number, number, number]; s: number; cor?: string; o?: number}> = ({pos, s, cor = '#ffb060', o = 1}) => (
  <sprite position={pos} scale={s}><spriteMaterial map={bolinha} color={cor} transparent opacity={o} blending={THREE.AdditiveBlending} depthWrite={false} /></sprite>
);
export const Pos: React.FC<{bloom?: number}> = ({bloom = 1.2}) => (
  <EffectComposer><Bloom intensity={bloom} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur /><Vignette eskil={false} offset={0.25} darkness={0.7} /></EffectComposer>
);
export const Luzes: React.FC<{sol?: [number, number, number]; i?: number; amb?: number}> = ({sol = [-3, 2, 4], i = 2.6, amb = 0.08}) => (
  <><ambientLight intensity={amb} /><directionalLight position={sol} intensity={i} /></>
);

// cena 3D genérica: carrega as texturas, monta o canvas e põe o texto por cima
export const C3: React.FC<{children: (f: number, tex: Tex) => React.ReactNode; t?: string; sub?: string; etq: string; fov?: number; ty?: number; cor?: string}> = ({children, t, sub, etq, fov = 40, ty, cor}) => {
  const tex = useTex();
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#010208'}}>
      {tex && <ThreeCanvas width={width} height={height} camera={{fov, near: 0.01, far: 400, position: [0, 0, 5]}} gl={{antialias: true}}>
        <color attach="background" args={['#010208']} />
        {children(f, tex)}
      </ThreeCanvas>}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.45), transparent 22%, transparent 70%, rgba(0,0,0,.55))'}} />
      <Etiqueta texto={etq} />
      {t && <Titulo texto={t} y={ty ?? 290} size={104} cor={cor} />}
      {sub && <Texto y={(ty ?? 290) + 240} size={52} cor={OURO} delay={6}>{sub}</Texto>}
    </AbsoluteFill>
  );
};

// fragmentos: pedaços de rocha com rotação e inércia
export const geoPedra = new THREE.DodecahedronGeometry(1, 0);
export const Pedras: React.FC<{n: number; sem: string; origem: THREE.Vector3; dir?: THREE.Vector3; abre?: number; t: number; vel?: number; tam?: number; cor?: string; brasa?: number}> = ({n, sem, origem, dir, abre = 1, t, vel = 0.02, tam = 0.03, cor = '#5a4a3e', brasa = 1}) => (
  <group>{Array.from({length: n}, (_, i) => {
    const r = new THREE.Vector3(random(sem + 'a' + i) - 0.5, random(sem + 'b' + i) - 0.5, random(sem + 'c' + i) - 0.5).normalize();
    const d = dir ? dir.clone().add(r.multiplyScalar(abre)).normalize() : r;
    const v = vel * (0.4 + random(sem + 'v' + i));
    const p = origem.clone().add(d.multiplyScalar(v * t * (1 - Math.min(0.5, t / 500))));
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(random(sem + 'x' + i), random(sem + 'y' + i), 0.3).normalize(), t * (0.03 + random(sem + 'g' + i) * 0.1));
    const s = tam * (0.3 + random(sem + 's' + i) ** 2 * 1.4);
    return <mesh key={i} geometry={geoPedra} position={p} quaternion={q} scale={[s, s * 0.7, s * 0.85]}><meshStandardMaterial color={cor} roughness={1} flatShading emissive="#ff5a10" emissiveIntensity={brasa * Math.max(0, 1 - t / 60)} /></mesh>;
  })}</group>
);
// nuvem de partículas (poeira, vapor, detritos)
export const Nuvem: React.FC<{n: number; sem: string; origem: THREE.Vector3; t: number; raio: number; cor: string; tam?: number; o?: number; add?: boolean; dir?: THREE.Vector3}> = ({n, sem, origem, t, raio, cor, tam = 0.06, o = 0.8, add, dir}) => {
  const geo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); return g; }, [n]);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < n; i++) {
    const r = new THREE.Vector3(random(sem + 'x' + i) - 0.5, random(sem + 'y' + i) - 0.5, random(sem + 'z' + i) - 0.5).normalize();
    const d = dir ? dir.clone().multiplyScalar(0.7).add(r).normalize() : r;
    const k = (1 - Math.exp(-t / (20 + random(sem + 'k' + i) * 40))) * raio * (0.3 + random(sem + 'd' + i));
    const p = origem.clone().add(d.multiplyScalar(k)); pos.setXYZ(i, p.x, p.y, p.z);
  }
  pos.needsUpdate = true;
  return <points geometry={geo}><pointsMaterial size={tam} map={bolinha} transparent depthWrite={false} color={cor} opacity={o} blending={add ? THREE.AdditiveBlending : THREE.NormalBlending} /></points>;
};
// shader de "capa" sobre uma esfera: disco, rachaduras ou lava, a partir de uma direção
export const capaMat = (modo: 'disco' | 'racha' | 'lava') => new THREE.ShaderMaterial({
  uniforms: {uC: {value: new THREE.Vector3(0, 0, 1)}, uR: {value: 0.3}, uT: {value: 0}, uK: {value: 1}},
  vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
  fragmentShader: `uniform vec3 uC; uniform float uR; uniform float uT; uniform float uK; varying vec3 vP;
    vec3 h3(vec3 p){ p = vec3(dot(p,vec3(127.1,311.7,74.7)), dot(p,vec3(269.5,183.3,246.1)), dot(p,vec3(113.5,271.9,124.6))); return fract(sin(p)*43758.5453); }
    vec2 voro(vec3 x){ vec3 p = floor(x); vec3 f = fract(x); float d1 = 8.0, d2 = 8.0;
      for(int k=-1;k<=1;k++) for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ vec3 b = vec3(float(i),float(j),float(k)); vec3 r = b + h3(p+b) - f; float d = dot(r,r); if(d<d1){ d2=d1; d1=d; } else if(d<d2){ d2=d; } }
      return vec2(sqrt(d1), sqrt(d2)); }
    void main(){
      float ang = acos(clamp(dot(vP, normalize(uC)), -1.0, 1.0));
      ${modo === 'disco' ? `float a = 1.0 - smoothstep(uR - 0.01, uR, ang); float borda = smoothstep(uR - 0.025, uR - 0.008, ang) * a;
        gl_FragColor = vec4(mix(vec3(0.85,0.85,0.8), vec3(1.0,0.82,0.25), borda), a * (0.35 + 0.6 * borda) * uK);` : ''}
      ${modo === 'racha' ? `vec3 q = vP*4.0 + 0.3*vec3(sin(vP.y*8.0), sin(vP.z*9.0), sin(vP.x*7.0)); vec2 v = voro(q);
        float borda = 1.0 - smoothstep(0.0, 0.04, v.y - v.x); float frente = smoothstep(uR, uR - 0.3, ang);
        float l = borda * frente; gl_FragColor = vec4(vec3(1.0,0.45,0.08)*2.6*(0.85+0.15*sin(uT*8.0+vP.x*30.0)), l);` : ''}
      ${modo === 'lava' ? `vec3 q = vP*3.0; vec2 v = voro(q + vec3(uT*0.05)); vec2 w = voro(q*3.0);
        float b = 1.0 - smoothstep(0.0, 0.035, v.y - v.x); float b2 = 1.0 - smoothstep(0.0, 0.02, w.y - w.x);
        float frente = smoothstep(uR, uR - 0.4, ang); float l = max(b, b2*0.7);
        vec3 cor = mix(vec3(0.12,0.04,0.02), vec3(1.0,0.45,0.08)*1.5, l*l); gl_FragColor = vec4(cor, frente * uK);` : ''}
    }`,
  transparent: true, depthWrite: false,
});

