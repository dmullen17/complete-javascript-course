/*
Section 5 Notes: 

Primitives: one of the following data types: numbers, strings, booleans, undefined, null 
	- everything else is an object

Objects interact with each other through methods and properties

Used to store data, structure applications into modules, and to keep code clean

This is the john object from former lectures: 
var john = {
	name: 'John',
	year: 1993,
}


Object constructor / protoype (template for instances of objects): 
Person {
	name
	yearOfBirth
	job
	calculateAge
}

Inheritance is when one object is based on another object - gets access to its properties and methods 
ex. Athlete constructor - person constructor + details about their athletic career.  
	- we make the athlete object inherit the properties and methods from the person object. 

If we have a person constructor and john is an instance: 
	- we add a method to the person prototype 
	- then the John instance would get the method 

At a higher level - everything is an instance of the "Object" object 
	- some methods are hasOwnProperty(), isProtoTypeOf(), toString(), etc.  
	- if you call methods it first looks in its own prototype, then its parent prototype, and so on until it hits "NULL"


Every javascript object has a propotype property, which makes inheritance possible. 
The prototype property of an object is where we put methods and properties we want other objects to inherit. 
The constructor's prototype property is NOT the prototype of the constructor itself, it's the prototype of all instances
that are created through it. 
When a certain method or property is called, the search starts in the object itself, if it can't be found there it moves up
in the prototype chain.  

If you click the play button next to an object in the console you can see its properties, methods, and prototypes. 
	- You can then click the play button on the proto property and see its stuff. 
*/


// example object 
var john = {
	name: 'John',
	yearOfBirth: 1990,
	job: 'teacher'
}; 

// function constructors have a capital letter to begin
var Person = function(name, yearOfBirth, job){
	this.name = name,
	this.yearOfBirth = yearOfBirth,
	this.job = job
	// we add this method to the Person Prototype 
	//this.calculateAge = function() {
	//	console.log(2016 - this.yearOfBirth)
	//}
}; 

// Add a method to the prototype to store it one layer up 
Person.prototype.calculateAge = function() {
	console.log(2016 - this.yearOfBirth);
};

// We can also add properties to the prototype but it's not as common
Person.prototype.lastName = 'Smith';

// create new object (instanciation)
var john = new Person("John", 1990, "teacher"); 
var Jane = new Person('Jane', 1969, 'designer');
var Mark = new Person('Mark', 1948, 'retired');

john.calculateAge(); 
Jane.calculateAge();
Mark.calculateAge();

console.log(john.lastName);
console.log(Jane.lastName);
console.log(Mark.lastName);


var Data = function(data) {
	this.data = data
}; 
Data.prototype.print = function() {
	n = this.data.length;
	console.log(n);
}

sample = new Data([1,2,3,4,5,6,7]);
console.log(sample.data)
sample.print();

// these are equivalent 
// find out what __ __ means? 
console.log(john.__proto__ === Person.prototype);

// use object prototype method 
console.log(john.hasOwnProperty('job'));
console.log(john.hasOwnProperty('lastName')); // false because lastName is a prototype property

// check if an object is an instance of a constructor: 
console.log(john instanceof Person);

// we want to add complex methods into the constructors prototype properties
// this way we're not repeating a bunch of complex code in each object, we just store it once in the constructor prototype


// When we use the new operator an empty object is created.  
// Then the constructor operator (Person) is called.  
// calling a function creates a new execution-context, the this variable then points to the new object.  

var x = [2,4,6];
console.info(x)
console.log(x.length) // length is stored in the array object 
// all the methods are in the prototype property of the Array constructor 
// ex. x.fill(), x.join(), x.pop()



// Object.create method of creating objects / inheritance: 
// First create a new object that will act as the prototype 

var personProto = {
	calculateAge: function() {
		console.log(2018 - this.yearOfBirth);
	}
}; 

var john = Object.create(personProto);
john.name = 'John'; 
john.yearOfBirth = 1990; 
john.job = 'teacher';
john.calculateAge();

var jane = Object.create(personProto, {
	name: {value: 'Jane'},
	yearOfBirth: {value: 1969}, 
	job: {value: 'designer'}
});



// Primitives vs. Objects 
// only numbers, strings, nulls, booleans, and undefined are primitives 
// variables containing primitives hold the data inside the variable itself 
// variables associated with objects do not actually contain the object, they contain references to where it is.  

// Primitives
var a = 23; 
var b = a; 
a = 46; 
console.log(a); 
console.log(b); 

// Objects
var obj1 = {
	name: 'John',
	age: 26
}; 
var obj2 = obj1; 
obj1.age = 30; 
console.log(obj1.age);
console.log(obj2.age);
// they are equivalent because object2 is just a pointer to object1 


// Functions 
var age = 27; 
var obj = {
	name: 'Jonas',
	city: 'Lisbon'
}; 

function change(a, b) {
	a = 30;
	b.city = 'san francisco'
}

change(age, obj);
console.log(age); // primitve remains unchanged 
console.log(obj.city); // object reference gets changed - it's still reflected outside the function.  




// Functions are also objects in Javascript
//   - a function is an instance of the Object Type 
//   - we can pass functions as arguments to other functions, store them in variables, and return a function from a function
//   - definition of a first class function 

years = [1990, 1991, 1985, 2003, 1928]; 

function arrayCalc(arr, fn) {
	var arrRes = [];
	for (var i = 0; i < arr.length; i++) {
		arrRes.push(fn(arr[i]));
	}
	return arrRes
}

