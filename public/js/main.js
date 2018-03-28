import * as THREE from 'three';
import Tree from './tree';

import '../css/styles.css';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
const tree = new Tree(0, 0, 10, 0.67, material);
for (let i = 0; i < tree.get().length; i += 1) {
  scene.add(tree.get()[i]);
}

renderer.render(scene, camera);
