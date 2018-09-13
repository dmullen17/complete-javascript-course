/* Section 7: What's new in ES6 
*/

// Two new ways of declaring variables: let and const 

// ES5 declare a name
var name5 = 'Jane Smith'; 
var age5 = '23';
name5 = 'Jane Miller'; 
console.log(name5);

// ES6 declare a name
const name6 = 'Jane Smith';
let age6 = '23'; 
//name6 = 'Jane Miller';  // get an error - doesn't change because of const type


// var is function scoped, but let and const are block scoped.  They only exist within their block
// ES5
function driversLicense5(passedTest) {
	if (passedTest) {
		var firstName = 'John';
		var yearOfBirth = 1990;
	}
	console.log(firstName + 'born in ' + yearOfBirth + 
	'is now allowed to drive.');
}
driversLicense5(true);
 
//ES6 - this does not run because 'firstName' and 'yearOfBirth' are inside of the if block
function driversLicense6(passedTest) {
	if (passedTest) {
		let firstName = 'John';
		const yearOfBirth = 1990;
	}
	console.log(firstName + 'born in ' + yearOfBirth + 
	'is now allowed to drive.');
}
driversLicense6(true);
// You can define let variables outside of a block and modify them, but not constant variables 
function driversLicense6(passedTest) {
	let firstName; 
	const yearOfBirth = 1990;
	if (passedTest) {
		firstName = 'John';
	}
	console.log(firstName + 'born in ' + yearOfBirth + 
	'is now allowed to drive.');
}
driversLicense6(true);

// If you try to use an undefined 'var' then it prints undefined.  But for var and let it will give you 
// an error instead of an undefined.  

//Example: 
let i = 23; 
for (let i = 0; i < 5; i++) {
	console.log(i);
}
console.log(i);  // this i remains unchanged, because the let i only lives in the for block 


//====================================================================================================


// New way of creating IIFEs
{
	const a = 1;
	let b = 2;
	var c = 3; 
}
//console.log(a + b); // this returns an error - duh
console.log(c); // this works 
// ES5
(function() {
	var c = 5;
})();  // can just turn this into a block - easier syntax


//====================================================================================================

// New string features 
let firstName = 'john';
let lastName = 'Smith';
const yearOfBirth = 1990;
function calcAge(year) {
	return 2018 - year; 
}

//ES5 - put all data together in one string 
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + 
	yearOfBirth + '. He is ', + calcAge(yearOfBirth) + ' years old.')

//ES6 template literals 
console.log(`This is ${firstName} ${lastName}. He is ${calcAge(yearOfBirth)} years old.`);

// some new methods 
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('th'));
console.log(n.includes(' '));
console.log(firstName.repeat(5));


//====================================================================================================


// Arrow functions
const years = [1990, 1965, 1982, 1937];

//ES5 
var ages5 = years.map(function(el) {
	return 2018 - el; // stored in ages5 array
});
console.log(ages5);

//ES6 
const ages6 = years.map(el => 2018 - el); //similar to pipe
// place a callback function to elements in the array 
console.log(ages6)

// Arrow function with more than one argument
let ages6_1 = years.map((el, index) => `Age element ${index}: 2018 - el`); //similar to pipe
console.log(ages6_1);
// If there is more than one line wrap it in curly braces 

// Arrow functions don't get their own "this" keyword 
//ES5 
var box5 = {
	color: 'green',
	position: 1,
	clickMe: function() {
		document.querySelector('.green').addEventListener('click', function() {
			var str = 'This is box number ' + this.position + ' and it is ' +
			this.color;
			alert(str);
		})
	}
}
//box5.clickMe();  // it pops out this is undefined and it is undefined. 
// methods have access to the 'this' keyword, but the function that the method is calling doesn't - it access the global variable.
// an easy way around this is to create a self variable and reference that in the function: 
var box5 = {
	color: 'green',
	position: 1,
	clickMe: function() {
		var self = this;
		document.querySelector('.green').addEventListener('click', function() {
			var str = 'This is box number ' + self.position + ' and it is ' +
			self.color;
			alert(str);
		})
	}
}
//box5.clickMe();

//ES6 arrow functions get access to this this keyword 
var box6 = {
	color: 'green',
	position: 1,
	clickMe: function() {
		document.querySelector('.green').addEventListener('click', () => {
			var str = 'This is box number ' + this.position + ' and it is ' +
			this.color;
			alert(str);
		})
	}
}
box5.clickMe();


// Arrow function example 
//ES5 first
function Person(name) {
	this.name = name;
}
Person.prototype.myFriends5 = function(friends) {
	var arr = friends.map(function(el) {
		return this.name + ' is friends with ' + el; // this.name is not defined - points to global object
	}.bind(this)); // use a trick by passing bind back in to the function
	console.log(arr);
}

