 import * as bosses from '/Bosses/bosses.js';
import * as obstacles from '/Obstacles/obstacles.js';
 import * as player from '/Player/player_exports.js';
 import * as ui from '/UI/ui_exports.js'
import * as THREE from "three";
 import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

 let group = new THREE.Group();

 var sunLight = new THREE.DirectionalLight(0xffffff, 5,0,  Math.PI/2);
 sunLight.position.set(500,30,-500);
 sunLight.castShadow = true;
 sunLight.map = new THREE.TextureLoader().load( "/Assets/images/sun_texture.jpg" );
 group.add(sunLight);


 //Sun
 var sunGeometry = new THREE.SphereGeometry(20, 50, 50);
 var sunMaterial = new THREE.MeshPhongMaterial({
     map: new THREE.TextureLoader().load("/Assets/images/sun_texture.jpg"),
     color: 0xf2f2f2,
     specular: 0xbbbbbb,
     shininess: 2
 });
 var sun = new THREE.Mesh(sunGeometry, sunMaterial);
 sun.position.set(500,30,-500);
 //scene.add(earth);
 group.add(sun);

 //Earth
 var earthGeometry = new THREE.SphereGeometry(10, 50, 50);
 var earthMaterial = new THREE.MeshPhongMaterial({
     map: new THREE.TextureLoader().load("/Assets/images/earth.jpg"),
     color: 0xf2f2f2,
     specular: 0xbbbbbb,
     shininess: 2
 });
 var earth = new THREE.Mesh(earthGeometry, earthMaterial);
 earth.position.z = 20;
 //scene.add(earth);
 group.add(earth);

 //Clouds
 var cloudGeometry = new THREE.SphereGeometry(10.3,  50, 50);
 var cloudMaterial = new THREE.MeshPhongMaterial({
     map: new THREE.TextureLoader().load("/Assets/images/clouds_2.jpg"),
     transparent: true,
     opacity: 0.1
 });
 var clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
 //scene.add(clouds);
 clouds.position.z = earth.position.z;
 group.add(clouds);

 //Stars
 var starGeometry = new THREE.SphereGeometry(10000, 50, 50);
 var starMaterial = new THREE.MeshPhongMaterial({
     map: new THREE.TextureLoader().load("/Assets/images/galaxy_starfield.png"),
     side: THREE.DoubleSide,
     shininess: 0
 });
 var starField = new THREE.Mesh(starGeometry, starMaterial);
 //scene.add(starField);
 group.add(starField);

 //Moon
 var moonGeometry = new THREE.SphereGeometry(3.5, 50,50);
 var moonMaterial = new THREE.MeshPhongMaterial({
     map:new THREE.TextureLoader().load("/Assets/images/moon_texture.jpg")
 });
 var moon = new THREE.Mesh(moonGeometry, moonMaterial);
 moon.position.set(-35,10,-600);
 group.add(moon);
 //scene.add(moon);

 //Camera vector
 var earthVec = new THREE.Vector3(0,0,0);

 var r = 35;
 var theta = 0;
 var dTheta = 2 * Math.PI / 1000;

 var dx = .01;
 var dy = -.01;
 var dz = -.05;



 //Render loop
 var render = function(camera, scene, renderer,controls) {
     earth.rotation.y += .0009;
     clouds.rotation.y += .00005;

     //Moon orbit
     // theta += dTheta;
     // moon.position.x = r * Math.cos(theta);
     // moon.position.z = r * Math.sin(theta);

     //Flyby
     if (camera.position.z < 0) {
         dx *= -1;
     }
     camera.position.x += dx;
     camera.position.y += dy;
     camera.position.z += dz;

     camera.lookAt(earthVec);

     //Flyby reset
     if (camera.position.z < -100) {
         camera.position.set(0,35,70);
     }

     camera.lookAt(earthVec);
     controls.update();
     renderer.render(scene, camera);
     requestAnimationFrame(render);
 };




export function levelTwo(scene, renderer, camera){
    const controls = new OrbitControls( camera, renderer.domElement );
     const ambientLighting = new THREE.AmbientLight("white", 0.5);
     scene.add(ambientLighting);
    scene.add(group);
    render(camera, scene,renderer, controls);
     player.addPlayerToScene(scene);
    // ui.addMiniMapToScene(scene);
     bosses.bossTwo(camera, scene, renderer);
     obstacles.animateObstacles(renderer, camera, scene);
}
