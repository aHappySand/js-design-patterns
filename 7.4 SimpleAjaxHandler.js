/* AjaxHandler interface */
var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXHRObject']);

/* SimpleAjaxHandler class*/
var SimpleAjaxHandler = function(){};

SimpleAjaxHandler.prototype = {
	request: function(method, url, callback, postVars, headers){
		var xhr = this.createXHRObject();
		// alert('rquest');
		
		xhr.onreadystatechange = function(){
			if(xhr.readystate !== 4) return;
			(xhr.status == 200) ?
				callback.success(xhr.responseText, xhr.requestXML) :
				callback.failure(xhr.status);
		};

		xhr.open(method, url, true);
		if(headers){
			for(var i in headers){
				xhr.setRequestHeader(i, headers[i]);
			}
		}
		if(method !== 'POST') postVars = null;
		xhr.send(postVars);
		
	},
	createXHRObject: function(){//Factory method
		// alert(1);
		var methods = [
			function(){return new XMLHttpRequest();},
			function(){return new ActiveXObject('Msxml2.XMLHTTP');},
			function(){return new ActiveXObject('Microsoft.XMLHTTP');}
		];

		for (var i = 0, len = methods.length; i < len; i++) {
			try{
				var xhr = methods[i]();
			}catch(e){
				continue;
			}

			//If we reach this point, method[i] worked
			this.createXHRObject = methods[i];
			return xhr;
		}
		throw new Error('SimpleAjaxHandler: Cound not create an XHR object.');
	}
};