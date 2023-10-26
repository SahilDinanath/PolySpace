import * as THREE from 'three';
import * as player from '/Player/player_exports.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as ui from '/UI/ui_exports.js'
import * as music from '/Music/musicController.js';
import * as world from "/Levels/levels.js";
import * as planet from "/Planets/worldGenerator.js";
import * as skybox from  './Background/daySkyBox.js'; 
import * as collisions from './Obstacles/obstacles.js';

import {  createStars, animateStars, animateDirectionalLight } from './Background/Background.js';
import * as obstacles from "./Obstacles/obstacles";

let insetWidth, insetHeight;

const scene = new THREE.Scene();
//sets up renderer/screen
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

//adds initial camera to scene to show starfield
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.name = "mainCamera";
camera.position.z = 30;
camera.position.y = 2;

let cameraTOP = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
cameraTOP.name = "OverheadCam";
cameraTOP.position.set(0,50, -10);
camera.add(cameraTOP); //make cameraTop a child of main camera
scene.add(camera);

//sets up sound, sound needs to be set up before the world is setup as it runs during the login page

music.setInGameSound();

//Add orbit control
var controls = new OrbitControls(camera, renderer.domElement);

var level1 = false;
var level2 = false;
var level3 = false;

// Define a variable to track the animation state
export let isPaused = false;


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

	//CAM#2
	insetHeight = window.innerHeight / 4;
	insetWidth = window.innerWidth / 4;
	cameraTOP.aspect = insetWidth/ insetHeight;
	cameraTOP.updateProjectionMatrix();


	renderer.render(scene, camera);
}

//when window is resized, update everything
window.addEventListener('resize', onWindowResize);

onWindowResize();
// Your animation code here
function animate() {
	//createStars(scene);
	//animateStars(scene); //start screen
	if (!isPaused) {
		player.keyboardMoveObject(scene);
		player.updateParticleSystem();
		//obstacles.animateObstacles(renderer, camera, scene);

		checkGameCondition(scene);

		//stuff for level 3, don't worry it won't affect anything if not necessary as it checks if level 3 is selected
		skybox.updateSkyBox();
		planet.rotateSphere(scene);
		//world.updateDirectionalLighting(scene);

	}
	requestAnimationFrame(animate);
	renderer.setViewport(0,0, window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);

	//CAM#2
	renderer.clearDepth();
	renderer.setScissorTest(true);
	renderer.setScissor(
		window.innerWidth - insetWidth - 16,
		window.innerHeight - insetHeight - 16,
		insetWidth,
		insetHeight
	)

	renderer.setViewport(
		window.innerWidth - insetWidth - 16,
		window.innerHeight - insetHeight - 16,
		insetWidth,
		insetHeight
	)

	renderer.render(scene, cameraTOP);
	renderer.setScissorTest(false);

}

function checkGameCondition(scene) {
	if (scene.getObjectByName('minimap_icon') === undefined)
		return;
	//TODO:
	//on player collision, show death screen and pause game
	if(collisions.hasCollided()){
		player.onDeath(scene); 
		if(scene.getObjectByName("minimap_icon").position.x <20){
			ui.enableLoseScreen();
		}
		return;
	}
	if (scene.getObjectByName('minimap_icon').position.x > 20) {
		ui.enableWinScreen();
		return;
	}else{
		ui.updateMiniMap(scene);
	}
}



// Function to pause the animation
function pauseAnimation() {
	isPaused = true;
	ui.enablePauseScreen();
}

// Function to resume the animation
function resumeAnimation() {
	if (isPaused) {
		isPaused = false;
		ui.disableButtons();
		animate();
	}
}

// Listen for the space key press event to pause or resume game
document.addEventListener('keydown', function (event) {
	if (event.key === ' ') { // ' ' represents the space key
		if (isPaused && (level3 || level2 || level1)) {
			resumeAnimation();

		} else if (!isPaused && (level3 || level2 || level1)) {
			pauseAnimation();

		}
	}
});



// Define a function to clear the scene
function clearScene() {
	// Remove all objects from the scene
	while (scene.children.length > 0) {
		scene.remove(scene.children[0]);
	}

}




//spawn level depending on button click 

let pauseObstacles;
ui.levelOneButton.onclick = function() {
	level1 = true;

	/*sound can only play if user clicks somewhere on the screen, 
	 * this is a design by google/firefox, this plays the song in case the user never clicked anywhere on screen*/
	ui.disableStartScreen();

	scene.remove(scene.getObjectByName("starField"));

	world.levelOne(scene, renderer, camera);
	animate();
}

ui.levelTwoButton.onclick = function() {
	level2 = true;

	
	scene.remove(scene.getObjectByName("starField"));

	ui.disableStartScreen();
	world.levelTwo(scene, renderer, camera);
	//createStars(scene);

	animate();
}

ui.levelThreeButton.onclick = function() {
	level3 = true;

	scene.remove(scene.getObjectByName("starField"));

	ui.disableStartScreen();
	world.levelThree(scene, renderer, camera);
	animate();
}

//TODO: fix next

ui.nextButton.onclick = function() {
	clearScene();
	ui.disableButtons();
	if (level1) {
		level1 = false;
		world.levelOne(scene, renderer, camera);
		animate();
	}
	if (level2) {
		level2 = false;
		world.levelTwo(scene, renderer, camera);
		animate();
	}
}

ui.resumeButton.onclick = function() {
	resumeAnimation();
	pauseObstacles(false); // Resume obstacles
}

ui.returnButton.onclick = function() {

	window.location.reload(); // This will reload the page
}

//TODO: fix restart

// ui.restartButton.onclick = function() {
// 	clearScene();
// 	ui.disableButtons();
// 	if (level1) {
// 		world.levelOne(scene, renderer, camera);
// 	}
// 	if (level2) {
//
// 		world.levelTwo(scene, renderer, camera);
// 	}
// 	if (level3) {
// 		world.levelThree(scene, renderer, camera);
// 	}
// }

