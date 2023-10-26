import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export let treesBoundingBoxes = [];
export let trees = [];
export let treeBoundingBox;
let radius = 2550;
let position = randomOnSphere();
const loader = new GLTFLoader();

export function addTreeToScene(scene) {
  loader.load('Assets/treeTextures/treeConfig1.glb',
    function (tree) {
      tree.scene.name = "tree1";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);

      tree.scene.children[0].children[0].children[0].children[0].geometry.computeBoundingBox();
      treeBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      // this is to make a bounding box visible but does not work with collision detection
      // treeBoundingBox = new THREE.BoxHelper(tree.scene, 0xff0000);
      // scene.add(treeBoundingBox);

      trees.push(tree.scene);
      treesBoundingBoxes.push(treeBoundingBox);

      //tree.scene.position.copy(position);
      scene.add(tree.scene);
    });
}

function addTree1ToScene(scene, coords) {
  loader.load('Assets/treeTextures/treeConfig1.glb',
    function (tree) {
      tree.scene.name = "tree1";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);
      tree.scene.children[0].children[0].children[0].children[0].geometry.computeBoundingBox();
      treeBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      trees.push(tree.scene);
      treesBoundingBoxes.push(treeBoundingBox);

      tree.scene.position.copy(coords);
      scene.add(tree.scene);
    });
}

function addTree2ToScene(scene, coords) {
  loader.load('Assets/treeTextures/treeConfig2.glb',
    function (tree) {
      tree.scene.name = "tree2";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);
      tree.scene.children[0].children[0].children[0].children[0].geometry.computeBoundingBox();
      treeBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      trees.push(tree.scene);
      treesBoundingBoxes.push(treeBoundingBox);

      tree.scene.position.copy(coords);
      scene.add(tree.scene);
    });
}

function addTree3ToScene(scene, coords) {
  loader.load('Assets/treeTextures/treeConfig3.glb',
    function (tree) {
      tree.scene.name = "tree3";
      tree.scene.rotateY(Math.PI);
      tree.scene.scale.set(100, 100, 100);
      tree.scene.children[0].children[0].children[0].children[0].geometry.computeBoundingBox();
      treeBoundingBox = new THREE.Box3().setFromObject(tree.scene);

      trees.push(tree.scene);
      treesBoundingBoxes.push(treeBoundingBox);

      tree.scene.position.copy(coords);
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
