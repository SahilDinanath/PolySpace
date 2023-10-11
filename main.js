import * as THREE from 'three';
import * as player from '/Player/player.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as ui from '/UI/start_screen.js'
import * as minimap from '/UI/minimap.js'
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

const ambientLighting = new THREE.AmbientLight("white", 6);

//object setup in world
function worldLevelOne() {
	scene.add(ambientLighting);
	player.addPlayerToScene(scene);
	minimap.addMiniMapToScene(scene);

	//uncomment line below to view boss (position currently incorrect and ambient light to bright for texture)
	bosses.bossTwo(camera, scene, renderer);
}


//run values that are updated continously 
function animate() {
	requestAnimationFrame(animate);
	//moves player
	player.keyboardMoveObject(scene.getObjectByName("player"));
	
	//game win condition
	if (scene.getObjectByName('minimap_icon').position.x < 20) {
		scene.getObjectByName('minimap_icon').position.x += 0.005;
		//TODO: add function to show win screen, look at UI start_screen.js to see how to achieve this.
	} 

	renderer.render(scene, camera);
	//controls.update();
}

//spawn level depending on button click 
ui.levelOneButton.onclick = function() {
	ui.disableStartScreen();
	worldLevelOne();
	animate();
}

ui.levelTwoButton.onclick = function() {
	ui.disableStartScreen();
	worldLevelOne();
	animate();
}

ui.levelThreeButton.onclick = function() {
	ui.disableStartScreen();
	worldLevelOne();
	animate();
}	
