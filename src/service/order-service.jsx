/*
 * @Author: chenglin 
 * @Date: 2019-06-27 09:01:54 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-27 11:09:16
 */
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class Order {
  // 获取订单列表
  getOrderList(orderInfo) {
    let url = '',
        data = {};
    if (orderInfo.orderNo) {
      url = '/manage/order/search.do',
      data.orderNo = orderInfo.orderNo;
    } else {
      url = '/manage/order/list.do',
      data.pageNum = orderInfo.pageNum;
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  // 获取订单详情
  getOrderDetail(orderNo) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNo
      }
    })
  }
  // 发货
  onSendGoods(orderNo) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo: orderNo
      }
    })
  }
}

export default Order;