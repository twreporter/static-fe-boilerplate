import ControlPanel from './control-panel'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'
import { zIndex } from '../../constants/style-variables'

const isEnter = (status) => {
  switch (status) {
    case 'entered':
    case 'entering':
      return true
    default:
      return false
  }
}

const isIn = (status) => {
  switch (status) {
    case 'entered':
    case 'exiting':
      return true
    default:
      return false
  }
}


const padding = {
  mobile: '10px 25px 5px 25px',
  tablet: '14px 106px 14px 106px',
  desktop: '15px 14px 11px 14px',
}

const Container = styled.div`
  padding: ${padding.mobile};
  ${mq.tabletOnly`
    padding: ${padding.tablet};
  `}
  ${mq.desktopAbove`
    padding: ${padding.desktop};
  `}
`

const Popup = styled.div`
  z-index: ${zIndex.popupControl};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  background: white;
  ${mq.tabletBelow`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    transform: ${props => (isIn(props.status) ? 'translateY(0)' : 'translateY(102%)')};
    transition: ${props => (isEnter(props.status) ? 'opacity 360ms ease, transform 360ms ease' : 'opacity 220ms ease, transform 220ms ease')};
  `}
  ${mq.desktopAbove`
    min-width: 380px;
    position: fixed;
    right: 0;
    bottom: 10px;
    transform: ${props => (isIn(props.status) ? 'translateX(0)' : 'translateX(102%)')};
    transition: ${props => (isEnter(props.status) ? 'opacity 360ms ease, transform 360ms ease' : 'opacity 220ms ease, transform 220ms ease')};
  `}
`

class PopupControl extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool,
  }
  static defaultProps = {
    show: false,
  }
  render() {
    const { show } = this.props
    return (
      <Transition
        in={show}
        timeout={{
          enter: 360,
          exit: 220,
        }}
      >
        {status => (
          <Popup status={status}>
            <Container>
              <ControlPanel
                {...this.props}
              />
            </Container>
          </Popup>)}
      </Transition>
    )
  }
}

export default PopupControl
