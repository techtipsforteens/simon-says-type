var intro = document.getElementById("intro");
var game = document.getElementById("game");
var scorediv = document.getElementById("score");
var score = 0;
var roundn = 0;
var croundn;
var difc = 0;
var dif;
var letters;
var x = true;

function getTfHtml(type) {
	if (type == "time") {
		var html = "<h2>You ran out of time!</h2><p>Your final score was:</p><h1><strong>";
	} else {
		var html = "<h2>You had a typo!</h2><p>Your final score was:</p><h1><strong>";
	}
	html = html + score;
	var html = html + "</strong></h1><p>Thanks for playing!</p><br><br><div class='center'><button id='go'onclick='start()'>Play Again?</button></div>";
	return html;
}

function start() {
	intro.style.display = "none";
	scorediv.style.display = "initial";
	dif = 5;
	x = true;
	score = 0;
	roundn = 0;
	difc = 0;
	play();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function play() {
	roundn = roundn + 1;
	console.log("Round Number = " + roundn);
	var lroundn = roundn;
	console.log("Local Round Number = " + lroundn);
	if (x == false) {
		return;
	} else {
	scorediv.innerHTML = score;
	var ghtml = "<h2>Type '";
	letters = getRandomLetters(dif);
	ghtml = ghtml + letters + "'</h2><br><form name='abox' id='abox' onsubmit='return check()'><input type='text' id='text' name='text'></input><input type='submit' id='submit-button' value='Submit' onclick='return check()'></form>";
	game.innerHTML = ghtml;
	console.log("Waiting");
	await sleep(10000);
	tcheck(lroundn);
	console.log("Checked");
	}
}

function tcheck(round) {
	console.log("Round = " + round);
	console.log("Score = " + score);
	if (round > score) {
		if (x != false) {
			x = false;
			game.innerHTML = getTfHtml("time");
		}
	}
}

function check() {
	var y = document.forms["abox"]["text"].value;
	if (y != letters) {
		x = false;
		game.innerHTML = getTfHtml("typo");
	} else {
		score = score + 1;
		difc = difc + 1;
		if (difc == 2) {
			dif = dif + 1;
			difc = 0;
		}
	}
	play();
}

function getRandomLetters(number) {
	var word = "";
	var alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	for (i = 0; i < number; i++) {
		var letternum = Math.floor(Math.random() * 52);
		word = word + alpha[letternum];
	}
	return word
}

console.log(getRandomLetters(5));
scorediv.style.display = "none";
