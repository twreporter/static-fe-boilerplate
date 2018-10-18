import { fontSize, fontWeight } from '../../constants/style-variables'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const itemHeight = {
  mobile: '55px',
  desktop: '85px',
}

const itemWidth = {
  mobile: '263px',
  desktop: '600px',
}

const Container = styled.a`
  display: flex;
  text-decoration: none;
  width: ${itemWidth.mobile};
  height: ${itemHeight.mobile};
  margin: 0 auto;
  margin-bottom: 15px;
  ${mq.desktopAbove`
    width: ${itemWidth.desktop};
    height: ${itemHeight.desktop};
    margin-bottom: 25px;
  `}
  :last-child {
    margin-bottom: 0
  }
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - ${itemHeight.mobile});
  padding: 15px 20px;
  background-color: #d8d8d8;
  ${mq.desktopAbove`
    padding: 8px 14px;
    width: calc(100% - ${itemHeight.desktop});
  `}
`

const Title = styled.div`
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.itemTitle.mobile};
  color: #1d1d1d;
  ${mq.desktopAbove`
    text-overflow: ellipsis;
    font-size: ${fontSize.itemTitle.desktop};
  `}
`

const Description = styled.div`
  ${mq.tabletBelow`
    display: none;
  `}
  margin-top: .5em;
  font-weight: ${fontWeight.normal};
  font-size: ${fontSize.itemDescription.desktop};
  color: #1d1d1d;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ImageBox = styled.div`
  width: ${itemHeight.mobile};
  height: ${itemHeight.mobile};
  ${mq.desktopAbove`
    width: ${itemHeight.desktop};
    height: ${itemHeight.desktop};
  `}
  flex-grow: 0;
  flex-shrink: 0;
  background-image: url(${props => props.imageSrc});
  background-size: cover;
  background-position: center center;
`

class RelatedItem extends React.PureComponent {
  render() {
    const {
      description,
      imageSrc,
      title,
      to,
    } = this.props
    return (
      <Container href={to} target="_blank">
        <ImageBox imageSrc={imageSrc} />
        <TextBox>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextBox>
      </Container>
    )
  }
}

RelatedItem.propTypes = {
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default RelatedItem
