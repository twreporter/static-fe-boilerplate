/* eslint react/no-array-index-key:0 */
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import theme from '../utils/theme'

const Container = BaseComponents.SmallContainer.extend`
  white-space: pre-wrap;
  margin: 30px auto;
  color: ${theme.colors.text.blockquote};
  border-left: 1px solid ${theme.colors.text.blockquote};
  font-style: italic;
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.large};
`

const Quote = styled.p`
  text-align: justify;
  padding-left: 18px;
  font-size: ${theme.typography.font.size.medium};
`

const QuoteBy = styled.p`
  text-align: right;
  font-size: ${theme.typography.font.size.small};
`

class BlockQuote extends React.PureComponent {
  _renderQuotes(quotes) {
    return quotes.map((quote, index) => {
      return (
        <Quote
          key={`quote_${index}`}
        >
          {quote}
        </Quote>
      )
    })
  }
  render() {
    const { content } = this.props
    return (
      <Container>
        {this._renderQuotes(content.slice(0, content.length - 1))}
        {
          content[content.length - 1].length > 0 ?
            <QuoteBy>
              —— {content[content.length - 1]}
            </QuoteBy>
            : null
        }
      </Container>
    )
  }
}

BlockQuote.propTypes = {
  content: PropTypes.array.isRequired,
}

export default BlockQuote
