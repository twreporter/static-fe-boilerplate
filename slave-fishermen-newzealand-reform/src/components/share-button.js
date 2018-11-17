import { FacebookButton, TwitterButton } from 'react-social'
import { ogUrl, fbAppId } from '../constants/metadata'
import BaseComponents from './base'
import commonStyle from '../utils/common-style'
import FbIcon from '../../static/fb.svg'
import LineIcon from '../../static/line.svg'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import styled from 'styled-components'
import TwitterIcon from '../../static/twitter.svg'

const Container = BaseComponents.SmallContainer.extend`
  margin: 0 auto ${commonStyle.headbar.height};
`

const ButtonWrapper = styled.div`
  display: inline-block;
  margin-right: 15px;
  >button {
    cursor: pointer;
    border: none;
    outline: none;
    width: 28px;
    border: none;
    background: none;
    padding: 0;
    margin-right: 15px;
    display: inline-block;
    img {
      width: 100%;
      height: auto;
    }
  }
`

class ShareButton extends React.PureComponent {
  render() {
    const { content } = this.props
    const url = content.url
    const title = content.title
    const lineUrl = `http://line.naver.jp/R/msg/text/?${encodeURI(title + ' ' + url)}`
    return (
      <Container>
        <ButtonWrapper>
          <FacebookButton url={url} appId={fbAppId}>
            <FbIcon />
          </FacebookButton>
          <TwitterButton message={title} url={url}>
            <TwitterIcon />
          </TwitterButton>
          <a href={lineUrl} style={{ border: 'none' }}>
            <LineIcon />
          </a>
        </ButtonWrapper>
      </Container>
    )
  }
}

ShareButton.propTypes = {
  content: PropTypes.object.isRequired,
}

export default ShareButton
