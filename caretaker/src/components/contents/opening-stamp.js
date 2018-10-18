import stamp from '../../../static/nursing/opening-stamp.png'
import styled from 'styled-components'
import mq from '../../utils/media-query'

const size = {
  mobile: '74px',
  tablet: '137px',
  desktop: '152px',
}

const Stamp = styled.div`
  position: absolute;
  width: ${size.mobile};
  height: ${size.mobile};
  background-image: url(${stamp});
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  right: 8%;
  bottom: 12%;
  ${mq.tabletOnly`
    width: ${size.tablet};
    height: ${size.tablet};
    right: 22%;
    bottom: 10%;
  `}
  ${mq.desktopAbove`
    width: ${size.desktop};
    height: ${size.desktop};
    right: 32%;
    bottom: 15%;
  `}
`

export default Stamp
