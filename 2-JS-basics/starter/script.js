var firstName = 'John'
console.log(firstName); 

var fullAge = true; 
console.log(fullAge); 

var job 
console.log(job); //prints undefined to the console 

// Practice switch statement 

var job = 'teacher'; 
switch (job) {
	case 'teacher':
		console.log(firstName + ' teaches kids to code.');
		break;
	case 'drive':
		console.log(firstName + ' drives uber.');
		break;
	case 'designer':
		console.log(firstName + ' designs websites.');
		break;
	default: 
		console.log(firstName + ' does something else');
		break;
}

// switch with numbers 
var age = 17;
switch (true) {
	case age < 13:
		console.log('age is less than 13');
		break;
	case (age > 13 && age < 20):
		console.log('age is between 13 and 20');
		break;
	default:
		console.log('age is greater than 20');
		break;
}

//falsy values: undefined, null, 0, '', NULL (evaluate to FALSE when evaluated)
//truthy values: NOT falsy.  

var height; 
if (height) {
	console.log('height is defined');
} else {
	console.log('height is not defined');
}

// function statements and expressions 

// function declaration 
function y() {
	console.log('y is declared');
}
console.log('x')
console.log(y())


// function expressions 
var whatDoYouDO = function(job, firstName) {

}

//expression = piece of code that produces a value
//statement = code that doesn't produce an immediate values (if-else block, function, etc.)

// Array methods 
var John = ['John', 'Smith', 1990, 'teacher', false];
// add an element 
John.push('blue');
John.unshift('Mr.');
console.log(John);

John.pop();
John.shift();
console.log(John);

console.log(John.indexOf(1990)); //indexes start at 0 

// Coding challenge 3 
var tipCalc = function(bill) {
	var tip;

	switch (true) {
		case bill < 50:
			tip = bill*.2;
			break;
		case bill >= 50 && bill <= 200:
			tip = bill*.15;
			break;
		case bill > 200:
			tip = bill*.1;
			break;
	}

	return tip;
};

var bills = [124,48,268];
var tips = [tipCalc(124), tipCalc(68), tipCalc(268)];
var final_amounts = bills + tips  //this doesn't work adding arrays 
console.log(bills, tips, final_amounts);


// Objects {}

var john = {
	firstName: 'John',
	lastName: 'Smith',
	year: 1990,
	family: ['Jane', 'Mark', 'Bob'],
	isMarried: false
}; 
console.log(john);
console.log(john.firstName);
console.log(john['lastName']);

john.isMarried = true;

//alternative declaration 
var jane = new Object();
jane.firstName = 'Jane';
jane.birthyear = 1969;
jane.isMarried = false;
console.log(jane);

// attach functions to objects 
var john = {
	firstName: 'John',
	lastName: 'Smith',
	year: 1990,
	family: ['Jane', 'Mark', 'Bob'],
	isMarried: false,
	calcAge: function() {
		return 2018 - this.year; //this refers to the current object 
	}
}; 
console.log(john.calcAge(1990));
console.log(john.calcAge());

john.age = john.calcAge();
console.log(john.age)

// we can also set this in the object itself 
var john = {
	firstName: 'John',
	lastName: 'Smith',
	year: 1990,
	family: ['Jane', 'Mark', 'Bob'],
	isMarried: false,
	calcAge: function() {
		this.age = 2018 - this.year; //instead of returning we can set it to this object  
	}
}; 
john.calcAge();
console.log(john);


// Coding challenge 4: 
var Mark = {
	name: 'Mark Smith',
	height: 1.63,
	mass: 85,
	calcBMI: function() {
		this.bmi = this.mass/(this.height^2);
		return this.bmi;
	}
}; 

var John = {
	name: "John Smith",
	height: 1.85,
	mass: 89,
		calcBMI: function() {
		this.bmi = this.mass/(this.height^2);
		return this.bmi;
	}
};
console.log(Mark.calcBMI());
John.calcBMI();

// for loop syntax:
//for (var i = 1; i <=10; i++) {
//	console.log(i);
//}
//array syntax 
var hello = ['John', 'Smith', 1990];
var John = ['John', 'Smith', 1990, 'teacher', false];

console.log(name.length);
for (var i = 0; i < 3; i++) {
	console.log(name[i]);
}

// continue: move to next iteration
// break: break the loop

// Javascript versions: 
// ES = ECMAScript - standard 
// ES6 = ES2015 (same thing) - changed to an annual release cycle
//ES5 is fully supported in all browsers 
// ES6-9 are all supported in modern browers - no support in old browsers 
// can convert back to ES5 using a process called transpiling