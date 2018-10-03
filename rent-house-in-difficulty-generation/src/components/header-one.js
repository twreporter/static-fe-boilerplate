import BaseComponents from './base'
import commonStyle from '../utils/common-style'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import theme from '../utils/theme'

const StyledHeaderOne = BaseComponents.SmallContainer.extend`
  margin-right: auto;
  margin-left: auto;
  margin-top: 0;
  font-size: ${theme.typography.font.size.headerOne};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.large};
`.withComponent('h1')

const StyledSubtitle = BaseComponents.SmallContainer.extend`
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 12.5px;
  font-size: ${theme.typography.font.size.small};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.small};
  color: ${theme.colors.text.headbar};
`.withComponent('p')

const Container = styled.div`
  padding-top: calc((${commonStyle.headbar.height}));
`

class HeaderOne extends React.PureComponent {
  render() {
    const { content, id } = this.props
    return (
      <Container
        id={id}
      >
        {
          content[1].length > 0 ?
          <StyledSubtitle>
            {content[1]} >
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
