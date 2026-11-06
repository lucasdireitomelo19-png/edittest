// Short "E se a LUA BATESSE na Terra? Isso JÁ aconteceu (e a Lua nasceu dali)". Roteiro short_lua_bate_terra.md (v1), aprovado pelo dono em 06/11.
// Pedido do dono: TUDO em Remotion 3D (cada cena é uma cena Three.js própria, nenhuma repetida). Voz Brian. Não é POV.
// Cuidados: sem anel em volta da Terra (não repetir o v26), nada gráfico, sem altura de ondas; Theia e as massas no manto como HIPÓTESE.
// Texturas: Terra e Lua dos mapas dos exemplos do Three.js (derivados da NASA Blue Marble e do LRO). Renderizar com --gl=swangle.
import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, delayRender, continueRender, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {EffectComposer, Bloom, Vignette} from '@react-three/postprocessing';
import * as THREE from 'three';
import {Palavra, FONTE, Etiqueta, Titulo, Texto, OURO, VERMELHO, CIANO, VERDE} from '../comum';
import * as K from '../lote/kit';
import palavras from './luabate.palavras.json';

const W = palavras as Palavra[];
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const pr = (f: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], {...cl, easing: e});
const ROSA = '#ff6fae';

// ---------- texturas (carregadas uma vez, antes de montar cada canvas) ----------
type Tex = Record<string, THREE.Texture>;
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
const useTex = () => {
  const [tex, setTex] = useState<Tex | null>(null);
  const [h] = useState(() => delayRender('texturas 3D'));
  useEffect(() => { carregar().then((t) => { setTex(t); continueRender(h); }); }, [h]);
  return tex;
};

// ---------- peças 3D ----------
const bolinha = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
})();
const Cam: React.FC<{pos: [number, number, number]; alvo?: [number, number, number]; tremor?: number}> = ({pos, alvo = [0, 0, 0], tremor = 0}) => {
  const {camera} = useThree();
  const f = useCurrentFrame();
  camera.position.set(pos[0] + (random('cx' + f) - 0.5) * tremor, pos[1] + (random('cy' + f) - 0.5) * tremor, pos[2]);
  camera.lookAt(alvo[0], alvo[1], alvo[2]);
  return null;
};
const Estrelas: React.FC<{sem?: string; n?: number}> = ({sem = 'e', n = 2000}) => {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry(); const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const v = new THREE.Vector3(random(sem + 'x' + i) - 0.5, random(sem + 'y' + i) - 0.5, random(sem + 'z' + i) - 0.5).normalize().multiplyScalar(80 + random(sem + 'r' + i) * 40); p.set([v.x, v.y, v.z], i * 3); }
    g.setAttribute('position', new THREE.BufferAttribute(p, 3)); return g;
  }, [sem, n]);
  return <points geometry={geo}><pointsMaterial size={0.45} map={bolinha} transparent depthWrite={false} color="#dfe8ff" /></points>;
};
const atmMat = (cor = '0.35,0.65,1.0', k = 1.6) => new THREE.ShaderMaterial({
  vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
  fragmentShader: `varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(${cor},1.0)*f*${k.toFixed(2)}; }`,
  blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false,
});
const Terra: React.FC<{tex: Tex; r?: number; rot?: [number, number, number]; nuvens?: boolean; atm?: boolean; pos?: [number, number, number]}> = ({tex, r = 1, rot = [0.3, 0, 0], nuvens = true, atm = true, pos = [0, 0, 0]}) => {
  const a = useMemo(() => atmMat(), []);
  return (
    <group position={pos} rotation={rot} scale={r}>
      <mesh><sphereGeometry args={[1, 128, 128]} /><meshStandardMaterial map={tex.dia} normalMap={tex.normal} normalScale={new THREE.Vector2(0.6, 0.6)} roughnessMap={tex.spec} roughness={0.85} /></mesh>
      {nuvens && <mesh><sphereGeometry args={[1.012, 96, 96]} /><meshStandardMaterial color="#fff" alphaMap={tex.nuvem} transparent opacity={0.75} depthWrite={false} /></mesh>}
      {atm && <mesh material={a} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>}
    </group>
  );
};
const Lua: React.FC<{tex: Tex; r?: number; pos?: [number, number, number]; rot?: [number, number, number]; emissivo?: number}> = ({tex, r = 0.27, pos = [0, 0, 0], rot = [0, 0, 0], emissivo = 0}) => (
  <mesh position={pos} rotation={rot} scale={r}><sphereGeometry args={[1, 96, 96]} /><meshStandardMaterial map={tex.lua} bumpMap={tex.lua} bumpScale={0.02} roughness={1} emissive="#ff5a10" emissiveIntensity={emissivo} /></mesh>
);
const Brilho: React.FC<{pos: [number, number, number]; s: number; cor?: string; o?: number}> = ({pos, s, cor = '#ffb060', o = 1}) => (
  <sprite position={pos} scale={s}><spriteMaterial map={bolinha} color={cor} transparent opacity={o} blending={THREE.AdditiveBlending} depthWrite={false} /></sprite>
);
const Pos: React.FC<{bloom?: number}> = ({bloom = 1.2}) => (
  <EffectComposer><Bloom intensity={bloom} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur /><Vignette eskil={false} offset={0.25} darkness={0.7} /></EffectComposer>
);
const Luzes: React.FC<{sol?: [number, number, number]; i?: number; amb?: number}> = ({sol = [-3, 2, 4], i = 2.6, amb = 0.08}) => (
  <><ambientLight intensity={amb} /><directionalLight position={sol} intensity={i} /></>
);

