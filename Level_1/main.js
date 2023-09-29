import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 10;

function animate() {
	
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	movement(cube);
	renderer.render( scene, camera );
	
}

//player keyboard input for movement
let ySpeed = 0.1;
let xSpeed =0.1;
let playerMoving = false;
var keys = new Map();

document.onkeydown= function (e) {
    keys.set(e.which,true);
};

document.onkeyup = function (e) {
    keys.delete(e.which);
};

function movement(object) {
	keys.forEach((value, key)=> {
	if (key == 37 && value == true){
			object.position.x -= xSpeed;			
		}
		else if (key == 38 && value == true){

			object.position.z -= xSpeed;			
		}
		else if (key == 39 && value == true){

			object.position.x += xSpeed;			
		}
		else if (key == 40 && value == true){
			object.position.z += xSpeed;			
		}
	}	
	);
	
};

animate();
