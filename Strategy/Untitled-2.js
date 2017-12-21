//Abstract class
var Strategy = function() {
	this.x1 = "";
	this.x2 = "";
	
	this.probCC = 1.0;
	this.probDC = 1.0;
	this.probCD = 0.0;
	this.probDD = 0.0;
	this.K = 0.5;
	
	if (this.constructor === Strategy) {
		throw new Error("Can't instantiate abstract class!");
    }
};

Strategy.prototype.receive = function(last1,last2) {
	this.x1 = this.x1 + last1.toString();
	this.x2 = this.x2 + last2.toString();
	this.play(x1,x2);
}

Strategy.prototype.play = function(x1,x2) {
	throw new Error("Abstract method!");
}

Strategy.prototype.newGame = function() {
	this.x1 = "";
	this.x2 = "";
}

Strategy.name = "Abstract Strategy";

/*
Strategy.prototype.updateOppModel = function(prev1,prev2) {
	switch (prev1 + "|" + prev2) {
		case "1|1": probCC = K * probCC + K * last2; break;
		case "1|0": probDC = K * probDC + K * last2; break;
		case "0|1": probCD = K * probCD + K * last2; break;	
		case "0|0": probDD = K * probDD + K * last2; break;
	}
}


switch (last1 + "|" + last2) {
	case "1|1": p = probCC; break;
	case "1|0": p = probDC; break;
	case "0|1": p = probCD; break;	
	case "0|0": p = probDD; break;
}*/




