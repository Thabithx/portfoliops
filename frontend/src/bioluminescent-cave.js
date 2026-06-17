/**
 * BIOLUMINESCENT CAVE BACKGROUND
 * Inspired by Hollow Knight's bioluminescent environments
 * Dark atmospheric cave with glowing cyan-blue flowers, particles, and fog
 */

(function () {
  'use strict';

  let scene, camera, renderer;
  let flowers = [];
  let particles = [];
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let time = 0;

  function init() {
    const container = document.getElementById('bioluminescent-cave');
    if (!container) return;

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.02);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a1a, 1);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1a2d, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(0, 20, 20);
    scene.add(pointLight);

    // Create flowers
    createFlowers();

    // Create particles
    createParticles();

    // Create cave formations
    createCaveFormations();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    // Start animation
    animate();
  }

  function createFlowers() {
    const flowerGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const flowerMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });

    // Hanging flowers from ceiling
    for (let i = 0; i < 50; i++) {
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial.clone());
      flower.position.set(
        (Math.random() - 0.5) * 80,
        20 + Math.random() * 10,
        (Math.random() - 0.5) * 40 - 20
      );
      flower.userData = {
        originalY: flower.position.y,
        swaySpeed: 0.5 + Math.random() * 0.5,
        swayAmount: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2
      };
      scene.add(flower);
      flowers.push(flower);
    }

    // Ground flowers
    for (let i = 0; i < 30; i++) {
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial.clone());
      flower.position.set(
        (Math.random() - 0.5) * 80,
        -15 + Math.random() * 5,
        (Math.random() - 0.5) * 40 - 20
      );
      flower.userData = {
        originalY: flower.position.y,
        swaySpeed: 0.3 + Math.random() * 0.3,
        swayAmount: 0.3 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2
      };
      scene.add(flower);
      flowers.push(flower);
    }
  }

  function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: Math.random() * 0.02 + 0.01,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.2,
      transparent: true,
      opacity: 0.6
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particleSystem.userData = { velocities };
    scene.add(particleSystem);
    particles.push(particleSystem);
  }

  function createCaveFormations() {
    // Create simple cave-like shapes using torus
    const caveGeometry = new THREE.TorusGeometry(15, 5, 16, 100);
    const caveMaterial = new THREE.MeshBasicMaterial({
      color: 0x0d1a2d,
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < 5; i++) {
      const cave = new THREE.Mesh(caveGeometry, caveMaterial);
      cave.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30,
        -30 - i * 10
      );
      cave.rotation.x = Math.PI / 2;
      cave.rotation.z = Math.random() * Math.PI;
      scene.add(cave);
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function animate() {
    requestAnimationFrame(animate);

    time += 0.01;

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Camera parallax
    camera.position.x = mouseX * 2;
    camera.position.y = mouseY * 2;
    camera.lookAt(0, 0, 0);

    // Animate flowers
    flowers.forEach(flower => {
      flower.position.x = flower.userData.originalX + Math.sin(time * flower.userData.swaySpeed + flower.userData.phase) * flower.userData.swayAmount;
      flower.position.y = flower.userData.originalY + Math.cos(time * flower.userData.swaySpeed * 0.5 + flower.userData.phase) * flower.userData.swayAmount * 0.5;
    });

    // Animate particles
    particles.forEach(particleSystem => {
      const positions = particleSystem.geometry.attributes.position.array;
      const velocities = particleSystem.userData.velocities;

      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        // Reset particles that go out of bounds
        if (positions[i * 3 + 1] > 25) {
          positions[i * 3 + 1] = -25;
        }
        if (Math.abs(positions[i * 3]) > 50) {
          positions[i * 3] = (Math.random() - 0.5) * 100;
        }
        if (Math.abs(positions[i * 3 + 2]) > 25) {
          positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
