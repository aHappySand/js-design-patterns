//定义模块管理器单体对象
var F = F || {};
/**
 * 定义模块方法（理论上，模块方法应该放在闭包中实现，可以隐蔽内部信息）
 * @param str 模块路由
 * @param fn 模块方法
 */
 F.define = function(str, fn){
    //解析路由模块
    var parts = str.split('.'),
        //old为当前模块的祖父模块，_parent为当前模块的父模块
        old = _parent = this,
        // i为模块层级， len为模块层级长度
        i = len = 0;
    //如果第一个模式是模块管理器单体对象，则移除
    if(parts[0] === 'F'){
        parts = parts.slice(1);
    }
    //屏蔽对define和module模块方法的重写
    if(parts[0] === 'define' || parts[0] === 'module'){
        return;
    }
    //遍历路由模块并定于每层模块
    for(len = parts.length; i<len; i++){
        //如果父模块中不存在当前模块
        if(typeof _parent[[parts[i]]] === 'undefined'){
            //声明当前模块
            _parent[parts[i]] = {};
        }
        //缓存下一层级的祖父模块
        old = _parent;
        //缓存下一层及的父模块
        _parent = _parent[parts[i]];
    }
    // 如果给定模块方法，则定义该模块方法
    if(fn){
        old[parts[--i]] = fn();
    }
    return this;
 };
 //F.string模块
 F.define('string', function(){
    return {
        trim: function(str){
            return str.replace(/^\s+|\s+$/g, '');
        }
    }
 });

//构造函数的形式返回接口
 F.define('dom', function(){
    var $ = function(id){
        $.dom = document.getElementById(id);
        //返回构造函数对象
        return $;
    }

    $.html = function(html){
        if(typeof html === 'undefined'){
            return this.dom.innerHTML;
        }else{
            this.dom.innerHTML = html;
            return this;
        }
    }
    return $;
 });

 //先声明，后创建
 // 为dom模块添加addClass方法
 // 注意，此种添加模块方式之所以可行，是因为将模块添加到F对象上。模块化开发中只允许上面的添加方式
 // IE11下有问题
F.define('dom.addClass');
F.dom.addClass = function(type, fn){
    return function(className){
        if(!~this.dom.className.indexOf(className)){
            this.dom.className += ' ' + className;
        }
    }
}();

//模块调用方法
F.module = function(){
    var args = [].slice.call(arguments),
        fn = args.pop(),//回调函数
        //获取依赖模块，如果args[0]是数组，则依赖模块为args[0]，否则依赖模块为args
        parts = args[0] && args[0] instanceof Array ? args[0] : args,
        //依赖模块列表
        modules = [],
        i = 0,
        ilen = parts.length,
        modIDs = [],
        _parent,//父模块
        j, //模块路由层级索引
        jlen;//模块路由层级长度

    while(i < ilen){
        //模块路由
        if(typeof parts[i] === 'string'){
            //设置当前模块为父对象F
            _parent = this;
            //解析路由模块，并屏蔽掉模块父元素
            modIDs = parts[i].replace(/^F\./, '').split('.');
            for(j = 0, jlen = modIDs.length; j < jlen; j++){
                //重置父模块
                _parent = _parent[modIDs[j]] || false;
            }
            modules.push(_parent);
        }else{//模块为对象
            modules.push(parts[i]);
        }
        i++;
    }
    //执行回调函数
    fn.apply(null, modules);
};


























