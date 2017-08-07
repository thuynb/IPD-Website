// JavaScript Document
var GTFT = function() {
	Strategy.apply(this, arguments);
};
GTFT.prototype = Object.create(Strategy.prototype);
GTFT.prototype.constructor = TFT;

GTFT.prototype.play = function(x1,x2) {
	if (x1.length == 0) return 1;
	if (x2[x2.length-1] == 0) {
		 rad = Math.random();
	 	if (rad < 0.1) return 1;
	}
	return x2[x2.length-1];
}

GTFT.prototype.alias = function() {
	return ("Generous Tit For Tat");
} 

// JavaScript Document