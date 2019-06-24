/*
 * @Author: chenglin 
 * @Date: 2019-06-24 10:26:21 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-24 11:18:03
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'

class errorPage extends Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="出错啦!"/>
        <div className="row">
          <div className="col-md-12">
            <span>找不到该路径，</span>
            <Link to="/">点击返回首页</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default errorPage;