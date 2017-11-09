import React from 'react'
import logo from '../../static/logo.png'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <div>This is the example component.</div>
        <div><img src={logo} alt="logo" /></div>
      </div>
    )
  }
}
