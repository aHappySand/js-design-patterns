/* Tooltip class, un-optimized */

var Tooltip = function(targetElement, text){
    this.target = targetElement;
    this.text = text;
    this.delayTimeout = null;
    this.delay = 500;//in milliseconds

    this.element = document.createElement('div');
    this.element.style.display = 'none';
    this.element.style.position = 'absolute';
    this.element.className = 'tooltip';

    document.getElementsByTagName('body')[0].appendChild(this.element);
    this.element.innerHTML = this.text;

    //attach the events
    var that = this;
    addEvent(this.target, 'mouseover', function(e){that.startDelay(e);});
    addEvent(this.target, 'mouseout', function(e){that.hide()});

};

Tooltip.prototype = {
    startDelay: function(e){
        if(this.delayTimeout == null){
            var that = this;
            var x = e.clientX;
            var y = e.clientY;

            this.delayTimeout = setTimeout(function(){
                that.show(x, y);
            }, this.delay);
        }
    },
    show: function(x, y){
        clearTimeout(this.delayTimeout);
        this.delayTimeout = null;
        this.element.style.left = x + 'px';
        this.element.style.top = (y + 20) + 'px';
        this.element.style.display = 'block';
    },
    hide: function(){
        clearTimeout(this.delayTimeout);
        this.delayTimeout = null;
        this.element.style.display = 'none';
    }
};





