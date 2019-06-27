/*
 * @Author: chenglin 
 * @Date: 2019-06-27 08:53:45 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-27 11:00:10
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import RcPagination from 'util/pagination/index.jsx';

import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

const _mm = new MUtil();
const _order = new Order();

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      total: 0,
      list: [],
      listType: 'list', // 搜索类型 list / search
      orderNo: ''
    }
  }
  loadOrderList() {
    _order.getOrderList({
      pageNum: this.state.pageNum,
      orderNo: this.state.orderNo
    }).then((res) => {
      this.setState(res);
    }, (errorMsg) => {
      this.setState({
        list: []
      });
      _mm.errorTip(errorMsg);
    })
  }
  componentDidMount() {
    this.loadOrderList();
  }
  // 页码改变
  changePageNum(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadOrderList();
    });
  }
  onSearch(orderNo) {
    let listType = orderNo == '' ? 'list' : 'search';
    this.setState({
      pageNum: 1,
      listType: listType,
      orderNo: orderNo
    }, () => {
      this.loadOrderList();
    });
  }
  render() {
    let tableHeads = ['订单ID', '支付方式', '收件人', '订单状态', '创建时间', '操作'];
    let tableBody = (
      this.state.list.map((order, index) => {
        return (
          <tr key={index}>
            <td>
              <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
            </td>
            <td>{order.paymentTypeDesc}</td>
            <td>{order.receiverName}</td>
            <td>{order.statusDesc}</td>
            <td>{order.createTime}</td>
            <td>
              <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
            </td>
          </tr>
        );
      })
    );
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表"/>
        <ListSearch onSearch={(orderNo) => this.onSearch(orderNo)}/>
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

export default OrderList;