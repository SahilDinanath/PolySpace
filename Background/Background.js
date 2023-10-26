import * as THREE from 'three';



const starsArray = [];
const starCount = 3000;
const starStartZ = -30;
const starStartY = 80;
const starStartX = 80;

let starGroup = new THREE.Group();
starGroup.name = "starField";

function createStar(scene) {
  const starGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(2 * 3); // Two points to create a line

  positions[0] = 0;
  positions[1] = 0;
  positions[2] = 20;

  positions[3] = 0;
  positions[4] = 0;
  positions[5] = -2; // Extend the line in the negative z-direction

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Randomly select blue or purple color
  const color = Math.random() > 0.5 ? 0x9500ff : 0x04d9ff;

  const starMaterial = new THREE.LineBasicMaterial({ color, linewidth: 1 });
  const star = new THREE.Line(starGeometry, starMaterial);
  //const light = new THREE.PointLight(color, 50);
  // Randomize the star's position
  star.position.x = (Math.random() - 0.5) * starStartX;
  star.position.y = (Math.random() - 0.5) * starStartY;
  star.position.z = starStartZ - Math.random() * 50; // Start behind the camera
  //light.position.x = star.position.x;
 // light.position.y = star.position.y;
 // light.position.z = star.position.z;

  // Randomize the star's speed
  star.speed = 0.3 + Math.random() * 0.1;
  star.name = "star";
  
  starGroup.add(star);
  //scene.add(light);

  starsArray.push(star);
  //starsArray.push(light);
}

function createStars(scene) {
  for (let i = 0; i < starCount; i++) {
    createStar(scene);
  }
  scene.add(starGroup);
}

function animateStars(scene) {
  if(scene.getObjectByName("starField") === undefined)
    return;
  
  for (let i = 0; i < starsArray.length; i++) {
    const star = starsArray[i];
    star.position.z += star.speed;

    // Reset star position to create a loop
    if (star.position.z > 0) {
      star.position.z = starStartZ - Math.random() * 100;
    }
  }
}

// Create ambient light with a color similar to the starfield
//const ambientLight = new THREE.AmbientLight(0x101010); // Adjust the color as needed
//scene.add(ambientLight);

//var directionalLight = new THREE.DirectionalLight(0xffffff, 10);
//directionalLight.position.set(0, 1, 0);
//scene.add(directionalLight);

var lightRotation = 0;

function animateDirectionalLight() {
	lightRotation += 0.1;
	var radius = 50;
	directionalLight.position.x = radius * Math.cos(lightRotation);
	directionalLight.position.y = radius * Math.sin(lightRotation);
	directionalLight.position.z = 30;

	requestAnimationFrame(animateDirectionalLight);
}

export {createStars, animateStars, animateDirectionalLight };
