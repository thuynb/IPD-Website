// JavaScript Document
var AIID = function() {
	Strategy.apply(this, arguments);
};
AIID.prototype = Object.create(Strategy.prototype);
AIID.prototype.constructor = AIID;

AIID.prototype.play = function(x1,x2) {
	 return 0;
}

AIID.prototype.alias = function() {
	return ("Always Defect");
} 