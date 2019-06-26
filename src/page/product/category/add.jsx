/*
 * @Author: chenglin 
 * @Date: 2019-06-26 17:18:02 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-26 18:02:49
 */
import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentId: 0,
      categoryName: '',
      categoryList: []
    }
  }
  componentDidMount() {
    this.loadCategoryList();
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentId).then((res) => {
      this.setState({
        categoryList: res
      })
    }, (errMsg) => {
      _mm.errorTip(errMsg);
    })
  }
  onValueChange(e) {
    let name = e.target.name,
        value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  onSubmit() {
    let categoryName = this.state.categoryName;
    if (categoryName) {
      _product.addCategory({
        parentId: this.state.parentId,
        categoryName: this.state.categoryName,
      }).then((res) => {
        _mm.successTips(res);
        this.props.history.push('/product-category/index');
      }, (errMsg) => {
        _mm.errorTip(errMsg);
      })
    } else {
      _mm.errorTip('请输入品类名称！');
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title='品类添加' />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">品类选择</label>
            <div className="col-md-5">
              <select className="form-control"
                name="parentId"
                onChange={(e) => {this.onValueChange(e)}}>
                <option value="0">/根品类</option>
                {
                  this.state.categoryList.map((category, index) => {
                    return <option value={category.id}>/根品类/{category.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">品类名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control"
                name="categoryName"
                value={this.state.name}
                onChange={(e) => {this.onValueChange(e)}}
                placeholder="请输入品类名称" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary"
                onClick={(e) => {this.onSubmit(e)}}>提交</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryAdd;