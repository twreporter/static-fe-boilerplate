import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import theme from '../utils/theme'

const StyledHeaderTwo = BaseComponents.SmallContainer.extend`
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
  font-size: ${theme.typography.font.size.xlarge};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.large};
  text-align: ${props => props.textAlign};
`.withComponent('h2')

class HeaderTwo extends React.PureComponent {
  render() {
    const { content } = this.props
    return (
      <StyledHeaderTwo
        textAlign={content[1] || "start"}
      >
        {content[0]}
      </StyledHeaderTwo>
    )
  }
}

HeaderTwo.propTypes = {
  content: PropTypes.array.isRequired,
}

export default HeaderTwo
