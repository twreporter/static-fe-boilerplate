import React from 'react'
import get from 'lodash.get'
import padStart from 'lodash.padstart'

const projectName = 'inforgraphic-fpc-sixth-naphtha-cracker-growth'

const _ = {
  get,
  padStart,
}

class GaManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {} // index: timestamp
  }

  componentDidMount() {
    const thisIndex = _.get(this.props, 'currentIndex')
    const now = Date.now()
    this._submitPageViewEvent(thisIndex)
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      [thisIndex]: now,
    })
  }

  componentDidUpdate(prevProps) {
    const prevIndex = _.get(prevProps, 'currentIndex')
    const thisIndex = _.get(this.props, 'currentIndex')
    if (prevIndex !== thisIndex) {
      /* if page changed */
      const now = Date.now()
      /* 1. send page view */
      this._submitPageViewEvent(thisIndex)
      /* 2. calculate and send prev time */
      const prevStart = _.get(this.state, prevIndex)
      const readTime = now - prevStart
      if (readTime > 0) {
        this._submitReadTimeEvent(prevIndex, readTime)
      }
      /* 3. push this timestamp to state */
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        [thisIndex]: now,
      })
    }
  }
  _submitPageViewEvent(index) {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'infographics_tracking', {
        event_category: projectName,
        event_action: 'view',
        screen_name: `section-${_.padStart(index, 2, '0')}`,
        event_label: `section-${_.padStart(index, 2, '0')}`,
      })
    }
  }

  _submitReadTimeEvent(index, readTime) {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'timing_complete', {
        value: readTime,
        event_category: projectName,
        name: 'view',
        event_label: `section-${_.padStart(index, 2, '0')}`,
      })
    }
  }

  render() {
    return null
  }
}

export default GaManage
