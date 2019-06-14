/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-06-14 15:23:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-14 16:36:24
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
import Home from 'page/home/index.jsx'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Redirect from="*" to="/"/>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)

