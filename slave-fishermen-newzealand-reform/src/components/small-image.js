import BaseComponents from './base'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

// The mockup of vertical images in paragraphs
const imageMockup = {
  "desktop": {
    "width": 1108,
    "height": 1478
  },
  "mobile": {
    "width": 1108,
    "height": 1478
  }
}

const Container = BaseComponents.SmallContainer.extend`
  margin-right: auto;
  margin-left: auto;
`

const PictureWrapper = styled.div`
  width: 100%;
  min-height: calc((90vw * ${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));

  ${screen.tabletOnly`
    min-height: calc(${layout.tablet.width.small}px * (${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));
  `};

  ${screen.desktopOnly`
    min-height: calc(${layout.desktop.width.small}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};

  ${screen.hdAbove`
    min-height: calc(${layout.hd.width.small}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};
`

const Description = styled.div`
  width: 100%;
  font-size: ${theme.typography.font.size.medium};
  color: ${theme.colors.gray50};
  text-align: justify;
  margin-top: 15px;
`

class SmallImage extends React.PureComponent {
  render() {
    const { content } = this.props
    return (
      <Container>
        <PictureWrapper
          mockup={content[4] || imageMockup}
        >
          <picture>
            <source media="(orientation: portrait)" srcSet={imgSrc[content[1]]} />
            <source media="(max-width: 768px)" srcSet={imgSrc[content[1]]} />
            <LazyLoad once={true} offset={100} height={'100%'}>
              <img
                width="100%"
                src={imgSrc[content[0]]}
                alt={content[2]}
              />
            </LazyLoad>
          </picture>
        </PictureWrapper>
        <Description>{content[3]}</Description>
      </Container>
    )
  }
}

SmallImage.propTypes = {
  content: PropTypes.array.isRequired,
}

export default SmallImage
