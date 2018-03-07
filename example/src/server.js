/* eslint no-console:0 */
import { getPublicUrl, getLocalPath } from '../scripts/handle-path'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import Express from 'express'
import fs from 'fs'
import Html from './helpers/html'
import http from 'http'
import httpProxy from 'http-proxy'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Root from './components/root'

// defines global variable
global.__SERVER__ = true

const scripts = []

const { DEPLOY_TYPE, NODE_ENV } = process.env

const publicDistUrl = getPublicUrl('dist', DEPLOY_TYPE)
const localDistDir = getLocalPath('dist')
const localStaticDir = getLocalPath('static')

if (NODE_ENV === 'production') {
  // load webpack bundle
  fs.readdirSync(localDistDir).forEach((file) => {
    const re = /main\..+\.bundle\.js/
    const found = file.match(re)
    if (found !== null) {
      scripts.push(`${publicDistUrl}/${file}`)
    }
  })
  const sheet = new ServerStyleSheet()
  const jsx = (
    <StyleSheetManager sheet={sheet.instance}>
      <Root />
    </StyleSheetManager>
  )
  const content = ReactDOMServer.renderToString(jsx)

  const html = ReactDOMServer.renderToStaticMarkup(<Html
    scripts={scripts}
    content={content}
    styleElement={sheet.getElement()}
  />)

  fs.writeFileSync(`${localDistDir}/index.html`, html)
} else {
  const app = new Express()
  const server = new http.Server(app)

  // serve static files
  app.use('/static', Express.static(localStaticDir))
  app.use('/dist', Express.static(localDistDir))
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

  app.use((req, res) => {
    const sheet = new ServerStyleSheet()
    const jsx = (
      <StyleSheetManager sheet={sheet.instance}>
        <Root />
      </StyleSheetManager>
    )
    const content = ReactDOMServer.renderToString(jsx)

    const html = ReactDOMServer.renderToStaticMarkup(<Html
      scripts={scripts}
      content={content}
      styleElement={sheet.getStyleElement()}
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
}

