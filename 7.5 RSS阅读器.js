/* DisplayModule interface */

var DisplayModule  = new Interface('DisplayModule', ['append', 'remove', 'clear']);

/* ListDisplay class */
var ListDisplay = function(id, parent){//implements DisplayModule
	this.list = document.createElement('ul');
	this.list.id = id;
	parent.append(this.list);
};

ListDisplay.prototype = {
	append: function(text){
		var newEl = document.createElement('li');
		this.list.appendChild(newEl);

		newEl.innerHTML = text;
		return newEl;
	},
	remove: function(el){
		this.list.removeChild(el);
	},
	clear: function(){
		this.list.innerHTML = '';
	}
};

/* Configuration object */

var conf = {
	id: 'cnn-top-stories',
	feedUrl: 'http://rss.huanqiu.com/world/hot.xml',
	updateInterval: 50,//In seconds
	parent: $('feed-readers')
};

/* FeedReader class */
var FeedReader = function(display, xhrHandler, conf){
	this.display = display;
	this.xhrHandler = xhrHandler;
	this.conf = conf;

	this.startUpdates();
};

FeedReader.prototype = {
	fetchFeed: function(){
		var that = this;
		var callback = {
			success: function(text, xml){
				that.parseFeed(text, xml);
			},
			failure: function(status){
				that.showError(status);
			}
		};

		var header = {
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
		};
		this.xhrHandler.request('GET', this.conf.feedUrl, callback, null, header);
	},
	parseFeed: function(text, xml){
		this.display.clear();
		var items = xml.getElementsByTagName('item');
		for(var i = 0, len = item.length; i < len; i++){
			var title = items[i].getElementsByTagName('title')[0];
			var link = items[i].getElementsByTagName('link')[0];

			this.display.append('<a href="'+link.firstChild.data+'">' + title.firstChild.data + '</a>');
		}
	},
	showError: function(statusCode){
		this.display.clear();
		this.display.append('Error fetching feed.');
	},
	stopUpdates: function(){
		clearInterval(this.interval);
	},
	startUpdates: function(){
		this.fetchFeed();
		var thar = this;
		this.interval = setInterval(function(){
			that.fetchFeed();
		}, this.conf.updateInterval * 1000);
	}
};


/* FeedManager namespace */
var FeedManager = {
	createFeedReader: function(conf){
		conf = conf || {
			id: 'cnn-top-stories',
			feedUrl: 'http://rss.huanqiu.com/world/hot.xml',
			updateInterval: 50,//In seconds
			parent: $('feed-readers')
		};
		var displayModule = new ListDisplay(conf.id + '-display', conf.parent);
		Interface.ensureImplements(displayModule, DisplayModule);

		var xhrHandler = XHRManager.createXHRHandler();
		Interface.ensureImplements(xhrHandler, AjaxHandler);

		return new FeedReader(displayModule, xhrHandler, conf);
	}
};








