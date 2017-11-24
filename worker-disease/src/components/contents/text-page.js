import { colors, fontSize, fontWeight } from '../../constants/style-variables'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const underline = css`
  text-decoration: none;
  box-shadow: inset 0 -.5em rgba(219, 174, 37, 0.3);
`

const Container = styled.div`
  ${mq.mobileOnly`
    padding-top: 40px;
  `}
  ${mq.tabletBelow`
    width: 84.4%;
    max-width: 400px;
    padding-bottom: 100px;
    margin: 0 auto;
  `}
  ${mq.desktopAbove`
    width: 700px;
    padding-bottom: 30px;
    font-size: ${fontSize.textBoxDescription.desktop};
    line-height: 1.75;
  `}
  color: ${colors.dirtBrown};
  font-size: ${fontSize.textBoxDescription.mobile};
  font-weight: ${fontWeight.light};
  line-height: 1.62;
  text-align: justify;
  p {
    margin-top: 0;
    margin-bottom: 1em;
  }
  u {
    ${underline}
  }
  a, a:link, a:active, a:visited {
    color: ${colors.link};
    text-decoration: none;
    box-shadow: inset 0 -1px ${colors.link};
  }
  a:hover {
    color: ${colors.linkHover};
    box-shadow: inset 0 -1px ${colors.linkHover};
  }
  img {
    margin-top: 1.5em;
    width: 100%;
  }
`

class TextPage extends React.PureComponent {
  render() {
    const { text } = this.props
    const textHtml = text.map((string => (!string ? '' : `<p>${string}</p>`))).join('')
    return <Container dangerouslySetInnerHTML={{ __html: textHtml }} />
  }
}

TextPage.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TextPage
