import BaseComponents from './base'
import MapSrc from '../../static/fishing-map.svg'
import PropTypes from 'prop-types'
import React from 'react'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'
import { waypoints, content } from '../../static/map-data/map-story-data'

const mockup = {
  "hd": {
   "width": 1440,
   "height": 695
  },
  "desktop": {
    "width": 1024,
    "height": 494
  },
  "mobile": {
    "width": 1024,
    "height": 494
  }
}

const Container = styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  height: auto;
  background: ${theme.colors.bg.app}; 
  margin: 60px auto;
  overflow: hidden;
`

const Map = styled.div`
  position: relative;
  width: 100%;
  height: calc((100vw * ${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  #big-worldmap {
    transition: transform ease-in-out 2s;
  }
  svg {
    .cls-1{
      fill:none;
      stroke:#f1f1f1;
      stroke-linecap:round;
      stroke-linejoin:round;
      stroke-width:0.25px;
      fill-rule:evenodd;
    } 
    .shiftingPath {
      stroke: #b15c76;
      stroke-width: 1;
      fill: none;
      stroke-dashoffset: 3px;
      stroke-miterlimit: 10;
    }
    .shiftingPath.tiny-map{
      stroke-width: 8;
    }
    .leadingBoat {
      fill: #b15c76;
    }
    .mask-style {
      stroke: white;
      stroke-width: 2;
      stroke-dasharray: 4 1;
    }
    .mainPath.shiftingPath {
      transition: stroke-dashoffset 1s linear;
    }
    circle {
      transition: all 1s linear; 
    }
  }
`
const TinyMap = styled.div`
  position: absolute;
  left: calc(20 / ${props => props.mockup.desktop.width} * 100%);
  top: calc(15 / ${props => props.mockup.desktop.height} * 100%);
  border: solid 2px #b15c76;
  background: #0d1319;
  ${screen.hdAbove`
    width: 405px;
    height: 200px;
  `}
  ${screen.desktopOnly`
    width: 270px;
    height: 133px;
  `}
  ${screen.tabletOnly`
    width: 220px;
    height: 108px;
  `}
  ${screen.mobileBelow`
    display: none;
  `}
`

const Button = styled.button`
  display: block;
  background: white;
  color: black;
`

const InformationBox = styled.div`
  background: #fff;
  position: absolute;
  text-align: left;
  padding: 18px;
  min-height: 248px;
  ${screen.hdAbove`
    width: 478.5px;
    min-height: 372.5px;
    left: calc(883.5 / ${mockup.hd.width} * 100%);
    top: 50%;
    padding: 27px;
  `}
  ${screen.desktopOnly`
    width: calc(319 / ${mockup.desktop.width} * 100%);
    left: calc(634 / ${mockup.desktop.width} * 100%);
    bottom: calc(66 / ${mockup.hd.height} * 100%);
  `}
  ${screen.tabletBelow`
    position: relative;
    width: 90%;
    margin: 0 auto;
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    position: relative;
    width: 90%;
    margin: 0 auto;
  }
`

const Title = styled.h2`
  font-weight: bold;
  color: #b15c76;
  border-bottom: solid 1.5px #6f3e51;
  font-size: 22px;
  line-height: 1.36;
  letter-spacing: 0.1px;
  padding-bottom: 15px;
  ${screen.hdAbove` 
    font-size: 32px;
    line-height: 1.41;
    letter-spacing: 0.2px;
    padding-bottom: 22.5px;
  `}
`

const Content = styled.p`
  color: #0d1319;
  font-size: 18px;
  letter-spacing: 0.1px;
  line-height: 1.67;
  text-align: justify;
  ${screen.hdAbove`
    font-size: 24px;
    line-height: 1.88;
  `}
`

const ArrowButton = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  width: auto;
  height: 60px;
  img{
    height: 100%;
  }
  cursor: pointer;
`

const LeftArrowButton = ArrowButton.extend`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
`

const RightArrowButton = ArrowButton.extend`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%) scaleX(-1);
`

const Source = styled.p`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(100%);
  font-size: 15px;
  font-weight: normal;
  line-height: 1.53;
  color: #808080;
  margin: 0;
  ${screen.hdAbove`
    font-size: 22px;
  `}
`

const BoatContainer = styled.div`
  img {
    width: 100%;
  }
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transform: translate(${props => props.run ? '0' : '25%'}, calc(-100% - 10px));
  transition: ${props => props.run ? 'all 1s ease-in-out' : 'none'};
  transition-delay: ${props => props.run ? '1s' : '0s'};
  opacity: ${props => props.run ? 1 : 0};
  ${screen.tabletBelow`
    left: 50%;
    width: 70vw;
    height: calc( 332 / 540 * 70vw);
    transform: translate(${props => props.run ? '-50%' : '-25%'}, -110%);
    transition: ${props => props.run ? 'all 1s ease-in-out' : 'none'};
    transition-delay: 0s;
    opacity: ${props => props.run ? 1 : 0};
  `}
  ${screen.tabletOnly`
    width: 70vw;
    height: calc( 332 / 540 * 50vw);
    transform: translate(${props => props.run ? '-25%' : '0'}, -110%);
  `}
  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape){ 
    width: calc( 500 / 2560 * 100vw );
    height: calc( 332 / 540 * 500 / 2560 * 100vw);
    transform: translate(${props => props.run ? '-125%' : '-100%'}, 0);
    transition: ${props => props.run ? 'all 1s ease-in-out' : 'none'};
    transition-delay: ${props => props.run ? '1s' : 'none'};
    opacity: ${props => props.run ? 1 : 0};
  }
  @media only screen and (max-width: 767px) and (orientation: landscape){ 
    width: 80vh;
    height: calc( 540 / 332 * 50vh);
    transform: translate(${props => props.run ? '-25%' : '0'}, -110%);
  }
`
class MapStory extends React.PureComponent {
  constructor(props){
    super(props)
    this._development_ = false
    this.animationPause = false
		this.defaultViewBoxWidth = 689.13
    this.defaultViewBoxHeight = 331.83
    this.state = {
     clickCounter: 0
    }
    this.handleClick = this._handleClick.bind(this)
    this.addSVGElements = this._addSVGElements.bind(this)
    this.getPositionOnSVGMap = this._getPositionOnSVGMap.bind(this)
    this.getPathData = this._getPathData.bind(this)
    this.tweenManager = this._tweenManager.bind(this)
  }
  componentDidMount(){
    // TODO: edit svg file to add the following path
    const svgMap = document.getElementById('big-worldmap')
    if (svgMap) {
      this.addSVGElements(svgMap)
    }
    const svgTinyMap = document.getElementById('tiny-worldmap')
    if (svgTinyMap) {
      this.addSVGElements(svgTinyMap, 'tiny-map')
    }
  }
  componentWillUnMount(){
    this._development_ = null
    this.animationPause = null
		this.defaultViewBoxWidth = null
		this.defaultViewBoxHeight = null
  }
  _getPathData(){
    // Form the path data
    const SVGPath = waypoints.reduce((acc, cur, curIndex) => {
      let returnStr
      if (curIndex === 0) {
        returnStr = acc + `M${cur.position}`
      } else {
        returnStr = acc + `L${cur.position}`
      }
      return returnStr
    }, "")

    return {
      pathData: SVGPath,
      
    }
  }
  _addSVGElements(parentElement, className){
    // For IE to use classList
    if (!Object.getOwnPropertyDescriptor(Element.prototype,'classList')){
        if (HTMLElement&&Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList')){
          Object.defineProperty(Element.prototype,'classList',Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList'));
        }
    }
    const { pathData } = this.getPathData()
    const location = window.location.href

    // Add path mask
    const newDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const newMask = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
    newMask.id = 'dash-mask'
    const newPathInMask = document.createElementNS('http://www.w3.org/2000/svg', 'path') //Create a path in SVG's namespace
    newPathInMask.classList.add('mask-style')
    newPathInMask.classList.add('shiftingPath')

    newPathInMask.setAttribute("d", pathData)
    newMask.appendChild(newPathInMask)
    newDefs.appendChild(newMask)
    parentElement.appendChild(newDefs)

    // Add path
    const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path') //Create a path in SVG's namespace
    newPath.classList.add('shiftingPath')
    newPath.classList.add('mainPath')
    if (className) {
      newPath.classList.add(className)
    }
    newPath.setAttribute("d", pathData)
    newPath.setAttribute('mask', `url(${location}#dash-mask)`)
    parentElement.appendChild(newPath)
    const lengthOfPath = newPath.getTotalLength()
    const grewPathLength = 0 * lengthOfPath // 0 * lengthOfPath
    newPath.style.strokeDasharray = lengthOfPath
    newPath.style.strokeDashoffset = lengthOfPath - grewPathLength // hide the whole path at beginning

    // Add boat (use a circle to mimic a boat now)
    const newCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
    const circlePositionRefersToLine = newPath.getPointAtLength(grewPathLength)
    newCircle.classList.add('leadingBoat')
    newCircle.setAttribute('r', '3')
    newCircle.setAttribute('cx', circlePositionRefersToLine.x)
    newCircle.setAttribute('cy', circlePositionRefersToLine.y)
    parentElement.appendChild(newCircle)
  }
  _getGrowingPathAttr(nextDrawPortion) {
    const growingPaths = document.getElementsByClassName('mainPath shiftingPath')
    const leadingBoats = document.getElementsByClassName('leadingBoat')
    if (growingPaths[0] && leadingBoats[0]) {
      const lengthOfPath = growingPaths[0].getTotalLength()
      // use totallength to calculate portion
      //console.log(lengthOfPath / 366.08868408203125)
      const nextGrowLength = Math.floor(lengthOfPath * nextDrawPortion * 100) / 100
      const newCirclePosition = growingPaths[0].getPointAtLength(nextGrowLength)
      return {
        growingPaths,
        leadingBoats,
        lengthOfPath,
        currentAttr: {
          strokeDashoffset: growingPaths[0].style.strokeDashoffset,
        },
        nextAttr: {
          strokeDashoffset: lengthOfPath - nextGrowLength,
        }
      }
    }
  }
  _tweenManager(waypoint) {
    const map = document.getElementById('big-worldmap')
    const tabletBelowBreakpoint = 768
    const position = waypoint.position.split(' ')
    const waypointPosition = {
      x: position[0],
      y: position[1]
    }
    const mapRect = this.map.getBoundingClientRect()
    const centralPoint = {
      x: mapRect.width / 2,
      y: mapRect.height / 2
    }
    const translateValue = {
      translateX: ( centralPoint.x - ( waypointPosition.x / this.defaultViewBoxWidth ) * mapRect.width ) / waypoint.scale, 
      translateY: ( centralPoint.y - ( waypointPosition.y / this.defaultViewBoxHeight ) * mapRect.height ) / waypoint.scale
    }

    const paddingRight = mapRect.width > tabletBelowBreakpoint ? - mapRect.width / 10 : 0

    map.setAttribute(
      'style',
      `transform: scale(${waypoint.scale}) translate(${translateValue.translateX + paddingRight}px,${translateValue.translateY}px)`
    )

    // animation: line drawing
    const drewPortion = waypoint.cumulativePortion
    const { growingPaths, leadingBoats, lengthOfPath, currentAttr, nextAttr } = this._getGrowingPathAttr(drewPortion)
    const pathInitial = {
      strokeDashoffset: currentAttr.strokeDashoffset,
    }
    const pathGrowTo = {
      strokeDashoffset: nextAttr.strokeDashoffset,
    }
    const pathNoChange = pathInitial.strokeDasharray === pathGrowTo.strokeDashoffset
    let pathAttr = pathInitial
    let pathAnim
    if (!pathNoChange) {
      for(let path of growingPaths) {
        path.style.strokeDashoffset = pathGrowTo.strokeDashoffset
      } 
      const nextGrowLength = lengthOfPath - pathGrowTo.strokeDashoffset
      const newCirclePosition = growingPaths[0].getPointAtLength(nextGrowLength)
      for(let boat of leadingBoats) {
        boat.setAttribute('cx', newCirclePosition.x)
        boat.setAttribute('cy', newCirclePosition.y)
      }
    }
    this.animationPause = false
  }
  _handleClick(direction){
    const { clickCounter } = this.state
    let nextCounter
    if (direction === 'next') {  
      if (clickCounter !== content.length - 1) {
        nextCounter = clickCounter + 1
        this.setState({
          clickCounter: nextCounter
        })

        const nextWaypoint = content[nextCounter].waypoint
        if(nextWaypoint) {
          this.tweenManager(nextWaypoint)
        }
      }
    }else if (direction === 'prev') { 
      if (clickCounter !== 0) {
        nextCounter = clickCounter - 1
        this.setState({
          clickCounter: nextCounter
        })

        const nextWaypoint = content[nextCounter].waypoint
        if(nextWaypoint) {
          this.tweenManager(nextWaypoint)
        }
      }
    }

  }

  /* 
   * get path data according to map's coordinate
  */
  _getPositionOnSVGMap(e) {
    if (!this._development_) return
    // DONT CHANGE, tunned in heuristic
    const mapHeight = window.innerWidth * ( mockup.desktop.height / mockup.desktop.width ) + 120
    console.log((e.clientX / window.innerWidth) * this.defaultViewBoxWidth , (e.clientY / mapHeight) * this.defaultViewBoxHeight )          
  }
  render(){
    const { clickCounter } = this.state
    return (
      <Container>
        <Map
          innerRef={ node => this.map = node}
          mockup={mockup}
        >
          <MapSrc
            id='big-worldmap'
            onClick={(e) => this.getPositionOnSVGMap(e)}
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid meet'
            viewBox={`0 0 ${this.defaultViewBoxWidth} ${this.defaultViewBoxHeight}`}
          />
          <TinyMap
            mockup={mockup}
          >
            <MapSrc
              id='tiny-worldmap'
              width='100%'
              height='100%'
              preserveAspectRatio='xMidYMid meet'
              viewBox={`0 0 ${this.defaultViewBoxWidth} ${this.defaultViewBoxHeight}`}
            />
          </TinyMap>
        </Map>
        <InformationBox
          mockup={mockup}
        >
          <Title dangerouslySetInnerHTML={{__html: content[clickCounter].title || content[clickCounter].date}} />
          <Content>{content[clickCounter].description || content[clickCounter].event}</Content>
          <LeftArrowButton
            show={clickCounter !== 0}
            onClick={this.handleClick.bind(this, 'prev')}
          >
            <img src={imgSrc['swipe_left']} />
          </LeftArrowButton>
          <RightArrowButton 
            show={clickCounter !== content.length - 1}
            onClick={this.handleClick.bind(this, 'next')}
          >
            <img src={imgSrc['swipe_left']} />
          </RightArrowButton>
          <BoatContainer
            run={content[clickCounter].image}
          >
            <img src={imgSrc['fishingShip']}/>
          </BoatContainer>
          <Source>地圖來源：Free Vector Maps</Source>
        </InformationBox>
      </Container>
	  )
	}
}

export default MapStory
