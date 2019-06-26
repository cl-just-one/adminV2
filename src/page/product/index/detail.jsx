import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx';
import Product from 'service/product-service.jsx';

import './save.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductDetail extends Component {
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
  // 图片list处理成字符串
  getImagesString() {
    return this.state.subImages.map((image) => {return image.uri}).join(",");
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品添加" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品分类</label>
            <CategorySelector categoryId={this.state.categoryId}
              parentCategoryId = {this.state.parentCategoryId}
              readOnly/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">价格</label>
            <div className="col-md-2">
              <div className="input-group">
                <input type="number" className="form-control"
                  name="price"
                  value={this.state.price}
                  readOnly />
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
                  readOnly />
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
                ) : <div>暂无图片</div>
              }
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <div dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;