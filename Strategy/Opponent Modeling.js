const K = 0.5;
var probCC;
var probCD;
var probDC;
var probDD;
var prev1;
var prev2;

switch (prev1 + "|" + prev2) {
	case "1|1": probCC = K * probCC + K * last2; break;
	case "1|0": probDC = K * probDC + K * last2; break;
	case "0|1": probCD = K * probCD + K * last2; break;	
	case "0|0": probDD = K * probDD + K * last2; break;
}

switch (last1 + "|" + last2) {
	case "1|1": p = probCC; break;
	case "1|0": p = probDC; break;
	case "0|1": p = probCD; break;	
	case "0|0": p = probDD; break;
}