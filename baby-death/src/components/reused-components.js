import styled from 'styled-components'

const StyledTitle = styled.h2`
  display: none;
`

const StyledParagraph = styled.p`
  font-size: 18px;
  line-height: 1.56;
  text-align: justify;
  color: ${(props) => { return props.color }};
  margin-top: 25px;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
  }
`

const StyledAnnotation = styled.div`
  font-size: 14px;
  color: ${props => props.color};
  opacity: 0.9;
  margin-bottom: 15px;
  line-height: 1.56;

  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`

const StyledAreaContainer = styled.section`
  width: 95%;
  margin: 0 auto;
`

const StyledAnimatedBlock = styled.img`
  position: absolute;
  width: ${props => (props._width / props.animationBlock.width) * 100}%;
  left: ${props => (props.left / props.animationBlock.width) * 100}%;
  top: ${props => (props.top / props.animationBlock.height) * 100}%;
`

const StyledScaleAnimatedBlock = StyledAnimatedBlock.extend`
  will-change: transform;
  transform: scale(${props => (props.toShow ? '1,1' : '0,0')});
  transition: transform ${props => props.duration}ms ${props => props.delay}ms;
`

const StyledOpacityAnimatedBlock = StyledAnimatedBlock.extend`
  will-change: opacity;
  opacity: ${props => (props.toShow ? '1' : '0')};
  transition: opacity ${props => props.duration}ms ${props => props.delay}ms;
`

const StyledSlideDownAnimatedBlocks = StyledAnimatedBlock.extend`
  will-change: transform;
  transform: translateY(${props => (props.toShow ? '0' : '-100px')});
  opacity: ${props => (props.toShow ? '1' : '0')};
  transition: opacity ${props => props.duration}ms ${props => props.delay}ms, transform ${props => props.duration}ms ${props => props.delay}ms;
  z-index: ${props => props.zIndex};
`

const StyledSlideUpAnimatedBlocks = StyledSlideDownAnimatedBlocks.extend`
  transform: translateY(${props => (props.toShow ? '0px' : '100px')});
`

export default {
  StyledTitle,
  StyledAnnotation,
  StyledParagraph,
  StyledAreaContainer,
  StyledScaleAnimatedBlock,
  StyledOpacityAnimatedBlock,
  StyledSlideDownAnimatedBlocks,
  StyledSlideUpAnimatedBlocks,
}
