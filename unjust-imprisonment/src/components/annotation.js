/* eslint react/no-array-index-key:0 */
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-next-line
import styled from 'styled-components'
import theme from '../theme'

const Indicator = styled.span`
  cursor: pointer;
  display: inline-block;
  background-color: ${theme.colors.primary};
  border-radius: 9px;
  height: 18px;
  margin-left: 3px;
  position: relative;
  top: -3px;
  width: 18px;

  &::after {
    border-color: #fff transparent;
    border-style: solid;
    border-width: ${props => (props.isToggled ? '6px 6px 0' : '0 6px 6px')};
    content: "";
    left: 3px;
    position: absolute;
    top: ${props => (props.isToggled ? '7px' : '5px')};
  }
`

const AnnotatedText = styled.span`
  color: ${theme.colors.primary};
  display: inline-block;
  line-height: ${theme.typography.lineHeight.medium};
`

const AnnotatedContent = styled.span`
  background-color: ${theme.colors.bg.annotation};
  color: ${theme.colors.text.annotation};
  display: ${props => (props.isToggled ? 'none' : 'block')};
  font-size: ${theme.typography.font.size.small};
  line-height: ${theme.typography.lineHeight.medium};
  padding: 16px 24px;
  margin: 16px 0;
  @keyframes fade-in-down {
    0% { opacity: 0;  transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  animation-name: fade-in-down;
  animation-fill-mode: both;
  animation-duration: .5s;
`

const AnnotationContainer = styled.abbr`
  box-sizing: border-box;
  display: inline;
  text-decoration: none;
`

export default class Annotation extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: true,
    }
    this.handleToggle = this._handleToggle.bind(this)
  }

  _handleToggle() {
    this.setState({
      isToggled: !this.state.isToggled,
    })
  }

  render() {
    const { content } = this.props
    const { isToggled } = this.state

    const annotatedText = content[0]
    const _content = content.slice(1).map((data, index) => {
      return (
        <span key={`p_${index}`}>{data}</span>
      )
    })

    return (
      <AnnotationContainer>
        <AnnotatedText>
          {annotatedText}
        </AnnotatedText>
        <Indicator
          isToggled={isToggled}
          onClick={this.handleToggle}
        />
        <AnnotatedContent
          isToggled={isToggled}
        >
          {_content}
        </AnnotatedContent>
      </AnnotationContainer>
    )
  }
}

Annotation.propTypes = {
  content: PropTypes.array.isRequired,
}
