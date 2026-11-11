// Short "E SE TODO o GELO da Terra DERRETESSE? O MAPA que NINGUÉM quer ver" (lote 11/11/2026, aprovado pelo dono). Tudo em Remotion 3D.
// Texto na tela (aprovado no roteiro): título do 1º segundo, nomes de lugares em neon, contador no canto e a legenda. Nenhum selo.
// O mar sobe de verdade: elev.png guarda a altitude real de cada ponto (NOAA ETOPO5, domínio público; 1 = 1 m, até 255) e o shader pinta de azul
// tudo que fica abaixo do nível pedido. Textura da Terra: NASA Blue Marble 4096 (domínio público). Bake: pipeline/gelo_bake.py.
import React, {useEffect, useState} from 'react';
import {AbsoluteFill, interpolate, random, staticFile, delayRender, continueRender, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, pr, cl, THREE} from '../lote/kit3d';
import {Rotulo, R3, v, camLL, atmM} from '../lote/pangeia3d';
import palavras from './gelo.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const V = (p: THREE.Vector3): V3 => [p.x, p.y, p.z];
const ease = Easing.inOut(Easing.cubic);
const useD = () => useVideoConfig().durationInFrames;

// ---------- globo com o mar subindo ----------
let MAT: THREE.ShaderMaterial | null = null;
let prom: Promise<void> | null = null;
const carregar = () => {
  if (!prom) {
    const L = new THREE.TextureLoader();
    const um = (n: string) => new Promise<THREE.Texture>((ok, erro) => L.load(staticFile('gelo/' + n), ok, undefined, erro));
    prom = Promise.all([um('terra4k.jpg'), um('elev.png')]).then(([mapa, el]) => {
      mapa.colorSpace = THREE.SRGBColorSpace; mapa.anisotropy = 8; el.minFilter = THREE.LinearFilter; el.generateMipmaps = false;
      MAT = new THREE.ShaderMaterial({
        uniforms: {uMap: {value: mapa}, uEl: {value: el}, uN: {value: 0}, uD: {value: 0}},
        vertexShader: 'varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
        fragmentShader: `uniform sampler2D uMap; uniform sampler2D uEl; uniform float uN; uniform float uD; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
          void main(){
            vec3 c = texture2D(uMap, vUv).rgb; float e = texture2D(uEl, vUv).r * 255.0;
            float lat = abs(vUv.y - 0.5) * 180.0;
            float lum = dot(c, vec3(0.333)); float sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
            float gelo = smoothstep(0.35, 0.6, lum) * (1.0 - smoothstep(0.05, 0.16, sat)) * smoothstep(55.0, 62.0, lat);
            c = mix(c, vec3(0.16, 0.12, 0.09) * (0.7 + lum * 0.6), gelo * uD);
            float terra = step(0.5, e);
            c = mix(c, vec3(0.012, 0.035, 0.09) + c * 0.35, (1.0 - terra) * 0.8);  // oceano mais escuro e uniforme, para o azul do alagamento se destacar
            float al = terra * (1.0 - smoothstep(uN - 1.0, uN + 1.0, e)) * step(0.01, uN);
            float borda = terra * smoothstep(uN - 6.0, uN, e) * (1.0 - smoothstep(uN, uN + 2.0, e)) * step(0.01, uN);
            c = mix(c, vec3(0.0, 0.32, 1.0), al * 0.9); c += vec3(0.15, 0.6, 1.0) * borda * 0.6;
            float sh = 0.45 + 0.55 * max(dot(normalize(vN), normalize(vV)), 0.0);
            gl_FragColor = vec4(c * sh * 1.25, 1.0);
            #include <colorspace_fragment>
          }`,
      });
    });
  }
  return prom;
};
const ATM = atmM();
export const GloboMar: React.FC<{n: number; d?: number; giro?: number}> = ({n, d = 0, giro = 0}) => {
  if (!MAT) return null;
  MAT.uniforms.uN.value = n; MAT.uniforms.uD.value = d;
  return <group rotation={[0, giro, 0]}>
    <mesh material={MAT}><sphereGeometry args={[1, 192, 96]} /></mesh>
    <mesh material={ATM} scale={1.1}><sphereGeometry args={[1, 64, 64]} /></mesh>
  </group>;
};
// cena com as texturas carregadas + rótulos por cima
export const CG: React.FC<{children: (f: number) => React.ReactNode; rot?: (f: number) => React.ReactNode}> = ({children, rot}) => {
  const [ok, setOk] = useState(false);
  const [h] = useState(() => delayRender('texturas gelo'));
  useEffect(() => { carregar().then(() => { setOk(true); continueRender(h); }); }, [h]);
  const f = useCurrentFrame();
  if (!ok) return null;
  return <><C3>{(ff) => children(ff)}</C3>{rot && rot(f)}</>;
};
// fábrica de cena de mapa: câmera de A a B, mar de n0 a n1, rótulos presos ao ponto
type Lab = {la: number; lo: number; txt: string; ini?: number; dy?: number; tam?: number};
type MOpt = {ca: [number, number, number]; cb?: [number, number, number]; n?: [number, number]; d?: [number, number]; labs?: Lab[]; pts?: [number, number][]; sem: string; e?: (t: number) => number; nFim?: number};
const M = (o: MOpt): React.FC => () => {
  const d = useD();
  const t = (f: number) => (o.e ?? ease)(Math.min(1, Math.max(0, f / Math.max(1, d - 1))));
  const cam = (f: number) => { const cb = o.cb ?? o.ca; const x = t(f); return camLL(o.ca[0] + (cb[0] - o.ca[0]) * x, o.ca[1] + (cb[1] - o.ca[1]) * x, o.ca[2] + (cb[2] - o.ca[2]) * x); };
  const nivel = (f: number) => interpolate(f, [0, d * (o.nFim ?? 0.7)], o.n ?? [66, 66], {...cl, easing: Easing.out(Easing.quad)});
  return <CG rot={(f) => <>{(o.labs ?? []).map((l, i) => <R3 key={i} cam={cam(f)} p={v(l.la, l.lo, 1.01)} txt={l.txt} o={pr(f, l.ini ?? 3, (l.ini ?? 3) + 7)} dy={l.dy ?? -70} tam={l.tam ?? 58} />)}</>}>{(f) => <>
    <Cam pos={cam(f)} /><Estrelas sem={o.sem} />
    <GloboMar n={nivel(f)} d={o.d ? interpolate(t(f), [0, 1], o.d) : 1} />
    {(o.pts ?? []).map(([la, lo], i) => <Brilho key={i} pos={V(v(la, lo, 1.008))} s={0.035} cor="#ffe9a0" o={0.95} />)}
    <Pos bloom={0.7} /></>}</CG>;
};

