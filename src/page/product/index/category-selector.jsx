/*
 * @Author: chenglin 
 * @Date: 2019-06-25 10:40:47 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-25 14:37:40
 */
import React, { Component } from 'react';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx';

import './category-selector.scss'

const _product = new Product();
const _mm = new MUtil();

class CategorySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    };
  }
  componentDidMount() {
    this.loadFirstCategoryList();
  }
  // 查询一级分类
  loadFirstCategoryList() {
    _product.getCategoryList().then((res) => {
      this.setState({
        firstCategoryList: res
      })
    }, (errMsg) => {
      _mm.errorTip(errMsg);
    })
  }
  loadSecondCategoryList() {
    _product.getCategoryList(this.state.firstCategoryId).then((res) => {
      this.setState({
        secondCategoryList: res
      })
    }, (errMsg) => {
      _mm.errorTip(errMsg);
    })
  }
  // 选择一级分类
  onFirstCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryList: [],
      secondCategoryId: 0
    }, () => {
      // 更新二级分类
      this.loadSecondCategoryList();
      this.onPropsCategoryChange();
    })
  }
  // 选择二级分类
  onSecondCategoryChange(e) {
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue
    }, () => {
      this.onPropsCategoryChange();
    })
  }
  onPropsCategoryChange() {
    let categpryChangeable = typeof this.props.onCategoryChange === 'function';
    if (this.state.secondCategoryId) {
      categpryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    } else {
      categpryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select className="form-control cate-selector"
          onChange={(e) => {this.onFirstCategoryChange(e)}}>
          <option value=''>请选择一级分类</option>
          {
            this.state.firstCategoryList.map((category, index) => {
              return (
                <option value={category.id} key={index}>{category.name}</option>
              );
            })
          }
        </select>
        {
          this.state.secondCategoryList.length ?
            (
              <select className="form-control cate-selector"
              onChange={(e) => {this.onSecondCategoryChange(e)}}>
                <option value="">请选择二级分类</option>
                {
                  this.state.secondCategoryList.map((category, index) => {
                    return (
                      <option value={category.id} key={index}>{category.name}</option>
                    );
                  })
                }
              </select>
            ) : null
        }
      </div>
    );
  }
}

export default CategorySelector;