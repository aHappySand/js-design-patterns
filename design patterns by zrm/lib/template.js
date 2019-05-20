//模板引擎模块
F.module('lib/template', function(){
    /**
     *处理数据与编译模板入口
     * @param str 模板容器id 或 模板字符串
     * @param data 渲染数据
     */
    var _TplEngine = function(str, data){
        //如果数据是数组
        if(data instanceof Array){
            var html = '',//缓存渲染模板结果
                i = 0, //数据索引
                len = data.length;//数据长度
            for(; i < len; i++){
                html += _getTpl(str)(data[i]);
            }
            return html;
        }else{
            return _getTpl(str)(data);
        }
    },
        /**
         *获取模板
         * @param str 模板容器id 或 模板字符串
         */
        _getTpl = function(str){
            var ele = document.getElementById(str);
            if(ele){//获取的元素存在
                //如果是input 或 textarea表单元素，则获取该元素的value，否则获取内容
                var html = /^(textarea|input)$/i.test(ele.nodeName) ? ele.value : ele.innerHTML;
                return _compileTpl(html);
            }else{
                return _compileTpl(str);
            }
        },
        //处理模板
        _dealTpl = function(str){
            var _left = '{%',//左分隔符
                _right = '%}';//右分隔符
            return String(str)
                //转义标签内的<
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                //过滤回车符、制表符、回车符
                .replace(/[\r\t\n]/g, '')
                .replace(new RegExp(_left + '=(.*?)' + _right, 'g'), "',typeof($1) === 'undefined' ? '' : $1, '")
                .replace(new RegExp(_left, 'g'), "');")
                .replace(new RegExp(_right, 'g'), "template_array.push('");
        },
        //编译执行
        _compileTpl = function(str){
            var fnBody = "var template_array = [];\
            var fn = (function(data){\
                var template_key = '';\
                for(var key in data){\
                    template_key += ('var ' + key + '=data[\"'+key+'\"];');\
                }\
                eval(template_key);\
                template_array.push('" + _dealTpl(str) + "');\
                template_key = null;\
            })(templateData);\
            fn = null;\
            return template_array.join('');\
             ";
            return new Function('templateData', fnBody);
        };
    return _TplEngine;
});
