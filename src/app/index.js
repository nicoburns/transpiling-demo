
// Enables Generators, and some other ES6 features that require a polyfill
// See https://babeljs.io/docs/usage/polyfill/
//require("babel-polyfill");



var helloWorld = function () {

	this.x = "Hello";
 
	setTimeout(() => {
		console.log(this.x);
	}, 2000);
}

helloWorld();



