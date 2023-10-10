import * as THREE from 'three';
import * as player from '/Player/player.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as ui from '/UI/start_screen.js'
import * as bosses from '/Bosses/bosses.js';

//
//game below
//

const scene = new THREE.Scene();

//sets up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = 2;

//sets up renderer/screen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Add orbit control
var controls = new OrbitControls(camera, renderer.domElement);

const ambientLighting = new THREE.AmbientLight("white", 30);

//object setup in world
function worldLevelOne() {
	scene.add(ambientLighting);
	player.loadPlayer(scene);
	//uncomment line below to view boss (position currently incorrect and ambient light to bright for texture)
	//bosses.bossOne(camera, scene, renderer);
}


//run values that are updated continously 
function animate() {
	requestAnimationFrame(animate);
	//moves player
	player.keyboardMoveObject(scene.getObjectByName("player"));
	renderer.render(scene, camera);
	controls.update();
}

//spawn level depending on button click 
ui.levelOneButton.onclick = function() {
	ui.removeStartScreen();
	worldLevelOne();
	animate();
}

ui.levelTwoButton.onclick = function() {
	ui.removeStartScreen();
	worldLevelOne();
	animate();
}

ui.levelThreeButton.onclick = function() {
	ui.removeStartScreen();
	worldLevelOne();
	animate();
}
