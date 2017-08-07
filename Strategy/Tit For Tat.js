// JavaScript Document
var TFT = function() {
	Strategy.apply(this, arguments);
};
TFT.prototype = Object.create(Strategy.prototype);
TFT.prototype.constructor = TFT;

TFT.prototype.play = function(x1,x2) {
	if (x1 == "") return 1;
	return x2[x2.length-1];
}

TFT.prototype.alias = function() {
	return ("Tit For Tat");
} 

