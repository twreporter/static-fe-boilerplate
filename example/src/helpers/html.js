import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import config from '../../config'

const title = 'This is the Title'

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
          <title>{title}</title>
          <style dangerouslySetInnerHTML={{ __html: styleTags }} />
          {!isProduction ? null : <base href={`${config.productionOrigin}/`} />}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
        </body>
      </html>
    )
  }
}
