export const scrollLocker = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.height = '100%'
    document.documentElement.style.overflowY = 'hidden'
    document.body.style.height = '100%'
    document.body.style.overflowY = 'hidden'
  }
}

export const scrollUnlocker = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.height = 'auto'
    document.documentElement.style.overflowY = 'visible'
    document.body.style.height = 'auto'
    document.body.style.overflowY = 'visible'
  }
}
