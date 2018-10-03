/* eslint react/no-array-index-key:0 */
import { scriptText } from '../data/conversation-scripts/scenes'
import HiddenParagraph from './hidden-paragraph'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line

class HiddenScriptText extends React.PureComponent {
  render() {
    const { content } = this.props
    return content.map((script) => {
      return (
        <HiddenParagraph
          key={script}
          content={scriptText[script]}
        />
      )
    })
  }
}

HiddenScriptText.propTypes = {
  content: PropTypes.array.isRequired,
}

export default HiddenScriptText
