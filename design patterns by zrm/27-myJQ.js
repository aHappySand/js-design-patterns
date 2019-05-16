var $$ = function(selector, context){
  return new $$.fn.init(selector, context);
};
$$.fn = $$.prototype = {
  constructor: $$,
  init: function(selector, context){
    this.length = 0;
    context = context || document;
    //如果是id选择符，按位非将-1转化为0， 转化为布尔值false
    if(~selector.indexOf('#')){
      this[0] = context.getElementById(selector.slice(1));
      this.length = 1;
    }else{
      var doms = context.getElementsByTagName(selector),
        i = 0,
        len = doms.length;
      for(; i<len; i++){
        this[i] = doms[i];
      }
      this.length = len;
    }
    //保存上下文
    this.context = context;
    //保存选择符
    this.selector = selector;
    return this;
  },
  length: 2,
  size: function(){
    return this.length;
  },
  push: [].push,
  sort: [].sort,
  splice: [].splice
};
$$.fn.init.prototype = $$.fn;
//扩展对象
$$.extend = $$.fn.extend = function(){
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

$$.fn.extend({
  on: (function(){
    if(document.addEventListener){
      return function(type, fn){
        var i = this.length - 1;
        for(; i >= 0; i--){
          this[i].addEventListener(type, fn, false);
        }
        return this;
      }
    }else if(document.attachEvent){
      return function(type, fn){
        var i = this.length - 1;
        for(; i >= 0; i--){
          this[i].attachEvent('on' + type, fn);
        }
        return this;
      }
    }else{
      return function(type, fn){
        var i = this.length - 1;
        for(; i >= 0; i--){
          this[i]['on' + type] = fn;
        }
        return this;
      }
    }
  })(),

  css: function(){
    var args = arguments,
      len = args.length;
    if(this.length < 1){
      return this;
    }
    if(len == 1){//获取样式
      if(typeof args[0] === 'string'){
        if(this[0].currentStyle){
          return this[0].currentStyle[args[0]];
        }else{
          return getComputerdStyle(this[0], false)[args[0]];
        }
      }else if(typeof args[0] == 'object'){
        for(var i in args[0]){
          for(var j = this.length -1; j >=0; j--){
            this[j].style[$$.camelCase(i)] = args[0][i];
          }
        }
      }
    }else if(len == 2){
      for(var j = this.length -1; j >=0; j--){
        this[j].style[$$.camelCase(args[0])] = args[1];
      }
    }
    return this;
  },

  attr: function(){
    var args = arguments,
      len = args.length;
    if(this.length < 1){
      return this;
    }
    if(len == 1){//获取样式
      if(typeof args[0] === 'string'){
          return this[0].getAttribute(args[0]);
      }else if(typeof args[0] == 'object'){
        for(var i in args[0]){
          for(var j = this.length -1; j >=0; j--){
            this[j].setAttribute([i], args[0][i]);
          }
        }
      }
    }else if(len == 2){
      for(var j = this.length -1; j >=0; j--){
        this[j].setAttribute(args[0], args[1]);
      }
    }
    return this;
  },

  html: function(){
    var args = arguments,
      len = args.length;
    if(len == 0){//返回第一个元素的html
      return this[0]&&this[0].innerHTML;
    }else if(len == 1){
      for(var j = this.length -1; j >=0; j--){
        this[j].innerHTML = args[0];
      }
    }
    return this;
  }
});

$$.extend({
  camelCase: function(str){
    return str.replace(/\-(\w)/, function(all, letter){
      return letter.toUpperCase();
    });
  }
});