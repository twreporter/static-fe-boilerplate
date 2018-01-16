import mq from '../../utils/media-query'
import React from 'react'
import styled from 'styled-components'
import WhiteLogo from '../../../svg/white-logo.svg'
import WhiteSearchIcon from '../../../svg/icon-search.svg'

const Container = styled.div`
  height: 109px;
  width: 100%;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
`

const Logo = styled.a`
  display: block;
  text-decoration: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  ${mq.tabletAbove`
    width: 80px;
  `}
  >svg {
    width: 100%;
  }
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

class Header extends React.Component {
  render() {
    return (
      <Container innerRef={this.props.getEle}>
        <Logo href="https://www.twreporter.org"><WhiteLogo /></Logo>
        <Search href="https://www.twreporter.org/search"><WhiteSearchIcon /></Search>
      </Container>
    )
  }
}

export default Header
