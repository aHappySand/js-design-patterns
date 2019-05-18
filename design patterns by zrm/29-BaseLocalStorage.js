/**
 * 本地存储类
 * @param preID 本地存储数据库前缀
 * @param timeSign 时间戳与存储数据之间的拼接符
 */
 var BaseLocalStorage = function(preID, timeSign){
  this.preID = preID;
  this.timeSign = timeSign || '-';
 };

 BaseLocalStorage.prototype = {
  //操作状态
  status: {
    SUCCESS: 0, //成功
    FAILURE: 1, //失败
    OVERFLOW: 2, //溢出
    TIMEOUT: 3 //过期
  },
  storage: localStorage || window.localStorage,
  //获取本地存储数据库数据真实字段
  getKey: function(key){
    return this.preID + key;
  },
  /**
   *添加修改数据
   * @param key 数据字段标识
   * @param value 数据值
   * @param callback 回调函数
   * @param time 添加时间
   */
  set: function(key, value, callback, time){
    var status = this.status.SUCCESS,
      key = this.getKey(key);
    try{
      time = new Date(time).getTime() || time.getTime();
    }catch(e){
      //1个月的有效期
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }

    try{
      this.storage.setItem(key, time + this.timeSign + value);
    }catch(e){
      //溢出
      status = this.status.OVERFLOW;
    }
    callback && callback.call(this, status, key, value);
  },
  get: function(key, callback){
    var status = this.status.SUCCESS,
      key  = this.getKey(key),
      value = null,
      timeSignLen = this.timeSign.length,
      that = this,//缓存当前对象
      index,//时间戳与存储数据之间的拼接符起始位置
      time,//时间戳
      result;//最终结果
    try{
      value = that.storage.getItem(key);
    }catch(e){
      // 获取失败
      result = {
        status: that.status.FAILURE,
        value: null
      };
      callback && callback.call(this, result.status, result.value);
      return result;
    }

    //获取成功
    if(value){
      index = value.indexOf(that.timeSign);
      time += value.slice(0, index);
      if(new Date(time).getTime() > new Date().getTime() || time == 0){
        value = value.slice(index + timeSignLen);
      }else{//过期
        value = null,
        status = that.status.TIMEOUT;
        that.remove(key);
      }
    }else{
      status = that.status.FAILURE;
    }
    result = {
      status: status,
      value: value
    };
    callback && callback.call(this, status, value);
    return result;
  },
  remove: function(key, callback){
    var status = this.status.FAILURE,
      key = this.getKey(key),
      value = null;
    try{
      value = this.storage.getItem(key);
    }catch(e){

    }

    if(value){
      try{
        this.storage.removeItem(key);
        status = this.status.SUCCESS;
      }catch(e){

      }
    }
    value = status > 0 ? null: value.slice(value.indexOf(this.timeSign) + this.timeSign.length);
    callback && callback.call(this, status, value);
    return {
      status: status,
      value: value
    };
  }
 };