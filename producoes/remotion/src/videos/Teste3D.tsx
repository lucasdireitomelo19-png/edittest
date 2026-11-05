// TESTE de animação 3D (05/11/2026), pedido do dono via LadoSombrio ("Faz um de teste"): Terra realista atingida por um asteroide,
// rachando com lava nas fendas, pedaços de crosta voando, poeira e rastro de fogo. ~8 s, 1080x1920, sem narração. Estilizado, nada gráfico.
// Remotion + @remotion/three (Three.js) + bloom (@react-three/postprocessing). Textura da Terra: NASA Blue Marble (mapas dos exemplos do Three.js, MIT).
import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, delayRender, continueRender, Easing} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';
import {EffectComposer, Bloom, Vignette} from '@react-three/postprocessing';
import {useThree} from '@react-three/fiber';

export const DURACAO_3D = 240; // 8 s a 30 fps
const IMPACTO = 60; // frame do impacto (2 s)
const POS = true;
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ponto de impacto na superfície (latitude/longitude já no referencial da Terra girada)
const PI_DIR = new THREE.Vector3(0.45, 0.42, 0.79).normalize();

const useTexturas = () => {
  const [tex, setTex] = useState<Record<string, THREE.Texture> | null>(null);
  const [h] = useState(() => delayRender('texturas'));
  useEffect(() => {
    const L = new THREE.TextureLoader();
    const nomes = {dia: 'terra_dia.jpg', normal: 'terra_normal.jpg', spec: 'terra_spec.jpg', nuvem: 'nuvens_alpha.jpg'};
    Promise.all(Object.entries(nomes).map(([k, f]) => new Promise<[string, THREE.Texture]>((ok, erro) => L.load(staticFile('teste3d/' + f), (t) => ok([k, t]), undefined, erro))))
      .then((xs) => { const o: Record<string, THREE.Texture> = {}; xs.forEach(([k, t]) => { o[k] = t; }); o.dia.colorSpace = THREE.SRGBColorSpace; setTex(o); continueRender(h); });
  }, [h]);
  return tex;
};

// atmosfera: esfera por trás com brilho de borda (fresnel)
const atmosferaMat = new THREE.ShaderMaterial({
  vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
  fragmentShader: `varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(0.35,0.65,1.0,1.0)*f*1.6; }`,
  blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false,
});

// rachaduras de lava: bordas de células de Voronoi 3D, que se espalham a partir do ponto de impacto
const rachaMat = () => new THREE.ShaderMaterial({
  uniforms: {uImp: {value: PI_DIR.clone()}, uAlcance: {value: 0}, uTempo: {value: 0}, uQueima: {value: 0}},
  vertexShader: `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform vec3 uImp; uniform float uAlcance; uniform float uTempo; uniform float uQueima; varying vec3 vP;
    vec3 h3(vec3 p){ p = vec3(dot(p,vec3(127.1,311.7,74.7)), dot(p,vec3(269.5,183.3,246.1)), dot(p,vec3(113.5,271.9,124.6))); return fract(sin(p)*43758.5453); }
    vec2 voro(vec3 x){ vec3 p = floor(x); vec3 f = fract(x); float d1 = 8.0, d2 = 8.0;
      for(int k=-1;k<=1;k++) for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ vec3 b = vec3(float(i),float(j),float(k)); vec3 r = b + h3(p+b) - f; float d = dot(r,r);
        if(d<d1){ d2=d1; d1=d; } else if(d<d2){ d2=d; } }
      return vec2(sqrt(d1), sqrt(d2)); }
    void main(){
      float ang = acos(clamp(dot(vP, uImp), -1.0, 1.0));
      vec3 q = vP*5.0 + 0.35*vec3(sin(vP.y*9.0), sin(vP.z*11.0), sin(vP.x*7.0)); vec2 v = voro(q); vec2 w = voro(q*2.9 + 3.1);
      float corte = step(0.35, fract(sin(dot(floor(q*0.9), vec3(12.9,78.2,37.7)))*43758.5));
      float borda = (1.0 - smoothstep(0.0, 0.035, v.y - v.x)) * corte;
      float fina = 1.0 - smoothstep(0.0, 0.025, w.y - w.x);
      float frente = smoothstep(uAlcance, uAlcance - 0.25, ang);
      float perto = smoothstep(0.9, 0.0, ang);
      float lava = max(borda, fina*perto*0.8) * frente;
      float flick = 0.85 + 0.15*sin(uTempo*9.0 + vP.x*40.0);
      vec3 cor = mix(vec3(0.9,0.18,0.01), vec3(1.0,0.75,0.3), pow(lava,4.0)) * 2.3 * flick;
      float queima = uQueima * smoothstep(0.75, 0.0, ang);
      vec3 base = vec3(0.10,0.05,0.03);
      float a = max(lava, queima*0.85);
      gl_FragColor = vec4(mix(base, cor, lava/(a+0.0001)), a);
    }`,
  transparent: true, depthWrite: false,
});

