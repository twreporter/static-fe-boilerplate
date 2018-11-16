import styled, { keyframes } from 'styled-components'

const bounceNext = keyframes`
  0%, 20%, 53%, 80%, 100% {
      animation-timing-function: cubic-bezier(.215,.61,.355,1);
      transform: translate3d(-75%,0,0);
  }

  40%, 43% {
      animation-timing-function: cubic-bezier(.755,.05,.855,.06);
      transform: translate3d(-25px,0,0);
  }

  70% {
      animation-timing-function: cubic-bezier(.755,.05,.855,.06);
      transform: translate3d(-20px,0,0);
  }

  90% {
      transform: translate3d(-100%,0,0);
  }
`

const bouncePrev = keyframes `
  0%, 20%, 53%, 80%, 100% {
      animation-timing-function: cubic-bezier(.215,.61,.355,1);
      transform: translate3d(75%,0,0) scaleX(-1);
  }

  40%, 43% {
      animation-timing-function: cubic-bezier(.755,.05,.855,.06);
      transform: translate3d(25px,0,0) scaleX(-1);
  }

  70% {
      animation-timing-function: cubic-bezier(.755,.05,.855,.06);
      transform: translate3d(20px,0,0) scaleX(-1);
  }

  90% {
      transform: translate3d(100%,0,0) scaleX(-1);
  }
`

const shiftNext = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
    transform: translate3d(0,0,0);
  }
  50% {
    animation-timing-function: cubic-bezier(.755,.05,.855,.06);
    transform: translate3d(-5px,0,0);
  }
`

const shiftPrev = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(.215,.61,.355,1);
    transform: translate3d(0,0,0) scaleX(-1);
  }
  50% {
    animation-timing-function: cubic-bezier(.755,.05,.855,.06);
    transform: translate3d(5px,0,0) scaleX(-1);
  }
`

const breathe = keyframes`
  0%, 100% {
    animation-timing-function: linear;
    transform: scale(1);
  }
  50% {
    animation-timing-function: linear;
    transform: scale(0.8);
  }
`

const bounceUpDown = keyframes`
	0%, 100%, 20%, 50%, 80% {
		-webkit-transform: translateX(-50%) translateY(0);
		-ms-transform:     translateX(-50%) translateY(0);
		transform:         translateX(-50%) translateY(0)
	}
	40% {
		-webkit-transform: translateX(-50%) translateY(-10px);
		-ms-transform:     translateX(-50%) translateY(-10px);
		transform:         translateX(-50%) translateY(-10px)
	}
	60% {
		-webkit-transform: translateX(-50%) translateY(-5px);
		-ms-transform:     translateX(-50%) translateY(-5px);
		transform:         translateX(-50%) translateY(-5px)
	}
`

const toTransparent = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
` 

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export default { 
  bounceNext, bouncePrev, shiftNext, shiftPrev, breathe, bounceUpDown, toTransparent, fadeIn
}
