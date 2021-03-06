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
	return true;
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


var DED = window.DED || {};
DED.util = DED.util || {};
DED.util.Event = DED.util.Event || {};
DED.util.Event = {
	getEvent: function(e){
		return e || window.event;
	},
	getTarget: function(e){
		return e.target || e.srcElement;
	},
	/**
	 * 中止事件沿DOM树向上冒泡的传播过程
	 */
	stopPropagation: function(e){
		if(e.stopPropagation){//W3 interface
			e.stopPropagation();
		}else{
			e.cancelBubble = true;//IE‘s interface
		}
	},
	/**
	 * 阻止浏览器针对一个事件的默认行为
	 * 		可以防止对连接的点击导致浏览器导航到一个新的页面
	 *		可以阻止表单的提交
	 */
	preventDefault: function(e){
		if(e.preventDefault){//W3
			e.preventDefault();
		}else{
			e.returnValue = false;//IE
		}
	},
	stopEvent: function(e){
		DED.util.stopPropagation();
		DED.util.preventDefault();
	}
};

//设置样式
function setStyle(ids, prop, val){
	if(typeof ids == 'string'){
		ids = [ids];
	}
	for(var i = 0, len = ids.length; i < len; i++){
		document.getElementById(ids[i]).style[prop] = val;
	}
}

function setCSS(ids, styles){
	if(typeof ids == 'string'){
		ids = [ids];
	}
	for(var prop in styles){
		if(!styles.hasOwnProperty(prop)) continue;
		setStyle(ids, prop, styles[prop]);
	}
}
function addEvent(elem, evt, callback){
    if(window.addEventListener){
        elem.addEventListener(evt, callback, false);
    }else if(window.attachEvent){
        elem.attachEvent('on' + evt, callback);
    }else{
        elem['on' + evt] = callback;
    }
}

function setCookie(cname, cvalue, exdays){
    exdays = exdays||2;
    expires = "";
    if(exdays){
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        expires = "expires="+d.toGMTString()+";path=/";
    }
    document.cookie = cname+"="+cvalue+";" + expires;
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0, len = ca.length; i<len; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { 
            return c.substring(name.length,c.length);
        }
    }
    return "";
}