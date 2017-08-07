function addCustom(x) {
	if (x == 0) {
		var alias = document.getElementById("customName").value;	
		var code = document.getElementById("customCode").value;
		var desc =  document.getElementById("customDesc").value;
		newCustomStrategy(alias,code,desc);
	}
	else {
		var files = document.getElementById("customFile").files;
		for (var i=0;i<files.length;i++) {
			(function(file) {
			var fr = new FileReader();
			fr.onload = function() {
				var alias = file.name.split('.').shift();
				var code = fr.result;
				var desc = 'Strategy added by file.';								
				newCustomStrategy(alias,code,desc);
			};
			fr.readAsText(files[i]);
			})(files[i]);
		}
	}
}

function newCustomStrategy(alias,code,desc) {
	var td = document.getElementById("strategies");
	var initNo = document.form1.agents.value;
	var name = "strategy" + MAXALG;
	newFunction = function() {
		Strategy.apply(this, arguments);
	};
	newFunction.prototype = Object.create(Strategy.prototype);
	newFunction.prototype.constructor = newFunction;

	newFunction.prototype.play = new Function("x1","x2",code);

	newFunction.prototype.alias = function() {
		return alias;
	} 
	
	availableALG[MAXALG] = new newFunction();
	
	var insertHTML = '<div class="row"><div class="col-md-1"><input type="text" name="check" id="check' + MAXALG + '" class="form-control" value="10" /></div>' + '<label>'+ alias + ':  </label> ' + desc + '</div>';
	
	 	MAXALG++;
	td.insertAdjacentHTML('beforeEnd',insertHTML);
}
// JavaScript Document