// ---------- cenas ----------
// 1 · o globo com as calotas brilhando e derretendo (câmera orbitando)
const S1: React.FC = () => <CG>{(f) => <>
  <Cam pos={camLL(35 - f * 0.25, -60 + f * 0.9, 5.3)} /><Estrelas sem="g1" />
  <GloboMar n={0} d={pr(f, 20, 66)} />
  <Brilho pos={V(v(75, -40, 1.03))} s={0.9 * (1 - pr(f, 20, 60))} cor="#dff2ff" o={0.6} />
  <Pos bloom={0.9} /></>}</CG>;
// 2 · o mar sobe pelas costas do mundo (câmera alta, girando)
const S2 = M({ca: [25, 10, 5.2], cb: [15, 40, 4.6], n: [0, 66], sem: 'g2', nFim: 0.9});
// 3 · "olha o que some do mapa": giro rápido até a Ásia
const S3 = M({ca: [15, 40, 4.6], cb: [22, 88, 2.4], sem: 'g3', e: Easing.in(Easing.cubic)});
// 4 · Bangladesh coberto (câmera rasante)
const S4 = M({ca: [17, 88, 1.55], cb: [23, 90, 1.32], n: [0, 66], sem: 'g4', labs: [{la: 24, lo: 90, txt: 'BANGLADESH', ini: 2}]});
// 5 · Holanda some
const S5 = M({ca: [49, 3, 1.4], cb: [52.5, 5.5, 1.26], n: [0, 66], sem: 'g5', labs: [{la: 52.4, lo: 5.3, txt: 'HOLANDA', ini: 2}]});
// 6 · Dinamarca quase toda (câmera segue para o norte)
const S6 = M({ca: [53.5, 7, 1.27], cb: [56.2, 10, 1.25], n: [10, 66], sem: 'g6', labs: [{la: 56, lo: 9.5, txt: 'DINAMARCA', ini: 2}]});
// 7 · Veneza, Londres e Buenos Aires: três pontos que a água apaga (câmera saltando)
const TRES: {la: number; lo: number; txt: string; ini: number}[] = [{la: 45.44, lo: 12.33, txt: 'VENEZA', ini: 0}, {la: 51.5, lo: -0.12, txt: 'LONDRES', ini: 0.7}, {la: -34.6, lo: -58.38, txt: 'BUENOS AIRES', ini: 1.2}];
const S7: React.FC = () => {
  const d = useD();
  const qual = (f: number) => (f < 20 ? 0 : f < 36 ? 1 : 2);
  const ini = [0, 20, 36];
  const cam = (f: number) => { const k = qual(f); const c = TRES[k]; return camLL(c.la - 1.5, c.lo, 1.42 - (f - ini[k]) * 0.004); };
  void d;
  return <CG rot={(f) => { const k = qual(f); const c = TRES[k]; return <R3 cam={cam(f)} p={v(c.la, c.lo, 1.01)} txt={c.txt} o={pr(f - ini[k], 1, 6)} dy={-80} tam={62} />; }}>{(f) => { const k = qual(f); const c = TRES[k]; const g = f - ini[k]; return <>
    <Cam pos={cam(f)} /><Estrelas sem="g7" />
    <GloboMar n={interpolate(g, [0, 14], [0, 66], cl)} d={1} />
    <Brilho pos={V(v(c.la, c.lo, 1.006))} s={0.05} cor="#ffe9a0" o={1 - pr(g, 6, 14)} />
    <Pos bloom={0.8} /></>; }}</CG>;
};
// 8 · o delta do Nilo vira mar (câmera subindo o rio, de Alexandria ao Cairo)
const S8 = M({ca: [32.5, 29.5, 1.3], cb: [29.2, 31.3, 1.24], n: [0, 66], sem: 'g8', pts: [[30.04, 31.24]], labs: [{la: 31.2, lo: 29.92, txt: 'ALEXANDRIA', ini: 14, dy: -60, tam: 50}, {la: 30.04, lo: 31.24, txt: 'CAIRO', ini: 44, dy: 70, tam: 54}]});
// 9 · a costa do Brasil (câmera descendo o litoral, de Belém a Porto Alegre)
const S9 = M({ca: [-1, -44, 1.5], cb: [-27, -45, 1.5], n: [0, 66], nFim: 0.35, sem: 'g9', e: (t) => t, pts: [[-1.45, -48.5], [-3.73, -38.52], [-8.05, -34.9], [-30.03, -51.2], [-23.96, -46.33]],
  labs: [{la: -1.45, lo: -48.5, txt: 'BELÉM', ini: 22, dy: -50, tam: 46}, {la: -3.73, lo: -38.52, txt: 'FORTALEZA', ini: 38, dy: -50, tam: 46}, {la: -8.05, lo: -34.9, txt: 'RECIFE', ini: 58, dy: -50, tam: 46}, {la: -30.03, lo: -51.2, txt: 'PORTO ALEGRE', ini: 76, dy: 60, tam: 46}, {la: -23.96, lo: -46.33, txt: 'SANTOS', ini: 100, dy: -50, tam: 46}]});
