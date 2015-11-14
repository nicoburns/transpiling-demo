
var object = {
	color: "red",
	getColorNow: function () {
		log(this.color);
	},
	getColorLater: function () {
		setTimeout(function () {
			window.log(this.color);
		}, 500)
	},
	getColorLaterArrow: function () {
		setTimeout(() => {
			console.log ("lalalala");
			log(this.getColorNow());
		}, 500)
	}
}

object.getColorNow();
object.getColorLater();
object.getColorLaterArrow();