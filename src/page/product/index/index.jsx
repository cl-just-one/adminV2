/*
 * @Author: chenglin 
 * @Date: 2019-06-24 15:41:57 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-26 14:05:53
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mm.jsx'
import TableList from 'util/table-list/index.jsx'
import ListSearch from './list-search.jsx'
import RcPagination from 'util/pagination/index.jsx'
import Product from 'service/product-service.jsx';

import './index.scss'

const _product = new Product();
const _mm = new MUtil();

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list'
    }
  }
  loadProductList() {
    let listParam = {};
    listParam.pageNum = this.state.pageNum;
    listParam.listType = this.state.listType;
    if (this.state.listType == 'search') {
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }
    // 请求接口
    _product.getProductList(listParam).then((res) => {
      this.setState(res);
    }, (errorMsg) => {
      this.setState({
        list: []
      });
      _mm.errorTip(errorMsg);
    })
  }
  componentDidMount() {
    this.loadProductList();
  }
  changePageNum(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList();
    });
  }
  onSearch(searchType, searchKeyword) {
    let listType1 = searchKeyword == '' ? 'list' : 'search';
    this.setState({
      pageNum: 1,
      listType: listType1,
      searchType: searchType,
      searchKeyword: searchKeyword
    }, () => {
      this.loadProductList();
    });
  }
  loadProductStatus(e, productId, productSatus) {
    let newStatus = productSatus == 1 ? 2 : 1,
      confirmTips = productSatus == 1 ? '确定要下架该产品吗？' : "确定要上架该产品吗";
    if (window.confirm(confirmTips)) {
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then((successMsg) => {
        _mm.successTips(successMsg);
        this.loadProductList();
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
    }
  }
  onValChange(e) {
    let type = e.target.value
  }
  render() {
    let tableHeads = [
      { name: "商品ID", width: "10%" },
      { name: "商品信息", width: "50%" },
      { name: "价格", width: "10%" },
      { name: "状态", width: "15%" },
      { name: "操作", width: "15%" },
    ];
    let tableBody = this.state.list.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.id}</td>
          <td>
            <p>{product.name}</p>
            <p>{product.subtitle}</p>
          </td>
          <td>{product.price}</td>
          <td>
            <p>{product.status == 1 ? "在售" : "已下架"}</p>
            <button className="btn btn-xs btn-warning"
              onClick={(e) => { this.loadProductStatus(e, product.id, product.status) }}>
              {product.status == 1 ? "下架" : "上架"}
            </button>
          </td>
          <td>
            <Link to={`/product/detail/${product.id}`}>详情</Link><br />
            <Link to={`/product/save/${product.id}`}>编辑</Link>
          </td>
        </tr>
      );
    });
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表">
          <div className="page-header-right">
            <Link to="/product/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span>商品添加</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)}/>
        <div className="row">
          <TableList tableHeads={tableHeads}>
            {tableBody}
          </TableList>
          <RcPagination current={this.state.pageNum}
            total={this.state.total}
            onChange={(pageNum) => {
              this.changePageNum(pageNum);
            }} />
        </div>
      </div>
    );
  }
}

export default ProductList;