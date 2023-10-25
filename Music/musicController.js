import * as THREE from 'three';
import startScreen from './Assets/9.mp3';
import song_1 from './Assets/10.mp3';
import song_2 from './Assets/11.mp3';
import song_3 from './Assets/12.mp3';
import song_4 from './Assets/1.wav';
import song_5 from './Assets/4.wav';
import song_6 from './Assets/8.wav';

const listener = new THREE.AudioListener();
let music = [startScreen,song_1,song_2,song_3, song_4, song_5,song_6];

//create a global audio source
const sound  = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

let randomSong = Math.floor(Math.random() * (music.length-0 + 1) + 0);
//added ability to change song per level
export function setInGameSound(){
	//TODO: insert path to sound
	audioLoader.load(music[randomSong],function(buffer){
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.5);
	})
}
export function enableSound(){
	sound.play();
}

export function disableSound(){
	sound.stop();
}
document.addEventListener('click',()=>{
	enableSound();
})
