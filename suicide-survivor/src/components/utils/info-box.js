import { Paragraph } from './text-utils'
import pathProcessor from '../../utils/path-processor'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import LogoIcon from '../../../static/logo.svg'

export const Container = styled.div`
  width: 100%;
  color: gray;
  margin-bottom: 40px;
`

export const Divider = styled.div`
  background-color: #c71b0a;
  height: 1px;
  width: 1.33333rem;
  margin: 0 auto 2em auto;
  bottom: -2.22222rem;
`

export const Box = styled.div`
  box-sizing: border-box;
  padding: 2em 1.33333em 1.33333em 1.33333em;
  width: 100%;
  position: relative;
  background-color: #F1F1F1;
`

const IconContainer = styled.div`
  position: absolute;
  width: 23px;
  height: 24px;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  > svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Logo = styled.img`
  position: absolute;
  width: 23px;
  height: 24px;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
`

export const Content = Paragraph.extend`
  color: gray;
`

class InfoBox extends React.PureComponent {
  render() {
    const { data } = this.props
    const { content, title } = data
    // <Logo src={pathProcessor('logo.png')} />
    return (
      <Container>
        <Divider />
        <Box>
          <IconContainer>
            <LogoIcon />
          </IconContainer>
          <p>{title}</p>
          <Content dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
      </Container>
    )
  }
}

InfoBox.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default InfoBox
