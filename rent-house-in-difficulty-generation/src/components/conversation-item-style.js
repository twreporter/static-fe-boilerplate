import animations from '../utils/animations'
import commonStyle from '../utils/common-style';
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const style = {
  color: {
    border: "#979797",
    bg: "#d8d8d8",
    darkBg: "rgba(0, 0, 0, 0.5)",
    button: "#404040"
  },
  layout: {
    height: {
      desktopAbove: 615,
      tabletOnly: 560,
      mobileOnly: 630,
      miniOnly: 560
    }
  }
}

export const Dialogue = styled.div`
  position: relative;
  max-width: 100%;
  max-height: ${props => props.hasNext ? '100%' : '275px'};
  display: ${props => props.emptyPage && props.hasNext ? 'none' : 'block'};
  border: ${props => !props.hasNext ? 'none' : 'solid 3px #000'};
  background: ${props => !props.hasNext ? 'none' : '#f1f1f1'};
  border-radius: 25px;
  color: ${props => props.hasNext ? theme.colors.text.conversation : theme.colors.text.paragraph};
  padding: ${props => props.hasNext ? '12px 25px' : 0};
  cursor: ${props => props.hasNext ? 'pointer' : 'initial'};
  p{
    font-size: ${theme.typography.font.size.medium};
    font-weight: ${theme.typography.font.weight.medium};
    line-height: ${theme.typography.lineHeight.regular};
    text-align: justify;
    margin: 0;
    >span{
      font-weight: ${theme.typography.font.weight.semiBold};
    }
  }
  ${screen.tabletAbove`
    max-width: ${props => props.hasNext ? 'calc((600 / (833 - 60)) * 100%)' : '100%'};
  `}
  &:before, &:after {
    display: ${props => !props.hasNext ? 'none' : 'block'};
    z-index: 1;
    content: ' ';
    position: absolute;
    border-left: 1.5em solid transparent;
    left: 2em;
    top: -3em;
  }
  &:before {
    border-bottom: 3em solid #000;
    transform: translateX(-50%);
  }
  &:after {
    border-bottom: 3em solid #f1f1f1;
    transform: scale(0.7) translateY(25%) translateX(-70%);    
  }
`

export const EndText = styled.span`
  display: block;
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${theme.typography.font.weight.medium};
  line-height: ${theme.typography.lineHeight.regular};
  text-align: right;
`

export const ButtonText = styled.p `
  margin: 0;
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${theme.typography.font.weight.medium};
`

const BaseButton = styled.div`
  margin: 15px 0;
  min-height: 60px;
  width: 100%;
  display: inline-block;
  position: relative;
  padding: 15px 30px;
  background-color: ${style.color.button};
  border: solid 3px #262626;
  color: #d8d8d8;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 3px rgba(0, 0, 0, 0.3);
  p{
    font-weight: normal;
    text-align: left;
  }
  ${screen.tabletAbove`
    min-height: 55px;
    padding: 10px 30px;
    width: calc(50% - 35px);
  `}
`

export const OptionButton = BaseButton.extend`
  background-color: ${props => props.isSelectedByKey ? '#000' : style.color.button};
  color: ${props => props.isSelectedByKey ? '#fff' : '#d8d8d8'};
  &:before, &:after {
    z-index: 1;
    content: ' ';
    position: absolute;
    right: 1.5em;
    bottom: -1em;
  }
  &:before {
    border-left: 2em solid transparent;
    border-top: 1em solid #000;
  }
  &:after {
    border-left: 2em solid transparent;
    border-top: 1em solid ${props => props.isSelectedByKey ? '#000' : style.color.button};
    transform: translateY(-15%) translateX(3%) scale(0.8);
  }
  ${screen.desktopAbove`
    :first-child {
      margin-right: 5px;
      float: left;
    }
    :last-child {
      margin-left: 5px;
      float: right;
    }    
  `}
  ${screen.tabletOnly`
    position: absolute;
    bottom: 16.5px;  
    &:nth-child(2) {
      left: 30px;
    }
    &:last-child {
      right: 30px;
    }    
  `}
  ${screen.tabletAbove`
    min-height: 55px;
  `}
  ${screen.mobileBelow`
    :last-child{
      margin-top: 11px;
    }  
  `}
`

