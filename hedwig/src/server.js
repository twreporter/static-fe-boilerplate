import Html from './helpers/html'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Root from './components/root'
import config from '../config'
import fs from 'fs'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const scripts = []
fs.readdirSync(config.outputPath).forEach((file) => {
  if (file.endsWith('.js')) {
    scripts.push(`${file}`)
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
  styleTags={sheet.getStyleTags()}
/>)

fs.writeFileSync(`${config.outputPath}/index.html`, html)
