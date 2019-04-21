window.DED = window.DED || {};
DED.util = DED.util || {};
DED.util.Observer = function(){
	this.fns = [];
};

DED.util.Observer.prototype = {
	subscribe: function(fn){
		this.fns.push(fn);
	},
	unsubscribe: function(fn){
		this.fns = this.fns.filter(function(el){
			if(el !== fn){
				return el;
			}
		});
	},
	fire: function(o){
		this.fns.forEach(function(el){
			el(o);
		});
	}
};