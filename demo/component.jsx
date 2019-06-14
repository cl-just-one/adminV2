import React from 'react'
import ReactDOM from 'react-dom'

// 组件
function Component () {
  return <h1>I am chenglin</h1>
}

class ES6Component extends React.Component {
  render () {
    return <h1>I am chenglin in ES6Component.</h1>
  }
}
// 传参
class ES6Component1 extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: "huahua"
    }
  }
  render () {
    setTimeout(() => {
      this.setState({
        name: "Test123"
      })
    }, 2000)
    return (<div>
        <h1>I am chenglin in {this.state.name}.</h1>
        <h1>I am chenglin in {this.props.name1}.</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <Component/>
    <ES6Component1 name1="pingping"/>
  </div>,
  document.getElementById('app')
)