import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { isPaused } from '/main.js';

export let obstaclesBoundingBoxes = [];
export let obstacles = [];
let obstacleBoundingBox;
var rotationSpeed = 0.025;

const opacityVal = 0.6;
const emissiveIntensity = 0.2;
var colour = 0x800080;

const loader = new GLTFLoader();

export function addTreeToScene(scene) {
  loader.load('Assets/treeTextures/treeConfig3.glb',
    function (tree) {
      tree.scene.name = "tree1";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);
      // tree.scene.children[0].geometry.computeBoundingBox();
      // playerBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      // this is to make a bounding box visible but does not work with collision detection
      const treeBoundingBox = new THREE.BoxHelper(tree.scene, 0xff0000);
      scene.add(treeBoundingBox);

      scene.add(tree.scene);
    });
}

export function createObstacle(scene, MIN_Z) {
  const randomNum = Math.floor(Math.random() * 6) + 1;
  colour = Math.random() * 0xFFFFFF << 0;
  const z = MIN_Z;
  const x = 0;
  const y = 0;
  let obstacle = null;

  switch (randomNum) {
    case 1:
      obstacle = ObstacleConfig1(x, y, z);
      break;
    case 2:
      obstacle = ObstacleConfig2(x, y, z);
      break;
    case 3:
      obstacle = ObstacleConfig3(x, y, z);
      break;
    case 4:
      obstacle = ObstacleConfig4(x, y, z);
      break;
    case 5:
      obstacle = ObstacleConfig5(x, y, z);
      break;
    case 6:
      obstacle = ObstacleConfig6(x, y, z);
      break;
  }
  obstacles.push(obstacle);
  scene.add(obstacle);
}

function ObstacleConfig1(x, y, z) {
  const obstacle = new THREE.Group();
  const obstacleMaterial = new THREE.MeshPhongMaterial({ color: colour, emissive: colour, emissiveIntensity: emissiveIntensity, opacity: opacityVal, transparent: true });

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box1);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box2 = new THREE.Mesh(new THREE.BoxGeometry(15, 36, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box2);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box3);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  box1.position.set(15, 13, 0);
  box2.position.set(0, 0, 0);
  box3.position.set(-15, -13, 0);

  obstacle.add(box1);
  obstacle.add(box2);
  obstacle.add(box3);

  obstacle.position.set(x, y, z);

  return obstacle;
}

function ObstacleConfig2(x, y, z) {
  const obstacle = new THREE.Group();
  const obstacleMaterial = new THREE.MeshPhongMaterial({ color: colour, emissive: colour, emissiveIntensity: emissiveIntensity, opacity: opacityVal, transparent: true });

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box1);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box2 = new THREE.Mesh(new THREE.BoxGeometry(15, 36, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box2);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 36, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box3);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  box1.position.set(15, 0, 0);
  box2.position.set(0, 0, 0);
  box3.position.set(-15, 0, 0);

  obstacle.add(box1);
  obstacle.add(box2);
  obstacle.add(box3);

  obstacle.position.set(x, y, z);
  return obstacle;
}

function ObstacleConfig3(x, y, z) {
  const obstacle = new THREE.Group();
  const obstacleMaterial = new THREE.MeshPhongMaterial({ color: colour, emissive: colour, emissiveIntensity: emissiveIntensity, opacity: opacityVal, transparent: true });

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(15, 24, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box1);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box2 = new THREE.Mesh(new THREE.BoxGeometry(15, 24, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box2);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 24, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box3);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  box1.position.set(15, 6, 0);
  box2.position.set(0, 6, 0);
  box3.position.set(-15, -6, 0);

  obstacle.add(box1);
  obstacle.add(box2);
  obstacle.add(box3);

  obstacle.position.set(x, y, z);
  return obstacle;
}

function ObstacleConfig4(x, y, z) {
  const obstacle = new THREE.Group();
  const obstacleMaterial = new THREE.MeshPhongMaterial({ color: colour, emissive: colour, emissiveIntensity: emissiveIntensity, opacity: opacityVal, transparent: true });

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(15, 36, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box1);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box2 = new THREE.Mesh(new THREE.BoxGeometry(15, 24, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box2);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 12, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box3);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  box1.position.set(-15, 0, 0);
  box2.position.set(0, -6, 0);
  box3.position.set(15, 12, 0);

  obstacle.add(box1);
  obstacle.add(box2);
  obstacle.add(box3);

  obstacle.position.set(x, y, z);
  return obstacle;
}

function ObstacleConfig5(x, y, z) {
  const obstacle = new THREE.Group();
  const obstacleMaterial = new THREE.MeshPhongMaterial({ color: colour, emissive: colour, emissiveIntensity: emissiveIntensity, opacity: opacityVal, transparent: true });

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box1);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box2 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box2);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box3 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box3);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  box1.position.set(0, 10, 0);
  box2.position.set(0, 0, 0);
  box3.position.set(0, -10, 0);

  obstacle.add(box1);
  obstacle.add(box2);
  obstacle.add(box3);

  obstacle.position.set(x, y, z);

  function rotateObstacle() {
    if (!isPaused) {
      obstacle.rotation.z += rotationSpeed;
    }
    requestAnimationFrame(rotateObstacle);
  };
  rotateObstacle();

  return obstacle;
}

function ObstacleConfig6(x, y, z) {
  const obstacle = new THREE.Group();
  const obstacleMaterial = new THREE.MeshPhongMaterial({ color: colour, emissive: colour, emissiveIntensity: emissiveIntensity, opacity: opacityVal, transparent: true });

  const box1 = new THREE.Mesh(new THREE.BoxGeometry(45, 12, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box1);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box2 = new THREE.Mesh(new THREE.BoxGeometry(45, 12, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box2);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 12, 10), obstacleMaterial);
  obstacleBoundingBox = new THREE.Box3().setFromObject(box3);
  obstaclesBoundingBoxes.push(obstacleBoundingBox);

  box1.position.set(0, -12, 0);
  box2.position.set(0, 12, 0);
  box3.position.set(0, 0, 0);

  obstacle.add(box1);
  obstacle.add(box2);
  obstacle.add(box3);

  obstacle.position.set(x, y, z);
  return obstacle;
}