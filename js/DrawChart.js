function initTable(x,y){
	var myTable = document.getElementById('result');
	if (myTable != null) myTable.parentNode.removeChild(myTable);  
	
    var tbl  = document.createElement('table');
	tbl.id = "result";
	tbl.className = "table table-striped";
    tbl.style.width  = '100%';
	var header = tbl.createTHead();
	var row = header.insertRow();
	var th = row.insertCell();
	th.innerHTML = "Strategy";
	for (var j=1;j<=y;j++) {
		var th = row.insertCell();
		th.innerHTML = "<a id = 'a"+ j + "'> Generation " + j + "</a>";
	}
	

    for(var i=1;i<=x;i++){
        var tr = tbl.insertRow();
        for(var j=0;j<=y;j++){
            var td = tr.insertCell();
			if (i>0 && j == 0) td.appendChild(document.createTextNode(listALG[i-1].alias()));
        }
    }
    document.body.appendChild(tbl);
	    
}

function drawChart() {
	var canvas = document.getElementById("myChart");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	myChart = new Chart(ctx, {
    	type: 'line',
    	data: data,
		options: {
  			scales: {
    			yAxes: [{
      			scaleLabel: {
        			display: true,
        			labelString: 'Score'
      				}
    			}],
				xAxes: [{
      			scaleLabel: {
        			display: true,
        			labelString: 'Generation'
      				}
    			}]
  			}     
		}
	});
}


function initChart() {
	for (var i=1;i<=generations;i++) {
		data.labels[data.labels.length] = i.toString(); 
	}
	
	for (var i=0;i<listALG.length;i++) {
		data.datasets[data.datasets.length] = {
            label: listALG[i].alias(),
            fill: false,
            lineTension: 0.1,
            backgroundColor: color[i],
            borderColor: color[i],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: color[i],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: color[i],
            pointHoverBorderColor: color[i],
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
        };
	}
}