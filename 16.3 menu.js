/* Command, Composite and MenuObject interface */
var Command = new Interface('Command', ['execute']);
var Composite = new Interface('Composite', ['add', 'remove', 'getChild', 'getElement']);
var MenuObject = new Interface('MenuObject', ['show']);


/* MenuBar class, a composite */
var MenuBar = function(){//implements Composite, MenuObject
    this.menus = {};
    this.element = document.createElement('ul');
    this.element.style.display = 'none';
};
MenuBar.prototype = {
    add: function(menuObject){
        Interface.ensureImplements(menuObject, Composite, MenuObject);
        this.menus[menuObject.name] = menuObject;
        this.element.appendChild(menuObject.getElement());
    },
    remove: function(name){
        delete this.menus[name];
    },
    getChild: function(name){
        return this.menus[name];
    },
    getElement: function(){
        return this.element;
    },
    show: function(){
        this.element.style.display = 'block';
        for(name in this.menus){
            this.menus[name].show();
        }
    }
};

/*Menu class, a composite*/
var Menu = function(name){
    this.name = name;
    this.items = [];
    this.element = document.createElement('li');
    this.element.style.display = 'none';

    this.container = document.createElement('ul');
    this.element.appendChild(this.container);
};
Menu.prototype = {
    add: function(menuItemObject){
        Interface.ensureImplements(menuItemObject, Composite, MenuObject);
        this.items[menuItemObject.name] = menuItemObject;
        this.container.appendChild(menuItemObject.getElement());
    },
    remove: function(name){
        delete this.items[name];
    },
    getChild: function(name){
        return this.items[name];
    },
    getElement: function(){
        return this.element;
    },
    show: function(){
        this.element.style.display = 'block';
        for(var name in this.items){
            this.items[name].show();
        }
    }
};

/* MenuItem class, a leaf */
var MenuItem = function(name, command){
    Interface.ensureImplements(command, Command);
    this.name = name;
    this.element = document.createElement('li');
    this.element.style.display  = 'none';

    this.auchor = document.createElement('a');
    this.auchor.href='#';
    this.element.appendChild(this.auchor);
    this.auchor.innerHTML = this.name;

    addEvent(this.auchor, 'click', function(e){
        e.preventDefault();
        command.execute();
    });
};

MenuItem.prototype = {
    add: function(){},
    remove: function(){},
    getChild: function(){},
    getElement: function(){
        return this.element;
    },
    show: function(){
        this.element.style.display = 'block';
    },

};

/* MenuCommand class, a command object */
var MenuCommand = function(action){//implements Command
    this.action = action;
};
MenuCommand.prototype.execute = function(){
    this.action();
};


/* operation class */
var FileActions = function(){};
FileActions.prototype = {
    open: function(){
        console.log('open');
    },
    close: function(){
        console.log('close');
    },
    save: function(){
        console.log('save');
    },
    saveAs: function(){
        console.log('saveAs');
    }
};

var EditActions = function(){};
EditActions.prototype = {
    cut: function(){
        console.log('cut');
    },
    copy: function(){
        console.log('copy');
    },
    paste: function(){
        console.log('paste');
    },
    delete: function(){
        console.log('delete');
    }
};

var InsertActions = function(){};
InsertActions.prototype = {
    textBlock: function(){}
};

var HelpActions = function(){};
HelpActions.prototype = {
    showHelp: function(){}
};