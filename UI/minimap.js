import * as THREE from 'three';

function addCircle(){
	const geometry= new THREE.CircleGeometry(5,32);
	const material = new THREE.MeshBasicMaterial({color: 'rgb(255,255,255)'});
	const circle = new THREE.Mesh(geometry, material);

	//adjust scale and position
	circle.position.x = -20;
	circle.scale.x = 0.1;
	circle.scale.y = 0.1;
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
	//adjust scale and position
	bar.add(addCircle());
	return bar;
}
export function addMiniMapToScene(scene){
	let minimap= addMiniMap();
	minimap.position.z = 5;
	minimap.position.x = 0;
	minimap.position.y = 17.6;
	scene.add(minimap);

}

