import { fontSize, fontWeight } from '../../constants/style-variables'
import screen from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const itemHeight = '70px'

const colors = {
  white: 'white',
  itemGrey: 'grey',
}

const TitleBox = styled.div`
  position: relative;
  color: ${colors.white};
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.itemTitle};
  line-height: 1.33;
  letter-spacing: 1.4px;
  width: calc(100% - ${itemHeight});
  height: ${itemHeight};
  padding: 12px;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: ${colors.itemGrey};
  display: flex;
  align-items: center;
`

const Container = styled.a`
  display: flex;
  width: 100%;
  height: ${itemHeight};
  margin-bottom: 20px;
  :last-child {
    margin-bottom: 0
  }
  ${screen.hdAbove`
    width: calc((100% - 40px) / 2);
    margin-bottom: 0;
  `}
  text-decoration: none;
  ${screen.desktopAbove`
    ${TitleBox}::before {
      content: "";
      background-color: ${colors.white};
      opacity: .3;
      transition: width 280ms ease;
      position: absolute;
      width: 0;
      height: 100%;
      display: block;
      top: 0;
      left: 0;
    }
    :hover {
      ${TitleBox}::before {
        width: 100%;
      }
    }
  `}
`
const ImageBox = styled.div`
  width: ${itemHeight};
  height: ${itemHeight};
  flex-grow: 0;
  flex-shrink: 0;
  background-image: url(${props => props.imageSrc});
  background-size: cover;
  background-position: center center;
`


class RelatedItem extends React.PureComponent {
  render() {
    const { imageSrc, title, to } = this.props
    return (
      <Container href={to} target="_blank">
        <ImageBox imageSrc={imageSrc} />
        <TitleBox><span>{title}</span></TitleBox>
      </Container>
    )
  }
}

RelatedItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default RelatedItem
