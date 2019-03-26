var Book = (function(){

    var MAX_INTERFACE = 50;
    /**
     * 私有静态属性或方法只在内存中存一份
     * 可以从构造器内部访问
     * 不能访问构造器中的私有属性或方法
     * 不访问适合实例数据的方法适合被设计为静态方法
     */
    //私有静态属性
    var numOfBooks = 0;
    //私有静态方法
    function checkIsbn(isbn){
        return true;
    }

    var ctor = function(newIsbn, newTitle, newAuthor){
         //私有属性
        var isbn, title, author;

        this.getIsbn = function(){
            return isbn;
        };

        this.setIsbn = function(newIsbn){
            if(!checkIsbn(newIsbn)) throw new Error('Book:invalied ISBN');
            isbn = newIsbn;
        };

        this.getTitle = function(){
            return title;
        };
        this.setTitle = function(newTitle){
            title = newTitle || 'No title specified';
        }
        this.getAuthor = function(){
            return author;
        };
        this.setAuthor = function(newAuthor){
            author = newAuthor || 'No Author specified';
        }

        numOfBooks++;
        if(numOfBooks > 2) throw new Error("Book: only 50 instance of Book can be created.");

        this.setIsbn(newIsbn);
        this.setTitle(newTitle);
        this.setAuthor(newAuthor);
    };

    /**
     * 调用：Book.getMaxInterface()
     */
    ctor.getMaxInterface = function(){
        return MAX_INTERFACE;
    };

    return ctor;
})();

/**
 * 公共静态方法
 * 不依赖于对象实例中包含的任何数据
 * 调用：Book.convertToTitleCase();
 */
Book.convertToTitleCase = function(inputString){
    return inputString.toLowerCase();
};

Book.prototype = {
    display: function(){
        console.log(this);
        document.write(this.getIsbn());
    }
};
