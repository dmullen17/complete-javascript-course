///////////////////////////////////////
// Lecture: Hoisting

calculateAge(1990);

function calculateAge(year) {
    console.log(2018 - year);
}

// Hoisting - global function execution happens first. You can define functions after you use them 
// hoisting doesn't work for a function expression (i.e.) declaring it a variable with 'var'

//this doesn't work 
//x(1990)
var x = function(year) {
    console.log(2018 - year);
}


///////////////////////////////////////
// Lecture: Scoping


// First scoping example
// lexical scoping - each function has access to the outer (parent) scope

var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









