// /* eslint global-require: 0 */

// import React from 'react'
// import styled from 'styled-components'
// import SectionContainer from './section-container'
// import FallenBuilding from '../static/fallen-building.svg'
// import FallenDead from '../static/fallen-dead.svg'
// import FallenPerson from '../static/fallen-person.svg'
// import { pxToRem } from '../utils/styled-utils'
// import VelocityComponent from 'velocity-react/velocity-component'
// import VelocityHelpers from 'velocity-react/velocity-helpers'
// import get from 'lodash.get'
// import activeAnimationWhenSeenWrapper from './visibility-sensor-wrapper'
// import PropTypes from 'prop-types'

// const _ = {
//   get,
// }

// if (typeof window !== 'undefined') {
//   require('velocity-animate')
//   require('velocity-animate/velocity.ui')
// }

// const GraphContainer = styled.div`
//   position: relative;
//   width: ${pxToRem(500)};
//   height: ${pxToRem(500)};
//   border: solid 1px grey;
// `

// const BuildingWrapper = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: ${pxToRem(300)};
// `

// const PersonWrapper = styled.div`
//   position: absolute;
//   width: ${pxToRem(25)};
//   bottom: ${pxToRem(233)};
//   left: ${pxToRem(230)};
// `

// const DeadWrapper = styled.div`
//   position: absolute;
//   bottom: ${pxToRem(-3)};
//   left: ${pxToRem(250)};
//   width: ${pxToRem(60)};
//   opacity: 0;
// `

// const MoveRight = [{
//   translateX: pxToRem(1),
// }, 0.1, {
//   easing: 'swing',
// }]
// const MoveLeft = [{
//   translateX: pxToRem(-3),
// }, 0.1, {
//   easing: 'swing',
// }]
// const fallen = [{
//   translateY: pxToRem(233),
//   translateX: pxToRem(32),
//   rotateZ: '130deg',
// }, 0.7, {
//   easing: 'ease-in',
// }]
// const hide = [{
//   rotateZ: '93deg',
//   translateY: pxToRem(254),
//   scaleY: 0.95,
//   scaleX: 0.4,
//   opacity: 0,
// }, 0.06]

// const personFalling = VelocityHelpers.registerEffect({
//   defaultDuration: 2000,
//   calls: [MoveRight, MoveLeft, MoveRight, MoveLeft, fallen, hide],
// })

// class SectionSample extends React.PureComponent {
//   state = {
//     isDead: false,
//   }

//   _handleDead = () => {
//     this.setState({
//       isDead: true,
//     })
//   }
//   render() {
//     const { isDead } = this.state
//     const { toAnimate } = this.props
//     return (
//       <SectionContainer>
//         <GraphContainer>
//           <BuildingWrapper><FallenBuilding /></BuildingWrapper>
//           <VelocityComponent
//             animation={toAnimate ? personFalling : ''}
//             duration={1000}
//             complete={this._handleDead}
//           >
//             <PersonWrapper><FallenPerson /></PersonWrapper>
//           </VelocityComponent>
//           <VelocityComponent
//             animation={isDead ? {
//               opacity: 1,
//               scaleY: 1,
//             } : {
//               opacity: 0,
//               scaleY: 0.5,
//             }}
//             duration={100}
//           >
//             <DeadWrapper><FallenDead /></DeadWrapper>
//           </VelocityComponent>
//         </GraphContainer>
//       </SectionContainer>
//     )
//   }
// }

// SectionSample.propTypes = {
//   toAnimate: PropTypes.bool.isRequired,
// }

// export default activeAnimationWhenSeenWrapper(SectionSample)
