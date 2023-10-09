import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();

//sets up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLighting = new THREE.AmbientLight("white", 30);

//object setup in world
function world() {
	scene.add(ambientLighting);
	loadPlayer();
}

//run values that are updated continously 
function animate() {

	requestAnimationFrame(animate);
	//moves player
	keyboardMoveObject(scene.getObjectByName("player"));
	renderer.render(scene, camera);

}

/* Player */
//load models
const loader = new GLTFLoader();
function loadPlayer() {
	loader.load('Assets/Player/StarSparrow.glb',
		//we have to set up player in here for now
		function(player) {
			player.scene.name = "player";
			scene.add(player.scene).rotateY(Math.PI);
		});
}








//player keyboard input for movement
const speed = 0.5;
const yMovementBounds = 16;
const xMovementBounds = 16;
var playerMoving = false;
const keys = new Map();

document.onkeydown = function(e) {
	playerMoving = true;
	keys.set(e.which, true);
};

document.onkeyup = function(e) {
	playerMoving = false;
	keys.delete(e.which);
};

function keyboardMoveObject(object) {
	if (object == undefined)
		return;
	if (playerMoving) {
		keys.forEach((_, key) => {
			if (key == 37) {
				object.position.x += object.position.x < xMovementBounds ? speed : 0;
			}
			else if (key == 38) {
				object.position.y += object.position.y < yMovementBounds ? speed : 0;
			}
			else if (key == 39) {

				object.position.x -= object.position.x > -xMovementBounds ? speed : 0;
			}
			else if (key == 40) {
				object.position.y -= object.position.y > -yMovementBounds ? speed : 0;
			}
		});

	}
	else {
		if (object.position.x != 0 || object.position.y != 0) {
			if (object.position.x > 0) {
				object.position.x -= speed / 2;
			} else if (object.position.x < 0) {
				object.position.x += speed / 2;
			}
			if (object.position.y > 0) {
				object.position.y -= speed / 2;
			} else if (object.position.y < 0) {
				object.position.y += speed / 2;
			}
		}

	}

};



//create objects
world();
//animate scene
animate();
