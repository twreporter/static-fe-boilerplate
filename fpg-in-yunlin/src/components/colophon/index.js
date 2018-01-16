import { zIndex } from '../../constants/style-variables'
import Button from './button'
import FbIcon from '../../../svg/icon-facebook.svg'
import GithubIcon from '../../../svg/icon-github.svg'
import List from './list'
import MailIcon from '../../../svg/icon-mail.svg'
import metaData from '../../data//head-meta'
import React from 'react'
import Relateds from './relateds'
import screen from '../../utils/media-query'
import styled from 'styled-components'
import TopicBox from './topic-box'

const content = {
  topicTitle: '回到專題：六輕營運20年——科學戰爭下的環境難民',
  topicImage: {
    mobile: 'https://storage.googleapis.com/twreporter-multimedia/images/20180123175443-aea7a0d9adceea44182a74f3fdc93c38-mobile.jpeg',
    tablet: 'https://storage.googleapis.com/twreporter-multimedia/images/20180123175443-aea7a0d9adceea44182a74f3fdc93c38-tablet.jpeg',
    desktop: 'https://storage.googleapis.com/twreporter-multimedia/images/20180123175443-aea7a0d9adceea44182a74f3fdc93c38-tablet.jpeg',
  },
  topicLink: 'https://www.twreporter.org/topics/fpc-sixth-naphtha-cracker-20-years',
  relateds: [
    {
      title: '六輕污染為什麼測不到？測到也不算數？',
      to: 'https://www.twreporter.org/a/fpc-sixth-naphtha-cracker-contaminant-detection',
      imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20180122233816-1277eedc9cf752c0dd3b3c5ea61d7d37-mobile.jpg',
    },
    {
      title: '【彰化台西】大風吹──吹污染下輪流受害的人',
      to: 'https://www.twreporter.org/a/fpc-sixth-naphtha-cracker-changhua-taishi',
      imageSrc: 'https://storage.googleapis.com/twreporter-multimedia/images/20180122183701-98d9ca87fd3400203d5a78323348f99b-mobile.jpg',
    },
  ],
  team: [
    '房慧真、陳貞樺',
    '黃禹禛、余崇任',
  ],
  reference: [
    'Google Earth',
    '台塑官網',
    '麥寮港管理公司',
    '薛化元等，《台灣石化業發展史》',
  ],
}

const relatedBoxWidth = {
  mobile: '100%',
  tablet: '414px',
  desktop: '537px',
  hd: '992px',
}

// const paddingTop = {
//   tablet: '79px',
//   desktop: '79px',
//   hd: '110px',
// }

const Container = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 700ms ease 500ms, visibility 0ms linear 100ms;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-style: normal;
  z-index: ${zIndex.colophonContainer};
  ${screen.mobileOnly`
    height: 100%;
    padding: 4% 5%;
  `}
  ${screen.tabletAbove`
    display: flex;
    align-items: center;
    padding: 0 20px;
  `}
  ${screen.desktopOnly`
  `}
  ${screen.hdAbove`
  `}
`

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  ${screen.tabletAbove`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    max-height: 566px;
  `}
  ${screen.desktopOnly`
    max-height: 566px;
  `}
  ${screen.hdAbove`
    max-height: 790px;
  `}
`

const RealtedsBox = styled.div`
  ${screen.mobileOnly`
    width: ${relatedBoxWidth.mobile};
    height: 40%;
    margin-bottom: 25px;
  `}
  ${screen.tabletAbove`
    width: ${relatedBoxWidth.tablet};
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  `}
  ${screen.desktopAbove`
    width: ${relatedBoxWidth.desktop};
  `}
  ${screen.hdAbove`
    width: ${relatedBoxWidth.hd};
  `}
`

const InfosBox = styled.div`
  width: ${relatedBoxWidth.mobile};
  min-width: 270px;
  height: auto;
  ${screen.tabletAbove`
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    padding-bottom: 15px;
    height: 90%;
    max-width: 430px;
  `}
  ${screen.hdAbove`
    padding-top: 30px;
    height: 84%;
  `}
`

class Colophon extends React.Component {
  render() {
    const { currentIndex } = this.props
    const { relateds, team, topicTitle, topicImage, topicLink, reference } = content
    const show = currentIndex === 18
    return (
      <Container show={show}>
        <Wrapper>
          <RealtedsBox isFocus={show}>
            <TopicBox topicTitle={topicTitle} topicImage={topicImage} to={topicLink} />
            <Relateds relateds={relateds} />
          </RealtedsBox>
          <InfosBox isFocus={show}>
            <List title="製作團隊" items={team} />
            <List title="資料來源" items={reference} />
            <Button title="訂閱電子報" to="https://twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32"><MailIcon /></Button>
            <Button title="分享" to={`https://www.facebook.com/sharer/sharer.php?u=${metaData.ogUrl}`}><FbIcon /></Button>
            <Button title="開放原始碼" to="https://github.com/twreporter"><GithubIcon /></Button>
          </InfosBox>
        </Wrapper>
      </Container>
    )
  }
}

Colophon.propTypes = {
  // isFocus: PropTypes.bool.isRequired,
  // relateds: PropTypes.array.isRequired,
  // team: PropTypes.array.isRequired,
  // topicImage: PropTypes.object.isRequired,
  // topicLink: PropTypes.string.isRequired,
  // topicTitle: PropTypes.string.isRequired,
}

export default Colophon
