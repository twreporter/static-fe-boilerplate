import screen from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import RelatedItem from './related-item'
import styled from 'styled-components'

import map from 'lodash/map'

const marginTop = {
  tablet: '30px',
  desktop: '30px',
  hd: '60px',
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  ${screen.mobileOnly`
    display: none;
  `}
  ${screen.tabletAbove`
    margin-top: ${marginTop.tablet};
  `}
  ${screen.desktopAbove`
    margin-top: ${marginTop.desktop};
  `}
  ${screen.hdAbove`
    margin-top: ${marginTop.hd};
    justify-content: space-between;
  `}
`

function dataToElement(item, index) {
  return <RelatedItem key={index} {...item} />
}

function Relateds(props) {
  return (
    <Container>
      {map(props.relateds, dataToElement)}
    </Container>
  )
}

Relateds.propTypes = {
  relateds: PropTypes.array.isRequired,
}

export default Relateds
