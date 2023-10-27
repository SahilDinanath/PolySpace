import * as THREE from "three";
import bossTex from "/Assets/bossTextures/grey.jpg";
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
function addShape(shape, x, y, z) {
    // Clear the previous position
    shape.position.set(0, 0, 0);

    // Set the new position
    shape.position.x = x;
    shape.position.y = y;
    shape.position.z = z;

    // Add the tetrahedron to the scene
   return shape;
}

function createStarOfCones() {
    // Number of cones in the star
    const numCones = 5;
    const tetTexture = new THREE.TextureLoader().load("/Assets/bossTextures/grey.jpg");
    // Parameters for the cones
    const coneRadius = 2;
    const coneHeight = 7;
    const coneSegments = 32;
    const coneMaterial = new THREE.MeshStandardMaterial({
        map: tetTexture,
        side: THREE.DoubleSide,
    });

    // Angle between each cone in radians
    const angleStep = (2 * Math.PI) / numCones;
    let group = new THREE.Group();

    // Create the cones and position them in a star pattern
    for (let i = 0; i < numCones; i++) {
        let coneGeometry = new THREE.ConeGeometry(
            coneRadius,
            coneHeight,
            coneSegments,
            1,
            true,
            0,
            1.1
        );
        let cone = new THREE.Mesh(coneGeometry, coneMaterial);

        // Calculate the position for each cone in a star pattern
        let angle = i * angleStep;
        let x = Math.cos(angle) * 7; // Adjust  for the desired radius
        let y = Math.sin(angle) * 7; // Adjust  for the desired radius

        cone.position.set(x, y, -5);

        cone.rotation.z = angle - Math.PI / 2; // Rotate cones appropriately
        group.add(cone);
    }
    //scene.add(group);
    return group;
}



export function bossThree(camera, scene, renderer) {
    const points = [];
    for (let i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    const geometry = new THREE.LatheGeometry(points);
    const latheTexture = new THREE.TextureLoader().load(bossTex);
    const material = new THREE.MeshStandardMaterial({
        map: latheTexture,
        side: THREE.DoubleSide,
    });
    const lathe = new THREE.Mesh(geometry, material);
    lathe.scale.set(0.7, 0.7, 0.7);
    lathe.rotation.x = Math.PI / 2;
    lathe.position.z =  -350;
    scene.add(lathe);

   const tetGeometry = new THREE.TetrahedronGeometry(5, 0);
   const tetTexture = new THREE.TextureLoader().load(bossTex);
    const tetMaterial = new THREE.MeshStandardMaterial({ map: tetTexture });
   let tetrahedron = new THREE.Mesh(tetGeometry, tetMaterial);
    let tetrahedron2 = new THREE.Mesh(tetGeometry, tetMaterial);
    tetrahedron2.rotation.z = Math.PI / 2;
    let group = new THREE.Group();
    group.name = 'bossThree';
    group.add(tetrahedron);
    group.add(tetrahedron2);
    group.position.z =  -350;
    scene.add(group);


    var animate = function () {
        group.rotation.x += 0.05;
        group.rotation.y += 0.05;
        lathe.rotation.y += 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();
}



export function bossTwo(camera, scene, renderer) {
    const octGeometry = new THREE.OctahedronGeometry(5, 0);
    const octTexture = new THREE.TextureLoader().load(bossTex);
    const octMaterial = new THREE.MeshStandardMaterial({ map: octTexture });
    let octahedron = new THREE.Mesh(octGeometry, octMaterial);

    const torusGeometry = new THREE.TorusGeometry(5);
    const torusTexture = new THREE.TextureLoader().load(bossTex);
    const torusMaterial = new THREE.MeshStandardMaterial({ map: torusTexture });
    let torus = new THREE.Mesh(torusGeometry, torusMaterial);

    const tetGeometry = new THREE.TetrahedronGeometry(2, 0);
    const tetTexture = new THREE.TextureLoader().load(bossTex);
    const tetMaterial = new THREE.MeshStandardMaterial({ map: tetTexture });
    let tetrahedron = new THREE.Mesh(tetGeometry, tetMaterial);
    let tetrahedron2 = new THREE.Mesh(tetGeometry, tetMaterial);
    let tetrahedron3 = new THREE.Mesh(tetGeometry, tetMaterial);
    let tetrahedron4 = new THREE.Mesh(tetGeometry, tetMaterial);


   tetrahedron =  addShape(tetrahedron, -2, -2, 2);
   tetrahedron2 = addShape(tetrahedron2, 2, -2, -2);
   tetrahedron3.rotation.z = Math.PI / 2;
   tetrahedron3 = addShape(tetrahedron3, -2, -2, -2);
   tetrahedron4.rotation.z = Math.PI / 2;
   tetrahedron4 = addShape(tetrahedron4, 2, -2, 2);
   torus.rotation.x = Math.PI / 2;

    // Rotate the entire group (e.g., the scene)
    let group = new THREE.Group();
    group.name = 'bossTwo';
    group.position.z =  -350; 
    group.add(octahedron);
    group.add(torus);
    group.add(tetrahedron);
    group.add(tetrahedron2);
    group.add(tetrahedron3);
    group.add(tetrahedron4);
    group.rotation.x = Math.PI / 2;

    scene.add(group);

    // Animation variables
    var rotationSpeed = 0.05; // Adjust the rotation speed as needed

    // Define the animation function
    var animate = function () {
        group.rotation.y += rotationSpeed; // Rotate the entire group
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();
}

export function bossOne(camera, scene, renderer) {
    //create the shape object
    const octGeometry = new THREE.OctahedronGeometry(5, 0);
    const tetTexture = new THREE.TextureLoader().load(bossTex);
    const octMaterial = new THREE.MeshStandardMaterial({ map: tetTexture });
    let octahedron = new THREE.Mesh(octGeometry, octMaterial);
    let octahedron2 = new THREE.Mesh(octGeometry, octMaterial);
    let octahedron3 = new THREE.Mesh(octGeometry, octMaterial);
    let octahedron4 = new THREE.Mesh(octGeometry, octMaterial);

    octahedron =  addShape(octahedron, -9, -9, 0);
    octahedron.rotation.z = Math.PI / 3; // Rotate by 60 degrees
    octahedron2 = addShape(octahedron2, 9, 9, 0);
    octahedron2.rotation.z = Math.PI / 3; // Rotate by 60 degrees
    octahedron3 = addShape(octahedron3, 9, -9, 0);
    octahedron3.rotation.z = -Math.PI / 3; // Rotate by -60 degrees (negative)
    octahedron4 = addShape(octahedron4, -9, 9, 0);
    octahedron4.rotation.z = -Math.PI / 3; // Rotate by -60 degrees (negative)

    let star = createStarOfCones();

    // Rotate the entire group (e.g., the scene)
    let group = new THREE.Group();
    group.name = "bossOne";
    group.add(octahedron);
    group.add(octahedron2);
    group.add(octahedron3);
    group.add(octahedron4);
    group.position.z =  -350;
    scene.add(group);
    star.position.z = -350;
    scene.add(star);

    // Animation variables
    let rotationSpeed = 0.05; // Adjust the rotation speed as needed

    // Define the animation function
    const animate = function () {
        group.rotation.z += rotationSpeed; // Rotate the entire group
        star.rotation.z -= rotationSpeed;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();
}
