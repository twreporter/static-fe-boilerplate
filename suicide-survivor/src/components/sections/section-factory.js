import React from 'react'
import SectionOneData from '../../data/section-one'
import SectionTwoData from '../../data/section-two'
import SectionThreeData from '../../data/section-three'
import SectionFour from './section-four'
import SectionPrototype from './section-prototype'
import PropTypes from 'prop-types'

const style = {
  sectionOne: {
    background: {
      from: '#241044',
      to: '#382862',
    },
    audio: {
      duration: '#6b4fee',
      progress: '#a086f1',
    },
  },
  sectionTwo: {
    background: {
      from: '#382862',
      to: '#2d367e',
    },
    audio: {
      duration: '#4584ff',
      progress: '#79a7ff',
    },
  },
  sectionThree: {
    background: {
      from: '#2d367e',
      to: '#639ac0',
    },
    audio: {
      duration: '#6fcff5',
      progress: '#a4dbf7',
    },
  },
}

const SectionOne = ({ audioInitated }) => {
  const { sectionOne } = style
  const { background, audio } = sectionOne
  return (
    <SectionPrototype
      data={SectionOneData}
      duratoinBarColor={audio.duration}
      currentBarColor={audio.progress}
      background={background}
      audioInitated={audioInitated}
    />
  )
}

SectionOne.propTypes = {
  audioInitated: PropTypes.func.isRequired,
}

const SectionTwo = ({ audioInitated }) => {
  const { sectionTwo } = style
  const { background, audio } = sectionTwo
  return (
    <SectionPrototype
      data={SectionTwoData}
      duratoinBarColor={audio.duration}
      currentBarColor={audio.progress}
      background={background}
      audioInitated={audioInitated}
    />
  )
}

SectionTwo.propTypes = {
  audioInitated: PropTypes.func.isRequired,
}

const SectionThree = ({ audioInitated }) => {
  const { sectionThree } = style
  const { background, audio } = sectionThree
  return (
    <SectionPrototype
      data={SectionThreeData}
      duratoinBarColor={audio.duration}
      currentBarColor={audio.progress}
      background={background}
      audioInitated={audioInitated}
    />
  )
}

SectionThree.propTypes = {
  audioInitated: PropTypes.func.isRequired,
}

export default {
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
}
