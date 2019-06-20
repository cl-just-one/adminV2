/*
 * @Author: chenglin 
 * @Date: 2019-06-20 16:01:30 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-20 16:14:36
 */
import React, { Component } from 'react';

class PageTitle extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    document.title = this.props.title + '-HAPPY MALL'
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageTitle;