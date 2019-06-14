import React from 'react'
import ReactDOM from 'react-dom'

class Component extends React.Component {
  constructor (props) {
    console.log("------------初始化--------------");
    console.log("constructor");
    
    super(props)
    
  }

  handleClick () {
    this.props.changeVal()
  }

  componentWillMount () {
    console.log("componentWillMount");
    
  }

  componentDidMount () {
    console.log("componentDidMount");
  }
  
  shouldComponentUpdate () {
    console.log("------------更新组件-------------");
    
    console.log("shouldComponentUpdate");
    return true
  }

  componentWillReceiveProps () {
    console.log("componentWillReceiveProps");
  }
  
  componentWillUpdate () {
    console.log("componentWillUpdate");
    
  }
  componentDidUpdate () {
    console.log("componentDidUpdate");

  }
  componentWillUnmount () {
    console.log("componentWillUnmount");
  }
  render () {
    console.log("render");
    return (
      <div>
        组件加载{this.props.data}
        <br/>
        <button onClick={() => {this.handleClick()}}>更新组件</button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: 'Old Sate',
      hasChild: true
    }
  }
  changePropsVal () {
    this.setState({
      data: 'Test 999'
    })
  }
  destroyCom () {
    this.setState({
      hasChild: false
    })
  }
  render() {
    return (
      <div>
        {
          this.state.hasChild ? <Component data={this.state.data} changeVal={() => {this.changePropsVal()}}/> : ''
        }
        <button onClick={() => {this.destroyCom()}}>干掉子组件</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)