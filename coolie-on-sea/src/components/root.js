/* eslint no-console:0, no-unused-expressions: 0 react/no-array-index-key:0 */
import BlockQuote from './blockquote'
import BookIntro from './book-intro'
import CCParagraph from './ccparagraph'
import Character from './character'
import Credits from './credits'
import DonationBox from './donation-box'
import FisherBaseMap from './fisher-base-map'
import FloatGraphics from './float-graphics'
import Footer from '@twreporter/react-components/lib/footer'
import HeaderOne from './header-one'
import HeaderTwo from './header-two'
import Image from './image'
import ImageDiff from './image-diff'
import InfoBox from './infobox'
import IntroParagraph from './intro-paragraph'
import LeadingVideo from './leading-video' 
import MapStory from './map-story'
import Opening from './opening'
import Paragraph from './paragraph'
import PhotoStory from './photo-story'
import React from 'react'
import SECTIONSDATA from '../data/content/sections'
import ShareButton from './share-button'
import SideBar from './side-bar' 
import SmallImage from './small-image'
import Team from './team'
import UnorderList from './unorder-list'
import Waypoint from 'react-waypoint'
import anchors from '../data/anchors'
import audioSrc from '../data/audio-src'
import ccAuthorize from '../constants/authorize'
import getQueryVarable from '../utils/get-query-variable'
import imgSrc from '../data/img-src'
import screen from '../utils/screen'
import smoothScroll from 'smoothscroll'
import styled, { injectGlobal } from 'styled-components'
import teamMembers from '../data/credits'
import theme from '../utils/theme'
import throttle from 'lodash/throttle'
import { scrollLocker } from '../utils/scroll-manager'
import { sectionTitleNoOrgName, sectionOgUrl, articleSlug } from '../constants/metadata'
import layout from '../utils/layout'

// lodash
const _ = {
  throttle
}

const ANCHOR_SEARCH_KEY = 'article'

const fontWeightRenderingFix = `
  text-rendering: optimizeLegibility;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    ${fontWeightRenderingFix}
    overflow-x: hidden;
    width: 100%;
    margin: 0;
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  button:active {
    outline: none;
    border: none;
  }
  button:focus {
    outline: 0;
  }
  ::selection {
    background-color: rgb(166, 122, 68);
    color: rgb(255, 255, 255);  
  }
`

const Background = styled.div`
  width: 100%;
  background: ${theme.colors.bg.app};
`

const BackToTopButton = styled.img`
 position: fixed;
 width: 52px;
 height: 52px;
 cursor: pointer;
 opacity: ${props => props.show ? 1 : 0};
 transition: opacity .3s linear;
 ${screen.tabletBelow`
   bottom: 25px;
   right: 25px;
 `}
 ${screen.desktopAbove`
   width: 36px;
   height: 36px;
 `}
 ${screen.desktopOnly`
   top: calc(264 / 900 * 100%);
   right: calc(50% - ${layout.desktop.width.small}px / 2 - (119 / 1024) * 100vw);
 `}
 ${screen.hdAbove`
   top: calc(364 / 900 * 100%);
   right: calc(50% - ${layout.hd.width.small}px / 2 - (100 / 1440) * 100vw);
 `}
`

const scrollPosition = {
  y: 0
}

const desktopBreakPoint = 1024

export default class Root extends React.Component {
  constructor(props) {
    super(props) 
    this.insideArticle = false
    this.state = {
      showBackToTop: false
    }
    this.smoothscrollToTargetAnchor = this._smoothscrollToTargetAnchor.bind(this)
    this.onArticleSelect = this._onArticleSelect.bind(this)
    this.showBackToTopButton = this._showBackToTopButton.bind(this)
    this.handleScroll = this._handleScroll.bind(this)
    this._onScroll = _.throttle(this.handleScroll, 300).bind(this)
  }

  componentDidMount() {
    // PIXI.utils.skipHello()
    // EX: if the url path is /?article=article1
    // after this component mounted and rendered,
    // the browser will smoothly scroll to article1
    
    this.smoothscrollToTargetAnchor()
    if (window.innerWidth < desktopBreakPoint) {
      window.addEventListener('scroll', this._onScroll)
    }
  }

  componentWillUnMount() {
    this.insideArticle = null
    window.removeEventListener('scroll', this._onScroll)
  }

  _handleScroll() {
    const { showBackToTop } = this.state
    const currentTopY = window.scrollY

    // Calculate scrolling distance to determine whether tools are displayed
    const lastY = scrollPosition.y
    const distance = currentTopY - lastY
    scrollPosition.y = currentTopY
    if (distance > 30) {
      if (showBackToTop && this.insideArticle) {
        this.showBackToTopButton(false, true)
      }
    } else if (distance < -100) {
      if (!showBackToTop && this.insideArticle) {
        this.showBackToTopButton(true, true)
      }
    }
  }

