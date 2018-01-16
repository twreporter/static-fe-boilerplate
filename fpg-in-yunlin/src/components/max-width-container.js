import * as styles from '../constants/style-variables'
import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

const Div = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${styles.maxWidth};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${styles.zIndex.timelineTextContainer};
  overflow: hidden;
`

class Container extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    currentIndex: PropTypes.number,
  }
  static defaultProps = {
    currentIndex: 0,
    children: null,
  }
  _addPropsToChildren = (child) => {
    const { currentIndex } = this.props
    return React.cloneElement(child, {
      currentIndex,
    })
  }
  render() {
    return (
      <Div>
        {React.Children.map(this.props.children, this._addPropsToChildren)}
      </Div>
    )
  }
}

export default Container
