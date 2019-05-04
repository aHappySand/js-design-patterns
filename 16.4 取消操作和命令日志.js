/* ReversibleCommand interface */
var ReversibleCommand = new Interface('ReversibleCommand', ['execute', 'undo']);

/*命令类 Movement commands*/
var MoveUp = function(cursor){//implements ReversibleCommand
    this.cursor = cursor;
};
MoveUp.prototype = {
    execute: function(){
        this.cursor.move(0, -10);
    },
    undo: function(){
        this.cursor.move(0, 10);
    }
};

var MoveDown = function(cursor){//implements ReversibleCommand
    this.cursor = cursor;
};
MoveDown.prototype = {
    execute: function(){
        this.cursor.move(0, 10);
    },
    undo: function(){
        this.cursor.move(0, -10);
    }
};

var MoveLeft = function(cursor){//implements ReversibleCommand
    this.cursor = cursor;
};
MoveLeft.prototype = {
    execute: function(){
        this.cursor.move(-10, 0);
    },
    undo: function(){
        this.cursor.move(10, 0);
    }
};

var MoveRight = function(cursor){//implements ReversibleCommand
    this.cursor = cursor;
};
MoveRight.prototype = {
    execute: function(){
        this.cursor.move(10, 0);
    },
    undo: function(){
        this.cursor.move(-10, 0);
    }
};



/* Cursor class */
var Cursor = function(width, height, parent){
    this.width = width;
    this.height = height;
    this.position = {
        x: width / 2,
        y: height / 2
    };

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = '1px solid #ccc';

    parent.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillstyle = '#ccc';

    this.move(0, 0);
};

Cursor.prototype.draw = function(){
    for(var w = 1, ws < this.width / 10; w++){
        this.
    }
};

Cursor.prototype.move = function(x, y){
    this.position.x += x;
    this.position.y += y;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillRect(this.position.x, this.position.y, 10, 10);
};


/*UndoDecorator class*/
var UndoDecorator = function(command, undoStack){//implements ReversibleCommand
    this.command = command;
    this.undoStack = undoStack;
};
UndoDecorator.prototype = {
    execute: function(){
        debugger;
        this.undoStack.push(this.command);
        this.command.execute();
    },
    undo: function(){
        debugger;
        this.command.undo();
    }
};


/* CommandButton class */
var CommandButton = function(label, command, parent){
    Interface.ensureImplements(command, ReversibleCommand);
    this.element = document.createElement('button');
    this.element.innerHTML = label;
    parent.appendChild(this.element);

    addEvent(this.element, 'click', function(){
        command.execute();
    });
};

/*UndoButton class*/
var UndoButton = function(label, parent, undoStack){
    this.element = document.createElement('button');
    this.element.innerHTML = label;
    parent.appendChild(this.element);

    addEvent(this.element, 'click', function(){
        debugger;
        if(undoStack.length === 0){
            return;
        }else{
            var lastCommand = undoStack.pop();
            lastCommand.undo();
        }
    });
};
















