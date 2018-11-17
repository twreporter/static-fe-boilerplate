import BaseComponents from './base'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const _ = {
  map,
}

const fontSize = theme.typography.font.size.medium

const Container = BaseComponents.SmallContainer.extend`
  text-align: left;
  margin: 0 auto 26px;
`

const CreditBox = styled.div`
  text-align: left;
  display: inline-block;
  margin-right: 2em;
  :last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
  ${screen.mobileOnly`
    max-width: 100%;
    white-space: wrap;
  `}
`

const JobTitle = styled.span`
  font-weight: ${theme.typography.font.weight.bold};
  color: ${theme.colors.text.paragraph};
  font-size: ${fontSize};
  margin-right: .5em;
  :last-child {
    margin-right: 0;
  }
`

const Member = styled.span`
  font-weight: ${theme.typography.font.weight.regular};
  color: ${theme.colors.text.paragraph};
  font-size: ${fontSize};
`

const MemberWithLink = styled.a`
  font-weight: ${theme.typography.font.weight.regular};
  color: ${theme.colors.text.paragraph};
  font-size: ${fontSize};
  border-bottom: 1px solid ${theme.colors.primary};
  transition: color 0.5s ease 0s;
  &:hover{
    color: rgb(199, 27, 10);
  }
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
    const { content } = this.props
    const creditsJSX = _.map(content, _authorToBox)
    return (
      <Container>
        {creditsJSX}
      </Container>
    )
  }
}

Credits.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Credits
