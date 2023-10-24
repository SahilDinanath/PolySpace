import * as THREE from "three";

const starStartZ = -500;
const starStartY = 80;
const starStartX = 80;
function createStar(scene) {
    const starCount = 700;

    var starsArray = [];

    for (let i = 0; i < starCount.length; i++) {

        const starGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(2 * 3); // Two points to create a line

        positions[0] = 0;
        positions[1] = 0;
        positions[2] = 10;

        positions[3] = 0;
        positions[4] = 0;
        positions[5] = -1; // Extend the line in the negative z-direction

        starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        // Randomly select blue or purple color
        const color = Math.random() > 0.5 ? 0x9500ff : 0x04d9ff;

        const starMaterial = new THREE.LineBasicMaterial({color, linewidth: 1});
        var lightColor = new THREE.PointLight(color, 2);
        const star = new THREE.Line(starGeometry, starMaterial);
        // Randomize the star's position
        star.position.x = (Math.random() - 0.5) * starStartX;
        star.position.y = (Math.random() - 0.5) * starStartY;
        star.position.z = starStartZ - Math.random() * 200; // Start behind the camera
        lightColor.position.set(star.position.x, star.position.y, star.position.z);
        lightColor.castShadow = true;

        let group = new THREE.Group();
        group.add(star);
        group.add(lightColor);

        // Randomize the star's speed
        group.speed = 0.01 + Math.random() * 0.1;
        scene.add(group);
        scene.add(star);
        starsArray.push(group);
    }

    return starsArray;
}

// function createStars(scene) {
//     var starsArray = [];
//     for (let i = 0; i < starCount; i++) {
//        let star = createStar();
//        scene.add(star);
//         starsArray.push(star);
//     }
//    return starsArray;
// }

function animateStars(starsArray) {
    for (let i = 0; i < starsArray.length; i++) {
        const star = starsArray[i];
        star.position.z += star.speed;

        // Reset star position to create a loop
        if (star.position.z > 0) {
            star.position.z = starStartZ - Math.random() * 10;
        }
    }
}

// Create ambient light with a color similar to the starfield
const ambientLight = new THREE.AmbientLight(0x101010); // Adjust the color as needed
//scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, 1, 0);
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

export { createStar, animateStars, animateDirectionalLight };
