import { checkIfCINextToIInData } from '../../utils/is-near-current'
import * as styles from '../../constants/style-variables'
import introData from '../../data/section-intro'
import map from 'lodash.map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import TextBox from './text'

const _ = {
  map,
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${styles.zIndex.introContainer};
  overflow: hidden;
`

class TextSwitcher extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number,
  }
  static defaultProps = {
    currentIndex: 0,
  }
  constructor(props) {
    super(props)
    this._buildTextBox = this._buildTextBox.bind(this)
  }
  shouldComponentUpdate(nextProps) {
    const { currentIndex } = nextProps
    return introData.some(checkIfCINextToIInData(currentIndex))
  }
  _buildTextBox(data) {
    const {
      description,
      index,
      title,
    } = data
    return (
      <TextBox
        key={`${index}-timeline-text`}
        currentIndex={this.props.currentIndex}
        description={description}
        index={index}
        title={title}
      />
    )
  }
  render() {
    return (
      <Container>
        {_.map(introData, this._buildTextBox)}
      </Container>
    )
  }
}

export default TextSwitcher
