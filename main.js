import * as THREE from 'three';
import * as player from '/Player/player_exports.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as ui from '/UI/ui_exports.js'
import * as music from '/Music/musicController.js';
import * as world from "/Levels/levels.js";
import * as planet from "/Planets/worldGenerator.js";
import * as skybox from './Background/daySkyBox.js';
import * as collisions from './Obstacles/obstacles.js';

import { createStars, animateStars, animateDirectionalLight } from './Background/Background.js';
import * as obstacles from "./Obstacles/obstacles";


let insetWidth, insetHeight;

const scene = new THREE.Scene();
//sets up renderer/screen
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.name = "mainCamera";
camera.position.z = 30;
camera.position.y = 2;

//adds initial camera to scene to show starfield
let initialCamera = new THREE.OrthographicCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.name = "initialCamera";
// camera.position.z = 30;
// camera.position.y = 2;
scene.add(initialCamera);
var initCam = true;

scene.add(camera);

var firstPersonActive = false;

let firstPersonCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
scene.add(firstPersonCamera);

		let cameraTOP = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20000);

//sets up sound, sound needs to be set up before the world is setup as it runs during the login page

music.setInGameSound();

//Add orbit control
//var controls = new OrbitControls(camera, renderer.domElement);

var level1 = false;
var level2 = false;
var level3 = false;
var canPause = false;

// Define a variable to track the animation state
export let isPaused = false;


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

	//CAM#2
	insetHeight = window.innerHeight / 6;
	insetWidth = window.innerWidth / 6;
	cameraTOP.aspect = insetWidth / insetHeight;
	cameraTOP.updateProjectionMatrix();

	initialCamera.aspect = window.innerWidth / window.innerHeight;
	initialCamera.updateProjectionMatrix();
	//renderer.render(scene, camera);
}



//when window is resized, update everything
window.addEventListener('resize', onWindowResize);

onWindowResize();

function render() {
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	if (firstPersonActive) {
		renderer.render(scene, firstPersonCamera);
	}
	else {
		renderer.render(scene, camera);
	}


	//CAM#2
	renderer.clearDepth();
	renderer.setScissorTest(true);
	renderer.setScissor(
		window.innerWidth - insetWidth - 26,
		window.innerHeight - insetHeight - 26,
		insetWidth,
		insetHeight
	)

	renderer.setViewport(
		window.innerWidth - insetWidth - 26,
		window.innerHeight - insetHeight - 26,
		insetWidth,
		insetHeight
	)

	if (level1 || level2 || level3) {
		cameraTOP.name = "OverheadCam";
		cameraTOP.position.set(0, 20, 20);
		camera.add(cameraTOP); //make cameraTop a child of main camera

		renderer.render(scene, cameraTOP);
	}

	renderer.setScissorTest(false);
}




// Your animation code here
function animate() {
	animateStars();
	if (!isPaused) {
		player.keyboardMoveObject(scene, firstPersonCamera);
		player.updateParticleSystem();
		//obstacles.animateObstacles(renderer, camera, scene);

		checkGameCondition(scene);

		//stuff for level 3, don't worry it won't affect anything if not necessary as it checks if level 3 is selected
		skybox.updateSkyBox();
		planet.rotateSphere(scene);
		//world.updateDirectionalLighting(scene);



	}
	requestAnimationFrame(animate);
	render();
}

function checkGameCondition(scene) {
	if (scene.getObjectByName('minimap_icon') === undefined)
		return;
	//TODO:
	//on player collision, show death screen and pause game
	if (collisions.hasCollided()) {
		canPause = false;
		player.onDeath(scene);
		if (scene.getObjectByName("minimap_icon").position.x < 20) {
			ui.enableLoseScreen();
		}
		return;
	}
	if (scene.getObjectByName('minimap_icon').position.x > 20) {
		canPause = false;
		ui.enableWinScreen();
		isPaused = true;
		return;
	} else {
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
document.addEventListener('keydown', function(event) {
	if (event.key === ' ' && canPause) { // ' ' represents the space key
		if (isPaused && (level3 || level2 || level1)) {
			resumeAnimation();

		} else if (!isPaused && (level3 || level2 || level1)) {
			pauseAnimation();

		}
	}
	if (event.key === '1') {
		firstPersonActive = true;
	}
	if (event.key === '2') {
		firstPersonActive = false;
	}


});

// Define a function to clear the scene
function clearScene() {
	ui.disableButtons();
	// Remove all objects from the scene
	while (scene.children.length > 0) {
		scene.remove(scene.children[0]);
	}

}


//spawn level depending on button click

ui.levelOneButton.onclick = function() {
	canPause = true;
	level1 = true;
	initCam = false;
	/*sound can only play if user clicks somewhere on the screen, 
	 * this is a design by google/firefox, this plays the song in case the user never clicked anywhere on screen*/

	ui.disableStartScreen();
	ui.updateProgressBar(() =>
	{
		scene.remove(scene.getObjectByName("starField"));
		world.levelOne(scene, renderer, camera);
		animate();
	});

}

ui.levelTwoButton.onclick = function() {
	level2 = true;
	canPause = true;
	initCam = false;
	ui.disableStartScreen();
	ui.updateProgressBar(() =>
	{
		scene.remove(scene.getObjectByName("starField"));
		world.levelOne(scene, renderer, camera);
		animate();
	});
}

ui.levelThreeButton.onclick = function() {
	level3 = true;
	canPause = true;
	initCam = false;
	ui.disableStartScreen();
	ui.updateProgressBar(() =>
	{
		scene.remove(scene.getObjectByName("starField"));
		world.levelOne(scene, renderer, camera);
		animate();
	});
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
}

ui.returnButton.onclick = function() {

	window.location.reload(); // This will reload the page
}


//TODO: fix restart

ui.restartButton.onclick = function() {
	ui.disableButtons();
	clearScene();
	canPause = true;
	isPaused = false;
	if (level1) {
		world.levelOne(scene, renderer, camera);

	}
	if (level2) {

		world.levelTwo(scene, renderer, camera);
	}
	if (level3) {
		world.levelThree(scene, renderer, camera);
	}
	animate();
	// Start the animation

}

//controls page
ui.showControlsButton.onclick = function() {
	ui.enableControlScreen();
}
ui.backButton.onclick = function() {
	ui.disableControlScreen();
}

createStars(scene);
animate();
