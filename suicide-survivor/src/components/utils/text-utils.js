import styled from 'styled-components'
import mq from '../../utils/media-query'
import { colors } from '../../styles/common-variables'

export const TextContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 100%;
  width: 673px;
  ${mq.tablet`
    width: 450px;
  `};
  ${mq.mobile`
    width: 74%;
  `};
`

export const Title = styled.div`
  margin: 60px 0 1px 0;
  font-size: 36px;
  font-weight: bold;
  text-align: left;
  color: ${props => (props.fontColor ? props.fontColor : '#ffffff')};
`

export const Paragraph = styled.div`
  text-align: left;
  margin-bottom: 2em;
  font-size: 18px;
  line-height: 35px;
  color: ${props => (props.fontColor ? props.fontColor : `${colors.textBlack}`)};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '300')};
  text-align: left;
  a {
    transition: all 200ms ease-in-out;
    &:link {
      text-decoration: none;
      color: ${props => (props.fontColor ? props.fontColor : `${colors.textBlack}`)};
      border-bottom: 1px solid ${colors.primaryColor};
    }
    &:hover, &:visited, &:active {
      text-decoration: none;
      color: ${colors.primaryColor};
      border-bottom: 1px solid ${colors.primaryColor};
    }
  }
`

export const H2 = Paragraph.extend`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.5;
  padding-top: 1.5rem;
  color: rgb(64, 64, 64);
`