var friends = ['bob', 'jane', 'mark'];
new Person('john').myFriends5(friends); // this.name is not defined 

//ES6 version 
Person.prototype.myFriends6 = function(friends) {
	var arr = friends.map(el => `${this.name} is friends with ${el}`); 
	console.log(arr);
}
new Person('john').myFriends6(friends); // this.name is not defined 


//====================================================================================================


// Destructuring 
//ES5 
var john = ['john', 26];
var name = john[0];
var age = john[1];

//ES6 
const [name1, age1] = ['john', 26]; // creates two constants 
console.log(name1); 
console.log(age1);

const obj = {
	firstname: 'John',
	lastname: 'Smith'
}; 

const {firstname: a, lastname: b} = obj; 
console.log(a);

function calcAgeRetirement(year) {
	const age = new Date().getFullYear() - year; 
	return [age, 65 - age];
}

const [age2, retirement2] = calcAgeRetirement(1975);
console.log(age2);
console.log(retirement2);


//====================================================================================================


// Arrays in ES6
const boxes = document.querySelectorAll('.box'); 

//ES5 nodeList to array 

var boxesArr5 = Array.prototype.slice.call(boxes); // hack in ES5
boxesArr5.forEach(function(cur) {
	cur.style.backgroundColor = 'dodgerblue';
}) 


//ES6 nodeList to array

const boxesArr6 = Array.from(boxes) // transforms nodeList to array
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerBlue');

// break and continue don't work in forEach and map 
// ES5 for loop if we want to break: 
/*
for (let i = 0; i < boxesArr5.length; i++) {
	if (boxesArr5[i].className === 'box blue') {
		continue;
	}
	boxesArr5[i].textContent = 'I changed to blue';
}
*/
//.className method returns the class name of the object

//ES6 forOf loop
// cur is equivalent to cur[i] 
for (const cur of boxesArr6) {
	//if (cur.className === 'box blue') {
	if (cur.className.includes('blue')) { //another way to write this statement
		continue;
	}
	cur.textContent = 'I changed to blue';
}

// Two new methods to find elements in an array 
var ages = [12, 17, 8, 21, 14, 11];

//ES5 
var full = ages.map(function(cur) {
	return cur >= 18;
}); 
console.log(full);
console.log(full.indexOf(true)); 

//ES6 findIndex method - pass in callback function and it returns index where callback function is true
console.log('break');
console.log(ages.findIndex(cur => cur >= 18)); // return index 
console.log(ages.find(cur => cur >= 18)); // return element 


//====================================================================================================


// Spread Operator
function addFourAges(a, b, c, d) {
	return a + b + c + d;
}
var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1); 

//ES5 - pass an array into a function 
var ages = [18, 30 ,12, 21]; 
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6 
const sum3 = addFourAges(...ages); //... expands the array into its components
console.log(sum3);

// Join two arrays
const familySmith = ['john', 'jane', 'mark'];
const familyMiller = ['clark', 'miller'];
const bigFamily = [...familySmith, ...familyMiller];
console.log(bigFamily);

// spread operator works on NodeLists also 
const h = document.querySelector('h1'); 
const boxes2 = document.querySelectorAll('.box');
const all = [h, ...boxes2]; 
console.log(all);
// convert to array and change to purple
Array.from(all).forEach(cur => cur.style.color = 'purple');


//====================================================================================================


// Rest Parameters - allow us to pass an abitrary number of arguments into a function
//ES5 
/*
function isFullAge5 () {
	//console.log(arguments); this is not an array
	var argsArr = Array.prototype.slice.call(arguments);

	argsArr.forEach(function(cur) {
		console.log((2016 - cur) >= 18); 
	})
}
isFullAge5(1990, 1999, 1965);

// ES6 
function isFullAge6(...years) {
	console.log(years); // this is an array
	years.forEach(cur => console.log((2016 - cur) >= 18));
}
isFullAge6(1990, 1999, 1965);
*/
//spread operator is used in function call
//rest parameters is used in function declaration 

//Example: 
function isFullAge5 (limit) {
	//console.log(arguments); this is not an array
	var argsArr = Array.prototype.slice.call(arguments, 1);

	argsArr.forEach(function(cur) {
		console.log((2016 - cur) >= limit); 
	})
}
isFullAge5(16, 1990, 1999, 1965);

// ES6 
function isFullAge6(limit, ...years) {
	console.log(years); // this is an array
	years.forEach(cur => console.log((2016 - cur) >= limit));
}
console.log('break');
isFullAge6(16, 1990, 1999, 1965);


