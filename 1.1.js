/** Anim Class **/
var Anim = function(){
	
}

/** 表示方法1 **/
Anim.prototype.start = function(){

};

Anim.prototype.stop = function(){

};

/** 把类的定义封装在一条声明中 **/
Anim.prototype = {
	start2: function(){
	
	},
	stop2: function(){
	
	}
}


/** Usage **/
var myAnim = new Anim();
myAnim.start();

myAnim.stop();

/**************************************************************************/
/* Add a method to the function object that can be used to declare methods */
/** 扩展Function中的方法，用于申明其他方法  **/
Function.prototype.method = function(name, fun){
	this.prototype[name] = fun;
	return this;//返回this,可以被链式调用
};

/* Anim class,with methods created using a convenience method. */

var Anim = function(){
	
};

Anim.method('start', function(){
	
});

Anim.method('stop', function(){
	
});

/** Function.prototype.method 返回this之后，可以链式调用 **/
Anim.method('start', function(){
	
}).method('stop', function(){
	
});

























