import { zIndex } from '../../constants/style-variables'
import anime from 'animejs'
import PropTypes from 'prop-types'
import React from 'react'
import ScrollIcon from '../../../svg/icon-scroll.svg'
import styled from 'styled-components'

const Wrapper = styled.div`
  cursor: pointer;
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: visibility 0s 300ms, opacity 300ms 300ms;
  z-index: ${zIndex.nextPageBtn};
  position: absolute;
  bottom: 4.6%;
  left: 50%;
  transform: translateX(-50%);
  height: 28px;
  width: 28px;
  >svg {
    width: 100%;
    height: 100%;
  }
`

const ScrollDownBtn = styled.div`
  width: 100%;
  height: 100%;
`

class NextPageBtn extends React.PureComponent {
  static propTypes = {
    currentIndex: PropTypes.number,
    goToNextIndex: PropTypes.func,
  }
  static defaultProps = {
    currentIndex: 0,
    goToNextIndex() {},
  }
  constructor(props) {
    super(props)
    this._btn = null
    this.state = {
      mounted: false,
    }
  }
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mounted: true,
    })
    this._fadeIn = anime({
      targets: this._btn,
      opacity: [0, 1],
      duration: 1000,
      delay: 2200,
      complete: () => {
        this._loop.restart()
        this._loop.play()
      },
    })
    this._loop = anime({
      targets: this._btn,
      translateY: [0, 20, 0],
      easing: 'easeInOutCubic',
      loop: true,
      duration: 1600,
      direction: 'alternate',
      delay: '2000',
      autoplay: false,
    })
  }
  componentDidUpdate() {
    if (this.props.currentIndex === 0) {
      this._fadeIn.restart()
      this._fadeIn.play()
    }
    if (this.props.currentIndex !== 0) {
      this._loop.pause()
    }
  }
  render() {
    const { currentIndex, goToNextIndex } = this.props
    const { mounted } = this.state
    const show = mounted && currentIndex === 0
    return (
      <Wrapper show={show}>
        <ScrollDownBtn innerRef={(ele) => { this._btn = ele }} onClick={goToNextIndex}>
          <ScrollIcon />
        </ScrollDownBtn>
      </Wrapper>
    )
  }
}

export default NextPageBtn
