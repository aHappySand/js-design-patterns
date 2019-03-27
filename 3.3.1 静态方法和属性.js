var Book = (function(){
	//私有静态属性
	var numOfBooks = 0;
	//私有静态方法
	function checkIsbn(isbn){

		return true;
	}

	return function(newIsbn, newTitle, newAuthor){
		//私有属性
		var isbn, title, author;
		//特权方法
		this.getIsbn = function(){
			return isbn;
		};

		this.setIsbn = function(newIsbn){
			if(!checkIsbn(newIsbn)) throw new Error('Book:invalid ISBN');
			isbn = newIsbn;
		};

		this.getTitle = function(){
			return title;
		};
		this.setTitle = function(newTitle){
			title = newTitle || 'No title specified';
		};

		this.getAuthor = function(){
			return author;
		};
		this.setAuthor = function(newAuthor){
			author = newAuthor || 'No author specified';
		};

		this.setIsbn(newIsbn);
		this.setTitle(newTitle);
		this.setAuthor(newAuthor);
	};
})();

//公共静态方法
Book.convertToTitleCase = function(inputString){
	return inputString;
};

Book.prototype = {
	display: function(){

	}
};