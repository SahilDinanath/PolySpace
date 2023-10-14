import * as THREE from 'three';
import inGame from './Assets/startScreen.mp3';
const listener = new THREE.AudioListener();

//create a global audio source
const sound  = new THREE.Audio(listener);
var isPlaying = false;
const audioLoader = new THREE.AudioLoader();

export function setInGameSound(){
	//TODO: insert path to sound
	audioLoader.load(inGame,function(buffer){
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.5);
	})
}
export function enableSound(){
	if(!isPlaying){
		sound.play();
	}
}

export function disableSound(){
	sound.stop();
}
document.addEventListener('click',()=>{
	if(!isPlaying){
		enableSound();
	}
	isPlaying = true;
})
