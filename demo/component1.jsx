import React from 'react'
import ReactDOM from 'react-dom'

class Component extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'cl',
      age: 18
    }
    //this.handleClick = this.handleClick.bind(this)
  }
  render () {
    return (
      <div>
        <h1>I am {this.state.name}</h1>
        <h1>I am {this.state.age} years old!</h1>
      </div>
    )
  }
}

class Title extends React.Component{
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <h1>444</h1>
        {this.props.children}
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        {/* 复合组件 */}
        <Title>
          <h1>H111111</h1>
          <span>88888</span>
          <a href="ss">link</a>
        </Title>
        <hr/>
        {/* {单纯的组件} */}
        <Component/>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)