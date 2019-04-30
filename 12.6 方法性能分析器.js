/* MethodProfiler class. */
var MethodProfiler = function(componet){
	this.componet = componet;
	this.times = {};

	for(var key in this.componet){
		//Ensure that the property is a function
		if(typeof this.componet[key] !== 'function'){
			continue;
		}

		//Add the method
		var that = this;
		(function(methodName){
			that[methodName] = function(){
				that.startTimer(methodName);
				var returnValue = that.componet[methodName].apply(that.componet, arguments);
				that.displayTime(methodName, that.getElaspedTime(methodName));
				return returnValue;
			};
		})(key);
	}
};

MethodProfiler.prototype = {
	startTimer: function(methodName){
		this.times[methodName] = (new Date()).getTime();
	},
	getElaspedTime: function(methodName){
		return (new Date()).getTime() - this.times[methodName];
	},
	displayTime: function(methodName, time){
		console.log(methodName + " run time:" + time + ' ms');
	}
};
