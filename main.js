import './style.css'
import * as THREE from 'three'
import { AmbientLight, GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30, 30, 30);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight,ambientLight);



const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const daliTexture = new THREE.TextureLoader().load('daliimg.jpg');

const dali = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:daliTexture})
);
scene.add(dali);

const moonTexture = new THREE.TextureLoader().load('moon.jpg'); 
const normalTexture = new THREE.TextureLoader().load('normal.jpg'); 

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(6,60,60),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:normalTexture
  })
);
scene.add(moon);

moon.position.z=30;
moon.position.setX(-10);



function animate() {
  requestAnimationFrame(animate);


  moon.rotation.x+=0.005;
  moon.rotation.y+=0.0015;
  moon.rotation.z+=0.005;

  dali.rotation.y+=0.015;
  dali.rotation.z+=0.015;

  controls.update();
  renderer.render(scene, camera);
}

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.z = t * -0.0002;
  camera.position.z = t * -0.0002;
}

document.body.onscroll = moveCamera;

animate();
