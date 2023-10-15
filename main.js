import * as THREE from 'three';
import * as player from '/Player/player.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as ui from '/UI/start_screen.js'
import * as minimap from '/UI/minimap.js'
import * as bosses from '/Bosses/bosses.js';
import * as music from '/Music/musicController.js';
import * as particle from '/Player/particleEffect.js';
import {disableButtons} from "/UI/start_screen.js";
//
//game below
//

const scene = new THREE.Scene();
//sets up sound, sound needs to be set up before the world is setup as it runs during the login page
music.setInGameSound()

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

var level1 = false;
var level2= false;
var level3 = false;
//object setup in world
function worldLevelOne() {
	level1 = true;
	scene.add(ambientLighting);
	player.addPlayerToScene(scene);
	minimap.addMiniMapToScene(scene);

	//uncomment line below to view boss (position currently incorrect and ambient light to bright for texture)
	bosses.bossTwo(camera, scene, renderer);
}


// Define a variable to track the animation state
let isPaused = false;

// Function to handle the animation
function animate() {
	if (!isPaused) {
		requestAnimationFrame(animate);

		// Your animation code here
		player.keyboardMoveObject(scene.getObjectByName("player"));
		particle.updateParticleSystem();

		if (scene.getObjectByName('minimap_icon').position.x < 20) {
			scene.getObjectByName('minimap_icon').position.x += 0.005;
			//TODO: add function to show win screen, look at UI start_screen.js to see how to achieve this.
 			//ui.enableWinScreen();  //it shows while game is in play?
		} else {
			player.onDeath(scene);
			ui.enableLoseScreen();
		}

		renderer.render(scene, camera);
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
ui.levelOneButton.onclick = function() {

	/*sound can only play if user clicks somewhere on the screen, 
	 * this is a design by google/firefox, this plays the song in case the user never clicked anywhere on screen*/
	music.enableSound();
	ui.disableStartScreen();
	worldLevelOne();
	animate();
}

ui.levelTwoButton.onclick = function() {
	level2 = true;
	ui.disableStartScreen();
	worldLevelOne();
	animate();
}

ui.levelThreeButton.onclick = function() {
	level3 = true;
	ui.disableStartScreen();
	worldLevelOne();
	animate();
}

ui.nextButton.onclick = function (){
	clearScene();
	disableButtons();
	if(level1){
		level1 = false;
		worldLevelOne();   //change to level2
		animate();
	}
	if(level2){
		level2 = false;
		worldLevelOne(); // change to level3
		animate();
	}


}

ui.resumeButton.onclick = function (){
 //TODO: resume game on keyboard pause
}

ui.returnButton.onclick = function (){

	window.location.reload(); // This will reload the page
}

ui.restartButton.onclick = function (){
	clearScene();
	disableButtons();
	if(level1){
		worldLevelOne();
	}
	if(level2){
		worldLevelOne(); // change to level2
	}
	if(level3){
		worldLevelOne(); // change to level3
	}
}




