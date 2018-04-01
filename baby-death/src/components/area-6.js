/* eslint react/no-array-index-key: 0 */
import React from 'react'
import RouteSVG from '../../static/area-6/a6-route.svg'
import reusedComponents from './reused-components'

const { StyledAreaContainer, StyledTitle, StyledParagraph, StyledAnnotation } = reusedComponents

export default class Area6 extends React.PureComponent {
  render() {
    const { title, paragraphs, annotations, fontColors } = this.props
    const paragraphsJSX = paragraphs.map((paragraph, index) => {
      return (
        <StyledParagraph
          key={`area6_paragraph_${index}`}
          color={fontColors.paragraph}
        >
          {paragraph}
        </StyledParagraph>
      )
    })

    const annotationsJSX = annotations.map((annotation, index) => {
      return (
        <StyledAnnotation
          key={`area6_annotation_${index}`}
          color={fontColors.annotation}
        >
          {annotation}
        </StyledAnnotation>
      )
    })

    return (
      <StyledAreaContainer>
        <StyledTitle
          color={fontColors.title}
        >{title}
        </StyledTitle>
        <RouteSVG style={{ overflow: 'visible' }} />
        {paragraphsJSX}
        {annotationsJSX}
      </StyledAreaContainer>
    )
  }
}
