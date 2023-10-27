import * as THREE from 'three';
//pass in texture address
function sphereTexture(textureAddress, wrap) {
	const texture = new THREE.TextureLoader().load(textureAddress);
	if (wrap === true){
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(200, 200);
	}

	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}
function createSphere(textureAddress, wrap) {
	const geometry = new THREE.SphereGeometry(1, 128, 128);
	const material = new THREE.MeshPhongMaterial({
		color: "",
		map: sphereTexture(textureAddress, wrap),
	});
	const sphere = new THREE.Mesh(geometry, material);
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	sphere.name = "sphere";
	sphere.rotation.x =Math.PI/2;
	return sphere;
}

export function addSphereToScene(scene, textureAddress,wrap) {
	const sphere = createSphere(textureAddress, wrap);

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
