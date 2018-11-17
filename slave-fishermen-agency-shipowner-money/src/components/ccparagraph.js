/* eslint react/no-array-index-key:0 */
import Annotation from './annotation'
import BaseComponents from './base'
import Link from './link'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import styled from 'styled-components'
import theme from '../utils/theme'

const StyledParagraph = BaseComponents.SmallContainer.extend`
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${theme.typography.font.weight.medium};
  line-height: ${theme.typography.lineHeight.regular};
  color: ${theme.colors.text.ccParagraph};
  white-space: pre-wrap;
  text-align: center;
  margin: 30px auto 0 auto;
  padding-bottom: 30px;
`.withComponent('p')

class CCParagraph extends React.PureComponent {
  render() {
    const { content } = this.props
    if (Array.isArray(content) && content.length > 1) {
      const _content = content.map((ele, index) => {
        if (ele.type === 'annotation') {
          return (
            <Annotation
              key={`p_annotation_${index}`}
              content={ele.content}
            />
          )
        } else if (ele.type === 'link') {
          return (
            <Link
              key={`p_link_${index}`}
              href={ele.content[1]}
            >
              {ele.content[0]}
            </Link>
          )
        }
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

CCParagraph.propTypes = {
  content: PropTypes.array.isRequired,
}

export default CCParagraph
