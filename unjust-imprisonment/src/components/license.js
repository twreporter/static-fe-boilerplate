import React from 'react'
import styled from 'styled-components'
import theme from '../theme'

const Text = styled.p`
  color: ${theme.colors.gray50};
  font-size: ${theme.typography.font.size.medium};
  line-height: ${theme.typography.lineHeight.small};
`

const Container = styled.div`
  text-align: center;
  padding: 15px 24px 15px 24px;
`

export default class License extends React.PureComponent {
  render() {
    return (
      <Container>
        <Text>本文依 CC 創用姓名標示-非商業性-禁止改作3.0台灣授權條款釋出</Text>
      </Container>
    )
  }
}
