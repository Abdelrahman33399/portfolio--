// main.js - نسخة نهائية آمنة ومضبوطة

let threeInitialized = false;

function initThreeJS() {
  if (threeInitialized) return;
  threeInitialized = true;

  const background = document.getElementById('background');
  if (!background) {
    console.error("❌ #background غير موجود في الصفحة");
    return;
  }

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    background.appendChild(renderer.domElement);

    // نجوم برتقالية
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 1000;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xFF7700,
      size: 0.7,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 500;

    function animate() {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  } catch (error) {
    console.error("❌ خطأ في Three.js:", error);
  }
}

function initAnimations() {
  if (document.querySelector('.profile-img')) {
    gsap.from(".profile-img", {
      duration: 1.5,
      opacity: 0,
      y: 50,
      ease: "bounce"
    });
  }

  if (document.querySelector('.neon-text')) {
    gsap.from(".neon-text", {
      duration: 1.2,
      opacity: 0,
      y: 30,
      delay: 0.5
    });
  }

  if (document.querySelector('.service-card')) {
    gsap.from(".service-card", {
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.3,
      delay: 1
    });
  }

  if (document.querySelector('.grid-item')) {
    gsap.from(".grid-item", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.3,
      delay: 0.5
    });
  }
}

function initScrollReveal() {
  if (typeof ScrollReveal === 'function') {
    ScrollReveal().reveal('.service-card, .grid-item', {
      delay: 200,
      distance: '50px',
      origin: 'bottom',
      interval: 100,
      duration: 800
    });
  }
}

// تفعيل تأثير الدائرة النابضة
let pulseTimer;

if (document.querySelector('.profile-container')) {
  const container = document.querySelector('.profile-container');
  const circle = document.querySelector('.pulse-circle');

  container.addEventListener('mouseenter', () => {
    clearTimeout(pulseTimer);
    if (circle) circle.style.animationPlayState = 'running';
  });

  container.addEventListener('mouseleave', () => {
    pulseTimer = setTimeout(() => {
      if (circle) circle.style.animationPlayState = 'paused';
    }, 1000);
  });
}

// ✅ التشغيل الآمن بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initThreeJS();
    initAnimations();
    initScrollReveal();
  }, 100);
});