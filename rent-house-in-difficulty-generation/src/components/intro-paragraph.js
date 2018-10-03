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
  font-family: "source-han-serif-tc", "serif", "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  font-size: ${theme.typography.font.size.large};
  font-weight: ${theme.typography.font.weight.semiBold};
  line-height: ${theme.typography.lineHeight.regular};
  color: ${theme.colors.text.intro};
  white-space: pre-wrap;
  text-align: justify;
  margin: 30px auto;
`.withComponent('p')

const SeperateLine = styled.div `
  width: 50px;
  height: 2px;
  background: ${theme.colors.primary};
  margin: 40px auto;
  ${screen.tabletOnly`
    transform: translateX(100%);
  `}
`

class IntroParagraph extends React.PureComponent {
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
          <SeperateLine />
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <StyledParagraph
          dangerouslySetInnerHTML={{ __html: content[0] }}
        />
        <SeperateLine />
      </React.Fragment>
    )
  }
}

IntroParagraph.propTypes = {
  content: PropTypes.array.isRequired,
}

export default IntroParagraph
