var Interface = function(objName, methods){
	if(arguments.length != 2){
		throw new Error("Interface arguments must be 2.but " 
			+ arguments.length);
	}

	this.name = objName;
	this.methods = [];
	for(var i = 0, len = methods.length; i < len; i++){
		if(typeof methods[i] !== 'string'){
			throw new Error("Interface constructor expects method must to be passed in as a string."
				+ "but " + (typeof methods[i]));
		}
		this.methods.push(methods[i]);
	}
};

// static class method
Interface.ensureImplements = function(object){
	if (arguments.length < 2){
		throw new Error("Function Interface.ensureImplements called with " 
			+ arguments.length + "arguments, but expected at least 2.");
	}

	for(var i =1, len = arguments.length; i < len; i++){
		var interface = arguments[i];
		if(interface.constructor != Interface){
			throw new Error("Function Interface.ensureImplements expects arguments two and "
				+ "above to be instance of Interface. but " 
				+ interface.constructor + "gived");
		}

		for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++){
			var method = interface.methods[j];
			if(!object[method] || typeof object[method] !== 'function'){
				throw new Error("Function Interface.ensureImplements: object "
					+ "dose not implement the " + interface.name 
					+ " interface.method " + method + " was not found");
			}
		}
	}
};


/* Extend function */
function extend(subClass, superClass){
    var F = function(){};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    //添加一个属性，继承的父类原型
    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor){
        superClass.prototype.constructor = superClass;
    }
}
