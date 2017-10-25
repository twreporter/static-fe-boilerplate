/* eslint react/jsx-curly-brace-presence: 0 */

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

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
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
          <meta charSet="utf-8" />
          <style dangerouslySetInnerHTML={{ __html: styleTags }} />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" media="all" rel="stylesheet" type="text/css" charset="UTF-8" />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
          <script src="https://use.typekit.net/sna3sjs.js" />
          <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load({ async: true });}catch(e){}' }} />
        </body>
      </html>
    )
  }
}
