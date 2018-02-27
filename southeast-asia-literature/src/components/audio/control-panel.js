import ControlBtn from './control-button'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { fontWeight } from '../../constants/style-variables'
import mq from '../../utils/media-query'
import ProgressBar from './progress-bar'
import { getMinSecStr } from '../../utils/audio'

const fontSize = {
  origin: '18px',
  chinese: '16px',
}

const rowPaddingBottom = {
  mobile: '20px',
  tablet: '30px',
  desktop: '30px',
}

const Row = styled.div`
  display: flex;
  padding-bottom: ${rowPaddingBottom.mobile};
  ${mq.tabletOnly`
    padding-bottom: ${rowPaddingBottom.tablet};
  `}
  ${mq.desktopAbove`
    padding-bottom: ${rowPaddingBottom.desktop};
  `}
`

const BtnBlock = styled.div`
  flex: 0 0 54px;
  ${mq.tabletBelow`
    order: 2;
  `}
`

const TitleBlock = styled.div`
  flex: 1 1 auto;
  ${mq.tabletBelow`
    order: 1;
  `}
  ${mq.desktopAbove`
    margin-left: 15px;
  `}
`

const OriginTitle = styled.div`
  font-size: ${fontSize.chinese};
  font-weight: ${fontWeight.regular};
  margin-top: .2em;
  opacity: .7;
`

const ChineseTitle = styled.div`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.origin};
`

const ThaiTitle = OriginTitle.extend`
  font-family: 'Noto Sans Thai', sans-serif;
`

const BurmeseTitle = OriginTitle.extend`
  font-family: 'Noto Sans Myanmar', sans-serif;
  line-height: 1.6;
`

const selectLetterByLanguage = (lang) => {
  switch (lang) {
    case 'thai':
      return ThaiTitle
    case 'burmese':
      return BurmeseTitle
    default:
      return OriginTitle
  }
}

const Time = styled.div`
  text-align: right;
  color: rgba(168, 125, 72, .7);
`

const Current = styled.span``

const Duration = styled.span``

class InlineControl extends React.PureComponent {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    title: PropTypes.shape({
      chinese: PropTypes.string,
      origin: PropTypes.string,
    }),
    togglePlaying: PropTypes.func.isRequired,
  }
  static defaultProps = {
    title: {
      chinese: '',
      origin: '',
    },
  }
  render() {
    const {
      current,
      duration,
      lang,
      isPlaying,
      title,
      togglePlaying,
    } = this.props
    const { chinese, origin } = title
    const Origin = selectLetterByLanguage(lang)
    return (
      <React.Fragment>
        <Row>
          <BtnBlock>
            <ControlBtn
              isPlaying={isPlaying}
              togglePlaying={togglePlaying}
            />
          </BtnBlock>
          <TitleBlock>
            <ChineseTitle>{chinese}</ChineseTitle>
            <Origin>{origin}</Origin>
          </TitleBlock>
        </Row>
        <div style={{ height: '2px', position: 'relative', marginBottom: '14px' }}>
          <ProgressBar
            containerBg="rgba(168, 125, 72, .2)"
            indicatorBg="#a67a44"
            percent={current / duration * 100}
          />
        </div>
        <Time>
          <Current>{getMinSecStr(current)}</Current>
          <span> / </span>
          <Duration>{getMinSecStr(duration)}</Duration>
        </Time>
      </React.Fragment>
    )
  }
}

export default InlineControl
