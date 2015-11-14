
// Enables Generators, and some other ES6 features that require a polyfill
// See https://babeljs.io/docs/usage/polyfill/
//require("babel-polyfill");



var helloWorld = function () {

	this.x = "Hello";
 
	setTimeout(() => {
		console.log(this.x);
	}, 2000);
}

function wait (ms) {
	return new Promise ((resolve, reject) => setTimeout(resolve, ms))
}

helloWorld();

// async function infiniteLog () {
// 	let i = 1;
// 	while(true) {
// 		await wait (1000);
// 		log("[" + i + "] Time: " + performance.fnow());
// 		i++;
// 		await wait(500);
// 		log("Frog");
// 	}
// }

// infiniteLog();

