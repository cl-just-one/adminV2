/*
 * @Author: chenglin 
 * @Date: 2019-06-20 16:23:08 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-21 11:40:57
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
          typeof reject == 'function' && reject(res.statusText)
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
  errorTip(msg) {
    alert(msg);
  }
}

export default MUtil;