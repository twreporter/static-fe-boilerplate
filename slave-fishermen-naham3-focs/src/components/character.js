/* eslint react/no-array-index-key:0 */
import Annotation from './annotation'
import BaseComponents from './base'
import Link from './link'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const StyledParagraph = BaseComponents.SmallContainer.extend`
  font-size: ${theme.typography.font.size.large};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.larger};
  white-space: pre-wrap;
  text-align: justify;
  margin: 0 auto;
`.withComponent('p')

class Character extends React.PureComponent {
  render() {
    const { content } = this.props
    if (Array.isArray(content) && content.length > 1) {
      const _content = content.map((ele, index) => {
        return (
          <StyledParagraph
            key={`p_intro_${index}`}
          >
            {ele}
          </StyledParagraph>        
        )
      })
      return (
        <React.Fragment>
          {_content}
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <StyledParagraph
          dangerouslySetInnerHTML={{ __html: content[0] }}
        />
      </React.Fragment>
    )
  }
}

Character.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Character
