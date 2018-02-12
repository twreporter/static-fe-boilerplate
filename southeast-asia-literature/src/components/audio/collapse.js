import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const defaultTransitionDuration = 600 // ms

const Container = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  height: ${props => (props.show ? props.containerHeight : '0')};
  transition: height ${props => props.transitionDuration}ms ease-in-out;
`

class Collapse extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    transitionDuration: PropTypes.number,
  }
  static defaultProps = {
    children: null,
    show: false,
    transitionDuration: defaultTransitionDuration,
  }
  constructor(props) {
    super(props)
    this._content = null
    this.state = {
      containerHeight: 'auto',
    }
  }
  setContainerHeight = (content) => {
    const contentOffsetHeight = content ? `${content.offsetHeight + 50}px` : 'auto'
    this.setState({ containerHeight: contentOffsetHeight })
  }
  render() {
    const { children, show, transitionDuration } = this.props
    const { containerHeight } = this.state
    return (
      <Container
        containerHeight={containerHeight}
        show={show}
        transitionDuration={transitionDuration}
      >
        <div style={{ width: '100%', height: 'auto' }} ref={(ele) => { this.setContainerHeight(ele) }}>
          {children}
        </div>
      </Container>
    )
  }
}

export default Collapse
