import { colors, fontWeight } from '../constants/style-variables'
import { ContainerWrapper } from './text-content-container'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const imageWidth = '640px'

const fontSize = {
  name: '35px',
  bg: '16px',
  infoContent: '14px',
  infoTitle: '12px',
}

const Wrapper = ContainerWrapper.extend`
  display: none;
  ${mq.tabletOnly`
    display: block;
    padding: 30px 0;
  `}
  background-color: ${colors.white};
`

const PictureBlock = styled.div`
  width: ${imageWidth};
  margin: 30px auto 25px auto;
`

const Image = styled.img`
  width: 100%;
  margin: 0;
  box-shadow: 0 0 7px 0 rgba(180, 180, 180, 0.25);
`

const TitleBlock = styled.div`
  width: 100%;
  text-align: center;
`

const InfoBlock = styled.div`
  text-align: right;
  width: ${imageWidth};
  margin: 0 auto;
`

const AuthorName = styled.h2`
  font-size: ${fontSize.name};
  font-weight: ${fontWeight.bold};
  line-height: 1;
  margin: 0;
  padding: 0;
`

const AuthorBg = styled.div`
  font-size: ${fontSize.bg};
  font-weight: ${fontWeight.bold};
  line-height: 2.19;
`


const InfoTitle = styled.span`
  margin-right: .6em;
  font-size: ${fontSize.infoTitle};
  font-weight: ${fontWeight.light};
`

const InfoContent = styled.span`
  font-size: ${fontSize.infoContent};
`

const LightInfoContent = InfoContent.extend`
  font-weight: ${fontWeight.light};
`
const HeavyInfoContent = InfoContent.extend`
  font-weight: ${fontWeight.medium};
`

const LightInfoContentWithLink = LightInfoContent.withComponent('a').extend`
  text-decoration: none;
  color: ${colors.textBlack};
`

const InfoRow = styled.div`
  line-height: 2.5;
`

const Separator = styled.div`
  transform: translateY(2px);
  display: inline-block;
  width: 1px;
  height: 1em;
  background-color: ${colors.textBlack};
  opacity: .7;
  ${mq.mobileOnly`
    display: none;
  `}
  margin: 0 .5em;
`

class SingleColumnPicture extends React.Component {
  render() {
    const { author, illustration } = this.props
    const {
      name,
      jobTitle,
      country,
      email,
      website,
    } = author
    const {
      image,
      materials,
      size,
      comment,
    } = illustration
    const { resizedTargets } = image
    const { tablet } = resizedTargets
    return (
      <Wrapper>
        <TitleBlock>
          <AuthorName>{name}</AuthorName>
          <AuthorBg>{`${jobTitle},${country}`}</AuthorBg>
        </TitleBlock>
        <PictureBlock><Image src={tablet.path} /></PictureBlock>
        <InfoBlock>
          <InfoRow>
            <InfoTitle>媒材</InfoTitle><HeavyInfoContent>{materials}</HeavyInfoContent>
            <Separator />
            <InfoTitle>作品尺寸</InfoTitle><HeavyInfoContent>{`${size.height} × ${size.width}`}</HeavyInfoContent>
          </InfoRow>
          <InfoRow>
            {!email ? null : <LightInfoContent>{email}</LightInfoContent>}
            {(!email || !website) ? null : <Separator />}
            {!website ? null : <LightInfoContentWithLink href={`http://${website}`}>{website}</LightInfoContentWithLink>}
          </InfoRow>
          <InfoRow>
            {!comment ? null : <LightInfoContent>{comment}</LightInfoContent>}
          </InfoRow>
        </InfoBlock>
      </Wrapper>
    )
  }
}

SingleColumnPicture.propTypes = {
  author: PropTypes.object.isRequired,
  illustration: PropTypes.object.isRequired,
}

export default SingleColumnPicture
