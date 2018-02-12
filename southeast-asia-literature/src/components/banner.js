import React from 'react'
import styled from 'styled-components'
import WhiteLogo from '../../svg/logo-white.svg'
import WhiteSearchIcon from '../../svg/search-white.svg'
import mq from '../utils/media-query'
import { zIndex } from '../constants/style-variables'

const Container = styled.div`
  height: 109px;
  ${mq.mobileOnly`
    height: 85px;
  `}
  width: 100%;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${zIndex.banner};
`

const Logo = styled.a`
  width: 120px;
  ${mq.mobileOnly`
    width: 83px;
  `}
  display: block;
  text-decoration: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Search = styled.a`
  width: 20px;
  display: block;
  text-decoration: none;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
`

class Banner extends React.Component {
  render() {
    return (
      <Container>
        <Logo href="https://www.twreporter.org"><WhiteLogo /></Logo>
        <Search href="https://www.twreporter.org/search"><WhiteSearchIcon /></Search>
      </Container>
    )
  }
}

export default Banner
