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
    console.log(this);
    debugger;
    return this.books;
};






