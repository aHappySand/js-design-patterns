/* EditInPlaceField */
var EditInPlaceField = {
    configure: function(id, parent, value){
        this.id = id;
        this.parentElement = parent;
        this.value = value || 'default value';
        
        this.createElements(this.id);
        this.attatchEvents();
    },
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

function addEvent(elem, evt, callback){
    elem.addEventListener(evt, callback, false);
}

function clone(object){
    var F = function(){};
    F.prototype = object;
    return new F;
}



/* EditInPlaceArea object */
var EditInPlaceArea = clone(EditInPlaceField);
EditInPlaceArea.createElements = function(id){
    this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('p');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.fieldElement = document.createElement('textarea');
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
}

EditInPlaceArea.convertToEditable = function(){
    this.staticElement.style.display = 'none';
    this.fieldElement.style.display = 'block';
    this.saveButton.style.display = 'inline';
    this.cancelButton.style.display = 'inline';

    this.setValue(this.value);
};

EditInPlaceArea.convertToText = function(){
    this.fieldElement.style.display = 'none';
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';
    this.staticElement.style.display = 'block';

    this.setValue(this.value);
}





