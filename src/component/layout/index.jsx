import React, { Component } from 'react';

import NavTop from 'component/nav-top/index.jsx'
import NavSidebar from 'component/nav-sidebar/index.jsx'
import './theme.css'
import './index.scss'

class Layout extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div id="wrapper">
        <NavTop/>
        <NavSidebar/>
        { this.props.children }
      </div>
    );
  }
}

export default Layout;