// JavaScript Document
var RTFT = function() {
	Strategy.apply(this, arguments);
};
RTFT.prototype = Object.create(Strategy.prototype);
RTFT.prototype.constructor = RTFT;

RTFT.prototype.play = function(x1,x2) {
	if (x1 == "") return 0;
	if (x2[x2.length-1] == 0) return 1; else return 0;
}

RTFT.prototype.alias = function() {
	return ("Reverse Tit For Tat");
} 

// JavaScript Document