// 10 · no Rio, os morros viram ilhas (relevo estilizado, câmera entre os morros)
const MORROS: [number, number, number, number][] = [[-1.2, -0.6, 1.5, 0.28], [0.3, -1.4, 1.1, 0.4], [1.3, -0.2, 0.9, 0.34], [-0.4, 0.7, 0.7, 0.3], [0.9, 1.0, 0.55, 0.36], [-1.8, 1.2, 0.8, 0.45], [2.2, -1.6, 1.2, 0.5]];
const RIO = (() => { const g = new THREE.PlaneGeometry(8, 8, 200, 200); g.rotateX(-Math.PI / 2); const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); let y = 0.03 + (random('rr' + i) - 0.5) * 0.015; MORROS.forEach(([mx, mz, h, s]) => { y += h * Math.exp(-((x - mx) ** 2 + (z - mz) ** 2) / (2 * s * s)); }); p.setY(i, y); }
  g.computeVertexNormals(); return g; })();
const PREDIOS = Array.from({length: 150}, (_, i) => { const x = (random('px' + i) - 0.5) * 5, z = (random('pz' + i) - 0.5) * 5; let y = 0; MORROS.forEach(([mx, mz, h, s]) => { y += h * Math.exp(-((x - mx) ** 2 + (z - mz) ** 2) / (2 * s * s)); }); return {x, z, y, h: 0.05 + random('ph' + i) * 0.12}; }).filter((b) => b.y < 0.12);
const S10: React.FC = () => <CG rot={(f) => <Rotulo x={540} y={470} txt="RIO DE JANEIRO" o={pr(f, 3, 10)} tam={58} />}>{(f) => { const n = interpolate(f, [0, 40], [0.0, 0.3], {...cl, easing: Easing.out(Easing.quad)}); return <>
  <Cam pos={[-2.6 + f * 0.012, 0.75, 2.6 - f * 0.006]} alvo={[0.2, 0.35, -0.4]} /><Luzes sol={[-3, 3, -2]} i={2.4} amb={0.5} /><color attach="background" args={['#f2a868']} /><fog attach="fog" args={['#f2b078', 4, 12]} />
  <mesh geometry={RIO}><meshStandardMaterial color="#4e7a44" roughness={1} flatShading /></mesh>
  {PREDIOS.map((b, i) => <mesh key={i} position={[b.x, b.y + 0.03 + b.h / 2, b.z]}><boxGeometry args={[0.05, b.h, 0.05]} /><meshStandardMaterial color="#d8d2c4" /></mesh>)}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, n, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#1668c8" transparent opacity={0.9} roughness={0.12} metalness={0.3} /></mesh>
  <mesh position={[-6, 1.2, -9]}><sphereGeometry args={[0.8, 32, 32]} /><meshBasicMaterial color="#ffe2a0" /></mesh>
  <Pos bloom={0.6} /></>; }}</CG>;
