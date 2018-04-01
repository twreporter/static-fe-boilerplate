import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const Bg = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const ChartContainer = styled.div`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  top: ${props => props.top};
  left: ${props => props.left};
`

const ChartBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const slideRight = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0%);
  }
`

const slideLeft = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
`

const MaskBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  animation: ${slideRight} 1s linear;
`

const ChartImg = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  animation: ${slideLeft} 1s linear;
`

export default class LineChart extends React.PureComponent {
  render() {
    const { toAnimate, imgs, position } = this.props
    console.log('toAnimate:', toAnimate)
    return (
      <React.Fragment>
        <Bg src={imgs.bg} />
        <ChartContainer
          {...position}
        >
          { toAnimate ? (
            <ChartBox>
              <MaskBox>
                <ChartImg
                  src={imgs.chart}
                />
              </MaskBox>
            </ChartBox>
          ) : null }
        </ChartContainer>
      </React.Fragment>
    )
  }
}

LineChart.propTypes = {
  imgs: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    chart: PropTypes.string.isRequired,
  }).isRequired,
  toAnimate: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
  }).isRequired,
}
