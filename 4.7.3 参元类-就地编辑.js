/* Mixin class */

var EditInPlaceMixin = function(){};
EditInPlaceMixin.prototype = {
    createElements: function(id){
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);

        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = 'save';
        this.containerElement.appendChild(this.saveButton);

        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value= 'cancel';
        this.containerElement.appendChild(this.cancelButton);

        this.convertToText();
    },
    attatchEvents: function(){
        var that = this;
        addEvent(this.staticElement, 'click', function(){
            that.convertToEditable();
        });

        addEvent(this.saveButton, 'click', function(){
            that.save();
        });

        addEvent(this.cancelButton, 'click', function(){
            that.cancel();
        });
    },
    convertToEditable: function(){
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';

        this.setValue(this.value);
    },
    save:function(){
        this.value = this.getValue();
        var that = this;

    },
    cancel: function(){
        this.convertToText();
    },
    convertToText: function(){
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';

        this.setValue(this.value);
    },
    setValue: function(value){
        this.fieldElement.value = value;
        this.staticElement.value = value;
    },
    getValue: function(){
        return this.fieldElement.value;
    }
};

function augment(receivingClass, givingClass){
    if(arguments[2]){//三个以上参数
        for (var i = 2, len = arguments.length; i < len; i++) {
            var method = arguments[i];
            if(givingClass.prototype[method]){
                receivingClass.prototype[method] = givingClass.prototype[method];
            }
        }
    }else{
        for(var key in givingClass.prototype){
            if(!(key in receivingClass.prototype)){
                receivingClass.prototype[key] = givingClass.prototype[key];
            }
        }
    }
}

/*EditInPlaceField class*/
function EditInPlaceField(id, parent, value){
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;

    this.createElements(this.id);
    this.attatchEvents();
}

augment(EditInPlaceField, EditInPlaceMixin);

/*EditInPlaceArea class*/
function EditInPlaceArea(id, parent, value){
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;

    this.createElements(this.id);
    this.attatchEvents();
}
EditInPlaceArea.prototype.createElements = function(id){
    this.containerElement = document.createElement('div');
    this.parentElement.appendChild(this.containerElement);

    this.staticElement = document.createElement('p');
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML = this.value;

    this.fieldElement = document.createElement('textarea');
    this.fieldElement.value = this.value;
    this.containerElement.appendChild(this.fieldElement);

    this.saveButton = document.createElement('input');
    this.saveButton.type = 'button';
    this.saveButton.value = 'save';
    this.containerElement.appendChild(this.saveButton);

    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = 'cancel';
    this.containerElement.appendChild(this.cancelButton);

    this.convertToText();
};

EditInPlaceArea.prototype.convertToText = function(){
    this.fieldElement.style.display = 'none';
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';
    this.staticElement.style.display = 'block';

    this.setValue(this.value);
};

EditInPlaceArea.prototype.convertToEditable = function(){
    this.fieldElement.style.display = 'block';
    this.staticElement.style.display = 'none';
    this.saveButton.style.display = 'inline';
    this.cancelButton.style.display = 'inline';
    this.setValue(this.value);
};
augment(EditInPlaceArea, EditInPlaceMixin);


function addEvent(elem, evt, callback){
    elem.addEventListener(evt, callback, false);
}




