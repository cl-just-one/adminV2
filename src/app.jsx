/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-06-14 15:23:50 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-07-01 15:56:31
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
import Home from 'page/home/index.jsx'

import OrderList from 'page/order/index.jsx'
import OrderDetail from 'page/order/detail.jsx'
import UserList from 'page/user/index.jsx'
import ProductList from 'page/product/router.jsx'

import Login from 'page/login/index.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends React.Component {
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product" component={ProductList} />
          <Route path="/product-category" component={ProductList} />
          <Route path="/order/index" component={OrderList} />
          <Route path="/order/detail/:orderNo" component={OrderDetail} />
          <Route path="/user/index" component={UserList} />
          <Redirect exact from="/order" to="/order/index" />
          <Redirect exact from="/user" to="/user/index" />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    );
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={(props) => {
            return LayoutRouter;
          }} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

