import * as bosses from '/Bosses/bosses.js';
import * as obstacles from '/Obstacles/obstacles.js';
import * as THREE from 'three';
import * as player from '/Player/player_exports.js';
import * as ui from '/UI/ui_exports.js'


function skybox(scene) {
	var imgPrefix = "/Assets/skyboxes/";
	var directions = ["_lf", "_dn", "_up", "rock", "_bk", "_ft"];
	var imgSuffix = ".png";
	var skyGeometry = new THREE.BoxGeometry(10000, 10000, 10000);

	var materialArray = [];
	for (var i = 0; i < 6; i++) {
		materialArray.push(new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(imgPrefix + directions[i] + imgSuffix),
			side: THREE.BackSide
		}));
	}

	//var skyMaterial = new THREE.MeshFaceMaterial(materialArray); // No longer needed

	// Create a skybox using a single material with an array of textures
	var skyBox = new THREE.Mesh(skyGeometry, materialArray);
	scene.add(skyBox);
}

export function levelOne(scene,renderer,camera) {
	//sets up lighting 
	const ambientLighting = new THREE.AmbientLight("white", 6);
	scene.add(ambientLighting);
	skybox(scene);
	//sets up objects in scene
	player.addPlayerToScene(scene);
	ui.addMiniMapToScene(scene);
	bosses.bossTwo(camera, scene, renderer);
	obstacles.animateObstacles(renderer, camera, scene, 2);
	//uncomment line below to view boss (position currently incorrect and ambient light to bright for texture)
}

