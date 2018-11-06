export const defaultEnter = {
  animation: {
    opacity: [1, 0],
    translateY: [0, '30px'],
  },
  duration: 250,
  delay: 500,
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
