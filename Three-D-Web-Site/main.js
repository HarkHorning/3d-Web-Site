import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();

// objects
// const geometry = new THREE.SphereGeometry(3, 64, 64);
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
  color: '#FF6347',
  // wireframe: true,
  roughness: 1,
  metalness: 0.25
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// light
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

const ambLight = new THREE.AmbientLight();
// scene.add( ambLight );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);
scene.add(pointLight, ambLight, light);

//camera
const camera = new THREE.PerspectiveCamera( 75, 800 / 600, 0.1, 1000 );
camera.position.z = 40;
scene.add(camera);

//renderer
const canvas = document.getElementById('webGL');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );


function cycle(){
  requestAnimationFrame(cycle);
  renderer.render(scene, camera)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  mesh.rotation.z += 0.01
}; cycle();