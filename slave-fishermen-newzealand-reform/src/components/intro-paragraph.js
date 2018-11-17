/* eslint react/no-array-index-key:0 */
import Annotation from './annotation'
import BaseComponents from './base'
import Link from './link'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'
import smoothScroll from 'smoothscroll'

const StyledParagraph = BaseComponents.SmallContainer.extend`
  font-family: "source-han-serif-tc", "serif", "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  font-size: ${theme.typography.font.size.large};
  font-weight: ${theme.typography.font.weight.semiBold};
  line-height: ${theme.typography.lineHeight.regular};
  color: ${theme.colors.text.intro};
  white-space: pre-wrap;
  text-align: justify;
  margin: 30px auto;
  a {
    color: ${theme.colors.text.intro};
  }
`.withComponent('p')

const SeperateLine = styled.div `
  width: 50px;
  height: 2px;
  background: ${theme.colors.text.intro};
  margin: 40px auto;
  ${screen.tabletOnly`
    transform: translateX(100%);
  `}
`

class IntroParagraph extends React.PureComponent {
  constructor(props) {
    super(props)
    this.innerScroll = this._innerScroll.bind(this)
  }
  _innerScroll(e, id) {
    e.preventDefault()
    smoothScroll(document.getElementById(id))
  }
  render() {
    const { content } = this.props
    if (Array.isArray(content) && content.length > 1) {
      const _content = content.map((paragraph, p_index) => {
        if (Array.isArray(paragraph)) {
          const paragraphs = paragraph.map((ele, e_index) => {
            if (ele.type === 'annotation') {
              return (
                <Annotation
                key={`p_annotation_${e_index}`}
                content={ele.content}
                />
                )
            } else if (ele.type === 'link') {
              return (
                <Link
                  key={`p_link_${e_index}`}
                  href={ele.content[1]}
                  target="_blank"
                >
                  {ele.content[0]}
                </Link>
              )
            } else if (ele.type === 'inner-link') {
              return (
                <Link
                  key={`p_link_${e_index}`}
                  href={'#'}
                  onClick={(e) => this.innerScroll(e, ele.content[1])}
                >
                  {ele.content[0]}
                </Link>
              )
            } 
            return ele
          })
          return (
            <StyledParagraph
              key={`p_paragraph_${p_index}`}
            >
              {paragraphs}
            </StyledParagraph>
          )
        }
        return (
          <StyledParagraph
            key={`p_intro_${p_index}`}
          >
            {paragraph}
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
