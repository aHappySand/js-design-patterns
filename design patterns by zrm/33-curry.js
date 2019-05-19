//函数柯里化：对函数的参数分割
function curry(fn){
    //缓存数组slice方法 Array.prototype.slice
    var Slice = [].slice;
    var args = Slice.call(arguments, 1);
    return function(){
        //将参数（类数组）转换为数组
        var addArgs = Slice.call(arguments),
            //拼接参数
            allArgs = args.concat(addArgs);
            //返回新函数
        return fn.apply(null, allArgs);
    };
}

//反柯里化：方便我们对方法的调用
Function.prototype.uncurry = function(){
    var that = this;
    return function(){
        Function.prototype.call.apply(that, arguments);
    };
};
//Object.prototype.toString校验对象类型
var toString = Object.prototype.toString.uncurry();
//toString([]);//[object Array]

//兼容多个浏览器
if(Function.prototype.bind === undefined){
    Function.prototype.bind = function(context){
        var Slice = Array.prototype.slice,
            args = Slice.call(arguments, 1),
            //保存当前函数的引用
            that = this;
        return function(){
            var addArgs = Slice.call(arguments),
                allArgs = args.concat(addArgs);
            return that.apply(context, allArgs);
        };
    };
}

function bind(fn, context){
    var Slice = [].slice;
        args = Slice.call(arguments, 2);
    return function(){
        var addArgs = Slice.call(arguments),
            allArgs = addArgs.concat(args);
        return fn.apply(context, allArgs);
    };
}