// cena 3D genérica: carrega as texturas, monta o canvas e põe o texto por cima
const C3: React.FC<{children: (f: number, tex: Tex) => React.ReactNode; t?: string; sub?: string; etq: string; fov?: number; ty?: number; cor?: string}> = ({children, t, sub, etq, fov = 40, ty, cor}) => {
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
const geoPedra = new THREE.DodecahedronGeometry(1, 0);
const Pedras: React.FC<{n: number; sem: string; origem: THREE.Vector3; dir?: THREE.Vector3; abre?: number; t: number; vel?: number; tam?: number; cor?: string; brasa?: number}> = ({n, sem, origem, dir, abre = 1, t, vel = 0.02, tam = 0.03, cor = '#5a4a3e', brasa = 1}) => (
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
const Nuvem: React.FC<{n: number; sem: string; origem: THREE.Vector3; t: number; raio: number; cor: string; tam?: number; o?: number; add?: boolean; dir?: THREE.Vector3}> = ({n, sem, origem, t, raio, cor, tam = 0.06, o = 0.8, add, dir}) => {
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
const capaMat = (modo: 'disco' | 'racha' | 'lava') => new THREE.ShaderMaterial({
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
        float b = 1.0 - smoothstep(0.0, 0.06, v.y - v.x); float b2 = 1.0 - smoothstep(0.0, 0.04, w.y - w.x);
        float frente = smoothstep(uR, uR - 0.4, ang); float l = max(b, b2*0.7);
        vec3 cor = mix(vec3(0.12,0.04,0.02), vec3(1.0,0.5,0.1)*2.4, l); gl_FragColor = vec4(cor, frente * uK);` : ''}
    }`,
  transparent: true, depthWrite: false,
});

// ---------- cenas (cada uma é um desenho 3D próprio) ----------
// 1 · a Lua gigante descendo sobre a Terra
const S1: React.FC = () => <C3 t="SE A LUA CAÍSSE…" etq="ANIMAÇÃO 3D">{(f, tex) => <>
  <Cam pos={[0, -0.4, 4.2]} alvo={[0, 0.3, 0]} /><Luzes sol={[2, 3, 4]} /><Estrelas />
  <Terra tex={tex} r={1.6} pos={[0, -2.1, 0]} rot={[0.5, f * 0.002, 0]} />
  <Lua tex={tex} r={0.9} pos={[0.2, interpolate(f, [0, 50], [2.6, 1.5], cl), -1.5]} rot={[0, f * 0.01, 0]} />
  <Pos /></>}</C3>;
// 2 · ×10 milhões: um enxame de asteroides se multiplicando
const S2: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(1, f / 40);
  return <C3 etq="ANIMAÇÃO 3D · CÁLCULO">{(fr, tex) => <>
    <Cam pos={[0, 0, 6 + fr * 0.03]} /><Luzes /><Estrelas sem="s2" />
    {Array.from({length: Math.round(400 * n) + 1}, (_, i) => { const p = new THREE.Vector3(random('ax' + i) - 0.5, random('ay' + i) - 0.5, random('az' + i) - 0.5).multiplyScalar(i === 0 ? 0 : 7);
      return <mesh key={i} geometry={geoPedra} position={p} scale={i === 0 ? 0.25 : 0.05 + random('as' + i) * 0.06} rotation={[fr * 0.03 + i, fr * 0.02, 0]}><meshStandardMaterial color="#6a5a4a" flatShading emissive="#ff6a20" emissiveIntensity={0.6} /></mesh>; })}
    <Pos bloom={1.0} />
    </>}</C3>;
};
const S2b: React.FC = () => {
  const f = useCurrentFrame();
  const num = Math.round(interpolate(f, [0, 36], [1, 10000000], {...cl, easing: Easing.in(Easing.exp)}));
  return <AbsoluteFill><S2 /><div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: OURO, WebkitTextStroke: '8px #000', paintOrder: 'stroke fill', fontVariantNumeric: 'tabular-nums'}}>×{num.toLocaleString('pt-BR')}</div>
    <Texto y={960} size={50} cor="#fff">A ENERGIA DO ASTEROIDE DOS DINOSSAUROS</Texto></AbsoluteFill>;
};
// 3 · Chicxulub: um asteroide pequeno riscando a borda da Terra
const S3: React.FC = () => <C3 t="O ASTEROIDE DOS DINOSSAUROS" sub="CHICXULUB" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const p = new THREE.Vector3(interpolate(f, [0, 60], [-2.2, 0.15]), interpolate(f, [0, 60], [2.6, 0.95]), 0.3);
  return <><Cam pos={[0, 0, 3.2]} alvo={[0, -0.5, 0]} /><Luzes sol={[-2, 1, 3]} /><Estrelas sem="s3" />
    <Terra tex={tex} r={1.4} pos={[0, -1.4, 0]} rot={[0.2, 1.2, 0]} />
    <mesh geometry={geoPedra} position={p} scale={0.04}><meshStandardMaterial color="#6a5a4a" emissive="#ff7a30" emissiveIntensity={1.5} flatShading /></mesh>
    {Array.from({length: 40}, (_, i) => <Brilho key={i} pos={[p.x - i * 0.02 * 2.4 / 2.4, p.y + i * 0.02 * 1.65 / 2.4, p.z]} s={0.12 * (1 - i / 40)} o={0.8 * (1 - i / 40)} />)}
    <Pos /></>;
}}</C3>;
// 4 · a Lua sobre o Brasil, em escala
const brasilDisco = capaMat('disco');
const S4: React.FC = () => <C3 t="A LUA CABERIA NO BRASIL" sub="LUA: 3.474 KM · BRASIL: ~4.378 KM" etq="ANIMAÇÃO 3D · ESCALA">{(f, tex) => {
  // América do Sul de frente: longitude −52°, latitude −12°
  const lon = -52, lat = -12; const phi = (lon + 180) / 180 * Math.PI, th = (90 - lat) / 180 * Math.PI;
  const c = new THREE.Vector3(-Math.cos(phi) * Math.sin(th), Math.cos(th), Math.sin(phi) * Math.sin(th));
  brasilDisco.uniforms.uC.value = c; brasilDisco.uniforms.uR.value = 0.273 * pr(f, 6, 30); brasilDisco.uniforms.uK.value = 1;
  const giro = -Math.atan2(c.x, c.z);
  return <><Cam pos={[0, 0, 3.0]} /><Luzes sol={[1, 1, 4]} i={2.2} amb={0.25} /><Estrelas sem="s4" />
    <group rotation={[Math.asin(c.y) * 0.9, giro, 0]}><Terra tex={tex} nuvens={false} rot={[0, 0, 0]} /><mesh material={brasilDisco}><sphereGeometry args={[1.006, 128, 128]} /></mesh></group>
    <Pos bloom={0.6} /></>;
}}</C3>;
// 5 · a Lua em órbita, correndo a ~1 km/s
const S5: React.FC = () => <C3 t="ELA CORRE EM VOLTA DA TERRA" sub="~1 KM/S" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const a = f * 0.045; const R = 2.2; const p: [number, number, number] = [Math.cos(a) * R, 0, Math.sin(a) * R];
  return <><Cam pos={[0, 2.6, 4.4]} /><Luzes sol={[4, 2, 2]} /><Estrelas sem="s5" />
    <Terra tex={tex} r={0.7} rot={[0.3, f * 0.01, 0]} />
    <Lua tex={tex} r={0.19} pos={p} />
    {Array.from({length: 50}, (_, i) => { const b = a - i * 0.025; return <Brilho key={i} pos={[Math.cos(b) * R, 0, Math.sin(b) * R]} s={0.09 * (1 - i / 50)} cor="#9fd0ff" o={0.7 * (1 - i / 50)} />; })}
    <Pos /></>;
}}</C3>;
// 6 · pra cair, teria que parar: a Lua freando
const S6: React.FC = () => <C3 t="PRA CAIR, TERIA QUE PARAR" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const x = interpolate(f, [0, 40], [-2.5, 0.4], {...cl, easing: Easing.out(Easing.cubic)});
  return <><Cam pos={[0, 0, 4]} /><Luzes sol={[3, 1, 3]} /><Estrelas sem="s6" />
    <Lua tex={tex} r={0.6} pos={[x, 0.3, 0]} rot={[0, f * 0.02, 0]} />
    {Array.from({length: 24}, (_, i) => <mesh key={i} position={[x - 0.7 - i * 0.12 * (1 - pr(f, 0, 40)), 0.3 + (random('lr' + i) - 0.5) * 0.9, -0.2]}><boxGeometry args={[0.5 * (1 - pr(f, 0, 40)) + 0.001, 0.008, 0.008]} /><meshBasicMaterial color="#cfe0ff" transparent opacity={0.6} /></mesh>)}
    <Pos bloom={0.8} /></>;
}}</C3>;
// 7 · queda de quase 5 dias, acelerando no fim
const S7: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 66, Easing.in(Easing.cubic));
  const h = Math.round(k * 116); const d = Math.floor(h / 24);
  return <AbsoluteFill><C3 t="QUASE 5 DIAS CAINDO" etq="ANIMAÇÃO 3D · CÁLCULO">{(fr, tex) => <>
    <Cam pos={[3.2, 0.5, 3.2]} alvo={[0, 0.8, 0]} /><Luzes sol={[-2, 3, 3]} /><Estrelas sem="s7" />
    <Terra tex={tex} r={0.8} pos={[0, -0.6, 0]} rot={[0.3, fr * 0.004, 0]} />
    <Lua tex={tex} r={0.22} pos={[0, interpolate(k, [0, 1], [3.2, 0.5]), 0]} />
    <mesh position={[0, 1.4, 0]}><cylinderGeometry args={[0.004, 0.004, 2.6, 6]} /><meshBasicMaterial color="#ffd23f" transparent opacity={0.4} /></mesh>
    <Pos /></>}</C3>
    <div style={{position: 'absolute', top: 1180, width: '100%', textAlign: 'center', fontFamily: 'monospace', fontSize: 90, color: '#fff', textShadow: '0 4px 20px #000'}}>{d} DIAS {String(h % 24).padStart(2, '0')} H</div>
  </AbsoluteFill>;
};
// 8 · a Lua começa a rachar perto da Terra
const rachaLua = capaMat('racha');
const S8: React.FC = () => <C3 t="E NEM CHEGARIA INTEIRA" sub="LIMITE DE ROCHE: ~18 MIL KM" etq="ANIMAÇÃO 3D">{(f, tex) => {
  rachaLua.uniforms.uC.value = new THREE.Vector3(0.3, -0.5, 1); rachaLua.uniforms.uR.value = interpolate(f, [0, 60], [0.2, 2.6]); rachaLua.uniforms.uT.value = f / 30;
  return <><Cam pos={[0, 0.2, 3.4]} tremor={0.02} /><Luzes sol={[-2, 2, 3]} /><Estrelas sem="s8" />
    <group position={[0, 0.5, 0]} rotation={[0, f * 0.006, 0]}><Lua tex={tex} r={1} /><mesh material={rachaLua} scale={1.004}><sphereGeometry args={[1, 128, 128]} /></mesh></group>
    <Terra tex={tex} r={2.2} pos={[0.6, -3.1, -1]} rot={[0.4, 0.5, 0]} />
    <Pos bloom={1.3} /></>;
}}</C3>;
// 9 · a gravidade rasga a Lua em pedaços (sem anel: os pedaços se esticam numa trilha)
const S9: React.FC = () => <C3 t="A GRAVIDADE RASGARIA A LUA" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const pedacos = Array.from({length: 70}, (_, i) => {
    const r = new THREE.Vector3(random('px' + i) - 0.5, random('py' + i) - 0.5, random('pz' + i) - 0.5).multiplyScalar(0.9);
    const estica = f * 0.012 * (r.y + 0.5);
    return {p: new THREE.Vector3(r.x * (1 + f * 0.004), 0.6 + r.y - estica * 1.6, r.z), s: 0.05 + random('ps' + i) * 0.16, g: random('pg' + i)};
  });
  return <><Cam pos={[0, 0, 4.2]} alvo={[0, 0, 0]} /><Luzes sol={[-2, 2, 3]} /><Estrelas sem="s9" />
    {pedacos.map((x, i) => <mesh key={i} geometry={geoPedra} position={x.p} scale={x.s} rotation={[f * 0.02 * x.g, f * 0.015, i]}><meshStandardMaterial map={tex.lua} roughness={1} flatShading emissive="#ff5a10" emissiveIntensity={0.4} /></mesh>)}
    <Terra tex={tex} r={2.0} pos={[0, -3.4, -1]} rot={[0.5, 0.8, 0]} />
    <Pos /></>;
}}</C3>;
// 10 · o impacto: clarão no limbo da Terra
const S10: React.FC = () => <C3 t="O IMPACTO" etq="ANIMAÇÃO 3D">{(f, tex) => {
  const o = new THREE.Vector3(-0.35, 0.55, 0.76).normalize();
  const fl = Math.exp(-f / 10);
  return <><Cam pos={[0, 0, 3.6]} tremor={0.08 * Math.exp(-f / 20)} /><Luzes sol={[-2, 2, 3]} /><Estrelas sem="s10" />
    <Terra tex={tex} rot={[0.3, 0.4, 0]} />
    <Brilho pos={[o.x * 1.05, o.y * 1.05, o.z * 1.05]} s={0.6 + 2.5 * fl} o={1} />
    <Nuvem n={600} sem="s10" origem={o.clone()} t={f} raio={1.1} cor="#ff9a50" tam={0.05} add dir={o} />
    <Pedras n={40} sem="s10p" origem={o.clone()} dir={o} abre={0.9} t={f} vel={0.035} tam={0.05} />
    <pointLight position={[o.x * 1.3, o.y * 1.3, o.z * 1.3]} color="#ff7a2a" intensity={8 + 30 * fl} distance={3} />
    <Pos bloom={1.5} /></>;
}}</C3>;
// 11 · a crosta derretendo e o vapor
const lavaMat = capaMat('lava');
const S11: React.FC = () => <C3 t="DERRETER A CROSTA" sub="E FERVER OS OCEANOS · ESTIMATIVA" etq="ANIMAÇÃO 3D">{(f, tex) => {
  lavaMat.uniforms.uC.value = new THREE.Vector3(-0.2, 0.4, 1); lavaMat.uniforms.uR.value = interpolate(f, [0, 50], [0.4, 3.2]); lavaMat.uniforms.uT.value = f; lavaMat.uniforms.uK.value = 1;
  return <><Cam pos={[0, 0, 3.4]} /><Luzes sol={[-2, 2, 3]} i={1.6} /><Estrelas sem="s11" />
    <group rotation={[0.3, 0.6 + f * 0.003, 0]}><Terra tex={tex} nuvens={false} rot={[0, 0, 0]} /><mesh material={lavaMat} scale={1.005}><sphereGeometry args={[1, 160, 160]} /></mesh></group>
    <Nuvem n={900} sem="v11" origem={new THREE.Vector3(0, 0, 0)} t={f + 20} raio={1.5} cor="#d8d0c8" tam={0.08} o={0.25} />
    <Pos bloom={1.2} /></>;
}}</C3>;
// 12 · "isso já aconteceu": a Terra girando ao contrário (o tempo voltando)
const S12: React.FC = () => <C3 t="ISSO JÁ ACONTECEU" etq="ANIMAÇÃO 3D">{(f, tex) => <>
  <Cam pos={[0, 0, interpolate(f, [0, 36], [3.0, 4.2])]} /><Luzes sol={[2, 1, 3]} /><Estrelas sem="s12" />
  <Terra tex={tex} rot={[0.3, -f * 0.25, 0]} />
  {Array.from({length: 30}, (_, i) => { const a = i / 30 * Math.PI * 2 + f * 0.05; return <Brilho key={i} pos={[Math.cos(a) * 1.6, Math.sin(a) * 1.6, -0.5]} s={0.08} cor={CIANO} o={0.6} />; })}
  <Pos /></>}</C3>;
