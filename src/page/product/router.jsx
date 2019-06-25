/*
 * @Author: chenglin 
 * @Date: 2019-06-24 15:36:21 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-24 15:45:11
 */
import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Redirect from="/product" to="/product/index" />
      </Switch>
    )
  }
}

export default ProductRouter;

