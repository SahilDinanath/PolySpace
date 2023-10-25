import * as bosses from '/Bosses/bosses.js';
import * as obstacles from '/Obstacles/obstacles.js';
import * as THREE from 'three';
import * as player from '/Player/player_exports.js';
import * as ui from '/UI/ui_exports.js'
import * as moon from '../Planets/worldGenerator.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

//Stars
var starGeometry = new THREE.SphereGeometry(5000, 50, 50);
var starMaterial = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load("/Assets/images/galaxy_starfield.png"),
	side: THREE.DoubleSide,
	transparent:true,
	shininess: 0
});
var starField = new THREE.Mesh(starGeometry, starMaterial);
function skybox(scene) {
	var imgPrefix = "/Assets/skyboxes/";
	var directions = ["_lf", "_dn", "_up", "_rt", "_bk", "_ft"];
	var imgSuffix = ".png";
	var skyGeometry = new THREE.BoxGeometry(10000, 10000, 10000);

	var materialArray = [];
	for (var i = 0; i < 6; i++) {
		materialArray.push(new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(imgPrefix + directions[i] + imgSuffix),
			side: THREE.BackSide
		}));
	}

	//var skyMaterial = new THREE.MeshFaceMaterial(materialArray); // No longer needed

	// Create a skybox using a single material with an array of textures
	var skyBox = new THREE.Mesh(skyGeometry, materialArray);
	scene.add(skyBox);
}

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 15000;
 const vertices = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
	// Generate random spherical coordinates
	const radius = 3000; // Adjust the radius as needed
	const latitude = Math.random() * Math.PI; // Random latitude (0 to PI)
	const longitude = Math.random() * 2 * Math.PI; // Random longitude (0 to 2*PI)

	// Convert spherical coordinates to Cartesian coordinates
	const x = radius * Math.sin(latitude) * Math.cos(longitude);
	const y = radius * Math.sin(latitude) * Math.sin(longitude) - 1250;
	const z = radius * Math.cos(latitude);

	// Store the coordinates in the vertices array
	vertices[i * 3] = x;
	vertices[i * 3 + 1] = y;
	vertices[i * 3 + 2] = z;
}

 particlesGeometry.setAttribute(
	 "position",
	 new THREE.BufferAttribute(vertices, 3)
 )

const particleTexture = new  THREE.TextureLoader().load('/Assets/images/star.png');

const particleMaterial = new THREE.PointsMaterial({
	map: particleTexture,
	size: 0.2,
	sizeAttenuation: true,
});

const stars = new THREE.Points(particlesGeometry, particleMaterial);

let moonTexture = "/Assets/images/asteroid.jpg";

const loader = new GLTFLoader();
function addApollo(scene, sphere) {
	// Load the "apollo" model

	loader.load('/Assets/moonTextures/apollo.glb', function (apollo) {
		apollo.scene.receiveShadow = true;
		apollo.scene.traverse(function (node) {
			if (node.isMesh) {
				node.castShadow = true;
			}
		});

		// Position the "apollo" model relative to the sphere

		apollo.scene.scale.set(25, 25, 25);
		apollo.scene.position.set(100, -500, -100);
		// Add the "apollo" model to the scene
		scene.add(apollo.scene);
	});
}


export function levelOne(scene,renderer,camera) {
	//sets up lighting 
	const ambientLighting = new THREE.AmbientLight("white", 0.5);
	scene.add(ambientLighting);
	skybox(scene);
	const sunLight = new THREE.DirectionalLight(0xffffff, 5);
	//sunLight.angle = 0.45;
	sunLight.castShadow = true;
	sunLight.position.y = 100;
	sunLight.shadow.camera.left = -100;  // Adjust these values to cover a larger area
	sunLight.shadow.camera.right = 100;
	sunLight.shadow.camera.top = 100;
	sunLight.shadow.camera.bottom = -100;

	sunLight.shadow.mapSize.width = 1024;
	sunLight.shadow.mapSize.height = 1024;
	//sunLight.position.set(0, 100, -300);
	//sunLight.shadow.camera.near = 5;
	//sunLight.shadow.camera.far = 10;

	//sunLight.map = new THREE.TextureLoader().load( "/Assets/images/sun_texture.jpg" );
	//scene.add(starField);
	scene.add(stars);
	//starField.position.set(0, -2515, -200);
	scene.add(sunLight);
	//sets up objects in scene
	player.addPlayerToScene(scene);
	let moonD = moon.addSphereToScene(scene,moonTexture);
	//addApollo(scene, moonD);
	ui.addMiniMapToScene(scene);
	bosses.bossTwo(camera, scene, renderer);
	obstacles.animateObstacles(renderer, camera, scene);




}

