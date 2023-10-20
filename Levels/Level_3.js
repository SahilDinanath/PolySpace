import * as bosses from '/Bosses/bosses.js';
import * as obstacles from '/Obstacles/obstacles.js';
import * as THREE from 'three';
import * as player from '/Player/player_exports.js';
import * as ui from '/UI/ui_exports.js';
import { Sky } from 'three/examples/jsm/objects/Sky';

export function levelThree(scene, renderer, camera) {
	//sets up lighting 
	const ambientLighting = new THREE.AmbientLight("white", 6);
	scene.add(ambientLighting);

	//sets up objects in scene
	player.addPlayerToScene(scene);
	ui.addMiniMapToScene(scene);
	bosses.bossTwo(camera, scene, renderer);
	obstacles.animateObstacles(renderer, camera, scene);
	//uncomment line below to view boss (position currently incorrect and ambient light to bright for texture)
	initSky(scene, renderer, camera);
}
let sky, sun;

let elevation = 2,
	azimuth = 160,
	exposure = 0.5;

function initSky(scene, renderer, camera) {

	// Add Sky
	sky = new Sky();
	sky.scale.setScalar(450000);
	scene.add(sky);

	sun = new THREE.Vector3();

	/// GUI
	renderer.toneMappingExposure = exposure;
	const effectController = {
		turbidity: 10,
		rayleigh: 3,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.7,
		elevation: 2,
		azimuth: 160,
		exposure: renderer.toneMappingExposure
	};

	const uniforms = sky.material.uniforms;
	uniforms['turbidity'].value = effectController.turbidity;
	uniforms['rayleigh'].value = effectController.rayleigh;
	uniforms['mieCoefficient'].value = effectController.mieCoefficient;
	uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

	const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
	const theta = THREE.MathUtils.degToRad(effectController.azimuth);

	sun.setFromSphericalCoords(1, phi, theta);

	uniforms['sunPosition'].value.copy(sun);

	renderer.render(scene, camera);
}

export function updateSkyBox() {
	if (sky == undefined || sun == undefined)
		return;
	const sunsetSpeedDay = 0.0004;
	const lowestPoint= -10;
	//const sunsetSpeedNight = 0.05;
	//elevation = elevation > 0 ? elevation - sunsetSpeedDay : elevation - sunsetSpeedNight;
	elevation = elevation > lowestPoint ? elevation - sunsetSpeedDay : lowestPoint;
	const component = sky.material.uniforms;
	const phi = THREE.MathUtils.degToRad(90 - elevation);
	const theta = THREE.MathUtils.degToRad(azimuth);
	sun.setFromSphericalCoords(1, phi, theta);
	component['sunPosition'].value.copy(sun);
}
