/*
interface Composite{
	function add(child);
	function remove(child);
	fucntion getChild(index);
}

interface FormItem{
	function save();
}
*/

var CompositeForm = function(id, method, action){//实现 Composite,FormItem接口
	
};
//实现接口中的方法
CompositeForm.prototype.add = function(child){

};

CompositeForm.prototype.remove = function(child){

};

CompositeForm.prototype.getChild = function(index){
	
};

CompositeForm.prototype.save = function(){

}


/** 2.3.2 用属性检查模仿接口 **/
var CompositeForm = function(id, name, action){
	this.implementsInterfaces = ['Composite', 'FormItem'];
};

function addForm(formInstance){
	if(!implements(formInstance, 'Composite', 'FormItem')){
		throw new Error('Object dose not implement a required interface');
	}
}

/**
 * 检查object是否实现了指定接口
 */
function implements(object){
	for(var i = 1; i < arguments.length; i++){
		var interfaceName = arguments[i];
		var interfaceFound = false;
		for(var j = 0; j < object.implementsInterfaces.length; j++){
			if(object.implementsInterfaces[j] == interfaceName){
				interfaceFound = true;
				break;
			}
		}
		if(!interfaceFound){
			return false;
		}
	}
	return true;
}