import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const geometry = new THREE.BoxGeometry( 1, 1, 1);
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );

const light = new THREE.AmbientLight("white", 30);
camera.position.z = 30;
camera.position.y = 2;

function animate() {

	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	movement(scene.getObjectByName("player"));
	renderer.render(scene, camera);

}

/* Player */
//load models
const loader = new GLTFLoader();
var player;
loader.load('Assets/Player/StarSparrow.glb',
	function(player) {
		player.scene.name = "player";
		scene.add(player.scene).rotateY(Math.PI);
	});

//world
function world() {
	scene.add(light);
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

function movement(object) {
	if (playerMoving) {
		keys.forEach((value, key) => {
			if (key == 37 && value == true) {
				object.position.x += object.position.x < xMovementBounds ? speed : 0;
			}
			else if (key == 38 && value == true) {
				object.position.y += object.position.y < yMovementBounds ? speed : 0;
			}
			else if (key == 39 && value == true) {

				object.position.x -= object.position.x > -xMovementBounds ? speed : 0;
			}
			else if (key == 40 && value == true) {
				object.position.y -= object.position.y > -yMovementBounds ? speed : 0;
			}
		});

	} 
	/*
	 this will send errors to the console because loading the player is async, so this 
	function runs a few times before the player is actually loaded in, therefore object is undefined.

	--Nothing to worry about for now-- :thumbsup:
	*/
	else {
		if (object.position.x != 0 || object.position.y != 0) {
			if (object.position.x > 0) {
				object.position.x -= speed/2;
			} else if (object.position.x < 0) {
				object.position.x += speed/2;
			}
			if (object.position.y > 0) {
				object.position.y -= speed/2;
			} else if (object.position.y < 0) {
				object.position.y += speed/2;
			}
		}

	}

};
world();
animate();