// textura redonda e suave para partículas
const bolinha = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); return t;
})();

const Estrelas: React.FC = () => {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry(); const n = 2500; const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const v = new THREE.Vector3(random('ex' + i) - 0.5, random('ey' + i) - 0.5, random('ez' + i) - 0.5).normalize().multiplyScalar(60 + random('er' + i) * 40); p.set([v.x, v.y, v.z], i * 3); }
    g.setAttribute('position', new THREE.BufferAttribute(p, 3)); return g;
  }, []);
  return <points geometry={geo}><pointsMaterial size={0.35} map={bolinha} transparent depthWrite={false} color="#dfe8ff" sizeAttenuation /></points>;
};

// asteroide: icosaedro deformado
const geoAsteroide = (() => {
  const g = new THREE.IcosahedronGeometry(0.09, 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const v = new THREE.Vector3().fromBufferAttribute(p, i); const k = 0.75 + 0.5 * random('ad' + Math.round(v.x * 50) + '_' + Math.round(v.y * 50) + '_' + Math.round(v.z * 50)); v.multiplyScalar(k); p.setXYZ(i, v.x, v.y, v.z); }
  g.computeVertexNormals(); return g;
})();
// o asteroide e o rastro ficam fora do grupo que gira: o alvo é o ponto de impacto em coordenadas do mundo, no frame do impacto
const ROT = (f: number) => new THREE.Euler(0.25, f * 0.0012 - 0.9, 0);
const ALVO = PI_DIR.clone().applyEuler(ROT(IMPACTO));
const INICIO = new THREE.Vector3(-0.75, 1.75, 1.3);
const posAst = (f: number) => { const k = interpolate(f, [0, IMPACTO], [0, 1], {...cl, easing: Easing.in(Easing.quad)}); return INICIO.clone().lerp(ALVO, k); };

const Rastro: React.FC<{f: number}> = ({f}) => {
  const n = 160;
  const {geo, cores} = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); return {geo: g, cores: g.attributes.color}; }, []);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < n; i++) {
    const atras = (i / n) * 14; const fp = f - atras;
    const p = posAst(fp).add(new THREE.Vector3(random('rx' + i) - 0.5, random('ry' + i) - 0.5, random('rz' + i) - 0.5).multiplyScalar(0.02 + atras * 0.006));
    pos.setXYZ(i, p.x, p.y, p.z);
    const q = 1 - i / n; (cores as THREE.BufferAttribute).setXYZ(i, 1, 0.35 + 0.6 * q * q, 0.08 * q);
  }
  pos.needsUpdate = true; (cores as THREE.BufferAttribute).needsUpdate = true;
  return <points geometry={geo}><pointsMaterial size={0.16} map={bolinha} vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={f < IMPACTO ? 1 : 0} /></points>;
};

