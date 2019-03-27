/** 所有对象都是易变的 **/
function displayError(message){
	displayError.numTimesExecuted++;
	alert(message);
};

displayError.numTimesExecuted = 0;


/** 可以对先前定义的类和实例化的对象进行修改 **/
function Person(name, age){
	this.name = name;
	this.age = age;
};

Person.prototype = {
	getName: function(){
		return this.name;
	},
	getAge: function(){
		return this.age;
	}
};

/** 实例化对象 **/

var alice = new Person('Alice', 99);
var bill = new Person('Bill', 20);

/*修改类*/
Person.prototype.getGreeting = function(){
	return 'Hi ' + this.getName() + !'';
};

/*修改实例化对象，bill没有这个方法*/
alice.displayGreeting = function(){
	alert(this.getGreeting());
};


/**内省 introspection：可以在运行时检查对象所具有的属性和方法；
还可以使用这种信息动态化实例类 和 执行其方法（这种技术被称为反射 reflection）**/

/** 1.5 继承：
基于对象的（原型式【prototypal】）继承
模仿基于类的（类式【classical】）继承
**/








