import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export let treesBoundingBoxes = [];
export let trees = [];
export let treeBoundingBox;
let radius = 2550;
let position = randomOnSphere();
const loader = new GLTFLoader();

export function addTreeToScene(scene, MIN_Z) {
  const y = -2;
  var z = MIN_Z / 3;
  var x = 0;
  var randomValue = 1;

  for (let i = 0; i < 4; i++) {
    z -= i * 36;

    x = Math.floor(Math.random() * 45) + 56;
    randomValue = Math.floor(Math.random() * 3) + 1;
    switch (randomValue) {
      case 1:
        addTree1ToScene(scene, x, y, z);
        break;
      case 2:
        addTree2ToScene(scene, x, y, z);
        break;
      case 3:
        addTree3ToScene(scene, x, y, z);
        break;
    }

    z -= 34;
    x = Math.floor(Math.random() * -45) - 56;
    randomValue = Math.floor(Math.random() * 3) + 1;
    switch (randomValue) {
      case 1:
        addTree1ToScene(scene, x, y, z);
        break;
      case 2:
        addTree2ToScene(scene, x, y, z);
        break;
      case 3:
        addTree3ToScene(scene, x, y, z);
        break;
    }
  }
}

function addTree1ToScene(scene, x, y, z) {
  loader.load('Assets/treeTextures/treeConfig1.glb',
    function (tree) {
      tree.scene.name = "tree1";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);
      tree.scene.children[0].children[0].geometry.computeBoundingBox();
      treeBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      trees.push(tree.scene);
      treesBoundingBoxes.push(treeBoundingBox);

      tree.scene.position.set(x, y, z);
      tree.scene.rotateY(Math.PI);
      scene.add(tree.scene);
    });
}

function addTree2ToScene(scene, x, y, z) {
  loader.load('Assets/treeTextures/treeConfig2.glb',
    function (tree) {
      tree.scene.name = "tree2";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);
      tree.scene.children[0].children[1].geometry.computeBoundingBox();
      treeBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      trees.push(tree.scene);
      treesBoundingBoxes.push(treeBoundingBox);

      tree.scene.position.set(x, y, z);
      scene.add(tree.scene);
    });
}

function addTree3ToScene(scene, x, y, z) {
  loader.load('Assets/treeTextures/treeConfig3.glb',
    function (tree) {
      tree.scene.name = "tree3";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);
      tree.scene.children[0].children[4].geometry.computeBoundingBox();
      treeBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      trees.push(tree.scene);
      treesBoundingBoxes.push(treeBoundingBox);

      tree.scene.position.set(x, y, z);
      scene.add(tree.scene);
    });
}

function randomOnSphere() {
  // Generate random spherical coordinates
  var theta = 2 * Math.PI * Math.random();
  var phi = Math.PI * Math.random();

  // Convert to cartesian
  var x = Math.sin(phi) * Math.cos(theta) * radius;
  var y = -2515 + Math.sin(phi) * Math.sin(theta) * radius;
  var z = -200 + Math.cos(phi) * radius;

  return new THREE.Vector3(x, y, z);
}
