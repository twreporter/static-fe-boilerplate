import { colors, fontWeight } from '../constants/style-variables'
import ContentContainer from './content-container'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import mq from '../utils/media-query'
import Annotation from '../components/annotation'

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
    padding: 60px 0 126px 0;
  `}
  :last-child {
    padding-bottom: 40px;
  }
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
  font-weight: ${fontWeight.regular};
  line-height: 1.94;
  text-align: left;
  margin: 0 0 .5em 0;
`

class Interview extends React.PureComponent {
  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  _textToParagraph = (content, i) => {
    if (typeof content === 'string') {
      return (<Paragraph key={i} dangerouslySetInnerHTML={{ __html: content }} />)
    }
    if (Array.isArray(content)) {
      const contentJSX = _.map(content, (text, index) => {
        if (typeof text === 'string') {
          return text
        }
        if (Array.isArray(text)) {
          return <Annotation content={text} key={index} />
        }
      })
      return <Paragraph key={i}>{contentJSX}</Paragraph>
    }
    return null
  }
  _qaToBlock = (qa, i) => {
    const { question, answer } = qa
    const answerJSX = _.map(answer, this._textToParagraph)
    return (
      <Block key={i}>
        <Question>{question}</Question>
        {answerJSX}
      </Block>
    )
  }
  render() {
    const { content } = this.props
    const interviewsJSX = _.map(content, this._qaToBlock)
    return (
      <Container>
        {interviewsJSX}
      </Container>
    )
  }
}

export default Interview
