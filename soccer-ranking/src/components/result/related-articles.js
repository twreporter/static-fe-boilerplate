import { articles } from '../../data/related-articles'
import { fontWeight } from '../../constants/style'
import mq from '../../utils/media-query'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'
// lodash
import map from 'lodash/map'


const _ = {
  map,
}

const Container = styled.div`
  width: 100%;
  background-color: #58882d;
`

const Content = styled.div`
  max-width: 500px;
  width: 95%;
  min-width: 310px;
  margin: 0 auto;
  padding: 40px 0 50px 0;
  ${mq.desktopAbove`
    padding: 50px 0 45px 0;
  `}
`

const BlackTitle = SectionTitle.extend`
  color: #000;
  margin-bottom: 1em;
`

const Article = styled.a`
  display: block;

  margin: 0 auto 20px auto;
  text-decoration: none !important;
`

const ArticleTitle = styled.div`
  font-size: 16px;
  font-weight: ${fontWeight.regular};
  color: #000000;
  margin-bottom: 5px;
`

const ArticleImage = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center center;
  width: 100%;
  padding-top: 56%;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.3);
  border: solid 3px #000000;
`

export default class RelatedArticles extends PureComponent {
  _buildArticle = (article, index) => {
    const { title, link, image } = article
    return (
      <Article key={`article-${index}`} href={link} target="_blank">
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleImage image={image} />
      </Article>
    )
  }

  render() {
    return (
      <Container>
        <Content>
          <BlackTitle>延伸閱讀－世足 PK 國族</BlackTitle>
          {_.map(articles, this._buildArticle)}
        </Content>
      </Container>
    )
  }
}
