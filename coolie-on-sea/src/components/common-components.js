import screen from '../utils/screen'
import styled from 'styled-components'

export const SubtitleContainer = styled.div`
  display: block;
  font-size: 20px;
  text-align: left;
  min-height: 58px;
  ${screen.tabletBelow`
    min-height: 30px;
  `}
`

export const TextFrame = styled.p`
  font-family: "source-han-serif-tc", "serif", "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  opacity: ${props => (props.ifShowUp ? '1' : '0')};
  transition: all 800ms ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  letter-spacing: 1.4px;
  font-weight: 600;
  margin: 0;
  mark {
    background-color: #0d1319;
    color: #e2e2e2;
    line-height: 2.5;
    padding: 0 6px;
  }
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
