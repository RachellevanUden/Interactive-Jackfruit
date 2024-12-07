import './App.css';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function App() {
  useEffect(() => {
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

    const loader = new FBXLoader();

    let firstModel = null;
    let firstMixer = null;
    let secondModel = null;
    let secondMixer = null;
    let thirdModel = null;
    let thirdMixer = null;
    let fourthModel = null;
    let fourthMixer = null;
    let fifthModel = null;
    let fifthMixer = null;

    // Load the first animation (looping)
    loader.load('/models/Apple_Whole_anim1.fbx', (fbx) => {
      firstModel = fbx;
      scene.add(fbx);
      fbx.position.set(0, 0, 0);

      if (fbx.animations.length > 0) {
        firstMixer = new THREE.AnimationMixer(fbx);
        const firstAction = firstMixer.clipAction(fbx.animations[0]);
        firstAction.loop = THREE.LoopRepeat;
        firstAction.play();
      }
    });

    // Load the second animation (triggered by scroll)
    function loadSecondAnimation() {
      loader.load('/models/Apple_Whole_anim2.fbx', (fbx) => {
        secondModel = fbx;
        scene.add(fbx);
        fbx.position.set(0, 0, 0);

        if (fbx.animations.length > 0) {
          secondMixer = new THREE.AnimationMixer(fbx);
          const secondAction = secondMixer.clipAction(fbx.animations[0]);
          secondAction.loop = THREE.LoopOnce;
          secondAction.clampWhenFinished = true;
          secondAction.play();
        }

        if (firstModel) {
          scene.remove(firstModel);
          firstModel = null;
        }
        if (firstMixer) {
          firstMixer.stopAllAction();
          firstMixer = null;
        }
      });
    }

    // Load the third animation (triggered by scroll)
    function loadThirdAnimation() {
      loader.load('/models/Apple_Half_anim3.fbx', (fbx) => {
        thirdModel = fbx;
        scene.add(fbx);
        fbx.position.set(0, 0, 0);

        if (fbx.animations.length > 0) {
          thirdMixer = new THREE.AnimationMixer(fbx);
          const thirdAction = thirdMixer.clipAction(fbx.animations[0]);
          thirdAction.loop = THREE.LoopOnce;
          thirdAction.clampWhenFinished = true;
          thirdAction.play();
        }

        if (secondModel) {
          scene.remove(secondModel);
          secondModel = null;
        }
        if (secondMixer) {
          secondMixer.stopAllAction();
          secondMixer = null;
        }
      });
    }

    // Load the fourth animation (triggered by scroll)
    function loadFourthAnimation() {
      loader.load('/models/Apple_Half_anim4.fbx', (fbx) => {
        fourthModel = fbx;
        scene.add(fbx);
        fbx.position.set(0, 0, 0);

        if (fbx.animations.length > 0) {
          fourthMixer = new THREE.AnimationMixer(fbx);
          const fourthAction = fourthMixer.clipAction(fbx.animations[0]);
          fourthAction.loop = THREE.LoopOnce;
          fourthAction.clampWhenFinished = true;
          fourthAction.play();
        }

        // Remove the third model
        if (thirdModel) {
          scene.remove(thirdModel);
          thirdModel = null;
        }
        if (thirdMixer) {
          thirdMixer.stopAllAction();
          thirdMixer = null;
        }
      });
    }

    // Load the fifth animation (triggered by scroll)
    function loadFifthAnimation() {
      loader.load('/models/Apple_Half_anim5.fbx', (fbx) => {
        fifthModel = fbx;
        scene.add(fbx);
        fbx.position.set(0, 0, 0);

        if (fbx.animations.length > 0) {
          fifthMixer = new THREE.AnimationMixer(fbx);
          const fifthAction = fifthMixer.clipAction(fbx.animations[0]);
          fifthAction.loop = THREE.LoopOnce;
          fifthAction.clampWhenFinished = true;
          fifthAction.play();
        }

        // Remove the third model
        if (fourthModel) {
          scene.remove(fourthModel);
          fourthModel = null;
        }
        if (fourthMixer) {
          fourthMixer.stopAllAction();
          fourthMixer = null;
        }
      });
    }

    let secondAnimationTriggered = false;
    let thirdAnimationTriggered = false; 
    let fourthAnimationTriggered = false;
    let fifthAnimationTriggered = false; 


    // Scroll-based triggers
    function handleScroll() {
      const scrollPosition = document.documentElement.scrollTop;
      const secondAnimationThreshold = 400; // Threshold for second animation
      const thirdAnimationThreshold = 980; // Threshold for third animation
      const fourthAnimationThreshold = 1400; // Threshold for fourth animation
      const fifthAnimationThreshold = 2800; // Threshold for fifth animation
    
      // Log the current scroll position
      console.log(`Current Scroll Position: ${scrollPosition}`);
    
      // Trigger second animation
      if (scrollPosition >= secondAnimationThreshold && !secondAnimationTriggered) {
        console.log(`Triggering second animation at ${secondAnimationThreshold}`);
        loadSecondAnimation();
        secondAnimationTriggered = true;
      }
    
      // Trigger third animation
      if (scrollPosition >= thirdAnimationThreshold && !thirdAnimationTriggered) {
        console.log(`Triggering third animation at ${thirdAnimationThreshold}`);
        loadThirdAnimation();
        thirdAnimationTriggered = true; 
      }

      // Trigger fourth animation
      if (scrollPosition >= fourthAnimationThreshold && !fourthAnimationTriggered) {
        console.log(`Triggering fourth animation at ${fourthAnimationThreshold}`);
        loadFourthAnimation();
        fourthAnimationTriggered = true;
      }

      // Trigger fifth animation
      if (scrollPosition >= fifthAnimationThreshold && !fifthAnimationTriggered) {
        console.log(`Triggering fourth animation at ${fifthAnimationThreshold}`);
        loadFifthAnimation();
        fifthAnimationTriggered = true;
      }
    }

    window.addEventListener('scroll', handleScroll);

    // Animate function
    function animate() {
      requestAnimationFrame(animate);

      if (firstMixer) firstMixer.update(0.01); // Update first animation
      if (secondMixer) secondMixer.update(0.01); // Update second animation
      if (thirdMixer) thirdMixer.update(0.01); // Update third animation
      if (fourthMixer) fourthMixer.update(0.01); // Update fourth animation
      if (fifthMixer) fifthMixer.update(0.01); // Update fifth animation

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderer.dispose();
      controls.dispose();
      window.removeEventListener('scroll', handleScroll);
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
