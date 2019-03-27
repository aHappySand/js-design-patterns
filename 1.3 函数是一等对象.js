/** 匿名函数1 **/

(function(){
	var foo = 20;
	var bar = 2;
	alert(foo*bar);
})();

/** 匿名函数2 **/
(function(foo, bar){
	alert(foo*bar);
})(10, 2);

/** 匿名函数3 **/
var baz = (function(foo, bar){
	return foo*bar;
})(10, 2);


/** 闭包closure： 收到保护的变量空间，由内嵌函数生成
函数级的作用域：在函数内部声明的变量在函数外部不能被访问
**/

var baz;
(function(){
	var foo = 10;
	var bar = 2;
	baz = functon(){
		return foo * bar;
	}
});

baz();//baz可以访问foo，bar
