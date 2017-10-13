import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class Html extends PureComponent {
  static propTypes = {
    scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    styleTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const { scripts, content, styleTags } = this.props
    return (
      <html lang="zh-TW">
        <head>
          <meta charSet="utf-8" />
          <style dangerouslySetInnerHTML={{ __html: styleTags }} />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
        </body>
      </html>
    )
  }
}