export const ResponseButton = BaseButton.extend`
  &:before, &:after {
    z-index: 1;
    content: ' ';
    position: absolute;
    right: 3em;
    bottom: -1em;
    transform: skew(30deg, 0deg);
  }
  &:before {
    border-left: 1.5em solid transparent;
    border-top: 1em solid #000;
  }
  &:after {
    border-left: 1.5em solid transparent;
    border-top: 1.1em solid ${style.color.button};
    transform: translateY(-12%) translateX(-2%) scale(0.7) skew(30deg,0deg);
  }
  &:hover {
    background-color: #000;
    color: #fff;
  }
  &:hover:after {
    border-top: 1.1em solid #000;
  }
  ${screen.desktopAbove`
    width: calc(55% - 35px);  
  `}
  ${screen.tabletAbove`
    position: absolute;
    right: 30px;
    bottom: 16.5px;
  `}
  ${screen.mobileBelow`
    margin-top: 56px;
  `}
`

export const ReturnButton = styled.button`
  width: 100%;
  min-height: 50px;
  margin-top: 25px;
  background-color: transparent;
  border: solid 1px #d8d8d8;
  color: #d8d8d8;
  border-radius: 25px;
  cursor: pointer;
  p{
    font-weight: normal;
  }
  ${screen.tabletAbove`
    width: 200px;
    padding: 15px;
    align-self: flex-end;
    margin-top: 40px;
  `}
  &:hover {
    background-color: #d8d8d8;
    color: #000;
  }
`

export const DialogueBox = styled.div `
  position: relative;
  width: 100%;
  height: ${props => props.emptyPage || !props.hasNext ? 'auto' : '100%'};
`

export const StartingPage = styled.div`
  position: absolute;
  background-color: ${style.color.bg};
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${screen.tabletAbove`
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    padding-bottom: 5px;
    ${ResponseButton} {
      position: relative;
      width: auto;
      p {
        white-space: nowrap;
      }
    }
  `}
  ${screen.mobileOnly`
    ${ResponseButton} {
      position: relative;
      padding: 10px;
      margin-top: 40px;
    }  
  `}
  ${screen.miniOnly`
    ${ResponseButton} {
      margin-top: 15px;
    }  
  `}
`

export const Startline = styled.div `
  display: ${props => props.show ? 'block' : 'none'};
  width: 24px;
  height: 4px;
  border-radius: 2px;
  background-color: #d8d8d8;
  margin-bottom: 10px;
`

export const Explaination = styled.div`
  display: flex;
  p{
    font-size: ${theme.typography.font.size.xsmall};
    text-align: left;
    color: #808080;
  }
  ${screen.desktopAbove`
    >img {
      transform: translateY(40%);
    }  
  `}
  ${screen.tabletAbove`
    align-items: flex-end;
  `}
`

export const ArrowIcon = styled.img`
  height: 26.9px;
  margin-right: 8px;
`

export const MobileArrowIcon = ArrowIcon.extend`
  width: 13.7px;
  ${screen.tabletAbove`
    display: none;
  `}
`

export const DesktopArrowIcon = ArrowIcon.extend`
  width: auto;
  ${screen.mobileBelow`
    display: none;
  `}
`

export const Instruction = styled.p`
  display: ${props => props.show ? "block" : "none"};
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${theme.typography.font.weight.medium};
  line-height: ${theme.typography.lineHeight.regular};
  white-space: pre-wrap;
  text-align: justify;
  margin: 0;
  color: #808080;
  ${screen.desktopAbove`
    margin-top: 4%;
  `}
  ${screen.tabletAbove`
    text-align: center;
  `}
  ${screen.tabletOnly`
    margin-top: 6%;
  `}
`

export const LoadingPage = styled.div `
  z-index: 2;
  position: absolute;
  visibility: ${props => props.show ? "visible" : "hidden"};
  left: 0;
  top: ${commonStyle.headbar.height};
  width: 100%;
  height: calc((100% - ${commonStyle.headbar.height}));
  background: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p{
    margin: 0;
  }
  span{
    vertical-align: middle;
  }
`

export const LoadingBar = styled.div `
  position: relative;
  width: 30%;
  height: 5px;
  background: rgba(0, 0, 0, 0.4);
  margin-bottom: 16px;
`

export const LoadingBarFG = styled.div `
  position: absolute;
  left: 0;
  top: 0;
  width: ${props => props.barWidth};
  height: 100%;
  background: #d8d8d8;
`

export const LoadingIcon = styled.img `
  height: 18px;
  margin-right: 5px;
`

export const PressKeyToContinue = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: ${props => props.show ? 'block' : 'none'};
  cursor: pointer;
  p {
    margin: 0;
    color: #808080;
    font-size: ${theme.typography.font.size.small};
    font-weight: ${theme.typography.font.weight.medium};
    line-height: ${theme.typography.lineHeight.regular};
    span {
      vertical-align: middle;
      img {
        margin-left: 0.75em;
        width: ${theme.typography.font.size.small};
        animation-name: ${animations.shiftNext};
        animation-duration: 500ms;
        animation-iteration-count: infinite;
      }
    }
  }
  ${screen.tabletBelow`
    display: none;
  `}
`

