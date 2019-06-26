import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx';
import FileUpload from 'util/file-uploader/index.jsx';
import SimEditor from 'util/rich-editor/index.jsx';
import Product from 'service/product-service.jsx';

import './save.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: '',
      parentCategoryId: '',
      price: '',
      stock: '',
      subImages: [],
      detail: '',
      status: 1 // 表示商品在售状态
    }
  }
  componentDidMount() {
    this.loadProduct();
  }
  // 加载产品信息
  loadProduct() {
    // 有id表示编辑功能，表单回填
    if (this.state.id) {
      _product.getProduct(this.state.id).then((res) => {
        let images = res.subImages.split(",");
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        });
        res.defaultDetail = res.detail;
        this.setState(res);
      }, (errMsg) => {
        _mm.errorTip(errMsg);
      })
    }
  }
  // 品类选择
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentCategoryId
    })
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
  onRichEditorValueChange(value) {
    this.setState({
      detail: value
    })
  }
  // 处理简单字段的变化
  onValueChange(e) {
    let name = e.target.name,
        value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  // 图片list处理成字符串
  getImagesString() {
    return this.state.subImages.map((image) => {return image.uri}).join(",");
  }
  // 提交
  onSubmit() {
    let productInfo = {
      categoryId: this.state.categoryId,
      name: this.state.name,
      subtitle: this.state.subtitle,
      subImages: this.getImagesString(),
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      detail: this.state.detail,
      status: 1
    },
    checkProductInfoStatus = _product.checkProductInfo(productInfo);
    if (checkProductInfoStatus.status) {
      _product.saveProduct(productInfo).then((res) => {
        _mm.successTips(res.msg);
        this.props.history.push("/product/index");
      }, (errMsg) => {
        _mm.errorTip(errMsg || "添加失败！");
      })
    } else {
      _mm.errorTip(checkProductInfoStatus.msg)
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control"
                name="name"
                value={this.state.name}
                onChange={(e) => {this.onValueChange(e)}}
                placeholder="请输入商品名称" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control"
                name="subtitle"
                value={this.state.subtitle}
                onChange={(e) => {this.onValueChange(e)}}
                placeholder="请输入商品描述" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品分类</label>
            <CategorySelector categoryId={this.state.categoryId}
              parentCategoryId = {this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">价格</label>
            <div className="col-md-2">
              <div className="input-group">
                <input type="number" className="form-control"
                  name="price"
                  value={this.state.price}
                  onChange={(e) => {this.onValueChange(e)}}
                  placeholder="价格" />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">库存</label>
            <div className="col-md-2">
              <div className="input-group">
                <input type="number" className="form-control"
                  name="stock"
                  value={this.state.stock}
                  onChange={(e) => {this.onValueChange(e)}}
                  placeholder="库存" />
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
              <SimEditor detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onRichValueChange={value => {this.onRichEditorValueChange(value)}}/>
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

export default ProductSave;