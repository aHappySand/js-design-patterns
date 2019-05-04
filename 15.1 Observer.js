function Publisher(){
    this.subscribers = [];
}
//推送方法
Publisher.prototype.deliver = function(data){
    this.subscribers.forEach(function(fn){
        fn(data);
    });
    return this;
};
//订阅
Function.prototype.subscribe = function(publisher){
    var that = this;
    var alreadyExists = publisher.subscribers.some(
        function(el){
            return el === that;
        }
    );
    if(!alreadyExists){
        publisher.subscribers.push(this);
    }
    return this;
};
//退订
Function.prototype.unsubscribe = function(publisher){
    var that = this;
    publisher.subscribers = publisher.subscribers.filter(
        function(el){
            return el !== that;
        }
    );
    return this;
};