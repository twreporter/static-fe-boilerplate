import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { getPublicUrl } from '../../scripts/handle-path'
import CssFont from '../components/css-font'
import metaData from '../data/meta'

const {
  title,
  description,
  ogImage,
  ogUrl,
} = metaData

const { DEPLOY_TYPE, NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const publicUrl = getPublicUrl('origin', DEPLOY_TYPE)

const siteIcons = !isProduction ? null : (
  <React.Fragment>
    <link href="https://www.twreporter.org/images/apple-touch-icon.png" rel="apple-touch-icon" />
    <link href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
    <link href="https://www.twreporter.org/images/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
    <link href="https://www.twreporter.org/images/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
    <link href="https://www.twreporter.org/images/icon-hires.png" rel="icon" sizes="192x192" />
    <link href="https://www.twreporter.org/images/icon-normal.png" rel="icon" sizes="128x128" />
  </React.Fragment>
)

const typeKitCode = `
  (function(d) {
    var config = {
      kitId: 'knx2aig',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
`

export default class Html extends PureComponent {
  static propTypes = {
    scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    styleElement: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  render() {
    const { scripts, content, styleElement } = this.props
    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="utf-8" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" media="all" rel="stylesheet" type="text/css" charSet="UTF-8" />
          {!isProduction ? null : <base href={`${publicUrl}/`} />}
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:image" content={ogImage} />
          <meta name="twitter:description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={ogUrl} />
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
          {styleElement}
          <CssFont />
          {siteIcons}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
          <script dangerouslySetInnerHTML={{ __html: typeKitCode }} />
        </body>
      </html>
    )
  }
}
