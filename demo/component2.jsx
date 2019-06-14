import React from 'react'
import ReactDOM from 'react-dom'

class Child extends React.Component {
  constructor (props) {
    super(props)
  }
  handleClick () {
    this.props.changeColor('red')
  }
  render () {
    return (
      <div>
        <h1>父背景颜色 {this.props.bgColor}</h1>
        <button onClick={(e) => {this.handleClick()}}>改变父背景颜色</button>
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
      <div style={{backgroundColor: this.state.bgColor}}>
        <Child bgColor={this.state.bgColor} changeColor={(color) => {this.changeColor1(color)}}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Father/>,
  document.getElementById('app')
)