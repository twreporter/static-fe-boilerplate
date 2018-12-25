import BaseComponents from './base'
import imgSrc from '../data/img-src'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const imageMockup = {
  "hd": {
    "width": 340,
    "height": 340
  },
  "desktop": {
    "width": 326,
    "height": 326
  },
  "tablet": {
    "width": 326,
    "height": 326
  },
  "mobile": {
    "width": 348,
    "height": 348
  }
}

const Container = BaseComponents.SmallContainer.extend`
  position: relative;
  display: flex;
  margin: 0 auto 40px auto;
  ${screen.mobileBelow`
    margin: 0 auto;
    padding-bottom: 40px;
    flex-direction: column-reverse;
  `};
  ${screen.tabletOnly`
    padding-bottom: 40px;  
  `}
`

const PictureWrapper = styled.div`
  width: 100%;
  min-height: calc((90vw * ${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));

  ${screen.mobileBelow`
    margin-bottom: 40px;
  `};

  ${screen.tabletOnly`
    width: ${props => props.mockup.tablet.width}px;
    min-height: calc(${props => props.mockup.tablet.width}px * (${props => props.mockup.tablet.height} / ${props => props.mockup.tablet.width}));
  `};

  ${screen.desktopOnly`
    width: ${props => props.mockup.desktop.width}px;
    min-height: calc(${props => props.mockup.desktop.width}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};

  ${screen.hdAbove`
    width: ${props => props.mockup.hd.width}px;
    min-height: calc(${props => props.mockup.hd.width}px * (${props => props.mockup.hd.height} / ${props => props.mockup.hd.width}));
  `};
`
const HeaderTwo = BaseComponents.SmallContainer.extend `
  margin: 0 auto 40px auto;
  font-size: ${theme.typography.font.size.xxlarge};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.large};
  ${screen.mobileBelow`
    margin: 40px auto;
  `}
`.withComponent('h2')

const Paragraph = styled.p`
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${theme.typography.font.weight.medium};
  line-height: ${theme.typography.lineHeight.regular};
  color: ${theme.colors.text.paragraph};
  white-space: pre-wrap;
  text-align: justify;
  margin: 0;
  ${screen.tabletAbove`
    padding-right: 20px;
  `};

  ${screen.tabletOnly`
    width: calc(100% - ${props => props.mockup.tablet.width}px);
  `};

  ${screen.desktopOnly`
    width: calc(100% - ${props => props.mockup.desktop.width}px);
  `};

  ${screen.hdAbove`
    width: calc(100% - ${props => props.mockup.hd.width}px);
  `};
`

const SeperateLine = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 3px;
  background-color: #000;
  display: ${props => props.show ? 'block' : 'none'};
  ${screen.mobileBelow`
    -top: 40px;
  `}
`

class BookIntro extends React.PureComponent {
  render() {
    const { content } = this.props
    const _content = content.map((book, bookindex) => {
      return (
        <React.Fragment key={`book-${bookindex}`}>
          <HeaderTwo>
            {book[0]}
          </HeaderTwo>
          <Container>
            <Paragraph
              mockup={imageMockup}            
            >
              {book[1]}
            </Paragraph>
            <PictureWrapper
              mockup={imageMockup}
            >
            <LazyLoad once={true} offset={100}>
              <img
                width="100%"
                src={imgSrc[book[2]]}
                alt={book[0]}
              />
            </LazyLoad>
          </PictureWrapper>
          <SeperateLine show={bookindex !== content.length - 1}/>
          </Container>
        </React.Fragment>
      )
    })
    return (
      _content
    )
  }
}

BookIntro.propTypes = {
  content: PropTypes.array.isRequired,
}

export default BookIntro
