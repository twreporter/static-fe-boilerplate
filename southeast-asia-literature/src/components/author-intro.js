import mq from '../utils/media-query'
import React from 'react'
import styled from 'styled-components'
import { fontWeight } from '../constants/style-variables'
import ContentContainer from './content-container'

const fontSize = {
  title: {
    desktop: '35px',
    tablet: '35px',
    mobile: '25px',
  },
  subtitle: '16px',
  desctiption: '18px',
}

const Container = ContentContainer.extend`
  background: #fff;
  padding-top: 35px;
  ${mq.desktopAbove`
    display: flex;
    padding-top: 60px;
  `}
`

const DesktopImageBlcok = styled.div`
  width: 379px;
  flex: 0 0 379px;
  margin-right: 35px;
  ${mq.tabletBelow`
    display: none;
  `}
`

const TextBlock = styled.div``

const Title = styled.h2`
  line-height: 1;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.title.desktop};
  ${mq.mobileOnly`
    font-size: ${fontSize.title.mobile};
    margin: 0 0 3px 0;
  `}
  ${mq.tabletOnly`
    margin: 0 0 9px 0;
  `}
  ${mq.desktopAbove`
    margin: 0 0 10px 0;
  `}
`

const Subtitle = styled.div`
  line-height: 1;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.subtitle};
  margin: 0 0 10px 0;
`

const Description = styled.div`
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize.description};
  line-height: 1.94;
  ${mq.desktopAbove`
    margin-top: 15px;
  `}
`

const Image = styled.div`
  padding-top: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  ${mq.mobileOnly`
    ${props => (props.mobile ? `background-image: url(${props.mobile});` : '')}
  `}
  ${mq.tabletOnly`
    ${props => (props.tablet ? `background-image: url(${props.tablet});` : '')}
  `}
  ${mq.desktopAbove`
    ${props => (props.desktop ? `background-image: url(${props.desktop});` : '')}
  `}
`

const MobileImage = Image.extend`
  margin: 30px auto;
  width: 100%;
  max-width: 100%;
  ${mq.desktopAbove`
    display: none;
  `}
`

const DesktopImage = Image.extend`
  ${mq.tabletBelow`
    display: none;
  `}
`

class Intro extends React.PureComponent {
  render() {
    const {
      nameChinese,
      nameOrigin,
      country,
      description,
      image,
    } = this.props
    return (
      <div style={{ background: '#fff' }}>
        <Container wide>
          <DesktopImageBlcok>
            <DesktopImage {...image} />
          </DesktopImageBlcok>
          <TextBlock>
            <Title>{nameChinese}</Title>
            <Subtitle>{nameOrigin}</Subtitle>
            <Subtitle>{country}</Subtitle>
            <MobileImage {...image} />
            <Description>{description}</Description>
          </TextBlock>
        </Container>
      </div>
    )
  }
}

export default Intro
