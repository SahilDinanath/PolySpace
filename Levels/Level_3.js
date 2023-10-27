import * as bosses from './Bosses/bosses.js';
import * as obstacles from './Obstacles/obstacles.js';
import * as THREE from 'three';
import * as player from './Player/player_exports.js';
import * as ui from './UI/ui_exports.js'; //TODO: add import for sky box 
import * as earth from '../Planets/worldGenerator.js';
import * as skybox from '../Background/daySkyBox.js';

export function levelThree(scene, renderer, camera) {
	//sets up lighting 
	const ambientLighting = new THREE.AmbientLight("white", 0.5);
	scene.add(ambientLighting);

	//sets up objects in scene
	player.addPlayerToScene(scene);
	player.setPlayerSpeed(0.7);
	ui.addMiniMapToScene(scene);
	
	//sets up boss in scene
	bosses.bossTwo(camera, scene, renderer);
	let bossTwo = scene.getObjectByName("bossTwo");
	bossTwo.position.setY(25);
	bossTwo.scale.set(7,7,7);

	obstacles.animateObstacles(renderer, camera, scene, 2);

	skybox.initSky(scene, renderer, camera);

	//adds earth to scene with lighting with respect to the sun
	let earthTexture = '../Assets/earthTextures/GroundGrassGreen002/GroundGrassGreen002_COL_2K.jpg';
	let wrap = true;
	let earthObject  = earth.addSphereToScene(scene, earthTexture, wrap);
	addSunLightingToScene(scene);
}



//lighting 
export function updateDirectionalLighting(scene) {

	const object = scene.getObjectByName("sun");
	if (object == undefined)
		return;
	object.position.y -= 0.02;
}

//adds directional lighting to scene
function addSunLightingToScene(scene) {
	const dl = new THREE.DirectionalLight(0xffffff, 3);

	dl.castShadow = true;
	dl.position.y = 100;
	dl.shadow.camera.left = -1000;  // Adjust these values so that shadow covers a larger area
	dl.shadow.camera.right = 1000;
	dl.shadow.camera.top = 1000;
	dl.shadow.camera.bottom = -1000;
	dl.shadow.mapSize.width = 1024;
	dl.shadow.mapSize.height = 1024;
	//dl.position.set(0, 100, -300);
	dl.name = "sun";
	scene.add(dl);
}

