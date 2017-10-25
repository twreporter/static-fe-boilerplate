import { colors, fontWeight } from '../constants/style-variables'
import { ContentContainer, ContainerWrapper } from './text-content-container'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const Container = ContentContainer.extend`
  text-align: left;
`

const Paragraph = styled.p`
  font-size: 18px;
  color: ${colors.textBlack};
  font-weight: ${fontWeight.regular};
  line-height: 1.94;
  text-align: left;
  margin: 2em 0;
`

function _textToParagraph(text) {
  return (<Paragraph dangerouslySetInnerHTML={{ __html: text }} />)
}

class Article extends React.PureComponent {
  render() {
    const { content } = this.props
    const contentJSX = _.map(content, _textToParagraph)
    return (
      <ContainerWrapper>
        <Container>
          {contentJSX}
        </Container>
      </ContainerWrapper>
    )
  }
}

Article.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Article
