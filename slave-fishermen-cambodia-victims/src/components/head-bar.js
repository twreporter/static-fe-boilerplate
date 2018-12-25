import commonStyle from '../utils/common-style';
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../utils/screen'
import SideBarHOC from '@twreporter/react-components/lib/side-bar'
import styled from 'styled-components'
import theme from '../utils/theme'

const StyledAnchor = styled.div`
  cursor: pointer;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  padding: 0 20px;
  transition: all 200ms linear;
`

const Label = styled.p`
  color: ${props => (props.highlight ? theme.colors.text.headbar : "#9c9c9c")};
  font-size: ${theme.typography.font.size.medium};
  font-weight: ${props => (props.highlight ? theme.typography.font.weight.bold : theme.typography.font.weight.medium)};
  line-height: ${commonStyle.headbar.height};
  margin: 0;
`

class Anchor extends React.PureComponent {
  /**
   * render vertical word by word
   *
   * @param {string[]} words words to render vertically
   * @returns {Object[]} Label components
   */
  _assembleWord(words) {
    return words.split('').map((word, index) => {
      return (
        <Label key={`anchor_label_${index}`}>
          {word}
        </Label>
      )
    })
  }

  render() {
    const {
      highlight, handleClick, id, index, label,
    } = this.props
    return (
      <StyledAnchor
        highlight={highlight}
        onClick={(e) => { handleClick(id, e) }}
        key={`SectionButton_${id}`}
      >
        <Label
          highlight={highlight}
        >
          {label}
        </Label>
      </StyledAnchor>
    )
  }
}

class Anchors extends React.PureComponent {
  render() {
    const anchorBts = []
    const { data, currentAnchorId, handleClickAnchor } = this.props
    let index = 1
    data.forEach((anchorObj) => {
      const { id, label } = anchorObj

      // id and label are not empty string
      if (id && label) {
        anchorBts.push(<Anchor
          key={`anchor_${index}`}
          handleClick={handleClickAnchor}
          highlight={id === currentAnchorId}
          id={id}
          index={index}
          label={label}
        />)
        index += 1
      }
    })
    return (
      <React.Fragment>
        { anchorBts }
      </React.Fragment>
    )
  }
}

Anchors.defaultProps = {
  currentAnchorId: '',
  data: [],
  handleClickAnchor: () => {},
}

Anchors.propTypes = {
  currentAnchorId: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  handleClickAnchor: PropTypes.func,
}

const AnchorsContainer = styled.div`
  z-index: 200;
  position: fixed;
  color: ${theme.colors.gray50};
  top: 0;
  left: 50%;
  background: ${theme.colors.bg.headbar};
  transform: ${props => (props.toShow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)')};
  visibility: ${props => (props.toShow ? 'visible' : 'hidden')};
  transition: transform 0.5s linear;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: ${commonStyle.headbar.height};
  text-align: center;
  opacity: 0;
`

const ScrollWrapper = styled.div`
  white-space: nowrap;
  ${screen.mobileBelow`
    overflow-x: scroll;
  `}
`

class HeadBar extends React.PureComponent {
  render() {
    // currentAnchorId and handleClickAnchor are passed from `SideBarHOC`
    const {
      anchors, children, currentAnchorId, handleClickAnchor,
    } = this.props
    return (
      <div>
        <AnchorsContainer
          toShow={currentAnchorId}
        >
          <ScrollWrapper>
            <Anchors
              data={anchors}
              handleClickAnchor={handleClickAnchor}
              currentAnchorId={currentAnchorId}
            />
          </ScrollWrapper>
        </AnchorsContainer>
        {children}
      </div>
    )
  }
}

HeadBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {},
}

HeadBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func,
}

export default SideBarHOC(HeadBar)
