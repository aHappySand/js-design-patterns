//等待对象
var Waiter = function(){
    //注册了的等待对象容器
    var dfd = [],
        doneArr = [],//成功回调方法容器
        failArr = [],//失败回调方法容器
        slice = Array.prototype.slice,
        that = this;
    //监控对象类
    var Primise = function(){
        //监控  对象是否 解决成功 状态
        this.resolved = false;
        //监控  对象是否 解决失败 状态
        this.rejected = false;
    };
    Primise.prototype = {
        //解决成功
        resolve: function(){
            this.resolved = true;
            //如果没有监控对象 则取消执行
            if(!dtd.length){
                return;
            }
            //遍历所有已经注册的监控对象
            for(var i = dtd.length -1; i >= 0;i--){
                //如果有任意一个监控对象没有被解决或者 解决失败 则返回
                if(dtd[i] && !dtd[i].resolved || dtd[i].rejected){
                    return;
                }
                dtd.splice(i, 1);
            }
            _exec(doneArr);
        },
        //解决失败
        reject: function(){
            this.rejected = true;
            if(!dtd.length){
                return;
            }
            //清除所有监控对象
            dtd.splice(0);
            _exec(failArr);
        }
    };

    //创建监控对象
    that.Deferred = function(){
        return new Primise();
    };
    //监控异步方法  参数：监控对象
    that.when = function(){
        dtd = slice.call(arguments);
        var i = dtd.length;
        for(--i; i >= 0; i--){
            //如果不存在监控对象 ， 或者监控对象已经解决， 或者 不是监控对象
            if(!dtd[i] || dtd[i].resolved || dtd[i].rejected || !dtd[i] instanceof Primise){
                dtd.splice(i, 1);
            }
        }
        //返回等待者对象
        return that;
    };
    //解决成功回调函数   添加方法
    that.done = function(){
        doneArr = doneArr.concat(slice.call(arguments));
        return that;
    };
    //解决失败回调函数 添加方法
    that.fail = function(){
        failArr = failArr.concat(slice.call(arguments));
        return that;
    };

    //回调执行函数
    function _exec(arr){
        var i = 0,
            len = arr.length;
        for(; i < len; i++){
            try{
                //执行回调函数
                arr[i] && arr[i]();
            }catch(e){}
        }
    }
};