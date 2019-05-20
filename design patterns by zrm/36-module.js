~(function(F){
    //模块缓存器
    var moduleCache = {},
        /**
         * 设置模块并执行模块构造函数
         * @param moduleName 模块id名称
         * @param params 依赖模块
         * @param callback 模块构造函数
         */
        setModule = function(moduleName, params, callback){
            var _module, fn;
            if(moduleCache[moduleName]){
                _module = moduleCache[moduleName];
                _module.status = 'loaded';
                _module.exports = callback ? callback.apply(_module, params) : null;
                while(fn = _module.onload.shift()){
                    fn(_module.exports);
                }
            }else{
                callback && callback.apply(null, params);
            }
        },

        /**
         * 异步加载依赖模块所在文件
         * @param moduleName 模块路径（id）
         * @param callback 模块加载完成 回调函数
         */
        loadModule = function(moduleName, callback){
            //依赖模块
            var _module;
            //依赖模块被要求加载过
            if(moduleCache[moduleName]){
                _module = moduleCache[moduleName];
                if(_module.status === 'loaded'){
                    setTimeout(callback(_module.exports), 0);
                }else{
                    // 缓存该模块所处文件加载完成回调函数
                    _module.onload.push(callback);
                }
            }else{//模块第一次被依赖引用
                moduleCache[moduleName] = {
                    moduleName: moduleName,//模块ID
                    status: 'loading', //模块对应文件加载状态
                    exports: null, // 模块接口
                    onload: [callback] //模块对应文件加载完成后回调函数缓冲器
                };
                loadScript(getUrl(moduleName));
            }
        },
        getUrl = function(moduleName){
            return String(moduleName).replace(/\.js$/g, '') + '.js';
        },
        loadScript = function(src){
            var _script = document.createElement('script');
            _script.type = "text/javascript";
            _script.charset = "UTF-8";
            _script.async = true;
            _script.src = src;
            document.getElementsByTagName('head')[0].appendChild(_script);
        };
    
    /**
     * 创建 或 调用模块方法
     * @param url 模块url
     * @param modDeps 依赖模块
     * @param modCallback 模块主函数
     */
     F.module = function(url, modDeps, modCallback){
        var args = [].slice.call(arguments),
            // 获取模块构造函数
            callback = args.pop(),
            deps = (args.length && args[args.length-1] instanceof Array) ? args.pop() : {},
            // 该模块url（模块ID）
            url = args.length ? args.pop() : null,
            params = [],//依赖模块序列
            depsCount = 0,//未加载的依赖模块数量统计
            i = 0,
            len;//依赖模块序列长度
        if(len = deps.length){
            while(i < len){//遍历依赖模块
                // 闭包保存i
                (function(i){
                    // 增加未加载依赖模块数量  
                    depsCount++;
                    loadModule(deps[i], function(mod){
                        //依赖模块序列中添加依赖模块接口引用
                        params[i] = mod;
                        //依赖模块加载完成
                        depsCount--;
                        //依赖模块全部加载完
                        if(depsCount === 0){
                            // 在模块缓存器中矫正该模块，并执行构造函数
                            setModule(url, params, callback);
                        }
                    });
                })(i);
                //遍历下一个依赖模块
                i++;
            }
        }else{
            // 无依赖模块，直接执行回调函数
            setModule(url, [], callback);
        }
     };
})((function(){
    // 创建模块管理器对象，并保存在全局作用域中
    return window.F = {};
})());

















