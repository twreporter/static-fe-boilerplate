import { checkIfCINextToIInData } from '../../utils/is-near-current'
import map from 'lodash.map'
import mapItemData from '../../data/map-item'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Item from './item'

const _ = {
  map,
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`

class ItemSwitcher extends React.Component {
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
    return mapItemData.some(checkIfCINextToIInData(currentIndex))
  }
  _buildTextBox(data) {
    const {
      image,
      index,
    } = data
    return (
      <Item
        key={`${index}-map-item`}
        currentIndex={this.props.currentIndex}
        image={image}
        index={index}
      />
    )
  }
  render() {
    return (
      <Container>
        {_.map(mapItemData, this._buildTextBox)}
      </Container>
    )
  }
}

export default ItemSwitcher
