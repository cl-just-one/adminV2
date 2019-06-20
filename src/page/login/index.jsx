import React, { Component } from 'react';
import './index.scss'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  onInputChange(e) {
    let inputVal = e.target.value,
        inputName = e.target.name;
    console.log(inputName, inputVal);
    this.setState({
      [inputName]: inputVal
    })
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - Mall管理系统</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <input
                  type="type"
                  name="username"
                  className="form-control"
                  onChange={(e) => {this.onInputChange(e)}}
                  placeholder="请输入用户名" />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(e) => {this.onInputChange(e)}}
                  placeholder="请输入密码" />
                </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">登录</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;