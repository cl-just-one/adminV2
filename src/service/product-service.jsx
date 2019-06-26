/*
 * @Author: chenglin 
 * @Date: 2019-06-24 15:34:19 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-26 09:16:47
 */
import MUtil from 'util/mm.jsx'

const _mm = new MUtil();

class Product {
  // 获取商品列表
  getProductList(listParam) {
    let url = '',
        data = {};
    if (listParam.listType == 'list') {
      url = '/manage/product/list.do';
      data.pageNum = listParam.pageNum;
    } else if (listParam.listType == 'search') {
      url = '/manage/product/search.do';
      data.pageNum = listParam.pageNum;
      data[listParam.searchType] = listParam.searchKeyword;
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  // 获取商品列表
  setProductStatus(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: productInfo
    })
  }
  // 检查输入的字段
  checkProductInfo(productInfo) {

    // 商品名称检查
    if (typeof productInfo.name !== "string" || productInfo.name === '') {
      return {
        status: false,
        msg: "商品名称不能为空"
      }
    }
    // 商品描述检查
    if (typeof productInfo.subtitle !== "string" || productInfo.subtitle === '') {
      return {
        status: false,
        msg: "商品描述不能为空"
      }
    }
    // 品类检查
    if (typeof productInfo.categoryId !== "string" || productInfo.categoryId == '0') {
      return {
        status: false,
        msg: "请选择分类"
      }
    }
    // 商品价格检查
    if (typeof productInfo.price !== "number" || !(productInfo.price >= 0)) {
      return {
        status: false,
        msg: "商品价格不正确"
      }
    }
    // 商品库存检查
    if (typeof productInfo.stock !== "number" || !(productInfo.stock >= 0)) {
      return {
        status: false,
        msg: "商品库存不正确"
      }
    }
    return {
      status: true,
      msg: "验证通过"
    }
  }
  // 添加商品
  saveProduct(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: productInfo
    });
  }
  /**
   * 品类查询
  */
  getCategoryList(firstCategoryId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: firstCategoryId || 0
      }
    })
  }
}

export default Product;