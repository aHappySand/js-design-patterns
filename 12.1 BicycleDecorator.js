var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair', 'getPrice']);

var AcmeComfortCruiser = function(){// implements Bicyle

};

AcmeComfortCruiser.prototype = {
    assemble: function(){},
    wash: function(){},
    ride: function(){},
    repair: function(){},
    getPrice: function(){
        return 399.00;
    }
};

/* BicycleDecorator abstract decorator class */
var BicycleDecorator = function(bicycle){
    Interface.ensureImplements(bicycle, Bicycle);
    this.bicycle = bicycle;
};

BicycleDecorator.prototype = {
    assemble: function(){
        return this.bicycle.assemble();
    },
    wash: function(){
        return this.bicycle.wash();
    },
    ride: function(){
        return this.bicycle.ride();
    },
    repair: function(){
        return this.bicycle.repair();
    },
    getPrice: function(){
        return this.bicycle.getPrice();
    }
};


/* HeadlightDecorator class */
var HeadlightDecorator = function(bicycle){//implements Bicycle
        HeadlightDecorator.superclass.constructor.call(this, bicycle);
};
extend(HeadlightDecorator, BicycleDecorator);
HeadlightDecorator.prototype.assemble = function(){
    return this.bicycle.assemble() + ' Attach headlight to handlebars';
};
HeadlightDecorator.prototype.getPrice = function(){
    return this.bicycle.getPrice() + 15.00;
};

/* TaillightDecorator class */
var TaillightDecorator = function(bicycle){
    TaillightDecorator.superclass.constructor.call(this, bicycle);
};
extend(TaillightDecorator, BicycleDecorator);
TaillightDecorator.prototype.assemble = function(){
    return this.bicycle.assemble() + ' Attach taillight to handlebars';
};
TaillightDecorator.prototype.getPrice = function(){
    return this.bicycle.getPrice() + 9.00;
};


/*FrameColorDecorator class*/
var FrameColorDecorator  = function(bicycle, frameColor){
    FrameColorDecorator.superclass.constructor.call(this, bicycle);
    this.frameColor = frameColor;
};
extend(FrameColorDecorator, BicycleDecorator);
FrameColorDecorator.prototype.assemble = function(){
    //在方法之前添加行为
    return "Paint the frame " + this.frameColor + ' and allow it to dry.' + this.bicycle.assemble();
};
FrameColorDecorator.prototype.getPrice = function(){
    //在方法之后添加行为
    return this.bicycle.getPrice() + 30.00;
};