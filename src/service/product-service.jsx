/*
 * @Author: chenglin 
 * @Date: 2019-06-24 15:34:19 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-25 14:21:31
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