import React from 'react'
import styled from 'styled-components'
import PlainText from '../utils/plain-text-section'
import { BackgroundImg, AudioSectionBg } from '../utils/img-utils'
import mq from '../../utils/media-query'
import TWAudio from '../utils/audios'
import PropTypes from 'prop-types'
import { TextContainer, Title } from '../utils/text-utils'


const Container = styled.div`
  width: 100%;
  background: linear-gradient(to bottom, ${props => props.background.from} 0%, ${props => props.background.to} 100%);
`
const ImgContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`

const AudioContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  max-height: 900px;
  ${mq.desktop`
    max-height: 768px;
  `};
  ${mq.tablet`
    max-height: 1024px;
  `};
  position: relative;
`

class Section extends React.PureComponent {
  render() {
    const {
      data,
      duratoinBarColor,
      currentBarColor,
      background,
      audioInitated,
    } = this.props
    const {
      image,
      profile,
      content,
      subtitles,
      catchphrase,
      catchphraseFace,
      audioFile,
      title,
    } = data

    const AudioSection = () => {
      return (
        <AudioContainer>
          <AudioSectionBg
            mobile={catchphraseFace.mobile}
            tablet={catchphraseFace.tablet}
            desktop={catchphraseFace.desktop}
          />
          <TWAudio
            file={audioFile}
            duratoinBarColor={duratoinBarColor}
            currentBarColor={currentBarColor}
            subtitles={subtitles}
            audioInitated={audioInitated}
            catchphrase={catchphrase}
          />
        </AudioContainer>
      )
    }

    return (
      <Container
        background={background}
      >
        <ImgContainer>
          <BackgroundImg
            mobile={image.resizedTargets.mobile}
            tablet={image.resizedTargets.tablet}
            desktop={image.resizedTargets.desktop}
          />
        </ImgContainer>
        <TextContainer>
          <Title>{title}</Title>
        </TextContainer>
        <PlainText
          content={content}
          fontColor="white"
          profile={profile}
        />
        <AudioSection />
      </Container>
    )
  }
}

Section.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    content: PropTypes.array.isRequired,
    subtitles: PropTypes.array.isRequired,
    catchphrase: PropTypes.string.isRequired,
    catchphraseFace: PropTypes.object.isRequired,
    audioFile: PropTypes.string.isRequired,
  }).isRequired,
  duratoinBarColor: PropTypes.string.isRequired,
  currentBarColor: PropTypes.string.isRequired,
  background: PropTypes.object.isRequired,
  audioInitated: PropTypes.func.isRequired,
}

export default Section
