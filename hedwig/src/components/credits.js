import { colors, fontWeight } from '../constants/style-variables'
import { ContentContainer, ContainerWrapper } from './text-content-container'
import map from 'lodash/map'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const fontSize = '16px'

const Container = ContentContainer.extend`
  text-align: left;
  margin-top: 28px;
  margin-bottom: 27px;
  ${mq.tabletAbove`
    margin-top: 60px;
  `}
`

const CreditBox = styled.div`
  text-align: left;
  display: inline-block;
  margin-right: 2em;
  margin-bottom: 1em;
  :last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
  ${mq.mobileOnly`
    max-width: 100%;
    overflow: hidden;
    white-space: wrap;
  `}
`

const JobTitle = styled.span`
  font-weight: ${fontWeight.bold};
  color: ${colors.textBlack};
  font-size: ${fontSize};
  margin-right: .5em;
  :last-child {
    margin-right: 0;
  }
`

const Member = styled.span`
  font-weight: ${fontWeight.normal};
  color: ${colors.textBlack};
  font-size: ${fontSize};
`

const MemberWithLink = styled.a`
  font-weight: ${fontWeight.normal};
  color: ${colors.textBlack};
  font-size: ${fontSize};
  text-decoration: none;
`

function _memberToBox(member, index, members) {
  const { name, linkTo } = member
  let box = null
  const separator = (index !== members.length - 1) ? '、' : null
  if (!linkTo) {
    box = (<Member key={index}>{name}</Member>)
  } else {
    box = (<MemberWithLink key={index} href={linkTo} target="_blank">{name}</MemberWithLink>)
  }
  return [box, separator]
}

function _authorToBox(credit, index) {
  const { jobTitle, members } = credit
  const membersJSX = _.map(members, _memberToBox)
  return (
    <CreditBox key={index}>
      <JobTitle>{jobTitle}</JobTitle>
      {membersJSX}
    </CreditBox>
  )
}

class Credits extends React.PureComponent {
  render() {
    const { credits } = this.props
    const creditsJSX = _.map(credits, _authorToBox)
    return (
      <ContainerWrapper>
        <Container>
          {creditsJSX}
        </Container>
      </ContainerWrapper>
    )
  }
}

Credits.propTypes = {
  credits: PropTypes.array.isRequired,
}

export default Credits
