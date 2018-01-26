// import PropTypes from 'prop-types'
import { maxWidth, fontWeight, zIndex, fontSize } from '../../constants/style-variables'
import anime from 'animejs'
import Header from './header'
import mq from '../../utils/media-query'
import React from 'react'
import satellites from '../../data/satellite-bgs'
import styled from 'styled-components'

const content = {
  title: '「衛星圖看六輕」－\n石化帝國是怎麼煉成的？',
  date: '2018.01.25',
}

const color = {
  text: '#F1F1F1',
}

const { image } = satellites[0]

const Container = styled.div`
  z-index: ${zIndex.openingContainer};
  position: relative;
  height: 100%;
  width: 100%;
  max-width: ${maxWidth};
  margin: 0 auto;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: visibility 0s 200ms, opacity 500ms;
`

const Background = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  ${mq.mobileOnly`
    background-image: url(${props => props.tabletImage});
    background-size: auto 87%;
    background-position: center bottom;
    background-repeat: no-repeat;
  `}
  ${mq.tabletOnly`
    background-image: url(${props => props.tabletImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  `}
  ${mq.desktopAbove`
    background-image: url(${props => props.desktopImage});
    background-size: auto auto;
    background-position: center center;
    background-repeat: no-repeat;
  `}
`

const Title = styled.h1`
  font-size: ${fontSize.opening.title.mobile};
  ${mq.tabletOnly`
    font-size: ${fontSize.opening.title.tablet};
  `}
  ${mq.desktopAbove`
    font-size: ${fontSize.opening.title.desktop};
  `}
  font-weight: ${fontWeight.bold};
  margin: 0 auto;
  color: ${color.text};
  text-align: center;
  line-height: 1.32;
  position: relative;
  left: 5px;
  white-space: pre-wrap;
`

const Date = styled.div`
  font-size: ${fontSize.opening.date.mobile};
  ${mq.tabletOnly`
    font-size: ${fontSize.opening.date.tablet};
  `}
  ${mq.desktopAbove`
    font-size: ${fontSize.opening.date.desktop};
  `}
  white-space: nowrap;
  font-weight: ${fontWeight.light};
  margin: 18px auto 0 auto;
  color: ${color.text};
  text-align: center;
  letter-spacing: .9px;
`

const CenteringWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  min-width: 300px;
  max-width: 600px;
`

const Linear = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, transparent, #000000);
  position: absolute;
  left: 0;
  top: 0;
  ${mq.mobileOnly`
    background-image: linear-gradient(to bottom, black 0%, black 25%, black 30%, transparent 100%);
  `}
`

class Opening extends React.Component {
  constructor(props) {
    super(props)
    this._bg = null
    this._header = null
    this._text = null
    this.state = {
      mounted: false,
    }
  }
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mounted: true,
    })
    this._timeline = anime.timeline()
    this._timeline
      .add({
        targets: [this._bg, this._header],
        opacity: [0, 1],
        duration: 1000,
        delay: 1000,
        easing: 'linear',
      })
      .add({
        targets: this._text,
        opacity: [0, 1],
        translateY: ['-40%', '-50%'],
        duration: 600,
        easing: 'linear',
        translateX: {
          value: '-50%',
          duration: 0,
        },
        offset: '+=400',
      })
  }
  componentDidUpdate() {
    if (this.props.currentIndex === 0) {
      this._timeline.restart()
      this._timeline.play()
    }
    if (this.props.currentIndex !== 0) {
      this._timeline.pause()
    }
  }
  render() {
    const { currentIndex } = this.props
    const { mounted } = this.state
    const show = mounted && currentIndex === 0
    return (
      <Container show={show}>
        <Background
          innerRef={(ele) => { this._bg = ele }}
          desktopImage={image.desktop.url}
          tabletImage={image.tablet.url}
        />
        <Linear />
        <Header getEle={(ele) => { this._header = ele }} />
        <CenteringWrapper innerRef={(ele) => { this._text = ele }}>
          <Title>{content.title}</Title>
          <Date>{content.date}</Date>
        </CenteringWrapper>
      </Container>
    )
  }
}

export default Opening
