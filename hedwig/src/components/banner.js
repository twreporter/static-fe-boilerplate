import config from '../config.js'
import React from 'react'
import styled from 'styled-components'
import WhiteLogo from '../../static/white-logo.svg'
import WhiteSearchIcon from '../../static/white-search-icon.svg'

const HOST = config.host

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
  display: inline-block;
  text-decoration: none;
`


const svgColor = 'white'

const servicePostMessage = {
  svgColor,
}

const WidgetFrame = styled.iframe`
  width: 25px;
  height: 22px;
  border: none;
  overflow: hidden;
`

const RightService = styled.div`
  display: ${props => (props.onload ? 'inline' : 'none')};
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
`

const IconContainer = styled.div`
  display: inline-block;
  margin-right: 15px;
`

class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onload: false,
    }
  }

  componentDidMount() {
    const serviceElement = document.getElementById('serviceIcon')
    serviceElement.onload = () => {
      serviceElement.contentWindow.postMessage(JSON.stringify(servicePostMessage), `${HOST}`)
      this.setState({
        onload: true,
      })
    }
  }

  render() {
    const { onload } = this.state
    return (
      <Container>
        <Logo href="https://www.twreporter.org"><WhiteLogo /></Logo>
        <RightService
          onload={onload}
        >
          <IconContainer>
            <WidgetFrame
              id="serviceIcon"
              title="service-widget"
              src={`${HOST}/widgets-services`}
              scrolling="no"
            />
          </IconContainer>
          <Search href="https://www.twreporter.org/search">
            <WhiteSearchIcon />
          </Search>
        </RightService>
      </Container>
    )
  }
}

export default Banner
