/*EditInPlaceField class*/
function EditInPlaceField(id, parent, value){
    this.id = id;
    this.value = value || 'defult value';
    this.parentElement = parent;

    this.createElements(this.id);
    this.attachEvents();
};

//添加事件
function addEvent(objElem, evt, callback){
    // objElem.attachEvents();
    objElem.addEventListener(evt, callback, false);
};

// Object.prototype.extend = function(source){
//     for(var key in source){
//         if(key != extend){
//             this[key] = source[key];
//         }
//     }
// }

function extend(target, source){
    for(var key in source){
        target[key] = source[key];
    }
    return target;
}

function jsonToStr(json){
    var arrKV = [];
    for(var key in json){
        arrKV.push(key + "=" + json[key]);
    }
    return arrKV.join("&");
}

//ajax请求
function ajaxRequest(options){
    var defaultConf = {
        type: 'POST',
        dataType: 'JSON',
        async: true,
        timeout: 30000,
        contentType:{
            "Content-type":"x-www-form-urlencoded"
        }
    }
    options = extend(defaultConf, options);
    
    var httpRequest = (function(){
        try{
            /** FF,Google **/
            return function(){
                return new XMLHttpRequest();
            }
        }catch(e){
            try{
                /** IE某些版本 **/
                return function(){
                    return new ActiveXObject("Msxml2.XMLHTTP");
                };
            }catch(e){
                try{
                    /** IE其他版本 （IE5 和 IE6）**/
                    return function(){
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    };
                }catch(e){
                    return null;
                }
            }
        }
    })();

    var XHR;
    if(httpRequest){
        XHR = new httpRequest();
    }else{
        alert("您的浏览器不支持ajax");
        return false;
    }

    if(options.beforeSend && options.beforeSend() === false){
        return false;
    }

    var timer;//超时设置
    var stateChangeFn = function(){
        /**
         * readyState 五个状态：0：未发送请求，1：已发送请求，2：已经握手，3：正在处理请求，4：请求处理完成
         * 0：请求未初始化（还没有调用open）
         * 1：请求已经建立，但是还没有发送（还没有调用open）
         * 2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）
         * 3：请求在处理中，通常响应中已有部分数据可用，但是服务器还没有完成响应的生成。
         * 4：响应已完成，您可以获取并使用服务器的响应了
         */

         /**
          * status:
          * 100： 客户必须继续发出请求
          * 101： 客户要求服务器根据请求转换HTTP协议版本
          * 200： 交易成功
          * 201： 提示知道新文件的URL
          * 202： 接受和处理、但处理未完成
          * 203： 返回信息不确定或不完整
          * 204： 请求收到，但返回消息为空
          * 205： 服务器完成了请求，用户代理必须复位当前已经浏览过的文件
          * 206： 服务器已经完成了部分用户的GET请求

          * 300： 请求的资源可在多处得到
          * 301： 删除请求数据
          * 302： 在其他地址发现了请求数据
          * 303： 建议客户访问其他URL或访问方式
          * 304： 客户端已经执行了GET，但文件未变化
          * 305： 请求的资源必须服从服务器指定的地址得到
          * 306： 前一版HTTP中使用的代码，现行版本不再使用
          * 307： 申明请求的资源临时性删除

          * 400： 错误请求，如语法错误
          * 401： 请求授权失败
          * 402： 保留有效Change To头响应
          * 403： 请求不允许
          * 404： 没有发现文件，查询或URI
          * 405： 用户在Request-Line字段定义的方法不允许
          * 406： 根据用户发送的Accept拖，请求资源不可访问
          * 407： 类似401，用户必须首先在代理服务器上得到授权
          * 408： 客户端没有在用户指定的饿时间内完成请求
          * 409： 对当前资源状态，请求不能完成
          * 410： 服务器上不再有此资源且无进一步的参考地址
          * 411： 服务器拒绝用户定义的Content-Length属性请求
          * 412： 一个或多个请求头字段在当前请求中错误
          * 413： 请求的资源大于服务器允许的大小
          * 414： 请求的资源URL长于服务器允许的长度
          * 415： 请求资源不支持请求项目格式
          * 416： 请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含if-Range请求头字段
          * 417： 服务器不满足请求Except头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求

          * 500： 服务器产生内部错误
          * 501： 服务器不支持请求的函数
          * 502： 服务器暂时不可用，有点是为了防止发生系统过载
          * 503： 服务器过载或暂停维修
          * 504： 关口过载，服务器使用另一个关口或服务器来响应用户，等待时间设定值较长
          * 505： 服务器不支持或拒绝支请求头中指定的HTTP版本

          1xx： 信息响应类，表示接收到请求并继续处理
          2xx： 处理成功响应类，表示动作被成功接收，理解和接受
          3xx： 重定向响应类，为了完成指定的动作，必须接受进一步处理
          4xx： 客户端错误，客户请求包含语法错误或不能正确执行
          5xx： 服务器端错误，服务器不能正确执行一个正确的请求
          */
         if(XHR.readyState == 4){
            var textStatus;
            if(XHR.status == 200){//响应成功
                options.success && options.success(XHR.responseText);
                //返回XML：XHR.responseXML
                textStatus = "sucess";
            }else{
                textStatus = XHR.status;
            }
            clearTimeout(timer);
            options["complete"] && options.complete(textStatus);
         }
    };

    if(options.type == "POST"){
        /**
         * method：请求的类型；GET 或 POST
         * url：文件在服务器上的位置
         * async：true（异步）或 false（同步）
         */
        XHR.open("POST", options.url, options.async);
        for(var key in options.contentType){
            XHR.setRequestHeader(key, options.contentType[key]);
        }
        XHR.onreadystatechange = stateChangeFn;
        if(options.data){
            XHR.send(jsonToStr(options.data));
        }else{
            XHR.send(null);
        }
    }else if(options.type == "GET"){
        XHR.open("GET", options.url + (options.data ? "?" + options.data : ""), options.async);
        XHR.onreadystatechange = stateChangeFn;
        XHR.send(null);
    }

    // XHR.getAllResponseHeaders();//获取所有的响应头
    // XHR.getResponseHeader('Last-Modified');//获取指定的响应头
    timer = setTimeout(function(){
        XHR.about();
        options["complete"] && options.complete();
    }, options.timeout);
}

