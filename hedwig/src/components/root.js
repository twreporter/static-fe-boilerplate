/* eslint no-unused-expressions: 0 */
import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Header from './header'
import article from '../data/article'
import Credits from './credits'
import Article from './article'
import section01 from '../data/section-01'
import section02 from '../data/section-02'
import section03 from '../data/section-03'
import SingleColumnPictureMobile from './single-column-picture-mobile'
import SingleColumnPictureTablet from './single-column-picture-tablet'
import SingleColumnPictureDesktop from './single-column-picture-desktop'
import ImgLeftTextRightBlock from './img-left-text-right-block'
import Progress04SVG from '../../static/progress-3.svg'
import React from 'react'
import Section04Data from '../data/section-04'
import Section05Data from '../data/section-05'
import Section06Data from '../data/section-06'
import SideBar from './side-bar'
import styled from 'styled-components'
import { screen } from './styles/utils'


import Interview from './interview'

injectGlobal`
  body, html {
  }
`

const {
  image,
  title,
  content,
  credits,
} = article

const Container = styled.div`
  background-color: #FFF;
  width: 100%;
  text-align: center;
`

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
        <Header image={image} title={title} />
        <Credits credits={credits} />
        <Article content={content} />
        <SingleColumnPictureMobile {...section01} />
        <SingleColumnPictureTablet {...section01} />
        <SingleColumnPictureDesktop {...section01} />
        <Interview {...section01} />
        <SingleColumnPictureMobile {...section02} />
        <SingleColumnPictureTablet {...section02} />
        <SingleColumnPictureDesktop {...section02} />
        <Interview {...section02} />
        <SingleColumnPictureMobile {...section03} />
        <SingleColumnPictureTablet {...section03} />
        <SingleColumnPictureDesktop {...section03} />
        <Interview {...section03} />
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
