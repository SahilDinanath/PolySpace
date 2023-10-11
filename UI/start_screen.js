//dom access
//start screen
export var levelOneButton = document.getElementById("level_1");
export var levelTwoButton = document.getElementById("level_2");
export var levelThreeButton = document.getElementById("level_3");
export var title = document.getElementById("title");


//dom functions
export function disableStartScreen(){
	levelOneButton.hidden = true;
	levelTwoButton.hidden = true;
	levelThreeButton.hidden = true;
	title.hidden = true;
}
export function enableStartScreen(){
	levelOneButton.hidden = false;
	levelTwoButton.hidden = false;
	levelThreeButton.hidden = false;
	title.hidden = false;
}
