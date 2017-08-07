// JavaScript Document
var FBF = function() {
	Strategy.apply(this, arguments);
};
FBF.prototype = Object.create(Strategy.prototype);
FBF.prototype.constructor = TFT;

FBF.prototype.play = function(x1,x2) {
	if (x1.length == 0) return 1;
	if (x1[x1.length-1] == 1 && x2[x2.length-1] == 0) return 0;
	return 1;
}

FBF.prototype.alias = function() {
	return ("Firm But Fair");
} 

