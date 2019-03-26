/* Class Person */

function Person(name){
    this.name = name;
}

Person.prototype.getName = function(){
    return this.name;
};

/** 原型链 **/
/* Class Author */
function Author(name, books){
    Person.call(this, name);//调用父类的构造方法
    this.books = books;
}

Author.prototype = new Person();//设置原型链
Author.prototype.constructor = Author;//设置Author 构造器
Author.prototype.getBooks = function(){
    return this.books;
};





