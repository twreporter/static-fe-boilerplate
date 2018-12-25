/* eslint react/no-array-index-key:0 */
import Annotation from './annotation'
import BaseComponents from './base'
import BoxSvg from '../../static/infobox-logo.svg'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import styled from 'styled-components'
import theme from '../utils/theme'
import Paragraph from './paragraph'

const Container = BaseComponents.SmallContainer.extend`
  position: relative;
  background-color: ${theme.colors.bg.infobox};
  white-space: pre-wrap;
  margin: 40px auto;
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 36px;
  padding-bottom: 36px;
  p {
    color: ${theme.colors.text.infobox.body};
  }
`

const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 23px;
  height: 24px;
`

const Header = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: ${theme.colors.text.infobox.header};
  font-size: ${theme.typography.font.size.large};
  line-height: ${theme.typography.lineHeight.small};
  text-align: center;
`

class InfoBox extends React.PureComponent {
  render() {
    const { content } = this.props
    const _content = content.slice(1).map((paragraph, pindex) => {
      return <Paragraph key={'p-' + pindex} content={paragraph.content} />
    })
    return (
      <Container>
        <LogoContainer>
          <BoxSvg />
        </LogoContainer>
        <Header>
          {content[0]}
        </Header>
        {_content}
      </Container>
    )
  }
}

InfoBox.propTypes = {
  content: PropTypes.array.isRequired,
}

export default InfoBox
