import { colors, fontWeight } from '../constants/style-variables'
import { ContentContainer, ContainerWrapper } from './text-content-container'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = ContentContainer.extend`
  text-align: left;
  font-weight: ${fontWeight.regular};
  color: ${colors.textBlack};
  line-height: 1.94;
  text-align: left;
  padding-top: 2em; 
  padding-bottom: 2em;  
`

const Content = styled.div`
  font-size: 23px;
`

const Original = styled.div`
  font-size: 18px;
`

const From = styled.div`
  margin-top: .5em;
  font-size: 18px;
  text-align: right;
`

class Quote extends React.PureComponent {
  render() {
    const { quote } = this.props
    const {
      content,
      original,
      from,
    } = quote
    return (
      <ContainerWrapper>
        <Container>
          <Content>{content}</Content>
          <Original>{original}</Original>
          <From>{from}</From>
        </Container>
      </ContainerWrapper>
    )
  }
}

Quote.propTypes = {
  quote: PropTypes.object.isRequired,
}

export default Quote
