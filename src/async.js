
function wait (ms) {
	return new Promise (function (resolve, reject) {
		setTimeout(resolve, ms)
	});
}

async function infiniteLog () {
	let i = 1;
	while(true) {
		await wait (1000);
		log("[" + i + "] Time: " + performance.now());
		i++;
		await wait(500);
		log("Frog");
	}
}

infiniteLog();