import React, { Component } from 'react';

import RcPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

class index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <RcPagination {...this.props}
        hideOnSinglePage
        showQuickJumper/>
    );
  }
}

export default index;