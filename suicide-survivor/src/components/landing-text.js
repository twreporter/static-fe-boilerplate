import React from 'react'
import Intro from '../data/intro'
import PlainText from './utils/plain-text-section'

const LandingText = () => {
  return (
    <div>
      <PlainText
        content={Intro.content}
        fontWeight={400}
      />
    </div>
  )
}


export default LandingText
