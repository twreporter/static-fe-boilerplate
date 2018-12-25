import BaseComponents from './base'
import commonStyle from '../utils/common-style'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import theme from '../utils/theme'

const StyledHeaderOne = BaseComponents.SmallContainer.extend`
  margin: 0 auto 25px auto;
  font-size: ${theme.typography.font.size.headerOne};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.mini};
  color: ${theme.colors.text.headerOne};
`.withComponent('h1')

const StyledSubtitle = BaseComponents.SmallContainer.extend`
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 12.5px;
  font-size: ${theme.typography.font.size.small};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.small};
  color: ${theme.colors.primary};
  display: block;
`.withComponent('a')

const Container = styled.div`
  padding-top: ${commonStyle.headbar.height};
`

class HeaderOne extends React.PureComponent {
  render() {
    const { content, id } = this.props
    return (
      <Container
        id={id}
      >
        {
          content[1] && content[1].length > 0 ?
          <StyledSubtitle 
            href='https://www.twreporter.org/topics/slave-fishermen'
            target='_blank'
          >
            {content[1]} 
          </StyledSubtitle>
          : null
        }
        <StyledHeaderOne>
          {content[0]}
        </StyledHeaderOne>
      </Container>
    )
  }
}

HeaderOne.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
}

export default HeaderOne
