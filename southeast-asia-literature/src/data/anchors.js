// import VietnamIcon from '../../svg/side-bar-icons/Vietnam.svg'
// import PhilippineIcon from '../../svg/side-bar-icons/Philippine.svg'
// import ThailandIcon from '../../svg/side-bar-icons/Thailand.svg'
// import MyanmarIcon from '../../svg/side-bar-icons/Myanmar.svg'
// import MalaysiaIcon from '../../svg/side-bar-icons/Malaysia.svg'

import vietnamIcon from '../../static/icons/Vietnam.png'
import philippineIcon from '../../static/icons/Philippine.png'
import thailandIcon from '../../static/icons/Thailand.png'
import myanmarIcon from '../../static/icons/Myanmar.png'
import malaysiaIcon from '../../static/icons/Malaysia.png'

import React from 'react' // eslint-disable-line no-unused-vars

const anchors = [
  {},
  {
    id: 'thailand',
    text: '泰國',
    // label: ThailandIcon,
    label: thailandIcon,
  },
  {
    id: 'myanmar',
    text: '緬甸',
    // label: MyanmarIcon,
    label: myanmarIcon,
  },
  {
    id: 'vietnam',
    text: '越南',
    // label: VietnamIcon,
    label: vietnamIcon,
  },
  {
    id: 'malaysia',
    text: '馬來西亞',
    // label: MalaysiaIcon,
    label: malaysiaIcon,
  },
  {
    id: 'philippine',
    text: '菲律賓',
    // label: PhilippineIcon,
    label: philippineIcon,
  },
]

export default anchors
