import * as bosses from '/Bosses/bosses.js';
import * as obstacles from '/Obstacles/obstacles.js';
import * as THREE from 'three';
import * as player from '/Player/player.js';
import * as minimap from '/UI/minimap.js'

export function levelOne(scene,renderer,camera) {
	//sets up lighting 
	const ambientLighting = new THREE.AmbientLight("white", 6);
	scene.add(ambientLighting);

	//sets up objects in scene
	player.addPlayerToScene(scene);
	minimap.addMiniMapToScene(scene);
	bosses.bossTwo(camera, scene, renderer);
	obstacles.animateObstacles(renderer, camera, scene);
	//uncomment line below to view boss (position currently incorrect and ambient light to bright for texture)
}
