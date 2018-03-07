/* eslint react/no-array-index-key: 0 */
import PropTypes from 'prop-types'
import React from 'react'
import layout from '../layout'
import screen from '../utils/media-query'
import styled from 'styled-components'
import theme from '../theme'

const ImgFallback = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: ${(props) => {
    return `url(${props.url})`
  }};
  background-position: center center;
`

class ImgWrapper extends React.PureComponent {
  render() {
    const { src, alt, srcSet } = this.props
    return (
      <ImgFallback
        url={src}
      >
        {this.props.children}
      </ImgFallback>
    )
  }
}

ImgWrapper.defaultProps = {
  alt: '',
  children: null,
  src: '',
  srcSet: '',
}

ImgWrapper.propTypes = {
  alt: PropTypes.string,
  children: PropTypes.element,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
}

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

const Container = styled.div`
  margin: 30px auto 70px;
  max-width: ${layout.mobile.width};

  ${screen.tabletOnly`
    max-width: ${layout.tablet.width.small}px;
  `};

  ${screen.desktopOnly`
    max-width: ${layout.desktop.width.small}px;
  `};

  ${screen.hdAbove`
    max-width: ${layout.hd.width.small}px;
  `};
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
