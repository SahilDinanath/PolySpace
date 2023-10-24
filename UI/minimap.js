import * as THREE from 'three';

function addCircle(){
	const geometry= new THREE.CircleGeometry(5,32);
	const material = new THREE.MeshBasicMaterial({color: 'rgb(224,76,76)'});
	const circle = new THREE.Mesh(geometry, material);
	circle.name = "minimap_icon";
	return circle;

}

function addBar(){
	const geometry= new THREE.BoxGeometry(40,0.1,0);
	const material = new THREE.MeshBasicMaterial({color: 'rgb(255,255,255)'});
	const bar = new THREE.Mesh(geometry, material);
	bar.name = "bar_icon";
	return bar;

}

function addMiniMap(){
	let bar = addBar();
	let circle = addCircle();
	
	//adjust scale and position of circle on bar
	circle.position.x = -20;
	circle.position.z = 1;
	circle.position.y = -0.6;
	circle.scale.x = 0.1;
	circle.scale.y = 0.1;

	//attach circle to bar
	bar.add(circle);
	return bar;
}
export function addMiniMapToScene(scene){
	let minimap= addMiniMap();
	minimap.position.z = 5;
	minimap.position.x = 0;
	minimap.position.y = 17.6;
	scene.add(minimap);

}

export function updateMiniMap(scene) {
if (scene.getObjectByName('minimap_icon') == undefined)
		return;
	if (scene.getObjectByName('minimap_icon').position.x < 20) {
		scene.getObjectByName('minimap_icon').position.x += 0.005;
	}
}
