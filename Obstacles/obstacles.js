import * as THREE from 'three';
import { playerBoundingBox } from '/Player/player.js';
import { onDeath } from '/Player/player.js';

//where obstacle should be generated
const MIN_Z = -350;
//where obstacle should be removed
const MAX_Z = 25;

const obstacles = [];
const obstaclesBoundingBoxes = [];
let obstacleBoundingBox;
export let collisionDetected = false;

const opacityVal = 0.4;
const transparency = true;
const obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0x800080,opacity:opacityVal, transparent:transparency});

function createObstacle1(x, y, z) {
  const obstacle = new THREE.Group();

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

function createObstacle2(x, y, z) {
  const obstacle = new THREE.Group();

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

function createObstacle3(x, y, z) {
  const obstacle = new THREE.Group();

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

function addObstaclesToScene(scene) {
  const randomNum = Math.floor(Math.random() * 3) + 1;

  const z = MIN_Z;
  const x = 0;
  const y = 0;
  let obstacle = null;

  switch(randomNum){
    case 1:
      obstacle = createObstacle1(x, y, z);
      break;
    case 2:
      obstacle = createObstacle2(x, y, z);
      break;
    case 3:
      obstacle = createObstacle3(x, y, z);
      break;
  }
  obstacles.push(obstacle);
  scene.add(obstacle);
}

function updateGroupBoundingBox(obstacle, index) {
  let i = 0;
  obstacle.traverse(function(child) {
    if (child.isMesh && child.geometry) {
      child.geometry.computeBoundingBox();
      obstaclesBoundingBoxes[(index*3) + i].setFromObject(child);
      i++;
    }
  });
  // for(let j = 0; j < obstacle.children.length; j++){
  //   obstacle.children[j].geometry.computeBoundingBox();
  //   obstaclesBoundingBoxes[index*3 + j].setFromObject(obstacle.children[j]);
  // }
}

function checkCollision() {
  for(let j = 0; j < 3; j++){
    if(obstaclesBoundingBoxes[j].intersectsBox(playerBoundingBox)){
      return true;
    }
  }
}

export function animateObstacles(renderer, camera, scene) {
  function animate() {
    for (let i = 0; i < obstacles.length; i++) {
      updateGroupBoundingBox(obstacles[i], i);

      if (obstacles[0].position.z > -15) {
        if(checkCollision()){
          console.log("Collision?");
          collisionDetected = true;
          onDeath(scene);
          return;
        }
      }

      if(obstacles[i].position.z > MAX_Z){
        scene.remove(obstacles[i]);
        obstacles.splice(i, 1);
        obstaclesBoundingBoxes.splice(i*3, 3);
        i--;
      }
    }

    if(obstacles[0].position.z == MIN_Z/5){
      addObstaclesToScene(scene);
    }

    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].position.z += 2; // Adjust the speed as needed
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  addObstaclesToScene(scene);
  animate();
}
