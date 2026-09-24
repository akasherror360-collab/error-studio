import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

// EXPERIMENT (exp/3d): mirrorless camera built from scratch (no third-party model),
// lit like a studio product shot. Parts assemble across the whole home-page scroll.

const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const lerp = (a, b, t) => a + (b - a) * t;

function rng(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

// Pebbled leatherette: random bumps -> height field -> tangent-space normal map.
function leatherTextures(size = 256) {
  const rand = rng(11);
  const h = new Float32Array(size * size);
  for (let n = 0; n < 1400; n++) {
    const cx = rand() * size, cy = rand() * size, r = 2 + rand() * 4.5, a = 0.6 + rand() * 0.4;
    for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) {
      const d = Math.sqrt(x * x + y * y) / r;
      if (d >= 1) continue;
      const px = (Math.floor(cx + x) + size) % size, py = (Math.floor(cy + y) + size) % size;
      h[py * size + px] = Math.max(h[py * size + px], a * Math.sqrt(1 - d * d));
    }
  }
  const nc = document.createElement('canvas'); nc.width = nc.height = size;
  const rc = document.createElement('canvas'); rc.width = rc.height = size;
  const nctx = nc.getContext('2d'), rctx = rc.getContext('2d');
  const nd = nctx.createImageData(size, size), rd = rctx.createImageData(size, size);
  const at = (x, y) => h[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const dx = (at(x + 1, y) - at(x - 1, y)) * 2.2, dy = (at(x, y + 1) - at(x, y - 1)) * 2.2;
    const len = Math.sqrt(dx * dx + dy * dy + 1);
    const i = (y * size + x) * 4;
    nd.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
    nd.data[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
    nd.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
    nd.data[i + 3] = 255;
    const r = 205 - at(x, y) * 60; // bump tops a touch shinier (worn by hands)
    rd.data[i] = rd.data[i + 1] = rd.data[i + 2] = r; rd.data[i + 3] = 255;
  }
  nctx.putImageData(nd, 0, 0); rctx.putImageData(rd, 0, 0);
  const normal = new THREE.CanvasTexture(nc), rough = new THREE.CanvasTexture(rc);
  [normal, rough].forEach((t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3); });
  return { normal, rough };
}

// Fine knurling for lens rings and dials: vertical ridges.
function ribTexture(count = 96) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 8;
  const ctx = c.getContext('2d'); const d = ctx.createImageData(512, 8);
  for (let x = 0; x < 512; x++) {
    const s = Math.sin((x / 512) * Math.PI * 2 * count);
    for (let y = 0; y < 8; y++) {
      const i = (y * 512 + x) * 4;
      d.data[i] = (s * 0.5 + 0.5) * 255; d.data[i + 1] = 128; d.data[i + 2] = 230; d.data[i + 3] = 255;
    }
  }
  ctx.putImageData(d, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

// Studio environment: dark room with big soft boxes -> clean product-shot reflections.
function studioEnvironment(renderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x050505);
  const box = (w, h, intensity, pos, look) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(intensity, intensity, intensity * 0.97), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(...look); env.add(m);
  };
  box(6, 3, 5, [0, 6, 3], [0, 0, 0]);       // overhead strip
  box(2.5, 6, 3.2, [-7, 1, 3], [0, 0, 0]);  // left soft box
  box(1.2, 6, 4.5, [7, 1, -2], [0, 0, 0]);  // right rim strip
  box(8, 2, 0.6, [0, -4, 6], [0, 0, 0]);    // floor bounce
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  return tex;
}

