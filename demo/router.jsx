import React from 'react';
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

class A extends React.Component {
  render () {
    return (
      <div>
        Component A
        <Switch>
          <Route exact path={`${this.props.match.path}`} render={() => {
            return <div>当前不带参数的组件A</div>
          }}></Route>
          <Route path={`${this.props.match.path}/sub`} render={(route) => {
            return <div>当前组件sub</div>
          }}></Route>
          <Route path={`${this.props.match.path}/:id`} render={(route) => {
            return <div>当前带参数的组件A, 参数是：{route.match.params.id}</div>
          }}></Route>
        </Switch>
      </div>
    );
  }
}

class B extends React.Component {
  render () {
    return ( 
      <div>Component B</div>
    );
  }
}
 
class Wrapper extends React.Component {
  render() {
    return (
      <div>
        <Link to="/a">组件A</Link>
        <br/>
        <Link to="/a/123">带参数的组件A</Link>
        <br/>
        <Link to="/b">组件B</Link>
        <br/>
        <Link to="/a/sub">组件/a/sub</Link>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <Wrapper>
      <Route path="/a" component={A}/>
      <Route path="/b" component={B}/>
    </Wrapper>
  </Router>,
  document.getElementById('app')
)