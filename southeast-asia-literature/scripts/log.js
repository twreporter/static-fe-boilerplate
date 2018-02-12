/* eslint no-console:0 */
const logMesAndPassDownArg = message => (passedBy) => {
  console.log(message)
  return passedBy
}

module.exports = {
  logMesAndPassDownArg,
}
