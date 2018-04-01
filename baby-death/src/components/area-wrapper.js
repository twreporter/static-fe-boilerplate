/* eslint react/no-array-index-key: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'
import reusedComponents from './reused-components'

const { StyledTitle, StyledAnnotation, StyledParagraph, StyledAreaContainer } = reusedComponents

const AnimationBlock = styled.div`
  width: 100%;
  padding-bottom: ${props => props.height / props.width * 100}%;
  position: relative;
  overflow: hidden;
`

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withAreaWrapper(animationBlock, WrappedComponent) {
  return class AreaWrapper extends React.PureComponent {
    static displayName = `WithLayout(${getDisplayName(WrappedComponent)})`
    static propTypes = {
      title: PropTypes.string.isRequired,
      paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
      annotations: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    constructor(props) {
      super(props)
      this.state = {
        toAnimate: false,
      }
      this.onEnter = this._onEnter.bind(this)
      this.onClick = this._onClick.bind(this)
    }

    _onEnter() {
      this.setState({
        toAnimate: true,
      })
    }

    _onClick() {
      this.setState({
        toAnimate: !this.state.toAnimate,
      })
    }

    render() {
      const { title, titleImg, paragraphs, annotations, fontColors, ...passThroughProps } = this.props
      const paragraphsJSX = paragraphs.map((paragraph, index) => {
        return (
          <StyledParagraph
            key={`${getDisplayName(WrappedComponent)}_paragraph_${index}`}
            color={fontColors.paragraph}
          >
            {paragraph}
          </StyledParagraph>
        )
      })

      const annotationsJSX = annotations.map((annotation, index) => {
        return (
          <StyledAnnotation
            key={`${getDisplayName(WrappedComponent)}_annotation_${index}`}
            color={fontColors.annotation}
          >
            {annotation}
          </StyledAnnotation>
        )
      })

      return (
        <StyledAreaContainer>
          <header
            style={{
              margin: '30px auto',
              width: `${288 / 375 * 100}%`,
            }}
          >
            <img
              alt={title}
              src={titleImg}
              width="100%"
            />
            <StyledTitle>
              {title}
            </StyledTitle>
          </header>
          <Waypoint
            onEnter={this.onEnter}
            bottomOffset="60%"
            fireOnRapidScroll
          >
            <AnimationBlock
              {...animationBlock}
            >
              <WrappedComponent
                toAnimate={this.state.toAnimate}
                {...passThroughProps}
              />
            </AnimationBlock>
          </Waypoint>
          {paragraphsJSX}
          {annotationsJSX}
        </StyledAreaContainer>
      )
    }
  }
}
