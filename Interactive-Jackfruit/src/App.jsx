import './App.css'
import { useEffect } from 'react';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Stats from 'three/examples/jsm/libs/stats.module';

function App() {
  useEffect(() => {

    //Scene
    const scene = new THREE.Scene();

    //Camera
    const camera = new THREE.PerspectiveCamera ( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(96);

    //Renderer
    const canvas = document.getElementById('ThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true; 
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    //Jackfruit placeholder
    const geometry = new THREE.SphereGeometry(32, 32, 32)
    const material = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh (geometry, material);
    scene.add(sphere);

    //Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    //FPS Stats
    const stats = Stats();
    document.body.appendChild(stats.dom);


    const animate = () => {
      // sphere.rotation.x += 0.01;
      // sphere.rotation.y += 0.01;
      stats.update();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <div>
        <canvas id="ThreeJsCanvas"></canvas>
      </div>
    </>
  )
}

export default App
