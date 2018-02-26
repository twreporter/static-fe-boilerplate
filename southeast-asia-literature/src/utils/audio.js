function secsToMinSec(time) {
  const roundTime = Math.round(time)
  const seconds = roundTime % 60
  const minutes = (roundTime - seconds) / 60
  return {
    minutes,
    seconds,
  }
}

function padSeconds(seconds) {
  const secondsString = seconds.toString()
  return secondsString.length > 1 ? secondsString : `0${secondsString}`
}

function getMinSecStr(time) {
  const timeObj = secsToMinSec(time)
  const paddedSeconds = padSeconds(timeObj.seconds)
  return `${timeObj.minutes}:${paddedSeconds}`
}

function getDurationISO8601Format(time) {
  const timeObj = secsToMinSec(time)
  const paddedSeconds = padSeconds(timeObj.seconds)
  return `T${timeObj.minutes}M${paddedSeconds}S`
}

export {
  getDurationISO8601Format,
  getMinSecStr,
}
