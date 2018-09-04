/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* 
DOM - Document Object Model 
	- structured representation of an html model
	- used to connect webpages to scripts 
	- for each html box there is an object in the DOM that we can interact with 
	- document object gives us access to the DOM
*/

/* Manipulate the DOM 
   How to read from the DOM
*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll;
init(); //replaced bottom 3 lines with init function 
//scores = [0, 0]; 
//roundScore = 0; 
//activePlayer = 0; 


//document.querySelector('#current-0').textContent = dice;
// change this to activePlayer for dynamic selection (type coercion converts it to a string) 
// document.querySelector('#current-' + activePlayer).textContent = dice;
// select things with CSS, .textContent changes the value to dice.

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random Number 
		dice = Math.floor(Math.random() * 6) + 1;
		dice2 = Math.floor(Math.random() * 6) + 1;

		if (dice === 6 & dice2 === 6) {
			document.getElementById('score-' + activePlayer).textContent = '0';
			document.getElementById('current-' + activePlayer).textContent = '0';
			previousRoll = 0; 
			nextPlayer();
		}
		//} else {
		//	previousRoll = dice; 
		//}

		// 2. Display the result
		var diceDOM = document.getElementById('dice-1');
		diceDOM.style.display = 'block';
		// set the image source
		diceDOM.src = 'dice-' + dice + '.png';  // use a file naming trick to select the file 

		var diceDOM2 = document.getElementById('dice-2');
		diceDOM2.style.display = 'block';
		// set the image source
		diceDOM2.src = 'dice-' + dice2 + '.png';  // use a file naming trick to select the file 

		// 3. Update round score, only if roll was NOT a 1. 
		// document.querySelector('#current-0').textContent = dice;
		// Get element by ID is faster than querySelector 
		if (dice !== 1 && dice2 !== 1) {
			// Add Player
			roundScore += dice + dice2; 
			document.getElementById('current-' + activePlayer).textContent = roundScore;

		} else {
			// Next Player 
			//document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			document.getElementById('current-' + activePlayer).textContent = '0';
			// ternery operator (like ifelse in R)
			//activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
			//roundScore = 0; 

			// make second player active by changing html classes 
			//document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

			// toggle html classes
			// toggle adds it if it's not present, and vice-versa
			//document.querySelector('.player-0-panel').classList.toggle('active');
			//document.querySelector('.player-1-panel').classList.toggle('active');

			// make dice invisible 
			//document.querySelector('.dice').style.display = 'none'; 

			// above comments were replaced with nextPlayer() function
			nextPlayer();
		}
	}

});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// get active player score 
		// this is stored in global scores list 

		// add roundscore to active player overall score 
		scores[activePlayer] += roundScore; 
		// if using querySelector remember to use hashtag at start
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;
		var finalScore; 

		// check if input is not empty (0, null or empty string are False)
		if (input) {
			finalScore = input; 
		} else {
			finalScore = 100;
		}

		// check if player won the game, if not switch to other player
		if (scores[activePlayer] >= finalScore) {
			gamePlaying = false;
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none'; 
			document.getElementById('dice-2').style.display = 'none'; 

			// add the winner css class to the window 
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		} else {
			nextPlayer();
		}
	}
}); 

document.querySelector('.btn-new').addEventListener('click', init); 

function btn() {
	console.log("button clicked");
}

function nextPlayer() {
		// ternery operator (like ifelse in R)
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
		roundScore = 0; 

		// make second player active by changing html classes 
		//document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

		// toggle html classes
		// toggle adds it if it's not present, and vice-versa
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		// make dice invisible 
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}

function init() {
	scores = [0,0];
	activePlayer = 0; 
	roundScore = 0;
	gamePlaying = true; 

	document.querySelector('#dice-1').style.display = 'none'; 
	document.querySelector('#dice-2').style.display = 'none'; 
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	// remove winner class 
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	// adding classes stacks - so we remove just in case, then add it back to player-0
	document.querySelector('.player-0-panel').classList.add('active');
}

// not sure why it's called .btn-roll yet 

/* Notes: 
document.querySelector('#current-' + activePlayer).innerHTML = '<em> + dice + </em>'; can use .innerHTML to include HTML text 

Use .querySelector as a getter 
var x = document.querySelector('#score-0').textContent; 
console.log(x)

Use .querySelector to modify css style 
document.querySelector('.dice').style.display = 'none'  (style method, css property, and value)

Events: 
somethings that happens on the webpage
use event listeners that perform an action based on an event

callback - function is called by another function 

anonymous function - function with no name, can't be reused

// Get element by ID is faster than querySelector 
document.getElementById('score-' + activePlayer).textContent

// ternery operator (like ifelse in R)

// state variable: tells us the condition of a system


// HTML: 
add ids when you want two of the same class 
        <img src="dice-5.png" alt="Dice" class="dice", id="dice-1">
        <img src="dice-5.png" alt="Dice" class="dice", id="dice-2">
reference Id's in a CSS document with a hashtag (#)

*/ 