function calculateAge(element) {
	return 2018 - element; 
}

// passing a function as an argument is called a callback function 
var ages = arrayCalc(years, calculateAge);
console.log(ages);

// Functions returning functions:
// this returns a function object so we have to store it  
function interviewQuestion(job) {
	if (job === 'designer') {
		return function(name) {
			console.log(name + 'can you explain what you UX design is?');
		}
	} else if (job === 'teacher') {
		return function(name) {
			console.log(name + ' what subject do you teach?'); 
		}
	} else {
		return function(name) {
			console.log('Hello ' + name + ' what do you do?');
		}
	}
}

var teacherQuestion = interviewQuestion('teacher'); // stores the function as teacherQuestion
teacherQuestion('Dom');
var designerQuestion = interviewQuestion('designer'); // creates the designer question function
// you don't need to store it, it can be used right away - because it's evaluated left to right 
interviewQuestion('teacher')('John');


// Immediately invoked function expressions (IIFE)
function game() {
	var score = Math.random() * 10; 
	console.log(score >=5);
}; 
game(); 
// we can do this more efficiently using an IIFE
( function() {
	var score = Math.random() * 10; 
	console.log(score >= 5);
})(); 
// if we wrap everything in parentheses then it treats it as an expression
// tricks JS into believing it is not a function declaration

// can add parameters to IIFEs 
( function(goodLuck) {
	var score = Math.random() * 10; 
	console.log(score >= 5 - goodLuck);
})(3);
// variables can't be accessed in the global execution context 


// Closures 
function retirement(retirementAge) {
	return function (yearOfBirth) {
		var a = ' years left until retirement'
		var age = 2018 - yearOfBirth;
		console.log((retirementAge - age) + a); // in the inner function we used the 'a' and 'yearOfBirth' variables is popped off the stack
	}
}

var retirementUS = retirement(66);
retirementUS(1990);
retirement(66)(1990);
// inner function is able to use the 'a' and 'yearOfBirth' variables 
// Closure summary: an inner function always has access to the variables and parameters of its outer function, even if the outer
// function has returned.  
//    - variables are not actually gone, they can still be accessed in memory.
//    - scope chain is a pointer to variable objects 
//    - since the inner function is written lexically, it gets access to the outer scope (which is still sitting there in memory)
//    - the scope chain always stays intact 
//    - question - when is the scope chain / closure removed from memory.


// Bind, call, and apply 
var john = {
	name: 'John',
	age: 26, 
	job: 'teacher',
	presentation: function(style, timeOfDay) {
		if (style === 'formal') {
			console.log('Good ' + timeOfDay + ', Ladies and gentlemen.  I\'m ' + this.name + 
				' and I\'m a ' + this.job);
		} else if (style === 'friendly') {
			console.log('Hey what up? I\'m ' + this.name + 
				' and I\'m a ' + this.job);
		}
	}
};

john.presentation('formal', 'morning');

// method borrowing
var emily = {
	name: 'emily',
	age: 35,
	job: 'designer'
};
// first argument of the call method is passed into 'this'
john.presentation.call(emily, 'friendly', 'afternoon');
// apply method is the same except for an array 

// Bind allows us to set this - it generates a copy of the function instead of calling it right away 
// first argument is still the 'this' variable
var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning'); // only one argument left

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');


// Coding Challenge Section 5: 

//1 Build a question function constructor 
var Question = function(question, answers, correctAnswer) {
	this.question = question,
	this.answers = answers,
	this.correctAnswer = correctAnswer
}; 

//2 Create a couple of questions 
q1 = new Question('Whats 1+1?', [0, 1, 2], 2);
q2 = new Question('Crichton\'s best book?', ['jurassic park', 'sphere', 'prey'], 0);
q3 = new Question('5*4?', [20, 54, '5*4'], 0);

//3 store in array
questions = [q1, q2, q3];
console.log(questions);

//4 Select a random question 
var n = Math.floor((Math.random() * questions.length));

Question.prototype.select = function() {
	console.log(this.question);
	for (var i = 0; i < this.answers.length; i++){
		console.log(i + ': ' + this.answers[i]);
	}
};
questions[n].select(); // this work because the object calls its prototype method

//5 Ask for the correct answer 
var userAnswer = prompt("What is the correct answer? Type exit to quit the game.");

//10 Add score using closures 
var score = 0; 
var points; 

//6 Check whether answer is correct 
Question.prototype.checkAnswer = function(userAnswer) {
	if (userAnswer == this.correctAnswer) { // this time I want type coercion 
		console.log('This is correct!');
		points = 1;  // putting it here should only make it accessible through a closure? then 'nextQuestion' should have
		// access to it since it's lexically below in the scope 
		nextQuestion(); //answer for step 8 
	} else if (userAnswer == 'exit') {
		// doing nothing here will exit the prompt screen because nothing happens. 
	} else {
		console.log('Wrong answer. Try again :)');
		points = -1; 
		nextQuestion(); //answer for step 8
	}
}; 
questions[n].checkAnswer(userAnswer);

//7 If I want to hide the code then use an immediately invoked function expression
//    - basically wrapping an anonmyous function in quotes

//8 
function nextQuestion() {
	var n = Math.floor((Math.random() * questions.length));
	score += points; 
	questions[n].select();
	var userAnswer = prompt("What is the correct answer? Type exit to quit the game.");
	questions[n].checkAnswer(userAnswer);
};
//nextQuestion();



