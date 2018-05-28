import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { getPublicUrl } from '../../scripts/handle-path'
import { title, ogDescription, ogImage, ogUrl } from '../constants/metadata'

const { DEPLOY_TYPE, NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const publicUrl = getPublicUrl('origin', DEPLOY_TYPE)

const typeKit = (
  <script
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: `
        (function(d) {
          var config = {
            kitId: 'knx2aig',
            scriptTimeout: 3000,
            async: true
          },
          h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
        })(document);
      `,
    }}
  />
)

const gtag = (
  <React.Fragment>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-69336956-1" />
    <script
      dangerouslySetInnerHTML={{
        __html: 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'UA-69336956-1\');',
      }}
    />
  </React.Fragment>
)

// const facebookSDK = (
//   <script
//     type="text/javascript"
//     dangerouslySetInnerHTML={{ __html: `
//       window.fbAsyncInit = function() {
//         FB.init({
//           appId            : 1296686743779808,
//           autoLogAppEvents : true,
//           xfbml            : true,
//           version          : 'v3.0'
//         });
//       };
//       (function(d, s, id){
//         var js, fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) {return;}
//         js = d.createElement(s); js.id = id;
//         js.src = "https://connect.facebook.net/en_US/sdk.js";
//         fjs.parentNode.insertBefore(js, fjs);
//       }(document, 'script', 'facebook-jssdk'));
//     ` }}
//   />
// )

const animateTadaCss = (
  <style
    type="text/css"
    dangerouslySetInnerHTML={{ __html: `
      @charset "UTF-8";
      /*!
      * animate.css -http://daneden.me/animate
      * Version - 3.6.1
      * Licensed under the MIT license - http://opensource.org/licenses/MIT
      *
      * Copyright (c) 2018 Daniel Eden
      */
      .animated{animation-duration:1s;animation-fill-mode:both}.animated.infinite{animation-iteration-count:infinite}@keyframes tada{0%{transform:scaleX(1)}10%,20%{transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{transform:scaleX(1)}}.tada{animation-name:tada}
    ` }}
  />
)

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
          <title>{title}</title>
          {!isProduction ? null : <base href={`${publicUrl}/`} />}
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
          <meta name="theme-color" content="#4f7b29" />
          <meta charSet="utf-8" />
          <link href="https://www.twreporter.org/images/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="https://www.twreporter.org/images/icon-hires.png" rel="icon" sizes="192x192" />
          <link href="https://www.twreporter.org/images/icon-normal.png" rel="icon" sizes="128x128" />
          {typeKit}
          {styleElement}
          {animateTadaCss}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
          {isProduction ? gtag : null}
        </body>
      </html>
    )
  }
}
