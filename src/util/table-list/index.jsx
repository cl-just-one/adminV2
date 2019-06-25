import React, { Component } from 'react';

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoading: true
    }
  }
  componentWillReceiveProps() {
    this.setState({
      firstLoading: false
    })
  }
  render() {
    // 表头信息
    let tableHeader = this.props.tableHeads.map((tableHead, index) => {
      if (typeof tableHead == "object") {
        return <th key={index} width={tableHead.width}>{tableHead.name}</th>
      } else if (typeof tableHead == "string") {
        return <th key={index}>{tableHead}</th>
      }
    })
    // 列表内容
    let listBody = this.props.children;
    let errorInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className="text-center">
          {
            this.state.firstLoading ? '正在加载数据...' : '该列表数据为空!'
          }
        </td>
      </tr>
    );
    let tableBody = listBody.length > 0 ? listBody : errorInfo;
    return (
      <div className="col-md-12">
        <table className="table table-triped table-bordered">
          <thead>
            <tr>
              {tableHeader}
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableList;