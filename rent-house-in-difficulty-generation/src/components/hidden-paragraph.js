/* eslint react/no-array-index-key:0 */
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import theme from '../utils/theme'

const StyledParagraph = BaseComponents.SmallContainer.extend`
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${theme.typography.font.weight.medium};
  line-height: ${theme.typography.lineHeight.regular};
  color: ${theme.colors.text.paragraph};
  white-space: pre-wrap;
  text-align: justify;
  margin: 30px auto;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
`.withComponent('p')

class HiddenParagraph extends React.PureComponent {
  render() {
    const { content } = this.props
    if (Array.isArray(content) && content.length > 1) {
      const _content = content.map((ele) => {
        return ele
      })
      return (
        <StyledParagraph>
          {_content}
        </StyledParagraph>
      )
    }
    return (
      <StyledParagraph
        dangerouslySetInnerHTML={{ __html: content[0] }}
      />
    )
  }
}

HiddenParagraph.propTypes = {
  content: PropTypes.array.isRequired,
}

export default HiddenParagraph
