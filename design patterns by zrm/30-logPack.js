//打包统计对象
var LogPack = function(){
    var data = [], //请求缓存数组
        MaxNum = 5, //请求缓存最大值
        itemSplitStr = '|',//统计项统计参数间隔符
        keyValueSplitStr = "*", //统计项统计键值对间隔符
        img = new Image();//请求触发器，通过图片src属性实现简单的get请求
    //发送请求方法
    function sendLog(){
        //请求参数
        var logStr = "",
            fireData = data.splice(0, MaxNum);
        //遍历统计项
        for(var i  = 0, len = fireData.length;  i < len; i++){
            //添加统计项顺序suoyin
            logStr += 'log' + i + '=';
            for(var j in  fireData[i]){
                //添加统计项参数 键+间隔符+值
                logStr += j + keyValueSplitStr + fireData[i][j];
                logStr += itemSplitStr;
            }
            logStr = logStr.replace(/\|$/, '') + '&';
        }
        debugger;
        //添加统计项打包长度
        logStr += 'logLength=' + len;
        img.src = 'a.gif?' + logStr;
    }
    return function(param){
        if(!param){
            sendLog();
            return;
        }
        //添加统计项
        data.push(param);
        data.length >= MaxNum && sendLog();
    }
}();