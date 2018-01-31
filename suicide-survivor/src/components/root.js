/* eslint no-unused-expressions: 0 */
import Banner from './banner'
import introData from '../data/intro'
import LandingImg from './landing-img'
import LandingText from './landing-text'
import React from 'react'
import Sections from './sections/section-factory'
import SideBar from './side-bar'
import styled, { injectGlobal } from 'styled-components'
import Waypoint from 'react-waypoint'
import { scrollLocker } from '../utils/scroll-manager'
import blankAudio from '../../static/blank.mp3'

const {
  SectionOne, SectionTwo, SectionThree, SectionFour,
} = Sections

injectGlobal`
  body {
    overflow-x: hidden;
    width: 100%;
  }
`
const Container = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  text-align: center;
`

const anchors = [
  {
    id: 'intro',
    label: '',
  }, {
    id: 'section-1',
    label: '贖罪與共存',
  }, {
    id: 'section-2',
    label: '當恐懼再現',
  }, {
    id: 'section-3',
    label: '一生的對話',
  }, {
    id: 'section-4',
    label: '訴說與聆聽',
  },
]

const Intro = styled.div`
  width: 100%;
  background-color: #F2F2F2;
`
const getOffsetTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toShowSideBar: false,
      sideBarColor: '',
    }
    this.toggleSideBar = this._toggleSideBar.bind(this)
    this.changeSideBarColor = this._changeSideBarColor.bind(this)
    this.audioInitated = this._audioIninitated.bind(this)
    this.playAllAudios = this._playAllAudios.bind(this)
    this.offsetTop = 0
    this.sectionOne = {}
    this.audios = []
  }

  componentDidMount() {
    this._AutoPlayHandler()
    if (this.sectionOne) {
      if (getOffsetTop() >= this.sectionOne.offsetTop) {
        this._toggleSideBar(true)
      }
    }
  }

  _playAllAudios() {
    for (const a of this.audios) {
      if (typeof a === 'object') {
        a.play()
        a.pause()
      }
    }
  }

  _audioIninitated(audio) {
    this.audios.push(audio)
  }

  _AutoPlayHandler() {
    const fakeAudio = new Audio(blankAudio)
    fakeAudio.play()
      .then(() => {
        console.log('the browser has funstional auto-play')
      })
      .catch(() => {
        console.log('the browser block auto-paly')
        scrollLocker()
      })
  }

  _toggleSideBar(bool) {
    if (bool !== this.state.toShowSideBar) {
      this.setState({
        toShowSideBar: bool,
      })
    }
  }

  _changeSideBarColor(color) {
    this.setState({
      sideBarColor: color,
    })
  }

  render() {
    return (
      <Container>
        <SideBar
          anchors={anchors}
          ifshowUp={this.state.toShowSideBar}
          textColor={this.state.sideBarColor}
        >
          <Intro>
            <Waypoint
              onEnter={() => {
                this.toggleSideBar(false)
              }}
              onLeave={() => {
                this.toggleSideBar(true)
              }}
              fireOnRapidScroll
            >
              <div>
                <LandingImg
                  title={introData.title}
                  image={introData.image}
                  playAllAudios={this.playAllAudios}
                />
                <Banner />
                <LandingText />
              </div>
            </Waypoint>
          </Intro>
          <div ref={(node) => { this.sectionOne = node }} >
            <SectionOne
              audioInitated={this.audioInitated}
            />
          </div>
          <SectionTwo
            audioInitated={this.audioInitated}
          />
          <Waypoint
            onEnter={() => {
              this.offsetTop = getOffsetTop()
              this.changeSideBarColor('white')
            }}
            onLeave={() => {
              if (getOffsetTop() >= this.offsetTop) {
                this.changeSideBarColor('#4a4949')
              }
            }}
            fireOnRapidScroll
          >
            <div>
              <SectionThree
                audioInitated={this.audioInitated}
              />
            </div>
          </Waypoint>
          <SectionFour />
        </SideBar>
      </Container>
    )
  }
}
