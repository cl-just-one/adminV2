import React from 'react'
import ReactDOM from 'react-dom'

class Child1 extends React.Component {
  constructor (props) {
    super(props)
  }
  handleClick () {
    this.props.changeColor('red')
  }
  render () {
    return (
      <div>
        <h1>Child1 {this.props.bgColor}</h1>
        <button onClick={(e) => {this.handleClick()}}>改变Child2父背景颜色</button>
      </div>
    )
  }
}

class Child2 extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div style={{backgroundColor: this.props.bgColor}}>
        <h1>Child2 {this.props.bgColor}</h1>
      </div>
    )
  }
}

class Father extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bgColor: "#eee"
    }
  }
  changeColor1 (color) {
    this.setState({
      bgColor: color
    })
  }
  render () {
    return (
      <div>
        <Child1 changeColor={(color) => {this.changeColor1(color)}}/>
        <Child2 bgColor={this.state.bgColor} />
      </div>
    )
  }
}

ReactDOM.render(
  <Father/>,
  document.getElementById('app')
)