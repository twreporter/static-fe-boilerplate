/* eslint react/no-array-index-key:0 */
import ImgWrapper from './img-wrapper'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { screen } from './styles/utils'

const mockup = {
  hd: {
    width: '1133px',
    img: {
      width: '569px',
      height: '804px',
    },
    interview: {
      width: '498px',
    },
  },
  desktop: {
    width: '868px',
    img: {
      width: '400px',
      height: '566px',
    },
    interview: {
      width: '431px',
    },
  },
  tablet: {
    width: '556px',
    img: {
      width: '556px',
      height: '786px',
    },
    interview: {
      width: '556px',
    },
  },
  mobile: {
    interview: {
      width: `${(278 / 320) * 100}%`,
    },
  },
}

const OuterContainer = styled.div`
  width: 100%;
  background-color: #FFFFFF;
  margin: 0 auto;
  padding: 60px 0;

  ${screen.desktopBelow`
    padding: 30px 0;
  `}
`

const InnerContainer = styled.div`
  color: #4a4949;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${screen.desktopBelow`
    display: block;
    width: 100%;
  `}
`

const DesktopAboveHide = styled.div`
  ${screen.desktopAbove`
    display: none;
  `}
`

const DesktopBelowHide = styled.div`
  ${screen.desktopBelow`
    display: none;
  `}
`

const TabletAboveHide = styled.div`
  ${screen.tabletAbove`
    display: none;
  `}
`

const ImgDesContainer = styled.div`
  ${screen.desktopBelow`
    width: ${mockup.tablet.img.width};
    margin: 0 auto;
    padding-bottom: 40px;
  `}
  ${screen.desktopAbove`
    flex: 0 0 ${mockup.desktop.img.width};
    margin-right: 37px;
  `}
  ${screen.hdAbove`
    flex: 0 0 ${mockup.hd.img.width};
    margin-right: 67px;
  `}
  ${screen.tabletBelow`
    width: 100%;
    padding-bottom: 45px;
  `}
`

const ImgContainer = styled.div`
  ${screen.tabletAbove`
    height: ${mockup.tablet.img.height};
  `}
  ${screen.desktopAbove`
    height: ${mockup.desktop.img.height};
  `}
  ${screen.hdAbove`
    height: ${mockup.hd.img.height};
  `}
  ${screen.tabletBelow`
    height: auto;
  `}
`

const InterviewsContainer = styled.div`
  ${screen.desktopBelow`
    background-color: #e2e2e2;
    padding-bottom: 60px;
    padding-top: 60px;
    width: 100%;
  `}
  ${screen.desktopAbove`
    flex: 0 0 ${mockup.desktop.interview.width};
  `}
  ${screen.hdAbove`
    flex: 0 0 ${mockup.hd.interview.width};
  `}
`

const AuthorContainer = styled.div`
  position: relative;
  font-weight: bold;
  margin-bottom: ${props => props.marginBottom || '70px'};
  text-align: ${props => props.textAlign || 'left'};

  ${screen.desktopBelow`
    text-align: center;
    margin-bottom: 30px;
  `}

  ${screen.tabletBelow`
    text-align: left;
    margin-bottom: 25px;
    width: ${mockup.mobile.interview.width};
    margin-right: auto;
    margin-left: auto;
  `}

  ${screen.desktopAbove`
    text-align: left;
    margin-bottom: 70px;
  `}

`

const ProgressIndicator = styled.div`
  position: absolute;
  top:0 ;
  right: 0;
`

const Author = styled.div`
  font-size: 35px;
`

const JobTitle = styled.div`
  font-size: 16px;
`

const InterviewContainer = styled.div`
  margin-bottom: 60px;

  :last-child {
    margin-bottom: 0;
  }

  text-align: justify;
  ${screen.tabletBelow`
    width: ${mockup.mobile.interview.width};
    margin: 0 auto;
  `}
  ${screen.desktopBelow`
    max-width: 556px;
    margin: 0 auto 60px auto;
  `}
`

const Question = styled.div`
  font-size: 23px;
  font-weight: bold;
  line-height: 1.7;
  margin-bottom: 15px;
`

