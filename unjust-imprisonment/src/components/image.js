import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import theme from '../theme'

const Container = BaseComponents.SmallContainer.extend`
  margin-right: auto;
  margin-left: auto;
`

const Description = styled.div`
  width: 100%;
  font-size: ${theme.typography.font.size.medium};
  color: ${theme.colors.gray50};
  text-align: justify;
  margin-top: 15px;
`

class Image extends React.PureComponent {
  render() {
    const { content } = this.props
    return (
      <Container>
        <picture>
          <source media="(orientation: portrait)" srcSet={content[1]} />
          <source media="(max-width: 768px)" srcSet={content[1]} />
          <img
            width="100%"
            src={content[0]}
            alt={content[2]}
          />
        </picture>
        <Description>{content[3]}</Description>
      </Container>
    )
  }
}

Image.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Image
