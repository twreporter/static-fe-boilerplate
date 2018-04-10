import React from 'react'
import line from '../../static/area-12/line.png'
import readMore from '../../static/footer/read-more.png'
import readMoreHover from '../../static/footer/read-more-hover.png'
import topicIcon from '../../static/footer/topic.png'
import styled from 'styled-components'

const Related = styled.div`
  display: block;
  margin-bottom: 13px;
`

const RelatedIcon = styled.img`
  display: inline-block;
  width: 22px;
  margin: 7px;
  line-height: 30px;
  vertical-align: middle;
`

const RelatedText = styled.span`
  width: 90%;
  display: inline-block;
  font-size: 18px;
  color: #fff;
  vertical-align: middle;
  text-decoration: none;
  line-height: 1.56;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
  }
`

const Link = styled.a`
  display: block;
  position: relative;

  > img:first-child {
    visibility: visible;
  }

  > img:last-child {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
  }
  :hover {
    > img:first-child {
      visibility: hidden;
    }

    > img:last-child {
      visibility: visible;
    }
  }
`

const Team = styled.ul`
  padding: 0  0 50px 0;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 18px;
  white-space: pre-line;

  @media only screen and (min-width: 768px) {
    font-size: 22px;
  }

  > li {
    display: block;
    line-height: 2;
  }
`

export default class Footer extends React.PureComponent {
  render() {
    return (
      <footer
        style={{
          marginTop: '35px',
        }}
      >
        <Related>
          <RelatedIcon src={topicIcon} />
          <RelatedText>完整專題請見：</RelatedText>
        </Related>
        <Link href="https://www.twreporter.org/topics/child-health-care-taiwan" target="_blank">
          <img alt="專題報導" src={readMore} width="100%" />
          <img alt="專題報導" src={readMoreHover} width="100%" />
        </Link>
        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            marginBottom: '40px',
          }}
        >
          <img
            alt="底線"
            src={line}
            style={{
              width: `${126 / 375 * 100}%`,
            }}
          />
        </div>
        <Team>
          <li>文字、資料分析｜蔣宜婷、陳貞樺</li>
          <li>設計｜黃禹禛</li>
          <li>工程｜李法賢</li>
          <li>監製｜楊惠君</li>
        </Team>
      </footer>
    )
  }
}
