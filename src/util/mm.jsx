/*
 * @Author: chenglin 
 * @Date: 2019-06-20 16:23:08 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-21 17:19:14
 */
class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || {},
        success: (res) => {
          // 数据请求成功
          if (0 === res.status) {
            typeof resolve == 'function' && resolve(res.data, res.msg)
          } else if (10 === res.status) { // 没有登录状态，强制登录
            this.doLogin();
          } else {
            typeof reject == 'function' && reject(res.msg || res.data)
          }
        },
        error: (err) => {
          typeof reject == 'function' && reject(err.statusText)
        }
      })
    })
  }
  // 跳转登录
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }
  // 获取url参数
  getUrlParam(name) {
    // param=123&name=admin
    let queryString = window.location.search.split("?")[1] || '',
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result = queryString.match(reg);
    return result?result[2]:'';
  }
  // 错误提示
  errorTip(msg) {
    alert(msg);
  }
  // 本地存储
  setLocalStorage(name, data) {
    let dataType = typeof data;
    if (dataType == "object") {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (["number", "string", "boolean"].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    } else {
      alert("该数据结构不能用于本地存储")
    }
  }
  // 获取本地存储
  getLocalStorage(name) {
    let data = window.localStorage.getItem(name);
    if(data) {
        return JSON.parse(data);
    }
    else{
        return '';
    }
  }
  // 删除本地存储
  removeLocalStorage(name) {
    window.localStorage.removeItem(name);
  }
  
}

export default MUtil;