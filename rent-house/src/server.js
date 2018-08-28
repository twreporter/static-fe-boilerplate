/* eslint no-console:0 */
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import Express from 'express'
import fs from 'fs'
import Html from './helpers/html'
import http from 'http'
import httpProxy from 'http-proxy'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Root from './components/root'

global.__SERVER__ = true

const { NODE_ENV, BASE_URL } = process.env

const scripts = []
const localDistDir = path.resolve(__dirname, '../dist')
const localStaticDir = path.resolve(__dirname, '../static')

if (NODE_ENV === 'production') {
  if (!BASE_URL) {
    console.warn('If you want to build the `<base>` element in HTML file, you must give the environment variable `BASE_URL`. See: https://github.com/twreporter/static-fe-boilerplate#build')
  }
  // load webpack bundle
  fs.readdirSync(localDistDir).forEach((file) => {
    const re = /main\..+\.bundle\.js/
    const found = file.match(re)
    if (found !== null) {
      scripts.push(`dist/${file}`)
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
    baseUrl={BASE_URL}
    scripts={scripts}
    content={content}
    styleElement={sheet.getStyleElement()}
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

