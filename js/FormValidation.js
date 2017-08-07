
function changeagent() {
	var newVal = document.form1.agents.value;
	var algList = document.getElementsByName("check");
	for (var i=0;i<algList.length;i++) {
		algList[i].value = newVal;
	}
}

function changeratio() {
	if (document.getElementById("mode2").checked == true) document.getElementById("ratio").readOnly = false;
	else document.getElementById("ratio").readOnly = true;
}

function changepreset() {
	var pNoise = document.getElementById("noise");
	var pIteration = document.getElementById("iterations");
	var pDeviation = document.getElementById("deviation");
	var pGeneration = document.getElementById("generations");
	var pAgent = document.getElementById("agents");
	
	if (document.getElementById("preset0").checked == true)  {
		pNoise.readOnly = true;
		pNoise.value = 0;
		pIteration.readOnly = true;
		pIteration.value = 200;
		pDeviation.readOnly = true;
		pDeviation.value = 10;
		pGeneration.readOnly = true;
		pGeneration.value = 10;
		pAgent.readOnly = true;
		pAgent.value = 10;
		document.getElementById("mode1").checked = false;
		document.getElementById("mode2").checked = false;
		document.getElementById("mode0").checked = true;
		$("#lmode1").removeClass("active");
		$("#lmode2").removeClass("active");
		$("#lmode0").addClass("active");
	}
	
	if (document.getElementById("preset1").checked == true)  {
		pNoise.readOnly = true;
		pNoise.value = 0;
		pIteration.readOnly = true;
		pIteration.value = 200;
		pDeviation.readOnly = true;
		pDeviation.value = 10;
		pGeneration.readOnly = true;
		pGeneration.value = 10;
		pAgent.readOnly = true;
		pAgent.value = 10;
		document.getElementById("mode0").checked = false;
		document.getElementById("mode1").checked = false;
		document.getElementById("mode2").checked = true;
		$("#lmode0").removeClass("active");
		$("#lmode1").removeClass("active");
		$("#lmode2").addClass("active");
	}
	
	if (document.getElementById("preset2").checked == true)  {
		pNoise.readOnly = true;
		pNoise.value = 10;
		pIteration.readOnly = true;
		pIteration.value = 200;
		pDeviation.readOnly = true;
		pDeviation.value = 10;
		pGeneration.readOnly = true;
		pGeneration.value = 10;
		pAgent.readOnly = true;
		pAgent.value = 10;
		document.getElementById("mode0").checked = false;
		document.getElementById("mode1").checked = false;
		document.getElementById("mode2").checked = true;
		$("#lmode0").removeClass("active");
		$("#lmode1").removeClass("active");
		$("#lmode2").addClass("active");
	}
	
	if (document.getElementById("preset3").checked == true)  {
		pNoise.readOnly = true;
		pNoise.value = 10;
		pIteration.readOnly = true;
		pIteration.value = 200;
		pDeviation.readOnly = true;
		pDeviation.value = 10;
		pGeneration.readOnly = true;
		pGeneration.value = 10;
		pAgent.readOnly = true;
		pAgent.value = 1;
		document.getElementById("mode0").checked = false;
		document.getElementById("mode1").checked = false;
		document.getElementById("mode2").checked = true;
		$("#lmode0").removeClass("active");
		$("#lmode1").removeClass("active");
		$("#lmode2").addClass("active");

	}
	
	if (document.getElementById("preset4").checked == true)  {
		pNoise.readOnly = false;
		pIteration.readOnly = false;
		pDeviation.readOnly = false;
		pGeneration.readOnly = false;
		pAgent.readOnly = false;
	}
	changeratio();
	changeagent();
}

function validateForm() {
	var alertMsg = "";
	if (noise == "") alertMsg += "Please input Noise!\n"; 
	else if (!Number.isInteger(parseInt(noise,10))) 
		alertMsg += "Incorrect value of Noise!\n";
	else if (noise > 100) 
		alertMsg += "Incorrect value of Noise!\n";
		
	if (iterations == "") alertMsg += "Please input Iteration!\n"; 
	else if (!Number.isInteger(parseInt(iterations,10))) 
		alertMsg += "Incorrect value of Iteration!\n";
		
	if (deviation == "") alertMsg += "Please input Deviation!\n"; 
	else if (!Number.isInteger(parseInt(deviation,10))) 
		alertMsg += "Incorrect value of Deviation!\n";
	else if (deviation > 100) 
		alertMsg += "Incorrect value of Deviation!\n";
		
	if (generations == "") alertMsg += "Please input Generation!\n"; 
	else if (!Number.isInteger(parseInt(generations,10))) 
		alertMsg += "Incorrect value of Generation!\n";
	
		
	if (alertMsg == "") return true;
	alert(alertMsg); return false;
}

// JavaScript Document