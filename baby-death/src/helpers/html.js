import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { injectGlobal } from 'styled-components'
import { getPublicUrl } from '../../scripts/handle-path'

const title = 'This is the Title'

const { DEPLOY_TYPE, NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const publicUrl = getPublicUrl('origin', DEPLOY_TYPE)

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    box-sizing: border-box;
  }
`

const typeKitCode = `(function(d) {
  var config = {
    kitId: 'ckp5jxu',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);`


export default class Html extends PureComponent {
  static propTypes = {
    scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    styleElement: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  render() {
    const { scripts, content, styleElement } = this.props
    const meta = {
      title: '',
      image: '',
      desc: '',
      canonical: '',
    }
    return (
      <html lang="zh-TW">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" media="all" rel="stylesheet" type="text/css" charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.desc} />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:image" content={meta.image} />
          <meta name="twitter:description" content={meta.desc} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.desc} />
          <meta property="og:image" content={meta.image} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={meta.canonical} />
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
          <meta charSet="utf-8" />
          <link href="https://www.twreporter.org/images/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="https://www.twreporter.org/images/icon-hires.png" rel="icon" sizes="192x192" />
          <link href="https://www.twreporter.org/images/icon-normal.png" rel="icon" sizes="128x128" />
          <link href="https://www.twreporter.org/asset/favicon.png" rel="shortcut icon" type="image/png" />
          <link ref="canonical" href={meta.canonical} />
          {styleElement}
          {!isProduction ? null : <base href={`${publicUrl}/`} />}
        </head>
        <body style={{ margin: 0 }}>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
          <script dangerouslySetInnerHTML={{ __html: typeKitCode }} />
        </body>
      </html>
    )
  }
}
