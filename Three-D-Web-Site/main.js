import './style.css'
import * as THREE from 'three';

window.addEventListener('load', () => {

  const scene = new THREE.Scene();

  // objects
  const sphere = new THREE.SphereGeometry(3, 16, 16);
  const sphereTwo = new THREE.SphereGeometry(2, 16, 16);
  const torus = new THREE.TorusGeometry( 10, 1, 16, 100)
  const material = new THREE.MeshStandardMaterial({
    color: '#FF6347',
    // wireframe: true,
    roughness: 0.75,
    metalness: 0.5

  });
  const materialTwo = new THREE.MeshStandardMaterial({
    color: '#ff0000',
    wireframe: true,
    roughness: 1,
    metalness: 0
  });
  const mesh = new THREE.Mesh(torus, material);
  const meshOrbit = new THREE.Mesh(sphereTwo, material);
  const meshSphere = new THREE.Mesh(sphere, material);
  meshOrbit.position.set(0, 20, 0)
  scene.add(mesh, meshSphere, meshOrbit);

  // light
  const light = new THREE.PointLight('#FFFFFF', 100, 100)
  light.position.set( 50, 50, 50 );
  scene.add( light );

  const directionalLight = new THREE.DirectionalLight(0xffffff, Math.PI)
  directionalLight.position.set(1, 0, 1)
  scene.add(directionalLight)

  const ambLight = new THREE.AmbientLight();
  // scene.add( ambLight );

  //camera
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


  let cameraZoom = 20;
  camera.position.z = cameraZoom;
  window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY / 4;
    let cameraZ = cameraZoom + scrollAmount;
    camera.position.z = cameraZ;
  })


  scene.add(camera);

  //renderer
  const canvas = document.getElementById('webGL');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setClearColor( 0xffffff );
  renderer.setSize( window.innerWidth, window.innerHeight );

  function cycle(){
    requestAnimationFrame(cycle);
    renderer.render(scene, camera)
    mesh.rotation.x += 0.005
    mesh.rotation.y += 0.005
    mesh.rotation.z += 5
  }; cycle();
})