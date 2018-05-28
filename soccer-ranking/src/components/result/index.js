import { colors } from '../../constants/style'
import ComparedRanking from './compared-ranking'
import Credit from './credit'
import Footer from '@twreporter/react-components/lib/footer'
import MainTitle from './main-title'
import PropTypes from 'prop-types'
import RankingWithIndex from './ranking-with-index'
import React, { PureComponent } from 'react'
import RelatedArticles from './related-articles'
import SimpleRanking from './simple-ranking'
import styled from 'styled-components'


const text = {
  mailTitle: '世界盃球員成就榜揭曉',
}

const Container = styled.div`
  background-color: ${colors.selectionBg};
  position: relative;
  width: 100%;
  overflow-x: hidden;
`

export default class Result extends PureComponent {
  static propTypes = {
    withSelection: PropTypes.bool.isRequired,
    goTo: PropTypes.func.isRequired,
    userRanking: PropTypes.array,
  }

  static defaultProps = {
    userRanking: [],
  }

  render() {
    const { withSelection, goTo, userRanking } = this.props
    return (
      <Container>
        <MainTitle content={text.mailTitle} />
        {withSelection ? <ComparedRanking userRanking={userRanking} goTo={goTo} /> : <SimpleRanking goTo={goTo} />}
        <RankingWithIndex />
        <RelatedArticles />
        <Credit />
        <Footer
          bgColor="#6CA538"
          fontColor="#fff"
        />
      </Container>
    )
  }
}
