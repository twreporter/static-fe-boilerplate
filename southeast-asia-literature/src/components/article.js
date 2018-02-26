import { colors, fontWeight } from '../constants/style-variables'
import ContentContainer from './content-container'
import map from 'lodash.map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const Container = ContentContainer.extend`
  text-align: left;
  padding-bottom: 100px;
  a {
    border-bottom: 1px #a87d48 solid;
    cursor: pointer;
    transition: 0.5s color ease;
    color: ${colors.textBlack};
    :hover {
      color: #a87d48;
    }
  }
`

const Paragraph = styled.p`
  font-size: 18px;
  color: ${colors.textBlack};
  font-weight: ${fontWeight.regular};
  line-height: 1.94;
  text-align: left;
  margin: 2em 0;
`

class Article extends React.PureComponent {
  _textToParagraph = (text, i) => {
    return (<Paragraph key={i} dangerouslySetInnerHTML={{ __html: text }} />)
  }
  render() {
    const { content } = this.props
    const contentJSX = _.map(content, this._textToParagraph)
    return (
      <Container>
        {contentJSX}
      </Container>
    )
  }
}

Article.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Article
