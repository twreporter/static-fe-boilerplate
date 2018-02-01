/* eslint react/no-array-index-key: 0 */
import BaseComponents from './base'
import ImgWrapper from '@twreporter/react-components/lib/shared/components/img-wrapper'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../screen'
import styled from 'styled-components'
import theme from '../theme'

const TableCell = styled.div`
  display: table-cell;
  vertical-align: top;
`

const ImgContainer = styled.div`
  width: 80px;
  height: 80px;
  margin: 5px 15px;
`

const Desc = styled.p`
  color: ${theme.colors.text.related.body};
  font-size: ${theme.typography.font.size.small};
  line-height: ${theme.typography.lineHeight.medium};
  margin: 0;
  ${screen.mobileOnly`
    display: none;
  `}
`

const Title = styled.h3`
  color: ${theme.colors.text.related.header};
  font-size: ${theme.typography.font.size.large};
  line-height: ${theme.typography.lineHeight.small};
  margin: 0;
`

const PostContainer = styled.a`
  display: block;
  background-color: ${theme.colors.bg.related};
  margin-bottom: 16px;
  padding: 15px;
  text-decoration: none;
  &:hover {
    transform: translateY(-5px);
  }
  transition: transform .1s linear;
`

const Header = styled.div`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.font.size.small};
  font-weight: ${theme.typography.font.weight.bold};
  text-align: center;
  margin-bottom: 40px;
`

const HeaderText = styled.span`
  border: 2px solid;
  padding: 5px;
`

const Container = BaseComponents.SmallContainer.extend`
  margin: 30px auto 70px;
`


class Related extends React.PureComponent {
  _renderPosts(posts) {
    return posts.map((post, index) => {
      return (
        <PostContainer
          key={`related_posts_${index}`}
          href={post.url}
          target="_blank"
        >
          <TableCell>
            <ImgContainer>
              <ImgWrapper
                src={post.thumbnail}
                alt={post.alt}
              />
            </ImgContainer>
          </TableCell>
          <TableCell>
            <Title>{post.title}</Title>
            <Desc>{post.desc}</Desc>
          </TableCell>
        </PostContainer>
      )
    })
  }
  render() {
    const { posts } = this.props
    return (
      <Container>
        <Header>
          <HeaderText>延伸閱讀</HeaderText>
        </Header>
        {this._renderPosts(posts)}
      </Container>
    )
  }
}

Related.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default Related
