import BaseComponents from './base'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import screen from '../utils/screen'
import Slider from 'rc-slider'
import SliderButton from '../../static/slider-button.svg'
import styled from 'styled-components'
import theme from '../utils/theme'

// The mockup of default images in paragraphs
const imageMockup = {
  "desktop": {
    "width": 1500,
    "height": 1000
  },
  "mobile": {
    "width": 1500,
    "height": 1000
  }
}

const Container = BaseComponents.MobileLargeContainer.extend`
  margin: 0px auto 40px;  
  overflow: hidden;
`

const ImagesWrapper = styled.figure`
  position: relative;
  margin-left: 0;
  margin-right: 0;
  min-height: calc((100vw * ${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));
  ${screen.tabletOnly`
    min-height: calc(${layout.tablet.width.medium}px * (${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));
  `};

  ${screen.desktopOnly`
    min-height: calc(${layout.desktop.width.medium}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};

  ${screen.hdAbove`
    min-height: calc(${layout.hd.width.medium}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};
`

const ImgBGContainer = styled.div `
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${props => props.bgSrc});
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
`

const ImgOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-right: 3px solid white;
  background-image: url(${props => props.bgSrc});
  background-size: auto 100%;
  width: ${props => props.width};
  height: 100%;
`

const StyledSlider = styled(Slider)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
`

const StyledButton = styled.div`
  position: absolute;
  margin-top: -3.5px;
  top: 0;
  left: ${props => props.left};
  width: 36px;
  height: 24px;
  transform: translate(-50%, 0);
  margin-left: -2px;
  transition: width 0.3s ease-in-out;
  svg {
    width: 100%;
    height: 100%;
  }
`

const Description = styled.div `
  font-size: ${theme.typography.font.size.medium};
  color: ${theme.colors.gray50};
  text-align: justify;
  margin: 16px 24px 0px;
`

class ImageDiff extends Component{
  constructor(props) {
    super(props)
    this.state = {
      percentage: 50
    }
  }
  render() {
    const { percentage } = this.state
    const { content } = this.props
    return (
      <Container>
        <ImagesWrapper
          mockup={imageMockup}
        >
          <ImgBGContainer
            bgSrc={imgSrc[content[0]]}          
          />
          <ImgOverlayContainer
            bgSrc={imgSrc[content[1]]}
            width={percentage+'%'}
          />
          <StyledButton
            left={percentage+'%'}
          >
            <SliderButton />
          </StyledButton>
          <StyledSlider
              onChange={ (value)=>{
                this.setState({ percentage: parseInt(value) })
              }
            }
            value={50}
            tipFormatter={null}
          />
        </ImagesWrapper>
        <Description>{content[2]}</Description>
      </Container>
    )
  }
}

ImageDiff.propTypes = {
  content: PropTypes.array,
}

ImageDiff.defaultProps = {
  content: [],
}

export default ImageDiff
