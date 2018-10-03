import { DIALOGUELENGTH } from './conversation-content-box'
import animations from '../utils/animations'
import ImageLoader from 'react-loading-image'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react' // eslint-disable-next-line
import screen from '../utils/screen'
import styled from 'styled-components'

const mediumContainerWidth = {
  tablet: layout.tablet.width.medium,
  desktop: layout.desktop.width.medium,
  hd: layout.hd.width.medium
}

const totalPicsToLoad = 4

const mockup = {
  picturebox: {
    desktop: {
      width: 833,
      height: 429
    },
    mobile: {
      width: 375,
      height: 353
    }
  },
  character: {
    image: {
      width: 200,
      height: 350
    },
    width: {
      desktop: 221,
      tablet: 186,
      mobile: 147
    }
  }
}

const Container = styled.div`
  position: relative;
  border-bottom: solid 3px #000;
  ${screen.hdAbove`
    height: calc(${mediumContainerWidth.hd}px * (${mockup.picturebox.desktop.height} / ${mockup.picturebox.desktop.width}));
  `}
  ${screen.desktopOnly`
    height: calc(${mediumContainerWidth.desktop}px * (${mockup.picturebox.desktop.height} / ${mockup.picturebox.desktop.width}));
  `}
  ${screen.tabletOnly`
    height: calc(${mediumContainerWidth.tablet}px * (${mockup.picturebox.desktop.height} / ${mockup.picturebox.desktop.width}));
  `}
  ${screen.mobileBelow`
    height: calc(100vw * (${mockup.picturebox.mobile.height} / ${mockup.picturebox.mobile.width}));
  `}
`

const BgBox = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
`

const Character = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: ${props => props.show ? "1" : "0"};
  ${screen.hdAbove`
    width: calc(${mediumContainerWidth.hd}px * (${mockup.character.width.desktop} / ${mediumContainerWidth.desktop}));
    height: calc(${mediumContainerWidth.hd}px * (${mockup.character.width.desktop} / ${mediumContainerWidth.desktop}) * (${mockup.character.image.height} / ${mockup.character.image.width}));
  `}
  ${screen.desktopOnly`
    width: calc(${mediumContainerWidth.desktop}px * (${mockup.character.width.desktop} / ${mediumContainerWidth.desktop}));
    height: calc(${mediumContainerWidth.desktop}px * (${mockup.character.width.desktop} / ${mediumContainerWidth.desktop}) * (${mockup.character.image.height} / ${mockup.character.image.width}));
  `}
  ${screen.tabletOnly`
    width: calc(${mediumContainerWidth.tablet}px * (${mockup.character.width.tablet} / ${mediumContainerWidth.tablet}));
    height: calc(${mediumContainerWidth.tablet}px * (${mockup.character.width.tablet} / ${mediumContainerWidth.tablet}) * (${mockup.character.image.height} / ${mockup.character.image.width}));
  `}
  ${screen.tabletAbove`
    margin-left: 6%;  
  `}
  ${screen.mobileBelow`
    margin-left: 5%;
    width: calc(100vw * (${mockup.character.width.mobile} / ${mockup.picturebox.mobile.width}));
    height: calc(100vw * (${mockup.character.width.mobile} / ${mockup.picturebox.mobile.width}) * (${mockup.character.image.height} / ${mockup.character.image.width}));
  `}
`

const OpenRecordButton = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  position: absolute;
  right: 15px;
  top: 20px;
  width: 120px;
  height: 45px;
  cursor: pointer;
  border: solid 3px #000;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 105px;
  background-color: #fff;
  background-position: center center;
  box-shadow: -2px 2px 0 0 rgba(0, 0, 0, 0.2);
  &:hover{
    box-shadow: none;
  }
  transition: box-shadow .3s ease-out;
`

const NextButton = styled.img`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  position: absolute;
  bottom: 16px;
  right: 25px;
  width: 45px;
  animation-name: ${animations.bounceUpDown};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  cursor: pointer;
  ${screen.desktopAbove`
    display: none;
  `}
`

export default class PictureBox extends PureComponent {
  constructor(props) {
    super(props)
    this.picNum = 0
    this.imgOnload = this._imgOnload.bind(this)
    this.onLoadingError = this._onLoadingError.bind(this)
  }
  componentWillUnmount() {
    this.picNum = null
  }
  _imgOnload() {
    this.picNum++
    this.props.reportLoadingProgress((this.picNum / totalPicsToLoad) * 100 + '%')
    if (this.picNum === totalPicsToLoad) {
      this.props.imagesOnloaded()
      this.picNum = 0
    }
  }
  _onLoadingError() {
    this.props.imagesLoadingError()
  }
  render() {
    const {
      characterSrc,
      bgSrc,
      show,
      toggleRecordPanel,
      startChatting,
      dialoguePage,
      flipDialoguePage,
      recordPanelIsOpen,
      emotionIndex
    } = this.props

    const Characters = characterSrc.map((imgName, charIndex) => {
      return (
        <ImageLoader
          key={'char' + charIndex}
          src={imgSrc[imgName]}
          image={() => {
            return (
              <Character 
                src={imgSrc[imgName]}
                show={charIndex === emotionIndex} 
              />
            )
          }}
          onError={this.onLoadingError}
          onLoad={this.imgOnload}
        />
      )
    })

    const Background = (
      <ImageLoader
        src={bgSrc}
        image={() => <BgBox src={bgSrc} />}
        onError={this.onLoadingError}
        onLoad={this.imgOnload}
      />
    )
    return (
      show ? 
      <Container>
        {Characters}
        {Background}
        <OpenRecordButton
          show={startChatting && !recordPanelIsOpen}
          src={imgSrc['icon_record']}
          onClick={toggleRecordPanel}
        />
        <NextButton 
          src={imgSrc['icon_next']}
          onClick={() => flipDialoguePage('next')}
          show={
            dialoguePage !== DIALOGUELENGTH - 1
            && startChatting
          }
        />
      </Container>
      : null
    )
  }
}

PictureBox.defaultProps = {
  characterSrc: null,
  emotionIndex: 0,
  bgSrc: null,
  startChatting: false,
  recordPanelIsOpen: false,
  reportLoadingProgress: () => {},
}

PictureBox.propTypes = {
  show: PropTypes.bool.isRequired,
  characterSrc: PropTypes.array,
  emotionIndex: PropTypes.number,
  bgSrc: PropTypes.string,
  toggleRecordPanel: PropTypes.func.isRequired,
  startChatting: PropTypes.bool,
  dialoguePage: PropTypes.number.isRequired,
  flipDialoguePage: PropTypes.func.isRequired,
  recordPanelIsOpen: PropTypes.bool,
  imagesOnloaded: PropTypes.func.isRequired,
  reportLoadingProgress: PropTypes.func,
  imagesLoadingError: PropTypes.func.isRequired
}