// 13 · a Terra primitiva, quente
const quente = capaMat('lava');
const S13: React.FC = () => <C3 t="A TERRA PRIMITIVA" sub="HIPÓTESE MAIS ACEITA" etq="ANIMAÇÃO 3D · HIPÓTESE">{(f, tex) => {
  quente.uniforms.uC.value = new THREE.Vector3(0, 0, 1); quente.uniforms.uR.value = 4.0; quente.uniforms.uT.value = f * 0.5; quente.uniforms.uK.value = 1;
  return <><Cam pos={[0, 0, 3.2]} /><Luzes sol={[-2, 1, 3]} i={1.5} /><Estrelas sem="s13" />
    <group rotation={[0.2, f * 0.006, 0]}><mesh><sphereGeometry args={[1, 96, 96]} /><meshStandardMaterial color="#2a1a14" roughness={1} /></mesh><mesh material={quente} scale={1.003}><sphereGeometry args={[1, 160, 160]} /></mesh></group>
    <mesh material={useMemo(() => atmMat('1.0,0.45,0.15', 1.3), [])} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>
    <Pos bloom={1.2} /></>;
}}</C3>;
// 14 · ~4,5 bilhões de anos: um túnel de estrelas voltando no tempo
const S14: React.FC = () => <C3 t="~4,5 BILHÕES DE ANOS ATRÁS" etq="ANIMAÇÃO 3D">{(f) => <>
  <Cam pos={[0, 0, 5]} /><ambientLight intensity={0.5} />
  {Array.from({length: 260}, (_, i) => { const a = random('ta' + i) * Math.PI * 2, r = 0.6 + random('tr' + i) * 2.4; const z = ((random('tz' + i) * 60 + f * 1.2) % 60) - 55;
    return <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, z]}><boxGeometry args={[0.02, 0.02, 0.8]} /><meshBasicMaterial color={i % 5 ? '#cfe0ff' : '#ffd23f'} /></mesh>; })}
  <Pos bloom={1.4} /></>}</C3>;
