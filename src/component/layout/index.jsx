import React, { Component } from 'react';

import './theme.css'

class Layout extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div id="wrapper">
        Test Layout
        {/* 
          <TopNav/>
          <SideNav/>
        */}
        { this.props.children }
      </div>
    );
  }
}

export default Layout;