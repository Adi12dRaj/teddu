const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
document.body.appendChild(renderer.domElement);

// HEART SHAPE
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 1, -1, 1.5, -1.2, 2);
heartShape.bezierCurveTo(-1.5, 2.7, -0.5, 3.4, 0, 2.8);
heartShape.bezierCurveTo(0.5, 3.4, 1.5, 2.7, 1.2, 2);
heartShape.bezierCurveTo(1, 1.5, 0, 1, 0, 0);

const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 0.3,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 5
});
const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xff3366, shininess: 100 });
const heart = new THREE.Mesh(heartGeometry, heartMaterial);
scene.add(heart);

// LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);
scene.add(new THREE.AmbientLight(0xff6688, 0.6));

// SPARKLES
const sparkles = [];
const sparkleGeo = new THREE.SphereGeometry(0.02, 6, 6);
const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < 150; i++) {
  const sparkle = new THREE.Mesh(sparkleGeo, sparkleMat);
  sparkle.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  scene.add(sparkle);
  sparkles.push(sparkle);
}



// ANIMATION
function animate() {
  requestAnimationFrame(animate);

  // Heartbeat pulse
  heart.scale.setScalar(1 + 0.05 * Math.sin(Date.now() * 0.005));
  heart.rotation.y += 0.005;

  // Floating sparkles
  sparkles.forEach(s => {
    s.position.y += 0.01;
    if (s.position.y > 5) s.position.y = -5;
  });

  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

