import { colors, fontWeight } from '../constants/style-variables'
import { ContainerWrapper, ContentContainer } from './text-content-container'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const fontSize = {
  name: '25px',
  bg: '16px',
  infoContent: '14px',
  infoTitle: '12px',
}

const Wrapper = ContainerWrapper.extend`
  display: none;
  ${mq.mobileOnly`
    display: block;
    background-color: ${colors.white};
    padding-top: 34px;
    padding-bottom: 25px;
  `}
`

const PictureBlock = styled.div`
  width: 96%;
  margin: 30px auto 25px auto;
`

const Image = styled.img`
  width: 100%;
  margin: 0;
  box-shadow: 0 0 7px 0 rgba(180, 180, 180, 0.25);
`

const TitleBlock = styled.div`
  text-align: left;
`

const InfoBlock = styled.div`
  text-align: left;
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

const InfoItem = styled.div`
  line-height: 1.58;
`

const ProgressIndicator = styled.div`
  position: absolute;
  top:0 ;
  right: 0;
`

class SingleColumnPicture extends React.Component {
  render() {
    const { ProgressSVG, author, illustration } = this.props
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
    const { mobile } = resizedTargets
    return (
      <Wrapper>
        <ContentContainer>
          <TitleBlock>
            <AuthorName>{name}</AuthorName>
            <AuthorBg>{`${jobTitle},${country}`}</AuthorBg>
          </TitleBlock>
          <ProgressIndicator>
            <ProgressSVG />
          </ProgressIndicator>
        </ContentContainer>
        <PictureBlock mobile={mobile}>
          <Image src={mobile.path} />
        </PictureBlock>
        <ContentContainer>
          <InfoBlock>
            <InfoItem><InfoTitle>媒材</InfoTitle><HeavyInfoContent>{materials}</HeavyInfoContent></InfoItem>
            <InfoItem style={{ marginBottom: '1em' }}><InfoTitle>作品尺寸</InfoTitle><HeavyInfoContent>{`${size.height} × ${size.width}`}</HeavyInfoContent></InfoItem>
            <InfoItem><LightInfoContent>{email}</LightInfoContent></InfoItem>
            <InfoItem><LightInfoContentWithLink href={`http://${website}`}>{website}</LightInfoContentWithLink></InfoItem>
            <InfoItem style={{ marginTop: '1em' }}><LightInfoContent>{comment}</LightInfoContent></InfoItem>
          </InfoBlock>
        </ContentContainer>
      </Wrapper>
    )
  }
}

SingleColumnPicture.propTypes = {
  author: PropTypes.object.isRequired,
  illustration: PropTypes.object.isRequired,
  ProgressSVG: PropTypes.func.isRequired,
}

export default SingleColumnPicture
