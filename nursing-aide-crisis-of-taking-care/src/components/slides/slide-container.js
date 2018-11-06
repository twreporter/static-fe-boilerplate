import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { zIndex } from '../../constants/style-variables'

const CenteringContainer = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => {
    if (!props.isFocus) {
      return zIndex.slidesContainer
    } else if (props.isBg) {
      return zIndex.slidesContainerBgFocus
    }
    return zIndex.slidesContainerFocus
  }};
  ${mq.mobileBelow`
    flex-direction: column;
    justify-content: flex-start;
  `}
  ${mq.tabletOnly`
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10%;
  `}
  ${mq.desktopAbove`
    flex-direction: row;
    >* {
      margin-left: 31px;
    }
    >*:first-child {
      margin-left: 0;
    }
  `}
`

const LayersContainer = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${props => (props.isFocus ? zIndex.slidesContainerFocus : zIndex.slidesContainer)};
`

function SlideContainer({
  type,
  children,
  isFocus,
  isBg,
}) {
  switch (type) {
    case 'layers':
      return <LayersContainer isFocus={isFocus}>{children}</LayersContainer>
    case 'centering':
    default: {
      return (<CenteringContainer isBg={isBg} isFocus={isFocus}>{children}</CenteringContainer>)
    }
  }
}

SlideContainer.propTypes = {
  isBg: PropTypes.bool.isRequired,
  isFocus: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
}

SlideContainer.defaultProps = {
  children: null,
}

export default SlideContainer
