import { checkIfCINextToIInData } from '../../utils/is-near-current'
import BlackCard from './black-card'
import introData from '../../data/section-intro'
import map from 'lodash.map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
`

class BlackCardSwitcher extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number,
  }
  static defaultProps = {
    currentIndex: 0,
  }
  constructor(props) {
    super(props)
    this._buildBlackCard = this._buildBlackCard.bind(this)
  }
  shouldComponentUpdate(nextProps) {
    const { currentIndex } = nextProps
    return introData.some(checkIfCINextToIInData(currentIndex))
  }
  _buildBlackCard(data) {
    const {
      index,
    } = data
    return (
      <BlackCard
        key={`${index}-black-card`}
        currentIndex={this.props.currentIndex}
        index={index}
      />
    )
  }
  render() {
    return (
      <Container>
        {_.map(introData, this._buildBlackCard)}
      </Container>
    )
  }
}

export default BlackCardSwitcher
