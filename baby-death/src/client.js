import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Root from './components/root'

if (typeof window !== 'undefined') {
  // add Google Analytics
  ReactGA.initialize('UA-69336956-1')
  ReactGA.pageview(window.location.pathname)
}

ReactDOM.render(
  (
    <Root />
  ), document.getElementById('root'),
)
