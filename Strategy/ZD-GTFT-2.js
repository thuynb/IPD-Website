// JavaScript Document
var ZDGTFT2 = function() {
	Strategy.apply(this, arguments);
};
ZDGTFT2.prototype = Object.create(Strategy.prototype);
ZDGTFT2.prototype.constructor = ZDGTFT2;

ZDGTFT2.prototype.play = function(x1,x2) {
	if (x1.length == 0) return 1;
	var last1 = x1[x1.length-1];
	var last2 = x2[x2.length-1];
	if (last1 == 0 && last2 == 0) {
		var rad = Math.random();
		if (rad < (1/4)) return 1; else return 0;
	}
	
	if (last1 == 1 && last2 == 0) {
		var rad = Math.random();
		if (rad < (1/8)) return 1; else return 0;
	}
	
	return 1;
}

ZDGTFT2.prototype.alias = function() {
	return ("ZD-GTFT-2");
} 

// JavaScript Document