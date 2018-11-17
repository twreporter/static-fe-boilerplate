// TODO: onresize to different devices should render different images according to devices

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import TWEEN from '@tweenjs/tween.js'
import isNode from 'detect-node'
import styled from 'styled-components'

let PIXI
if (!isNode) {
  PIXI = require('pixi.js')
}


// TODO: Use mockup in constants folder instead
const mockup = {
  breakpoints: {
    mobile: 375,
    tablet: 768,
    desktop: 1024,
    hd: 1440
  }
}
let particles = []
const frameWidth = 10
const frameHeight = 10
const frameMargin = 0
const xOffset = frameWidth + frameMargin
const yOffset = frameHeight + frameMargin

class Particle {
  constructor(posX, posY, scale, baseTexture, background, pixiAPP, driftingAnim = true) {
    this.sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture));
    this.sprite.scale.set(scale, scale);

    this.sprite.texture.frame = new PIXI.Rectangle(
      posX / scale,
      posY / scale,
      frameWidth / scale,
      frameHeight / scale,
    );
    
    background.addChild(this.sprite);

    if (driftingAnim) {
      // Setting tween animation by utilizing tweenjs
      const screenWidth = pixiAPP.screen.width
      const initialCoord = { 
        x: - (this.getRandomBias(0, 2 * screenWidth, 1.5 * screenWidth, 0.75)),
        y: (2 * Math.random()) * pixiAPP.screen.height,
        rotation: Math.random() * 2 * Math.PI 
      }
      const flyInTo = { x: posX, y: posY, rotation: 0 }
  
      let coord = initialCoord
  
      const flyIn = new TWEEN.Tween(coord)
        .to(flyInTo, 5000 * ( Math.random()+ 1 ))
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(() => {
          this.update(coord)
        })
  
      flyIn.start(); 
    } else {
      this.sprite.x = posX;
      this.sprite.y = posY;
    }
  }

  update(coords) {
    this.sprite.x = coords.x,
    this.sprite.y = coords.y,
    this.sprite.rotation = coords.rotation
  }

  destroy(background) {
    background.removeChild(this.sprite)
    this.sprite.destroy()
  }

  getRandomBias(min, max, bias, influence) {
    const rnd = Math.random() * (max - min) + min
    const mix = Math.random() * influence
    return rnd * (1 - mix) + bias * mix
  }
}

const Main = styled.div`
  text-align: center;    
`

const PixiContainer = styled.div`
  width: 100%;
  height: 100%;
  display: block;
`

