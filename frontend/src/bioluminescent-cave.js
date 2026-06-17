/**
 * BIOLUMINESCENT CAVE BACKGROUND
 * Inspired by Hollow Knight's bioluminescent environments
 * Dark atmospheric cave with glowing cyan-blue flowers, particles, and fog
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

(function () {
  'use strict';

  let scene, camera, renderer, composer;
  let flowers = [];
  let particles = [];
  let caveFormations = [];
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let time = 0;

  function init() {
    const container = document.getElementById('bioluminescent-cave');
    if (!container) return;

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050a14, 0.015);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050a14, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Post-processing for bloom
    setupPostProcessing();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1a2d, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight1.position.set(0, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0088ff, 1.5, 80);
    pointLight2.position.set(-20, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00ffff, 1, 60);
    pointLight3.position.set(20, 10, -10);
    scene.add(pointLight3);

    // Create flowers (hundreds of them)
    createFlowers();

    // Create particles (more particles)
    createParticles();

    // Create cave formations with roots and vines
    createCaveFormations();

    // Create hanging vines
    createVines();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    // Start animation
    animate();
  }

  function setupPostProcessing() {
    composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);
  }

  function createFlowers() {
    const flowerGeometry = new THREE.SphereGeometry(0.4, 12, 12);
    const flowerMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.9
    });

    // Hanging flowers from ceiling (200 flowers)
    for (let i = 0; i < 200; i++) {
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial.clone());
      flower.position.set(
        (Math.random() - 0.5) * 100,
        25 + Math.random() * 15,
        (Math.random() - 0.5) * 60 - 30
      );
      flower.scale.setScalar(0.5 + Math.random() * 0.5);
      flower.userData = {
        originalX: flower.position.x,
        originalY: flower.position.y,
        swaySpeed: 0.3 + Math.random() * 0.7,
        swayAmount: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2
      };
      scene.add(flower);
      flowers.push(flower);
    }

    // Ground flowers (150 flowers)
    for (let i = 0; i < 150; i++) {
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial.clone());
      flower.position.set(
        (Math.random() - 0.5) * 100,
        -20 + Math.random() * 8,
        (Math.random() - 0.5) * 60 - 30
      );
      flower.scale.setScalar(0.4 + Math.random() * 0.6);
      flower.userData = {
        originalX: flower.position.x,
        originalY: flower.position.y,
        swaySpeed: 0.2 + Math.random() * 0.4,
        swayAmount: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2
      };
      scene.add(flower);
      flowers.push(flower);
    }
  }

  function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: Math.random() * 0.015 + 0.005,
        z: (Math.random() - 0.5) * 0.01
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.15,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particleSystem.userData = { velocities };
    scene.add(particleSystem);
    particles.push(particleSystem);
  }

  function createCaveFormations() {
    // Create organic cave-like shapes using torus
    const caveGeometry = new THREE.TorusGeometry(20, 8, 16, 100);
    const caveMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a1525,
      transparent: true,
      opacity: 0.4
    });

    for (let i = 0; i < 8; i++) {
      const cave = new THREE.Mesh(caveGeometry, caveMaterial);
      cave.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40,
        -40 - i * 15
      );
      cave.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      cave.rotation.z = Math.random() * Math.PI;
      cave.scale.setScalar(0.8 + Math.random() * 0.4);
      scene.add(cave);
      caveFormations.push(cave);
    }
  }

  function createVines() {
    const vineMaterial = new THREE.LineBasicMaterial({
      color: 0x0066aa,
      transparent: true,
      opacity: 0.6
    });

    // Create hanging vines
    for (let i = 0; i < 30; i++) {
      const points = [];
      const startX = (Math.random() - 0.5) * 100;
      const startY = 30 + Math.random() * 10;
      const startZ = (Math.random() - 0.5) * 60 - 30;
      
      for (let j = 0; j < 20; j++) {
        points.push(new THREE.Vector3(
          startX + Math.sin(j * 0.3) * 2,
          startY - j * 1.5,
          startZ
        ));
      }

      const vineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const vine = new THREE.Line(vineGeometry, vineMaterial);
      scene.add(vine);
    }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function animate() {
    requestAnimationFrame(animate);

    time += 0.008;

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.03;
    mouseY += (targetMouseY - mouseY) * 0.03;

    // Camera parallax
    camera.position.x = mouseX * 3;
    camera.position.y = mouseY * 3;
    camera.lookAt(0, 0, 0);

    // Animate flowers
    flowers.forEach(flower => {
      flower.position.x = flower.userData.originalX + Math.sin(time * flower.userData.swaySpeed + flower.userData.phase) * flower.userData.swayAmount;
      flower.position.y = flower.userData.originalY + Math.cos(time * flower.userData.swaySpeed * 0.5 + flower.userData.phase) * flower.userData.swayAmount * 0.5;
    });

    // Animate cave formations slowly
    caveFormations.forEach((cave, i) => {
      cave.rotation.z += 0.0002 * (i % 2 === 0 ? 1 : -1);
    });

    // Animate particles
    particles.forEach(particleSystem => {
      const positions = particleSystem.geometry.attributes.position.array;
      const velocities = particleSystem.userData.velocities;

      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] += velocities[i].x + Math.sin(time + i) * 0.005;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z + Math.cos(time + i) * 0.005;

        // Reset particles that go out of bounds
        if (positions[i * 3 + 1] > 30) {
          positions[i * 3 + 1] = -30;
        }
        if (Math.abs(positions[i * 3]) > 60) {
          positions[i * 3] = (Math.random() - 0.5) * 120;
        }
        if (Math.abs(positions[i * 3 + 2]) > 30) {
          positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
        }
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
    });

    // Use composer for bloom effect
    if (composer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