// fragmentos de crosta
const NF = 46;
const FRAG = Array.from({length: NF}, (_, i) => {
  const t1 = new THREE.Vector3().crossVectors(PI_DIR, new THREE.Vector3(0, 1, 0)).normalize();
  const t2 = new THREE.Vector3().crossVectors(PI_DIR, t1).normalize();
  const a = random('fa' + i) * Math.PI * 2, abre = 0.35 + random('fb' + i) * 0.9;
  const dir = PI_DIR.clone().multiplyScalar(1).add(t1.clone().multiplyScalar(Math.cos(a) * abre)).add(t2.clone().multiplyScalar(Math.sin(a) * abre)).normalize();
  const origem = PI_DIR.clone().add(t1.clone().multiplyScalar(Math.cos(a) * 0.06 * random('fo' + i))).add(t2.clone().multiplyScalar(Math.sin(a) * 0.06 * random('fp' + i))).normalize();
  return {dir, origem, vel: 0.012 + random('fv' + i) * 0.03, ini: IMPACTO + 4 + Math.floor(random('fi' + i) * 70), tam: 0.012 + random('ft' + i) ** 2 * 0.05,
    eixo: new THREE.Vector3(random('ga' + i) - 0.5, random('gb' + i) - 0.5, random('gc' + i) - 0.5).normalize(), giro: 0.04 + random('gg' + i) * 0.12};
});
const geoFrag = new THREE.DodecahedronGeometry(1, 0);
const Fragmentos: React.FC<{f: number}> = ({f}) => (
  <group>
    {FRAG.map((x, i) => {
      if (f < x.ini) return null;
      const t = f - x.ini; const d = x.vel * t * (1 - Math.min(0.5, t / 400));
      const p = x.origem.clone().multiplyScalar(1.0).add(x.dir.clone().multiplyScalar(d));
      const q = new THREE.Quaternion().setFromAxisAngle(x.eixo, t * x.giro);
      const brasa = Math.max(0, 1 - t / 45);
      return <mesh key={i} geometry={geoFrag} position={p} quaternion={q} scale={[x.tam, x.tam * 0.6, x.tam * 0.85]}>
        <meshStandardMaterial color="#4a3a2e" roughness={0.95} flatShading emissive="#ff5a10" emissiveIntensity={0.9 * brasa} />
      </mesh>;
    })}
  </group>
);

// poeira: nuvem de partículas marrom-alaranjadas saindo do impacto
const Poeira: React.FC<{f: number}> = ({f}) => {
  const n = 500;
  const geo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3)); return g; }, []);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const t = Math.max(0, f - IMPACTO);
  for (let i = 0; i < n; i++) {
    const v = new THREE.Vector3(random('px' + i) - 0.5, random('py' + i) - 0.5, random('pz' + i) - 0.5).normalize();
    const out = PI_DIR.clone().multiplyScalar(0.6 + random('pu' + i)).add(v.multiplyScalar(0.7)).normalize();
    const d = (1 - Math.exp(-t / (25 + random('pk' + i) * 40))) * (0.15 + random('pd' + i) * 0.45);
    const p = PI_DIR.clone().add(out.multiplyScalar(d)); pos.setXYZ(i, p.x, p.y, p.z);
  }
  pos.needsUpdate = true;
  const o = interpolate(t, [0, 24, 120, 180], [0, 0.7, 0.5, 0.3], cl);
  return <points geometry={geo}><pointsMaterial size={0.06} map={bolinha} transparent depthWrite={false} color="#c8875a" opacity={f < IMPACTO ? 0 : o} /></points>;
};

const Camera: React.FC<{f: number}> = ({f}) => {
  const {camera} = useThree();
  const z = interpolate(f, [0, IMPACTO, 90, DURACAO_3D], [5.8, 5.2, 5.2, 7.0], {...cl, easing: Easing.inOut(Easing.cubic)});
  const tremor = Math.max(0, 1 - Math.abs(f - IMPACTO - 4) / 22) * 0.06;
  camera.position.set((random('sx' + f) - 0.5) * tremor * 2, (random('sy' + f) - 0.5) * tremor * 2, z);
  camera.lookAt(0, 0, 0);
  return null;
};

