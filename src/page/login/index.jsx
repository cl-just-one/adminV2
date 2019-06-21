import React, { Component } from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

import './index.scss'

const _mm = new MUtil();
const _user = new User();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect:  _mm.getUrlParam("redirect") || "/"
    }
  }
  componentWillMount() {
    document.title = "登录 - HAPPY MALL"
  }
  // 输入改变
  onInputChange(e) {
    let inputVal = e.target.value,
        inputName = e.target.name;
    this.setState({
      [inputName]: inputVal
    })
  }
  // 回车事件
  onInputKeyUp(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }
  // 登录
  login() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let loginCheckResult = _user.checkLogin(loginInfo);
    if (loginCheckResult.status) {
      _user.login(loginInfo).then((res) => {
        _mm.setLocalStorage("userInfo", res);
        this.props.history.push(this.state.redirect);
      }, (errMsg) => {
        _mm.errorTip(errMsg)
      })
    } else {
      _mm.errorTip(loginCheckResult.msg)
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - Mall管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input
                  type="type"
                  name="username"
                  className="form-control"
                  onKeyUp={(e) => {this.onInputKeyUp(e)}}
                  onChange={(e) => {this.onInputChange(e)}}
                  placeholder="请输入用户名" />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onKeyUp={(e) => {this.onInputKeyUp(e)}}
                  onChange={(e) => {this.onInputChange(e)}}
                  placeholder="请输入密码" />
                </div>
              <button className="btn btn-lg btn-primary btn-block"
                onClick={() => {this.login()}}>登录</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;