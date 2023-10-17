import * as THREE from 'three';
//where obstacle should be generated
const MIN_Z = -350;
//where obstacle should be removed
const MAX_Z = 25;
const obstacles = [];
const opacityVal = 0.4;
const transparency = true;
function createObstacle1(x, y, z) {
  const obstacle = new THREE.Group();

  const obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0x800080,opacity:opacityVal, transparent:transparency});
  const box1 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);
  const box2 = new THREE.Mesh(new THREE.BoxGeometry(15, 36, 10), obstacleMaterial);
  const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);

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

  const obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0x800080, opacity:opacityVal,transparent:transparency});
  const box1 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);
  const box2 = new THREE.Mesh(new THREE.BoxGeometry(15, 36, 10), obstacleMaterial);
  const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 36, 10), obstacleMaterial);

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

  const obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0x800080 ,opacity: opacityVal, transparent: transparency});
  const box1 = new THREE.Mesh(new THREE.BoxGeometry(30, 18, 10), obstacleMaterial);
  //const box2 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);
  //const box3 = new THREE.Mesh(new THREE.BoxGeometry(15, 10, 10), obstacleMaterial);

  box1.position.set(15, 0, 0);
  //box2.position.set(0, 0, 0);
  //box3.position.set(-15, 0, 0);

  obstacle.add(box1);
  //obstacle.add(box2);
  //obstacle.add(box3);

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

export function animateObstacles(renderer, camera, scene) {
  function animate() {
    

    for (let i = 0; i < obstacles.length; i++) {
      if(obstacles[i].position.z > MAX_Z){
        scene.remove(obstacles[i]);
        obstacles.splice(i, 1);
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
