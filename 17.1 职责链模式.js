/*Interface .*/
var Publication = new Interface('Publication', ['getIsbn', 'setIsbn',
    'getTitle', 'setTitle', 
    'getAuthor', 'setAuthor',
    'getGenres', 'setGenres',
    'display']);
var Library = new Interface('Library', ['addBook', 'findBooks',
    'checkoutBook', 'returnBook']);
var Catalog = new Interface('Catalog', ['handleFilingRequest', 
    'findBooks', 'setSuccessor']);

/*Book class.*/
var Book = function(isbn, title, author, genres){//implements Publication
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.genres = genres;
};

Book.prototype = {
    getAuthor: function(){
        return this.author;
    },
    getIsbn: function(){
        return this.isbn;
    },
    getTitle: function(){
        return this.title;
    },
    getGenres: function(){
        return this.genres;
    },
    display: function(){
        console.log('isbn：' + this.getIsbn()  + " book " + this.getTitle());
    }
};

/* PublicLibrary class.*/
var PublicLibrary = function(books, firstGenreCatalog){//implements Library
    this.catalog = {};

    this.firstGenreCatalog = firstGenreCatalog;

    // this.biographyCatalog = new BiographyCatalog();
    // this.fantasyCatalog = new FantasyCatalog();
    // this.mysteryCatalog = new MysteryCatalog();
    // this.nonFictionCatalog = new NonFictionCatalog();
    // this.scifiCatalog = new ScifiCatalog();


    for(var i = 0, len = books.length; i < len; i++){
        this.addBook(books[i]);
    }
};
PublicLibrary.prototype = {
    findBooks: function(searchString, genres){
        //If the optional genres arguemnt is given, search for books only in those genres.Use the chain of responsibility to perform the search.
        if(typeof genres === 'object' && genres.length > 0){
            var requestObject = {
                searchString: searchString,
                genres: genres,
                results: []
            };
            var responseObject = this.firstGenreCatalog.findBooks(requestObject);
            return responseObject.results;
        }else{
            var results = [];
            for(var isbn in this.catalog){
                if(!this.catalog.hasOwnProperty(isbn)) continue;

                if(this.catalog[isbn].getTitle().match(searchString) || 
                    this.catalog[isbn].getAuthor().match(searchString)){
                    results.push(this.catalog[isbn]);
                }
            }
            return results;
        }
    }, 
    checkoutBook: function(book){
        var isbn = book.getIsbn();
        if(this.catalog[isbn]){
            if(this.catalog[isbn].available){
                this.catalog[isbn].available = false;
                return this.catalog[isbn];
            }else{
                throw new Error('PublicLibrary: book ' + book.getTitle() + 
                ' is not currently available.');
            }
        }else{
            throw new Error('PublicLibrary: book ' + book.getTitle() + ' not found.');
        }
    },
    returnBook: function(book){
        var isbn = book.getIsbn();
        if(this.catalog[isbn]){
            this.catalog[isbn].available = true;
        }else{
            throw new Error('PublicLibrary: book ' + book.getTitle() + ' not found.');
        }
    },
    addBook: function(newBook){
        this.catalog[newBook.getIsbn()] = {book: newBook, available: true};
        // this.biographyCatalog.handleFilingRequest(newBook);
        // this.fantasyCatalog.handleFilingRequest(newBook);
        // this.mysteryCatalog.handleFilingRequest(newBook);
        // this.nonFictionCatalog.handleFilingRequest(newBook);
        // this.scifiCatalog.handleFilingRequest(newBook);
        this.firstGenreCatalog.handleFilingRequest(newBook);
    }
};


/* GenreCatalog class, used as a superclass for specific catalog classes. */
var GenreCatalog = function(){//implements Catalog
    this.successor = null;//下家
    this.catalog = [];
    this.genreNames = [];
};
GenreCatalog.prototype = {
    _bookMatchesCriteria: function(book){
        return false;//Default implementation;this method will be overriden in the subclasses.
    },

    handleFilingRequest: function(book){
        //check to see if the book belongs in this catagory.
        if(this._bookMatchesCriteria(book)){
            this.catalog.push(book);
        }
        //pass the request on to the next link.
        if(this.successor){
            this.successor.handleFilingRequest(book);
        }
    },
    findBooks: function(request){
        var found = false;
        for(var i = 0, len = request.genres.length; i < len && !found; i++){
            if(this.genreNames.indexOf(request.genres[i])){
                found = true;
                break;
            }
            // for(var j = 0, nameLen = this.genreNames.length; j < nameLen; j++){
            //     if(this.genreNames[j] === request.genres[i]){
            //         found = true;
            //         break;
            //     }
            // }
        }
        if(found){
            outerloop: for(var i = 0, len = this.catalog.length; i < len; i++){
                var book = this.catalog[i];
                if(book.getTitle().match(request.searchString) || 
                    book.getAuthor().match(request.searchString)){
                    for(var j = 0, reqlen = request.results.length; j < reqlen; j++){
                        if(request.results[j].getIsbn() === book.getIsbn()){
                            continue outerloop;
                        }
                    }
                    request.results.push(book);
                }
            }
        }
        //continue to pass the request down the chain if the successor is set.
        if(this.successor){
            return this.successor.findBooks(request);
        }else{
            return request;
        }
    },
    setSuccessor: function(successor){
        if(Interface.ensureImplements(successor, Catalog)){
            this.successor = successor;
        }
    }
};

/*ScifiCatalog*/
var ScifiCatalog = function(){//implements Catalog
    this.genreNames = ['sci-fi', 'scifi', 'science fiction'];
};
extend(ScifiCatalog, GenreCatalog);
ScifiCatalog.prototype._bookMatchesCriteria = function(book){
    var genres = bool.getGenres();
    if(book.getTitle().match(/space/i)){
        return true;
    }
    for(var i = 0, len = genres.length; i < len; i++){
        var genre = genres[i].toLowerCase();
        if(this.genreNames.indexOf(genre) != -1){
            return true;
        }
    }
    return false;
};



//Instantiate the catalogs.
var biographyCatalog = new BiographyCatalog();
var fantasyCatalog = new FantasyCatalog();
var mysteryCatalog = new MysteryCatalog();
var nonFictionCatalog = new NonFictionCatalog();
var scifiCatalog = new ScifiCatalog();