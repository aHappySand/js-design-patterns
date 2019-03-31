/* Person prototype object */

function clone(object){
    function F(){}
    F.prototype = object;
    return new F;
}

var Person = {
    name: null,
    getName: function(){
        return this.name;
    }
};

/* Author prototype object*/
var Author = clone(Person);
Author.books = [];
Author.getBooks = function(){
    return this.books;
}
console.log(Author.prototype);


var CompoundObject = {
    name: 'default value',
    childObject: {
        bool: true,
        num: 10
    }
}


var compoundObjectClone = clone(CompoundObject);
//下面这个方式修改属性值就不是很好
compoundObjectClone.childObject.num = 5;
//下面这个方法相对就比较好，但是必须知道父类的所有这样的属性及默认值，比较麻烦
compoundObjectClone.childObject = {
    bool: true,
    num: 5
}


//工厂方法
var CompoundFactoryObject = {
    name: 'defult value',
    createChildObject: function(){
        return {
            bool: true,
            num: 10
        };
    }
};
CompoundFactoryObject.childObject = CompoundFactoryObject.createChildObject();

var compFactoryObjClone = clone(CompoundFactoryObject);
compFactoryObjClone.childObject = CompoundFactoryObject.createChildObject();
compFactoryObjClone.childObject.num = 5;

var compFactoryObjClone2 = clone(CompoundFactoryObject);
alert(compFactoryObjClone2.childObject.num);