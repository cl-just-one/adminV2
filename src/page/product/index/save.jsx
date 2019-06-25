import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';

class ProductSave extends Component {
  onCategoryChange(categoryId, parentCategoryId) {
    console.log("categoryId:", categoryId);
    console.log("parentCategoryId:", parentCategoryId);
    
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品添加" />
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="请输入商品名称" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="请输入商品描述" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品分类</label>
            <CategorySelector onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">价格</label>
            <div className="col-md-2">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="价格" />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">库存</label>
            <div className="col-md-2">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="库存" />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              KKK
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              XXX
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">提交</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductSave;