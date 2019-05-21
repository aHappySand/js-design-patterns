//~屏蔽压缩报错
~(function(){
    //闭包中获取全局变量
    var window = this || (0, eval)('this');
    // 获取页面字体大小，作为创建页面UI尺寸参考物
    var FONTSIZE = function(){
        //获取页面body元素 字体大小并转化为整数
        return parseInt(document.body.currentStyle ? 
            document.body.currentStyle['fontSize'] : 
            getComputedStyle(document.body, false)['fontSize'])
    }();
    // 视图模型对象
    var VM = function(){
        var Method = {
            /**
             * 进度条组件创建方法
             * @param dom 进度条容器
             * @param data 进度条数据模型
             */
            progressbar: function(dom, data){
                // 进度条进度完成容器
                var progress = document.createElement('div'),
                    // 数据模型结构 {position: 50}
                    param = data.data;
                progress.style.width = (param.position || 100) + '%';
                dom.className += ' ui-progressbar';
                dom.appendChild(progress);
            },
            /**
             * 滑动条组件创建办法
             * @param dom 滑动条容器
             * @param data 滑动条数据模型
             */
            slider: function(dom, data){
                // 滑动条拨片
                var bar = document.createElement('span'),
                    // 滑动条进度容器
                    progress = document.createElement('div'),
                    // 滑动条容量 提示信息
                    totleText = null,
                    // 滑动条划片 提示信息
                    progressText = null,
                    // 数据模型结构 {position: 60, totle: 200}
                    param = data.data,
                    // 容器元素宽度
                    width = dom.clientWidth,
                    // 容器元素横坐标
                    left = dom.offsetLeft,
                    realWidth = (param.position || 100) * width / 100;
                // 清空滑动条容器
                dom.innerHTML = "";
                //如果模型数据中提供容器总量信息，则创建滚动条提示文案
                if(param.totle){
                    // 容器总量 提示文案
                    text = document.createElement('b');
                    // 拨片位置提示文案
                    progressText = document.createElement('em');
                    // 设置容器总量提示文案
                    text.innerHTML = param.totle;
                    // 将容器总量提示文案元素添加到滑动条组件中
                    dom.appendChild(text);
                    dom.appendChild(progressText);
                }

                setStyle(realWidth);
                dom.className += ' ui-slider';
                dom.appendChild(progress);
                dom.appendChild(bar);
                function setStyle(w){
                    progress.style.width = w + 'px';
                    // 设置拨片横坐标
                    bar.style.left = w - FONTSIZE + 3  + 'px';
                    // 
                    if(progressText){
                        progressText.style.left = w - FONTSIZE / 2 * 2.4 + 'px';
                        progressText.innerHTML = parseFloat(w / width * 100).toFixed(2) + '%';
                    }
                }

                bar.onmousedown = function(){
                    document.onmousemove = function(event){
                        var e = event || window.event;
                        var w = e.clientX - left;
                        setStyle(w < width ? (w > 0 ? w : 0) : width);
                    }
                    document.onselectstart = function(){
                        return false;
                    };
                };

                document.onmouseup = function(){
                    document.onmousemove = null;
                    document.onselectstart = null;
                };
            }
        };

        function getBindData(dom){
            var data = dom.getAttribute('data-bind');
            return !!data && (new Function("return ({" + data + "})"))();
        }

        return function(){
            var doms = document.getElementsByTagName('*');
            ctx = null;
            for(var i = 0; i < doms.length; i++){
                ctx = getBindData(doms[i]);
                ctx.type && Method[ctx.type] && Method[ctx.type](doms[i], ctx);
            }
        };
    }();
    //将视图模型对象绑定在window上，供外部获取
    window.VM = VM;
})();













