var Composite = new Interface('Composite', ['add', 'remove', 'getChild', 'getAllLeaves']);
var GalleryItem = new Interface('GalleryItem', ['hide', 'show', 'addTag', 'getPhotosWithTag']);

/**
 * 组合对象：
 * DynamicGallery class, implements Composite, GalleryItem
 */
var DynamicGallery = function(id){
	this.children = [];
	this.tags = [];
	this.element = document.createElement('div');
	this.element.id = id;
	this.element.className = 'dynamic-gallery';

};

DynamicGallery.prototype = {
	//implements the composite interface
	add:function(child){
		Interface.ensureImplements(child, Composite, GalleryItem);
		this.children.push(child);
		this.element.appendChild(child.getElement());
	},
	remove: function(child){
		for(var node, i = 0; node = this.getChild(i); i++){
			if(node === child){
				this.children.splice(i, 1);
				break;
			}
		}
		this.element.removeChild(child.getElement());
	},
	getChild: function(i){
		return this.children[i];
	},

	//implements the galleryItem interface
	hide:function(){
		this.element.style.display = 'none';
	},
	show: function(){
		this.element.style.display = 'block';
		for(var node, i = 0; node = this.getChild(i); i++){
			node.show();
		}
	},
	//Helper methods
	getElement: function(){
		return this.element;
	},
	addTag: function(tag){
		this.tags.push(tag);
		for(var node, i = 0; node = this.getChild(i); i++){
			node.addTag(tag);
		}
	},
	getAllLeaves: function(){
		var leaves = [];
		for(var node, i = 0; node = this.getChild(i); i++){
			leaves = leaves.concat(node.getAllLeaves());
		}
		return leaves;
	},
	getPhotosWithTag: function(tag){
		//first search in this object's tags, if the tag is found here, we can stop the search
		// and just return all the leaf nodes
		for(var i = 0, len = this.tags.length; i < len; i++){
			if(this.tags[i] == tag){
				return this.getAllLeaves();
			}
		}

		//If the tag isn't found in this objects's tags, pass the request down the hierarchy.
		var results = [];
		for(var node, i = 0; node = this.getChild(i); i++){
			results = results.concat(node.getPhotosWithTag(tag));
		}
		return results;
	}
};

/**
 * 叶节点
 * GalleryImage class, implements Composite, GalleryItem
 */
 var GalleryImage = function(src){
 	this.element = document.createElement('img');
 	this.element.className = 'gallery-img';
 	this.element.src = src;

 	this.tags = [];
 };

 GalleryImage.prototype = {
 	add:function(){},
 	remove: function(){},
 	getChild: function(){},

 	hide: function(){
 		this.element.style.display = 'none';
 	},
 	show: function(){
 		this.element.style.display = 'block';
 	},

 	getElement: function(){
 		return this.element;
 	},
 	addTag: function(tag){
 		this.tags.push(tag);
 	},
 	getAllLeaves: function(){
 		return [this];
 	},
 	getPhotosWithTag: function(tag){
 		for(var i = 0, len = this.tags.length; i < len; i++){
 			if(this.tags[i] == tag){
 				return [this];
 			}
 		}
 		return [];
 	}
 };

