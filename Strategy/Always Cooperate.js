// JavaScript Document
var AIIC = function() {
	Strategy.apply(this, arguments);
};
AIIC.prototype = Object.create(Strategy.prototype);
AIIC.prototype.constructor = AIIC;

AIIC.prototype.play = function(x1,x2) {
	 return 1;
}

AIIC.prototype.alias = function() {
	return ("Always Cooperate");
} 