// 11 · o norte da Amazônia vira um braço do Atlântico (câmera de cima)
const S11 = M({ca: [-3, -50, 1.75], cb: [-2, -57, 1.5], n: [0, 66], sem: 'g11', labs: [{la: -2.5, lo: -58, txt: 'AMAZÔNIA', ini: 4, dy: 90}, {la: 6, lo: -42, txt: 'ATLÂNTICO', ini: 30, dy: 0, tam: 46}]});
// 12 · São Paulo e Brasília secas, lá no alto (câmera recuando)
const S12 = M({ca: [-19, -47, 1.38], cb: [-17, -47, 1.9], sem: 'g12', pts: [[-23.55, -46.63], [-15.8, -47.9]], labs: [{la: -23.55, lo: -46.63, txt: 'SÃO PAULO', ini: 2, dy: 60, tam: 52}, {la: -15.8, lo: -47.9, txt: 'BRASÍLIA', ini: 14, dy: -60, tam: 52}]});
// 13 · quase toda a água vem da Antártida: anéis de água saindo do polo e subindo pelo oceano (câmera de longe)
const S13: React.FC = () => { const cam = (f: number) => camLL(-58 + f * 0.05, 20 + f * 0.25, 4.3); return <CG rot={(f) => <R3 cam={cam(f)} p={v(-88, 0, 1.02)} txt="ANTÁRTIDA" o={pr(f, 50, 60)} dy={-20} tam={66} />}>{(f) => <>
  <Cam pos={cam(f)} /><Estrelas sem="g13" />
  <GloboMar n={66} d={pr(f, 0, 70)} />
  {Array.from({length: 5}, (_, j) => { const t = ((f * 0.012 + j / 5) % 1); const la = -66 + t * 50; return Array.from({length: 48}, (_, i) => <Brilho key={j + '_' + i} pos={V(v(la, i * 7.5 + j * 3, 1.012))} s={0.07} cor="#3aa0ff" o={0.85 * (1 - t)} />); })}
  <Pos bloom={1} /></>}</CG>; };
