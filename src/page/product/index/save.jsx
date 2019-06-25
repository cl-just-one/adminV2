import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx';
import FileUpload from 'util/file-uploader/index.jsx';
import SimEditor from 'util/rich-editor/index.jsx';

import './save.scss'

const _mm = new MUtil();

class ProductSave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '',
      parentCategoryId: '',
      subImages: []
    }
  }
  // 品类选择
  onCategoryChange(categoryId, parentCategoryId) {
    console.log("categoryId:", categoryId);
    console.log("parentCategoryId:", parentCategoryId);
  }
  // 图片上传成功
  uploadOnSuccess(res) {
    this.state.subImages.push(res);
    let newSubImages = this.state.subImages;
    this.setState({
      subImages: newSubImages
    })
  }
  // 图片上传失败
  uploadOnError(errMsg) {
    _mm.errorTip(errMsg || '上传图片失败');
  }
  // 删除图片
  onDeleteImage(e) {
    let index = parseInt(e.target.getAttribute("index"));
    this.state.subImages.splice(index, 1);
    this.setState({
      subImages: this.state.subImages
    })
  }
  // 富文本值改变
  onValueChange(value) {
    console.log(value);
    
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品添加" />
        <div className="form-horizontal">
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
              {
                this.state.subImages.length ?
                (
                  this.state.subImages.map((image, index) => {
                    return (
                      <div className="img-icon" key={index}>
                        <img className="img" src={image.url}/>
                        <i className="fa fa-close" index={index} onClick={(e) => {this.onDeleteImage(e)}}/>
                      </div>
                    )
                  }) 
                ) : <div>请上传图片</div>
              }
            </div>
            <div className="col-md-offset-2 col-md-10 file-upload-con">
              <FileUpload onSuccess={(res) => this.uploadOnSuccess(res)}
                onError={(errMsg => this.uploadOnError(errMsg))}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <SimEditor onValueChange={value => {this.onValueChange(value)}}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">提交</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSave;