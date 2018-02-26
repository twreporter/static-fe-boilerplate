/* eslint no-console:0, no-unused-expressions: 0 react/no-array-index-key:0 */
import BlockQuote from './blockquote'
import BottomTags from './bottom-tags'
import Confirmation from './confirmation'
import Footer from '@twreporter/react-components/lib/footer'
import HeaderOne from './header-one'
import HeaderTwo from './header-two'
import Image from './image'
import InfoBox from './infobox'
import LeadingVideo from './ie-leading-video'
import License from './license'
import LogoSVG from '../../static/logo.svg'
import Paragraph from './paragraph'
import React from 'react'
import Related from './related'
import SideBar from './side-bar'
import Video from './ie-video'
import data from '../data'
import screen from '../screen'
import styled, { injectGlobal } from 'styled-components'
import teamIntroImg from '../../static/team-intro.png'
import titleImg from '../../static/title.png'

const {
  anchors, bottomTags, leadingVideoContent, firstSection,
  headMeta, secondSection, thirdSection, fourthSection, relateds,
} = data

injectGlobal`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: none !important;
  }

  body, svg text, svg text>tspan {
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", Roboto, "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
    background-color: #fff;
  }

  #_hj_feedback_container {
    opacity: 0;
    transition: opacity 800ms 1000ms ease;
    &>div {
      display: none;
    }
    &.show {
      opacity: 1;
      &>div {
        display: block;
      }
    }
    @media (max-width: 374px) {
      display: none;
    }
  }
`

const Logo = styled.a`
  display: block;
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`

const Title = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  > img {
    width: 100%;
  }
`

const TeamIntro = styled.div`
  max-width: 290px;
  margin: 50px auto;
  > img {
    width: 100%;
  }
  ${screen.mobileOnly`
    max-width: 90%;
  `}
`

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toShowConfirmation: true,
    }
  }

  _renderSection(sectionBlocks) {
    return sectionBlocks.map((block, index) => {
      let Component = Paragraph
      if (block.type === 'infobox') {
        Component = InfoBox
      } else if (block.type === 'quote') {
        Component = BlockQuote
      } else if (block.type === 'blockquote') {
        Component = BlockQuote
      } else if (block.type === 'video') {
        Component = Video
      } else if (block.type === 'header-one') {
        Component = HeaderOne
      } else if (block.type === 'header-two') {
        Component = HeaderTwo
      } else if (block.type === 'image') {
        Component = Image
      }
      /*
      else if (block.type === 'iframe') {
        Component = Iframe
      }
      */
      return (
        <Component
          key={`para_${index}`}
          content={block.content}
        />
      )
    })
  }

  _renderSections(sections) {
    return sections.map((section, index) => {
      return (
        <section key={`anchor_${index}`}>
          {this._renderSection(section)}
        </section>
      )
    })
  }

  render() {
    const { toShowConfirmation } = this.state
    const hideConfirmation = () => {
      this.setState({
        toShowConfirmation: false,
      })
    }
    const confirmationJSX = toShowConfirmation ? (
      <Confirmation
        confirmText="我知道了"
        contentText="本專題建議使用Google Chrome或Firefox瀏覽器觀看"
        onConfirm={hideConfirmation}
      />
    ) : null
    return (
      <React.Fragment>
        {confirmationJSX}
        <Logo
          href="https://www.twreporter.org"
          target="_blank"
        >
          <LogoSVG />
        </Logo>
        <Title>
          <img
            src={titleImg}
            alt={headMeta.title}
          />
        </Title>
        <LeadingVideo
          content={leadingVideoContent[0].content}
        />
        <SideBar
          anchors={anchors}
        >
          {this._renderSections([firstSection, secondSection, thirdSection, fourthSection])}
        </SideBar>
        <License />
        <TeamIntro>
          <img src={teamIntroImg} alt="製作團隊。文字：王立柔；攝影：林佑恩、余志偉、吳逸驊；設計：林珍娜、黃禹禛；工程：李法賢；PM: 陳貞樺；監製：方德琳" role="presentation" />
        </TeamIntro>
        <BottomTags
          tags={bottomTags}
        />
        <Related
          posts={relateds}
        />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Root