// 14 · sozinha, ela sobe o mar 58 m: um bloco de gelo derrete e enche um tubo de vidro
const S14: React.FC = () => <CG>{(f) => { const k = pr(f, 0, 80, Easing.out(Easing.quad)); return <>
  <Cam pos={[1.6, 0.7, 5.6 - f * 0.004]} alvo={[0, 0.45, 0]} /><Luzes sol={[2, 4, 3]} i={2.2} amb={0.5} /><color attach="background" args={['#04101e']} />
  <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.36, 0.36, 2.2, 48, 1, true]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.2} roughness={0.05} side={THREE.DoubleSide} /></mesh>
  <mesh position={[0, -1.0 + k * 0.84, 0]}><cylinderGeometry args={[0.34, 0.34, 0.02 + k * 1.68, 48]} /><meshStandardMaterial color="#1a78e8" emissive="#0a3a90" emissiveIntensity={0.5} roughness={0.15} /></mesh>
  <mesh position={[0, -1.0 + 1.68 * (66 / 58), 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.37, 0.012, 8, 48]} /><meshBasicMaterial color="#ffffff" /></mesh>
  <mesh position={[0, 1.75, 0]} scale={[1 - k * 0.55, 1 - k * 0.7, 1 - k * 0.55]} rotation={[0.1, f * 0.004, 0.05]}><boxGeometry args={[1.0, 0.7, 0.8]} /><meshStandardMaterial color="#eaf6ff" emissive="#9fd0ff" emissiveIntensity={0.35} roughness={0.3} /></mesh>
  {Array.from({length: 10}, (_, i) => { const t = ((f * 0.03 + i / 10) % 1); return <mesh key={i} position={[(random('gx' + i) - 0.5) * 0.3, 1.4 - t * (2.2 - k * 1.6), (random('gz' + i) - 0.5) * 0.3]}><sphereGeometry args={[0.03, 10, 10]} /><meshStandardMaterial color="#5ab4ff" emissive="#2a80ff" emissiveIntensity={0.6} /></mesh>; })}
  <Pos bloom={0.9} /></>; }}</CG>;
// 15 · milhares de anos: o globo acelera, dia e noite piscando, o gelo sumindo devagar
const S15: React.FC = () => <CG>{(f) => { const g = f * f * 0.004; return <>
  <Cam pos={camLL(60, -40, 4.6)} /><Estrelas sem="g15" />
  <GloboMar n={pr(f, 0, 60) * 20} d={pr(f, 0, 60) * 0.5} giro={g} />
  <mesh rotation={[0, g * 2.5, 0]}><sphereGeometry args={[1.02, 48, 48, 0, Math.PI]} /><meshBasicMaterial color="#000010" transparent opacity={0.55} /></mesh>
  <Pos bloom={0.7} /></>; }}</CG>;
// 16 · o mar já está subindo: uma rampa 3D com uma bolinha de água subindo devagar
const rampaY = (x: number) => (x < 0 ? 0.25 + (x + 3) * 0.1 : 0.55 + x * 0.1 + x * x * 0.16);
const Rampa: React.FC<{ate: number}> = ({ate}) => <>{Array.from({length: 60}, (_, i) => { const x = -3 + i * 0.1; if (x > ate) return null; const y = rampaY(x); return <mesh key={i} position={[x, y / 2, 0]}><boxGeometry args={[0.09, y, 0.9]} /><meshStandardMaterial color={x < 0 ? '#2a7ad8' : '#ff5a3a'} emissive={x < 0 ? '#0a2a60' : '#70140a'} emissiveIntensity={0.6} /></mesh>; })}</>;
const S16: React.FC = () => <CG>{(f) => { const x = -2.2 + pr(f, 0, 36) * 2.2; return <>
  <Cam pos={[-1.6, 1.2, 4.2]} alvo={[-1.3, 0.45, 0]} /><Luzes sol={[2, 4, 4]} i={2.2} amb={0.5} /><color attach="background" args={['#050b16']} />
  <Rampa ate={x} />
  <mesh position={[x, rampaY(x) + 0.14, 0]}><sphereGeometry args={[0.13, 24, 24]} /><meshStandardMaterial color="#7fd0ff" emissive="#3aa0ff" emissiveIntensity={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 6]} /><meshStandardMaterial color="#0a1830" roughness={0.4} /></mesh>
  <Pos bloom={1} /></>; }}</CG>;
