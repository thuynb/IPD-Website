 // JavaScript Document
var Grim = function() {
	Strategy.apply(this, arguments);
};
Grim.prototype = Object.create(Strategy.prototype);
Grim.prototype.constructor = Grim;

Grim.prototype.play = function(x1,x2) {
	var notDefected = 1;
	for (var i=0;i<x1.length;i++) 
		if (x1[i]==1 && x2[i]==0) {
			notDefected = 0;
			break;
		}
	return notDefected;
}

Grim.prototype.alias = function() {
	return ("Grim/Spite");
} 

