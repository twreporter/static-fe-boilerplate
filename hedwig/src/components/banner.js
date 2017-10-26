import React from 'react'
import styled from 'styled-components'
import WhiteLogo from '../../static/white-logo.svg'
import WhiteSearchIcon from '../../static/white-search-icon.svg'

const Container = styled.div`
  height: 109px;
  width: 100%;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
`

const Logo = styled.a`
  display: block;
  text-decoration: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Search = styled.a`
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
