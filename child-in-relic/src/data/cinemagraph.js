import { CinemagraphHelper } from '@twreporter/react-components/lib/cinemagraph'

import mobileBg001 from '../../static/mobile/mobile-001-768x1024-bg.jpg'
import mobileBg003 from '../../static/mobile/mobile-003-768x1024-bg.jpg'
import mobileBg009 from '../../static/mobile/mobile-009-768x1024-bg.jpg'
import mobileBg024 from '../../static/mobile/mobile-024-768x1024-bg.jpg'

import tabletBg001 from '../../static/tablet/tablet-001-1024x1024-bg.jpg'
import tabletBg003 from '../../static/tablet/tablet-003-1024x1024-bg.jpg'
import tabletBg009 from '../../static/tablet/tablet-009-1024x1024-bg.jpg'
import tabletBg024 from '../../static/tablet/tablet-024-1024x1024-bg.jpg'

import desktopBg001 from '../../static/desktop/desktop-001-1440x960-bg.jpg'
import desktopBg003 from '../../static/desktop/desktop-003-1440x960-bg.jpg'
import desktopBg009 from '../../static/desktop/desktop-009-1440x960-bg.jpg'
import desktopBg024 from '../../static/desktop/desktop-024-1440x810-bg.jpg'

import mobileFg003 from '../../static/mobile/mobile-003-768x1024-fg.png'
import mobileFg009 from '../../static/mobile/mobile-009-768x1024-fg.png'

import tabletFg003 from '../../static/tablet/tablet-003-1024x1024-fg.png'
import tabletFg009 from '../../static/tablet/tablet-009-1024x1024-fg.png'

import desktopFg003 from '../../static/desktop/desktop-003-1440x960-fg.png'
import desktopFg009 from '../../static/desktop/desktop-009-1440x960-fg.png'

const cinemagraph001 = new CinemagraphHelper('first-page-boy-on-the-car')
const cinemagraph003 = new CinemagraphHelper('boy-with-dolls-in-the-room')
const cinemagraph009 = new CinemagraphHelper('boys-pesticide-in-the-field')
const cinemagraph024 = new CinemagraphHelper('last-page-night-road')

cinemagraph001.addLayer('BG')
  .setBgPosition('center center', 'all')
  .setBgSize('cover', 'all')
  .setImageMeta({
    id: 'slide01_BG',
    description: 'a boy on the car',
  })
  .setImagePath(desktopBg001, 'desktop')
  .setImagePath(tabletBg001, 'tablet')
  .setImagePath(mobileBg001, 'mobile')
  .setAnimationOptions({
    delay: '1800ms',
    duration: '2600ms',
    fillMode: 'both',
  }, 'all')
  .setCustomKeyframes({
    from: {
      opacity: '0',
      transform: 'scale(1.6) translateZ(0)',
    },
    to: {
      opacity: '1',
      transform: 'scale(1) translateZ(0)',
    },
  }, 'all')
  .setAnimationName('all')

cinemagraph003.addLayer('BG')
  .setBgPosition('center center', 'all')
  .setBgSize('cover', 'all')
  .setImageMeta({
    id: 'slide03_BG',
    description: 'a boy with dolls in his room',
  })
  .setImagePath(desktopBg003, 'desktop')
  .setImagePath(tabletBg003, 'tablet')
  .setImagePath(mobileBg003, 'mobile')
  .setAnimationOptions({
    duration: '2500ms',
    fillMode: 'both',
  }, 'all')
  .setCustomKeyframes({
    from: {
      transform: 'scale(1.05) translateX(100px) translateZ(0)',
    },
    to: {
      transform: 'scale(1) translateX(0) translateZ(0)',
    },
  }, 'all')
  .setAnimationName('all')

cinemagraph003.addLayer('FG')
  .setImageMeta({
    id: 'slide03_FG',
    description: 'the foreground of slide03',
  })
  .setAnimationOptions({
    duration: '2500ms',
    fillMode: 'both',
  }, 'all')
  .setImagePath(desktopFg003, 'desktop')
  .setImagePath(tabletFg003, 'tablet')
  .setImagePath(mobileFg003, 'mobile')
  .setBgPosition('center center', 'all')
  .setBgSize('cover', 'all')
  .setCustomKeyframes({
    from: {
      transform: 'scale(1.24) translateX(-11px) translateZ(0)',
      'transform-origin': 'center bottom',
    },
    to: {
      transform: 'scale(1) translateX(0) translateZ(0)',
      'transform-origin': 'center bottom',
    },
  }, 'all')
  .setAnimationName('all')


cinemagraph009.addLayer('BG')
  .setBgPosition('center bottom', 'all')
  .setBgSize('cover', 'all')
  .setImageMeta({
    id: 'slide09_BG',
    description: 'the background of slide09',
  })
  .setImagePath(desktopBg009, 'desktop')
  .setImagePath(tabletBg009, 'tablet')
  .setImagePath(mobileBg009, 'mobile')
  .setAnimationOptions({
    duration: '2500ms',
    fillMode: 'both',
  }, 'all')
  .setCustomKeyframes({
    from: {
      transform: 'scale(1.1) translateZ(0)',
    },
    to: {
      transform: 'scale(1) translateZ(0)',
    },
  }, 'all')
  .setAnimationName('all')

cinemagraph009.addLayer('FG')
  .setImageMeta({
    id: 'slide09_FG',
    description: 'the foreground of slide09',
  })
  .setAnimationOptions({
    duration: '2500ms',
    fillMode: 'both',
  }, 'all')
  .setImagePath(desktopFg009, 'desktop')
  .setImagePath(tabletFg009, 'tablet')
  .setImagePath(mobileFg009, 'mobile')
  .setBgPosition('center bottom', 'all')
  .setBgSize('cover', 'all')
  .setCustomKeyframes({
    from: {
      transform: 'scale(1.2) translateX(40px) translateZ(0)',
      opacity: '0.6',
    },
    to: {
      transform: 'scale(1) translateX(0) translateZ(0)',
      opacity: '1',
    },
  }, 'all')
  .setAnimationName('all')

cinemagraph024.addLayer('BG')
  .setBgPosition('center center', 'all')
  .setBgSize('cover', 'all')
  .setImageMeta({
    id: 'slide24_BG',
    description: 'the background of slide24',
  })
  .setImagePath(desktopBg024, 'desktop')
  .setImagePath(tabletBg024, 'tablet')
  .setImagePath(mobileBg024, 'mobile')
  .setAnimationOptions({
    duration: '2500ms',
    fillMode: 'both',
  }, 'all')
  .setCustomKeyframes({
    from: {
      transform: 'scale(1.2) translateZ(0)',
    },
    to: {
      transform: 'scale(1) translateZ(0)',
    },
  }, 'all')
  .setAnimationName('all')

export {
  cinemagraph001,
  cinemagraph003,
  cinemagraph009,
  cinemagraph024,
}
