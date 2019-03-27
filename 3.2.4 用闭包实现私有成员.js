var Book = function(newIsbn, newTitle, newAuthor){
	//private attributes
	var isbn, title, author;

	//私有方法
	/**
	 * 0-395-07122-4
	 * 978-0261103283
	 */
	function checkIsbn(isbn){
		if(isbn == undefined || typeof isbn !== 'string'){
			return false;
		}

		isbn = isbn.replace(/\-/g, '');
		if(isbn.length != 10 && isbn.length!=13){
			return false;
		}
		return true;
		var sum = 0;
		if(isbn.length == 10){
			if(!isbn.match(/^\d{9}/)){
				return false;
			}

			for (var i = 0; i < 9; i++){
				sum += isbn.charAt(i) * (10 - i);
			}

			var checksum = sum % 11;
			if(checksum === 10) checksum = 'X';
			if(isbn.charAt(9) != checksum){
				return false;
			}
		}else{
			if(!isbn.match(/^\d{12}/)){
				return false;
			}

			for(var i = 0; i < 12; i++){
				sum += isbn.charAt(i) * ((i % 2 ===0) ? 1:3);
			}
			var checksum = sum % 10;
			if (isbn.charAt(12)!=checksum){
				return false;
			}
		}
		return true;
	}

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

Book.prototype = {
	display: function(){
        document.write("isbn:" + this.getIsbn());
	}
};