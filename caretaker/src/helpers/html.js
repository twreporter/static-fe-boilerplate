import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { gtag, ogDescription, ogImage, ogUrl, themeColor, title, typeKitId } from '../constants/metadata'

const typeKitJSX = (
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: `
        (function(d) {
          var config = {
            kitId: '${typeKitId}',
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
      `,
    }}
  />
)

const gtagJSX = (
  <React.Fragment>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.id}`} />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.id}');
        `,
      }}
    />
  </React.Fragment>
)

export default class Html extends PureComponent {
  static propTypes = {
    scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    styleElement: PropTypes.arrayOf(PropTypes.element).isRequired,
    baseUrl: PropTypes.string,
  }

  static defaultProps = {
    baseUrl: '',
  }

  render() {
    const { scripts, content, styleElement, baseUrl } = this.props
    const shouldActivateGtag = typeof baseUrl === 'string' && baseUrl.length > 0
    return (
      <html lang="zh-TW">
        <head>
          <title>{title}</title>
          {baseUrl ? <base href={`${baseUrl}`} /> : null}
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
          <meta name="description" content={ogDescription} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:image" content={ogImage} />
          <meta name="twitter:description" content={ogDescription} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={ogDescription} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={ogUrl} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content={themeColor} />
          <meta charSet="utf-8" />
          <link href="https://www.twreporter.org/images/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="https://www.twreporter.org/images/icon-hires.png" rel="icon" sizes="192x192" />
          <link href="https://www.twreporter.org/images/icon-normal.png" rel="icon" sizes="128x128" />
          {typeKitJSX}
          {styleElement}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
          {shouldActivateGtag ? gtagJSX : null}
        </body>
      </html>
    )
  }
}
