/*
 * @Author: chenglin 
 * @Date: 2019-06-24 15:36:21 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-26 11:55:52
 */
import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'

class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Route path="/product/save/:pid?" component={ProductSave} />
        <Route path="/product/detail/:pid?" component={ProductDetail} />
        <Redirect from="/product" to="/product/index" />
      </Switch>
    )
  }
}

export default ProductRouter;

