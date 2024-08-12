import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Set up the renderer, scene, and camera
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 2000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 500;
const scene = new THREE.Scene();

// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Load textures
const loader = new THREE.TextureLoader();

// Add background texture
const backgroundTexture = loader.load("/Templates/8k_stars.jpg");
backgroundTexture.encoding = THREE.sRGBEncoding;
backgroundTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
backgroundTexture.wrapS = THREE.RepeatWrapping;
backgroundTexture.wrapT = THREE.RepeatWrapping;
backgroundTexture.repeat.set(2, 2);
scene.background = backgroundTexture;


// Create the Sun
const sun = new THREE.SphereGeometry(100, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/Templates/2k_sun.jpg"),
  emissive: 0xffff00,
  emissiveIntensity: 1
});
const sunMesh = new THREE.Mesh(sun, sunMaterial);
scene.add(sunMesh);

// Create parent objects for each planet
const mercuryOrbit = new THREE.Object3D();
const venusOrbit = new THREE.Object3D();
const earthOrbit = new THREE.Object3D();
const marsOrbit = new THREE.Object3D();
const jupiterOrbit = new THREE.Object3D();
const saturnOrbit = new THREE.Object3D();
const uranusOrbit = new THREE.Object3D();
const neptuneOrbit = new THREE.Object3D();
const kuiperBeltOrbit = new THREE.Object3D();
const asteroidBeltOrbit = new THREE.Object3D();


scene.add(mercuryOrbit, venusOrbit, earthOrbit, marsOrbit, jupiterOrbit, saturnOrbit, uranusOrbit, neptuneOrbit, kuiperBeltOrbit, asteroidBeltOrbit);

function createOrbitPath(radius) {
  const curve = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    radius, radius,   // xRadius, yRadius
    0, 2 * Math.PI,   // startAngle, endAngle
    false,            // clockwise
    0                 // rotation
  );
  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const orbitPath = new THREE.Line(geometry, material);
  orbitPath.rotation.x = Math.PI / 2; // Rotate 90 degrees around the X-axis
  return orbitPath;
}

// Create Mercury and its orbit
const mercuryOrbitPath = createOrbitPath(115);
scene.add(mercuryOrbitPath);

const mercury = new THREE.SphereGeometry(0.38, 32, 32);
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/mercurymap.jpg") });
const mercuryMesh = new THREE.Mesh(mercury, mercuryMaterial);
mercuryMesh.position.x = 115;
mercuryOrbit.add(mercuryMesh);

// Create Venus and its orbit
const venusOrbitPath = createOrbitPath(125);
scene.add(venusOrbitPath);

const venus = new THREE.SphereGeometry(0.95, 32, 32);
const venusMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/venusmap.jpg") });
const venusMesh = new THREE.Mesh(venus, venusMaterial);
venusMesh.position.x = 125;
venusOrbit.add(venusMesh);

// Create Earth and its orbit
const earthOrbitPath = createOrbitPath(135);
scene.add(earthOrbitPath);

const earth = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/earthmap1k.jpg") });
const earthMesh = new THREE.Mesh(earth, earthMaterial);
earthMesh.position.x = 135;
earthOrbit.add(earthMesh);

const moon = new THREE.SphereGeometry(0.27, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/moonmap1k.jpg") });
const moonMesh = new THREE.Mesh(moon, moonMaterial);
moonMesh.position.x = 3;
earthMesh.add(moonMesh);

// Create Mars and its orbit
const marsOrbitPath = createOrbitPath(150);
scene.add(marsOrbitPath);

const mars = new THREE.SphereGeometry(0.53, 32, 32);
const marsMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/mars_1k_color.jpg") });
const marsMesh = new THREE.Mesh(mars, marsMaterial);
marsMesh.position.x = 150;
marsOrbit.add(marsMesh);

// Create Jupiter and its orbit
const jupiterOrbitPath = createOrbitPath(300);
scene.add(jupiterOrbitPath);

const jupiter = new THREE.SphereGeometry(11.21, 32, 32);
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/jupitermap.jpg") });
const jupiterMesh = new THREE.Mesh(jupiter, jupiterMaterial);
jupiterMesh.position.x = 300;
jupiterOrbit.add(jupiterMesh);

// Create Saturn and its orbit
const saturnOrbitPath = createOrbitPath(400);
scene.add(saturnOrbitPath);

const saturn = new THREE.SphereGeometry(9.45, 32, 32);
const saturnMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/saturnmap.jpg") });
const saturnMesh = new THREE.Mesh(saturn, saturnMaterial);
saturnMesh.position.x = 400;
saturnOrbit.add(saturnMesh);

// Create Saturn's rings
const saturnRings = new THREE.RingGeometry(50, 50, 50);
const saturnRingsMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/saturnringcolor.jpg") });
const saturnRingsMesh = new THREE.Mesh(saturnRings, saturnRingsMaterial);
saturnRingsMesh.position.x = 400;
saturnRingsMesh.rotation.x = Math.PI / 2;
saturnOrbit.add(saturnRingsMesh);

// Create Uranus and its orbit
const uranusOrbitPath = createOrbitPath(500);
scene.add(uranusOrbitPath);

const uranus = new THREE.SphereGeometry(4, 32, 32);
const uranusMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/uranusmap.jpg") });
const uranusMesh = new THREE.Mesh(uranus, uranusMaterial);
uranusMesh.position.x = 500;
uranusOrbit.add(uranusMesh);

//Create Uranus' rings
const uranusRings = new THREE.RingGeometry(50, 50, 50);
const uranusRingsMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/uranusringcolor.jpg") });
const uranusRingsMesh = new THREE.Mesh(uranusRings, uranusRingsMaterial);
uranusRingsMesh.position.x = 500;
uranusOrbit.add(uranusRingsMesh);

// Create Neptune and its orbit
const neptuneOrbitPath = createOrbitPath(600);
scene.add(neptuneOrbitPath);

const neptune = new THREE.SphereGeometry(3.88, 32, 32);
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: loader.load("/Templates/neptunemap.jpg") });
const neptuneMesh = new THREE.Mesh(neptune, neptuneMaterial);
neptuneMesh.position.x = 600;
neptuneOrbit.add(neptuneMesh);

