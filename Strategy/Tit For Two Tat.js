// JavaScript Document
var TFTT = function() {
	Strategy.apply(this, arguments);
};
TFTT.prototype = Object.create(Strategy.prototype);
TFTT.prototype.constructor = TFTT;

TFTT.prototype.play = function(x1,x2) {
	if (x1.length < 2) return 1;
	if ((x2[x2.length-1] == 0) && (x2[x2.length-2] == 0)) return 0; 
	return 1;
}

TFTT.prototype.alias = function() {
	return ("Tit For Two Tat");
} 