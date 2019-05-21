//页面加载后创建MVC对象
$(function(){
    var MVC = MVC || {};
    //数据模型层
    MVC.model = function(){
        //内部数据对象
        var M = {};
        // 服务器端获取数据
        // 目前写在页面中
        M.data = {
            slideBar: [
                {
                    text: '萌妹子',
                    icon: 'image/left_meng.png',
                    title: '喵儿萝莉的千本樱',
                    content: '自古幼女有三好~',
                    img: 'image/left_meng_img.png',
                    href: 'http://moe.hao123.com'
                },
                {
                    text: '动漫',
                    icon: 'image/left_comic.png',
                    title: '喵儿萝莉的千本樱',
                    content: '自古幼女有三好~',
                    img: 'image/left_meng_img.png',
                    href: 'http://moe.hao123.com'
                },
                {
                    text: 'lol直播',
                    icon: 'image/left_lol.png',
                    title: '喵儿萝莉的千本樱',
                    content: '自古幼女有三好~',
                    img: 'image/left_meng_img.png',
                    href: 'http://moe.hao123.com'
                },
                {
                    text: '网络剧',
                    icon: 'image/left_tv.png',
                    title: '喵儿萝莉的千本樱',
                    content: '自古幼女有三好~',
                    img: 'image/left_meng_img.png',
                    href: 'http://moe.hao123.com'
                }
            ]
        };
        //配置数据，页面加载时即提供
        M.conf = {
            //侧边栏导航动画配置数据
            slideBarCloseAnimate: false
        };

        return {
            //获取服务器端的数据
            getData: function(m){
                return M.data[m];
            },
            getConf: function(c){
                return M.conf[c];
            },
            //设置服务器端数据
            setData: function(m, v){
                M.data[m] = v;
                return this;
            },
            setConf: function(c, v){
                M.conf[c] = v;
                return this;
            }
        };
    }();
    //视图层    
    MVC.view = function(){
        var M = MVC.model;
        function formatStr(str, data){
          return str.replace(/\{#(\w+)#\}/g, function(match, key){
            return typeof data[key] === undefined ? '' : data[key];
          });
        }
        //内部视图创建方法对象
        var V = {
            createSlideBar: function(){
                //导航图标内容
                var html = '',
                    data = M.getData('slideBar');
                    //屏蔽无效数据
                if(!data || !data.length){
                    return ;
                }

                var dom = document.createElement('div');
                dom.className = 'slidebar';
                dom.id = 'slidebar';

                var tpl = {
                    container: [
                        '<div class="slidebar-inner"><ul>{#content#}</ul></div>',
                        '<a hidefocus href="#" class="slidebar-close" title="收起">收起</a>'
                    ].join(''),
                    item: [
                        '<li>',
                            '<a class="icon" href="{#href#}">',
                                '<img src="{#icon#}">',
                                '<span>{#text#}</span>',
                            '</a>',
                            '<div class="box">',
                                '<div>',
                                    '<a class="title" href="{#href#}">{#title#}</a>',
                                    '<a href="{#href#}">{#content#}</a>',
                                '</div>',
                                '<a class="image" href="{#href#}"><img src="{#img#}" /></a>',
                            '</div>',
                        '</li>'
                    ].join('')
                };
                //渲染全部导航图片模块
                for(var i = 0, len = data.length; i < len; i++){
                    html += formatStr(tpl.item, data[i]);
                }
                //渲染容器
                html = formatStr(tpl.container, {content: html});
                dom.innerHTML = html;
                document.body.appendChild(dom);
            }
        };
        return function(v){
            //根据视图名称返回视图
            V[v]();
        }
    }();
    //控制器层
    MVC.ctrl = function(){
        var M = MVC.model;
        var V = MVC.view;
        var C = {
            initSlideBar: function(){
                //渲染导航栏模块视图
                V('createSlideBar');
                $('li', $('#slidebar'))
                .on('mouseover', function(e){
                    $(this).addClass('show');
                })
                .on('mouseout', function(e){
                    $(this).removeClass('show');
                });

                $('.slidebar-close', $('#slidebar'))
                .on('click', function(){
                    //正在执行动画
                    if(M.getConf('slideBarCloseAnimate')){
                        return;
                    }
                    M.setConf('slideBarCloseAnimate', true);
                    var $this = $(this);
                    if($this.hasClass('is-close')){
                        $this.removeClass('is-close');

                        // $('.slidebar-inner', $('#slidebar'))
                        // .animate({
                        //     duration: 800,
                        //     type: 'easeOutQuart',
                        //     main: function(dom){
                        //         dom.css('left', -50 + this.tween * 50 + 'px');
                        //     }
                        // });
                        $('.slidebar-inner', $('#slidebar')).show();
                    }else{
                        $this.addClass('is-close');
                        $('.slidebar-inner', $('#slidebar')).hide();
                    }
                    M.setConf('slideBarCloseAnimate', false);
                })
            }
        };

        C.initSlideBar();
    }();
});