// JavaScript Document
var MAXALG = 11;
var noise;
var iterations;
var deviation;
var generations;
var totalWeight;
var ratio;
var initAgent;
var listALG = [];
var availableALG = [];
var sum = [];
var weight = [];
var exportData = [];
var exportHeadData;
var exportGeneration = [];

//Abstract class
var Strategy = function() {
	if (this.constructor === Strategy) {
		throw new Error("Can't instantiate abstract class!");
    }
};

Strategy.prototype.play = function(x1,x2) {
		throw new Error("Abstract method!");
}
Strategy.name = "Abstract Strategy";



function round(i) {
	return Math.round(i * 100) / 100;
}

function init() {   
	exportData = [];
	exportGeneration = [];
	listALG = []; weight = [];	data = { labels: [], datasets: [] }; 
	totalWeight = 0;
	exportHeadData = ["Noise: ",noise, "Iteration: ",iterations,"Generations: ",generations,"Agents per Strategy: ",initAgent];
	exportData[exportData.length] = exportHeadData;
}

function readDataConsole() {
	
	var fs = require('fs');
	var contents = fs.readFileSync('input.json', 'utf8');
	inputValue = JSON.parse(contents);
	
	noise = inputValue.noise;
	iterations = inputValue.iterations;
	generations = inputValue.generations;
	deviation = inputValue.deviation;
	ratio = inputValue.ratio;
	
	for (var i=0;i<inputValue.listALG.length;i++) {
	var fs = require('fs');
	eval(fs.readFileSync('./Strategy/'+inputValue.listALG[i].name+'.js')+'');
}
	
	availableALG = [new TFT(), new Pavlov(), new GTFT(), new FBF(), new AIIC(), new AIID(),  new Random(), new TFTT(), new Grim(), new ZDExtortion2(), new ZDGTFT2()];
	
	for (var i=0;i<MAXALG;i++) {
			sum[sum.length] = 0;
			listALG[listALG.length] = availableALG[i];
			weight[weight.length] = inputValue.listALG[i].weight;
			totalWeight += 10;
	}
}

	
function simulation() { 
	var totalSum;
	var rad;
	var cnt = [];
	var sum2 = [];
	
	for (var i=0;i<generations;i++) {
		for (var j=0;j<listALG.length;j++) sum[j]=0;
		
		var exportG = ["Generation " + (i+1)];
		exportData[exportData.length] = exportG;
		var exportAlias = [];
		exportAlias[0] = " / ";
		for (var j=0;j<listALG.length;j++) exportAlias[j+1] = listALG[j].alias();
		exportData[exportData.length] = exportAlias;
		
		generation();
		
		totalSum = 0;
		for (var j=0;j<listALG.length;j++) totalSum += sum[j];
		for (var j=0;j<listALG.length;j++) sum2[j] = sum[j];
		for (var j=1;j<listALG.length;j++) sum[j] += sum[j-1];	
		
		//Competitive Regenerate
			for (var j=0;j<listALG.length;j++) cnt[j] = 0;
			for (var j=0;j<listALG.length;j++) {
				for (var j1=0;j1<weight[j];j1++) {
					rad = Math.random();
					if (rad < ratio) {
							var rad2 = Math.random() * totalSum;
							cnt[j]--;
							var k = 0;
							while (sum[k] < rad2) k++;
							cnt[k]++;
					}
				}
			for (var j=0;j<listALG.length;j++) weight[j] = parseInt(weight[j]) + parseInt(cnt[j]);
		}
		
	}	
}

function generation() {
	var result = [];
	var tmp = [];
	var exportGen = [];
	for (var i=0;i<listALG.length;i++) {
		
		var exportGame = new Array(listALG.length);
		exportGame[0] = listALG[i].alias();
		for (var j=i;j<listALG.length;j++) 
			{
			result[1] = 0; result[2] = 0;
			for (var i1=0;i1<weight[i];i1++) {
				if (i!=j) {
					for (var j1=0;j1<weight[j];j1++) {
						tmp = game(i,j);
						result[1] += tmp[1];
						result[2] += tmp[2];
						exportGen[exportGen.length] = [listALG[i].alias() + " (" + i1 + ")",listALG[j].alias() + " (" + j1 + ")",tmp[1],tmp[2],tmp[3],tmp[4]];
					}	
				}
				else {
					for (var j1=i1+1;j1<weight[i];j1++) {
						tmp = game(i,j);
						result[1] += tmp[1];
						result[2] += tmp[2];
						exportGen[exportGen.length] = [listALG[i].alias() + " (" + i1 + ")",listALG[j].alias() + " (" + j1 + ")",tmp[1],tmp[2],tmp[3],tmp[4]];
					}
				}
			}
			sum[i] += parseInt(result[1]);
			sum[j] += parseInt(result[2]);
			var noOfMatches = i!=j ? weight[i]*weight[j] : weight[i]*(weight[i]-1) / 2;
			exportGame[j+1] = round(result[1]) + " / " + round(result[2]) + " (" + noOfMatches + " Games)";
		}
		exportData[exportData.length] = exportGame;
	}
	exportGeneration[exportGeneration.length] = exportGen;
	for (var i=0;i<listALG.length;i++)
	if (weight[i]>0) sum[i] /= weight[i];
}

function changeToText(x) {
	var res = "";
	for (var i=0;i<x.length;i++)
		res += ((x[i] == "1") ? "C" : "D");
	return res;
}

function game(x,y) {
	var x1 = "";
	var x2 = "";
	var score = [0,0,0,"",""];
	var choice1, choice2, rad;
	for (var i=0;i<iterations;i++) {
		 choice1 = listALG[x].play(x1,x2);
		 choice2 = listALG[y].play(x2,x1);
		 
		 //Noise
		 rad = Math.floor((Math.random() * 100) + 1);
		 if (noise >= rad) choice1 = 1 - choice1;
		 rad = Math.floor((Math.random() * 100) + 1);
		 if (noise >= rad) choice2 = 1 - choice2;
		 
		 //Add score
		 switch (choice1 + "|" + choice2) {
		 	case "1|1": score[1] += 3;	score[2] += 3; break;
		 	case "1|0": score[1] += 0;	score[2] += 5; break;
		 	case "0|1": score[1] += 5;	score[2] += 0; break;
		 	case "0|0": score[1] += 1;	score[2] += 1; break;
		 }
		 
		 //Add to choice;
		 x1 += choice1.toString();
		 x2 += choice2.toString();
	}
	score[3] = changeToText(x1);
	score[4] = changeToText(x2);
	return score;
}

function exportSimulation() {
	var csvContent = "";
	
	exportData.forEach(function(infoArray, index){
		dataString = infoArray.join(",");
		csvContent += dataString +  "\n";
	});

	var fs = require('fs');
	fs.writeFile('Simulation Result.csv', csvContent, 'utf8', function (err) {});
	
	for (var i=1;i<=generations;i++) {
		var csvContent = exportHeadData +  "\n";
		
		var data = exportGeneration[(i-1)];
		data.forEach(function(infoArray, index){
			dataString = infoArray.join(",");
			csvContent += dataString +  "\n";
		});
		
		var fs = require('fs');
		fs.writeFile('Generation '+i+'.csv', csvContent, 'utf8', function (err) {});
	}
	

}
 
init();
readDataConsole();
simulation();
//console.log(exportData);
exportSimulation();