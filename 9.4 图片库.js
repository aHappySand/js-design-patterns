var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var GalleryItem = new Interface('GalleryItem', ['hide', 'show']);

/**
 * 组合对象：
 * DynamicGallery class, implements Composite, GalleryItem
 */
var DynamicGallery = function(id){
	this.children = [];

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
		for(var node, i = 0; node = this.getChild(i); i++){
			node.hide();
		}
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
 	}
 };

