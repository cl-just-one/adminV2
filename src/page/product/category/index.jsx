/*
 * @Author: chenglin 
 * @Date: 2019-06-26 14:05:50 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-26 15:53:57
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId: this.props.match.params.categoryId || 0
    }
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then((res) => {
      this.setState({
        list: res
      });
    }, (errorMsg) => {
      this.setState({
        list: []
      });
      _mm.errorTip(errorMsg);
    })
  }
  componentDidMount() {
    this.loadCategoryList();
  }
  componentDidUpdate(prevProps, prevSTate) {
    let oldPath = prevProps.location.pathname,
        newPath = this.props.location.pathname,
        newId = this.props.match.params.categoryId;
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId || 0
      }, () => {
        this.loadCategoryList();
      })
    }

  }
  // 更新品类的名字
  onUpdateName(categoryId, categoryName) {
    let newName = window.prompt("请输入品类的名称", categoryName);
    if (newName) {
      _product.updateCategoryName({
        categoryId: categoryId,
        categoryName: newName
      }).then((res) => {
        _mm.successTips(res);
        this.loadCategoryList();
      }, (errMsg) => {
        _mm.errorTip(errMsg);
      })
    }
  }
  render() {
    let tableHeads = ['品类ID', '品类名称', '操作'];
    let tableBody = (
      this.state.list.map((category, index) => {
        return (
          <tr key={index}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <a className="opear"
                onClick={(e) => {this.onUpdateName(category.id, category.name)}}>修改名称</a>
              {
                category.parentId == 0
                ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                : null
              }
            </td>
          </tr>
        );
      })
    );
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表"/>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <div className="row">
          <TableList tableHeads={tableHeads}>
            { tableBody }
          </TableList>
        </div>
      </div>
    );
  }
}

export default CategoryList;