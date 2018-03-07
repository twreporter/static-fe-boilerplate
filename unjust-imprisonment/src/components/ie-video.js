/* eslint no-console:0 */
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../screen'
import styled from 'styled-components'
import underlineImg from '../../static/line.png'

const InfoBox = BaseComponents.SmallContainer.extend`
  position: relative;
  top: -3px;
  width: 100%;
  display: block;
  margin: 0 auto;
  > img {
    display: block;
    margin-bottom: 20px;
  }
`

const FlexItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${screen.mobileOnly`
    flex-wrap: wrap;
  `}
`

const FlexItem = styled.img`
  flex: 0 1 auto;
  max-width: 100%;
  height: ${props => props.height};

  ${screen.mobileOnly`
    order: ${props => props.mobileOrder};
    margin-top: ${props => (props.isLast ? '20px' : '0px')};
  `}
`

const Container = BaseComponents.MediumContainer.extend`
  overflow: hidden;
  margin: 30px auto;
  cursor: pointer;
  > video {
    display: block;
  }
`

class Video extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onLoadedData = this._onLoadedData.bind(this)
  }

  _onLoadedData() {
    const { content } = this.props
    console.log(
      'video loaded, could be %s or %s',
      this._getFullSrc(content[1]),
      this._getFullSrc(content[2]),
    )
  }

  _getFullSrc(src) {
    /*
    if (process.env.NODE_ENV === 'production') {
      return `https://www.twreporter.org/videos/unjust-imprisonment/${src}`
    }
    */
    return `static/${src}`
  }

  render() {
    const { content } = this.props
    return (
      <Container>
        <div
          style={{
            marginTop: '-1%',
            marginLeft: '-1%',
          }}
        >
          <video
            controls
            onLoadedData={this.onLoadedData}
            playsInline
            poster={content[0]}
            preload="none"
            ref={(node) => { this.player = node }}
            width="102%"
          >
            <source
              src={this._getFullSrc(content[1])}
              type="video/webm"
            />
            <source
              src={this._getFullSrc(content[2])}
              type="video/mp4"
            />
          </video>
        </div>
        <InfoBox>
          <img width="100%" src={underlineImg} alt="underline of video" role="presentation" />
          <FlexItems>
            <FlexItem src={content[3]} role="presentation" mobileOrder="1" height="50px" />
            <FlexItem src={content[4]} role="presentation" mobileOrder="3" isLast height="50px" />
          </FlexItems>
        </InfoBox>
      </Container>
    )
  }
}

Video.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Video
