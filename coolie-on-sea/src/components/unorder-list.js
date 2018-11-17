/* eslint react/no-array-index-key:0 */
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import styled from 'styled-components'
import theme from '../utils/theme'

const StyledContainer = BaseComponents.SmallContainer.extend`
  margin: 30px auto;
  color: ${theme.colors.text.paragraph};
`

const StyledParagraph = styled.p`
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${theme.typography.font.weight.medium};
  color: ${theme.colors.text.paragraph};
  line-height: ${theme.typography.lineHeight.larger};
  letter-spacing: .4px;
  white-space: pre-wrap;
  text-align: justify;
`

class UnorderList extends React.PureComponent {
  render() {
    const { content } = this.props
    return (
      <StyledContainer>
        <ul>
          {
            content.map((ele, index) => {
              return (
                <li key={'list-' + index}>
                  <StyledParagraph>
                    {ele}
                  </StyledParagraph>
                </li>
              )
            })
          }
        </ul>
      </StyledContainer>
    )
  }
}

export default UnorderList

UnorderList.propTypes = {
  content: PropTypes.array.isRequired,
}


