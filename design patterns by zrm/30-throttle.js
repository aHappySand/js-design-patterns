//节流器
var Throttle = function(){
    var isClear = arguments[0], fn;
    //如果第一个参数的类型为Boolean类型，那么第一个参数表示是否清除计数器
    if(typeof isClear == 'boolean'){
        //第二个参数则为函数
        fn = arguments[1];
        isClear && fn.__throttleID && clearTimeout(fn.__throttleID);
    }else{//通过计时器延迟函数的执行
        //第一个参数为函数
        fn = isClear;
        //第二个参数为函数执行时的参数
        var param = arguments[1];
        var p = extend({
            context: null,//执行函数的作用域
            args: [],//执行函数的相关参数
            time: 300 //执行函数的延迟时间
        }, param);
        arguments.callee(true, fn);
        //为函数绑定计时器句柄，延迟执行函数
        fn.__throttleID = setTimeout(function(){
            fn.apply(p.context, p.args);
        }, p.time);
    }
};

function extend(){
  //扩展对象从第二个参数算起
  var i = 1,
    len = arguments.length,
    //第一个参数为源对象
    target = arguments[0],
    j;

    //如果只传一个参数
  if(i == len){
    //源对象为当前对象
    target = this;
    i--;
  }
  for(; i < len; i++){
    for(j in arguments[i]){
      target[j] = arguments[i][j];
    }
  }
  return target;
};