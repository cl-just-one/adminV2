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
  handleClick () {
    this.setState({
      age: this.state.age + 1
    })
  }
  onChangeValue (e) {
    this.setState({
      age: e.target.value
    })
  }
  render () {
    return (
      <div>
        <h1>I am {this.state.name}</h1>
        <h1>I am {this.state.age} years old!</h1>
        <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
        <br/>
        <input type="text" onChange={(e) => {this.onChangeValue(e)}}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Component/>,
  document.getElementById('app')
)