EditInPlaceField.prototype = {
    createElements:function(){
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);

        this.saveButton = document.createElement('input');
        this.saveButton.type = 'button';
        this.saveButton.value = 'save';
        this.containerElement.appendChild(this.saveButton);

        this.cancelButton = document.createElement('input');
        this.cancelButton.type = 'button';
        this.cancelButton.value = 'cancel';
        this.containerElement.appendChild(this.cancelButton);


        this.convertToText();
    },
    attachEvents: function(){
        var that = this;
        addEvent(this.staticElement, 'click', function(){
            that.convertToEditable();
        });

        addEvent(this.saveButton, 'click', function(){
            that.save();
        });

        addEvent(this.cancelButton, 'click', function(){
            that.cancel();
        });

    }, 
    convertToEditable: function(){
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';

        this.setValue(this.value);
    },
    save: function(){
        this.value = this.getValue();
        var that = this;
        var optons = {
            type:"GET",
            url: 'http://127.0.0.1:8000?id=' + this.id + '&value=' + this.value,
            success: function(s){
                that.convertToText(s);
            },
            failure: function(){
                alert('Error saving value.');
            }
        };

        ajaxRequest(optons);
    },
    cancel: function(){
        this.convertToText();
    },
    convertToText: function(){
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
        this.staticElement.style.display = 'inline';

        this.setValue(this.value);
    },
    setValue: function(value){
        this.fieldElement.value = value;
        this.staticElement.innerHTML = value;
    },
    getValue: function(){
        return this.fieldElement.value;
    }
};


/* Extend function */
function extendObj(subClass, superClass){
    var F = function(){};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    //添加一个属性，继承的父类原型
    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor){
        superClass.prototype.constructor = superClass;
    }
}

/* EditInPlaceArea class */
function EditInPlaceArea(id, parent, value){
    EditInPlaceArea.superclass.constructor.call(this, id, parent, value);
}

extendObj(EditInPlaceArea, EditInPlaceField);
EditInPlaceArea.prototype.createElements = function(id){
    this.containerElement = document.createElement('div');
    this.parentElement.appendChild(this.containerElement);

    this.staticElement = document.createElement('p');
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML = this.value;

    this.fieldElement = document.createElement('textarea');
    this.fieldElement.value = this.value;
    this.containerElement.appendChild(this.fieldElement);

    this.saveButton = document.createElement('input');
    this.saveButton.type = 'button';
    this.saveButton.value = 'save';
    this.containerElement.appendChild(this.saveButton);

    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = 'cancel';
    this.containerElement.appendChild(this.cancelButton);

    this.convertToText();
};

EditInPlaceArea.prototype.convertToText = function(){
    this.fieldElement.style.display = 'none';
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';
    this.staticElement.style.display = 'block';

    this.setValue(this.value);
};

EditInPlaceArea.prototype.convertToEditable = function(){
    this.fieldElement.style.display = 'block';
    this.staticElement.style.display = 'none';
    this.saveButton.style.display = 'inline';
    this.cancelButton.style.display = 'inline';
    this.setValue(this.value);
};