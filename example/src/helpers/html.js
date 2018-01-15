import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { getPublicUrl } from '../../scripts/handle-path'

const title = 'This is the Title'

const { DEPLOY_TYPE, NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const publicUrl = getPublicUrl('origin', DEPLOY_TYPE)

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
          {!isProduction ? null : <base href={`${publicUrl}/`} />}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          {scripts.map(script => <script key={script} type="text/javascript" src={script} />)}
        </body>
      </html>
    )
  }
}
