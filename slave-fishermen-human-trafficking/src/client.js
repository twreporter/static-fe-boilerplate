import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'

ReactDOM.hydrate(
  (
    <Root />
  ), document.getElementById('root'),
)
