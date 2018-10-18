import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { fontWeight, fontSize, colors } from '../../constants/style-variables'
import mq from '../../utils/media-query'

const underline = css`
  text-decoration: none;
  box-shadow: inset 0 -.5em rgba(219, 174, 37, 0.3);
`

const Container = styled.div`
  ${mq.tabletBelow`
    width: 84%;
    min-width: 270px;
    max-width: 389px;
    margin: 0 auto;
  `}
  ${mq.desktopAbove`
    width: 389px;
  `}
`

const Title = styled.h3`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;
  color: ${colors.text};
  font-size: ${fontSize.textBoxTitle.mobile};
  font-weight: ${fontWeight.bold};
  margin-bottom: 12px;
  ${mq.desktopAbove`
    font-size: ${fontSize.textBoxTitle.desktop};
    margin-bottom: 25px;
  `}
`

const Description = styled.div`
  color: ${colors.text};
  font-size: ${fontSize.textBoxDescription.mobile};
  font-weight: ${fontWeight.light};
  line-height: 1.62;
  text-align: justify;
  ${mq.desktopAbove`
    font-size: ${fontSize.textBoxDescription.desktop};
    line-height: 1.75;
  `}
  p {
    margin-top: 0;
    margin-bottom: .5em;
  }
  u {
    ${underline}
  }
  a, a:link, a:active, a:focus, a:visited {
    color: ${colors.link};
    text-decoration: none;
    box-shadow: inset 0 -1px ${colors.link};
  }
  a:hover {
    color: ${colors.linkHover};
    box-shadow: inset 0 -1px ${colors.linkHover};
  }
`

const Footnote = styled.div`
  color: ${colors.footnote};
  font-size: ${fontSize.textBoxFootnote.mobile};
  font-weight: ${fontWeight.light};
  width: 100%;
  margin-top: 20px;
  ${mq.desktopAbove`
    font-size: ${fontSize.textBoxFootnote.desktop};
  `}
`

class TextBox extends React.PureComponent {
  render() {
    const { title, description, footnote } = this.props
    const titleJSX = !title ? null : <Title>{title}</Title>
    const descritionHtml = description.map((string => (!string ? '' : `<p>${string}</p>`))).join('')
    const descriptionJSX = !description ? null : <Description dangerouslySetInnerHTML={{ __html: descritionHtml }} />
    const footnoteJSX = !footnote ? null : <Footnote>{footnote}</Footnote>
    return (
      <Container>
        {titleJSX}
        {descriptionJSX}
        {footnoteJSX}
      </Container>
    )
  }
}

TextBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
  footnote: PropTypes.string,
}

TextBox.defaultProps = {
  title: '',
  description: [],
  footnote: '',
}

export default TextBox
