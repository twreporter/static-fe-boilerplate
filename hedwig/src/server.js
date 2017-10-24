/* eslint no-console:0 */
import Express from 'express'
import Html from './helpers/html'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Root from './components/root'
import config from '../config'
import fs from 'fs'
import http from 'http'
import httpProxy from 'http-proxy'
import path from 'path'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

// defines global variable
global.__SERVER__ = true

const app = new Express()
const server = new http.Server(app)

// serve static files
app.use('/static', Express.static(path.join(__dirname, '..', 'static')))
app.use('/dist', Express.static(path.join(__dirname, '..', 'dist')))

const scripts = []

if (process.env.NODE_ENV === 'production') {
  // load webpack bundle
  fs.readdirSync(__dirname).forEach((file) => {
    const re = /main\..+\.bundle\.js/
    const found = file.match(re)
    if (found !== null) {
      scripts.push(`dist/${file}`)
    }
  })
} else {
  const proxy = httpProxy.createProxyServer({
    // webpack dev server
    target: 'http://localhost:5000',
  })
  // proxy request to webpack dev server
  app.use('/dist', (req, res) => {
    proxy.web(req, res)
  })
  // load dev webpack bundle
  scripts.push('dist/main.dev.bundle.js')
}

let html = ''

app.use((req, res) => {
  const sheet = new ServerStyleSheet()
  const jsx = (
    <StyleSheetManager sheet={sheet.instance}>
      <Root />
    </StyleSheetManager>
  )
  const content = ReactDOMServer.renderToString(jsx)

  html = ReactDOMServer.renderToStaticMarkup(<Html
    scripts={scripts}
    content={content}
    styleTags={sheet.getStyleTags()}
  />)

  res.status(200)
  res.send(`<!doctype html>${html}`)
})

server.listen(3000, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('==> 💻   Open http://%s:%s in a browser to view the app.', 'localhost', 3000)
})

if (process.env.NODE_ENV === 'production') {
  fs.writeFileSync(`${config.outputPath}/index.html`, html)
}
