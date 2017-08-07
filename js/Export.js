function exportResult() {
	for (var i=1;i<=generations;i++) {
		var generationLink = document.getElementById("a"+i);
		var csvContent = "data:text/csv;charset=utf-8," + exportHeadData +  "\n";
		
		var data = exportGeneration[(i-1)];
		data.forEach(function(infoArray, index){
			dataString = infoArray.join(",");
			csvContent += dataString +  "\n";
		});
		
		var encodedUri = encodeURI(csvContent);
		generationLink.href = encodedUri;
		generationLink.download = "Generation" + i + ".csv";
	}
}
// JavaScript Document