export function createCameraScene(canvas, { onFlash, onPhase, staticMode, mobile }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: true, powerPreference: mobile ? 'default' : 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const envTex = studioEnvironment(renderer);
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 5, 6); scene.add(key);
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.9); fill.position.set(-4, -1, 7); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xfff0dc, 1.2); rim.position.set(-5, 3, -5); scene.add(rim);
  const glint = new THREE.PointLight(0xffffff, 0, 8); glint.position.set(0.3, 0.4, 3.5); scene.add(glint);

  const leather = leatherTextures(mobile ? 192 : 256);
  const ribs = ribTexture();
  const ribsFine = ribs.clone(); ribsFine.repeat.set(2, 1); ribsFine.needsUpdate = true;

  const mat = {
    body: new THREE.MeshPhysicalMaterial({ color: 0x111111, roughness: 0.46, metalness: 0.05, clearcoat: 0.35, clearcoatRoughness: 0.55 }),
    leather: new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 1, metalness: 0, normalMap: leather.normal, roughnessMap: leather.rough, normalScale: new THREE.Vector2(0.9, 0.9) }),
    plate: new THREE.MeshPhysicalMaterial({ color: 0x141414, roughness: 0.38, metalness: 0.25, clearcoat: 0.5, clearcoatRoughness: 0.4 }),
    dial: new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.4, metalness: 0.7, normalMap: ribsFine, normalScale: new THREE.Vector2(0.6, 0.6) }),
    mount: new THREE.MeshStandardMaterial({ color: 0xd9d9d9, roughness: 0.18, metalness: 1 }),
    contacts: new THREE.MeshStandardMaterial({ color: 0xd4a04a, roughness: 0.25, metalness: 1 }),
    barrel: new THREE.MeshPhysicalMaterial({ color: 0x0e0e0e, roughness: 0.5, metalness: 0.1, clearcoat: 0.2, clearcoatRoughness: 0.6 }),
    ring: new THREE.MeshStandardMaterial({ color: 0x0c0c0c, roughness: 0.85, metalness: 0, normalMap: ribs, normalScale: new THREE.Vector2(1.2, 1.2) }),
    red: new THREE.MeshStandardMaterial({ color: 0xb3120f, roughness: 0.35, metalness: 0.3 }),
    black: new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.7, metalness: 0 }),
    screen: new THREE.MeshPhysicalMaterial({ color: 0x020305, roughness: 0.08, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x050a12, roughness: 0.03, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.02, iridescence: 1, iridescenceIOR: 1.8, iridescenceThicknessRange: [250, 600], envMapIntensity: 2 }),
    shutterMat: new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.3, metalness: 0.85 }),
  };

  const rig = new THREE.Group();
  scene.add(rig);
  const model = new THREE.Group();
  rig.add(model);

  const parts = [];
  const add = (stage, geo, material, pos, rot = [0, 0, 0]) => {
    const m = new THREE.Mesh(geo, material);
    m.userData.home = new THREE.Vector3(...pos);
    m.userData.homeRot = new THREE.Euler(...rot);
    m.userData.stage = stage;
    model.add(m);
    parts.push(m);
    return m;
  };
  const cyl = (rt, rb, h, seg = 64) => new THREE.CylinderGeometry(rt, rb, h, seg, 1, false);
  const Z = [Math.PI / 2, 0, 0];

  // Body proportions follow a full-frame mirrorless body (~138 x 98 x 88 mm), 1 unit ~ 40 mm.
  // Stage 0: chassis
  add(0, new RoundedBoxGeometry(3.45, 2.05, 1.05, 5, 0.22), mat.body, [0, -0.05, 0]);
  add(0, new RoundedBoxGeometry(3.2, 1.6, 0.06, 3, 0.02), mat.body, [0.05, -0.1, -0.54]);
  // Stage 1: grip + leatherette wrap
  add(1, new RoundedBoxGeometry(0.95, 2.02, 1.55, 6, 0.42), mat.leather, [-1.28, -0.07, 0.2]);
  add(1, new RoundedBoxGeometry(1.2, 1.55, 1.08, 4, 0.12), mat.leather, [0.95, -0.2, 0]);
  add(1, new RoundedBoxGeometry(1.0, 1.55, 1.08, 4, 0.12), mat.leather, [-0.35, -0.2, 0.001]);
  // Stage 2: top plate + viewfinder hump + rear screen + eyecup
  add(2, new RoundedBoxGeometry(2.9, 0.3, 0.98, 4, 0.1), mat.plate, [0.1, 1.05, -0.02]);
  add(2, new THREE.CylinderGeometry(0.36, 0.58, 0.46, 4, 1), mat.plate, [0.2, 1.4, -0.05], [0, Math.PI / 4, 0]);
  add(2, new RoundedBoxGeometry(0.62, 0.08, 0.5, 2, 0.02), mat.mount, [0.2, 1.65, -0.05]);
  add(2, new RoundedBoxGeometry(0.85, 0.55, 0.28, 4, 0.1), mat.leather, [0.2, 1.38, -0.62]);
  add(2, new RoundedBoxGeometry(2.1, 1.35, 0.08, 3, 0.03), mat.screen, [0.3, -0.12, -0.6]);
  // Stage 3: dials + shutter button
  add(3, cyl(0.3, 0.3, 0.2), mat.dial, [-1.0, 1.32, 0.02]);
  add(3, cyl(0.26, 0.26, 0.16), mat.dial, [1.12, 1.3, 0.12]);
  add(3, cyl(0.24, 0.24, 0.12), mat.dial, [-1.27, 1.12, 0.62]);
  add(3, cyl(0.22, 0.22, 0.1), mat.dial, [1.1, 0.35, -0.64], Z);
  const shutter = add(3, cyl(0.12, 0.13, 0.1), mat.shutterMat, [-1.26, 1.24, 0.62]);
  // Stage 4: lens mount + contacts
  add(4, new THREE.TorusGeometry(0.86, 0.06, 16, 96), mat.mount, [0.2, -0.1, 0.55]);
  add(4, cyl(0.8, 0.8, 0.04), mat.black, [0.2, -0.1, 0.53], Z);
  add(4, new THREE.TorusGeometry(0.72, 0.025, 8, 96, Math.PI * 0.55), mat.contacts, [0.2, -0.1, 0.57], [0, 0, Math.PI * 1.22]);
  // Stage 5: lens barrel
  add(5, cyl(0.88, 0.88, 0.24), mat.mount, [0.2, -0.1, 0.72], Z);
  add(5, cyl(0.86, 0.86, 1.3), mat.barrel, [0.2, -0.1, 1.45], Z);
  // Stage 6: zoom + focus rings, red ring
  add(6, cyl(0.93, 0.93, 0.62), mat.ring, [0.2, -0.1, 1.3], Z);
  add(6, cyl(0.9, 0.9, 0.3), mat.ring, [0.2, -0.1, 1.95], Z);
  add(6, new THREE.TorusGeometry(0.9, 0.022, 10, 96), mat.red, [0.2, -0.1, 2.14]);
  add(6, cyl(0.96, 0.92, 0.28), mat.barrel, [0.2, -0.1, 2.3], Z);
  // Stage 7: front glass
  add(7, new THREE.SphereGeometry(0.95, 64, 24, 0, Math.PI * 2, 0, 0.55), mat.glass, [0.2, -0.1, 1.97], Z);
  add(7, new THREE.TorusGeometry(0.8, 0.03, 10, 96), mat.black, [0.2, -0.1, 2.44]);

  const STAGES = 8;
  const rand = rng(7);
  parts.forEach((m) => {
    const ang = rand() * Math.PI * 2;
    const r = 1.2 + rand() * 1.2;
    m.userData.off = new THREE.Vector3(Math.cos(ang) * r, Math.sin(ang) * r * 0.8, 1.2 + rand() * 2.2);
    m.userData.spin = new THREE.Vector3((rand() - 0.5) * 4, (rand() - 0.5) * 4, (rand() - 0.5) * 4);
    // each stage assembles during its own slice of the page scroll
    const s = m.userData.stage;
    m.userData.start = (s / STAGES) * 0.78;
    m.userData.len = (1.6 / STAGES) * 0.78;
  });

  let target = staticMode ? 1 : 0;
  let current = target;
  let armed = true;
  let kick = 0;
  let raf = 0;
  let paused = false;
  let view = { halfW: 1, halfH: 1, phone: false };

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const dist = 12;
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;
    view = { halfW: halfH * camera.aspect, halfH, phone: camera.aspect < 0.9 };
  };

  const apply = () => {
    parts.forEach((m) => {
      const t = smooth(clamp01((current - m.userData.start) / m.userData.len));
      const k = 1 - t;
      m.position.copy(m.userData.home).addScaledVector(m.userData.off, k);
      m.rotation.set(
        m.userData.homeRot.x + m.userData.spin.x * k,
        m.userData.homeRot.y + m.userData.spin.y * k,
        m.userData.homeRot.z + m.userData.spin.z * k,
      );
      m.visible = current > m.userData.start - 0.12 || staticMode;
    });
    const press = current > 0.9 ? Math.sin(Math.PI * clamp01((current - 0.9) / 0.06)) : 0;
    shutter.position.y = shutter.userData.home.y - 0.06 * press;

    // Side position while reading -> centre stage for the shot (80%-90% of the scroll).
    const centre = smooth(clamp01((current - 0.8) / 0.1));
    const fit = Math.min(1, (view.halfW * 2) / 5.2);
    let sx, sy, ss;
    if (view.phone) { sx = view.halfW * 0.5; sy = -view.halfH * 0.6; ss = fit * 0.42; }
    else { sx = view.halfW * 0.6; sy = -0.2; ss = Math.min(0.85, fit * 0.75); }
    rig.position.set(lerp(sx, 0, centre), lerp(sy, 0, centre) - 0.12 * kick, 0);
    rig.scale.setScalar(lerp(ss, Math.min(1.05, fit * (view.phone ? 0.95 : 0.9)), centre));
    // Three-quarter hero angle, slowly turning to face the visitor.
    const turn = smooth(clamp01(current / 0.9));
    rig.rotation.set(lerp(0.35, 0.12, turn), lerp(-0.85, -0.3, turn) + 0.15 * Math.sin(current * 6), 0);
    if (onPhase) onPhase(current, centre);
  };

  const frame = () => {
    raf = 0;
    if (paused) return;
    const diff = target - current;
    current += diff * 0.1;
    if (Math.abs(diff) < 0.0005) current = target;
    if (armed && current >= 0.95) {
      armed = false; kick = 1; glint.intensity = 60;
      if (onFlash) onFlash(true);
    }
    if (!armed && current < 0.88) { armed = true; if (onFlash) onFlash(false); }
    kick *= 0.85; glint.intensity *= 0.8;
    apply();
    renderer.render(scene, camera);
    if (current !== target || kick > 0.01 || glint.intensity > 0.05) raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf && !paused) raf = requestAnimationFrame(frame); };

  resize(); apply(); renderer.render(scene, camera);
  const onResize = () => { resize(); wake(); };
  const onVis = () => { paused = document.hidden; if (!paused) wake(); };
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVis);

  return {
    setProgress(p) { target = staticMode ? 1 : Math.min(1.05, Math.max(0, p)); wake(); },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      parts.forEach((m) => m.geometry.dispose());
      Object.values(mat).forEach((m) => m.dispose());
      [leather.normal, leather.rough, ribs, ribsFine, envTex].forEach((t) => t.dispose());
      renderer.dispose();
    },
  };
}
