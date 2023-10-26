import * as bosses from '/Bosses/bosses.js';
import * as obstacles from '/Obstacles/obstacles.js';
import * as player from '/Player/player_exports.js';
import * as ui from '/UI/ui_exports.js'
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {solarSys} from "../UI/solarSystem";
//import {solarSys} from "../UI/solarSystem";


//let group = new THREE.Group();

const sunLight = new THREE.SpotLight(0xffffff, 1000, 0, Math.PI/2, 0,1);
sunLight.castShadow = true;
sunLight.map = new THREE.TextureLoader().load( "/Assets/img/sun_texture.jpg" );

const sunLight2 = new THREE.PointLight(0xffff00, 1000);
sunLight2.castShadow = true;

//Sun
var sunGeometry = new THREE.SphereGeometry(20, 50, 50);
var sunMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("/Assets/img/sun_texture.jpg"),
    color: 0xf2f2f2,
    specular: 0xbbbbbb,
    shininess: 2
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(500,30,-500);
sunLight.position.set(500,30,-500);
sunLight2.position.set(sun.position.x,sun.position.y,sun.position.z);

//Earth
var earthGeometry = new THREE.SphereGeometry(10, 50, 50);
var earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("/Assets/img/earth.jpg"),
    color: 0xf2f2f2,
    specular: 0xbbbbbb,
    shininess: 2
});
var earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.z = 25;



//Clouds
var cloudGeometry = new THREE.SphereGeometry(10.3,  50, 50);
var cloudMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("/Assets/img/clouds_2.jpg"),
    transparent: true,
    opacity: 0.1
});
var clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
//scene.add(clouds);
clouds.position.z = earth.position.z;
//group.add(clouds);

//Stars
var starGeometry = new THREE.SphereGeometry(10000, 50, 50);
var starMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("/Assets/img/galaxy_starfield.png"),
    side: THREE.DoubleSide,
    shininess: 0
});
var starField = new THREE.Mesh(starGeometry, starMaterial);


//Moon
var moonGeometry = new THREE.SphereGeometry(3.5, 50,50);
var moonMaterial = new THREE.MeshPhongMaterial({
    map:new THREE.TextureLoader().load("/Assets/img/moon4k.jpg")
});
var moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-35,10,-600);

let solar1;
let solar2;
let solar3;
export function levelTwo(scene, renderer, camera){
    const controls = new OrbitControls( camera, renderer.domElement );
    const ambientLighting = new THREE.AmbientLight("white", 0.4);
    camera.position.y = 20;
    camera.position.z = 50;
   // camera.rotateY(2);
    scene.add(camera);
    player.addPlayerToScene(scene);
    ui.addMiniMapToScene(scene);
    bosses.bossTwo(camera, scene, renderer);
    obstacles.animateObstacles(renderer, camera, scene, 4);
    scene.add(ambientLighting);
    scene.add(starField);
   // scene.add(sun);
    scene.add(sunLight);
    scene.add(sunLight2);
    scene.add(earth);
    scene.add(clouds);
   // scene.add(moon);

     solar1  = solarSys(renderer, scene, camera);
    solar1.position.z = - 500;
    solar1.position.x  =  -400;
    scene.add(solar1);

     solar2  = solarSys(renderer, scene, camera);
    solar2.position.z = - 700;
    solar2.position.x  =  100;
    scene.add(solar2);

    solar3  = solarSys(renderer, scene, camera);
    solar3.position.z = - 1500;
    solar3.position.x  =  80;
    scene.add(solar3);

    // var animate = function () {
    //
    //     earth.rotateY(0.01);
    //     clouds.rotateY(0.06);
    //     //make it seem as if spaceship is moving through the scene
    //     earth.position.z += 0.1;
    //     clouds.position.z += 0.1;
    //     solar1.position.z += 1;
    //     solar2.position.z += 1;
    //     solar3.position.z += 1;
    //
    //     renderer.render(scene, camera);
    //     requestAnimationFrame(animate);
    // };
    // animate();
    // Start the animation loop
}

export function animateLevel2(){
    earth.rotateY(0.01);
    clouds.rotateY(0.06);
    //make it seem as if spaceship is moving through the scene
    earth.position.z += 0.1;
    clouds.position.z += 0.1;
    if (solar1) {
        solar1.position.z += 1;
    }
    if (solar2) {
        solar2.position.z += 1;
    }
    if (solar3) {
        solar3.position.z += 1;
    }
}