// 17 · desde 1993 a velocidade dobrou: a rampa fica íngreme como um tobogã (câmera de lado, acompanhando)
const S17: React.FC = () => <CG rot={(f) => <Rotulo x={560} y={1050} txt="1993" o={pr(f, 4, 12)} tam={70} />}>{(f) => { const x = pr(f, 0, 85, Easing.in(Easing.quad)) * 2.9; return <>
  <Cam pos={[0.6 + x * 0.3, 1.6 + x * 0.3, 6]} alvo={[0.6 + x * 0.3, 0.9 + x * 0.25, 0]} /><Luzes sol={[2, 4, 4]} i={2.2} amb={0.5} /><color attach="background" args={['#0b0508']} />
  <Rampa ate={x} />
  <mesh position={[x, rampaY(x) + 0.14, 0]}><sphereGeometry args={[0.13, 24, 24]} /><meshStandardMaterial color="#ffd0a0" emissive="#ff6a3a" emissiveIntensity={1.2} /></mesh>
  <mesh position={[0, 1.2, -0.5]}><boxGeometry args={[0.03, 2.4, 0.03]} /><meshBasicMaterial color="#ffffff" /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[20, 6]} /><meshStandardMaterial color="#1a0c10" roughness={0.4} /></mesh>
  <Pos bloom={1} /></>; }}</CG>;
// 18 · até um metro: a praia com a água avançando sobre a areia (câmera baixa)
const S18: React.FC = () => <CG>{(f) => { const a = pr(f, 0, 60) * 2.2; return <>
  <Cam pos={[0.6, 0.5, 3]} alvo={[0, 0.2, -1]} /><Luzes sol={[-2, 3, -4]} i={2.2} amb={0.55} /><color attach="background" args={['#8fc0e8']} /><fog attach="fog" args={['#a8cce8', 4, 16]} />
  <mesh rotation={[-Math.PI / 2 + 0.05, 0, 0]} position={[0, 0, 0]}><planeGeometry args={[30, 10]} /><meshStandardMaterial color="#dcc48e" roughness={1} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02 + a * 0.05, -6 + a]}><planeGeometry args={[30, 10]} /><meshStandardMaterial color="#1a70c8" transparent opacity={0.88} roughness={0.12} metalness={0.3} /></mesh>
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03 + a * 0.05, -1 + a]}><planeGeometry args={[30, 0.08]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.8} /></mesh>
  {[[-1.6, 0.6], [1.4, 0.2]].map(([x, z], i) => <group key={i} position={[x, 0.05, z]}>
    <mesh position={[0, 0.45, 0]} rotation={[0, 0, 0.15]}><cylinderGeometry args={[0.012, 0.012, 0.9, 6]} /><meshStandardMaterial color="#eee" /></mesh>
    <mesh position={[0.06, 0.9, 0]}><coneGeometry args={[0.45, 0.16, 16]} /><meshStandardMaterial color={i ? '#f0c040' : '#e0503a'} /></mesh></group>)}
  <Pos bloom={0.4} /></>; }}</CG>;
// 19 · o mar invade as ruas do litoral: calçada, postes e a água passando por cima (câmera baixa; fim)
const S19: React.FC = () => <CG>{(f) => { const a = pr(f, 0, 70); return <>
  <Cam pos={[-0.3, 0.32, 3.2 - f * 0.004]} alvo={[0.2, 0.3, -3]} /><Luzes sol={[2, 3, 1]} i={1.8} amb={0.5} /><color attach="background" args={['#7f9cb8']} /><fog attach="fog" args={['#8fa8c0', 3, 14]} />
  <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 30]} /><meshStandardMaterial color="#3a3c40" roughness={0.9} /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[l * 2.2, 0.06, 0]}><boxGeometry args={[1.4, 0.12, 30]} /><meshStandardMaterial color="#b8b4a8" roughness={1} /></mesh>)}
  {Array.from({length: 10}, (_, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 2 - i * 1.4]}><planeGeometry args={[0.1, 0.7]} /><meshBasicMaterial color="#e8e080" /></mesh>)}
  {Array.from({length: 8}, (_, i) => <group key={'p' + i} position={[(i % 2 ? 1 : -1) * 1.7, 0, 1 - Math.floor(i / 2) * 2.4]}>
    <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.025, 0.03, 1.8, 8]} /><meshStandardMaterial color="#2a2c30" /></mesh><Brilho pos={[0, 1.8, 0]} s={0.5} cor="#ffe0a0" o={0.7} /></group>)}
  {Array.from({length: 12}, (_, i) => <mesh key={'c' + i} position={[(i % 2 ? 1 : -1) * 3.4, 0.7 + random('ch' + i) * 0.6, 1 - Math.floor(i / 2) * 2.2]}><boxGeometry args={[1, 1.4 + random('ch' + i) * 1.2, 1.6]} /><meshStandardMaterial color={['#c8b8a0', '#a8b0b8', '#d0c0b0'][i % 3]} /></mesh>)}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02 + a * 0.2, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#1a68c0" transparent opacity={0.85} roughness={0.1} metalness={0.35} /></mesh>
  <Pos bloom={0.6} /></>; }}</CG>;

