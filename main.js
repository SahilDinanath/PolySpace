import * as THREE from 'three';
import * as player from '/Player/player_exports.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as ui from '/UI/ui_exports.js'
import * as music from '/Music/musicController.js';
import * as world from "/Levels/levels.js";
import * as planet from "/Planets/worldGenerator.js";
//import { scene, createStars, animateStars, animateDirectionalLight } from './Background/Background.js'; 
import * as skybox from  './Background/daySkyBox.js'; 

//sets up renderer/screen
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//adds initial camera to scene to show starfield
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.name = "mainCamera";
camera.position.z = 30;
camera.position.y = 2;

scene.add(camera);


//sets up sound, sound needs to be set up before the world is setup as it runs during the login page
music.setInGameSound()

//Add orbit control
var controls = new OrbitControls(camera, renderer.domElement);

var level1 = false;
var level2 = false;
var level3 = false;

// Define a variable to track the animation state
let isPaused = false;

//animateDirectionalLight();
//createStars();
// Your animation code here
function animate() {
	if (!isPaused) {
		requestAnimationFrame(animate);
		//animateStars();
		player.keyboardMoveObject(scene);
		player.updateParticleSystem();

		checkGameCondition(scene);
		ui.updateMiniMap(scene);

		//stuff for level 3, don't worry it won't affect anything if not necessary as it checks if level 3 is selected
		skybox.updateSkyBox();

		planet.rotateSphere(scene);

		world.updateDirectionalLighting(scene);

		renderer.render(scene, camera);
	}

}

function checkGameCondition(scene) {
	if (scene.getObjectByName('minimap_icon') == undefined)
		return;
	//TODO:
	//on player collision, show death screen and pause game
	if (scene.getObjectByName('minimap_icon').position.x > 20) {
		ui.enableWinScreen();
	}

}


//when window is resized, update everything
window.addEventListener('resize', onWindowResize);
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.render(scene, camera);
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
	if (event.key === ' ') { // ' ' represents the space key
		if (isPaused) {
			resumeAnimation();
		} else {
			pauseAnimation();
		}
	}
});

//music.enableSound();

// Define a function to clear the scene
function clearScene() {
	// Remove all objects from the scene
	while (scene.children.length > 0) {
		scene.remove(scene.children[0]);
	}

}

//spawn level depending on button click 
animate();
ui.levelOneButton.onclick = function() {
	level1 = true;
	/*sound can only play if user clicks somewhere on the screen, 
	 * this is a design by google/firefox, this plays the song in case the user never clicked anywhere on screen*/
	music.enableSound();
	ui.disableStartScreen();
	world.levelOne(scene, renderer, camera);
	animate();
}

ui.levelTwoButton.onclick = function() {
	level2 = true;
	ui.disableStartScreen();
	world.levelTwo(scene, renderer, camera);
	animate();
}

ui.levelThreeButton.onclick = function() {
	level3 = true;
	ui.disableStartScreen();
	world.levelThree(scene, renderer, camera);
	animate();
}

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
	//TODO: resume game on keyboard pause
}

ui.returnButton.onclick = function() {

	window.location.reload(); // This will reload the page
}

ui.restartButton.onclick = function() {
	clearScene();
	ui.disableButtons();
	if (level1) {
		world.levelOne(scene, renderer, camera);
	}
	if (level2) {

		world.levelTwo(scene, renderer, camera);
	}
	if (level3) {
		world.levelThree(scene, renderer, camera);
	}
}
