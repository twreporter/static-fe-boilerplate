import { fontSize, fontWeight } from '../../constants/style-variables'
import screen from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import map from 'lodash/map'

const _ = {
  map,
}

const colors = {
  white: 'white',
}

const Container = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.white};
  margin-bottom: 36px;
`

const Title = styled.div`
  width: 100%;
  letter-spacing: 1.7px;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.colophonTitle.mobile};
  margin-bottom: 15px;
  ${screen.tabletAbove`
    font-size: ${fontSize.colophonTitle.tablet};
    margin-bottom: 20px;
  `}
`

const Item = styled.div`
  width: 100%;
  letter-spacing: 1.5px;
  font-size: ${fontSize.colophonContent.mobile};
  margin-bottom: .65em;
  font-weight: ${fontWeight.light};
  text-align: center;
  white-space: nowrap;

  :last-child {
    margin-bottom: 0;
  }
  ${screen.tabletAbove`
    font-size: ${fontSize.colophonContent.tablet};
  `}
`

function buildItem(text, index) {
  return (
    <Item key={`${index}`}>{text}</Item>
  )
}

function List(props) {
  const { title, items } = props
  return (
    <Container>
      <Title>{title}</Title>
      {_.map(items, buildItem)}
    </Container>
  )
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default List
