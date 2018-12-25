import BaseComponents from './base'
import imgSrc from '../data/img-src'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'
import LazyLoad from 'react-lazyload'
import layout from '../utils/layout'
import Paragraph from './paragraph'

const typography = theme.typography

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

const style = {
  desktopAbove: {
    width: '282px',
    height: '130px'
  },
  tablet: {
    width: '255px',
    height: '106px'
  },
  mobile: {
    width: '100%',
    height: '130px'
  }
}

const Container = BaseComponents.MediumContainer.extend`
  margin-left: auto;
  margin-right: auto;
`

const Link = styled.div`
  cursor: pointer;
`

const PictureWrapper = styled.div`
  min-height: calc((90vw * ${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));
  ${screen.tabletOnly`
    min-height: calc(${layout.tablet.width.small}px * (${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));
  `};
  ${screen.tabletAbove`
    margin-left: 30px;
    float: right;
  `};
  ${screen.tabletOnly`
    width: calc(375 / 768 * 100%);
    min-height: calc(${layout.desktop.width.small * 0.36}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};
  ${screen.desktopAbove`
    width: 36%;
  `}
  ${screen.desktopOnly`
    min-height: calc(${layout.desktop.width.small * 0.36}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};

  ${screen.hdAbove`
    min-height: calc(${layout.hd.width.small * 0.36}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};
`

class FloatGraphics extends PureComponent {
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
				{
			  	content.slice(5).map((paragraph, pindex) => {
						return (
							<Paragraph key={'p-'+ pindex} content={paragraph.content} />
						)
			  	})
				}	
      </Container>
    )
  }
}

FloatGraphics.propTypes = {
  content: PropTypes.array.isRequired,
}

export default FloatGraphics 
