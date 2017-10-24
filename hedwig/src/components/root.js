import React from 'react'
import styled from 'styled-components'
import testImage from '../../static/logo.png'

const Container = styled.div`
  background-color: grey;
    width: 100%;
      text-align: center;
      `

export default class Root extends React.Component {
  render() {
    return (
      <Container>
        <img src={testImage} alt="presentation" />
        this is a root component
      </Container>
    )
  }
}
