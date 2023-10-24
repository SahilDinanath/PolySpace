import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import starsTexture from 'Assets/img/stars.jpg';
import sunTexture from 'Assets/img/sun.jpg';
import mercuryTexture from 'Assets/img/mercury.jpg';
import venusTexture from 'Assets/img/venus.jpg';
import earthTexture from 'Assets/img/earth.jpg';
import marsTexture from 'Assets/img/mars.jpg';
import jupiterTexture from 'Assets/img/jupiter.jpg';
import saturnTexture from 'Assets/img/saturn.jpg';
import saturnRingTexture from 'Assets/img/saturn ring.png';
import uranusTexture from 'Assets/img/uranus.jpg';
import uranusRingTexture from 'Assets/img/uranus ring.png';
import neptuneTexture from 'Assets/img/neptune.jpg';
import plutoTexture from 'Assets/img/pluto.jpg';

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
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);


const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

function animate(scene, camera, renderer) {
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

}
export function  solarSys(scene, renderer, camera){
    let group = new THREE.Group();
    //scene.add(sun);
    group.add(sun);
    group.add(mercury);
    //scene.add(mercury);
   // scene.add(venus);
    group.add(venus);
   // scene.add(earth);
    group.add(earth);
   // scene.add(mars);
    group.add(mars);
    //scene.add(jupiter);
    group.add(jupiter);
    //scene.add(saturn);
    group.add(saturn);
  //  scene.add(uranus);
    group.add(uranus);
 //   scene.add(neptune);
    group.add(neptune);
//    scene.add(pluto);
    group.add(pluto);

    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
    pointLight.position.set(sun.position.x, sun.position.y, sun.position.z);
   // scene.add(pointLight);
    group.add(pointLight);
   // animate(scene, camera, renderer);

    return group;

}