class OpeningAnim extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    this.onSetup = false
    this.device = null
    this.pixiAPP = null 
  }

  componentDidUpdate(prevProps) {
    const { shouldRenderAnime } = this.props
    if (shouldRenderAnime !== prevProps.renderShouldPause) {
      if (!this.pixiAPP) return
      if (shouldRenderAnime) {
        this.pixiAPP.ticker.start()
      } else if (!shouldRenderAnime) {
        this.pixiAPP.ticker.stop()
      }
    } 
  }

  componentDidMount() {
    this.device = this.getClientDevice()
    this.rendererWidth = this.getRenderWindowWidth(window.innerWidth)
    this.rendererHeight = window.innerHeight

    this.pixiAPP = new PIXI.Application({
      width: this.rendererWidth,
      height: this.rendererHeight,
      autoResize: true,
      transparent: true
    })
    this.background = new PIXI.particles.ParticleContainer(1000000, {
      position: true,
      rotation: true
    })

    this.background.position.set(0, 0)
    this.pixiAPP.stage.addChild(this.background)
    
    // Letting pixi finishs its initiliazation stuff, that why it needs 10ms
    setTimeout(() => {
      this.pixi.appendChild(this.pixiAPP.view)
      this.renderParticles()
    }, 10);
    PIXI.loader.onError.add(() => setTimeout(this.setState({ hasError: true })))

    this.pixiAPP.ticker.add(this.renderingLoop)

    window.addEventListener("resize", this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize)
    this.device = null
    this.onSetup = null
    this.pixiAPP = null 
  }

  getClientDevice = () => {
    const windowWidth = window.innerWidth
    if (windowWidth >= mockup.breakpoints.hd){
      return 'hd'
    } else if (windowWidth >= mockup.breakpoints.desktop && windowWidth < mockup.breakpoints.hd) {
      return 'desktop'
    } else if (windowWidth >= mockup.breakpoints.tablet && windowWidth < mockup.breakpoints.desktop) {
      return 'tablet'
    } else {
      return 'mobile'
    }
  }

  loadResource = () => {
    const url = this.getResourceByScreen()
    if (!PIXI.loader.resources[url].texture) {
      return this.setState({ hasError: true })
    }
    return PIXI.loader.resources[url].texture.baseTexture
  }

  setUp = (windowWidth, driftingAnim) => {
    const { startCoverTextFadeInAnim } = this.props
    this.setState({ hasError: false })
    const texture = this.loadResource()
    // this.rendererHeight = window.innerHeight
    // this.rendererWidth = this.rendererHeight / (texture.height / texture.width)
    this.rendererWidth = this.getRenderWindowWidth(windowWidth)
    this.rendererHeight = this.rendererWidth / (texture.width / texture.height)
    this.pixiAPP.renderer.resize(this.rendererWidth, this.rendererHeight)
    this.background.position.set(0, this.getbgYOffset(this.rendererHeight))
    const scale = this.rendererWidth / texture.width
    const xLoopCount = Math.floor(this.rendererWidth / xOffset) - 1
    const yLoopCount = Math.floor(this.rendererHeight / yOffset) - 1
    for (let i = 0; i < xLoopCount; i++) {
      for (let j = 0; j < yLoopCount; j++) {
        particles.push(new Particle(i * xOffset, j * yOffset, scale, texture, this.background, this.pixiAPP, driftingAnim))
      }
    } 
    this.isOnSetup = false
    startCoverTextFadeInAnim()
  }

  onResize = () => {
    // only trigger onresize when width changes
    if (this.rendererWidth !== this.getRenderWindowWidth(window.innerWidth)) {
      this.renderParticles(false)
    }
  }

  renderingLoop = () => {
    // TODO: stop render after animation completed
    if (this.isOnSetup) { return }
    TWEEN.update()
    this.pixiAPP.render()
  }

  renderParticles = (driftingAnim = true) => {
    this.isOnSetup = true
    const url = this.getResourceByScreen()
    if (PIXI.loader.resources[url]) { return this.setUp(window.innerWidth, driftingAnim) }

    const load = PIXI.loader
      .add(url)
      .on("progress", this.loadProgressHandler)
      .load(this.setUp.bind(this, window.innerWidth, driftingAnim))
  }

  getResourceByScreen = () => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const { images } = this.props 

    // decide resource by device
    if (windowWidth > windowHeight) {
      return images.desktop
    } else {
      switch (this.device) {
        case 'tablet':
          return images.tablet
        case 'mobile':
          return images.mobile
        default:
          return images.mobile
      }
    }
  }

  loadProgressHandler = (loader, resource) => {
    // console.log("loading: " + resource.url); 
    // console.log("progress: " + loader.progress + "%"); 
    // console.log("loading: " + resource.name);
    if (loader.progress === 100) {
      this.props.hideLoadingIcon()
    }
  }

  getRenderWindowWidth = (windowWidth) => {
    return windowWidth + 20
  }

  getbgYOffset = (renderHeight) => {
  // Only desktop need bgYoffset (the landscape of mobile devices are excluded)
    switch (this.device) {
      case 'hd':
        return window.innerHeight - renderHeight + 20 // +20 is a heuristic approach (for desktop)
      default:
        return 0
    }
  }

  render() {
    return (
      <Main>
        <PixiContainer
          innerRef={(node) => this.pixi = node}
        />
      </Main>
    );
  }
}

OpeningAnim.propTypes = {
  images: PropTypes.object.isRequired,
  startCoverTextFadeInAnim: PropTypes.func.isRequired,
  hideLoadingIcon: PropTypes.func.isRequired,
  shouldRenderAnime: PropTypes.bool.isRequired
}

export default OpeningAnim 
