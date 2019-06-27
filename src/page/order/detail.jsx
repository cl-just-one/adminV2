/*
 * @Author: chenglin 
 * @Date: 2019-06-27 10:35:52 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-27 11:20:02
 */
import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import MUtil from 'util/mm.jsx'
import Order from 'service/order-service.jsx';

import './detail.scss'

const _mm = new MUtil();
const _order = new Order();

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: this.props.match.params.orderNo,
      orderInfo: {}
    }
  }
  componentDidMount() {
    this.loadOrderDetail();
  }
  // 加载产品信息
  loadOrderDetail() {
    // 有id表示编辑功能，表单回填
    _order.getOrderDetail(this.state.orderNo).then((res) => {
      this.setState({
        orderInfo: res
      });
    }, (errMsg) => {
      _mm.errorTip(errMsg);
    })
  }
  onSendGoods(e) {
    _order.onSendGoods(this.state.orderNo).then((res) => {
      this.loadOrderDetail();
    }, (errMsg) => {
      _mm.errorTip(errMsg);
    })
  }
  render() {
    let shippingVo = this.state.orderInfo.shippingVo || {},
        orderItemVoList = this.state.orderInfo.orderItemVoList || [];
    let tableHeads = [
      {name: '商品图片', width: '10%'},
      {name: '商品信息', width: '45%'},
      {name: '单价', width: '15%'},
      {name: '数量', width: '15%'},
      {name: '合计', width: '15%'}
    ];
    let tableBody = (
      orderItemVoList.map((order, index) => {
        return (
          <tr key={index}>
            <td>
              <img className="p-img" alt={order.productName}
                src={`${this.state.orderInfo.imageHost}${order.productImage}`}/>
            </td>
            <td>{order.productName}</td>
            <td>￥{order.currentUnitPrice}</td>
            <td>{order.quantity}</td>
            <td>￥{order.totalPrice}</td>
          </tr>
        );
      })
    );
    return (
      <div id="page-wrapper">
        <PageTitle title="商品详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.createTime}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {shippingVo.receiverName}，
                {shippingVo.receiverProvince}
                {shippingVo.receiverCity}
                {shippingVo.receiverDistrict}
                {shippingVo.receiverAddress}
                {shippingVo.receiverPhone || shippingVo.receiverMobile}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.statusDesc}
                {
                  this.state.orderInfo.status == 20
                  ? <button className="btn btn-default btn-xs btn-send-goods"
                      onClick={(e) => {this.onSendGoods(e)}}>立即发货</button>
                  : null
                }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.payment}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-10">
              <TableList tableHeads={tableHeads}>
                { tableBody }
              </TableList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;