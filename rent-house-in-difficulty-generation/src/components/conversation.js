
// RULES:
// 1. The whole input is an JSON Array
// 2. 'next' should always be an JSON Array
// 3. If the layer is for description, where the type is set as 'description', this layer should have exactly two JSON in type 'description' and 'response'.
//    (In this layer, type 'description' should be placed in front of type 'response')
// 4. If the layer is for selection and option, this layer should have at least two type 'option' JSON. 
//    (In this layer, type 'selection' should be placed in front of type 'option')
// 5. The type of the last layer can only be 'description' and one 'response.
// 6. 'content' & 'type' is complusory / 'next' is optional => if 'next' doesn't exist, the component will consider it's the end of the conversation
// 7. All the functionalities are packed in a component. User only needs to intput the JSON Array
//    Usage: <Conversation info={JSON_Array} />

import {
  LoadingPage,
  LoadingBar,
  LoadingBarFG,
  LoadingIcon
} from './conversation-item-style'
import commonStyle from '../utils/common-style'
import ContentBox from './conversation-content-box'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import PictureBox from './conversation-picture-box'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import RecordPanel from './conversation-record-panel';
import screen from '../utils/screen'
import styled from 'styled-components'
import Swipeable from 'react-swipeable'

const LOADING = '載入中...'
const LOADINGERR = '發生錯誤，請再試一次。'

const mediumContainerWidth = {
  tablet: layout.tablet.width.medium,
  desktop: layout.desktop.width.medium,
  hd: layout.hd.width.medium
}

const style = {
  color: {
    border: "#979797",
    bg: "#d8d8d8",
    darkBg: "rgba(0, 0, 0, 0.5)",
    button: "#404040"
  },
  layout: {
    height: {
      desktopAbove: 615,
      tabletOnly: 560,
      mobileOnly: 630,
      miniOnly: 560
    }
  }
}

const mockup = {
  desktop: {
    width: 833,
    height: 589
  },
  mobile: {
    width: 375,
    height: 593
  }
}

const Container = styled.div`
  padding-top: ${commonStyle.headbar.height};
`

const ConversationBox = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  background-color: ${props => props.hasNext ? style.color.bg : style.color.darkBg};
  ${screen.hdAbove`
    height: calc(${mediumContainerWidth.hd}px * (${mockup.desktop.height} / ${mockup.desktop.width}));
  `}
  ${screen.desktopOnly`
    height: calc(${mediumContainerWidth.desktop}px * (${mockup.desktop.height} / ${mockup.desktop.width}));
  `}
  ${screen.tabletOnly`
    height: calc(${mediumContainerWidth.tablet}px * (${mockup.desktop.height} / ${mockup.desktop.width}) + 80px);
  `}
  ${screen.mobileOnly`
    height: calc(100vw * (${mockup.mobile.height} / ${mockup.mobile.width}));
  `}
  ${screen.miniOnly`
    min-height: calc(100vw * (${mockup.mobile.height} / ${mockup.mobile.width}));
    height: ${props => props.hasNext ? 'auto' : `calc(100vw * (${mockup.mobile.height} / ${mockup.mobile.width}))`};
  `}
