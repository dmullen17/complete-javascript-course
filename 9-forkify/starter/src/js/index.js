// Global app controller

/*
Modern JS 
Node.js, npm, jquery

NPM - node package manager - command line interface that allows us to manage packages 

Babel- ES6/ESNext --> babel --> ES5 so all browsers can understand it 

ES6 Modules --> browsers don't suppor this, so we use a module bundler (webpack) --> webpage

you can put this all together using an NPM script to set up the development environment
unix = linux/mac

cd .. --> go to the folder above 

clear --> removes previous output 

touch filename --> create a new file with filename 

cp filename directory --> copy filename to a directory 
ex: cp test.js .. --> copies it to the parent directory 

mv filename directory --> move file to a directory 

rm -r folder --> delete all files in folder recursivley and then delete folder 

open filename 

npm -v --> -v is a flag for version number

open filename --> opens a file using a text editor 
*/


//====================================================================================================


// Create a package.json file using npm 
// npm init 
// it will now ask questions about your project 

// Now add package dependencies 
// npm install webpack --save-dev //adds this as a dependency in the package.json file 
// webpack is a developement tool - so we save it in the dev tools 
// something like jquery is a dependency, so we save it using different syntax 
// npm install jquery --save

// if you run npm install it will grab all dependencies from the package.json file and install them

// uninstall: 
// npm uninstall jquery --save

// global package install: 
// sudo npm install liveserver --global

// live-server in command line --> opens a local server 
// hit ctrl+C to exit from the server


//====================================================================================================

// test that webpack is working 
// we exported 23 from the test.js module 
console.log('hello fuckers!');
import num from './test'; 
const x = 23; 
console.log(`I imported ${num} from another module! Variable x is ${x}`);
// need to add an npm script to our package.json file. 
// add this to package.json file: 
/*  "scripts": {
    "test": "webpack"
  },
*/ 
// Also need to install webpack command line interface 
// 

//====================================================================================================


// Using this API: food2fork.com
// API key: unique key given to a user to track how many requests a user makes
// food2fork key: 65578e2283d1f25a9c7f4a7972cfb6cd
// url https://www.food2fork.com/api/search
/*
import axios from 'axios'; // specify name is it appears in the dependencies

async function getResults(query) {
	// fetch doesn't always work in all browsers 
	// use a library called axios - which also automatically returns json
	const proxy = 'https://cors-anywhere.herokuapp.com/';
	const key = '65578e2283d1f25a9c7f4a7972cfb6cd';
	const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
	console.log(res);
}
getResults();
*/