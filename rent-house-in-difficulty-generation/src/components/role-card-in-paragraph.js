import BaseComponents from './base'
import imgSrc from '../data/img-src'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const typography = theme.typography

const style = {
  backgroundColor: "#404040",
  borderColor: "#d8d8d8",
  desktopAbove: {
    width: '282px',
    height: '130px'
  },
  tablet: {
    width: '255px',
    height: '106px'
  },
  mobile: {
    width: '100%',
    height: '130px'
  }
}

const Container = BaseComponents.MediumContainer.extend`
  margin-left: auto;
  margin-right: auto;
`

const Link = styled.div`
  cursor: pointer;
`

// TODO: split role card out

const Role = styled.div `
  display: flex;
  border: solid 2px #d8d8d8;
  background-color: #404040;
  cursor: pointer;
  ${screen.desktopAbove`
    width: ${style.desktopAbove.width};
    height: ${style.desktopAbove.height};  
  `}
  ${screen.tabletOnly`
    width: ${style.tablet.width};
    height: ${style.tablet.height};  
  `}
  ${screen.tabletAbove`
    margin: 0 40px;
    float: ${props => props.position};
    margin-${props => props.position}: 0;
  `}
  ${screen.mobileBelow`
    width: ${style.mobile.width};
    height: ${style.mobile.height};
    margin: 5px 0;
  `}
`

const ProfileBg = styled.div`
  height: 100%;
  padding-left: 20px;
  ${screen.tabletAbove`
    padding: 0;
  `}
`

const Profile = styled.img`
  width: 126px;
  height: 100%;
  ${screen.tabletOnly`
    width: 103px;
  `}
`

const Description = styled.div `
  position: relative;
  display: block;
  p{
    color: #d8d8d8;
    margin: 0;
    line-height: ${typography.lineHeight.regular};
    font-weight: ${typography.font.weight.bold};
  }
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: left;
  padding-right: 20px;
`

const MessageIcon = styled.img`
  display: block;
  width: 23px;
  height: auto;
`

class RoleCardInParagraph extends PureComponent {
  render() {
    const { content, onStorySelect } = this.props
    const anchorId = content[2]
    return (
      <Container>
        <Link
          onClick={() => onStorySelect(anchorId)}
        >
          <Role
            position={content[1]}
          >
            <ProfileBg>
              <picture>
                <source media="(orientation: portrait)" srcSet={imgSrc[content[0][1]]} />
                <source media="(max-width: 767px)" srcSet={imgSrc[content[0][1]]} />
                <Profile
                  src={imgSrc[content[0][0]]}
                />
              </picture>
            </ProfileBg>
            <Description>
              <Content>
                <MessageIcon src={imgSrc['message-icon']}/>
                <p>{content[3]}</p>
              </Content>
            </Description>
          </Role>
        </Link>
      </Container>
    )
  }
}

RoleCardInParagraph.propTypes = {
  content: PropTypes.array.isRequired,
}

export default RoleCardInParagraph