`

const OverlayMask = styled.div`
  position: absolute;
  display: ${props => props.show ? 'block' : 'none'};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`

class Conversation extends PureComponent {
  constructor(props) {
    super(props)
    let cur = this.props.info
    this.root = cur
    this.state = {
      cur: cur,
      dialoguePage: 0,
      recordPanelIsOpen: false,
      startChatting: false,
      showLoadingPage: true,
      loadingProgress: '0',
      loadingError: false
    }
    this.conversationRecords = [{
      type: this.root.type,
      content: this.root.content
    }]
    this.handleForwardClick = this._handleForwardClick.bind(this)
    this.flipDialoguePage = this._flipDialoguePage.bind(this)
    this.isThereNext = this._isThereNext.bind(this)
    this.isPenultimate = this._isPenultimate.bind(this)
    this.goToNext = this._goToNext.bind(this)
    this.backToStart = this._backToStart.bind(this)
    this.zeroDialoguePage = this._zeroDialoguePage.bind(this)
    this.toggleRecordPanel = this._toggleRecordPanel.bind(this)
    this.closeStartingPage = this._closeStartingPage.bind(this)
    this.swipedToCloseRecordPanel = this._swipedToCloseRecordPanel.bind(this)
    this.imagesOnloaded = this._imagesOnloaded.bind(this)
    this.reportLoadingProgress = this._reportLoadingProgress.bind(this)
    this.imagesLoadingError = this._imagesLoadingError.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const newInfo = nextProps.info
    
    if (newInfo !== this.props.info) {
      this.setState({
        showLoadingPage: true
      })
    }

    this.root = newInfo

    // Empty the records
    // TODO: split out to be a function
    this.conversationRecords = [{
      type: this.root[0].type,
      content: this.root[0].content
    }]

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!TODO: Move some setstate here to shouldComponentUpdate
    this.setState({
      cur: newInfo,
      dialoguePage: 0,
      startChatting: false,
      recordPanelIsOpen: false,
    })
  }

  componentWillUnmount() {
    this.conversationRecords = null
    this.root = null
    this.loadingProgress = null
  }

  _imagesOnloaded() {
    if (!this.state.loadingError) {
      setTimeout(() => {
        this.setState({
          showLoadingPage: false,
          loadingProgress: '0'
        })
      }, 500)
      return
    }
    return
  }

  _imagesLoadingError() {
    this.setState({
      loadingError: true
    })
  }

  _reportLoadingProgress(percent) {
    this.setState({
      loadingProgress: percent
    })
  }

  _handleForwardClick(str, nextIndex = 0) {
    this.zeroDialoguePage()
    switch (str) {
      case 'next':
        this.goToNext(nextIndex)
        return
      case 'return':
        this.backToStart()
        return
      default: 
        return
    }
  }

  // This function receives the cur array and detect whether the it has next content to continue
  // End situation assumption: 1. should end with type 'response'
  //                           2. this final layer should only have two JSON in type 'description' and type 'response' 
  //                           3. next is undefined
  _isThereNext(temp_json_array) {
    if(temp_json_array.length === 2 && temp_json_array[1].next === undefined) {
      return false
    } 
    return true
  }

  _isPenultimate(temp_json_array) {
    if (temp_json_array[1]) {
      if (temp_json_array[1].next !== undefined) {
        const isNotLast = this.isThereNext(temp_json_array[1].next)
        return !isNotLast
      }
    }
    return false
  }

  // Replace next as cur
  _goToNext(nextIndex) {
    // Keep in records
    // TODO: move out to be a function

    // The chosen dialogue
    this.conversationRecords.push({
      type: this.state.cur[nextIndex].type,
      content: this.state.cur[nextIndex].content
    })
    // Next dialogue speak by the character
    this.conversationRecords.push({
      type: this.state.cur[nextIndex].next[0].type,
      content: this.state.cur[nextIndex].next[0].content
    })

    let next = this.state.cur[nextIndex].next
    this.setState({ cur: next })
  }

  // Back to the start point
  _backToStart() {
    this.setState({
      cur: this.root
    })
    // Flush the old records
    // TODO: move out to be a function
    this.conversationRecords = [{
      type: this.root[0].type,
      content: this.root[0].content
    }]
  }

  _toggleRecordPanel() {
    this.setState({ 
      recordPanelIsOpen: !this.state.recordPanelIsOpen
    })
  }

  _zeroDialoguePage() {
    this.setState({
      dialoguePage: 0
    })
  }

  _flipDialoguePage(action) {
    const { dialoguePage } = this.state
    switch(action) {
      case 'next':
        this.setState({
          dialoguePage: dialoguePage + 1
        })
        return 
      case 'prev':
        this.setState({
          dialoguePage: dialoguePage - 1
        })
        return
      default:
        return  
    }
  }

  _closeStartingPage() {
    this.setState({
      startChatting: true
    })
  }

  _swipedToCloseRecordPanel(e, deltaX) {
    if (this.state.recordPanelIsOpen) {
      if (Math.abs(deltaX) > 70) {
        this.toggleRecordPanel()
      }
    }
    return
  }

  render() {
    const { cur, recordPanelIsOpen, dialoguePage, startChatting, showLoadingPage, loadingError, loadingProgress } = this.state
    const { illustration, meta, device, content, onStorySelect, selectedRoleIndex } = this.props
    const hasNext = this.isThereNext(cur)
    let head = null
    let bgSrc = null
    let emotionIndex = null

    if (cur && illustration && hasNext) {
      head = cur[0]
      emotionIndex = Number(head.character)
      bgSrc = device === 'tabletAbove' ? imgSrc[illustration.bg.desktop]:imgSrc[illustration.bg.mobile] 
    }

    return (
      <Container>
        <Swipeable
          onSwiped={this.swipedToCloseRecordPanel}
        >
          <LoadingPage
            show={showLoadingPage}
          >
            {
              !loadingError ?
              <LoadingBar
                show={!loadingError}
              >
                <LoadingBarFG 
                  barWidth={loadingProgress}
                />
              </LoadingBar>
              : null
            }
            <p>
              <span><LoadingIcon src={imgSrc['icon_loading']}/></span>
              { 
                !loadingError ?
                LOADING : LOADINGERR
              }
            </p>
          </LoadingPage>
          <RecordPanel
            records={this.conversationRecords} 
            isOpen={recordPanelIsOpen}
            closePanel={this.toggleRecordPanel}
          />
          <ConversationBox
            hasNext={hasNext}
          >
            <PictureBox
              show={hasNext}
              characterSrc={illustration["character"]}
              emotionIndex={emotionIndex}
              bgSrc={bgSrc}
              toggleRecordPanel={this.toggleRecordPanel}
              startChatting={startChatting}
              dialoguePage={dialoguePage}
              flipDialoguePage={this.flipDialoguePage}
              recordPanelIsOpen={recordPanelIsOpen}
              imagesOnloaded={this.imagesOnloaded}
              reportLoadingProgress={this.reportLoadingProgress}
              imagesLoadingError={this.imagesLoadingError}
            />
            <ContentBox
              hasNext={hasNext}
              currentNode={cur}
              dialoguePage={dialoguePage}
              startChatting={startChatting}
              firstChat={meta.firstChat}
              handleForwardClick={this.handleForwardClick}
              closeStartingPage={this.closeStartingPage}
              flipDialoguePage={this.flipDialoguePage}
              content={content}
              onStorySelect={onStorySelect}
              selectedRoleIndex={selectedRoleIndex}
            />
            <OverlayMask show={recordPanelIsOpen}/>
          </ConversationBox>
        </Swipeable>
      </Container>
    )
  }
}

Conversation.defaultProps = {
  info: [],
  illustration: {},
  meta: {},
  array: [],
  selectedRoleIndex: "0"
}

Conversation.propTypes = {
  info: PropTypes.array,
  illustration: PropTypes.object,
  meta: PropTypes.object,
  content: PropTypes.array,
  onStorySelect: PropTypes.func.isRequired,
  selectedRoleIndex: PropTypes.string,
}

export default Conversation
