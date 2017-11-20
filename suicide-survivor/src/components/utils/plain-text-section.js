import { TextContainer, Paragraph, H2 } from './text-utils'
import InfoBox from './info-box'
import { ArticleImg, ArticleInfographic } from './img-utils'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  isEmpty,
}

const Container = styled.div`
  padding-top: 2em;
`

const ProgileContainer = styled.div`
  font-size: 20px;
`

const Subject = styled.div`
  font-size: 30px;
  font-weight: 400;
  line-height: 1.8;
`

class PlainText extends React.PureComponent {
  render() {
    // content: type1_string, type2_obj: infobox and image
    const {
      content, fontColor, profile, fontWeight,
    } = this.props
    const contentJSX = content.map((c, i) => {
      // plain text
      if (typeof c === 'string') {
        return (
          <TextContainer
            key={`paragraph_${i}`}
          >
            <Paragraph
              dangerouslySetInnerHTML={{ __html: c }}
              fontColor={fontColor}
              fontWeight={fontWeight}
            />
          </TextContainer>
        )
      }
      switch (c.type) {
        case 'infoBox': {
          return (
            <TextContainer
              key={`paragraph_${i}`}
            >
              <InfoBox
                data={c}
              />
            </TextContainer>
          )
        }
        case 'image': {
          return (
            <ArticleImg
              key={`paragraph_${i}`}
              imgData={c}
            />
          )
        }
        case 'infographic': {
          return (
            <ArticleInfographic
              key={`paragraph_${i}`}
              imgData={c}
            />
          )
        }
        case 'h2': {
          return (
            <TextContainer
              key={`paragraph_${i}`}
            >
              <H2
                dangerouslySetInnerHTML={{ __html: c.content }}
                fontColor={fontColor}
              />
            </TextContainer>
          )
        }
        default:
          return null
      }
    })
    const generateProfile = (() => {
      if (!_.isEmpty(profile)) {
        const {
          name, age, occupation, incident,
        } = profile
        return (
          <TextContainer>
            <Paragraph
              fontColor={fontColor}
            >
              <ProgileContainer>
                <Subject>{name}</Subject>
                <div>{`年齡：${age}`}</div>
                <div>{`職業：${occupation}`}</div>
                <div>{incident}</div>
              </ProgileContainer>
            </Paragraph>
          </TextContainer>
        )
      }
      return null
    })()

    return (
      <Container>
        {generateProfile}
        {contentJSX}
      </Container>
    )
  }
}

PlainText.defaultProps = {
  fontColor: '',
  fontWeight: 300,
  profile: {},
}

PlainText.propTypes = {
  content: PropTypes.array.isRequired,
  fontColor: PropTypes.string,
  profile: PropTypes.object,
  fontWeight: PropTypes.number,
}

export default PlainText
