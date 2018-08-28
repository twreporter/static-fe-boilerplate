import { CSSTransition } from 'react-transition-group'
import { scripts, illustrations, meta } from '../data/conversation-scripts/scenes' 
import BaseComponents from './base'
import commonStyle from '../utils/common-style'
import Conversation from './conversation'
import imgSrc from '../data/img-src'
import PropTypes from 'prop-types'
import React from 'react'
import screen, { breakPoints } from '../utils/screen'
import styled from 'styled-components'

const Container = BaseComponents.MobileLargeContainer.extend`
  margin: -${commonStyle.headbar.height} auto 0 auto;
  padding-top: ${commonStyle.headbar.height};
`

const ConversationWrapper = styled.div `
  display: block;
  position: relative;
  overflow: hidden;
`

const RoleSelector = BaseComponents.SmallContainer.extend`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  ${screen.mobileBelow`
    flex-direction: column;
  `}
`

const StyledCSSTransition = styled.div`
  .conversation-wrapper-enter {
    transform: translateY(20%);
  }
  .conversation-wrapper-enter-active {
    transform: translateY(0%);
    transition: all 300ms ease-in;
  }
  .conversation-wrapper-exit {
    transform: translateY(0%);
  }
  .conversation-wrapper-exit-active {
    transform: translateY(20%);
    transition: all 300ms ease-out;
  }
`

const Role = styled.div`
  position: relative;
  cursor: pointer;
  background: #d8d8d8;
  ${screen.tabletOnly`
    border: solid 1.7px #262626;  
    `}
  ${screen.tabletAbove`
    width: calc(100% / ${props => props.total});
    margin: 0 13.5px;
    border: solid 2px #262626;
  `}
  ${screen.mobileBelow`
    display: flex;
    width: 100%;
    height: 130px;
    margin: 5px 0;
  `}
  ${screen.miniOnly`
    height: 120px;
  `}
`

const ProfileBg = styled.div`
  position: relative;
  ${screen.mobileBelow`
    background: #404040;
    height: 100%;
  `}
`

const Profile = styled.img`
  ${screen.tabletOnly`
    border-bottom: solid 1.7px #262626;  
  `}
  ${screen.tabletAbove`
    border-bottom: solid 2px #262626;
    width: 100%;
  `}
  ${screen.mobileBelow`
    border-right: solid 2px #262626;
    height: 100%;
  `}  
`

const MessageIcon = styled.img`
  position: absolute;
  bottom: 3px;
  right: 5px;
  width: 23px;
  height: 19px;
  ${screen.tabletAbove`
    width: 13%;
    height: auto;
    bottom: 5%;
    right: 6%; 
  `}
`

const Description = styled.div`
  padding: 24px 20px;
  p{
    color: #404040;
    margin: 0;
  }
  ${screen.mobileBelow`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`

class ConversationSelector extends React.Component {
  constructor(props){
    super(props)
    this.onStorySelectInCurrentConversation = this._onStorySelectInCurrentConversation.bind(this)
    this.state = {
      device: null
    }
    this.curScript = null
    this.initialWindowWidth = null
    this.getDevice = this._getDevice.bind(this)
    this.resizeHandler = this._resizeHandler.bind(this)
  }
  componentDidMount() {
    this.getDevice()
    window.addEventListener('resize', this.resizeHandler)
  }
  shouldComponentUpdate(nextProps) {
    const { selectedConversationId, id, selectedRoleIndex, content } = nextProps
    if (selectedConversationId === id && selectedRoleIndex) {
      this.curScript = content[selectedRoleIndex - 1].script
      return true
    }
    return false
  }
  componentWillUnmount() {
    this.curScript = null
    this.initialWindowWidth = null
    window.removeEventListener('resize', this.resizeHandler)
  }
  _getDevice() {
    const MEDIAQUERY = {
      tabletAbove: `only screen and (min-width: ${breakPoints.tablet.min})`,
      mobileBelow: `only screen and (max-width: ${breakPoints.mobile.max})`
    }
    if (!this.initialWindowWidth) {
      this.initialWindowWidth = window.innerWidth
    }
    if (window.matchMedia(MEDIAQUERY.tabletAbove).matches) {
      this.setState({ device: 'tabletAbove' })
    } else {
      this.setState({ device: 'mobileBelow' })
    }
  }
  _resizeHandler() {
    const newWindowWidth = window.innerWidth
    if (newWindowWidth !== this.initialWindowWidth) {
      this.getDevice()
      this.initialWindowWidth = newWindowWidth
    }
    return
  }
  _onStorySelectInCurrentConversation(roleIndex) {
    const { onStorySelect, id } = this.props
    onStorySelect(`${id}-${roleIndex + 1}`, false)
  }
  render() {
    const { content, id, onStorySelect } = this.props
    const roleNumber = content.length
    return (
      <Container>
        <RoleSelector>
          {
            content.map((role, roleIndex) => {
              return (
                <Role
                  key={`${id}-${roleIndex}`}
                  total={roleNumber}
                  onClick={onStorySelect.bind(null, `${id}-${roleIndex + 1}`)}
                >
                  <ProfileBg>
                    <picture>
                      <source media="(orientation: portrait)" srcSet={imgSrc[`${role.profile}-mobile`]} />
                      <source media="(max-width: 767px)" srcSet={imgSrc[`${role.profile}-mobile`]} />
                      <Profile
                        src={imgSrc[`${role.profile}-desktop`]}
                      />
                    </picture>
                    <MessageIcon src={imgSrc['message-icon']}/>
                  </ProfileBg>
                  <Description>
                    <p>{role.description}</p>
                  </Description>
                </Role>
              )
            })
          }
        </RoleSelector>
          <ConversationWrapper
            id={id}
          >
            <StyledCSSTransition>
              <CSSTransition
                in={this.curScript !== null}
                timeout={300}
                classNames="conversation-wrapper"
                unmountOnExit                              
              >
                <Conversation
                  info={scripts[this.curScript]}
                  illustration={illustrations[this.curScript]}
                  meta={meta[this.curScript]}
                  device={this.state.device}
                  onStorySelect={this.onStorySelectInCurrentConversation}
                  content={content}
                />
              </CSSTransition>
            </StyledCSSTransition>
          </ConversationWrapper>
      </Container>
    )
  }
}

ConversationSelector.propTypes = {
  content: PropTypes.array.isRequired,
}

export default ConversationSelector


