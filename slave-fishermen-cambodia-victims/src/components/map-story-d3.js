// This file uses d3-brush to create a mini map

import * as d3 from 'd3'
import * as topojson from 'topojson'
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import layout from '../utils/layout'

//TODO
// Combine individual modules into d3
// var d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection")); 

const mockup = {
  "desktop": {
    "width": 960,
    "height": 500
  },
  "mobile": {
    "width": 960,
    "height": 500
  }
}

const MapContainer = BaseComponents.MobileLargeContainer.extend`
  margin: 0 auto 100px auto;
  height: calc((100vw * ${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));

  ${screen.tabletOnly`
    height: calc(${layout.tablet.width.medium}px * (${props => props.mockup.mobile.height} / ${props => props.mockup.mobile.width}));
  `};

  ${screen.desktopOnly`
    height: calc(${layout.desktop.width.medium}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};

  ${screen.hdAbove`
    height: calc(${layout.hd.width.medium}px * (${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  `};

  .minimap {
    fill: white;
    stroke: black;
  }
  
  .land {
    fill: gray;
    fill-opacity: 0.5;
  }
  
  .minimap-land {
    fill: white;
    stroke: black;
    stroke-width: 0.5;
  }
  
  .exterior {
    fill: none;
    stroke: black;
    stroke-width: 0.5;
	}
  
  .interior {
    fill: none;
    stroke: black;
    stroke-opacity: 0.5;
    stroke-width: 0.5;
  }
  
  .border {
    fill: none;
    stroke: black;
  }
  
  g.brush > .handle {
  	display: none;
  }
  
  .overlay {
    pointer-events: none;
  }  
`

class MapStory extends React.PureComponent {
  constructor(props){
    super(props)
    this.buildMap = this._buildMap.bind(this)
  }

  componentDidMount(){
    this.buildMap()
  }

  _buildMap() {
    // initial variable setting
    const margin = {top: 0, right: 0, bottom: 0, left: 0};
    const mapContainerRect = {
      width: this.mapContainer.getBoundingClientRect().width,
      height: this.mapContainer.getBoundingClientRect().height
    }
    const width = mapContainerRect.width - margin.left - margin.right,
    		height = mapContainerRect.height - margin.top - margin.bottom; 
    const minimapMargin = {right: 0, bottom: 0};
    
    const minimapWidth = width / 5,
        minimapHeight = height / 5;

    const svg = d3.select(this.mapContainer).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    const minimap = svg.append("g")
    
    minimap.append("rect")
    	.attr("class", "minimap")
    	.attr("width", minimapWidth)
      .attr("height", minimapHeight)

    const brushed = function(){
      const s = d3.event.selection,
          c0 = s[0],
          c1 = s[1];

      // convert to lat long
      const mpc0 = miniProjection.invert(c0);
      const mpc1 = miniProjection.invert(c1);
      
      // convert to larger pixels
      const pc0 = projection(mpc0);
      const pc1 = projection(mpc1);
      
      projection.center(mpc1);
      
      svg.select(".land").attr("d", path);
      svg.select(".interior").attr("d", path);
      svg.select(".exterior").attr("d", path);   
      
      svg.select(".land").attr("transform", "scale(2)")
      svg.select(".interior").attr("transform", "scale(2)")
      svg.select(".exterior").attr("transform", "scale(2)")      
    }

    const brush = d3.brush()
      .extent([[0, 0], [minimapWidth, minimapHeight]])
      .on("start brush", brushed);
        
    let projection = d3.geoEquirectangular();
    let path = d3.geoPath().projection(projection);
    
    let miniProjection = d3.geoEquirectangular();
    let miniPath = d3.geoPath().projection(miniProjection);
    
    let mapSource = "https://unpkg.com/world-atlas@1/world/110m.json"

    d3.json(mapSource, function(error, world) {
      if (error) throw error;
      let land = topojson.feature(world, world.objects.land);
      let exteriors = topojson.mesh(world,  world.objects.countries, function(a, b) { return a == b; });
 			let interiors = topojson.mesh(world,  world.objects.countries, function(a, b) { return a !== b; });
      projection.fitSize([width, height], land);
      miniProjection.fitSize([minimapWidth, minimapHeight], land);

      let landMap = svg.append("g")
      	.append("path")
      	.datum(land)
      	.attr("class", "land")
      	.attr("d", path);
      
      exteriors = svg.append("g")
				.append("path")
      	.datum(exteriors)
      	.attr("class", "exterior")
      	.attr("d", path);
      
      interiors = svg.append("g")
				.append("path")
      	.datum(interiors)
      	.attr("class", "interior")
      	.attr("d", path);
      
       minimap.raise();
       
			 minimap.append("g")
       	.append("path")
       	.datum(land)
       	.attr("class", "minimap-land")
       	.attr("d", miniPath);
      
       minimap.append("g")
       	.attr("class", "brush")
       	.call(brush)
        .call(brush.move, [[0, 0], [minimapWidth / 2, minimapHeight / 2]]); 
    });
  }

  render() {

    return (
      <MapContainer
        mockup={mockup}
        innerRef={(node) => this.mapContainer = node}
      >
      </MapContainer>
    )
  }
}


export default MapStory
