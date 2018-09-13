/*
Asynchronous - code running in the background while something else happens
- usually requesting something from an API
*/

// An example of asynchronous JS 
/*
const second = () => {
	// console.log('second');
	setTimeout(() => {
		console.log('async hey there');
	}, 2000); // takes a callback and a time in ms
}

const first = () => {
	console.log('hey there');
	second();
	console.log('The end');
}
first();
*/

// everything that can run will run, then the async runs 
// let's say JS is doing something costly like processing an image
// - let it process in the background so other code can run 
// - pass in a callback function that runs once the function has finished its work
// - callback function then go to the message queue and sit in an event loop
//   - executes when the stack is empty 
//   - the event loop constantly monitors the message queue and execution stack
//   - when the stack is empty it pushes the first callback in the message queue into the stack 


//==================================================================================================

// Create a recipe function and use timers to simulate AJAX calls getting data from a server 

// ES5 callback hell - nested structure gets unmanageable after a certain number 
function getRecipe() {
	setTimeout(() => {
		const recipeID = [523, 883, 432, 974]; // callback function
		console.log(recipeID);

		setTimeout(id => {
			const recipe = {title: "Fresh tomato pasta", publisher: 'Jonas'};
			console.log(`${id}: ${recipe.title}`);

			setTimeout(publisher => {
				const recipe2 = {title: 'Italian pizza', publisher: 'Jonas'};
				console.log(recipe2);
			}, 1500, recipe.publisher)

		}, 1000, recipeID[2]) // setTimeout has a third argument, where you can set an arg for your callback function
	}, 1500);
}
getRecipe();
