import { reviews } from '../../data/reviews'
import map from 'lodash/map'
import React, { PureComponent } from 'react'
import SectionTitle from './section-title'
import styled from 'styled-components'
import { fontWeight } from '../../constants/style'

const _ = {
  map,
}

const styles = {
  imageBlockWidth: '129px',
}

const Container = styled.div`
`

const Content = styled.div`
  width: 375px;
  margin: 0 auto;
  padding: 30px 16px 20px 16px;
`

const Review = styled.div`
  background-color: #8acbd7;
  border: solid 3px #ffffff;
  margin-bottom: 20px;
  width: 95%;
`

const Author = styled.div`
  display: flex;
  min-height: 130px;
  border-bottom: solid 3px #ffffff;
  align-items: stretch;
`

const ImageBlock = styled.div`
  width: ${styles.imageBlockWidth};
  flex: 0 0 ${styles.imageBlockWidth};
  padding: 21px 19px;
`

const InfoBlock = styled.div`
  flex: 1 1 auto;
  padding: 26px 20px 26px 0;
`

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 6px;
`

const Name = styled.div`
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  color: #ffffff;
  margin-bottom: 3px;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: ${fontWeight.regular};
  color: #ffffff;
  white-space: pre-wrap;
`

const Comment = styled.div`
  font-size: 18px;
  font-weight: ${fontWeight.regular};
  line-height: 1.67;
  text-align: justify;
  color: #ffffff;
  padding: 15px;
  >p {
    margin: 0 0 .5em 0;
  }
`

export default class Reviews extends PureComponent {
  _buildReview = (review, index) => {
    const { name, title, image, content } = review
    return (
      <Review key={`review-${index}`}>
        <Author>
          <ImageBlock>
            <Avatar src={image} />
          </ImageBlock>
          <InfoBlock>
            <Name>{name}</Name>
            <Title>{title}</Title>
          </InfoBlock>
        </Author>
        <Comment>
          {_.map(content, (p, i) => (p ? <p key={i}>{p}</p> : null))}
        </Comment>
      </Review>
    )
  }
  render() {
    return (
      <Container>
        <Content>
          <SectionTitle>球評解析</SectionTitle>
          {_.map(reviews, this._buildReview)}
        </Content>
      </Container>
    )
  }
}
