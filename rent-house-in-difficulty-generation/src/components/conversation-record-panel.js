import commonStyle from '../utils/common-style'
import highlight from '../utils/get-highlight-texts'
import imgSrc from '../data/img-src'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react' // eslint-disable-next-line
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const HEADERHEIGHT = 45
const BORDERWIDTH = 3

const Wrapper = styled.div`
  position: absolute;
  top: ${commonStyle.headbar.height};
  right: 0;
  width: 100%;
  height: calc((100% - ${commonStyle.headbar.height}));
  z-index: 2;
  transform: ${props => props.open ? "translateX(0)" : "translateX(100%)"};
  transition: all .3s ease-in-out;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  overflow: hidden;
  background: #d8d8d8;
  z-index: 3;
  border: solid ${BORDERWIDTH}px #000000;
  ${screen.tabletAbove`
    width: 67%;
  `}
`

const Header = styled.div`
  width: 100%;
  height: ${HEADERHEIGHT}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid ${BORDERWIDTH}px #000000;
`

const Record = styled.div`
  width: 120px;
  height: ${HEADERHEIGHT}px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 102px;
  background-position: center center;
`

const CloseButton = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
`

const Records = styled.div`
  width: 100%;
  height: calc((100% - ${HEADERHEIGHT}px));
  overflow: scroll;
  padding: 10px;
  ${screen.tabletAbove`
    padding-right: 20px;
  `}
`

const BaseBlock = styled.div`
  display: block;
  width: 82%;
  padding: 15px;
  margin-bottom: 15px;
  p{
    font-size: ${theme.typography.font.size.medium};
    font-weight: ${theme.typography.font.weight.medium};
    line-height: ${theme.typography.lineHeight.regular};
    text-align: justify;
    margin: 0;
    >span{
      font-weight: ${theme.typography.font.weight.semiBold};
    }
  }
`

const TheySayBlock = BaseBlock.extend`
  float: left;
  background: #ffffff;
  color: #404040;
  border-radius: 12px;
  ${screen.desktopAbove`
    width: 82%;
  `}
  ${screen.tabletOnly`
    width: 84.6%;
  `}
`

const ISayBlock = BaseBlock.extend`
  float: right;
  background: #404040;
  color: #d8d8d8;
  border-radius: 43.5px;
  ${screen.desktopAbove`
    width: 61.3%;
  `}
  ${screen.tabletOnly`
    width: 75%;
  `}
  ${screen.mobileBelow`
    border-radius: 12px;  
  `}
`

export default class RecordPanel extends PureComponent {
  constructor(props) {
    super(props)
    this.startY = 0
    this.disableBodyScrollAndApplyInnerScroll = this._disableBodyScrollAndApplyInnerScroll.bind(this)
    this.enableBodyScrollAndRemoveInnerScroll = this._enableBodyScrollAndRemoveInnerScroll.bind(this)
    this.handlePreventTouchstartWhenPanning = this._handlePreventTouchstartWhenPanning.bind(this)
    this.handlePreventTouchendWhenPanning = this._handlePreventTouchendWhenPanning.bind(this)
    this.handlePreventTouchmoveWhenPanning = this._handlePreventTouchmoveWhenPanning.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const nextIsOpenProp = nextProps.isOpen
    if (nextIsOpenProp) {
      this.disableBodyScrollAndApplyInnerScroll()
      
      // Return to the very top after user has closed the panel
      this.panel.scrollTop = 0
    } else {
      this.enableBodyScrollAndRemoveInnerScroll()
    }
  }

  componentWillUnmount() {
    this.enableBodyScrollAndRemoveInnerScroll()
    this.startY = null
  }

  _enableBodyScrollAndRemoveInnerScroll() {
    this.panel.removeEventListener('touchstart', this.handlePreventTouchstartWhenPanning, {
      passive: false
    })
    this.panel.removeEventListener('touchend', this.handlePreventTouchendWhenPanning, {
      passive: false
    })
    this.panel.removeEventListener('touchmove', this.handlePreventTouchmoveWhenPanning, {
      passive: false
    })
  }

  _disableBodyScrollAndApplyInnerScroll() {
    this.panel.addEventListener('touchstart', this.handlePreventTouchstartWhenPanning, {
      passive: false
    })
    this.panel.addEventListener('touchend', this.handlePreventTouchendWhenPanning, {
      passive: false
    })
    this.panel.addEventListener('touchmove', this.handlePreventTouchmoveWhenPanning, {
      passive: false
    })
    
  }

  _handlePreventTouchstartWhenPanning(event) {
    this.startY = event.touches[0].screenY
  }

  _handlePreventTouchendWhenPanning(event) {
    this.panel.scrollTop = this.panel.scrollTop + (this.startY - event.changedTouches[0].screenY)
  }

  _handlePreventTouchmoveWhenPanning = (event) => {
    event.preventDefault()
    this.panel.scrollTop = this.panel.scrollTop + (this.startY - event.changedTouches[0].screenY)
    this.startY = event.changedTouches[0].screenY
  }

  render() {
    const { records, isOpen, closePanel } = this.props
    return (
      <Wrapper
        open={isOpen}
      >
        <Overlay 
          onClick={closePanel}
        />
        <Container>
          <Header>
            <Record 
              src={imgSrc['icon_record']}
            />
            <CloseButton
              src={imgSrc['icon_close']}
              onClick={closePanel}
            />
          </Header>
          <Records
            innerRef={(node) => { this.panel = node }}
          >
            {
              records.map((record, recordIndex) => {
                let Block
                if (record.type === 'selection' || record.type === 'description') {
                  Block = TheySayBlock
                } else {
                  Block = ISayBlock
                }
                return (
                  <Block
                    key={`conversationRecords-${recordIndex}`}
                  >
                    <p>{highlight(record.content)}</p>
                  </Block>
                )
              })
            }
          </Records>
        </Container>
      </Wrapper>
    )
  }
}

RecordPanel.propTypes = {
  records: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closePanel: PropTypes.func.isRequired
}