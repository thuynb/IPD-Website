// JavaScript Document
var MAXALG = 11;
var noise;
var iterations;
var deviation;
var generations;
var totalWeight;
var delay;
var ratio;
var initAgent;
var listALG = [];
var availableALG = [];
var sum = [];
var matchSum = [];
var weight = [];
var exportData = [];
var exportHeadData;
var exportGeneration = [];
var color = ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","pink","maroon","teal","navy"];
var myChart;
var data = {
    labels: [],
    datasets: []
};

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




document.addEventListener('DOMContentLoaded', function() {
   availableALG = [new TFT(), new Pavlov(), new GTFT(), new FBF(), new AIIC(), new AIID(),  new Random(), new TFTT(), new Grim(), new ZDExtortion2(), new ZDGTFT2()];
}, false);

function main() {
	init();
	readDataHTML();
	if (validateForm()) {	
		initTable(listALG.length,generations);
		initChart();
		simulation();
		drawChart();
		exportResult();
	}
}

function round(i) {
	return Math.round(i * 100000) / 100000;
}

function init() {   
	if (myChart != null) myChart.destroy();
	exportData = [];
	exportGeneration = [];
	listALG = []; weight = [];	data = { labels: [], datasets: [] }; 
	totalWeight = 0;
	exportHeadData = ["Noise: ",noise,"Generations: ",generations,"Agents per Strategy: ",initAgent];
	exportData[exportData.length] = exportHeadData;
}

function readDataHTML() {
	noise = document.form1.noise.value;
	iterations = document.form1.iterations.value;
	generations = document.form1.generations.value;
	deviation = document.form1.deviation.value;
	ratio = document.form1.ratio.value;
	delay = document.form1.delay.value;
	
	var algList = document.getElementsByName("check");
	for (var i=0;i<MAXALG;i++) 
		if (algList[i].value != 0) {
			sum[sum.length] = 0;
			matchSum[matchSum.length] = 0;
			listALG[listALG.length] = availableALG[i];
			weight[weight.length] = parseInt(algList[i].value)
			totalWeight += parseInt(algList[i].value);
		}
}
	
function simulation() { 
	var totalSum;
	var rad;
	var cnt = [];
	var sum2 = [];
	var myTable = document.getElementById('result');
	
	for (var i=0;i<generations;i++) {
		for (var j=0;j<listALG.length;j++) sum[j]=0;
		for (var j=0;j<listALG.length;j++) matchSum[j]=0;
					
		var exportG = ["Generation " + (i+1) + generation()];
		exportData[exportData.length] = exportG;
		var exportAlias = [];
		exportAlias[0] = " / ";
		for (var j=0;j<listALG.length;j++) exportAlias[j+1] = listALG[j].alias();
		exportData[exportData.length] = exportAlias;
		
		totalSum = 0;
		for (var j=0;j<listALG.length;j++) totalSum += sum[j];
		for (var j=0;j<listALG.length;j++) sum2[j] = sum[j];
		for (var j=1;j<listALG.length;j++) sum[j] += sum[j-1];
	
		//Random Regenerate
		if (document.getElementById("mode1").checked == true) {
			for (var j=0;j<listALG.length;j++) weight[j] = 0;
			for (var j=0;j<totalWeight;j++) {
				rad = Math.random() * totalSum;
				var k = 0;
				while (sum[k] < rad) k++;
				weight[k]++;
				}
		}
		
		//Competitive Regenerate
		else {
			if (document.getElementById("mode0").checked == true) ratio = 0;
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
			}
			for (var j=0;j<listALG.length;j++) weight[j] = parseInt(weight[j]) + parseInt(cnt[j]);
		}
		
		//Extract value to table & chart
		for (var j=0;j<listALG.length;j++) {
			myTable.rows[j+1].cells[i+1].innerHTML = "Score: "+ round(sum2[j]) + "</br>Agents: " + weight[j];
			if (document.getElementById("chart1").checked == true) {
				data.datasets[j].data[data.datasets[j].data.length] = weight[j];
			}
			else {
				data.datasets[j].data[data.datasets[j].data.length] = sum2[j];
			}
		}
		
	}	
}

function changeToText(x) {
	var res = "";
	for (var i=0;i<x.length;i++)
		res += ((x[i] == "1") ? "C" : "D");
	return res;
}

function generation() {
	var result = [];
	var tmp = [];
	var exportGen = [];
	var deviated_iter = parseInt(iterations) + Math.round(deviation * iterations * (Math.random()*2 - 1) / 100);
	for (var i=0;i<listALG.length;i++) {
	  
		var exportGame = new Array(listALG.length);
		exportGame[0] = listALG[i].alias();
		for (var j=i;j<listALG.length;j++) 
			{
			result[1] = 0; result[2] = 0;
			for (var i1=0;i1<weight[i];i1++) {
				if (i!=j) {
					for (var j1=0;j1<weight[j];j1++) {
						tmp = game(i,j,deviated_iter);
						result[1] += tmp[1];
						result[2] += tmp[2];
						exportGen[exportGen.length] = [listALG[i].alias() + " (" + i1 + ")",listALG[j].alias() + " (" + j1 + ")",tmp[1],tmp[2],tmp[3],tmp[4]];
					}	
				}
				else {
					for (var j1=i1+1;j1<weight[i];j1++) {
						tmp = game(i,j,deviated_iter);
						result[1] += tmp[1];
						result[2] += tmp[2];
						exportGen[exportGen.length] = [listALG[i].alias() + " (" + i1 + ")",listALG[j].alias() + " (" + j1 + ")",tmp[1],tmp[2],tmp[3],tmp[4]];
					}
				}
			}
			var noOfMatches = i!=j ? weight[i]*weight[j] : weight[i]*(weight[i]-1) / 2;
			if (noOfMatches) {
				sum[i] += parseInt(result[1]) / deviated_iter;
				sum[j] += parseInt(result[2]) / deviated_iter;
				matchSum[i] += noOfMatches;
				matchSum[j] += noOfMatches;
			}
			exportGame[j+1] = result[1] + " / " + result[2] + " (" + noOfMatches + " Games)";
		}
		exportData[exportData.length] = exportGame;
	}
	exportGeneration[exportGeneration.length] = exportGen;
	for (var i=0;i<listALG.length;i++) 
		if (matchSum[i]>0) sum[i] /= matchSum[i];
 	return deviated_iter;
}

function game(x,y,deviated_iter) {
	var x1 = "";
	var x2 = "";
	var x1delayed = "";
	var x2delayed = "";
	var score = [0,0,0,"",""];
	var choice1, choice2, rad;
	for (var i=0;i<deviated_iter;i++) {
		 choice1 = listALG[x].play(x1delayed,x2delayed);
		 choice2 = listALG[y].play(x2delayed,x1delayed);
		 
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
		 if (i>=delay) {
			 x1delayed += x1[i-delay];
			 x2delayed += x2[i-delay];
		 }
	}
	score[3] = changeToText(x1);
	score[4] = changeToText(x2);
	return score;
}

function exportSimulation() {
	var csvContent = "data:text/csv;charset=utf-8,";
	
	exportData.forEach(function(infoArray, index){
		dataString = infoArray.join(",");
		csvContent += dataString +  "\n";
	});

	var encodedUri = encodeURI(csvContent);
	var downloadLink = document.createElement("a");
	downloadLink.href = encodedUri;
	downloadLink.download = "IPD Simulation.csv";

	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}