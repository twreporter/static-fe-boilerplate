import ImgLeftTextRightBlock from './img-left-text-right-block'
import Progress04SVG from '../../static/progress-3.svg'
import React from 'react'
import Section04Data from '../data/section-04'
import Section05Data from '../data/section-05'
import Section06Data from '../data/section-06'
import SideBar from './side-bar'
import styled from 'styled-components'
import { screen } from './styles/utils'

const anchors = [
  {
    id: 'intro',
    label: '',
  }, {
    id: 'section-1',
    label: '1',
  }, {
    id: 'section-2',
    label: '2',
  }, {
    id: 'section-3',
    label: '3',
  }, {
    id: 'section-4',
    label: '4',
  }, {
    id: 'section-5',
    label: '5',
  }, {
    id: 'section-6',
    label: '6',
  },
]

const Container = styled.div`
  background-color: #FFF;
  width: 100%;
  text-align: center;
`

const Header = styled.div``

const LeadingImage = styled.div``

const Introduction = styled.div`
  height: 100vh;
  background-color: grey;
`

const SectionOne = styled.div`
  height: 100vh;
  background-color: red;
`

const SectionTwo = styled.div`
  height: 100vh;
  background-color: orange;
`

const SectionThree = styled.div`
  height: 100vh;
  background-color: yellow;
`

const SectionFour = styled.div`
  height: 100vh;
  background-color: green;
`

const SectionFive = styled.div`
  height: 100vh;
  background-color: blue;
`

const SectionSix = styled.div`
  height: 100vh;
  background-color: purple;
`

const Underline = styled.div`
  display: none;
  ${screen.desktopAbove`
    border: solid 1px #a67a44;
    display:block;
    margin: 0 auto;
    white-space: pre-line;
    width: 115px;
  `}
`

export default class Root extends React.Component {
  render() {
    return (
      <Container>
        <SideBar
          anchors={anchors}
        >
          <div>
            <Header />
            <LeadingImage />
            <Introduction />
          </div>
          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <div>
            <ImgLeftTextRightBlock
              {...Section04Data}
              ProgressSVG={Progress04SVG}
            />
            <Underline> </Underline>
          </div>
          <div>
            <ImgLeftTextRightBlock
              {...Section05Data}
              ProgressSVG={Progress04SVG}
            />
            <Underline> </Underline>
          </div>
          <ImgLeftTextRightBlock
            {...Section06Data}
            ProgressSVG={Progress04SVG}
          />
        </SideBar>

      </Container>
    )
  }
}