  _smoothscrollToTargetAnchor() {
    const anchorQuery = getQueryVarable(ANCHOR_SEARCH_KEY)
    if (anchorQuery) {
      const targetAnchor = document.getElementById(anchorQuery)
      smoothScroll(targetAnchor)

      // don't scroll, jump to anchor position
        // window.scroll(0, targetAnchor.getBoundingClientRect().top)
    }
  }

  _onArticleSelect(storyId, autoScroll = true) {
    const storySpliter = storyId.split('-')
    const conversationId = storySpliter[0] + '-' + storySpliter[1]
    const roleIndex = storySpliter[2]
    
    // scroll to selected conversation box
    if (autoScroll) {
      smoothScroll(document.getElementById(conversationId))
    }
  }

  _renderSection(sectionBlocks, sectionIndex) {
    return sectionBlocks.map((block, blockindex) => {
      let Component = Paragraph
      if (block.type === 'infobox') {
        Component = InfoBox
      } else if (block.type === 'image') {
        Component = Image
      } else if (block.type === 'small-image') {
        Component = SmallImage
      } else if (block.type === 'title') {
        Component = HeaderOne
      } else if (block.type === 'share-button') {
        Component = ShareButton
      } else if (block.type === 'intro-paragraph') {
        Component = IntroParagraph
      } else if (block.type === 'header-two') {
        Component = HeaderTwo
      } else if (block.type === 'credits') {
        Component = Credits
      } else if (block.type === 'book-intro') {
        Component = BookIntro
      } else if (block.type === 'blockquote') {
        Component = BlockQuote
      } else if (block.type === 'character') {
        Component = Character
      } else if (block.type === 'image-diff') {
        Component = ImageDiff
      } else if (block.type === 'photo-story') {
        Component = PhotoStory
      } else if (block.type === 'map-story') {
        Component = MapStory
      } else if (block.type === 'fisher-base-map') {
        Component = FisherBaseMap
      } else if (block.type === 'unorder-list') {
        Component = UnorderList
      } else if (block.type === 'float-graphics') {
        Component = FloatGraphics
      } else if (block.type == 'leading-video') {
        Component = LeadingVideo
      }

      if (Component == HeaderOne) {
        return (
          <Component
            key={`block_${block.type}_${blockindex}`}
            id={`${articleSlug[sectionIndex]}`}
            content={block.content}
          />
        )
      } else if (Component == ShareButton) {
        return (
          <Component
            key={`block_${block.type}_${blockindex}`}
            content={
              {
                url: sectionOgUrl[sectionIndex],
                title: sectionTitleNoOrgName[sectionIndex],
              }
            }
          />
        )
      } else if (Component == HeaderTwo) {
        return (
          <Component
            key={`block_${block.type}_${blockindex}`}
            content={block.content}
            textAlign={block.textAlign}
          />
        )
      }

      return (
        <Component
          key={`block_${block.type}_${blockindex}`}
          content={block.content}
        />
      )
    })
  }

  _renderSections(sections) {
    return sections.map((section, sectionArrayIndex) => {
      return (
        <section key={`anchor_${sectionArrayIndex}`}>
          {this._renderSection(section, sectionArrayIndex)}
        </section>
      )
    })
  }

  _showBackToTopButton(toShow, isInsideArticleBody = false) {
    this.insideArticle = isInsideArticleBody
    this.setState({
      showBackToTop: toShow 
    }) 
  }
  render() {
    const { showBackToTop } = this.state
    return (
      <React.Fragment>
        <BackToTopButton
          src={imgSrc['back_to_top']}
          show={showBackToTop}
          onClick={() => { smoothScroll(0) }}
        />
        <Background>
          <Opening
            firstAnchorId={anchors[0].id}
            showBackToTopButton={this.showBackToTopButton}
          />
          <SideBar anchors={anchors}>
            {this._renderSections(SECTIONSDATA)}
          </SideBar>
          <DonationBox />
          <CCParagraph content={[ccAuthorize]} />
          <Team credits={teamMembers} />
        </Background>
        <Waypoint
          onEnter={this.showBackToTopButton.bind(this, false, true)}
          onLeave={this.showBackToTopButton.bind(this, true, true)}
          fireOnRapidScroll
        >
          <div>
            <Footer />
          </div>
        </Waypoint>
      </React.Fragment>
    )
  }
}
