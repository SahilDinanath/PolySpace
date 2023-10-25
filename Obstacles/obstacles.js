import { playerBoundingBox } from '/Player/player.js';
import { obstacles, obstaclesBoundingBoxes } from './obstacleCreation.js';
import { createObstacle, addTreeToScene } from './obstacleCreation.js';
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

        if (obstacles[i].position.z > MAX_Z) {
          scene.remove(obstacles[i]);
          obstacles.splice(i, 1);
          obstaclesBoundingBoxes.splice(i * 3, 3);
          i--;
        }
      }

      if (obstacles[0].position.z == -80) {
        createObstacle(scene, MIN_Z);
      }

      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].position.z += speed;
      }

      renderer.render(scene, camera);

    }
    requestAnimationFrame(animate);
  }
  //addTreeToScene(scene);
  createObstacle(scene, MIN_Z);
  animate();
}

export function hasCollided() {
  if (collisionDetected) {
    return true;
  }
}
