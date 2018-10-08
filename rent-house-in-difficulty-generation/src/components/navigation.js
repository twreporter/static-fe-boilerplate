import screen from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import theme from '../utils/theme'

const mockup = {
  navigationWidth: 92,
  paginationMargin: 10,
  paginationWidth: 24,
  pagesLength: 3
}

const Container = styled.div`
  position: relative;
  text-align: left;
  visibility: ${props => props.visible ? "visible" : "hidden"};
`

const Pagination = styled.div `
  display: inline-block;
  width: calc(((${props => props.navigationWidth}px - (${mockup.paginationMargin}px * (${mockup.pagesLength} / ${props => props.pagesLength})) * ${props => props.pagesLength}) / ${props => props.pagesLength}));
  height: 4px;
  opacity: ${props => props.isCurrentPage ? 1 : 0.25};
  background: ${theme.colors.bg.navigation};
  margin-right: calc((${mockup.paginationMargin}px * ( ${mockup.pagesLength} / ${props => props.pagesLength})));
`

export default class Navigation extends PureComponent {
  constructor(props) {
    super(props)
  }
  _createNavigation = () => {
    const { pagesLength, currentPage, navigationWidth } = this.props
    let pagination = []
    let navigation = []
    for (let i = 0; i < pagesLength; i++) {
      pagination.push(
        <Pagination 
          key={i} 
          isCurrentPage={i === currentPage} 
          pagesLength={pagesLength}
          navigationWidth={navigationWidth}
        />
      )
    }
    navigation.push(
      <Container 
        key={'nav'}
        navigationWidth={navigationWidth}
        pagesLength={pagesLength}
        visible={pagination.length > 1}
      >
        {pagination}
      </Container>
    )
    return navigation
  }

  render() {
    return (
      <React.Fragment>
        { this._createNavigation() }
      </React.Fragment>
    )
  }
}

Navigation.defaultProps = {
  pagesLength: 0,
  currentPage: 0,
  navigationWidth: 0
}

Navigation.propTypes = {
  pagesLength: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  navigationWidth: PropTypes.number
}

