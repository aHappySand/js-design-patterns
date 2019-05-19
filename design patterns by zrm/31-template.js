var TL = TL || {};
TL.root = document.getElementById('container');
//模板渲染方法
TL.formatString = function(str, data){
    return str.replace(/\{#([\w\d]+)#\}/g, function(all, mat){
        return typeof data[mak] === undefined ? '' : data[mat];
    });
}
//模板生成器
TL.view = function(name){
    //模板库
    var v = {
        //代码模板
        code: '<pre><code>{#code#}</code></pre>',
        img: '<img src="{#src#}" alt="{#alt#}" title="{#title#}">',
        part: '<div id="{#id#}" class="{#class#}">{#part#}</div>',
        lilist: [
                '<li>',
                    '<strong>{#strong#}</strong>',
                    '<span>{#span#}</span>',
                '</li>'
            ].join(''),
        //组合模板
        theme: [
            '<div>',
                '<h1>{#title#}</h1>',
                '{#content#}'
            '</div>'
        ].join('')
    };

    if(Object.prototype.toString.call(name) === '[object Array]'){
        var tpl = '';
        for(var i = 0, len = name.length; i < len; i++){
            tpl += arguments.callee(name[i]);
        }
        return tpl;
    }else{
        return v[name] ? v[name] : '<'+name+'>{#'+name+'#}</'+name+'>';
    }
};
TL.strategy = {
    'list': function(data){
        var s = document.createElement('div'),//模板容器
            ul = '',//列表文字
            ldata = data.data.li,//列表数据
            //模块模板
            // tpl = [
            //     '<h2>{#h2#}</h2>',
            //     '<p>{#p#}</p>',
            //     '<ul>{#ul#}</ul>'
            // ].join(''),
            tpl = A.view(['h2', 'p', 'ul']),
            //列表模板
            // liTpl = [
            //     '<li>',
            //         '<strong>{#strong#}</strong>',
            //         '<span>{#span#}</span>',
            //     '</li>'
            // ].join('');
            liTpl = A.view('lilist');

        data.id && (s.id = data.id);
        //遍历列表
        for(var i = 0, len = ldata.length; i< len; i++){
            //如果有列表项数据
            if(ldata[i].strong || ldata[i].span){
                ul += A.formatString(liTpl, ldata[i]);
            }
        }
        //装饰列表数据
        data.data.ul = ul;
        s.innerHTML = A.formatString(tpl, data.data);
        A.root.appendChild(s);
    },
    'codePart': function(){},
    'onlyTitle': function(){},
    'guide': function(){}
};

TL.init = function(data){
    this.strategy[data.type](data);
};
