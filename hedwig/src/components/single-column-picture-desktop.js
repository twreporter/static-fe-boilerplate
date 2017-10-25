import { colors, fontWeight } from '../constants/style-variables'
import { ContainerWrapper } from './text-content-container'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const mqLoadLarge = (...args) => css`
  @media (min-width: 1440px) and (min-height: 960px) {
    ${css(...args)}
  }
`

const wrapperMinHeight = {
  desktop: '800px',
  hd: '960px',
}

const fontSize = {
  name: '35px',
  bg: '16px',
  infoContent: '14px',
  infoTitle: '12px',
}

const Wrapper = ContainerWrapper.extend`
  ${mq.tabletBelow`
    display: none;
  `}
  background-color: ${colors.white};
  height: 100vh;
  min-height: ${wrapperMinHeight.desktop};
  ${mqLoadLarge`
    min-height: ${wrapperMinHeight.hd};
  `}
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.desktop.width}px;
  ${mqLoadLarge`
    width: ${props => props.hd.width}px;
  `}
`

const PictureBlock = styled.div`
  box-shadow: 0 0 7px 0 rgba(180, 180, 180, 0.25);
  width: 100%;
  height: ${props => props.desktop.height}px;
  margin-bottom: 43px;
  ${mqLoadLarge`
    height: ${props => props.hd.height}px;
    margin-bottom: 30px;
  `}
`

const AuthorBlock = styled.div`
  display: flex;
  color: ${colors.textBlack};
`

const TitleBlock = styled.div`
  flex-grow: 0;
  text-align: left;
`

const InfoBlock = styled.div`
  flex-grow: 1;
  text-align: right;
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

const RowOnLarge = InfoRow.extend`
  display: none;
  ${mqLoadLarge`
    display: block;
  `}
`

const RowOnSmall = InfoRow.extend`
  ${mqLoadLarge`
    display: none;
  `}
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
    const {
      desktop,
      hd,
    } = resizedTargets
    return (
      <Wrapper>
        <Container desktop={desktop} hd={hd} >
          <PictureBlock desktop={desktop} hd={hd} />
          <AuthorBlock>
            <TitleBlock>
              <AuthorName>{name}</AuthorName>
              <AuthorBg>{`${jobTitle},${country}`}</AuthorBg>
            </TitleBlock>
            <InfoBlock>
              <InfoRow>
                <InfoTitle>媒材</InfoTitle><HeavyInfoContent>{materials}</HeavyInfoContent>
                <Separator />
                <InfoTitle>作品尺寸</InfoTitle><HeavyInfoContent>{`${size.height} × ${size.width}`}</HeavyInfoContent>
              </InfoRow>
              <RowOnLarge>
                {!email ? null : <LightInfoContent>{email}</LightInfoContent>}
                {(!email || !website) ? null : <Separator />}
                {!website ? null : <LightInfoContentWithLink href={`http://${website}`}>{website}</LightInfoContentWithLink>}
                {(!website || !comment) ? null : <Separator />}
                {!comment ? null : <LightInfoContent>{comment}</LightInfoContent>}
              </RowOnLarge>
              <RowOnSmall>
                {!email ? null : <LightInfoContent>{email}</LightInfoContent>}
                {(!email || !website) ? null : <Separator />}
                {!website ? null : <LightInfoContentWithLink href={`http://${website}`}>{website}</LightInfoContentWithLink>}
              </RowOnSmall>
              <RowOnSmall>
                {!comment ? null : <LightInfoContent>{comment}</LightInfoContent>}
              </RowOnSmall>
            </InfoBlock>
          </AuthorBlock>
        </Container>
      </Wrapper>
    )
  }
}

SingleColumnPicture.propTypes = {
  author: PropTypes.object.isRequired,
  illustration: PropTypes.object.isRequired,
}

export default SingleColumnPicture
