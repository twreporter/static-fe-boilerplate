import { checkIfCINextToIInData } from '../../utils/is-near-current'
import * as styles from '../../constants/style-variables'
import map from 'lodash.map'
import PropTypes from 'prop-types'
import React from 'react'
import SatelliteBg from './satellite-bg'
import satelliteBgsData from '../../data/satellite-bgs'
import styled from 'styled-components'

const _ = {
  map,
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${styles.maxWidth};
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${styles.zIndex.satelliteContainer};
  overflow: hidden;
`

class SatelliteSwitcher extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number,
  }
  static defaultProps = {
    currentIndex: 0,
  }
  constructor(props) {
    super(props)
    this._buildSatelliteBg = this._buildSatelliteBg.bind(this)
  }
  shouldComponentUpdate(nextProps) {
    const { currentIndex } = nextProps
    return satelliteBgsData.some(checkIfCINextToIInData(currentIndex))
  }
  _buildSatelliteBg(data) {
    const {
      animation,
      image,
      index,
    } = data
    return (
      <SatelliteBg
        key={`${index}-satellite-bg`}
        currentIndex={this.props.currentIndex}
        animation={animation}
        image={image}
        index={index}
      />
    )
  }
  render() {
    return (
      <Container>
        {_.map(satelliteBgsData, this._buildSatelliteBg)}
      </Container>
    )
  }
}

export default SatelliteSwitcher
