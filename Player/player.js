import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//player keyboard input for movement
const speed = 0.5;
const yMovementBounds = 16;
const xMovementBounds = 16;
export let playerMoving = false;

//user input for player movement
const keys = new Map();
document.onkeydown = function(e) {
	setPlayerMoving(true);
	keys.set(e.which, true);
};

document.onkeyup = function(e) {
	setPlayerMoving(false);
	keys.delete(e.which);
};
/* Player */
//load models
const loader = new GLTFLoader();

export function loadPlayer(scene) {
	loader.load('Assets/Player/StarSparrow.glb',
		//we have to set up player in here for now
		function(player) {
			player.scene.name = "player";
			scene.add(player.scene).rotateY(Math.PI);
		});
}
export function setPlayerMoving(value){
	playerMoving = value;
}
export function keyboardMoveObject(object) {
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