// 15 · Theia, do tamanho de Marte, chegando
const S15: React.FC = () => <C3 t="THEIA" sub="UM PLANETA DO TAMANHO DE MARTE" etq="ANIMAÇÃO 3D · HIPÓTESE">{(f) => <>
  <Cam pos={[0, 0, 5]} /><Luzes sol={[2, 2, 4]} /><Estrelas sem="s15" />
  <mesh position={[-0.9, -0.6, 0]}><sphereGeometry args={[1, 96, 96]} /><meshStandardMaterial color="#3a2a22" roughness={1} emissive="#ff4a10" emissiveIntensity={0.25} /></mesh>
  <mesh position={[interpolate(f, [0, 70], [2.2, 1.0]), interpolate(f, [0, 70], [1.6, 0.6]), 0]} rotation={[0, f * 0.02, 0]}><sphereGeometry args={[0.53, 96, 96]} /><meshStandardMaterial color="#b0603a" roughness={0.9} /></mesh>
  <Pos /></>}</C3>;
// 16 · o choque: os dois se fundem e espirram matéria
const S16: React.FC = () => <C3 t="BATEU NA TERRA" etq="ANIMAÇÃO 3D · SIMULAÇÃO ILUSTRATIVA">{(f) => {
  const o = new THREE.Vector3(0.55, 0.55, 0.3);
  return <><Cam pos={[0, 0, 4.6]} tremor={0.1 * Math.exp(-f / 12)} /><Luzes sol={[2, 2, 4]} /><Estrelas sem="s16" />
    <mesh><sphereGeometry args={[1, 96, 96]} /><meshStandardMaterial color="#3a2a22" roughness={1} emissive="#ff5a10" emissiveIntensity={0.3 + 1.5 * Math.exp(-f / 15)} /></mesh>
    <mesh position={[o.x * (1.2 - pr(f, 0, 10) * 0.4), o.y * (1.2 - pr(f, 0, 10) * 0.4), o.z]} scale={1 - pr(f, 0, 14) * 0.7}><sphereGeometry args={[0.53, 64, 64]} /><meshStandardMaterial color="#b0603a" emissive="#ff6a20" emissiveIntensity={1} /></mesh>
    <Brilho pos={[o.x, o.y, o.z + 0.2]} s={1 + 3 * Math.exp(-f / 8)} />
    <Nuvem n={900} sem="s16n" origem={o.clone()} t={f} raio={2.4} cor="#ffb070" tam={0.06} add dir={o.clone().normalize()} />
    <Pedras n={50} sem="s16p" origem={o.clone()} dir={o.clone().normalize()} abre={1.2} t={f} vel={0.05} tam={0.06} cor="#6a4a3a" />
    <Pos bloom={1.6} /></>;
}}</C3>;
// 17 · a Lua nasce: a poeira se juntando numa bola
const S17: React.FC = () => <C3 t="E A LUA NASCEU DESSE CHOQUE" etq="ANIMAÇÃO 3D · HIPÓTESE">{(f, tex) => {
  const k = pr(f, 0, 40);
  const alvo = new THREE.Vector3(0.9, 0.9, 0);
  return <><Cam pos={[0, 0, 4.6]} /><Luzes sol={[2, 2, 4]} /><Estrelas sem="s17" />
    <mesh position={[-0.8, -0.9, 0]}><sphereGeometry args={[1, 96, 96]} /><meshStandardMaterial color="#3a2a22" roughness={1} emissive="#ff5a10" emissiveIntensity={0.2} /></mesh>
    {Array.from({length: 300}, (_, i) => { const r = new THREE.Vector3(random('nx' + i) - 0.5, random('ny' + i) - 0.5, random('nz' + i) - 0.5).multiplyScalar(2.2 * (1 - k) + 0.2);
      return <Brilho key={i} pos={[alvo.x + r.x, alvo.y + r.y, alvo.z + r.z]} s={0.06} cor="#ffb070" o={0.8 * (1 - k * 0.7)} />; })}
    <Lua tex={tex} r={0.27 * k} pos={[alvo.x, alvo.y, alvo.z]} emissivo={0.6 * (1 - k)} />
    <Pos /></>;
}}</C3>;
// 18 · corte da Terra com duas massas no fundo do manto
const S18: React.FC = () => <C3 t="PEDAÇOS DE THEIA NO FUNDO?" sub="HIPÓTESE" etq="ANIMAÇÃO 3D · BASEADO NO USGS">{(f, tex) => <>
  <Cam pos={[2.4, 0.9, 2.6]} /><Luzes sol={[3, 2, 3]} i={2.2} amb={0.3} /><Estrelas sem="s18" />
  <group rotation={[0, -0.6 + f * 0.003, 0]}>
    <mesh><sphereGeometry args={[1, 96, 96, 0, Math.PI * 1.5]} /><meshStandardMaterial map={tex.dia} side={THREE.DoubleSide} roughness={0.9} /></mesh>
    <mesh><sphereGeometry args={[0.9, 64, 64, 0, Math.PI * 1.5]} /><meshStandardMaterial color="#c85a20" side={THREE.DoubleSide} emissive="#802000" emissiveIntensity={0.4} /></mesh>
    <mesh><sphereGeometry args={[0.55, 64, 64]} /><meshStandardMaterial color="#ffb040" emissive="#ff8a20" emissiveIntensity={0.9} /></mesh>
    <mesh><sphereGeometry args={[0.2, 32, 32]} /><meshStandardMaterial color="#fff0b0" emissive="#ffe080" emissiveIntensity={1.2} /></mesh>
    {[[0.45, 0.25, 0.42], [0.3, -0.3, 0.52]].map((p, i) => <mesh key={i} position={p as [number, number, number]} scale={[0.22, 0.12, 0.18]}><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color={ROSA} emissive="#a01050" emissiveIntensity={0.8 + 0.3 * Math.sin(f / 6)} /></mesh>)}
  </group>
  <Pos bloom={0.9} /></>}</C3>;
