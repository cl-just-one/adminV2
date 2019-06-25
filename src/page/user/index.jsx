/*
 * @Author: chenglin 
 * @Date: 2019-06-24 10:53:06 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-24 17:50:20
 */
import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'
import RcPagination from 'util/pagination/index.jsx'
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class userList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1
    }
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then((res) => {
      this.setState(res);
    }, (errorMsg) => {
      this.setState({
        list: []
      });
      _mm.errorTip(errorMsg);
    })
  }
  componentDidMount() {
    this.loadUserList();
  }
  changePageNum(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList();
    });
  }
  render() {
    let tableHeads = ['ID', '用户名', '邮箱', '电话', '注册时间'];
    let tableBody = (
      this.state.list.map((user, index) => {
        return (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{new Date(user.createTime).toLocaleString()}</td>
          </tr>
        );
      })
    );
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表"/>
        <div className="row">
          <TableList tableHeads={tableHeads}>
            { tableBody }
          </TableList>
          <RcPagination current={this.state.pageNum}
            total={this.state.total}
            onChange={(pageNum) => {
              this.changePageNum(pageNum);
            }}/>
        </div>
      </div>
    );
  }
}

export default userList;