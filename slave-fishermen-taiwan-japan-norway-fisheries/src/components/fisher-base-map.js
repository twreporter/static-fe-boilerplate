import BaseComponents from './base'
import LazyLoad from 'react-lazyload'
import MapTooltips from './map-tooltips'
import PropTypes from 'prop-types'
import React from 'react'
import chunk from 'lodash/chunk'
import imgSrc from '../data/img-src'
import isNode from 'detect-node' 
import layout from '../utils/layout'
import mockup from '../constants/mockup'
import orderBy from 'lodash/orderBy'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const _ = {
  orderBy, chunk
}

let populationData
if (!isNode) {
  populationData = require('dsv-loader!../../static/map-data/world_fisher_population.csv')
}

const colorlist = [
  {
    color: '#592e3b',
    unit: '萬'
  },
  {
    color: '#854559',
    unit: '仟'
  },
  {
    color: '#b15c76',
    unit: '佰'
  },
  {
    color: '#c17d91',
    unit: '十',
  },
  {
    color: '#d09dad',
    unit: '個'
  }
]

const country_img = {
  '印尼': 'country1',
  '菲律賓': 'country2',
  '越南': 'country3',
}

const TitleWrapper = styled.div`
  ${screen.desktopAbove`
    top: calc((90 / 700) * 100%);
    left: calc((90 / 1024) * 100%);
    position: absolute;
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    position: relative;
    left: 0;
  }
`

const MapHeader = styled.h2`
  color: #fff;
  font-size: ${theme.typography.font.size.xlarge};
  font-weight: ${theme.typography.font.weight.bold};
  line-height: ${theme.typography.lineHeight.large};
  margin: 0;
`

const MapTooltipsContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc((100vw * ${props => props.mockup.desktop.height} / ${props => props.mockup.desktop.width}));
`

const MapListContainer = BaseComponents.SmallContainer.extend`
  margin: 40px auto;
`

const MapOnDesktop = styled.div`
  z-index: 1;
  ${screen.tabletBelow`
    display: none;
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    display: none;
  }
`

const MapOnTabletBelow = styled.div`
  z-index: 1;
  ${screen.desktopAbove`
    display: none;
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    display: block;
  }
`

const MapLegend = styled.div`
  position: absolute;
  top: calc((90 / ${props => props.mockup.desktop.height}) * 100%);
  right: calc((90 / ${props => props.mockup.desktop.width}) * 100%);
  color: white;
  text-align: right;
`

const ColorIndicator = styled.div`
  position: relative;
  display: block; 
`

const PortIndicator = styled.p`
  font-size: 18px;
`

const Circle = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  margin-right: 11px;
`

const Placeholder = styled.p`
  visibility: hidden;
  font-size: 16px;
`

const Colors = styled.div`
  display: flex;
  align-items: center;
  p{
    text-align: center;
    margin: 0 0 3px 0;
  }
`

const ColorSlice = styled.div`
  width: 60px;
  margin: 0 1px;
  p {
    color: #9c9c9c;
    font-size: 16px;
  }
`

const Color = styled.div`
  width: 100%;
  height: 15px;
  background: ${props => props.color};
`

const Description = styled.div`
  margin-left: 11px;
  span{
    font-size: 18px;
  }
`

const MapList = styled.ul`
  padding: 0;
  list-style: none;
  li {
    color: #fff;
  }
  span {
    font-size: 16px;
  }
`
const ListThreeFirstCountry = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 7px;
  border: solid 1px rgba(128, 128, 128, 0.5);
  margin-bottom: 20px;
  span{
    font-size: 20px;
  }
  span:last-child{
    font-weight: bold;
  }
  img {
    height: 100%;
  }
  ${screen.tabletOnly`
    width: calc(50% - 10px);
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    width: calc(50% - 10px);
  }
