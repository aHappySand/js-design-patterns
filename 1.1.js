/** Anim Class **/
var Anim = function(){
	
}

/** ��ʾ����1 **/
Anim.prototype.start = function(){

};

Anim.prototype.stop = function(){

};

/** ����Ķ����װ��һ�������� **/
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
/** ��չFunction�еķ���������������������  **/
Function.prototype.method = function(name, fun){
	this.prototype[name] = fun;
	return this;//����this,���Ա���ʽ����
};

/* Anim class,with methods created using a convenience method. */

var Anim = function(){
	
};

Anim.method('start', function(){
	
});

Anim.method('stop', function(){
	
});

/** Function.prototype.method ����this֮�󣬿�����ʽ���� **/
Anim.method('start', function(){
	
}).method('stop', function(){
	
});

























