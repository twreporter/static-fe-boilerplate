/* eslint no-unused-expressions: 0 */
import Article from './article'
import Credits from './credits'
import Header from './header'
import ImgLeftTextRightBlock from './img-left-text-right-block'
import Progress01 from '../../static/progress-01.svg'
import Progress02 from '../../static/progress-02.svg'
import Progress03 from '../../static/progress-03.svg'
import Progress04 from '../../static/progress-04.svg'
import Progress05 from '../../static/progress-05.svg'
import Progress06 from '../../static/progress-06.svg'
import React from 'react'
import SideBar from './side-bar'
import SingleColumnPictureDesktop from './single-column-picture-desktop'
import SingleColumnPictureMobile from './single-column-picture-mobile'
import SingleColumnPictureTablet from './single-column-picture-tablet'
import article from '../data/article'
import section01 from '../data/section-01'
import section02 from '../data/section-02'
import section03 from '../data/section-03'
import section04 from '../data/section-04'
import section05 from '../data/section-05'
import section06 from '../data/section-06'
import styled, { injectGlobal } from 'styled-components'
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
  background-color: #f2f2f2;
  width: 100%;
  text-align: center;
`

const WhiteBGContainer = styled.div`
  background-color: #FFF;
`

const anchors = [
  {
    id: 'intro',
    label: () => { return null },
  }, {
    id: 'section-1',
    label: Progress01,
  }, {
    id: 'section-2',
    label: Progress02,
  }, {
    id: 'section-3',
    label: Progress03,
  }, {
    id: 'section-4',
    label: Progress04,
  }, {
    id: 'section-5',
    label: Progress05,
  }, {
    id: 'section-6',
    label: Progress06,
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
          <div>
            <Header image={image} title={title} />
            <Credits credits={credits} />
            <Article content={content} />
          </div>
          <div>
            <SingleColumnPictureMobile
              {...section01}
              ProgressSVG={Progress01}
            />
            <SingleColumnPictureTablet {...section01} />
            <SingleColumnPictureDesktop {...section01} />
            <Interview {...section01} />
          </div>
          <div>
            <SingleColumnPictureMobile
              {...section02}
              ProgressSVG={Progress02}
            />
            <SingleColumnPictureTablet {...section02} />
            <SingleColumnPictureDesktop {...section02} />
            <Interview {...section02} />
          </div>
          <div>
            <SingleColumnPictureMobile
              {...section03}
              ProgressSVG={Progress03}
            />
            <SingleColumnPictureTablet {...section03} />
            <SingleColumnPictureDesktop {...section03} />
            <Interview {...section03} />
          </div>
          <WhiteBGContainer>
            <ImgLeftTextRightBlock
              {...section04}
              ProgressSVG={Progress04}
            />
            <Underline> </Underline>
          </WhiteBGContainer>
          <WhiteBGContainer>
            <ImgLeftTextRightBlock
              {...section05}
              ProgressSVG={Progress05}
            />
            <Underline> </Underline>
          </WhiteBGContainer>
          <ImgLeftTextRightBlock
            {...section06}
            ProgressSVG={Progress06}
          />
        </SideBar>
      </Container>
    )
  }
}
