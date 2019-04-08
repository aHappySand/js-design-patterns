Function.prototype.method = function(name, fn){
    this.prototype[name] = fn;
    return this;
};

(function(){
	function _$(els){
        this.elements = [];
        this.length = 0;
        for (var i = 0, len = els.length; i < len; i++){
            var element = els[i];
            if(typeof element === 'string'){
                element = document.getElementById(element);
            }
            this.elements.push(element);
            this.length++;
        }
        
    }
    /**
     * Events
     		addEvent
     		getEvent
     */
    _$.method('each', function(fn){
    	for (var i = 0; i < this.length; i++) {
    		fn.call(this, this.elements[i]);
    	}
    	return this;
    }).
    method('append', function(el){
    	this.each(function(par){
    		par.appendChild(el);
    	});
    }).
    method('addEvent', function(type, fn){
    	var add = function(el){
    		if(window.addEventListener){
    			el.addEventListener(type, fn, false);
    		}else if(window.attachEvent){
    			el.attachEvent('on'+type, fn);
    		}
    	}
    	this.each(function(el){
    		add(el);
    	});
    	return this;
    }).
    method('getEvent', function(e){
    	// getEventListeners();
    }).
    /**
     * DOM
     		addClass
     		removeClass
     		replaceClass
     		hasClass
     		getStyle
     		setStyle
     */
	 method('addClass', function(className){
	 	this.each(function(el){
	 		if(el.className.indexOf(className)==-1){
	 			el.className += " " + className;
	 		}
	 	});
	 	return this;
	 }).
	 method('removeClass', function(className){
	 	this.each(function(el){
	 		el.className = el.className ? el.className.replace(className, '') : '';
	 	});
	 	return this;
	 }).
	 method('replaceClass', function(oldClass, newClass){
		this.each(function(el){
	 		el.className = el.className ? el.className.replace(className, newClass) : newClass;
	 	});
	 	return this;
	 }).
	 method('hasClass', function(className){
	 	var has = [];
	 	this.each(function(el){
	 		has.push((el.className ? el.className.indexOf(className) != -1 : false));
	 	});
	 	return has.length == 1 ? has[0] : has;
	 }).
	 method('getStyle', function(prop){
	 	var style = [];
	 	this.each(function(el){
	 		var _s = el.style[prop];
	 		style.push(_s);
	 	});
	 	return style.length == 1 ? style[0] : style;
	 }).
	 method('setStyle', function(prop, val){
	 	this.each(function(el){
	 		el.style[prop] = val;
	 	});
	 	return this;
	 }).
	 /**
	  * Ajax
	  		load. Fetches an HTML fragment from a URL and inserts it into an element
	  */
	 method('load', function(uri, method){

	 });

	// window.$ = function(){
	// 	return new _$(arguments);
	// }; 

	/**
	为了避免名称重复，添加一个安装器
	使用:
		 installHelper(window, '$');
		 $('example').show();
	 */
	window.installHelper = function(scope,interface){
		scope[interface] = function(){
			return new _$(arguments);
		};
	};
})();

/**
 * 另外一种更复杂的方式
 */
//define a namespace without overwriting it if it already exists.
/*
window.com = window.com || {};
com.example = com.example || {};
com.example.util = com.example.util || {};

installHelper(com.example.util, 'get');
*/