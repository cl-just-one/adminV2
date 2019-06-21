/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-06-14 15:23:50 
 * @Last Modified by: chenglin
 * @Last Modified time: 2019-06-21 10:27:01
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" render={(props) => {
            return <Layout>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/product" component={Home}/>
                <Route exact path="/product-category" component={Home}/>
                <Route exact path="/order" component={Home}/>
                <Route exact path="/user" component={Home}/>
              </Switch>
            </Layout>
          }}/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)

