/* Extend function */
function extend(subClass, superClass){
    var F = function(){};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor){
        superClass.prototype.constructor = superClass;
    }
}


function Person(name){
    this.name = name;
}

Person.prototype.getName = function(){
    return this.name;
};

function Author(name, books){
    Author.superclass.constructor.call(this, name);
    this.books = books;
}
extend(Author, Person);

Author.prototype.getBooks = function(){
    return this.books;
};

Author.prototype.getName = function(){
    //通过调用父类的方法 获取name
    var name = Author.superclass.getName.call(this);
    return name + '，Author of ' + this.getBooks().join(', ');
};





