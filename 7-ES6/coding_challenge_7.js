/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area) 
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

// Store data in a map? - or just store data in constants 

//  Create Park class
// properties - name, age, number of trees, area
// method for 1. -- get the tree density 

class Element {
	constructor(name, buildYear) {
		this.name = name; 
		this.buildYear = buildYear;
	}

	calcAge() {
		return new Date().getFullYear() - this.buildYear;
	}
}

class Park extends Element {
	constructor(name, buildYear, numberTrees, area) {
		super(name, buildYear); 
		this.numberTrees = numberTrees;
		this.area = area; 
	}

	getTreeDensity() {
		let density = (this.numberTrees / this.area).toFixed(2);
		console.log(`The tree density of ${this.name} Park is ~ ${density} trees/km^2.`);
	}
}

// 2. Create Street Class 
// properties, name, buildYear, length, size 
class Street extends Element {
	constructor(name, buildYear, length, size = 3) {
		super(name, buildYear);
		this.length = length;
		this.size = size; 
	}

	getClassification() { //entered values as 1-5.  Use a map to display these dynamically
		const sizes = new Map(); 
		sizes.set(1, 'tiny');
		sizes.set(2, 'small');
		sizes.set(3, 'normal');
		sizes.set(4, 'big');
		sizes.set(5, 'huge');
		console.log(`${this.name} Street is ${sizes.get(this.size)}.`);
	}
}

// Create some data and store it in constants 
const allParks = [new Park('Wyatt', 1990, 514, 50),
				  new Park('Central', 1490, 5433, 154),
				  new Park('Green', 1865, 67, 300)]; 

const allStreets = [new Street('State', 1849, 5, 4),
				    new Street('Mission', 1857, 2.3, 2),
				    new Street('Sola', 1914, 1.6, 1),
				    new Street('Carillo', 1857, 2.1, 2)];

// Sum function 
var sum = function(...inputs) {
	let sum = 0; 
	inputs.forEach(el => sum+= el);
	return sum;
} 

// Another way to calculate the sum / average
function calcSumAndAverage(arr) {
	const sum = arr.reduce((previous, current, index) => previous + current, 0);
	// reduce transforms all element in an array to a single value using the callback function
	return [sum, sum / arr.length]; 
}

// Create reporting functions - this is probably overkill but at least it's modularized 
function parkReport() {
	console.log('--------------PARK REPORT---------------');
	// 1. Tree density of each park in the town
	// use arrow function on array of objects 
	allParks.map(el => el.getTreeDensity());
	// can also use for each 
	// allParks.forEach(el => el.getTreeDensity());

	// 2. Average age of each town's park
	// try to make this dynamic 
	let totalAge = sum(...allParks.map(el => el.calcAge()));
	console.log(`The average age of the town's parks is ${(totalAge/allParks.length).toFixed(2)} years.`);
	// this is dynamic but i don't love how I did it. 

	// 3. Print the name of the park with more than 1000 trees
	//for (const cur of allParks) {
	//	if (cur.numberTrees > 1000) { nt
	//		console.log(`${cur.name} park has more than 1000 trees`);
	//}. This doesn't work 
	// have to use map and findIndex 

	// 3. Print the name of the park with more than 1000 trees
	let index = allParks.map(el => el.numberTrees).findIndex(el => el > 1000);
	console.log(`${allParks[index].name} Park has greater than 1000 trees.`);
	// Another way of doing this: 
	// const i = allParks.map(el => el.numberTrees).findIndex(el => el > 1000)

} 


function streetReport() {
	console.log('-------------STREET REPORT--------------');
	// 4. Total and average length of the town's streets
	let streetLengths = allStreets.map(el => el.length);  // returns an array
	let totalStreetLength = sum(...streetLengths);
	// need a sum function that can take an abitrary number of arguments
	console.log(`The streets have a total length of ${totalStreetLength} kilometers
		and an average length of ${totalStreetLength/streetLengths.length} kilometers.`); 

	// 5. Size classification of all streets
	allStreets.map(el => el.getClassification());
}

function printReport() {
	parkReport(); 
	streetReport();
}
printReport();

// Testing
console.log('----------------TESTING-----------------');
let park1 = new Park('central', 1490, 5433, 154); 
park1.getTreeDensity();
console.log(allParks);
console.log(park1.calcAge());

// Notes: 
// Should've noticed that Park and Street both have a name and build year, this means we can 
// create a common superClass for them, and Park and street subclasses will extend that 

// Print report - use console.log + template strings `${}`