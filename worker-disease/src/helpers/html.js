import config from '../../config'
import pageMeta from '../data/page-meta'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const {
  title,
  description,
  ogImage,
  ogUrl,
} = pageMeta

const isProduction = process.env.NODE_ENV === 'production'

export default class Html extends PureComponent {
  static propTypes = {
    scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    styleTags: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  }

  render() {
    const { scripts, content, styleTags } = this.props
    return (
      <html lang="zh-TW">
        <head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" media="all" rel="stylesheet" type="text/css" charSet="UTF-8" />
          <style dangerouslySetInnerHTML={{ __html: styleTags }} />
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
          <meta charSet="utf-8" />
          <link href="https://www.twreporter.org/images/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="https://www.twreporter.org/images/icon-hires.png" rel="icon" sizes="192x192" />
          <link href="https://www.twreporter.org/images/icon-normal.png" rel="icon" sizes="128x128" />
          {!isProduction ? null : <base href={`${config.productionOrigin}/`} />}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
          <script src="https://use.typekit.net/jlf0fym.js" />
          <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load({ async: true });}catch(e){}' }} />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-69336956-1" />
          <script dangerouslySetInnerHTML={{ __html: 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'UA-69336956-1\');' }} />
          <script dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:376929,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
          />
        </body>
      </html>
    )
  }
}
