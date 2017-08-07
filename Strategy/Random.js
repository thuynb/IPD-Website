// JavaScript Document
var Random = function() {
	Strategy.apply(this, arguments);
};
Random.prototype = Object.create(Strategy.prototype);
Random.prototype.constructor = Random;

Random.prototype.play = function(x1,x2) {
	 rad = Math.random();
	 if (rad < 0.5) return 1;
	 return 0;
}

Random.prototype.alias = function() {
	return ("Random");
} 
