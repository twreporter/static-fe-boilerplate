import curry from 'lodash.curry'

const _ = {
  curry,
}

const checkIfCurrentIndexNearIndex = range => (currentIndex, index) => {
  if (Array.isArray(index)) {
    const min = index[0]
    const max = index[1]
    return (min - range <= currentIndex) && (currentIndex <= max + range)
  }
  return (index - range <= currentIndex) && (currentIndex <= index + range)
}

export const isCurrnetIndexNextToIndex = _.curry(checkIfCurrentIndexNearIndex(1))

export const checkIfCINextToIInData = currentIndex => (data) => {
  return isCurrnetIndexNextToIndex(currentIndex)(data.index)
}
