var pensatroApp = angular.module('pensatroApp', []);

pensatroApp.controller('MainCalcController', function ($scope){
	$scope.calculations = [{
		'input':'A+1',
		'output':'B (2)'
	},
	{
		'input':'E-2',
		'output':'C (3)'
	},
	{
		'input':'G+I',
		'output':'P (16)'
	}
	];

	$scope.calculate = function (calcString){
		calcString = calcString.toUpperCase();
		var output = 'Unknown Error';
		output = replaceCharWithNumbers(calcString);
		
		if(output.search('Syntax Error') != -1){
			output = 'Syntax Error';
		} else {
			$scope.input = checkLetter(eval(output));
			output = alphabetEval(output);
		}

		$scope.calculations.unshift({
			'input': calcString,
			'output': output
		});

	}
});

function replaceCharWithNumbers (string){
	var result = '';
	if (string.charAt(0) == '-'){
		result += '1+'	
	}
	for (var i=0; i < string.length; i++){
		var evaluatedChar = string.charAt(i);
		if (isNaN(evaluatedChar)){
			if (/[A-Z]/g.test(evaluatedChar)){
				result += evaluatedChar.charCodeAt(0) - 64;
			} else if (evaluatedChar == '+' || evaluatedChar == '-' || evaluatedChar == '*'){
				result += evaluatedChar;
			} else {
				result += 'Syntax Error';
			}
		} else {
			result += evaluatedChar;
		}
	}

	return result;
}

function alphabetEval (string){
	value = eval(string);
	var displayVal = value;
	displayVal -= displayVal <= 0 ? 1 : 0;
	var letter = checkLetter(value);
	
	var response = letter + ' (' + displayVal.toString() + ')';
	return response;
}

function checkLetter (value){
	var letter = value % 26;
	while(letter < 0){
		letter += 26;
	}
	letter = letter == 0 ? 26 : letter;
	letter = String.fromCharCode(letter + 64);
	return letter;
}