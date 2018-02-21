/* eslint react/no-array-index-key:0 */
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import styled from 'styled-components'
import theme from '../theme'

const Container = BaseComponents.SmallContainer.extend`
  font-size: ${theme.typography.font.size.xlarge};
  font-weight: ${theme.typography.font.weight.medium};
  line-height: ${theme.typography.lineHeight.medium};
  margin-bottom: 80px;
  margin-left: auto;
  margin-right: auto;
  ::after {
    content: "";
    color: ${theme.colors.primary};
    width: 24px;
    margin: auto;
    left: 0;
    right: 0;
    border-top: 2px solid;
    position: absolute;
  }
`

class Introduction extends React.PureComponent {
  _renderBlocks(blocks) {
    return blocks.map((block, index) => {
      return (
        <p key={`intro_block_${index}`}>
          {block}
        </p>
      )
    })
  }

  render() {
    const { content } = this.props
    return (
      <Container>
        {this._renderBlocks(content)}
      </Container>
    )
  }
}

Introduction.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Introduction
