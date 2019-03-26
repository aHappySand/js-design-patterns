
//Interface
var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var FormItem = new Interface('FormItem', ['save']);


//class
var CompositeForm = function(id, method, action){

};

function addForm(formInstance){
	ensureImplements(formInstance, Composite, FormItem);
	//...
}
