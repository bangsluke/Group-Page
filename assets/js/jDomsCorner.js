// JDomsCorner.js JavaScript Functions

// Dom's Corner scripts
// https://karvitt.com/widgets/html-code/math-game-code

if (document.layers) {
	navigator.family = "nn4";
	BadBrowser();
}
if (window.navigator.userAgent.toLowerCase().indexOf("opera") != -1) {
	navigator.family = "opera";
	BadBrowser();
}
if (document.all) {
	navigator.family = "ie4";
}
if (window.navigator.userAgent.toLowerCase().indexOf("gecko") != -1) {
	navigator.family = "gecko";
}
if (window.navigator.platform.toLowerCase().indexOf("mac") != -1) {
	navigator.OS = "mac";
}
farray = new Array("+", "-", "*", "+ -", "+-*");
fSignarray = new Array();
gamestart = false;
named = false;
good = new Array(
	"Correct!",
	"You got it right.",
	"Right",
	'You"re doing great!',
	'That was easy, wasn"t it?',
	'That"s the right answer.',
	"Good going!",
	"Keep it up."
);
bad = new Array(
	"Oops, try again.",
	"Better luck next time",
	"Try a different answer.",
	"Nope, not that one.",
	"Hmmm, that is incorrect.",
	"Nope, try again."
);
function ResetGame() {
	WriteMessage("Correct", "0");
	WriteMessage("Missed", "0");
	WriteMessage("Accuracy", "0%");
	WriteMessage("Speed", "0 sec");
	WriteMessage("Ans1", " ");
	WriteMessage("Ans2", " ");
	WriteMessage("Ans3", " ");
	WriteMessage("Ans4", " ");
	WriteMessage("Q1", " ");
	WriteMessage("Q2", " ");
	WriteMessage("Sign", " ");
	WriteMessage("sans", " ");
	WriteMessage("equal", " ");
	WriteMessage("quesmark", " ");
	Timer = new Array();
	WriteMessage("Response", '<font color=#cc0000>Click on "Start" to begin.');
}
function StartGame() {
	WriteMessage("Correct", "0");
	WriteMessage("Missed", "0");
	WriteMessage("Accuracy", "0%");
	WriteMessage("Speed", "0 sec");
	Timer = new Array();
	gamestart = true;
	WriteMessage("Response", "<font color=#006666>Click on an Answer button.");
	showProblem();
}
function showProblem() {
	StartTime = new Date().getTime();
	if ($("func").selectedIndex < 3) {
		MathSign = farray[$("func").selectedIndex];
	} else {
		RSign = farray[$("func").selectedIndex].split(" ");
		MathSign = RSign[Math.floor(Math.random() * RSign.length)];
	}
	num1 = Math.floor(Math.random() * $("diff").value);
	num2 = Math.floor(Math.random() * $("diff").value);
	if (MathSign == "-") {
		if (num1 < num2) {
			temp = num1;
			num1 = num2;
			num2 = temp;
		}
	}
	WriteMessage("Q1", num1);
	WriteMessage("Q2", num2);
	WriteMessage("equal", "=");
	WriteMessage("quesmark", "?");
	WriteMessage("sans", "Select Your Answer");
	if (MathSign == "*") {
		WriteMessage("Sign", "x");
	} else {
		WriteMessage("Sign", MathSign);
	}
	CorrectAns = eval(num1 + MathSign + num2);
	fakie = ",";
	for (x = 1; x < 5; x++) {
		if (MathSign == "+") {
			fakeans = Math.floor(Math.random() * ($("diff").value * 2));
		}
		if (MathSign == "-") {
			fakeans = Math.floor(Math.random() * $("diff").value);
		}
		if (MathSign == "*") {
			fakeans =
				Math.floor(Math.random() * $("diff").value) *
				Math.floor(Math.random() * $("diff").value);
		}
		if (fakie.match("," + fakeans + ",") || fakeans == CorrectAns) {
			x--;
		} else {
			fakie += fakeans + ",";
			WriteMessage("Ans" + x, fakeans);
			if (navigator.family == "ie4") {
				document.all["A" + x].guess = fakeans;
			} else if (navigator.family == "gecko") {
				$("A" + x).guess = fakeans;
			}
		}
	}
	CPick = Math.floor(Math.random() * 3) + 1;
	WriteMessage("Ans" + CPick, CorrectAns);
	if (navigator.family == "ie4") {
		document.all["A" + CPick].guess = CorrectAns;
	} else if (navigator.family == "gecko") {
		$("A" + CPick).guess = CorrectAns;
	}
}
function guessThis(number) {
	if (!gamestart) {
		WriteMessage("Response", '<font color=#cc0000>Click "Start" first.');
		return;
	}
	if (number == CorrectAns) {
		EndTime = new Date().getTime();
		Timer[Timer.length] = EndTime - StartTime;
		WriteMessage("Response", "<font color=#006600>" + good[Math.floor(Math.random() * (good.length - 1))]);
		if (navigator.family == "ie4") {
			WriteMessage("Correct", Math.floor(Correct.innerHTML) + 1);
		} else if (navigator.family == "gecko") {
			WriteMessage("Correct", Math.floor($("Correct").innerHTML) + 1);
		}
		updateScore();
		showProblem();
	} else {
		WriteMessage("Response", "<font color=#0033aa>" + bad[Math.floor(Math.random() * (bad.length - 1))]);
		if (navigator.family == "ie4") {
			WriteMessage("Missed", Math.floor(Missed.innerHTML) + 1);
		} else if (navigator.family == "gecko") {
			WriteMessage("Missed", Math.floor($("Missed").innerHTML) + 1);
		}
		updateScore();
	}
}
function updateScore() {
	if (navigator.family == "ie4") {
		Perc =
			(Math.floor(Correct.innerHTML) /
				(Math.floor(Missed.innerHTML) + Math.floor(Correct.innerHTML))) *
			100;
	} else if (navigator.family == "gecko") {
		Perc =
			(Math.floor($("Correct").innerHTML) /
				(Math.floor($("Missed").innerHTML) + Math.floor($("Correct").innerHTML))) *
			100;
	}
	WriteMessage("Accuracy", Perc.toString().substring(0, 4) + "%");
	temptimer = 0;
	for (x = 0; x < Timer.length; x++) {
		temptimer += Math.floor(Timer[x]);
	}
	newSpeed = ((temptimer * 0.001) / Timer.length)
		.toString()
		.substring(0, ((temptimer * 0.001) / Timer.length).toString().indexOf(".") + 3);
	if (newSpeed != "Na") {
		WriteMessage(
			"Speed",
			((temptimer * 0.001) / Timer.length)
				.toString()
				.substring(0, ((temptimer * 0.001) / Timer.length).toString().indexOf(".") + 3) + " sec"
		);
	}
}
function WriteMessage(where, what, addto) {
	if (window.navigator.userAgent.toLowerCase().indexOf("gecko") != -1) {
		navigator.family = "gecko";
	}
	if (addto) {
		if (navigator.family == "ie4") {
			document.all[where].innerHTML += what;
		}
		if (navigator.family == "gecko") {
			$(where).innerHTML += what;
		}
	} else {
		if (navigator.family == "ie4") {
			document.all[where].innerHTML = what;
		}
		if (navigator.family == "gecko") {
			$(where).innerHTML = what;
		}
	}
}

// Widget Code by https://karvitt.com/widgets/
