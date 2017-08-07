// JavaScript Document
var Pavlov = function() {
	Strategy.apply(this, arguments);
};
Pavlov.prototype = Object.create(Strategy.prototype);
Pavlov.prototype.constructor = Pavlov;

Pavlov.prototype.play = function(x1,x2) {
	if (x1 == "") return 1;
	if (x2[x2.length-1] == x1[x1.length-1]) return 1; 
	return 0;
}

Pavlov.prototype.alias = function() {
	return ("Pavlov");
} 
