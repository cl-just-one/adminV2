import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
let styles = {
  // color: 'red',
  // fontSize: '20px'
}
let name = "chenglin"
let flag = true
let names = ['huahua', 'maomao', 'liuliu']

let jsx = <div className='jsx' style={styles}>I am {name}</div>
let jsx1 = (
  <div>
    {
      flag ? <p>I am {name}</p> : <p>I am not {name}</p>
    }
    {
      names.map((name, index) => <p key={index}> I am {name}</p>)
    }
  </div>
)

ReactDOM.render(
  jsx1,
  document.getElementById('app')
)