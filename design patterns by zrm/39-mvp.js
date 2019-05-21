~(function(window){
    var MVP = function(modeName, pst, data, vie){
        MVP.model.setData(modeName, data);
        MVP.presenter.add(modeName, pst);
    };
    // 数据层
    MVP.model = function(){
        var M = {};
        M.data = {
            nav: [
                {
                    text: '新闻头条',
                    mode: 'news',
                    url: 'http://www.baidu.com'
                },
                {
                    text: '最新电影',
                    mode: 'movie',
                    url: 'http://www.baidu.com'
                },
                {
                    text: '热门游戏',
                    mode: 'game',
                    url: 'http://www.baidu.com'
                },
                {
                    text: '今日特价',
                    mode: 'price',
                    url: 'http://www.baidu.com'
                }
            ]
        };
        M.conf = {};
        return {
            getData: function(m){
                return M.data[m];
            },
            /**
             * 设置数据
             * @param m 模块名
             * @param v 模块数据
             */
            setData: function(m, v){
                M.data[m] = v;
                return v;
            },
            getConf: function(c){
                return M.conf[c];
            },
            /**
             * 设置配置项
             * @param c 配置项名称
             * @param v 配置项值
             */
            setConf: function(c, v){
                M.conf[c] = v;
                return v;
            }
        };
    }();
    // 视图层
    MVP.view = function(){
        //子元素或兄弟元素替换模板
        var REPLACEKEY = '__REPLACEKEY__';
        // 获取完整元素模板
        function getHTML(str, replacePos){
            return str.replace(/^([\w\d]+)([^\{\}]*)?(\{([@\w]+)\})?(.*?)$/, function(match, $1, $2, $3, $4, $5){
                $2 = $2 || '';//元素属性参数容错处理
                $3 = $3 || '';//{元素内容} 参数容错处理
                $4 = $4 || '';//元素内容参数容错处理
                //去除元素内容后面 添加的 元素属性 中 的{}内容
                $5 = $5.replace(/\{([@\w]+)\}/g, '') || '';//
                //以str=div举例：如果div元素有子元素则表示成<div>__REPLACEKEY__</div>,
                //              如果div有兄弟元素则表示成<div>x</div>__REPLACEKEY__,
                //              否则表示成<div>x</div>

                return type === 'in' ? 
                        '<' + $1 + $2 + $5 + '>' + $4 + REPLACEKEY + '</' + $1 + '>' : 
                      (type === 'add' ? 
                        '<' + $1 + $2 + $5 + '>' + $4 + '</' + $1 + '>' + REPLACEKEY :
                        '<' + $1 + $2 + $5 + '>' + $4 + '</' + $1 + '>');
            })
            // 处理特殊标识#--id属性
            .replace(/#([@\-\w]+)/g, ' id="$1" ')
            // 处理.--class属性
            .replace(/\.([@\-\w]+)/g, ' class="$1" ').
            .replace(/\[([^\]]+)\]/g, function(match, $1){
                var a = $1
                    // 过滤引号
                    .replace(/'|"/g, '')
                    .split(' '),
                    //属性模板字符串
                    h = '';
                for(var j = 0, len = a.length; j < len; j++){
                    h += ' ' + a[j].replace(/=(.*)/g, '="$1"')
                }
                return h;
            })
            // 处理可替换的内容
            .replace(/@(\w+)/g, '{#$1#}');
        }

        /**
         * 数组迭代器
         * @param arr 数组
         * @param fn 回调函数
         */
        function eachArr(arr, fn){
            for(var i = 0, len = arr.length; i < len; i++){
                fn(i, arr[i], len);
            }
        }


        /**
         * 替换兄弟元素模板 或 子元素模板
         * @param str 原始字符串
         * @param rep 兄弟元素模板 或 子元素模板
         */
        function formateItem(str, rep){
            return str.replace(new RegExp(REPLACEKEY, 'g'), rep);
        }


        return function(str){
            'li.@mode @choose @last[data-mode=@mode]>a#nav_@mode.nav-@mode[href=@url title=@text]>i.nav-icon-@mode+span{@text}'
            var part = str
                // 去掉首尾空白符
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s+>/g, '>')
                .replace(/>\s+/g, '>')
                .split('>'),
                //模板视图 根模板
                html = REPLACEKEY,
                //同层元素
                item,
                //同级元素模板
                nodeTpl;
            eachArr(part, function(partIndex, partValue, partlen){
                item = partValue.split('+');
                nodeTpl = REPLACEKEY;
                //遍历同级 每一个元素
                eachArr(item, function(itemIndex, itemValue, itemLen){
                    //用渲染元素 得到的 模板 去 渲染同级元素模板，这里简化逻辑处理
                    // 如果itemIndex（同级元素索引）对应元素 不是 最后一个 则作为兄弟元素处理
                    // 否则，如果partIndex（层级索引）对应的层级不是最后一层， 则作为父级处理
                    // (该层级有子层级，即该元素是父元素)
                    // 否组，该元素无兄弟元素，无子元素
                    nodeTpl = formateItem(nodeTpl, getHTML(itemValue, 
                        itemIndex===itemLen-1 ?(partIndex === partlen - 1 ? '' : 'in') : 'add'));
                });
                //用渲染子层级得到的模板 去 渲染父层级模板
                html = formateItem(html, nodeTpl);
            });
        }



        var itm = {
            nav: [
                    '<li class="{#mode#} {#choose#} {#last#}" data-mode="{#mode#}">',
                        '<a id="nav_{#mode#}" class="nav-{#mode#}" href="{#url#}" title="{#title#}">',
                            '<i class="nav-icon-{#mode#}"></i>',
                            '<span>{#text#}</span>',
                        '</a>',
                    '</li>'
                ].join('')
        };
        return function(type){
            return itm[type];
        }
    }();
    // 管理层
    MVP.presenter = function(){
        var V = MVP.view;
        var M = MVP.model;
        function formatStr(str, data){
            var html = "";
            if(data instanceof Array){
                for(var i = 0, len = data.length; i < len; i++){
                    html += str.replace(/\{#(\w+)#\}/g, function(match, key){
                        return typeof data[i][key] === 'undefined' ? '' : data[i][key];
                    });
                }
            }else{
                html = str.replace(/\{#(\w+)#\}/g, function(match, key){
                    return typeof data[key] === 'undefined' ? '' : data[key];
                });
            }
            return html;
        }

        var C = {
            /**
             * 导航管理器
             * @param M 数据层对象
             * @param V 视图层对象
             */
            nav: function(M, V){
                var data = M.getData('nav');
                data[0].choose = 'choose';
                data[data.length-1].last = 'last';
                var tpl = V('nav');

                var dom = document.createElement('ul');
                dom.className = "navigation";
                dom.id = 'nav';

                dom.innerHTML = formatStr(tpl, data);
                document.getElementById('container').appendChild(dom);
            }
        };
        return {
            init: function(){
                for(var i in C){
                    C[i] && C[i](M, V, i);
                }
            },
            add: function(modeName, pst){
                C[modeName] = pst;
                return this;
            }
        };
    }();

    MVP.init = function(){
        this.presenter.init();
    };
    // 暴露MVP，这样就可以在外部访问MVP
    window.MVP = MVP;
})(window);

















