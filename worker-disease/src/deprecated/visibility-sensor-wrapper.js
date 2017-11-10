// import React from 'react'
// import VisibilitySensor from 'react-visibility-sensor'
// import PropTypes from 'prop-types'

// /*
//   1. Active animation by pass prop `toAnimate` as `true` when seen
//   2. Disable sensor after animation is activated
// */
// const activeAnimationWhenSeenWrapper = (WrappedComponent) => {
//   return class EnhancedComponent extends WrappedComponent {
//     static propTypes = {
//       sensorOptions: PropTypes.object,
//     }

//     state = {
//       toAnimate: false,
//     }

//     _handleSeen = (isVisible) => {
//       if (isVisible) {
//         return this.setState({
//           toAnimate: true,
//         })
//       }
//     }

//     render() {
//       const { toAnimate } = this.state
//       const { sensorOptions, ...otherProps } = this.props
//       return (
//         <VisibilitySensor
//           active={!toAnimate}
//           onChange={this._handleSeen}
//           {...sensorOptions}
//         >
//           <WrappedComponent
//             toAnimate={toAnimate}
//             {...otherProps}
//           />
//         </VisibilitySensor>
//       )
//     }
//   }
// }

// export default activeAnimationWhenSeenWrapper
