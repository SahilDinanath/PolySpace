//dom access
//start screen
export var levelOneButton = document.getElementById("level_1");
export var levelTwoButton = document.getElementById("level_2");
export var levelThreeButton = document.getElementById("level_3");
export var startMusicButton = document.getElementById("start_music_text");

//controls screen
export var showControlsButton = document.getElementById("control_menu");
export var backButton = document.getElementById("back");

export var up = document.getElementById("keyboard_key_up");
export var down = document.getElementById("keyboard_key_down");
export var left = document.getElementById("keyboard_key_left");
export var right = document.getElementById("keyboard_key_right");
export var space = document.getElementById("keyboard_key_space");
export var one = document.getElementById("keyboard_key_1");
export var two = document.getElementById("keyboard_key_2");
export var controlInstructions= document.querySelectorAll(".space_instructions");

export var resumeButton = document.getElementById("resume");
export var returnButton = document.getElementById("return");
export var restartButton = document.getElementById("restart");

export var nextButton = document.getElementById("next");

export var title = document.getElementById("title");

export var loadingScreen = document.getElementById('loading-screen');
export var progressBar = document.getElementById('loading-progress-bar')
export var infoAboutLevel = document.querySelector('#levelInfo')


//dom functions
export function disableStartScreen(){
	levelOneButton.hidden = true;
	levelTwoButton.hidden = true;
	levelThreeButton.hidden = true;
	title.hidden = true;
	startMusicButton.hidden = true;
	showControlsButton.hidden = true;
	//hiddenButtons.hidden = true;
}

export function enableControlScreen(){
	disableStartScreen();
	up.style.display = 'block';
	down.style.display = 'block';
	left.style.display = 'block';
	right.style.display = 'block';
	one.style.display = 'block';
	two.style.display = 'block';
	space.style.display = 'block';
	backButton.style.display = 'block';

	for(var i = 0; i < controlInstructions.length; i++){
		controlInstructions[i].style.display = 'block';
	}
}
export function disableControlScreen(){
	enableStartScreen();
	backButton.style.display = 'none';

	up.style.display = 'none';
	down.style.display = 'none';
	left.style.display = 'none';
	right.style.display = 'none';
	one.style.display = 'none';
	two.style.display = 'none';
	space.style.display = 'none';

	for(var i = 0; i < controlInstructions.length; i++){
		controlInstructions[i].style.display = 'none';
	}
}

export function enableStartScreen(){
	levelOneButton.hidden = false;
	levelTwoButton.hidden = false;
	levelThreeButton.hidden = false;
	title.hidden = false;
	startMusicButton.hidden = false;
	showControlsButton.hidden = false;

	nextButton.style.display = 'none';
	//restartButton.style.display = 'none';
	returnButton.style.display = 'none';
	resumeButton.style.display = 'none';
}

export  function  enablePauseScreen(){
	title.hidden = false;
	returnButton.style.display = 'block';
	//restartButton.style.display = 'block';
	resumeButton.style.display = 'block';
}

//disable all buttons if you restart game or head to the next level
export  function  disableButtons(){
	title.hidden = true;
	returnButton.style.display = 'none';
	//restartButton.style.display = 'none';
	resumeButton.style.display = 'none';
	nextButton.style.display = 'none';
}

export function enableWinScreen(){
	title.hidden = false;
	title.textContent = "YOU WIN!";
	returnButton.style.display = 'block';
	//restartButton.style.display = 'block';
	nextButton.style.display = 'block';
}


export function enableLoseScreen(){
	title.hidden = false;
	title.textContent = "YOU LOSE! Better luck next time."
	returnButton.style.display = 'block';
	//restartButton.style.display = 'block';
}


