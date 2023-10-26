//dom access
//start screen
export var levelOneButton = document.getElementById("level_1");
export var levelTwoButton = document.getElementById("level_2");
export var levelThreeButton = document.getElementById("level_3");
export var startMusicButton = document.getElementById("start_music_text");

export var resumeButton = document.getElementById("resume");
export var returnButton = document.getElementById("return");
export var restartButton = document.getElementById("restart");

export var nextButton = document.getElementById("next");

export var title = document.getElementById("title");


//dom functions
export function disableStartScreen(){
	levelOneButton.hidden = true;
	levelTwoButton.hidden = true;
	levelThreeButton.hidden = true;
	title.hidden = true;
	startMusicButton.hidden = true;
	//hiddenButtons.hidden = true;
}
export function enableStartScreen(){
	levelOneButton.hidden = false;
	levelTwoButton.hidden = false;
	levelThreeButton.hidden = false;
	title.hidden = false;
	nextButton.style.display = 'none';
	restartButton.style.display = 'none';
	returnButton.style.display = 'none';
	resumeButton.style.display = 'none';
}

export  function  enablePauseScreen(){
	title.hidden = false;
	returnButton.style.display = 'block';
	restartButton.style.display = 'block';
	resumeButton.style.display = 'block';
}

//disable all buttons if you restart game or head to the next level
export  function  disableButtons(){
	title.hidden = true;
	returnButton.style.display = 'none';
	restartButton.style.display = 'none';
	resumeButton.style.display = 'none';
	nextButton.style.display = 'none';
}

export function enableWinScreen(){
	title.hidden = false;
	title.textContent = "YOU WIN!";
	returnButton.style.display = 'block';
	restartButton.style.display = 'block';
	nextButton.style.display = 'block';
}


export function enableLoseScreen(){
	title.hidden = false;
	title.textContent = "YOU LOSE! Better luck next time."
	returnButton.style.display = 'block';
	restartButton.style.display = 'block';
}


