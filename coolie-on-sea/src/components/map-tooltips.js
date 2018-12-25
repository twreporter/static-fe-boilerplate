import * as d3 from 'd3'
import * as topojson from 'topojson'
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import d3tip from '../utils/d3-tip'
import layout from '../utils/layout'
import mockup from '../constants/mockup'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

//TODO
// Combine individual modules into d3
// var d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection")); 

const MapContainer = styled.div`
  position: relative;
  margin: 0 auto 100px auto;
	width: 100%;
  height: calc((100vw * ${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
  svg {
    background: ${theme.colors.bg.app}; 
  }
`

class MapTooltips extends React.PureComponent {
  constructor(props){
    super(props)
    this.buildMap = this._buildMap.bind(this)
  }

  componentDidMount(){
    this.buildMap()
  }

  _getTooltipsTemplate(country, population, port, location){
    const format = d3.format(',')

    // set tooltips inline style
    const tooltipsStyle = `
      background: white; 
      border-radius: 5px; 
      padding: 5px;
    `

    const portTemplate = `
      <div style="${tooltipsStyle}">
        <span class='details'>${country}，${port}</span>
      </div>
    `
    const countryTemplate = `
      <div style="${tooltipsStyle}">
        <span class='details'>${country}  ${format(population)}人</span>
      </div>
    `
    if (country && population) {
      return countryTemplate
    } else if (country && port && location) {
      return portTemplate
    }
    return
  }

  _buildMap() {
    // Set tooltips
    const tip = d3tip()
      .attr('class', 'd3-tip')
      .offset([50, -50])
      .html(d => {
        if (typeof d.country !== 'undefined') { 
          return this._getTooltipsTemplate(d.country, d.population, d.port, d.location)
        }
      });

    const margin = {top: 0, right: 0, bottom: 0, left: 0};
    const mapContainerRect = {
      width: this.mapContainer.getBoundingClientRect().width,
      height: this.mapContainer.getBoundingClientRect().height
    }
    const width = mapContainerRect.width - margin.left - margin.right,
        height = mapContainerRect.height - margin.top - margin.bottom;

    const defaultMapColor = '#4a4a4a'
    const color = d3.scaleThreshold()
      .domain([
        10,
        100,
        1000,
        10000,
        100000,
      ])
      .range([
        '#d09dad',
        '#c17d91', 
        '#b15c76', 
        '#854559',
        '#592e3b',
      ]);
    
    const svg = d3.select(this.mapContainer)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('class', 'map')
      .on('click', (d) => { console.log(d3.mouse(this.mapContainer)) });
       
    svg.call(tip);

    const ready = function(error, data, population, portLocation) {
      if (error) throw error 
      const populationById = {};
      const countrynameById = {};
      population.forEach(d => {populationById[d.id] = +d.population;});
      population.forEach(d => {countrynameById[d.id] = d.country;});
      data.features.forEach(d => { 
		  	 d.population = populationById[d.id]
		 	   d.country = countrynameById[d.id]
		  });

		const projection = d3.geoEquirectangular()
						.fitExtent([[margin.left, margin.top], [width, height]], data)
           .precision(0.1)

    const newcentre = [ 1170 / 1280 * window.innerWidth, 410 / 663 * window.innerHeight ]
    projection.rotate([- projection.invert(newcentre)[0], - projection.invert(newcentre)[1]])
    const path = d3.geoPath().projection(projection);

      // Here is for world map  
      svg.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(data.features)
        .enter().append('path')
          .attr('d', path)
          .style('fill', d => {
            if(populationById[d.id]) {
              return color(populationById[d.id])
            }
            return defaultMapColor
           })
          .style('stroke', 'white')
          .style('opacity', d => {
            if (color(populationById[d.id])){
              return 1  
            }
            return 0.4
          })
          .style('stroke-width', 0.3)
          // tooltips
          .on('mouseover', function(d){
            if (typeof d.country !== 'undefined') {
              tip.show(d, this);
              d3.select(this)
                .style('opacity', 1)
                .style('stroke-width', 2);
            }
          })
        .on('mouseout', function(d){
          if (typeof d.country !== 'undefined') {
            tip.hide(d);
            d3.select(this)
              .style('opacity', 1)
              .style('stroke-width',0.3);
          }
        });
   
      svg.append('path')
        .datum(topojson.mesh(data.features, (a, b) => a.id !== b.id))
        .attr('class', 'names')
        .attr('d', path);

      // Here is for port location
      // Add drop shadow for port pin
      
      // filters go in defs element 
      const defs = svg.append('defs')
      // create filter with id #drop-shadow
      // height=130% so that the shadow is not clipped
      const filter = defs.append('filter')
            .attr('id', 'drop-shadow')
		 			 .attr('width', '300%')
     	     .attr('height', '300%');
      // SourceAlpha refers to opacity of graphic that this filter will be applied to
      // convolve that with a Gaussian with standard deviation 3 and store result
      // in blur
      filter.append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', 7.5)
        .attr('result', 'blur');
      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
      filter.append('feOffset')
        .attr('in', 'blur')
        .attr('dx', 2)
        .attr('dy', 2)
        .attr('result', 'offsetBlur');     
      // overlay original SourceGraphic over translated blurred opacity by using
      // feMerge filter. Order of specifying inputs is important!
		  const feMerge = filter.append('feMerge');

		  feMerge.append("feMergeNode")
        .attr('in', 'offsetBlur')
		  feMerge.append("feMergeNode")
     	 .attr("in", "SourceGraphic");

      svg.selectAll('.portPin')
        .data(portLocation)
        .enter()
        .append('circle', '.portPin')
        .attr('r', 4)
        //.attr('r', 10)
        .attr('fill', '#fff')
		 	 .style('filter', 'url(#drop-shadow)')
        .attr('transform', d => {
          return "translate(" + projection([
              d.location.longitude,
              d.location.latitude
            ]) + ")"
        })
       .on('mouseover', function(d){ 
          if(typeof d.country !== 'undefined') {
            tip.show(d, this)
            d3.select(this)
              .attr('fill', '#808080')
          }
        })
        .on('mouseout', function(d){
          if(typeof d.country !== 'undefined') {
            tip.hide(d)
            d3.select(this)
              .attr('fill', '#fff')
          }
        })
   } 

   d3.queue()
      .defer(d3.json, './static/map-data/world_contries.json')
      .defer(d3.csv, './static/map-data/world_fisher_population.csv')
      .defer(d3.json, './static/map-data/port_location.json')
     .await(ready);    
  }

  render() {
    return (
      <MapContainer
        mockup={mockup}
        innerRef={(node) => this.mapContainer = node}
      />
    )
  }
}


export default MapTooltips
