import { colors, fontWeight } from '../constants/style-variables'
import { ContentContainer, ContainerWrapper } from './text-content-container'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import mq from '../utils/media-query'

const _ = {
  map,
}

const Container = ContentContainer.extend`
  text-align: left;
  ${mq.mobileOnly`
    padding: 25px 0 60px 0;
  `}
  ${mq.tabletOnly`
    padding: 60px 0 77px 0;
  `}
  ${mq.desktopAbove`
    padding: 60px 126px 0;
  `}
`

const Block = styled.div`
  width: 100%;
  margin-bottom: 60px;
`

const Question = styled.h3`
  padding: 0;
  line-height: 1.7;
  font-size: 23px;
  color: ${colors.textBlack};
  font-weight: ${fontWeight.bold};
`

const Paragraph = styled.p`
  font-size: 18px;
  color: ${colors.textBlack};
  font-weight: ${fontWeight.normal};
  line-height: 1.94;
  text-align: left;
  margin: 0;
`

function _textToParagraph(text) {
  return (<Paragraph dangerouslySetInnerHTML={{ __html: text }} />)
}

function _qaToBlock(interview) {
  const { question, answer } = interview
  const answerJSX = _.map(answer, _textToParagraph)
  return (
    <Block>
      <Question>{question}</Question>
      {answerJSX}
    </Block>
  )
}

class Article extends React.PureComponent {
  render() {
    const { interviews } = this.props
    const interviewsJSX = _.map(interviews, _qaToBlock)
    return (
      <ContainerWrapper>
        <Container>
          {interviewsJSX}
        </Container>
      </ContainerWrapper>
    )
  }
}

Article.propTypes = {
  interviews: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Article
