/*
Come up with a plan: 
- Add event handler 
- Get input values 
- Add the new item to our data structure 
- Add the new item to the UI 
- Calculate budget 
- Update the UI

Structure code with modules:
	keep units of code separate and organized 
	encapsulate data with privacy 
	break up code into logical parts (duh)

Create a UI Module and a Data Module 
UI: 
- get input values 
-add new item to the UI 
- update the UI

Data: 
- add new item to data structure 
- calculate budget 

Event handler doesn't fit - so we create a new controller module 
Controller: 
- Add event handler

Invoke the module structure by using IIFEs
	- want it to return an object that contains all the functions you want access to 

modularizing is also called separation of controllers (concerns)


var budgetController = (function() {
	var x = 23;  // this is private - can't use it 

	var add = function(a) { // this is also private - can't use it 
		return x + a;
	}

	return {
		publicTest: function(b) { // we can use publicTest - but you can't see the source code 
			return add(b);
		}
	}
// when this is run it is immediately invoked, x and add are declared, then the budgetController variable gets 
// assigned the method called publicTest
// 		- publicTest can access add and x because of closures - it has access to outer scope.  

})(); //create IIFE


var UIController = (function() {

})(); 


var controller = (function(budgetCtrl, UICtrl) { // this module knows about the other two controllers

	var z = budgetCtrl.publicTest(5);

	return {
		anotherPublic: function() {
			console.log(z)
		}
	}

})(budgetController, UIController); 


// Event Delegation and Bubbling 
 - event bubbling - when an event is triggered - then the exact same event is also triggered on all parent elements 
 - the event "bubbles" up through the parents 
 - the element that it's happens on is called the "target" (in our case a button)
 - we can add an event Handler to a parent element - and wait for it to bubble up and handle it there
 - we don't setup the event handler on the element we're interested in.
 Why do we want to do this? 
 Two use cases: 
 	- element with of child elements we're interested in:
 		- we add the event handler to the parent and determine which child it was fired on
 		- lots of expenses and income items 
 	- when we want an event handler to an element that is not yet in the DOM when our page is loaded
 		- cannot add an event handler to something that isn't in page
 		- income / expense items are not yet in DOM

*/



// BUDGET CONTROLLER
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value  = value; 
		this.percentage = -1; // from calcPercentage prototype method
	};

	// Add prototype property

	Expense.prototype.calcPercentage = function(totalIncome) {
		if (totalIncome > 0 ) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	}

	Expense.prototype.getPercentage = function() {
		return this.percentage; 
	};

	var Income = function(id, description, value) {
			this.id = id;
			this.description = description; 
			this.value = value;
	};

	var calculateTotal = function(type) {
		var sum = 0; 
		data.allItems[type].forEach(function(cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],    	//var allExpenses = [];
			inc: []			//var allIncomes = [];
		}, 
		totals: {
			exp: 0,		    //var totalExpenses = 0; 
			inc: 0
		},
		budget: 0,
		percentage: -1      //we use this to say it DNE
	}

	return {
		addItem: function(type, des, val) {
			var newItem, ID; 
			
			// Create new ID
            if (data.allItems[type].length > 0) {
            	// retrieve the ID at the end of the list + 1 
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			// Push it into data structure 
			data.allItems[type].push(newItem); 

			// Return the new element
			return newItem; 
		},

		deleteItem: function(type, id) {
			var ids, index;
			// find index of the id we want to remove
			// map recieves a callback function which has access to current element, index, and array
			// map returns a brand new array (unlike forEach) 
			ids = data.allItems[type].map(function(current) {
				return current.id;
			});

			// indexOf is like 'which'
			index = ids.indexOf(id); 

			if (index !== -1) {
				data.allItems[type].splice(index, 1); // removes this element from array. starts removing at index and continues for second argument # of times
			}
		},

        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
            
            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },

        calculatePercentages: function() {
        	// need to calculate percentage for each expense, but for all of them - easiest to do with a method
        	data.allItems.exp.forEach(function(cur) {
        		cur.calcPercentage(data.totals.inc);
        	});
        }, 

        getPercentages: function() {
        	var allPercentages = data.allItems.exp.map(function(cur) {
        		return cur.getPercentage();
        	}); 
        	return allPercentages;
        },

        getBudget: function() { // only retrives data - just does one things
        	return {
        		budget: data.budget,
        		totalInc: data.totals.inc,
        		totalExp: data.totals.exp, 
        		percentage: data.percentage
        	}
        }, 

		testing: function() {
			console.log(data);
		}
	}

})(); //create IIFE



