var clone = function(object){
    var F = function(){};
    F.prototype = object;
    return new F;
}

var Mixi = function(){
    
}
Mixi.prototype = {
    serialize: function(){
        var selize = [];
        for (var key in this){
            serize.push(key + ": " + this[key]);
        }
        return serize;
    }
}

function augment(receivingClass, givingClass){
    if(arguments[2]){
        for(var i =2, len = arguments.length; i < len; i++){
            if(typeof arguments[i] == 'object'){
                for(var method in arguments[i]){
                    if(!(method in receivingClass.prototype[i])){
                        receivingClass.prototype[method] = givingClass.prototype[method];
                    }
                }
            }else if(typeof arguments[i] == 'string'){
                if(!(i in receivingClass.prototype)){
                    receivingClass.prototype[i] = givingClass.prototype[i];
                }
            }
        }
    }else{
        for(var method in givingClass.prototype){
            if(!(method in receivingClass.prototype)){
                receivingClass.prototype[method] = givingClass.prototype[method];
            }
        }
    }
}


var Person = {
    name: null,
    getName:function(){
        return this.name;
    }
};

var Author = clone(Person);
Author.books = [];
Author.getBooks = function (){
    return this.books;
};
// Author没有prototype
augment(Author, Mixi);
