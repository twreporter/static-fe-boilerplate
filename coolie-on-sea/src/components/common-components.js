import screen from '../utils/screen'
import styled from 'styled-components'

// catchPhrase audio prototype
// location and width
export const CPAP = styled.div`
  position: absolute;
  right: 30%;
  width: 31%;
  transform: translate(50%, -50%);
  ${screen.desktopAbove`
    width: 26%;
    right: 26%;
  `};
  ${screen.tabletOnly`
    width: 39%;
    right: 36%;
  `};
  ${screen.mobileBelow`
    width: 73%;
    right: 50%;
  `};
`

export const SubtitleContainer = CPAP.extend`
  top: 39%;
  color: white;
  font-size: 42px;
  font-weight: bold;
  text-align: left;
  ${screen.desktopAbove`
    font-size: 32px;
    top: 40%;
  `};
  ${screen.tabletOnly`
    width: 39%;
    right: 36%;
  `};
  ${screen.mobileBelow`
    top: 26%;
    font-size: 32px;
  `};
`

export const TextFrame = styled.div`
  opacity: ${props => (props.ifShowUp ? '1' : '0')};
  transition: all 800ms ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 1.75;
  letter-spacing: 1.4px;
`

export const IconContainerPrototype = styled.div`
  > svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`
