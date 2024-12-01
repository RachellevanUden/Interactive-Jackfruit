import './App.css';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(90);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Sphere (Apple Placeholder)
    const geometry = new THREE.SphereGeometry(40, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(50, 0, 0); // Start pos
    scene.add(sphere);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-3, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    // smooth scrolling
    let targetX = 50; 

    // Scroll-Based Animation with Smooth Transition
    function moveSphere() {
      const scrollPosition = document.documentElement.scrollTop; // scroll pos
      const insideSection = document.querySelector('section'); // "The Inside" section
      const sectionTop = insideSection.offsetTop; // Distance from top of the page to the section
      const sectionHeight = insideSection.offsetHeight;

      // Define when the animation should start and end
      const animationStart = sectionTop - window.innerHeight * 0.5; // Start animation halfway before section
      const animationEnd = sectionTop - 50; // End animation just before the section starts

      // Check if we're in the animation range
      if (scrollPosition >= animationStart && scrollPosition <= animationEnd) {
        const progress = (scrollPosition - animationStart) / (animationEnd - animationStart);
        targetX = 50 + progress * -100;
      }

      // Sphere final pos after animation
      if (scrollPosition > animationEnd) {
        targetX = -50;
      }
    }

    window.addEventListener('scroll', moveSphere);

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      sphere.position.x = THREE.MathUtils.lerp(sphere.position.x, targetX, 0.1);

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener('scroll', moveSphere);
    };
  }, []);

  return (
    <>
      <div>
        <canvas id="bg"></canvas>

        {/* Text Content */}
        <main>
          <header>
            <h1>The Apple</h1>
          </header>

          <blockquote>
            <p>
              An apple is a round, edible fruit produced by an apple tree.
              Apples have been grown for thousands of years in Eurasia and were introduced to North America by European colonists.
            </p>
          </blockquote>

          <section>
            <h2>The Inside</h2>
            <p>
              The true fruits or carpels are the harder interior chambers inside the apple's core. There are usually five carpels inside an apple, but there may be as few as three. Each of the chambers contains one or two seeds. The edible flesh is formed from the receptacle at the base of the flower.
            </p>
          </section>

          <section className="light">
            <h2>The Seed</h2>
            <p>
              The seeds are egg- to pear-shaped and may be colored from light brown or tan to a very dark brown, often with red shades or even purplish-black. They may have a blunt or sharp point. The five sepals remain attached and stand out from the surface of the apple.
            </p>
          </section>

          <blockquote>
            <p>An apple a day keeps the doctor away</p>
          </blockquote>
        </main>
      </div>
    </>
  );
}

export default App;
