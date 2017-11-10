
export const defaultEnter = {
  animation: {
    opacity: [1, 0],
    translateY: [0, '30px'],
  },
  duration: 500,
  delay: 1300,
  interruptBehavior: 'stop',
}

export const defaultLeave = {
  animation: {
    translateY: '-30px',
    opacity: 0,
  },
  duration: 200,
  interruptBehavior: 'finish',
}

export const defaultStyle = {
  // opacity: 0,
}