const PLANO: K.Plano = [
  ['e se todo o gelo', S1], ['o mar subiria', S2], ['olha o que some', S3], ['bangladesh inteiro', S4], ['a holanda some', S5], ['a dinamarca', S6],
  ['veneza londres', S7], ['no egito', S8], ['e o brasil', S9], ['no rio os morros', S10], ['e o norte da amazonia', S11], ['sao paulo e brasilia', S12],
  ['e quase toda essa agua', S13], ['sozinha ela tem', S14], ['derreter tudo levaria', S15], ['mas o mar ja esta', S16], ['e desde mil novecentos', S17],
  ['ate o fim deste seculo', S18], ['ja e o bastante', S19],
];

// ---------- por cima: título do 1º segundo e contador no canto ----------
export const NEON = '0 0 10px #39d8ff, 0 0 26px #1fb6ff, 0 0 52px #0a8cff, 0 4px 8px rgba(0,0,0,.8)';
const Titulo: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 3, 52, 62], [0, 1, 1, 0], cl);
  if (o <= 0) return null;
  const linhas = ['E SE TODO', 'O GELO', 'DERRETESSE?'];
  return <div style={{position: 'absolute', top: 330, width: '100%', textAlign: 'center', opacity: o, fontFamily: FONTE, fontWeight: 900, color: '#fff', textShadow: NEON}}>
    {linhas.map((l, j) => <div key={j} style={{fontSize: j === 2 ? 128 : 118, lineHeight: 1.12, letterSpacing: 2}}>
      {l.split('').map((ch, i) => { const pinga = random('pg' + j + i) > 0.55 && ch !== ' '; const h = pinga ? Math.max(0, f - 8 - random('pd' + j + i) * 20) * (1.2 + random('pv' + j + i) * 1.6) : 0;
        return <span key={i} style={{display: 'inline-block', position: 'relative', whiteSpace: 'pre'}}>{ch}
          {pinga && <span style={{position: 'absolute', left: '42%', top: '84%', width: 9, height: Math.min(90, h), borderRadius: 6, background: 'linear-gradient(#ffffff, #7fdcff)', boxShadow: '0 0 12px #39d8ff'}} />}</span>; })}</div>)}
  </div>;
};
const Extra: React.FC = () => {
  const f = useCurrentFrame();
  const T = TEMPO.T; const t = (frase: string) => T[PLANO.findIndex((p) => p[0] === frase)];
  const a = t('o mar subiria'), b = t('sozinha ela tem'), c = t('derreter tudo levaria'), d = t('ate o fim deste seculo');
  let txt: string | null = null; let cor = '#fff';
  if (f >= a && f < b) txt = '+' + Math.round(interpolate(f, [a, a + 62], [0, 66], cl)) + ' M';
  else if (f >= b && f < c) txt = '+' + Math.round(interpolate(f, [b, b + 70], [0, 58], cl)) + ' M';
  else if (f >= d) { txt = '+' + interpolate(f, [d, d + 45], [0, 1], cl).toFixed(1).replace('.', ',') + ' M'; cor = '#ffe9a0'; }
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <Titulo />
    {txt && <div style={{position: 'absolute', top: 150, right: 60, padding: '10px 26px', borderRadius: 22, background: 'rgba(0,10,30,.55)', border: '3px solid #39d8ff', fontFamily: FONTE, fontWeight: 900, fontSize: 92, color: cor, textShadow: NEON, letterSpacing: 2}}>🌊 {txt}</div>}
  </AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'gelo/narracao.mp3', 'ja e o bastante', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;

// thumb "MAR +66 METROS": a América do Sul com o mar já dentro da Amazônia e do Prata
export const ThumbCena: React.FC = () => <CG>{() => <>
  <Cam pos={camLL(-14, -52, 2.5)} alvo={V(v(-14, -52, 0.25))} /><Estrelas sem="gt" />
  <GloboMar n={66} d={1} /><Pos bloom={0.9} /></>}</CG>;
void Luzes;
