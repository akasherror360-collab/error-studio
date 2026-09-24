import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const ACCENT_RED = 0xe10600;
const ACCENT_ORANGE = 0xf9a30a;

const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.min(1, Math.max(0, t));

// Small deterministic random so the scattered layout is the same on every visit.
function rng(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export function createCameraScene(canvas, { onFlash, staticMode }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x0b0b0b, 1);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffe2b0, 1.4);
  rim.position.set(-6, 2, -4);
  scene.add(rim);
  const glint = new THREE.PointLight(0xffffff, 0, 6);
  glint.position.set(0.3, 0.3, 3.2);
  scene.add(glint);

  const mat = {
    body: new THREE.MeshStandardMaterial({ color: 0x161616, roughness: 0.5, metalness: 0.2 }),
    leather: new THREE.MeshStandardMaterial({ color: 0x242424, roughness: 0.95, metalness: 0 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.35, metalness: 0.8 }),
    silver: new THREE.MeshStandardMaterial({ color: 0xc9c9c9, roughness: 0.22, metalness: 1 }),
    black: new THREE.MeshStandardMaterial({ color: 0x0c0c0c, roughness: 0.6, metalness: 0.1 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x101010, roughness: 1, metalness: 0 }),
    red: new THREE.MeshStandardMaterial({ color: ACCENT_RED, roughness: 0.35, metalness: 0.2 }),
    orange: new THREE.MeshStandardMaterial({ color: ACCENT_ORANGE, roughness: 0.3, metalness: 0.5, emissive: ACCENT_ORANGE, emissiveIntensity: 0.15 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x0b1d3d, roughness: 0.04, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 2.2 }),
  };

  const rig = new THREE.Group();
  scene.add(rig);

  const parts = [];
  const add = (geo, material, pos, rot = [0, 0, 0]) => {
    const m = new THREE.Mesh(geo, material);
    m.userData.home = new THREE.Vector3(...pos);
    m.userData.homeRot = new THREE.Euler(...rot);
    rig.add(m);
    parts.push(m);
    return m;
  };
  const cyl = (rt, rb, h, seg = 48) => new THREE.CylinderGeometry(rt, rb, h, seg);
  const Z = [Math.PI / 2, 0, 0]; // cylinders face the viewer (+z)

  add(new RoundedBoxGeometry(3.4, 2.1, 1.2, 4, 0.18), mat.body, [0, 0, 0]);
  add(new RoundedBoxGeometry(3.44, 1.05, 1.24, 2, 0.12), mat.leather, [0, -0.18, 0]);
  add(new RoundedBoxGeometry(0.85, 2.0, 1.15, 4, 0.3), mat.rubber, [-1.3, -0.02, 0.28]);
  add(new RoundedBoxGeometry(3.1, 0.34, 1.05, 3, 0.1), mat.metal, [0, 1.2, 0]);
  add(new RoundedBoxGeometry(1.15, 0.55, 1.0, 3, 0.12), mat.body, [0.1, 1.55, -0.02]);
  add(new THREE.BoxGeometry(0.55, 0.07, 0.42), mat.silver, [0.1, 1.86, -0.02]);
  add(cyl(0.3, 0.3, 0.18), mat.metal, [1.08, 1.46, 0.05]);
  const shutter = add(cyl(0.15, 0.15, 0.12), mat.red, [-1.18, 1.44, 0.22]);
  add(new THREE.TorusGeometry(0.2, 0.035, 12, 40), mat.orange, [-1.18, 1.39, 0.22], [Math.PI / 2, 0, 0]);
  add(cyl(0.98, 0.98, 0.14), mat.silver, [0.15, -0.05, 0.66], Z);
  add(cyl(0.86, 0.92, 0.9), mat.black, [0.15, -0.05, 1.15], Z);
  add(cyl(0.9, 0.9, 0.34), mat.rubber, [0.15, -0.05, 1.3], Z);
  add(new THREE.TorusGeometry(0.9, 0.03, 12, 64), mat.orange, [0.15, -0.05, 1.52]);
  add(cyl(0.95, 0.88, 0.26), mat.black, [0.15, -0.05, 1.72], Z);
  add(new THREE.SphereGeometry(0.78, 48, 24, 0, Math.PI * 2, 0, 0.62), mat.glass, [0.15, -0.05, 1.28], [Math.PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(0.8, 0.02, 10, 64), mat.silver, [0.15, -0.05, 1.84]);

  // Scattered layout: every part flies out along its own direction with its own spin.
  const rand = rng(7);
  parts.forEach((m, i) => {
    const ang = rand() * Math.PI * 2;
    const r = 2.2 + rand() * 1.8;
    m.userData.off = new THREE.Vector3(Math.cos(ang) * r * 1.1, Math.sin(ang) * r * 0.9, -1.5 - rand() * 2.5);
    m.userData.spin = new THREE.Vector3((rand() - 0.5) * 5, (rand() - 0.5) * 5, (rand() - 0.5) * 5);
    m.userData.delay = (i / parts.length) * 0.35;
  });

  let target = staticMode ? 1 : 0;
  let current = target;
  let armed = true;
  let kick = 0;
  let raf = 0;

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull back on narrow (phone) screens so the whole camera fits.
    const dist = camera.aspect < 0.8 ? 15 : camera.aspect < 1.2 ? 11 : 9;
    camera.position.set(0, 0.6, dist);
    camera.lookAt(0, 0.2, 0);
    camera.updateProjectionMatrix();
  };

  const apply = () => {
    const assemble = clamp01(current / 0.72);
    parts.forEach((m) => {
      const t = smooth(clamp01((assemble - m.userData.delay) / (1 - m.userData.delay)));
      const k = 1 - t;
      m.position.copy(m.userData.home).addScaledVector(m.userData.off, k);
      m.rotation.set(
        m.userData.homeRot.x + m.userData.spin.x * k,
        m.userData.homeRot.y + m.userData.spin.y * k,
        m.userData.homeRot.z + m.userData.spin.z * k,
      );
    });
    // Shutter press between 80% and 86% of the scroll.
    const press = current > 0.8 ? Math.sin(Math.PI * clamp01((current - 0.8) / 0.08)) : 0;
    shutter.position.y = shutter.userData.home.y - 0.07 * press;
    // Whole camera swings from a three-quarter view to face the visitor.
    const face = smooth(clamp01((current - 0.3) / 0.5));
    rig.rotation.set(0.25 - 0.2 * face, -0.9 + 0.75 * face, 0);
    rig.position.y = -0.1 * kick;
    rig.scale.setScalar(0.85 + 0.15 * face);
  };

  const frame = () => {
    raf = 0;
    const diff = target - current;
    current += diff * 0.12;
    if (Math.abs(diff) < 0.0005) current = target;
    if (armed && current >= 0.86) {
      armed = false;
      kick = 1;
      glint.intensity = 40;
      if (onFlash) onFlash();
    }
    if (!armed && current < 0.6) armed = true;
    kick *= 0.85;
    glint.intensity *= 0.82;
    apply();
    renderer.render(scene, camera);
    if (current !== target || kick > 0.01 || glint.intensity > 0.05) raf = requestAnimationFrame(frame);
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };

  resize();
  apply();
  renderer.render(scene, camera);
  const onResize = () => { resize(); wake(); };
  window.addEventListener('resize', onResize);

  return {
    setProgress(p) { target = staticMode ? 1 : p; wake(); },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      parts.forEach((m) => m.geometry.dispose());
      Object.values(mat).forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