// 20 · ela se afasta 3,8 cm por ano: régua 3D entre a Terra e a Lua
const S20: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><C3 t="A LUA NÃO VAI CAIR" etq="ANIMAÇÃO 3D · LASER LUNAR (NASA/JPL)">{(fr, tex) => {
    const x = interpolate(fr, [0, 80], [1.2, 1.7]);
    return <><Cam pos={[0, 0.6, 4.2]} alvo={[0.5, 0, 0]} /><Luzes sol={[2, 2, 3]} /><Estrelas sem="s20" />
      <Terra tex={tex} r={0.55} pos={[-1, 0, 0]} rot={[0.3, fr * 0.005, 0]} />
      <Lua tex={tex} r={0.16} pos={[x, 0, 0]} />
      <mesh position={[(x - 1) / 2, -0.4, 0]}><boxGeometry args={[x + 1, 0.02, 0.02]} /><meshBasicMaterial color={OURO} /></mesh>
      {Array.from({length: 12}, (_, i) => <mesh key={i} position={[-1 + i * (x + 1) / 11, -0.4, 0]}><boxGeometry args={[0.01, 0.08, 0.01]} /><meshBasicMaterial color={OURO} /></mesh>)}
      <mesh position={[(x + (-1)) / 2 + 0.5, 0.0, 0]}><boxGeometry args={[(x - 1) * 2, 0.006, 0.006]} /><meshBasicMaterial color="#ff3030" transparent opacity={0.7} /></mesh>
      <Pos bloom={1.0} /></>;
  }}</C3>
    <div style={{position: 'absolute', top: 1180, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: VERDE, WebkitTextStroke: '6px #000', paintOrder: 'stroke fill', opacity: interpolate(f, [6, 14], [0, 1], cl)}}>+3,8 CM/ANO</div>
  </AbsoluteFill>;
};
// 21 · você está em cima do que sobrou: a câmera desce até o horizonte da Terra
const S21: React.FC = () => <C3 t="VOCÊ ESTÁ EM CIMA DO QUE SOBROU" etq="ANIMAÇÃO 3D">{(f, tex) => <>
  <Cam pos={[0, interpolate(f, [0, 70], [0.6, 1.08]), interpolate(f, [0, 70], [3.0, 1.35])]} alvo={[0, 1.0, -0.6]} /><Luzes sol={[0, 1.2, -4]} i={3} amb={0.05} /><Estrelas sem="s21" />
  <Terra tex={tex} rot={[1.2, 0.3, 0]} />
  <Lua tex={tex} r={0.08} pos={[0.6, 1.6, -3]} />
  <Pos bloom={1.0} /></>}</C3>;