`

const ListAllRest = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  margin-top: 15px;
  display: ${props => (props.isToggled ? 'none' : 'block')};
  li { 
    span {
      color: #0d1319;
    }
  }
  &::after{
    content: "";
    display: ${props => (props.isToggled ? 'none' : 'block')};
    position: absolute;
    top: -8%;
    left: 5%;
    border-style: solid;
    border-width: 0 7px 15px;
    border-color: #fff transparent;
    z-index: 1;
  }
  @keyframes fade-in-down {
    0% { opacity: 0;  transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  animation-name: fade-in-down;
  animation-fill-mode: both;
  animation-duration: .5s;
  ${screen.tabletOnly`
    padding: 14px 20px;
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    padding: 14px 20px;
  }
  ${screen.mobileBelow`
    padding: 13px 16px 13px 0;
  `}
`

const ListBaseComponent = styled.div`
  display: flex;
`

const MobileList = ListBaseComponent.extend`
  ${screen.tabletAbove`
    display: none;
  `}
`

const TabletList = ListBaseComponent.extend`
  ${screen.mobileBelow`
    display: none;
  `}
`

const SeeMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #b15c76;
  img{
    width: 22px;
  }
  span {
    font-size: 20px;
  }
  ${screen.tabletOnly`
    width: calc(50% - 10px);
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    width: calc(50% - 10px);
  }
`

const Chunk = styled.div`
  border-left: solid 1px #0d1319;
  ${screen.mobileBelow`
    padding-left: 16px;
    &:first-child{
      border-left: none;
      width: 45%;
    }
    &:last-child{
      width: 55%;
    }
  `}
  ${screen.tabletOnly`
    padding-left: 31px;
    &:first-child{
      border-left: none;
      padding-left: 0;
      width: 30%;
    }
    &:nth-child(2){
      width: 40%; 
    }
    &:last-child{
      width: 30%;
    }
  `}

  @media only screen and (max-width: 1024px) and (orientation: landscape){
    padding-left: 31px;
    &:first-child{
      border-left: none;
      padding-left: 0;
      width: 30%;
    }
    &:nth-child(2){
      width: 40%; 
    }
    &:last-child{
      width: 30%;
    }
  }
`

// Since the icon image can not display properly, use PopIndicator below.
// Should try in the future
const PopupIcon = styled.div`
  width: 22px;
  height: 22px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.close});
