import React from 'react'
import moreImg from '../../static/footer/read-more.png'
import styled from 'styled-components'

const Relateds = styled.ul`
  padding: 0;
`

const Related = styled.li`
  display: block;
  margin-bottom: 20px;
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

  @media only screen and (min-width: 768px) {
    font-size: 22px;
  }
`

const Line = styled.div`
  width: 150px;
  border: 1px solid white;
  margin: 40px auto;
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
      <footer>
        <Relateds>
          <Related>
            <RelatedIcon src={moreImg} />
            <RelatedText>child-health-care-save-their-lives</RelatedText>
          </Related>
          <Related>
            <RelatedIcon src={moreImg} />
            <RelatedText>child-health-care-children-hospital-no-resource</RelatedText>
          </Related>
          <Related>
            <RelatedIcon src={moreImg} />
            <RelatedText>child-health-care-children-remote-areas</RelatedText>
          </Related>
        </Relateds>
        <Line />
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
