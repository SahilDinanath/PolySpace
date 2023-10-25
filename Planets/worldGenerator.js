import * as THREE from 'three';
//pass in texture address
function sphereTexture(textureAddress) {
	const texture = new THREE.TextureLoader().load(textureAddress);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(200, 200);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}
function createSphere(textureAddress) {
	const geometry = new THREE.SphereGeometry(1, 128, 128);
	const material = new THREE.MeshPhongMaterial({
		color: "",
		map: sphereTexture(textureAddress),
	});
	const sphere = new THREE.Mesh(geometry, material);
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	sphere.name = "sphere";
	sphere.rotation.x =Math.PI/2;
	return sphere;
}

export function addSphereToScene(scene, textureAddress) {
	const sphere = createSphere(textureAddress);

	sphere.scale.set(2500, 2500, 2500);
	sphere.position.set(0, -2515, -200);

	scene.add(sphere);
	return sphere;
}

export function rotateSphere(scene) {

	const object = scene.getObjectByName("sphere");
	if (object == undefined)
		return;
	object.rotation.x += 0.0001;
}
