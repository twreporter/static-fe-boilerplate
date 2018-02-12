import map from 'lodash.map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ContentContainer from './content-width'

const _ = {
  map,
}

const backgroundColor = '#fff'

const Container = styled.div`
  position: relative;
  background-color: ${backgroundColor};
`

const Translator = styled.div``

const Letter = styled.div`
  font-weight: 400;
  line-height: 1.94;
  padding: 10px 0;
  box-sizing: border-box;
`

const P = styled.p`
  margin: 0;
  margin-bottom: .62em;
`

const Thai = Letter.extend`
  font-family: 'Noto Sans Thai', sans-serif;
`

const Burmese = Letter.extend`
  font-family: 'Noto Sans Myanmar', sans-serif;
  line-height: 1.6;
`

const selectLetterByLanguage = (lang) => {
  switch (lang) {
    case 'thai':
      return Thai
    case 'burmese':
      return Burmese
    default:
      return Letter
  }
}

const OriginTitle = styled.div`

`

class LetterBlock extends React.PureComponent {
  static propTypes = {
    chinese: PropTypes.arrayOf(PropTypes.string),
    origin: PropTypes.arrayOf(PropTypes.string),
    translator: PropTypes.arrayOf(PropTypes.string),
    lang: PropTypes.string,
  }
  static defaultProps = {
    chinese: [],
    origin: [],
    translator: [],
    lang: '',
  }
  _buildParagraph = (p, i) => (<P key={i} dangerouslySetInnerHTML={{ __html: p }} />)
  render() {
    const { chinese, origin, translator, lang } = this.props
    const LetterByLang = selectLetterByLanguage(lang)
    return (
      <Container>
        <ContentContainer>
          {!translator.length ? null : <Translator>{`翻譯／${translator.join('、')}`}</Translator>}
          {!chinese.length ? null : <Letter>{_.map(chinese, this._buildParagraph)}</Letter>}
          {!origin.length ? null : (
            <React.Fragment>
              <OriginTitle>原文：</OriginTitle>
              <LetterByLang>{_.map(origin, this._buildParagraph)}</LetterByLang>
            </React.Fragment>
          )}
        </ContentContainer>
      </Container>
    )
  }
}

export default LetterBlock
