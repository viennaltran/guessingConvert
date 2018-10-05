
$(document).ready(startApp);

var guessInput;

function startApp(){
	var inputOptions = {
		element: '#userGuess',
		minNum: 1,
		maxNum: 10,
		testPattern: /^[0-9]*$/,
		errorMessage: 'must be a number between 1 and 10',
		fade: true
	}
	guessInput = new SmartInput(inputOptions);
	guess_start();
}