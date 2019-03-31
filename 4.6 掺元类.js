
function clone(object){
    function F(){}
    F.prototype = object;
    return new F;
}


/**
 * 有一种重用代码的方法不需要用到严格的继承。如果想把一个函数用到多个类中，可以通过
  扩充（augmentation）的方式让这些类共享该函数。其实际做法大体为：先创建一个包含各种
  通用方法的类，然后再用它扩充其他类。这种包含通用方法的类被称为掺元类（mixin clas）。
  它们通常不会被实例化或直接调用。其存在的目的只是向其他类提供自己的方法。
 */

/* Mixi class */
var Mixi = function(){};
Mixi.prototype = {
    serialize: function(){
        var output = [];
        for (key in this){
            output.push(key + ': ' + this[key]);
        }
        return output.join(', ');
    }
}

//扩充掺元类中的方法到receivingClass
function augment(receivingClass, givingClass){
    if(arguments[2]){//三个以上参数
        for (var i = 2, len = arguments.length; i < len; i++) {
            var method = arguments[i];
            if(givingClass.prototype[method]){
                receivingClass.prototype[method] = givingClass.prototype[method];
            }
        }
    }else{
        for(var key in givingClass.prototype){
            if(!(key in receivingClass.prototype)){
                receivingClass.prototype[key] = givingClass.prototype[key];
            }
        }
    }
}

/* extend function */

function extend(subClass, superClass){
    //避免创建超类的新实例
    var F = function(){};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}

function Person(name){
    this.name = name;
}

Person.prototype.getName = function(){
    return this.name;
};

/* Class Author */
function Author(name, books){
    Person.call(this, name);
    this.books = books;
}
extend(Author, Person);
Author.prototype.getBooks = function(){
    return this.books;
};
augment(Author, Mixi);