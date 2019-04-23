var Composite = new Interface('Composite', ['add', 'remove', 'getChild' ]);
var FormItem = new Interface('FormItem', ['save', 'restore']);

var CompositeForm = function(id, method, action){
    this.formCompoents = [];

    this.element = document.createElement('form');
    this.element.id = id;
    this.element.method = method || 'POST';
    this.element.action = action || '#';
};
CompositeForm.prototype.add = function(child){
    Interface.ensureImplements(child, Composite, FormItem);

    this.formCompoents.push(child);
    this.element.appendChild(child.getElement());
};
CompositeForm.prototype.remove = function(child){
    for(var i = 0, len = this.formCompoents.length; i < len; i++){
        if(this.formCompoents[i] === child){
            this.formCompoents.splice(i, 1);
            break;
        }
    }
};

CompositeForm.prototype.getChild = function(i){
    return this.formCompoents[i];
};

CompositeForm.prototype.save = function(){
    for(var i = 0, len = this.formCompoents.length; i < len; i++){
        this.formCompoents[i].save();
    }
};

CompositeForm.prototype.restore = function(){
    for(var i = 0, len = this.formCompoents.length; i < len; i++){
        this.formCompoents[i].restore();
    }
};

CompositeForm.prototype.getElement = function(){
    return this.element;
};


/**
 * CompositeFieldset class, implements interface Composite,FormItem
 */
var CompositeFieldset = function(id, legendText){
    this.compents = {};

    this.element = document.createElement('fieldset');
    this.element.id = id;

    if(legendText){
        this.legend = document.createElement('legend');
        this.legend.appendChild(document.createTextNode(legendText));
        this.element.appendChild(this.legend);
    }
};

CompositeFieldset.prototype.add = function(child){
    Interface.ensureImplements(child, Composite, FormItem);

    this.compents[child.getElement().id] = child;
    this.element.appendChild(child.getElement());
};
CompositeFieldset.prototype.remove = function(child){
    delete this.compents[child.getElement().id];
};

CompositeFieldset.prototype.getChild = function(id){
    return this.compents[id] || null;
};

CompositeFieldset.prototype.save = function(){
    for(var id in this.compents){
        if(!this.compents.hasOwnProperty(id)) continue;
        this.compents[id].save();
    }
};

CompositeFieldset.prototype.restore = function(){
    for(var id in this.compents){
        if(!this.compents.hasOwnProperty(id)) continue;
        this.compents[id].restore();
    }
};

CompositeFieldset.prototype.getElement = function(){
    return this.element;
};





var Field = function(id){
    this.id = id;
    this.element;
};

Field.prototype.add = function(){};
Field.prototype.remove = function(){};
Field.prototype.getChild = function(){};

Field.prototype.save = function(){
    setCookie(this.id, this.getValue());
};
Field.prototype.restore = function(){
    this.element.value = getCookie(this.id);
};

Field.prototype.getElement = function(){
    return this.element;
};

Field.prototype.getValue = function(){
    throw new Error('Unsupported operation on the class Field');
};

var InputField = function(id, label){
    Field.call(this, id);

    this.input = document.createElement('input');
    this.input.id = id;

    this.label = document.createElement('label');
    var labelTextNode = document.createTextNode(label);
    this.label.appendChild(labelTextNode);

    this.element = document.createElement('div');
    this.element.className = 'input-field';
    this.element.appendChild(this.label);
    this.element.appendChild(this.input);
};
extend(InputField, Field);

InputField.prototype.getValue = function(){
    return this.input.value;
};
InputField.prototype.setValue = function(val){
    this.input.value = val;
    return this;
};


var TextareaField = function(id, label){
    Field.call(this, id);

    this.textarea = document.createElement('textarea');
    this.textarea.id = id;

    this.label = document.createElement('label');
    var labelTextNode = document.createTextNode(label);
    this.label.appendChild(labelTextNode);

    this.element = document.createElement('div');
    this.element.className = 'input-field';
    this.element.appendChild(this.label);
    this.element.appendChild(this.textarea);
};
extend(TextareaField, Field);

TextareaField.prototype.getValue = function(){
    return this.textarea.value;
};
TextareaField.prototype.setValue = function(val){
    this.input.value = val;
    return this;
};

var SelectField = function(id, label, options){
    Field.call(this, id);

    this.select = document.createElement('select');
    this.select.id = id;

    for(var val in options){
        var _opt = document.createElement('option');
        _opt.value = val;
        _opt.appendChild(document.createTextNode(options[val]));
        this.select.appendChild(_opt);
    }

    this.label = document.createElement('label');
    var labelTextNode = document.createTextNode(label);
    this.label.appendChild(labelTextNode);

    this.element = document.createElement('div');
    this.element.className = 'input-field';
    this.element.appendChild(this.label);
    this.element.appendChild(this.select);
};
extend(SelectField, Field);

SelectField.prototype.getValue = function(){
    return this.select.options[this.select.selectedIndex].value;
};
SelectField.prototype.setValue = function(val){
    for(var indx in this.select.options){
        if(this.select.options[indx].value == val){
            this.select.options[indx].selected = true;
            break;
        }
    }
    return this;
};