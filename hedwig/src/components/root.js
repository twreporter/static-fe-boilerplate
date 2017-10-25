/* eslint no-unused-expressions: 0 */
import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Header from './header'
import article from '../data/article'
import Credits from './credits'
import Article from './article'
import section01 from '../data/section-01'
import section02 from '../data/section-02'
import section03 from '../data/section-03'
import SingleColumnPictureDesktop from './single-column-picture-desktop'
import SingleColumnPictureMobile from './single-column-picture-mobile'
import Interview from './interview'

injectGlobal`
  body, html {
    padding: 0;
    margin: 0;
  }
`

const {
  image,
  title,
  content,
  credits,
} = article

const Container = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  text-align: center;
`

export default class Root extends React.Component {
  render() {
    return (
      <Container>
        <Header image={image} title={title} />
        <Credits credits={credits} />
        <Article content={content} />
        <SingleColumnPictureDesktop {...section01} />
        <SingleColumnPictureMobile {...section01} />
        <Interview {...section01} />
        <SingleColumnPictureDesktop {...section02} />
        <SingleColumnPictureMobile {...section02} />
        <Interview {...section02} />
        <SingleColumnPictureDesktop {...section03} />
        <SingleColumnPictureMobile {...section03} />
        <Interview {...section03} />
      </Container>
    )
  }
}