// UI CONTROLLER
var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expensesLabel: ".budget__expenses--value",
		percentageLabel: ".budget__expenses--percentage",
		container: ".container",
		expensesPercLabel: ".item__percentage",
		dateLabel: ".budget__title--month"
	};

	var nodeListForEach = function(list, callback) {
		for (i = 0; i < list.length; i++) {
			callback(list[i], i);
		}
	};

	var formatNumber = function(num, type) {
		var NumSplit, int, dec, type; 

		num = Math.abs(num);
		num = num.toFixed(2); // method of number prototype (rounds decimals to 2 decimal places)
		
		numSplit = num.split('.');
		int = numSplit[0];
		dec = numSplit[1];

		if (int.length > 3) {
			int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
		}

		//type == 'exp' ? sign = '-' : sign = '+';
		//return type + ' ' + int + dec;
		// Can use the ternary operator in a string declaration
		return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
	};

	// since we're using an IIFE we need to return a method 
	return {

		getInput: function() {
			//var type = document.querySelector('.add__type').value;  // will be either inc or exp
			//var description = document.querySelector('.add__description').value;
			//var value = document.querySelector('.add__value'); 
			// we want to return an object with 3 properties for the controller
			return {
				// we are going to call the class names alot
				// Store them in a private variable called 'DOMstrings'
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};
		}, // need a comma if returning multiple blocks 

		addListItem: function(obj, type) {
			var html, newHtml, element; 
			// Create HTML string with placeholder text 
			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
	        	html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else {
				element = DOMstrings.expensesContainer
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			// Replace the placeholder text 
			newHtml = html.replace('%id%', obj.id); 
			newHtml = newHtml.replace('%description%', obj.description);
			//newHtml = newHtml.replace('%value%', obj.value);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			// Insert the HTML into the DOM 
			// put things into the '<div class="income__list">' or expense 
			// define this in the DOMstrings first for income and expenses
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
			// if we run it now it won't work -- need to call in the controller module.
		}, 

		deleteListItem: function(selectorID) { // need to pass in a class name and ID
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
			//document.getElementById(selectorID).parentNode.removeChild(document.getElementByID(selectorID))
		}, 

		clearFields: function() {
			var fields, fieldsArr; 
			// query for multiple fields - it has weird syntax
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			// this method returns a list - no indices 
			// we can use the slice method, but we need to call it then pass in so fields becomes the this variable
			var fieldsArr = Array.prototype.slice.call(fields) // convert a list to an array.

			// Loop over array and clear all fields that were selected
			fieldsArr.forEach(function(current, index, array) { // we can access current value, index number, entire array
				current.value = '';
			})

			// set typing bar back to description box
			fieldsArr[0].focus();
		},

		displayBudget: function(obj) {
			// Display budget - need to add these fields to DOMstrings
			//document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			obj.budget > 0 ? type = 'inc' : type = 'exp'
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);

			// Display income / expenses 
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

			// Display percentage
			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		},

		displayPercentages: function(percentages) {

			var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // returns a nodelist
			// loop over all nodes and change textContent property 

			//var nodeListForEach = function(list, callback) {
			//	for (i = 0; i < list.length; i++) {
			//		callback(list[i], i);
			//	}
			//};

			nodeListForEach(fields, function(curr, index) {
				if (percentages[index] > 0) {
					curr.textContent = percentages[index] + '%';
				} else {
					curr.textContent = '---';
				}
			});
		},

		displayMonth: function() {
			var now, year, month; 

			now = new Date(); // returns today's date if you don't pass anything in 
			// var christmas = new Date(2016, 11, 25); // decemember is 11 b/c it's 0-based
			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
			'August', 'September', 'October', 'November', 'December'];
			month = now.getMonth();
			year = now.getFullYear();

			document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' '+ year; 
		},

		changedType: function() {
			var fields;
			// want to change CSS classes on these 

			// 1. Select all 3 elements to recieve red-focus class 
			fields = document.querySelectorAll(
				DOMstrings.inputType + ',' + 
				DOMstrings.inputDescription + ',' + 
				DOMstrings.inputValue);  // returns a nodeList 
			// loop over nodeList and add CSS class 
			nodeListForEach(fields, function(cur) {
				cur.classList.toggle('red-focus'); 
			})

			// 2. Select button to recieve red class
			document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
		},

		getDOMstrings: function() {
			return DOMstrings;
		}

	};
})(); 



// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) { // this module knows about the other two controllers
	// get class of button.  '.' is the class selector

	var setupEventListeners = function() { // want to put all setup calls here.
		var DOM = UICtrl.getDOMstrings(); 

		// replace '.add__btn' class with DOMstrings call
		//document.querySelector('.add__btn').addEventListener('click', ctrlAddItem); 
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 

		document.addEventListener('keypress', function(event) { //only want the return key
			//console.log(event); //keycode identifies the key that we pressed.
			if (event.keyCode === 13 || event.which === 13) { // some older browswers don't use keyCode property, they use the which property.
				ctrlAddItem();
			}
		});

		// Add event handler for delete buttons - use delegation 
		// Add to the element that is the parent of both of these items: '<div class="container clearfix">'
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

		// Add event change listener for + / - 
		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
	};

    var updateBudget = function() {
        
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {

    	// 1. Calculate percentages 
    	budgetCtrl.calculatePercentages();

    	// 2. Read percentages from budget controller 
    	var percentages = budgetCtrl.getPercentages(); 

    	// 3. Update UI 
        UICtrl.displayPercentages(percentages);
    }; 

	var ctrlAddItem = function() {
		var input, newItem;
		// We want 1-5 to happen for the 'Return' key as well
		// 1. Get the field input data 
		input = UICtrl.getInput();

		if (input.description !== "" && !isNaN(input.value && input.value > 0)) { 

			// 2. Add the item to the budget controller 
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			//3.  Add the item to the UI 
			UICtrl.addListItem(newItem, input.type);

			//4. Clear previous item 
			UICtrl.clearFields();

			//5. Calculate and update budget
			updateBudget();

			// 6. Calculate and update percentages
			updatePercentages();
		}
	};

	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID; 
		// find the target element
		// move up the hierarchical parent structure using .parentNode property 
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {
			// returns something like inc-2 or exp-1
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// 1. Delete item from data structure 
			budgetCtrl.deleteItem(type, ID);

			// 2. Delete item from UI
			UICtrl.deleteListItem(itemID);

			// 3. Update and show new budget
			updateBudget();

			// 4. Calculate and update percentages
			updatePercentages();

		}
	};

	// create a public init function.  Since it's public we return it in an object
	return {
		init: function() {
			console.log('application has started');
			UICtrl.displayMonth();
			UICtrl.displayBudget({   // sets all the displays to 0 - allows us to keep html placeholders in index.html
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			})
			setupEventListeners();
		}
	}

})(budgetController, UIController); 

controller.init();
