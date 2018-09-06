//1 Build a question function constructor 
function Question(question, answers, correct) {
	this.question = question,
	this.answers = answers,
	this.correct = correct
}; 

//4 Add prototype to select random question 
Question.prototype.displayQuestion = function() {
	console.log(this.question);

	for (var i = 0; i < this.answers.length; i++){
		console.log(i + ': ' + this.answers[i]);
	}
};

Question.prototype.displayScore = function(score) {
	console.log('Your current score is: ' + score);
	console.log('---------------------------------')
}; 

//5 Add prototype to display correct answer
Question.prototype.checkAnswer = function(ans, callback) {
	if (ans === this.correct) {
		console.log('Correct answer!');
		//score += 1; 
		sc = callback(true);
	} else {
		console.log('Wrong answer. Try again :)');
		sc = callback(false);
	}

	this.displayScore(sc);
};

//2 Create a couple of questions 
q1 = new Question('Whats 1+1?', [0, 1, 2], 2);
q2 = new Question('Crichton\'s best book?', ['jurassic park', 'sphere', 'prey'], 0);
q3 = new Question('5*4?', [20, 54, '5*4'], 0);

//3 Create an array of questions 
var questions = [q1, q2, q3]; 
var keepScore = score(); 

//var score = 0; 

//8 Create looping game logic 
function nextQuestion() {
//4 Select a random question
	var n = Math.floor((Math.random() * questions.length));
	questions[n].displayQuestion(); // this work because the object calls its prototype method

	//5 
	var answer = prompt('Please select the correct answer.');

	if (answer !== 'exit') {
		questions[n].checkAnswer(parseInt(answer), keepScore);
		nextQuestion();
	}
};
nextQuestion();

// Update score with power of closures 
function score() {
	var sc = 0; 
	return function(correct) {
		if (correct) {
			sc ++; 
		}
		return sc;
	}
}
// thanks to closures we always have access to the 'sc' variable