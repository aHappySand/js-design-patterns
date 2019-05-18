/**
 * 节流延迟加载图片类
 * @param id 延迟加载图片的容器id
 * 图片的格式如下<img src="image/loading.gif" alt="" data-src="img/1.jpg">
 */
 function LazyLoad(id){
    this.conatiner = document.getElementById(id);
    this.imgs = this.getImgs();
    this.init();
 }
 LazyLoad.prototype = {
    init: function(){
        this.update();
        this.bindEvent();
    },
    //获取延迟加载图片
    getImgs: function(){
        var arr = [];
        var imgs = this.conatiner.getElementsByTagName('img');
        for(var i = 0, len = imgs.length; i<len;i++){
            arr.push(imgs[i]);
        }
        return arr;
    },
    //加载图片
    update: function(){
        var i = this.imgs.length;
        if(i == 0){
            return;
        }
        for(--i; i >= 0; i--){
            //图片在可视范围内
            if(this.shouldShow(i)){
                this.imgs[i].style.display = 'block';
                this.imgs[i].src = this.imgs[i].getAttribute('data-src');
                //清除缓存
                this.imgs.splice(i, 1);
            }
        }
    },
    //判断图片是否在可视范围内
    shouldShow:function(i){
        var img = this.imgs[i],
            //可视范围内顶部高度（页面滚动条top的值）
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //可视范围内底部的高度
            scrollBottom = scrollTop + document.body.clientHeight;
            //图片的底部位置
            imgTop = this.pageY(img),
            imgBottom = imgTop + img.offsetHeight;
        if(imgBottom > scrollTop && imgBottom < scrollBottom || (imgTop >scrollTop && imgTop < scrollBottom)){
            return true;
        }
        return false;
    },
    //获取元素页面中的纵坐标
    pageY: function(element){
        if(element.offsetParent){
            return element.offsetTop + this.pageY(element.offsetParent);
        }else{
            return element.offsetTop;
        }
    },
    //绑定事件
    on: function(element, type, fn){
        element.addEventListener ? element.addEventListener(type, fn, false) : element.attachEvent('on' + type, fn, false);
    },
    //为窗口绑定resize事件和scroll事件
    bindEvent: function(){
        var that = this;
        this.on(window, 'resize', function(){
            Throttle(that.update, {context: that});
        });
        this.on(window, 'scroll', function(){
            Throttle(that.update, {context: that});
        });
    }
 };