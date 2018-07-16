import { fontWeight } from '../constants/style'
import medal01Image from '../../static/medal/medal-1.png'
import mq from '../utils/media-query'
import playerImage from '../../static/popup/head.png'
import fingerImage from '../../static/popup/finger.png'
import closeIcon from '../../static/popup/close.png'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import routes from './routes'
import styled, { keyframes } from 'styled-components'

const text = {
  title: '遊戲說明',
  desc: '《報導者》團隊選出 21 世紀 10 位足球明星，根據他們在世界盃團體及個人的成績表現為指標，運算出「世足成就榜」。快來看看你心中，在世界盃場上表現亮眼足球員是否跟榜單一樣！',
  step: '請依照歷屆世足場上表現，從 10 位球星中挑出你心目中的前 5 名，將球員拖曳至對應的名次框框中。',
  footnote: '註：2018 年俄羅斯世界盃有列入計算',
}

// const shorten = keyframes`
//   0% {
//     width: 170px;
//     opacity: 1;
//   }
//   38% {
//     opacity: 1;
//   }
//   60% {
//     opacity: 0;
//   }
//   80% {
//     width: 20px;
//   }
//   100% {
//     width: 20px;
//     opacity: 0;
//   }
// `

// const miniShorten = keyframes`
//   0% {
//     width: 150px;
//     opacity: 1;
//   }
//   38% {
//     opacity: 1;
//   }
//   60% {
//     opacity: 0;
//   }
//   80% {
//     width: 20px;
//   }
//   100% {
//     width: 20px;
//     opacity: 0;
//   }
// `

const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(-180px);
  }
  100% {
    transform: translateX(-180px);
  }
`

const miniMoveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(-130px);
  }
  100% {
    transform: translateX(-130px);
  }
`

const animationDuration = 2000 // ms

const Container = styled.div`
  background: #124810;
  width: 100%;
  padding: 5px;
  min-height: 100vh;
`

const Popup = styled.div`
  border-radius: 8px;
  background-color: #ffffff;
  border: solid 5px #000000;
  max-width: 550px;
  min-width: 310px;
  width: 98%;
  margin: 0 auto;
  ${mq.desktopAbove`
    margin-top: 42px;
  `}
`

const DescBlock = styled.div`
  padding: 16px 20px 15px 16px;
  ${mq.desktopAbove`
    padding: 25px 50px 30px 50px;
  `}
`

const Title = styled.div`
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  line-height: 1;
  letter-spacing: 5px;
  text-align: center;
  color: #000000;
  margin-bottom: 10px;
`

const Text = styled.div`
  font-size: 18px;
  font-weight: ${fontWeight.regular};
  line-height: 1.67;
  text-align: justify;
  color: ${props => (props.revert ? '#fff' : '#000')};
`
const Footnote = styled.div`
  color: #f5c551;
  font-size: 16px;
  font-weight: ${fontWeight.regular};
  margin-top: .2em;
`

const ExampleBlock = styled.div`
  padding: 15px 18px 13px 18px;
  ${mq.desktopAbove`
    padding: 25px 50px 30px 50px;
  `}
  background-color: #58882d;
  border-radius: 0 0 3px 3px;
`

const ExampleGraph = styled.div`
  position: relative;
  width: 100%;
  max-width: 340px;
  margin: 15px auto 0 auto;
`

const PlayerAvatar = styled.div`
  background-image: url(${playerImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  position: absolute;
  right: 5%;
  top: 12px;
  animation: ${moveLeft} ${animationDuration * 1.2}ms ease-out 2200ms infinite;
  ${mq.miniOnly`
    animation: ${miniMoveLeft} ${animationDuration * 1.2}ms ease-out 2200ms infinite;
  `}
  >img {
    width: 74px;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(35%, 35%);
  }
`

const Medal = styled.div`
  width: 81px;
  height: 120px;
  background-image: url(${medal01Image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  left: 18px;
  position: relative;
`

const ClosedButton = styled.div`
  max-width: 375px;
  width: 98%;
  height: 45px;
  line-height: 35px;
  margin: 5px auto;
  ${mq.desktopAbove`
    width: 345px;
    height: 60px;
    line-height: 50px;
    margin: 27px auto 0 auto;
  `}
  font-weight: ${fontWeight.bold};
  border-radius: 8px;
  background-color: #ffffff;
  color: #000;
  border: solid 5px #000000;
  font-size: 20px;
  >img {
    transform: translateY(3px);
    margin-left: .3em;
    width: 20px;
  }
  letter-spacing: 5px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 300ms ease;
  &:hover {
    background-color: #ccc;
  }
`

// const SvgWrapper = styled.div`
//   position: absolute;
//   top: 35px;
//   left: 70px;
//   animation: ${shorten} ${animationDuration * 1.2}ms ease-out 2200ms both infinite;
//   ${mq.miniOnly`
//     animation: ${miniShorten} ${animationDuration * 1.2}ms ease-out 2200ms both infinite;
//   `}
// `

// const arrowSvg = (
//   <svg viewBox="0 0 170 28" height="28px" width="100%" preserveAspectRatio="xMinYMin slice">
//     <defs>
//       <marker
//         id="arrow"
//         markerWidth="28"
//         markerHeight="28"
//         refX="0"
//         refY="14"
//         orient="auto"
//         markerUnits="userSpaceOnUse"
//         viewBox="0 0 28 28"
//       >
//         <path
//           d="M0,0 0,28 28,14 Z"
//           fill="#000"
//         />
//       </marker>
//     </defs>
//     <line
//       x1="170"
//       y1="14"
//       x2="28"
//       y2="14"
//       stroke="#000"
//       strokeWidth="11"
//       markerEnd="url(#arrow)"
//     />
//   </svg>
// )


export default class Manual extends PureComponent {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
  }

  goToSelection = (e) => {
    e.preventDefault()
    const { goTo } = this.props
    return goTo(routes.selection.path)
  }

  render() {
    return (
      <Container>
        <Popup>
          <DescBlock>
            <Title>{text.title}</Title>
            <Text>{text.desc}</Text>
          </DescBlock>
          <ExampleBlock>
            <Text revert>{text.step}</Text>
            <Footnote>{text.footnote}</Footnote>
            <ExampleGraph>
              <Medal />
              {/* <SvgWrapper>{arrowSvg}</SvgWrapper> */}
              <PlayerAvatar>
                <img src={fingerImage} alt="finger" />
              </PlayerAvatar>
            </ExampleGraph>
          </ExampleBlock>
        </Popup>
        <ClosedButton onClick={this.goToSelection}>關閉說明<img src={closeIcon} alt="close" /></ClosedButton>
      </Container>
    )
  }
}