const Answer = styled.p`
  font-size: 18px;
  line-height: 1.94;
  margin-bottom: 60px;
  margin: 0;
`

const IllustrationDesc = styled.div`
  text-align: left;

  ${screen.desktopBelow`
    text-align: right;
  `}

  ${screen.tabletBelow`
    text-align: left;
    padding-left: 25px;
  `}
`

const ThinSpan = styled.span`
  font-size: ${props => props.fontSize || '12px'};
  font-weight: 300;
  line-height: 2.92;
  white-space: pre-wrap;
`

const BoldSpan = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 2.5;
  white-space: pre-wrap;
`

export default class ImgLeftTextRightBlock extends PureComponent {
  static propTypes = {
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      jobTitle: PropTypes.string,
      country: PropTypes.string,
      email: PropTypes.string,
      website: PropTypes.string,
    }).isRequired,
    illustration: PropTypes.shape({
      image: PropTypes.shape({
        resizedTargets: PropTypes.shape({
          mobile: PropTypes.string,
          tablet: PropTypes.string,
          desktop: PropTypes.string,
        }),
        alt: PropTypes.string,
      }),
      materials: PropTypes.string,
      size: PropTypes.shape({
        height: PropTypes.string,
        width: PropTypes.string,
      }),
      comment: PropTypes.string,
    }).isRequired,
    interviews: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
    ProgressSVG: PropTypes.func.isRequired,
  }

  render() {
    const {
      ProgressSVG, author, illustration, interviews,
    } = this.props
    const interviewsJSX = Array.isArray(interviews) ? interviews.map((interview, index) => {
      const answers = interview.answer
      const answersJSX = Array.isArray(answers) ? answers.map((answer, aIndex) => {
        return (
          <Answer key={`answer_${aIndex}`}>{answer}</Answer>
        )
      }) : null

      return (
        <InterviewContainer key={`interview_${index}`}>
          <Question>{interview.question}</Question>
          <div>
            {answersJSX}
          </div>
        </InterviewContainer>
      )
    }) : null

    const imgSrc = process.env.NODE_ENV === 'production' ?
      `https://storage.googleapis.com/twreporter-infographics/hedwig/${illustration.image.resizedTargets.tablet}` :
      illustration.image.resizedTargets.tablet

    return (
      <OuterContainer>
        <InnerContainer>
          <ImgDesContainer>
            <DesktopAboveHide>
              <AuthorContainer
                textAlign="left"
                marginBottom="30px"
              >
                <Author>
                  {author.name}
                </Author>
                <JobTitle>
                  {author.jobTitle}，{author.country}
                </JobTitle>
                <TabletAboveHide>
                  <ProgressIndicator>
                    <ProgressSVG />
                  </ProgressIndicator>
                </TabletAboveHide>
              </AuthorContainer>
            </DesktopAboveHide>
            <ImgContainer>
              <ImgWrapper
                alt={illustration.alt}
                src={imgSrc}
              />
            </ImgContainer>
            <IllustrationDesc>
              <div>
                <ThinSpan>媒材  </ThinSpan>
                <BoldSpan>{illustration.materials}</BoldSpan>
                <ThinSpan fontSize="14px">  |  </ThinSpan>
                <ThinSpan>作品尺寸  </ThinSpan>
                <BoldSpan>{illustration.size.width} X {illustration.size.height}</BoldSpan>
              </div>
              <div>
                <ThinSpan>{author.email}</ThinSpan>
              </div>
              <div>
                <ThinSpan>{illustration.comment}</ThinSpan>
              </div>
            </IllustrationDesc>
          </ImgDesContainer>
          <InterviewsContainer>
            <DesktopBelowHide>
              <AuthorContainer
                textAlign="center"
              >
                <Author>
                  {author.name}
                </Author>
                <JobTitle>
                  {author.jobTitle}，{author.country}
                </JobTitle>
              </AuthorContainer>
            </DesktopBelowHide>
            {interviewsJSX}
          </InterviewsContainer>
        </InnerContainer>
      </OuterContainer>
    )
  }
}

