import React from 'react'
import styled from 'styled-components'
import theme from '../theme'

const Container = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 3rem;
  text-align: center;
`

const Tag = styled.li`
  display: inline-block;
  margin: 3px 6px 9px 6px;
  text-decoration: none;
  border-radius: 25px;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 4px 18px;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  font-size: ${theme.typography.font.size.small};

  &:hover {
    background-color: ${theme.colors.primary};
    color: #fff;
  }
`

export default class Tags extends React.PureComponent {
  render() {
    const { tags } = this.props

    const tagsJSX = tags.map((tag) => {
      return (
        <a key={tag.id} href={`https://www.twreporter.org/tag/${tag.id}`} target="_blank">
          <Tag>
            {tag.name}
          </Tag>
        </a>
      )
    })

    return (
      <Container>
        {tagsJSX}
      </Container>
    )
  }
}
