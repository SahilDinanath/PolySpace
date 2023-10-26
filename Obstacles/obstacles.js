import { playerBoundingBox } from '/Player/player.js';
import { obstacles, obstaclesBoundingBoxes, createObstacle } from './obstacleCreation.js';
import { trees, treesBoundingBoxes, addTreeToScene, generateTree } from './treeCreation.js';
import { isPaused } from '/main.js';

//where obstacle should be generated
const MIN_Z = -400;
//where obstacle should be removed
const MAX_Z = 25;

export let collisionDetected = false;

function updateGroupBoundingBox(obstacle, index) {
  let i = 0;
  obstacle.traverse(function (child) {
    if (child.isMesh && child.geometry) {
      obstaclesBoundingBoxes[(index * 3) + i].setFromObject(child);
      i++;
    }
  });
}

function checkCollision() {
  for (let j = 0; j < 3; j++) {
    if (obstaclesBoundingBoxes[j].intersectsBox(playerBoundingBox)) {
      return true;
    }
  }
}

function checkTreeCollision() {
  for (let j = 0; j < treesBoundingBoxes.length; j++) {
    if (treesBoundingBoxes[j].intersectsBox(playerBoundingBox)) {
      return true;
    }
  }
}

export function animateObstacles(renderer, camera, scene, speed) {
  function animate() {
    if (!isPaused) {
      for (let i = 0; i < obstacles.length; i++) {
        updateGroupBoundingBox(obstacles[i], i);

        obstacles[i].traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });

        if (obstacles[0].position.z > -15) {
          if (checkCollision()) {
            console.log("Collision?");
            collisionDetected = true;
            return;
          }
        }

        if (obstacles[i].position.z == -80) {
          createObstacle(scene, MIN_Z);
        }

        if (obstacles[i].position.z > MAX_Z) {
          scene.remove(obstacles[i]);
          obstacles.splice(i, 1);
          obstaclesBoundingBoxes.splice(i * 3, 3);
          i--;
        }
      }

      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].position.z += speed;
      }

      for (let i = 0; i < trees.length; i++) {
        if (trees[i].position.z > MAX_Z + 30) {
          trees[i].position.z = MIN_Z;
        }

        treesBoundingBoxes[i].setFromObject(trees[i]);

        if (trees[i].position.z > -20) {
          if (checkTreeCollision()) {
            console.log("Collision?");
            collisionDetected = true;
            return;
          }
        }
      }

      for (let i = 0; i < trees.length; i++) {
        trees[i].position.z += 0.5;
      }

      renderer.render(scene, camera);

    }
    requestAnimationFrame(animate);
  }
  addTreeToScene(scene, MIN_Z);
  generateTree(scene, MIN_Z + 175);
  generateTree(scene, MIN_Z);

  createObstacle(scene, MIN_Z);
  animate();
}

export function hasCollided() {
  if (collisionDetected) {
    return true;
  }
}
