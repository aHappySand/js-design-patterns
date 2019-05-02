
/* TooltipManager singleton, a flyweight factory and manager*/
var TooltipManager = (function(){
    var storedInstance = null;
    /*Tooltip class, as a flyweight*/

    /* Tooltip class, as a flyweight */
    var Tooltip = function(){
        this.delayTimeout = null;
        this.delay = 500;

        this.element = document.createElement('div');
        this.element.style.display = 'none';
        this.element.style.position = 'absolute';
        this.element.className = 'tooltip';

        document.getElementsByTagName('body')[0].appendChild(this.element);
    };

    Tooltip.prototype = {
        startDelay: function(e, text){
            if(this.delayTimeout == null){
                var that = this;
                var x = e.clientX;
                var y = e.clientY;

                this.delayTimeout = setTimeout(function(){
                    that.show(x, y, text);
                }, this.delay);
            }
        },
        show: function(x, y, text){
            clearTimeout(this.delayTimeout);
            this.delayTimeout = null;
            this.element.innerHTML = text;
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

    return {
        addTooltip: function(targetElement, text){
            var tt = this.getTooltip();
            addEvent(targetElement, 'mouseover', function(e){
                tt.startDelay(e, text);
            });
            addEvent(targetElement, 'mouseout', function(e){
                tt.hide();
            });
        },
        getTooltip: function(){
            if(storedInstance == null){
                storedInstance = new Tooltip();
            }
            return storedInstance;
        }
    };
})();