const PLANO: K.Plano = [
  ['se a lua caisse', S1],
  ['a energia seria', S2b],
  ['asteroide que acabou', S3],
  ['a lua caberia dentro', S4],
  ['ela so nao cai', S5],
  ['pra cair teria', S6],
  ['se parasse levaria', S7],
  ['e nem chegaria inteira', S8],
  ['a gravidade da terra', S9],
  ['e o impacto teria', S10],
  ['derreter a crosta', S11],
  ['so que isso ja', S12],
  ['pela hipotese mais aceita', S13],
  ['ha uns quatro bilhoes', S14],
  ['um planeta do tamanho', S15],
  ['chamado theia', S16],
  ['e a lua nasceu', S17],
  ['e pedacos de theia', S18],
  ['a lua nao vai cair', S20],
  ['e voce esta em cima', S21],
];
const S = K.criarShort(W, PLANO, 'luabate/narracao.mp3', 'so que isso ja');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

// thumb: a Lua gigante descendo sobre a Terra, com o contador vermelho
export const Thumb: React.FC = () => (
  <AbsoluteFill>
    <S1 />
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center'}}><div style={{padding: '8px 34px', background: VERMELHO, border: '6px solid #000', borderRadius: 16, fontFamily: FONTE, fontSize: 150, color: '#fff', transform: 'rotate(-3deg)'}}>10 MILHÕES</div></div>
    <div style={{position: 'absolute', top: 1390, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 140, lineHeight: 0.95, color: OURO, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill'}}>DE<br />CHICXULUBS</div>
  </AbsoluteFill>
);
