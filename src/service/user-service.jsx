/*
 * @Author: chenglin 
 * @Date: 2019-06-21 10:23:25 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-21 11:45:38
 */
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class User {
  // 用户登录
  login(loginInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo
    })
  }
  // 用户信息不合法检查
  checkLogin(loginInfo) {
    let username = $.trim(loginInfo.username),
        password = $.trim(loginInfo.password);
    // 用户名检查
    if (typeof username !== "string" || username.length === 0) {
      return {
        status: false,
        msg: "用户名不能为空"
      }
    }
    // 密码检查
    if (typeof password !== "string" || password.length === 0) {
      return {
        status: false,
        msg: "密码不能为空"
      }
    }
    return {
      status: true,
      msg: "验证通过"
    }
  }
}

export default User;