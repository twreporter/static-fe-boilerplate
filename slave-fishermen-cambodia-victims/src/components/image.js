import BaseComponents from './base'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../utils/screen'
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
`

const PictureWrapper = styled.div`
  width: 100%;
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

const Description = styled.div`
  font-size: ${theme.typography.font.size.medium};
  color: ${theme.colors.gray50};
  text-align: justify;
  margin: 16px 24px 0px;
`

class Image extends React.PureComponent {
  render() {
    const { content } = this.props
    return (
      <Container
        onClick={(e) => {console.log(e)}}
      >
        <PictureWrapper
          mockup={content[4] || imageMockup}
        >
          <LazyLoad once={true} offset={800} height={'100%'} >
            <picture>
              <source media="(orientation: portrait)" srcSet={imgSrc[content[1]]} />
              <source media="(max-width: 768px)" srcSet={imgSrc[content[1]]} />
                <img
                  width="100%"
                  src={imgSrc[content[0]]}
                  alt={content[2]}
                />
            </picture>
          </LazyLoad>
        </PictureWrapper>
        <Description>{content[3]}</Description>
      </Container>
    )
  }
}

Image.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Image
