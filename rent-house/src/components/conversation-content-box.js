import {
  Dialogue,
  ButtonText,
  OptionButton,
  ResponseButton,
  DialogueBox,
  StartingPage,
  Startline,
  Explaination,
  MobileArrowIcon,
  DesktopArrowIcon,
  Instruction,
  PressKeyToContinue
} from './conversation-item-style'
import highlight from '../utils/get-highlight-texts'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

export const DIALOGUELENGTH = 2
export const BACKTOSTARTTXT = '再聽一次租客的故事'
export const TUTORIAL = '故事中會出現選項讓你跟租客對話，點擊按鈕選擇你想聽的內容。'
export const INSTRUCTION = '請選擇你想問他的問題'
export const PRESSKEYTXT = '按空白鍵繼續'
export const TALKTOOTHERS = '和其他人聊聊吧'

const CONTENTTYPE = {
  selection: 'selection',
  description: 'description'
}

const mediumContainerWidth = {
  tablet: layout.tablet.width.medium,
  desktop: layout.desktop.width.medium,
  hd: layout.hd.width.medium
}

// TODO: split all the mockup out to be an independent file
export const mockup = {
  desktop: {
    width: 833,
    height: 160
  },
  mobile: {
    width: 375,
    height: 240
  }
}

const Container = styled.div `
  width: 100%;
  display: ${props => props.hasNext ? "block" : "flex"};
  height: ${props => props.hasNext ? "auto" : "100%"};
  flex-direction: column;
  justify-content: center;
  align-items: center;   
  user-select: none;
  ${screen.hdAbove`
    height: ${props => props.hasNext ? `calc(${mediumContainerWidth.hd}px * (${mockup.desktop.height} / ${mockup.desktop.width}))` : '100%'};
  `}
  ${screen.desktopOnly`
    height: ${props => props.hasNext ? `calc(${mediumContainerWidth.desktop}px * (${mockup.desktop.height} / ${mockup.desktop.width}))` : '100%'};
  `}
  ${screen.desktopAbove`
    padding: ${props => props.hasNext ? '12.5px 30px' : '12.5px 85px'};  
  `}
  ${screen.tabletOnly`
    height: ${props => props.hasNext ? `calc(${mediumContainerWidth.tablet}px * (${mockup.desktop.height} / ${mockup.desktop.width}) + 80px)` : '100%'};
    padding: ${props => props.hasNext ? '12.5px 30px' : '12.5px 58px'};
  `}
  ${screen.mobileBelow`
    padding: ${props => props.hasNext ? '19px 12px 12px 12px' : '24px'};
    `}
  ${screen.mobileOnly`
    height: ${props => props.hasNext ? `calc(100vw * (${mockup.mobile.height} / ${mockup.mobile.width}))` : "100%"};
  `}
  ${screen.miniOnly`
    min-height: ${props => props.hasNext ? `calc(100vw * (${mockup.mobile.height} / ${mockup.mobile.width}))` : "auto"};
    height: ${props => props.hasNext ? 'auto' : '100%'};
  `}
`

const ChooseAvatar = styled.div `
  display: ${props => props.show ? 'block' : 'none'};
  text-align: left;
`

const MessageIcon = styled.img `
  width: 22px;
  vertical-align: middle;
`

const ChoosingText = styled.p `
  font-weight: ${theme.typography.font.weight.bold};
  line-height: 1.67;
  letter-spacing: 0.1px;
  text-align: left;
  color: #d8d8d8;
  >span{
    margin-right: 5px;
  }
`

const Avatars = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Avatar = styled.div `
  position: relative;
  cursor: pointer;
  img{
    width: 100%;
  }
  ${screen.tabletAbove`
    width: 97px;
    margin-right: 20px;
  `}
  ${screen.mobileBelow`
    margin-right: 11px;
    width: calc(98 / ${mockup.mobile.width - (24 * 2)} * 100%);
  `}
  ${screen.miniOnly`
    margin-right: 9px;
  `}
`

const AvatarBorder = styled.div `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:hover{
    border: solid 6px #262626;
  }
`