//====================================================================================================


// Default parameters
// if parameter is unspecified then it is set to undefined 

//ES5 
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {

	// use ternary operator to specify default parameters
	lastName === undefined ? lastName = 'Smith' : lastName = lastName;
	nationality === undefined ? nationality = 'USA' : nationality = nationality;


	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality; 
}; 

var john = new SmithPerson5('john', 1990);
console.log(john);

//ES6 set default parameters in function declaration 
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith',
 nationality = 'USA') {
	this.firstName = firstName;
	this.lastName = lastName;
	this.yearOfBirth = yearOfBirth;
	this.nationality = nationality; 
}; 

var john2 = new SmithPerson6('john', 1990);
console.log(john2);


//====================================================================================================


// New data structure: maps 
// hasmaps - map string keys to arbitrary values 
// map is a key-value data structure 
const question = new Map(); // empty map 
// define first key-value pair
question.set('question', 'What is the official name of the latest JS version?'); 
question.set(1, 'ES5');
question.set(2, 'ES6'); 
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct Answer!');
question.set(false, 'Wrong answer please try again!');

console.log(question);

// get method returns values by key 
console.log(question.get('question'));
console.log(question.size);  // returns length 

// remove element 
question.delete(4); 
// if you run it again and 4 is already deleted nothing happens 
// .has returns true/false if the key is present 
if (question.has(4)) {
	question.delete(4);
}

// .clear deletes everything from the map 

// maps are iterable 
question.forEach((value, key) => console.log(`This is ${key} and
	it's set to ${value}`));

// .entries returns all entries of map 
// this also works for arrays 
for (let [key, value] of question.entries()) {
	//console.log(`Key: ${key} and ${value}`);
	if (typeof(key) === 'number') {
		console.log(`Answer ${key}: ${value}`);
	}
}

// commented out for now
//const ans = parseInt(prompt('Write the correct answer'));
// retrive answer using the map 
//console.log(question.get(ans === question.get('correct')));

// why are maps better than objects for building hashmaps? 
// 1. You can use anything as a key 
// 2. You can loop through them 
// 3. It's easy to get the size of a map using the .size property 
// 4. You can easily remove data from a map


//====================================================================================================


// Classes - make it easier to create inheritance 
// ES5 
var Person5 = function(name, YOB, job) {
	this.name = name; 
	this.YOB = YOB;
	this.job = job;
}; 
Person5.prototype.calculateAge = function() {
	let year5 = new Date().getFullYear();
	let age5 = year5 - this.YOB;
	console.log(age5);
};
var john5 = new Person5('john', 1990, 'teacher'); 

// ES6 
// class declaration
// must have a constructor method where we define intial properties 
/*
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
    
    static greeting() {
        console.log('Hey there!');
    }
}
const john6 = new Person6('john', 1990, 'teacher');
console.log(john5);
console.log(john6);
console.log('break');
john6.calculateAge();
*/

// we can create static methods - they are not inherited by objects created by that class
// they are kind of like helper functions 

// classes are NOT HOISTED 
// we can only add methods to classes, not properties


//====================================================================================================


// Classes with Subclasses 
// Person 5 will be the 'Superclass'
var Person5 = function(name, YOB, job) {
	this.name = name; 
	this.YOB = YOB;
	this.job = job;
}; 
Person5.prototype.calculateAge = function() {
	let year5 = new Date().getFullYear();
	let age5 = year5 - this.YOB;
	console.log(age5);
};
var athlete5 = function(name, YOB, job, olympicGames, medals) {

	// new operator creates a new empty object and sets this keyword to newly created object
	//   - points to new empty object 
	// if we want name, YOB, and job then we need to call the constructor with this set to athlete
	Person5.call(this, name, YOB, job); 
	this.olympicGames = olympicGames;
	this.medals = medals;
}; 
// manually set prototype chain 
athlete5.prototype = Object.create(Person5.prototype);

// add method to athlete5
athlete5.prototype.wonMedal = function() {
	this.medals ++;
	console.log(this.medals);
}

var johnAthlete5 = new athlete5('john', 1990, 'swimmer', 3, 10);
console.log(johnAthlete5);
johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

// ES6
// SuperClass
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}
// create subclass of Person6
class Athlete6 extends Person6 {
    constructor (name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job); // same as this.name = name, etc. 
    this.olympicGames = olympicGames;
    this.medals = medals
	}

	wonMedal() {
		this.medals++;
		console.log(this.medals);
	}
}
var johnAthlete6 = new Athlete6('john', 1990, 'swimmer', 3, 10);
johnAthlete6.wonMedal();
johnAthlete6.calculateAge();