import { fontWeight } from '../constants/style-variables'
import ContentContainer from './content-container'
import map from 'lodash/map'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const fontSize = '16px'
const fontColor = '#808080'
const jobSeparator = '｜'

const Container = ContentContainer.extend`
  margin-top: 0;
  text-align: left;
  margin-bottom: 55px;
`

const SeperateLine = styled.div`
  width: 200px;
  height: 2px;
  background: #a67a44;
  margin: 0 auto 40px auto;
`

const CreditBox = styled.div`
  text-align: center;
  margin-bottom: 1em;
  :last-child {
    margin-bottom: 0;
  }
  ${mq.mobileOnly`
    max-width: 100%;
    overflow: hidden;
    white-space: wrap;
  `}
`

const JobTitle = styled.span`
  font-weight: ${fontWeight.regular};
  color: ${fontColor};
  font-size: ${fontSize};
  :last-child {
    margin-right: 0;
  }
  :after {
    content: "${jobSeparator}";
  }
`

const Member = styled.span`
  font-weight: ${fontWeight.regular};
  color: ${fontColor};
  font-size: ${fontSize};
`

const MemberWithLink = styled.a`
  font-weight: ${fontWeight.regular};
  color: ${fontColor};
  font-size: ${fontSize};
  text-decoration: none;
`

function _memberToBox(member, index, members) {
  const { name, linkTo } = member
  let box = null
  const separator = (index !== members.length - 1) ? '、' : null
  if (!linkTo) {
    box = (<Member key={index}>{name}{separator}</Member>)
  } else {
    box = (<MemberWithLink key={index} href={linkTo} target="_blank">{name}{separator}</MemberWithLink>)
  }
  return box
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
      <Container>
        <SeperateLine />
        {creditsJSX}
      </Container>
    )
  }
}

Credits.propTypes = {
  credits: PropTypes.array.isRequired,
}

export default Credits