class ContentBox extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null
    }
    this.renderCurContentBox = this._renderCurContentBox.bind(this)
    this.renderSingleCurItem = this._renderSingleCurItem.bind(this)
    this.getPaginated = this._getPaginated.bind(this)
    this.handleKeyDown = this._handleKeyDown.bind(this)
    this.handleMouseLeave = this._handleMouseLeave.bind(this)
    this.handleMouseEnter = this._handleMouseEnter.bind(this)
    this.selectDialogue = this._selectDialogue.bind(this)
  }
  componentWillReceiveProps(newProps) {
    if (newProps.currentNode !== this.props.currentNode) {
      this.setState({
        selectedOption: null
      })
    }
    return
  }  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  _selectDialogue(roleIndex) {
    const { selectedRoleIndex, onStorySelect, handleForwardClick } = this.props
    if (roleIndex === Number(selectedRoleIndex) - 1) {
      handleForwardClick('return')
    } else {
      onStorySelect(roleIndex)
    }
  }

  _handleKeyDown(e) {
    const {
      currentNode,
      startChatting,
      hasNext,
      dialoguePage,
      flipDialoguePage,
      handleForwardClick
    } = this.props

    const currentType = currentNode[0].type

    if (startChatting) {
      if (e.which === 13) {
        // press enter key
  
        // continue logic
        if (hasNext) {
          if (dialoguePage === DIALOGUELENGTH - 1) {
            // forward
            if (currentType === CONTENTTYPE.description) {
              // select the first (and the only one) option
              handleForwardClick('next', 1)
            } else if (currentType === CONTENTTYPE.selection && this.state.selectedOption) {
              handleForwardClick('next', this.state.selectedOption)
            }
            return
          } else {
            // flip page
            flipDialoguePage('next')
          }
        }
        return
  
      } else if (e.which === 37 || e.which === 39) {
        // press left and right arrow

        // selection logic
        if (hasNext && currentType === CONTENTTYPE.selection) {
          if (e.which === 37) {
            // press left arrow button
            this.setState({
              selectedOption: 1
            })
          } else {
            // press right arrow button
            this.setState({
              selectedOption: 2
            })
          }
        }
        return

      } else if (e.which === 32 && e.target == document.body) {
        // press space key 
        
        // prevent scrolling the page
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }

        // continue logic
        if (hasNext) {
          if (dialoguePage === DIALOGUELENGTH - 1) {
            // forward
            if (currentType === CONTENTTYPE.description) {
              // Just select the first (and the only one) option
              handleForwardClick('next', 1)
            } else if (currentType === CONTENTTYPE.selection && this.state.selectedOption) {
              handleForwardClick('next', this.state.selectedOption)
            }
            return
          } else {
            // flip page
            flipDialoguePage('next')
          }
        }
        return
      }
    }
    return
  }

  // Render items of current layer in content box
  _renderCurContentBox(cur, hasNext) {
    // console.log(cur)
    return cur.map((item, move) => {
        return this.renderSingleCurItem(item, move, hasNext)
    })
  }

  // Render single JSON in the current layer
  // There are four possible types: option, response, selection, description
  // And only content in selection, description should be paginated
  _renderSingleCurItem(displayItem, index, hasNext) {
    const {
      dialoguePage,
      handleForwardClick,
      startChatting,
      firstChat,
      closeStartingPage,
      flipDialoguePage,
      content
    } = this.props
    switch (displayItem.type) {
      case 'option':
        return (
          dialoguePage === DIALOGUELENGTH - 1 ?
          <OptionButton 
            key={'conversationOptionbtn' + index} 
            onClick={() => handleForwardClick('next', index)}
            isSelectedByKey={this.state.selectedOption===index}
            onMouseEnter={(e) => this.handleMouseEnter(e, index)}
            onMouseLeave={this.handleMouseLeave}
          >
            <ButtonText>{displayItem.content}</ButtonText>
          </OptionButton>
          : null
        )
      case 'response':
        const direct_next_response = (
          <ResponseButton 
            key={'conversationNextbtn' + index}
            onClick={() => handleForwardClick('next', index)}>
            <ButtonText>{displayItem.content}</ButtonText>
          </ResponseButton>
        )

        return (
          // Only render next button on last dialogue page       
          dialoguePage === DIALOGUELENGTH - 1 && hasNext?
          direct_next_response
          : null
        )
      default:
        const paginatedContent = hasNext ? this.getPaginated(displayItem.content) : [displayItem.content]
        const OverlayPage = (
          <StartingPage>
            <ResponseButton 
              key={'conversationNextbtn-in-startingPage' + index}
              onClick={closeStartingPage}>
              <ButtonText>{firstChat}</ButtonText>
            </ResponseButton>
            <Explaination>
              <MobileArrowIcon src={imgSrc['icon_arrow_mobile']} />
              <p>{TUTORIAL}</p>
              <DesktopArrowIcon src={imgSrc['icon_arrow_desktop']} />
            </Explaination>
          </StartingPage>
        )
        const AvatarSelector = (
          <ChooseAvatar
            show={!hasNext}
          >
            <ChoosingText>
              <span><MessageIcon src={imgSrc['message-icon']} /></span>
              {TALKTOOTHERS}
            </ChoosingText>
            <Avatars>
            {
              content.map((role, roleIndex) => {
                return (
                  <Avatar
                    key={'avatar-' + roleIndex}
                    totalNum={content.length}
                    onClick={this.selectDialogue.bind(null, roleIndex)}
                    >
                    <img src={imgSrc[`${role.profile}-mobile`]} />
                    <AvatarBorder />
                  </Avatar>

                )
              })
            }
            </Avatars>
          </ChooseAvatar>
        )
        return (
          <DialogueBox 
            key={'description-selection' + index}
            hasNext={hasNext}
            emptyPage={paginatedContent[dialoguePage].length==0}
          >
            {
              startChatting ?
              <React.Fragment>
                <Startline show={!hasNext} />
                {
                  displayItem.type === 'selection' ?
                  <Instruction
                    show={hasNext && dialoguePage==DIALOGUELENGTH - 1}
                  >
                    {INSTRUCTION}
                  </Instruction> 
                  : null
                }
                <Dialogue 
                  hasNext={hasNext}
                  emptyPage={paginatedContent[dialoguePage].length==0}
                  onClick={hasNext ? () => flipDialoguePage('next') : () => {}}
                >
                  <p>{highlight(paginatedContent[dialoguePage])}</p>
                </Dialogue>
                <PressKeyToContinue
                  show={dialoguePage==0 && hasNext}
                  onClick={() => flipDialoguePage('next')}
                >
                  <p>
                    {PRESSKEYTXT}
                    <span>
                      <img src={imgSrc['fast-forward-icon']}/>
                    </span>
                  </p>
                </PressKeyToContinue>
                {AvatarSelector}
              </React.Fragment>
              : OverlayPage
            }
          </DialogueBox>
        )
    }
  }

  _getPaginated(content) {
    let paginatedContent = []
    // Push empty string to make an empty last page for buttons
    paginatedContent = [ content, "" ]
    return paginatedContent
  }

  _handleMouseEnter(e, optionIndex) {
    e.preventDefault()
    this.setState({
      selectedOption: optionIndex
    })
  }

  _handleMouseLeave(e) {
    e.preventDefault()
    this.setState({
      selectedOption: null
    })
  }

  render() {
    const { hasNext, currentNode } = this.props
    return (
      <Container
        hasNext={hasNext}
      >
        {this.renderCurContentBox(currentNode, hasNext)}
      </Container>
    )
  }
}

ContentBox.defaultProps = {
  startChatting: false,
  firstChat: '',
  content: [],
  selectedRoleIndex: '0'
}

ContentBox.propTypes = {
  hasNext: PropTypes.bool.isRequired,
  currentNode: PropTypes.array.isRequired,
  dialoguePage: PropTypes.number.isRequired,
  handleForwardClick: PropTypes.func.isRequired,
  closeStartingPage: PropTypes.func.isRequired,
  startChatting: PropTypes.bool,
  firstChat: PropTypes.string,
  content: PropTypes.array,
  onStorySelect: PropTypes.func.isRequired,
  selectedRoleIndex: PropTypes.string
}

export default ContentBox
