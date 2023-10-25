import * as THREE from 'three';
//particle system
var movementSpeed = 0.5;
var totalObjects = 250;
var objectSize = 0.3;
var colors = [0xFF0000];
var dirs = [];
var parts = [];
var points = [];

function ExplodeAnimation(x, y, z, scene) {
	var geometry = new THREE.BufferGeometry();

	for (let i = 0; i < totalObjects; i++) {
		var vertex = new THREE.Vector3();
		vertex.x = x;
		vertex.y = y;
		vertex.z = z;

		points.push(vertex);
		//geometry.vertices.push(vertex);
		dirs.push({ x: (Math.random() * movementSpeed) - (movementSpeed / 2), y: (Math.random() * movementSpeed) - (movementSpeed / 2), z: (Math.random() * movementSpeed) - (movementSpeed / 2) });
	}
	geometry.setFromPoints(points);
	var material = new THREE.PointsMaterial({ size: objectSize, color: colors[Math.round(Math.random() * colors.length)] });
	var particles = new THREE.Points(geometry, material);

	this.object = particles;
	this.status = true;

	this.xDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
	this.yDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
	this.zDir = (Math.random() * movementSpeed) - (movementSpeed / 2);

	scene.add(this.object);

	this.update = function() {
		if (this.status == true) {
			var positions = this.object.geometry.attributes.position.array;
			var pCount = totalObjects * 3;

			while (pCount > 0) {
				pCount -= 3;
				positions[pCount + 1] += dirs[pCount / 3].y;
				positions[pCount] += dirs[pCount / 3].x;
				positions[pCount + 2] += dirs[pCount / 3].z;
			}
			this.object.geometry.attributes.position.needsUpdate = true;
		}
	}

}

export function getParticleSystems(){
	return parts;
}
export function createNewParticleSystem(x,y,z,scene){
	parts.push(new ExplodeAnimation(x, y,z,scene));
}

export function updateParticleSystem(){
	var pCount = getParticleSystems().length;
	while (pCount--) {
		parts[pCount].update();
	}
}
