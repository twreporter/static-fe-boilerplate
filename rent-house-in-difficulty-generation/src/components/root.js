/* eslint no-console:0, no-unused-expressions: 0 react/no-array-index-key:0 */
import { sectionTitleNoOrgName, sectionOgUrl } from '../constants/metadata'
import anchors from '../data/anchors'
import ccAuthorize from '../constants/authorize'
import CCParagraph from './ccparagraph'
import ConversationSelector from './conversation-selector'
import Credits from './credits'
import creditsData from '../data/credits'
import DonationBox from './donation-box'
import Footer from '@twreporter/react-components/lib/footer'
import getQueryVarable from '../utils/get-query-variable'
import HeadBar from './head-bar'
import HeaderOne from './header-one'
import HeaderTwo from './header-two'
import HiddenScriptText from './hidden-script-text'
import Image from './image'
import InfoBox from './infobox'
import IntroParagraph from './intro-paragraph'
import ItalicParagraph from './italic-paragraph'
import Opening from './opening'
import Paragraph from './paragraph'
import React from 'react'
import RoleCardInParagraph from './role-card-in-paragraph'
import SECTIONSDATA from '../data/content/sections'
import ShareButton from './share-button'
import SmallImage from './small-image'
import smoothScroll from 'smoothscroll'
import styled, { injectGlobal } from 'styled-components'
import theme from '../utils/theme'

const ANCHOR_SEARCH_KEY = 'anchorId'
const TITLEIDPREFIX = 'title'

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
    background: ${theme.colors.bg.app};
    color: #FFFFFF;
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
`

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.smoothscrollToTargetAnchor = this._smoothscrollToTargetAnchor.bind(this)
    this.onStorySelect = this._onStorySelect.bind(this)
    this.state = {
      selectedRoleIndex: null,
      selectedConversationId: null
    }
  }
  componentDidMount() {

    // EX: if the url path is /?article=article1
    // after this component mounted and rendered,
    // the browser will smoothly scroll to article1

    this.smoothscrollToTargetAnchor()
  }
  _smoothscrollToTargetAnchor() {
    const anchorQuery = getQueryVarable(ANCHOR_SEARCH_KEY)
    console.log(anchorQuery)
    if (anchorQuery) {
      const targetAnchor = document.getElementById(anchorQuery)

      // TODO: Better to use side-bar's function
      smoothScroll(targetAnchor)

      // don't scroll, jump to anchor position
        // window.scroll(0, targetAnchor.getBoundingClientRect().top)
    }
  }
  _onStorySelect(storyId, autoScroll = true) {
    const storySpliter = storyId.split('-')
    const conversationId = storySpliter[0] + '-' + storySpliter[1]
    const roleIndex = storySpliter[2]
    
    // scroll to selected conversation box
    if (autoScroll) {
      smoothScroll(document.getElementById(conversationId))
    }

    this.setState({
      selectedConversationId: conversationId,
      selectedRoleIndex: roleIndex
    })

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
      } else if (block.type === 'role-card-in-paragraph') {
        Component = RoleCardInParagraph
      } else if (block.type === 'conversation-selector') {
        Component = ConversationSelector
      } else if (block.type === 'share-button') {
        Component = ShareButton
      } else if (block.type === 'intro-paragraph') {
        Component = IntroParagraph
      } else if (block.type === 'header-two') {
        Component = HeaderTwo
      } else if (block.type === 'hidden-script-text') {
        Component = HiddenScriptText
      } else if (block.type == 'italic-paragraph') {
        Component = ItalicParagraph
      }

      if (Component == HeaderOne) {
        return (
          <Component
            key={`block_${block.type}_${blockindex}`}
            id={`${TITLEIDPREFIX}${sectionIndex}`}
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
      } else if (Component == RoleCardInParagraph) {
        return (
          <Component
            key={`block_${block.type}_${blockindex}`}
            content={block.content}
            onStorySelect={this.onStorySelect}
          />
        )
      } else if (Component == ConversationSelector) {
        return (
          <Component
            key={`block_${block.type}_${blockindex}`}
            id={block.id}
            selectedConversationId={this.state.selectedConversationId}
            selectedRoleIndex={this.state.selectedRoleIndex}
            onStorySelect={this.onStorySelect}
            content={block.content}
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

  render() {
    return (
      <React.Fragment>
        <Opening firstAnchorId={anchors[0].id}/>
        <HeadBar anchors={anchors}>
          {this._renderSections(SECTIONSDATA)}
        </HeadBar>
        <DonationBox />
        <CCParagraph content={[ccAuthorize]}/>
        <Credits credits={creditsData}/>
        <Footer />
      </React.Fragment>
    )
  }
}