`

const PopupIndicator = styled.span`
  cursor: pointer;
  background-color: #0d1319;
  border-radius: 50%;
  height: 20px;
  margin-right: 14px;
  position: relative;
  width: 20px;
  &::after {
    content: "";
    position: absolute;
    top: ${props => (props.isToggled ? '8px' : '6px')};
    left: 6px;
    border-color: #fff transparent;
    border-style: solid;
    border-width: ${props => (props.isToggled ? '6px 4px 0' : '0 4px 6px')};
  }
  ${screen.tabletOnly`
    margin-right: 8px;
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){
    margin-right: 8px;
  }
`
const TableLayoutOnTablet = styled.div`
  ${screen.tabletOnly`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `}

  @media only screen and (max-width: 1024px) and (orientation: landscape){
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`

const CountryImg = styled.div`
  width: 110px;
  img {
    display: block;
    margin: 0 auto;
  }
`

class FisherBaseMap extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      isAllListToggled: true
    }
    this.sortDataByPopulation = this._sortDataByPopulation.bind(this)
    this.handleToggle = this._handleToggle.bind(this)
  }
  _sortDataByPopulation(rawData) {
    const data =  _.orderBy(rawData.map((d) => {
      d.populationInNumber = Number(d.population)
      return d
    }), ['populationInNumber'], ['desc'])
    return [data.slice(0, 3), data.slice(3)]
  }
  _handleToggle(e) {
    e.preventDefault()
    this.setState({
      isAllListToggled: !this.state.isAllListToggled
    })
  }
  render() {
    const { content } = this.props
    const { isAllListToggled } = this.state
    const title = content[0].split('，')
    title[0] = title[0] + '，'
    return (
      <React.Fragment>
        <MapOnDesktop>
          <MapTooltipsContainer         
            mockup={mockup}
          >
            <LazyLoad once={true} offset={800} height={'100%'}>
              <MapTooltips />
            </LazyLoad>
            <TitleWrapper> 
              {
                title.map((t, titleIndex) => {
                  return (
                    <MapHeader key={'title-' + titleIndex}>
                      {t}
                    </MapHeader>
                  ) 
                })
              }
            </TitleWrapper>
            <MapLegend
              mockup={mockup}
            >
              <ColorIndicator>
                <Colors>
                  {
                    colorlist.map((color, color_index) => {
                      return(
                        <ColorSlice
                          key={'color-'+color_index}
                        >
                          <p>{color.unit}</p>
                          <Color
                            mockup={mockup}
                            color={color.color}
                          />
                        </ColorSlice>
                      )
                    })
                  }
                  <Description>
                    <Placeholder>零</Placeholder>
                    <span>漁工人數</span>
                  </Description>
                </Colors>
              </ColorIndicator>
              <PortIndicator><Circle />基地港口地點</PortIndicator>
            </MapLegend>
          </MapTooltipsContainer> 
        </MapOnDesktop>
        <MapOnTabletBelow>
          <MapListContainer>
            <MapHeader>{title}</MapHeader>
            <MapList>
              {
				      	populationData ?
                  this.sortDataByPopulation(populationData).map((dataArray, dataIndex) => {
                    if (dataIndex === 0 ) {
                      return (
                        <TableLayoutOnTablet key={'tablelayout-' + dataIndex}>
                          {
                            dataArray.map((d, countryIndex) => {
                              return (
                                <ListThreeFirstCountry key={'threefirstcounties-' + countryIndex}>
                                  <LazyLoad once={true} offset={100} height={60}>
                                    <CountryImg>
                                      <img src={imgSrc[country_img[d.country]]}/>
                                    </CountryImg>
                                  </LazyLoad>
                                  <span>{d.country}</span>
                                  <span>{d.population}人</span>
                                </ListThreeFirstCountry>
				      		            )	
                            })
                          }
                          <SeeMore 
                            isToggled={isAllListToggled}
                            onClick={(e) => this.handleToggle(e)}
                          >
                            <PopupIndicator isToggled={isAllListToggled}/>
                            <span>查看其他國家漁工輸出數</span>
                          </SeeMore>
                        </TableLayoutOnTablet>
                      )
                    } else {
                      const dataArrayChunksForMobile = _.chunk(dataArray, Math.ceil(dataArray.length / 2)) 
                      const dataArrayChunksForTablet = _.chunk(dataArray, 5)
                      return (
                        <ListAllRest key={'listtherest-' + dataIndex} isToggled={isAllListToggled}>
                          <MobileList>
                            {
                              dataArrayChunksForMobile.map((chunk, chunkIndex) => {
                                return (
                                  <Chunk key={'chunkInMobile'+ chunkIndex}>
                                    {
                                      chunk.map((d, countryIndex)=> {
                                        return (
                                          <li key={'countrylistInMobChunk-' + countryIndex}>
                                            <span>{d.country}：</span>
                                            <span>{d.population}人</span>
                                          </li>
                                        )
                                      })
                                    }
                                  </Chunk>
                                )
                              })
                            }
                          </MobileList>
                          <TabletList>
                            {
                              dataArrayChunksForTablet.map((chunk, chunkIndex) => {
                                return (
                                  <Chunk key={'chunkInTablet' + chunkIndex}>
                                    {
                                      chunk.map((d, countryIndex)=> {
                                        return (
                                          <li key={'countrylistInTabChunk-' + countryIndex}>
                                            <span>{d.country}：</span>
                                            <span>{d.population}人</span>
                                          </li>
                                        )
                                      })
                                    }
                                  </Chunk>
                                )
                              })
                            }
                          </TabletList>
                        </ListAllRest>
                      ) 
                    }
				      	}) : null
              }
            </MapList>
          </MapListContainer>
        </MapOnTabletBelow>
      </React.Fragment>
    )
  }
}


export default FisherBaseMap
