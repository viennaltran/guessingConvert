
var secretNumber;

function guess_start(){
	secretNumber = pickRandomNumber(1,10);
	attachHandlers();
}

function pickRandomNumber(min, max){
	return Math.floor( Math.random() * (max-min)) + min;
}

function attachHandlers(){
	$("#submitGuess").click( handleGuess );
	$("#userGuess").focus( clearGuess );
}

function handleGuess(){
	var userGuess = parseInt( $("#userGuess").val());
	if(userGuess<1 || userGuess>10){
		displayResult('invalid range.  Must be between 1 and 10');
		return;
	}
	if(userGuess === secretNumber){
		displayResult('you got it!');
	} else if (userGuess < secretNumber){
		displayResult('too low!');
	} else if (userGuess > secretNumber){
		displayResult('too high!');
	}
}
function clearGuess(){
	$("#userGuess").val('');
}

function displayResult( message ){
	$("#display").text( message );
}