import styled, { keyframes } from 'styled-components'
import mq from '../../utils/media-query'
import React from 'react'
import PropTypes from 'prop-types'
import { TextContainer } from './text-utils'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const BackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-color: black;
  background-image: url(${props => props.tablet});
  animation: ${fadeIn} 900ms ease 1200ms both;
  ${mq.mobile`
    background-image: url(${props => props.mobile});
  `}
  ${mq.desktopAbove`
    background-image: url(${props => props.desktop});
  `}
`

export const AudioSectionBg = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  background-image: url(${props => props.mobile});
  animation: ${fadeIn} 900ms ease 1200ms both;
  ${mq.tablet`
    background-image: url(${props => props.tablet});
  `}
  ${mq.desktop`
    left: 39px;
  `};
  ${mq.desktopAbove`
    background-image: url(${props => props.desktop});
    left: 55px;
  `}
`

const ImgContainer = styled.div`
  margin-bottom: 40px;
`

export const Img = styled.div`
  margin: 0 auto;
  background-position: center center;
  background-size: cover;
  background-color: black;
  background-repeat: no-repeat;
  background-image: url(${props => props.tablet});
  width: 833px;
  height: 555px;
  ${mq.mobile`
    width: 100%;
    background-image: url(${props => props.mobile});
  `}
  ${mq.tablet`
    width: 672px;
    background-image: url(${props => props.tablet});
  `}
  ${mq.desktopAbove`
    background-image: url(${props => props.desktop});
  `}
`

const Caption = styled.div`
  color: #737373;
  margin-top: 1em;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.8;
  margin-top: 14px;
  text-align: left;
`

export const ArticleImg = ({ imgData }) => {
  const { src, caption } = imgData
  const { mobile, tablet, desktop } = src
  return (
    <ImgContainer>
      <Img
        mobile={mobile}
        tablet={tablet}
        desktop={desktop}
      />
      { caption ? <TextContainer><Caption>{caption}</Caption></TextContainer> : null }
    </ImgContainer>
  )
}

ArticleImg.propTypes = {
  imgData: PropTypes.object.isRequired,
}

const Infographic = styled.img`
  padding-top: 30px;
  width: 450px;
  ${mq.mobile`
    width: 188px;
  `}
  ${mq.tablet`
    width: 393px;
  `}
`

export const ArticleInfographic = ({ imgData }) => {
  const { src, caption } = imgData
  const { desktop } = src
  return (
    <ImgContainer>
      <Infographic
        src={desktop}
      />
      { caption ? <TextContainer><Caption>{caption}</Caption></TextContainer> : null }
    </ImgContainer>
  )
}

ArticleInfographic.propTypes = {
  imgData: PropTypes.object.isRequired,
}
