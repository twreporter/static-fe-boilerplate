import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../screen'
import styled from 'styled-components'

const StyledHeaderOne = BaseComponents.SmallContainer.extend`
  margin-top: 60px;
  margin-right: auto;
  margin-left: auto;
`.withComponent('h1')

const MobileContainer = styled.div`
  display: none;
  ${screen.mobileOnly`
    display: block;
  `}
`

const NonMobileContainer = styled.div`
  display: block;
  ${screen.mobileOnly`
    display: none;
  `}
`

class HeaderOne extends React.PureComponent {
  render() {
    const { content } = this.props
    let headerJSX
    if (content[0]) {
      headerJSX = (
        <StyledHeaderOne>
          <NonMobileContainer>
            <img
              width="100%"
              src={content[0]}
              alt={content[2]}
            />
          </NonMobileContainer>
          <MobileContainer>
            <img
              width="100%"
              src={content[1]}
              alt={content[2]}
            />
          </MobileContainer>
          <p style={{ display: 'none' }}>{content[2]}</p>
        </StyledHeaderOne>
      )
    } else {
      headerJSX = (
        <StyledHeaderOne
          dangerouslySetInnerHTML={{ __html: content[2] }}
        />
      )
    }
    return (
      <header>
        {headerJSX}
      </header>
    )
  }
}

HeaderOne.propTypes = {
  content: PropTypes.array.isRequired,
}

export default HeaderOne
