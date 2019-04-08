/* QueueHandler class
	QueueHandler会在发起新的请求之前先确保所有请求都已经成功处理
 */

 var QueueHandler = function(){//implements AjaxHandler
 	this.queue = [];
 	this.requestInProgress = false;
 	this.retryDelay = 5;//In seconds
 };
 extend(QueueHandler, SimpleAjaxHandler);
 QueueHandler.prototype.request = function(method, url, callback, postVals,
 	override){
 	if(this.requestInProgress && !override){
 		this.queue.push({
 			method: method,
 			url:url,
 			callback:callback,
 			postVals: postVals
 		});
 	}else{
 		this.requestInProgress = true;
 		var xhr = this.createXHRObject();
 		var that = this;

 		xhr.onreadystatechange = function(){
 			if(xhr.readystate != 4) return;
 			if(xhr.status === 200){
 				callback.success(xhr.responseText, xhr.responseXML);
 				that.advanceQueue();
 			}else{
 				callback.failure(xhr.status);
 				setTimeout(function(){
 					that.request(method, url, callback, postVals, true);
 				}, that.retryDelay * 1000);
 			}
 		};

 		xhr.open(method, url, true);
 		if(method !== 'POST') postVals = null;
 		xhr.send(postVals);
 	}
 };

 QueueHandler.prototype.advanceQueue = function(){
 	if(this.queue.length === 0){
 		this.requestInProgress = false;
 		return;
 	}

 	var req = this.queue.shift();
 	this.request(req.method, req.url, req.callback, req.postVals, true);
 };


 /* OfflineHandler class */
 var OfflineHandler = function(){//implements AjaxHandler
 	this.storeRequest = [];
 };

 extend(OfflineHandler, SimpleAjaxHandler);
 OfflineHandler.prototype.request = function(method, url, callback, postVals){
 	if(XHRManager.isOffline()){
 		this.storeRequest.push({
 			method: method,
 			url: url,
 			callback: callback,
 			postVals: postVals
 		});
 	}else{
 		this.flushStoreRequest();
 		OfflineHandler.superclass.request(method, url,callback, postVals);
 	}
 };

 OfflineHandler.prototype.flushStoreRequest = function(){
 	for (var i = 0, len = this.storeRequest.length; i < len; i++) {
 		var req = this.storeRequest[i];
 		OfflineHandler.superclass.request(req.method, req.url, req.callback, req.postVals);
 	}
 };


/* XHRManager sigleton */
var XHRManager = {
	createXHRHandler: function(){
		var xhr;
		if(this.isOffline()){
			xhr = new OfflineHandler();
		}else if(this.isHighLatency()){
			xhr = new QueueHandler();
		}else{
			xhr = new SimpleAjaxHandler();
		}

		Interface.ensureImplements(xhr, AjaxHandler);
		return xhr;
	},
	isOffline: function(){
		return !navigator.onLine;
	},
	isHighLatency: function(){
		return false;
	}
};

