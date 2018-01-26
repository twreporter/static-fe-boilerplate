import desktopSat1986 from '../../static/desktop-1986-1440x852.jpg'
// import desktopSat1990 from '../../static/desktop-1990-1440x852.jpg'
import desktopSat1991 from '../../static/desktop-1991-1440x852.jpg'
import desktopSat1993 from '../../static/desktop-1993-1440x852.jpg'
import desktopSat1997 from '../../static/desktop-1997-1440x852.jpg'
import desktopSat1998 from '../../static/desktop-1998-1440x852.jpg'
import desktopSat2000 from '../../static/desktop-2000-1440x852.jpg'
import desktopSat2008 from '../../static/desktop-2008-1440x852.jpg'
import desktopSat2011 from '../../static/desktop-2011-1440x852.jpg'
import desktopSat2016 from '../../static/desktop-2016-1440x852.jpg'
import tabletSat1986 from '../../static/tablet-1986-1024x1024.jpg'
// import tabletSat1990 from '../../static/tablet-1990-1024x1024.jpg'
import tabletSat1991 from '../../static/tablet-1991-1024x1024.jpg'
import tabletSat1993 from '../../static/tablet-1993-1024x1024.jpg'
import tabletSat1997 from '../../static/tablet-1997-1024x1024.jpg'
import tabletSat1998 from '../../static/tablet-1998-1024x1024.jpg'
import tabletSat2000 from '../../static/tablet-2000-1024x1024.jpg'
import tabletSat2008 from '../../static/tablet-2008-1024x1024.jpg'
import tabletSat2011 from '../../static/tablet-2011-1024x1024.jpg'
import tabletSat2016 from '../../static/tablet-2018-1024x1024.jpg'

const defaultAnimation = {
  enter: {
    opacity: {
      value: [0, 1],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
  exit: {
    opacity: {
      value: [1, 0],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
}

const desktop1997Animation = {
  enter: {
    opacity: {
      value: [0, 1],
      duration: 500,
      delay: 100,
      easing: 'linear',
    },
    scale: {
      value: [7, 1],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateX: {
      value: [300, 0],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
  exit: {
    opacity: {
      value: [1, 0],
      duration: 200,
      delay: 800,
      easing: 'linear',
    },
    scale: {
      value: [1, 7],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateX: {
      value: [0, 300],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
}

const mobile1997Animation = {
  enter: {
    opacity: desktop1997Animation.enter.opacity,
    scale: {
      value: [8.7, 1],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateX: {
      value: ['41%', 0],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateY: {
      value: ['-19%', 0],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
  exit: {
    opacity: desktop1997Animation.exit.opacity,
    scale: {
      value: [1, 8.7],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateX: {
      value: [0, '41%'],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateY: {
      value: [0, '-19%'],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
}

const data = [
  {
    index: [1, 2],
    image: {
      desktop: {
        url: desktopSat1986,
      },
      tablet: {
        url: tabletSat1986,
      },
    },
    animation: {
      enter: {
        opacity: {
          value: [0, 1],
          duration: 1000,
          easing: 'linear',
        },
      },
      exit: defaultAnimation.exit,
    },
  },
  // {
  //   index: 3,
  //   image: {
  //     desktop: {
  //       url: desktopSat1990,
  //     },
  //     tablet: {
  //       url: tabletSat1990,
  //     },
  //   },
  //   animation: {
  //     enter: defaultAnimation.enter,
  //     exit: defaultAnimation.exit,
  //   },
  // },
  {
    index: 3,
    image: {
      desktop: {
        url: desktopSat1991,
      },
      tablet: {
        url: tabletSat1991,
      },
    },
    animation: {
      enter: defaultAnimation.enter,
      exit: defaultAnimation.exit,
    },
  },
  {
    index: 4,
    image: {
      desktop: {
        url: desktopSat1993,
      },
      tablet: {
        url: tabletSat1993,
      },
    },
    animation: {
      enter: defaultAnimation.enter,
      exit: defaultAnimation.exit,
    },
  },
  {
    index: 5,
    image: {
      desktop: {
        url: desktopSat1997,
      },
      tablet: {
        url: tabletSat1997,
      },
    },
    animation: {
      mobile: mobile1997Animation,
      tablet: mobile1997Animation,
      desktop: desktop1997Animation,
    },
  },
  {
    index: 6,
    image: {
      desktop: {
        url: desktopSat1998,
      },
      tablet: {
        url: tabletSat1998,
      },
    },
    animation: {
      enter: defaultAnimation.enter,
      exit: defaultAnimation.exit,
    },
  },
  {
    index: 7,
    image: {
      desktop: {
        url: desktopSat2000,
      },
      tablet: {
        url: tabletSat2000,
      },
    },
    animation: {
      enter: defaultAnimation.enter,
      exit: defaultAnimation.exit,
    },
  },
  {
    index: 8,
    image: {
      desktop: {
        url: desktopSat2008,
      },
      tablet: {
        url: tabletSat2008,
      },
    },
    animation: {
      enter: defaultAnimation.enter,
      exit: defaultAnimation.exit,
    },
  },
  {
    index: 9,
    image: {
      desktop: {
        url: desktopSat2011,
      },
      tablet: {
        url: tabletSat2011,
      },
    },
    animation: {
      enter: defaultAnimation.enter,
      exit: defaultAnimation.exit,
    },
  },
  {
    index: 10,
    image: {
      desktop: {
        url: desktopSat2016,
      },
      tablet: {
        url: tabletSat2016,
      },
    },
    animation: {
      enter: defaultAnimation.enter,
      exit: defaultAnimation.exit,
    },
  },
]

export default data