// Asteroid Belt


const asteroidBeltGeometry = new THREE.BufferGeometry();
const asteroidBeltMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 1 });
const asteroidBeltParticles = [];

for (let i = 0; i < 2000; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 180 + Math.random() * 50; // Adjust the radius to make the belt tighter
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const z = Math.random() * 50 - 25; // Random height to give a 3D effect
  const size = Math.random() * 2 + 50; // Random size between 1 and 3
  asteroidBeltParticles.push(x, y, z, size);
}

asteroidBeltGeometry.setAttribute('position', new THREE.Float32BufferAttribute(asteroidBeltParticles, 4));
const asteroidBelt = new THREE.Points(asteroidBeltGeometry, asteroidBeltMaterial);
asteroidBelt.rotation.x = Math.PI / 2; // Rotate 90 degrees around the X-axis
asteroidBeltOrbit.add(asteroidBelt);  // Add Asteroid Belt to its parent orbit


// Create Kuiper Belt
const kuiperBeltSize = Math.random() * 5 + 5;
const kuiperBeltGeometry = new THREE.BufferGeometry();
const kuiperBeltMaterial = new THREE.PointsMaterial({map: loader.load("/Templates/asteroid.jpg"), size: kuiperBeltSize});
const kuiperBeltParticles = [];

for (let i = 0; i < 10000; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 750 + Math.random() * 100;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const z = Math.random() * 50 - 25; // Random height to give a 3D effect
  const size = Math.random() * 2 + 100; // Random size between 1 and 3
  kuiperBeltParticles.push(x, y, z, size);
}

kuiperBeltGeometry.setAttribute('position', new THREE.Float32BufferAttribute(kuiperBeltParticles, 4));
const kuiperBelt = new THREE.Points(kuiperBeltGeometry, kuiperBeltMaterial);
kuiperBelt.rotation.x = Math.PI / 2; // Rotate 90 degrees around the X-axis
kuiperBeltOrbit.add(kuiperBelt);  // Add Kuiper Belt to its parent orbit

// Add lighting
const pointLight = new THREE.PointLight(0xff9900, 2, 1000);
pointLight.position.copy(sunMesh.position);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Create stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ 
  color: 0xffffff,
  size: 1,
  vertexColors: true
});

const starVertices = [];
const starColors = [];
for (let i = 0; i < 10000; i++) {
  const x = THREE.MathUtils.randFloatSpread(5000);
  const y = THREE.MathUtils.randFloatSpread(5000);
  const z = THREE.MathUtils.randFloatSpread(5000);
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();
  starVertices.push(x, y, z);
  starColors.push(r, g, b);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);



// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  mercuryOrbit.rotation.y += 0.01;
  venusOrbit.rotation.y += 0.008;
  earthOrbit.rotation.y += 0.005;
  marsOrbit.rotation.y += 0.004;
  jupiterOrbit.rotation.y += 0.002;
  saturnOrbit.rotation.y += 0.001;
  uranusOrbit.rotation.y += 0.0007;
  neptuneOrbit.rotation.y += 0.0005;
  asteroidBeltOrbit.rotation.y += 0.0003;
  kuiperBeltOrbit.rotation.y += 0.0001;
  
  mercuryMesh.rotation.y += 0.01;
  venusMesh.rotation.y += 0.01;
  earthMesh.rotation.y += 0.01;
  marsMesh.rotation.y += 0.01;
  jupiterMesh.rotation.y += 0.01;
  saturnMesh.rotation.y += 0.01;
  uranusMesh.rotation.y += 0.01;
  neptuneMesh.rotation.y += 0.01;

  
  renderer.render(scene, camera);
  controls.update();
}
animate();


