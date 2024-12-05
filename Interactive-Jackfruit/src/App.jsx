import './App.css';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function App() {
  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 90);

    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 50, 50);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 50, 50);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    // FBX Loader and Animation
    const loader = new FBXLoader();
    let mixer = null;

    loader.load('/models/Placeholder_animation.fbx', (fbx) => {
      console.log('Model loaded:', fbx);
      scene.add(fbx);

      // Position and scale of the model
      fbx.position.set(0, 0, 0);
      fbx.scale.set(1, 1, 1);

      // Check and setup animations
      if (fbx.animations.length > 0) {
        mixer = new THREE.AnimationMixer(fbx);
        const action = mixer.clipAction(fbx.animations[0]); // Play the first animation
        action.play();
      }
    });

    // Animate function
    function animate() {
      requestAnimationFrame(animate);

      // Update animation mixer
      if (mixer) mixer.update(0.01); // Animation speed

      // Render scene
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div>
      <canvas id="bg"></canvas>
      <main>
        <div className="wrapper1">
          <h1>The Apple</h1>
          <blockquote>
            <p>
              An apple is a round, edible fruit produced by an apple tree.
              Apples have been grown for thousands of years in Eurasia and were introduced to North America by European colonists.
            </p>
          </blockquote>
        </div>
        <div className="wrapper2">
          <h2>The Inside</h2>
          <p>
            The true fruits or carpels are the harder interior chambers inside the apple's core. There are usually five carpels inside an apple, but there may be as few as three. Each of the chambers contains one or two seeds. The edible flesh is formed from the receptacle at the base of the flower.
          </p>
        </div>
        <div className="wrapper3">
          <h2>The Seed</h2>
          <p>
            The seeds are egg- to pear-shaped and may be colored from light brown or tan to a very dark brown, often with red shades or even purplish-black. They may have a blunt or sharp point. The five sepals remain attached and stand out from the surface of the apple.
          </p>
        </div>
        <div className="wrapper4">
          <blockquote>
            <p>An apple a day <br /> keeps the doctor away</p>
          </blockquote>
        </div>
      </main>
    </div>
  );
}

export default App;