const Cena: React.FC<{tex: Record<string, THREE.Texture>}> = ({tex}) => {
  const f = useCurrentFrame();
  const racha = useMemo(rachaMat, []);
  const t = Math.max(0, f - IMPACTO);
  racha.uniforms.uAlcance.value = interpolate(t, [4, 180], [0.05, 1.35], {...cl, easing: Easing.out(Easing.sin)});
  racha.uniforms.uTempo.value = f / 30;
  racha.uniforms.uQueima.value = interpolate(t, [0, 30], [0, 1], cl);
  const giro = f * 0.0012;
  const flash = Math.max(0, 1 - t / 10) * (f >= IMPACTO ? 1 : 0);
  const anel = interpolate(t, [0, 45], [0.02, 0.9], {...cl, easing: Easing.out(Easing.cubic)});
  const qAnel = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), PI_DIR);
  return (
    <>
      <Camera f={f} />
      <color attach="background" args={['#010208']} />
      <ambientLight intensity={0.08} />
      <directionalLight position={[-3, 2, 4]} intensity={2.6} />
      <Estrelas />
      {/* a Terra gira devagar; a cratera, as rachaduras e os fragmentos já estão no referencial dela */}
      <group rotation={[0.25, giro - 0.9, 0]}>
        <mesh><sphereGeometry args={[1, 128, 128]} /><meshStandardMaterial map={tex.dia} normalMap={tex.normal} normalScale={new THREE.Vector2(0.6, 0.6)} roughnessMap={tex.spec} roughness={0.8} metalness={0.05} /></mesh>
        <mesh rotation={[0, f * 0.0006, 0]}><sphereGeometry args={[1.012, 96, 96]} /><meshStandardMaterial color="#ffffff" alphaMap={tex.nuvem} transparent opacity={0.8} depthWrite={false} /></mesh>
        <mesh material={racha}><sphereGeometry args={[1.004, 160, 160]} /></mesh>
        <mesh material={atmosferaMat} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>
      </group>
      {f < IMPACTO && <mesh geometry={geoAsteroide} position={posAst(f)} rotation={[f * 0.1, f * 0.07, 0]}><meshStandardMaterial color="#7a6a5a" roughness={1} flatShading emissive="#ff6a20" emissiveIntensity={interpolate(f, [30, IMPACTO], [0.2, 1.5], cl)} /></mesh>}
      <Rastro f={f} />
      <group rotation={[0.25, giro - 0.9, 0]}>
        {f >= IMPACTO && <mesh position={PI_DIR.clone().multiplyScalar(1.01)} quaternion={qAnel} scale={anel}>
          <ringGeometry args={[0.85, 1, 96]} /><meshBasicMaterial color="#ffd8a0" transparent opacity={Math.max(0, 1 - t / 45)} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>}
        {f >= IMPACTO && <sprite position={PI_DIR.clone().multiplyScalar(1.03)} scale={0.25 + 1.6 * flash + 0.15 * Math.sin(f / 3) * Math.min(1, t / 20)}>
          <spriteMaterial map={bolinha} color="#ffb060" transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.5 + 0.5 * flash} />
        </sprite>}
        {f >= IMPACTO && <pointLight position={PI_DIR.clone().multiplyScalar(1.25)} color="#ff7a2a" intensity={3 + 25 * flash} distance={2.5} />}
        <Fragmentos f={f} />
        <Poeira f={f} />
      </group>
      {POS && <EffectComposer>
        <Bloom intensity={1.4} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.75} />
      </EffectComposer>}
    </>
  );
};

export const Teste3D: React.FC = () => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const tex = useTexturas();
  const flash = f >= IMPACTO ? Math.max(0, 1 - (f - IMPACTO) / 8) : 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {tex && <ThreeCanvas width={width} height={height} camera={{fov: 40, near: 0.01, far: 300, position: [0, 0, 3.3]}} gl={{antialias: true}}>
        <Cena tex={tex} />
      </ThreeCanvas>}
      <AbsoluteFill style={{background: '#fff', opacity: flash * 0.9, pointerEvents: 'none'}} />
      <div style={{position: 'absolute', top: 40, right: 40, padding: '6px 18px', borderRadius: 10, background: 'rgba(0,0,0,.55)', fontFamily: 'sans-serif', fontSize: 26, color: '#ffd23f', letterSpacing: 2}}>TESTE 3D · ANIMAÇÃO</div>
    </AbsoluteFill>
  );
};
