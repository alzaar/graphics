
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene, WebGLRenderer, AmbientLight, PerspectiveCamera } from 'three';

const renderer = new WebGLRenderer({ canvas });
const scene = new Scene();
const camera = new PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 1000);
const controls = new OrbitControls( camera, renderer.domElement );  

const init = () => {
  window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  });
  
  const canvas = document.getElementById('canvas');
  const light = new AmbientLight();
  const loader = new GLTFLoader();

  loader.load('./scene.gltf', (gltf) => {
    scene.add(...gltf.scene.children);
  });    

  camera.position.set(5, 5, 5);

  camera.fov *= 0.3;
  camera.updateProjectionMatrix();

  scene.add(camera);
  scene.add(light);    
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearColor( 0xffffff, 0);
}

const animate = () => {
  renderer.render(scene, camera);
  controls.update()
  requestAnimationFrame(animate);
}


window.addEventListener('load', () => {
  init();
  animate();
})
