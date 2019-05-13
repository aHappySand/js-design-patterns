//实现对象
var CanvasCommand = (function(){
    //获取canvas
    var canvas = document.getElementById('canvas');
    //canvas 元素的上下文引用对象 缓存在命令对象的内部
    debugger;
    ctx = canvas.getContext('2d');

    //内部方法对象
    var Action = {
        //填充色彩
        fillStyle: function(c){
            ctx.fillStyle = c;
        },
        //填充矩阵
        fillRect: function(x, y, width, height){
            ctx.fillRect(x, y, width, height);
        },
        //描边色彩
        strokeStyle:function(c){
            ctx.strokeStyle = c;
        },
        //描边矩形
        strokeRect: function(x, y, width, height){
            ctx.strokeRect(x, y, width, height);
        },
        //填充字体
        fillText: function(text, x, y){
            ctx.fillText(text, x, y);
        },
        //开启路径
        beginPaht: function(){
            ctx.beginPaht();
        },
        //移动画笔触电
        moveTo:function(x, y){
            ctx.moveTo(x, y);
        },
        //画笔直线
        lineTo: function(x, y){
            ctx.lineTo(x, y);
        },
        //绘制弧线
        arc: function(x, y, r, begin, end, dir){
            ctx.arc(x, y, r, begin, end, dir);
        },
        //填充
        fill: function(){
            ctx.fill();
        },
        //描边
        stroke: function(){
            ctx.stroke();
        }
    };

    return {
        //命令接口
        execute: function(msg){
            if(!msg)
                return;
            if(msg.length){
                //遍历执行多个命令
                for(var i = 0, len = msg.length; i<len; i++){
                    arguments.callee(msg[i]);//递归执行
                }
            }else{
                msg.param = Object.prototype.toString.call(msg.param) === '[object Array]' ? msg.param : [msg.param];
                Action[msg.command].apply(Action, msg.param);
            }
        }
    };
})();