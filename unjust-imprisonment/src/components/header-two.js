import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import theme from '../theme'

const StyledHeaderTwo = BaseComponents.SmallContainer.extend`
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
  font-size: ${theme.typography.font.size.xlarge};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.large};
  color: ${theme.colors.text.headerTwo};
`.withComponent('h2')

class HeaderOne extends React.PureComponent {
  render() {
    const { content } = this.props
    return (
      <StyledHeaderTwo>
        {content[0]}
      </StyledHeaderTwo>
    )
  }
}

HeaderOne.propTypes = {
  content: PropTypes.array.isRequired,
}

export default HeaderOne
