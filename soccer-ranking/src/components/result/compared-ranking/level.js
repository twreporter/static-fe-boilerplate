import { fontWeight } from '../../../constants/style'
import { resultImages } from '../../../constants/image-paths'
import mq from '../../../utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin-top: 18px;
  margin-bottom: 16px;
`

const Title = styled.div`
  font-weight: ${fontWeight.bold};
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin-bottom: .5em;
`

const Text = styled.div`
  font-weight: ${fontWeight.regular};
  width: 95%;
  ${mq.mobileBelow`
    max-width: 313px;
  `}
  ${mq.desktopAbove`
    width: 470px;
  `}
  text-align: justify;
  font-size: 16px;
  margin: 1em auto 1em auto;
`

const Image = styled.img`
  margin: 0 auto;
  display: block;
  border: solid 4px #ffffff;
  width: 95%;
  ${mq.mobileBelow`
    max-width: 313px;
  `}
  ${mq.desktopAbove`
    width: 470px;
  `}
`

export default class Level extends PureComponent {
  static propTypes = {
    hitsCount: PropTypes.number.isRequired,
    userLevel: PropTypes.number.isRequired,
  }

  render() {
    const { hitsCount, userLevel } = this.props
    return (
      <Container>
        <Title>{`前 5 名中，你選到了 ${hitsCount} 位！`}</Title>
        <Image src={resultImages[userLevel]} />
        <Text>這些球星實力無庸置疑，但為什麼排名結果是這樣呢？請繼續往下滑看解析。</Text>
      </Container>
    )
  }
}
