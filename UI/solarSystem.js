import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const textureLoader = new THREE.TextureLoader();

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    //scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}



export function  solarSys(renderer, scene, camera){


    const sunGeo = new THREE.SphereGeometry(16, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load('Assets/img/sun.jpg')
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);


    const mercury = createPlanete(3.2,'Assets/img/mercury.jpg', 28);
    const venus = createPlanete(5.8, 'Assets/img/venus.jpg', 44);
    const earth = createPlanete(6, 'Assets/img/earth.jpg', 62);
    const mars = createPlanete(4, 'Assets/img/mars.jpg', 78);
    const jupiter = createPlanete(12, 'Assets/img/jupiter.jpg', 100);
    const saturn = createPlanete(10, 'Assets/img/saturn.jpg', 138, {
        innerRadius: 10,
        outerRadius: 20,
        texture: 'Assets/img/saturn ring.png'
    });
    const uranus = createPlanete(7,'Assets/img/uranus.jpg', 176, {
        innerRadius: 7,
        outerRadius: 12,
        texture: 'Assets/img/uranus ring.png'
    });
    const neptune = createPlanete(7, 'Assets/img/neptune.jpg', 200);
    const pluto = createPlanete(2.8, 'Assets/img/pluto.jpg', 216);


    let group = new THREE.Group();
    //scene.add(sun);
    group.add(sun);
    group.add(mercury.obj);
    //scene.add(mercury);
   // scene.add(venus);
    group.add(venus.obj);
   // scene.add(earth);
    group.add(earth.obj);
   // scene.add(mars);
    group.add(mars.obj);
    //scene.add(jupiter);
    group.add(jupiter.obj);
    //scene.add(saturn);
    group.add(saturn.obj);
  //  scene.add(uranus);
    group.add(uranus.obj);
 //   scene.add(neptune);
    group.add(neptune.obj);
//    scene.add(pluto);
    group.add(pluto.obj);

    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
    pointLight.position.set(sun.position.x, sun.position.y, sun.position.z);
   // scene.add(pointLight);
    group.add(pointLight);
   // animate(scene, camera, renderer);

    var animate = function() {
        //Self-rotation
        sun.rotateY(0.004);
        mercury.mesh.rotateY(0.004);
        venus.mesh.rotateY(0.002);
        earth.mesh.rotateY(0.02);
        mars.mesh.rotateY(0.018);
        jupiter.mesh.rotateY(0.04);
        saturn.mesh.rotateY(0.038);
        uranus.mesh.rotateY(0.03);
        neptune.mesh.rotateY(0.032);
        pluto.mesh.rotateY(0.008);

        //Around-sun-rotation
        mercury.obj.rotateY(0.04);
        venus.obj.rotateY(0.015);
        earth.obj.rotateY(0.01);
        mars.obj.rotateY(0.008);
        jupiter.obj.rotateY(0.002);
        saturn.obj.rotateY(0.0009);
        uranus.obj.rotateY(0.0004);
        neptune.obj.rotateY(0.0001);
        pluto.obj.rotateY(0.00007);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);

    };
    animate();


    return group;

}




