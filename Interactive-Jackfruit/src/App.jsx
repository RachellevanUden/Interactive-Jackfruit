import './App.css';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function App() {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 90);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 50, 50);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 50, 50);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Animation states
    let leftHalf = null;
    let rightHalf = null;
    let targetXLeft = 50; 
    let targetXRight = 50; 
    let isSplitTriggered = false;
    let movementCompleted = false;

    // Load the left half model
    const loader = new GLTFLoader();
    loader.load('/models/apple_3d_left.gltf', (gltf) => {
      leftHalf = gltf.scene;
      leftHalf.position.set(50, -30, 0);
      scene.add(leftHalf);
    });

    // Load the right half model
    loader.load('/models/apple_3d_right.gltf', (gltf) => {
      rightHalf = gltf.scene;
      rightHalf.position.set(50, -30, 0);
      scene.add(rightHalf);
    });

    // Scroll-Based Animation
    function moveModel() {
      const scrollPosition = document.documentElement.scrollTop;

      const wrapper1 = document.querySelector('.wrapper1');
      const wrapper2 = document.querySelector('.wrapper2');
      const wrapper1Bottom = wrapper1.offsetTop + wrapper1.offsetHeight;
      const wrapper2Top = wrapper2.offsetTop;

      const animationStart = wrapper1Bottom;
      const animationEnd = wrapper2Top;

      if (scrollPosition >= animationStart && scrollPosition <= animationEnd) {
        const progress = (scrollPosition - animationStart) / (animationEnd - animationStart);
        targetXLeft = 50 + progress * -100;
        targetXRight = 50 + progress * -100; 
        movementCompleted = false;
      } else if (scrollPosition > animationEnd && !movementCompleted) {
        targetXLeft = -50; 
        targetXRight = -50; 
        movementCompleted = true;
        splitModel();
      } else if (scrollPosition < animationStart) {
        movementCompleted = false;
        isSplitTriggered = false;
        targetXLeft = 50;
        targetXRight = 50;
      }
    }

    window.addEventListener('scroll', moveModel);

    // Function to split the model
    function splitModel() {
      if (!isSplitTriggered) {
        isSplitTriggered = true;
    
        const splitSpeed = 5; 
    
        function animateSplit() {
          if (leftHalf) {
            leftHalf.position.x -= splitSpeed;
          }
    
          if (rightHalf) {
            rightHalf.position.x = -50;
          }
    
          if (!leftHalf || leftHalf.position.x > -1000) {
            requestAnimationFrame(animateSplit);
          } else {
            console.log("Left half moved off-screen");
          }
        }
    
        animateSplit();
      }
    }

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      if (leftHalf && rightHalf) {
        leftHalf.position.x = THREE.MathUtils.lerp(leftHalf.position.x, targetXLeft, 0.1);
        rightHalf.position.x = THREE.MathUtils.lerp(rightHalf.position.x, targetXRight, 0.1);
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener('scroll', moveModel);
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
